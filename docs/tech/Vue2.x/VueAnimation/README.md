---
title: Vue Animation
lang: zh-CN
description: 记录一些 Vue 动画常见用法
prev: /tech/Vue2.x/VuePress/
next: /tech/Vue2.x/VuePress/
---

## 大纲

- Vue动画方式1 - `CSS transition`
- Vue动画方式2 - `CSS animation`
- Vue动画方式3 - JS 操作动画
- Vue动画方式4 - 多元素动画
- Vue动画方式5 - 列表动画
- Vue动画方式6 - 组件过渡动效
- 总结之前的几种动画库
- 项目运用

---

> 首先了解 Vue文档中的 [进入/离开 & 列表过渡](https://cn.vuejs.org/v2/guide/transitions.html)

- Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：
  - 在 CSS **过渡**和**动画**中自动应用 `class`
  - 可以配合使用第三方 **CSS 动画库**，如 `Animate.css`
  - 在**过渡钩子函数**中使用 `JavaScript` 直接操作 DOM
  - 可以配合使用**第三方 `JavaScript` 动画库**，如 `Velocity.js`

---

## Vue动画方式1 - `CSS transition`

- Vue 提供封装的`<transition name="xxx"></transition>`标签，在标签内写需要设置动画的节点
- 给任何元素/组件 添加 **进入/离开** 过渡效果
  - 条件渲染`v-if`
  - 条件展示`v-show`
  - 动态组件`v-bind:is=""`
  - 组件根节点
- `name="xxx"` 可设置类样式的前缀
  - `xxx-enter-active`
  - `xxx-leave-active`
  - `xxx-enter`
  - `xxx-leave-to`
- 注意样式隔离（例如设置`name="fade"`）
  - `.fade-enter-active, .fade-leave-active {}`
  - `.fade-enter, .fade-leave-to {}`
- 一些 UI 组件库的CSS全局样式会污染默认样式

> 例子

<ClientOnly>
  <code-drawer slotName="CSS_transition" :resourceCode='`
<template>
  <div>
    <show-panel class="panel"
                title="Transition"
                transitionName="fade"
                showText="Hello">
    </show-panel>
  </div>
</template>
`'>
    <template v-slot:CSS_transition>
      <Vue-Animation-Transition></Vue-Animation-Transition>
    </template>
  </code-drawer>
</ClientOnly>

---

::: demo CSS transition

```vue
<template>
  <div class="fixHeight80">
    <h2>{{ title }}</h2>
    <br>
    <button @click="visible = !visible">
      Toggle
    </button>

    <transition :name="transitionName">
      <p v-if="visible">{{ showText }}</p>
    </transition>
    <br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      title: 'Transition',
      transitionName: 'fade',
      showText: 'Hello',
    }
  }
}
</script>

