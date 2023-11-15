---
layout: post
title: Java｜Unknown_initial_character解决方法
categories: [Java]
description: Unknown_initial_character_set_index_‘255‘_received_from_server._Initial_client_character_解决方法
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# 问题描述：

```java
java.sql.SQLException: Unknown initial character set index '255' received from server. 
Initial client character set can be forced via the 'characterEncoding' property.
```


# 原因分析：

MySQL驱动和数据库字符集设置不搭配

# 解决方案：
添加  `?useUnicode=true&characterEncoding=utf8`
```java
"jdbc:mysql:///maven02?useUnicode=true&characterEncoding=utf8","用户名","密码")          
```
成功解决

![Alt Text](/images/posts/20210418180124368.png)






