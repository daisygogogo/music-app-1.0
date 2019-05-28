<template>
  <transition name="slide_animation">
    <music-list :title="singer.name" :musicImage="singer.avatar" :songList="songList"></music-list>
  </transition>
</template>

 <script>
import { mapGetters } from "vuex";
import { getSingerDetail, getPurlUrl } from "api/singer";
import { ERR_OK } from "api/config";
import MusicList from "base/music-list/music-list";
import { createSong } from "common/js/song";
export default {
  data() {
    return {
      songList: []
    };
  },
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
      let self = this;

      async function getSingerSongs() {
        //获取歌曲列表以及列表对应的播放url
        let singerid = self.singer.id;
        let songlist = await getSingerDetail(singerid);
        let purlUrls = [];
        if (songlist && songlist.data && songlist.data.list) {
          let result = await self._getAllPurlUrls(songlist.data.list);
          if (result.data.code == ERR_OK) {
            purlUrls = result.data.req_0.data.midurlinfo;
          }
        }
        return Promise.resolve([songlist.data.list, purlUrls]);
      }

      getSingerSongs().then(res => {
        //方法调用
        this.songList = this._normalLizeSonglist(res);
      });
    },
    getSonglist(singerid) {
      return getSingerDetail(singerid);
    },
    _getAllPurlUrls(list) {
      let songmid = [];
      let songtype = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.songmid) {
          songmid.push(musicData.songmid);
          songtype.push(0);
        }
      });
      return getPurlUrl(songmid, songtype);
    },
    _normalLizeSonglist(res) {
      let ret = [];
      let songlist = res[0];
      let songPurlUrls = res[1];
      for (let i = 0; i < songlist.length; i++) {
        let { musicData } = songlist[i];
        let { purl } = songPurlUrls[i];
        if (musicData.songid && musicData.songmid) {
          let song = createSong(musicData, purl);
          ret.push(song);
        }
      }
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