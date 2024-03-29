---
layout: post
title: Java｜Response_Cookie&Session_JSP&EL&JSTL
categories: [Java]
description: Response_Cookie&Session_JSP&EL&JSTL
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# 1. HTTP协议：
## 1.1 请求消息：客户端发送给服务器端的数据
- 数据格式：
	1. 请求行
	2. 请求头
	3. 请求空行
	4. 请求体



## 1.2 响应消息：服务器端发送给客户端的数据
### 1.2.1 数据格式：
#### 1.2.1.1 响应行
1. 组成：协议/版本 响应状态码 状态码描述
2. 响应状态码：服务器告诉客户端浏览器本次请求和响应的一个状态。
	1. 状态码都是`3位数字` 
	2. 分类：
		1. `1xx`：服务器就收客户端消息，但没有接受完成，等待一段时间后，发送1xx多状态码
		2. `2xx`：成功。代表：200
		3. `3xx`：重定向。代表：302(重定向)，304(访问缓存)
		4. `4xx`：客户端错误。
		
			 `404`（请求路径没有对应的资源） 
			`405`：请求方式没有对应的doXxx方法
		5. `5xx`：服务器端错误。代表：500(服务器内部出现异常)
				
		
#### 1.2.1.2 响应头：
1. 格式：头名称： 值
2. 常见的响应头：
	1. `Content-Type`：服务器告诉客户端本次响应体`数据格式`以及`编码格式`
	2. `Content-disposition`：服务器告诉客户端以什么格式打开响应体数据
		 值：
			 `in-line`:默认值,在当前页面内打开
			 `attachment;filename=xxx`：以附件形式打开响应体。文件下载
#### 1.2.1.3 响应空行
#### 1.2.1.4 响应体:传输的数据
- 响应字符串格式

```html
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 101
Date: Wed, 06 Jun 2018 07:08:42 GMT
	
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  hello , response
  </body>
</html>
```
			



# 2. Response对象
### 2.1功能：设置响应消息
1. 设置响应行
	- 格式：`HTTP/1.1 200 ok`
	- 设置状态码：`setStatus(int sc)` 
2. 设置响应头：`setHeader(String name, String value)` 			
3. 设置响应体：
	 使用步骤：
	1. 获取输出流
		 字符输出流：`PrintWriter getWriter()`
		 字节输出流：`ServletOutputStream getOutputStream()`
	2. 使用输出流，将数据输出到客户端浏览器

### 2.2 案例：
#### 2.2.1. 完成重定向
 - 重定向：资源跳转的方式
   
  代码实现：
  
```java
//1. 设置状态码为302
response.setStatus(302);
//2.设置响应头location
response.setHeader("location","/day15/responseDemo2");
//简单的重定向方法
response.sendRedirect("/day15/responseDemo2");
```
* 重定向的特点:`redirect`
	1. 地址栏发生变化
	2. 重定向可以访问其他站点(服务器)的资源
	3. 重定向是两次请求。不能使用`request`对象来共享数据
* 转发的特点：`forward`
	1. 转发地址栏路径不变
	2. 转发只能访问当前服务器下的资源
	3. 转发是一次请求，可以使用`request`对象来共享数据

* `forward` 和  `redirect` 区别
	
* 路径写法：
	
	 路径分类
	1. `相对路径`：通过相对路径不可以确定唯一资源
		* 如：`./index.html`
		* 不以`/`开头，以.开头路径
		* 规则：找到当前资源和目标资源之间的相对位置关系
			 `./`：当前目录
			 `../`:后退一级目录
	2. `绝对路径`：通过绝对路径可以确定唯一资源
		* 如：`http://localhost/day15/responseDemo2	 	/day15/responseDemo2`
		* 以`/`开头的路径

		* 规则：判断定义的路径是给谁用的？判断请求将来从哪儿发出
			* 给客户端浏览器使用：`需要加虚拟目录(项目的访问路径)`
				 建议虚拟目录动态获取：`request.getContextPath()`
				 `<a> , <form> 重定向...`
			* 给服务器使用：`不需要加虚拟目录`
				 `转发路径`
					
			
						

#### 2.2.2 服务器输出字符数据到浏览器
##### 步骤：
1. 获取字符输出流
2. 输出数据

##### 注意：
* 乱码问题：
	1. `PrintWriter pw = response.getWriter()`;获取的流的默认编码是`ISO-8859-1`
	2. 设置该流的`默认编码`
	3. 告诉浏览器响应体使用的编码

	
- 简单的形式，设置编码，是在获取流之前设置
```java
response.setContentType("text/html;charset=utf-8");
```

```java
@WebServlet("/responseDemo4")
public class ResponseDemo4 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取流对象之前，设置六的默认编码，ISO-8859-1 设置为：GBK
//        resp.setCharacterEncoding("utf-8");

        // 设置编码 告诉浏览器，服务器发送的消息体数据的彪马。建议浏览器使用该编码
//        resp.setHeader("content-type","text/html;charset=utf-8");

        //简单的形式设置编码
        resp.setContentType("text/html;charset=utf-8");

        // 1.获取字符输出流
        PrintWriter pw = resp.getWriter();
        // 2.输出数据
//        pw.write("<h1>hello,response<h1>");
        pw.write("你好！");
    }
}
```

#### 2.2.3 服务器输出字节数据到浏览器
 步骤：
1. 获取字节输出流
2. 输出数据

```java
@WebServlet("/responseDemo5")
public class ResponseDemo5 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("text/html;charset=utf-8");
        // 1.获取字符输出流
        ServletOutputStream sos = resp.getOutputStream();
        // 2.输出数据
        sos.write("你好".getBytes("utf-8"));
    }
}
```

