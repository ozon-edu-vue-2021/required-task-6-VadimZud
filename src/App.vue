<template>
  <div id="app">
    <vue-table
      :rows="rows"
      :columns="columns"
      :columnsHeads="columnsHeads"
      :getKey="(row) => row.id"
      :defaultHeadClass="{ ['table-head']: true }"
    >
      <template v-for="column in columns" #[`${column}-head`]="{ head }">
        <my-table-head :head="head" :key="column">
          <template #sorter
            ><switch-sorter
              :sort="sorts[column]"
              :column="column"
              :index="sortsIndexes[column]"
              @sort="updateSorts($event)"
          /></template>
          <template #filter
            ><component
              :is="filtersComponents[column]"
              :filter="filters[column]"
              :column="column"
              :type="filtersTypes[column]"
              @filter="updateFilters($event)"
          /></template>
        </my-table-head>
      </template>

      <template #email-cell="{ row }">
        <a :href="`mailto:${row.email}`">{{ row.email }}</a>
      </template>
      <template v-if="bottomLoader" #end-tbody
        ><table-loader :colspan="rowSize"
      /></template>
    </vue-table>
  </div>
</template>

<script>
import VueTable from "./components/VueTable.vue";
import TableLoader from "./components/loaders/TableLoader.vue";
import SingleFilter from "./components/filters/SingleFilter.vue";
import RangeFilter from "./components/filters/RangeFilter.vue";
import SwitchSorter from "./components/sorters/SwitchSorter.vue";
import Filterable from "./mixins/Filterable";
import Sortable from "./mixins/Sortable";
import { updateData } from "./data_sourses/TestSource";
import MyTableHead from "./components/MyTableHead.vue";

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
      filtersTypes: {
        id: "number",
        age: "number",
        name: "text",
        login: "text",
        email: "text",
      },
      filtersComponents: {
        id: RangeFilter,
        age: RangeFilter,
        name: SingleFilter,
        login: SingleFilter,
        email: SingleFilter,
      },
      bottomLoader: false,
    };
  },
  computed: {
    rowSize() {
      return this.columns.length;
    },
    sortsIndexes() {
      return this.sortsOrder.reduce((res, column, index) => {
        res[column] = index + 1;
        return res;
      }, {});
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
  created() {
    updateData(this);
  },
  components: {
    VueTable,
    TableLoader,
    MyTableHead,
    SwitchSorter,
    SingleFilter,
    RangeFilter,
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

.table-head {
  vertical-align: top;
}
</style>
