<template>
  <div class="paginator">
    <div>
      Размер страницы:
      <input
        type="number"
        :value="pageSize"
        @input="setPageSize(+$event.target.value)"
        min="0"
      />
    </div>
    <div>
      Текущая страница:
      <input
        type="number"
        :value="pageNumber"
        @input="setPageNumber(+$event.target.value)"
        min="1"
        :max="totalPages"
      />
      <span v-if="totalPages !== null">/{{ totalPages }}</span>
    </div>
  </div>
</template>

<script>
import BasePaginator from "./BasePaginator";
export default {
  name: "Paginator",
  extends: BasePaginator,
  props: {
    totalPages: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
.paginator {
  background-color: #ccc;
  padding: 5px;
}
</style>