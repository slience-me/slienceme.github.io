# 麒麟服务器V10安装nginx

> 系统：Kylin Linux Advanced Server V10
>  默认用户：root（无 sudo）

## 一、下载Nginx

前往官网下载稳定版本：
 👉 https://nginx.org/en/download.html

建议使用 **Stable version（稳定版）**

```bash
# 示例版本
nginx-1.26.3.tar.gz
```

将安装包上传到服务器，例如：

```bash
/mnt/data/nginx-1.26.3.tar.gz
```

## 二、源码安装Nginx

```bash
# 1. 安装依赖
yum install -y gcc gcc-c++ make zlib zlib-devel pcre pcre-devel openssl openssl-devel wget lsof

# 2. 解压源码包配置编译参数Nginx
# 启动文件：/usr/local/nginx/sbin/nginx
# 配置文件：/usr/local/nginx/conf/nginx.conf
# 日志文件：/usr/local/nginx/logs/

cd ~
tar -zxvf /mnt/data/nginx-1.26.3.tar.gz
cd nginx-1.26.3

# ./configure 
# --prefix=/usr/local/nginx  #指定安装路径
# --with-http_ssl_module     #启用 HTTPS（SSL/TLS）支持
# --with-http_v2_module      #启用 HTTP/2 协议支持
# --with-http_gzip_static_module  #支持读取并直接发送 .gz 的静态压缩文件

./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module

# 3. 编译安装

make -j$(nproc)   # $(nproc)指定使用处理器个数
make install

# 4. 启动 nginx 测试
/usr/local/nginx/sbin/nginx

# 验证是否成功
curl http://localhost
```

## 三、**systemd 启动服务文件**

创建 systemd 服务文件

```bash
# 1. 创建服务文件
vim /etc/systemd/system/nginx.service

# 2. 写入
# ------------------- begin ---------------------
[Unit]
Description=NGINX HTTP Server
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

# 推荐增强项
Restart=always
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target

# ------------------- end ---------------------

# 3. 重新加载sytemd配置 
systemctl daemon-reexec
systemctl daemon-reload

# 4. 启动并设置开机自启
systemctl start nginx
systemctl enable nginx
systemctl status nginx
```

3.2 重新加载sytemd配置

```bash
systemctl daemon-reexec
systemctl daemon-reload
```

3.3 启动nginx

```bash
systemctl start nginx
systemctl enable nginx
```

## 四、常见问题

### 1. 端口被占用

错误：

```bash
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
```

排查：

```bash
lsof -i:80

ss -lntp | grep 80
```

### 2. 已手动启动过 nginx

原因：

你之前执行过：

```bash
/usr/local/nginx/sbin/nginx
```

导致已有进程占用端口

解决：

```bash
pkill nginx

# 或更安全方式
/usr/local/nginx/sbin/nginx -s quit
```

### 3. systemd 启动失败（隐蔽坑）

建议先测试配置：

```bash
/usr/local/nginx/sbin/nginx -t
```

### 4. 防火墙未放行

```bash
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload
```

### 5. PATH 未配置（优化体验）

```bash
ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx

# 之后可直接
nginx -v
```

## 五、目录说明

| 类型     | 路径                               |
| -------- | ---------------------------------- |
| 安装目录 | `/usr/local/nginx`                 |
| 启动文件 | `/usr/local/nginx/sbin/nginx`      |
| 配置文件 | `/usr/local/nginx/conf/nginx.conf` |
| 日志目录 | `/usr/local/nginx/logs/`           |

## 六、Nginx 性能优化配置

> 以下是**生产环境常见优化配置（推荐直接用）**

```bash
vim /usr/local/nginx/conf/nginx.conf
```

### 6.1 全局优化（核心性能）

```bash
user  root;
worker_processes auto;   # 自动根据CPU核数

error_log  logs/error.log warn;
pid        logs/nginx.pid;

events {
    worker_connections  65535;   # 单进程最大连接数
    use epoll;                   # Linux高性能模型
    multi_accept on;             # 尽可能多接收请求
}
```

>  理论最大连接数：
>
> `worker_processes * worker_connections`

### 6.2 HTTP优化（高并发）

```bash
http {
    include       mime.types;
    default_type  application/octet-stream;

    # 文件传输优化
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;

    # 长连接
    keepalive_timeout 65;
    keepalive_requests 1000;

    # 请求缓冲
    client_header_buffer_size 4k;
    large_client_header_buffers 4 16k;
    client_max_body_size 50m;

    # 超时控制
    client_body_timeout 12;
    client_header_timeout 12;
    send_timeout 10;

    # 打开文件缓存
    open_file_cache max=100000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
```

### 6.3 Gzip 压缩优化

```bash
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_vary on;
```

> 作用：
>
> - 减少带宽
> - 提高加载速度

