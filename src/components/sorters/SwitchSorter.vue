<template>
  <span class="sort-control" @click="switchSort">
    <component :is="icon" /><span v-if="showIndex" class="index">{{
      index
    }}</span>
  </span>
</template>

<script>
import BaseSwitchSorter from "./BaseSwitchSorter";
import Unsorted from "../../assets/unsorted.svg";
import Decrease from "../../assets/decrease.svg";
import Increase from "../../assets/increase.svg";

const icons = {
  no: Unsorted,
  inc: Increase,
  dec: Decrease,
};

export default {
  name: "SwitchSorter",
  extends: BaseSwitchSorter,
  props: {
    index: {
      type: Number,
      default: null,
    },
  },
  computed: {
    icon() {
      return icons[this.sort];
    },
    showIndex() {
      return this.sort !== "no" && this.index !== null;
    },
  },
  components: {
    Unsorted,
    Decrease,
    Increase,
  },
};
</script>

<style scoped>
.sort-control {
  display: inline-block;
  cursor: pointer;
  padding: 5px;
}

.index {
  display: inline-block;
  background-color: black;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
}
</style>