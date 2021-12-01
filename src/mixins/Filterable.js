import Vue from "vue"

export default {
    data() {
        return {
            filters: {},
        };
    },
    methods: {
        updateFilters({ filter, column }) {
            Vue.delete(this.filters, column);
            if (filter) {
                Vue.set(this.filters, column, filter);
            }
        }
    }
}