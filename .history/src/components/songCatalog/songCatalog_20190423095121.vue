<template>
  <ul class="song-catalog">
    <li class="item" v-for="(item, index) in songCatalog" :key="index">
      <img class="image" :src="item.albumImg">
      <div>
        <h1 class="name">{{item.songTitle}}</h1>
        <p class="desc">{{item.albumDesc}}</p>
      </div>
    </li>
  </ul>
</template>

 <script>
export default {
  data() {
    return {
      songCatalog: [
        {
          albumImg:
            "http://p.qpic.cn/music_cover/mOO9VVKnvAo2xMSqZ1omA7hyTEnRPkhpUEA35uic4k4yvPW2r6rEQDg/600?n=1",
          songTitle: "老年歌单第一人",
          albumDesc: "滚石KTV：演唱会现场"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/AhbCa0vazSRDjEJhYwthgiaicOJR0gBcgGibPlRJK7Vy2fsSWQ9EQcOyQ/600?n=1",
          songTitle: "鹿仁",
          albumDesc: "校园广播站 • 经典励志曲"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/Hepa6V8aXWj4x9UyxSztnc74e5W9icVvWVaZL8SF7Oy8UEhQbGFnqNg/600?n=1",
          songTitle: "★、╰︶",
          albumDesc: "日系恋爱 · 情侣间的情愫蜜语"
        },
        {
          albumImg:
            "http://p.qpic.cn/music_cover/aaxX4Babic4VicBPicJOwr5xupbyiczur0XBjaAJbTzc8bBf6d8Ts0E5Vg/600?n=1",
          songTitle: "Music Fans",
          albumDesc: "Psy Trance｜虚空浮现的异境魔音"
        }
      ]
    };
  }
};
</script>

 <style scoped lang="stylus">
 .song-catalog {
   .item {
     .image {
       width: 50px;
       height: 50px;
     }
   }
 }
</style>