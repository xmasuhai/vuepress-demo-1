<template>
  <div class="demoHeight">
    <show-panel title="CSS Animation"
                transitionName="bounce"
                buttonText="show animation"
                :showText="showAnimation"
    ></show-panel>
  </div>
</template>

<script>
import ShowPanel from './ShowPanel.vue'
export default {
  name: 'Animation',
  data() {
    return {
      showAnimation: `
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Mauris facilisis enim libero,
      at lacinia diam fermentum id.
      Pellentesque habitant morbi tristique senectus et netus.
      `
    }
  },
  components: {
    ShowPanel
  }
}
</script>

<style lang="scss" scoped>
.demoHeight {
  height: 300px;
}
::v-deep {
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
