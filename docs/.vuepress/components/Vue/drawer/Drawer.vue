<template>
  <div class="lock-code" @click="showCode">
    <Icon
        class="icon-hover"
        :name="isShowCode === false ? 'i-arrow-down' : 'i-arrow-up'"
    ></Icon>
    <span class="lock-code-word">
      {{ isShowCode === false ? '显示代码' : '隐藏代码' }}
    </span>
  </div>
</template>

<script>
import '/docs/.vuepress/public/svgs/iconfont.js'

export default {
  name: 'drawer',
  data() {
    return {
      isShowCode: this.isShowCodeContent
    }
  },
  props: {
    isShowCodeContent: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showCode() {
      this.isShowCode = !this.isShowCode
      this.$emit('update:isShowCodeContent', this.isShowCode)
    }
  }
}
</script>

<style lang="scss" scoped>
.lock-code {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
  line-height: 44px;

  &:hover {
    background-color: #f9fafc;

    .lock-code .lock-code-word {
      font-size: 14px;
      transform: translateX(-40px);
      opacity: 1;
    }

    .lock-code .icon-hover {
      transform: translateX(-40px);
    }

    .lock-code-word {
      color: #409eff;
    }

    .icon-hover {
      fill: #409eff;
      color: #409eff;
    }
  }

  .icon-hover {
    transform: translateX(0px);
    transition: all .1s;
  }

  .lock-code-word {
    font-size: 0;
    margin-left: 15px;
    display: inline-block;
    transition: all .1s;
    opacity: 0;
  }
}

</style>
