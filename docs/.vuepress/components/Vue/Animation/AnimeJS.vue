<template>
  <div class="hello">
    <h3>AnimeJS</h3>
    <hr>
    <button :disabled="isDisabled" @click="go">Click Here to Animate</button>
    <h3 ref="square">hello</h3>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  name: "AnimeJS",
  data() {
    return {
      show: true,
      isDisabled: false,
      disableTime: 1000
    };
  },
  methods: {
    go() {
      // bug fix: disable button when anime run
      this.isDisabled = true
      anime({
        targets: this.$refs.square,
        translateX: 100,
        translateZ: 0,
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: this.disableTime
      });
      setTimeout(()=>{
        this.isDisabled = false
      }, this.disableTime*2)
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
</style>
