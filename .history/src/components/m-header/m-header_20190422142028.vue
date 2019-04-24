<template>
  <div class="header-wrapper">
    <span class="icon"></span>
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
   display:inline-block;
     width:30px;
     height:32px;
     bg-image('logo');
     background-size:30px 32px;
</style>
