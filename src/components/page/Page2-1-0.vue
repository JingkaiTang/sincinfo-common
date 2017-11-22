<template>
  <div>
    <h1>Page2-1-0</h1>
    <DragableTable refs="table1" :columnsList="columnsList" :tableData="tableData" :start="handleOnstart1" :end="handleOnend1" ></DragableTable>
  </div>
</template>
<script>
export default {
  name: 'dragable-table',
  data () {
    return {
      columnsList: [],
      tableData: [],
      table1: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        draggingRecord: []
      },
      table2: {
        hasDragged: false,
        isDragging: false,
        oldIndex: 0,
        newIndex: 0,
        chooseRecord: []
      }
    }
  },
  methods: {
    handleOnstart1 (el) {
      this.table1.oldIndex = el.oldIndex
      this.table1.hasDragged = true
      this.table1.isDragging = true
    },
    handleOnend1 (el) {
      this.table1.newIndex = el.newIndex
      this.table1.isDragging = false
      this.table1.draggingRecord.unshift({
        from: this.table1.oldIndex + 1,
        to: this.table1.newIndex + 1
      })
    },
    handleOnstart2 (el) {
      this.table2.oldIndex = el.oldIndex
      this.table2.hasDragged = true
      this.table2.isDragging = true
    },
    handleOnend2 (el) {
      this.table2.newIndex = el.newIndex
      this.table2.isDragging = false
    },
    handleOnchoose2 (el) {
      this.table2.chooseRecord.unshift(this.tableData[el.oldIndex].todoItem)
    },
    getData () {
      this.columnsList = [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '待办事项',
          key: 'todoItem'
        },
        {
          title: '备注',
          key: 'remarks'
        },
        {
          title: '拖拽',
          key: 'drag',
          width: 90,
          align: 'center',
          render: (h) => {
            return h(
              'Icon',
              {
                props: {
                  type: 'arrow-move',
                  size: 20
                }
              }
            )
          }
        }
      ]
      this.tableData = [
        {
          todoItem: '明天去后海玩',
          remarks: '估计得加班'
        },
        {
          todoItem: '后天去和妹子看电影',
          remarks: '可能没妹子'
        },
        {
          todoItem: '大后天去吃海天盛筵',
          remarks: '没钱就不去了'
        },
        {
          todoItem: '周末去看电影',
          remarks: '估计得加班'
        },
        {
          todoItem: '下个月准备回家看父母',
          remarks: '估计得加班'
        },
        {
          todoItem: '该买回家的票了',
          remarks: '可能没票了'
        },
        {
          todoItem: '过年不回家和父母视频聊天',
          remarks: '一定要记得'
        },
        {
          todoItem: '去车站接父母一起在北京过年',
          remarks: 'love'
        }
      ]
    }
  },
  created () {
    // 可在此从服务端获取表格数据
    this.getData()
  }
}
</script>
