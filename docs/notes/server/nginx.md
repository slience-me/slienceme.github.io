# 【指令集】Nginx

## 1. 目录结构

Nginx 的基础目录结构通常包括以下几个主要目录：

Nginx的目录结构大致如下（以Linux系统为例）：

```
/etc/nginx/                 # Nginx的配置文件目录
├── nginx.conf              # 主配置文件
├── conf.d/                 # 包含额外配置文件的目录
│   └── default.conf        # 默认虚拟主机配置文件
├── sites-available/        # 存放可用站点的配置文件（某些系统上可能没有此目录）
├── sites-enabled/          # 启用的站点配置文件（某些系统上可能没有此目录）
├── mime.types              # MIME类型配置文件
├── fastcgi_params          # FastCGI参数配置
├── uwsgi_params            # uWSGI参数配置
└── scgi_params             # SCGI参数配置

/usr/local/nginx/           # Nginx的默认安装目录
├── sbin/                   # 可执行文件目录（包含nginx二进制文件）
│   └── nginx               # Nginx主程序
├── html/                   # 默认的网页根目录
│   └── index.html          # 默认的欢迎页面
├── logs/                   # 日志目录
│   ├── access.log          # 访问日志
│   └── error.log           # 错误日志
└── conf/                   # 配置文件目录（有时可以与/etc/nginx合并）
```

### 主要目录和文件：

- `/etc/nginx/nginx.conf`：主配置文件，控制Nginx的全局设置。
- `/etc/nginx/conf.d/`：通常存放额外的虚拟主机配置文件，可以分配单独的文件来管理不同站点的配置。
- `/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/`：用于存储和启用站点的配置文件，常见于Ubuntu/Debian系统。`sites-available`存放所有配置文件，而`sites-enabled`存放实际启用的配置链接。
- `/usr/local/nginx/html/`：默认的网页文件目录，可以存放网站的静态文件，如HTML、CSS和JavaScript等。
- `/usr/local/nginx/logs/`：存放Nginx的日志文件，通常包括访问日志和错误日志。

你可以根据自己的实际需求定制这些目录和配置文件。

## 2. 系统级安装

### 【Ubuntu】

#### 1）更新索引

```bash
sudo apt update
```

#### 2）安装 Nginx

```bash
sudo apt install nginx
```

安装完成后，Nginx 会自动启动。如果没有启动，可以手动启动它：

```bash
sudo systemctl start nginx
```

检查 Nginx 的状态：

```bash
sudo systemctl status nginx
```

#### 3）查找 Nginx 配置文件

Nginx 配置文件通常位于以下几个位置：

- 主配置文件：`/etc/nginx/nginx.conf`
- 默认虚拟主机配置：`/etc/nginx/sites-available/default`
- 虚拟主机配置目录：`/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/`
- 日志文件：
  - 访问日志：`/var/log/nginx/access.log`
  - 错误日志：`/var/log/nginx/error.log`

查看主配置文件：

```bash
sudo nano /etc/nginx/nginx.conf
```

查看虚拟主机配置：

```bash
sudo nano /etc/nginx/sites-available/default
```

如果你有多个网站需要配置，可以创建新的配置文件，并通过符号链接激活它：

```bash
sudo ln -s /etc/nginx/sites-available/your-site.conf /etc/nginx/sites-enabled/
```

#### 4）测试配置文件的语法

每次修改配置文件后，先检查 Nginx 配置文件的语法是否正确：

```bash
sudo nginx -t
```

如果没有错误，输出应该是：

```bash
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

#### 5）重新加载 Nginx 配置

在确认配置文件没有语法错误后，重新加载 Nginx，使配置生效：

```bash
sudo systemctl reload nginx
```

#### 6）常见配置修改

- 设置服务器根目录：

```bash
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

- 修改监听端口：

```bash
server {
    listen 8080;
    server_name example.com;
    root /var/www/html;
}
```

- 配置反向代理：

