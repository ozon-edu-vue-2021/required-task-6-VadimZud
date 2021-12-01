<template>
  <div>
    <div><slot name="sorter"></slot>{{ head }}</div>
    <slot name="filter"></slot>
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: String,
      required: true,
    },
  },
};
</script>