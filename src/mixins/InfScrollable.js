export default {
    data() {
        return {
            infScrollable: true,

            infScrollViewportHeight: 0,
            infScrollBottomPosition: 0,
        };
    },
    created() {
        this.infScrollUpdateViewportHeight();
        this.infScrollUpdateCurrentPosition();
        window.addEventListener("resize", this.infScrollUpdateViewportHeight);
        if (this.infScrollable) {
            this.infScrollBottomAnchor = document.querySelector("#infScrollBottomAnchor");
            this.infScrollUpdateBottomPosition();
            window.addEventListener("scroll", this.infScrollUpdateCurrentPosition);
            window.addEventListener("resize", this.infScrollUpdateBottomPosition);
        }
    },
    unmounted() {
        window.removeEventListener("resize", this.infScrollUpdateViewportHeight);
        if (this.infScrollable) {
            window.removeEventListener("scroll", this.infScrollUpdateCurrentPosition);
            window.removeEventListener("resize", this.infScrollUpdateBottomPosition);
        }
    },
    methods: {
        infScrollUpdateViewportHeight() {
            this.infScrollViewportHeight = document.documentElement.clientHeight;
        },
        infScrollUpdateBottomPosition() {
            this.infScrollBottomPosition = this.infScrollBottomAnchor.getBoundingClientRect().top + window.pageYOffset;
        },
        infScrollUpdateCurrentPosition() {
            const currentPosition = window.pageYOffset;
            const viewportHeight = this.infScrollViewportHeight;
            const bottomPosition = this.infScrollBottomPosition;
            const triggerOffset = this.infScrollTriggerOffset;

            if ((bottomPosition - currentPosition - viewportHeight) < triggerOffset) {
                this.updateData(true);
            }
        },
    },
    watch: {
        infScrollable() {
            if (this.infScrollable) {
                this.$nextTick(() => {
                    this.infScrollBottomAnchor = document.querySelector("#infScrollBottomAnchor");
                    this.infScrollUpdateBottomPosition();
                    window.addEventListener("scroll", this.infScrollUpdateCurrentPosition);
                    window.addEventListener("resize", this.infScrollUpdateBottomPosition);
                });
            } else {
                window.removeEventListener("scroll", this.infScrollUpdateCurrentPosition);
                window.removeEventListener("resize", this.infScrollUpdateBottomPosition);
            }
        },
        rows() {
            if (this.infScrollable) {
                this.$nextTick(() => {
                    this.infScrollUpdateBottomPosition();
                });
            }
        }
    },
}
