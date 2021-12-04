export default {
    data() {
        return {
            virtualScrollable: true,
            virtualScrollStartIndex: 0,
            virtualScrollKeyOffset: 0,
            virtualScrollFillerSize: 0,
        };
    },
    created() {
        this.virtualScrollUpObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (this.ignoreUp) {
                            this.ignoreUp = false;
                            return;
                        }
                        observer.disconnect();
                        this.virtualScrollDownObserver.disconnect();
                        this.ignoreDown = true;
                        const move = this.virtualScrollSizeToStart < this.virtualScrollMoveSize ?
                            this.virtualScrollSizeToStart : this.virtualScrollMoveSize;
                        this.virtualScrollStartIndex -= move;
                        this.virtualScrollKeyOffset = (this.virtualScrollWindowSize + this.virtualScrollKeyOffset - move) % this.virtualScrollWindowSize;
                        this.virtualScrollFillerSize -= this.virtualScrollRowHeight * move;
                        this.virtualScrollObserveTrigger();
                        return;
                    } else {
                        this.ignoreUp = false;
                    }
                })
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0,
            },
        );

        this.virtualScrollDownObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (this.ignoreDown) {
                            this.ignoreDown = false;
                            return;
                        }
                        observer.disconnect();
                        this.virtualScrollUpObserver.disconnect();
                        this.ignoreUp = true;
                        const move = this.virtualScrollSizeToEnd < this.virtualScrollMoveSize ?
                            this.virtualScrollSizeToEnd : this.virtualScrollMoveSize;
                        this.virtualScrollStartIndex += move;
                        this.virtualScrollKeyOffset = (this.virtualScrollKeyOffset + move) % this.virtualScrollWindowSize;
                        this.virtualScrollFillerSize += this.virtualScrollRowHeight * move;
                        this.virtualScrollObserveTrigger();
                        return;
                    } else {
                        this.ignoreDown = false;
                    }
                })
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0,
            },
        )
    },
    mounted() {
        this.virtualScrollObserveTrigger();
    },
    computed: {
        virtualScrollTriggerOffset() {
            return Math.floor(this.virtualScrollBufferSize / 2);
        },
        virtualScrollMoveSize() {
            return Math.floor(this.virtualScrollTriggerOffset / 2);
        },
        virtualScrollEndIndex() {
            return this.virtualScrollStartIndex + this.virtualScrollWindowSize;
        },
        virtualScrollRows() {
            return this.rows.slice(this.virtualScrollStartIndex, this.virtualScrollEndIndex);
        },
        virtualScrollSizeToStart() {
            return this.virtualScrollStartIndex;
        },
        virtualScrollSizeToEnd() {
            return this.rows.length - this.virtualScrollEndIndex;
        },
        virtualScrollWindowSize() {
            return this.virtualScrollStartSize + this.virtualScrollBufferSize;
        },
    },
    methods: {
        virtualScrollObserveTrigger() {
            this.$nextTick(() => {
                if (this.virtualScrollStartIndex > 0) {
                    let triggerUpIndex = this.virtualScrollTriggerOffset + 1;
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerUpIndex})`);
                    if (target) {
                        this.virtualScrollUpObserver.observe(target);
                    }
                }
                if (this.virtualScrollEndIndex < this.rows.length) {
                    let triggerDownIndex = this.virtualScrollWindowSize - this.virtualScrollTriggerOffset + 1;
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerDownIndex})`);
                    if (target) {
                        this.virtualScrollDownObserver.observe(target);
                    }
                }
            });
        },
        virtualScrollGetKey(row, index) {
            return (index + this.virtualScrollKeyOffset) % this.virtualScrollWindowSize;
        }
    },
    watch: {
        virtualScrollable() {
            if (this.virtualScrollable) {
                this.virtualScrollStartIndex = 0;
                this.virtualScrollKeyOffset = 0;
                this.virtualScrollFillerSize = 0;
                this.virtualScrollObserveTrigger();
            } else {
                this.virtualScrollUpObserver.disconnect();
                this.virtualScrollDownObserver.disconnect();
            }
            if (this.infScrollable) {
                this.infScrollObserveTrigger();
            }
        },
        rows() {
            if (this.virtualScrollable) {
                this.virtualScrollUpObserver.disconnect();
                this.virtualScrollDownObserver.disconnect();
                this.virtualScrollObserveTrigger();
            }
        },
        virtualScrollStartIndex() {
            if (this.virtualScrollable && this.infScrollable) {
                this.infScrollObserveTrigger();
            }
        },
        virtualScrollWindowSize() {
            if (this.virtualScrollable && this.infScrollable) {
                this.infScrollObserveTrigger();
            }
        },
    }
}