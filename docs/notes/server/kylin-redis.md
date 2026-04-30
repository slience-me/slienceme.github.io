# 麒麟服务器V10安装Redis

> 系统：Kylin Linux Advanced Server V10 <br>
> 默认用户：root（无 sudo）<br>
> 安装方式：yum + 源码编译（推荐生产）

## 一、使用 yum 安装

👉 适合测试环境 / 快速部署

```bash
# 更新缓存
yum makecache

# 安装 Redis
yum install -y redis
```

启动：

```bash
systemctl start redis
systemctl enable redis
systemctl status redis
```

验证：

```bash
redis-cli ping
```

返回：

```bash
PONG
```

## 二、源码编译安装

👉 优点：

* 可控版本
* 可开启优化参数
* 更稳定

### 2.1 下载

前往官网下载：

👉 [https://redis.io/download/](https://redis.io/download/)

```bash
# 示例版本
redis-7.2.5.tar.gz
```

上传到服务器：

```bash
/mnt/data/redis-7.2.5.tar.gz
```

### 2.2 安装

```bash
# 1. 安装依赖
yum install -y gcc gcc-c++ make tcl

# 2. 编译安装
cd ~
tar -zxvf /mnt/data/redis-7.2.5.tar.gz
cd redis-7.2.5

# 编译
make -j$(nproc)
# 测试（可选）
make test
# 安装 默认安装到：/usr/local/bin
make install

# 3. 创建目录结构
mkdir -p /usr/local/redis/{conf,data,logs}

# 配置文件 见下面
cp redis.conf /usr/local/redis/conf/
vim /usr/local/redis/conf/redis.conf

# ============================== 配置文件内容 begin ==============================
# 后台运行
daemonize yes

# 绑定地址（生产建议内网IP）
bind 0.0.0.0

# 端口
port 6379

# 密码（必须设置）
requirepass yourpassword

# 数据目录
dir /usr/local/redis/data

# 日志文件
logfile "/usr/local/redis/logs/redis.log"

# 持久化（RDB）
save 900 1
save 300 10
save 60 10000

# AOF（建议开启）
appendonly yes
appendfilename "appendonly.aof"

# 内存淘汰策略
maxmemory-policy allkeys-lru

# 最大内存（按实际情况）
# maxmemory 2gb

# ============================== 配置文件内容 end ==============================

# 4. 启动 Redis
redis-server /usr/local/redis/conf/redis.conf
# 验证
redis-cli -a yourpassword ping
```


## 三、systemd 服务配置

```bash
vim /etc/systemd/system/redis.service
```

```ini
[Unit]
Description=Redis
After=network.target

[Service]
ExecStart=/usr/local/bin/redis-server /usr/local/redis/conf/redis.conf
ExecStop=/usr/local/bin/redis-cli -a yourpassword shutdown
Restart=always

# 优化
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl start redis
systemctl enable redis
```


## 五、防火墙配置

```bash
firewall-cmd --add-port=6379/tcp --permanent
firewall-cmd --reload
```


## 六、常见问题


### 6.1 端口无法访问

```bash
ss -lntp | grep 6379
```


### 6.2 无法远程连接

```conf
bind 0.0.0.0
protected-mode no
```


### 6.3 内存不足

```bash
free -h
```

```bash
# 建议设置
maxmemory
```


### 6.4 启动失败

```bash
# 查看报错
redis-server /usr/local/redis/conf/redis.conf
```


## 七、系统优化


### 7.1 内核参数

```bash
vim /etc/sysctl.conf
```

```conf
vm.overcommit_memory = 1
net.core.somaxconn = 1024
```

```bash
# 生效
sysctl -p
```


### 7.2 关闭透明大页（必须）

```bash
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```

```bash
# 👉 永久生效：
vim /etc/rc.local
```

```bash
# 加入
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```


## 八、目录说明

| 类型   | 路径                       |
| ---- | ------------------------ |
| 程序路径 | `/usr/local/bin/redis-*` |
| 配置文件 | `/usr/local/redis/conf/` |
| 数据目录 | `/usr/local/redis/data/` |
| 日志目录 | `/usr/local/redis/logs/` |