#### 2.2.4 验证码
1. 本质：图片
2. 目的：防止恶意表单注册

```java
@WebServlet("/checkCodeServlet")
public class CheckCodeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        int wigth = 100;
        int height = 50;
        //1.创建一对象，在内存中图片（验证码图片对象）
        BufferedImage image = new BufferedImage(wigth,height,BufferedImage.TYPE_INT_RGB);
        //2.美化图片

        //2.1 填充背景色
        Graphics g = image.getGraphics(); //画笔对象
        g.setColor(Color.PINK);//设置画笔颜色
        g.fillRect(0,0,wigth,height);

        //2.2 画边框
        g.setColor(Color.BLUE);
        g.drawRect(0,0,wigth-1,height-1);

        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        //生成随机角标
        Random ran = new Random();


        //2.3 写验证码
        for (int i = 1; i <= 4; i++) {
            int index = ran.nextInt(str.length());
            //获取字符
            char ch = str.charAt(index);
            g.drawString(ch+"", wigth/5*i,height/2);
        }
        //2.4 画干扰线
        g.setColor(Color.GREEN);

        //随机生成坐标点


        for (int i = 0; i < 10; i++) {
            int x1 = ran.nextInt(wigth);
            int x2 = ran.nextInt(wigth);
            int y1 = ran.nextInt(height);
            int y2 = ran.nextInt(height);
            g.drawLine(x1,y1,x2,y2);
        }


        //3.将图片输入到图片展示
        ImageIO.write(image,"jpg",resp.getOutputStream());
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
    window.onload = function (){
        // 1. 获取图片对象
        var img = document.getElementById("checkCode");
        //2.绑定单击事件
        img.onclick = function (){
            //加时间戳
            var date = new Date().getTime();
            img.src = "/day15/checkCodeServlet?"+date;
        }

        // 1. 获取图片对象
        var cha = document.getElementById("change");
        var imga = document.getElementById("checkCode");
        //2.绑定单击事件
        cha.onclick = function (){
            //加时间戳
            var date = new Date().getTime();
            imga.src = "/day15/checkCodeServlet?"+date;
        }
    }

    </script>
</head>
<body>
    <img id="checkCode" src="/day15/checkCodeServlet"/>
    <a id="change" href="javascript:void(0);" >看不清换一张</a>
</body>
</html>
```
# 3. ServletContext对象：
## 1. 概念：
- 代表整个`web`应用，可以和程序的容器(服务器)来通信
## 2. 获取：
1. 通过`request`对象获取
	 `request.getServletContext();`
2. 通过`HttpServlet`获取
	 `this.getServletContext();`
## 3. 功能：
1. 获取`MIME`类型：
	* `MIME`类型:在互联网通信过程中定义的一种文件数据类型				
		 格式： `大类型/小类型   text/html		image/jpeg`
	* 获取：`String getMimeType(String file)`  
2. 域对象：共享数据
	1. `setAttribute(String name,Object value)`
	2. `getAttribute(String name)`
	3. `removeAttribute(String name)`
 `ServletContext`对象范围：所有用户所有请求的数据
3. 获取文件的真实(服务器)路径
	1. 方法：`String getRealPath(String path)`  
				 

```java
String b = context.getRealPath("/b.txt");//web目录下资源访问
System.out.println(b);
String c = context.getRealPath("/WEB-INF/c.txt");//WEB-INF目录下的资源访问
System.out.println(c);
String a = context.getRealPath("/WEB-INF/classes/a.txt");//src目录下的资源访问
System.out.println(a);
```

```java
@WebServlet("/servletcontentdemo1")
public class ServletContentDemo1 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.通过request对象获取
        ServletContext context1 = req.getServletContext();
        //2.通过HttpServlet获取
        ServletContext context2 = this.getServletContext();

        System.out.println(context1);
        System.out.println(context2);

        System.out.println(context1 == context2);
    }
}
```

```java
@WebServlet("/servletcontentdemo2")
public class ServletContentDemo2 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //2.通过HttpServlet获取
        ServletContext context = this.getServletContext();

        //3. 定义文件名称
        String filename = "a.jpg";

        //4.获取MIME类型
        String mimeType = context.getMimeType(filename);
        System.out.println(mimeType);

    }
}
```

# 4. 案例：
* 文件下载需求：
	1. 页面显示超链接
	2. 点击超链接后弹出下载提示框
	3. 完成图片文件下载


* 分析：
	1. 超链接指向的资源如果能够被浏览器解析，则在浏览器中展示，如果不能解析，则弹出下载提示框。不满足需求
	2. 任何资源都必须弹出下载提示框
	3. 使用响应头设置资源的打开方式：
		* `content-disposition:attachment;filename=xxx`


* 步骤：
	1. 定义页面，编辑超链接`href`属性，指向Servlet，传递资源名称`filename`
	2. 定义`Servlet`
		1. 获取文件名称
		2. 使用字节输入流加载文件进内存
		3. 指定`response`的响应头： `content-disposition:attachment;filename=xxx`
		4. 将数据写出到`response`输出流


* 问题：
	* 中文文件问题
		* 解决思路：
			1. 获取客户端使用的浏览器版本信息
			2. 根据不同的版本信息，设置`filename`的编码方式不同

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

    <a href="/day15/img/1.jpg">图片1</a>

    <a href="/day15/img/1.avi">视频</a>
    <hr>


    <a href="/day15/downloadServlet?filename=九尾.jpg">图片1</a>

    <a href="/day15/downloadServlet?filename=1.avi">视频</a>

