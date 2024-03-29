---
layout: post
title: 教程｜关于如何使用Git&GitHub的基本操作汇总&GitHub的密钥配置
categories: [教程]
description: 关于如何使用Git&GitHub的基本操作汇总&GitHub的密钥配置
keywords: 教程, 服务器, Git, GitHub, 密钥配置
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# 1. Git使用篇
## 1.1 下载安装Git
1. 点击 [官网链接](https://git-scm.com/) 后，进入Git官网，下载安装包
![Alt Text](/images/posts/bf2b29555644461da69b97db2f39454c.png)
2. 然后根据系统类型进行下载，一般为windows
![Alt Text](/images/posts/b76e02a853f944f783ed7f83702e6ac6.png)
3. 一般选择64位的安装器版本
![Alt Text](/images/posts/7f9eb9293ab5484daccc64669d771f64.png)
4. 下载好后开始安装
![Alt Text](/images/posts/b1f665b9e98a4a568d6564b512cd64a4.png)
5. 点击Next
![Alt Text](/images/posts/36efe96d0d7347d2a518ff6e4855372d.png)
6. 默认即可，Next
![Alt Text](/images/posts/861c391c0cac4050b379e84652f87cee.png)
7. 默认即可，Next
![Alt Text](/images/posts/250cce75f56d43c18960521303d30449.png)
8. Next
![Alt Text](/images/posts/9f7972fbb0554308979a5e9afee829d6.png)
9. Next
![Alt Text](/images/posts/76e296fe6103493586bf828403dfb9cb.png)
 10. Next
![Alt Text](/images/posts/2c9dc4dedd6a4421a6523604aa31bd1f.png)
11. Next
![Alt Text](/images/posts/74795916d4474c0a9c7804474945a005.png)
12. Next
![Alt Text](/images/posts/dce050dade9342989a76d82db02a7ecd.png)
13. Next
![Alt Text](/images/posts/56c27cb62a3a43dd94b92f0522ddcdb9.png)
14. Next
![Alt Text](/images/posts/88b42c1290214d9ba9181822596bc8bd.png)
15. Next
![Alt Text](/images/posts/2ffbe9f8ba254ee4932863de1631edbe.png)
16. Next
![Alt Text](/images/posts/04624ae520484fe8ab2ba6b05f9ebd5e.png)
17. install即可
![Alt Text](/images/posts/e31653d8658b4c38b0f2f4bb799dec1c.png)
## 1.2 使用Git
- 我们在桌面随便创建一个文件夹例如code
- 进入code文件夹
- 鼠标右键点击这个open git bash here

> 注意：git bash命令行界面(推荐)
> git GUI图形化界面

![Alt Text](/images/posts/fa8b30af0b5a427b833ec12879fdf8ec.png)
- 看到这个页面
![Alt Text](/images/posts/fc5da5d540dc4454998d6dabdc8479cc.png)
- 输入代码配置全局信息：用户名（英文的）和邮箱
- `git config --global user.name yourname`
- `git config --global user.email demo@qq.com`
---
- 配置好后，下面一些常用的指令

```python
# 初始化本地仓库 创建本地git仓库
git init 

# 在本地编写完成代码后（工作区），把一些文件提交到暂存区
git add xxx 	把某一个文件或者文件夹提交到暂存区
git add . 	把当前仓库中所有最新修改的文件都提交到暂存区
git add -A	把所有最新修改的文件都提交到暂存区

# 查看当前文件的状态
#（红色代表在工作区，绿色代表在暂存区，看不见表示已经提交到历史区）
$ git status 查看当前文件

# 提交到本地仓库 ”提交备注信息“
git commit -m "first commit"

# 创建分支
git branch -M 分支名称

# 添加远程仓库
git remote add origin 远程仓库链接
# 查看本地仓库和哪些远程仓库保持链接
git remote -v 	
# 删除origin这个关联信息
git remote rm origin 		

# 推代码到远程仓库
git push -u origin 分支名称
# 拉取并合并分支
git pull origin 分支名称
```

> 注意：github创建仓库成功后，他会提供一个命令大全
> 例如： 
>git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin 远程链接
git push -u origin main

---
最常用的指令：
1. `git init`
2. `git add ./`
3. `git commit -m "某某某提交的代码，内容"`
4. `git push --set-upstream origin master`
# 2. GitHub使用篇
## 2.1 如何git与GitHub建立联系呢？
1. 先登录
![Alt Text](/images/posts/a15c1d9274064d2696e2859ac759804e.png)
![Alt Text](/images/posts/85e3112a7082456bbe1eed545dbab092.png)

2. 创建一个新的仓库
![Alt Text](/images/posts/ec1f6994af4c47328095117867c51206.png)
![Alt Text](/images/posts/949c34ed738b4282963ee767052f887c.png)
- 点击create 
![Alt Text](/images/posts/29f8be42822c482a86f9a5d17a7be21f.png)
- 创建成功后，看到这个页面
![Alt Text](/images/posts/067c807e7bb340dea494d9ea45eb868d.png)
## 2.2 配置公钥

- 我们先配置密钥，点击头像
![Alt Text](/images/posts/ed0e3cc4bf0346f0994e70203a5bb416.png)
![Alt Text](/images/posts/e0070f29d9df40a99918b750e29768ad.png)
![Alt Text](/images/posts/172fd983a084428a9c2829975596f48e.png)
![Alt Text](/images/posts/06afac336e3b40358631a1738c6c256d.png)
- 接下来详细操做步骤
---
1. 首先启动一个Git Bash窗口（非Windows用户直接打开终端）同上文章内容
![Alt Text](/images/posts/dfd120d47b034507a0b94f1b6c62d394.png)
2. 执行：`cd ~/.ssh`
![Alt Text](/images/posts/6c35b8f848ad4b169423020639c25575.png)

> 注意： 如果返回“… No such file or directory”，说明没有生成过SSH Key，直接进入第4步。否则进入第3步备份!

3. 备份：执行下面代码
- `mkdir key_backup `
- `mv id_rsa* key_backup`

4. 然后生成新的Key：（引号内的内容替换为你自己的邮箱）

- `ssh-keygen -t rsa -C "your_email@youremail.com"`

输出显示：
部分截图如下，已经打马赛克
![Alt Text](/images/posts/98e43c6147b643f9957a602d0bdffe9d.png)
- 具体操作

>- Generating public/private rsa key pair.
> - Enter file in which to save the key (/c/Users/slien/.ssh/id_rsa): `<press enter>` 直接回车，不要修改默认路径
> - Enter passphrase (empty for no passphrase):`<enter a passphrase>` 不设置密码，直接回车，下同
Enter same passphrase again:`<enter passphrase again>` 设置一个密码短语，在每次远程操作之前会要求输入密码短语！
闲麻烦可以`直接回车`，不设置。

- 成功：

```python
Your identification has been saved in /c/Users/123131/.ssh/id_rsa
Your public key has been saved in /c/Users/1321312/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:e111111111111111111111111111111111111j11111u1c 11111111@demo.com
The key's randomart image is:
+---[RSA ****]----+
|      . o +* o   |
 内容已更改
|     . = oo = .  |
|         .oo ... |
+----[SHA****]-----+

```

5. 提交公钥：

- 找到.ssh文件夹(看上边成功提示的路径，/c/Users/123131/.ssh/id_rsa)，用文本编辑器(推荐npp)打开“`id_rsa.pub`”文件，复制内容到剪贴板。
![Alt Text](/images/posts/32926e8bb3f242fdb0093c0fbcf576dd.png)

---
![Alt Text](/images/posts/8792ca47a3214e92a88d9df0f28a38aa.png)
- 回到git bash页面

- 输入 `git remote add origin git@github.com:slience-me/demo.git` 然后回车
- 然后输入`git remote -v` 查看连接的远程仓库链接

![Alt Text](/images/posts/2665bdc52d2d46b4a9434668a2286542.png)
- 仓库连接成功，可以进行操作了

最常用的指令：
1. `git init`
2. `git add ./`
3. `git commit -m "某某某提交的代码，内容"`
4. `git push --set-upstream origin master`
