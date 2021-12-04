import BaseSorter from "./BaseSorter"

const nextSort = {
    no: "inc",
    inc: "dec",
    dec: "no",
};

export default {
    extends: BaseSorter,
    methods: {
        switchSort() {
            this.emitSort(nextSort[this.sort]);
        }
    }
}