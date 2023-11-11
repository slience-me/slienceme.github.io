---
layout: post
title: Java｜JavaWeb报错Property_dataSource_is_required异常处理
categories: [Java]
description: JavaWeb报错Property_dataSource_is_required异常处理
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# 项目场景：

<font color=#999AAA >项目场景：在做一个javaWeb旅游项目的时候，注册功能，提交后报错`Property dataSource is required`  </font>
<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 问题描述：

<font color=#999AAA >项目场景：在做一个旅游项目的时候，注册功能，提交后报错`Property dataSource is required`




 </font>


<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 原因分析：

<font color=#999AAA >查询问题后，可能是配置文件包的问题，首先，我检查了一下内容没有问题，那就可能没有读取到这个文件，或者没有找到这个文件</font>
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423171615511.png)

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 解决方案：

<font color=#999AAA >需要按照要求修改下边代码
改之前
![在这里插入图片描述](https://img-blog.csdnimg.cn/a18b259cd0474d0ba6af44e7219d40af.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

改之后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210423171812793.png)




