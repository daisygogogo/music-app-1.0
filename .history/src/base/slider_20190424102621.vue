<template>
  <div class="slider">
    <div class="slider-group">
      <slot></slot>
    </div>
  </div>
</template>

 <script>
export default {
  data(){
    return{
    }
  },
  props:{
    loop:{
        type:Boolean,
        default:true
      },
      autoPlay:{
        type:Boolean,
        default:true
      },
      interval:{
        type:Number,
        default:4000
      }
  }
};
</script>

 <style scoped lang="stylus">
</style>