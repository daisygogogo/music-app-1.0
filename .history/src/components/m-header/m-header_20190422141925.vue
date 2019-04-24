<template>
  <div class="header-wrapper">
    <img class="icon">
    Chicken Music
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

 <style scoped lang="stylus">
   @import "~common/stylus/mixin"
   
 .header-wrapper
   height: 40px;
   width: 100%;
   text-align: center;
   .icon
     width:30px;
     height:32px;
     bg-img('logo');
     background-size:30px 32px;
     height:auto;
</style>
