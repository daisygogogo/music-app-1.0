import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'circleIndex',
			meta: {
				title: translate(524, '问芽')
			},
			component: resolve => require(['@/components/circle/CircleIndex'], resolve)

		}
	]
})