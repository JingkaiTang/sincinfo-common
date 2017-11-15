<template>

  <div>
    <h1>Page0-2</h1>
    <Calendar border :events="calendar.events" :onDayClick="onDayClick"></Calendar>
    <div>
      <Modal v-model="showEventsModal" ok-text="添加日程" cancel-text="关闭" @on-ok="addEventModal = true"  :title="`${addEvents.day}日程`">
          <Table :columns="eventTable" :data="addEvents.events" ></Table>
      </Modal>
      <Modal v-model="addEventModal" ok-text="添加" @on-ok="addEvent" :title="`添加${addEvents.day}日程`">
        <Row>
          <Col span="18">
            <Form :label-width="120">
              <FormItem label="时间">
                <TimePicker format="HH:mm" placeholder="Select time" @on-change="onChange" style="width: 250px"></TimePicker>
              </FormItem>
              <FormItem label="事件">
                <Input type="text" v-model="myEvent.content" style="width: 250px"></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  </div>

</template>

<script>
export default {
  methods: {
    onChange (time) {
      this.myEvent.time = time
    },
    addEvent () {
      // TODO 以后需加入与服务器沟通
      this.addEvents.events.push({time: this.myEvent.time, content: this.myEvent.content})
    },
    onDayClick (day, events) {
      console.log('come here')
      this.addEvents.day = day
      this.addEvents.events = events
      this.showEventsModal = true
    }
  },
  data () {
    return {
      showEventsModal: false,
      addEventModal: false,
      addEvents: {
        day: '',
        events: []
      },
      myEvent: {
        time: '',
        content: ''
      },
      eventTable: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '事件',
          key: 'content',
          align: 'left'
        },
        {
          title: '时间',
          key: 'time',
          align: 'left'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.addEvents.events.splice(params.index, 1)
                  }
                }
              }, '删除')
            ]
            )
          }
        }
      ],
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
