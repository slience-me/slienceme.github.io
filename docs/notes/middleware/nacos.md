# 【中间件】nacos

一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。[使用文档](https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/spring-cloud-alibaba-examples/nacos-example/readme-zh.md)

## 注册中心

**Spring Cloud Alibaba Nacos Discovery如何接入(作为服务注册中心)**

在启动 Nacos Discovery 示例进行演示之前，了解一下 Spring Cloud 应用如何接入 Nacos Discovery。

1. 首先，修改 `pom.xml` 文件，引入 `spring-cloud-alibaba-nacos-discovery-starter`；

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   </dependency>
   ```

2. 在应用的 `/src/main/resources/application.properties` 配置文件中配置 `Nacos Server`地址；

   ```properties
   spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
   ```

3. 使用 `@EnableDiscoveryClient` 注解开启服务注册与发现功能；

   ```java
   @SpringBootApplication
   @EnableDiscoveryClient
   public class ProviderApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(ProviderApplication.class, args);
       }
   
       @RestController
       class EchoController {
           @GetMapping(value = "/echo/{string}")
           public String echo(@PathVariable String string) {
                   return string;
           }
       }
   }
   ```

**应用启动**

1. 增加配置，在 `nacos-discovery-provider-example` 项目的 `/src/main/resources/application.properties` 中添加基本配置信息；

   ```properties
   spring.application.name=service-provider
   server.port=18082
   ```

2. 启动应用，支持 IDE 直接启动和编译打包后启动。

3. IDE直接启动：找到 `nacos-discovery-provider-example` 项目的主类 `ProviderApplication`，执行 main 方法启动应用。

4. 打包编译后启动：在 `nacos-discovery-provider-example` 项目中执行 `mvn clean package` 将工程编译打包，然后执行
   `java -jar nacos-discovery-provider-example.jar`启动应用。

## 配置中心

**Spring Cloud Alibaba Nacos Config如何接入(作为服务配置中心)**

在启动应用示例进行项目功能演示之前，先了解一下 Spring Cloud 应用如何接入 Nacos Config 作为服务配置中心。

1. 首先，修改 `pom.xml` 文件，引入 `spring-cloud-starter-alibaba-nacos-config`   ；

   ```xml
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
   </dependency>
   ```

2. 在应用的 `/src/main/resources/bootstrap.properties` 配置文件中配置 Nacos 地址并引入服务配置；

   ```properties
   spring.application.name=service-provider
   spring.cloud.nacos.config.server-addr=192.168.50.3:8848
   ```

3. 总结：先引入依赖，创建一个`bootstrap.properties`配置文件，给配置中心默认添加一个叫 数据集(Data Id) 日志找到
   `gulimall-coupon.properties`，默认规则是，`应用名.properties`；然后可以给它添加任何配置；可以设置动态获取配置通过注解
   `@RefreshScope`动态刷新配置; `@Value`取值

   > **配置中心的配置文件 优先级 更高**

   ```java
   // 日志
   Located property source: CompositePropertySource {name='NACOS', propertySources=[NacosPropertySource {name='gulimall-coupon.properties'}]}
   
   // 示例代码
   @RefreshScope //开启配置文件刷新
   @RestController
   @RequestMapping("coupon/coupon")
   public class CouponController {
       @Autowired
       private CouponService couponService;
   		
       @Value("${coupon.user.name}")
       private String name;
       @Value("${coupon.user.age}")
       private Integer age;
   ```

**更多的细节**

1. 命名空间: 配置隔离

   默认: public(保留空间); 默认新增的所有配置都在public空间。

   情况一（基于环境隔离）：区分不同的环境：开发、测试、生产；利用命名空间来做环境隔离

   ```properties
   # 在bootstrap.properties配置上，指明 使用哪个命名空间下的配置
   spring.cloud.nacos.config.namespace=d028d4a1-44e2-461f-92fa-*******
   ```

   情况二（基于微服务隔离）：每一个微服务之间互相隔离配置，每一个微服务都创建自己的命名空间，只加载自己命名空间下的配置

2. 配置集：所有配置的集合

3. 配置集ID：类似于配置文件名

   Data ID：类似文件名

4. 配置分组：

   默认所有的配置集都属于：DEFAULT_GROUP

   双11、618、双12活动相关

   需要修改在`bootstrap.properties`配置文件进行修改

   ```properties
   # 指定分组
   spring.cloud.nacos.config.group=*********
   ```

   常规用法：

   	每个微服务创建自己的命名空间nameapace、使用配置分组区分环境，dev、test、prod

   可以同时加载多个配置集

   可以根据功能拆分的更细，例如datasource.yml、mybatis.yml、other.yml等

   ```properties
   spring.application.name=gulimall-coupon
   spring.cloud.nacos.config.server-addr=127.0.0.1:8848
   spring.cloud.nacos.config.namespace=85b1ece6-8158-4798-bf9b-329eb448c72b
   spring.cloud.nacos.config.group=prod
   
   spring.cloud.nacos.config.ext-config[0].data-id=datasource.yml
   spring.cloud.nacos.config.ext-config[0].group=dev
   spring.cloud.nacos.config.ext-config[0].refresh=true
   ```
