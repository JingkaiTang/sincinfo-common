<template>
  <MainFrame :menu="menu" :messageBox="messageBox" :userDropdown="userDropdown"></MainFrame>
</template>

<script>
import menu from '@/menu'
export default {
  name: 'HelloWorld',
  data () {
    return {
      menu: menu,
      messageBox: {
        show: true,
        action: () => { console.log('open message box') },
        count: 3
      },
      userDropdown: {
        username: 'root',
        avatar: 'http://www.gravatar.com/avatar/ef2564d40dfc858a09c6b10cb7e5ab42?s=800&d=identicon',
        dropdown: [
          {
            name: '帮助',
            action: () => {}
          },
          {
            name: '修改密码',
            action: () => {}
          },
          {
            name: '登出',
            action: () => {}
          }
        ]
      }
    }
  }
}
</script>
