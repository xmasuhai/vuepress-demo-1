<template>
  <div>
    <br>
    <h2>{{ title }}</h2>
    <br>
    <button @click="toggle">
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
      visible: true
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
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
