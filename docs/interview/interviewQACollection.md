## 目录<a id="catalogue" href="#catalogue" > § </a><a href="#catalogue"> ⇧ </a>

---

[toc]

---

## HTML

### 1.0 语义化

- 用合适的标签表示标签里的内容
- 抽象问题举例答：比如：
  - 页眉部分使用 `<header></header>`
  - 内容部分使用 `<main></main>`
  - 页脚部分使用 `<footer></footer>`
  - 导航部分使用 `<nav></nav>`
  - 侧边栏 `<aside></aside>`
  - 文章 `<article></article>`
  - 段落 `<section></section>`
- 这样有助于提高代码可读性及搜索引擎优化

### 2.0 html标签有哪些

- 常见的 html5 标签有：header、main、footer、vav、aside、section、article
- html 标签有：h1-h6、div、span、ul、li、p、a、img、input、i、strong

### 3. `viewport` 作用，怎么写

- 设置视口的默认样式 
  - 宽度=设备宽度
  - 初始缩放比例
  - 最大缩放比例
  - 最小缩放比例
- `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">`

### 4. `h5` 页面是什么

- 响应式页面的意思
- 如果将屏幕看作容器，那么内容就像水一样
- 会根据容器的变化改变页面布局

---


## HTTP

### 1. HTTP 状态码知道哪些？分别什么意思

- 2xx 表示成功
- 3xx 表示需要进一步操作
  - 301 永久重定向
  - 302 临时重定向
- 4xx 表示浏览器方面出错
  - 400 （语法错误）
  - 401 （未授权）
  - 403 （拒绝执行此请求）
  - 404 （未找到）
- 5xx 表示服务器方面出错
  - 500 （服务器内部错误）
  - 501 （不支持请求功能）
  - 502 （无效响应）
  - 503 （超载或系统维护）

### 2.`HTTP` 缓存有哪几种

- pragma: no-cache 禁用缓存 
- Expires 是设置过期时间（绝对时间），但是如果用户的本地时间错乱了，可能会有问题
- CacheControl: max-age=3600 是设置过期时长（相对时间），跟本地时间无关
- ETag 是通过对比浏览器和服务器资源的特征值（如MD5）来决定是否要发送文件内容，如果一样就只发送 304（not modified）
- 计算 ETag 值需要性能损耗。
- 分布式服务器存储的情况下，计算 ETag 的算法如果不一样，会出现页面相同但 ETag 不匹配

### 3.`GET` 和 `POST` 的区别

> 错解，但是能过面试 功能/使用的区别

