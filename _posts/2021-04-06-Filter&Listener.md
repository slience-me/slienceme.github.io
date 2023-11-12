---
layout: post
title: Java｜Filter&Listener
categories: [Java]
description: Filter&Listener
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


# 1. Filter: 过滤器
## 1.1 概念
- web中的过滤器：访问资源时，过滤器可以拦截，完成特殊的功能。
- 作用：
	- 一般用于完成通用的操作。如：登录验证、统一编码处理、敏感字符过滤...

## 1.2 入门
### 步骤
1. 定义一个类，实现接口Filter
2. 复写方法
3. 配置拦截路径
	1. web.xml
	2. 注解

```java
package xyz.slienceme.web.filter;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * 过滤器快速入门程序
 */
@WebFilter("/*")//访问所有资源之前，都会执行该过滤器
public class FilterDemo1 implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("filterDemo1执行了");

        //放行
        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```
在没有编写 - `//放行filterChain.doFilter(servletRequest,servletResponse);`的时候，无法访问到资源，编写后（放行后），可以访问资源。


## 1.3 深入
### 1. web.xml配置
等同于添加注解
```java
@WebFilter("/*")//访问所有资源之前，都会执行该过滤器
```

```xml
<filter>
        <filter-name>demo1</filter-name>
        <filter-class>xyz.slienceme.web.filter.FilterDemo1</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>demo1</filter-name>
        <!--拦截路径-->
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```
### 2. 过滤器执行流程
1. 执行过滤器
2. 执行放行后的资源
3. 回来执行过滤器放行代码下边的代码

```java
@WebFilter("/*") //访问所有资源之前，都会执行该过滤器
public class FilterDemo2 implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        //对request对象请求消息增强
        System.out.println("filterDemo2。。。");

        //放行
        filterChain.doFilter(servletRequest,servletResponse);

        //对response对象的响应消息增强
        System.out.println("filterDemo2回来了。。。");
    }

    @Override
    public void destroy() {

    }
}
```
![Alt Text](/images/posts/2021040620270824.png)
### 3. 过滤器生命周期方法
1. `init`:在服务器启动后，会创建`Filter`对象，然后调用`init`方法。只执行一次。用于加载资源
2. `doFilter`:每一次请求被拦截资源时，会执行。执行多次
3. `destroy`:在服务器关闭后，`Filter`对象被销毁。如果服务器是正常关闭，则会执行`destroy`方法。只执行一次。用于释放资源

```java
/**
 * 过滤器快速入门程序
 */
//@WebFilter("/*") //访问所有资源之前，都会执行该过滤器
public class FilterDemo3 implements Filter{

    /**
     * 在服务器启动后，会创建Filter对象，然后调用init方法，只执行一次。用于加载资源
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init....");
    }

    /**
     * 每一次请求被拦截资源时，会执行。执行多次
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("doFilter....");
        filterChain.doFilter(servletRequest,servletResponse);
    }


    /**
     * 在服务器关闭后，Filter对象被销毁。如果服务器是正常关闭，则会执行destroy方法，只执行一次。用于释放资源
     */
    @Override
    public void destroy() {
        System.out.println("doDestroy");
    }
}
```
![Alt Text](/images/posts/20210406204234760.png)
![Alt Text](/images/posts/20210406204243242.png)
![Alt Text](/images/posts/20210406204303113.png)
### 4. 过滤器配置详解
 ##### 拦截路径配置：
 
1. **具体资源路径**： `/index.jsp`   只有访问index.jsp资源时，过滤器才会被执行
2. **拦截目录**： `/user/*`	访问/user下的所有资源时，过滤器都会被执行
3. **后缀名拦截**： `*.jsp`		访问所有后缀名为jsp资源时，过滤器都会被执行
4. **拦截所有资源**：`/*`		访问所有资源时，过滤器都会被执行

##### 拦截方式配置：
- 资源被访问的方式
* **注解配置**：
	* 设置`dispatcherTypes`属性
		1. `REQUEST`：默认值。浏览器直接请求资源
		2. `FORWARD`：转发访问资源
		3. `INCLUDE`：包含访问资源
		4. `ERROR`：错误跳转资源
		5. `ASYNC`：异步访问资源
* `web.xml`配置
	* 设置`<dispatcher></dispatcher>`标签即可

```java
//浏览器直接请求资源时，该过滤器会被执行
@WebFilter(value = "/*", dispatcherTypes = DispatcherType.REQUEST) 
//浏览器转发资源时，该过滤器会被执行
@WebFilter(value = "/*", dispatcherTypes = DispatcherType.FORWARD)
//浏览器直接请求或转发资源时，该过滤器会被执行
@WebFilter(value = "/*", dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.FORWARD})
```
### 5. 过滤器链(配置多个过滤器)
* 执行顺序：如果有两个过滤器：过滤器1和过滤器2
	1. 过滤器1
	2. 过滤器2
	3. 资源执行
	4. 过滤器2
	5. 过滤器1 

* 过滤器先后顺序问题：
1. 注解配置：按照类名的字符串比较规则比较，值小的先执行
	 如： AFilter 和 BFilter，AFilter就先执行了。
