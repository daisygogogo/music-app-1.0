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
      sliderList: [], //轮播图
      discList: [
        {
          albumImg:
            "http://p.qpic.cn/music_cover/mOO9VVKnvAo2xMSqZ1omA7hyTEnRPkhpUEA35uic4k4yvPW2r6rEQDg/600?n=1",
          songTitle: "老年歌单第一人",
          albumDesc: "滚石KTV：演唱会现场"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/AhbCa0vazSRDjEJhYwthgiaicOJR0gBcgGibPlRJK7Vy2fsSWQ9EQcOyQ/600?n=1",
          songTitle: "鹿仁",
          albumDesc: "校园广播站 • 经典励志曲"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/Hepa6V8aXWj4x9UyxSztnc74e5W9icVvWVaZL8SF7Oy8UEhQbGFnqNg/600?n=1",
          songTitle: "★、╰︶",
          albumDesc: "日系恋爱 · 情侣间的情愫蜜语"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/aaxX4Babic4VicBPicJOwr5xupbyiczur0XBjaAJbTzc8bBf6d8Ts0E5Vg/600?n=1",
          songTitle: "Music Fans",
          albumDesc: "Psy Trance｜虚空浮现的异境魔音"
        }
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
          console.log(this.sliderList);
        }
      });
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
    text-align:center;
    color:$color-theme；
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
