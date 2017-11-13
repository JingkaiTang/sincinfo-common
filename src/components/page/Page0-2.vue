<template>
<div>
  <div>
      <MceView  v-model="content"></MceView>
  </div>

  <Input type="text" v-model="inputText"></Input>
  <Button @click="gets">Get</Button>
  <Button @click="sets">Set</Button>

</div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      inputText: ''
    }
  },
  methods: {
    gets: function () {
      console.log('content:', this.content)
    },
    sets: function () {
      this.content = this.inputText
    }
  }
}
</script>
