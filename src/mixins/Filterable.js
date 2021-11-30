import Vue from "vue"

export default {
    data() {
        return {
            filters: {},
        };
    },
    methods: {
        updateFilters({ filter, column }) {
            if (filter) {
                Vue.set(this.filters, column, filter);
            } else {
                Vue.delete(this.filters, column);
            }
        }
    }
}