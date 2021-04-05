<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  data() {
    return {}
  },
  props: {
    name: {
      type: String,
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return (['i-loading', 'i-right', 'i-left', 'i-thumbs-up',
          'i-arrow-down', 'i-arrow-up', 'i-settings', 'i-download']
            .indexOf(value) !== -1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  }
</style>