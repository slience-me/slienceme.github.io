# Spring集成

## 0. 官网

- [Spring Boot](https://spring.io/projects/spring-boot)

## 1. 集成Nacos

[具体相关内容](/notes/middleware/nacos)

## 2. 集成Feign

声明式远程调用

**OpenFeign**如何接入

1. 引入依赖

```xml

<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

2. 开启feign功能

```java
@EnableFeignClients(basePackages="cn.slienceme.gulimall.pms.feign")
```

3. 声明远程接口

```java
@FeignClient("gulimall-ware")
public interface WareFeignService {
    @PostMapping("/ware/waresku/skus")
    public Resp<List<SkuStockVo>> skuWareInfos(@RequestBody List<Long> skuIds);
}
```

## 3. 集成GateWay

[官方文档](https://spring.io/projects/spring-cloud-gateway)

1. 引入依赖

    ```xml
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>	
    ```

2. 配置文件

   ```yaml
   spring:
     cloud:
       gateway:
         routes:
           - id: route_name
             uri: lb://aplication.name
             predicates:
               - Path=/api/name/**
             filters:
               - RewritePath=/api/(?<segment>.*),/$\{segment}
   
           - id: host_route_name
             uri: lb://aplication.name
             predicates:
               - Host=example.com
   ```

## 4. 集成Rabbitmq

[跳转=>中间件RebbitMQ](/notes/middleware/rabbitmq)

## 5. 集成Redis

[跳转=>中间件Redis](/notes/middleware/redis#_4-spring-boot-集成-redis)

## 6. 集成SpringCache

[跳转=>中间件SpringCache](/notes/middleware/redis#_5-spring-cache-redis-简化缓存管理)

## 7. 集成SpringSession

Spring Session 是一个提供会话管理的框架，它为 Spring 应用程序提供了更灵活和可扩展的会话管理功能。与传统的基于 HTTP 的 `HttpSession` 不同，Spring Session 提供了更强的分布式支持和更易于集成的特性。

### 7.1 简介

`持久化会话数据`：Spring Session 允许将会话数据存储在外部存储中（例如 Redis、JDBC、MongoDB 等），从而可以在分布式环境中共享会话，避免了传统方式下仅能在单一节点上管理会话的问题。

`支持集群和分布式系统`：在微服务架构中，Spring Session 可以通过 Redis 等工具实现会话的跨服务共享，这样即使请求被路由到不同的服务节点，依然可以共享同一个会话。

`会话管理的灵活性`：Spring Session 提供了对 HTTP 会话的增强，包括对会话的创建、获取、删除和更新操作的封装。还支持集成 Spring Security，提供对用户认证信息的管理。

`自动配置和可扩展性`：它为不同的会话存储提供了自动配置支持，可以方便地通过配置文件或注解进行集成。

### 7.2 集成Spring Session

1. `添加依赖` 在 `pom.xml` 中添加 Spring Session 和所需的存储依赖。例如，如果使用 Redis 存储会话：

   ```xml
   <dependency>
       <groupId>org.springframework.session</groupId>
       <artifactId>spring-session-data-redis</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   ```

2. `配置 Redis 存储`
    在 `application.properties` 或 `application.yml` 中配置 Redis 连接信息：

   ```properties
   spring.redis.host=localhost
   spring.redis.port=6379
   spring.session.store-type=redis
   server.servlet.session.timeout=30m
   ```

3. `启用 Spring Session`
    在 Spring Boot 应用中，自动配置通常可以直接启用 Spring Session。如果需要对会话存储类型进行更多配置，可以通过注解或 Java 配置类进行自定义。

   ```java
   @SpringBootApplication
   @EnableRedisHttpSession
   public class Application {
       public static void main(String[] args) {
           SpringApplication.run(Application.class, args);
       }
   }
   ```

   `@EnableRedisHttpSession` 注解启用 Redis 会话管理。

4. `自定义会话存储（可选）`如果想要自定义会话存储（例如使用其他数据源），可以通过实现 `HttpSessionRepository` 接口来定制会话的持久化方式。

5. 自定义配置文件

   ```java
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
   import org.springframework.data.redis.serializer.RedisSerializer;
   import org.springframework.session.web.http.CookieSerializer;
   import org.springframework.session.web.http.DefaultCookieSerializer;
   
   /**
    * 配置类：SessionConfig
    * 用于配置 Spring Session 的相关参数，主要包括 Redis 序列化器和 Cookie 序列化器。
    */
   @Configuration
   public class SessionConfig {
   
       /**
        * 配置 Spring Session 默认的 Redis 序列化器
        * 使用 GenericJackson2JsonRedisSerializer 来将对象序列化为 JSON 格式。
        *
        * @return RedisSerializer<Object> 序列化器
        */
       @Bean
       public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
           // 返回一个使用 JSON 格式的 Redis 序列化器
           return new GenericJackson2JsonRedisSerializer();
       }
   
       /**
        * 配置 Cookie 序列化器，设置用于保存会话信息的 Cookie 名称和域名
        * 主要用于 Spring Session 中，设置自定义的 Cookie 配置。
        *
        * @return CookieSerializer 配置好的 Cookie 序列化器
        */
       @Bean
       public CookieSerializer cookieSerializer() {
           // 创建一个默认的 Cookie 序列化器实例
           DefaultCookieSerializer serializer = new DefaultCookieSerializer();
           // 设置 Cookie 名称为 GULISESSION
           serializer.setCookieName("GULISESSION");
           // 设置 Cookie 的域名为 gulimall.com，确保跨域共享
           serializer.setDomainName("gulimall.com");
           // 返回配置好的 Cookie 序列化器
           return serializer;
       }
   }
   ```

### 7.3 常见应用场景

1. **微服务架构中的会话管理**
    在微服务环境下，不同服务可能会部署在多个不同的节点上，使用 Spring Session 可以共享用户会话，避免会话丢失。
2. **分布式缓存**
    通过将会话存储到 Redis 等缓存系统中，不仅能提高会话的可靠性，还能利用缓存提升性能。
3. **跨应用会话共享**
    在一些应用场景下，多个应用之间需要共享用户会话（例如一个单点登录系统），Spring Session 允许多个应用共享同一个会话。

## 8. 集成Redisson

### 8.1 Redisson 简介

Redisson 是一个基于 Redis 的 Java 客户端，提供了丰富的分布式功能，并且可以作为 Redis 数据结构的增强版。它封装了对 Redis 的操作，并提供了许多高层次的分布式功能，如分布式锁、分布式集合、分布式队列等。

Redisson 的主要特点：

- `支持多种分布式对象`：如分布式锁、分布式列表、集合、映射等。
- `集成支持`：它与 Spring、Spring Boot 和其他框架有很好的集成支持。
- `易于使用`：提供了与 Redis 的交互封装，简化了客户端代码。
- `高效的集群支持`：支持 Redis Sentinel 和 Redis Cluster，能够在分布式环境中保持高可用性。
- `高性能`：优化了对 Redis 服务器的操作性能，支持异步操作。

### 8.2 Redisson 的分布式功能

- `分布式锁`：Redisson 提供了分布式锁机制，保证多个客户端在不同节点之间的同步。可以通过 `RLock` 接口来使用。
- `分布式集合和映射`：Redisson 提供了多种分布式集合，如 `RMap`, `RList`, `RSet`, `RQueue` 等，支持常见的集合操作。
- `分布式计数器和信号量`：支持分布式计数器 (`RAtomicLong`)、信号量 (`RSemaphore`) 等操作。
- `分布式队列`：支持 `RBlockingQueue` 和 `RDeque` 等阻塞队列操作。
- `分布式主题和消息`：提供 `RTopic` 用于发布/订阅模式。
- `Redis 集群和哨兵支持`：原生支持 Redis Sentinel 和 Redis Cluster，能够轻松应对分布式环境。

### 8.3 Redisson 集成 Spring Boot

Redisson 提供了很好的与 Spring Boot 的集成。集成过程简单，可以通过配置文件来完成。

步骤：

1. `添加依赖`： 在 Spring Boot 项目的 `pom.xml` 中加入 Redisson 的依赖：

   ```xml
   <dependency>
       <groupId>org.redisson</groupId>
       <artifactId>redisson-spring-boot-starter</artifactId>
       <version>3.17.4</version>
   </dependency>
   ```

2. `配置 Redis 连接`： 在 `application.yml` 或 `application.properties` 中配置 Redis 连接：

   ```yaml
   redisson:
     address: "redis://127.0.0.1:6379"
     password: "your_password"
     database: 0
   ```
   
3. `使用 Redisson 客户端`： 通过 `RedissonClient` 来访问 Redis 数据结构：

   ```java
   @Autowired
   private RedissonClient redissonClient;
   
   public void useRedisson() {
       RLock lock = redissonClient.getLock("myLock");
       lock.lock();
       try {
           // 执行操作
       } finally {
           lock.unlock();
       }
   }
   ```

4. `注解支持`： Redisson 还支持 `@RedissonLock` 注解，可以更简便地使用分布式锁：

   ```java
   @RedissonLock("myLock")
   public void methodWithLock() {
       // 执行操作
   }
   ```

可以使用`配置类`
   ```java
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.io.IOException;

