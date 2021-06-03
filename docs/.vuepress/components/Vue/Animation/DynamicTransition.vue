<template>
  <div id="dynamic-fade-demo" class="demo">
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
    <p v-show="show">world</p>
    <br>
    <button
      v-if="stop"
      @click="stop = false; show = false"
    >Start animating
    </button>
    <button
      v-else
      @click="stop = true"
    >Stop it!
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
      stop: true
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
        duration: this.fadeInDuration,
        easing: 'easeInCubic',
        loop: true,
        complete() {
          done()
          if (!this.stop) this.show = false
        }
        }
      )
    },
    leave: function (el, done) {
      Anime({
        targets: el,
        opacity: 0,
        duration: this.fadeOutDuration,
        easing: 'easeOutCubic',
        loop: true,
        complete() {
          // done()
          this.show = true
        }
        }
      )
    }
  }
}
</script>