- GET在浏览器回退时是无害的，而 `POST` 会再次提交请求。
- GET产生的 URL 地址可以被加入收藏栏，而 POST 不可以。
- GET请求会被浏览器主动缓存 cache，而 POST 不会，除非手动设置。
- GET请求只能进行 url 编码，而 POST 支持多种编码方式。
- GET请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。
- GET请求在 URL 中传送的参数是有长度限制的
  - GET方法由于受到URL长度的限制,只能传递大约1024字节
  - HTTP协议规范没有对URL长度进行限制
  - 这个限制是特定的浏览器及服务器对它的限制 不同浏览器及服务器限制不同
  - 注：对于中文的传递，最终会为 `urlencode` 后的编码形式进行传递，如果浏览器的编码为UTF8的话，一个汉字最终编码后的字符长度为9个字符
  - 如果使用的 GET 方法，最大长度等于URL最大长度减去实际路径中的字符数
  - POST理论上是没有限制 可设置 maxPostSize="1024" 参数，只允许表单上传1m的数据 可修改 maxPostSize不同服务器版本下 等于0或负数代表无限制
  - [参考文章1](https://blog.csdn.net/w8998036/article/details/105971328)
  - [参考文章2 关于 HTTP GET/POST 请求参数长度最大值的一个理解误区](https://www.jianshu.com/p/ea99c1e4f6a4)
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
- GET参数通过URL传递，POST放在Request body中
- POST则不是幂等操作，因为每次得到的结果都可能不同

> 正解 本质区别：语义 - GET 用于获取资源，POST 用于提交资源

### 4. Cookie V.S. LocalStorage V.S. SessionStorage V.S. Session

- `Cookie` V.S. `LocalStorage`
- 主要区别是 `Cookie` 会被发送到服务器，而 `LocalStorage` 不会
- `Cookie` 一般最大 4k，`LocalStorage` 可以用 5Mb 甚至 10Mb（各浏览器不同）
- `LocalStorage` V.S. `SessionStorage`
- `LocalStorage` 一般不会自动过期（除非用户手动清除），而 `SessionStorage` 在回话结束时过期（如关闭浏览器）
- `Cookie` V.S. `Session`
- `Cookie` 存在浏览器的文件里，Session 存在服务器的文件里
- `Session` 是基于 `Cookie` 实现的，具体做法就是把 `SessionID` 存在 `Cookie` 里

### Web Security

#### 1.1 什么是 XSS？前端如何预防？

- 跨站脚本：用户A 提交的恶意内容，可以对用户 B 的页面进行篡改
- 预防：
  - 后台模板过滤：将可疑的符号 < 符号变成 `&lt;`(HTML实体)
  - 前端代码不拼接 HTML

#### 1.2 什么是 CSRF？前端如何预防？

- 跨站请求伪造：
  - 攻击者构造网站后台某个功能接口的请求地址
  - 诱导用户去点击或者用特殊方法让该请求地址自动加载
  - 用户在登录状态下这个请求被服务端接收后会被误以为是用户合法的操作
    - 对于 GET 形式的接口地址可轻易被攻击
    - 对于 POST 形式的接口地址可诱导用户进入带 Form 表单可用POST方式提交参数的页面
- 预防： `anti-csrf-token`
  - 服务端返回的表单页面中隐藏 `_csrf_token` 值,该随机数作为 `cookie` 种入用户浏览器
  - 后台在接受到请求后解析请求的 cookie 获取 `_csrf_token` 的值
  - 然后和用户请求提交的 `_csrf_token` 做比较，如果相等表示请求是合法的

---

## CSS

### 1.两种盒模型

- border-box：IE 盒模型，宽度为 content、padding、border 的宽度加起来
- content-box：标准盒模型，宽度为 content 的宽
- 通常情况下一般使用 IE的 盒模型，这样容器的宽度不会受到 padding、border 的影响而变化

### 2. `flex` 有哪些属性

```css
.wrapper{
  display: flex;
  flex-wrap: nowrap | wrap | wrap-reverse;      /* flex-flow:flex-wrap & flex-direction */
  flex-direction: row /* (行) | column(列) | row-reverse | column-reverse */ ;
  justify-content(主轴): flex-start | flex-end | center | space-between | space-around | stretch;
  align-items(附轴): flex-start | flex-end | center | space-between | space-around | stretch;
  align-content(多行内容): flex-start | flex-end | center | space-between | space-around | stretch;
}
.item{
  order: 1 /* integer (整数) */;
  flex: 0(放大比例) 1(缩小比例) auto(基准宽高); 后两属性可选。/* flex- grow & shrink & basis 的简写 */
  align-self: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### 3.`BFC`是什么 怎么触发BFC

- 块级格式化上下文
- 如果给一个div加 `overflow hidden`
  - 那么它里面的浮动元素就会被包裹起来
  - 成为一个独立容器
- 不会影响外面的元素

### 4.层叠上下文

- HTML 元素沿着其相对于用户的一条虚构的 z 轴排开
- 层叠上下文就是对这些 HTML 元素的一个三维构想
- HTML 元素基于其元素属性按照优先级顺序占据这个空间
- [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Adding_z-index)
- 某些元素的**渲染顺序**是由其 z-index 的值影响的
- 这是因为这些元素具有能够使他们形成一个层叠上下文的特殊属性
  - 文档根元素（`<html>`）
  - position 值为 absolute（绝对定位）
  - 或 relative（相对定位）且 z-index 值不为 auto 的元素
  - position 值为 fixed（固定定位）
  - 或 sticky（粘滞定位）的元素
  - flex (flexbox) 容器的子元素
    - 且 z-index 值不为默认值 auto
  - 或grid (grid) 容器的子元素
    - 且 z-index 值不为默认值 auto
  - opacity 属性值小于 1 的元素
  - 以下任意属性值不为 none 的元素：
    - transform
    - filter

### 5.选择器优先级

- ！important `+∞` > 行内`1000` > id `100` > class `10` 类/伪类 > 元素/伪元素1 *`0` > 继承的样式

- 越具体优先级越高，后面覆盖前面

### 6.清除浮动:代码

- 给容器添加一个 `:after` 伪元素实现元素之后添加一个看不见的块元素，清楚浮动

```CSS
.clearfix:after{
  content:'';
  display:block;
  clear:both;
}
```

### 7. 居中布局

> 定宽块元素 `position: absolute;`

```CSS
.parentElement{
  position: relative;
}
.childElement{
  width: 100px;
  margin: 0 auto;                // 水平居中
  position: absolute;
  top: 50%;
  transform: translateY(-50%)； // 垂直居中
}
```

- 使用`position、-margin`

```css
.parentElement{
  position:relative;
  width: 200px;
  height: 200px;
}
.childElement{
   position: absolute;
   top: 50%;
   left: 50%;
   width: 100px;
   height: 100px;
   margin-top: -50px;
   margin-left: -50px;
}
```

> 不定宽块级子元素

- 使用`flex`

```CSS
.parentElement{
  height: 300px;  // 撑开内容  
  display: flex;
  justify-content: center;    // 水平居中
  align-items:center;         // 垂直居中
}
 /* 子元素居中 */ 
```

- 使用`position、transform`

```CSS
.parentElement{
  position: relative;
  width: 200px;
  height: 200px;
}
.childElement{
   position: absolute;
   top: 50%;
   left: 50%
   transform: translate(-50%,-50%);
}
```

- 没写高度的块元素

```CSS
.parentElement{
  text-align: center;  // 水平居中
  padding: 100px 0;    // 垂直居中
}
```

> 行内元素

- 单行文本 `height、line-height`

```CSS
.parentElement{
  text-align: center;      // 水平居中
}
.childElement{
  height: 100px;
  line-height: 100px;      // 垂直居中
}
```

- 多行文本

```CSS
.parentElement{
  text-align: center;     //水平居中
  display: table-cell;
  vertical-align: middle   //垂直居中
}
```

### SCSS

---

## JavaScript

### 1.`es6` 语法有哪些

- let const 箭头函数
- 展开操作符 `...`
- 默认参数
- `import export`
- Promise 

### 2.`Promise.prototype.all/race`

- `Promise`构造函数
- `promise`实例

#### 2.1 使用`promise`

```JavaScript
function promise() {
     return new Promise((resolve, reject)=>{
         // 成功时调用 resolve(数据)
         // 失败时调用 reject(错误)
     })
 }
 promise().then(success1, fail1).then(success2, fail2)
```

#### 2.2 `promise.all`

- `promise1` 和 `promise2` 都成功才会调用 success
-  接受一个参数为数组，数组里可传多个`promise`实例

```JavaScript
Promise.all([promise1, promise2]).then(success1, fail1)
```

#### 2.3 `promise.race`

- 谁先出结果就看谁的结果，第一个先成功或失败，就认为是 race 的成功或失败

```JavaScript
Promise.race([promise1, promise2]).then(success1, fail1)
```

### 3. `async awite` 用法

```JavaScript
async function fn() {
// === promise.then(success, fail)
 try{
  let n = await promise() | Promise.all/race([p1,p2])  
  console.log(n)
 } catch(error) {
  console.log(error)
 }
}
```

### 4.防抖节流

#### 防抖

- debounce 函数
- 传参
  - 第一个参数为 回调函数 `fn`
  - 第二个参数为 防抖时间 `delay`
- 定义 定时器id
- 返回一个函数
  - 若定时器 id存在
    - 清空 id
  - 获取 id 为 定时器返回值，定时器为:
    - 调用执行 回调函数 `fn.apply(this, arguments)`
    - 执行完后重置 `timer = null`
    - 定时 `delay`

```JavaScript
function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;  // 执行完后重置 timer
    }, delay);
  };
}

