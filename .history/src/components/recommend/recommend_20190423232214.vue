<template>
  <div class="recommend">
    <div class="recomment-content">
      <div class="slider-wrapper" ref="sliderWrapper">
        <ul>
          <li v-for="item in sliderList" :key="item.id">
            <img :src="item.picUrl"> 
          </li>
        </ul>
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
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      sliderList:[], //轮播图
    }
  },
  created() {
    this._getRecommend();
  },
  components: {
    SongCatalog
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        //getRecommend返回一个promise，所以在then里面，我们就可以获得值
        if (res.code == ERR_OK) {
          this.sliderList = res.data.slider;
          // better-scroll的初始化
          this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.sliderWrapper, {
              scrollX: true,
              scrollY: false,
            })
          })
        
        }
      });
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>
