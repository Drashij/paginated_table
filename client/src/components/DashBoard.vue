<template>
  <div>
    <div class="input-group mb-2 d-flex justify-content-between">
      <button class="btn btn-outline-dark mr-1" @click="resetFilter">
        reset filter
      </button>
      <input
        type="text"
        placeholder="search"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        style="width: 20%"
        v-model="search"
        @input="getEmployees(page, sortString, search)"
      />
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
    sortString() {
      return JSON.stringify(this.sortBy);
    },
  },
  watch: {
    sortByCol(value) {
      this.sortBy[value] = this.order;
      console.log(this.sortBy);
      this.getEmployees(this.page, this.sortString, this.search);
    },
    order(value) {
      this.sortBy[this.sortByCol] = value;
      console.log(this.sortBy);
      this.getEmployees(this.page, this.sortString, this.search);
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
      sortBy: {},
    };
  },
  methods: {
    onPageChange(page) {
      if (page <= Math.ceil(this.count / 10)) {
        this.page = page;

        this.getEmployees(this.page, this.sortString, this.search);
      }
    },
    getEmployees(page, sortString, search) {
      console.log(sortString);
      serviceApi
        .getEmployees(page, sortString, search)
        .then((res) => {
          this.employees = res.data.employees.rows;
          this.count = res.data.employees.count;
          // console.log(res.data.employees);
          if (this.page > Math.ceil(this.count / 10) && this.count !== 0) {
            console.log("in fnvtion");
            this.page = 1;
            this.getEmployees(this.page, this.sortString, this.search);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    setSortingOrder(sortByCol, value) {
      // this.sortByCol = sortByCol;
      this.order = value ? "DESC" : "ASC";
      this.sortByCol = sortByCol;
      this.value = value;
    },

    resetFilter() {
      this.isUpEmployee = false;
      this.isUpJoining = false;
      this.isUpName = false;
      this.isUpProjects = false;
      this.sortBy = {};
      this.getEmployees(this.page, this.sortString, this.search);
    },
  },
  created() {
    this.getEmployees(this.page, this.sortString, this.search);
  },
};
</script>
