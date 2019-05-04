import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl';

fastclick.attach(document.body);

Vue.use(VueLazyLoad,{
  error:'common/images/default.png',
  loading:'common/images/default.png'
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
