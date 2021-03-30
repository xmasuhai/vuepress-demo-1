module.exports = {
  title: 'FrontEnd Demo World',
  description: '收集关于前端的Demo',
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ['link', {rel: 'icon', href: '/images/favicon.png'}]
  ],
  base: '/vuepress-demo-1/',
  // 代码块显示行号
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // 左上角logo
    logo: '/images/Logo.jpg',
    // 导航栏配置
    nav: [
      {text: '首页', link: '/' },
      {text: '前端体系目录', link: '/hierarchy/'},
      {text: '面经', link: '/interview/'},
      {text: '我的博客', link: 'http://xmasuhai.xyz'},
    ],
    // 侧边栏配置
    sidebar: 'auto',
    sidebarDepth: 6,
    // 文档更新时间：每个文件git最后提交的时间
    lastUpdated: 'Last Updated',
  },
  plugins: [
    'vuepress-plugin-element-tabs',
    '@vuepress/back-to-top',
  ],
  serviceWorker: true,
}
