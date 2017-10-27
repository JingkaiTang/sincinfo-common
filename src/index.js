import './assets/common.css'

import SidebarMenu from './components/SidebarMenu'
import MainFrame from './components/MainFrame'
import BreadcrumbBar from './components/BreadcrumbBar'
import GapButtonGroup from './components/GapButtonGroup'

const SincinfoCommon = {
  SidebarMenu,
  MainFrame,
  BreadcrumbBar,
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
