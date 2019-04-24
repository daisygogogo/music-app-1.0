import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import App from './App.vue';
import router from './router'

import 'common/stylus/index.styl';

fastclick.attach(document.body);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
