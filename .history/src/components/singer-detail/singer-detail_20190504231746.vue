<template>
  <div class="singer_detail">
    singer-detail
  </div>
 </template>

 <script>
    export default {
  }
</script>

 <style scoped lang="stylus">
 @import '~common/stylus/variable';

.singer_detail{
  position:fixed;
  left:0;
  top:0;
  min-height:100vh;
  width:100%;
  z-index:100;
  background-color:$color-background;
  opacity: 1;
}
</style>