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

const store = {
  state: {
    openedPageList: [],
    cachedPageList: [],
    menuTheme: '', // 主题
    theme: '',
    isFullScreen: false,
    inited: false
  },
  mutations: {
    init (state) {
      this.commit('initOpenedPageList')
      this.commit('initCachedPageList')
      state.inited = true
    },
    initOpenedPageList (state) {
      if (localStorage.openedPageList) {
        state.openedPageList = JSON.parse(localStorage.openedPageList)
      }
    },
    initCachedPageList (state) {
      if (localStorage.cachedPageList) {
        state.cachedPageList = JSON.parse(localStorage.cachedPageList)
      }
    },
    saveOpenedPageList (state) {
      localStorage.openedPageList = JSON.stringify(state.openedPageList)
    },
    saveCachedPageList (state) {
      localStorage.cachedPageList = JSON.stringify(state.cachedPageList)
    },
    openPage (state, route) {
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
      if (!state.cachedPageList.some(page => page === route.name)) {
        state.cachedPageList.push(route.name)
        this.commit('saveCachedPageList')
      }
    },
    closePage (state, arg) {
      const vm = arg.vm
      const name = arg.name
      let currentIndex = 0
      state.openedPageList.forEach((item, index) => {
        if (item.name === name) {
          currentIndex = index
          state.openedPageList.splice(index, 1)
        }
      })
      this.commit('saveOpenedPageList')
      state.cachedPageList.forEach((item, index) => {
        if (item === name) {
          state.cachedPageList.splice(index, 1)
        }
      })
      this.commit('saveCachedPageList')
      if (vm.$route.name === name) {
        if (state.openedPageList.length === 0) {
          vm.$router.push('/')
        } else {
          this.commit('openPage', state.openedPageList[currentIndex])
        }
      }
    },
    clearAllTags (state, vm) {
      state.openedPageList = []
      this.commit('saveOpenedPageList')
      state.cachedPageList = []
      this.commit('saveCachedPageList')
      vm.$router.push('/')
    },
    clearOtherTags (state, vm) {
      state.openedPageList = state.openedPageList.filter(page => page.name === vm.$route.name)
      this.commit('saveOpenedPageList')
      state.cachedPageList = state.cachedPageList.filter(page => page === vm.$route.name)
      this.commit('saveCachedPageList')
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
