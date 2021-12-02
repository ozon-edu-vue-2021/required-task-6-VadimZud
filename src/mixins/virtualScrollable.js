export default {
    data() {
        return {
            virtualScrollable: true,
            virtualScrollStartIndex: 0,
        };
    },
    created() {
        this.virtualScrollObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        this.updateData(true);
                        return;
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1,
            }
        );
    },
    watch: {

    }
}