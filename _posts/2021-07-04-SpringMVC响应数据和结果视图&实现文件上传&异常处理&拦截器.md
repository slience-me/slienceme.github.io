---
layout: post
title: Java｜SpringMVC&实现文件上传&异常处理&拦截器
categories: [Java]
description: SpringMVC响应数据和结果视图&实现文件上传&异常处理&拦截器
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# springmvc
## 1. 响应数据和结果视图
### 1.1 返回值分类
#### 1.1.1 返回字符串
1. `Controller`方法返回字符串可以指定逻辑视图的名称，根据视图解析器为物理视图的地址。

```html
<a href="user/testString" >testString</a>
```
```java
/**
 * 返回String
 * @param model
 * @return
 */
@RequestMapping("/testString")
public String testString(Model model){
    System.out.println("testString方法执行了...");
    // 模拟从数据库中查询出User对象
    User user = new User();
    user.setUsername("美美");
    user.setPassword("123");
    user.setAge(30);
    // model对象
    model.addAttribute("user",user);
    return "success";
}
```
#### 1.1.2 返回值是void
1. 如果控制器的方法返回值编写成`void`，执行程序报404的异常，默认查找JSP页面没有找到。
	1. 默认会跳转到`@RequestMapping(value="/testVoid") testVoid.jsp`的页面。
2. 可以使用请求转发或者重定向跳转到指定的页面
```java
/**
* 是void
 * 请求转发一次请求，不用编写项目的名称
 */
@RequestMapping("/testVoid")
public void testVoid(HttpServletRequest request, HttpServletResponse response) throws Exception {
    System.out.println("testVoid方法执行了...");
    
    // 编写请求转发的程序
    request.getRequestDispatcher("/WEB-INF/pages/success.jsp").forward(request,response);

    // 重定向
    response.sendRedirect(request.getContextPath()+"/index.jsp");

    // 设置中文乱码
    response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");

    // 直接会进行响应
    response.getWriter().print("你好");
}
```
- WEB-INF可以转发进去，但是不能直接重定向进去
#### 1.1.3 返回值是ModelAndView对象
1. `ModelAndView`对象是`Spring`提供的一个对象，可以用来调整具体的`JSP`视图
2. 具体的代码如下

```java
/**
* 返回ModelAndView对象
* 可以传入视图的名称（即跳转的页面），还可以传入对象。
* @return
* @throws Exception
*/
@RequestMapping("/testModelAndView")
public ModelAndView testModelAndView(){
    // 创建ModelAndView对象
    ModelAndView mv = new ModelAndView();
    System.out.println("testModelAndView方法执行了...");
    // 模拟从数据库中查询出User对象
    User user = new User();
    user.setUsername("小凤");
    user.setPassword("456");
    user.setAge(30);

    // 把user对象存储到mv对象中，也会把user对象存入到request对象
    mv.addObject("user",user);

    // 跳转到哪个页面
    mv.setViewName("success");

    return mv;
}
```
![Alt Text](/images/posts/20210703171623727.png)
![Alt Text](/images/posts/20210703171610909.png)


### 1.2 SpringMVC框架提供的转发和重定向
#### 1.2.1 forward请求转发
1. `controller`方法返回`String`类型，想进行请求转发也可以编写成

```java
/**
* 使用forward关键字进行请求转发
* "forward:转发的JSP路径"，不走视图解析器了，所以需要编写完整的路径
* @return
* @throws Exception
*/
@RequestMapping("/testForward")
public String testForwardOrRedirect(){
    System.out.println("testForward方法执行了...");

    // 请求的转发
    return "forward:/WEB-INF/pages/success.jsp";
}
```

#### 1.2.2 redirect重定向
1. controller方法返回String类型，想进行重定向也可以编写成

```java
/**
 * 使用关键字的方式进行重定向
 * @return
 */
@RequestMapping("/testRedirect")
public String testForwardOrRedirect(){
    System.out.println("testRedirect方法执行了...");
    
    // 重定向
    return "redirect:/index.jsp";
}
```

