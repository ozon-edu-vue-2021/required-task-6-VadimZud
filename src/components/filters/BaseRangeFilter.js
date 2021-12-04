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
        range() {
            let [left, right] = this.filter.split(this.sep);
            if (left === undefined) {
                left = "";
            }
            if (right === undefined) {
                right = "";
            }
            return [left, right];
        },
        left() {
            return this.range[0];
        },
        right() {
            return this.range[1];
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