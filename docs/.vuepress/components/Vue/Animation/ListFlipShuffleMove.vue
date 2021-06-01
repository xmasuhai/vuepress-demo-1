<template>
  <div>
    <button @click="shuffle">Shuffle Move</button>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in itemList"
          :key="item"
          class="flip-list-item">
        {{ item }}
      </li>
    </transition-group>
    <br>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in itemList"
          :key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'
import randoms from '../../../mixins/random.js'

export default {
  name: 'ListFlipShuffleMove',
  mixins: [randoms],
  data() {
    return {
      itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      originItems: [],
      nextNum: 10
    }
  },
  methods: {
    shuffle() {
      this.oddEven()
      this.randomIndex()
      this.itemList = _.shuffle(this.itemList)
    },
  },
  updated() {
    this.checkItemList()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../mixins/Animations";
</style>
