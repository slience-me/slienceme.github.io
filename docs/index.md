---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: Silence_me
  text: 编程随想录
  tagline: 从代码到世界的无限探索
  image:
    src: /avator_white.png
    alt: slience_me
  actions:
    - text: Slience_me的博客
      link: https://blog.slienceme.cn
    - text: 编程导航
      link: /nav/
      theme: alt
    - text: 开发笔记
      link: /notes/
      theme: alt
features:
  - icon: 🧑🏻‍💻
    title: 后端 (Backend)
    details: 用于整理后端常用指令<small>（面试八股文）</small><br />
    link: /notes/backend/maven
    linkText: 后端指令合集

  - icon: 💻
    title: 服务器 (Server)
    details: 配置和管理服务器环境
    link: /notes/server/nginx
    linkText: 服务器配置与管理

  - icon: 💾
    title: 数据库 (Databases)
    details: 数据库设计、查询优化以及各种常见数据库的使用
    link: /notes/databases/mysql
    linkText: 数据库实践

  - icon: 🛠️
    title: DevOps & 工具 (DevOps & Tools)
    details: 记录开发和运维中遇到的工具合集
    link: /notes/devops/git
    linkText: DevOps 工具集

  - icon: 🔭
    title: 前端 (Frontend)
    details: 前端框架与工具，提升用户体验和页面性能。
    link: /notes/frontend/html
    linkText: 前端开发资源

  - icon: 💯
    title: AI (Python)
    details: 机器学习、深度学习与数据分析
    link: /notes/python/anaconda
    linkText: Python 与 AI
---

<style>
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
