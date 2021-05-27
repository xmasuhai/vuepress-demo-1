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
