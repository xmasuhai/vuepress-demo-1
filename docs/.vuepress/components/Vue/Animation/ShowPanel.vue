<template>
  <div>
    <br>
    <h2>{{ title }}</h2>
    <br>
    <button @click="toggle">
      {{buttonText}}
    </button>
    <transition :name="transitionName"
                :enter-active-class="AnimeEnterClassName"
                :leave-active-class="AnimeLeaveClassName"
    >
      <p class="animateTarget" v-if="visible">{{ showText }}</p>
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
    AnimeEnterClassName: {
      type: String
    },
    AnimeLeaveClassName: {
      type: String
    }
  }
}
</script>
