import Vue from 'vue'
import iView from 'iview'

import 'iview/dist/styles/iview.css'

import SincinfoCommon from './index'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(SincinfoCommon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
