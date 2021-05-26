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

## Vue动画方式1 - CSS transition

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
- 注意样式隔离
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
- 进入过度结束状态`.v-enter-to` 淡入最后一帧 添加样式\
- 一般不需要`.v-enter-to`或`.v-leave`，结束状态即初始状态
- 完成过渡，删除所有过渡`v`的样式，只保留元素自身的样式
- `v-leave` -> `v-leave-active` -> `v-leave-to` 离开过渡
- `.v-enter-active` `v-leave-active` 在过渡/动画完成之后移除
  - 这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数
- `v-enter-to` `v-leave-to` 在过渡/动画完成之后移除
- 使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀
  - 如果使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

![pic](https://cn.vuejs.org/images/transition.png)

> CSS transition 过渡 另一个例子

::: demo CSS transition

```vue
<template>
  <div class="fixHeight40">
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
  data() {
    return {
      show: true
    }
  }
}
</script>

<style>
.fixHeight40 {
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

- `<transition name="">` 标签
- 切换条件`v-if` / `v-show`
- 样式
  - 元素自身样式
  - 添加初始样式（in / out）
  - 添加过渡属性
    - `transition: transition-property，transition-duration，transition-timing-function transition-delay ;`

---

> 在`codepen`可以快速尝试适合的依赖环境

## Vue动画方式2- CSS animation

- 同样使用`<transition name="xxx">` 标签，`name="xxx"`为类样式前缀
- 区别于`CSS transition` 过渡属性
  - 在`CSS animation` 动画属性 `v-enter` 类名在节点插入 DOM 后不会立即删除
- 在`@keyframes`各个关键帧中设置变形、颜色、透明等属性
  - 而是在 **`animationend` 事件 (MDN)** 触发时删除
  - [**`animationend` 事件 (MDN)**](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/animationend_event)
  - 需要设置过渡状态的类样式
    - `.xxx-enter-active{animation: ...}`正在淡入
    - `.xxx-leave-active{animation: ...}`正在淡出
    - 在`@keyframes`中 设置关键帧（`to / from / 0% / 100%`）代替`enter / leave`
  - `reverse`反向淡出动画，设置`.xxx-leave.active{animation: animationName 1s reverse}`
  - 保证最终状态即正常状态

::: demo CSS animation

```vue
<template>
<div class="fixHeight150">
  <button @click="showAnimation = !showAnimation">
    Toggle show
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
- 直接导入到入口文件`main.js/ts`中去：`import 'animate.css'`
- 编译后会自动添加相应的`<style></style>`标签为全局样式

> 例子

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

> 用例

<ClientOnly>
  <code-drawer slotName="AnimeJS" :resourceCode='`
<template>
  <div class="hello">
    <h3>AnimeJS</h3>
    <hr>
    <button @click="go">Click Here to Animate</button>
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
    };
  },
  methods: {
    go() {
      // console.log(anime);
      // bug fix: disable button when anime run
      anime({
        targets: this.$refs.square,
        translateX: 300,
        translateZ: 0,
        easing: "easeInOutQuad",
        direction: "alternate",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
</style> `'>
<template v-slot:AnimeJS>
<Vue-Animation-AnimeJS></Vue-Animation-AnimeJS>
</template>
  </code-drawer>
</ClientOnly>

---

### 配合动画库`GSAP`

---

## Vue动画方式4 - 多元素动画

> 例子

<ClientOnly>
  <code-drawer infoText="多元素动画" slotName="CSS_multiElement" :resourceCode='`
<template>
  <div>
    <h2>Toggle "Save" & "Edit"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="isEditing" @click="isEditing = ! isEditing">
        {{ isEditing ? "Save" : "Edit" }}
      </button>
    </transition>
    <hr>
    <h2>Toggle "Save" & "Edit" & "Cancel"</h2>
    <transition name="fadeSwitch" mode="out-in">
      <button :key="docState" @click="switchingDocState">
        {{ buttonMessage }}
      </button>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Slide",
  data() {
    return {
      isEditing: true,
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
.fadeSwitch-enter-active {
  transition: all .3s ease;
}
.fadeSwitch-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeSwitch-enter, .fadeSwitch-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
`'>
<template v-slot:CSS_multiElement>
<Vue-Animation-MultiElement></Vue-Animation-MultiElement>
</template>
  </code-drawer>
</ClientOnly>

---

## Vue动画方式 5 - 列表动画

```vue
<template>
<div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>

```

- 利用`transition-group`可以对`v-for`渲染的每个元素应用过度
- 范例：给列表添加增加过度
  - `ul` 里的 `li` 套上`transition-group`  加上`name="fade"`

```html
<transition-group name="fade">
    <div v-for="c in courses" :key="c.name">
        {{ c.name }} - ￥{{c.price}}
    </div>
</transition-group>
```

- css加动画效果

```scss
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 1.5s;
}
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
