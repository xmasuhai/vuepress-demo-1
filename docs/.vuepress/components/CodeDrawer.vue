<template>
  <div>
    <div class="component-wrapper">
      <div class="component-wrapper-demo">
        <!--
        组件展示位置
        -->
        <slot name="vComponent">组件展示位置</slot>
      </div>
      <div class="code-content" style="height: 0;">
        <!--
        <div class="code-user-desc">
          组件描述说明
        </div>
        -->
        <div class="code-content-height">
          <!--
          <div class="code-user-desc">
            组件代码
          </div>
          -->
          <pre>
            <code class="vue">
              {{ codeStr }}
            </code>
          </pre>
        </div>
      </div>
      <!--
      code drawer
      -->
      <div class="lock-code" @click="showCode(0)">
        <!--
        <w-icon class="icon-down" :name="isShow[0] === false ? 'down' : 'up'"></w-icon>
        -->
        <span class="lock-code-word">{{ isShow[0] === false ? '显示代码' : '隐藏代码' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import accordion from '../mixins/accordion.js'

export default {
  name: 'accordion',
  mixins: [accordion],
  data() {
    return {
      codeStr: `

        `.replace(/^\s*/gm, '').trim(),
    }
  }
}
</script>

<style lang="scss" scoped>
.component-wrapper {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;

  .component-wrapper-demo {
    padding: 24px 24px 15px 24px;
    }

  h4 {
    margin: 55px 0 20px;
    }

  &:hover {
    .lock-code .lock-code-word {
      font-size: 14px;
      transform: translateX(-40px);
      opacity: 1;
      }

    .lock-code .icon-down {
      transform: translateX(-40px);
      }

    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

  .code-content {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    transition: height .2s;

    .code-content-height {
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

      .icon-down {
        fill: #409eff;
        }
      }

    .icon-down {
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