2. web.xml配置： <filter-mapping>谁定义在上边，谁先执行



##### 增强对象的功能：
* 设计模式：一些通用的解决固定问题的方式

1. 装饰模式
2. 代理模式
* 概念：
1. 真实对象：被代理的对象
2. 代理对象：
3. 代理模式：代理对象代理真实对象，达到增强真实对象功能的目的
* 实现方式：
1. 静态代理：有一个类文件描述代理模式
2. 动态代理：在内存中形成代理类
* 实现步骤：
	1. 代理对象和真实对象实现相同的接口
	2. 代理对象 = Proxy.newProxyInstance();
	3. 使用代理对象调用方法。
	4. 增强方法

* 增强方式：
	1. 增强参数列表
	2. 增强返回值类型
	3. 增强方法体执行逻辑

```java
package xyz.slienceme.proxy;

public interface SaleComputer {
    public String sale(double money);
    public void show();
}

```

```java
package xyz.slienceme.proxy;

public class Lenovo implements SaleComputer{
    @Override
    public String sale(double money) {
        System.out.println("花了"+ money +"元买了一台联想电脑。。");
        return "联想电脑";
    }

    @Override
    public void show() {
        System.out.println("展示电脑...");
    }


}

```

```java
package xyz.slienceme.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyTest {
    public static void main(String[] args) {
        //1. 创建真实对象
        Lenovo lenovo = new Lenovo();

        //2.动态代理增强lenovo对象
        /*
            三个参数：
            1. 类加载器：真实对象.getClass().getClassLoader()
            2. 接口数组，真实对象.getClass().getInterfaces()
            3. 处理器，new InvocationHandler()
         */
        SaleComputer proxy_lenovo = (SaleComputer) Proxy.newProxyInstance(lenovo.getClass().getClassLoader(), lenovo.getClass().getInterfaces(), new InvocationHandler() {
            /*
                代理逻辑编写的方法；代理对象调用的所有方法都会触发该方法执行
                参数：
                    1. proxy：代理对象
                    2. method：代理对象调用的方法，被封装为的对象
                    3. args： 代理对象调用的方法时，传递的参数
             */

            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("该方法执行了");
                System.out.println(method.getName());
                System.out.println(args[0]);
                return null;
            }
        });


        //3.调用方法
        String computer = proxy_lenovo.sale(8000);
        System.out.println(computer);

//        proxy_lenovo.show();
    }
}

```

```java
package xyz.slienceme.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.List;

/**
 * 敏感词汇过滤器
 */
@WebFilter("/*")
public class SensitiveWordsFilter implements Filter {

    private List<String> list = new ArrayList<String>();//敏感词汇的集合
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        try {
            // 1. 加载文件
            ServletContext servletContext = filterConfig.getServletContext();
            String realPath = servletContext.getRealPath("/WEB-INF/classes/sensitive.txt");
            // 2. 读取文件
            BufferedReader br = new BufferedReader(new FileReader(realPath));
            // 3. 将文件的每一行数据添加到list中
            String line = null;
            while ((line = br.readLine()) != null){
               list.add(line);
            }
            br.close();
            System.out.println(list);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //1. 创建代理对象，增强getParameter方法
        ServletRequest proxy_req = (ServletRequest) Proxy.newProxyInstance(servletRequest.getClass().getClassLoader(), servletRequest.getClass().getInterfaces(), new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //增强getParameter方法
                //判断是否是getParameter方法
                if(method.getName().equals("getParameter")){
                    //增强返回值
                    //获取返回值
                    String value = (String) method.invoke(servletRequest, args);
                    if(value != null){
                        for(String str : list){
                            if(value.contains(str)){
                                value = value.replaceAll(str,"***");
                            }
                        }
                    }
                    return value;
                }
                //判断方法名是否是getParameterMap



                return method.invoke(servletRequest,args);
            }
        });
        //2. 放行
        filterChain.doFilter(proxy_req,servletResponse);
    }

    @Override
    public void destroy() {

    }
}

```

# 2. Listener：监听器
* 概念：web的三大组件之一。
* 事件监听机制
	* 事件	：一件事情
	* 事件源 ：事件发生的地方
	* 监听器 ：一个对象
	* 注册监听：将事件、事件源、监听器绑定在一起。 当事件源上发生某个事件后，执行监听器代码

---

* `ServletContextListener`:监听`ServletContext`对象的创建和销毁
	* 方法：
		* `void contextDestroyed(ServletContextEvent sce)` ：`ServletContext`对象被销毁之前会调用该方法
		* `void contextInitialized(ServletContextEvent sce)` ：`ServletContext`对象创建后会调用该方法
	* 步骤：
		1. 定义一个类，实现`ServletContextListener`接口
		2. 复写方法
		3. 配置
			
			 `web.xml`
```xml
<listener>
	<listener-class>xyz.slienceme.web.listener.ContextLoaderListener</listener-class>
</listener>
```
* 指定初始化参数<context-param>
2. 注解：
	 `@WebListener`