### 1.3 ResponseBody响应json数据
1. `DispatcherServlet`会拦截到所有的资源，导致一个问题就是静态资源`（img、css、js）`也会被拦截到，从而不能被使用。解决问题就是需要配置静态资源不进行拦截，在`springmvc.xml`配置文件添加如下配置
	1. `mvc:resources`标签配置不过滤
		1. `location`元素表示`webapp`目录下的包下的所有文件
		2. `mapping`元素表示以`/static`开头的所有请求路径，如`/static/a` 或者`/static/a/b`

```xml
<!-- 设置静态资源不过滤 -->
<mvc:resources location="/css/" mapping="/css/**"/> <!-- 样式 -->
<mvc:resources location="/images/" mapping="/images/**"/> <!-- 图片 -->
<mvc:resources location="/js/" mapping="/js/**"/> <!-- javascript -->
```
2. 使用`@RequestBody`获取请求体数据
3. 使用`@RequestBody`注解把`json`的字符串转换成`JavaBean`的对象
```js
// 页面加载，绑定单击事件
$(function(){
    $("#btn").click(function(){
        // alert("hello btn");
        // 发送ajax请求
        $.ajax({
            // 编写json格式，设置属性和值
            url:"user/testAjax",
            contentType:"application/json;charset=UTF-8",
            data:'{"username":"hehe","password":"123","age":30}',
            dataType:"json",
            type:"post",
            success:function(data){
                // data服务器端响应的json的数据，进行解析
                alert(data);
                alert(data.username);
                alert(data.password);
                alert(data.age);
            }
        });

    });
});
```
```java
/**
 * 模拟异步请求响应
 */
@RequestMapping("/testAjax")
public @ResponseBody User testAjax(@RequestBody User user){
    System.out.println("testAjax方法执行了...");
    // 客户端发送ajax的请求，传的是json字符串，后端把json字符串封装到user对象中
    System.out.println(user);
    // 做响应，模拟查询数据库
    user.setUsername("haha");
    user.setAge(40);
    // 做响应
    return user;
}
```
![Alt Text](/images/posts/20210703173904578.png)



4. 使用`@ResponseBody`注解把`JavaBean`对象转换成`json`字符串，直接响应
	1. 要求方法需要返回`JavaBean`的对象
```java
 /**
  * 模拟异步请求响应
  */
 @RequestMapping("/testAjax")
 public @ResponseBody User testAjax(@RequestBody User user){
     System.out.println("testAjax方法执行了...");
     // 客户端发送ajax的请求，传的是json字符串，后端把json字符串封装到user对象中
     System.out.println(user);
     // 做响应，模拟查询数据库
     user.setUsername("haha");
     user.setAge(40);
     // 做响应
     return user;
 }
```
![Alt Text](/images/posts/20210703174207988.png)

5. `json`字符串和JavaBean对象互相转换的过程中，需要使用`jackson的jar`包

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.0</version>
</dependency>
```

## 2. 文件上传
### 2.1 文件上传的回顾
1. 导入文件上传的jar包

```xml
<dependency>
	<groupId>commons-fileupload</groupId>
	<artifactId>commons-fileupload</artifactId>
	<version>1.3.1</version>
</dependency>
<dependency>
	<groupId>commons-io</groupId>
	<artifactId>commons-io</artifactId>
	<version>2.4</version>
</dependency>
```
2. 编写文件上传的JSP页面

```html

<h3>文件上传</h3>

<form action="user/fileupload" method="post" enctype="multipart/form-data">
	选择文件：<input type="file" name="upload"/><br/>
	<input type="submit" value="上传文件"/>
</form>