<style>
.fixHeight100 {
  height: 100px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

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
</style>

```

:::

---

- 用`<transition></transition>`包裹需要加动画的节点
- 设置属性`name`: `<transition name="fade">`
- 设置**初始样式**，比如
  - `width` 必须有初始值
  - `opacity` 无需设置初始值，初始即为`1`
- 设置**过度样式**
  - `.fade-enter-active, .fade-leave-active {transition: all 2s;}`
  - `.fade-enter, .fade-leave-to {...}`
- 设置 **切换条件** `v-if` / `v-show`

> 过渡过程`name`属性值替代`v`

- 淡入的第一帧 `.v-enter` 元素插入前生效的样式，插入后下一帧删除
- 进入过度生效时状态 `.v-enter-active` 过渡/动画中 `.v-active {transition: all 2s;}` 此时使用`transition`过渡
- 进入过度结束状态`.v-enter-to` 淡入最后一帧 添加样式
- 一般不需要`.v-enter-to`或`.v-leave`，结束状态即初始状态
- 完成过渡，删除所有过渡`v`的样式，只保留元素自身的样式
- `v-leave` -> `v-leave-active` -> `v-leave-to` 离开过渡
- `.v-enter-active` `v-leave-active` 在过渡/动画完成之后移除
  - 这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数
- `v-enter-to` `v-leave-to` 在过渡/动画完成之后移除
- 使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀
  - 如果使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

![pic](https://cn.vuejs.org/images/transition.png)

### CSS transition 过渡 另一个例子 Slide

---

<ClientOnly>
<code-drawer slotName="CSS_Slide" :resourceCode='`
<template>
  <div class="demoHeight">
    <show-panel title="Slide"
                transitionName="slide-fade"
                showText="Slide Fade "
    ></show-panel>
  </div>
</template>
<script>
import ShowPanel from "./ShowPanel.vue"
export default {
  name: "Slide",
  components: {
    ShowPanel
  }
}
</script>
<style lang="scss" scoped>
.demoHeight {
  height: 180px;
}
::v-deep {
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translate3d(30px,30px,0px);
    opacity: 0;
  }
  .animateTarget{
    padding: 5px 5px 5px 0;
  }
}
</style>
`'>
<template v-slot:CSS_Slide>
<Vue-Animation-Slide></Vue-Animation-Slide>
</template>
</code-drawer>
</ClientOnly>

---

::: demo CSS transition

```vue

<template>
  <div class="demoHeight">
    <button @click="show = !show">
      Toggle render
    </button>
    <transition name="slide-fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'slide',
  data() {
    return {
      show: true
    }
  }
}
</script>

<style>
.demoHeight {
  height: 40px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

```

:::

> 小结

- `<transition name="xxx">` 标签
- 切换条件`v-if` / `v-show`
- 样式
  - 元素自身样式
  - 添加初始样式（`in / out`）
  - 添加过渡属性
    - `transition: transition-property，transition-duration，transition-timing-function transition-delay ;`

---

> 在`codepen`可以快速尝试适合的依赖环境

---

## Vue动画方式2- `CSS animation`

### 使用`animation`属性和`@keyframes`关键帧动画

> 使用方法

- 同样使用`<transition name="xxx">` 标签，`name="xxx"`为类样式前缀
- 区别于`CSS transition` 过渡属性：
  - 在`CSS animation` 动画属性 `v-enter` 类名在节点插入 `DOM` 后不会立即删除
  - 而是在 **`animationend` 事件 (MDN)** 被触发时删除
  - [**`animationend` 事件 (MDN)**](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/animationend_event)
- 在`@keyframes`各个关键帧中设置变形、颜色、透明等属性    
  - 需要设置过渡状态的类样式
  - `.xxx-enter-active{animation: ...}`：正在淡入
  - `.xxx-leave-active{animation: ...}`：正在淡出
  - 在`@keyframes`中 设置关键帧（`to / from / 0% / 100%`）代替`enter / leave`
  - `reverse`反向淡出动画，设置`.xxx-leave.active{animation: animationName 1s reverse}`
  - 保证最终状态即正常状态

---

<ClientOnly>
  <code-drawer slotName="CSS_Animation" :resourceCode='`
<template>
  <div class="demoHeight">
    <show-panel title="CSS Animation"
                transitionName="bounce"
                buttonText="show animation"
                :showText="showAnimation"
    ></show-panel>
  </div>
</template>
<script>
import ShowPanel from "./ShowPanel.vue"
export default {
  name: "Animation",
  data() {
    return {
      showAnimation: "
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Mauris facilisis enim libero,
      at lacinia diam fermentum id.
      Pellentesque habitant morbi tristique senectus et netus.
      "
    }
  },
  components: {
    ShowPanel
  }
}
</script>
<style lang="scss" scoped>
.demoHeight {
  height: 300px;
}
::v-deep {
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>`'>
    <template v-slot:CSS_Animation>
      <Vue-Animation-Animation></Vue-Animation-Animation>
    </template>
  </code-drawer>
</ClientOnly>

---

::: demo CSS animation

```vue
<template>
<div class="fixHeight150">
  <button @click="showAnimation = !showAnimation">
    show Animation
  </button>
  <transition name="bounce">
    <p v-if="showAnimation">
      Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
      Mauris facilisis enim libero,
      at lacinia diam fermentum id.
      Pellentesque habitant morbi tristique senectus et netus.
    </p>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      showAnimation: true
    }
  },
}
</script>

