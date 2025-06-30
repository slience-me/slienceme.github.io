# Maven

## 1. 仓库

![Alt Text](/images/20210418094241519.png)

仓库有三类：本地仓库，远程仓库【私服】，中央仓库

非公司： maven先去本地仓库获取 jar包，如果没有去中央仓库获取
公司： 有的公司有远程仓库，maven先去本地仓库获取jar包，如果没有去远程仓库获取，再没有去中央仓库获取。

## 2. 更改本地仓库位置

打开 `apache-maven-3.8.1\conf`路径下有一个  `settings.xml`文件，这是一个配置文件，找到这个位置

![Alt Text](/images/20210418094721924.png)

把下边这句话复制一下里边填写你现在的本地仓库路径

```xml

<localRepository>/path/to/local/repo</localRepository>
```

像下边这个样子

```xml

<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 http://maven.apache.org/xsd/settings-1.2.0.xsd">
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
  <localRepository>D:\Program Files\JetBrains\maven_repository</localRepository>
```

## 3. maven标注目录结构

![Alt Text](/images/20210418095500394.png)

> **maven标准目录结构**
> - `src/main/java目录` —— 核心代码部分
> - `src/main/resources` —— 配置文件部分，存放项目资源文件，如 spring, hibernate 配置文件
> - `src/test/java` —— 测试代码部分，存放所有单元测试.java 文件，如 JUnit 测试类
> - `src/test/resources` —— 测试配置文件，测试资源文件
> - `target` —— 项目输出位置，编译后的class 文件会输出到此目录
> - `pom.xml`——maven 项目核心配置文件
> - `src/main/webapp` 页面资源，js,css,图片等等

## 4. maven常用命令

- `mvn clean`
  - clean 是清理命令，执行 clean 会删除 target 目录及内容。
- `mvn compile`
  - compile 是编译命令，作将 src/main/java 下的文件编译为 class 文件输出到 target目录下。
- `mvn test`
  - test 是测试命令会执行src/test/java下的单元测试类。同时编译`src/main下代码`
- `mvn package`
  - package 是打包命令，对java工程打成jar包，对于web工程打成war包。
- `mvn install`
  - install 是安装命令，执行 install 将 maven 打成 jar 包或 war 包发布到本地仓库。

## 5. maven生命周期

主要有

- 清理生命周期
- 默认生命周期
- 站点生命周期

![Alt Text](/images/20210418102038305.png)

maven概念模型图

![Alt Text](/images/20210418102553981.png)

## 6. 配置IDEA

