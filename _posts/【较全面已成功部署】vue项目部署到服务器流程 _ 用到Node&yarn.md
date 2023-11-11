### 步骤：
#### 1. 下载Node.js & yarn

首先去[进入官网](https://nodejs.org/en/)下载node，点击下载即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708205624567.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
常规的流程就安装好了，尽量下载`node-v16.4.1-x64.msi`文件，这个可以自动配置环境变量
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708205645176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
如果用到了yarn，到[官网下载](https://yarn.bootcss.com/docs/install/#windows-stable)即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708210402669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708210429451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
然后测试一下是否安装成功，打开cmd

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708210632376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
#### 2. 打开你的vue项目路径(含有package.json文件路径)
##### 先安装依赖包
用管理员模式打开cmd

输入
```java
npm install
```
如果有yarn
```java
yarn install
```
##### 编译一下子
输入
```java
npm run build
```
如果有yarn
```java
yarn run build
```
##### 开发模式运行一下子
输入
```java
npm run serve
```
如果有yarn
```java
yarn run serve
```
----
编译后项目打包成功会生成一个dist文件夹
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708211538549.png)
文件结构大概是这个样子
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708211914533.png)
给他上传到服务器上

对应的二级域名下创建的文件夹中，或者按照你的路径放置，然后配置nginx服务器即可

**(无宝塔面板)**

[教程点击](https://blog.csdn.net/Slience_me/article/details/118566951)

**(有宝塔面板)**

这个打开基本就可以了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708212953314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

> 此处以下内容参考 [博客链接](https://www.cnblogs.com/theory/p/13437570.html)

#### 3. 配置nginx.conf

```java
 server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        
        location / {
            root /home/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;  //解决刷新页面变成404问题的代码
        }
        location /api{
             rewrite  ^/api/(.*)$ /$1 break;
             proxy_pass http://localhost:8080;
        }
    }
```

   
- `listen`：表示监听端口8080

- `location`：dist文件夹放置的位置

- `/api`：因为vue前端代理的时候，用的是api做名字，所以我们要在此处配置后端api端口：

```java
//vue代理
proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/api': ''}
      }
    },
```

