import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'recommend',
    // meta: {
    // 	title: translate(524, '问芽')
    // },
    component: resolve => require(['@/components/recommend/recommend'], resolve),
  }
  ,{
    path: '/',
    name: 'singer',
    // meta: {
    // 	title: translate(524, '问芽')
    // },
    component: resolve => require(['@/components/singer/singer'], resolve),
  }
  ,{
    path: '/',
    name: 'rank',
    // meta: {
    // 	title: translate(524, '问芽')
    // },
    component: resolve => require(['@/components/rank/rank'], resolve),
  }
  ,{
    path: '/',
    name: 'search',
    // meta: {
    // 	title: translate(524, '问芽')
    // },
    component: resolve => require(['@/components/search/search'], resolve),
  }

  ],
});