// PF
// 对 setTimeout() 的重新封装
function myDebounce(fn, debounceInterval = 500) {
  let timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, arguments);
    }, debounceInterval);
  };
}

function eventCallback(){
    // onmousemove触发的事件回调函数
    console.log("fuck")
}
container.addEventListener("wheel", myDebounce(eventCallback, 300), false)
container.onmousemove = myDebounce(eventCallback, 300);

```

#### 节流

- throttle 函数
- 传参
  - 第一个参数为 回调函数 `fn`
  - 第二个参数为 节流时间 `delay`
- 定义 节流开关 `isThrottle = true` 初始为 开启
- 返回一个函数
  - 若节流开关 为 开启
    - 第一次 立即 调用执行 回调函数 `fn`
    - 执行完后 设置 关闭 节流开关 `isThrottle = false;`
  - 设置 定时器为:
    - 重置 节流开关 `isThrottle = true;`
    - 定时 `delay`
    - **过了设置时间后** 才能 再次 开启 节流开关 执行回调

```JavaScript
function throttle(fn, delay) {
  let isThrottle = true;
  return function () {
    if (throttle) {
      fn.apply(this, arguments); // 第一次立即执行
      isThrottle = false;
      setTimeout(() => {
      // 过了设置时间后才能再次执行
        isThrottle = true;
      }, delay);
    }
  };
}

// PF
// 对 setTimeout() 的重新封装
function myThrottle(fn, throttleInterval = 500) {
  let isRetime = true;
  return function () {
    // 如果重新计时 就结束 返回空
    if (!isRetime) return;
    // 如果不重新计时 就执行函数
    isRetime = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      // 执行函数后 再次重新计时
      isRetime = true;
    }, throttleInterval);
  };
}

