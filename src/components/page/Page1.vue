<template>
  <div>
    <h1>Page1</h1>
    <GapButtonGroup :group="group"></GapButtonGroup>
    <GapButtonGroup :group="gridGroup" :grid="6"></GapButtonGroup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group: [],
      gridGroup: []
    }
  },
  methods: {
    genBtn (id) {
      return {
        name: `btn ${id}`,
        action: () => {
          console.log(`btn ${id}`)
        }
      }
    }
  },
  created () {
    const n = 10
    let group = []
    for (let i = 0; i < n; i++) {
      group.push(this.genBtn(i))
    }
    this.group = group

    const m = 32
    let gridGroup = []
    for (var i = 0; i < m; i++) {
      gridGroup.push(this.genBtn(i))
    }
    this.gridGroup = gridGroup
  }
}
</script>
