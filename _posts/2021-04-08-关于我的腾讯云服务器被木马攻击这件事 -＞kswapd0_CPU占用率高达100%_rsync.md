---
layout: post
title: 奇闻轶事｜关于我的腾讯云服务器被木马攻击这件事 -＞kswapd0_CPU占用率高达100%_rsync
categories: [奇闻轶事]
description: 关于我的腾讯云服务器被木马攻击这件事 -＞kswapd0_CPU占用率高达100%_rsync
keywords: 奇闻轶事, 服务器, 木马
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


今天打开我的服务器后台，突然发现我的服务器内存，CPU统统报红，大概这个样子。(PS:这是我修复后描绘的图)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408195315680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
当时就很迷惑，
然后打开xshell，
输入  `top` 指令，发现有一个进程，占用了大量的cpu，和内存
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408195618307.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

然后，我接着输入  `netstat -antlp`  指令，发现令人疑惑的两个进程，发现有两个荷兰IP，其中一个正式kswapd0
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408195839708.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
然后使用  `ls -l /proc/上面的PID/exe` 查询进程的路径
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408200203836.png)
然后，你进入这个路径，把这个kswapd0文件删除掉（出于好奇我下载了一下，但是立刻被火绒拦截了，一会看看他怎么写的）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408200347547.png)
你可以用宝塔面板简单删除
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021040820055324.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
或者可以使用指令 `rm -rf 文件名` 删除（两个进程文件都需要删除）

然后，使用指令 `netstat -antlp` 再次查询，发现还在，则采取指令`kill PID` 杀掉进程
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408200743833.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
过了一会儿后，服务器恢复正常。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408201000474.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)


----
分割线

----
将病毒文件解压后，我发现这些东西，他们是什么我不知道，有大佬看看，如果需要，我给您发源文件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408201555517.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210408201606414.png)

