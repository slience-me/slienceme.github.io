import type { DefaultTheme } from 'vitepress'

function sidebarNotesBackend() {
  return [
    {
      text: '后端 (Backend)',
      collapsed: false,
      items: [
        { text: 'Maven基础', link: 'maven' },
        { text: 'SpringCloud', link: 'spring-cloud' }
      ]
    }
  ]
}

function sidebarNotesServer() {
  return [
    {
      text: '服务器 (Server)',
      collapsed: false,
      items: [
        { text: '【指令集】Nginx', link: 'nginx' },
        { text: '【指令集】Docker', link: 'docker' },
        { text: '【指令集】Linux', link: 'linux' },
        { text: 'ElasticSearch', link: 'elasticsearch' },
        { text: 'FRP', link: 'frp' },
        { text: 'vagrant', link: 'vagrant' },
        { text: 'Linux基础', link: 'linux-basic' },
        { text: 'Linux高级', link: 'linux-advanced' },
        { text: 'Nginx基础', link: 'nginx-basic' }
      ]
    }
  ];
}

function sidebarNotesDatabase() {
  return [
    {
      text: '数据库 (Databases)',
      collapsed: true,
      items: [
        { text: 'MySQL', link: 'mysql' },
        { text: 'Redis', link: 'redis' }
      ]
    }
  ];
}

function sidebarNotesDevOps() {
  return [
    {
      text: 'DevOps & 工具',
      collapsed: false,
      items: [
        { text: '【指令集】Git', link: 'git' },
        { text: 'gitignore', link: 'git-ignore' },
        { text: 'Ubuntu系统重装', link: 'server-install' },
        { text: 'nvm切换node', link: 'nvm-nodejs' },
        { text: 'GitHub图床', link: 'img-bed' },
        { text: 'Git&GitHub密钥配置', link: 'git-github-token' },
        { text: 'Git基础', link: 'git-basic' },
        { text: 'Bug合集', link: 'bugs' },
        { text: '安装合集', link: 'install' }
      ]
    }
  ];
}

function sidebarNotesFrontend() {
  return [
    {
      text: '前端 (Frontend)',
      collapsed: false,
      items: [
        { text: '【指令集】Nodejs', link: 'node' },
        { text: 'HTML', link: 'html' },
        { text: 'CSS', link: 'css' },
        { text: 'Js', link: 'js' },
        { text: 'Vue', link: 'vue' },
        { text: 'webpack', link: 'webpack' },
        { text: 'ES6新特性', link: 'es6' }
      ]
    }
  ];
}

function sidebarNotesPython() {
  return [
    {
      text: 'AI (Python)',
      collapsed: true,
      items: [
        { text: '【指令集】Anaconda', link: 'anaconda' },
        { text: 'Matplotlib', link: 'matplotlib' },
        { text: 'Numpy', link: 'numpy' },
        { text: 'Matlab', link: 'matlab' },
        { text: 'Python环境配置', link: 'python-env-config' },
        { text: 'CUDA切换版本[Ubuntu]', link: 'cuda-version' }
      ]
    }
  ];
}

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/notes/': [
    { base: '/notes/backend/', items: sidebarNotesBackend() },
    { base: '/notes/server/', items: sidebarNotesServer() },
    { base: '/notes/databases/', items: sidebarNotesDatabase() },
    { base: '/notes/devops/', items: sidebarNotesDevOps() },
    { base: '/notes/frontend/', items: sidebarNotesFrontend() },
    { base: '/notes/python/', items: sidebarNotesPython() }
  ]
}
