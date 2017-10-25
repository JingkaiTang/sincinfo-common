import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page0 from '@/components/page/Page0'
// import Page1 from '@/components/page/Page1'
// import Page2 from '@/components/page/Page2'
// import Page3 from '@/components/page/Page3'

Vue.use(Router)

const _index = {
  path: '/',
  name: 'Hello',
  component: HelloWorld,
  meta: {
    name: '首页'
  }
}

_index.children = [
  {
    path: 'Page0',
    name: 'Page0',
    component: Page0,
    meta: {
      name: '测试页面0',
      parent: _index
    }
  }
]

export default new Router({
  routes: [
    _index
  ]
})
