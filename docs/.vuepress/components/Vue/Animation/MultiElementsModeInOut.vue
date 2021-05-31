<template>
  <div>
    <multi-element-template title="Toggle 3 elements with mode in-out"
                            animationName="carousel"
                            animationMode="in-out"
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
  name: "MultiElementsModeInOut",
  mixins: [multiElements]
}
</script>

<style lang="scss" scoped>
.threeElements::v-deep {
  @import "../../../mixins/Animations";
}
</style>
