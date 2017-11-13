<template>
  <Icon v-if="open" type="ios-arrow-up"></Icon>
  <Icon v-else type="ios-arrow-down"></Icon>
</template>

<script>
export default {
  name: 'MenuArrow',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>
