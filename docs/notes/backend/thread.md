# Thread

## 1. Thread多线程

在Java中，开启线程有三种常见方式：继承 `Thread` 类、实现 `Runnable` 接口、实现 `Callable` 接口并结合 `FutureTask`。

### 1.1 继承 `Thread` 类

通过继承 `Thread` 类并重写其 `run()` 方法来创建线程。这个方法适合于线程只执行简单任务的情况，但不支持返回值。

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程ID: " + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println("运行结果: " + i);
    }

    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start(); // 启动线程
    }
}
```

- **优点**：简单直观，适用于任务比较简单的情况。
- **缺点**：无法返回任务的结果，且不够灵活，无法与其他线程共享数据。

### 1.2 实现 `Runnable` 接口

通过实现 `Runnable` 接口并重写 `run()` 方法来创建线程。相比于继承 `Thread` 类，`Runnable` 是接口，可以实现多重继承，且能够让多个线程共享同一个 `Runnable` 对象。

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("线程ID: " + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println("运行结果: " + i);
    }

    public static void main(String[] args) {
        Runnable runnable = new MyRunnable();
        Thread thread = new Thread(runnable);
        thread.start(); // 启动线程
    }
}
```

- **优点**：线程之间可以共享 `Runnable` 对象，能提供更好的灵活性。
- **缺点**：仍然不能获取返回值，任务的执行过程较为单一。

### 1.3 实现 `Callable` 接口 + `FutureTask`

`Callable` 接口与 `Runnable` 类似，但与 `Runnable` 不同，`Callable` 可以返回结果，且可以抛出异常。通常结合 `FutureTask` 来使用，以便获取任务执行的结果。

```java
import java.util.concurrent.*;

public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("线程ID: " + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println("运行结果: " + i);
        return i;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MyCallable callable = new MyCallable();
        FutureTask<Integer> futureTask = new FutureTask<>(callable);
        Thread thread = new Thread(futureTask);
        thread.start(); // 启动线程
        Integer result = futureTask.get(); // 阻塞等待任务完成并获取结果
        System.out.println("任务返回结果: " + result);
    }
}
```

- **优点**：支持返回值和异常处理，适用于有计算任务并需要结果的情况。
- **缺点**：比 `Runnable` 稍微复杂，需要借助 `FutureTask` 来获取结果。

## 2. 线程池

线程池是一种线程管理工具，可以重用线程并且管理线程的生命周期，避免频繁的线程创建和销毁。通过线程池可以有效控制资源使用，提高程序性能。

### 2.1 线程池的基本类型

常见的线程池有：

- `FixedThreadPool`：固定大小线程池，线程数固定。
- `CachedThreadPool`：根据需要创建线程，线程数可以增减，适合处理大量短时间任务。
- `SingleThreadExecutor`：单线程池，保证所有任务按顺序执行。
- `ScheduledThreadPool`：支持定时任务和周期性任务。

### 2.2 线程池的提交任务方式

