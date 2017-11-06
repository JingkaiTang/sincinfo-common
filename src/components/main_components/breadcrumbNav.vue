<template>
  <div>
    <template v-for="(bread, i) in breads">
      <span class="breadcrumb breadcrumb-disabled" v-if="bread.plain || bread.meta.plain || i === breads.length-1">{{bread.meta.name}}</span>
      <span class="breadcrumb" v-else type="text" @click="breadNav(bread.name)">{{bread.meta.name}}</span>
      <Icon class="breadcrumb-gap" v-if="i !== breads.length-1" type="chevron-right"></Icon>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breads: []
    }
  },
  methods: {
    breadNav (name) {
      this.$router.push({name: name})
    },
    toastBreads () {
      let route = this.$route
      let breads = []
      while (route) {
        breads.push(route)
        route = route.meta.parent
      }
      this.breads = breads.reverse()
    }
  },
  watch: {
    '$route': function () {
      this.toastBreads()
    }
  },
  created () {
    this.toastBreads()
  }
}
</script>

<style scoped>
.breadcrumb {
  color: #39f;
  cursor: pointer;
}

.breadcrumb.breadcrumb-disabled {
  color: #495060;
  cursor: not-allowed;
}

.breadcrumb-gap {
  margin: 0 8px 0 8px;
  color: #495060;
}
</style>
