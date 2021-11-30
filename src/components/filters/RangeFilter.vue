<template>
  <div>
    <div>
      От
      <input :type="type" :value="left" @input="setLeft($event.target.value)" />
    </div>
    <div>
      До
      <input
        :type="type"
        :value="right"
        @input="setRight($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import BaseRangeFilter from "./BaseRangeFilter";
export default {
  name: "RangeFilter",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  extends: BaseRangeFilter,
};
</script>