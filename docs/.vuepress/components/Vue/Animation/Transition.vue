<template>
  <div>
    <show-panel class="panel"
                title="Transition"
                transitionName="fade"
                showText="Hello"></show-panel>
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

<style scoped>
.panel {
  color: red;
  }
</style>
