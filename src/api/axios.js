import axios from 'axios';

var instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
  // headers: {
  //     referer: 'http://ustbhuangyi.com/music/',
  //     host: 'ustbhuangyi.com'
  // }
});

export default instance;