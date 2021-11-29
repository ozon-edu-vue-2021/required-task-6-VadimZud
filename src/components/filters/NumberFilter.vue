<template>
  <div>
    <div>От <input type="number" :value="from" @input="setFrom($event)" /></div>
    <div>До <input type="number" :value="to" @input="setTo($event)" /></div>
  </div>
</template>

<script>
export default {
  name: "NumberFilter",
  props: {
    column: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      from: "",
      to: "",
    };
  },
  computed: {
    filter() {
      return [this.from.toString(), this.to.toString()].join(":");
    },
  },
  methods: {
    setFrom(event) {
      this.from = event.target.value;
      this.emitFilter();
    },
    setTo(event) {
      this.to = event.target.value;
      this.emitFilter();
    },
    emitFilter() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      this.timeout = setTimeout(() => {
        this.$emit("filter", { [this.column]: this.filter });
      }, 1000);
    },
  },
};
</script>