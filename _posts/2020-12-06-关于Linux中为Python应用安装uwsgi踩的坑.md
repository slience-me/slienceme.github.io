---
layout: post
title: Linux｜关于Linux中为Python应用安装uwsgi踩的坑
categories: [Linux]
description: 关于Linux中为Python应用安装uwsgi踩的坑
keywords: Linux, 服务器, uwsgi
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# 关于Linux中为Python应用安装uwsgi踩的坑



一般直接用`pip install uwsgi`可能会出错，所以在这之前先安装其他必要的引用库

```
yum groupinstall "Development tools"

yum install zlib-devel bzip2-devel pcre-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel

yum install python3-devel

yum install gcc
```

再用`pip install uwsgi` 即可

 

 

使用方法是在你的应用文件下新建`uwsgi.ini`文件，

打开文件写下面的配置

```java
[uwsgi]
chdir           = 应用目录
module          = 应用名.wsgi
home            = python位置，如果是virtualenv虚拟环境就写虚拟环境下的python位置
master          = true
processes       = 1
socket          = 0.0.0.0:80
vacuum          = true
```

 
保存好，启动方法是在uwsgi.ini 目录下输入

```java
uwsgi --ini uwsgi.ini
```



[引用网站](https://www.cnblogs.com/hanzg/p/13369744.html)
