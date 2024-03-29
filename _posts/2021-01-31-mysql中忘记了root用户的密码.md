---
layout: post
title: 数据库｜mysql中忘记了root用户的密码
categories: [数据库]
description: mysql中忘记了root用户的密码
keywords: 数据库
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

##### mysql中忘记了root用户的密码？

---
1. cmd -- > net stop mysql 停止mysql服务
	* 需要管理员运行该cmd
	
2. 使用无验证方式启动mysql服务： mysqld --skip-grant-tables
3. 打开新的cmd窗口,直接输入mysql命令，敲回车。就可以登录成功
4. `use mysql`;
5. `update user set password = password('你的新密码') where user = 'root';`
6. 关闭两个窗口
7. 打开任务管理器，手动结束mysqld.exe 的进程
8. 启动mysql服务
9. 使用新密码登录。
---

