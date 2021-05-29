<template>
  <div>
    <br>
    <h2>{{ title }}</h2>
    <br>
    <button @click="toggle">
      {{buttonText}}
    </button>
    <transition :name="transitionName"
                v-if="animationMode"
    >
      <p class="animateTarget" v-show="visible">{{ showText }}</p>
    </transition>
    <transition v-else
                :name="transitionName"
                :enter-active-class="animeEnterClassName"
                :leave-active-class="animeLeaveClassName"
    >
      <p class="animateTarget" v-show="visible">{{ showText }}</p>
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
    },
    showText: {
      type: String,
      required: true,
      default: 'Hello',
    },
    buttonText: {
      type: String,
      default: 'Toggle',
    },
    animationMode: {
      type: Boolean,
      required: true,
      default: true,
    },
    animeEnterClassName: {
      type: String,
      default: '',
    },
    animeLeaveClassName: {
      type: String,
      default: '',
    }
  }
}
</script>
