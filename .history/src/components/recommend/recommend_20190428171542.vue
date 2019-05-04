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
      <ul class="recommend-list">
        <li class="item" v-for="(item, index) in discList" :key="index">
          <img class="image" v-lazy="item.picUrl">
          <div class="desc-wrapper">
            <h1 class="name">{{item.songListAuthor}}</h1>
            <p class="desc">{{item.songListDesc}}</p>
          </div>
        </li>
      </ul>
      <loading v-if="!discList.length"></loading>
      <!-- <ul class="hot-list">
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
      </ul>-->
    </div>
  </div>
</template>

<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import BScroll from "better-scroll";
import Slider from "base/slider/slider";
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      sliderList: [], //轮播图
      discList: []
    };
  },
  created() {
    this._getRecommend();
  },
  components: {
    Slider,
    Loading
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        //getRecommend返回一个promise
        if (res.code == ERR_OK) {
          this.sliderList = res.data.slider;
          this.discList = res.data.songList;
        }
      });
    }
  },
  filters: {
    million: function(value) {
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

   .recommend-list {
     .item {
       display: flex;
       padding: 15px;

       .image {
         width: 50px;
         height: 50px;
         margin-right: 15px;
       }

       .desc-wrapper {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         font-size: $font-size-medium;

         .name {
           font-weight: bold;
         }

         .desc {
           color: $color-text-d;
         }
       }
     }
   }
 }
</style>
