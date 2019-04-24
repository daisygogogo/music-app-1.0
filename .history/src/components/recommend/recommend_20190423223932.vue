<template>
  <div>
    <div>
      <h1>热门歌单推荐</h1>>
	  <song-catalog></song-catalog>
    </div>
  </div>
</template>

<script>
import SongCatalog from 'components/songCatalog/songCatalog'
import {getRecommend} from 'api/recommend'
export default {
	components:{
		SongCatalog
	}
};
</script>

 <style scoped lang="stylus">
</style>
