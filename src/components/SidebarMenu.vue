<template>
  <Menu accordion width="auto" mode="vertical" :theme="theme" :active-name="activeName" @on-select="menuClick">
    <template v-for="(l1, i) in menu">
      <MenuItem v-if="!l1.children || l1.children.length == 0" :name="l1.route">
        <Icon :type="l1.icon || randomIcon()"></Icon>
        <span>{{l1.name}}</span>
      </MenuItem>
      <Submenu v-else :name="i">
        <template slot="title">
          <Icon :type="l1.icon || randomIcon()"></Icon>
          <span>{{l1.name}}</span>
        </template>
        <template v-for="(l2, j) in l1.children">
          <MenuItem v-if="!l2.children || l2.children.length == 0" :name="l2.route">
            <Icon :type="l2.icon || randomIcon()"></Icon>
            <span>{{l2.name}}</span>
          </MenuItem>
          <MenuGroup v-else :title="l2.name">
            <template v-for="(l3, j) in l2.children">
              <MenuItem :name="l3.route">
                <Icon :type="l3.icon || randomIcon()"></Icon>
                <span>{{l3.name}}</span>
              </MenuItem>
            </template>
          </MenuGroup>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
const icons = [
  'flag',
  'star',
  'heart',
  'gear-a'
]
export default {
  name: 'SidebarMenu',
  data () {
    return {
      activeName: ''
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
    menuClick (route) {
      console.log(route)
      this.$router.push({name: route})
    },
    updateActiveName () {
      let route = this.$route
      while (route) {
        let matched = this.menu.filter(item => item.route === route.name)
        if (matched && matched.length > 0) {
          this.activeName = route.name
          break
        }
        route = route.parent
      }
    },
    randomIcon () {
      return icons[Math.floor(Math.random() * icons.length)]
    }
  },
  created () {
    this.updateActiveName()
  }
}
</script>
