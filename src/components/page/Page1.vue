<template>
  <div>
    <h1>Page1</h1>
    <GapButtonGroup :group="group"></GapButtonGroup>
    <GapButtonGroup :group="gridGroup" :grid="6"></GapButtonGroup>
    <Table :columns="headers" :data="data"></Table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group: [],
      gridGroup: [],
      headers: [
        {
          type: 'selection',
          width: 200
        },
        {
          type: 'index',
          width: 300
        },
        {
          title: 'name',
          key: 'name',
          width: 400
        },
        {
          title: 'action',
          render: (h, p) => {
            return h('GapButtonGroup', {
              props: {
                group: p.row.group
              }
            })
          }
        }
      ],
      data: []
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
    },
    genGroup (n) {
      let group = []
      for (let i = 0; i < n; i++) {
        group.push(this.genBtn(`abcdef${i}ghijkl`))
      }
      return group
    },
    genData () {
      const n = 10
      for (let i = 0; i < n; i++) {
        let data = {
          name: `name ${i}`
        }
        data.group = this.genGroup(i * i + 6)
        this.data.push(data)
      }
    }
  },
  created () {
    this.group = this.genGroup(10)
    this.gridGroup = this.genGroup(32)
    this.genData()
  }
}
</script>
