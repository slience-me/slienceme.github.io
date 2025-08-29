import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' },
  { text: '编程导航', link: '/nav/' },
  { text: '开发笔记', link: '/notes/' },
  { text: '博客', link: 'https://blog.slienceme.cn' },
  // { text: 'CSDN', link: 'https://blog.csdn.net/slience_me' },
  { text: '程序员做饭指南', link: 'https://cook.aiursoft.cn/' },
  // {
  //   text: '游戏合集',
  //   items: [
  //     { text: 'Git小游戏', link: 'https://learngitbranching.js.org/?locale=zh_CN' },
  //     {
  //       items: [
  //         { text: '测试', link: '/fe/typescript/base' },
  //         { text: '测试', link: '/fe/typescript/base' },
  //         { text: '测试', link: '/fe/typescript/base' }
  //       ]
  //     },
  //     { text: '测试', link: '/fe/webpack/' }
  //   ],
  //   activeMatch: '^/fe'
  // }
]
