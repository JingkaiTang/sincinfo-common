<template>
  <Icon type="ios-arrow-down" :class="['arrow', {'arrow-up': open}]"></Icon>
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

<style scoped>
.arrow-up {
  transform: rotate(180deg);
}

.arrow {
  transition: transform .2s ease-in-out;
}
</style>