```
3. 编写文件上传的Controller控制器

```java
/**
* 文件上传
* @throws Exception
*/
@RequestMapping(value="/fileupload")
public String fileupload(HttpServletRequest request) throws Exception {
	// 先获取到要上传的文件目录
	String path = request.getSession().getServletContext().getRealPath("/uploads");
	// 创建File对象，一会向该路径下上传文件
	File file = new File(path);
	// 判断路径是否存在，如果不存在，创建该路径
	if(!file.exists()) {
		file.mkdirs();
	}
	// 创建磁盘文件项工厂
	DiskFileItemFactory factory = new DiskFileItemFactory();
	ServletFileUpload fileUpload = new ServletFileUpload(factory);
	// 解析request对象
	List<FileItem> list = fileUpload.parseRequest(request);
	// 遍历
	for (FileItem fileItem : list) {
		// 判断文件项是普通字段，还是上传的文件
		if(fileItem.isFormField()) {
		} else {
			// 上传文件项
			// 获取到上传文件的名称
			String filename = fileItem.getName();
			// 上传文件
			fileItem.write(new File(file, filename));
			// 删除临时文件
			fileItem.delete();
			}
		}
	return "success";
}
```

### 2.2 SpringMVC传统方式文件上传
1. `SpringMVC`框架提供了`MultipartFile`对象，该对象表示上传的文件，要求变量名称必须和表单file标签的
`name`属性名称相同。
2. 代码如下

```java
/**
* SpringMVC方式的文件上传
*
* @param request
* @return
* @throws Exception
*/
@RequestMapping(value="/fileupload2")
public String fileupload2(HttpServletRequest request,MultipartFile upload) throws Exception {
	System.out.println("SpringMVC方式的文件上传...");
	// 先获取到要上传的文件目录
	String path = request.getSession().getServletContext().getRealPath("/uploads");
	// 创建File对象，一会向该路径下上传文件
	File file = new File(path);
	// 判断路径是否存在，如果不存在，创建该路径
	if(!file.exists()) {
		file.mkdirs();
	}
	// 获取到上传文件的名称
	String filename = upload.getOriginalFilename();
	String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
	// 把文件的名称唯一化
	filename = uuid+"_"+filename;
	// 上传文件
	upload.transferTo(new File(file,filename));
	return "success";
}
```
3. 配置文件解析器对象
- `10*1024*1024`
```xml
<!-- 配置文件解析器对象，要求id名称必须是multipartResolver -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
	<property name="maxUploadSize" value="10485760"/>
</bean>
```

### 2.3 SpringMVC跨服务器方式文件上传
1. 搭建图片服务器
	1. 根据文档配置服务器，现在是2个服务器
	2. 导入资料中项目，作为图片服务器使用
2. 实现`SpringMVC`跨服务器方式文件上传
	1. 导入开发需要的jar包
	2. 编写文件上传的JSP页面
	3. 编写控制器
```xml
<dependency>
	<groupId>com.sun.jersey</groupId>
	<artifactId>jersey-core</artifactId>
	<version>1.18.1</version>
</dependency>
<dependency>
	<groupId>com.sun.jersey</groupId>
	<artifactId>jersey-client</artifactId>
	<version>1.18.1</version>
</dependency>
```

```html
<h3>跨服务器的文件上传</h3>
<form action="user/fileupload3" method="post" enctype="multipart/form-data">
选择文件：<input type="file" name="upload"/><br/>
<input type="submit" value="上传文件"/>
</form>
```

```java
/**
* SpringMVC跨服务器方式的文件上传
*
* @param request
* @return
* @throws Exception
*/
@RequestMapping(value="/fileupload3")
public String fileupload3(MultipartFile upload) throws Exception {
	System.out.println("SpringMVC跨服务器方式的文件上传...");
	// 定义图片服务器的请求路径
	String path = "http://localhost:9090/day02_springmvc5_02image/uploads/";
	// 获取到上传文件的名称
	String filename = upload.getOriginalFilename();
	String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
	// 把文件的名称唯一化
	filename = uuid+"_"+filename;
	// 向图片服务器上传文件
	// 创建客户端对象
	Client client = Client.create();
	// 连接图片服务器
	WebResource webResource = client.resource(path+filename);
	// 上传文件
	webResource.put(upload.getBytes());
	return "success";
}
```
## 3. 异常处理器 
### 3.1 异常处理思路
1. `Controller`调用`service`，`service`调用`dao`，异常都是向上抛出的，最终有`DispatcherServlet`找异常处理器进行异常的处理。
### 3.2 SpringMVC的异常处理
1. 自定义异常类

```java
package xyz.slienceme.exception;
public class SysException extends Exception{
private static final long serialVersionUID = 4055945147128016300L;
	
