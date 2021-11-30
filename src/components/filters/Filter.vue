<template>
  <div>
    <input
      :type="type"
      :value="filter"
      @input="emitFilter($event.target.value)"
    />
  </div>
</template>

<script>
import BaseFilter from "./BaseFilter";
export default {
  name: "Filter",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  extends: BaseFilter,
};
</script>