</body>
</html>
```

```java
@WebServlet("/downloadServlet")
public class DownloadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取请求参数，文件名称
        String filename = request.getParameter("filename");
        //2.使用字节输入流加载文件进内存
        //2.1找到文件服务器路径
        ServletContext servletContext = this.getServletContext();
        String realPath = servletContext.getRealPath("/img/" + filename);
        //2.2用字节流关联
        FileInputStream fis = new FileInputStream(realPath);

        //3.设置response的响应头
        //3.1设置响应头类型：content-type
        String mimeType = servletContext.getMimeType(filename);//获取文件的mime类型
        response.setHeader("content-type",mimeType);
        //3.2设置响应头打开方式:content-disposition

        //解决中文文件名问题
        //1.获取user-agent请求头、
        String agent = request.getHeader("user-agent");
        //2.使用工具类方法编码文件名即可
        filename = DownLoadUtils.getFileName(agent, filename);

        response.setHeader("content-disposition","attachment;filename="+filename);
        //4.将输入流的数据写出到输出流中
        ServletOutputStream sos = response.getOutputStream();
        byte[] buff = new byte[1024 * 8];
        int len = 0;
        while((len = fis.read(buff)) != -1){
            sos.write(buff,0,len);
        }

        fis.close();


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}
```
	
**注意：** 这个可能不能用，因为，[click](https://www.cnblogs.com/moonsoft/p/12300001.html)
```java
import sun.misc.BASE64Encoder;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


public class DownLoadUtils {

    public static String getFileName(String agent, String filename) throws UnsupportedEncodingException {
        if (agent.contains("MSIE")) {
            // IE浏览器
            filename = URLEncoder.encode(filename, "utf-8");
            filename = filename.replace("+", " ");
        } else if (agent.contains("Firefox")) {
            // 火狐浏览器
            BASE64Encoder base64Encoder = new BASE64Encoder();
            filename = "=?utf-8?B?" + base64Encoder.encode(filename.getBytes("utf-8")) + "?=";
        } else {
            // 其它浏览器
            filename = URLEncoder.encode(filename, "utf-8");
        }
        return filename;
    }
}
```
# -----------------------------------------------------------------------------
	
# 5. Cookie&Session
## 5.1
- 他们是一种会话技术
###  什么是会话？
- 在一次会话过程中包含多次的请求和响应。
-  一次会话就是浏览器第一次给服务器资源发送请求，会话开始建立，直到有一方断开为止
###  有什么功能？
- 在一次会话的范围内的多次请求间，共享数据
###  有什么区别对于他们的方式？
1. `Cookie`是客户端的会话技术：
2. `Session`是服务器端的会话技术：

## 5.2 Cookie
- 客户端的会话技术，cookie将数据信息保存到客户端中

1. 首先来创建`Cookie`对象，然后绑定相关数据
	 `new Cookie(String name, String value)` 
2. 进而发送`Cookie`对象
	 `response.addCookie(Cookie cookie)` 
3. 最后获取得`Cookie`，然后拿到数据
	 `Cookie[]  request.getCookies()`  

```java
package xyz.slienceme.cookie;
@WebServlet(name = "CookieDemo1", value = "/CookieDemo1")
public class CookieDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1. 创建Cookie对象
        Cookie c = new Cookie("msg", "hello");
        //2. 发送Cookie
        response.addCookie(c);
    }
}
```
```java
package xyz.slienceme.cookie;
@WebServlet(name = "CookieDemo2", value = "/CookieDemo2")
public class CookieDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //3. 获取Cookie
        Cookie[] cs = request.getCookies();
        // 获取数据，遍历Cookies
        if(cs != null){
            for (Cookie c : cs) {
                String name = c.getName();
                String value = c.getValue();
                System.out.println(name+":"+value);
            }
        }
    }
}
```

* 他是基于响应头`set-cookie`和请求头`cookie`的前提来实现的

### 注意：
#### 1. 可以单次多条cookie
* 同时创建多个`Cookie`对象，利用`response`调用多次`addCookie`方法发送`cookie`可达到可以单次多条cookie的目的。

```java
package xyz.slienceme.cookie;
@WebServlet(name = "CookieDemo3", value = "/CookieDemo3")
public class CookieDemo3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1. 创建Cookie对象
        Cookie c1 = new Cookie("msg", "hello");
        Cookie c2 = new Cookie("name", "zhangsan");
        //2. 发送Cookie
        response.addCookie(c1);
        response.addCookie(c2);
    }
}
```

#### 2. 浏览器存储的cookie时间
1. 默认`Cookie`数据被销毁在浏览器关闭时
2. 为了持久化存储cookie数据：
* `setMaxAge(int seconds)`
	1. 正数：指定`cookie`存活时间，到期失效
	2. 负数：默认值
	3. 零：删除`cookie`信息
```java
package xyz.slienceme.cookie;
@WebServlet("/cookieDemo4")
public class CookieDemo4 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.创建Cookie对象
        Cookie c1 = new Cookie("msg","setMaxAge");
        //2.设置cookie的存活时间
        //c1.setMaxAge(30);//将cookie持久化到硬盘，30秒后会自动删除cookie文件
        //c1.setMaxAge(-1);
        //c1.setMaxAge(300);
        c1.setMaxAge(0);//删除Cookie
        //3.发送Cookie
        response.addCookie(c1);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

#### 3. cookie是否可以存储中文
* 在`tomcat 8`版本之前需要将中文数据转码---一般采用`URL编码(%E3)`
* 在`tomcat 8` 版本之后，支持中文数据。不支持`特殊字符`，
可以`URL编码`存储，`URL解码`解析

