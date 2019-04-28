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
        <li class="item" v-for="(item, index) in discList" :key="index">
          <div class="media">
            <img class="image" :src="item.picUrl">
            <span class="listen_count">
              <i class="icon_listen"></i>
              {{item.accessnum | million}}
            </span>
            <span class="icon_play"></span>
            
          </div>
          
          <h2 class="desc">{{item.songListDesc}}</h2>
          <h2 class="author">{{item.songListAuthor}}</h2>
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
          accessnum: 10032140,
          album_pic_mid: "",
          id: "2646688496",
          picUrl:
            "http://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/300?n=1",
          pic_mid: "00333So02drvak",
          songListAuthor: "金青松",
          songListDesc: "催泪大杀器！盘点演唱会经典万人大合唱"
        },
        {
          accessnum: 678848,
          album_pic_mid: "",
          id: "1144416825",
          picUrl:
            "http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1",
          pic_mid: "0013j8zs1jRnLQ",
          songListAuthor: "风吹草地",
          songListDesc: "纳尼？这些华语歌手竟然会唱日语歌！"
        }
      ]
    };
  },
  created() {
    // this._getRecommend();
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
  filters:{
    million:function(value){
      console.log(value)
      if(value >= 10000){
        return (Math.floor(value/1000)/10) + 'W';
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

     .item {
       display: inline-block;
       width: 45vw;

      .media{
        position:relative;
        margin-bottom: 5px;
        color:#fff;
        font-size:10px;
        &:before{
          content: "";
          display: block;
          padding-top: 100%;
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
        .listen_count{
          position:absolute;
          left:7px;
          bottom:7px;
          z-index:2;
          .icon_listen{
            width:10px;
            height:10px;
            background-image:url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=2592000&v=bf901360b97d78b972786e4e8ece5218');
            background-repeat :no-repeat;
            background-size: 24px 60px;
          }
        }
      }

       .desc {
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         margin:4px 0;
       }
     }
   }
 }
</style>
