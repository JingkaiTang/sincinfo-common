<template>
  <div class="sc-sidebar-menu">
    <div v-for="(l1, i1) in menuList">
      <div :class="['sc-menu-item', 'sc-menu-item-l1', {'sc-menu-item-active': i1 === active.l1 && active.l2 === -1, 'sc-menu-item-active-parent': i1 === active.l1 && l1.children && l1.children.length && active.l2 >= 0}]" @click="menuClick(l1, {l1: i1})">
        <Icon :type="l1.icon"></Icon>
        <span class="sc-menu-text">l1: {{l1.name}}</span>
        <MenuArrow v-if="l1.children && l1.children.length > 0" class="sc-menu-arrow" :open="l1.$subOpen" @click.stop="toggleSubmenu(l1)"></MenuArrow>
      </div>
      <div v-if="l1.children && l1.children.length > 0" :class="['sc-sub-menu', 'sc-sub-menu-l1', {'sc-sub-menu-open': l1.$subOpen}]" v-show="l1.$subOpen">
        <template v-for="(l2, i2) in l1.children">
          <div :class="['sc-menu-item', 'sc-menu-item-l2', {'sc-menu-item-active': i1 === active.l1 && i2 === active.l2 && active.l3 === -1, 'sc-menu-item-active-parent': i1 === active.l1 && i2 === active.l2 && l2.children && l2.children.length && active.l3 >= 0}]" @click="menuClick(l2, {l1: i1, l2: i2})">
            <Icon :type="l2.icon"></Icon>
            <span class="sc-menu-text">l2: {{l2.name}}</span>
            <MenuArrow v-if="l2.children && l2.children.length > 0" class="sc-menu-arrow" :open="l2.$subOpen" @click.stop="toggleSubmenu(l2)"></MenuArrow>
          </div>
          <div v-if="l2.children && l2.children.length > 0" :class="['sc-sub-menu', 'sc-sub-menu-l2', {'sc-sub-menu-open': l2.$subOpen}]" v-show="l2.$subOpen">
            <template v-for="(l3, i3) in l2.children">
              <div :class="['sc-menu-item', 'sc-menu-item-l3', {'sc-menu-item-active': i1 === active.l1 && i2 === active.l2 && i3 === active.l3 && active.l4 === -1, 'sc-menu-item-active-parent': i1 === active.l1 && i2 === active.l2 && i3 === active.l3 && l3.children && l3.children.length && active.l4 >= 0}]" @click="menuClick(l3, {l1: i1, l2: i2, l3: i3})">
                <span class="sc-menu-text">l3: {{l3.name}}</span>
                <MenuArrow v-if="l3.children && l3.children.length > 0" class="sc-menu-arrow" :open="l3.$subOpen" @click.stop="toggleSubmenu(l3)"></MenuArrow>
              </div>
              <div v-if="l3.children && l3.children.length > 0" :class="['sc-sub-menu', 'sc-sub-menu-l3', {'sc-sub-menu-open': l3.$subOpen}]" v-show="l3.$subOpen">
                <template v-for="(l4, i4) in l3.children">
                  <div :class="['sc-menu-item', 'sc-menu-item-l4', {'sc-menu-item-active': i1 === active.l1 && i2 === active.l2 && i3 === active.l3 && i4 === active.l4}]" @click="menuClick(l4, {l1: i1, l2: i2, l3: i3, l4: i4})">
                    <span class="sc-menu-text">l4: {{l4.name}}</span>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@/libs/util'
import MenuArrow from './menuArrow'
export default {
  name: 'SidebarMenu',
  components: {
    MenuArrow
  },
  data () {
    return {
      active: {
        l1: -1,
        l2: -1,
        l3: -1,
        l4: -1
      }
    }
  },
  props: {
    menuList: Array,
    theme: {
      default: 'light',
      type: String
    }
  },
  methods: {
    init () {
      this.menuList.forEach((l1, i1) => {
        this.$set(l1, '$active', {l1: i1})
        Util.checkIcon(l1)
        if (l1.children) {
          this.$set(l1, '$subOpen', false)
          l1.children.forEach((l2, i2) => {
            this.$set(l2, '$parent', l1)
            this.$set(l2, '$active', {l1: i1, l2: i2})
            Util.checkIcon(l2)
            if (l2.children) {
              this.$set(l2, '$subOpen', false)
              l2.children.forEach((l3, i3) => {
                this.$set(l3, '$parent', l2)
                this.$set(l3, '$active', {l1: i1, l2: i2, l3: i3})
                if (l3.children) {
                  this.$set(l3, '$subOpen', false)
                  l3.children.forEach((l4, i4) => {
                    this.$set(l4, '$parent', l3)
                    this.$set(l4, '$active', {l1: i1, l2: i2, l3: i3, l4: i4})
                  })
                }
              })
            }
          })
        }
      })
    },
    menuClick (menu, active) {
      if (menu.children && menu.children.length > 0) {
        this.toggleSubmenu(menu)
      }
      if (menu.route) {
        this.$router.push({name: menu.route})
        this.applyActive(menu.$active)
      }
    },
    toggleSubmenu (menu) {
      menu.$subOpen = !menu.$subOpen
    },
    applyActive (active) {
      if (!active) {
        active = {}
      }
      ['l1', 'l2', 'l3', 'l4'].forEach(l => {
        if (active && !active[l] && active[l] !== 0) {
          active[l] = -1
        }
      })
      this.active = active
    },
    updateActiveMenu () {
      let route = this.$route
      let menu = {
        children: this.menuList
      }
      while (route) {
        if (this.filterActiveMenu(menu, route)) {
          break
        }
        route = route.parent
      }
      this.updateOpenedMenu()
    },
    filterActiveMenu (menu, route) {
      if (menu.route === route.name) {
        this.applyActive(menu.$active)
        return true
      } else if (menu.children) {
        return menu.children.reduce((acc, sub) => (typeof acc === 'boolean' ? acc : this.filterActiveMenu(acc, route)) || this.filterActiveMenu(sub, route))
      }
      return false
    },
    updateOpenedMenu () {
      const setSub = (l, m) => {
        l = this.active[l]
        if (l >= 0) {
          let menu = m[l]
          menu.$subOpen = true
          return menu.children
        }
      }
      ['l1', 'l2', 'l3', 'l4'].reduce((acc, l) => typeof acc === 'string' ? setSub(l, setSub(acc, this.menuList)) : setSub(l, acc))
    }
  },
  created () {
    this.init()
    this.updateActiveMenu()
  }
}
</script>

<style scoped lang="less">
  @import './sidebarMenu.less';
</style>
