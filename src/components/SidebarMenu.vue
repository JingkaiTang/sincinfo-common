<template>
  <Menu width="auto" mode="vertical" :theme="theme" :active-name="active_name" @on-select="menuClick">
    <Menu-item v-for="(item, i) in menu" :key="i" :name="i"><Icon :type="item.icon"></Icon>{{item.name}}</Menu-item>
  </Menu>
</template>

<script>
export default {
  name: 'SidebarMenu',
  data () {
    return {
      active_name: 0
    }
  },
  props: {
    menu: Array,
    theme: {
      default: 'light',
      type: String
    }
  },
  methods: {
    menuClick () {

    }
  }
}
</script>
