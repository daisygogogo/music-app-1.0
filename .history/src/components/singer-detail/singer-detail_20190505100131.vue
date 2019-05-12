<template>
<transition name="move">
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

.move-enter-active, .move-leave-active {
    transition: all 0.3s linear;
    transform: translate3d(0, 0, 0);
  }

 .move-enter, .move-leave-to{
   transform: translate3d(100%, 0, 0);
 }
</style>