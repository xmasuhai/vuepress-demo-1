<template>
  <div>
    <div class="component-wrapper">
      <div class="component-wrapper-demo">
        <slot :name="slotName">组件展示位置</slot>
      </div>
      <Drawer :isShowCodeContent.sync="showCodeContent"></Drawer>
      <div class="code-content" style="height: 0">
        <div class="code-user-desc"> 组件描述说明 </div>
        <div class="code-content-height" v-show="showCodeContent">
          <div class="code-user-desc">
            组件代码
          </div>
          <pre v-highlightjs>
            <code class="vue" v-text="codeStr"></code>
          </pre>
        </div>
      </div>
      <!--
      code drawer
      <div class="lock-code" @click="showCode(0)">
        <Icon
            class="icon-hover"
            :name="isShow[0] === false ? 'i-arrow-down' : 'i-arrow-up'"
        ></Icon>
        <span class="lock-code-word">{{ isShow[0] === false ? '显示代码' : '隐藏代码' }}</span>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import '/docs/.vuepress/public/svgs/iconfont.js'
import Drawer from './Vue/drawer/Drawer'

export default {
  name: 'accordion',
  components: {Drawer},
  data() {
    return {
      // isShow: [],
      codeStr: this.resourceCode,
      showCodeContent: false
    }
  },
  props: {
    slotName: {
      type: String,
      required: true,
    },
    resourceCode: {
      type: String,
    },
    showIndex: {
      type: Number,
      default: 0
      // required: true,
    },
  },
  updated() {
    console.log(this.showCodeContent)
  }
  /*  mounted() {
    console.log(this.slotName);
    console.log(this.codeStr);
  }*/
}
</script>

<style lang="scss" scoped>
.component-wrapper {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  .component-wrapper-demo {
    padding: 24px 24px 15px 24px;
    }

  h4 {
    margin: 55px 0 20px;
    }

  &:hover,
  &::v-deep:hover {
    .lock-code .lock-code-word {
      font-size: 14px;
      transform: translateX(-40px);
      opacity: 1;
      }

    .lock-code .icon-hover {
      transform: translateX(-40px);
      }

    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }

  .code-content {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    transition: height 0.2s;
    margin: 0;
    padding: 0;

    .code-content-height {
      overflow: auto;

      .code-user-desc {
        background: #ffffff;
        margin: 10px 10px 0 10px;
        padding: 5px 10px;
        font-size: 14px;
        line-height: 26px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        }

      > pre {
        background: none;
        margin: 0;
        padding: 0 24px;

        > code {
          color: #3182bd;
          }
        }
      }
    }

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
      transition: all 0.1s;
      }

    .lock-code-word {
      font-size: 0;
      margin-left: 15px;
      display: inline-block;
      transition: all 0.1s;
      opacity: 0;
      }
    }
  }

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  }

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #ccc;
  }

::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #f5f5f5;
  }
</style>
