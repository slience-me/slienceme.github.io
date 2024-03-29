---
layout: post
title: Java｜Spring面向切面编程AOP
categories: [Java]
description: Spring面向切面编程AOP
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# Spring面向切面编程AOP
## 1. 导包
- `aspectjweaver`解析切入表达式
```xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.0.2.RELEASE</version>
        </dependency>
        <!--  解析切入点表达式  -->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.8.7</version>
        </dependency>
    </dependencies>
```
## 2. spring中基于XML的AOP配置
### 2.1 配置步骤
1. 把通知的`Bean`也交给`spring`来管理
2. 使用`aop：config`标签表明开始AOP的配置
3. 使用`aop：aspect`标签表明配置切面
 ---
 4. 在`aop：aspect`标签内部使用对应的标签来配置通知的类型
- 我们现在示例是让`printLog`方法在切入点方法执行之前之前：所以是前置通知
	- `aop:before`：表示配置前置通知
        - `method`属性：用于指定`Logger`类中哪个方法是前置通知
        - `pointcut`属性：用于指定切入点表达式，该表达式的含义指的是对业务层中哪些方法增强
### 2.2  切入点表达式的写法
 - 关键字：`execution(表达式)`
 - 表达式：
      - `访问修饰符  返回值  包名.包名.包名...类名.方法名(参数列表)`
  - 标准的表达式写法：
       - `public void xyz.slienceme.service.impl.AccountServiceImpl.saveAccount()`
   -  访问修饰符可以省略
      - `void xyz.slienceme.service.impl.AccountServiceImpl.saveAccount()`
   - 返回值可以使用通配符，表示任意返回值
        - `xyz.slienceme.service.impl.AccountServiceImpl.saveAccount()`
   - 包名可以使用通配符，表示任意包。但是有几级包，就需要写几个`*.`
      -  `* *.*.*.*.AccountServiceImpl.saveAccount())`
  -  包名可以使用..表示当前包及其子包
      -  `* *..AccountServiceImpl.saveAccount()`
  -  类名和方法名都可以使用*来实现通配
       - `* *..*.*()`
   - 参数列表：
       - 可以直接写数据类型：
           - 基本类型直接写名称           `int`
           - 引用类型写包名.类名的方式   `java.lang.String`
       - 可以使用通配符表示任意类型，但是必须有参数
       - 可以使用..表示有无参数均可，有参数可以是任意类型
    全通配写法：
       - `* *..*.*(..)`
   - 实际开发中切入点表达式的通常写法：
       - 切到业务层实现类下的所有方法
           - `* xyz.slienceme.service.impl.*.*(..)`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--配置spring的ioc，把service对象配置进来-->
    <bean id="accountService" class="xyz.slienceme.service.impl.IAcountServiceImpl"/>
    <!--配置AOP-->
    <aop:config>
        <!--配置切面 -->
        <aop:aspect id="logAdvice" ref="logger">
            <!-- 配置通知的类型，并且建立通知方法和切入点方法的关联-->
            <aop:before method="printLog" pointcut="execution(* xyz.slienceme.service.impl.*.*(..))"/>
        </aop:aspect>
    </aop:config>
    <!--  配置Logger类  -->
    <bean id="logger" class="xyz.slienceme.utils.Logger"/>
</beans>
```
### 2.3 具体类型

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--配置spring的ioc，把service对象配置进来-->
    <bean id="accountService" class="xyz.slienceme.service.impl.IAcountServiceImpl"/>

    <!--配置AOP-->
    <aop:config>

        <!-- 配置切入点表达式 id属性用于指定表达式的唯一标识。expression属性用于指定表达式内容
          此标签写在aop:aspect标签内部只能当前切面使用。
          它还可以写在aop:aspect外面，此时就变成了所有切面可用
      -->
        <aop:pointcut id="pt1" expression="execution(* xyz.slienceme.service.impl.*.*(..))"/>
        <!--配置切面 -->
        <aop:aspect id="logAdvice" ref="logger">
            <!-- 配置前置通知：在切入点方法执行之前执行 -->
            <aop:before method="beforePrintLog" pointcut-ref="pt1"/>

            <!-- 配置后置通知：在切入点方法正常执行之后值。它和异常通知永远只能执行一个 -->
            <aop:after-returning method="afterReturnPrintLog" pointcut-ref="pt1"/>

            <!-- 配置异常通知：在切入点方法执行产生异常之后执行。它和后置通知永远只能执行一个 -->
            <aop:after-throwing method="afterThrowingPrintiLog" pointcut-ref="pt1"/>

            <!-- 配置最终通知：无论切入点方法是否正常执行它都会在其后面执行 -->
            <aop:after method="afterPrintiLog" pointcut-ref="pt1"/>

        </aop:aspect>
    </aop:config>
    <!--  配置Logger类  -->
    <bean id="logger" class="xyz.slienceme.utils.Logger"/>
</beans>
```

