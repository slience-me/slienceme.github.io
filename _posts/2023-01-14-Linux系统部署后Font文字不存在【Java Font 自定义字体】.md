---
layout: post
title: Java｜Linux系统部署后Font文字不存在【Java Font 自定义字体】
categories: [Java, Linux]
description: Linux系统部署后Font文字不存在【Java Font 自定义字体】
keywords: 编程语言, Java, Linux
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


## 问题发生
在批量生成二维码的代码部署到linux服务器上后，报错，生成乱码的二维码，中文文字丢失，显示方框框

## 解决方案
在service层获取自己下载的文字路径，然后按照下面代码即可
可以在自己windows下电脑`C:\Windows\Fonts`自行复制
![Alt Text](/images/posts/211a145d4bec4cddb75f53623cd0d246.png)
### 具体内容

### 1. 在ServiceImpl层
```java
ApplicationHome ah = new ApplicationHome(getClass());
File parentPathStringLinux = ah.getSource();
String dirPath = parentPathStringLinux.getParentFile().toString().replace("\\", "/") + path;
//设置字体，大小
String filename = "SimHei.ttf";
File fontFile = new File(fontPath, filename);
Font font = new Font(fontFile.getAbsolutePath(), Font.PLAIN, 150);
```
然后再用该字体对象即可


[ springboot生成QRcode二维码【上下带有文字备注】](https://blog.csdn.net/Slience_me/article/details/128689799)

