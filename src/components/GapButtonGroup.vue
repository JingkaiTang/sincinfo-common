<template>
  <div v-if="grid === 0">
    <template v-for="(el, i) in group">
      <Button :type="type" @click="el.action">{{el.name}}</Button>
      <span v-if="i != group.length-1" class="btn-gap">|</span>
    </template>
  </div>
  <div v-else class="btn-grid">
    <div width="100%" v-for="row in rows" class="grid-line">
      <template v-for="(col, i) in row">
        <div class="grid" :style="gridWidth">
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
      gridWidth: ''
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
      this.gridWidth = `width: ${Math.floor(100 / this.grid)}%`
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
</style>
