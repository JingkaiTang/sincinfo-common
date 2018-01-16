<template>
  <div>
    <h1>Page2-2</h1>
    <EditableTable :editIncell="true" v-model="data" :columns-list="columns"></EditableTable>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name',
          editable: true
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex'
        },
        {
          title: '岗位',
          align: 'center',
          key: 'work',
          editable: true
        },
        {
          title: '操作',
          align: 'center',
          width: 120,
          key: 'handle',
          handle: ['delete']
        }
      ],
      data: [
        {
          name: 'Aresn',
          sex: '男',
          work: '前端开发'
        },
        {
          name: 'Lison',
          sex: '男',
          work: '前端开发'
        },
        {
          name: 'lisa',
          sex: '女',
          work: '程序员鼓励师'
        }
      ]
    }
  }
}
</script>
