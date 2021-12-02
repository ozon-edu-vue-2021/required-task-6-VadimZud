<template>
  <div>
    <div class="title"><slot name="sorter"></slot>{{ head }}</div>
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

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>