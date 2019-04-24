<template>
  <ul class="song-list">
    <li v-for="(item, index) in songlist" :key="index"></li>
  </ul>

</template>

 <script>
export default {
  data(){
    return{
      songlist:[{

      }]
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>