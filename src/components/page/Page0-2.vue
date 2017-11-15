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
        events: [
          {
            date: '2017-11-7',
            events: [
              {
                time: '23:00',
                content: '事件一'
              },
              {
                time: '23:00',
                content: '事件二'
              },
              {
                time: '23:00',
                content: '事件三'
              }
            ]
          },
          {
            date: '2017-11-30',
            events: [
              {
                time: '23:00',
                content: '吃'
              },
              {
                time: '23:00',
                content: '喝'
              },
              {
                time: '23:00',
                content: '玩乐'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
