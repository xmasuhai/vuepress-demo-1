---

title: VuePress搭建技术网站遇到的问题

---
## 生产环境报错`DOMException: ...`，开发环境无措

- 具体报错内容：`DOMException: Failed to execute 'appendChild' on 'Node': This node type does not support this method.`

网络原因 发布更更新想，显示较慢

## VuePress 文档中写组件 引入的路径问题

- 注意是以`/docs/...`开头，有斜杠

---

## `Element.getBoundingClientRect()`

- [`Element.getBoundingClientRect() MDN`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect/)
- 该API返回元素的大小及其相对于视口的位置
    - 如果是标准盒子模型，元素的尺寸等于`width/height + padding + border-width`的总和
    - 如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`。
- 返回值是一个 DOMRect 对象，一组矩形的集合，该元素的 CSS 边框大小
-

---

## `v-slot`

- Vue Animation

```html
<ClientOnly>
  <code-drawer slotName="AnimeJS" :resourceCode='`<h2>FkWd</h2>`'>
  <template v-slot:AnimeJS>
    <Vue-Animation-AnimeJS></Vue-Animation-AnimeJS>
  </template>
  </code-drawer>
</ClientOnly>
```

- `slotName` 和 `v-slot` 传入名相同， 但`slotName`传的是字符串， `v-slot`传变量名不加引号
- 注意缩进，可能会引起页面失效

---

## `ESLint warning`

- [`warning File ignored because of a matching ignore pattern. Use "--no-ignore" to override`](https://www.cnblogs.com/lyt0207/p/14078316.html)
- [git提交时由于eslint的检测机制报错：npm run lint-staged:js found some errors](https://blog.csdn.net/ThisEqualThis/article/details/101011352/)
- [Get rid of warning ignored files](https://www.gitmemory.com/issue/eslint/eslint/12249/540678970/)
- 使用eslint的时候有些文件不经常改动，我们不希望eslint再去检测这些文件，于是我们在.eslintignore 文件中加入了想要忽略的文件
- 解决方案：
    - `npm run lint:fix`

## 如何在`enhanceApp.js`导入库使用

- 参考：[`Using Vue Plugins`](https://vuepress-examples.netlify.app/demos/plugins/)

### 如何配置`enhanceApp.js`

---

## 电脑环境与依赖版本不同 引入的库可能失效

- 查看`package.jason`内容一致
- `yarn install`重装依赖
- 在`win`平台和`mac`下
- 分别启动`yarn serve`
- `win`安装`animate.css@4.1.1`的`trasition`失效，改为`animate@3.6.1`后有效
- `mac`安装`animate.css`所有版本都有效
- 不用太纠结是否最新的版本，开发中能正常运行即可
    - 优先使用稳定版
    - 优先使用仍然在维护、活跃的库
    - 优先使用星标多的

---

## 在 `Vue` 或 `VuePress` 中使用`SVG`

- 最初的方法是使用阿里的`iconfont`创建好图标项目-选取图标-下载为js文件-放入本地项目的资源目录-在项目中导入`import './src/assets/icons'`
- 另一种方法是 VuePress中尝试之前Vue一次性导入SVG的配置，失败
- 转而尝试VuePress的插件，发现不怎么好用，SVG总显示不出
- 又尝试使用Vue的插件，再用`ehanceApp.js`引入第三方 Vue 组件

> 推荐vue awsome 上的几个 SVG图标库 动效库

- [Vue Unicons](https://antonreshetov.github.io/vue-unicons/)
- [Hero icons for Vue.js](https://vue-hero-icons.netlify.app/)
- [Oh, Vue Icons!](https://oh-vue-icons.vercel.app/cn/)
- [vue-svg-transition](https://github.com/kai-oswald/vue-svg-transition)
- [vue-page-transition](https://github.com/Orlandster/vue-page-transition/)
- [vuenime](https://github.com/denisinvader/vuenime/)

> 参考

- [如何在项目中使用svg-sprite-loader加载icon](https://zhuanlan.zhihu.com/p/166668298)
- [vue中使用svg-sprite-loader处理svg图片](https://blog.csdn.net/qq_26769677/article/details/107475803/)
- [Vue/React项目 SVG的引入及坑](https://www.jianshu.com/p/7894d75a5f4a/)
- [svg-sprite-loader 使用教程](https://www.jianshu.com/p/70f9c9268c83/)

---

## 使用VuePress插件对TypeScript的支持

- [使用VuePress对TypeScript的支持](https://zhuanlan.zhihu.com/p/222031275)

---

## 如果需要插入Vue组件的话，不推荐 不结合具体项目而单独使用VuePress

- VuePress简化了Vue的配置，导致许多功能不能使用，复杂逻辑的组件不能使用
- 最佳实践为在Vue项目中使用VuePress
    - 项目源码仓库
    - 项目页面展示仓库
    - 项目文档源码仓库
    - 项目文档页面展示仓库
- 在一个现有项目中使用 VuePress
    - 将文档集成到项目中，让开发人员可以在一个地方同时进行文档编写和代码开发
    - 在该项目中管理文档，应该将 VuePress 安装为本地依赖
    - 作为本地依赖安装让你可以使用持续集成工具，或者一些其他服务（比如 Netlify）来帮助你在每次提交代码时自动部署

---

## VuePress1.x 中插入的组件的SCSS报错

- 引入SCSS的版本过新
- 以下的版本(`package.json`)经测试在 `VuePress1.x` 版本中是可用的

```json
  "devDependencies": {
    "node-sass": "^4.9.0",
    "sass": "^1.17.3",
    "sass-loader": "^7.0.1"
  }
