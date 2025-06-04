# Jenkins

## 1. 安装

[跳转=>docker安装Jenkins教程](/notes/middleware/docker#_5-8-jenkins)

> 注意：由于使用了docker环境，因此`java`、`maven`环境都要配置到容器中才行
>
> 另外注意使用`host`网络模式，桥接可能出现网络问题

**解锁Jenkins**

首次访问`http://<主机IP>:8080`时，需输入初始管理员密码：

1. 在启动日志中查找密码：

   ```bash
   Jenkins initial setup is required. An admin user has been created and a password generated.
   Please use the following password to proceed to installation:
   <初始管理员密码>
   ```

2. 或通过主机数据卷查看(这个看docker容器挂载的路径)：

   ```bash
   cat {挂载的路径}clear/secrets/initialAdminPassword
   ```

## 2. 配置

### 2.1 系统管理

#### ① 全局安全配置

点击`系统管理`，进行`全局安全配置`

![image-20250530111045430](/images/jenkins/image-20250530111045430.png)

![image-20250530132926446](/images/jenkins/image-20250530132926446.png)

#### ② 全局工具配置

![image-20250530133048761](/images/jenkins/image-20250530133048761.png)

![image-20250530160417920](/images/jenkins/image-20250530160417920.png)

<img src="/images/jenkins/image-20250530160435863.png" alt="image-20250530160435863" style="zoom: 50%;" />

<img src="/images/jenkins/image-20250530160449904.png" alt="image-20250530160449904" style="zoom:50%;" />

#### ③ 插件下载

除去安装推荐的插件外，还需要安装相关插件

- `Deploy to container `
- `subversion`

## 3. 开始

### 3.1 创建项目

创建一个maven项目

> 省略

提交到仓库后

![image-20250530143951895](/images/jenkins/image-20250530143951895.png)

![image-20250530144030199](/images/jenkins/image-20250530144030199.png)

![image-20250530145637930](/images/jenkins/image-20250530145637930.png)

![image-20250530150054265](/images/jenkins/image-20250530150054265.png)

<img src="/images/jenkins/image-20250530150054265.png" alt="image-20250530150054265" style="zoom:50%;" />

<img src="/images/jenkins/image-20250530150132800.png" alt="image-20250530150132800" style="zoom:50%;" />

![image-20250530150234798](/images/jenkins/image-20250530150234798.png)

> 仓库地址：
>
> svn://192.168.153.128/jenkin-study/jenkin-study/trunk

![image-20250530150321851](/images/jenkins/image-20250530150321851.png)

![image-20250530150512538](/images/jenkins/image-20250530150512538.png)

![image-20250530150610178](/images/jenkins/image-20250530150610178.png)

![image-20250530163207601](/images/jenkins/image-20250530163207601.png)

![image-20250530163959377](/images/jenkins/image-20250530163959377.png)

![image-20250530164116577](/images/jenkins/image-20250530164116577.png)

### 3.2 其他

**构建触发器**

> 访问：http://192.168.153.128:8080/job/JenkinsStudy/build?token=slience_me  
> 即可开始构建

![image-20250530164330402](/images/jenkins/image-20250530164330402.png)



## 4. 部署

### 4.1 部署Vue项目

#### ①安装配置插件`NodeJS`

![image-20250604154403720](/images/jenkins/image-20250604154403720.png)

![image-20250604154436842](/images/jenkins/image-20250604154436842.png)

![image-20250604154555468](/images/jenkins/image-20250604154555468.png)

![image-20250604154504817](/images/jenkins/image-20250604154504817.png)

#### ②全局工具配置

![image-20250604154707659](/images/jenkins/image-20250604154707659.png)

最下面

<img src="/images/jenkins/image-20250604154744871.png" alt="image-20250604154744871" style="zoom:50%;" />

![image-20250604154843334](/images/jenkins/image-20250604154843334.png)

#### ③创建任务

<img src="/images/jenkins/image-20250604154951550.png" alt="image-20250604154951550" style="zoom:50%;" />

<img src="/images/jenkins/image-20250604155019285.png" alt="image-20250604155019285" style="zoom:50%;" />

<img src="/images/jenkins/image-20250604155118495.png" alt="image-20250604155118495" style="zoom:50%;" />

<img src="/images/jenkins/image-20250604155138597.png" alt="image-20250604155138597" style="zoom:50%;" />

下面再加一个Shell

<img src="/images/jenkins/image-20250604155207439.png" alt="image-20250604155207439" style="zoom:50%;" />

```bash
#!/bin/sh -xe
# 当前路径
echo "当前路径：$(pwd)"

# 输出 Node 和 npm 版本信息（便于排查环境问题）
echo "Node 版本：$(node -v)"
echo "npm 版本：$(npm -v)"

# 清理旧依赖和缓存，确保干净构建
rm -rf node_modules package-lock.json dist
npm cache clean --force

# 设置国内镜像源
npm config set registry https://registry.npmmirror.com

# 安装依赖（兼容旧版项目，跳过 peer 冲突）
npm install --legacy-peer-deps

# 构建项目
npm run build

# 检查构建结果
if [ $? -eq 0 ]; then
  echo "✅ 构建成功"
else
  echo "❌ 构建失败，请检查日志"
  exit 1
fi
```

#### ④ 部署（分离 待优化）

这里使用docker去部署到nginx，jenkins也是运行在docker容器中的

```bash
# 创建部署目录（宿主机）
DEPLOY_DIR=/docker/nginx/项目名
mkdir -p "$DEPLOY_DIR"/html "$DEPLOY_DIR"/logs "$DEPLOY_DIR"/conf
rm -rf "$DEPLOY_DIR"/html/*
cp -r dist/* "$DEPLOY_DIR"/html/

# 7. 首次部署：检查并启动 nginx 容器
NGINX_CONTAINER_NAME=vue_nginx_container
if [ ! "$(docker ps -aq -f name=^${NGINX_CONTAINER_NAME}$)" ]; then
  echo "Nginx 容器不存在，首次启动..."
  docker run -d \
    --name "$NGINX_CONTAINER_NAME" \
    -p 80:80 \
    -v "$DEPLOY_DIR"/html:/usr/share/nginx/html \
    -v "$DEPLOY_DIR"/logs:/var/log/nginx \
    -v "$DEPLOY_DIR"/conf:/etc/nginx \
    nginx
else
  echo "🔁 Nginx 容器已存在，拷贝新文件..."
  docker cp "$DEPLOY_DIR"/html/. "$NGINX_CONTAINER_NAME":/usr/share/nginx/html
  docker restart "$NGINX_CONTAINER_NAME"
fi

echo "✅ 首次部署完成！访问 http://localhost 或你的服务器地址查看效果"
```

## 附录

### Maven配置

在linux上配置一下maven环境

官方网站： https://maven.apache.org/download.cgi

下载对应的版本（我下载的tar.gz），后将压缩包放到目标目录下，我这里放到`/opt/`下

`tar -zxvf 名称.tar.gz`进行解压

然后配置环境变量

`vim /etc/profile`，在末尾加上

```bash
# 下载
wget https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz
tar -zxvf apache-maven-3.9.9-bin.tar.gz

# 编辑/etc/profile文件，在文件末尾添加如下代码：
vim /etc/profile
export MAVEN_HOME=/opt/apache-maven-3.9.9
export PATH=${PATH}:${MAVEN_HOME}/bin

# 保存文件，并运行如下命令使环境变量生效：
source /etc/profile

# 在控制台输入如下命令，如果能看到 Maven 相关版本信息，则说明 Maven 已经安装成功：
mvn -v
```

### Java配置

下载地址：https://www.oracle.com/cn/java/technologies/downloads/#java8

可能需要注册Oracle账户，才能下载

```bash
# 下载上传后，进行解压
tar -zxvf jdk-8u451-linux-x64.tar.gz

# 配置环境变量
# 编辑配置文件
vim /etc/profile

# 在末尾追加
export JAVA_HOME=/opt/jdk1.8.0_451
export JRE_HOME=/opt/jdk1.8.0_451/jre
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$PATH

# 使配置文件生效
source /etc/profile

# 测试版本号
java -version
```

### 报错：HTTP ERROR 403 No valid crumb was included in the request

<img src="/images/jenkins/image-20250530141508758.png" alt="image-20250530141508758" style="zoom: 67%;" />
