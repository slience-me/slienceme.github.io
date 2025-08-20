# Git&SVN

## Git相关指令

[跳转=>Git基础](/notes/hidden/git-basic)

```bash
# ==============================
# 1. 安装 Git
# ==============================
sudo apt update
sudo apt install git -y   # 安装git

# ==============================
# 2. 配置 Git
# ==============================
# 查看配置信息
git config --list
git config --global --list
git config -l  
git config --global -l	

# 初始化用户信息
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 配置代理
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 配置别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate"

# ==============================
# 3. 本地仓库操作
# ==============================
git init   # 创建本地仓库

# 添加文件到暂存区
git add <file>
git add xxx   # 提交某一个文件/文件夹
git add .     # 提交当前目录所有文件
git add -A    # 提交所有文件（包含新增/修改/删除）

# 查看状态
git status

# 提交文件到本地仓库
git commit -m "Commit message"

# ==============================
# 4. 分支操作
# ==============================
git branch                # 查看本地分支
git branch -r             # 查看远程分支
git branch <branch>       # 创建分支
git branch -d <branch>    # 删除分支
git branch -f <branch> <commit>   # 强制修改分支指向

# 切换分支
git checkout <branch>     
git checkout master       
git checkout -b <branch>  # 创建并切换分支

# 合并分支
git merge <branch>        # 合并某分支到当前分支
git rebase <branch>       # 变基到某分支

# 分支关联（设置本地分支跟踪远程分支）
git branch -u origin/<branch>
git branch --set-upstream-to=origin/<branch> <local_branch>

# ==============================
# 5. 远程仓库操作
# ==============================
git remote add origin <url>     # 设置远程仓库
git remote -v                   # 查看远程仓库
git remote show origin          # 查看远程仓库详情
git remote rm origin            # 删除远程仓库
git ls-remote --heads <url>     # 查看远程分支

# 克隆仓库
git clone <url>
git clone -b develop <url>   # 克隆指定分支

# 推送到远程仓库
git push -u origin master    # 首次推送并建立关联
git push origin <source>:<destination>  # 推送到指定分支
git push origin --delete <branch>       # 删除远程分支
git push origin :<branch>               # 删除远程分支（旧写法）

# 拉取远程更新
git pull                        # 拉取更新(fetch+merge)
git pull origin <branch>        # 拉取指定分支
git pull origin main --allow-unrelated-histories  # 合并不相关历史
git pull origin <src>:<dst>     # 拉取远程src到本地dst

# 单独拉取
git fetch origin

# ==============================
# 6. 提交历史与回滚
# ==============================
git log         # 查看提交历史
git reflog      # 查看操作历史（包含回滚）

# 回退到某个版本
git reset --hard <commit_id>
git reset --hard   # 重置到上一次提交
git reset --hard HEAD^   # 回退到上一个提交

# 撤销未提交的修改
git checkout -- <file>  # 恢复文件到上一次提交的状态

# ==============================
# 7. 高级操作
# ==============================
# 分离 HEAD（不依赖任何分支，仅指向某个提交）
git checkout <commit_id>

# 相对引用
git checkout HEAD^   # 上一个提交
git checkout HEAD~3  # 上3个提交

# 撤销变更
git revert <commit>    # 生成一个新的提交，撤销指定提交
git reset --soft HEAD~1   # 回退上一次提交，但保留改动
git reset --mixed HEAD~1  # 回退提交+暂存区，保留工作区改动
git reset --hard HEAD~1   # 完全回退

# Cherry-pick （挑选提交）
git cherry-pick <commit_id>

# 交互式 Rebase（修改历史）
git rebase -i HEAD~3   # 修改最近3次提交

# 标签操作
git tag v1.0.0                 # 创建标签
git tag -a v1.0.0 -m "msg"     # 创建附注标签
git tag                        # 查看标签
git push origin v1.0.0         # 推送标签
git push origin --tags         # 推送所有标签
git tag -d v1.0.0              # 删除本地标签
git push origin :refs/tags/v1.0.0  # 删除远程标签

# Git describe（显示标签信息）
git describe --tags   # 最近的标签及之后的提交

# ==============================
# 8. 常用 Git 工作流
# ==============================

# --------------------------------
# 1) Feature 开发流程 (推荐)
# --------------------------------
git checkout -b feature/xxx develop   # 从开发分支创建功能分支
# (开发 & 提交代码)
git add .
git commit -m "feat: 新增功能 xxx"

git push -u origin feature/xxx       # 推送到远程

# 完成功能后合并到 develop
git checkout develop
git pull origin develop
git merge feature/xxx
git push origin develop

# 清理功能分支
git branch -d feature/xxx
git push origin --delete feature/xxx

# --------------------------------
# 2) Release 发布流程
# --------------------------------
git checkout -b release/1.0.0 develop   # 从 develop 创建 release 分支
# (修复 bug & 文档更新)
git commit -m "chore: release 1.0.0"

git checkout main                       # 切到主分支
git merge release/1.0.0                 # 合并 release 到 main
git tag -a v1.0.0 -m "Release 1.0.0"    # 打标签
git push origin main
git push origin v1.0.0                  # 推送标签

git checkout develop
git merge release/1.0.0                 # 将 release 分支的修改合并回 develop
git branch -d release/1.0.0             # 删除本地 release
git push origin --delete release/1.0.0  # 删除远程 release

# --------------------------------
# 3) Hotfix 紧急修复流程 （补丁patch分支）
# --------------------------------
git checkout -b hotfix/1.0.1 main       # 从主分支创建 hotfix
# (修复 bug)
git commit -m "fix: 紧急修复 xxx"

git checkout main
git merge hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git push origin main
git push origin v1.0.1

git checkout develop
git merge hotfix/1.0.1                  # 将 hotfix 也合并到 develop
git branch -d hotfix/1.0.1
git push origin --delete hotfix/1.0.1
```

