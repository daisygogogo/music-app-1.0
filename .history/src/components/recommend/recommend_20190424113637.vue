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
      <h1>热门歌单推荐</h1>>
      <song-catalog></song-catalog>
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
        }
      });
    }
  }
};
</script>

 <style scoped lang="stylus">
 .recommend{
   .recommend-content{
     .slider-wrapper{
       overflow: hidden;
     }
   }
 }
</style>
