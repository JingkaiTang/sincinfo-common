<template>
  <div>
    <MceView v-model="content" :size = "{width: '600px', height: '300px'}"></MceView>

    <br/><br/>
    <Col span="12">
      <div>
        <span>输入框中输入内容点击右侧Set，设置内容到富文本</span>
        <Input v-model="setContent">
          <Button slot="append" type="primary" @click="setCon">Set</Button>
        </Input>
      </div>
      <br/>
      <div>
        <span>点击右侧Get，获得富文本的内容</span>
        <Button type="primary" @click="getCon">Get</Button>
      </div>
    </Col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      setContent: ''
    }
  },
  methods: {
    getCon () {
      alert(this.content)
    },
    setCon () {
      this.content = this.setContent
    }
  }
}
</script>