```java
package xyz.slienceme.cookie;
@WebServlet("/cookieDemo5")
public class CookieDemo5 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.创建Cookie对象
        Cookie c1 = new Cookie("msg","你好");
        //设置path，让当前服务器下部署的所有项目共享Cookie信息
        c1.setPath("/");
        //3.发送Cookie
        response.addCookie(c1);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

#### 4. cookie共享问题
1. 同`tomcat`服务器，部署多个web项目默认情况下`cookie`不能共享
	 `setPath(String path)`:设置`cookie`的获取的范围。
	 默认情况下，设置当前的`虚拟目录`
		* 如果想要共享，则可以将`path`设置为"`/`"


2. 不同的`tomcat`服务器间`cookie`如何共享？
	 `setDomain(String path)`: 设置一级域名相同，则多个服务器之间`cookie`可以共享
		 `setDomain(".baidu.com")`,那么`tieba.baidu.com`和`news.baidu.com`中`cookie`可以共享


#### 5. 主要特点与作用
1. `cookie`客户端浏览器中存储数据
2. 单个`cookie` 的大小限制(4kb) 
3.  同一个域名下的总`cookie`数量限制(20个)

* 作用：
	1. `cookie` 用于存储少量的较为不敏感的数据
	2. 在不登录的条件下，来完成服务器对客户端的身份识别认证





```java
package xyz.slienceme.cookie;
@WebServlet("/cookieTest")
public class CookieTest extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //设置响应的消息体的数据格式以及编码
        response.setContentType("text/html;charset=utf-8");
        //1.获取所有Cookie
        Cookie[] cookies = request.getCookies();
        boolean flag = false;//没有cookie为lastTime
        //2.遍历cookie数组
        if(cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies) {
                //3.获取cookie的名称
                String name = cookie.getName();
                //4.判断名称是否是：lastTime
                if("lastTime".equals(name)){
                    //有该Cookie，不是第一次访问
                    flag = true;//有lastTime的cookie
                    //设置Cookie的value
                    //获取当前时间的字符串，重新设置Cookie的值，重新发送cookie
                    Date date  = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
                    String str_date = sdf.format(date);
                    System.out.println("编码前："+str_date);
                    //URL编码
                    str_date = URLEncoder.encode(str_date,"utf-8");
                    System.out.println("编码后："+str_date);
                    cookie.setValue(str_date);
                    //设置cookie的存活时间
                    cookie.setMaxAge(60 * 60 * 24 * 30);//一个月
                    response.addCookie(cookie);
                    //响应数据
                    //获取Cookie的value，时间
                    String value = cookie.getValue();
                    System.out.println("解码前："+value);
                    //URL解码：
                    value = URLDecoder.decode(value,"utf-8");
                    System.out.println("解码后："+value);
                    response.getWriter().write("<h1>欢迎回来，您上次访问时间为:"+value+"</h1>");
                    break;

                }
            }
        }
        if(cookies == null || cookies.length == 0 || flag == false){
            //没有，第一次访问
            //设置Cookie的value
            //获取当前时间的字符串，重新设置Cookie的值，重新发送cookie
            Date date  = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
            String str_date = sdf.format(date);
            System.out.println("编码前："+str_date);
            //URL编码
            str_date = URLEncoder.encode(str_date,"utf-8");
            System.out.println("编码后："+str_date);

            Cookie cookie = new Cookie("lastTime",str_date);
            //设置cookie的存活时间
            cookie.setMaxAge(60 * 60 * 24 * 30);//一个月
            response.addCookie(cookie);
            response.getWriter().write("<h1>您好，欢迎您首次访问</h1>");
        }
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}

```
## 5.3 Session：翻译为（主菜）
- 数据将保存在服务器端的对象中。`HttpSession`

1. 获取`HttpSession`对象：
	`HttpSession session = request.getSession();`
2. 使用`HttpSession`对象：
	 `Object getAttribute(String name)`  
	 `void setAttribute(String name, Object value)`
	 `void removeAttribute(String name)`  
	 
* `Session`依赖于`Cookie`的。
![Alt Text](/images/posts/20210322131449444.png)

```java
package xyz.slienceme.session;
@WebServlet("/sessionDemo1")
public class SessionDemo1 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //使用session共享数据
        //1.获取session
        HttpSession session = request.getSession();
        //2.存储数据
        session.setAttribute("msg","hello session");
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}

```
```java
package xyz.slienceme.session;
@WebServlet("/sessionDemo2")
public class SessionDemo2 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //使用session获取数据
        //1.获取session
        HttpSession session = request.getSession();
        //2.获取数据
        Object msg = session.getAttribute("msg");
        System.out.println(msg);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

### 注意：

#### 1. 客户端关闭服务器不关闭，session不是同一个
> 	如果客户端关闭，服务器不关闭，那么两次获取session默认情况不是同一个
 但是如果需要相同，则可创建`Cookie`,键为`JSESSIONID`，而且设置最大的存活时间日期，让`cookie`来持久化保存。
```java
Cookie c = new Cookie("JSESSIONID",session.getId());
c.setMaxAge(60*60);
response.addCookie(c);
```
```java
package xyz.slienceme.session;
@WebServlet("/sessionDemo3")
public class SessionDemo3 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取session
        HttpSession session = request.getSession();
        System.out.println(session);
        //期望客户端关闭后，session也能相同
        Cookie c = new Cookie("JSESSIONID",session.getId());
        c.setMaxAge(60*60);
        response.addCookie(c);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```
![Alt Text](/images/posts/20210322132513871.png)

