<template>
  <div>
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group name="list"
                      tag="p">
      <span v-for="item in items"
            :key="item"
            class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'ListTransition',
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      nextNum: 6
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: all 1s;
}
.list-leave-active {
  position: absolute;
}
</style>
