import Vue from "vue"

export default {
    data() {
        return {
            sorts: {},
            sortsOrder: [],
        };
    },
    methods: {
        updateSorts({ sort, column }) {
            if (sort === "no") {
                if (column in this.sorts) {
                    Vue.delete(this.sorts, column);
                    Vue.delete(this.sortsOrder, this.sortsOrder.indexOf(column));
                }
            } else {
                if (!(column in this.sorts)) {
                    this.sortsOrder.push(column);
                } else {
                    Vue.delete(this.sorts, column);
                }
                Vue.set(this.sorts, column, sort);
            }
        }
    }
}