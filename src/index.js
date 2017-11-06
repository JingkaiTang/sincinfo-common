import './assets/common.css'

import MainFrame from './components/MainFrame'
import GapButtonGroup from './components/GapButtonGroup'

const SincinfoCommon = {
  MainFrame,
  GapButtonGroup
}

const install = (Vue, opts = {}) => {
  Object.keys(SincinfoCommon).forEach(key => {
    Vue.component(key, SincinfoCommon[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

SincinfoCommon.install = install

export default SincinfoCommon
