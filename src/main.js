import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'

import 'iview/dist/styles/iview.css'

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
    ...ScStore.state
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
