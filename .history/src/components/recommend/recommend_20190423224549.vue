<template>
  <div>
    <div>
      <h1>热门歌单推荐</h1>>
      <song-catalog></song-catalog>
    </div>
  </div>
</template>

<script>
import SongCatalog from "components/songCatalog/songCatalog";
import { getRecommend } from "api/recommend";
import {ERR_OK} from 'api/config'
export default {
  created() {
    this._getRecommend();
  },
  components: {
    SongCatalog
  },
  methods: {
    _getRecommend(){
      getRecommend().then((res) =>{ //getRecommend返回一个promise，所以在then里面，我们就可以获得值
        if(res.code == ERR_OK){
          console.log(res.data)
        }
      })
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>