线程池通过 `submit()` 方法提交任务，返回一个 `Future` 对象，可以用来获取任务的执行结果。

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
Future<Integer> future = executor.submit(() -> {
    return 10 / 2;
});
Integer result = future.get(); // 获取返回结果
```

## 3. ThreadPoolExecutor的七大参数

`ThreadPoolExecutor` 是线程池的核心实现，它提供了更多的定制选项来控制线程池的行为。

### 3.1 参数详解

1. **corePoolSize**：核心线程池大小，线程池保持的最小线程数。

   > 如果线程池中的线程数小于 `corePoolSize`，则会创建新的线程来执行任务。
2. **maximumPoolSize**：线程池中的最大线程数。

   > 如果线程池中的线程数超过了 `corePoolSize`，并且队列已满，则可以创建更多线程，直到达到 `maximumPoolSize`。
3. **keepAliveTime**：非核心线程的最大空闲时间。

   > 如果线程池中的线程数大于 `corePoolSize`，那么空闲的线程会在 `keepAliveTime` 时间后被销毁。
4. **unit**：`keepAliveTime` 的时间单位，通常使用 `TimeUnit.SECONDS` 或 `TimeUnit.MILLISECONDS`。
5. **workQueue**：阻塞队列，用于存放待执行的任务。

   > 可以使用不同的阻塞队列，如 `LinkedBlockingQueue`、`ArrayBlockingQueue`，或者 `SynchronousQueue`。
6. **threadFactory**：线程工厂，用于创建新线程。

   > 默认情况下，线程池使用 `Executors.defaultThreadFactory()`，可以通过自定义工厂来创建线程，控制线程的名字、优先级等。
7. **handler**：拒绝策略，当线程池无法处理任务时，执行的操作。

   > 常见的拒绝策略有：
   >
   > - `AbortPolicy`：丢弃任务并抛出异常。
   > - `CallerRunsPolicy`：在调用者线程中执行任务。
   > - `DiscardOldestPolicy`：丢弃队列中最老的任务，尝试提交当前任务。
   > - `DiscardPolicy`：丢弃当前任务。

### 3.2 线程池工作流程

1. **核心线程数**：当线程池中的线程数小于 `corePoolSize` 时，线程池创建新线程来执行任务。
2. **任务队列**：当线程池中的线程数等于 `corePoolSize` 时，任务会被放入任务队列中等待执行。
3. **最大线程数**：如果任务队列已满并且线程数小于 `maximumPoolSize`，则会创建新的线程来处理任务。
4. **拒绝策略**：如果线程池中的线程数达到了 `maximumPoolSize` 且任务队列已满，则会执行拒绝策略。

### 3.3 常用配置

配置文件`application.properties`

```properties
# application.properties 示例配置
threadpool.core-size=10
threadpool.max-size=50
threadpool.keep-alive-time=60
```

配置类

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * 线程池配置类
 * @Configuration 注解标记这是一个配置类，Spring会将其作为配置类加载
 */
@Configuration
public class MyThreadConfig {

    /**
     * 创建一个线程池的Bean
     * @param pool 配置类，包含线程池所需的配置参数
     * @return ThreadPoolExecutor 线程池实例
     */
    @Bean
    public ThreadPoolExecutor threadPoolExecutor(ThreadPoolConfigProperties pool) {
        // 使用构造函数创建一个ThreadPoolExecutor对象
        return new ThreadPoolExecutor(
                pool.getCoreSize(), // 核心线程数
                pool.getMaxSize(),  // 最大线程数
                pool.getKeepAliveTime(), // 非核心线程的最大空闲时间
                TimeUnit.SECONDS, // 时间单位，表示keepAliveTime是秒
                new LinkedBlockingDeque<>(100000), // 阻塞队列，用来存放待处理的任务
                Executors.defaultThreadFactory(), // 线程工厂，创建线程的工厂类
                new ThreadPoolExecutor.AbortPolicy() // 拒绝策略，当线程池任务队列满了，新的任务会被拒绝并抛出异常
        );
    }
}
```

## 4. 异步编程与 CompletableFuture

`CompletableFuture` 是 Java 8 引入的一种新的异步编程方式，它支持通过回调函数链式地处理异步任务结果。

### 4.1 创建异步任务

通过 `runAsync` 或 `supplyAsync` 方法来创建异步任务。

```java
// 无返回值的异步任务
CompletableFuture<Void> future1 = CompletableFuture.runAsync(() -> {
    System.out.println("当前线程ID: " + Thread.currentThread().getId());
}, executor);

// 有返回值的异步任务
CompletableFuture<Integer> future2 = CompletableFuture.supplyAsync(() -> {
    return 10 / 2;
}, executor);
```

### 4.2 任务完成后的处理

`CompletableFuture` 提供了多种方式来处理任务完成后的结果，如 `whenComplete`、`handle`、`thenApply` 等。

```java
// 异常处理和结果处理
future2.whenComplete((result, exception) -> {
    System.out.println("任务完成，结果：" + result + "，异常：" + exception);
}).exceptionally(ex -> {
    return -1; // 返回默认值
});
```

### 4.3 任务组合

- **`thenApply`**：执行任务并返回一个新的结果。
- **`thenAccept`**：执行任务并接受结果，但不返回任何值。
- **`thenRun`**：执行任务后进行某些操作，但不关心结果。

```java
CompletableFuture<Integer> future3 = future2.thenApplyAsync(result -> {
    return result * 2;
}, executor);
```

### 4.4 并行任务

`allOf` 和 `anyOf` 用于并行执行多个任务。

```java
// 等待所有任务完成
CompletableFuture<Void> allOf = CompletableFuture.allOf(future1, future2);

// 等待任意一个任务完成
CompletableFuture<Object> anyOf = CompletableFuture.anyOf(future1, future2);
```