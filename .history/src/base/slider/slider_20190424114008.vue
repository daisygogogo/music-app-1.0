<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

 <script>
import addClass from "common/js/addClass";
import { setTimeout } from 'timers';
import BScroll from 'better-scroll'
export default {
  data() {
    return {};
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
    setTimeout(() =>{
      this._setSliderWidth();
      this._initBScroll();
    },20)
  },
  methods: {
    _setSliderWidth() {
      let sliderWidth = this.$refs.slider.clientWidth;
      let dhildren = this.$refs.sliderGroup.children;
      console.log('childre',dhildren)
      let width = 0;

      for (let i = 0; i < dhildren.length; i++) {
        let child = dhildren[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }

      if (this.loop) {
        width += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initBScroll(){ 
      this.scroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY:false,
          loop:this.loop,
          snap:true
        })
    }
  }
};
</script>

 <style scoped lang="stylus">
 .slider {
   min-height: 1px;

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
 }
</style>