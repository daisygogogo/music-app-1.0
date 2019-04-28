<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div class="dot" v-for="(item,index) in dots" :class="currentIndex==index?'active':''" :key="index"></div>
    </div>
  </div>
</template>

 <script>
import addClass from "common/js/addClass";
import { setTimeout } from "timers";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      dots: [],
      currentIndex: 0,
      timer: null
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initBScroll();
      if (this.autoPlay) {
        this._handleAutoPlay();
      }
    }, 20);

    window.addEventListener("resize", () => {
      if (!this.scroll) {
        return;
      }
      this._setSliderWidth(true);
      this.scroll.refresh();
    });
  },
  methods: {
    _setSliderWidth(isResize) {
      let sliderWidth = this.$refs.slider.clientWidth;
      this.children = this.$refs.sliderGroup.children;

      let width = 0;

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initBScroll() {
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 滚动动画
        snap: {
          loop: this.loop,
          threshold: 0.3
        }
      });

      this.scroll.on("scrollEnd", () => {
        let pageIndex = this.scroll.getCurrentPage().pageX;
        this.currentIndex = pageIndex;
        if (this.autoPlay) {
          this._handleAutoPlay();
        }
      });

      this.scroll.on("touchEnd", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });

      this.scroll.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _handleAutoPlay() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.scroll.next();
      }, this.interval);
    }
  },
  destroyed(){
    clearTimeout(this.timer);
  }
};
</script>

 <style scoped lang="stylus">
 .slider {
   min-height: 1px;
   position: relative;

   .slider-group {
     width: 100%;
     overflow: hidden;
     widte-space: nowrap;

     .slider-item {
       float: left;
       box-sizing: border-box;
       overflow: hidden;
       text-align: center;

       a {
         display: block;
         width: 100%;
         overflow: hidden;
         text-decoration: none;
       }

       img {
         display: block;
         width: 100%;
       }
     }
   }

   .dots {
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
     bottom: 20px;

     .dot {
       display: inline-block;
       width: 8px;
       height: 8px;
       background-color: rgba(0, 0, 0, 0.6);
       border-radius: 50%;
       margin-right: 12px;

       &:nth-last-child() {
         margin-right: 0;
       }

       &.active {
         width: 16px;
         border-radius: 4px;
         background-color: white;
       }
     }
   }
 }
</style>