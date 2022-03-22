import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = {
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'root-page',
      component: require('@/components/pages/RootPage').default,
      children: [
        {
          title: 'Home',
          path: '/home',
          name: 'home-page',
          component: require('@/components/pages/HomePage').default
        },
        {
          title: 'Test Page',
          path: '/test',
          name: 'test-page',
          component: require('@/components/pages/TestPage').default
        },
        // {
        //   title: 'Mind Flake',
        //   path: '/mind-flake',
        //   name: 'mind-flake-page',
        //   component: require('@/components/pages/MindFlakePage').default
        // },
        {
          title: 'Mind Flake Reconstruct',
          path: '/mind-flake-page-reconstruct',
          name: 'mind-flake-page-reconstruct',
          component: require('@/components/pages/MindFlakePageReconstruct').default
        },
        {
          title: 'Render Test',
          path: '/render-test',
          name: 'render-test-page',
          component: require('@/components/pages/RenderTestPage').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  initParents () {
    this.routes[0].parent = null
    var que = [this.routes[0]]
    while (que.length > 0) {
      var r = que.shift()
      if (Object.hasOwnProperty.call(r, 'children')) {
        r.children.forEach(child => {
          child.parent = r
          que.push(child)
        })
      }
    }
    return this
  }
}.initParents()

export default new Router(routes)
