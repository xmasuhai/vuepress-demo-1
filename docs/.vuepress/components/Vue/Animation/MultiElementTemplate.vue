<template>
  <div>
    <h2> {{ title }} </h2>
    <div class="pose">
      <transition :name="animationName" :mode="animationMode">
        <button :key="buttonKey" @click="eventFn">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiElementTemplate",
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    animationName: {
      type: String,
      required: true,
      default: ''
    },
    animationMode: {
      type: String
    },
    buttonKey: {
      type: [String, Boolean],
      required: true,
      default: ''
    },
    buttonMessage: {
      type: String,
      required: true,
      default: 'Click'
    },
    eventFn: [Function, Boolean]
  }
}
</script>
