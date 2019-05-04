<template>
  <div>
    <scroll>
      <div class="singer-group">
        <div class="title">热门</div>
        <div class="singer">
            <img
              width="40"
              height="40"
              class="avatar"
              src="https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000"
            >
            <span class="name">林俊杰</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Singer from "common/js/singer";
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Scroll from "base/scroll/scroll";

const HOT_LIST = 10; //hot歌手长度
const HOT_TITLE = "热门";
export default {
  data() {
    return {
      singers: []
    };
  },
  components: {
    Scroll
  },
  created() {
    // this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == ERR_OK) {
          this.singers = this.normalizeSingers(res.data.list);
          console.log("格式化之后的数据", this.singers);
        }
      });
    },
    normalizeSingers(list) {
      //格式化抓取回来的数据
      let map = {
        hot: {
          title: HOT_TITLE,
          hotList: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_LIST) {
          map.hot.hotList.push(
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
    }
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .singer-group {
   .title {
     height: 30px;
     line-height: 30px;
     padding-left: 20px;
     font-size: 12px;
     color: hsla(0, 0%, 100%, 0.5);
     background: #333;
   }
   .singer{
     margin:10px;
     display:flex;
     align-items:center;
     padding: 20px 0 0 30px;
     .avatar{
       border-radius:50%;
       margin-right:20px;
     }
     .name{
       color: $color-text-l;
     }
   }
 }
</style>
