<template>
  <table>
    <slot name="start-table"></slot>
    <thead :class="theadClass" :style="theadStyle">
      <slot name="start-thead"></slot>
      <tr>
        <th
          v-for="column in columns"
          :key="column"
          :class="computedHeadsClasses[column]"
          :style="computedHeadsStyles[column]"
        >
          <slot :name="`${column}-head`" :head="computedColumnsHeads[column]">
            {{ computedColumnsHeads[column] }}
          </slot>
        </th>
      </tr>
      <slot name="end-thead"></slot>
    </thead>
    <tbody :class="tbodyClass" :style="tbodyStyle">
      <slot name="start-tbody"></slot>
      <!-- <recycle-scroller
        v-if="useVirtualScroll"
        :style="`height: ${virtualScrollHeight * virtualScrollCount}px`"
        :items="rows"
        :item-size="virtualScrollHeight"
        :key-field="keyField"
        v-slot="{ item }"
      >
        <tr :style="`height: ${virtualScrollHeight}px`">
          <td
            v-for="column in columns"
            :key="column"
            :class="computedCellsClasses[column]"
            :styles="computedCellsStyles[column]"
          >
            <slot :name="`start-${column}-cell`"></slot>
            <slot :name="`${column}-cell`" :row="item" :index="index">
              {{ item[column] }}
            </slot>
            <slot :name="`end-${column}-cell`"></slot>
          </td>
        </tr>
      </recycle-scroller> -->
      <!-- <template v-else> -->
      <tr v-for="(row, index) in rows" :key="row[keyField] ?? index">
        <td
          v-for="column in columns"
          :key="column"
          :class="computedCellsClasses[column]"
          :styles="computedCellsStyles[column]"
        >
          <slot :name="`start-${column}-cell`"></slot>
          <slot :name="`${column}-cell`" :row="row" :index="index">
            {{ row[column] }}
          </slot>
          <slot :name="`end-${column}-cell`"></slot>
        </td>
      </tr>
      <!-- </template> -->
      <slot name="end-tbody"></slot>
    </tbody>
    <slot name="end-table"></slot>
  </table>
</template>

<script>
// import { RecycleScroller } from "vue-virtual-scroller";

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
    keyField: {
      type: String,
      default: "id",
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
    useVirtualScroll: {
      type: Boolean,
      default: false,
    },
    virtualScrollHeight: {
      type: Number,
      default: null,
    },
    virtualScrollCount: {
      type: Number,
      default: null,
    },
  },
  computed: {
    computedColumnsHeads() {
      return this.columns.reduce((res, column) => {
        res[column] = this.columnsHeads[column] || column;
        return res;
      }, {});
    },
    computedHeadsClasses() {
      return this.columns.reduce((res, column) => {
        res[column] = Object.assign(
          {},
          this.defaultHeadClass,
          this.headsClasses[column]
        );
        return res;
      }, {});
    },
    computedHeadsStyles() {
      return this.columns.reduce((res, column) => {
        res[column] = Object.assign(
          {},
          this.defaultHeadStyle,
          this.headsStyles[column]
        );
        return res;
      }, {});
    },
    computedCellsClasses() {
      return this.columns.reduce((res, column) => {
        res[column] = Object.assign(
          {},
          this.defaultCellClass,
          this.cellsClasses[column]
        );
        return res;
      }, {});
    },
    computedCellsStyles() {
      return this.columns.reduce((res, column) => {
        res[column] = Object.assign(
          {},
          this.defaultCellStyle,
          this.cellsStyles[column]
        );
        return res;
      }, {});
    },
  },
  // components: {
  //   RecycleScroller,
  // },
};
</script>