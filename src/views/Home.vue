<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>{{title}}</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    this.title = this.$config.title
  }
}
</script>
