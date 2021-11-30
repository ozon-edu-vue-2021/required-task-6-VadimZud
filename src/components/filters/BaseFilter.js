export default {
    props: {
        filter: {
            type: String,
            required: true,
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