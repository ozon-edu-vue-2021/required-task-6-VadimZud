<template>
  <div id="app">
    <vue-table
      :rows="rows"
      :columns="columns"
      :columnsHeads="columnsHeads"
      :getKey="(row) => row.id"
    >
      <template #login-head>
        <div>Логин<sort-control column="login" :index="1" /></div>
      </template>
      <template #email-cell="{ row }">
        <a :href="`mailto:${row.email}`">{{ row.email }}</a>
      </template>
      <template #end-tbody><table-loader :colspan="rowSize" /></template>
    </vue-table>
  </div>
</template>

<script>
import VueTable from "./components/VueTable.vue";
import TableLoader from "./components/loaders/TableLoader.vue";
import Filter from "./components/filters/Filter.vue";
import RangeFilter from "./components/filters/RangeFilter.vue";
import SwitchSorter from "./components/sorters/SwitchSorter.vue";
import Filterable from "./mixins/Filterable";
import Sortable from "./mixins/Sortable";
import { updateData } from "./data_sourses/TestSource";

export default {
  name: "App",
  mixins: [Filterable, Sortable],
  data() {
    return {
      rows: [],
      columns: ["id", "age", "name", "login", "email"],
      columnsHeads: {
        id: "ID",
        age: "Возраст",
        name: "Имя",
        login: "Логин",
        email: "EMail",
      },
      bottomLoader: false,
    };
  },
  computed: {
    rowSize() {
      return this.columns.length;
    },
  },
  watch: {
    filters() {
      updateData(this);
    },
    sorts() {
      updateData(this);
    },
  },
  components: {
    VueTable,
    TableLoader,
    Filter,
    RangeFilter,
    SwitchSorter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
