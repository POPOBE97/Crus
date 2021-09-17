import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root-page',
      component: require('@/components/RootPage').default,
      children: [
        {
          path: '/',
          name: 'home-page',
          component: require('@/components/HomePage').default
        },
        {
          path: '/test',
          name: 'test-page',
          component: require('@/components/TestPage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
