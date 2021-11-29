<template>
  <span class="sort-control" @click="onclick">
    <component :is="icon" /><span class="index">{{ index }}</span>
  </span>
</template>

<script>
import Unsorted from "../assets/unsorted.svg";
import Decrease from "../assets/decrease.svg";
import Increase from "../assets/increase.svg";

export default {
  name: "SortControl",
  props: {
    index: {
      type: Number,
      required: true,
    },
    column: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sort: "unsorted",
    };
  },
  computed: {
    icon() {
      switch (this.sort) {
        case "increase":
          return Increase;
        case "decrease":
          return Decrease;
        default:
          return Unsorted;
      }
    },
  },
  methods: {
    onclick() {
      switch (this.sort) {
        case "increase":
          this.sort = "decrease";
          break;
        case "decrease":
          this.sort = "unsorted";
          break;
        default:
          this.sort = "increase";
      }
      this.$emit("sort", { [this.column]: this.sort });
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
  border: 1px solid black;
  padding: 5px;
  border-radius: 3px;
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