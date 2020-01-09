<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in users" :key="item" :title="item"/>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { List, Cell } from 'vant'

export default {
  name: 'about',
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  created () {
    this.title = this.$config.title
    this.test()
  },
  computed: {
    ...mapGetters('user', ['users', 'loading', 'finished'])
  },
  methods: {
    ...mapActions('user', ['test']),
    ...mapMutations('user', ['changeQuery']),
    onLoad () {
      this.test()
    }
  }
}
</script>