> 项目开发流程
>
> 1.项目负责人先创建中央仓库并增加协作者
>
> 2.小组成员基于$ git clone 把远程仓库及其内容克隆到本地一份（解决了三件事情：初始化本地仓库；与对应的远程仓库保持了关联；把远程仓库默认内容拉取到本地）
>
> 3.每个成员写完自己的程序后，基于“git add / git commit”把自己修改的内容存放到历史区，然后通过“git pull / git
> push”把本地信息和远程仓库信息保持同步（可能涉及冲突s的处理）

## SVN相关指令

```bash
sudo apt install subversion  # 安装

# 查看版本
svn --version

# 检出（checkout）远程仓库到本地目录
svn checkout <repository_url>
svn co <repository_url>     # 简写

# 向远程仓库导入本地目录（首次提交用）
svn import <path> <repository_url> -m "import message"

# 查看仓库信息
svn info

# 添加文件或目录到版本控制
svn add <file_or_dir>

# 删除版本控制的文件或目录
svn delete <file_or_dir>
svn del <file_or_dir>       # 简写

# 提交更新到仓库
svn commit -m "commit message"
svn ci -m "commit message"  # 简写

# 更新本地工作副本
svn update
svn up                      # 简写

# 查看修改状态
svn status
svn st                      # 简写

# 查看文件差异
svn diff <file>
svn di <file>               # 简写

# 还原修改（回退工作副本的更改）
svn revert <file_or_dir>

# 查看提交日志
svn log
svn log -l 5                # 查看最近5条日志记录

# 查看文件历史记录
svn blame <file>
svn praise <file>           # 等效命令

# 创建分支或标签
svn copy <src_url> <dst_url> -m "create branch or tag"

# 合并其他分支的修改
svn merge <branch_url>

# 切换工作副本到其他分支或标签
svn switch <branch_url>

# 显示工作副本中文件的锁定状态
svn status -u

# 锁定文件（防止他人修改）
svn lock <file> -m "lock reason"

# 解锁文件
svn unlock <file>

# 清理工作副本（解决update或revert失败时）
svn cleanup
```

## SVN 与 Git 命令对照表

| 操作        | Git 命令                                                                       | SVN 命令                                                 |
|-----------|------------------------------------------------------------------------------|--------------------------------------------------------|
| 安装        | `sudo apt install git`                                                       | `sudo apt install subversion`                          |
| 初始化仓库     | `git init`                                                                   | 无（通过 `svn import` 上传到仓库，或 `svn checkout` 检出）           |
| 克隆远程仓库    | `git clone <url>`                                                            | `svn checkout <url>` 或 `svn co <url>`                  |
| 添加文件到版本控制 | `git add <file>`                                                             | `svn add <file>`                                       |
| 查看状态      | `git status`                                                                 | `svn status` 或 `svn st`                                |
| 提交更改      | `git commit -m "message"`                                                    | `svn commit -m "message"` 或 `svn ci -m "message"`      |
| 更新本地代码    | `git pull`                                                                   | `svn update` 或 `svn up`                                |
| 推送到远程仓库   | `git push`                                                                   | 自动提交，无需单独推送                                            |
| 删除文件      | `git rm <file>`                                                              | `svn delete <file>` 或 `svn del <file>`                 |
| 查看日志      | `git log`                                                                    | `svn log`                                              |
| 查看差异      | `git diff`                                                                   | `svn diff` 或 `svn di`                                  |
| 回退文件更改    | `git checkout <file>`                                                        | `svn revert <file>`                                    |
| 创建分支      | `git branch <branch>` + `git checkout <branch>` 或 `git checkout -b <branch>` | `svn copy <trunk_url> <branch_url> -m "create branch"` |
| 合并分支      | `git merge <branch>`                                                         | `svn merge <branch_url>`                               |
| 删除分支      | `git branch -d <branch>`                                                     | `svn delete <branch_url> -m "delete branch"`           |
| 切换分支      | `git checkout <branch>`                                                      | `svn switch <branch_url>`                              |
| 查看远程仓库    | `git remote -v`                                                              | 无，直接通过 URL 管理                                          |
| 查看文件历史    | `git blame <file>`                                                           | `svn blame <file>`                                     |
| 处理锁       | 无对应命令（Git 不锁文件）                                                              | `svn lock <file>` / `svn unlock <file>`                |
| 清理工作区     | 无需，Git自动处理                                                                   | `svn cleanup`                                          |
| 设置用户名邮箱   | `git config --global user.name` 等                                            | 全局配置，不通过命令设置，通常通过认证方式输入                                |
| 设置代理      | `git config --global http.proxy`                                             | 通过环境变量设置，如 `http_proxy`                                |
