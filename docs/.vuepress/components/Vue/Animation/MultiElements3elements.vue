<template>
  <div>
    <multi-element-template title="Toggle 3 elements with mode out-in"
                            animationName="fadeSwitch"
                            animationMode="out-in"
                            :buttonKey="docState"
                            :buttonMessage="buttonMessage"
                            :eventFn="switchingDocState"
                            class="twoElements"
    ></multi-element-template>
  </div>
</template>

<script>
import multiElements from '/docs/.vuepress/mixins/MultiElements.js';
export default {
  name: "MultiElements3elements",
  mixins: [multiElements]
}
</script>

<style lang="scss" scoped>
.twoElements::v-deep {
  @import "../../../common/MultiElements.scss";
}

</style>
