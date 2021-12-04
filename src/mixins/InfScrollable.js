export default {
    data() {
        return {
            infScrollable: true,
        };
    },
    created() {
        this.infScrollObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        this.updateData(true);
                        return;
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0,
            }
        );
    },
    methods: {
        infScrollObserveTrigger() {
            this.$nextTick(() => {
                let triggerIndex = this.rows.length - this.infScrollTriggerOffset;
                let lastIndex = this.rows.length
                if (this.virtualScrollable) {
                    triggerIndex -= this.virtualScrollStartIndex + 1;
                    lastIndex -= this.virtualScrollStartIndex + 1;
                }
                if (triggerIndex > 0 && (!this.virtualScrollable || triggerIndex <= this.virtualScrollWindowSize + 1)) {
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerIndex})`);
                    if (target) {
                        this.infScrollObserver.observe(target);
                    }
                }

                if (lastIndex > 0 && (!this.virtualScrollable || lastIndex <= this.virtualScrollWindowSize + 1)) {
                    const target = this.$el.querySelector(`tbody tr:nth-child(${lastIndex})`);
                    if (target) {
                        this.infScrollObserver.observe(target);
                    }
                }
            });
        }
    },
    watch: {
        rows() {
            if (this.infScrollable) {
                this.infScrollObserveTrigger();
            }
        },
        infScrollable() {
            if (!this.infScrollable) {
                this.infScrollObserver.disconnect();
            }
        }
    },
}