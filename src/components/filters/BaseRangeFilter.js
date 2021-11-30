import BaseFilter from "./BaseFilter";
export default {
    extends: BaseFilter,
    props: {
        sep: {
            type: String,
            default: ":",
        }
    },
    computed: {
        filterComponents() {
            return this.filter.split(this.sep);
        },
        left() {
            return this.filterComponents[0];
        },
        right() {
            return this.filterComponents[1];
        },
    },
    methods: {
        setLeft(left) {

            this.emitFilter(left || this.right ? `${left}:${this.right}` : "");
        },
        setRight(right) {
            this.emitFilter(this.left || right ? `${this.left}:${right}` : "");
        },
    },
}