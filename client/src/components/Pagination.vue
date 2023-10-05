<template>
  <nav aria-label="Page navigation example" v-if="totalPages">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button
          class="btn btn-light"
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          First
        </button>
      </li>
      <li class="page-item">
        <button
          class="btn btn-light"
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          <i class="bi bi-caret-left"></i>
        </button>
      </li>
      <!-- Visible Buttons Start -->

      <li v-for="page in pages" class="page-item" :key="page.name">
        <button
          type="button"
          class="btn btn-light"
          @click="onClickPage(page.name)"
          v-if="page.name !== -1 && page.name !== 0"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>

      <!-- Visible Buttons End -->
      <li class="page-item">
        <button
          class="btn btn-light"
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
          <i class="bi bi-caret-right"></i>
        </button>
      </li>

      <li class="page-item">
        <button
          class="btn btn-light"
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
          Last
        </button>
      </li>
    </ul>
  </nav>
  <div class="d-flex justify-content-center fw-bold text-secondary py-3" v-else>
    No Records
  </div>
</template>

<script>
export default {
  name: "pagination_1",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },

    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.page === 1) {
        return 1;
      }

      // When on the last page
      if (this.page === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.page - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.page,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.page === 1;
    },
    isInLastPage() {
      return this.page === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.page - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.page + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.page === page;
    },
  },
};
</script>
<style scoped>
.btn {
  margin: 2px;
}

.btn:disabled {
  background-color: #0d6efd;
  border-color: white;
  color: white;
}
</style>
