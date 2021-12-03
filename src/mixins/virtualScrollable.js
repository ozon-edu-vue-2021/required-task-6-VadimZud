export default {
    data() {
        return {
            virtualScrollable: true,
            virtualScrollStartIndex: 0,
            virtualScrollWindowSize: 0,
            virtualScrollWindowInited: false,
            virtualScrollKeyOffset: 0,
        };
    },
    created() {
        this.virtualScrollWindowSize = this.virtualScrollInitStartSize;
        this.virtualScrollInitObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    observer.disconnect();
                    if (entry.isIntersecting) {
                        this.virtualScrollWindowSize += this.virtualScrollInitStepSize;
                        if (this.virtualScrollWindowSize < this.rows.length) {
                            this.virtualScrollObserveInitTrigger();
                        }
                    } else {
                        this.virtualScrollWindowInited = true;
                        this.virtualScrollWindowSize += this.virtualScrollBufferSize;
                        if (this.virtualScrollWindowSize < this.rows.length) {
                            this.virtualScrollObserveTrigger();
                        }
                    }
                    return;
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0,
            },
        );

        this.virtualScrollUpObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (this.virtualScrollUpStartDetect) {
                            observer.disconnect();
                            this.virtualScrollDownObserver.disconnect();
                            this.virtualScrollUpStartDetect = false;
                            const move = this.virtualScrollSizeToStart < this.virtualScrollMoveSize ?
                                this.virtualScrollSizeToStart : this.virtualScrollMoveSize;
                            this.virtualScrollStartIndex -= move;
                            this.virtualScrollKeyOffset = (this.virtualScrollWindowSize + this.virtualScrollKeyOffset - move) % this.virtualScrollWindowSize;
                            this.virtualScrollObserveTrigger();
                            return;
                        }
                    } else {
                        this.virtualScrollUpStartDetect = true;
                    }
                })
            }
        );

        this.virtualScrollDownObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        this.virtualScrollUpObserver.disconnect();
                        const move = this.virtualScrollSizeToEnd < this.virtualScrollMoveSize ?
                            this.virtualScrollSizeToEnd : this.virtualScrollMoveSize;
                        this.virtualScrollStartIndex += move;
                        this.virtualScrollKeyOffset = (this.virtualScrollKeyOffset + move) % this.virtualScrollWindowSize;
                        this.virtualScrollObserveTrigger();
                        return;
                    }
                })
            }
        )
    },
    mounted() {
        this.virtualScrollObserveInitTrigger();
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
    },
    methods: {
        virtualScrollObserveInitTrigger() {
            this.$nextTick(() => {
                const target = this.$el.querySelector(`tbody tr:nth-child(${this.virtualScrollWindowSize})`);
                if (target) {
                    this.virtualScrollInitObserver.observe(target);
                }
            });
        },
        virtualScrollObserveTrigger() {
            this.$nextTick(() => {
                if (this.virtualScrollStartIndex > 0) {
                    let triggerUpIndex = this.virtualScrollStartIndex + this.virtualScrollTriggerOffset;
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerUpIndex})`);
                    if (target) {
                        this.virtualScrollUpObserver.observe(target);
                    }
                }
                if (this.virtualScrollEndIndex < this.rows.length) {
                    let triggerDownIndex = this.virtualScrollEndIndex - this.virtualScrollTriggerOffset;
                    const target = this.$el.querySelector(`tbody tr:nth-child(${triggerDownIndex})`);
                    if (target) {
                        this.virtualScrollDownObserver.observe(target);
                    }
                }
            });
        },
        virtualScrollGetKey(row, index) {
            console.log((index + this.virtualScrollKeyOffset) % this.virtualScrollWindowSize);
            return (index + this.virtualScrollKeyOffset) % this.virtualScrollWindowSize;
        }
    },
    watch: {
        virtualScrollable() {
            if (this.virtualScrollable) {
                this.virtualScrollStartIndex = 0;
                this.virtualScrollKeyOffset = 0;
                this.virtualScrollWindowSize = this.virtualScrollInitStartSize;
                this.virtualScrollWindowInited = false;
                this.virtualScrollObserveInitTrigger();
            } else {
                this.virtualScrollInitObserver.disconnect();
                this.virtualScrollUpObserver.disconnect();
                this.virtualScrollDownObserver.disconnect();
            }
        },
        rows() {
            if (this.virtualScrollable) {
                this.virtualScrollInitObserver.disconnect();
                this.virtualScrollUpObserver.disconnect();
                this.virtualScrollDownObserver.disconnect();
                if (this.virtualScrollWindowInited) {
                    this.virtualScrollObserveTrigger();
                } else {
                    this.virtualScrollObserveInitTrigger();
                }

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