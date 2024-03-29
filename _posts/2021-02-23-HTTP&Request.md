---
layout: post
title: Java｜HTTP&Request
categories: [Java]
description: HTTP&Request
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# HTTP：
## 1.  概念：Hyper Text Transfer Protocol 超文本传输协议
* 传输协议：定义了，客户端和服务器端通信时，发送数据的格式
* 特点：
	1. 基于TCP/IP的高级协议
	2. 默认端口号:80
	3. 基于请求/响应模型的:一次请求对应一次响应
	4. 无状态的：每次请求之间相互独立，不能交互数据

* 历史版本：
	* 1.0：每一次请求响应都会建立新的连接
	* 1.1：复用连接

## 2. 请求消息数据格式
### 2.1 请求行
- 请求方式 请求`url` 请求协议/版本
- `GET /login.html	HTTP/1.1`

* 请求方式：
	* `HTTP`协议有7中请求方式，常用的有2种
		* `GET`：
			1. 请求参数在请求行中，在`url`后。
			2. 请求的`url`长度有限制的
			3. 不太安全
		* `POST`：
			1. 请求参数在请求体中
			2. 请求的`url`长度没有限制的
			3. 相对安全
### 2.2 请求头：客户端浏览器告诉服务器一些信息
请求头名称: 请求头值

 常见的请求头：
1. `User-Agent`：浏览器告诉服务器，我访问你使用的浏览器版本信息
	
	 可以在服务器端获取该头的信息，解决浏览器的兼容性问题

2. `Referer`：`http://localhost/login.html`
 
	 告诉服务器，我(当前请求)从哪里来？
	 
	 作用：
	1. 防盗链：
	2. 统计工作：
![Alt Text](/images/posts/20210222155745926.bmp.jpg)

### 2.3 请求空行
- 空行，就是用于分割`POST`请求的请求头，和请求体的。
### 2.4 请求体(正文)：
* 封装`POST`请求消息的请求参数的

* 字符串格式：
```
POST /login.html	HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://localhost/login.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1

username=zhangsan	
```


## 3. 响应消息数据格式
## 3.1 Request：
![Alt Text](/images/posts/20210222160701981.png)
### 3.1.1 request对象和response对象的原理
1. `request`和`response`对象是由服务器创建的。我们来使用它们
2. `request`对象是来获取请求消息，`response`对象是来设置响应消息

### 3.1.2 request对象继承体系结构：	

| ||
|--|--|
| ServletRequest		 |接口  |
|	继承
| HttpServletRequest	  | 接口  |
|	实现

- `org.apache.catalina.connector.RequestFacade@5b3cad0e`
- `org.apache.catalina.connector.RequestFacade 类(tomcat)`

### 3.1.3 request功能：

#### 3.1.3.1 获取请求消息数据
##### 1. 获取请求行数据
* `GET /day14/demo1?name=zhangsan HTTP/1.1`
* 方法：
	1. 获取请求方式 ：`GET`
		 `String getMethod()`  
	2. `(*)`获取虚拟目录：`/day14`
		 `String getContextPath()`
	3. 获取`Servlet`路径: `/demo1`
		 `String getServletPath()`
	4. 获取`get`方式请求参数：`name=zhangsan`
		 `String getQueryString()`
	5. `(*)`获取请求URI：`/day14/demo1`
		 `String getRequestURI():	/day14/demo1`
		 `StringBuffer getRequestURL()  :http://localhost/day14/demo1`

		 `URL`:统一资源定位符 ： `http://localhost/day14/demo1	中华人民共和国`（范围小）
		 `URI`:统一资源标识符 : `/day14/demo1	   共和国`(范围大)
	
	6. 获取协议及版本：`HTTP/1.1`
		 `String getProtocol()`

	7. 获取客户机的IP地址：
		 `String getRemoteAddr()`
