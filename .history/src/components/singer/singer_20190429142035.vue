<template>
  <div>歌手页面</div>
</template>

<script>
import Singer from 'common/js/singer'
import { getSingerList } from "api/singer";
const HOT_LIST = 10; //hot歌手长度
const HOT_TITLE = '热门';
export default {
  data(){
    return{
      singerMap:{}, 
    }
  },
  created(){
    this._getSingerList();
  },
  methods:{
        _getSingerList(){
      getSingerList().then((res) =>{
        console.log('获取歌手数据',res)
        this.normalizeSingers(res.data.list);
      })
    },
    normalizeSingers(list){
      let map = {
        hot:{
          title:HOT_TITLE,
          hotList:[]
        }
      };
      list.forEach((item, index) => {
        if(index < HOT_LIST){

        }
        
      });
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>
