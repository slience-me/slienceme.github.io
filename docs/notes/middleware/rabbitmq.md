# 【中间件】RabbitMQ

## 0. 官网

- [RabbitMQ官网](https://www.rabbitmq.com/)
- [Spring AMQP 官网文档](https://spring.io/projects/spring-amqp)

## 1. RabbitMQ简介

RabbitMQ 是一个开源的消息中间件，它实现了高级消息队列协议（AMQP，Advanced Message Queuing Protocol），用于在应用程序之间传递消息。作为消息代理，它提供了可靠、异步的消息传递服务，能够帮助系统解耦、异步化、提高系统的可伸缩性和容错能力。

RabbitMQ 支持多种消息传递模式，如点对点、发布/订阅、工作队列等，因此它在微服务架构、分布式系统、任务调度、事件驱动架构等场景中得到了广泛应用。RabbitMQ 的高可用性和容错能力使得它能够保证消息的可靠性，即使在系统发生故障时，消息也不会丢失。

### 1.1 RabbitMQ的核心概念

RabbitMQ 的核心组成部分包括 **交换机（Exchange）**、**队列（Queue）** 和 **绑定（Binding）**。理解这些基本概念对正确使用 RabbitMQ 至关重要。

**Exchange（交换机）**：是消息的路由器。生产者发送的消息首先到达 Exchange，Exchange 根据消息的路由键（routing key）和绑定规则将消息路由到一个或多个队列中。

- `Direct Exchange（直连交换机）`：消息根据路由键`精确匹配`绑定的队列。
- `Fanout Exchange（扇形交换机）`：所有发布到该交换机的消息都会被`发送到所有`与之绑定的队列，适用于广播场景。
- `Topic Exchange（主题交换机）`：消息根据路由`键的匹配规则`发送到多个队列。路由键使用“.”分隔符，可以进行模糊匹配，例如`order.#`（`*`匹配零个或多个单词,`#`匹配一个单词）
- `Headers Exchange（头交换机）`：通过消息的头部信息进行路由，而不是通过路由键。可以根据消息头中的多个属性进行复杂的匹配。

**Queue（队列）**：队列是消息存储的地方。消费者从队列中获取消息进行处理。队列会按顺序存储消息，确保消息的有序消费。队列可以是**持久化**的（即消息重启后不会丢失）或**非持久化**的（即消息只存在内存中，服务重启后丢失）。

- `普通队列（Regular Queue）`：基本的消息队列，消息会根据消费者的消费速率逐个处理，适用于顺序处理的场景。
- `死信队列（Dead Letter Queue, DLQ）`：用于存储那些无法正常消费的消息。例如，消息过期、消费失败等。这些消息可以被转发到死信队列进行后续处理。
- `延迟队列（Delay Queue）`：消息在队列中等待一段时间后才被消费。常用于任务延迟、定时任务等场景。通常通过设置消息的 **TTL**（Time-To-Live）来实现。

**Binding（绑定）**：绑定是将队列与交换机进行关联的过程，指定消息应该根据什么规则（如路由键）从交换机路由到队列。绑定时会定义一个路由键，用来匹配发送到交换机的消息。

### 1.2 消息传递模式

RabbitMQ 支持几种常见的消息传递模式，能够满足不同的应用场景：

- `点对点模式（Queue-based Messaging）`：消息从生产者发送到一个队列，消费者从该队列中取出并处理消息。在这种模式下，消息只会被一个消费者消费。
- `发布/订阅模式（Pub/Sub）`：消息发布到一个交换机，多个订阅者（消费者）都可以接收到消息。通常使用 `Fanout Exchange` 来实现此模式。
- `工作队列模式（Work Queues）`：多个消费者从同一个队列中取出任务并处理。适用于负载均衡场景，确保任务在消费者之间均匀分配。
- `路由模式（Routing）`：通过设置特定的路由键，消费者只接收符合路由规则的消息。通常使用 `Direct Exchange` 或 `Topic Exchange` 来实现此模式。

### 1.3 消息确认机制

为了确保消息的可靠性，RabbitMQ 提供了消息确认机制，主要有两种方式：

- `发布方确认（Publisher Confirms）`：确保消息成功发送到交换机，并成功存储在RabbitMQ中。如果消息未成功发送到交换机，发布者会收到通知。
- `消费方确认（Consumer Acknowledgements）`：消费者在接收到消息后，会向 RabbitMQ 发送确认，确保消息已被成功处理。如果消费失败，可以选择拒绝消息并重新入队。

### 1.4 RabbitMQ的交换机和队列类型

- **交换机类型**：
  - `Direct Exchange`：根据路由`键精确匹配`队列，适用于`点对点模式`。
  - `Fanout Exchange`：将消息`广播`到所有绑定的队列，适用于`发布/订阅模式`。
  - `Topic Exchange`：根据路由`键的主题匹配`队列，支持模糊匹配。
  - `Headers Exchange`：根据`消息头部`信息进行路由。
- **队列类型**：
  - `普通队列（Regular Queue）`：最基本的队列类型，消息顺序消费。
  - `死信队列（Dead Letter Queue）`：存放处理失败或过期的消息。
  - `延迟队列（Delay Queue）`：消息在一定时间后才被消费。

### 1.5 RabbitMQ的高可用性

RabbitMQ 提供了多种方式来保证消息队列的高可用性，常见的方式有：

- `镜像队列（Mirrored Queues）`：通过将队列数据复制到多个节点，保证在某个节点发生故障时，消息不会丢失。
- `集群（Cluster）`：多个 RabbitMQ 节点组成集群，共享消息队列和交换机，增加容错性和扩展性。
- `持久化（Persistence）`：队列和消息可以设置为持久化，确保服务重启后消息不会丢失。

## 2. 安装与启动

### 2.1 系统级安装
安装`Erlang`：`RabbitMQ`是用`Erlang`编写的，因此需要先安装`Erlang`。

```bash
# 在Ubuntu/Debian上安装
sudo apt-get update
sudo apt-get install erlang

# 在CentOS上安装
sudo yum install erlang
```

安装`RabbitMQ`：

```bash
# 在Ubuntu/Debian上
sudo apt-get install rabbitmq-server

# 在CentOS上
sudo yum install rabbitmq-server
```

启动`RabbitMQ`服务：

```bash
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server
```

### 2.2 Docker内安装
[跳转=>Docker安装RabbitMQ](/notes/middleware/docker#_5-5-rabbitmq)

## 3. 常用命令

```bash
sudo systemctl start rabbitmq-server  # 启动RabbitMQ
sudo systemctl stop rabbitmq-server   # 停止RabbitMQ
sudo systemctl status rabbitmq-server # 查看RabbitMQ状态

# RabbitMQ提供一个Web管理界面，可以用以下命令启用
sudo rabbitmq-plugins enable rabbitmq_management   # 启用管理插件
sudo rabbitmqctl add_user new_user password        # 创建一个新的用户
sudo rabbitmqctl set_permissions -p / new_user ".*" ".*" ".*"  # 给用户赋予权限
sudo rabbitmqctl delete_user new_user              # 删除用户
sudo rabbitmqctl list_queues                       # 查看队列
```

## 4. Spring Boot 集成

### 4.1 引入依赖
在Spring Boot项目中集成RabbitMQ，你需要在`pom.xml`中添加`spring-boot-starter-amqp`依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

主类添加注解:

```java
@EnableRabbit // 开启rabbitmq
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 4.2 配置

在`application.properties`或`application.yml`中配置RabbitMQ的连接信息：

```properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
spring.rabbitmq.virtual-host=/
# 开启发送端确认
spring.rabbitmq.publisher-confirms=true  
# 开启发送端消息抵达队列确认
spring.rabbitmq.publisher-returns=true
# 只要抵达队列，以异步发送有限回调returnConfirm
spring.rabbitmq.template.mandatory=true
# 设置手动确认
spring.rabbitmq.listener.simple.acknowledge-mode=manual
```

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.annotation.PostConstruct;

@Slf4j
@Configuration
public class MyRabbitConfig {

    RabbitTemplate rabbitTemplate;

    /**
     * 配置RabbitTemplate
     * 通过ConnectionFactory创建一个RabbitTemplate实例并返回
     * 设置消息转换器为Jackson2JsonMessageConverter
     * 初始化RabbitTemplate相关设置
     */
    @Primary
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        this.rabbitTemplate = rabbitTemplate; // 存储RabbitTemplate实例，方便后续使用
        rabbitTemplate.setMessageConverter(messageConverter()); // 设置消息转换器
        initRabbitTemplate(); // 初始化RabbitTemplate配置
        return rabbitTemplate;
    }

    /**
     * 定义消息转换器，用于将消息转换成JSON格式
     */
    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter(); // 使用Jackson将消息转换为JSON
    }

    /**
     * 定制RabbitTemplate的回调函数，用于消息确认和返回消息的处理
     * 1. 配置消息成功投递到交换机后的回调
     * 2. 配置消息投递到队列失败后的回调
     * 3. 配置消费者手动确认消息的处理方式
     */
    public void initRabbitTemplate() {
        // 设置确认回调函数：当消息成功投递到交换机时会触发
        rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
            /**
             * 当消息成功投递到交换机时触发该回调（只要消息抵达Broker就会ack=true）
             * @param correlationData 当前消息的唯一关联数据（自定义）
             * @param ack 消息是否成功收到（ack为true表示消息成功接收）
             * @param cause 失败原因（如果ack为false，表示消息投递失败，cause中会包含失败的原因）
             */
            @Override
            public void confirm(CorrelationData correlationData, 
                                boolean ack, 
                                String cause) {
                log.info("日志");
            }
        });

        // 设置消息返回回调函数：当消息投递到交换机但没有投递到队列时触发
        rabbitTemplate.setReturnCallback(new RabbitTemplate.ReturnCallback() {
            /**
             * 消息投递到交换机了，但没有投递到队列（比如队列不存在、队列满等原因）
             * @param message 投递失败的消息详细信息
             * @param replyCode 回复的状态码
             * @param replyText 回复的文本内容
             * @param exchange 交换机
             * @param routingKey 路由键
             */
            @Override
            public void returnedMessage(Message message, 
                                        int replyCode, 
                                        String replyText, 
                                        String exchange, 
                                        String routingKey) {
                log.info("日志");
            }
        });
    }
}

```

### 4.3 操作

#### 1）创建普通队列

```java
/**
 * 创建一个普通队列
 *
 * @return 创建的队列
 * 
 * 方法说明：
 * String name：队列名称
 * boolean durable：队列是否持久化（持久化后RabbitMQ重启时队列仍然存在）
 * boolean exclusive：队列是否为排他队列（仅在当前连接有效，连接断开后队列被删除）
 * boolean autoDelete：队列是否自动删除（没有消费者时，队列会自动删除）
 */
@Bean
public Queue orderReleaseQueue() {
    // 创建一个普通的持久化队列
    Queue queue = new Queue("order.release.order.queue", true, false, false);
    return queue;
}
```

#### 2）创建死信队列

```java
/**
 * 创建一个死信队列（延迟队列）
 * 
 * @return 死信队列
 * 
 * 方法说明：
 * String name：队列名称
 * boolean durable：队列是否持久化（持久化后RabbitMQ重启时队列仍然存在）
 * boolean exclusive：队列是否为排他队列（仅在当前连接有效，连接断开后队列被删除）
 * boolean autoDelete：队列是否自动删除（没有消费者时，队列会自动删除）
 * Map<String, Object> arguments：队列的额外属性
 *     x-dead-letter-exchange：死信交换机的名称（消息无法投递到目标队列时，消息会被转发到死信交换机）
 *     x-dead-letter-routing-key：死信路由键（指定死信消息应该发送到哪个路由键）
 *     x-message-ttl：消息的过期时间（单位为毫秒，设置过期时间后，消息会在过期后转入死信队列）
 */
@Bean
public Queue orderDelayQueue() {
    // 创建一个延迟队列，并配置死信交换机和死信路由键
    HashMap<String, Object> arguments = new HashMap<>();
    arguments.put("x-dead-letter-exchange", "order-event-exchange"); // 设置死信交换机
    arguments.put("x-dead-letter-routing-key", "order.release.order"); // 设置死信路由键
    arguments.put("x-message-ttl", 600000); // 设置消息过期时间，单位为毫秒（600000ms = 10分钟）

    return new Queue("order.delay.queue", true, false, false, arguments);
}
```

#### 3）创建交换机

交换机用于将消息路由到一个或多个队列。以下是创建交换机的代码：

```java
/**
 * 创建一个交换机
 *
 * @return 创建的交换机
 * 
 * 方法说明：
 * String name：交换机的名称
 * boolean durable：交换机是否持久化（持久化后RabbitMQ重启时交换机仍然存在）
 * boolean autoDelete：交换机是否自动删除（没有绑定的队列时，交换机会自动删除）
 */
@Bean
public Exchange orderEventExchange() {
    // 创建一个主题交换机
    return new TopicExchange("order-event-exchange", true, false);
}
```

#### 4）创建队列与交换机的绑定

绑定是连接队列与交换机的关系，消息将通过交换机发送到对应的队列。

```java
/**
 * 创建订单创建的Binding（绑定）
 *
 * @return 创建的Binding
 * 
 * 方法说明：
 * String destination：绑定的目标（可以是队列名称或者交换机名称）
 * DestinationType destinationType：目标类型（Queue或Exchange）
 * String exchange：绑定的交换机名称
 * String routingKey：路由键（交换机根据路由键将消息发送到队列）
 * Map<String, Object> arguments：额外的绑定属性
 */
@Bean
public Binding orderCreateBinding() {
    return new Binding("order.delay.queue", // 队列名称
            Binding.DestinationType.QUEUE, // 目标类型是队列
            "order-event-exchange", // 交换机名称
            "order.create.order", // 路由键
            null); // 额外属性（无）
}
```

#### 6）发送消息

在RabbitMQ中，发送消息的核心是`RabbitTemplate`，你可以通过它来向交换机发送消息。下面是发送消息的代码示例：

```java
/**
 * 发送消息到指定的交换机和路由键
 *
 * @param exchange 交换机的名称
 * @param routingKey 路由键
 * @param message 消息体（可以是任何类型，RabbitTemplate会进行转换）
 */
public void sendMessage(String exchange, String routingKey, Object message) {
    try {
        // 使用rabbitTemplate发送消息
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
        log.info("Message sent to exchange: {}, routingKey: {}, message: {}", exchange, routingKey, message);
    } catch (Exception e) {
        log.error("Failed to send message to exchange: {}, routingKey: {}", exchange, routingKey, e);
    }
}
```

- `exchange`：交换机的名称，消息将会发送到这个交换机。
- `routingKey`：路由键，交换机通过路由键将消息转发到绑定的队列。
- `message`：消息体，可以是任何类型，`RabbitTemplate`会根据配置的`MessageConverter`进行序列化。

调用示例：

```java
// 发送一条订单创建的消息
sendMessage("order-event-exchange", "order.create.order", order);
```

#### 7）监听消息（消费者）

`@RabbitListener` 和 `@RabbitHandler` 都是 Spring AMQP 提供的注解，用于处理 RabbitMQ 消息。它们有着不同的使用场景和目的，下面我会详细介绍它们的使用方式，并解释它们之间的关系。

##### `@RabbitListener`

`@RabbitListener` 是用于在方法上定义消息消费者的注解。它可以将方法与特定队列绑定，当队列中有消息到达时，方法会被触发执行。

使用方式：

- **`@RabbitListener`** 注解通常用于类或方法上，指定要监听的队列。
- 支持 **自动确认** 或 **手动确认**（通过配置 `acknowledgeMode`）。

示例：

```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MyRabbitListener {

    /**
     * 监听订单创建消息
     *
     * @param message 消息体
     */
    @RabbitListener(queues = "order.release.order.queue")
    public void listenOrderReleaseMessage(String message) {
        log.info("Received message from order.release.order.queue: {}", message);
        // 处理消息的业务逻辑
    }

    /**
     * 监听秒杀订单消息
     *
     * @param message 消息体
     */
    @RabbitListener(queues = "order.seckill.order.queue")
    public void listenSecKillOrderMessage(String message) {
        log.info("Received message from order.seckill.order.queue: {}", message);
        // 处理秒杀订单的业务逻辑
    }
}
```

- **`queues`**：指定监听的队列名称。可以使用`@RabbitListener`注解在类或方法上标记来监听队列。
- **自动确认**：如果没有特别配置，Spring 会默认使用自动确认的方式，也就是说消息在到达时会立即确认。

##### `@RabbitHandler`

`@RabbitHandler` 是用于方法的注解，用于处理同一队列中不同类型的消息。它通常与 **`@RabbitListener`** 配合使用，支持多方法处理不同类型的消息。当你有多个不同类型的消息需要监听时，使用 `@RabbitHandler` 可以让一个类同时处理不同类型的消息。

使用方式：

- `@RabbitHandler` 标记的多个方法可以用于同一个队列的不同消息类型。
- 每个 `@RabbitHandler` 方法对应不同的消息体类型，它们会根据消息的类型来选择合适的方法处理。

示例：

```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RabbitListener(queues = "order.release.order.queue")
public class MyRabbitListener {

    /**
     * 处理字符串类型的消息
     *
     * @param message 消息体
     */
    @RabbitHandler
    public void handleStringMessage(String message) {
        log.info("Received String message: {}", message);
        // 处理字符串类型的消息
    }

    /**
     * 处理订单对象类型的消息
     *
     * @param order 订单对象
     */
    @RabbitHandler
    public void handleOrderMessage(Order order) {
        log.info("Received Order message: {}", order);
        // 处理订单对象类型的消息
    }

    /**
     * 处理JSON格式的消息（Map类型）
     *
     * @param message 消息体
     */
    @RabbitHandler
    public void handleMapMessage(Map<String, Object> message) {
        log.info("Received Map message: {}", message);
        // 处理 Map 类型的消息
    }
}
```

- **`@RabbitHandler`**：用来标记同一类消息队列中不同类型的消息处理方法。
- **类型匹配**：当有多个消息处理方法时，Spring 会根据消息的类型来选择匹配的 `@RabbitHandler` 方法。如果消息的类型匹配了多个方法，则优先选择最精确匹配的方法。
- 如果消息的类型与所有 `@RabbitHandler` 方法都不匹配，则会抛出异常。

##### @RabbitListener@RabbitHandler

`@RabbitListener` 通常用来指定一个队列，而 `@RabbitHandler` 则用于区分该队列中不同类型的消息。

示例：

```java
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MyRabbitListener {

    /**
     * 监听订单队列
     */
    @RabbitListener(queues = "order.release.order.queue")
    public static class OrderReleaseQueueListener {

        /**
         * 处理字符串类型的消息
         *
         * @param message 消息体
         */
        @RabbitHandler
        public void handleStringMessage(String message) {
            log.info("Received String message: {}", message);
            // 处理字符串类型的消息
        }

        /**
         * 处理订单对象类型的消息
         *
         * @param order 订单对象
         */
        @RabbitHandler
        public void handleOrderMessage(Order order) {
            log.info("Received Order message: {}", order);
            // 处理订单对象类型的消息
        }
    }

    /**
     * 监听秒杀订单队列
     */
    @RabbitListener(queues = "order.seckill.order.queue")
    public static class SecKillQueueListener {

        /**
         * 处理秒杀订单对象类型的消息
         *
         * @param secKillOrder 秒杀订单
         */
        @RabbitHandler
        public void handleSecKillOrder(SecKillOrder secKillOrder) {
            log.info("Received SecKillOrder message: {}", secKillOrder);
            // 处理秒杀订单消息
        }
    }
}
```

- **多个监听器**：通过 `@RabbitListener` 注解可以在一个类中处理多个队列。
- **多个 `@RabbitHandler` 方法**：可以根据不同的消息类型（比如字符串、对象、Map等）使用不同的方法来处理。

##### 自动确认 vs 手动确认

默认情况下，消息消费后会自动确认（ACK）。如果想使用手动确认，可以通过设置`@RabbitListener`的`acknowledgeMode`属性来控制：

```java
@RabbitListener(queues = "order.release.order.queue", acknowledgeMode = AcknowledgeMode.MANUAL)
public void listenOrderReleaseMessage(Message message, Channel channel) throws Exception {
    try {
        log.info("Received message: {}", message);
        // 处理消息的业务逻辑
        channel.basicAck(message.getMessageProperties().getDeliveryTag(), false); // 手动确认
    } catch (Exception e) {
        channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true); // 消费失败，重新入队
        log.error("Failed to process message, message will be requeued: {}", message);
    }
}
```

- `acknowledgeMode = AcknowledgeMode.MANUAL`：指定手动确认。
- `channel.basicAck`：手动确认消息，确认消息已经成功消费。
- `channel.basicNack`：如果消息消费失败，可以拒绝消息，并且让消息重新入队（`requeue=true`）。

## 5. RabbitMQ集群

[跳转=>RebbitMQ集群搭建](/notes/middleware/cluster#rabbitmq集群)