---
layout: post
title: Java｜vue项目部署到服务器流程_用到Node&yarn
categories: [Java]
description: 【较全面已成功部署】vue项目部署到服务器流程_用到Node&yarn
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


### 步骤：
#### 1. 下载Node.js & yarn

首先去[进入官网](https://nodejs.org/en/)下载node，点击下载即可
![Alt Text](/images/posts/20210708205624567.png)
常规的流程就安装好了，尽量下载`node-v16.4.1-x64.msi`文件，这个可以自动配置环境变量
![Alt Text](/images/posts/20210708205645176.png)
如果用到了yarn，到[官网下载](https://yarn.bootcss.com/docs/install/#windows-stable)即可
![Alt Text](/images/posts/20210708210402669.png)
![Alt Text](/images/posts/20210708210429451.png)
然后测试一下是否安装成功，打开cmd

![Alt Text](/images/posts/20210708210632376.png)
#### 2. 打开你的vue项目路径(含有package.json文件路径)
##### 先安装依赖包
用管理员模式打开cmd

输入
```java
npm install
```
如果有yarn
```java
yarn install
```
##### 编译一下子
输入
```java
npm run build
```
如果有yarn
```java
yarn run build
```
##### 开发模式运行一下子
输入
```java
npm run serve
```
如果有yarn
```java
yarn run serve
```
----
编译后项目打包成功会生成一个dist文件夹
![Alt Text](/images/posts/20210708211538549.png)
文件结构大概是这个样子
![Alt Text](/images/posts/20210708211914533.png)
给他上传到服务器上

对应的二级域名下创建的文件夹中，或者按照你的路径放置，然后配置nginx服务器即可

**(无宝塔面板)**

[教程点击](https://blog.csdn.net/Slience_me/article/details/118566951)

**(有宝塔面板)**

这个打开基本就可以了
![Alt Text](/images/posts/20210708212953314.png)

> 此处以下内容参考 [博客链接](https://www.cnblogs.com/theory/p/13437570.html)

#### 3. 配置nginx.conf

```java
 server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        
        location / {
            root /home/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;  //解决刷新页面变成404问题的代码
        }
        location /api{
             rewrite  ^/api/(.*)$ /$1 break;
             proxy_pass http://localhost:8080;
        }
    }
```

   
- `listen`：表示监听端口8080

- `location`：dist文件夹放置的位置

- `/api`：因为vue前端代理的时候，用的是api做名字，所以我们要在此处配置后端api端口：

```java
//vue代理
proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api': ''}
      }
    },
```