```java
package xyz.slienceme.utils;
import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @Author slience_me
 * @Time : 2021/7/1  11:19
 * 用于记录日志的工具类，它里边提供了公共的代码
 */
public class Logger {

    /**
     * 前置通知
     */
    public void beforePrintLog(){
        System.out.println("前置通知Logger类中的beforePrintLog方法开始记录日志了。。。");
    }
    /**
     * 后置通知
     */
    public void afterReturnPrintLog(){
        System.out.println("后置通知Logger类中的afterReturnPrintLog方法开始记录日志了。。。");
    }
    /**
     * 异常通知
     */
    public void afterThrowingPrintiLog(){
        System.out.println("异常通知Logger类中的afterThrowingPrintiLog方法开始记录日志了。。。");
    }
    /**
     * 最终通知
     */
    public void afterPrintiLog(){
        System.out.println("最终通知Logger类中的afterPrintiLog方法开始记录日志了。。。");
    }
}
```
### 2.4 环绕类型

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--配置spring的ioc，把service对象配置进来-->
    <bean id="accountService" class="xyz.slienceme.service.impl.IAcountServiceImpl"/>

    <!--配置AOP-->
    <aop:config>

        <!-- 配置切入点表达式 id属性用于指定表达式的唯一标识。expression属性用于指定表达式内容
          此标签写在aop:aspect标签内部只能当前切面使用。
          它还可以写在aop:aspect外面，此时就变成了所有切面可用
      -->
        <aop:pointcut id="pt1" expression="execution(* xyz.slienceme.service.impl.*.*(..))"/>
        <!--配置切面 -->
        <aop:aspect id="logAdvice" ref="logger">
            <!-- 配置环绕通知 详细的注释请看Logger类中-->
            <aop:around method="aroundPringLog" pointcut-ref="pt1"/>
        </aop:aspect>
    </aop:config>
    <!--  配置Logger类  -->
    <bean id="logger" class="xyz.slienceme.utils.Logger"/>
</beans>
```

```java
package xyz.slienceme.utils;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * @Author slience_me
 * @Time : 2021/7/1  11:19
 * 用于记录日志的工具类，它里边提供了公共的代码
 */
public class Logger {
	 /**
     * 前置通知
     */
    public void beforePrintLog(){
        System.out.println("前置通知Logger类中的beforePrintLog方法开始记录日志了。。。");
    }
    /**
     * 后置通知
     */
    public void afterReturnPrintLog(){
        System.out.println("后置通知Logger类中的afterReturnPrintLog方法开始记录日志了。。。");
    }
    /**
     * 异常通知
     */
    public void afterThrowingPrintiLog(){
        System.out.println("异常通知Logger类中的afterThrowingPrintiLog方法开始记录日志了。。。");
    }
    /**
     * 最终通知
     */
    public void afterPrintiLog(){
        System.out.println("最终通知Logger类中的afterPrintiLog方法开始记录日志了。。。");
    }

    /**
     * 环绕通知
     * 问题：
     *      当我们配置了环绕通知之后，切入点方法没有执行，而通知方法执行了。
     * 分析：
     *      通过对比动态代理中的环绕通知代码，发现动态代理的环绕通知有明确的切入点方法调用，而我们的代码中没有。
     * 解决：
     *      Spring框架为我们提供了一个接口：ProceedingJoinPoint。该接口有一个方法proceed()，此方法就相当于明确调用切入点方法。
     *      该接口可以作为环绕通知的方法参数，在程序执行时，spring框架会为我们提供该接口的实现类供我们使用。
     *
     * spring中的环绕通知：
     *      它是spring框架为我们提供的一种可以在代码中手动控制增强方法何时执行的方式。
     */
    public Object aroundPringLog(ProceedingJoinPoint pjp){
        Object rtValue = null;
        try{
            Object[] args = pjp.getArgs();//得到方法执行所需的参数

            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。前置");

            rtValue = pjp.proceed(args);//明确调用业务层方法（切入点方法）

            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。后置");

            return rtValue;
        }catch (Throwable t){
            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。异常");
            throw new RuntimeException(t);
        }finally {
            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。最终");
        }
    }
}

```
## 3. spring中基于注解的AOP配置
### 3.1 xml配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 配置spring创建容器时要扫描的包-->
    <context:component-scan base-package="xyz.slienceme"/>

    <!-- 配置spring开启注解AOP的支持 -->
    <aop:aspectj-autoproxy/>
</beans>
```
- 更建议使用环绕类型
```java
package xyz.slienceme.utils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * @Author slience_me
 * @Time : 2021/7/1  11:19
 * 用于记录日志的工具类，它里边提供了公共的代码
 */
@Component("logger")
@Aspect//表示当前面是个切面类
public class Logger {

    @Pointcut("execution(* xyz.slienceme.service.impl.*.*(..))")
    private void pt1(){}

    /**
     * 前置通知
     */
    @Before("pt1()")
    public void beforePrintLog(){

        System.out.println("前置通知Logger类中的beforePrintLog方法开始记录日志了。。。");
    }
    /**
     * 后置通知
     */
    @AfterReturning("pt1()")
    public void afterReturnPrintLog(){

        System.out.println("后置通知Logger类中的afterReturnPrintLog方法开始记录日志了。。。");
    }
    /**
     * 异常通知
     */
    @AfterThrowing("pt1()")
    public void afterThrowingPrintiLog(){
        System.out.println("异常通知Logger类中的afterThrowingPrintiLog方法开始记录日志了。。。");
    }
    /**
     * 最终通知
     */
    @After("pt1()")
    public void afterPrintiLog(){
        System.out.println("最终通知Logger类中的afterPrintiLog方法开始记录日志了。。。");
    }
    
    @Around("pt1()")
    public Object aroundPringLog(ProceedingJoinPoint pjp){
        Object rtValue = null;
        try{
            Object[] args = pjp.getArgs();//得到方法执行所需的参数

            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。前置");

            rtValue = pjp.proceed(args);//明确调用业务层方法（切入点方法）

            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。后置");

            return rtValue;
        }catch (Throwable t){
            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。异常");
            throw new RuntimeException(t);
        }finally {
            System.out.println("Logger类中的aroundPringLog方法开始记录日志了。。。最终");
        }
    }
}

```
### 3.2 不使用xml配置

```java
@Configuration
    @ComponentScan(basePackages = "xyz.slienceme")
    @EnableAspectJAutoProxy
    public class SpringConfiguration{
    }
```

