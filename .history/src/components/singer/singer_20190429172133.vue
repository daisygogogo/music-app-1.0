<template>
  <div>歌手页面</div>
</template>

<script>
import Singer from 'common/js/singer'
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
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
        if(res.code == ERR_OK ){
          this.normalizeSingers(res.data.list);
        }
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
          map.hot.hotList.push(new Singer({
            id:item.id,
            name:item.Fsinger_name}))
        }

        const key = item.Findex;
        if(!map[key]){
          map[key] = {
            title:key,
            items:[]
          }
        }
        map[key].items.push(new Singer({
          id:item.id,
          name:item.Fsinger_name
          }))  
      });

      console.log(map)
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>