#### 2. 客户端不关闭服务器关闭，session不同一个
> 如果客户端不关闭，服务器关闭，两次获取的session不是同一个，但是如果要确保数据不丢失损失。
> `tomcat`自动完成以下工作 	
> * `session`的钝化： 		
> 	* 在服务器正常关闭之前，将`session`对象序列化到电脑的硬盘上 	
> * `session`的活化： 		
> 	* 在服务器启动后，将`session文件`转化为电脑内存中的`session`对象。

```java
package xyz.slienceme.session;
@WebServlet("/sessionDemo4")
public class SessionDemo4 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //1.获取session
        HttpSession session = request.getSession();
        System.out.println(session);
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

#### 3. 失效时间
> session失效时间有：
> 1. 当服务器关闭时候
> 2. 当`session`对象调用`invalidate()`方法时 。
> 3. 而且`session`默认失效时间 `30分钟` 	我们可以选择性配置修改
```xml
<session-config>
        <session-timeout>你想要的时间</session-timeout>
    </session-config>
```

#### 4. 主要特点
>  session有什么特点呢？
>  1. 注意`session` 主要用于存储一次会话的多次请求的数据，而且`存在服务器端`
>  2. 注意`session`可以存储`任意类型`的数据，或者是`任意大小`的数据
#### 5. 差异不同
> 对于`session`与`Cookie`的差异与不同：
> 	1. `session`数据放在服务器端存储，`Cookie`数据在客户端存储
> 	2. `session`无数据大小的限制，`Cookie`有数据大小的限制
> 	3. `session`数据更安全，`Cookie`相对而言不安全


## 案例：验证码
1. 案例需求：
	1. 访问带有验证码的登录页面login.jsp
	2. 用户输入用户名，密码以及验证码。
		* 如果用户名和密码输入有误，跳转登录页面，提示:用户名或密码错误
		* 如果验证码输入有误，跳转登录页面，提示：验证码错误
		* 如果全部输入正确，则跳转到主页success.jsp，显示：用户名,欢迎您


2. 分析：
- 1.login.jsp
```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>login</title>
    <script>
        window.onload = function(){
            document.getElementById("img").onclick = function(){
                this.src="/c/checkCodeServlet?time="+new Date().getTime();
            }
        }
    </script>
    <style>
        div{
            color: red;
        }
    </style>
</head>
<body>
    <form action="/c/loginServlet" method="post">
        <table>
            <tr>
                <td>用户名</td>
                <td><input type="text" name="username"></td>
            </tr>
            <tr>
                <td>密码</td>
                <td><input type="password" name="password"></td>
            </tr>
            <tr>
                <td>验证码</td>
                <td><input type="text" name="checkCode"></td>
            </tr>
            <tr>
                <td colspan="2"><img id="img" src="/c/checkCodeServlet"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="登录"></td>
            </tr>
        </table>
    </form>
    <div><%=request.getAttribute("cc_error") == null ? "" : request.getAttribute("cc_error")%></div>
    <div><%=request.getAttribute("login_error") == null ? "" : request.getAttribute("login_error") %></div>
</body>
</html>
```
2. 生成验证码函数
```java
package xyz.slienceme.servlet;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

@WebServlet("/checkCodeServlet")
public class CheckCodeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        int width = 100;
        int height = 50;

        //1.创建一对象，在内存中图片(验证码图片对象)
        BufferedImage image = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);


        //2.美化图片
        //2.1 填充背景色
        Graphics g = image.getGraphics();//画笔对象
        g.setColor(Color.PINK);//设置画笔颜色
        g.fillRect(0,0,width,height);

        //2.2画边框
        g.setColor(Color.BLUE);
        g.drawRect(0,0,width - 1,height - 1);

        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
        //生成随机角标
        Random ran = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 4; i++) {
            int index = ran.nextInt(str.length());
            //获取字符
            char ch = str.charAt(index);//随机字符
            sb.append(ch);

            //2.3写验证码
            g.drawString(ch+"",width/5*i,height/2);
        }
        String checkCode_session = sb.toString();
        //将验证码存入session
        request.getSession().setAttribute("checkCode_session",checkCode_session);

        //2.4画干扰线
        g.setColor(Color.GREEN);

        //随机生成坐标点

        for (int i = 0; i < 10; i++) {
            int x1 = ran.nextInt(width);
            int x2 = ran.nextInt(width);

            int y1 = ran.nextInt(height);
            int y2 = ran.nextInt(height);
            g.drawLine(x1,y1,x2,y2);
        }


        //3.将图片输出到页面展示
        ImageIO.write(image,"jpg",response.getOutputStream());


    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}

```
3. 验证信息
```java
package xyz.slienceme.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.设置request编码
        request.setCharacterEncoding("utf-8");
        //2.获取参数
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String checkCode = request.getParameter("checkCode");
        //3.先获取生成的验证码
        HttpSession session = request.getSession();
        String checkCode_session = (String) session.getAttribute("checkCode_session");
        //删除session中存储的验证码
        session.removeAttribute("checkCode_session");
        //3.先判断验证码是否正确
        if(checkCode_session!= null && checkCode_session.equalsIgnoreCase(checkCode)){
            //忽略大小写比较
            //验证码正确
            //判断用户名和密码是否一致
            if("zhangsan".equals(username) && "123".equals(password)){//需要调用UserDao查询数据库
                //登录成功
                //存储信息，用户信息
                session.setAttribute("user",username);
                //重定向到success.jsp
                response.sendRedirect(request.getContextPath()+"/success.jsp");
            }else{
                //登录失败
                //存储提示信息到request
                request.setAttribute("login_error","用户名或密码错误");
                //转发到登录页面
                request.getRequestDispatcher("/login.jsp").forward(request,response);
            }


        }else{
            //验证码不一致
            //存储提示信息到request
            request.setAttribute("cc_error","验证码错误");
            //转发到登录页面
            request.getRequestDispatcher("/login.jsp").forward(request,response);

        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}

