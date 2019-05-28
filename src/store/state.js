import { playMode } from 'common/js/config.js'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence, //播放模式，顺序，循环，随机
    currentIndex: -1, //当前播放的歌曲index
}

export default state