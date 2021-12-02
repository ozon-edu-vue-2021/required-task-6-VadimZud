export default {
    data() {
        return {
            infScrollable: true,
            infScrollTriggerOffset: 0,
        };
    },
    created() {
        this.infScrollObserver = new IntersectionObserver(
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
            if (this.infScrollable) {
                this.$nextTick(() => {
                    const triggerIndex = this.rows.length - this.infScrollTriggerOffset;
                    if (triggerIndex > 0) {
                        const target = this.$el.querySelector(`tbody tr:nth-child(${triggerIndex})`);
                        if (target) {
                            this.infScrollObserver.observe(target);
                        }
                    }
                });
            }
        },
        infScrollable() {
            if (!this.infScrollable) {
                this.infScrollObserver.disconnect();
            }
        }
    },
}