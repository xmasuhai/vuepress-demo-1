<template>
  <div>
    <br>
    <h2>{{ title }}</h2>
    <br>
    <button @click="visible = !visible">
      Toggle
    </button>
    <transition class="transition" :name="transitionName">
      <p v-if="visible">{{ showText }}</p>
    </transition>
    <br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    }
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    transitionName: {
      type: String,
      required: true,
      default: '',
    },
    showText: {
      type: String,
      required: true,
      default: 'Hello',
    }
  }
}
</script>
