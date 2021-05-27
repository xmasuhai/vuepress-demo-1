<template>
  <div>
    <multi-element-template title="Toggle 2 elements"
                            animationName="fadeSwitch"
                            animationMode="out-in"
                            :buttonKey="isEditing"
                            :buttonMessage="isEditing ? 'Save' : 'Edit'"
                            :eventFn="toggle"
                            class="twoElements"
    ></multi-element-template>
  </div>
</template>

<script>
import MultiElementTemplate from "./MultiElementTemplate";

export default {
  name: "MultiElements2elements",
  components: {MultiElementTemplate},
  data() {
    return {
      isEditing: true,
    }
  },
  methods: {
    toggle() {
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style lang="scss" scoped>
.twoElements::v-deep {
  @import "../../../common/MultiElements.scss";
}
</style>
