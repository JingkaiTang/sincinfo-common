<template>
  <div v-if="grid === 0">
    <template v-for="(el, i) in group">
      <Button :type="type" @click="el.action">{{el.name}}</Button>
      <span v-if="i != group.length-1" class="btn-gap">|</span>
    </template>
  </div>
  <div v-else>
    <table width="100%">
      <tr v-for="row in rows" class="grid-line">
        <template v-for="(col, i) in row">
          <td style="text-align: center">
            <Button :type="type" @click="col.action">{{col.name}}</Button>
          </td>
          <td>
            <span v-if="i != row.length-1" style="color: #d7dde4">|</span>
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GapButtonGroup',
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
  }
}
</script>

<style scoped>
</style>
