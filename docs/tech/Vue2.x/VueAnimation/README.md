---
title: Vue Animation
lang: zh-CN
description: 记录一些 Vue 动画常见用法
prev: /tech/Vue2.x/VuePress/
next: /tech/Vue2.x/VuePress/
---

# 大纲

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
>
> Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

- 在 CSS **过渡**和**动画**中自动应用 `class`
- 可以配合使用第三方 **CSS 动画库**，如 `Animate.css`
- 在**过渡钩子函数**中使用 `JavaScript` 直接操作 DOM
- 可以配合使用**第三方 `JavaScript` 动画库**，如 `Velocity.js`

---

## Vue动画方式1 - CSS `<transition></transition>`

- Vue 提供封装的`<transition></transition>`
- 给任何元素/组件 添加 进入/离开 过度
  - 条件渲染`v-if` / 条件展示`v-show` / 动态组件`v-bind:is=""` / 组件根节点
- 注意样式隔离
  - `.fade-enter-active, .fade-leave-active {}`
  - `.fade-enter, .fade-leave-to {}`
  - 一些 UI 组件库的CSS样式 会覆盖


<ClientOnly>
<Vue-Animation-Transition/>
<Button1/>
</ClientOnly>

> 例子

```html
<template>
<div>
  <button v-on:click="visible = !visible">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="visible">hello</p>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  width: 100px;
}
p {
  border: 1px solid red;
  width: 300px;
}
</style>

```

- 用`<transition></transition>`包裹需要加动画的节点
- 设置属性`name`: `<transition name="fade">`
- 设置**初始样式**，比如
  - `width`必须有初始值
  - `opacity`无需设置初始值，初始即为`1`
- 设置**过度样式**
  - `.fade-enter-active, .fade-leave-active {transition: all 2s;}`
  - `.fade-enter, .fade-leave-to {...}`
- 设置**切换条件**`v-if` / `v-show`

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

> CSS 过渡例子

```html
<template>
  <div>
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
</template>

<script>
  data() {
     // noinspection JSAnnotator
    return {
      show: true
    }
  }
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* 淡入时 初始位置，淡出时 结束位置*/
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

```

> 小结

- `<transition name="">` 标签
- 切换条件`v-if` / `v-show`
- 样式
  - 元素自身样式
  - 添加初始样式（in / out）
  - 添加过渡属性
    - `transition: transition-property，transition-duration，transition-timing-function transition-delay ;`

---

## Vue动画方式2- CSS animation

- 同样使用`<transition name="">` 标签
- 区别于`transition`，在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 [`animationend` 事件 (MDN)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/animationend_event) 触发时删除
- 需要设置过渡状态 `.v-enter-active` `.v-leave-active`
- `enter / leave` 被 `@keyframes`中的关键帧（`to / from / 0% / 100%`）代替
- 反向淡出动画，设置`.v-leave.active{anomation: animationName 1s reverse}`

```html
<template>
<div>
  <button @click="showAnimation = !showAnimation">Toggle show</button>
  <transition name="bounce">
    <p v-if="showAnimation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
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

<style lang="scss" scoped>
/* animation */
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

---

## Vue动画方式3 - JS 操作动画

- 在 attribute （横线连接 (kebab-case)） 中声明 JavaScript 钩子（驼峰式连接）
- methods 写方法

```html
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

> 配合动画库`Velocity.js`

- [`velocity-animate@2.0.6`](https://github.com/julianshapiro/velocity/)
- [文档](https://github.com/julianshapiro/velocity/wiki)
- `yarn add velocity-animate@beta`

```html
<template>
<div>
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
</template>

<script>
import "velocity-animate/velocity.ui.min.js";
</script>

<style lang="scss" scoped>
</style>

```

---

## Vue动画方式4 - 多元素动画


```html
<template>
<div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>

```

---

## Vue动画5方式 - 列表动画

```html
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

css加动画效果

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
...
</style>

```

- CSS在第三方库中预设好了
- 添加属性`enter-active-class` `leave-active-class`
  - `<transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">`
- [官网](https://animate.style/#custom-builds)

---

### ``

```html
<template>
<div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>

```

---

### ``

```html
<template>
<div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>

```

---

### ``

```html
<template>
<div>
</div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>

```

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

---
---