function eventCallback(){
    // onmousemove触发的事件回调函数
    console.log("fuck")
}
container.addEventListener("wheel", myThrottle(eventCallback, 300), false)
container.onmousemove = myThrottle(eventCallback, 300);

```

### 5. `AJAX` 级封装

#### 5.1 实现 `AJAX`

- new XMLHttpRequest
- request.open > request.onreadystatechange > request.send
- request.onreadystatechange 包含：
  - 对 `request.readyState` 判断 `4`
    - 对 `request.statue` 判断 `[200, 300)`

```JavaScript
const request = new XMLHttpRequest();
request.open("GET", "./xxxURL");
request.onreadystatechange = () => {
  if ((request.readyState = 4)) {
    console.log("请求完成");
    if (request.statue >= 200 && request.statue < 300) {
      console.log("请求成功");
      console.log(request.responseText);
    } else {
      console.log('error');
    }
  }
};
request.send();
```

#### 5.2 `fetch API`

#### 5.3 `Axios + Vue`

---

### 6. this

- 全局 window
- 指向调用者
- 箭头函数里为上层函数的this

### 7.闭包 立即执行函数

- 一个能访问其他函数内部变量的函数。
- 立即执行函数创建一个独立的作用域，可以避免变量污染。可以传递参数并立刻执行，遍历的时候可以解决闭包的问题
- 应用场景：防抖函数 保存计时器id


### 8. CORS  jsonp 跨域

#### 8.1 `CORS` 

> 跨域资源共享：允许浏览器向跨源服务器，发出 XMLHttpRequest 请求

- 简单请求
  - 在后台设置 `response.setHeader('Access-Control-Allow-Origin',url)`
- 非简单请求
  - 在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求（`preflight`）
  - 一旦服务器通过了”预检”请求，在 `Access-Control-Max-Age` 指定的时间内，以后每次浏览器正常的 `CORS` 请求，就都跟简单请求一样，会有一个 `Origin` 头信息字段
  - 服务器的回应，也都会有一个
`Access-Control-Allow-Origin` 头信息字段。

#### 8.2 jsonp

- 含义：在跨域时因为某些原因无法使用 `CORS`，于是利用 `script`标签的 `src` 属性的开放原则引用一个 JS 文件
- JS 文件会执行一个回调，回调里会储存需要的数据
- 优点：可以跨域，兼容IE
- 缺点：
  - 因为使用 src 标签 不能获取状态码和 header
  - 不支持 POST 请求

### 9. 原型 继承

> ES6

```JavaScript
class A{ constructor(){} }
class B extends A{
  constructor(x,y){
    super(x,y)
  }
  fn(){}
}
```

> ES5

```JavaScript
function A(){}
function B(){}
function F(){}
F.prototype = A.prototype
B.prototype = new F()
B.prototype.constructor = B
```

### 10.数组去重

> ES6

- Set

```JavaScript
;[...new Set(array)];
Array.from(...new Set(array));
```

- `Arra.prototype.map`

```JavaScript
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      const value = map.get(arr[i]) + 1;
      map.set(arr[i], value);
    } else {
      newArray.push(arr[i]);
      map.set(arr[i], 1);
    }
  }
  return newArray;
}
```

> ES5

- 循环遍历

```JavaScript
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === arr[i]) {                       //与后面的数比较相同就去除该数
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
```

### 11. 深拷贝

```JavaScript
function tellType(obj) {
    return /^\[object ([a-z]+)\]$/i.exec(Object.prototype.toString.call(obj))[1].toLowerCase();
}

function deepClone(data) {
    let target = data;
    const isObject = (x)=>{
        return Object.prototype.toString.call(x) === '[object Object]';
    }
    const isArray = (x)=>{
        return Object.prototype.toString.call(x) === '[object Array]';
    }
    if(isObject(data)){
        target = {};
        for(var i in data) {
            target[i] = clone(data[i])
        }
    }
    if(isArray(data)){
        target = [];
        for (let i = 0; i < data.length; i++) {
            target[i] = clone(data[i])
        }
    }
    return target;
}

function deepCopy(target, source) {
  if (!source || typeof source !== 'object') return
  for (var key in source) {
    if (source.hasOwnProperty(key)) { // 排除原型链上的属性
      if (source[key] && typeof source[key] === 'object') {  // 判断下层是否是object
        target[key] = Array.isArray(source[key]) ? [] : {}  // 判断是否是数组
        DeepCopy(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
}

```

### 12.如何用正则实现 trim()？

```JavaScript
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '')
}
//或者 
function trim(string){
    return string.replace(/^\s+|\s+$/g, '')
}
```

### 13.排序算法

- 数组排序
- 数组各项为数字类型，并且为整数
- 不包括数组去重
- 优先使用 快速排序 归并排序 计数排序
- 大量数据不使用 冒泡排序 选择排序 插入排序

#### 13.1 选择排序

- 每次选出最小的数的索引，并交换位置

```JavaScript
function selectSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
      // 找到最小的数的索引
        minIndex = j;
      }
    }
    const swap = array[minIndex];
    // 交换
    array[minIndex] = array[i];
    array[i] = swap;
  }
  return array;
}
```

> 思路 步骤 关键点

> 复杂度

#### 13.2 冒泡排序

- 每次比较相邻的数，将最大的数移动到最后

```JavaScript
function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {               //比较相邻的数
        const swap = array[j];
        array[j] = array[j + 1];
        array[j + 1] = swap;
      }
    }
  }
  return array;
}
```

> 思路 步骤 关键点

> 复杂度

#### 13.3 插入排序

- 一直与前面的值相比较，直到前面没有更大的值，插入到该位置

```JavaScript
function insertionSort(arr) {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let swap = array[i];
    while (swap < array[j]) {
    // 与前面的值比较
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = swap;
  }
  return array;
}
```

> 思路 步骤 关键点

> 复杂度

#### 13.4 快速排序

- 每次取一个中间值，比该值大的，小的各放在一个新数组，直到数组里只有一个数，然后全部合并

```JavaScript
function quickSort(array) {
  // 递归终止条件
  if (array.length <= 1) return array
  // 取中位项 指针
  const pivotIndex = Math.floor(array.length / 2)
  // 记录下中位项的值 并在原数组中删除中位项
  const pivotValue = array.splice(pivotIndex, 1)[0]
  // 左半数组 右半数组
  const [left, right] = [[], []]
  // 遍历数组 各项值和中位值 比较
  // 较小的推入左半数组 较大的推入右半数组
  for (let i = 0; i < array.length; i++) {
    array[i] < pivotValue ?
        left.push(array[i]) :
        right.push(array[i])
  }
  // 返回数组字面量 包含
  // 展开 左半数组递归调用
  // 中位项
  // 展开 右半数组递归调用
  return [...quickSort(left), pivotValue, ...quickSort(right)]
}
```

> 思路 步骤 关键点

- 递归终止条件
- 取中位 指针
- 记录下中位项的值 并在原数组中删除中位项
- 左半数组 右半数组
- 遍历数组 各项值和中位值 比较
  - 较小的推入左半数组 较大的推入右半数组
- 返回数组字面量 包含
  - 展开 左半数组递归调用
  - 中位项
  - 展开 右半数组递归调用

> 复杂度

#### 13.5 归并排序

- 对半分割数组，直到数组里只有一个数，然后对比大小进行合并
- 双层递归
- 中位数 下标
- 先拆分，后合并

```JavaScript
function mergeSort(array) {
  // 递归终止条件
  if (array.length <= 1) return array;
  // 按中位数下标拆分 左半数组 右半数组 slice 浅拷贝
  const index = Math.floor(array.length / 2);
  const left = array.slice(0, index);
  const right = array.slice(index);
  // 拆分逻辑
  // 返回 调用合并函数
  // 参数分别为
  // 左半数组归并排序的递归调用 和 右半数组归并排序的递归调用
  // 最终期望返回 一个排好序的单项数组 且单项数组 依次排序
  return merge(mergeSort(left), mergeSort(right));
}
// 合并函数
function merge(arrayleft, arrayRight) {
  // 递归终止条件
  // 最终返回一个单项数组
  if (arrayleft.length === 0) return arrayRight;
  if (arrayRight.length === 0) return arrayleft;
  
  /* 合并逻辑
  * 
  * 比较两边数组的第一项
  * 将较小项的提出数组，作为**新数组**第一项
  * 交换去除该项后的半边数组和另半边数组位置 作为合并函数的参数
  * 递归调用合并函数，返回值作为**新数组**的剩余项
  * 
  * 如果arrayRight[0]小
  * 则依次连接arrayRight[0], 数组arrayleft和数组arrayRight中剩余数字
  *
  * arrayleft [4, 1] arrayRight [3, 2]
  */
  return arrayleft[0] > arrayRight[0] ?
    [arrayRight[0], ...merge(arrayleft, arrayRight.slice(1))]:
    [arrayleft[0], ...merge(arrayRight, arrayleft.slice(1))];
  /*
  return arrayleft[0] > arrayRight[0] ?
    [arrayRight[0]].concat(merge(arrayleft, arrayRight.slice(1))):
    [arrayleft[0]].concat(merge(arrayRight, arrayleft.slice(1)));
  */
}
```

> 思路 步骤 关键点

> 复杂度

#### 13.6 计数排序

- 使用**哈希表**记录每个**数字出现的次数**，遍历哈希表生成新数组

```JavaScript
/* 数组 */
function countSort(array) {
  const newArray = [];
  const result = [];
  // 遍历数组
  for (let i = 0; i < array.length; i++) {
    // 以 array[i] 为数组下标 用来记录 array[i] 值的出现次数
    // 记录 array.length-1 个下标 默认记录为出现 1 次
    // newArray 中没有 array[i] 则将 newArray[array[i]] 设置为1
    // 有则将 newArray[array[i]]  加1
    newArray[array[i]] ? (newArray[array[i]]++):(newArray[array[i]] = 1)
  }
  // 遍历 newArray
  for (let j = 0; j <= newArray.length; j++) {
    while (newArray[j] > 0) {
      // 放入新数组，并将次数减1
      result.push(j);
      newArray[j]--;
    }
  }
  return result;
}

