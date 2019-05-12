<template>
  <transition name="slide">
    <div class="singer_detail">singer-detail</div>
  </transition>
</template>

 <script>
export default {};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .singer_detail {
   position: fixed;
   left: 0;
   top: 0;
   min-height: 100vh;
   width: 100%;
   z-index: 100;
   background-color: $color-background;
   opacity: 1;
 }

 .slide-enter-active, .slide-leave-active {
   transition: all 0.3s;
 }

 .slide-enter, .slide-leave-to {
   transform: translate3d(100%, 0, 0);
 }
</style>