[超链接上一篇文章](https://blog.csdn.net/Slience_me/article/details/115817902)

**当前项目配置**

![Alt Text](/images/20210418103416211.png)

**全局配置**

![Alt Text](/images/20210418170921832.png)

![Alt Text](/images/20210418170956443.png)

每次创建项目时， IDEA 要使用插件进行创建，这些插件当你创建新的项目时，它每次都会去中央仓库下载，这样使得创建比较慢。应该创建时，让它找本地仓库中的插件进行创建项目。

加一条命令  `-DarchetypeCatalog=internal`

![Alt Text](/images/20210418103549345.png)

加上 `<scope>provided</scope>`这句可以让其只在编译时起作用
加上  `<scope>test</scope>` 让其只在测试时起作用

```xml

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
    <scope>provided</scope>
  </dependency>
</dependencies>
```

为了防止项目在tomcat6，tomcat7,tomcat8都能运行，做以下配置

```xml

<build>
  <plugins>
    <plugin>
      <groupId>org.apache.tomcat.maven</groupId>
      <artifactId>tomcat7-maven-plugin</artifactId>
      <version>2.2</version>
      <configuration>
        <port>8888</port>
      </configuration>
    </plugin>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-compiler-plugin</artifactId>
      <configuration>
        <target>1.8</target>
        <source>1.8</source>
        <encoding>UTF-8</encoding>
      </configuration>
    </plugin>
  </plugins>
</build>
```

添加动态模板，先创建group（Custom）再创建内容（live templete）

![Alt Text](/images/20210418164336943.png)

![Alt Text](/images/20210418164258608.png)

- jdbc:mysql:///maven02`?useUnicode=true&characterEncoding=utf8`

解决MySQL驱动和数据库字符集设置不搭配问题  [链接](https://blog.csdn.net/Slience_me/article/details/115836984)

* `要想从数据库中取出数据`
* `必须有四个属性：数据库驱动，连接数据库的地址，数据库用户名称，数据库密码。`

## 7. Linux下安装Maven

### 7.1 本地安装

```bash
# 1. 上传或下载安装包
cd/usr/local
apache-maven-3.6.1-bin.tar.gz
# 2. 解压安装包
tar -zxvf apache-maven-3.6.1-bin.tar.gz
# 3. 建立软连接
ln -s /usr/local/apache-maven-3.6.1/ /usr/local/maven
# 4. 修改环境变量
vim /etc/profile
export MAVEN_HOME=/usr/local/maven
export PATH=$PATH:$MAVEN_HOME/bin
# 通过命令source /etc/profile让profile文件立即生效
source /etc/profile
# 5. 测试是否安装成功
mvn –v
```

### 7.2 环境变量

在`高级系统设置`中的环境变量, 设置`MAVEN_HOME`为路径地址, 然后在Path下添加`%MAVEN_HOME%\bin`
在CMD中测试是否配置成功`mvn -version`
在CMD中测试是否配置成功`java -version`

### 7.3 Maven配置文件

在`./apache-maven-*.*/config`下, 修改配置文件`settings.xml`

设置镜像源和java版本

```xml

<settings>
  <mirrors>
    <mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>central</mirrorOf>
      <name>Nexus aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </mirror>
  </mirrors>
  <profiles>
    <profile>
      <id>jdk-1.8</id>
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
    </profile>
  </profiles>
</settings>
```

## 8. 补充内容

### 基础命令

```bash
# 清理项目（删除 target 目录）
mvn clean

# 编译项目
mvn compile

# 编译测试类
mvn test-compile

# 执行测试（运行 src/test/java 下的测试）
mvn test

# 打包（生成 jar/war 包）
mvn package

# 安装到本地仓库
mvn install

# 运行项目（需配置 exec 插件或 spring-boot 插件）
mvn exec:java
mvn spring-boot:run

# 跳过测试
mvn install -DskipTests
mvn package -Dmaven.test.skip=true
```

### 常用生命周期阶段

| 阶段       | 说明            |
|----------|---------------|
| validate | 验证项目是否正确      |
| compile  | 编译源代码         |
| test     | 使用合适的测试框架运行测试 |
| package  | 打包生成 jar/war  |
| verify   | 验证结果的合法性      |
| install  | 安装到本地仓库       |
| deploy   | 部署到远程仓库       |



### 常用插件

#### 1. Spring Boot 插件

```xml

<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

```bash
# 启动
mvn spring-boot:run

# 生成可运行 jar
mvn clean package
```

#### 2. 编译插件

```xml

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <configuration>
    <source>1.8</source>
    <target>1.8</target>
  </configuration>
</plugin>
```

#### 3. 打包跳过测试

```bash
mvn package -DskipTests
```

---

### 依赖管理技巧

#### 添加依赖

```xml

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.7.0</version>
  </dependency>
</dependencies>
```

#### 依赖排除（冲突解决）

```xml

<dependency>
  <groupId>xxx</groupId>
  <artifactId>xxx</artifactId>
  <exclusions>
    <exclusion>
      <groupId>conflict-group</groupId>
      <artifactId>conflict-artifact</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

#### 依赖范围 scope

```xml

<scope>compile</scope>      <!-- 默认，编译/运行/测试都可用 -->
<scope>provided</scope>     <!-- 编译期可用，运行时需外部提供 -->
<scope>runtime</scope>      <!-- 编译不可用，运行时才加载 -->
<scope>test</scope>         <!-- 只用于测试 -->
```

### 配置 Maven 镜像（加速）

修改 `~/.m2/settings.xml` 添加阿里云镜像：

```xml

<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Aliyun Maven</name>
    <url>https://maven.aliyun.com/repository/central</url>
  </mirror>
</mirrors>
```

### 常用 trick

* **查看依赖树**

  ```bash
  mvn dependency:tree
  ```

* **更新 SNAPSHOT**

  ```bash
  mvn clean install -U
  ```

* **跳过某个插件执行**

  ```bash
  mvn install -Dgpg.skip=true
  ```

* **执行某个阶段及之前阶段**

  * `mvn package` 会执行 `validate -> compile -> test -> package`


### 常见项目结构（标准 Maven）

```
project-root/
├── src/
│   ├── main/
│   │   ├── java/
│   │   ├── resources/
│   └── test/
│       ├── java/
│       ├── resources/
├── target/
├── pom.xml
```

::: tip 发布时间:
2021-04-18
:::
