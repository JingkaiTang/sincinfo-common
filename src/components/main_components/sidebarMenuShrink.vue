<style scoped lang="less">
.sc-menu-shrink {
  width: 200px;
  &-l1 {
    width: 54px;
    margin-right: 6px;
  }
  &-sub {
    display: inline-block;
    width: 148px;
  }
}
</style>

<template>
  <div>
    <template v-for="(l1, i1) in menuList">
      <Dropdown v-if="l1.children && l1.children.length > 0" :key="i1" placement="right-start" @on-click="menuClick">
        <Button class="sc-menu-shrink-l1" @click="menuClick(l1.route)" type="text">
          <Icon :size="20" color="white" :type="l1.icon"></Icon>
        </Button>
        <DropdownMenu class="sc-menu-shrink sc-menu-shrink-l2" slot="list">
          <template v-for="(l2, i2) in l1.children">
            <Dropdown class="sc-menu-shrink" v-if="l2.children && l2.children.length > 0" placement="right-start" :key="i2">
              <DropdownItem :name="l2.route">
                <div class="sc-menu-shrink-sub" @click="menuClick(l2.route)">
                  <Icon :type="l2.icon"></Icon>
                  <span>{{ l2.name }}</span>
                </div>
                <Icon type="ios-arrow-right"></Icon>
              </DropdownItem>
              <DropdownMenu class="sc-menu-shrink sc-menu-shrink-l3" slot="list">
                <template v-for="(l3, i3) in l2.children">
                  <Dropdown class="sc-menu-shrink" v-if="l3.children && l3.children.length > 0" placement="right-start" :key="i3">
                    <DropdownItem :name="l3.route">
                      <div class="sc-menu-shrink-sub" @click="menuClick(l3.route)">
                        <span>{{ l3.name }}</span>
                      </div>
                      <Icon type="ios-arrow-right"></Icon>
                    </DropdownItem>
                    <DropdownMenu class="sc-menu-shrink sc-menu-shrink-l4" slot="list">
                      <template v-for="(l4, i4) in l3.children">
                        <DropdownItem :key="i4" :name="l4.route">
                          <span>{{ l4.name }}</span>
                        </DropdownItem>
                      </template>
                    </DropdownMenu>
                  </Dropdown>
                  <DropdownItem v-else :key="i3" :name="l3.route">
                    <span>{{ l3.name }}</span>
                  </DropdownItem>
                </template>
              </DropdownMenu>
            </Dropdown>
            <DropdownItem v-else :name="l2.route" :key="i2">
              <Icon :type="l2.icon"></Icon>
              <span>{{ l2.name }}</span>
            </DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
      <Dropdown v-else :key="i1" placement="right-start" @on-click="menuClick">
        <Button class="sc-menu-shrink-l1" @click="menuClick(l1.route)" type="text">
          <Icon :size="20" color="white" :type="l1.icon"></Icon>
        </Button>
        <DropdownMenu class="sc-menu-shrink sc-menu-shrink-l2" slot="list">
          <DropdownItem :name="l1.route" :key="'d' + i1">
            <Icon :type="l1.icon"></Icon>
            <span>{{ l1.name }}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenuShrink',
  props: {
    menuList: {
      type: Array
    }
  },
  methods: {
    menuClick (route) {
      if (route) {
        this.$router.push({name: route})
      }
    }
  }
}
</script>