```
4. 成功访问
```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

    <h1><%=request.getSession().getAttribute("user")%>,欢迎您</h1>

</body>
</html>

```
# -----------------------------------------------------------------------------
# 1. JSP
## 1.1 概念：
* `Java Server Pages`： java服务器端页面
	* 可以理解为：一个特殊的页面，其中既可以指定定义`html`标签，又可以定义`java`代码
	* 用于简化书写


## 1.2 原理
* `JSP`本质上就是一个`Servlet`
![Alt Text](/images/posts/202103211511175.png)

## 1.3 JSP的脚本：JSP定义Java代码的方式
1. `<%  代码 %>`：定义的`java`代码，在`service`方法中。`service`方法中可以定义什么，该脚本中就可以定义什么。
2. `<%! 代码 %>`：定义的`java`代码，在`jsp`转换后的`java`类的成员位置。
3. `<%= 代码 %>`：定义的`java`代码，会输出到页面上。输出语句中可以定义什么，该脚本中就可以定义什么。


## 1.4 JSP的内置对象：
* 在`jsp`页面中不需要获取和创建，可以直接使用的对象
* `jsp`一共有9个内置对象（其中三个）
	* `request`
	* `response`
	* `out`：字符输出流对象。可以将数据输出到页面上。和`response.getWriter()`类似
		* `response.getWriter()`和`out.write()`的区别：
			* 在`tomcat`服务器真正给客户端做出响应之前，会先找`response`缓冲区数据，再找`out`缓冲区数据。
			* `response.getWriter()`数据输出永远在`out.write()`之前
			
```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
      <%
        System.out.println("hello jsp");
        int i = 5;
        String contextPath = request.getContextPath();
        out.print(contextPath);
      %>
      <%!
        int i = 3;
      %>
      <%= "hello" %>
      System.out.println("hello jsp");
      <h1>hi~ jsp!</h1>
      <% response.getWriter().write("response....."); %>
  </body>
</html>

```
## 1.5 指令
### 1.5.1 作用：
- 用于配置JSP页面，导入资源文件
### 1.5.2 格式：
- `<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ... %>`
### 1.5.3 分类：
#### 1. `page`： 配置`JSP`页面的
* `contentType`：等同于`response.setContentType()`
	1. 设置响应体的`mime`类型以及字符集
	2. 设置当前`jsp`页面的编码（只能是高级的IDE才能生效，如果使用低级工具，则需要设置`pageEncoding`属性设置当前页面的字符集）
* `import`：导包
* `errorPage`：当前页面发生异常后，会自动跳转到指定的错误页面
* `isErrorPage`：标识当前也是是否是错误页面。
	* `true`：是，可以使用内置对象`exception`
	* `false`：否。默认值。不可以使用内置对象`exception`

#### 2. `include`	： 页面包含的。导入页面的资源文件
* `<%@include file="top.jsp"%>`
#### 3. `taglib`	： 导入资源
* `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`
	* `prefix`：前缀，自定义的
	
```java
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=gbk" errorPage="500.jsp" pageEncoding="GBK" language="java" buffer="16kb" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>$Title$</title>
</head>
<body>
<%
    List list = new ArrayList();
    int i = 3 / 0;
%>
</body>
</html>
```

## 1.6 注释:
1. html注释：
	`<!-- -->`:只能注释html代码片段
2. jsp注释：推荐使用
	`<%-- --%>`：可以注释所有


## 1.7 内置对象
* 在jsp页面中不需要创建，直接使用的对象
* 一共有9个：
		
|变量名  |真实类型|作用|
|--|--|--|
|pageContext| PageContext|当前页面共享数据，还可以获取其他八个内置对象| 
|request|HttpServletRequest|一次请求访问的多个资源(转发)|
|session|HttpSession|一次会话的多个请求间|
|application|ServletContext|所有用户间共享数据
|response|HttpServletResponse|响应对象|
|page|Object|当前页面(Servlet)的对象  this|
|out|JspWriter|输出对象，数据输出到页面上|
|config|ServletConfig|Servlet的配置对象|
|exception|Throwable|异常对象|

# 2. MVC：开发模式	
## 2.1. jsp演变历史
1. 早期只有`servlet`，只能使用`response`输出标签数据，非常麻烦
2. 后来又`jsp`，简化了`Servlet`的开发，如果过度使用`jsp`，在`jsp`中即写大量的`java`代码，有写`html`表，造成难于维护，难于分工协作
3. 再后来，`java`的`web`开发，借鉴`mvc`开发模式，使得程序的设计更加合理性

## 2.2 MVC
- （django利用了该模式     [网址](https://blog.csdn.net/Slience_me/article/details/109277480)）：
![Alt Text](/images/posts/20210323172811407.png)

1. M：`Model`，模型。`JavaBean`
	* 完成具体的业务操作，如：查询数据库，封装对象
2. V：`View`，视图。`JSP`
	* 展示数据
3. C：`Controller`，控制器。`Servlet`
	* 获取用户的输入
	* 调用模型
	* 将数据交给视图进行展示
 - 优点：
	1. 耦合性低，方便维护，可以利于分工协作
	2. 重用性高
- 缺点：
	1. 使得项目架构变得复杂，对开发人员要求高





# 3. EL表达式
## 3.1 概念：
- `Expression Language` 表达式语言
## 3.2 作用：
- 替换和简化`jsp`页面中`java`代码的编写
## 3.3 语法：
- `${表达式}`
## 3.4 注意：
* `jsp`默认支持`el`表达式的。如果要忽略el表达式
	1. 设置`jsp`中`page`指令中：`isELIgnored="true"` 忽略当前`jsp`页面中所有的`el`表达式
	2. `\${表达式}` ：忽略当前这个`el`表达式

```java
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java"   %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    ${3 > 4}
    \${3 > 4}
