<template>
  <div>
    <div>
      Использовать бесконечный скролл<input
        type="checkbox"
        v-model="infScrollable"
      />
    </div>
    <div>
      Использовать виртуальный скролл<input
        type="checkbox"
        v-model="virtualScrollable"
      />
    </div>
    <paginator
      v-if="!infScrollable"
      :pageSize="pageSize"
      :pageNumber="pageNumber"
      :totalPages="totalPages"
      @paginate="updatePagination($event)"
    />
    <vue-table
      :rows="computedRows"
      :columns="columns"
      :columnsHeads="columnsHeads"
      :getKey="computedGetKey"
      :defaultHeadClass="{ ['table-head']: true }"
      :defaultCellClass="{ ['table-cell']: true }"
      :useVirtualScroll="virtualScrollable"
      :virtualScrollHeight="20"
      :virtualScrollCount="25"
      class="table"
    >
      <template v-if="virtualScrollable" #start-tbody
        ><tr :colspan="rowSize" :style="`height: ${virtualScrollFillerSize}px`"
      /></template>
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
    <paginator
      v-if="!infScrollable"
      :pageSize="pageSize"
      :pageNumber="pageNumber"
      :totalPages="totalPages"
      @paginate="updatePagination($event)"
    />
  </div>
</template>

<script>
import VueTable from "./VueTableFunctional.vue";
import TableLoader from "./loaders/TableLoader.vue";
import SingleFilter from "./filters/SingleFilter.vue";
import RangeFilter from "./filters/RangeFilter.vue";
import SwitchSorter from "./sorters/SwitchSorter.vue";
import Filterable from "../mixins/Filterable";
import Sortable from "../mixins/Sortable";
import Paginable from "../mixins/Paginable";
import InfScrollable from "../mixins/InfScrollable";
import virtualScrollable from "../mixins/virtualScrollable";
import { updateData } from "../data_sourses/TestSource";
import MyTableHead from "./MyTableHead.vue";
import Paginator from "./paginators/Paginator.vue";

export default {
  name: "MyTable",
  mixins: [Filterable, Sortable, Paginable, InfScrollable, virtualScrollable],
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

      pageSize: 20,
      totalPages: 0,

      infScrollable: false,
      infScrollStartSize: 100,
      infScrollStepSize: 50,
      infScrollTriggerOffset: 50,

      virtualScrollable: false,
      virtualScrollStartSize: 60,
      virtualScrollBufferSize: 50,
      virtualScrollRowHeight: 20,
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
    computedRows() {
      return this.virtualScrollable ? this.virtualScrollRows : this.rows;
    },
    computedGetKey() {
      return this.virtualScrollable ? this.virtualScrollGetKey : this.getKey;
    },
    getKey(row) {
      return row.id;
    },
  },
  methods: {
    updateData(infScroll) {
      updateData(this, !infScroll);
    },
  },
  created() {
    this.updateData();
  },
  watch: {
    infScrollable() {
      (this.paginable = !this.infScrollable), this.updateData();
    },
  },
  components: {
    VueTable,
    TableLoader,
    MyTableHead,
    SwitchSorter,
    SingleFilter,
    RangeFilter,
    Paginator,
  },
};
</script>

<style>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table-head {
  vertical-align: top;
  background-color: #ccc;
  padding: 5px;
  border-top: 1px solid #aaa;
}

.table-head,
.table-cell {
  border-left: 1px solid #aaa;
  height: 20px;
}

.table-head:first-child,
.table-cell:first-child {
  border-left: none;
}
</style>