<style>
.fixHeight150 {
  height: 150px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

```

:::

### 自定义过渡类名

> 在以下的`<trasition>`标签属性中可添加自定义过渡类名

- `enter-class`
- **`enter-active-class`**
- `enter-to-class (2.1.8+)`
- `leave-class`
- **`leave-active-class`**
- `leave-to-class (2.1.8+)`

> 例如：

- `<transition enter-active-class="xxx" leave-active-class="yyy">...</transition>`

### 结合`animate.css`动画库使用

> 测试支持的版本

- 在`codepen`中，直接选取依赖版本尝试运行是否成功
- 如果是本地项目
  - 先在`BootCDN`找到库引用，选择版本，直接插入项目的`index.html`
  - 尝试是否可以运行
  - 将可以正常运行的版本号作为`yarn add -D xxx@***`的依据
  - 导入入口文件`import ...*.js/ts`

---

> `Vue2.x`运行环境（经过在`codepen`中的测试）

- `@vue/cli-plugin-babel@4.1.1`
- `animate.css@3.6.1`或`animate.css@4.1.1`
- `vue@2.6.11`

> 或者`Vue3.x`运行环境

- `@vue/cli-plugin-babel@4.5.12`
- `animate.css@4.1.1`
- `vue@3.0.11`

> 安装`animate.css`

```sh
yarn add animate.css@3.6.1
```

> 在入口文件`main.ts`中导入

```js
import 'animate.css'
```

> 使用`animate.css`

- 注意使用时`animate.css@3.6.1`与`animate.css@4.1.1`类前缀不同
- 导入到入口文件`main.js/ts`中去：`import 'animate.css'`
- 编译后会自动添加相应的`<style></style>`标签为全局样式

> 例子 `animate.css`

<ClientOnly>
  <code-drawer slotName="CSS_AnimateCSS" :resourceCode='`
<template>
  <div>
    <show-panel class="panel"
                title="Transition"
                transitionName="fade"
                showText="Hello">
    </show-panel>
  </div>
</template>`'>
    <template v-slot:CSS_AnimateCSS>
      <Vue-Animation-AnimateCSS></Vue-Animation-AnimateCSS>
    </template>
  </code-drawer>
</ClientOnly>

---

::: demo CSS animate.css@3.6.1

```vue
<template>
  <div>
    <button @click="showAnimateCSS = !showAnimateCSS">
      Toggle
    </button>
    <transition enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight">
      <p v-if="showAnimateCSS">hell O</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAnimateCSS: true
    }
  }
}
</script>

```

:::

---

- CSS 动画样式在第三方库中已预设
- 添加属性`enter-active-class` `leave-active-class`
  - `<transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">`
