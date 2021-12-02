export default {
    props: {
        sort: {
            type: String,
            default: "no", // "no", "inc", "dec"
        },
        column: {
            type: String,
            required: true,
        },
    },
    methods: {
        emitSort(sort) {
            this.$emit("sort", { sort, column: this.column });
        }
    },
}