<template>
  <div class="hello">
    <h3>AnimeJS</h3>
    <hr>
    <button @click="go">Click Here to Animate</button>
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
    };
  },
  methods: {
    go() {
      // console.log(anime);
      // bug fix: disable button when anime run
      anime({
        targets: this.$refs.square,
        translateX: 300,
        translateZ: 0,
        easing: "easeInOutQuad",
        direction: "alternate",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
</style>
