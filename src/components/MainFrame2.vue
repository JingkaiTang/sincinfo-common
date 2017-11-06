<template>
  <div class="main-frame">
    <Row class="title-row">
      <Col span="3" class="logo-col">
        <slot name="logo"></slot>
      </Col>
      <Col span="21">
        <slot name="title"></slot>
      </Col>
    </Row>
    <Row class="body-row">
      <Col span="3" class="sidebar-col">
        <SidebarMenu :menu="menu" :style="menuStyle"></SidebarMenu>
      </Col>
      <Col span="21" class="content-col">
        <div class="breadcrumb-line">
          <BreadcrumbBar></BreadcrumbBar>
        </div>
        <div class="content-line" :style="contentStyle">
          <router-view></router-view>
        </div>
        <div class="copyright-line">
          <slot name="copyright"></slot>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'MainFrame',
  data () {
    return {
      menuHeight: 0,
      contentHeight: 0
    }
  },
  props: {
    menu: Array
  },
  methods: {
    handleResize () {
      let bodyHeight = document.body.clientHeight
      bodyHeight = bodyHeight < 600 ? 600 : bodyHeight
      this.menuHeight = bodyHeight - 54
      this.contentHeight = bodyHeight - 138
    }
  },
  created () {
    // 更新菜单
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    menuStyle () {
      return `height: ${this.menuHeight}px`
    },
    contentStyle () {
      return `height: ${this.contentHeight}px`
    }
  }
}
</script>

<style scoped>
.main-frame {
  width: 100%;
  height: 100%;
}

.title-row {
  height: 54px;
  background-color: #17294c;
  color: #acafb8;
}

.logo-col {
}

.body-row {
}

.sidebar-col {
}

.content-col {
  padding: 8px 8px;
}

.breadcrumb-line {
  height: 16px;
  margin-bottom: 12px;
}

.content-line {
  background-color: #fff;
  padding: 8px 8px;
  overflow-y: auto;
}

.copyright-line {
  height: 24px;
  line-height: 24px;
  margin-top: 16px;
  background-color: #fff;
  text-align: center;
}
</style>