</body>
</html>
```

## 3.5 使用：
### 3.5.1 运算：
#### 1. 运算符：
1. 算数运算符： `+ - * /(div) %(mod)`
2. 比较运算符： `> < >= <= == !=`
3. 逻辑运算符： `&&(and) ||(or) !(not)`
4. 空运算符： `empty`
* 功能：用于判断字符串、集合、数组对象是否为`null`或者长度是否为`0`
* `${empty list}`:判断字符串、集合、数组对象是否为`null`或者长度为`0`
* `${not empty str}`:表示判断字符串、集合、数组对象是否不为`null` 并且 `长度>0`

```java

<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java"   %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    ${3 > 4}
    \${3 > 4}
<hr>
    <h3>算数运算符</h3>
    ${3 + 4}<br>
    ${3 / 4}<br>
    ${3 div 4}<br>
    ${3 % 4}<br>
    ${3 mod 4}<br>
    
    <h3>比较运算符</h3>
    ${3 == 4}<br>

    <h3>逻辑运算符</h3>
    ${3 > 4  && 3 < 4}<br>
    ${3 > 4  and 3 < 4}<br>

    <h4>empty运算符</h4>
<%
    String str = "";
    request.setAttribute("str",str);

    List list = new ArrayList();
    request.setAttribute("list",list);
%>
    ${not empty str}
    ${not empty list}
</body>
</html>
```


#### 2. 获取值
1. `el`表达式只能从域对象中获取值
2. 语法：
	1. `${域名称.键名}`：从指定域中获取指定键的值
		 域名称：
		1. `pageScope`		--> `pageContext`
		2. `requestScope` 	--> `request`
		3. `sessionScope` 	--> `session`
		4. `applicationScope` --> `application（ServletContext）`
			* 举例：在`request`域中存储了`name=张三`
			* 获取：`${requestScope.name}`

	3. `${键名}`：表示依次从最小的域中查找是否有该键对应的值，直到找到为止。
```java
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>el获取域中的数据</title>
</head>
<body>
    <%
        //在域中存储数据
        session.setAttribute("name","李四");
        request.setAttribute("name","张三");
        session.setAttribute("age","23");
        request.setAttribute("str","");
    %>
<h3>el获取值</h3>
${requestScope.name}
${sessionScope.age}
${sessionScope.haha}
${name}
${sessionScope.name}

</body>
</html>

```

3. 获取对象、`List`集合、`Map`集合的值
	1. 对象：`${域名称.键名.属性名}`
		 本质上会去调用对象的`getter`方法
	2. `List`集合：`${域名称.键名[索引]}`
	3. `Map`集合：
		* `${域名称.键名.key名称}`
		* `${域名称.键名["key名称"]}`
```java
package xyz.slienceme.domain;
import java.text.SimpleDateFormat;
import java.util.Date;

public class User {

    private String name;
    private int age;
    private Date birthday;

    public User(String name, int age, Date birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }
    public User() {
    }

    /**
     * 逻辑视图
     * @return
     */
    public String getBirStr(){

        if(birthday != null){
            //1.格式化日期对象
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            //2.返回字符串即可
            return sdf.format(birthday);

        }else{
            return "";
        }
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}

```

```java
<%@ page import="xyz.slienceme.domain.User" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>el获取数据</title>
</head>
<body>

    <%
        User user = new User();
        user.setName("张三");
        user.setAge(23);
        user.setBirthday(new Date());


        request.setAttribute("u",user);


        List list = new ArrayList();
        list.add("aaa");
        list.add("bbb");
        list.add(user);

        request.setAttribute("list",list);


        Map map = new HashMap();
        map.put("sname","李四");
        map.put("gender","男");
        map.put("user",user);

        request.setAttribute("map",map);

    %>

<h3>el获取对象中的值</h3>
${requestScope.u}<br>

<%--
    * 通过的是对象的属性来获取
        * setter或getter方法，去掉set或get，在将剩余部分，首字母变为小写。
        * setName --> Name --> name
--%>

    ${requestScope.u.name}<br>
    ${u.age}<br>
    ${u.birthday}<br>
    ${u.birthday.month}<br>

    ${u.birStr}<br>

    <h3>el获取List值</h3>
    ${list}<br>
    ${list[0]}<br>
    ${list[1]}<br>
    ${list[10]}<br>

    ${list[2].name}

