import './assets/common.css'

import MainFrame from './components/MainFrame'
import GapButtonGroup from './components/GapButtonGroup'
import MceView from './components/MceView'
import Calendar from './components/calendar'
import DragableTable from './components/DragableTable'
import EditableTable from './components/editableTable/EditableTable'

const SincinfoCommon = {
  MainFrame,
  GapButtonGroup,
  MceView,
  Calendar,
  DragableTable,
  EditableTable
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

const store = {
  state: {
    openedPageList: [],
    cachedPageList: [],
    // excludedRouteList: [], // 排除的路由列表 不会被cache和记录到标签, 与路由信息meta.untagged类似
    // mainPageRoute: '', // 主页路由
    menuTheme: '', // 主题
    theme: '',
    isFullScreen: false,
    inited: false
  },
  mutations: {
    init (state) {
      this.commit('initOpenedPageList')
      state.inited = true
    },
    initOpenedPageList (state) {
      if (localStorage.openedPageList) {
        state.openedPageList = JSON.parse(localStorage.openedPageList)
      }
      this.commit('updateCachedPageList')
    },
    saveOpenedPageList (state) {
      localStorage.openedPageList = JSON.stringify(state.openedPageList)
      this.commit('updateCachedPageList')
    },
    updateCachedPageList (state) {
      state.cachedPageList = state.openedPageList.map(page => page.name)
    },
    deleteOpenedPageList (state, index) {
      state.openedPageList.splice(index, 1)
      this.commit('saveOpenedPageList')
    },
    openPage (state, route) {
      if ((state.excludedRouteList && state.excludedRouteList.some(r => r === route.name)) || route.meta.untagged) {
        return
      }
      if (!state.openedPageList.some(page => page.name === route.name)) {
        const newPage = {
          name: route.name,
          title: route.meta.name,
          params: route.params,
          query: route.query
        }
        state.openedPageList.push(newPage)
        this.commit('saveOpenedPageList')
      }
    },
    clearAllTags (state) {
      state.openedPageList = state.openedPageList.filter(page => page.name === state.mainPageRoute)
      this.commit('saveOpenedPageList')
    },
    clearOtherTags (state, route) {
      state.openedPageList = state.openedPageList.filter(page => page.name === route.name || page.name === state.mainPageRoute)
      this.commit('saveOpenedPageList')
    },
    changeMenuTheme (state, theme) {
      state.menuTheme = theme
    },
    changeMainTheme (state, mainTheme) {
      state.theme = mainTheme
    },
    handleFullScreen (state) {
      // DONE
      if (state.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        let main = document.body
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    },
    changeFullScreenState (state) {
      // DONE
      state.isFullScreen = !state.isFullScreen
    }
  }
}

const ScHelper = {
  beforeRoute (store, route) {
    try {
      if (!store.state.inited) {
        store.commit('init')
      }
      store.commit('openPage', route)
    } catch (e) {
      console.error(e)
    }
  }
}

export {
  SincinfoCommon,
  store as ScStore,
  ScHelper
}
