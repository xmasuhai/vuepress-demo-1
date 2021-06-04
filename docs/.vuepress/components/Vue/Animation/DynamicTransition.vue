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
import Anime from 'animejs'

export default {
  name: 'DynamicTransition',
  data() {
    return {
      show: true,
      toggleText: "",
      isLoop: true,
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
      this.$refs.dynamicText.style.opacity = "0"
    },
    enter(el, done) {
      console.log("this.fadeInDuration: ", this.fadeInDuration)
      console.log(this.isLoop)
      Anime({
        targets: this.$refs.dynamicText,
        opacity: 1,
        easing: 'easeInCubic',
        duration: this.fadeInDuration,
        direction: "alternate",
        loop: this.isLoop,
        complete() {
          const vm = this
          if (!vm.stop) vm.show = false
          console.log("enterOK")
          done()
        }
        }
      )
    },
    leave(el, done) {
      console.log("this.fadeOutDuration: ",this.fadeOutDuration)
      console.log(this.isLoop)
      console.log("el: ", el)
      console.log("this.$refs.dynamicText: ", this.$refs.dynamicText)
      Anime({
        targets: this.$refs.dynamicText,
        opacity: 0,
        easing: 'easeOutCubic',
        duration: this.fadeOutDuration,
        direction: "alternate",
        loop: this.isLoop,
        complete() {
          const vm = this
          vm.show = true
          console.log("leaveOK")
          done()
        }
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
