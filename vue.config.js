const path = require('path');

function resolve(dir) { // resolve函数用于帮我们拼接目录路径
  return path.join(__dirname, dir); // __dirname是当前目录绝对路径
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'));
  },
  devServer: {
    https: false,
    open:true,
    proxy: {
      //名字可以自定义，这里我用的是api
      '/api': {
        target: 'http://ustbhuangyi.com/music/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,//这里设置是否跨域
        pathRewrite: {
          '^/api': ''
        }
      } 
    }
  }
};
