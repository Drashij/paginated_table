<template>
  <div>
    <div class="input-group mb-2 d-flex justify-content-end">
      <input
        type="text"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        style="width: 20%"
        v-model="search"
        @input="filter()"
      />
      <button class="btn btn-outline-primary" type="button" id="button-addon2">
        <i class="bi bi-search"></i>
      </button>
    </div>

    <table class="table table-hover table-bordered">
      <thead class="">
        <tr class="table-dark">
          <th scope="col" class="text-start">
            Employee Id
            <i
              :class="isUpEmployee ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
              @click="
                isUpEmployee = !isUpEmployee;
                setSortingOrder('empId', isUpEmployee);
                isUpName = false;
                isUpProjects = false;
                isUpJoining = false;
              "
            ></i>
          </th>
          <th scope="col" class="text-start">
            Name
            <i
              :class="isUpName ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
              @click="
                isUpName = !isUpName;
                setSortingOrder('firstname', isUpName);
                isUpEmployee = false;
                isUpProjects = false;
                isUpJoining = false;
              "
            ></i>
          </th>
          <th scope="col" class="text-start">Email</th>
          <th scope="col" class="text-start">Designation</th>
          <th scope="col" class="text-start">
            Projects
            <i
              :class="isUpProjects ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
              @click="
                isUpProjects = !isUpProjects;
                setSortingOrder('projectCount', isUpProjects);
                isUpEmployee = false;
                isUpName = false;
                isUpJoining = false;
              "
            ></i>
          </th>
          <th scope="col" class="text-start">
            Joining Date
            <i
              :class="isUpJoining ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
              @click="
                isUpJoining = !isUpJoining;
                setSortingOrder('joiningDate', isUpJoining);
                isUpEmployee = false;
                isUpName = false;
                isUpProjects = false;
              "
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <th scope="row" class="text-start">{{ emp.empId }}</th>

          <td class="text-start">{{ emp.fullName }}</td>
          <td class="text-start">{{ emp.email }}</td>
          <td class="text-start">{{ emp.designation }}</td>
          <td class="text-start">{{ emp.projectCount }}</td>
          <td class="text-start">{{ emp.joiningDate }}</td>
        </tr>
      </tbody>
    </table>
    <pagination
      :maxVisibleButtons="1"
      :totalPages="Math.ceil(count / 10)"
      :page="page"
      @pagechanged="onPageChange"
    ></pagination>
  </div>
</template>

<script>
import serviceApi from "../serviceApi";
import pagination from "./Pagination.vue";
export default {
  name: "DashBoard",
  props: {
    // msg: String,
  },
  components: {
    pagination,
  },
  computed: {
    sortBy() {
      return [this.sortByCol, this.order].join(":");
    },
  },
  watch: {
    sortBy(value) {
      if (this.search) {
        this.filter(this.search);
      } else {
        this.getEmployees(this.page, value);
      }
    },
  },
  data() {
    return {
      page: 1,
      employees: [],
      count: 1,
      order: "ASC",
      sortByCol: "firstname",
      isUpEmployee: false,
      isUpName: false,
      isUpProjects: false,
      isUpJoining: false,
      search: "",
    };
  },
  methods: {
    onPageChange(page) {
      if (page <= Math.ceil(this.count / 10)) {
        this.page = page;
        if (this.search) {
          this.filter(this.page, this.search);
        } else {
          this.getEmployees(this.page, this.sortBy);
        }
      }
    },
    getEmployees(page, sortBy) {
      serviceApi
        .getEmployees(page, sortBy)
        .then((res) => {
          this.employees = res.data.employees;
          this.count = res.data.amount;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    setSortingOrder(sortByCol, value) {
      this.sortByCol = sortByCol;

      this.order = value ? "DESC" : "ASC";
    },
    async filter(p) {
      console.log(this.sortBy);
      if (this.search !== "") {
        await serviceApi
          .filterData(this.page, this.search, this.sortBy)
          .then((response) => {
            // console.log(response);
            this.employees = response.data.rows;
            this.count = response.data.count;

            if (this.page > Math.ceil(this.count / 10) && this.count !== 0) {
              this.page = 1;
              this.filter(this.page, this.search);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // console.log("Khali");
        this.getEmployees(this.page, this.sortBy);
      }
    },
  },
  created() {
    this.getEmployees(this.page, this.sortBy);
  },
};
</script>
