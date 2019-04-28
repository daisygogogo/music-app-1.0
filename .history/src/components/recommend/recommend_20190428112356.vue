<template>
  <div class="recommend">
    <div class="recomment-content">
      <div v-if="sliderList.length" class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <div v-for="item in sliderList" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <h1 class="title">热门歌单推荐</h1>
      <!-- <ul class="recommend-list">
        <li class="item" v-for="(item, index) in discList" :key="index">
          <img class="image" :src="item.albumImg">
          <div class="desc-wrapper">
            <h1 class="name">{{item.songTitle}}</h1>
            <p class="desc">{{item.albumDesc}}</p>
          </div>
        </li>
      </ul>-->
      <ul class="hot-list">
        <li v-for="(item, index) in discList" :key="index">
          <a class="item" href="javascript:;">
            <div class="media">
              <img class="image" :src="item.picUrl">
              <span class="listen_count">
                <i class="icon icon_listen"></i>
                {{item.accessnum | million}}
              </span>
              <span class="icon icon_play"></span>
            </div>

            <h2 class="desc">{{item.songListDesc}}</h2>
            <h2 class="author">{{item.songListAuthor}}</h2>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SongCatalog from "components/songCatalog/songCatalog";
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import BScroll from "better-scroll";
import Slider from "base/slider/slider";
export default {
  data() {
    return {
      sliderList: [], //轮播图
      discList: [
      ]
    };
  },
  created() {
    this._getRecommend();
  },
  components: {
    SongCatalog,
    Slider
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        //getRecommend返回一个promise，所以在then里面，我们就可以获得值
        if (res.code == ERR_OK) {
          this.sliderList = res.data.slider;
          this.discList = res.data.songList;
        }
      });
    }
  },
  filters: {
    million: function(value) {
      console.log(value);
      if (value >= 10000) {
        return Math.floor(value / 1000) / 10 + "W";
      }
      return value;
    }
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .recommend {
   .recomment-content {
     .slider-wrapper {
       overflow: hidden;
     }
   }

   .title {
     font-weight: bold;
     height: 48px;
     line-height: 48px;
     text-align: center;
     color: $color-theme;
     margin-top: 6px;
   }

   .hot-list {
     display: flex;
     justify-content: space-evenly;
     font-size: 14px;
     font-weight: 400;
     flex-wrap: wrap;

     .item {
       display: inline-block;
       width: 45vw;
       color: #fff;
       margin-top:10px;

       .media {
         position: relative;
         margin-bottom: 5px;  
         font-size: 10px;

         &:before {
           content: '';
           display: block;
           padding-top: 100%;
         }

         &:after {
           position: absolute;
           content: ' ';
           left: 0;
           bottom: 0;
           width: 100%;
           height: 42px;
           background-image: url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/shadow_rp.png?max_age=2592000&v=1421e030144559ad213fe587f5bf3e52');
           background-size: 1px 42px;
           background-repeat: repeat-x;
           z-index: 2;
         }

         .image {
           width: 100%;
           position: absolute;
           top: 0;
           left: 0;
           display: block;
           width: 100%;
           z-index: 1;
         }

         .listen_count {
           position: absolute;
           left: 7px;
           bottom: 7px;
           z-index: 3;
           line-height: 12px;
         }

         .icon {
           background-image: url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218');
           background-repeat: no-repeat;
           background-size: 24px 60px;
           display: inline-block;

           &.icon_listen {
             width: 10px;
             height: 10px;
             background-position: 0 -50px;
             margin-right: 5px;
           }

           &.icon_play {
             z-index: 3;
             display: inline-block;
             position: absolute;
             right: 5px;
             bottom: 5px;
             height: 24px;
             width: 24px;
             background-position: 0 0;
           }
         }
       }

       .desc {
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         margin: 4px 0;
       }
     }
   }
 }
</style>
