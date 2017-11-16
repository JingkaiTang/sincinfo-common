<template>
  <div v-if="grid === 0">
    <template v-for="(el, i) in group">
      <Button :type="type" @click="el.action">{{el.name}}</Button>
      <span v-if="i != group.length-1" class="btn-gap">|</span>
    </template>
  </div>
  <div v-else class="btn-grid">
    <div v-for="row in rows" class="grid-line" :style="gridLineStyle">
      <template v-for="(col, i) in row">
        <div class="grid" :style="gridStyle">
          <Button :type="type" @click="col.action">{{col.name}}</Button>
        </div>
        <span v-if="i != row.length-1" style="color: #d7dde4">|</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GapButtonGroup',
  data () {
    return {
      gridStyle: {},
      gridLineStyle: {}
    }
  },
  props: {
    group: Array,
    type: {
      type: String,
      default: 'text'
    },
    grid: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rows () {
      if (this.grid <= 0) {
        return []
      }
      let ret = []
      for (let i = 0; i < this.group.length; i += this.grid) {
        ret.push(this.group.slice(i, i + this.grid))
      }
      return ret
    }
  },
  created () {
    if (this.grid > 0) {
      let lens = this.group.map(g => g.name.length).sort()
      let longest = lens[lens.length - 1]
      let width = Math.floor(100 / this.grid)
      let minWidth = longest * 12 + 4
      this.gridStyle = {
        width: `${width}%`,
        'min-width': `${minWidth}px`
      }
      let lineMinWidth = minWidth * this.grid
      this.gridLineStyle = {
        width: '100%',
        'min-width': `${lineMinWidth}px`
      }
    }
  }
}
</script>

<style scoped>
.btn-grid {
  text-align: left;
}

.grid {
  text-align: center;
  display: inline-block;
}

.grid-line {
  display: inline;
}
</style>
