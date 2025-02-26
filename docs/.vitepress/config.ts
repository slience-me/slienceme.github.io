import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { head, nav, sidebar, algolia } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  // outDir: '../dist',
  // base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',
  base: '/',

  lang: 'zh-CN',
  title: 'Slience_me',
  description: 'Slience_me的编程随想录，包含前端、后台、服务器及相关技术的笔记等',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/avator_white.png',

    nav,
    sidebar,
    search: {
      provider: 'algolia',
      options: {
        appId: 'H43D1TRK5F',
        apiKey: 'eee591ec005a5f9ce1d40359cee5e48b',
        indexName: 'slience-me'
      },
    },

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/slience-me' }
    ],

    footer: {
      message: 'Copyright © 2019-2025 slience_me 版权所有',
      copyright: '冀公网安备13102202000626 | 津ICP备2024026565号-1'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'slienceme.cn',
    },

    comment: {
      repo: 'slience-me/blog-comments',
      repoId: 'R_kgDOKr27jA',
      category: 'Announcements',
      categoryId: 'DIC_kwDOKr27jM4CnWMe',
    }
  },

  sitemap: {
    hostname: 'https://slienceme.cn'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
        },
      },
    },
    plugins: [
      MarkdownPreview()
    ],
  },
})
