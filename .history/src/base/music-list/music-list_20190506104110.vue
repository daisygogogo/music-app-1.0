<template>
  <transition name="slide_animation">
    <div class="singer_detail">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="title">{{title}}</div>
      <div class="singer_avatar" :style="{backgroundImage:'url(' + musicImage +')'}">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
        <div class="filter"></div>
      </div>
      <ul class="music_list" v-if="songList.length">
        <li class="list_item" v-for="song in songList" :key="song.id">
          <div class="item_right">
            <h1 class="item_right_songname">{{song.name}}</h1>
            <p class="item_right_singername">{{song.singer}}</p>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

 <script>
export default {
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
  created() {}
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
</style>