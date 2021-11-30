<template>
  <table>
    <slot name="start-table"></slot>
    <thead>
      <slot name="start-thead"></slot>
      <tr>
        <th
          v-for="column in columns"
          :key="column"
          :class="headsClasses[column]"
          :style="headsStyles[column]"
        >
          <slot :name="`start-${column}-head`"></slot>
          <slot :name="`${column}-head`">
            {{ columnsHeads[column] || column }}
          </slot>
          <slot :name="`end-${column}-head`"></slot>
        </th>
      </tr>
      <slot name="end-thead"></slot>
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
          <slot :name="`start-${column}-cell`"></slot>
          <slot :name="`${column}-cell`" :row="row">
            {{ row[column] }}
          </slot>
          <slot :name="`end-${column}-cell`"></slot>
        </td>
      </tr>
      <slot name="end-tbody"></slot>
    </tbody>
    <slot name="end-table"></slot>
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