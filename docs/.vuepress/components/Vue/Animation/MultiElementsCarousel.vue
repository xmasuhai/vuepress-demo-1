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
  @import "../../../mixins/Animations";
}
</style>
