<template>
  <div>
    <h1>Page0-2</h1>
    <Calendar border :events="calendar.events"></Calendar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      calendar: {
        events: {
          '2017-10-7': ['事件一', '事件二', '事件三'],
          '2017-10-30': ['赴北京开会', '全聚德吃烤鸭']
        }
      }
    }
  }
}
</script>
