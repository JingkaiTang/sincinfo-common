<template>
  <div style="text-align: center">
    <h1>Page2-0</h1>
    <Dropdown placement="right-start">
      <Button type="text">
        下拉菜单
        <Icon type="arrow-down-b"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <Dropdown placement="right-start">
            <DropdownItem>
                北京烤鸭
                <Icon type="ios-arrow-right"></Icon>
            </DropdownItem>
            <DropdownMenu slot="list">
                <DropdownItem>挂炉烤鸭</DropdownItem>
                <Dropdown placement="right-start">
                  <DropdownItem>
                    烤鸭A
                    <Icon type="ios-arrow-right"></Icon>
                  </DropdownItem>
                  <DropdownMenu slot="list">
                    <DropdownItem>烤鸭A-A</DropdownItem>
                    <DropdownItem>烤鸭A-B</DropdownItem>
                    <Dropdown placement="right-start">
                      <DropdownItem>
                        烤鸭A-C
                        <Icon type="ios-arrow-right"></Icon>
                      </DropdownItem>
                      <DropdownMenu slot="list">
                        <DropdownItem>烤鸭A-C-A</DropdownItem>
                        <DropdownItem>烤鸭A-C-B</DropdownItem>
                        <DropdownItem>烤鸭A-C-C</DropdownItem>
                        <DropdownItem>烤鸭A-C-D</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <DropdownItem>烤鸭A-D</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <DropdownItem>焖炉烤鸭</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <DropdownItem>冰糖葫芦</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <template v-for="(l1, i1) in menuList">
      <Dropdown v-if="l1.children && l1.children.length > 0" placement="right-start">
        <Button type="text">
          <Icon :size="20" :type="l1.icon"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <template v-for="(l2, i2) in l1.children">
            <Dropdown v-if="l2.children && l2.children.length > 0" placement="right-start" :key="i2">
              <DropdownItem :name="l2.route">
                <Icon :type="l2.icon"></Icon>
                <span>{{ l2.name }}</span>
                <Icon type="ios-arrow-right"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <template v-for="(l3, i3) in l2.children">
                  <Dropdown v-if="l3.children && l3.children.length > 0" placement="right-start" :key="i3">
                    <DropdownItem :name="l3.route">
                      <span>{{ l3.name }}</span>
                      <Icon type="tunnel"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list">
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
      <Dropdown v-else placement="right-start">
        <Button type="text">
          <Icon :size="20" :type="l1.icon"></Icon>
        </Button>
        <DropdownMenu slot="list">
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
import menu from '@/menu'

export default {
  data () {
    return {
      menuList: menu
    }
  }
}
</script>
