<template>
  <div class="player" v-show="playList.length>0">
    <!-- 正常播放大小 -->
    <transition name="normal"
      @enter="onEnter",
      @after-enter="afterEnter"
      @leave="onLeave"
      @after-leave="afterLeave"
    >
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
        <div class="top">
          <div class="back" @click="showMiniPlayer">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd">
              <img class="img" :src="currentSong.image">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">谁被我遗忘</div>
          </div>
        </div>
        <div class="middle-r"></div>
      </div>
      <!--底部区域-->
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>
        <!--进度条-->
        <div class="progress-wrapper">
          <span class="time time-l">2:14</span>
          <div class="progress-bar-wrapper">
            <div class="progress-bar"></div>
            <div class="progress-btn-wrapper">
              <div class="progress-btn"></div>
            </div>
          </div>
          <span class="time time-r">4:47</span>
        </div>

        <div class="operators">
          <div class="icon icon-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon icon-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon-center">
            <i :class="playIcon" @click.stop="togglePlay"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>

    <!--缩小底部播放-->
    <div class="mini-player" v-show="!fullScreen">
      <div class="cd-wrapper">
        <img class="img" :src="currentSong.image">
      </div>
      <div class="text">
        <h1 class="text-name">{{currentSong.name}}</h1>
        <h2 class="text-desc">{{currentSong.singer}}</h2>
      </div>
      <div class="control">
        <div class="progress-circle">
          <i class="icon-mini" :class="playIconMini" @click.stop="togglePlay"></i>
        </div>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>

 <script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import animations from 'create-keyframe-animation'

