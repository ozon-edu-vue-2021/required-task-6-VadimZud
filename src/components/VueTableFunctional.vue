<template functional>
  <table :class="data.staticClass">
    <slot name="start-table"></slot>
    <thead :class="props.theadClass" :style="props.theadStyle">
      <slot name="start-thead"></slot>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column"
          :class="$options.computedHeadsClasses(props)[column]"
          :style="$options.computedHeadsStyles(props)[column]"
        >
          <slot
            :name="`${column}-head`"
            :head="$options.computedColumnsHeads(props)[column]"
          >
            {{ $options.computedColumnsHeads(props)[column] }}
          </slot>
        </th>
      </tr>
      <slot name="end-thead"></slot>
    </thead>
    <tbody :class="props.tbodyClass" :style="props.tbodyStyle">
      <slot name="start-tbody"></slot>
      <tr v-for="(row, index) in props.rows" :key="props.getKey(row, index)">
        <td
          v-for="column in props.columns"
          :key="column"
          :class="$options.computedCellsClasses(props)[column]"
          :styles="$options.computedCellsStyles(props)[column]"
        >
          <slot :name="`start-${column}-cell`"></slot>
          <slot :name="`${column}-cell`" :row="row" :index="index">
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
let columnsHeads;
let headsClasses;
let headsStyles;
let cellsClasses;
let cellsStyles;

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
      default: (row, index) => index,
    },
    headsClasses: {
      type: Object,
      default: Object,
    },
    defaultHeadClass: {
      type: Object,
      default: Object,
    },
    headsStyles: {
      type: Object,
      default: Object,
    },
    defaultHeadStyle: {
      type: Object,
      default: Object,
    },
    cellsClasses: {
      type: Object,
      default: Object,
    },
    defaultCellClass: {
      type: Object,
      default: Object,
    },
    cellsStyles: {
      type: Object,
      default: Object,
    },
    defaultCellStyle: {
      type: Object,
      default: Object,
    },
    theadClass: {
      type: Object,
      default: Object,
    },
    theadStyle: {
      type: Object,
      default: Object,
    },
    tbodyClass: {
      type: Object,
      default: Object,
    },
    tbodyStyle: {
      type: Object,
      default: Object,
    },
  },
  computedColumnsHeads(props) {
    if (columnsHeads) {
      return columnsHeads;
    }
    columnsHeads = props.columns.reduce((res, column) => {
      res[column] = props.columnsHeads[column] || column;
      return res;
    }, {});
    return columnsHeads;
  },
  computedHeadsClasses(props) {
    if (headsClasses) {
      return headsClasses;
    }
    headsClasses = props.columns.reduce((res, column) => {
      res[column] = Object.assign(
        {},
        props.defaultHeadClass,
        props.headsClasses[column]
      );
      return res;
    }, {});
    return headsClasses;
  },
  computedHeadsStyles(props) {
    if (headsStyles) {
      return headsStyles;
    }
    headsStyles = props.columns.reduce((res, column) => {
      res[column] = Object.assign(
        {},
        props.defaultHeadStyle,
        props.headsStyles[column]
      );
      return res;
    }, {});
    return headsStyles;
  },
  computedCellsClasses(props) {
    if (cellsClasses) {
      return cellsClasses;
    }
    cellsClasses = props.columns.reduce((res, column) => {
      res[column] = Object.assign(
        {},
        props.defaultCellClass,
        props.cellsClasses[column]
      );
      return res;
    }, {});
    return cellsClasses;
  },
  computedCellsStyles(props) {
    if (cellsStyles) {
      return cellsStyles;
    }
    cellsStyles = props.columns.reduce((res, column) => {
      res[column] = Object.assign(
        {},
        props.defaultCellStyle,
        props.cellsStyles[column]
      );
      return res;
    }, {});
    return cellsStyles;
  },
};
</script>