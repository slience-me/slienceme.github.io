---
layout: post
title: Java｜Springmvc环境搭建&请求参数绑定&常用注解
categories: [Java]
description: Springmvc环境搭建&请求参数绑定&常用注解
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# springmvc
## 1. 搭建开发环境
### 1.1 创建项目
![Alt Text](/images/posts/20210703084549682.png)

- 添加键值对，加快构建时间
- `key:   archetypeCatalog`
- `value: internal`

![Alt Text](/images/posts/20210703084634859.png)
### 1.2 配置maven

```xml
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <!--  版本锁定  -->
    <spring.version>5.0.2.RELEASE</spring.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
```
### 1.3 前端控制器配置
- web.xml

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>

  <!--配置前端控制器-->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <!--配置解决中文乱码的过滤器-->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

</web-app>

```
### 1.4 创建springmvc配置文件

![Alt Text](/images/posts/20210703090121356.png)
![Alt Text](/images/posts/20210703090104355.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
        
    <!--  开启注解扫描  -->
    <context:component-scan base-package="xyz.slienceme"/>
    
</beans>
```
## 2. 执行过程
### 2.1 入门案例的执行流程
1. 当启动`Tomcat`服务器的时候，因为配置了`load-on-startup`标签，所以会创建`DispatcherServlet`对象，就会加载`springmvc.xml`配置文件
2. 开启了注解扫描，那么`HelloController`对象就会被创建
3. 从`index.jsp`发送请求，请求会先到达`DispatcherServlet`核心控制器，根据配置`@RequestMapping`注解找到执行的具体方法
4. 根据执行方法的返回值，再根据配置的视图解析器，去指定的目录下查找指定名称的`JSP`文件
5. `Tomcat`服务器渲染页面，做出响应

### 2.2 SpringMVC官方提供图形
![Alt Text](/images/posts/20210703100325144.jpg)

### 2.3 入门案例中的组件分析
7. 前端控制器（`DispatcherServlet`）
8. 处理器映射器（`HandlerMapping`）
9. 处理器（`Handler`）
10. 处理器适配器（`HandlAdapter`）
11. 视图解析器（`View Resolver`）
12. 视图（`View`）

### 2.4 `@RequestMapping`注解
- 作用：建立请求`URL`和处理方法之间的对应关系
- 范围：可以作用在方法和类上
	- 作用在类上：第一级的访问目录
	- 作用在方法上：第二级的访问目录
	- 细节：路径可以不编写 `/` 表示应用的根目录开始
	- 细节：`${ pageContext.request.contextPath }`也可以省略不写，但是路径上不能写 `/`
- 属性
	1. `path`  指定请求路径的`url`
	2. `value` value属性和path属性是一样的
	3. `method` 指定该方法的请求方式
	4. `params` 指定限制请求参数的条件 要求key和value必须一致
	5. `headers` 发送的请求中必须包含的请求头
```java
    /**
     * RequestMapping注解
     * @return
     */
	@RequestMapping(value="/testRequestMapping",method = {RequestMethod.POST},params = {"username=heihei"},headers = {"Accept"})
    public String testRequestMapping(){
        System.out.println("测试RequestMapping注解...");
        return "success";
    }
```
## 3. 请求参数的绑定
### 3.1 请求参数的绑定说明
#### 3.1.1 绑定机制
1. 表单提交的数据都是`k=v`格式的 `username=haha&password=123`
2. `SpringMVC`的参数绑定过程是把表单提交的请求参数，作为控制器中方法的参数进行绑定的
3. 要求：提交表单的name和参数的名称是相同的
#### 3.1.2 支持的数据类型
1. 基本数据类型和字符串类型
2. 实体类型（`JavaBean`）
3. 集合数据类型（`List`、`map`集合等）
### 3.2 基本数据类型和字符串类型
1. 提交表单的name和参数的名称是相同的
2. 区分大小写
### 3.3 实体类型（JavaBean）
1. 提交表单的name和JavaBean中的属性名称需要一致
2. 如果一个`JavaBean`类中包含其他的引用类型，那么表单的`name`属性需要编写成：`对象.属性` 例如：`address.name`

- 把数据封装Account类中
```html
<form action="param/saveAccount" method="post">
    姓名：<input type="text" name="username" /><br/>
    密码：<input type="text" name="password" /><br/>
    金额：<input type="text" name="money" /><br/>
    用户姓名：<input type="text" name="user.uname" /><br/>
    用户年龄：<input type="text" name="user.age" /><br/>
    <input type="submit" value="提交" />
</form>
```
### 3.4 给集合属性数据封装
1. `JSP`页面编写方式：list[0].属性