...
```

---

## 在markdown文件中插入Vue单文件组件

> 官网没重点说明

- 参照官网，将需要在文件中插入的组件全部放到 `docs/components/` 目录下，VuePress会将其自动注册到全局中
- 需要注意的是，目录`docs/components/`如果有嵌套的其他目录，组件名开头需要加上嵌套目录的名字，并以短杠连接原组件名
    - 例如`components/Foo/` 目录中的`Bar.vue`
    - 插入到markdown时需要这要引入：`<Foo-Bar/>`

---

## vuepress中实现代码折叠、高亮；排版高亮网页代码块 让页面上显示的代码拥有高亮效果

## 不太好的第一个实现方法

### 安装 `highlight.js`

- [文档实例 EchoWheel UI](https://zyqq.github.io/wheel/components/button.html)
- [vuepress中实现代码折叠、高亮](https://zhuanlan.zhihu.com/p/70474479/)
- [highlight.js之vue指令——排版高亮网页代码块](https://blog.csdn.net/littlebearGreat/article/details/81131463/)
- [VUE 让页面上显示的代码拥有高亮效果](https://blog.csdn.net/qq_41883423/article/details/105562063)

## 仍有缺点的第二个实现方法

## 之后再去完善

---

> 参考文章

- [使用VuePress开心地写文档](https://juejin.cn/post/6844903881248342023)
- [VuePress 中文文档 | VuePress 中文网1.x](https://www.vuepress.cn/)
- [VuePress 快速踩坑](https://zhuanlan.zhihu.com/p/36116211、)
- [VuePressDemo Container](https://calebman.github.io/vuepress-plugin-demo-container/zh/started.html#%E5%AE%89%E8%A3%85、)
- [用Vuepress搭建博客?看这篇就完事了,轻松玩转Vuepress](https://segmentfault.com/a/1190000021096838)
- [【VuePress03】来个自定义主题](https://www.jianshu.com/p/7cc7f3f7cae9)
- [【VuePress02】config配置走一波](https://www.jianshu.com/p/dc255c81de9c)
- [VuePress静态文档构建说明](https://juejin.cn/post/6855129006036123656)
- [展示一些我觉得优秀的Vuepress博客](https://lovelijunyi.gitee.io/posts/169.html)
- [优秀博客案例](https://vuepress-theme-reco.recoluan.com/views/other/theme-example.html)
- [阶进端前和口禾](http://file.jing999.cn/)
- [小弋の阅览室](https://lovelijunyi.gitee.io/blog/views/%E5%89%8D%E7%AB%AF/JavaScript/02.JavaScript%E6%93%8D%E4%BD%9C.html#jquery%E6%93%8D%E4%BD%9Cdom/)
- [znote](https://zpj80231.gitee.io/znote/)
- [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)
- [vuepress建站过程中遇到的一些问题](https://cloud.tencent.com/developer/article/1733783)
