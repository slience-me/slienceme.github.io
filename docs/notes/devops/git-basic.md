﻿# Git

## 1.Git的全局配置

```bash
$ git config -l  查看配置信息
$ git config --global -l	查看全局配置信息

# 配置全局信息：用户名和邮箱
$ git config --global user.name chenzelong
$ git config --global user.email 1257433726@qq.com
```

## 2.创建仓库完成版本控制

> 创建本地git仓库

```bash
$ git init    # 会生成一个隐藏文件夹“.git”（不能删）
```

> 在本地编写完成代码后（工作区），把一些文件提交到暂存区

```bash
$ git add xxx 	# 把某一个文件或者文件夹提交到暂存区
$ git add . 	# 把当前仓库中所有最新修改的文件都提交到暂存区
$ git add -A	# 把所有最新修改的文件都提交到暂存区

$ git status # 查看当前文件的状态（红色代表在工作区，绿色代表在暂存区，看不见表示已经提交到历史区）
```

> 把暂存区内容提交到历史区

```bash
$ git commit -m'描述信息'

# 查看历史版本信息（历史记录）
$ git log   输入q退出
$ git reflog  包含回滚的信息
```

>撤销

```bash
# 恢复暂存区的指定文件到工作区
$ git checkout 文件名称
# 恢复暂存区的所有文件到工作区
$ git checkout . # （慎用）
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset 文件名称
# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard
# 回退到某个版本
$ git reset --hard 版本号
```

## 3.把本地仓库信息提交到远程仓库

```bash
# 建立本地仓库和远程仓库的链接
$ git remote -v 	# 查看本地仓库和哪些远程仓库保持链接
$ git remote add origin Git远程仓库地址	 # 让本地仓库和远程仓库新建一个链接（origin是随便起的一个链接名，可以改，但是一般都用这个）
$ git remote rm origin 		# 删除origin这个关联信息

$ git pull origin 分支名  # 拉取远程仓库文件到本地   master
$ git push origin 分支名  # 把本地代码提交到远程仓库

$ git clone 远程仓库git地址 别名   # 从远程仓库克隆（别名可以不设置，默认是仓库名）
$ git branch 分支名称创建分支
```

> 项目开发流程
>
> 	1.项目负责人先创建中央仓库并增加协作者
>
> 	2.小组成员基于$ git clone 把远程仓库及其内容克隆到本地一份（解决了三件事情：初始化本地仓库；与对应的远程仓库保持了关联；把远程仓库默认内容拉取到本地）
>
> 	3.每个成员写完自己的程序后，基于“git add / git commit”把自己修改的内容存放到历史区，然后通过“git pull / git push”把本地信息和远程仓库信息保持同步（可能涉及冲突的处理）
-----

# IDEA配置
## 1. 忽略文件
有些时候我们不想把某些文件纳入版本控制中，比如数据库文件，临时文件，设计文件等

在主目录下建立"`.gitignore`"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（`#`）开始的行将会被忽略。

2. 可以使用`Linux`通配符。
	- 例如：星号（`*`）代表任意多个字符
	- 问号（`？`）代表一个字符
	- 方括号（`[abc]`）代表可选字符范围
	- 大括号（`{string1,string2,...}`）代表可选的字符串等。

4. 如果名称的最前面有一个感叹号（`!`），表示例外规则，将不被忽略。

5. 如果名称的最前面是一个路径分隔符（`/`），表示要忽略的文件在此目录下，而子目录中的文件不忽略。

6. 如果名称的最后面是一个路径分隔符（`/`），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。
```
#为注释
*.txt        #忽略所有 .txt结尾的文件,这样的话上传就不会被选中！
!lib.txt     #但lib.txt除外
/temp        #仅忽略项目根目录下的TODO文件,不包括其它目录temp
build/       #忽略build/目录下的所有文件
doc/*.txt    #会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```
## 2. gitee公钥配置

[官网](https://gitee.com/)

找到c盘用户路径下的文件夹.ssh，进去

![Alt Text](/images/2021071814432795.png)

输入命令即可，其中 `-t rsa`是加密方式

```bash
$ ssh-keygen -t rsa
```

```bash
git add .
git commit -m"message"
git push
```

## 3. git中常用的分支命令

```bash
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 切换到该分支
git checkout [branch]

# 新建一个分支，并切换到该分支
git checkout -b [branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

::: tip 发布时间:
2021-07-18
:::