/* 哈希表 */
// 乱序的 arr 各项 为自然数 作为 hashTable 的属性名
// 利用 对象属性名 不重复 的特性 做 计数排序
// 遍历对象属性名 遍历数组各项 数组长度
var countSort = arr => {
  let [hashTable, max, result] = [{}, 0, []]
  // 遍历 乱序的 arr
  for(let i = 0; i < arr.length; i++) {
    // 记录 arr 各项 出现次数 计入 hashTable
    // hashTable 以 arr 各项的值 为属性名
    	// 以 arr 各项的值的出现次数 为 属性值(默认为 1，再出现就 +1)
    	// arr [3, 2, 1]
    	// hashTable {"3": 1, "2": 1, "1": 1}
    	// arr [3, 2, 1, 3, 2, 1]
    	// hashTable {"3": 2, "2": 2, "1": 2}
    (arr[i] in hashTable)?
      (hashTable[arr[i]] += 1):
      (hashTable[arr[i]] = 1)
    // 记录最大值 max 自然数
    if(arr[i] > max){ max = arr[i] }
  }
  /* 解决元素出现两次的bug 时间复杂度为O(n^2) */
  // 以出现过的最大值 max 为长度 遍历 hashTable
  // hashTable {"3": 2, "2": 2, "1": 2}
  // max 3
  for(let j = 0; j <= max; j++) {
  // j 为 hashTable 的 (计数)属性名 自增 不重复 天然已排好序
    if(j in hashTable) {
      for(let k = 0; k < hashTable[j]; k++){
        result.push(j)
      }
    }
  }
  return result
}
```

> 思路 步骤 关键点

- 利用数组计数
  - 遍历原数组
    - 以 array[i] 为数组下标 用来记录 array[i] 值的出现次数
    - 记录 array.length-1 个下标 (默认记录为出现 1 次)
      - newArray 中没有 array[i] 则将 newArray[array[i]] 设置为1
      - 有则将 newArray[array[i]]  加1
  - 遍历 newArray
    - 依次数推入新数组
- 利用 哈希表 计数
  - 乱序的 arr 各项 为自然数 作为 hashTable 的属性名
    - 利用 对象属性名 不重复 的特性 做 计数排序
    - 遍历对象属性名 遍历数组各项 数组长度
  - 遍历 乱序的 arr
    - 记录 arr 各项 出现次数 计入 hashTable
    - hashTable 以 arr 各项的值 为属性名
    - 以 arr 各项的值的出现次数 为 属性值(默认为 1，再出现就 +1)
  - 记录最大值 max 自然数
  - 以出现过的最大值 max 为长度 遍历 hashTable
    - j 为 hashTable 的 (计数)属性名 自增 不重复 天然已排好序
    - 依次数推入新数组

> 复杂度

- `O(n^2)`

---

### 14.DOM

#### 14.1 事件委托

- 错误版（但是可能能过）
  - bug 在于，如果用户点击的是 li 里面的 span，就没法触发 fn，这显然不对

```JavaScript
ul.addEventListener('click', function(e){
     if(e.target.tagName.toLowerCase() === 'li'){
         fn() // 执行某个函数
     }
 })
