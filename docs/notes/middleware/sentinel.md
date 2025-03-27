# Sentinel

## 0. 官网

- [Sentinel官网](https://sentinelguard.io/zh-cn/)

集成 **Sentinel**（通常指的是 **Sentinel** 熔断器，流量控制等服务治理的框架）到项目中，主要涉及以下几个关键步骤和知识点：

> 注：最新内容直接看官方文档
>
> 下面这个是AI生成的，先不改了

## 1. 引入依赖

在项目的 `pom.xml` 文件中添加 Sentinel 的依赖：

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
    <version>1.8.3</version> <!-- 版本可根据需要调整 -->
</dependency>
```

## 2. **配置 Sentinel 控制台**

- `启动 Sentinel 控制台`：Sentinel 提供了一个可视化控制台，用于查看和管理流量控制规则。可以从 [GitHub](https://github.com/alibaba/Sentinel) 下载并启动控制台。

- `连接控制台`：通过配置 `application.properties` 或 `application.yml`，连接 Sentinel 控制台。

  ```properties
  sentinel.dashboard.address=127.0.0.1:8080
  ```

## 3. 使用注解或代码配置 Sentinel 规则

- `基于注解的配置`：使用 `@SentinelResource` 注解来标记方法，设置流量控制和熔断策略。

  ```java
  @SentinelResource(value = "myResource", blockHandler = "handleBlock")
  public String myMethod() {
      return "Hello Sentinel";
  }
  
  public String handleBlock(BlockException ex) {
      return "Request Blocked!";
  }
  ```

- **代码配置流量规则**：通过 Java 代码动态设置流量控制规则（QPS、并发线程数等）。

  ```java
  FlowRule rule = new FlowRule();
  rule.setResource("myResource");
  rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
  rule.setCount(10); // 设置 QPS 限制为 10
  FlowRuleManager.loadRules(Collections.singletonList(rule));
  ```

## 4. 流量控制策略

- `QPS 限流`：通过设置 `FlowRule`，限制每秒请求数。
- `线程数限流`：通过设置线程数来控制并发量。
- `熔断与降级`：当请求的错误率或响应时间超过阈值时，开启熔断或降级处理。

## 5. 整合 Spring Boot 或 Spring Cloud

Sentinel 提供了与 Spring Boot 和 Spring Cloud 的集成方式，简化了配置。

- `Spring Boot 集成`：在 `application.properties` 中启用 Sentinel 支持。

  ```properties
  spring.cloud.sentinel.transport.dashboard=127.0.0.1:8080
  ```

- `Spring Cloud 集成`：与 Spring Cloud 微服务架构兼容，支持流量控制、熔断、限流等功能。

## 6. 动态规则管理

- `控制台配置`：通过 Sentinel 控制台动态调整流量控制规则。
- `API 动态调整`：可以通过代码更新规则，如添加或删除流量控制规则。

## 7. 监控与告警

Sentinel 提供了详细的监控和告警功能，可以查看资源的实时运行状况。可以通过控制台或集成 Prometheus、Grafana 进行监控。

## 8. 容错与降级

- `降级策略`：当某些资源发生故障时，自动进行降级处理。
- `熔断策略`：通过熔断器控制服务的调用，防止错误请求过多影响整个系统。

通过这些步骤，你可以成功地将 Sentinel 集成到项目中，实现流量控制、熔断、降级等服务治理功能。