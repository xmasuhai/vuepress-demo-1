<template>
  <div>
    <multi-element-template title="Toggle Carousel with no mode"
                            animationName="carousel"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="threeElements"
    ></multi-element-template>
  </div>
</template>

<script>
import multiElements from '/docs/.vuepress/mixins/MultiElements.js';
export default {
  name: "MultiElementsCarousel",
  mixins: [multiElements]
}
</script>

<style lang="scss" scoped>
.threeElements::v-deep {
  .pose {
    position: relative;
    padding: 100px;

    & > button {
      position: absolute;
    }

    .carousel-enter-active {
      transition: all .3s ease;
    }

    .carousel-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .carousel-enter {
      transform: translateX(100px);
      opacity: 0;
    }

    .carousel-leave-to {
      transform: translateX(-150px);
      opacity: 0;
    }
  }
}
</style>
