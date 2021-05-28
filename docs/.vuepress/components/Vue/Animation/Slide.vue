<template>
  <div class="demoHeight">
    <show-panel title="Slide"
                transitionName="slide-fade"
                buttonText="slide transition"
                showText="Slide Fade "
    ></show-panel>
  </div>
</template>

<script>
import ShowPanel from './ShowPanel.vue'
export default {
  name: "Slide",
  components: {
    ShowPanel
  }
}
</script>

<style lang="scss" scoped>
.demoHeight {
  height: 180px;
}
::v-deep {
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translate3d(30px,30px,0px);
    opacity: 0;
  }
  .animateTarget{
    padding: 5px 5px 5px 0;
  }
}
</style>