```bash
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 7）设置防火墙

**允许 HTTP 和 HTTPS 流量**

如果你正在使用 `ufw` 防火墙，确保允许 HTTP 和 HTTPS 流量：

```bash
sudo ufw allow 'Nginx Full'
```

#### 8）运行检查 

**Nginx 是否正常运行**

通过浏览器访问服务器的 IP 地址或域名，应该能看到 Nginx 默认的欢迎页面：

```bash
http://your_server_ip
```

如果看到页面，说明 Nginx 正常运行。

#### 9）常用指令

```bash
# 配置nginx操作 【ubuntu】
service nginx start    # 启动nginx服务
service nginx status   # 查看nginx状态
service nginx restart  # 重启服务
nginx -t               # 检查语法
nginx -s reload        # 重新加载nginx配置
nginx -s stop          # 停止nginx服务
```

#### 10）卸载

```bash
sudo apt remove nginx
sudo apt-get remove --purge nginx
sudo apt autoremove  # 清理不再需要的依赖包
sudo rm -rf /etc/nginx
sudo rm -rf /var/log/nginx
sudo rm -rf /var/www/html
nginx -v # 检查是否卸载成功
```

## 3. 个性化操作

### 3.1 自定义站点路径

要自定义不同站点的配置文件路径，并将其放在用户目录或根目录下（例如 `/mysite/`），而不是直接操作 `/etc/nginx/` 或 `/usr/local/nginx/`，你可以通过以下步骤来实现：

#### 1）修改 Nginx 配置文件

你需要调整 Nginx 主配置文件 `nginx.conf` 来指定新的配置文件路径。具体来说，在 `http` 块中使用 `include` 指令来加载你的自定义路径下的配置文件。

假设你希望将站点配置文件存放在 `/mysite/nginx-sites/`，那么在 `nginx.conf` 中添加如下内容：

```nginx
http {
    ...
    include /mysite/nginx-sites/*.conf;
    ...
}
```

这会告诉 Nginx 在启动时加载 `/mysite/nginx-sites/` 目录下所有 `.conf` 后缀的配置文件。

#### 2）创建并管理自定义站点配置

在 `/mysite/nginx-sites/` 目录下创建每个站点的配置文件。例如：

```
/mysite/nginx-sites/
├── site1.conf
├── site2.conf
└── site3.conf
```

每个 `.conf` 文件中可以包含你要为特定站点设置的 Nginx 配置，比如 `server` 块和其他必要的指令。

例如，`site1.conf` 可能是这样的：

```nginx
server {
    listen 80;
    server_name www.site1.com;
    root /mysite/www/site1;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

#### 3）设置权限（可选）

确保 `/mysite/nginx-sites/` 目录及其中的配置文件有适当的权限，以确保 Nginx 进程能够读取它们。例如：

```bash
sudo chown -R nginx:nginx /mysite/nginx-sites/
sudo chmod -R 755 /mysite/nginx-sites/
```

#### 4）配置文件组织（可选）

你可以进一步组织你的配置文件，如使用 `sites-available` 和 `sites-enabled` 目录结构：

```
/mysite/nginx-sites/
├── sites-available/
│   ├── site1.conf
│   └── site2.conf
└── sites-enabled/
    ├── site1.conf -> ../sites-available/site1.conf
    └── site2.conf -> ../sites-available/site2.conf
    
ln -s /mysite/nginx-sites/sites-available/site1.conf /mysite/nginx-sites/sites-enabled/
```

然后在 `nginx.conf` 中改为加载 `sites-enabled` 目录中的配置：

```nginx
http {
    ...
    include /mysite/nginx-sites/sites-enabled/*.conf;
    ...
}
```

这种方式与传统的 `/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/` 方法类似。

#### 5）重启 Nginx 使配置生效

完成修改后，记得重新加载或重启 Nginx：

```bash
sudo nginx -t       # 检查配置是否有误
sudo systemctl reload nginx   # 重新加载配置
```

## 4. 用户级安装

如果你没有系统级安装 Nginx 的权限，但仍然希望在用户目录中运行自定义的 Nginx 实例，你可以通过以下步骤来实现：

### 4.1 在用户目录安装 Nginx

首先，你可以在用户目录下手动下载并编译 Nginx，确保你有权限在自己的用户目录中进行安装和配置。

**步骤：**

1. **下载 Nginx 源代码**：

   ```bash
   wget http://nginx.org/download/nginx-1.24.0.tar.gz
   tar -zxvf nginx-1.24.0.tar.gz
   cd nginx-1.24.0
   ```

2. **编译并安装到用户目录**： 你可以指定安装路径为你的用户目录（例如 `~/nginx`）：

   ```bash
   ./configure --prefix=$HOME/nginx
   make
   make install
   ```

3. **安装完成后**，你将在 `~/nginx/` 目录下找到所有相关的文件和目录。此时，你可以直接在 `~/nginx/` 下运行 Nginx，而无需系统级的权限。

### 4.2 配置 Nginx 使用自定义的站点路径

假设你已经在 `~/nginx` 目录下安装了 Nginx，现在你可以按照自定义路径来配置你的站点。

**修改 Nginx 配置文件：**

Nginx 的配置文件通常位于 `~/nginx/conf/nginx.conf`。你可以打开这个文件，并根据你的需求进行修改：

1. **修改站点配置路径**：例如，将站点配置文件放在 `~/mysite/nginx-sites/` 目录下，并在 `nginx.conf` 中使用 `include` 指令来加载它们：

   ```nginx
   http {
       ...
       include ~/mysite/nginx-sites/*.conf;
       ...
   }
   ```

2. **配置站点文件**：在 `~/mysite/nginx-sites/` 目录下创建站点配置文件。例如，`site1.conf`：

   ```nginx
   server {
       listen 80;
       server_name www.site1.com;
       root ~/mysite/www/site1;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

3. **确保站点根目录存在并配置好**，比如 `~/mysite/www/site1` 目录。

### 4.3 启动 Nginx

由于你没有系统级的权限，使用自定义安装的 Nginx 来启动和管理 Nginx 服务：

1. **启动 Nginx**：

   ```bash
   ~/nginx/sbin/nginx
   ```

2. **检查 Nginx 状态**： 你可以使用 `ps` 或 `top` 来确认 Nginx 是否正在运行：

   ```bash
   ps aux | grep nginx
   ```

3. **停止 Nginx**： 如果需要停止 Nginx，可以使用以下命令：

   ```bash
   ~/nginx/sbin/nginx -s stop
   ```

4. **重新加载配置**： 如果修改了配置文件，需要重新加载 Nginx：

   ```bash
   ~/nginx/sbin/nginx -s reload
   ```

### 4.4 权限设置

由于你没有系统级权限，确保所有相关目录（如 `~/nginx`, `~/mysite` 等）的权限正确，并且你有访问和写入的权限。



## 5. 部署 Vue 项目

### 【Ubuntu】

将 Vue 项目部署到 Nginx 时，通常需要将其构建为静态文件，并配置 Nginx 提供这些文件。以下是部署步骤：

#### 1）配置 Nginx

假设 Vue 项目的构建文件位于 `/var/www/vue_project/dist` 目录。

打开 Nginx 配置文件：

```bash
sudo nano /etc/nginx/sites-available/vue_project
```

编辑配置文件，设置 Nginx 提供静态文件：

```bash
server {
    listen 8080;  # 监听 8080 端口
    server_name example1.com example2.com;  # 配置你的域名，或者使用 IP 或 localhost 多个用空格分隔开

    root /var/www/vue_project/dist;  # Vue 项目构建文件所在目录
    index index.html;  # 默认首页

    location / {
        try_files $uri $uri/ /index.html;  # 支持 Vue 的 SPA 路由
    }

    # 如果有后端 API，需要配置反向代理
    location /api {
        proxy_pass http://localhost:3000;  # 反向代理到后端 API
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 禁止访问某些文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md) {
        return 404;
    }
}
```

- `listen 8080;`：指定 Nginx 监听 8080 端口。
- `root /var/www/vue_project/dist;`：指定 Vue 项目的构建目录。
- `try_files $uri $uri/ /index.html;`：支持 Vue 项目的前端路由，将所有请求重定向到 `index.html`，让 Vue Router 处理路由。

#### 2）启用配置

创建符号链接并启用新配置：

```bash
sudo ln -s /etc/nginx/sites-available/vue_project /etc/nginx/sites-enabled/
```

#### 3）检查配置并重启 Nginx

确保 Nginx 配置正确：

```bash
sudo nginx -t  # syntax is okay | test is successful
```

重启 Nginx：

```bash
sudo systemctl reload nginx
```

#### 4）访问应用

现在可以在浏览器中访问 `http://your_server_ip:8080`，查看 Vue 应用。

#### 5）配置防火墙

如果使用防火墙，确保允许访问 8080 端口：

```bash
sudo ufw allow 8080
```

#### 6）配置 HTTPS（使用 443 端口）

如果需要配置 HTTPS，建议使用 Let’s Encrypt 提供免费的 SSL 证书，并通过 `certbot` 自动配置：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
```

### 【docker.nginx部署】

> docker容器的指令如下，所以有三个映射文件，因此需要依此填写配置文件、传输项目文件、运行

```bash
# docker容器的指令为，所以有三个映射文件
docker run -p 80:80 --name nginx \
 -v /home/slienceme/docker/nginx/html:/usr/share/nginx/html \
 -v /home/slienceme/docker/nginx/logs:/var/log/nginx \
 -v /home/slienceme/docker/nginx/conf:/etc/nginx \
 -d nginx:1.10
```

#### 1）写配置文件

> 进入映射路径`/home/slienceme/docker/nginx/conf`, 创建配置文件`project1.conf`

```bash
server {
    listen 8080;  # 监听 8080 端口
    server_name example1.com example2.com;  # 配置你的域名，或者使用 IP 或 localhost 多个用空格分隔开

    root /usr/share/nginx/html/project;  # Vue 项目构建文件所在目录
    index index.html;  # 默认首页

    location / {
        try_files $uri $uri/ /index.html;  # 支持 Vue 的 SPA 路由
    }

    # 如果有后端 API，需要配置反向代理
    location /api {
        proxy_pass http://对应IP:3000;  # 反向代理到后端 API, 注意IP修改到正确IP，不再是本地，现在是容器内
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 禁止访问某些文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.env|\.svn|\.project|LICENSE|README.md) {
        return 404;
    }
}
```

#### 2）传文件

> 进入映射路径`/home/slienceme/docker/nginx/html`, 创建项目文件`project1`，然后将项目放到该文件中

#### 3）启动

```bash
docker exec -it nginx容器名 nginx -s reload
```

## 6. 部署PHP项目

### 6.1 项目部署

#### 1）更新包列表

```bash
sudo apt update
```

#### 2）安装PHP 

这个命令会安装默认的PHP版本。通常它会安装PHP 7.x或8.x，具体版本取决于你的Ubuntu版本。

```bash
sudo apt install php
```

#### 3）验证PHP安装 

验证PHP是否安装成功

```bash
php -v
```

> 如果安装成功，你会看到类似如下的信息：
> PHP 8.1.2 (cli) (built: Jan 20 2022 08:57:57) (NTS)

#### 4）安装常用的PHP扩展

```bash
# PHP常常需要一些扩展来处理数据库连接、图像处理等功能。你可以安装常用的PHP扩展，比如
# 这将安装PHP的命令行工具、mbstring、XML解析、MySQL支持和ZIP压缩支持。
sudo apt install php-cli php-mbstring php-xml php-mysql php-zip
```

#### 5）配置php-fpm

```bash
# 如果你正在使用Nginx作为Web服务器，并且希望在Web服务器中启用PHP，你需要安装相应的PHP模块。
# Nginx与PHP需要通过`php-fpm`来处理PHP请求。你可以安装`php-fpm`：
sudo apt install php-fpm

# 先找到 PHP-FPM 的配置文件，通过下面指令
sudo find / -name "php-fpm.conf" 2>/dev/null
# 例如我的： /etc/php/7.4/fpm/pool.d/www.conf

# 修改www.conf配置文件
vim /etc/php/7.4/fpm/pool.d/www.conf

# 更改监听端口 找到;
listen = /run/php/php7.4-fpm.sock
# 修改为
listen = 127.0.0.1:9000
listen.allowed_clients = 127.0.0.1

# 重启php-fpm
systemctl restart php7.4-fpm

# 查询一下端口
netstat -lnt | grep 9000
```

#### 6）创建站点

```bash
server {
    listen 7000;
    server_name _._._._ 
    root /var/www/html;      #网站默认目录，以后可以自己改
    index index.php index.html index.htm;
    server_name www.a.com;      #网站地址
    location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            try_files $uri $uri/ =404;
    }
    location ~ \.php$ {
            include fastcgi.conf;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_param PATH_INFO $fastcgi_path_info;
            fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

#### 7）开放防火墙

```bash
sudo ufw allow 7000
```

## 7. 错误排查

### 7.1 检查 Nginx 错误日志

查看 Nginx 错误日志，可能会给你更多的错误信息，帮助进一步排查问题。

```bash
tail -f /var/log/nginx/error.log
```

查看是否有其他相关的错误信息，特别是与 PHP-FPM 相关的错误。

### 7.2 检查 PHP 错误日志

如果问题与 PHP-FPM 配置相关，查看 PHP-FPM 的错误日志也是一个好方法。在 `/var/log/php7.x-fpm.log` 中查看是否有其他错误信息。

```bash
tail -f /var/log/php7.x-fpm.log
```

::: tip 发布时间:
2025-02-15
:::
