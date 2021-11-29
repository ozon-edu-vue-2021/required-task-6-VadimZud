<template>
  <div id="app">
    <vue-table
      :rows="rows"
      :columns="['id', 'login', 'html_url']"
      :columnsHeads="{ login: 'Логин' }"
      :getKey="(row) => row.id"
    >
      <template #login-head>
        <div>Логин<sort-control column="login" :index="1" /></div>
        <text-filter column="aga" @filter="log($event)" />
        <date-filter column="ugu" @filter="log($event)" />
        <number-filter column="ads" @filter="log($event)" />
      </template>
      <template #html_url-head>
        Профиль<br />
        (Путь)
      </template>
      <template #html_url-cell="{ row }">
        <a :href="row.html_url">{{ row.html_url }}</a>
      </template>
      <template #start-tbody><table-loader :colspan="3" /></template>
      <template #end-tbody><table-loader :colspan="3" /></template>
    </vue-table>
  </div>
</template>

<script>
import VueTable from "./components/VueTable.vue";
import TextFilter from "./components/filters/TextFilter.vue";
import DateFilter from "./components/filters/DateFilter.vue";
import TableLoader from "./components/loaders/TableLoader.vue";
import NumberFilter from "./components/filters/NumberFilter.vue";
import SortControl from "./components/SortControl.vue";

export default {
  name: "App",
  data() {
    return {
      rows: [],
    };
  },
  async created() {
    const response = await fetch("https://api.github.com/users", {
      Accept: "application/vnd.github.v3+json",
    });
    this.rows = await response.json();
  },
  methods: {
    log(obj) {
      console.log(obj);
    },
  },
  components: {
    VueTable,
    TextFilter,
    DateFilter,
    TableLoader,
    NumberFilter,
    SortControl,
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
