<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="(bread, i) in breads" :href="bread.plain ? '' : bread.path" :key="i">{{bread.meta.name}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      breads: []
    }
  },
  methods: {
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
