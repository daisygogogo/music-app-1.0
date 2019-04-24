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
   @import "~common/stylus/variable"

 .header-wrapper
   height: 40px;
   line-height:40px;
   width: 100%;
   text-align: center;
   font-size:16px;
   font-weight:bold;
   color:$color-theme;
   .icon
     display:inline-block;
     width:30px;
     height:32px;
     bg-image('logo');
     background-size:30px 32px;
     vertical-align: top;
     margin-top: 4px;
     margin-left:4px;
</style>
