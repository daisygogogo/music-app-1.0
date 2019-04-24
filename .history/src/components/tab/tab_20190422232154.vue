<template>
  <div class="tab-wrapper">
    <router-link tag="li" class="item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="li" class="item" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="li" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="li" class="item" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

 .tab-wrapper {
   display: flex;
   height: 30px;
   line-height: 30px;
   font-size: 16px;
   font-weight: bold;
   color: $color-theme;

   .item {
     flex: 1;
     text-align: center;
   }
 }
</style>
