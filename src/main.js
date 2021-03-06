import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';
import toastRegistry from 'common/toast/index';

import 'common/stylus/index.styl';

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  error: require('common/images/default.png'),
  loading: require('common/images/default.png'),
});

Vue.use(toastRegistry);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
