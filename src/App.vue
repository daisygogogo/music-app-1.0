<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
    <!-- <div @click="showToast">测试</div> -->
    <player></player>

  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
import Player from 'components/player/player';
import {showToast} from 'common/toast/index';

export default {
  name: 'app',
  components: {
    MHeader, Tab, Player
  },
  methods:{
    showToast(){
      // new showToast({'我是弹出消息'})
      showToast('我是弹出消息')
    }
  }
};
</script>

<style scoped lang="stylus">

</style>
