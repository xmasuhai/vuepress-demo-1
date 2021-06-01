<template>
  <div>
    <button @click="add">Add</button>
    <button @click="remove">{{buttonText}}</button>
    <transition-group name="list"
                      tag="p">
      <span v-for="item in itemList"
            :key="item"
            class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import randoms from '../../../mixins/random.js'

export default {
  name: 'ListTransition',
  mixins: [randoms],
  data() {
    return {
      itemList: [1, 2, 3, 4, 5],
      originItems: [],
      nextNum: 6,
    }
  },
  computed: {
    buttonText() {
      return (this.itemList.length === 0) ?
        'recover' :
        'remove'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../mixins/Animations";
</style>
