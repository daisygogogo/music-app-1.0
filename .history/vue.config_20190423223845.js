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
  },
};
