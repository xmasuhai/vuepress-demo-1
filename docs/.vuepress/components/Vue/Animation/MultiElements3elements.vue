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
  .fadeSwitch-enter-active, {
    transition: all .3s ease;
  }

  .fadeSwitch-leave-active, {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fadeSwitch-enter, .fadeSwitch-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}

</style>
