<template>
  <transition name="slide_animation">
    <div class="singer_detail">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="title">{{title}}</div>
      <div class="singer_avatar" :style="{backgroundImage:'url(' + musicImage +')'}" ref="singerTop">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
        <div class="filter"></div>
      </div>
      <div class="music_list_bg"></div>
      <scroll class="music_list-wrapper" ref="musicListWrapper" 
      listenScroll="true"
      @scroll="scroll"
      probeType="3"
      >
      <ul class="music_list" :style="{transform:'translate3d(0,' + bgTransform + 'px, 0)'}">
              
        <li class="list_item" v-for="song in songList" :key="song.id">
          <div class="item_right">
            <h1 class="item_right_songname">{{song.name}}</h1>
            <p class="item_right_singername">{{song.singer}}</p>
          </div>
        </li>
          </ul>   
      </scroll>
 

    </div>
  </transition>
</template>

 <script>
 import Scroll from "base/scroll/scroll";
 const RESERVE_HEIGHT = 30; //顶部title的高度

export default {
  data(){
    return{
      topPartHeight:0, //顶部image 区域高度
      bgTransform:0, //歌曲列表底部的背景层，用于制作上滚效果
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    musicImage: {
      type: String,
      default: ""
    },
    songList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {},
  mounted(){
    let self = this;
    this.$nextTick(() =>{
      let topPartHeight = self.$refs.singerTop.clientHeight;
      this.topPartHeight = topPartHeight;
      self.$refs.musicListWrapper.$el.style.top = topPartHeight + 'px'
    })
  },
  components:{
    Scroll
  },
  methods:{
    scroll(e){
      if(this.topPartHeight + e.y > RESERVE_HEIGHT ){
        this.bgTransform = -e.y;
      }
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

   .back {
     position: absolute;
     top: 0;
     left: 6px;
     z-index: 50;

     .icon-back {
       display: block;
       padding: 10px;
       font-size: 22px;
       color: #ffcd32;
     }
   }

   .title {
     position: absolute;
     top: 0;
     left: 10%;
     z-index: 40;
     width: 80%;
     text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
     text-align: center;
     line-height: 40px;
     font-size: 18px;
     color: #fff;
   }

   .singer_avatar {
     position: relative;
     width: 100%;
     padding-top: 70%;
     background-repeat: no-repeat;
     background-size: cover;

     .filter {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(7, 17, 27, 0.4);
     }

     .play-btn {
       color: #ffcd32;
       font-size: 12px;
       height: 32px;
       line-height: 32px;
       text-align: center;
       z-index: 50;
       position: absolute;
       left: 50%;
       bottom: 20px;
       border: 1px solid #ffcd32;
       padding-left: 15px;
       padding-right: 15px;
       transform: translateX(-50%);
       border-radius: 32px;
       box-sizing: border-box;

       .icon-play {
         display: inline-block;
         vertical-align: middle;
         margin-right: 6px;
         font-size: 16px;
       }
     }
   }
 }

 .music_list_bg{
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
  background-color :#222;
 }

.music_list-wrapper{
  position:absolute;
  top:0;
  bottom:0;
  width:100%;
   .music_list {
   padding-top: 30px;
   margin-right: 10px;
   margin-left: 30px;
   font-size: 14px;

   .list_item {
     display: flex;
     margin-bottom:20px;

     .item_right {
       flex: 1;
       line-height: 20px;
       overflow: hidden;

       .item_right_songname {
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
         color: #fff;
       }

       .item_right_singername {
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
         margin-top: 4px;
         color: hsla(0, 0%, 100%, 0.3);
       }
     }
   }
 }
}

</style>