@Configuration
public class MyRedissonConfig {

    /**
     * 创建 RedissonClient 实例，这是与 Redis 进行交互的入口
     * @param url Redis 主机地址，从配置文件中读取（spring.redis.host）
     * @return 返回 RedissonClient 实例，所有对 Redisson 的使用都通过该实例进行
     * @throws IOException 如果在创建 RedissonClient 实例时发生 I/O 异常，抛出该异常
     */
    @Bean(destroyMethod = "shutdown")  // 定义一个 Bean，并指定在 Spring 容器销毁时调用 shutdown 方法
    public RedissonClient redisson(@Value("${spring.redis.host}") String url) throws IOException {
        // 1. 创建 Redis 配置对象
        Config config = new Config();
        // 设置 Redis 单节点的地址
        config.useSingleServer().setAddress("redis://"+url+":6379");

        // 2. 根据配置创建 RedissonClient 实例
        // RedissonClient 是与 Redis 交互的主要对象
        return Redisson.create(config);
    }
}
   ```

### 8.4 Redisson 与 Redis 的关系

Redisson 作为 Redis 的一个 Java 客户端，不仅仅是对 Redis 操作的封装，还扩展了很多高级特性：

- `Redis 的基本操作`：如字符串、哈希、列表、集合等基础数据结构的操作都可以通过 Redisson 来实现。
- `高级特性`：分布式锁、计数器、信号量等高级功能是 Redis 本身没有的，Redisson 提供了这些功能的实现。
- `事务支持`：Redisson 也提供了事务支持，可以在分布式环境中进行更复杂的操作。

### 8.5 常见使用场景

- `分布式锁`：适用于需要跨多个服务和应用实例进行同步的场景。
- `分布式队列`：适用于任务队列、消息队列等场景。
- `分布式缓存`：利用 Redis 的高性能缓存能力，可以作为分布式缓存使用。
- `分布式计数器`：用于计数、累加等操作，如页面访问计数、订单编号生成等。

## 9. 集成Sentinel

[跳转=>Sentinel](/notes/middleware/sentinel)

## 10. 集成Zipkin

[跳转=>Zipkin](/notes/middleware/zipkin)





