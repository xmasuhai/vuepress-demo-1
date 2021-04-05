<template>
  <div>
    <h2>{{ title }}</h2>
    <br>
    <button @click="visible = !visible">
      Toggle
    </button>
    <transition class="transition" :name="transitionName">
      <span v-if="visible">{{ showText }}</span>
    </transition>
    <br>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: true,
      title: 'Transition',
      transitionName: 'fade',
      showText: 'Hello',
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
  }

.fade-enter,
.fade-leave-to {
  opacity: 0;
  width: 100px;
  }

p {
  width: 300px;
  }
</style>
