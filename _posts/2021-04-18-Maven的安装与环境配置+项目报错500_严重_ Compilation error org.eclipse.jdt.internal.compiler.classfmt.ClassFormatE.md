---
layout: post
title: Java｜Maven的安装与环境配置报错Compilation_error
categories: [Java]
description: Maven的安装与环境配置报错Compilation_error_org.eclipse.jdt.internal.compiler.classfmt.ClassFormatE
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# Maven的安装与环境配置



### 1.下载
**1.1 百度搜索 Maven ，点红框框里边的即可**
![Alt Text](/images/posts/2021041809155838.png)
**1.2 点击那个Download超链接**
![Alt Text](/images/posts/20210418091706853.png)
**1.3 我们选择红线上边的这个**
![Alt Text](/images/posts/20210418091904519.png)
### 2.安装配置环境
**2.1 下载后解压，到一个路径，（建议没有中文路径）
然后配置环境变量
此电脑，右键属性**
![Alt Text](/images/posts/202104180920490.png)
**2.2 点击高级系统设置**
![Alt Text](/images/posts/20210418092144277.png)

**2.3 点击环境变量**
![Alt Text](/images/posts/20210418092223386.png)
**2.4 系统变量  ->新建  ->变量名 `MOVEN_HOME` ->变量值 - 你刚才解压的位置
（注意这个路径直接是相关文件,文件下就是bin等相关文件夹，因为解压时候，会多出一个文件夹）**

![Alt Text](/images/posts/20210418092308543.png)
![Alt Text](/images/posts/20210418092346938.png)
**2.5 点击Path 新建  `%MAVEN_HOME%\bin`**

![Alt Text](/images/posts/20210418092931931.png)
### 3.测试安装成功
 `win+r  cmd` 
输入 `mvn -v`
![Alt Text](/images/posts/2021041809315390.png)


---

**以下内容为补充内容 ：时间：2021年4月18日16:00:34
我开始学到maven遇到的问题，通过这种方式解决了（注：我解决了，不一定适合你，但是可能有启发）**

---
**虽然安装成功了，但是还是无法好好的运行我们的项目
如果全局更改进入 `apache-maven-3.8.1\conf路径`，设置一下setting.xml文件，
更改本地仓库的位置可以在这里更改**
![Alt Text](/images/posts/20210418160230162.png)
**配置国内镜像** 

```xml
<mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
```
![Alt Text](/images/posts/20210418160551958.png)
**配置jdk （可以不改）**
![Alt Text](/images/posts/20210418160745970.png)
**然后配置maven中的tomcat插件，学习写作[内容来源](https://www.cnblogs.com/cn-chy-com/p/10940129.html)
打开pom文件**

```xml
<!-- 配置Tomcat插件 -->
<build>  
<plugins>
    <plugin>  
        <groupId>org.apache.maven.plugins</groupId>  
        <artifactId>maven-compiler-plugin</artifactId>  
        <version>2.3.2</version>  
        <configuration> 
        <!-- jdk版本 --> 
            <source>1.8</source>  
            <target>1.8</target>  
        </configuration>  
    </plugin>  
    <plugin>
   <groupId>org.apache.tomcat.maven</groupId>
   <artifactId>tomcat7-maven-plugin</artifactId>
   <configuration>
      <!-- 指定端口 -->
      <port>8080</port>
      <!-- 请求路径 -->
      <path>/erp</path>
   </configuration>
     </plugin>
</plugins>  
</build>  
```
**然后点这  `Edit Configration`**
![Alt Text](/images/posts/2021041816105026.png)
**点`+`号，Maven**
![Alt Text](/images/posts/20210418161147708.png)
 设置 `Command line` 设置下边这个，就是默认启动tomcat7版本
![Alt Text](/images/posts/20210418161231532.png)
**注意：这两个jdk，jre必须一致**（针对当前项目的IDEA配置，还有一个全局的配置 ；点链接）
![Alt Text](/images/posts/20210418161400120.png)
![Alt Text](/images/posts/20210418161426149.png)
