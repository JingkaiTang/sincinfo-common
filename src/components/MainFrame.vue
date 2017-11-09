<style lang="less">
  @import "./main.less";
</style>

<template>
  <div class="main-frame" :class="{'main-frame-hide-text': hideMenuText}">
    <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
      <div class="logo-con">
        <img v-show="!hideMenuText"  src="../assets/images/logo.jpg" key="max-logo" />
        <img v-show="hideMenuText" src="../assets/images/logo-min.jpg" key="min-logo" />
      </div>
      <sidebar-menu v-if="!hideMenuText" :menuList="menu" :iconSize="14"/>
      <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menu"/>
    </div>
    <div class="main-frame-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
      <div class="main-frame-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-frame-breadcrumb">
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
                  <span class="main-frame-user-name">{{ userDropdown.username }}</span>
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
        <keep-alive :include="cachedPageList">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import sidebarMenu from './main_components/sidebarMenu.vue'
  import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue'
  import tagsPageOpened from './main_components/tagsPageOpened.vue'
  import breadcrumbNav from './main_components/breadcrumbNav.vue'
  // import themeDropdownMenu from './main_components/themeDropdownMenu.vue'

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
      pageTagsList () {
        return this.$store.state.openedPageList // 打开的页面的页面对象
      },
      menuIconColor () {
        return this.$store.state.menuTheme === 'dark' ? 'white' : '#495060'
      },
      cachedPageList () {
        return this.$store.state.cachedPageList
      },
      isFullScreen () {
        return this.$store.state.isFullScreen
      }
    },
    methods: {
      init () {
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
      }
    },
    mounted () {
      this.init()
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
    }
  }
</script>
