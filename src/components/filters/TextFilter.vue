<template>
  <div><input type="text" :value="value" @input="oninput($event)" /></div>
</template>

<script>
export default {
  name: "TextFilter",
  props: {
    column: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    oninput(event) {
      this.value = event.target.value;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.timeout = setTimeout(() => {
        this.$emit("filter", { [this.column]: this.value });
      }, 1000);
    },
  },
};
</script>