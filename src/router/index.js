import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page0 from '@/components/page/Page0'
import Page00 from '@/components/page/Page0-0'
import Page01 from '@/components/page/Page0-1'
import Page02 from '@/components/page/Page0-2'
import Page1 from '@/components/page/Page1'
import Page2 from '@/components/page/Page2'
import Page20 from '@/components/page/Page2-0'
import Page21 from '@/components/page/Page2-1'
import Page210 from '@/components/page/Page2-1-0'
import Page211 from '@/components/page/Page2-1-1'
import Page22 from '@/components/page/Page2-2'
import Page3 from '@/components/page/Page3'

Vue.use(Router)

const _index = {
  path: '/',
  name: 'index',
  component: HelloWorld,
  meta: {
    name: '首页'
  }
}

const _page0 = {
  path: 'Page0',
  name: 'Page0',
  component: Page0,
  meta: {
    name: '测试页面0',
    parent: _index
  }
}

_page0.children = [
  {
    path: 'Page0-0',
    name: 'Page0-0',
    component: Page00,
    meta: {
      name: '测试页面0-0',
      parent: _page0
    }
  },
  {
    path: 'Page0-1',
    name: 'Page0-1',
    component: Page01,
    meta: {
      name: '测试页面0-1',
      parent: _page0
    }
  },
  {
    path: 'Page0-2',
    name: 'Page0-2',
    component: Page02,
    meta: {
      name: '测试页面0-2',
      parent: _page0
    }
  }
]

const _page2 = {
  path: 'Page2',
  name: 'Page2',
  component: Page2,
  meta: {
    name: '测试页面2',
    parent: _index
  }
}

const _page2$1 = {
  path: 'Page2-1',
  name: 'Page2-1',
  component: Page21,
  meta: {
    name: '测试页面2-1',
    parent: _page2
  }
}

const _page2$1$2 = {
  path: 'Page2-1-2',
  name: 'Page2-1-2',
  component: Page21,
  meta: {
    name: '测试页面2-1-2',
    parent: _page2$1
  }
}

_page2$1$2.children = [
  {
    path: 'Page2-1-2-0',
    name: 'Page2-1-2-0',
    component: Page210,
    meta: {
      name: '测试页面2-1-2-0',
      parent: _page2$1$2
    }
  },
  {
    path: 'Page2-1-2-1',
    name: 'Page2-1-2-1',
    component: Page211,
    meta: {
      name: '测试页面2-1-2-1',
      parent: _page2$1$2
    }
  },
  {
    path: 'Page2-1-2-2',
    name: 'Page2-1-2-2',
    component: Page211,
    meta: {
      name: '测试页面2-1-2-2',
      parent: _page2$1$2
    }
  }
]

_page2$1.children = [
  {
    path: 'Page2-1-0',
    name: 'Page2-1-0',
    component: Page210,
    meta: {
      name: '测试页面2-1-0',
      parent: _page2$1
    }
  },
  {
    path: 'Page2-1-1',
    name: 'Page2-1-1',
    component: Page211,
    meta: {
      name: '测试页面2-1-1',
      parent: _page2$1
    }
  },
  _page2$1$2
]

_page2.children = [
  {
    path: 'Page2-0',
    name: 'Page2-0',
    component: Page20,
    meta: {
      name: '测试页面2-0',
      parent: _page2
    }
  },
  _page2$1,
  {
    path: 'Page2-2',
    name: 'Page2-2',
    component: Page22,
    meta: {
      name: '测试页面2-2',
      parent: _page2
    }
  }
]

_index.children = [
  _page0,
  {
    path: 'Page1',
    name: 'Page1',
    component: Page1,
    meta: {
      name: '测试页面1',
      parent: _index
    }
  },
  _page2,
  {
    path: 'Page3',
    name: 'Page3',
    component: Page3,
    meta: {
      name: '测试页面3',
      parent: _index
    }
  }
]

export default new Router({
  routes: [
    _index
  ]
})
