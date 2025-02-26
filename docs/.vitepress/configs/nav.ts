import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' },
  { text: '编程导航', link: '/nav/' },
  { text: '开发笔记', link: '/notes/' },
  { text: '博客', link: 'https://slienceme.cn' },
  { text: 'CSDN', link: 'https://blog.csdn.net/slience_me' },
  // {
  //   text: '前端物语',
  //   items: [
  //     { text: '测试', link: '/fe/javascript/types' },
  //     {
  //       items: [
  //         { text: '测试', link: '/fe/typescript/base' }
  //       ]
  //     },
  //     { text: '测试', link: '/fe/webpack/' }
  //   ],
  //   activeMatch: '^/fe'
  // }
]
