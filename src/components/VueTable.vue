<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column"
          :class="headsClasses[column]"
          :style="headsStyles[column]"
        >
          <slot :name="`${column}-head`">
            {{ columnsHeads[column] || column }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <slot name="start-tbody"></slot>
      <tr v-for="(row, index) in rows" :key="getKey ? getKey(row) : index">
        <td
          v-for="column in columns"
          :key="column"
          :class="cellsClasses[column]"
          :styles="cellsStyles[column]"
        >
          <slot :name="`${column}-cell`" :row="row">
            {{ row[column] }}
          </slot>
        </td>
      </tr>
      <slot name="end-tbody"></slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VueTable",
  props: {
    rows: {
      type: Array,
      default: Array,
    },
    columns: {
      type: Array,
      default: Array,
    },
    columnsHeads: {
      type: Object,
      default: Object,
    },
    getKey: {
      type: Function,
      default: null,
    },
    headsClasses: {
      type: Object,
      default: Object,
    },
    headsStyles: {
      type: Object,
      default: Object,
    },
    cellsClasses: {
      type: Object,
      default: Object,
    },
    cellsStyles: {
      type: Object,
      default: Object,
    },
  },
};
</script>