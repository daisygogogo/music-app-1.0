<template>
  <transition name="slide_animation">
    <div class="singer_detail">{{singer.avatar}}</div>
  </transition>
</template>

 <script>
 import {mapGetters} from 'vuex'
export default {
  computed:{
      ...mapGetters([
      'singer',
    ])
  }
};
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

 .slide_animation-enter-to{
    transform: translate3d(0, 0, 0);
 }
 .slide_animation-enter-active, .slide_animation-leave-active {
   transition: all 0.3s;
 }

 .slide_animation-enter, .slide_animation-leave-to {
   transform: translate3d(100%, 0, 0);
 }
</style>