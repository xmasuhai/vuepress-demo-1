---
title: 9.0 简单轮子 总结
---
---

[toc]

---

## 测试题重做

### 第 1 题

下面代码的输出结果是什么？

```JavaScript
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN(){
        console.log(this.n)
    }
}

let fn = obj.sayN
fn()
```

- [X] 'window name'
- [ ] 'obj name'
- [ ] undefined

---

### 第 2 题

下面代码的输出结果是什么？

```JavaScript
window.n = 'window name'
let obj = {
    n: 'obj name',
    sayN: () => {
        console.log(this.n)
    }
}

obj.sayN()
```

- [X] 'window name'
- [ ] 'obj name'
- [ ] undefined

---

### 第 3 题

下面代码的输出结果是什么？

```JavaScript
class A{
    constructor(){
        this.name = 'A'
    }
    sayName(){
        console.log(this.name)
    }
}
class B extends A{
    constructor(){
        super()
        this.name = 'B'
    }
}

let obj = new B()
console.log(obj.sayName())
```

- [ ] 'A'
- [X] 'B'
- [ ] undefined

---

### 第 4 题

下面代码的输出结果是什么？

```JavaScript
Promise.reject('error')
    .then( ()=>{console.log('success1')}, ()=>{console.log('error1')} )
    .then( ()=>{console.log('success2')}, ()=>{console.log('error2')} )
```

- [ ] 先输出 'error1' 再输出 'error2'
- [X] 先输出 'error1' 再输出 'success2'
- [ ] 先输出 'success1' 再输出 'success2'
- [ ] 先输出 'success1' 再输出 'error2'

---

### 第 5 题

下面代码的输出结果是什么？

```HTML
<div id=app></div>
```

```JavaScript
window.name = 'window name'
let app = new Vue({
    name: 'name 1',
    el: '#app',
    data(){
      return {name:'name 2'}
    },
    created(){
        console.log(this.name)
    }
})
```

- [ ] 'window name'
- [ ] 'name 1'
- [X] 'name 2'
- [ ] undefined

---

### 第 6 题

关于 Vue 中的 key 属性，下列说法正确的有？

- [X] 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
- [X] 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。
- [X] 理想的 key 值是每项都有的且唯一的 id。
- [X] Vue2.2.0+ 的版本里，当在组件中使用 v-for 时，key 是必须的

---

### 第 7 题

下面代码的输出结果是什么？？

```JavaScript
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

var Component = Vue.extend({
  mixins: [myMixin],
  methods: {
    hello(){
      console.log('hello from options')
    }
  }
})

var component = new Component()
```

- [ ] 'hello from mixin!'
- [X] 'hello from options'

---

### 第 8 题

下面代码的输出结果是什么？？

```JavaScript
function getSomething(){
    setTimeout(function(){
        return 'hello'
    })
}

let something = getSomething()
console.log(something)
```

- [ ] 'hello'
- [ ] timer 的 id
- [X] undefined

---

### 第 9 题

下面代码的输出结果是什么？？

```JavaScript
let _name = 'MyName'
let obj = {}
Object.defineProperty(obj, 'name', {
    get(){
        return _name
    },
    set(value){
        _name = value
    }
})

obj.name = 'NewName'
console.log(_name)
```

- [ ] 'MyName'
- [X] 'NewName'
- [ ] undefined

---

## 阶段性总结

![截图](https://static.xiedaimala.com/xdml/image/3ac7c224-c23d-491f-84b5-4fabfbeab9b8/2018-8-11-1-50-36.png)

- 只在有设计稿和需求文档的情况下写代码
  - 落实设计稿
  - 落实需求文档
  - 明确责任
- 单元测试是重构的前提
- 工具知识（`webpack/scss`）能用就行
- 设计模式——写代码的套路
  - 发布订阅 `emit/on/off/once`
  - 单向数据流 相邻节点不形成数据环
  - 正交 `props`
    - 不存在互相影响的因素
  - 代码可测试 测试驱动
  - 简化 `0` 思考
    - 抽象
    - 命名
    - 提取方法
  - 面向荔枝写代码
    - 文档化
    - 重构

> 参考

- [官网](https://frankfang.github.io/frank-test-1/)
- [部署代码](https://github.com/FrankFang/frank-test-1/blob/doc-1/deploy.sh)

---

## 制作自己的官网

> 使用`Vuepress`

---

## 展示自己的组件

---

## 部署到GitHub Pages

---

---
