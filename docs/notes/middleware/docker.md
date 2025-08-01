# Docker

## 0. 官网

- [docker镜像地址](https://hub.docker.com/)
- [docker官网](https://docs.docker.com/desktop/setup/install/)
- [菜鸟教程Docker](https://www.runoob.com/docker/docker-tutorial.html)

使用阿里云进行镜像加速

> PS: 学的东西越多，越觉得这个笔记实际意义不大，但是对于初学者很有用，无论安装任何内容只需要去dockerhub去找，怎么使用overview里面写的很清楚，这笔记也是有意义的，他是你成长路上的脚印，代表了你从懵懂到熟悉的过程转变。

## 1. docker安装

### 【centos】

> PS: centos7官网镜像源已经不能用了,需要使用阿里云镜像源,使用下面方案解决
>
> [发现系统没有wget: 参考解决方案](https://blog.csdn.net/qq_67177419/article/details/144096396)

```bash
# 【centos7】
# 卸载旧版本
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
                
# 安装依赖
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
  
# 设置镜像源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        
# 安装docker
sudo yum install docker-ce docker-ce-cli containerd.io

sudo systemctl start docker # 启动docker
sudo systemctl enable docker # 设置开机自启

# 测试
sudo docker run hello-world
# 安装mysql
sudo docker pull mysql:5.7
```

### 【ubuntu】

> [阿里云开源镜像源](https://developer.aliyun.com/mirror/docker-ce)

```bash
#----------------------------------------------------------------
# 【ubuntu】
# 卸载旧版本 Docker
sudo apt remove docker \
                    docker-engine \
                    docker.io \
                    containerd \
                    runc

                  
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install ca-certificates curl gnupg

# step 2: 添加Docker的官方GPG密钥 【官方】
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Step 3: 写入软件源信息 更新 Docker APT 源 【官方】
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Step 4: 安装 Docker
sudo apt install docker-ce docker-ce-cli containerd.io
# 如果想要指定版本(可选择)
sudo apt-cache madison docker-ce
apt list -a docker-ce
sudo apt install docker-ce=<VERSION> docker-ce-cli=<VERSION> containerd.io

# 启动 Docker 并设置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 测试 Docker 安装
sudo docker run hello-world

# 安装 MySQL
sudo docker pull mysql:5.7
```

## 2. docker常用指令

```bash
docker version 					# 查看docker版本
docker -v
docker info 					# 查看docker信息
docker ps -a 					# 查看docker容器

docker push <image_name>:<tag>  # 上传镜像到远程仓库（如 Docker Hub）
docker pull <image_name>:<tag>  # 从远程仓库下载镜像
docker commit <container_id> <image_name>:<tag>  # 提交容器更改并创建新镜像
docker tag <source_image> <target_image>:<tag>   # 给已存在的镜像打标签

# 查看镜像
docker images                   # 查看本地所有镜像
docker images -a                # 查看所有镜像（包括中间镜像）
docker images <image_name>      # 查看指定镜像
docker history <image_name>:<tag>  # 查看镜像历史

docker logs container_id 		# 查看docker容器日志
docker logs tail 100 container_id
docker logs -fnt container_id
docker port container_id 		# 查看docker容器端口映射
docker top container_id 		# 查看docker容器进程
docker inspect container_id 	# 查看docker容器详细信息
docker start container_id 		# 启动docker容器
docker stop container_id 		# 停止docker容器
docker restart container_id 	# 重启docker容器

# 删除镜像
docker rmi <image_id>           # 删除指定的镜像
docker rmi $(docker images -q)  # 删除所有未使用的镜像
docker rmi -f <image_id>        # 强制删除镜像（即使有容器依赖）
docker rm container_id 			# 删除docker容器
docker exec -it your_container_name /bin/bash # 进入容器 交互模式

# 构建镜像
docker build -t <image_name>:<tag> .  # 从当前目录的 Dockerfile 构建镜像并指定镜像名称和标签
docker build -t <image_name>:<tag> -f <Dockerfile_path> .    # 指定 Dockerfile 的路径进行构建
docker build --progress=plain -t <image_name>:<tag> . # 查看镜像构建进度日志
docker build --no-cache -t <image_name>:<tag> .       # 禁用缓存，重新构建镜像
docker build -t <image_name>:<tag> <context_path>     # 指定构建上下文目录（比如某个目录）

docker network ls               			  # 查看所有 Docker 网络
docker network inspect <network_name> 		  # 查看网络的详细信息
docker network create --driver <driver> --subnet <subnet> --gateway <gateway> <network_name> # bridge host
docker network rm <network_name>			  # 删除指定网络
docker network connect <network> projectB     # 将项目与网络桥接

# 查询所有容器的重启策略
docker ps -q | xargs -I {} docker inspect --format '{{.Name}}: {{.HostConfig.RestartPolicy.Name}}' {}

# 其他
help  # 兜底
```

> 常见网络驱动类型
>
> - bridge：用于单一主机内的容器之间的通信（默认网络）。
> - host：容器直接共享主机的网络，容器不会得到独立的网络命名空间。
> - none：容器没有网络连接。
> - overlay：用于跨多台主机的容器之间的通信，通常用于 Docker Swarm 模式。
> - macvlan：为容器分配一个独立的 MAC 地址，可以使容器在物理网络上像一个独立设备一样进行通信。
> - ipvlan：与 `macvlan` 类似，但它使用 IP 地址而非 MAC 地址来通信。

## 3. 镜像加速

> 官方镜像源：https://hub.docker.com
>
> [DockerHub 国内加速镜像列表](https://github.com/dongyubin/DockerHub)

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.mybacc.com",
    "https://dytt.online",
    "https://lispy.org",
    "https://docker.xiaogenban1993.com",
    "https://docker.yomansunter.com",
    "https://aicarbon.xyz",
    "https://666860.xyz",
    "https://docker.zhai.cm",
    "https://a.ussh.net",
    "https://hub.littlediary.cn",
    "https://hub.rat.dev",
    "https://docker.m.daocloud.io"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 4. docker常见问题汇总

### 4.1 ufw端口管控

> ~~最近，我发现使用docker运行的容器，进行端口映射后，可以正常访问，但是ufw防火墙并没有开放端口；这样岂不是防火墙失效了，这哪里行！~~
>
> ~~具体描述: Docker 默认使用自己的网络管理方式，导致 Docker 容器的端口不会直接与 UFW 配合，造成 Docker 容器端口不可访问或者
> UFW 防火墙规则对容器端口不起作用。因此，UFW 并不会自动管理 Docker 容器的网络流量。~~
>
> ~~通过调整 Docker 和 UFW 的配置，确保容器的端口能够正确地通过 UFW 的规则进行访问。~~
>
> ~~现在仍然没有更好的方案，我选择停用ufw，改为firewalld~~

### 4.2 权限问题

> 普通用户无法使用`docker ps`等相关的指令，我们需要授权，执行如下指令：

```bash
# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

## 5. 常用软件安装

### 5.1 MySQL

[dockerhub-mysql-5.7](https://hub.docker.com/_/mysql)

```bash
# 1. 拉取镜像
docker pull mysql:5.7

# 2. 创建容器
# 创建并准备必要的宿主机目录： 确保宿主机上的目录
sudo mkdir -p /home/slienceme/docker/mysql/log /home/slienceme/docker/mysql/data /home/slienceme/docker/mysql/conf

# 注意这个路径一定要对应上
sudo docker run -p 3306:3306 --name mysql \
-v /home/slienceme/docker/mysql/log:/var/log/mysql \
-v /home/slienceme/docker/mysql/data:/var/lib/mysql \
-v /home/slienceme/docker/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:5.7

# --network 指定网络 --ip 指定IP
# -p 3306:3306 将主机的 3306 端口映射到容器的 3306 端口
# --name mysql 设置容器名称为 mysql
# -v /mydata/mysql/log:/var/log/mysql 将日志目录挂载到主机
# -v /mydata/mysql/data:/var/lib/mysql 将数据目录挂载到主机
# -v /mydata/mysql/conf:/etc/mysql 将配置目录挂载到主机
# -e MYSQL_ROOT_PASSWORD=123456 设置 root 用户的密码为 root
# -d mysql:5.7 后台运行容器，并返回容器 ID

# 3. 进入容器
docker exec -it mysql /bin/bash
# 4. 登录mysql
mysql -uroot -p123456
# 5. 创建数据库
create database test
# 6. 创建用户
create user 'test'@'%' identified by '123456'
# 7. 授权用户
grant all privileges on test.* to 'test'@'%'
# 8. 刷新权限
flush privileges

# 修改配置文件
vi /home/slienceme/docker/mysql/conf/my.cnf
# ============================开始=============================
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
# ============================结束============================

# 设置自动启动
docker update mysql --restart=always

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

### 5.2 Redis

```bash
# 1. 拉取镜像
docker pull redis
mkdir -p /home/slienceme/docker/redis/conf
touch /home/slienceme/docker/redis/conf/redis.conf

# 2. 创建容器
docker run -p 6379:6379 --name redis -v /home/slienceme/docker/redis/data:/data \
    -v /home/slienceme/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
    -d redis redis-server /etc/redis/redis.conf --requirepass redis_test

# --network 指定网络 --ip 指定IP
# --requirepass redis_test  设置密码

# 3. 进入容器
docker exec -it redis redis-cli

# 设置自动启动
docker update redis --restart=always

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

### 5.3 ElasticSearch&kibana

**安装ElasticSearch**

```bash
# 1. 拉取镜像
docker pull elasticsearch:7.4.2   # 存储和检索数据

# 2. 创建容器
# 创建并准备必要的宿主机目录： 确保宿主机上的目录
mkdir -p /home/slienceme/docker/elasticsearch/config
mkdir -p /home/slienceme/docker/elasticsearch/data
echo "http.host: 0.0.0.0" >> /home/slienceme/docker/elasticsearch/config/elasticsearch.yml

# 9200: 发送HTTP请求 RESTAPI 向elasticsearch的请求端口
# 9300：在分布式集群下 节点间的通讯端口
docker run -p 9200:9200 -p 9300:9300 --name elasticsearch \
	-e "discovery.type=single-node" \
	-e ES_JAVA_OPTS="-Xms1024m -Xmx2048m" \
	-v /home/slienceme/docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
    -v /home/slienceme/docker/elasticsearch/data:/usr/share/elasticsearch/data \
    -v /home/slienceme/docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
    -d elasticsearch:7.4.2

# 3. 设置开机启动
docker update elasticsearch --restart=always

# 4. 测试
# 查看elasticsearch版本信息： 访问 http://虚拟机IP:9200/

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

**安装kibana**

```bash
# 1. 拉取镜像
docker pull kibana:7.4.2          # 可视化检索数据

# 2. 创建容器  虚拟机IP:这个IP需要是docker内部IP 
# 通过 下面指令查询
docker ps
docker inspect 容器id
#"Networks": {
#     "bridge": {
#         ...
#         "IPAddress": "`172.17.0.4`",
#         ...
#     }

docker run -p 5601:5601 --name kibana \
	-e ELASTICSEARCH_HOSTS=http://容器内部IP:9200 \
	-d kibana:7.4.2

# 3. 设置开机启动
docker update kibana --restart=always

# 4. 测试
# 访问Kibana： http://虚拟机IP:5601/app/kibana

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

### 5.4 nginx

这种运行会出现问题, 因为需要先把配置文件复制出来才能正常run，所以直接按照第二种方案操作

> [Nginx in
> docker - [emerg\] 1#1: open() “/etc/nginx/nginx.conf” failed (2: No such file or directory)](https://forums.docker.com/t/nginx-in-docker-emerg-1-1-open-etc-nginx-nginx-conf-failed-2-no-such-file-or-directory/103325)

```bash
# 1. 拉取镜像
docker pull nginx:1.10

# 2. 创建容器
mkdir -p /home/slienceme/docker/nginx/html  # 创建多级文件夹
mkdir -p /home/slienceme/docker/nginx/logs
mkdir -p /home/slienceme/docker/nginx/conf
 
# 桥接
docker run -p 80:80 --name nginx \
 -v /home/slienceme/docker/nginx/html:/usr/share/nginx/html \
 -v /home/slienceme/docker/nginx/logs:/var/log/nginx \
 -v /home/slienceme/docker/nginx/conf/:/etc/nginx \
 -d nginx:1.10
 
 # host
docker run -p 80:80 --net=host --name nginx \
 -v /home/slienceme/docker/nginx/html:/usr/share/nginx/html \
 -v /home/slienceme/docker/nginx/logs:/var/log/nginx \
 -v /home/slienceme/docker/nginx/conf/:/etc/nginx \
 -d nginx:1.10
 

docker run --name my-custom-nginx-container \
	-v /host/path/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx

# 3. 设置开机启动
docker update nginx --restart=always
```

教程其他操作：PS：感觉没啥用，还多出很多操作，我喜欢上面的操作

> 唉，上面教程出问题了，报错，我试试第二种
>
> 10min后~
>
> 怪我太年轻，还得是第二种

```bash
# 另外也可以先不拉取镜像，直接run，docker发现没有会自动拉取
# 随便启动一个nginx实例，只是为了复制出配置
docker run -p 80:80 --name nginx -d nginx:1.10   

# 创建映射文件夹
mkdir -p /home/slienceme/docker/nginx/html
mkdir -p /home/slienceme/docker/nginx/logs
mkdir -p /home/slienceme/docker/nginx/conf

# 将容器内的配置文件拷贝到/home/slienceme/docker/nginx/conf/ 下
docker container cp nginx:/etc/nginx/  /home/slienceme/docker/nginx/conf/ 

# 这里复杂成功了，但是移动可能会出现权限问题nginx是root
# 递归修改文件及子目录和文件权限
sudo chown -R slienceme:slienceme /home/slienceme/docker/nginx/conf/nginx

#由于拷贝完成后会在config中存在一个nginx文件夹，所以需要将它的内容移动到conf中
mv /home/slienceme/docker/nginx/conf/nginx/* /home/slienceme/docker/nginx/conf/
rm -rf /home/slienceme/docker/nginx/conf/nginx

# 终止原容器
docker stop nginx

# 执行命令删除原容器
docker rm nginx

# 创建新的Nginx，执行以下命令
docker run -p 80:80 --name nginx \
 -v /mydata/nginx/html:/usr/share/nginx/html \
 -v /mydata/nginx/logs:/var/log/nginx \
 -v /mydata/nginx/conf/:/etc/nginx \
 -d nginx:1.10
  
# 设置开机启动nginx
docker update nginx --restart=always

# 创建“/mydata/nginx/html/index.html”文件，测试是否能够正常访问
echo '<h2>hello nginx!</h2>' >index.html

# 访问：http://ngix所在主机的IP:80/index.html
```

### 5.5 RabbitMQ

> `4369, 25672`: Erlang发现和集群端口 
>
> `5672, 5671`: AMQP端口
>
> `15672`: web管理后台端口
>
> `61613, 61614`: STOMP协议端口
>
> `1883, 8883`: MQTT协议端口
>
> 官网: https://www.rabbitmq.com/networking.html
>
> Docker: https://hub.docker.com/_/rabbitmq

```bash
# 创建新的Nginx，执行以下命令
docker run --name rabbitmq \
-p 5671:5671 -p 5672:5672 \
-p 4369:4369 -p 25672:25672 \
-p 15671:15671 -p 15672:15672 \
-d rabbitmq:management

# 默认账户/密码 guest

# 设置开机启动rabbitmq
docker update rabbitmq --restart=always
```

### 5.6 zipkin

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

### 5.7 ShardingSphere

> [官网网站教程](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/startup/docker/)
>
> 注意：如果没驱动，则需要下载驱动(MySQL
> 数据库） [mysql-connector-java-5.1.49.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar)
> 或者 [mysql-connector-java-8.0.11.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.11/mysql-connector-java-8.0.11.jar)
>
> 将其放到映射目录`./ext-lib/`目录下
>
> 更新时间 ：2025年3月21日 14点37分

```bash
# 1. 拉取镜像
docker pull apache/shardingsphere-proxy

# 2. 创建映射目录
mkdir -p /home/slienceme/docker/shardingsphere/

# 3. 从Docker容器中获取配置文件模板，拷贝到宿主机任意目录中
docker run -d --name tmp --entrypoint=bash apache/shardingsphere-proxy
docker cp tmp:/opt/shardingsphere-proxy/conf /home/slienceme/docker/shardingsphere/
docker rm tmp

# 4. 修改配置文件 conf/global.yaml 和 conf/database-*.yaml
# 引入第三方依赖或自定义算法

# 5. 启动 ShardingSphere-Proxy 容器
docker run -d \
    -v /home/slienceme/docker/shardingsphere/conf:/opt/shardingsphere-proxy/conf \
    -v /home/slienceme/docker/shardingsphere/ext-lib:/opt/shardingsphere-proxy/ext-lib \
    -e PORT=3308 -p13308:3308 apache/shardingsphere-proxy:latest
```

### 5.8 Jenkins

> `8080`: Web界面
>
> `50000`: 代理
>
> 官网: https://www.jenkins.io/zh/
>
> Docker: https://hub.docker.com/r/jenkins/jenkins
>
> 官方j教程: https://www.jenkins.io/zh/doc/book/installing/#docker

```bash
# 1. 拉取镜像
docker pull jenkins/jenkins:2.504.2-lts

# 2. 创建映射目录
mkdir -p /home/slienceme/docker/jenkins

# 3. 启动容器
docker run --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v /home/slienceme/docker/jenkins:/var/jenkins_home \
  -u root \
  -d jenkins/jenkins:2.504.2-lts
```

### 5.9 Tomcat

官网: https://tomcat.apache.org/

Docker: https://hub.docker.com/_/tomcat

```bash
# 1. 拉取镜像 根据需要选择版本 这里是 bitnami/tomcat:10.1.41
docker pull tomcat

# 2. 创建映射目录(选择)
mkdir -p /docker/tomcat/

# webapps 目录将映射为 tomcat 容器配置的应用程序目录。
# logs 目录将映射为 tomcat 容器的日志目录。
# conf 目录里的配置文件将映射为 tomcat 容器的配置文件。

# 3. 启动容器
# 临时容器
docker run --name temp -d tomcat:10.1.41
docker cp temp:/usr/local/tomcat/conf /docker/tomcat/
docker rm -f temp
# 正式容器
docker run --name tomcat \
  -p 18080:8080 \
  -v /docker/tomcat/conf:/usr/local/tomcat/conf \
  -v /docker/tomcat/webapps:/usr/local/tomcat/webapps \
  -d tomcat:10.1.41
 
# 部署war包  只需要把demo.war包复制到/docker/tomcat/webapps下,他会自动解压缩
# 访问即可：http://IP:端口/demo/
```

### 5.10 Qdrant

> 向量数据库

```bash
# 1. 拉取镜像 根据需要选择版本 这里是 qdrant/qdrant:1.14.0
docker pull qdrant

# 2. 创建映射目录(选择)
mkdir -p /docker/qdrant/storage

# 3. 启动容器
# 正式容器
docker run --name qdrant \
  -p 6333:6333 \
  -v /docker/qdrant/storage:/qdrant/storage \
  -d qdrant/qdrant

# -d：后台运行
# --name：容器名称
# -p 6333:6333：将容器的 API 端口映射到主机
# -v：数据持久化，把容器中的数据挂载到本地目录（如 ./qdrant_storage）
```

## 6. Dockerfile

> [官方教程](https://docs.docker.com/reference/dockerfile/#from)
>
> 除了可以将镜像推送到[dockerhub](https://hub.docker.com/)
> ，还可以使用[阿里云容器镜像服务](https://cr.console.aliyun.com/cn-beijing/instances)

```bash
# 变量定义和使用
VAR_NAME="value"
echo $VAR_NAME  # 输出变量的值

# 常量定义
readonly CONSTANT_NAME="constant_value"

# 条件语句
if [ $VAR -eq 10 ]; then
    echo "VAR is 10"
elif [ $VAR -eq 20 ]; then
    echo "VAR is 20"
else
    echo "VAR is neither 10 nor 20"
fi

# 循环
for i in {1..5}; do
    echo "Iteration $i"
done

count=1
while [ $count -le 5 ]; do
    echo "Count is $count"
    ((count++))
done

count=1
until [ $count -gt 5 ]; do
    echo "Count is $count"
    ((count++))
done

# 函数
function my_function() {
    echo "This is my function"
}

my_function  # 调用函数

function greet() {
    echo "Hello, $1!"  # 带参数的函数
}

greet "Alice"

# 数组
my_array=("apple" "banana" "cherry")
echo ${my_array[0]}  # 输出 apple
echo ${#my_array[@]}  # 输出数组元素的数量

# 文件操作
touch filename.txt  # 创建文件

if [ -f "filename.txt" ]; then
    echo "File exists"
else
    echo "File does not exist"
fi

while read line; do
    echo $line
done < filename.txt  # 读取文件内容

echo "Hello, world!" > output.txt  # 覆盖文件内容
echo "Appended text" >> output.txt  # 追加到文件末尾

# 获取用户输入
read -p "Enter your name: " name
echo "Hello, $name!"

# 管道和重定向
ls | grep "file"  # 使用管道

echo "This is a test" > output.txt  # 标准输出重定向
ls non_existent_file 2> error.txt  # 错误输出重定向
ls non_existent_file &> output_and_error.txt  # 输出和错误都重定向到文件

# 字符串操作
string="Hello, World!"
echo ${#string}  # 字符串长度：13
substring=${string:0:5}  # 字符串切割：Hello
echo $substring

new_string=${string/World/Bash}  # 替换字符串中的内容
echo $new_string  # 输出 Hello, Bash!

# 错误处理
if [ $? -eq 0 ]; then
    echo "Last command succeeded"
else
    echo "Last command failed"
fi

# 错误退出
set -e  # 如果脚本中有任何命令失败，则停止执行

# 脚本调试
# bash -x script.sh  # 以调试模式运行脚本，显示每个命令及其执行结果
```

以下是一个 **Java 项目的 Dockerfile 示例**，假设你的 Java 项目使用 Maven 进行构建。

假设项目结构：

```
my-java-project/
│
├── src/               # Java 源代码
├── pom.xml            # Maven 配置文件
├── target/            # 构建输出文件夹
└── Dockerfile         # Docker 配置文件
```

示例 `Dockerfile`：

```dockerfile
# 1. 使用官方 Maven 镜像作为构建环境
FROM maven:3.8.4-jdk-11 AS build

# 2. 设置工作目录
WORKDIR /app

# 3. 将项目的 pom.xml 复制到工作目录
COPY pom.xml .

# 4. 下载依赖（避免频繁下载，利用缓存）
RUN mvn dependency:go-offline

# 5. 复制整个源码到容器中
COPY src ./src

# 6. 使用 Maven 构建项目并打包
RUN mvn clean package -DskipTests

# 7. 使用官方 OpenJDK 作为运行时环境
FROM openjdk:11-jre-slim

# 8. 设置工作目录
WORKDIR /app

# 9. 将构建好的 jar 文件复制到新的镜像中
COPY --from=build /app/target/my-java-project-1.0-SNAPSHOT.jar ./my-java-project.jar

# 10. 设置容器启动时的命令
CMD ["java", "-jar", "my-java-project.jar"]
```

各个指令解释：

- `FROM maven:3.8.4-jdk-11 AS build`： 使用 Maven 和 JDK 11 镜像作为构建阶段的基础镜像。`AS build` 是为了给该阶段起个名字，后续可以通过
  `COPY --from=build` 引用它。
- `WORKDIR /app`： 设置容器中的工作目录为 `/app`，所有后续的操作都会在该目录下进行。
- `COPY pom.xml .`： 将项目的 `pom.xml` 文件复制到 Docker 镜像中的工作目录中。
- `RUN mvn dependency:go-offline`： 通过 Maven 下载项目的依赖，利用 Docker 的缓存机制，避免每次构建都重新下载依赖。
- `COPY src ./src`： 将项目的源代码复制到容器的 `/app/src` 目录下。
- `RUN mvn clean package -DskipTests`： 执行 Maven 构建命令并打包项目，`-DskipTests` 是跳过测试阶段（如果你不想跳过测试，可以移除此参数）。
- `FROM openjdk:11-jre-slim`： 使用轻量级的 JRE 镜像作为运行时环境，保证只包含运行 Java 应用所需的环境。
- `COPY --from=build /app/target/my-java-project-1.0-SNAPSHOT.jar ./my-java-project.jar`： 将第一阶段构建出来的 JAR 文件从
  `build` 阶段复制到新的镜像中。
- `CMD ["java", "-jar", "my-java-project.jar"]`： 指定容器启动时运行的命令，这里是运行打包好的 Java JAR 文件。

构建镜像和运行容器

构建 Docker 镜像：

```bash
docker build -t my-java-app .
```

运行容器：

```bash
docker run -d -p 8080:8080 my-java-app
```

## 7. docker-compose

可以使用 `docker-compose` 命令来**统一管理多个容器**

```bash
# 指定 Compose 文件版本
version: '3.8'

# 定义服务
services:
  # Web 服务示例
  web:
    image: nginx:latest                     # 使用已有镜像
    # build: ./web                          # 或使用 Dockerfile 构建
    ports:
      - "8080:80"                           # 端口映射：主机端口:容器端口
    volumes:
      - ./html:/usr/share/nginx/html       # 目录挂载：主机路径:容器路径
    environment:
      - NODE_ENV=production                 # 设置环境变量
      - TZ=Asia/Shanghai
    depends_on:
      - redis                               # 设置依赖服务，启动顺序
      - db
    container_name: my_web                  # 自定义容器名
    restart: unless-stopped                 # 重启策略：no/always/unless-stopped/on-failure
    working_dir: /app                       # 工作目录
    command: ["nginx", "-g", "daemon off;"] # 启动命令（覆盖 CMD）
    network_mode: bridge                    # 网络模式（默认 bridge）

  # Redis 服务
  redis:
    image: redis:6.2
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # MySQL 数据库服务
  db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456         # 设置 root 密码
      - TZ=Asia/Shanghai
    volumes:
      - db_data:/var/lib/mysql

# 定义卷（用于数据持久化）
volumes:
  redis_data:
  db_data:

# 可选：自定义网络
networks:
  default:
    driver: bridge
```

常用指令：

```bash
docker-compose up -d                            # 启动所有服务（后台模式）
docker-compose -p <指定服务名称> up -d            # 启动所有服务（指定项目名，后台模式）
docker-compose up -d --build                    # 构建镜像后启动（适用于代码变更）
docker-compose up                               # 前台启动（调试时用，可看到日志）
docker-compose up -d 服务名                      # 启动指定服务
docker-compose up -d web                        # 示例：启动名为 web 的服务

docker-compose ps                               # 查看当前所有服务状态
docker-compose logs -f                          # 查看所有服务的日志（实时输出）
docker-compose logs -f 服务名                    # 查看指定服务的日志
docker-compose logs -f redis                    # 示例：查看 redis 的日志

docker-compose down                             # 停止并删除所有服务容器（不影响卷和镜像）
docker-compose down -v                          # 停止并删除所有容器 + 卷（完全清理）
docker-compose stop                             # 停止所有服务（容器未被删除）
docker-compose start                            # 启动已停止的服务
docker-compose restart                          # 重启所有服务

docker-compose build                            # 只构建镜像，不启动
docker-compose pull                             # 拉取镜像（适用于远程镜像服务）

docker-compose exec 服务名 bash                 # 进入某个容器内部执行命令
docker-compose exec web bash                    # 示例：进入 web 容器

docker-compose -f docker-compose.prod.yml up -d                     # 使用指定 Compose 文件启动
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d   # 使用多个 Compose 文件合并启动（覆盖策略）
docker-compose --env-file .env up -d                                # 使用 .env 文件中的环境变量
```

::: tip 发布时间:
2025-02-22
:::

