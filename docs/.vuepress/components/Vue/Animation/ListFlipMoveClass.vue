<template>
  <div>
    <button @click="shuffle">shuffle</button>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item"
          class="flip-list-item">
        {{ item }}
      </li>
    </transition-group>
    <br>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ListFlipMoveClass',
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  methods: {
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../mixins/Animations";
</style>