- 把数据封装Account类中，类中存在list和map的集合
```html
<form action="param/saveAccount" method="post">
     姓名：<input type="text" name="username" /><br/>
     密码：<input type="text" name="password" /><br/>
     金额：<input type="text" name="money" /><br/>

     用户姓名：<input type="text" name="list[0].uname" /><br/>
     用户年龄：<input type="text" name="list[0].age" /><br/>

     用户姓名：<input type="text" name="map['one'].uname" /><br/>
     用户年龄：<input type="text" name="map['one'].age" /><br/>
     <input type="submit" value="提交" />
</form>
```
- 实体类添加属性

```java
private List<User> list;
private Map<String,User> map;
```

### 3.5 请求参数中文乱码的解决
1. 在`web.xml`中配置Spring提供的过滤器类

```xml
<!--配置解决中文乱码的过滤器-->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

### 3.6 自定义类型转换器
1. 表单提交的任何数据类型全部都是字符串类型，但是后台定义`Integer`类型，数据也可以封装上，说明`Spring`框架内部会默认进行数据类型转换。
2. 如果想自定义数据类型转换，可以实现`Converter`的接口
---

1. 自定义类型转换器

```java
package xyz.slienceme.utils;
import org.springframework.core.convert.converter.Converter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 把字符串转换日期
 */
public class StringToDateConverter implements Converter<String,Date>{

    /**
     * String source    传入进来字符串
     * @param source
     * @return
     */
    public Date convert(String source) {
        // 判断
        if(source == null){
            throw new RuntimeException("请您传入数据");
        }
        
        try {
            // 把字符串转换日期 解析字符串
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date date = df.parse(source);
			return date;
        } catch (Exception e) {
            throw new RuntimeException("数据类型转换出现错误");
        }
    }

}

```
2. 注册自定义类型转换器，在`springmvc.xml`配置文件中编写配置

```xml
<!--配置自定义类型转换器-->
<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
     <property name="converters">
         <set>
             <bean class="xyz.slienceme.utils.StringToDateConverter"/>
         </set>
     </property>
 </bean>


 <!-- 开启SpringMVC框架注解的支持 -->
 <mvc:annotation-driven conversion-service="conversionService"/>
```
### 3.7 在控制器中使用原生的ServletAPI对象
1. 只需要在控制器的方法参数定义`HttpServletRequest`和`HttpServletResponse`对象

## 4. 常用的注解
### 4.1 `@RequestParam`注解
1. 作用：把请求中的指定名称的参数传递给控制器中的形参赋值
2. 属性
	1. `value`：请求参数中的名称
	2. `required`：请求参数中是否必须提供此参数，默认值是`true`，必须提供的是name，必须与    `<a href="anno/testRequestParam?name=哈哈">RequestParam</a>`中的参数name相同，否则报错
3. 代码如下
```html
<a href="anno/testRequestParam?name=哈哈">RequestParam</a>
```
```java
/**
* 接收请求
* @return
*/
@RequestMapping("/testRequestParam")
public String testRequestParam(@RequestParam(name="name",required=false) String username){
     System.out.println("执行了...");
     System.out.println(username);
     return "success";
 }
```
- 单纯拿到`name`参数
### 4.2 `@RequestBody`注解
1. 作用：用于获取请求体的内容（`注意：get方法不可以`）
2. 属性
	1. `required`：是否必须有请求体，默认值是`true`
3. 代码如下

```html
<form action="anno/testRequestBody" method="post">
   用户姓名：<input type="text" name="username" /><br/>
   用户年龄：<input type="text" name="age" /><br/>
   <input type="submit" value="提交" />
</form>
```

```java
/**
* 获取到请求体的内容
* @return
*/
@RequestMapping("/testRequestBody")
public String testRequestBody(@RequestBody String body){
    System.out.println("执行了...");
    System.out.println(body);
    return "success";
}
```
- 得到 `username=zhangsan&age=123`
### 4.3 `@PathVariable`注解
1. 作用：拥有绑定`url`中的占位符的。例如：`url`中有`/delete/{id}`，`{id}`就是占位符
2. 属性
	1. `value`：指定`url`中的占位符名称
3. Restful风格的URL
	1. 请求路径一样，可以根据不同的请求方式去执行后台的不同方法
	2. restful风格的URL优点
		1. 结构清晰
		2. 符合标准
		3. 易于理解
		4. 扩展方便
4. 代码如下
```html
<a href="anno/testPathVariable/10">testPathVariable</a>
```
```java
<a href="user/hello/1">入门案例</a>
/**
 * PathVariable注解
 * @return
 */
