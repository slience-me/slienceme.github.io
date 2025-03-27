# 【中间件】Redis

## 0. 官网

- [Redis官网](https://redis.io/)
- [Redis中文网](https://www.redis.net.cn/)
- [Spring Data Redis](https://spring.io/projects/spring-data-redis)
- [菜鸟教程Redis](https://www.runoob.com/redis/redis-tutorial.html)

## 1. Redis 简介

Redis（Remote Dictionary Server）是一个基于内存的**高性能键值数据库**，支持多种数据结构，常用于缓存、消息队列、分布式锁等场景。

Redis 主要特性

- **基于内存**，读写速度快
- **支持多种数据结构**（String、List、Set、Hash、ZSet等）
- **支持持久化**（RDB、AOF）
- **支持主从复制**和**集群**
- **支持事务**
- **提供发布/订阅功能**

------

## 2. Redis 安装与启动

### 系统级安装

```bash
# Ubuntu
sudo apt update
sudo apt install redis

# CentOS
sudo yum install epel-release
sudo yum install redis
```

**启动 Redis**

```bash
redis-server /etc/redis/redis.conf  # 启动Redis服务
```

**测试是否安装成功**

```bash
redis-cli ping # 连接Redis数据库
```

返回 `PONG` 表示 Redis 运行成功。

**redis开启远程服务的操作方法：**

```
1.打开redis的配置文件“redis.conf”。
2.将“bind 127.0.0.1”注释掉。
3.将“protected-mode yes”改成“protected-mode no”。
4.添加以下一行代码。
daemonize no
5.重启redis服务即可。
```

### Docker内安装

[跳转=>docker安装redis教程](/notes/middleware/docker#_5-2-redis)

## 3. Redis 常用命令

[跳转=>具体的指令笔记](/notes/hidden/redis-basic)

| 命令                                 | 说明            |
|------------------------------------|---------------|
| `SET key value`                    | 设置键值          |
| `GET key`                          | 获取键值          |
| `DEL key`                          | 删除键           |
| `EXPIRE key seconds`               | 设置键的过期时间      |
| `TTL key`                          | 查看剩余存活时间      |
| `INCR key`                         | 自增1           |
| `DECR key`                         | 自减1           |
| `LPUSH key value`                  | 向列表左侧插入值      |
| `RPUSH key value`                  | 向列表右侧插入值      |
| `LRANGE key start end`             | 获取列表范围        |
| `SADD key member`                  | 向集合添加元素       |
| `SMEMBERS key`                     | 获取集合所有元素      |
| `ZADD key score member`            | 向有序集合添加元素     |
| `ZRANGE key start stop WITHSCORES` | 获取有序集合中的元素及分数 |
| `HSET key field value`             | 设置哈希表字段值      |
| `HGET key field`                   | 获取哈希表字段值      |

------

## **4. Spring Boot 集成 Redis**

### **4.1 引入 Redis 依赖**

在 `pom.xml` 添加：

```xml

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

------

### **4.2 配置 Redis**

在 `application.yml` 中添加：

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:  # 如果没有密码可留空
    database: 0  # 默认数据库
    timeout: 5000ms  # 连接超时时间
    lettuce:
      pool:
        max-active: 10  # 最大连接数
        max-idle: 5  # 最大空闲连接数
        min-idle: 2  # 最小空闲连接数
        max-wait: 2000ms  # 连接等待时间
```

------

### **4.3 使用 RedisTemplate 操作 Redis**

Spring Boot 默认使用 `Lettuce` 作为 Redis 客户端，并提供 `RedisTemplate` 进行操作。

#### **（1）配置 RedisTemplate**

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 设置 key 和 value 的序列化方式
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        
        template.afterPropertiesSet();
        return template;
    }
}
```

------

### **4.4 Redis 常见操作**

#### **（1）基本存取**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // 存储数据
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    // 获取数据
    public String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    // 删除数据
    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
```

#### **（2）操作 Hash（哈希表）**

```java
// 存储哈希数据
redisTemplate.opsForHash().put("user:1001", "name", "张三");
redisTemplate.opsForHash().put("user:1001", "age", "28");

// 获取哈希数据
String name = (String) redisTemplate.opsForHash().get("user:1001", "name");
System.out.println(name);
```

#### **（3）操作 List（列表）**

```java
// 从左侧插入数据
redisTemplate.opsForList().leftPush("tasks", "任务1");
redisTemplate.opsForList().leftPush("tasks", "任务2");

// 获取列表数据
List<Object> tasks = redisTemplate.opsForList().range("tasks", 0, -1);
System.out.println(tasks);
```

------

## **5. Spring Cache + Redis（简化缓存管理）**

Spring Boot 提供 `@Cacheable` 结合 Redis 进行缓存。

### **5.1 启用缓存**

在 `SpringBootApplication` 类上添加：

```java
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableCaching
public class RedisApplication {
    public static void main(String[] args) {
        SpringApplication.run(RedisApplication.class, args);
    }
}
```

### **5.2 使用 @Cacheable**

```java
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Cacheable(value = "user", key = "#id")
    public String getUserById(String id) {
        System.out.println("查询数据库...");
        return "用户" + id;
    }
}
```

**说明：**

- `@Cacheable(value = "user", key = "#id")`：表示缓存 `user:id`，下次查询相同 `id` 会直接从 Redis 获取数据，不再查询数据库。

整理后的内容：

### 5.3 不足之处

#### 读模式

- `缓存穿透`：查询一个null数据
   解决方案：缓存空数据，可以通过 `spring.cache.redis.cache-null-values=true` 来避免。
- `缓存击穿`：大量并发查询一个正好过期的数据
   解决方案：加锁（默认情况下Spring Cache是无加锁的），可以使用 `sync = true` 来解决击穿问题。
- `缓存雪崩`：大量的key同时过期
   解决方案：为缓存的过期时间加上随机时间，避免大量缓存同时失效。

#### 写模式（确保缓存与数据库一致）

- `读写加锁`：为了保证读写一致性，可以在读写操作时加锁。
- `引入Canal`：通过Canal感知MySQL的更新，从而去更新Redis缓存。
- `读多写多`：在读多写多的场景下，直接查询数据库，减少对缓存的依赖。

**总结**

- `常规数据`：适合读多写少且一致性要求不高的数据，完全可以使用Spring-Cache进行缓存。
- `写模式`：只要缓存的数据有过期时间，通常就足够了。
- `特殊数据`：对于特殊需求的数据，可能需要额外的设计来处理。

## 【Q&A】问题汇总

在 Spring Boot 项目中，默认的 Redis 客户端是 **Lettuce**，但很多开发者会手动去掉 Lettuce，并改用 **Jedis**。其主要原因如下：

## 1. Lettuce vs. Jedis

Spring Boot 默认使用 **Lettuce** 作为 Redis 连接池，而 Jedis 需要手动引入。那么为什么要替换呢？可以从**连接方式、性能、线程安全性
**等方面进行对比：

| 对比项       | Lettuce                         | Jedis                         |
|-----------|---------------------------------|-------------------------------|
| **连接方式**  | 基于 Netty，**异步 & 非阻塞**           | **同步 & 阻塞**                   |
| **线程安全性** | **多线程安全**，可以在多个线程共享同一个连接        | **非线程安全**，每个 Jedis 实例只能用于一个线程 |
| **性能**    | 适用于**高并发**和**异步任务**，连接池管理较好     | 适用于**同步任务**，但高并发下需要**连接池**    |
| **连接池支持** | Lettuce 默认**不需要连接池**，一个连接支持多个线程 | Jedis 必须**依赖连接池**，否则会导致线程冲突   |
| **使用难度**  | 需要学习 Netty 相关概念                 | API 设计简单，使用方便                 |
| **官方推荐**  | **Spring 官方推荐**，并作为默认实现         | 仍然支持，但更推荐 Lettuce             |

------

## **2. 为什么要改用 Jedis？**

虽然 Spring Boot 默认使用 Lettuce，但有些场景下，Jedis 可能更适合：

1. **同步阻塞模式更简单**：

- Jedis 采用同步方式，调用 Redis 命令时会**等待执行完成**后返回，逻辑清晰，适合**传统同步应用**。
- Lettuce 采用 Netty 实现异步通信，虽然支持同步调用，但底层依然是基于 Future 或 Reactive 方式，可能不太直观。

2. **避免 Lettuce 在高并发环境下的 BUG**

- 在高并发环境下，Lettuce 可能会因为连接复用出现 `RedisCommandTimeoutException` 或 `connection reset` 问题。
- Jedis 由于使用连接池，避免了这种问题，连接池满时会等待或拒绝新请求。

3. **Jedis 兼容性更好**

- 一些老项目已经使用 Jedis，团队熟悉其 API，避免迁移带来的不确定性。
- 一些 Redis 相关库（如 Redisson）依赖 Jedis 进行底层操作。

4. **Jedis 适用于短连接场景**

- Lettuce 适合长连接场景（如微服务、Spring Cloud），但如果应用的 Redis 连接是**短连接**，Jedis 结合连接池的方式更加稳定。

------

## **3. Spring Boot 如何替换 Lettuce 为 Jedis**

在 `pom.xml` 中进行如下修改：

```xml
<!--去掉默认的 Lettuce 依赖-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
  <exclusions>
    <exclusion>
      <groupId>io.lettuce.core</groupId>
      <artifactId>lettuce-core</artifactId>
    </exclusion>
  </exclusions>
</dependency>

  <!--使用 Jedis 作为 Redis 客户端-->
<dependency>
<groupId>redis.clients</groupId>
<artifactId>jedis</artifactId>
</dependency>
```

### **配置 Jedis 连接池**

在 `RedisConfig.java` 中手动配置 `JedisConnectionFactory`：

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import redis.clients.jedis.JedisPoolConfig;

@Configuration
public class RedisConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(10);  // 最大连接数
        poolConfig.setMaxIdle(5);    // 最大空闲连接数
        poolConfig.setMinIdle(2);    // 最小空闲连接数
        poolConfig.setMaxWaitMillis(2000); // 连接等待时间

        JedisClientConfiguration clientConfig = JedisClientConfiguration.builder()
                .usePooling()
                .poolConfig(poolConfig)
                .build();

        return new JedisConnectionFactory(clientConfig);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        return template;
    }
}
```

------

## **4. 什么时候应该继续使用 Lettuce？**

虽然 Jedis 适合某些特定场景，但 **Lettuce 仍然是 Spring Boot 官方推荐的 Redis 客户端**，在以下情况下建议继续使用 Lettuce：

- **高并发环境**，需要高效连接复用，避免 Jedis 连接池的开销。
- **微服务架构**，Lettuce 更适合 Spring Cloud、Reactive WebFlux 这样的异步环境。
- **不想维护连接池**，Lettuce 默认使用 Netty，不需要连接池，而 Jedis 需要手动管理。

------

## **5. 总结**

| 方案              | 适用场景              | 线程安全性             | 连接池 |
|-----------------|-------------------|-------------------|-----|
| **Lettuce（默认）** | 适用于高并发、微服务、异步场景   | **多线程安全**         | 不需要 |
| **Jedis**       | 适用于同步任务、短连接、老项目兼容 | **非线程安全**（必须用连接池） | 需要  |

### **选择建议**

✅ **如果是 Spring Boot 默认配置，推荐使用 Lettuce**（除非有特殊需求）。
✅ **如果应用是同步阻塞模式，Jedis 可能更直观，适合短连接任务**。
✅ **如果高并发场景但仍想用 Jedis，一定要配合连接池**。

如果你的项目不涉及高并发，**可以继续使用 Jedis**，但如果是 **高并发+微服务**，建议使用 **Lettuce**。

👉 **如果你的团队已有大量 Jedis 代码，并且运行稳定，没有性能问题，就可以继续使用 Jedis。否则，优先考虑 Lettuce。** 🚀
