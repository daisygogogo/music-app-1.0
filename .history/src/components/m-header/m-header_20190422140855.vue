<template>
  <div class="header-wrapper">
    <img class="icon" :src="iconUrl">
    Chicken Music
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconUrl: require('common/images/default.png'),
    };
  },
};
</script>

 <style scoped lang="stylus">
 .header-wrapper
   height: 40px;
   width: 100%;
   text-align: center;
   .icon
     width:25px;
     height:auto;
 
</style>