- [Animate Css官网](https://animate.style/#custom-builds)

> 自定义过渡类名配合使用`animate.css`和使用`animation`属性和`@keyframes`关键帧动画不兼容

---

## Vue动画方式3 - JS 操作动画

- 在 `attribute` （横线连接 (`kebab-case`)） 中声明 JavaScript 钩子（驼峰式连接）
- 在`methods`中写对应的方法

```vue
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

- 动画的生命周期
  - `@before-enter` `@enter` `@after-enter` `@enter-cancelled`
  - `@before-leave` `@leave` `@after-leave` `@leave-cancelled`

---

### 不推荐`Velocity.js`(译为：速度) 动画库（`github REPO`已停止维护）

- `yarn add velocity-animate@beta`
- [`velocity-animate@2.0.6`](https://github.com/julianshapiro/velocity/)
- [Velocity v2 文档](https://github.com/julianshapiro/velocity/wiki)

> 安装稳定版

```sh
yarn add velocity-animate
```

> 使用略

---

### 配合动画库`animejs@3.2.1`

- [中文文档](https://www.animejs.cn/documentation/)
  - [Anime.js Demo](https://www.animejs.cn/demo/)
  - [文档 Demo](https://www.animejs.cn/documentation/)
- 安装 `"animejs": "^3.2.1"`(如果装TS 还需`"@types/animejs": "^3.1.3"`)

> 参考文章

- 推荐使用自定义指令实现的`animejs`二次封装库[vue-anime](https://github.com/BenAHammond/vue-anime)
  - [Vuenime demo](https://denisinvader.github.io/vuenime/?path=/story/objects--with-colors/)
- 支持时间线控制，分组动画的`animejs`二次封装库[vue-anime](https://github.com/liuhann/vue-anime)
- [Anime+Vue<粒子按键效果>](https://www.jianshu.com/p/ff3887420935/)
- [Anime+Vue<小人奔跑效果>](https://www.jianshu.com/p/92078f5247a4/)

> `temp link`

- [webpack - 如何在Vue-Cli项目中使用anime.js(或任何外部库)？](https://www.coder.work/article/1328687)
- [如何将anime.js导入我的Vue项目？](https://www.thinbug.com/q/49258336)

> 用例 安装 `"animejs": "^3.2.1"`(如果装TS 还需`"@types/animejs": "^3.1.3"`)

<ClientOnly>
  <code-drawer slotName="AnimeJS" :resourceCode='`
<template>
  <div class="hello">
    <h3>AnimeJS</h3>
    <hr>
    <button :disabled="isDisabled"
            @click="go"
            :class="{ cursorBan: isBanned }"
    >Click Here to Animate
    </button>
    <h3 ref="square">hello</h3>
  </div>
</template>
<script>
import anime from "animejs";
export default {
  name: "AnimeJS",
  data() {
    return {
      show: true,
      isDisabled: false,
      disableTime: 1000,
      isBanned: false
    };
  },
  methods: {
    go() {
      // bug fix: disable button when anime run
      this.isDisabled = true
      this.isBanned = true
      anime({
        targets: this.$refs.square,
        translateX: 100,
        translateZ: 0,
        easing: "easeInOutQuad",
        direction: "alternate",
        duration: this.disableTime
      });
      setTimeout(() => {
        this.isDisabled = false
        this.isBanned = false
      }, this.disableTime * 2)
    }
  }
};
</script>
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
.cursorBan {
  cursor: not-allowed;
}
</style>`'>
<template v-slot:AnimeJS>
<Vue-Animation-AnimeJS></Vue-Animation-AnimeJS>
</template>
  </code-drawer>
</ClientOnly>

---

### 配合动画库`GSAP`

---

## Vue动画方式4 - 多元素动画

> 示例

```vue
<transition>
  <article v-if="items.length > 0">
    <!-- 多标签过渡是一个列表和描述这个列表为空消息的元素 -->
  </article>
  <p v-else>Sorry, no items found.</p>
</transition>

<!-- 相同标签名的元素切换 -->
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>

<!-- d多个标签名的元素切换 -->
<transition>
  <button v-if="docState === 'saved'" key="saved">
    Edit
  </button>
  <button v-if="docState === 'edited'" key="edited">
    Save
  </button>
  <button v-if="docState === 'editing'" key="editing">
    Cancel
  </button>
</transition>
```

- 写在`<transition></transition>`标签上的属性 **过渡模式** `mode="out-in"`，先退出，再进入
- `<transition></transition>`标签中包含 **原生标签**
  - 对于**不同**标签名的元素切换
    - 使用 `v-if/v-else`
  - 对于**相同**标签名的元素切换
    - 必须通过 `key attribute` 设置唯一的值来标记以让 `Vue` 区分
    - 多个相同结构与属性的元素进行合并，使用动态绑定`:key`区分，代替`v-if/v-else`
- 如果使用 **过渡模式** `mode="in-out"`，需要将元素设置为**绝对定位**
- 轮播效果无需设置过渡模式

---

### 元素切换实例

<ClientOnly>
  <code-drawer infoText="多元素动画" slotName="CSS_MultiElements2elements" :resourceCode='`
<template>
  <div>
    <h2>Toggle "Save" & "Edit"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="isEditing" @click="isEditing = ! isEditing">
        {{ isEditing ? "Save" : "Edit" }}
      </button>
    </transition>
    <hr>
  </div>
</template>
<script>
export default {
  name: "MultiElements2elements",
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
</style>`'>
<template v-slot:CSS_MultiElements2elements>
<Vue-Animation-MultiElements2elements></Vue-Animation-MultiElements2elements>
</template>
  </code-drawer>
</ClientOnly>

---

<ClientOnly>
  <code-drawer infoText="多元素动画" slotName="CSS_MultiElements3elements" :resourceCode='`
<template>
  <div>
    <h2>Toggle "Save" & "Edit" & "Cancel"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="docState" @click="switchingDocState">
        {{ buttonMessage }}
      </button>
    </transition>
    <hr>
  </div>
</template>
<script>
export default {
  name: "MultiElements3elements",
  data() {
    return {
      docStateList: ["saved", "edited", "editing"],
      docState: "saved",
      tempList: [],
      stateCount: 0
    }
  },
  computed: {
    buttonMessage: {
      get: function () {
        return {
          "saved": "Edit",
          "edited": "Save",
          "editing": "Cancel",
        }[this.docState]
      },
      set: function (state) {
        this.docState = state
      }
    }
  },
  beforeMount() {
    this.tempList = [...this.docStateList]
  },
  methods: {
    switchingDocState() {
      this.docState = this.tempList.pop();
      if(this.tempList.length === 0) {
        this.tempList = [...this.docStateList]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.threeElements::v-deep {
  .pose {
    position: relative;
    padding: 100px;
    &>button {
      position: absolute;
    }
    .carousel-enter-active {
      transition: all .3s ease;
    }
    .carousel-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .carousel-enter {
      background: red;
      transform: translateX(100px);
      opacity: 0;
    }
    .carousel-leave-to {
      transform: translateX(-150px);
      opacity: 0;
    }
  }
}
</style>`'>
<template v-slot:CSS_MultiElements3elements>
<Vue-Animation-MultiElements3elements></Vue-Animation-MultiElements3elements>
</template>
  </code-drawer>
</ClientOnly>

---

<ClientOnly>
  <code-drawer infoText="多元素动画" slotName="CSS_MultiElementsModeInOut" :resourceCode='`
<template>
  <div>
    <h2>Mode in-out</h2>
    <hr>
    <div class="pose">
      <transition name="carousel" mode="in-out">
        <button :key="docState" @click="switchingDocState">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
  </div>
</template>
<script>
// 同上例 略
</script>
<style lang="scss" scoped>
/* 同上例 略 */
</style>`'>
<template v-slot:CSS_MultiElementsModeInOut>
<Vue-Animation-MultiElementsModeInOut></Vue-Animation-MultiElementsModeInOut>
</template>
  </code-drawer>
</ClientOnly>

---

<ClientOnly>
  <code-drawer infoText="多元素动画" slotName="CSS_MultiElementsCarousel" :resourceCode='`
<template>
  <div>
    <h2>Toggle Carousel with no mode</h2>
    <div class="pose">
      <transition name="carousel">
        <button :key="docState" @click="switchingDocState">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
  </div>
  </div>
</template>
<script>
// 同上例 略
</script>
<style lang="scss" scoped>
/* 同上例 略 */
</style>`'>
<template v-slot:CSS_MultiElementsCarousel>
<Vue-Animation-MultiElementsCarousel></Vue-Animation-MultiElementsCarousel>
</template>
  </code-drawer>
</ClientOnly>

- 注意：不要在`<transition>`标签内写JS行内表达式，而是要写到方法`methods`中
- 否则会引起无线循环渲染报错` [Vue warn]: You may have an infinite update loop in a component render function `

---

### 多个组件的过渡

- 不需要使用 `key attribute`，使用动态组件

<ClientOnly>
  <code-drawer infoText="多组件动画" slotName="CSS_MultiComponents" :resourceCode='`
<template>
  <div>
    <button @click=view="AnimeJS">AnimeJS</button>
    <button @click=view="Slide">Slide</button>
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
      view: "AnimeJS"
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
</style>`'>
<template v-slot:CSS_MultiComponents>
<Vue-Animation-MultiComponents></Vue-Animation-MultiComponents>
</template>
  </code-drawer>
</ClientOnly>

---

```vue
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

```

---

## Vue动画方式 5 - 列表动画 `<transition-group>`

::: tip

- 除了渲染**单个节点**或者**同一时间渲染多个节点中的一个**，`Vue` 还能**同时渲染整个列表**

:::

```vue
<div>
  <button @click="add">Add</button>
  <button @click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" :key="item">
      {{ item }}
    </span>
  </transition-group>
</div>
```

- 利用`<transition-group></transition-group>`可以对`v-for`渲染的每个元素应用过渡效果

::: tip

- 由于循环渲染的多个元素需要放在一个标签中，但是如果直接在`<transition-group></transition-group>`中写一个包裹元素，则子元素不是循环渲染的元素
- `vue`使用`tag attribute`，编译时将`<transition-group tag="xxx">`替换为设置的元素名`xxx`

:::

- 不同于 `<transition>`，用`<transition-group></transition-group>`会以一个**真实元素**呈现：
  - 默认为一个 `<span>`
  - 可以通过 `tag attribute` 更换为其他元素
- 过渡模式`mode attribute`不可用，因为不再相互切换特有的单个元素
- 内部元素必须提供唯一的 `key attribute` 值
- CSS 过渡的类将会应用在内部的元素中，而不是这个**组/容器**本身

### 列表的进入/离开过渡(`enter/leave`)

> 示例

<ClientOnly>
  <code-drawer infoText="列表动画" slotName="CSS_ListTransition" :resourceCode='`
<template>
  <div>
    <button @click="add">Add</button>
    <button @click="remove">Remove</button>
    <transition-group name="listComplete"
                      tag="p">
      <span v-for="item in items"
            :key="item"
            class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "ListTransition",
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      nextNum: 6
    }
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.listComplete-item {
  display: inline-block;
  margin-right: 10px;
}
.listComplete-enter-active,
.listComplete-leave-active {
  transition: all 1s;
}
.listComplete-enter,
.listComplete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.listComplete-move {
  transition: all 1s;
}
.listComplete-leave-active {
  position: absolute;
}
</style>`'>
  <template v-slot:CSS_ListTransition>
    <Vue-Animation-ListTransition></Vue-Animation-ListTransition>
  </template>
  </code-drawer>
</ClientOnly>

---

> 解决当 **添加和移除** 元素时 **平滑过渡** 的问题

- 当添加和移除元素的时候，周围的元素会瞬间移动到他们的**新布局的位置**，而不是平滑的过渡
- 设置`<transition-group name="xxx">`的`xxx-move {}`和`xxx-leave-active {}` 类的样式可以实现平滑过渡
  - `xxx-move {transition: all 1s;}`
  - `xxx-leave-active {position: absolute;}`
  
### 列表的移动过渡(`move`)

- 使用 `v-move class`(其中的`v` 是用置`<transition-group name="xxx">`中的属性`name`代替)
  - 不仅可以进入和离开动画，还可以改变定位，即为在元素的改变定位的过程中应用
  - 设置 **过渡的切换时机** 和 **过渡曲线** 的例子
- 可以通过 `name attribute` 来自定义前缀
- 也可以通过 `move-class attribute` 手动设置

> 示例

- 安装`yarn add lodash`
- 引入`import _ from 'lodash';`
- 示例中为列表设置了排序时移动的过渡

<ClientOnly>
  <code-drawer infoText="列表动画" slotName="CSS_ListFlipMoveClass" :resourceCode='`
<template>
  <div>
    <button @click="shuffle">shuffle</button>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item"
          class="flip-list-item">
        {{ item }}
      </li>
    </transition-group>
    <br>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>
<script>
import _ from "lodash"
export default {
  name: "ListFlipMoveClass",
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  methods: {
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list-item {
  display: inline-block;
  margin-right: 10px;
}
.flip-list-leave-active {
  position: absolute;
}
.flip-list-move {
  transition: transform 1s;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>`'>
    <template v-slot:CSS_ListFlipMoveClass>
      <Vue-Animation-ListFlipMoveClass></Vue-Animation-ListFlipMoveClass>
    </template>
  </code-drawer>
</ClientOnly>

---

- 内部的实现：Vue 使用了一个叫 [FLIP](https://aerotwist.com/blog/flip-your-animations/) 简单的动画队列
- 使用 transforms 将元素从之前的位置平滑过渡新的位置
- 注意使用 FLIP 过渡的元素不能设置为 `display: inline`
- 作为替代方案，可以设置为 `display: inline-block` 或者放置于 `flex` 中

> 综合示例 使列表的一切变动都会有动画过渡

- 封装了`.../mixins/random.js`的逻辑

<ClientOnly>
  <code-drawer infoText="列表动画" slotName="CSS_ListFlipShuffleMove" :resourceCode='`
<template>
  <div>
    <button @click="shuffle">Shuffle Move</button>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item"
          class="flip-list-item">
        {{ item }}
      </li>
    </transition-group>
    <br>
    <transition-group name="flip-list"
                      tag="ul">
      <li v-for="item in items"
          :key="item">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>
<script>
import _ from "lodash"
import randoms from "../../../mixins/random.js"
export default {
  name: "ListFlipShuffleMove",
  mixins: [randoms],
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    shuffle() {
      this.oddEven()
      this.randomIndex()
      this.items = _.shuffle(this.items)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../mixins/Animations";
</style>`'>
<template v-slot:CSS_ListFlipShuffleMove>
<Vue-Animation-ListFlipShuffleMove></Vue-Animation-ListFlipShuffleMove>
</template>
  </code-drawer>
</ClientOnly>

---

### 列表`<transition-group>`的多维网格过渡

> 示例

<ClientOnly>
  <code-drawer infoText="多维网格过渡" slotName="CSS_ListFlipGrid" :resourceCode='`
<template>
  <div>
    <h1>ListFlipGrid</h1>
    <button @click="shuffle">
      Shuffle
    </button>
    <transition-group name="cell" tag="div" class="container">
      <div v-for="cell in cells" :key="cell.id" class="cell">
        {{ cell.number }}
      </div>
    </transition-group>
  </div>
</template>
<script>
import _ from "lodash"
export default {
  name: "ListFlipGrid",
  data() {
    return {
      cells: Array.apply(null,
        {length: 81})
        .map(function (item, index) {
          return {
            id: index,
            number: (index % 9) + 1
          }
        })
    }
  },
  methods: {
    shuffle: function () {
      this.cells = _.shuffle(this.cells)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 238px;
  margin-top: 10px;
  .cell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #aaa;
    margin-right: -1px;
    margin-bottom: -1px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(27n) {
      margin-bottom: 0;
    }
    &-move {
      transition: transform 1s;
    }
  }
}
</style>`'>
  <template v-slot:CSS_ListFlipGrid>
    <Vue-Animation-ListFlipGrid></Vue-Animation-ListFlipGrid>
  </template>
  </code-drawer>
</ClientOnly>

---

### 列表`<transition-group>`的交错过渡 `Staggered`

> 示例

<ClientOnly>
  <code-drawer infoText="多维交错过渡" slotName="CSS_ListStagger" :resourceCode='`
<template>
  <div ref="staggered">
    <input v-model="query">
    <transition-group name="staggered-fade"
                      tag="ul"
                      :css="false"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
      <li v-for="(item, index) in computedList"
          :key="item.msg"
          :data-index="index">
        {{ item.msg }}
      </li>
    </transition-group>
  </div>
</template>
<script>
import Anime from "animejs"
export default {
  name: "listStagger",
  data() {
    return {
      query: "",
      list: [
        {msg: "Bruce Lee"},
        {msg: "Jackie Chan"},
        {msg: "Chuck Norris"},
        {msg: "Jet Li"},
        {msg: "Kung Fury"}
      ],
    }
  },
  computed: {
    computedList: function () {
      return this.list.filter((item) => {
        return item.msg
          .toLowerCase()
          .indexOf(this.query.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      Anime({
        targets: el,
        opacity: 1,
        height: "1.6em",
        delay: el.dataset.index * .15,
        easing: "linear",
        complete: done()
      })
    },
    leave(el, done) {
      Anime({
        targets: el,
        opacity: 0,
        height: 0,
        delay: el.dataset.index * .15,
        easing: "linear"
        // complete: done()
      })
    }
  }
}
</script>`'>
<template v-slot:CSS_ListStagger>
  <Vue-Animation-ListStagger></Vue-Animation-ListStagger>
</template>
  </code-drawer>
</ClientOnly>

---

## `<transition>` 或 `<transition-group>`的可复用的过渡

> 过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件：

- 直接将`<transition>` 或 `<transition-group>`作为根组件，加上方法或样式，进行统一封装
- 使用插槽`<slot></slot>`，使用时将任何子组件放置在其中

```vue
<template>
  <transition
          name="very-special-transition"
          mode="out-in"
          v-on:before-enter="beforeEnter"
          v-on:after-enter="afterEnter"
  >
    <slot></slot>
  </transition>
</template>
<script>
export default {
  methods: {
    beforeEnter: function (el) { // ... },
    afterEnter: function (el) { // ... }
  }
}
</script>

```

## `<transition>` 或 `<transition-group>`的动态过渡

- 过渡也是数据驱动
- 动态过渡最基本的例子是通过 `name attribute` 来绑定动态值
- 用 Vue 的过渡系统来定义的 CSS 过渡/动画在不同过渡间切换

```vue
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```

---

```HTML
<transition-group name="fade">
    <div v-for="c in courses" :key="c.name">
        {{ c.name }} - ￥{{c.price}} 
    </div>
</transition-group>
<style lang="scss" scoped>
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 1.5s;
}
</style>

```

---

## 总结之前的几种动画

- 手动设置持续时间 显性过渡时间
- 绑定 `:duration`属性
- `:duration="1000"` `:duration="{enter： 1000, leave: 2000}"`

---

## 动画库

### 第三方 CSS 动画库[`Animate.css`](https://www.dowebok.com/demo/2014/98/)

- 安装`yarn add animate.css@3.6.1`

```html
<template>
<div>
  <button @click="showAnimateCSS = !showAnimateCSS">
    Toggle render
  </button>
  <transition name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight">
    <p v-if="showAnimateCSS">hello</p>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      showAnimateCSS: true
    }
  },
}
</script>

<style lang="scss" scoped>
// ...
</style>

```

- CSS在第三方库中预设好了
- 添加属性`enter-active-class` `leave-active-class`
  - `<transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">`
- [animate.css 官网](https://animate.style/#custom-builds)

---

---

> 方案导向

---

## 项目运用

- Tab切换
- 轮播
- 跳动的心动画

---

> 参考

- codepen
- codeSandBox
- [vue中使用animate.css实现动画](https://www.jianshu.com/p/2e0b2f8d40cf/)
- [5分钟学会Vue动画效果](https://juejin.cn/post/6844903636888207373/)
- [优美的v-for列表加载动画：vue动画钩子实践](https://juejin.cn/post/6869195042599206919)

---
---
