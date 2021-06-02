<template>
  <div ref="staggered">
    <input v-model="query">
    <transition-group name="staggered-fade"
                      tag="ul"
                      :css="false"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <li v-for="(item, index) in computedList"
          :key="item.msg"
          :data-index="index">
        {{ item.msg }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import Anime from 'animejs'

export default {
  name: 'listStagger',
  data() {
    return {
      query: '',
      list: [
        {msg: 'Bruce Lee'},
        {msg: 'Jackie Chan'},
        {msg: 'Chuck Norris'},
        {msg: 'Jet Li'},
        {msg: 'Kung Fury'}
      ],
    }
  },
  computed: {
    computedList: function () {
      const vm = this
      return this.list.filter((item) => {
        return item.msg
          .toLowerCase()
          .indexOf(vm.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter: function (el) {
      console.log("this.$refs.staggered",this.$refs.staggered)
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        Anime({
          targets: this.$refs.staggered,
          translateX: 250,
          complete: done()
        })
      }, delay)
    },
    leave: function (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        Anime({
          targets: this.$refs.staggered,
          translateX: 250,
          complete: done()
        })
      }, delay)
    }
  },
  updated() {
    console.log(this.query)
  }
}
</script>

<style scoped>

</style>
