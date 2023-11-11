@[toc]
## 3. Nginx的常用命令
进入 `nginx`  目录中

```
cd /usr/local/nginx/sbin
```
1. 查看 `nginx`  版本号
```
./nginx -v
```
2. 启动 `nginx`
```
./nginx
```
3. 停止 `nginx`
```
./nginx -s stop
```
4. 重新加载 `nginx`配置文件
```
./nginx -s reload
```

----
查询进程

```
ps -ef|grep nginx
```

## 4. Nginx的配置文件
### 4.1 nginx配置文件位置(这是我的路径)
```
cd /www/server/nginx/conf/nginx.conf
```
### 4.2 配置文件中的内容(简介)
#### 全局块

> 从配置文件开始到 events 块之间的内容，主要会设置一些影响 nginx 服务器整体运行的配置指令，主要包括配置运行 Nginx 服务器的用户（组）、允许生成的 worker process 数，进程 PID 存放路径、日志存放路径和类型以及配置文件的引入等。

比如上面第一行配置的：

```
worker_process 1;
```

> 这是 Nginx 服务器并发处理服务的关键配置，worker_processes 值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约

#### events块
比如上面的配置：

```
evemts{
			worker_connections 1024;
}
```

> events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 work process 可以同时支持的最大连接数等。
上述例子就表示每个 work process 支持的最大连接数为 1024.
这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置

#### http块

```
http
    {
        include       mime.types;
        default_type  application/octet-stream;
        
        sendfile   on;
        keepalive_timeout 60;
        
server
    {
        listen 80;
        server_name localhost;
        index index.html index.htm index.php;

        #error_page   404   /404.html;
        
        location /{
        {
           root html;
           index index.html index.htm;
        }
        
        location /50x.html
        {
            root  html;
        }
    }
```

> 这算是 Nginx 服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。
需要注意的是：http 块也可以包括 http 全局块、server 块。

##### http 全局块

> http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。

##### server 块

> 这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。

> 每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。

> 而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块。

**1、全局 server 块**

> 最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。

**2、location 块**

> 一个 server 块可以配置多个 location 块。

> 这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称（也可以是IP 别名）之外的字符串 （例如 前面的/uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

## 5. Nginx  配置实例- 反向代理
### 反向代理 实例 1
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/b92a6a44da91ea49460a174f08f68a1e.png)
修改电脑hosts文件

```
ip  www.123,com
```

在 nginx  进行请求转发的配置（反向代理配置）
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/35522abae56a242fcd4cd14b1776cd80.png)
### 反向代理 实例 2
- 访问 http://192.168.17.129:9001/edu/  直接跳转到 127.0.0.1:8080
- 访问 http:// 192.168.17.129:9001/vod/  直接跳转到 127.0.0.1:8081

（1）找到 nginx  配置文件，进行反向代理配置(记住开放端口)
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/2ca78d9cfe5d16ad20dbcc22fd193133.png)
### location指令说明
该指令用于匹配 URL
- 语法如下：

```
location [ = | ~ | ~* | ^~ ] uri {

}
```
1. `=` ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配成功，就停止继续向下搜索并立即处理该请求。
2. `~`：用于表示 uri 包含正则表达式，并且区分大小写。
3. `~*`：用于表示 uri 包含正则表达式，并且不区分大小写。
4. `^~`：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location块中的正则 uri 和请求字符串做匹配。
注意：如果 uri 包含正则表达式，则必须要有 `~` 或者 `~*` 标识。
## 6. Nginx  配置实例- 负载均衡
实现效果： 配置负载均衡
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/95eeffc052b17386806f3373447392e8.png)

> 随着互联网信息的爆炸性增长，负载均衡（load balance）已经不再是一个很陌生的话题，顾名思义，负载均衡即是将负载分摊到不同的服务单元，既保证服务的可用性，又保证响应足够快，给用户很好的体验。快速增长的访问量和数据流量催生了各式各样的负载均衡产品，很多专业的负载均衡硬件提供了很好的功能，但却价格不菲，这使得负载均衡软件大受欢迎，nginx 就是其中的一个，在 linux 下有 Nginx、LVS、Haproxy 等等服务可以提供负载均衡服务。

### 6.1 Nginx 提供了几种分配方式(策略)：
#### 6.1.1 轮询（默认） 
> 每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 。 掉，能自动剔除。

#### 6.1.2 weight
> weight 代表权重默认为 1, 权重越高被分配的客户端越多

```
upstream server_pool {
server 192.168.5.21 weight = 10 ;
server 192.168.5.22 weight = 10 ;
}
```
#### 6.1.3 ip_hash
> 每个请求按访问 ip 的 的 hash  结果分配，这样每个访客固定访问一个后端服务器

```
upstream server_pool {
ip_hash ;
server 192.168.5.21:80 ;
server 192.168.5.22:80 ;
}
```
#### 6.1.4 fair
> （第三方） 按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```
upstream server_pool {
server 192.168.5.21:80 ;
server 192.168.5.22:80 ;
fair ;
}
```
## 7. Nginx  配置实例- 动静分离
什么是动静分离？
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/d98b569c2f0a83a43cda790cea3b3e69.png)

> Nginx动静分离简单来说就是把动态跟静态请求分开，不能理解成只是单纯的把动态页面和静态页面物理分离。严格意义上说应该是动态请求跟静态请求分开，可以理解成使用Nginx处理静态页面，Tomcat 处理动态页面。

动静分离从目前实现角度来讲大致分为两种

> 一种是纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案；
>  另外一种方法就是动态跟静态文件混合在一起发布，通过nginx 来分开。
---
> 通过 location 指定不同的后缀名实现不同的请求转发。通过 expires参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。具体 Expires定义：是给一个资源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源。（如果经常更新的文件，不建议使用Expires 来缓存），我这里设置 3d，表示在这 3 天之内访问这个URL，发送一个请求，比对服务器该文件最后更新时间没有变化，则不会从服务器抓取，返回状态码304，如果有修改，则直接从服务器重新下载，返回状态码200。

### 实例
放入项目路径下相关文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/dc6755e60313e2411257c24be4227f98.png)
然后配置nginx
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/09578a8d9e6d724a302b57fa4ee53202.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/e13737c983976b1adcf204ded7a39bfd.png)
## 8. nginx原理
1. mater 和 和 worker
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/123dce7454705ef1d23697cc7d5e01a0.png)
2. worker 
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/8877bb8b61445fa8ce16ff7da5961020.png)


3. 一个 `master`  和多个 `woker`  有好处
（1）可以使用 nginx –s reload  热部署，利用 nginx  进行热部署操作
（2）每个 `woker`  是独立的进程，如果有其中的一个 woker  出现问题，其他 `woker`  独立的，继续进行争抢，实现请求过程，不会造成服务中断

4. 设置多少个 `woker` 
`worker`  数和服务器的 cpu  数相等是最为适宜的
5. 连接数 `worker_connection`
第一个：发送请求，占用了 `woker`  的几个连接数？
答案：2或者4个
第二个：`nginx`  有一个 `master` ，有四个 `woker` ，每个 `woker`  支持最大的连接数 1024 ，支持的最大并发数是多少？
普通的静态访问最大并发数是
`worker_connections*worker_processes /2` 
而如果是 HTTP  作  为反向代理来说，最大并发数量应该是 `worker_connections * worker_processes/4` 
