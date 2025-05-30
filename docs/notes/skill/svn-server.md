# Linux搭建SVN服务器

并内网穿透实现公网远程访问

> 以下指令：默认`root`用户，省略`sudo`

## 1. 安装SVN服务端(基于Ubuntu)

```bash
# ----------------------------
# 1. 安装 Subversion（SVN）
# ----------------------------
apt update
apt install subversion

# ----------------------------
# 2. 查看 SVN 版本
# ----------------------------
svnserve --version

# ----------------------------
# 3. 创建版本库目录结构
#    Create base directory for SVN repository
# ----------------------------
mkdir -p /opt/svn
cd /opt/svn

# ----------------------------
# 4. 创建 SVN 仓库（repository）
#    Create SVN repository at specified path
# ----------------------------
svnadmin create /opt/svn/repository

# 创建完成后，目录结构如下：
# /opt/svn/repository/
# ├── conf/    # 配置文件（权限、密码等） Configuration files
# ├── db/      # 数据库（实际存储的版本数据） Repository data
# ├── hooks/   # 钩子脚本（可选） Hook scripts
# ├── locks/   # 锁文件 Lock files
# └── format   # 仓库格式标识 Repository format

# ----------------------------
# 5. 设置访问权限
#    Set appropriate permissions
# ----------------------------
# 将仓库所属用户设置为当前登录用户（或运行svnserve的用户）
# 如果使用Apache访问，可以改为 www-data
chown -R $USER:$USER /opt/svn/repository

# 若仍需测试阶段可读写，可临时设置更开放权限（不推荐用于生产环境）：
# chmod -R 755 /opt/svn/repository
```

下面是优化后的 SVN 权限配置笔记，结构更清晰、注释更准确，方便后期复制使用：

------

## 2. 修改配置文件

开启账户与权限管理

> 所有配置文件都在 SVN 仓库目录下的 `conf/` 文件夹中：
>  示例仓库路径：`/opt/svn/repository/conf/`

------

### 2.1 修改 `svnserve.conf` 文件（主配置）

```bash
cd /opt/svn/repository/conf
vim svnserve.conf
```

将以下配置项取消注释，并按需修改：

```ini
[general]
anon-access = none          # 匿名用户访问权限：none（禁止）| read（只读）| write（读写）
auth-access = write         # 登录用户权限：read（只读）| write（读写）
password-db = passwd        # 指定用户密码文件，默认就是 passwd
authz-db = authz            # 启用路径权限控制，默认就是 authz
realm = MySVNRepo           # 认证域名，客户端显示用，建议设定为项目名或组织名
```

------

### 2.2 修改 `passwd` 文件（添加用户）

```bash
vim passwd
```

在 `[users]` 部分添加用户账号信息，格式为：`用户名 = 密码`

```ini
[users]
alice = alice123
bob = bob123
carol = carol123
```

------

### 2.3 修改 `authz` 文件（配置路径权限）

```bash
vim authz
```

常用结构如下：

```ini
[aliases]
# 可定义用户别名（一般可省略）

[groups]
dev_team = alice, bob
test_team = carol

# 为项目设置访问权限，路径是相对于仓库根目录
# 例：项目 project1 的 trunk 目录权限
[project1:/trunk]
alice = rw
bob = r

[project1:/branches]
alice = rw

[project1:/tags]
alice = rw

# 通用权限（如禁止匿名用户）
[/]
* =
```

> 建议每个项目配置一组路径权限，确保隔离控制。

------

## 3. 启动 svnserve 服务（测试用）

```bash
svnserve -d -r /opt/svn
```

客户端可以通过以下地址访问：

```bash
svn checkout svn://localhost/repository/trunk
```

## 4. 案例

下面是一个**典型的 SVN 项目管理案例**，适合中小团队用于协作开发。它包含标准的目录结构、用户角色划分、权限控制，以及如何在团队中实际使用 SVN。

### 4.1 目录结构设计：标准 SVN 模式

每个项目目录如下：

```bash
/repository/
└── project-demo/
    ├── trunk/      # 主干开发：主代码、当前活跃开发分支
    ├── branches/   # 分支开发：新功能、测试、试验性代码
    └── tags/       # 发布版本：稳定的历史快照（只读）
```

### 4.2 用户角色划分

| 用户名 | 角色     | 描述                            |
| ------ | -------- | ------------------------------- |
| alice  | 开发人员 | 有 `project-demo` 的读写权限    |
| bob    | 测试人员 | 只读权限（读取 trunk/branches） |
| carol  | 管理员   | 对项目有全部权限                |

### 4.3 权限配置（`authz` 文件）

```ini
[groups]
developers = alice
testers = bob
admins = carol

# 主干代码权限
[project-demo:/trunk]
@developers = rw
@testers = r
@admins = rw

# 分支权限
[project-demo:/branches]
@developers = rw
@testers = r
@admins = rw

# 标签（发布版本）权限，只读
[project-demo:/tags]
@developers = r
@testers = r
@admins = rw

# 仓库根目录禁止其他用户访问
[/]
* =
```

### 4.4 项目初始化步骤

```bash
# 初始化目录
svn mkdir file:///opt/svn/repository/project-demo -m "Create project root"
svn mkdir file:///opt/svn/repository/project-demo/trunk -m "Create trunk"
svn mkdir file:///opt/svn/repository/project-demo/branches -m "Create branches"
svn mkdir file:///opt/svn/repository/project-demo/tags -m "Create tags"
```

### 4.5 开发人员使用流程（示例）

#### ① 检出主干

```bash
svn checkout svn://your-ip/repository/project-demo/trunk my-project
```

#### ② 开发提交

```bash
svn add src/
svn commit -m "Add new feature X"
```

#### ③ 创建功能分支

```bash
svn copy svn://your-ip/repository/project-demo/trunk \
         svn://your-ip/repository/project-demo/branches/feature-login \
         -m "Create login feature branch"
```

#### ④ 发布版本打标签

```bash
svn copy svn://your-ip/repository/project-demo/trunk \
         svn://your-ip/repository/project-demo/tags/v1.0 \
         -m "Release v1.0"
```

### 4.6 客户端访问（TortoiseSVN）

- `trunk`：开发人员检出开发版本
- `branches/feature-login`：单独开发某功能
- `tags/v1.0`：测试或用户访问发布版本（只读）

[下载链接](https://tortoisesvn.net/downloads.zh.html)