<template>
  <div class="singer-wrapper">
    <scroll class="singer-scroll" ref="singerScroll" v-if="singers.length">
      <div>
        <div class="singer-group" v-for="(item,index) in singers" :key="index + '1'" ref="singerGroup">
          <div class="title">{{item.title}}</div>
          <div class="singer" v-for="singer in item.items" :key="singer.id">
            <img width="40" height="40" class="avatar" :src="singer.avatar">
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
        @touchstart="onShortCutStart"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Singer from "common/js/singer";
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll";
import {getData} from 'common/js/dom'

const HOT_LIST = 10; //hot歌手长度
const HOT_TITLE = "热门";
export default {
  data() {
    return {
      singers: [],
      currentIndex: 0,
      shortCutList: []
    };
  },
  components: {
    Scroll
  },
  created() {
    this._getSingerList();
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
          });
          console.log("格式化之后的数据", this.singers);
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
    onShortCutStart(e) { //点击右侧菜单，滚动到相应的位置
      console.log(getData(e.target,'index'));
      // this.$refs.singerScroll.scrollToElement(this.$refs.singerGroup[this.currentIndex],400)
    }
  },
  computed: {
    shortcutList() {
      return this.singers.map(group => {
        return group.title.substr(0, 1);
      });
    }
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .singer-wrapper {
   position: fixed;
   top: 75px;
   bottom: 0;
   width: 100%;
   z-index: -1;
 }

 .singer-scroll {
   height: 100%;
 }

 .singer-group {
   margin-bottom: 20px;

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
</style>
