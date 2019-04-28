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
          <img class="image" :src="item.albumImg">
          <div class="desc-wrapper">
            <h1 class="name">{{item.songTitle}}</h1>
            <p class="desc">{{item.albumDesc}}</p>
          </div>
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
      sliderList: [] //轮播图
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
          console.log(this.sliderList);
        }
      });
    }
  }
};
</script>

 <style scoped lang="stylus">
 .recommend {
   .recomment-content {
     .slider-wrapper {
       overflow: hidden;
     }
   }

   .title {
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
