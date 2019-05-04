<template>
  <div class="singer-wrapper">
    <scroll
      class="singer-scroll"
      ref="singerScroll"
      v-if="singers.length"
      @scroll="scroll"
      :listenScroll="listenScroll"
      :probeType="probeType"
    >
      <div>
        <div
          class="singer-group"
          v-for="(item,index) in singers"
          :key="index + '1'"
          ref="singerGroup"
        >
          <h1 class="title">{{item.title}}</h1>
          <div class="singer" v-for="singer in item.items" :key="singer.id">
            <img width="40" height="40" class="avatar" v-lazy="singer.avatar">
            <span class="name">{{singer.name}}</span>
          </div>
        </div>
      </div>
    </scroll>
    <ul class="right-menu">
      <li
        v-for="(item,index) in shortcutList"
        :key="index"
        :class="index == currentIndex ? 'active':''"
        :data-index="index"
        @touchstart="onShortCutTouchStart"
        @touchmove.stop.prevent="onShortCutTouchMove"
      >{{item}}</li>
    </ul>
    <div class="fiexed_title" v-show="fixedTitle">
      <h1 class="title"
     :style="{transform:`translateY(${transformY}px)`}"
      >{{fixedTitle}}</h1>
    </div>
    <div v-show="!singers.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Singer from "common/js/singer";
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll";
import { getData } from "common/js/dom";
import Loading from 'base/loading/loading'

const HOT_LIST = 10; //hot歌手长度
const HOT_TITLE = "热门";
const ANCHOR_HEIGHT = 18.68; //右侧快速入口，每一项之间的距离，自己根据布局计算而来
const TITLE_HEIGHT = 30; //顶部固定标题栏高度

export default {
  data() {
    return {
      singers: [],
      currentIndex: 0,
      shortCutList: [], //右侧快速入口
      scrollY: -1,
      listHeight: [],
      fixedTitle:'', //顶部固定标题
      diff:-1,
      transformY:0, //顶部固定标题的transform
    };
  },
  components: {
    Scroll,
    Loading
  },
  created() {
    this._getSingerList();
    this.touch = {};
    this.listenScroll = true;
    this.probeType = 3;
  },
  mounted() {
    let self = this;
  },
  methods: {
    _getSingerList() {
      let self = this;
      getSingerList().then(res => {
        if (res.code == ERR_OK) {
          this.singers = this.normalizeSingers(res.data.list);
          this.$nextTick(() => {
            self.$refs.singerScroll.refresh();
            self.getListHeight();
          });
        }
      });
    },
    normalizeSingers(list) {
      //格式化抓取回来的数据
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_LIST) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }

        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });

      //处理map成有序列表
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title == HOT_TITLE) {
          hot.push(val);
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return [...hot, ...ret];
    },
    onShortCutTouchStart(e) {
      //点击右侧菜单，滚动到相应的位置
      let anchorIndex = getData(e.target, "index");
      this.currentIndex = anchorIndex;
      this.touch.y1 = e.touches[0].pageY;
      this.touch.anchorIndex = parseInt(anchorIndex);
      this._scrollTo(anchorIndex);
    },
    onShortCutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0; // |0向下取整，获取到当前移动了几个项
      const currentIndex = this.touch.anchorIndex + delta;
      this._scrollTo(currentIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    getListHeight() {
      let listHeight = [];
      let height = 0;
      let list = this.$refs.singerGroup;
      listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        listHeight.push(height);
      }
      this.listHeight = listHeight;
    },
    _scrollTo(index) {
      this.$refs.singerScroll.scrollToElement(this.$refs.singerGroup[index]);
    },
    _getCurrentIndex(newY) {
      //当滚动到顶部，newY大于0的时候
      if (newY > 0) {
        this.currentIndex = 0;
        this._getFiexedTitle(this.currentIndex);
        return;
      }

      //当在中间部分滚动的时候
      const listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this._getFiexedTitle(this.currentIndex);
          this.diff = height2 + newY;
          // if(height2 + newY < 30 && height2 + newY > 0){
          //   let delta= height2 + newY;
          //   this.transformY = -(30-delta);
          // }else{
          //   this.transformY = 0;
          // }
          return;
        }
      }
      //当滚动到最后一个元素的时候
      this.currentIndex = listHeight.length - 2;
      this._getFiexedTitle(this.currentIndex);
    },
    _getFiexedTitle(index){ //还可以使用计算属性，利用当前的currentIndex来得到title，会是更优雅的写法
      if(this.singers && this.singers[index] &&this.singers[index].title && index > 0){
        this.fixedTitle = this.singers[index].title
      }
    }
  },
  computed: {
    shortcutList() {
      return this.singers.map(group => {
        return group.title.substr(0, 1);
      });
    }
  },
  watch: {
    scrollY(val) {
      this._getCurrentIndex(val);
    },
    diff(newVal){
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal : 0
      if(fixedTop === this.transformY ){
        return;
      }
      this.transformY = fixedTop;
      
    }
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .singer-wrapper {
   position: fixed;
   top: 68px;
   bottom: 0;
   width: 100%;
   z-index: -1;
 }

 .singer-scroll {
   height: 100%;
 }

 .singer-group {
   padding-bottom: 20px;

   .title {
     height: 30px;
     line-height: 30px;
     padding-left: 20px;
     font-size: 12px;
     color: hsla(0, 0%, 100%, 0.5);
     background: #333;
   }

   .singer {
     display: flex;
     align-items: center;
     padding: 20px 0 0 30px;

     .avatar {
       border-radius: 50%;
       margin-right: 20px;
     }

     .name {
       color: $color-text-l;
     }
   }
 }

 .right-menu {
   position: fixed;
   right: 0;
   top: 120px;
   width: 20px;
   height: 70%;
   background: rgba(0, 0, 0, 0.3);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   padding-top: 15px;
   padding-bottom: 15px;
   border-radius: 10px;
   font-size: 12px;
   color: $color-text-l;

   .active {
     color: $color-theme;
   }
 }

 .fiexed_title{
   position:absolute;
   left:0;
   top: 0;
   width:100%;
   .title {
     height: 30px;
     line-height: 30px;
     padding-left: 20px;
     font-size: 12px;
     color: hsla(0, 0%, 100%, 0.5);
     background: #333;
   }
 }

 .loading-container{
   margin:auto;
 }
</style>
