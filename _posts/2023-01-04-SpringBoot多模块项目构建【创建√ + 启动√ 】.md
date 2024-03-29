---
layout: post
title: Java｜Springboot多模块项目构建【创建√+启动√】
categories: [Java]
description: Springboot多模块项目构建【创建√+启动√】
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

## 一、多模块项目构建
### 1. 先建立父级目录demo-parent
![Alt Text](/images/posts/c5f35302d3e84ad4b68fef07c387d167.png)
![Alt Text](/images/posts/50c8077eaf2c44599258fe59d645879a.png)
![Alt Text](/images/posts/27fce1e8dd1548738f9c7cd9e1c2fa82.png)
### 2. 把父级目录src删除，再建立子级模块
![Alt Text](/images/posts/6164eb4f1fd140eab26981828462df9c.png)
![Alt Text](/images/posts/6133983cca254db293b08522c157694a.png)
### 3. 建立子级模块model,dao,service,common.utils等相同步骤
![Alt Text](/images/posts/ba54aada51aa4492ab25d4651f7d3667.png)
### 4. 建立启动模块boot, 创建Spring Boot 启动类
![Alt Text](/images/posts/b842d89161024408b7899efa0abc98ee.png)
![Alt Text](/images/posts/4c2918a45efd42c7a622644f700166b3.png)
![Alt Text](/images/posts/2ca37e77878c435d9a5a53fa819ec9e8.png)

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Hello world!
 *
 */
@SpringBootApplication(scanBasePackages = "com.example")
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }
}

```
### 5. 修改依赖关系
#### 5.1 根模块root的maven

```java
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.7</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo-parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>demo-parent</name>
    <description>demo-parent</description>
    <modules>
        <module>demo-model</module>
        <module>demo-dao</module>
        <module>demo-service</module>
        <module>demo-common</module>
        <module>demo-utils</module>
        <module>demo-boot</module>
    </modules>
```
#### 5.2 根模块打包插件

```java
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```
#### 5.3 启动模块boot，记得添加web的controller的依赖
```java
<dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-web</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
    </dependencies>
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>
                        com.example.demo.BootApplication
                    </mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
```
#### 5.4 其他没有启动类的模块添加以下
```java
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <skip>
                        true
                    </skip>
                </configuration>
            </plugin>
        </plugins>
    </build>
```
#### 5.5 然后逐一添加依赖
###### web依赖 service

```java
<dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-service</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
```
###### service依赖 dao , common, utils ,model

```java
<dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-dao</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-utils</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-model</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>demo-common</artifactId>
            <version>${project.parent.version}</version>
        </dependency>
```
###### dao依赖 model  等
###### boot启动模块依赖 web 的controller，其他自行添加依赖

### 6. 运行测试
#### 6.1 dao下创建

```java
package xyz.slienceme.wms;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.Mapping;

@Repository
public class DaoTest {

    public String DaoTest1(){
        System.out.println("dao打印了");
        return "www";
    }
}

```
#### 6.2 service下创建

```java
package xyz.slienceme.wms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceTest {
    @Autowired
    DaoTest daoTest;
    public void ServiceTest1(){
        System.out.println("ServiceTest打印了");
        String s = daoTest.DaoTest1();
        S
```

#### 6.3 web下创建

```java
package xyz.slienceme.wms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import xyz.slienceme.wms.ServiceTest;
@RestController
public class ControllerTest {

    @Autowired
    ServiceTest serviceTest;
    @RequestMapping(value = "/demo", method = RequestMethod.GET)
    String ControllerTest1(){
        serviceTest.ServiceTest1();
        return "成功";
    }
}

```
#### 6.4 启动boot按钮
![Alt Text](/images/posts/ec6c7c8fd7d049c897fa0c4e6fbaa09a.png)
![Alt Text](/images/posts/9bafc241371a4574aed0226e5c06c2d5.png)
![Alt Text](/images/posts/a308ccf45b4147a08bd573336175aae3.png)
![Alt Text](/images/posts/8491687116ce4be9aa30b2e9f0eea4c4.png)
