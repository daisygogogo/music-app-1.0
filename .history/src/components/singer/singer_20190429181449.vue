<template>
  <div>
    <scroll>
      <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>      <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>      <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>      <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
            <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>      <p>sdfsdfsdfdsfsdf</p>
      <p>sdfsdfsdfdsfsdf</p>
      
    </scroll>
  </div>
</template>

<script>
import Singer from 'common/js/singer'
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Scroll from 'base/scroll/scroll'

const HOT_LIST = 10; //hot歌手长度
const HOT_TITLE = '热门';
export default {
  data(){
    return{
      singers:[], 
    }
  },
  components:{
    Scroll
  },
  created(){
    this._getSingerList();
  },
  methods:{
        _getSingerList(){
      getSingerList().then((res) =>{
        if(res.code == ERR_OK ){
          this.singers = this.normalizeSingers(res.data.list);
          console.log('格式化之后的数据',this.singers)
        }
      })
    },
    normalizeSingers(list){ //格式化抓取回来的数据
      let map = {
        hot:{
          title:HOT_TITLE,
          hotList:[]
        }
      };
      list.forEach((item, index) => {
        if(index < HOT_LIST){
          map.hot.hotList.push(new Singer({
            id:item.Fsinger_mid,
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
          id:item.Fsinger_mid,
          name:item.Fsinger_name
          }))  
      });

      //处理map成有序列表
      let hot = [];
      let ret = [];
      for(let key in map){
        let val = map[key];
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val);
        }else if(val.title == HOT_TITLE){
          hot.push(val);
        }
      }
      
      ret.sort((a,b) =>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return [...hot, ...ret];
    }
  }
};
</script>

 <style scoped lang="stylus">
</style>
