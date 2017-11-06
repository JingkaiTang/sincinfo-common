<template>
  <div>
    <template v-for="(item, index) in menuList">
      <div style="text-align: center;" :key="index">
        <Dropdown transfer v-if="item.children && item.children.length > 0" placement="right-start" :key="index" @on-click="menuClick">
          <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <template v-for="(child, i) in item.children">
              <DropdownItem :name="child.route" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ child.name }}</span></DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <Dropdown transfer v-else placement="right-start" :key="index" @on-click="menuClick">
          <Button @click="menuClick(item.route)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
            <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
          </Button>
          <DropdownMenu style="width: 200px;" slot="list">
            <DropdownItem :name="item.route" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{ item.name }}</span></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenuShrink',
  props: {
    menuList: {
      type: Array
    },
    iconColor: {
      type: String,
      default: 'white'
    }
  },
  methods: {
    menuClick (route) {
      this.$router.push({name: route})
    }
  }
}
</script>
