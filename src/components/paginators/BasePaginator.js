export default {
    props: {
        pageSize: {
            type: Number,
            default: 0,
        },
        pageNumber: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        setPageSize(pageSize) {
            this.$emit("paginate", { pageSize, pageNumber: 1 });
        },
        setPageNumber(pageNumber) {
            this.$emit("paginate", { pageSize: this.pageSize, pageNumber });
        },
    },
}