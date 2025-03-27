# Git相关指令

[跳转=>Git基础](/notes/hidden/git-basic)

```bash
sudo apt install git  # 安装

# 查看配置信息
git config --list
git config --global --list
git config -l  
git config --global -l	

# 设置代理
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 初始化Git配置
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 创建本地仓库
git init

# 添加文件到暂存区
git add <file>
git add xxx 	# 把某一个文件或者文件夹提交到暂存区
git add . 	    # 把当前仓库中所有最新修改的文件都提交到暂存区
git add -A	    # 把所有最新修改的文件都提交到暂存区

# 查看当前文件的状态（红色代表在工作区，绿色代表在暂存区，看不见表示已经提交到历史区）
git status 

# 提交文件到本地仓库
git commit -m "Commit message"

# 设置远程仓库
git remote add origin <url>

# 查看远程仓库
git remote show origin
git remote -v 	        # 查看本地仓库和哪些远程仓库保持链接
git remote rm origin 	# 删除origin这个关联信息
git ls-remote --heads <repository_url>  # 查看有哪些分支

# 推送本地仓库到远程仓库
git push -u origin master

# 克隆远程仓库到本地
git clone <url>
git clone -b develop <repository_url>  # -b 指定分支

# 拉取远程仓库的更新
git pull
git pull origin 分支名  拉取远程仓库文件到本地   master
git pull origin main --allow-unrelated-histories # 允许合并不相关的历史记录


# 创建分支并切换到该分支
git checkout -b <branch>

# 切换到主分支
git checkout master

# 合并分支到主分支
git merge <branch>

# 删除分支
git branch -d <branch>

# 删除远程分支
git push origin --delete <branch>

# 查看分支
git branch

# 查看远程分支
git branch -r

# 查看提交历史
git log
git reflog   # 包含回滚的信息

# 回滚到指定版本
git reset --hard <commit_id>
git reset --hard  # 重置暂存区与工作区，与上一次commit保持一致
git reset --hard 版本号  # 回退到某个版本

# 撤销未提交的修改
git checkout -- <file>

# 配置别名
git config --global alias.<shortcut> <full_command>
```

```bash
# 常用的几个指令
-------------------------------------------------------------
git init
git add README.md
git commit -m "first commit"
git branch -M main  # 重命名分支
git remote add origin git@github.com:slience-me/notebooks.git
git push -u origin main  # -u 参数用于设置当前分支与远程分支的关联
-------------------------------------------------------------
git pull origin main # 拉取并合并分支

git tag                # 查看标签
git tag v1.0           # 创建标签
git push origin v1.0   # 推送标签到远程仓库
git push origin --tags # 推送所有标签到远程仓库

# 设置远程仓库的默认分支为master
git push --set-upstream origin master 
```

> 项目开发流程
>
> 1.项目负责人先创建中央仓库并增加协作者
>
> 2.小组成员基于$ git clone 把远程仓库及其内容克隆到本地一份（解决了三件事情：初始化本地仓库；与对应的远程仓库保持了关联；把远程仓库默认内容拉取到本地）
>
> 3.每个成员写完自己的程序后，基于“git add / git commit”把自己修改的内容存放到历史区，然后通过“git pull / git
> push”把本地信息和远程仓库信息保持同步（可能涉及冲突s的处理）

