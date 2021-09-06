---

title: VuePress使用实践

---

## 概述

- 技术文档 或 个人博客
- 静态网站：不和后端交互，没有从数据库那数据，直接把数据写在前端
- 用Markdown来写，生成HTML网站
  - 生成目录结构到左侧 SideBar 中
  - 内部锚点可重定向
  - 内置搜索关键字
- Markdown 中可以插入 Vue 全局组件

## 成品

- [我的VuePress博客主页](http://xmasuhai.xyz/vuepress-demo-1-website/)
- 官方技术文档 vue 全家桶：
  - [Vue.js](https://cn.vuejs.org/v2/guide/)
  - [Vuex](https://vuex.vuejs.org/zh/)
  - [Vue CLI ](https://cli.vuejs.org/zh/guide/)
  - [Vue Router](https://router.vuejs.org/zh/)
  - [VuePress](https://www.vuepress.cn/guide/)

## 搭建

### 前期准备

#### 打开终端

```sh
#安装VuePress
yarn add global vuepress
## for vue3.x
## yarn add global vuepress@next

# 创建并进入项目
mkdir vuepress-demo && cd vuepress-demo

# 初始化项目
yarn init -y
## 默认配置 yes
## 自动生成 package.json
```

#### 在生成的`package.json`中，添加如下两个启动命令：

```json
"scripts": {
  "doc:dev": "vuepress dev docs",
  "doc:build": "vuepress build docs"
}
```

#### 命令行手动创建如下结构

```
vuepress-demo
├─package.json
├─docs
|  ├─README.md
|  ├─.vuepress
|  |     ├─config.js
|  |     ├─public
|  |     |   └images
```

- 有后缀的是文件，没后缀的是文件夹

#### 配置 `config.js`


> 参考

- [Vuepress的一些说明](https://wcc3358.github.io/vuepress/#%E6%96%87%E6%A1%A3%E7%BB%93%E6%9E%84)
  - [防止失效链接](https://github.com/wcc3358/)

---

## 部署



### VuePress 路径错误

> 在首页 network查看资源请求失败 404； 在element中看到路径就有问题 >
> 通过修改index.html里的内容。将`/`改为`./`
> 发现部分样式恢复，可以推断是打包的时候全部是绝对路径，而本应该是相对路径

- 适用于非直接部署到`<USERNAME>.github.io.git`而是部署到某一仓库
- 设置部署的目录为根目录下的`dist`，而不是`/docs/.vuepress/dist`
- 设置`config.js`中的`base: <REPO>` `<REPO>`为仓库名
- 修改`delpoy.sh`

> 参考文章

- [解决vuepress部署出现样式问题](https://blog.csdn.net/weixin_43560272/article/details/105107557)
- [【未解决】vuepress用yarn去build编译出静态html页面但页面布局错乱](https://www.crifan.com/vuepress_use_yarn_build_static_html_page_but_layout_messy/)
- [VuePress部署GitHub、Gitee遇到的那些坑](https://blog.csdn.net/qq_34252283/article/details/105921837)
- [VuePress 快速踩坑](https://juejin.cn/post/6844903598808104974)
- [vuepress项目部署出现样式丢失，图片加载失败的问题](https://www.git2get.com/av/109195652.html)
- [vuepress build 后样式，css丢失](https://blog.csdn.net/m0_37730869/article/details/112701013)
- [用 vuepress 搭建博客](https://coder.itclan.cn/fontend/tools/vuepress-build-blog)

---

> 参考文章

- [VuePress搭建技术网站与个人博客](https://www.jianshu.com/p/37509da5a020)
- [博客地址](https://nan-gong.github.io/tech/interview)
- [VuePress 使用笔记](https://juejin.cn/post/6916459919193571342/)
- [VuePress 手摸手教你搭建一个类Vue文档风格的技术文档/博客](https://segmentfault.com/a/1190000016333850)
- [使用vuepress快速搭建个人博客(完整配置与源码)](https://www.cnblogs.com/chenyingying0/p/13093217.html)
- [VuePress官网](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.vuepress.cn%2F)  
  - [Intro to VuePress 1.x](https://ulivz.com/2019/06/09/intro-to-vuepress-1-x/)
- [除了 GitHub，VuePress 现在可以用云开发来部署了](https://cloud.tencent.com/developer/article/1611256)
- [腾讯云静态网站托管之搭建 VuePress](https://cloud.tencent.com/developer/article/1641512)
- [VuePress 文档部署](https://cloudbase.net/community/guides/hosting-handbook/vuepress.html)


> 源码

- [仓库源码](http://xmasuhai.xyz/vuepress-demo-1-website/)

---