```

- 高级版
  - 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li

```JavaScript
function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     })
     return element
   }
```

> PF

```JavaScript
function on(eventType_str, element, selector, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element)
  }
  element.addEventListener(eventType_str, (e) => {
    const tempElement = e.target // by user
    if (tempElement.matches(selector) === true) {
      fn(e)
    }
  })
}

// 错误版（但是可能能过，也可以卖一个破绽）
 ul.addEventListener('click', function(e){
     if(e.target.tagName.toLowerCase() === 'li'){
         fn() // 执行某个函数
     }
 })
// 这个答案有缺陷
// 如果将操作的元素内部再放一层子元素，比如包裹 span 元素
// 操作的元素变为span 元素
// 点击的时候，tempElement是span，而selector是button，不匹配，就不执行fn

// 递归判断 target/target 的父元素/target的祖元素是否匹配li

function on(eventType, element, selector, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element)
  }
  element.addEventListener(eventType, e => {
    let el = e.target
    while (!el.matches(selector)) {
      // 范围是 element 之内的元素
      if (element === el) {
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el, e, el)
  })
  return element
}

// jQuery的实现
// $('#xxx').on('click', 'li', fn

 function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         // 即使是内部标签，也可触发 fn
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     })
     return element
   }
   
// 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li
```

#### 14.2 用 mouse 事件写一个可拖曳的 div

```html
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS</title>
</head>
<body>
<div id="xxx"></div>
</body>
<script>
let dragging = false
let position = null
let xxx = document.querySelector('<div>');

