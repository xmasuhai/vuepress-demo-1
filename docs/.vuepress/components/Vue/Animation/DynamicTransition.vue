<template>
  <div>
    Fade In: <input type="range"
                    v-model="fadeInDuration"
                    min="0"
                    :max="maxFadeDuration">
    Fade Out: <input type="range"
                     v-model="fadeOutDuration"
                     min="0"
                     :max="maxFadeDuration">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave">
      <p v-show="show">hello</p>
    </transition>
    <br>
    <button
      v-if="stop"
      @click="stop = false; show = false;"
      class="success">
      Start animating
    </button>
    <button
      v-else
      @click="stop = true;"
      class="danger">
      Stop it!
    </button>
  </div>
</template>

<script>
import Anime from 'animejs'

export default {
  name: 'DynamicTransition',
  data() {
    return {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true,
    }
  },
  mounted: function () {
    this.show = false
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      Anime({
        targets: el,
        opacity: 1,
        easing: 'easeInCubic',
        duration: 3000,
        loop: true,
        }
      )
    },
    leave(el, done) {
      Anime({
        targets: el,
        opacity: {
          value: [1, 0],
          easing: 'easeOutCubic',
        },
        duration: 3000,
        loop: true,
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  outline: 0;
  border: 0;
  color: white;
  border-radius: 5px;
  height: 30px;
}
.success {
  background-color: #28a745;
}
.danger {
  background-color:  #ff4136;
}

.primary {
  color: #0074d9;
}
</style>