    <h3>el获取Map值</h3>
    ${map.gender}<br>
    ${map["gender"]}<br>
    ${map.user.name}

</body>
</html>

```

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>el隐式对象</title>
</head>
<body>

    ${pageContext.request}<br>
    <h4>在jsp页面动态获取虚拟目录</h4>
    ${pageContext.request.contextPath}
<%
%>
</body>
</html>
```
![Alt Text](/images/posts/2021032318195842.png)
#### 3. 隐式对象：
* `el`表达式中有11个隐式对象
* `pageContext`：
	* 获取`jsp`其他八个内置对象
		* `${pageContext.request.contextPath}`：动态获取虚拟目录

# 4. JSTL
## 4.1 概念：
- `JavaServer Pages Tag Library`  JSP标准标签库
	* 是由Apache组织提供的开源的免费的jsp标签<标签>
	
##  4.2 作用：
- 用于简化和替换jsp页面上的java代码		
	
## 4.3 使用步骤：
1. 导入`jstl`相关`jar`包
2. 引入标签库：`taglib`指令：  `<%@ taglib %>`
3. 使用标签
	
## 4.4 常用的JSTL标签
1. `if`:相当于java代码的if语句
```java
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>if标签</title>
</head>
<body>
    <%--
    c:if标签
        1. 属性：
            * test 必须属性，接受boolean表达式
                * 如果表达式为true，则显示if标签体内容，如果为false，则不显示标签体内容
                * 一般情况下，test属性值会结合el表达式一起使用

        2. 注意：c:if标签没有else情况，想要else情况，则可以在定义一个c:if标签
        
    --%>
    <c:if test="true">
        <h1>我是真...</h1>
    </c:if>
    <br>
    <%
        //判断request域中的一个list集合是否为空，如果不为null则显示遍历集合
        List list = new ArrayList();
        list.add("aaaa");
        request.setAttribute("list",list);
        request.setAttribute("number",4);
    %>
    <c:if test="${not empty list}">
        遍历集合...
    </c:if>
    <br>
    <c:if test="${number % 2 != 0}">
            ${number}为奇数
    </c:if>
    <c:if test="${number % 2 == 0}">
        ${number}为偶数
    </c:if>
</body>
</html>
```
![Alt Text](/images/posts/2021032318523720.png)

 
2. `choose`:相当于`java`代码的`switch`语句

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>choose标签</title>
</head>
<body>
    <%--
        完成数字编号对应星期几案例
            1.域中存储一数字
            2.使用choose标签取出数字         相当于switch声明
            3.使用when标签做数字判断         相当于case
            4.otherwise标签做其他情况的声明  相当于default
    --%>
    <%
        request.setAttribute("number",51);
    %>
    <c:choose>
        <c:when test="${number == 1}">星期一</c:when>
        <c:when test="${number == 2}">星期二</c:when>
        <c:when test="${number == 3}">星期三</c:when>
        <c:when test="${number == 4}">星期四</c:when>
        <c:when test="${number == 5}">星期五</c:when>
        <c:when test="${number == 6}">星期六</c:when>
        <c:when test="${number == 7}">星期天</c:when>
        <c:otherwise>数字输入有误</c:otherwise>
    </c:choose>
</body>
</html>
```

3. `foreach`:相当于`java`代码的`for`语句

```java
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>foreach标签</title>
</head>
<body>

<%--
    foreach:相当于java代码的for语句
        1. 完成重复的操作
            for(int i = 0; i < 10; i ++){

            }
            * 属性：
                begin：开始值
                end：结束值
                var：临时变量
                step：步长
                varStatus:循环状态对象
                    index:容器中元素的索引，从0开始
                    count:循环次数，从1开始
        2. 遍历容器
            List<User> list;
            for(User user : list){
            }
            * 属性：
                items:容器对象
                var:容器中元素的临时变量
                varStatus:循环状态对象
                    index:容器中元素的索引，从0开始
                    count:循环次数，从1开始


--%>
<c:forEach begin="1" end="10" var="i" step="2" varStatus="s">
    ${i} <h3>${s.index}<h3> <h4> ${s.count} </h4><br>

</c:forEach>
    <hr>
    <%
        List list = new ArrayList();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");
        request.setAttribute("list",list);
    %>
    <c:forEach items="${list}" var="str" varStatus="s">
            ${s.index} ${s.count} ${str}<br>
    </c:forEach>
</body>
</html>
```

	
## 4.5 练习：
* 需求：在request域中有一个存有User对象的List集合。需要使用jstl+el将list集合数据展示到jsp页面的表格table中

```java
<%@ page import="xyz.slienceme.domain.User" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <title>test</title>
</head>
<body>
<%
    List list = new ArrayList();
    list.add(new User("张三",23,new Date()));
    list.add(new User("李四",24,new Date()));
    list.add(new User("王五",25,new Date()));
    request.setAttribute("list",list);
%>
<table border="1" width="500" align="center">
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>生日</th>
    </tr>
    <%--数据行--%>
    <c:forEach items="${list}" var="user" varStatus="s">

        <c:if test="${s.count % 2 != 0}">

            <tr bgcolor="red">
                <td>${s.count}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.birStr}</td>
            </tr>
        </c:if>

        <c:if test="${s.count % 2 == 0}">

            <tr  bgcolor="green">
                <td>${s.count}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.birStr}</td>
            </tr>
        </c:if>
    </c:forEach>
</table>
</body>
</html>
```
![Alt Text](/images/posts/20210323185808823.png)

# 5.  三层架构：软件设计架构
1. 界面层(表示层)：用户看的得界面。用户可以通过界面上的组件和服务器进行交互
2. 业务逻辑层：处理业务逻辑的。
3. 数据访问层：操作数据存储文件。








# 案例：用户信息列表展示
## 1. 需求：用户信息的增删改查操作
## 2. 设计：
1. 技术选型：`Servlet+JSP+MySQL+JDBCTempleat+Duird+BeanUtilS+tomcat`
2. 数据库设计：
	
~~~sql
create database day17; -- 创建数据库
		use day17; 			   -- 使用数据库
		create table user(   -- 创建表
			id int primary key auto_increment,
			name varchar(20) not null,
			gender varchar(5),
			age int,
			address varchar(32),
			qq	varchar(20),
			email varchar(50)
		);
~~~	

## 3. 开发：
1. 环境搭建
	1. 创建数据库环境
	2. 创建项目，导入需要的jar包

2. 编码
## 4. 测试
## 5. 部署运维























