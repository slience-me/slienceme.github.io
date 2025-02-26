# 静态笔记站点 - 基于 VitePress

欢迎访问我的静态笔记站点，它是一个使用 [VitePress](https://vitepress.vuejs.org/) 构建的简洁高效的文档网站。此站点可以用于记录和整理各种技术笔记、学习资料或个人知识库，旨在提供一个易于浏览、易于管理的知识平台。

## 项目说明

这是一个基于 **VitePress** 的静态笔记站点，整体代码参考了以下项目：
- [茂茂物语](https://github.com/maomao1996)
- [粥里有勺糖](https://github.com/ATQQ/sugar-blog)（使用了背景图片）
- [Yiov](https://github.com/Yiov/vitepress-doc)（优化了整体界面）

## 功能特点

- **高效的页面加载**：基于 Vite 构建，支持快速热更新和优化的构建流程。
- **简洁的界面**：采用现代化设计，支持夜间模式，提升浏览体验。
- **支持 Markdown 格式**：轻松编写、管理和查看笔记。
- **自定义主题**：可以根据个人需求调整主题和外观。
- **响应式设计**：兼容各种设备，手机、平板、桌面都能良好展示。

## 安装与使用

### 克隆项目

```bash
git clone https://github.com/slience-me/devnotes.git
```

### 安装依赖

进入项目目录并安装依赖：

```bash
cd devnotes
npm install
```

### 启动本地开发服务器

```bash
npm run dev
```

访问 `http://localhost:8732` 即可在本地查看项目。

### 构建生产版本

```bash
npm run build
```

构建后的静态文件将生成在 `dist` 目录中，你可以将它们部署到任何静态资源托管服务。

## 版权声明

- 本项目整体代码参考了 [茂茂物语](https://github.com/maomao1996)。
- 本站使用了 [粥里有勺糖](https://github.com/ATQQ/sugar-blog) 中的背景图片。
- 本站界面优化借助了 [Yiov](https://github.com/Yiov/vitepress-doc)。
