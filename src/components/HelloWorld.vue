<template>
  <MainFrame :menu="menu">
    <span slot="logo">logo</span>
    <h2 slot="title">XYZ System</h2>
    <span slot="copyright">版权信息</span>
  </MainFrame>
</template>

<script>
import menu from '@/menu'
export default {
  name: 'HelloWorld',
  data () {
    return {
      menu: menu
    }
  }
}
</script>