### 6.4 日志优化（减少IO）

```bash
    access_log logs/access.log main buffer=32k flush=5s;
```

> 或极致性能：

```bash
    access_log off;
```

### 6.5 连接限制（防攻击）

```bash
    limit_conn_zone $binary_remote_addr zone=addr:10m;
    limit_conn addr 100;
```

### 6.6 请求限速（防刷）

```bash
    limit_req_zone $binary_remote_addr zone=req:10m rate=10r/s;
```

### 6.7 Upstream 负载均衡

```bash
    upstream backend {
        server 127.0.0.1:8080 weight=1;
        server 127.0.0.1:8081 weight=1;

        keepalive 32;
    }
```

### 6.8 Server 示例（完整）

```bash
    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://backend;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;

            proxy_connect_timeout 5s;
            proxy_read_timeout 60s;

            proxy_buffering on;
            proxy_buffers 16 16k;
            proxy_buffer_size 16k;
        }

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
            expires 30d;
            access_log off;
        }
    }
}
```

## 七、系统级优化

### 7.1 文件句柄限制

```bash
vim /etc/security/limits.conf
```

```bash
* soft nofile 65535
* hard nofile 65535
```

### 7.2 内核参数优化

```bash
vim /etc/sysctl.conf
```

```bash
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
```

> 应用：

```bash
sysctl -p
```

## 八、常见业务配置

### 8.1 最基础反向代理

>  把请求转发到后端服务（最常见）

```bash
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://127.0.0.1:8080;

        # 必备请求头（非常重要）
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
    }
}
```

### 8.2 路径转发（URI 重写）

> 常用于接口网关

```bash
location /api/ {
    proxy_pass http://127.0.0.1:8080/;
}
```

> 注意区别：

```bash
# 写法1（推荐）
location /api/ {
    proxy_pass http://backend/;
}
# /api/user → /user

# 写法2（坑点）
location /api/ {
    proxy_pass http://backend;
}
# /api/user → /api/user
```

### 8.3 多服务路由

```bash
server {
    listen 80;

    location /user/ {
        proxy_pass http://127.0.0.1:8081/;
    }

    location /order/ {
        proxy_pass http://127.0.0.1:8082/;
    }

    location /pay/ {
        proxy_pass http://127.0.0.1:8083/;
    }
}
```

### 8.4 负载均衡（Upstream）

```bash
upstream backend {
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    server 192.168.1.12:8080;
}
```

```bash
location / {
    proxy_pass http://backend;
}
```

常见策略：

```bash
# 1. 轮询（默认）
# 不写就是

# 2. 权重
server 192.168.1.10:8080 weight=3;

# 3. 最少连接
least_conn;

# 4. IP 粘性（会话保持）
ip_hash;
```

### 8.5 WebSocket 支持

```bash
location /ws/ {
    proxy_pass http://127.0.0.1:8080;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### 8.6 HTTPS 反向代理

```bash
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     cert.pem;
    ssl_certificate_key cert.key;

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
```

### 8.7 HTTP → HTTPS 跳转

```bash
server {
    listen 80;
    server_name example.com;

    return 301 https://$host$request_uri;
}
```

### 8.8 静态资源 + 动态分离

```bash
server {
    listen 80;

    # 静态资源
    location /static/ {
        root /data/www;
        expires 30d;
    }

    # 动态请求
    location / {
        proxy_pass http://backend;
    }
}
```

### 8.9 跨域配置（CORS）

```bash
location / {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
    add_header Access-Control-Allow-Headers *;

    if ($request_method = OPTIONS) {
        return 204;
    }

    proxy_pass http://backend;
}
```

### 8.10 防盗链（图片/资源）

```bash
location ~* \.(jpg|png|gif)$ {
    valid_referers none blocked *.yourdomain.com;

    if ($invalid_referer) {
        return 403;
    }
}
```

### 8.11 限流（防刷接口）

```bash
limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;

location /api/ {
    limit_req zone=api burst=10 nodelay;
    proxy_pass http://backend;
}
```

### 8.12 IP 黑白名单

```bash
location /admin/ {
    allow 192.168.1.0/24;
    deny all;
}
```

### 8.13 请求缓存（提升性能）

```bash
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

location / {
    proxy_cache my_cache;
    proxy_cache_valid 200 10m;

    proxy_pass http://backend;
}
```

### 8.14 健康检查

```bash
upstream backend {
    server 127.0.0.1:8080 max_fails=3 fail_timeout=10s;
}
```

## 九、前端 Vue 项目部署

### 9.1 Vue 单页应用（SPA）

:::danger

 重点：必须配置 history fallback（否则刷新 404） 

:::

```bash
upstream backend {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name localhost;

    root /data/www/vue-app;
    index index.html;

    # 前端 SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass http://backend/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        access_log off;
    }

    # gzip
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