export default {
  computed: {
    ...mapGetters(["playing", "fullScreen", "currentSong","playList"]),
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    playIconMini(){
       return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    }
  },
  methods: {
    onEnter(el,done){ //cd动画
      const {x, y, scale} = this._getPostionAndScale();
      console.log('enter',x,y,scale);
      let animation = {
        '0%':{
          transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        '60%':{
          transform:`translate3d(0,0,0) scale(1.1)`
        },
        '100%':{
          transform:`translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move',done);
    },
    afterEnter(){ 
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = ''; //好习惯，置空animation，已经不需要了
    },
    onLeave(){
      const {x, y, scale} = this._getPostionAndScale(); 
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
    },
    afterLeave(){
      this.$refs.cdWrapper.style.transition = ''; 
      this.$refs.cdWrapper.style.transform ='';
    },
    showMiniPlayer() {
      this.setFullScreen(false);
    },
    ...mapMutations({
      setFullScreen: "SET_FULLSCREEN",
      setPlayState:"SET_PLAYING"
    }),
    _getPostionAndScale(){ //这里计算出来的位置和缩放，是小cd相对于大cd的位置，对于大cd来说，在动画0%的时候，是处于小cd的位置，100%的时候是处于大cd的位置，也就是没有缩放，没有transform
      let miniPaddingLeft = 40;
      let miniPaddingBottom = 30;
      let miniSize = 40;
      
      let normalPaddingLeft = window.innerWidth/2;
      let normalPaddingTop = 80;
      let normalSize = window.innerWidth*0.8;
      
      let scale = miniSize/normalSize;
      let y = window.innerHeight - miniPaddingBottom - normalPaddingTop-normalSize/2;
      let x = -(normalPaddingLeft - miniPaddingLeft);
      return{
        x,
        y,
        scale
      }
      console.log('x',x)
      
    },
    togglePlay(){ //点击播放按钮
      this.setPlayState(!this.playing)
    }
  },
  watch:{
    playing(newVal){
      if(newVal){
        console.log('playing')
        this.$nextTick(() =>{
          this.$refs.audio.play();
        })
      }else{
        console.log('stop')
        this.$refs.audio.stop();
      }
    }
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .normal-player {
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   z-index: 150;
   background: #222;

   .background {
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     right: 0;
     filter: blur(20px);
     opacity: 0.6;
     z-index: -1;
   }

   .top {
     .back {
       position: absolute;
       left: 6px;
       top: 0;
       width: 40px;
       height: 40px;
       color: #ffcd32;
       z-index: 50;

       .icon-back {
         display: block;
         font-size: 22px;
         transform: rotate(-90deg);
         padding: 9px;
       }
     }

     .title {
       width: 70%;
       margin: 0 auto;
       text-align: center;
       height: 40px;
       line-height: 40px;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       font-size: 18px;
       color: #fff;
     }

     .subtitle {
       text-align: center;
       font-size: 14px;
       color: #fff;
       line-height: 20px;
     }
   }

   .middle {
     position: fixed;
     width: 100%;
     top: 80px;
     bottom: 170px;
     white-space: nowrap;
     font-size: 0;

     .middle-l {
       display: inline-block;
       vertical-align: top;
       position: relative;
       width: 100%;
       height: 0;
       padding-top: 80%;

       .cd-wrapper {
         position: absolute;
         left: 10%;
         top: 0;
         width: 80%;
         height: 100%;
         box-sizing: border-box;

         .cd {
           width: 100%;
           height: 100%;

           .img {
             width: 100%;
             height: 100%;
             border-radius: 50%;
             box-sizing: border-box;
             border: 10px solid hsla(0, 0%, 100%, 0.1);
           }
         }
       }

       .playing-lyric-wrapper {
         width: 80%;
         margin: 30px auto 0;
         overflow: hidden;
         text-align: center;

         .playing-lyric {
           font-size: 14px;
           height: 20px;
           line-height: 20px;
           color: hsla(0, 0%, 100%, 0.5);
         }
       }
     }
   }

   .bottom {
     position: absolute;
     bottom: 50px;
     width: 100%;

     .dot-wrapper {
       text-align: center;
       width: 100%;

       .dot {
         width: 8px;
         height: 8px;
         background: hsla(0, 0%, 100%, 0.5);
         margin: 0 4px;
         display: inline-block;
         border-radius: 50%;

         &.active {
           width: 20px;
           color: #fff;
           border-radius: 5px;
           background: hsla(0, 0%, 100%, 0.8);
         }
       }
     }

     .progress-wrapper {
       display: flex;
       width: 80%;
       margin: 0 auto;
       padding: 10px 0;
       align-items: center;

       .time {
         flex: 0 0 30px;
         width: 30px;
         height: 30px;
         line-height: 30px;
         font-size: 12px;
       }

       .time-l {
         text-align: left;
       }

       .time-r {
         text-align: right;
       }

       .progress-bar-wrapper {
         flex: 1;
         height: 4px;
         background: rgba(0, 0, 0, 0.3);
         position: relative;

         .progress-bar {
           width: 185px;
           background-color: #ffcd32;
           height: 100%;
         }

         .progress-btn-wrapper {
           width: 30px;
           height: 30px;
           position: absolute;
           left: -8px;
           top: -13px;
           transform: translateX(185px);
         }

         .progress-btn {
           position: relative;
           top: 7px;
           left: 7px;
           box-sizing: border-box;
           width: 16px;
           height: 16px;
           border: 3px solid #fff;
           border-radius: 50%;
           background: #ffcd32;
         }
       }
     }

     .operators {
       display: flex;
       align-items: center;
       justify-content: space-evenly;
       color: $color-theme;

       .icon {
         font-size: 30px;
       }

       .icon-play {
         font-size: 40px;
       }
       .icon-pause {
         font-size: 40px;
       }
     }
   }
    &.normal-enter-active, &.normal-leave-active{
      transition: all 0.4s;
      .top, .bottom{
        transition: all 0.4s;
      }
    }
    &.normal-enter, &.normal-leave-to{
      opacity:0;
      .top{
        transform:translate3d(0, -100px, 0);
      }
      .bottom{
        transform:translate3d(0, 100px, 0);
      }
    }

 }

 .mini-player {
   position: fixed;
   bottom: 0;
   left: 0;
   height: 60px;
   display: flex;
   width: 100%;
   align-items: center;
   background: #333;
   z-index: 180;

   .cd-wrapper {
     height: 40px;
     width: 40px;
     margin-left: 20px;

     .img {
       height: 100%;
       width: 100%;
       border-radius: 50%;
     }
   }

   .text {
     flex: 1;
     margin-left: 10px;

     .text-name {
       margin-bottom: 2px;
       text-overflow: ellipsis;
       overflow: hidden;
       white-space: nowrap;
       font-size: 14px;
       color: #fff;
     }

     .text-desc {
       text-overflow: ellipsis;
       overflow: hidden;
       white-space: nowrap;
       font-size: 12px;
       color: hsla(0, 0%, 100%, 0.3);
       margin-top: 8px;
     }
   }

   .control {
     font-size: 30px;
     flex: 0 0 30px;
     margin-left: auto;
     color: $color-theme;
     margin-right: 10px;

     .icon-mini {
       margin-right: 12px;
     }
   }
 }
</style>