xxx.addEventListener('mousedown',function(e){
  dragging = true
  position = [e.clientX, e.clientY]
})

document.addEventListener('mousemove', function(e){
  if(dragging === false){return}
  console.log('hi')
  const x = e.clientX
  const y = e.clientY
  const deltaX = x - position[0]
  const deltaY = y - position[1]
  const left = parseInt(xxx.style.left || 0)
  const top = parseInt(xxx.style.top || 0)
  xxx.style.left = left + deltaX + 'px'
  xxx.style.top = top + deltaY + 'px'
  position = [x, y]
})
document.addEventListener('mouseup', function(e){
  dragging = false
})
</script>
<style>
div{
  border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
}

*{margin:0; padding: 0;}
</style>

</html>
```

---

### TypeScript

#### 1.1 `never` 类型是什么？

- 不应该出现的类型 尤雨溪的答案：https://www.zhihu.com/question/354601204/answer/888551021

#### 1.2. TypeScript 比起 JavaScript 有什么优点？

- 提供了类型约束，因此更可控、更容易重构、更适合大型项目、更容易维护

---

## 框架/库  framework/library

### 1.`Vue`

#### 1.1`watch` 和 `computed` 和 `methods` 区别是什么

> 思路：先翻译单词，再阐述作用，用法

- computed VS methods
  - computed 有缓存，如果 computed 属性依赖的属性没有变化，那么 computed 属性就不会重新计算
  - methods 则是侦听到一次计算一次
- watch VS computed 
  - computed 是计算出一个属性，依赖的属性没有变化，那么 computed 属性就不会重新计算
  - watch 则是监听数据变化，然后做一些事情(如上报数据，执行一段代码)
  - watch 有两个属性 。
    - immediate 属性：第一次是否执行
    - deep 属性：监听对象时是否监听对象内部的变化
    - 默认如果对象地址没变，就不会触发绑定的事件

#### 1.2`Vue` 有哪些生命周期钩子函数？分别有什么用

- 生命周期：实例从创建到消亡之间的各个阶段主要有
- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
- 在 mounted 阶段请求数据

#### 1.3`Vue` 如何实现组件间通信

- 父子组件：使用 `v-on` 通过事件通信
- 爷孙组件：使用 `provide/inject`
- 任意组件：使用 `eventBus = new Vue()` 来通信
- `eventBus.$on` 和 `eventBus.$emit` 是主要API
- 任意组件：使用 `Vuex` 通信

#### 1.4`Vue` 数据响应式怎么做到的

- 使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`
- 缺点 Vue 不能检测到对象属性的添加或删除
  - 解决方法是手动调用 `Vue.set` 或者 `this.$set`

#### 1.5`Vue.set` 是做什么用的

- 向响应式对象中新增属性
- 并确保这个新属性同样是响应式的
- 且触发视图更新

#### 1.6`Vuex` 怎么用的

- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
- 核心概念的名字和作用：
  - store对象：store对象是Vuex.Store的实例
  - `State` 驱动应用的数据源
  - `Getter` 
  - `Mutation` 引发状态改变的所有方法的集合
  - `Action` 响应在用户操作行为导致的状态变化
  - `Module`

#### 1.7`VueRouter` 怎么用的

- Vue Router 是 Vue.js 官方的路由管理器
- 核心概念的名字和作用：
  - Hash/History 模式
  - 导航守卫
  - 路由懒加载
- 常用 API：
  - `<router-link></router-link>`
  - `<router-view></router-view>`
  - `this.$router.push`
  - `this.$router.replace`
  - `this.$route.params` params相对应的是name query相对应路径 `path`
  - `this.$route.query` 获取路由查询参数

### 2.`React`

---

## Webpack

### 1.1 有哪些常见 loader 和 plugin，用过哪些

