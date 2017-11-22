<style lang="less">
  @import '../main.less';
</style>

<template>
  <div ref="scrollCon" @mousewheel="handlescroll" class="tags-outer-scroll-con">
    <div class="close-all-tag-con">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <transition-group name="taglist-moving-animation">
        <Tag
          type="dot"
          v-for="(item, index) in pageTagsList"
          ref="tagsPageOpened"
          :key="item.name"
          :name="index"
          @on-close="closePage"
          @click.native="linkTo(item)"
          :closable="item.name !== $store.state.mainPageRoute"
          :color="item.name === $route.name ? 'blue' : 'default'"
        >{{ item.title }}</Tag>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagsPageOpened',
  data () {
    return {
      currentPageName: this.$route.name,
      tagBodyLeft: 0,
      currentScrollBodyWidth: 0,
      refsTag: [],
      tagsCount: 1
    }
  },
  props: {
    pageTagsList: Array
  },
  computed: {
    tagsList () {
      return this.$store.state.openedPageList
    }
  },
  methods: {
    closePage (event, index) {
      this.$store.commit('deleteOpenedPageList', index)
      if (index > 0 && this.pageTagsList.length > 0) {
        this.$router.push({
          name: this.pageTagsList[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.$store.state.mainPageRoute
        })
      }
    },
    linkTo (item) {
      const route = {
        name: item.name
      }
      if (item.params) {
        route.params = item.params
      }
      if (item.query) {
        route.query = item.query
      }
      this.$router.push(route)
    },
    handlescroll (e) {
      let left = 0
      if (e.wheelDelta > 0) {
        left = Math.min(0, this.tagBodyLeft + e.wheelDelta)
      } else {
        if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
          if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
            left = this.tagBodyLeft
          } else {
            left = Math.max(this.tagBodyLeft + e.wheelDelta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
      this.tagBodyLeft = left
    },
    handleTagsOption (type) {
      if (type === 'clearAll') {
        this.$store.commit('clearAllTags')
        this.$router.push({
          name: this.$store.state.mainPageRoute
        })
      } else {
        this.$store.commit('clearOtherTags', this.$route)
      }
      this.tagBodyLeft = 0
    },
    moveToView (tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10
      } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
        // 标签在可视区域
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20)
      }
    }
  },
  mounted () {
    this.refsTag = this.$refs.tagsPageOpened
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el
          this.moveToView(tag)
        }
      })
    }, 1)  // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length
  }
}
</script>
