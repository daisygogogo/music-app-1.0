<template>
  <transition name="slide_animation">
    <div class="singer_detail">
      <div class="singer_avatar" :style="{backgroundImage:'url(' + singer.avatar +')'}"></div>
    </div>
  </transition>
</template>

 <script>
 import {mapGetters} from 'vuex'
 import { getSingerDetail } from "api/singer";
 import { ERR_OK } from "api/config";
export default {
  created(){
    this._getDetail();
  },
  computed:{
      ...mapGetters([
      'singer',
    ])
  },
  methods:{
    _getDetail(){
      if(!this.singer.id){
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then((res) =>{
         if (res.code == ERR_OK) {
           this.songList = res.data.list;
         }
      })
    }
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
   .singer_avatar{
     width:100%;
     padding-top:70%;
     background-repeat:no-repeat;
     background-size:cover;
   }
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