```java
package com.example.request;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 演示Request对象获取请求行数据
 */

@WebServlet("/requestDemo1")
public class RequestDemo1 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*
            1. 获取请求方式 ：GET
                * String getMethod()
            2. (*)获取虚拟目录：/day14
                * String getContextPath()
            3. 获取Servlet路径: /requestDemo1
                * String getServletPath()
            4. 获取get方式请求参数：name=zhangsan
                * String getQueryString()
            5. (*)获取请求URI：/day14/demo1
                * String getRequestURI():		/day14/requestDemo1
                * StringBuffer getRequestURL()  :http://localhost/day14/requestDemo1
            6. 获取协议及版本：HTTP/1.1
                * String getProtocol()

            7. 获取客户机的IP地址：
                * String getRemoteAddr()

         */
        //1. 获取请求方式 ：GET
        String method = request.getMethod();
        System.out.println(method);
        //2.(*)获取虚拟目录：/day14
        String contextPath = request.getContextPath();
        System.out.println(contextPath);
        //3. 获取Servlet路径: /demo1
        String servletPath = request.getServletPath();
        System.out.println(servletPath);
        //4. 获取get方式请求参数：name=zhangsan
        String queryString = request.getQueryString();
        System.out.println(queryString);
        //5.(*)获取请求URI：/day14/demo1
        String requestURI = request.getRequestURI();
        StringBuffer requestURL = request.getRequestURL();
        System.out.println(requestURI);
        System.out.println(requestURL);
        //6. 获取协议及版本：HTTP/1.1
        String protocol = request.getProtocol();
        System.out.println(protocol);
        //7. 获取客户机的IP地址：
        String remoteAddr = request.getRemoteAddr();
        System.out.println(remoteAddr);
    }
}
/*
		GET
		/day14
		/requestDemo1
		name=zhangsan
		/day14/requestDemo1
		http://localhost:8080/day14/requestDemo1
		HTTP/1.1
		0:0:0:0:0:0:0:1
*/
```

		
##### 2. 获取请求头数据
* 方法：
	* `(*)String getHeader(String name)`:通过请求头的名称获取请求头的值
	* `Enumeration<String> getHeaderNames():`获取所有的请求头名称
```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@WebServlet("/requestDemo2")
public class RequestDemo2 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //演示获取请求头数据
        
        //1.获取所有请求头名称
        Enumeration<String> headerNames = request.getHeaderNames();
        //2.遍历
        while(headerNames.hasMoreElements()){
            String name = headerNames.nextElement();
            //根据名称获取请求头的值
            String value = request.getHeader(name);
            System.out.println(name+"---"+value);
        }

    }
}
```
```java
package com.example.request;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@WebServlet("/requestDemo3")
public class RequestDemo3 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //演示获取请求头数据:user-agent

        String agent = request.getHeader("user-agent");
        //判断agent的浏览器版本
        if(agent.contains("Chrome")){
            //谷歌
            System.out.println("谷歌来了...");
        }else if(agent.contains("Firefox")){
            //火狐
            System.out.println("火狐来了...");
        }
    }
}
```
```java
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/requestDemo4")
public class RequestDemo4 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //演示获取请求头数据:referer

        String referer = request.getHeader("referer");
        System.out.println(referer);//http://localhost/day14/login.html

        //防盗链
        if(referer != null ){
            if(referer.contains("/day14")){
                //正常访问
               // System.out.println("播放电影....");
                response.setContentType("text/html;charset=utf-8");
                response.getWriter().write("播放电影....");
            }else{
                //盗链
                //System.out.println("想看电影吗？来优酷吧...");
                response.setContentType("text/html;charset=utf-8");
                response.getWriter().write("想看电影吗？来优酷吧...");
            }
        }

    }
}
```

##### 3. 获取请求体数据:
* 请求体：只有`POST`请求方式，才有请求体，在请求体中封装了`POST`请求的请求参数
* 步骤：
	1. 获取流对象
		  `BufferedReader getReader()`：获取字符输入流，只能操作字符数据
		  `ServletInputStream getInputStream()`：获取字节输入流，可以操作所有类型数据
			

	2. 再从流对象中拿数据
	
	
#### 3.1.3.2 其他功能：
##### 1. 获取请求参数通用方式：不论get还是post请求方式都可以使用下列方法来获取请求参数
1. `String getParameter(String name)`:根据参数名称获取参数值    `username=zs&password=123`
2. `String[] getParameterValues(String name)`:根据参数名称获取参数值的数组  `hobby=xx&hobby=game`
3. `Enumeration<String> getParameterNames()`:获取所有请求的参数名称
4. `Map<String,String[]> getParameterMap()`:获取所有参数的`map`集合

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Map;
import java.util.Set;

