<template>
  <div>
    <button @click="shuffle">Shuffle Move</button>
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
import randoms from '../../../mixins/random.js'
export default {
  name: 'ListFlipShuffleMove',
  mixins: [randoms],
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 9
    }
  },
  methods: {
    shuffle() {
      this.randomIndex()
      this.oddEven()
      this.items = _.shuffle(this.items)
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-list-item {
  display: inline-block;
  margin-right: 10px;
}

.flip-list-leave-active {
  position: absolute;
}

.flip-list-move {
  transition: transform 1s;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s;
}

.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

</style>
