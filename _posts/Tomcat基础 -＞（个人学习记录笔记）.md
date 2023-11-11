@[toc]
# Tomcat
## 1. web相关概念回顾
### 1.1 软件架构
1. `C/S`：客户端/服务器端
2. `B/S`：浏览器/服务器端

### 1.2 资源分类
1. **静态资源**：所有用户访问后，得到的结果都是一样的，称为静态资源.静态资源可以直接被浏览器解析
	 如： `html,css,JavaScript`
2. **动态资源**：每个用户访问相同资源后，得到的结果可能不一样。称为动态资源。动态资源被访问后，需要先转换为静态资源，在返回给浏览器
	 如：`servlet/jsp,php,asp....`
		

### 1.3 网络通信三要素
1. `IP`：电子设备(计算机)在网络中的唯一标识。
2. 端口：应用程序在计算机中的唯一标识。 `0~65536`
3. 传输协议：规定了数据传输的规则
	1. 基础协议：
		1. `tcp`:安全协议，三次握手。 速度稍慢
		2. `udp`：不安全协议。 速度快


## 2. web服务器软件：
* 服务器：安装了服务器软件的计算机
* 服务器软件：接收用户的请求，处理请求，做出响应
* web服务器软件：接收用户的请求，处理请求，做出响应。
	* 在web服务器软件中，可以部署web项目，让用户通过浏览器来访问这些项目
	* web容器

---
* 常见的java相关的**web服务器软件**：
	* `webLogic`：oracle公司，大型的JavaEE服务器，支持所有的JavaEE规范，收费的。
	* `webSphere`：IBM公司，大型的JavaEE服务器，支持所有的JavaEE规范，收费的。
	* `JBOSS`：JBOSS公司的，大型的JavaEE服务器，支持所有的JavaEE规范，收费的。
	* `Tomcat`：Apache基金组织，中小型的JavaEE服务器，仅仅支持少量的JavaEE规范servlet/jsp。开源的，免费的。

---
* JavaEE：Java语言在企业级开发中使用的技术规范的总和，一共规定了13项大的规范

* Tomcat：web服务器软件
	1. 下载：[http://tomcat.apache.org/](http://tomcat.apache.org/)
	2. 安装：解压压缩包即可。
		 
		 注意：安装目录建议不要有中文和空格
	3. 卸载：删除目录就行了
	4. 启动：
		* `bin/startup.bat` ,双击运行该文件即可
		* 访问：浏览器输入：`http://localhost:8080` 回车访问自己
						  `http://别人的ip:8080` 访问别人
		![在这里插入图片描述](https://img-blog.csdnimg.cn/20210218093955895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

	
		* 可能遇到的问题：
			1. 黑窗口一闪而过：
				* 原因： 没有正确配置`JAVA_HOME`环境变量
				* 解决方案：正确配置`JAVA_HOME`环境变量

			2. 启动报错：
				1. 暴力：找到占用的端口号，并且找到对应的进程，杀死该进程
					* `netstat -ano`
				2. 温柔：修改自身的端口号
					* `conf/server.xml`
					* ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210218163814159.png)
					*  一般会将`tomcat`的默认端口号修改为80。80端口号是http协议的默认端口号。
						好处：在访问时，就不用输入端口号
						
	5. 关闭：
		1. 正常关闭：
			* `bin/shutdown.bat`
			* `ctrl+c`
		2. 强制关闭：
			* 点击启动窗口的×
	6. 配置:
	
		 部署项目的方式：
		1. 直接将项目放到`webapps`目录下即可。
			* `/hello`：项目的访问路径-->虚拟目录
			* **简化部署**：将项目打成一个`war`包，再将`war`包放置到`webapps`目录下。
				 `war`包会自动解压缩

		2. 配置`conf/server.xml`文件
			在`<Host>`标签体中配置
			 `<Context docBase="D:\hello" path="/hehe" />`
			* `docBase`:项目存放的路径
			* `path`：虚拟目录

		3. 在`conf\Catalina\localhost`创建任意名称的`xml`文件。在文件中编写
				 `<Context docBase="D:\hello" />`
				 虚拟目录：xml文件的名称
			
		 静态项目和动态项目：
		1. 目录结构
			 java动态项目的目录结构：
			- 项目的根目录
			- `WEB-INF`目录：
			- `web.xml`：web项目的核心配置文件
			- `classes`目录：放置字节码文件的目录
			- `lib`目录：放置依赖的jar包


		 将Tomcat集成到IDEA中，并且创建JavaEE的项目，部署项目。