@RequestMapping(value="/testPathVariable/{sid}")
public String testPathVariable(@PathVariable(name="sid") String id){
    System.out.println("执行了...");
    System.out.println(id);
    return "success";
}
```
![Alt Text](/images/posts/20210703155428477.png)

### 4.4 `@RequestHeader`注解
1. 作用：获取指定请求头的值
2. 属性
	1. `value`：请求头的名称
3. 代码如下
```html
<a href="anno/testRequestHeader">RequestHeader</a>
```
```java
/**
* 获取请求头的值
* @param header
* @return
*/
@RequestMapping(value="/testRequestHeader")
public String testRequestHeader(@RequestHeader(value="Accept") String header, HttpServletRequest request,HttpServletResponse response) throws IOException {
   System.out.println("执行了...");
   System.out.println(header);
   // return "success";
   // response.sendRedirect(request.getContextPath()+"/anno/testCookieValue");
   return "redirect:/param.jsp";
}
```
![Alt Text](/images/posts/20210703155820333.png)

### 4.5 `@CookieValue`注解
1. 作用：用于获取指定`cookie`的名称的值
2. 属性
	1. `value`：`cookie`的名称
3. 代码
```html
<a href="anno/testCookieValue">CookieValue</a>
```
```java
/**
 * 获取Cookie的值
 * @return
 */
@RequestMapping(value="/testCookieValue")
public String testCookieValue(@CookieValue(value="JSESSIONID") String cookieValue){
    System.out.println("执行了...");
    System.out.println(cookieValue);
    return "success";
}
```
![Alt Text](/images/posts/20210703155933231.png)

### 4.5 `@ModelAttribute`注解
1. 作用
	1. 出现在方法上：表示当前方法会在控制器方法执行前先执行。
	2. 出现在参数上：获取指定的数据给参数赋值。
2. 应用场景
	1. 当提交表单数据不是完整的实体数据时，保证没有提交的字段使用数据库原来的数据。
3. 具体的代码
---
```html
<form action="anno/testModelAttribute" method="post">
  用户姓名：<input type="text" name="uname" /><br/>
    用户年龄：<input type="text" name="age" /><br/>
    <input type="submit" value="提交" />
</form>
```
1. 修饰的方法有返回值

```java
/**
* 作用在方法，先执行
* @param name
* @return
*/
@ModelAttribute
public User showUser(String uname) {
	System.out.println("showUser执行了...");
	// 模拟从数据库中查询对象
	User user = new User();
	user.setUname(uname);
    user.setAge(20);
    user.setDate(new Date());
	return user;
}
/**
* 修改用户的方法
* @param cookieValue
* @return
*/
@RequestMapping(path="/testModelAttribute")
public String updateUser(User user) {
	System.out.println(user);
	return "success";
}
```
2. 修饰的方法没有返回值

```java
/**
* 作用在方法，先执行
* @param name
* @return
*/
@ModelAttribute
public void showUser(String uname,Map<String, User> map) {
	System.out.println("showUser执行了...");
	// 模拟从数据库中查询对象
	User user = new User();
	user.setUname(uname);
    user.setAge(20);
    user.setDate(new Date());
	map.put("abc", user);
}
/**
* 修改用户的方法
* @param cookieValue
* @return
*/
@RequestMapping(path="/testModelAttribute")
public String updateUser(@ModelAttribute(value="abc") User user) {
	System.out.println(user);
	return "success";
}
```
![Alt Text](/images/posts/20210703160356508.png)

### 4.5 `@SessionAttributes`注解
1. 作用：用于多次执行控制器方法间的参数共享
2. 属性
	1. `value`：指定存入属性的名称
3. 代码如下
```html
<a href="anno/testSessionAttributes">testSessionAttributes</a>
<a href="anno/getSessionAttributes">getSessionAttributes</a>
<a href="anno/delSessionAttributes">delSessionAttributes</a>
```
```java
@Controller
@RequestMapping(path="/user")
@SessionAttributes(value={"msg"})   // 把msg=美美数据存入到session域对中
public class HelloController {
	
	/**
     * 向session中存入值
     * @return
     */
    @RequestMapping(value="/testSessionAttributes")
    public String saveSessionAttributes(Model model){
        System.out.println("saveSessionAttributes...");
        // 底层会存储到request域对象中
        model.addAttribute("msg","美美");
        return "success";
    }

    /**
     * 从session中获取值
     * @param modelMap
     * @return
     */
    @RequestMapping(value="/getSessionAttributes")
    public String getSessionAttributes(ModelMap modelMap){
        System.out.println("getSessionAttributes...");
        String msg = (String) modelMap.get("msg");
        System.out.println(msg);
        return "success";
    }

    /**
     * 从session中清除值
     * @param status
     * @return
     */
    @RequestMapping(value="/delSessionAttributes")
    public String delSessionAttributes(SessionStatus status){
        System.out.println("getSessionAttributes...");
        status.setComplete();
        return "success";
    }
}
```
