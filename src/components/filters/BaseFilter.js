export default {
    props: {
        filter: {
            type: String,
            default: "",
        },
        column: {
            type: String,
            required: true,
        }
    },
    methods: {
        emitFilter(filter) {
            this.$emit("filter", { filter, column: this.column });
        }
    }
}