@WebServlet("/requestDemo6")
public class RequestDemo6 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //post 获取请求参数

        //根据参数名称获取参数值
        String username = request.getParameter("username");

        //根据参数名称获取参数值的数组
        String[] hobbies = request.getParameterValues("hobby");
        /*for (String hobby : hobbies) {
            System.out.println(hobby);
        }*/

        //获取所有请求的参数名称

        Enumeration<String> parameterNames = request.getParameterNames();
        /*while(parameterNames.hasMoreElements()){
            String name = parameterNames.nextElement();
            System.out.println(name);
            String value = request.getParameter(name);
            System.out.println(value);
            System.out.println("----------------");
        }*/

        // 获取所有参数的map集合
        Map<String, String[]> parameterMap = request.getParameterMap();
        //遍历
        Set<String> keyset = parameterMap.keySet();
        for (String name : keyset) {

            //获取键获取值
            String[] values = parameterMap.get(name);
            System.out.println(name);
            for (String value : values) {
                System.out.println(value);
            }

            System.out.println("-----------------");
        }


    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}
```

* 中文乱码问题：
	* `get`方式：`tomcat 8` 已经将`get`方式乱码问题解决了
	 * `post`方式：会乱码
		* 解决：在获取参数前，设置`request`的编码`request.setCharacterEncoding("utf-8");`
```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/requestDemo7")
public class RequestDemo7 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.设置流的编码
        request.setCharacterEncoding("utf-8");

        //获取请求参数username
        String username = request.getParameter("username");

        System.out.println(username);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.doPost(request,response);
    }
}
```
![Alt Text](/images/posts/20210222173537483.png)

		
##### 2. 请求转发：一种在服务器内部的资源跳转方式
1. 步骤：
	1. 通过`request`对象获取请求转发器对象：`RequestDispatcher getRequestDispatcher(String path)`
	2. 使用`RequestDispatcher`对象来进行转发
	 `forward(ServletRequest request, ServletResponse response)` 

2. 特点：
	1. 浏览器地址栏路径不发生变化
	2. **只能**转发到当前服务器**内部资源**中。
	3. 转发是**一次**请求

```java
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/requestDemo8")
public class RequestDemo8 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("demo8888被访问了。。。");
        //转发到demo9资源
/*
        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/requestDemo9");
        requestDispatcher.forward(request,response);
        */

        //存储数据到request域中
        request.setAttribute("msg","hello");

        request.getRequestDispatcher("/requestDemo9").forward(request,response);
        //request.getRequestDispatcher("https://www.baidu.com").forward(request,response);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.doPost(request,response);
    }
}
```

```java
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/requestDemo9")
public class RequestDemo9 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //获取数据
        Object msg = request.getAttribute("msg");
        System.out.println(msg);

        System.out.println("demo9999被访问了。。。");

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.doPost(request,response);
    }
}
```

##### 3. 共享数据：
* 域对象：一个有作用范围的对象，可以在范围内共享数据
* `request`域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
* 方法：
	1. `void setAttribute(String name,Object obj)`:存储数据
	2. `Object getAttitude(String name)`:通过键获取值
	3. `void removeAttribute(String name)`:通过键移除键值对

##### 4. 获取ServletContext：
* `ServletContext getServletContext()`

```java
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/requestDemo10")
public class RequestDemo10 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        ServletContext servletContext = request.getServletContext();

        System.out.println(servletContext);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        this.doPost(request,response);
    }
}
```


## 案例：用户登录
* 用户登录案例需求：

	1. 编写`login.html`登录页面
	`username & password` 两个输入框
	2. 使用`Druid`数据库连接池技术,操作`mysql，day14`数据库中`user`表
	3. 使用`JdbcTemplate`技术封装`JDBC`
	4. 登录成功跳转到`SuccessServlet`展示：登录成功！用户名,欢迎您
	5. 登录失败跳转到`FailServlet`展示：登录失败，用户名或密码错误


* 分析

* 开发步骤

1. **创建项目，导入html页面，配置文件，jar包**
2. **创建数据库环境**
			
```sql
CREATE DATABASE day14;
			USE day14;
			CREATE TABLE USER(
				id INT PRIMARY KEY AUTO_INCREMENT,
				username VARCHAR(32) UNIQUE NOT NULL,
				PASSWORD VARCHAR(32) NOT NULL
			);
```

3. **创建包cn.example.domain,创建类User**			
```java
/**
 * 用户的实体类
 */
public class User {

    private int id;
    private String username;
    private String password;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
		
```
4. **创建包cn.example.util,编写工具类JDBCUtils**
```java
import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * JDBC工具类 使用Durid连接池
 */
public class JDBCUtils {

    private static DataSource ds ;

