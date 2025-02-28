# Docker

[docker镜像地址](https://hub.docker.com/)

[docker官网](https://docs.docker.com/desktop/setup/install/)

使用阿里云进行镜像加速

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

```bash
#----------------------------------------------------------------
# 【ubuntu】
# 卸载旧版本 Docker
sudo apt remove docker \
                    docker-engine \
                    docker.io \
                    containerd \
                    runc
                    
# 安装依赖，安装必要的软件包，以允许apt通过HTTPS使用仓库：
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# 添加Docker的官方GPG密钥  添加Docker的稳定仓库
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 使用以下命令设置存储库
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 如果想要指定版本
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

##  2. docker常用指令
```bash
docker version 						# 查看docker版本
docker -v
sudo docker info 					#  查看docker信息
sudo docker ps -a 					# 查看docker容器
sudo docker images 					# 查看docker镜像
sudo docker logs container_id 		# 查看docker容器日志
sudo docker logs tail 100 container_id
sudo docker logs -fnt container_id
sudo docker port container_id 		# 查看docker容器端口映射
sudo docker top container_id 		# 查看docker容器进程
sudo docker inspect container_id 	# 查看docker容器详细信息
sudo docker start container_id 		# 启动docker容器
sudo docker stop container_id 		# 停止docker容器
sudo docker restart container_id 	# 重启docker容器
sudo docker rm container_id 		# 删除docker容器
sudo docker rmi image_id 			# 删除docker镜像
docker exec -it your_container_name /bin/bash # 进入容器
```

## 3. 镜像加速

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://do.nark.eu.org",
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn",
        "https://mirrors.tuna.tsinghua.edu.cn",
        "https://ustc-edu-cn.mirror.aliyuncs.com",
        "https://ccr.ccs.tencentyun.com",
        "https://docker.m.daocloud.io",
        "https://docker.awsl9527.cn"
    ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 4. docker ufw端口管控

> 最近，我发现使用docker运行的容器，进行端口映射后，可以正常访问，但是ufw防火墙并没有开放端口；这样岂不是防火墙失效了，这哪里行！
>
> 具体描述: Docker 默认使用自己的网络管理方式，导致 Docker 容器的端口不会直接与 UFW 配合，造成 Docker 容器端口不可访问或者 UFW 防火墙规则对容器端口不起作用。因此，UFW 并不会自动管理 Docker 容器的网络流量。
>
> 通过调整 Docker 和 UFW 的配置，确保容器的端口能够正确地通过 UFW 的规则进行访问。
>
> 现在仍然没有更好的方案，我选择停用ufw，改为firewalld

## 5. docker安装mysql

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

## 6. docker安装redis

```bash
# 1. 拉取镜像
docker pull redis
mkdir -p /home/slienceme/docker/redis/conf
touch /home/slienceme/docker/redis/conf/redis.conf

# 2. 创建容器
docker run -p 6379:6379 --name redis -v /home/slienceme/docker/redis/data:/data \
    -v /home/slienceme/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
    -d redis redis-server /etc/redis/redis.conf
    
# 3. 进入容器
docker exec -it redis redis-cli

# 设置自动启动
docker update redis --restart=always

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

## 7. docker安装ElasticSearch&kibana

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

docker run -p 5601:5601 --name kibana 
	-e ELASTICSEARCH_HOSTS=http://容器内部IP:9200 \
	-d kibana:7.4.2

# 3. 设置开机启动
docker update kibana --restart=always

# 4. 测试
# 访问Kibana： http://虚拟机IP:5601/app/kibana

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```

## 8. docker安装nginx

这种运行会出现问题, 因为需要先把配置文件复制出来才能正常run，所以直接按照第二种方案操作

> [Nginx in docker - [emerg\] 1#1: open() “/etc/nginx/nginx.conf” failed (2: No such file or directory)](https://forums.docker.com/t/nginx-in-docker-emerg-1-1-open-etc-nginx-nginx-conf-failed-2-no-such-file-or-directory/103325)

```bash
# 1. 拉取镜像
docker pull nginx:1.10

# 2. 创建容器
mkdir -p /home/slienceme/docker/nginx/html  # 创建多级文件夹
mkdir -p /home/slienceme/docker/nginx/logs
mkdir -p /home/slienceme/docker/nginx/conf

docker run -p 80:80 --name nginx \
 -v /home/slienceme/docker/nginx/html:/usr/share/nginx/html \
 -v /home/slienceme/docker/nginx/logs:/var/log/nginx \
 -v /home/slienceme/docker/nginx/conf:/etc/nginx \
 -d nginx:1.10

docker run --name my-custom-nginx-container \
	-v /host/path/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx

# 3. 设置开机启动
docker update nginx --restart=always

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
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

# 非root用户, 需要将用户添加到docker组
sudo usermod -aG docker slienceme
```



::: tip 发布时间:
2025-02-22
:::

