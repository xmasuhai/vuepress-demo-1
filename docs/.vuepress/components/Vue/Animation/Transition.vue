<template>
  <div>
    <show-panel class="panel"
                title="Transition"
                transitionName="fade"
                showText="Hello">
    </show-panel>
  </div>
</template>

<script>
import ShowPanel from './ShowPanel.vue'

export default {
  data() {
    return {}
  },
  components: {
    ShowPanel
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    width: 100px;
  }

  p {
    width: 300px;
  }
}
</style>