    static {

        try {
            //1.加载配置文件
            Properties pro = new Properties();
            //使用ClassLoader加载配置文件，获取字节输入流
            InputStream is = JDBCUtils.class.getClassLoader().getResourceAsStream("druid.properties");
            pro.load(is);

            //2.初始化连接池对象
            ds = DruidDataSourceFactory.createDataSource(pro);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取连接池对象
     */
    public static DataSource getDataSource(){
        return ds;
    }


    /**
     * 获取连接Connection对象
     */
    public static Connection getConnection() throws SQLException {
        return  ds.getConnection();
    }
}
```

5. **创建包cn.example.dao,创建类UserDao,提供login方法**
```java		
import cn.example.domain.User;
import cn.example.util.JDBCUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * 操作数据库中User表的类
 */
public class UserDao {

    //声明JDBCTemplate对象共用
    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    /**
     * 登录方法
     * @param loginUser 只有用户名和密码
     * @return user包含用户全部数据,没有查询到，返回null
     */
    public User login(User loginUser){
        try {
            //1.编写sql
            String sql = "select * from user where username = ? and password = ?";
            //2.调用query方法
            User user = template.queryForObject(sql,
                    new BeanPropertyRowMapper<User>(User.class),
                    loginUser.getUsername(), loginUser.getPassword());


            return user;
        } catch (DataAccessException e) {
            e.printStackTrace();//记录日志
            return null;
        }
    }
}
		
```

6. **编写cn.example.web.servlet.LoginServlet类**
```java
import cn.example.dao.UserDao;
import cn.example.domain.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.设置编码
        req.setCharacterEncoding("utf-8");
        //2.获取请求参数
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        //3.封装user对象
        User loginUser = new User();
        loginUser.setUsername(username);
        loginUser.setPassword(password);

        //4.调用UserDao的login方法
        UserDao dao = new UserDao();
        User user = dao.login(loginUser);

        //5.判断user
        if(user == null){
            //登录失败
            req.getRequestDispatcher("/failServlet").forward(req,resp);
        }else{
            //登录成功
            //存储数据
            req.setAttribute("user",user);
            //转发
            req.getRequestDispatcher("/successServlet").forward(req,resp);
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}			
```
7. **编写FailServlet和SuccessServlet类**
```java
@WebServlet("/successServlet")
public class SuccessServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取request域中共享的user对象
        User user = (User) request.getAttribute("user");

        if(user != null){
            //给页面写一句话

            //设置编码
            response.setContentType("text/html;charset=utf-8");
            //输出
            response.getWriter().write("登录成功！"+user.getUsername()+",欢迎您");
        }


    }		


@WebServlet("/failServlet")
public class FailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //给页面写一句话

        //设置编码
        response.setContentType("text/html;charset=utf-8");
        //输出
        response.getWriter().write("登录失败，用户名或密码错误");

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request,response);
    }
}
```

8. `login.html`中`form`表单的`action`路径的写法

	* `虚拟目录+Servlet的资源路径`

9. `BeanUtils`工具类，简化数据封装
	* 用于封装`JavaBean`的
	1. `JavaBean`：标准的`Java`类
		1. 要求：
			1. 类必须被`public`修饰
			2. 必须提供空参的构造器
			3. 成员变量必须使用`private`修饰
			4. 提供公共`setter`和`getter`方法
		2. 功能：封装数据


	2. 概念：
		成员变量：
		属性：`setter`和`getter`方法截取后的产物
			例如：`getUsername() --> Username--> username`


	3. 方法：
		1. `setProperty()`
		2. `getProperty()`
		3. `populate(Object obj , Map map):`将`map`集合的键值对信息，封装到对应的`JavaBean`对象中

```java
package com.example.web.servlet;
import com.example.damain.User;
import com.example.dao.UserDao;
import org.apache.commons.beanutils.BeanUtils;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("utf-8");
        //2.获取所有请求参数
        Map<String, String[]> map = req.getParameterMap();
        //3.创建User对象
        User loginUser = new User();
        //3.2 使用BeanUtils封装
        try {
            BeanUtils.populate(loginUser,map);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        UserDao dao = new UserDao();
        User user = dao.login(loginUser);

        if(user == null){
            req.getRequestDispatcher("/failServlet").forward(req,resp);
        }else{
            req.setAttribute("user",user);
            req.getRequestDispatcher("/successServlet").forward(req,resp);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}

```

```java
public class BeanUtilsTest {

    @Test
    public void test(){

        User user = new User();
        try {
            BeanUtils.setProperty(user,"hehe","male");
            System.out.println(user);

            String gender = BeanUtils.getProperty(user, "hehe");
            System.out.println(gender);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
}

```

