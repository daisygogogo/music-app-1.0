<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

 <script>
import addClass from "common/js/addClass";
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
    this.$nextTick(() =>{
      this._setSliderWidth();
    })
  },
  mehtods: {
    _setSliderWidth() {
      let sliderWidth = this.$refs.slider.clientWidth;
      let childern = this.$refs.sliderGroup.childern;
      let width = 0;

      for (let i = 0; i < childern.length; i++) {
        let child = childern[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }

      if (this.loop) {
        width += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
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