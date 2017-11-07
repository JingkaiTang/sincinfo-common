<style lang="less" scoped>
  @import "./main.less";
</style>

<template>
  <div class="main" :class="{'main-hide-text': hideMenuText}">
    <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
      <div class="logo-con">
        <img v-show="!hideMenuText"  src="../assets/images/logo.jpg" key="max-logo" />
        <img v-show="hideMenuText" src="../assets/images/logo-min.jpg" key="min-logo" />
      </div>
      <sidebar-menu v-if="!hideMenuText" :menuList="menu" :iconSize="14"/>
      <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menu"/>
    </div>
    <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="icon-btn-group">
            <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
              <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
              </Tooltip>
            </div>
            <!-- 锁屏暂时不做  -->
            <!-- <div @click="lockScreen" class="lock-screen-btn-con">
              <Tooltip content="锁屏" placement="bottom">
                <Icon type="locked" :size="20"></Icon>
              </Tooltip>
            </div> -->
            <div v-if="messageBox.show" @click="messageBox.action" class="message-con">
              <Tooltip :content="messageBox.count > 0 ? '有' + messageBox.count + '条未读消息' : '无未读消息'" placement="bottom">
                <Badge :count="messageBox.count" dot>
                  <Icon type="ios-bell" :size="22"></Icon>
                </Badge>
              </Tooltip>
            </div>
            <!-- 暂时先不做 有一些麻烦  -->
            <!-- <div class="switch-theme-con">
              <Row class="switch-theme" type="flex" justify="center" align="middle">
                <theme-dropdown-menu :username="xxx"></theme-dropdown-menu>
              </Row>
            </div> -->
          </div>
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userDropdown.username }}</span>
                  <Icon type="arrow-down-b" v-if="userDropdown.dropdown.length > 0"></Icon>
                </a>
                <DropdownMenu slot="list" v-if="userDropdown.dropdown.length > 0">
                  <DropdownItem v-for="(item, i) in userDropdown.dropdown" :key="i" :name="item.name" :divided="i !== 0">{{item.name}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar v-if="userDropdown.avatar" :src="userDropdown.avatar" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import sidebarMenu from './main_components/sidebarMenu.vue'
  import tagsPageOpened from './main_components/tagsPageOpened.vue'
  import breadcrumbNav from './main_components/breadcrumbNav.vue'
  // import themeDropdownMenu from './main_components/themeDropdownMenu.vue'
  import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue'
  import util from '@/libs/util.js'

  export default {
    name: 'MainFrame',
    props: {
      menu: {
        type: Array,
        default: []
      },
      messageBox: {
        type: Object,
        default: () => {
          return {
            show: false,
            action: () => { console.log('need function for showMessage') },
            count: 0
          }
        }
      },
      userDropdown: {
        type: Object,
        default: () => {
          return {
            username: 'USERNAME',
            avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg',
            // [{ name: 'xxx', action: () => {}}, ...]
            dropdown: []
          }
        }
      }
    },
    components: {
      sidebarMenu,
      tagsPageOpened,
      breadcrumbNav,
      // themeDropdownMenu,
      sidebarMenuShrink
    },
    data () {
      return {
        spanLeft: 4,
        spanRight: 20,
        currentPageName: '',
        hideMenuText: false,
        showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
        lockScreenSize: 0
      }
    },
    computed: {
      tagsList () {
        return this.$store.state.tagsList  // 所有页面的页面对象
      },
      pageTagsList () {
        return this.$store.state.pageOpenedList  // 打开的页面的页面对象
      },
      menuIconColor () {
        return this.$store.state.menuTheme === 'dark' ? 'white' : '#495060'
      },
      cachePage () {
        return this.$store.state.cachePage
      },
      isFullScreen () {
        return this.$store.state.isFullScreen
      }
    },
    methods: {
      init () {
        // this.$store.commit('setCurrentPageName', this.$route.name)
        // let pathArr = util.setCurrentPath(this, this.$route.name)
        // if (pathArr.length >= 2) {
        //   this.$store.commit('addOpenSubmenu', pathArr[1].name)
        // }
        // this.userName = Cookies.get('user')
        // this.checkTag(this.$route.name)
      },
      toggleClick () {
        this.hideMenuText = !this.hideMenuText
      },
      handleClickUserDropdown (name) {
        this.userDropdown.dropdown.filter(dropdown => dropdown.name === name)[0].action()
      },
      handleFullScreen () {
        // DONE full screen
        this.$store.commit('handleFullScreen')
        this.$store.commit('changeFullScreenState')
      },
      // lockScreen () {
      //   let lockScreenBack = document.getElementById('lock_screen_back')
      //   lockScreenBack.style.transition = 'all 3s'
      //   lockScreenBack.style.zIndex = 10000
      //   lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset'
      //   this.showUnlock = true
      //   this.$store.commit('lock')
      //   Cookies.set('last_page_name', this.$route.name) // 本地存储锁屏之前打开的页面以便解锁后打开
      //   setTimeout(() => {
      //     lockScreenBack.style.transition = 'all 0s'
      //     this.$router.push({
      //       name: 'locking'
      //     })
      //   }, 800)
      // },
      checkTag (name) {
        let openpageHasTag = this.pageTagsList.some(item => {
          if (item.name === name) {
            return true
          }
        })
        if (!openpageHasTag) {  //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
        }
      }
    },
    watch: {
      '$route' (to) {
        this.$store.commit('setCurrentPageName', to.name)
        let pathArr = util.setCurrentPath(this, to.name)
        if (pathArr.length > 2) {
          this.$store.commit('addOpenSubmenu', pathArr[1].name)
        }
        this.checkTag(to.name)
      },
      lang () {
        util.setCurrentPath(this, this.$route.name)  // 在切换语言时用于刷新面包屑
      }
    },
    mounted () {
      this.init()
      // 锁屏相关
      // let lockScreenBack = document.getElementById('lock_screen_back')
      // let x = document.body.clientWidth
      // let y = document.body.clientHeight
      // let r = Math.sqrt(x * x + y * y)
      // let size = parseInt(r)
      // this.lockScreenSize = size
      // window.addEventListener('resize', () => {
      //   let x = document.body.clientWidth
      //   let y = document.body.clientHeight
      //   let r = Math.sqrt(x * x + y * y)
      //   let size = parseInt(r)
      //   this.lockScreenSize = size
        // lockScreenBack.style.transition = 'all 0s'
        // lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
      // })
      // lockScreenBack.style.width = lockScreenBack.style.height = size + 'px'
      // 问候信息相关
      // if (!Cookies.get('hasGreet')) {
      //   let now = new Date()
      //   let hour = now.getHours()
      //   let greetingWord = {
      //     title: '',
      //     words: ''
      //   }
      //   let userName = this.userName
      //   if (hour > 5 && hour < 6) {
      //     greetingWord = {title: '凌晨好~' + userName, words: '早起的鸟儿有虫吃~'}
      //   } else if (hour >= 6 && hour < 9) {
      //     greetingWord = {title: '早上好~' + userName, words: '来一杯咖啡开启美好的一天~'}
      //   } else if (hour >= 9 && hour < 12) {
      //     greetingWord = {title: '上午好~' + userName, words: '工作要加油哦~'}
      //   } else if (hour >= 12 && hour < 14) {
      //     greetingWord = {title: '中午好~' + userName, words: '午饭要吃饱~'}
      //   } else if (hour >= 14 && hour < 17) {
      //     greetingWord = {title: '下午好~' + userName, words: '下午也要活力满满哦~'}
      //   } else if (hour >= 17 && hour < 19) {
      //     greetingWord = {title: '傍晚好~' + userName, words: '下班没事问候下爸妈吧~'}
      //   } else if (hour >= 19 && hour < 21) {
      //     greetingWord = {title: '晚上好~' + userName, words: '工作之余品一品书香吧~'}
      //   } else {
      //     greetingWord = {title: '深夜好~' + userName, words: '夜深了，注意休息哦~'}
      //   }
      //   this.$Notice.config({
      //     top: 130
      //   })
      //   this.$Notice.info({
      //     title: greetingWord.title,
      //     desc: greetingWord.words,
      //     duration: 4,
      //     name: 'greeting'
      //   })
      //   Cookies.set('hasGreet', 1)
      // }
    },
    created () {
      // 查找当前用户之前登录时设置的主题
      let name = this.userDropdown.userName
      if (localStorage.theme) {
        let hasThisUser = JSON.parse(localStorage.theme).some(item => {
          if (item.userName === name) {
            this.$store.commit('changeMenuTheme', item.menuTheme)
            this.$store.commit('changeMainTheme', item.mainTheme)
            return true
          } else {
            return false
          }
        })
        if (!hasThisUser) {
          this.$store.commit('changeMenuTheme', 'dark')
          this.$store.commit('changeMainTheme', 'b')
        }
      } else {
        this.$store.commit('changeMenuTheme', 'dark')
        this.$store.commit('changeMainTheme', 'b')
      }
      // 根据用户设置主题
      if (this.$store.state.theme !== 'b') {
        let stylesheetPath = './dist/' + this.$store.state.theme + '.css'
        let themeLink = document.querySelector('link[name="theme"]')
        themeLink.setAttribute('href', stylesheetPath)
      }
      // 显示打开的页面的列表
      this.$store.commit('setOpenedList')
    }
  }
</script>
