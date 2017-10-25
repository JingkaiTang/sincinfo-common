<template>
  <MainFrame :menu="menu">
    <span slot="logo">logo</span>
    <h2 slot="title">XYZ System</h2>
    <span slot="copyright">版权信息</span>
  </MainFrame>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      menu: [
        {
          name: '首页',
          route: 'index',
          icon: 'ios-home'
        },
        {
          name: '考点管理',
          route: 'examSiteInfo',
          icon: 'cube'
        },
        {
          name: '考场管理',
          route: 'examRoomInfo',
          icon: 'leaf'
        },
        {
          name: '考试管理',
          route: 'examManagement',
          icon: 'magnet'
        }
      ]
    }
  }
}
</script>
