<template>
  <tr>
    <td :colspan="colspan"><loader /></td>
  </tr>
</template>

<script>
import Loader from "../../assets/loader.svg";

export default {
  name: "TableLoader",
  props: {
    colspan: {
      type: Number,
      default: 1,
    },
  },
  components: {
    Loader,
  },
};
</script>