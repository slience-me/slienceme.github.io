import type { DefaultTheme } from 'vitepress'

function sidebarNotesBackend() {
  return [
    {
      text: '后端 (Backend)',
      collapsed: false,
      items: [
        { text: 'Maven基础', link: 'maven' },
        { text: 'Spring集成', link: 'spring' },
        { text: 'Thread', link: 'thread' },
        { text: '设计模式', link: 'design-pattern' },
        { text: '...临时', link: 'system-architect' },
        { text: 'JavaSE知识点', link: 'javase-concepts' },
        { text: 'Java便签', link: 'java-notes' },
        { text: 'LangChain4j', link: 'langchain4j' }
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

        { text: '【服务器】Linux', link: 'linux' },
        { text: '【服务器】Windows', link: 'windows' },
        { text: '【服务器】FRP', link: 'frp' },
        { text: '【服务器】vagrant', link: 'vagrant' }
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
        { text: '【数据库】MySQL', link: 'mysql' }
      ]
    }
  ];
}

function sidebarNotesSkill() {
  return [
    {
      text: '技巧 & 工具',
      collapsed: false,
      items: [
        { text: '【指令集】Git&SVN', link: 'git-svn' },
        { text: '【指令集】Homebrew', link: 'homebrew' },
        { text: '【技巧】Subversion', link: 'svn-server' },
        { text: '【指令集】Curl', link: 'curl' },
        { text: '【技巧】gitignore', link: 'git-ignore' },
        { text: '【技巧】Ubuntu系统重装', link: 'server-install' },
        { text: '【技巧】nvm切换node', link: 'nvm-nodejs' },
        { text: '【技巧】GitHub图床', link: 'img-bed' },
        { text: '【技巧】Git&GitHub密钥配置', link: 'git-github-token' },
        { text: '【技巧】Bug合集', link: 'bugs' },
        { text: '【技巧】安装合集', link: 'install' },
        { text: '【技巧】VMware集群搭建', link: 'vmware-cluster' }
      ]
    }
  ];
}

function sidebarNotesFrontend() {
  return [
    {
      text: '前端 (Frontend)',
      collapsed: true,
      items: [
        { text: '【前端】Nodejs', link: 'node' },
        { text: '【前端】HTML', link: 'html' },
        { text: '【前端】CSS', link: 'css' },
        { text: '【前端】Js', link: 'js' },
        { text: '【前端】Vue', link: 'vue' },
        { text: '【前端】webpack', link: 'webpack' },
        { text: '【前端】ES6新特性', link: 'es6' }
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
        { text: 'Anaconda', link: 'anaconda' },
        { text: 'Matplotlib', link: 'matplotlib' },
        { text: 'Numpy', link: 'numpy' },
        { text: 'Matlab', link: 'matlab' },
        { text: 'Python环境配置', link: 'python-env-config' },
        { text: 'CUDA切换版本[Ubuntu]', link: 'cuda-version' }
      ]
    }
  ];
}

function sidebarNotesMiddleware() {
  return [
    {
      text: '中间件 (Middleware)',
      collapsed: false,
      items: [
        { text: '【中间件】Nginx', link: 'nginx' },
        { text: '【中间件】Docker', link: 'docker' },
        { text: '【中间件】Nacos', link: 'nacos' },
        { text: '【中间件】RabbitMQ', link: 'rabbitmq' },
        { text: '【中间件】ElasticSearch', link: 'elasticsearch' },
        { text: '【中间件】Kubernetes', link: 'kubernetes' },
        { text: '【中间件】Redis', link: 'redis' },
        { text: '【中间件】Sentinel', link: 'sentinel' },
        { text: '【中间件】Zipkin', link: 'zipkin' },
        { text: '【中间件】Jenkins', link: 'jenkins' },
        { text: '【合集】集群', link: 'cluster' }
      ]
    }
  ];
}

function sidebarNotesHidden() {
  return [
    {
      text: '杂物',
      collapsed: true,
      items: [
        { text: 'Redis基础', link: 'redis-basic' },
        { text: 'Nginx基础', link: 'nginx-basic' },
        { text: 'Linux基础', link: 'linux-basic' },
        { text: 'Linux高级', link: 'linux-advanced' },
        { text: 'Git基础', link: 'git-basic' },
      ]
    }
  ];
}

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/notes/': [
    { base: '/notes/backend/', items: sidebarNotesBackend() },
    { base: '/notes/middleware/', items: sidebarNotesMiddleware() },
    { base: '/notes/server/', items: sidebarNotesServer() },
    { base: '/notes/databases/', items: sidebarNotesDatabase() },
    { base: '/notes/skill/', items: sidebarNotesSkill() },
    { base: '/notes/frontend/', items: sidebarNotesFrontend() },
    { base: '/notes/python/', items: sidebarNotesPython() },
    { base: '/notes/hidden/', items: sidebarNotesHidden() }
  ]
}