- `loader`：
  - `babel-loader` ：把 ES6 转换成 ES5
  - **`css-loader`** ：加载 CSS，支持模块化、压缩、文件导入等特性 
  - **`style-loader`**：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS  
  - **`scss-loader`**：把 sass 编译成 css    
  - `less-loader`：把 sass 编译成 css   
  - `stylus-loader`：把 stylus 编译成 css       
  - **`file-loader`**：文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件    
  - **`image-loader`**：加载并且压缩图片文件  
  - **`eslint-loader`** (通过 eslint 检查 js 代码)
- `plugin`：
  - **`html-webpack-plugin**`：生成 html 文件
  - **`web-webpack-plugin`**：为单页应用生成 HTML，管理多个单页应用
  - **`mini-css-extract-plugin`**：将所有样式文件中代码提取到 common.css 中，对 css 代码进行代码压缩，然后再引入到页面中。
  - `DefinePlugin`： 定义变量，一般用于开发环境log或者全局变量
  - `SplitChunksPlugin`：提取公共代码
  - `uglifyjs-webpack-plugin`：通过 uglify-es 压缩 ES6 代码

### 1.2 loader 和 plugin 的区别

- loader：加载器，加载和解析 **非 js 文件**
- plugin：插件, 扩展 webpack 功能
  - Webpack 运行的生命周期中会广播出许多事件
  - Plugin 可以监听这些事件
  - 在合适的时机通过 Webpack 提供的 API 改变输出结果

### 1.3 如何按需加载代码

- Vue UI 组件库的按需加载
  - `babel-plugin-component`
  - `babel-plugin-import`
  - 使用以上插件实现 **组件按需加载**
- 单页应用的按需加载
  - 通过`import(*)`语句来控制加载时机
  - `import()`会返回一个`Promise`对象
  - `webpack` 内置了对于 `import(*)`的解析
  - 会将 `import(*)` 中引入的模块作为一个新的入口再生成一个 `chunk`
  - 当代码执行到import(*)语句时，会去加载 Chunk 对应生成的文件

### 1.4. 如何提高构建速度？

- 使用 `SplitChuckPlugin` 提取公共代码
- 使用 `happypack` 实现开启多线程加速编译
- 使用` webpack-uglify-parallel` 来提升 `uglifyPlugin` 的压缩速度
- 利用 `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块
  - 通过 `DllPlugin` 来对那些引用但是绝对不会修改的 `npm` 包来进行预编译
  - 再通过 `DllReferencePlugin` 将预编译的模块加载进来

### 1.5. 转义出的文件过大怎么办？

- `SplitChunksPlugin`：提取公共代码
- 压缩 `css(cssnano)` `js(uglifyJsPlugin)` `img`
- 动态加载 `import`
- `CDN` 加速

---

## 超纲题

### 1.1 垃圾回收机制

- 全局变量不回收 回收局部变量
- 局部变量 函数消失时垃圾回收
- 内存中没有被外部变量引用的内容会被回收

- 1. **标记清除**算法：
  - 分代回收——对象分为两组:“新对象”和“旧对象”。
  - 许多对象出现，完成它们的工作并迅速结 ，它们很快就会被清理干净。
  - 那些活得足够久的对象，会变“老”，并且很少接受检查。
  - 增量回收——如果有很多对象，并且我们试图一次遍历并标记整个对象集，那么可能会花费一些时间，并在执行中会有一定的延迟。
  - 因此，引擎试图将垃圾回收分解为多个部分。
  - 然后，各个部分分别执行。这需要额外的标记来跟踪变化，这样有很多微小的延迟，而不是很大的延迟。
- 空闲时间收集——垃圾回收器只在 CPU 空闲时运行，以减少对执行的可能影响
- 步骤
　　- 标记：从根节点出发，深度优先遍历所有可以访问到的节点，并打上"可访问"的标记
　　　　- 这里的根节点，指的就是上文提到的全局对象以及当前执行环境以及作用域链上可访问的对象
　　- 清除：从所有节点里，清除掉没有打上标记的节点

- 2. **引用计数**算法
  - 对有引用的变量计数，对记数为0的变量进行回收
  - 先记下某个变量被引用的总次数，然后当被引用次数为0时，就表示可回收
  - 所有的现代浏览器都是使用标记清除法

### 1.2 `EventLoop`

- Node.js
  - 三个阶段依次循环
  - timer
  - poll
  - check：setImmediate
  - process.nextTick 该阶段结束时执行
- 浏览器
  - 宏任务（一会再执行）
    - setTimeout
    - setInterval
    - setImmediate
  - 微任务 （马上执行）
    - promise.then()
    - await
    - MutationObserver

### 1.5 严格模式

```JavaScript
"use strict"
function funValue(value) {
    value = "dada";
    alert(value);
     // dada
    alert(arguments[0]);
     // 非严格模式： dada
    // 严格模式模式：dadaqianduan
}
funValue('dadaqianduan');

```

### 非技术题

> 想问面试官的问题

---
---
