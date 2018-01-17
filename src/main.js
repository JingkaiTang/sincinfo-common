import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview-sincinfo'

import 'iview-sincinfo/dist/styles/iview.css'

import {SincinfoCommon, ScStore, ScHelper} from './index'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(Vuex)
Vue.use(SincinfoCommon)

// 状态管理
const store = new Vuex.Store({
  state: {
    ...ScStore.state,
    mainPageRoute: 'index', // 设定主页路由名称
    excludedRouteList: ['Page2-2'] // 添加tag例外路由，也可以通过再路由信息的meta中添加`untagged: true`达到相应效果
  },
  mutations: {
    ...ScStore.mutations
  }
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  ScHelper.beforeRoute(store, to)
  next()
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
