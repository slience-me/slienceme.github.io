# LangChain4j

## 0.官网

- [LangChain4j官网](https://docs.langchain4j.dev/)
- [LangChain4j中文网](https://docs.langchain4j.info/)
- [LangChain4J学习代码仓库](https://github.com/slience-me/LangChain4j-Study)

## 1. LangChain4J理论概述

LangChain4j 的目标是简化将 LLM 集成到 Java 应用程序中的过程。

具体方式如下：

1. **统一 API：** LLM 提供商（如 OpenAI 或 Google Vertex AI）和嵌入（向量）存储（如 Pinecone 或 Milvus） 使用专有 API。LangChain4j 提供统一的 API，避免了学习和实现每个特定 API 的需求。 要尝试不同的 LLM 或嵌入存储，您可以在它们之间轻松切换，无需重写代码。 LangChain4j 目前支持 [15+ 个流行的 LLM 提供商](https://docs.langchain4j.info/integrations/language-models/) 和 [20+ 个嵌入存储](https://docs.langchain4j.info/integrations/embedding-stores/)。
2. **全面的工具箱：** 自 2023 年初以来，社区一直在构建众多 LLM 驱动的应用程序， 识别常见的抽象、模式和技术。LangChain4j 将这些提炼成一个即用型包。 工具箱包含从低级提示模板、聊天记忆管理和函数调用 到高级模式如代理和 RAG 的工具。 对于每个抽象，我们提供一个接口以及基于常见技术的多个即用型实现。 无论您是在构建聊天机器人还是开发包含从数据摄取到检索完整管道的 RAG， LangChain4j 都提供多种选择。
3. **丰富的示例：** 这些[示例](https://github.com/langchain4j/langchain4j-examples)展示了如何开始创建各种 LLM 驱动的应用程序， 提供灵感并使您能够快速开始构建。

## 2. 简单入门

LangChain4j 提供了与许多 LLM 提供商、嵌入/向量存储等的集成。每种集成都有其自己的 Maven 依赖。

最低支持的 JDK 版本是 17。

例如，我们可以导入 OpenAI 依赖：

- 在 pom.xml 中使用 Maven 时：

```xml-dtd
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
    <version>1.1.0</version>
</dependency>
```

如果您希望使用高级 AI 服务 API，还需要添加以下依赖：

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
    <version>1.1.0</version>
</dependency>
```

物料清单（BOM）

::: tip

请注意， `langchain4j-bom` 始终包含 LangChain4j 所有模块的最新版本。

请注意，虽然 `langchain4j-bom` 版本是 `1.1.0` ，但许多模块仍然使用版本 `1.1.0-beta7` ，因此这些模块将来可能会有一些不兼容的更改。

:::

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-bom</artifactId>
            <version>1.1.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

然后，导入你的 OpenAI API 密钥。建议将 API 密钥存储在环境变量中，以降低泄露的风险。

```java
String apiKey = System.getenv("OPENAI_API_KEY");
```

设置好密钥后，让我们创建一个 OpenAiChatModel 的实例：

```java
OpenAiChatModel model = OpenAiChatModel.builder()
    .apiKey(apiKey)
    .modelName("gpt-4o-mini")
    .build();
```

现在，开始聊天吧！

```java
String answer = model.chat("Say 'Hello World'");
System.out.println(answer); // Hello World
```

## 3. Spring Boot集成

> LangChain4j Spring Boot 集成需要 Java 17 和 Spring Boot 3.2。

LangChain4j 为以下内容提供了 [Spring Boot 启动器](https://github.com/langchain4j/langchain4j-spring)：

- popular integrations 流行的集成
- declarative [AI Services](https://docs.langchain4j.dev/tutorials/ai-services) 声明式 AI 服务

### 3.1 Spring Boot启动器

Spring Boot 启动器通过属性配置帮助创建和配置 [语言模型](https://docs.langchain4j.info/category/language-models)、 [嵌入模型](https://docs.langchain4j.info/category/embedding-models)、 [嵌入存储](https://docs.langchain4j.info/category/embedding-stores) 和其他 LangChain4j 核心组件。

要使用 [Spring Boot 启动器](https://github.com/langchain4j/langchain4j-spring) 之一， 请导入相应的依赖项。

Spring Boot 启动器依赖项的命名约定是：`langchain4j-{integration-name}-spring-boot-starter`。

例如，对于 OpenAI (`langchain4j-open-ai`)，依赖项名称为 `langchain4j-open-ai-spring-boot-starter`：

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
    <version>1.0.0-beta3</version>
</dependency>
```

然后，您可以在 `application.properties` 文件中配置模型参数，如下所示：

```properties
langchain4j.open-ai.chat-model.api-key=${OPENAI_API_KEY}
langchain4j.open-ai.chat-model.model-name=gpt-4o
langchain4j.open-ai.chat-model.log-requests=true
langchain4j.open-ai.chat-model.log-responses=true
...
```

在这种情况下，将自动创建 `OpenAiChatModel`（`ChatLanguageModel` 的实现）的实例， 您可以在需要的地方自动装配它：

```java
@RestController
public class ChatController {

    ChatLanguageModel chatLanguageModel;

    public ChatController(ChatLanguageModel chatLanguageModel) {
        this.chatLanguageModel = chatLanguageModel;
    }

    @GetMapping("/chat")
    public String model(@RequestParam(value = "message", defaultValue = "Hello") String message) {
        return chatLanguageModel.chat(message);
    }
}
```

如果您需要 `StreamingChatLanguageModel` 的实例， 请使用 `streaming-chat-model` 而不是 `chat-model` 属性：

```properties
langchain4j.open-ai.streaming-chat-model.api-key=${OPENAI_API_KEY}
...
```

### 3.2 声明式AI服务的Spring Boot启动器

#### 自动组件装配

如果以下组件在应用程序上下文中可用，它们将自动装配到 AI 服务中：

- `ChatLanguageModel`
- `StreamingChatLanguageModel`
- `ChatMemory`
- `ChatMemoryProvider`
- `ContentRetriever`
- `RetrievalAugmentor`
- 任何 `@Component` 或 `@Service` 类中带有 `@Tool` 注解的所有方法 示例：

```java
@Component
public class BookingTools {

    private final BookingService bookingService;

    public BookingTools(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Tool
    public Booking getBookingDetails(String bookingNumber, String customerName, String customerSurname) {
        return bookingService.getBookingDetails(bookingNumber, customerName, customerSurname);
    }

    @Tool
    public void cancelBooking(String bookingNumber, String customerName, String customerSurname) {
        bookingService.cancelBooking(bookingNumber, customerName, customerSurname);
    }
}
```

::: info

如果应用程序上下文中存在多个相同类型的组件，应用程序将无法启动。 在这种情况下，请使用显式装配模式（下面解释）。

:::

#### 显式组件装配

如果您有多个 AI 服务，并希望将不同的 LangChain4j 组件装配到每个服务中， 您可以使用显式装配模式（`@AiService(wiringMode = EXPLICIT)`）指定要使用的组件。

假设我们配置了两个 `ChatLanguageModel`：

```properties
# OpenAI
langchain4j.open-ai.chat-model.api-key=${OPENAI_API_KEY}
langchain4j.open-ai.chat-model.model-name=gpt-4o-mini

# Ollama
langchain4j.ollama.chat-model.base-url=http://localhost:11434
langchain4j.ollama.chat-model.model-name=llama3.1
```

```java
@AiService(wiringMode = EXPLICIT, chatModel = "openAiChatModel")
interface OpenAiAssistant {
    @SystemMessage("You are a polite assistant")
    String chat(String userMessage);
}
@AiService(wiringMode = EXPLICIT, chatModel = "ollamaChatModel")
interface OllamaAssistant {
    @SystemMessage("You are a polite assistant")
    String chat(String userMessage);
}
```

::: info

在这种情况下，您必须显式指定**所有**组件。

更多详细信息可以在[这里](https://github.com/langchain4j/langchain4j-spring/blob/main/langchain4j-spring-boot-starter/src/main/java/dev/langchain4j/service/spring/AiService.java)找到。

:::

#### 监听 AI 服务注册事件

在以声明方式完成 AI 服务的开发后，您可以通过实现 `ApplicationListener<AiServiceRegisteredEvent>` 接口来监听 `AiServiceRegisteredEvent`。 当 AI 服务在 Spring 上下文中注册时，会触发此事件， 使您能够在运行时获取有关所有已注册的 AI 服务及其工具的信息。 以下是一个示例：

```java
@Component
class AiServiceRegisteredEventListener implements ApplicationListener<AiServiceRegisteredEvent> {
    @Override
    public void onApplicationEvent(AiServiceRegisteredEvent event) {
        Class<?> aiServiceClass = event.aiServiceClass();
        List<ToolSpecification> toolSpecifications = event.toolSpecifications();
        for (int i = 0; i < toolSpecifications.size(); i++) {
            System.out.printf("[%s]: [Tool-%s]: %s%n", aiServiceClass.getSimpleName(), i + 1, toolSpecifications.get(i));
        }
    }
}
```

### 3.3 Flux

在流式传输时，您可以使用 `Flux<String>` 作为 AI 服务的返回类型：

```java
@AiService
interface Assistant {

    @SystemMessage("You are a polite assistant")
    Flux<String> chat(String userMessage);
}
```

为此，请导入 `langchain4j-reactor` 模块。 更多详细信息请参见[此处](https://docs.langchain4j.info/tutorials/ai-services#flux)。

### 3.4 可观察性

要为 `ChatLanguageModel` 或 `StreamingChatLanguageModel` bean 启用可观察性， 您需要声明一个或多个 `ChatModelListener` bean：

```java
@Configuration
class MyConfiguration {
    @Bean
    ChatModelListener chatModelListener() {
        return new ChatModelListener() {
            private static final Logger log = LoggerFactory.getLogger(ChatModelListener.class);
            @Override
            public void onRequest(ChatModelRequestContext requestContext) {
                log.info("onRequest(): {}", requestContext.chatRequest());
            }
            @Override
            public void onResponse(ChatModelResponseContext responseContext) {
                log.info("onResponse(): {}", responseContext.chatResponse());
            }
            @Override
            public void onError(ChatModelErrorContext errorContext) {
                log.info("onError(): {}", errorContext.error().getMessage());
            }
        };
    }
}
```

应用程序上下文中的每个 `ChatModelListener` bean 都将自动 注入到由我们的 Spring Boot 启动器之一创建的所有 `ChatLanguageModel` 和 `StreamingChatLanguageModel` bean 中。


...... 未完成❌❌❌