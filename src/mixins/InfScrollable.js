export default {
    data() {
        return {
            infScrollable: true,
            infScrollTriggerOffset: 0,
        };
    },
    created() {
        this.observer = new IntersectionObserver(
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
        rows() {
            this.$nextTick(() => {
                const triggerIndex = this.rows.length - this.infScrollTriggerOffset;
                if (triggerIndex > 0) {
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerIndex})`);
                    if (target) {
                        this.observer.observe(target);
                    }
                }
            });
        },
    },
}