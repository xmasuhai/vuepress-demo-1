<template>
  <div class="demoHeight">
    <show-panel title="AnimateCSS"
                buttonText="AnimateCSS"
                showText="AnimateCSS TaDa"
                AnimeEnterClassName="animated tada"
                AnimeLeaveClassName="animated bounceOutRight"
    ></show-panel>
  </div>
</template>

<script>
import ShowPanel from './ShowPanel.vue'
import 'animate.css'

export default {
  name: "AnimateCSS",
  components: {
    ShowPanel
  }
}
</script>

<style scoped>
.demoHeight {
  height: 200px;
}
</style>