	// 异常提示信息
	private String message;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public SysException(String message) {
		this.message = message;
	}
}
```
2. 自定义异常处理器

```java
package xyz.slienceme.exception;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
/**
* 异常处理器
* @author rt
*/
public class SysExceptionResolver implements HandlerExceptionResolver{
	/**
	* 跳转到具体的错误页面的方法
	*/
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
	Exception ex) {
		ex.printStackTrace();
		SysException e = null;
		// 获取到异常对象
		if(ex instanceof SysException) {
			e = (SysException) ex;
		}else {
			e = new SysException("请联系管理员");
		}
		ModelAndView mv = new ModelAndView();
		// 存入错误的提示信息
		mv.addObject("message", e.getMessage());
		// 跳转的Jsp页面
		mv.setViewName("error");
		return mv;
	}
}
```
3. 配置异常处理器

```xml
<!-- 配置异常处理器 -->
<bean id="sysExceptionResolver" class="xyz.slienceme.exception.SysExceptionResolver"/>
```

## 4. 拦截器
### 4.1 拦截器的概述
1. `SpringMVC`框架中的拦截器用于对处理器进行预处理和后处理的技术。
2. 可以定义拦截器链，连接器链就是将拦截器按着一定的顺序结成一条链，在访问被拦截的方法时，拦截器链中的拦截器会按着定义的顺序执行。
3. 拦截器和过滤器的功能比较类似，有区别
	1. 过滤器是Servlet规范的一部分，任何框架都可以使用过滤器技术。
	2. 拦截器是SpringMVC框架独有的。
	3. 过滤器配置了/*，可以拦截任何资源。
	4. 拦截器只会对控制器中的方法进行拦截。
4. 拦截器也是AOP思想的一种实现方式
5. 想要自定义拦截器，需要实现`HandlerInterceptor`接口。
### 4.2 自定义拦截器步骤
1. 创建类，实现`HandlerInterceptor`接口，重写需要的方法

```java
package xyz.slienceme.demo1;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
/**
* 自定义拦截器1
* @author rt
*/
public class MyInterceptor1 implements HandlerInterceptor{
	/**
	* controller方法执行前，进行拦截的方法
	* return true放行
	* return false拦截
	* 可以使用转发或者重定向直接跳转到指定的页面。
	*/
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
		throws Exception {
			System.out.println("拦截器执行了...");
		return true;
	}
}
```
2. 在`springmvc.xml`中配置拦截器类

```xml
<!-- 配置拦截器 -->
<mvc:interceptors>
	<mvc:interceptor>
		<!-- 哪些方法进行拦截 -->
		<mvc:mapping path="/user/*"/>
		<!-- 哪些方法不进行拦截
		<mvc:exclude-mapping path=""/>
		-->
		<!-- 注册拦截器对象 -->
		<bean class="xyz.slienceme.demo1.MyInterceptor1"/>
	</mvc:interceptor>
</mvc:interceptors>
```

### 4.3 HandlerInterceptor接口中的方法
1. `preHandle`方法是`controller`方法`执行前拦截`的方法
	1. 可以使用request或者response跳转到指定的页面
	2. `return true放行`，执行下一个拦截器，如果没有拦截器，执行controller中的方法。
	3. `return false不放行`，不会执行controller中的方法。
2. `postHandle`是`controller`方法`执行后执行`的方法，在JSP视图执行前。
	1. 可以使用request或者response跳转到指定的页面
	2. 如果指定了跳转的页面，那么controller方法跳转的页面将不会显示。
3. `postHandle`方法是在`JSP执行后执行`
	1. request或者response不能再跳转页面了
### 4.4 配置多个拦截器
1. 再编写一个拦截器的类
2. 配置2个拦截器

```xml
<!-- 配置拦截器 -->
<mvc:interceptors>
	<mvc:interceptor>
		<!-- 哪些方法进行拦截 -->
		<mvc:mapping path="/user/*"/>
		<!-- 哪些方法不进行拦截
		<mvc:exclude-mapping path=""/>
		-->
		<!-- 注册拦截器对象 -->
		<bean class="xyz.slienceme.demo1.MyInterceptor1"/>
	</mvc:interceptor>
	<mvc:interceptor>
		<!-- 哪些方法进行拦截 -->
		<mvc:mapping path="/**"/>
		<!-- 注册拦截器对象 -->
		<bean class="xyz.slienceme.demo1.MyInterceptor2"/>
	</mvc:interceptor>
</mvc:interceptors>
```
