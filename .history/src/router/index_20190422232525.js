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
    path: '/recommend',
    name: 'recommend',
    component: resolve => require(['@/components/recommend/recommend'], resolve),
  }
  ,{
    path: '/singer',
    name: 'singer',
    component: resolve => require(['@/components/singer/singer'], resolve),
  }
  ,{
    path: '/rank',
    name: 'rank',
    component: resolve => require(['@/components/rank/rank'], resolve),
  }
  ,{
    path: '/search',
    name: 'search',
    component: resolve => require(['@/components/search/search'], resolve),
  }

  ],
});
