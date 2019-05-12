<template>
  <transition name="slide_animation">
    <music-list :title="singer.name" :musicImage="singer.avatar"></music-list>
  </transition>
</template>

 <script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import MusicList from "base/music-list/music-list";
import { createSong } from "common/js/song";
export default {
  created() {
    this._getDetail();
  },
  computed: {
    ...mapGetters(["singer"])
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code == ERR_OK) {
          this.songList = this._normalLizeSonglist(res.data.list);
          console.log("this.songList", this.songList);
        }
      });
    },
    _normalLizeSonglist(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.songmid) {
          let song = createSong(musicData);
          ret.push(song);
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .slide_animation-enter-to {
   transform: translate3d(0, 0, 0);
 }

 .slide_animation-enter-active, .slide_animation-leave-active {
   transition: all 0.3s;
 }

 .slide_animation-enter, .slide_animation-leave-to {
   transform: translate3d(100%, 0, 0);
 }
</style>