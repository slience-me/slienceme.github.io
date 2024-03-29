---
layout: post
title: 奇闻轶事｜关于我的腾讯云服务器被木马攻击这件事
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
![Alt Text](/images/posts/20210408195315680.png)
当时就很迷惑，
然后打开xshell，
输入  `top` 指令，发现有一个进程，占用了大量的cpu，和内存
![Alt Text](/images/posts/20210408195618307.png)

然后，我接着输入  `netstat -antlp`  指令，发现令人疑惑的两个进程，发现有两个荷兰IP，其中一个正式kswapd0
![Alt Text](/images/posts/20210408195839708.png)
然后使用  `ls -l /proc/上面的PID/exe` 查询进程的路径
![Alt Text](/images/posts/20210408200203836.png)
然后，你进入这个路径，把这个kswapd0文件删除掉（出于好奇我下载了一下，但是立刻被火绒拦截了，一会看看他怎么写的）
![Alt Text](/images/posts/20210408200347547.png)
你可以用宝塔面板简单删除
![Alt Text](/images/posts/2021040820055324.png)
或者可以使用指令 `rm -rf 文件名` 删除（两个进程文件都需要删除）

然后，使用指令 `netstat -antlp` 再次查询，发现还在，则采取指令`kill PID` 杀掉进程
![Alt Text](/images/posts/20210408200743833.png)
过了一会儿后，服务器恢复正常。
![Alt Text](/images/posts/20210408201000474.png)


----
分割线

----
将病毒文件解压后，我发现这些东西，他们是什么我不知道，有大佬看看，如果需要，我给您发源文件。
![Alt Text](/images/posts/20210408201555517.png)
![Alt Text](/images/posts/20210408201606414.png)

