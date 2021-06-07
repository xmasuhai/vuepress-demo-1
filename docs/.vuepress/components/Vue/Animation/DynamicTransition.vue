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
      @after-enter="enter"
      @leave="leave">
      <p ref="dynamicText" v-show="show">hello</p>
    </transition>
    <br>
    <button
      v-if="stop"
      @click="stop = false; show = !show; isLoop = true"
      class="success">
      Start animating
    </button>
    <button
      v-else
      @click="stop = true; isLoop = false"
      class="danger">
      Stop it!
    </button>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'DynamicTransition',
  data() {
    return {
      show: true,
      toggleText: '',
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true,
    }
  },
  mounted() {
    this.show = true
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = '0'
    },
    enter(el, done) {
      const vm = this
      console.log('this.fadeInDuration: ', this.fadeInDuration)
      const animeEnter = anime({
        targets: el,
        opacity: 1,
        easing: 'easeInCubic',
        duration: this.fadeInDuration,
        complete: (() => {
          const vm = this
          if (!vm.stop) vm.show = false
          console.log('enterCompleteOK')
          done()
        })
      })
      animeEnter.finished.then(function () {
        if (!vm.stop) vm.show = false
        console.log('enterFinishOK')
        done()
      }).then(null, (reason) => {
        console.error(reason)
      })
    },
    leave(el, done) {
      const vm = this
      console.log('this.fadeOutDuration: ', this.fadeOutDuration)
      console.log(this.isLoop)
      const animeLeave = anime({
        targets: el,
        opacity: 0,
        easing: 'easeOutCubic',
        duration: this.fadeOutDuration,
        complete: (() => {
          const vm = this
          vm.show = true
          console.log('leaveCompleteOK')
          done()
        })
      })
      animeLeave.finished.then(function () {
        vm.show = true
        console.log('leaveFinishOK')
      }).then(null, (reason) => {
        console.error(reason)
      })
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
  background-color: #ff4136;
}

.primary {
  color: #0074d9;
}
</style>
