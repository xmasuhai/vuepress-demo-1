<template>
  <div>
    <button @click="view='AnimeJS'">AnimeJS</button>
    <button @click="view='Slide'">Slide</button>
    <transition name="component-fade" mode="out-in">
      <component :is="view"></component>
    </transition>
  </div>
</template>

<script>
import AnimeJS from "./AnimeJS";
import Slide from "./Slide";

export default {
  name: "MultiComponents",
  data() {
    return {
      view: 'AnimeJS'
    }
  },
  components: {
    AnimeJS,
    Slide
  }
}
</script>

<style lang="scss" scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
