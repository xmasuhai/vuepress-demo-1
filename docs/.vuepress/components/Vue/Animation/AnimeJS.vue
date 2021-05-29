<template>
  <div class="hello">
    <h3>AnimeJS</h3>
    <hr>
    <button :disabled="isDisabled"
            @click="go"
            :class="{ cursorBan: isBanned }"
    >Click Here to Animate
    </button>
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
      disableTime: 1000,
      isBanned: false
    };
  },
  methods: {
    go() {
      // bug fix: disable button when anime run
      this.isDisabled = true
      this.isBanned = true
      anime({
        targets: this.$refs.square,
        translateX: 100,
        translateZ: 0,
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: this.disableTime
      });
      setTimeout(() => {
        this.isDisabled = false
        this.isBanned = false
      }, this.disableTime * 2)
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

.cursorBan {
  cursor: not-allowed;
}
</style>
