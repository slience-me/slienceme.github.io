---
outline: [2,3]
---

# 设计模式

::: tip 参考内容链接

- [代码随想录](https://www.programmercarl.com/)
- [设计模式之工厂模式（factory pattern） ](https://www.cnblogs.com/yssjun/p/11102162.html)
- [图说设计模式](https://design-patterns.readthedocs.io/zh-cn/latest/index.html)
- [设计模式](https://refactoringguru.cn/design-patterns)
- [卡码网](https://kamacoder.com/)

:::

![image-20240103193726391](/images/design-pattern/image-20240103193726391.png)


## 创建型模式

### 1. 单例模式(Singleton)

#### 1.1 概述

**单例模式**`Singleton`是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

![单例模式](/images/design-pattern/singleton.png)

![image-20250405204540562](/images/design-pattern/image-20250405204540562.png)	

**优点：** 

有些实例，全局只需要⼀个就够了，使⽤单例模式就可以避免⼀个全局使⽤的类，频繁的创建与销毁，耗费系统资源。

**关键概念**  

1. ⼀个`私有构造函数`（确保只能单例类⾃⼰创建实例）：

   单例类通常会将其构造函数设为私有，以防⽌外部代码直接实例化对象。 

2. ⼀个`私有静态变量`（确保只有⼀个实例） 

   单例类通常包含⼀个私有的静态变量，⽤于保存该类的唯⼀实例。

3. ⼀个`公有静态函数`（给使⽤者提供调⽤⽅法）

   单例类提供⼀个公共的静态⽅法，⽤于获取该类的实例。如果实例不存在，则在该⽅法内部创建实例并返回。 


简单来说就是，单例类的构造⽅法不让其他⼈修改和使⽤；并且单例类⾃⼰只创建⼀个实例，这个实例，其他⼈也⽆法修改和直接使⽤；然后单例类提供⼀个调⽤⽅法，想⽤这个实例，只能调⽤。这样就确保了全局只创建了⼀个实例。

#### 1.2 单例模式的6种实现

##### 1）懒汉式(线程不安全)

```java{3,10-12}
public class Singleton {
    // 先不创建实例
    private static Singleton instance;
    
    // 私有构造函数
    private Singleton() {}
    
    // 公共静态方法，返回实例
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

::: tip 提示

**说明：**

=> 先不创建实例，当第⼀次被调⽤时，再创建实例，所以被称为懒汉式

---

**优点：**

=> 延迟了实例化，如果不需要使⽤该类，就不会被实例化，只有在需要时才创建实例，避免了资源浪费。 

---

**缺点：** 

=> 线程不安全，多线程环境下，如果多个线程同时进⼊了 `if (instance== null)` ，若此时还未实例化，也就是 `instance == null`，那么就会有多个线程执⾏ `instance = new Singleton();` ，就会实例化多个实例；

:::

##### 2）饿汉式(线程安全)

```java{3,10}
public class Singleton {
	// 类加载时就创建实例
    private static final Singleton instance = new Singleton();
    
    // 私有构造函数
    private Singleton() {}
    
    // 公共静态方法，返回实例
    public static Singleton getInstance() {
        return instance;
    }
}
```

::: tip 提示

**说明：** 

=> 不管需不需要，直接先实例化好实例（饿死⻤⼀样，称为饿汉式），然后当需要使⽤的时候， 直接调⽤即可

---

**优点：** 

=> 提前实例化好了⼀个实例，避免了线程不安全问题的出现

---

**缺点：**

=> 直接实例化了实例，不再延迟实例化；若系统未使⽤或系统运⾏很久后才使⽤，都会造成系统的资源浪费。

:::

##### 3）懒汉式(线程安全)

```java{3,9}
public class Singleton {
    // 先不创建实例
    private static Singleton instance;
    
    // 私有构造函数
    private Singleton() {}
    
    // 公共静态方法，返回实例
    public static synchronized Singleton getInstance() {
        if (instance == null) {  // 判断实例是否存在
            instance = new Singleton();
        }
        return instance;
    }
}
```

::: tip 提示

**说明：** 

=> 实现与[`懒汉式(线程不安全)`](/notes/backend/design-pattern#_1-懒汉式-线程不安全)⼏乎相同，唯⼀不同的点是，在get⽅法上加了⼀把锁。如此⼀来，多个线程访问，每次只有拿到锁的的线程能够进⼊该⽅法，避免了多线程不安全问题的出现。

---

**优点：** 

=> 延迟实例化，节约了资源，并且是线程安全的。

---

**缺点：**

=> 虽然解决了线程安全问题，但是性能降低了。因为，即使实例已经实例化了，既后续不会再出现线程安全问题了， 但是锁还在，每次还是只能拿到锁的线程进⼊该⽅法使线程阻塞，等待时间过⻓。

:::

##### 4）双重检查锁实现(线程安全)

```java{3,10-15}
public class Singleton {
    // 先不创建实例
    private static volatile Singleton instance;
    
 	// 私有构造函数
    private Singleton() {}
    
    // 使用双重检查锁保证线程安全
    public static Singleton getInstance() {
        if (instance == null) {  // 判断实例是否存在
            synchronized (Singleton.class) {  // 可能多个线程阻塞在这里
                if (instance == null) {  // 再次判断实例是否存在
                    instance = new Singleton(); // (第一个线程创建实例后，后续线程直接跳过)
                }
            }
        }
        return instance;
    }
}
```

::: tip 提示

**说明：** 

=> 双重检查锁相当于是改进了[`懒汉式(线程安全)`](/notes/backend/design-pattern#_3-懒汉式-线程安全)。线程安全的懒汉式的缺点是性能降低了，造成的原因是因为即使实例已经实例化，依然每次都会有锁。 

=> ⽽现在，我们将锁的位置变了，并且多加了⼀个检查。也就是，先判断实例是否已经存在，若已经存在了，则不会执⾏判断⽅法内的有锁⽅法。 ⽽如果，还没有实例化的时候，多个线程进去了，也没有事，因为⾥⾯的⽅法有锁，只会让⼀个线程进⼊最内层⽅法并实例化实例。如此⼀来，最多情况，也就是第⼀次实例化的时候，会有线程阻塞的情况，后续便不会再有线程阻塞的问题。 

=> 为什么使⽤`volatile`关键字修饰了`instance`实例变量？ 

`instance = new Singleton(); `

=> 这段代码执⾏时分为三步： 

1. 为`instance`分配内存空间 
2. 初始化`instance`
3. 将`instance`指向分配的内存地址 

=> 正常的执⾏顺序当然是 1>2>3 ，但是由于 JVM 具有指令重排的特性，执⾏顺序有可能变成 1>3>2。  

=> 单线程环境时，指令重排并没有什么问题；多线程环境时，会导致有些线程可能会获取到还没初始化的实例。  

例如：线程A 只执⾏了 1 和 3 ，此时线程B来调⽤  `getInstance()` ，发现获取  `instance` 实例，但是其实此时的 `instance`不为空，但是`instance`还没有初始化。 

=> 解决办法就是加⼀个`volatile`关键字修饰  `instance` ，`volatile`会禁⽌JVM的指令重排，就可以保证多线程环境下的安全运⾏。

---

**优点：** 

=> 延迟实例化，节约了资源；线程安全；并且相对于线程安全的懒汉式，性能提⾼了。

---

**缺点：**

=> volatile 关键字，对性能也有⼀些影响。

:::

##### 5）静态内部类实现(线程安全)

```java{5-7,11}
public class Singleton {
    private Singleton() {}

    // 静态内部类持有实例
    private static class SingletonHolder {
        private static final Singleton instance = new Singleton();
    }

    // 公共静态方法，返回实例
    public static Singleton getInstance() {
        return SingletonHolder.instance;
    }
}
```

::: tip 提示

**说明：** 

=> 当外部类`Singleton`被加载时，静态内部类`SingletonHolder`并没有被加载进内存。

=> 当调⽤`getInstance()`⽅法时，会运⾏`return SingletonHolder.instance;`  

=> 触发了`SingletonHolder.instance`，此时静态内部类`SingletonHolder`才会被加载进内存，并且初始化`instance`实例，⽽且 JVM 会确保`instance`只被实例化⼀次。

---

**优点：** 

=> 延迟实例化，节约了资源，且线程安全，性能也提⾼了。

:::

##### 6）枚举类实现(线程安全)

```java
public enum Singleton {
    INSTANCE;
    
    // 可以添加其他⽅法和属性
    public void doSomething() {
        // 实现
    }
}
```

::: tip 提示

**说明：** 

=> 默认枚举实例的创建就是线程安全的，且在任何情况下都是单例。

=> 写法简单，线程安全，天然防⽌反射和反序列化调⽤。

:::

::: info

防⽌反序列化 

`序列化`： 把`java对象`转换为`字节序列`的过程；

`反序列化`：  通过这些`字节序列`在内存中新建`java对象`的过程； 

**说明：** 

=> `反序列化`将⼀个`单例实例对象`写到磁盘再读回来，从⽽获得了⼀个`新的实例`。 

=> 我们要防⽌反序列化，避免得到多个实例，枚举类天然防⽌反序列化。 

=> 其他单例模式可以通过 重写`readResolve()`⽅法，从⽽防⽌反序列化，使实例唯⼀重写

这段代码是在实现Java序列化时的 `readResolve` 方法，通常用于解决反序列化时单例模式的对象创建问题。

```java
private Object readResolve() throws ObjectStreamException {
    return singleton;
}
```

解释：

- `readResolve` 方法是在反序列化过程中被调用的，它允许对象在反序列化时替换成另一个对象。
- `singleton` 是返回的单例对象（你可能在类中已经定义了它），用于确保反序列化时返回的是同一个实例，而不是重新创建一个新的实例。

:::

#### 1.3 单例模式的应用场景

**单例设计模式适⽤于以下⼀些场景：**

- `资源共享`：当多个模块或系统需要共享某⼀资源时，可以使⽤单例模式确保该资源只被创建⼀次，避免重复创建和浪费资源。 
- `控制资源访问`：单例模式可以⽤于控制对特定资源的访问，例如数据库连接池、线程池等。
- `配置管理器`：当整个应⽤程序需要共享⼀些配置信息时，可以使⽤单例模式将配置信息存储在单例类中，⽅便全局访问和管理。 
- `⽇志记录器`：单例模式可以⽤于创建⼀个全局的⽇志记录器，⽤于记录系统中的⽇志信息。 
- `线程池`：在多线程环境下，使⽤单例模式管理线程池，确保线程池只被创建⼀次，提⾼线程池的利⽤率。
- `缓存`：单例模式可以⽤于实现缓存系统，确保缓存只有⼀个实例，避免数据不⼀致性和内存浪费。

**应⽤场景举例：** 

1. ⽹站计数器 
2. 应⽤程序的⽇志应⽤
3. Web项⽬中的配置对象的读取
4. 数据库连接池
5. 多线程池 
6. ...... 

**使⽤场景总结：** 

（1）频繁实例化然后⼜销毁的对象，使⽤单例模式可以提⾼性能 

（2）经常使⽤的对象，但实例化时耗费时间或者资源多，如数据库连接池，使⽤单例模式，可以提⾼性能，降低资源损坏

（3）使⽤线程池之类的控制资源时，使⽤单例模式，可以⽅便资源之间的通信

#### 1.4 案例

[单例模式-小明的购物车](https://kamacoder.com/problempage.php?pid=1074)

::: info

**题目描述**

小明去了一家大型商场，拿到了一个购物车，并开始购物。请你设计一个购物车管理器，记录商品添加到购物车的信息（商品名称和购买数量），并在购买结束后打印出商品清单。（在整个购物过程中，小明只有一个购物车实例存在）。

**输入描述**

输入包含若干行，每行包含两部分信息，分别是商品名称和购买数量。商品名称和购买数量之间用空格隔开。

**输出描述**

输出包含小明购物车中的所有商品及其购买数量。每行输出一种商品的信息，格式为 "商品名称 购买数量"。

**输入示例**

```
Apple 3
Banana 2
Orange 5
```

**输出示例**

```
Apple 3
Banana 2
Orange 5
```

**提示信息**

本道题目请使用单例设计模式： 

使用私有静态变量来保存购物车实例。

使用私有构造函数防止外部直接实例化。

:::

方案1：饿汉式实现

```java
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        ShoppingCartManager cart = ShoppingCartManager.getInstance();
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            String itemName = scanner.next();
            int quantity = scanner.nextInt();

            // 获取购物车实例并添加商品
            cart.addToCart(itemName, quantity);
        }

        // 输出购物车内容
        cart.viewCart();
    }
}

class ShoppingCartManager {
    // 饿汉模式实现单例
    private static final ShoppingCartManager instance = new ShoppingCartManager();

    // 购物车存储商品和数量的映射
    private Map<String, Integer> cart;

    // 私有构造函数
    private ShoppingCartManager() {
        cart = new LinkedHashMap<>(); 
    }

    // 获取购物车实例
    public static ShoppingCartManager getInstance() {
        return instance;
    }

    // 添加商品到购物车
    public void addToCart(String itemName, int quantity) {
        cart.put(itemName, cart.getOrDefault(itemName, 0) + quantity);
    }

    // 查看购物车
    public void viewCart() {
        for (Map.Entry<String, Integer> entry : cart.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```

方案2：懒汉+双重锁

```java
import java.util.Scanner;
import java.util.ArrayList;

class ShoppingCart {
    // 购物车类的单例实例变量，使用volatile关键字确保线程安全
    private static volatile ShoppingCart instance;
    // 存储商品名称
    private static ArrayList<String> productNames = new ArrayList<>();
    // 存储商品数量
    private static ArrayList<Integer> productQuantities = new ArrayList<>();

    // 私有构造函数，防止外部直接创建ShoppingCart对象
    private ShoppingCart() {

    }

    // 获取购物车单例实例的方法，确保线程安全
    public static ShoppingCart getInstance() {
        if (instance == null) {
            synchronized (ShoppingCart.class) {
                if (instance == null) {
                    instance = new ShoppingCart();
                }
            }
        }
        return instance;
    }

    // 添加商品到购物车的方法
    public void Add(String name, int quantity) {
        productNames.add(name);
        productQuantities.add(quantity);
        System.out.println(name + " " + quantity);
    }

    // 遍历
    public void show() {
        for (int i = 0; i < productNames.size(); i++) {
            System.out.println(productNames.get(i) + " " + productQuantities.get(i));
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = ShoppingCart.getInstance();
        Scanner scanner = new Scanner(System.in);

        String inputLine;
        // 循环读取用户输入，直到用户输入"exit"
        while (scanner.hasNextLine()) {
            inputLine = scanner.nextLine();

            if ("exit".equalsIgnoreCase(inputLine)) {
                break;
            }

            // 使用空格分割输入的字符串，获取商品名称和数量
            String[] parts = inputLine.split(" ");

            // 确保输入格式正确，即包含两个部分：商品名称和数量
            if (parts.length == 2) {
                // 商品名称
                String name = parts[0];
                // 商品数量
                int quantity;

                try {
                    // 将第二部分转换为整数
                    quantity = Integer.parseInt(parts[1]);
                    cart.Add(name, quantity);
                } catch (NumberFormatException e) {
                    // 如果转换失败，输出错误信息
                    System.out.println("转换失败，请重新输入");
                }
            } else {
                // 如果输入格式不正确，输出错误信息
                System.out.println("如果输入格式不正确，请重新输入");
            }
        }
        scanner.close();
        cart.show();
    }
}
```

### 2. 工厂模式(Factory)

#### 2.1 概述

⼯⼚模式是⼀种⾮常常⽤的创建型设计模式，其提供了创建对象的最佳⽅式。在创建对象时，不会对客户端暴露对象的创建逻辑，⽽是通过使⽤共同的接⼝来创建对象。其⽤来封装和管理类的创建，本质是对获取对象过程的抽象。 

⼀般情况下，**⼯⼚模式分为三种更加细分的类型：简单⼯⼚、⼯⼚⽅法和抽象⼯⼚**。   

不过，在 GoF 的《设计模式》⼀书中，它将简单⼯⼚模式看作是⼯⼚⽅法模式的⼀种特例，所以⼯⼚模式只被分成了⼯⼚⽅法和抽象⼯⼚两类 

**优点：** 

- `解耦`：将对象的创建和使⽤进⾏分离，客户端代码与具体产品类的实例化过程解耦，客户端只需要知道⼯⼚的接⼝和抽象产品的接⼝，⽽不需要关⼼具体的实现类。 
- `可复⽤`：对于创建过程⽐较复杂且在很多地⽅都使⽤到的对象，通过⼯⼚模式可以提⾼对象创建的代码的复⽤性。 
- `易于扩展`：添加新的产品类时，只需要扩展相应的具体产品和具体⼯⼚，⽽不需要修改已有的代码，符合开闭原则。
- `更符合⾯向对象的设计原则`：通过⼯⼚模式，将对象的创建封装在⼯⼚类中，使得系统更符合单⼀职责原则。

#### 2.2 工厂模式的3种类型

##### 1）简单工厂模式

**UML**

![image-20250407101255368](/images/design-pattern/image-20250407101255368.png)

**概念**

简单⼯⼚模式也被称为静态⼯⼚⽅法模式。

简单⼯⼚模式并不是⼀个标准的设计模式，更像是⼀种编程习惯。在简单⼯⼚模式中，⼀个⼯⼚类负责创建多个产品类的实例，通过传⼊不同的参数来决定创建哪种产品。 

同时在简单⼯⼚模式中会定义⼀个类负责创建其他类的实例，被创建的实例也通常具有共同的⽗类。

虽然实现了对象的创建和使⽤的分离，但是<u>不够灵活</u>，⼯⼚类集合了<u>所有产品的创建逻辑，职责过重</u>，同时新增⼀个产品就需要在原⼯⼚类内部添加⼀个分⽀，违反了开闭原则。并且若是有多个判断条件共同决定创建对象，则后期修改会越来越复杂。 

**应⽤**

JDK中的`DateFormat`、`Calendar`类都有使⽤，通过不同参数返回我们需要的对象。

**案例**

![img](/images/design-pattern/1419489-20190628144601084-563759643.png)

使用手机生产来讲解该模式：

```java
// Phone类：手机标准规范类(AbstractProduct)
public interface Phone {
    void make();
}

// MiPhone类：制造小米手机（Product1）
public class MiPhone implements Phone {
    public MiPhone() {
        this.make();
    }
    @Override
    public void make() {
        // TODO Auto-generated method stub
        System.out.println("make xiaomi phone!");
    }
}

// IPhone类：制造苹果手机（Product2）
public class IPhone implements Phone {
    public IPhone() {
        this.make();
    }
    @Override
    public void make() {
        // TODO Auto-generated method stub
        System.out.println("make iphone!");
    }
}

// PhoneFactory类：手机代工厂（Factory） 
public class PhoneFactory {
    public Phone makePhone(String phoneType) {
        if(phoneType.equalsIgnoreCase("MiPhone")){
            return new MiPhone();
        }
        else if(phoneType.equalsIgnoreCase("iPhone")) {
            return new IPhone();
        }
        return null;
    }
}

// 演示：
public class Demo {
    public static void main(String[] arg) {
        PhoneFactory factory = new PhoneFactory();
        Phone miPhone = factory.makePhone("MiPhone");            // make xiaomi phone!
        IPhone iPhone = (IPhone)factory.makePhone("iPhone");    // make iphone!
    }
}
```

##### 2）工厂方法模式

**工厂方法模式**是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

![工厂方法模式](/images/design-pattern/factory-method-zh.png)



简单工厂模式只有一个工厂类，负责创建所有产品，如果要添加新的产品，通常需要修改工厂类的代码。而工厂方法模式引入了抽象工厂和具体工厂的概念，每个具体工厂只负责创建一个具体产品，添加新的产品只需要添加新的工厂类而无需修改原来的代码，这样就使得产品的生产更加灵活，支持扩展，符合开闭原则。

工厂方法模式分为以下几个角色：

- 抽象工厂：一个接口，包含一个抽象的工厂方法（用于创建产品对象）。
- 具体工厂：实现抽象工厂接口，创建具体的产品。
- 抽象产品：定义产品的接口。
- 具体产品：实现抽象产品接口，是工厂创建的对象。

**UML**

![image-20250407114001233](/images/design-pattern/image-20250407114001233.png)

**应⽤**  

JDK中的`Collection`接⼝中`Iterator`的实现。`Collection`中不同的实现类⽣产适合于⾃⼰的迭代器对象 

工厂方法模式使得每个工厂类的职责单一，每个工厂只负责创建一种产品，当创建对象涉及一系列复杂的初始化逻辑，而这些逻辑在不同的子类中可能有所不同时，可以使用工厂方法模式将这些初始化逻辑封装在子类的工厂中。在现有的工具、库中，工厂方法模式也有广泛的应用，比如：

- Spring 框架中的 Bean 工厂：通过配置文件或注解，Spring 可以根据配置信息动态地创建和管理对象。
- JDBC 中的 Connection 工厂：在 Java 数据库连接中，`DriverManager` 使用工厂方法模式来创建数据库连接。不同的数据库驱动（如 MySQL、PostgreSQL 等）都有对应的工厂来创建连接。

::: info

`Factory`：`Collection`

- `SubFactoryA`：`LinkedList` 

- `SubFactoryB`：`ArrayList` 

`Product`：`Iterator`

- `ProductA`：`ListItr` 

- `ProductB`：`Itr`

:::

**案例1**

和简单工厂模式中工厂负责生产所有产品相比，工厂方法模式将生成具体产品的任务分发给具体的产品工厂，其UML类图如下：

![img](/images/design-pattern/1419489-20190628154133368-906051111.png)

也就是定义一个抽象工厂，其定义了产品的生产接口，但不负责具体的产品，将生产任务交给不同的派生类工厂。这样不用通过指定类型来创建对象了。

其中和产品相关的`Phone类`、`MiPhone类`和`IPhone类`的定义相同。

```java
// 与上面简单工厂模式的案例相同
// AbstractFactory类：生产不同产品的工厂的抽象类
public interface AbstractFactory {
    Phone makePhone();
}

// XiaoMiFactory类：生产小米手机的工厂（ConcreteFactory1）
public class XiaoMiFactory implements AbstractFactory{
    @Override
    public Phone makePhone() {
        return new MiPhone();
    }
}

// AppleFactory类：生产苹果手机的工厂（ConcreteFactory2）
public class AppleFactory implements AbstractFactory {
    @Override
    public Phone makePhone() {
        return new IPhone();
    }
}

// 演示：
public class Demo {
    public static void main(String[] arg) {
        AbstractFactory miFactory = new XiaoMiFactory();
        AbstractFactory appleFactory = new AppleFactory();
        miFactory.makePhone();            // make xiaomi phone!
        appleFactory.makePhone();        // make iphone!
    }
}
```

使用图形生产来讲解该模式：

```java
// 抽象产品
interface Shape {
    void draw();
}

// 具体产品 - 圆形
class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Circle");
    }
}

// 具体产品 - 正方形
class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Square");
    }
}

// 抽象工厂
interface ShapeFactory {
    Shape createShape();
}

// 具体工厂 - 创建圆形
class CircleFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Circle();
    }
}

// 具体工厂 - 创建正方形
class SquareFactory implements ShapeFactory {
    @Override
    public Shape createShape() {
        return new Square();
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        ShapeFactory circleFactory = new CircleFactory();
        Shape circle = circleFactory.createShape();
        circle.draw();  // 输出：Circle

        ShapeFactory squareFactory = new SquareFactory();
        Shape square = squareFactory.createShape();
        square.draw();  // 输出：Square
    }
}
```

**案例2**

[工厂方法模式-积木工厂](https://kamacoder.com/problempage.php?pid=1076)

::: info 

**题目描述**

小明家有两个工厂，一个用于生产圆形积木，一个用于生产方形积木，请你帮他设计一个积木工厂系统，记录积木生产的信息。

**输入描述**

输入的第一行是一个整数 N（1 ≤ N ≤ 100），表示生产的次数。 

接下来的 N 行，每行输入一个字符串和一个整数，字符串表示积木的类型。积木类型分为 "Circle" 和 "Square" 两种。整数表示该积木生产的数量

**输出描述**

对于每个积木，输出一行字符串表示该积木的信息。

**输入示例**

```
3
Circle 1
Square 2
Circle 1
```

**输出示例**

```
Circle Block
Square Block
Square Block
Circle Block
```

**提示信息**

在示例中，积木工	厂生产了4块积木，其中有2块是圆形积木，2块是方形积木。根据输入的类型，每块积木的信息被输出到控制台。

:::

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// 抽象积木接口
interface Block {
    void produce();
}

// 具体圆形积木实现
class CircleBlock implements Block {
    @Override
    public void produce() {
        System.out.println("Circle Block");
    }
}

// 具体方形积木实现
class SquareBlock implements Block {
    @Override
    public void produce() {
        System.out.println("Square Block");
    }
}

// 抽象积木工厂接口
interface BlockFactory {
    Block createBlock();
}

// 具体圆形积木工厂实现
class CircleBlockFactory implements BlockFactory {
    @Override
    public Block createBlock() {
        return new CircleBlock();
    }
}

// 具体方形积木工厂实现
class SquareBlockFactory implements BlockFactory {
    @Override
    public Block createBlock() {
        return new SquareBlock();
    }
}

// 积木工厂系统
class BlockFactorySystem {
    private List<Block> blocks = new ArrayList<>();

    public void produceBlocks(BlockFactory factory, int quantity) {
        for (int i = 0; i < quantity; i++) {
            Block block = factory.createBlock();
            blocks.add(block);
            block.produce();
        }
    }

    public List<Block> getBlocks() {
        return blocks;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 创建积木工厂系统
        BlockFactorySystem factorySystem = new BlockFactorySystem();

        // 读取生产次数
        int productionCount = scanner.nextInt();
        scanner.nextLine();

        // 读取每次生产的积木类型和数量
        for (int i = 0; i < productionCount; i++) {
            String[] productionInfo = scanner.nextLine().split(" ");
            String blockType = productionInfo[0];
            int quantity = Integer.parseInt(productionInfo[1]);

            if (blockType.equals("Circle")) {
                factorySystem.produceBlocks(new CircleBlockFactory(), quantity);
            } else if (blockType.equals("Square")) {
                factorySystem.produceBlocks(new SquareBlockFactory(), quantity);
            }
        }
    }
}
```

##### 3）抽象工厂模式

**抽象工厂模式**是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

![抽象工厂模式](/images/design-pattern/abstract-factory-zh.png)

**为什么还有要抽象工厂模式呢？**

这就涉及到创建“多类”对象了，在工厂方法模式中，每个具体工厂只负责创建<u>单一</u>的产品。但是如果有多类产品呢，比如说“手机”，一个品牌的手机有高端机、中低端机之分，这些具体的产品都需要建立一个单独的工厂类，但是它们都是相互关联的，都共同属于同一个品牌，这就可以使用到【抽象工厂模式】。

抽象工厂模式可以确保一系列相关的产品被一起创建，这些产品能够相互配合使用，再举个例子，有一些家具，比如沙发、茶几、椅子，都具有古典风格的和现代风格的，抽象工厂模式可以将生产现代风格的家具放在一个工厂类中，将生产古典风格的家具放在另一个工厂类中，这样每个工厂类就可以生产一系列的家具。

抽象工厂模式包含多个抽象产品接口，多个具体产品类，一个抽象工厂接口和多个具体工厂，每个具体工厂负责创建一组相关的产品。

- 抽象产品接口`AbstractProduct`: 定义产品的接口，可以定义多个抽象产品接口，比如说沙发、椅子、茶几都是抽象产品。
- 具体产品类`ConcreteProduct`: 实现抽象产品接口，产品的具体实现，古典风格和沙发和现代风格的沙发都是具体产品。
- 抽象工厂接口`AbstractFactory`: 声明一组用于创建产品的方法，每个方法对应一个产品。
- 具体工厂类`ConcreteFactory`： 实现抽象工厂接口，负责创建一组具体产品的对象，在本例中，生产古典风格的工厂和生产现代风格的工厂都是具体实例。

[文档看私有仓库的docs](https://github.com/slience-me/StudySchedule/blob/main/DesignPattern/docs/3-%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.md)

**UML**

![image-20250407144650115](/images/design-pattern/image-20250407144650115.png)

产品族：构成一个产品的一系列附件的集合

如果将一台电脑比作一个产品族，那么CPU、主板、硬盘、内存这些内容构成一台电脑

![image-20250407112734467](/images/design-pattern/image-20250407112734467.png)

**概念** 

⼯⼚⽅法模式通过引⼊⼯⼚等级结构，解决了简单⼯⼚模式中⼯⼚类职责太重的问题，但由于⼯⼚⽅法模式中的每个⼯⼚只⽣产⼀类产品，可能会导致系统中存在⼤量的⼯⼚类，势必会增加系统的开销。抽象⼯⼚模式为⼯⼚⽅法模式的进⼀步延伸，其将⼀些相关的产品组成⼀个“产品族”，由同⼀个⼯⼚来统⼀⽣产。虽然对于新增⼀个产品族很⽅⾯，并且也符合开闭原则，但是新增⼀个产品等级结构，会对整个⼯⼚结构进⾏⼤改

**应⽤** 

Spring中的`BeanFactory`

**案例1**

上面两种模式不管工厂如何拆分抽象，都只是针对一类产品**Phone**（AbstractProduct），如果要生成另一种产品PC，应该怎么表示呢？

最简单的方式是把2中介绍的工厂方法模式完全复制一份，不过这次生产的是PC。但同时也就意味着我们要完全复制和修改Phone生产管理的所有代码，显然这是一个笨办法，并不利于扩展和维护。

抽象工厂模式通过在AbstarctFactory中增加创建产品的接口，并在具体子工厂中实现新加产品的创建，当然前提是子工厂支持生产该产品。否则继承的这个接口可以什么也不干。

其UML类图如下：

![img](/images/design-pattern/1419489-20190628170705865-1781414242.png)

从上面类图结构中可以清楚的看到如何在工厂方法模式中通过增加新产品接口来实现产品的增加的。

为了弄清楚上面的结构，我们使用具体的产品和工厂来表示上面的UML类图，能更加清晰的看出模式是如何演变的：

![img](/images/design-pattern/1419489-20190628164001258-637961514.png)

```java
// PC类：定义PC产品的接口(AbstractPC)
public interface PC {
    void make();
}

// MiPC类：定义小米电脑产品(MIPC)
public class MiPC implements PC {
    public MiPC() {
        this.make();
    }
    @Override
    public void make() {
        // TODO Auto-generated method stub
        System.out.println("make xiaomi PC!");
    }
}

// MAC类：定义苹果电脑产品(MAC)
public class MAC implements PC {
    public MAC() {
        this.make();
    }
    @Override
    public void make() {
        // TODO Auto-generated method stub
        System.out.println("make MAC!");
    }
}

// 下面需要修改工厂相关的类的定义：
// AbstractFactory类：增加PC产品制造接口
public interface AbstractFactory {
    Phone makePhone();
    PC makePC();
}

// XiaoMiFactory类：增加小米PC的制造（ConcreteFactory1）
public class XiaoMiFactory implements AbstractFactory{
    @Override
    public Phone makePhone() {
        return new MiPhone();
    }
    @Override
    public PC makePC() {
        return new MiPC();
    }
}

// AppleFactory类：增加苹果PC的制造（ConcreteFactory2）
public class AppleFactory implements AbstractFactory {
    @Override
    public Phone makePhone() {
        return new IPhone();
    }
    @Override
    public PC makePC() {
        return new MAC();
    }
}

// 演示：
public class Demo {
    public static void main(String[] arg) {
        AbstractFactory miFactory = new XiaoMiFactory();
        AbstractFactory appleFactory = new AppleFactory();
        miFactory.makePhone();            // make xiaomi phone!
        miFactory.makePC();               // make xiaomi PC!
        appleFactory.makePhone();         // make iphone!
        appleFactory.makePC();            // make MAC!
    }
}
```

**案例2：**

[抽象工厂模式-家具工厂](https://kamacoder.com/problempage.php?pid=1077)

::: info

**题目描述**

小明家新开了两个工厂用来生产家具，一个生产现代风格的沙发和椅子，一个生产古典风格的沙发和椅子，现在工厂收到了一笔订单，请你帮他设计一个系统，描述订单需要生产家具的信息。

**输入描述**

输入的第一行是一个整数 N（1 ≤ N ≤ 100），表示订单的数量。 

接下来的 N 行，每行输入一个字符串，字符串表示家具的类型。家具类型分为 "modern" 和 "classical" 两种。

**输出描述**

对于每笔订单，输出字符串表示该订单需要生产家具的信息。 

modern订单会输出下面两行字符串 

modern chair 

modern sofa

classical订单会输出下面两行字符串 

classical chair 

classical soft

**输入示例**

```
3
modern
classical
modern
```

**输出示例**

```
modern chair
modern sofa
classical chair
classical sofa
modern chair
modern sofa
```

**提示信息**

在示例中，工厂收到了3笔订单，其中有2笔要求生产modern风格，1笔要求生产classical风格。根据输入的类型，每次订单生产的家具信息被输出到控制台上。

:::

```java
import java.util.Scanner;

// 抽象椅子接口
interface Chair {
    void showInfo();
}

// 具体现代风格椅子
class ModernChair implements Chair {
    @Override
    public void showInfo() {
        System.out.println("modern chair");
    }
}

// 具体古典风格椅子
class ClassicalChair implements Chair {
    @Override
    public void showInfo() {
        System.out.println("classical chair");
    }
}

// 抽象沙发接口
interface Sofa {
    void displayInfo();
}

// 具体现代风格沙发
class ModernSofa implements Sofa {
    @Override
    public void displayInfo() {
        System.out.println("modern sofa");
    }
}

// 具体古典风格沙发
class ClassicalSofa implements Sofa {
    @Override
    public void displayInfo() {
        System.out.println("classical sofa");
    }
}

// 抽象家居工厂接口
interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
}

// 具体现代风格家居工厂
class ModernFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() {
        return new ModernChair();
    }

    @Override
    public Sofa createSofa() {
        return new ModernSofa();
    }
}

// 具体古典风格家居工厂
class ClassicalFurnitureFactory implements FurnitureFactory {
    @Override
    public Chair createChair() {
        return new ClassicalChair();
    }

    @Override
    public Sofa createSofa() {
        return new ClassicalSofa();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取订单数量
        int N = scanner.nextInt();

        // 处理每个订单
        for (int i = 0; i < N; i++) {
            // 读取家具类型
            String furnitureType = scanner.next();

            // 创建相应风格的家居装饰品工厂
            FurnitureFactory factory = null;
            if (furnitureType.equals("modern")) {
                factory = new ModernFurnitureFactory();
            } else if (furnitureType.equals("classical")) {
                factory = new ClassicalFurnitureFactory();
            }

            // 根据工厂生产椅子和沙发
            Chair chair = factory.createChair();
            Sofa sofa = factory.createSofa();

            // 输出家具信息
            chair.showInfo();
            sofa.displayInfo();
        }
    }
}
```

#### 2.3 ⼯⼚设计模式的应⽤场景  

- 当⼀个类不知道它所需要的类时
- 当⼀个类希望通过其⼦类来指定创建对象时
- 当类将创建对象的职责委托给多个帮助⼦类中的某⼀个，并且希望将哪⼀个⼦类是代理者的信息局部化时 

**典型应用举例：**

- `数据库操作`：通过工厂模式，根据不同的数据库类型（如 MySQL 等）创建对应的数据库连接对象

- `日志记录器`：通过工厂模式，根据配置文件或其他条件选择不同类型的日志记录器（如文件日志记录器、数据库日志记录器等）。

- `图形用户界面（GUI）库`：在 GUI 库中，使用该模式创建不同风格或主题的界面元素（如按钮、文本框等）
- `加密算法库`：在加密算法库中，使用该模式根据需要选择不同的加密算法（如对称加密、非对称加密等）
- `文件解析`：在文件解析过程中，使用该模式根据文件类型选择不同的解析器（如 XML 解析器、JSON 解析器等）
- `网络通信库`：在网络通信库中，使用该模式创建不同类型的网络连接对象（如 TCP 连接、UDP 连接等）

### 3. 建造者模式(Builder)

#### 3.1 概述

**生成器模式**`Builder`是一种创建型设计模式， 使你能够分步骤创建复杂对象。 该模式允许你使用相同的创建代码生成不同类型和形式的对象。

![生成器设计模式](/images/design-pattern/builder-zh.png)

建造者模式（也被成为`生成器模式`），软件开发过程中有的时候需要创建很复杂的对象，而建造者模式的主要思想是<u>将对象的构建过程分为多个步骤，并为每个步骤定义一个抽象的接口。具体的构建过程由实现了这些接口的具体建造者类来完成。</u>同时有一个指导者类负责协调建造者的工作，按照一定的顺序或逻辑来执行构建步骤，最终生成产品。

例如，我们要创建一个计算机对象，计算机由很多组件组成，例如 CPU、内存、硬盘、显卡等。每个组件可能有不同的型号、配置和制造，这个时候计算机就可以被视为一个复杂对象，构建过程相对复杂，而我们使用建造者模式将计算机的构建过程封装在一个具体的建造者类中，而指导者类则负责指导构建的步骤和顺序。每个具体的建造者类可以负责构建不同型号或配置的计算机，客户端代码可以通过选择不同的建造者来创建不同类型的计算机，这样就可以根据需要构建不同表示的复杂对象，更加灵活。

建造者模式有下面几个关键角色：

- 产品`Product`：被构建的复杂对象, 包含多个组成部分。
- 抽象建造者`Builder`: 定义构建产品各个部分的抽象接口和一个返回复杂产品的方法`getResult`
- 具体建造者`Concrete Builder`：实现抽象建造者接口，构建产品的各个组成部分，并提供一个方法返回最终的产品。
- 指导者`Director`：调用具体建造者的方法，按照一定的`顺序或逻辑`来构建产品。

![image-20250407163423192](/images/design-pattern/image-20250407163423192.png)

**简单实现演示：**

建造者模式的实现步骤通常包括以下几个阶段

```java
// 1. 定义产品类：产品类应该包含多个组成部分，这些部分的属性和方法构成了产品的接口
// 产品类
class Product {
    private String part1;
    private String part2;

    public void setPart1(String part1) {
        this.part1 = part1;
    }

    public void setPart2(String part2) {
        this.part2 = part2;
    }

    // 其他属性和方法
}

// 2. 定义抽象建造者接口：创建一个接口，包含构建产品各个部分的抽象方法。这些方法通常用于设置产品的各个属性。
// 抽象建造者接口
interface Builder {
    void buildPart1(String part1);
    void buildPart2(String part2);
    Product getResult();
}

// 3. 创建具体建造者：实现抽象建造者接口，构建具体的产品。
// 具体建造者类
class ConcreteBuilder implements Builder {
    private Product product = new Product();

    @Override
    public void buildPart1(String part1) {
        product.setPart1(part1);
    }

    @Override
    public void buildPart2(String part2) {
        product.setPart2(part2);
    }

    @Override
    public Product getResult() {
        return product;
    }
}

// 4. 定义Director类： 指导者类来控制构建产品的顺序和步骤。
// 指导者类
class Director {
    private Builder builder;

    public Director(Builder builder) {
        this.builder = builder;
    }
	// 调用方法构建产品
    public void construct() {
        builder.buildPart1("Part1");
        builder.buildPart2("Part2");
    }
}

//5. 客户端使用建造者模式：在客户端中创建【具体建造者对象】和【指导者对象】，通过指导者来构建产品。
// 客户端代码
public class Main{
    public static void main(String[] args) {
        // 创建具体建造者
        Builder builder = new ConcreteBuilder();

        // 创建指导者
        Director director = new Director(builder);

        // 指导者构建产品
        director.construct();

        // 获取构建好的产品
        Product product = builder.getResult();
        
        // 输出产品信息
        System.out.println(product);
    }
}
```

#### 3.2 使用场景

使用建造者模式有以下几方面的优点：

- `将复杂对象的构建与其表示分离`：建造者模式将构建复杂对象的过程抽象出来，使客户端代码与具体的构建过程解耦，提升了系统的灵活性和可扩展性。
- `同样的构建过程可以创建不同的表示`：通过引入多个不同的建造者，建造者模式允许在相同的构建流程下创建出不同的对象表示。每个具体建造者负责创建不同组合的产品，增加了创建对象的多样性和灵活性。
- `增强代码可维护性`：当产品的构建过程复杂时，建造者模式将构建过程集中在建造者类中，使得构建逻辑与其他部分的代码分离，降低了系统的耦合性，提升了可维护性。

**适用场景**

建造者模式特别适用于那些产品对象的创建过程相对复杂的场景。具体来说，建造者模式可以在以下几种情况下发挥其优势：

- `复杂产品对象的构建`：当生成的产品对象具有复杂的内部结构，并且包含多个成员属性时，建造者模式可以帮助清晰地分步构建对象，避免复杂的构造函数或多个构建步骤。
- `属性间有依赖关系`：如果需要生成的产品对象的属性相互依赖，且构建顺序非常重要，建造者模式可以帮助指定生成的顺序，确保依赖关系的正确性。
- `对象创建过程独立于其类`：在建造者模式中，通过引入一个指挥者类来负责管理产品的构建过程。这样，指挥者类将创建过程封装起来，独立于具体的建造者类，实现了控制过程与对象类的解耦。
- `隔离复杂对象的创建与使用`：建造者模式可以有效地隔离复杂对象的创建过程和对象的使用。通过使用不同的建造者，系统可以在不改变建造过程的情况下，创建不同类型的产品。
- `灵活性和扩展性`：建造者模式通过提供多个建造者类，允许开发者灵活地对创建过程进行扩展。当产品结构或构建过程发生变化时，只需要修改或增加建造者类，而不必修改现有的代码。

**现实应用**

建造者模式在许多实际系统中得到了广泛应用。以 **JUnit** 为例，其测试构建器 `TestBuilder` 就采用了建造者模式，用于创建测试对象。在构建复杂测试用例时，`TestBuilder` 提供了一个灵活的接口，允许用户逐步设置不同的参数和属性，最终构建出完整的测试对象。

在 Java 中，`StringBuilder` 就是一个典型的建造者模式应用。当需要构建一个复杂的字符串时，使用 `StringBuilder` 可以逐步添加字符串而不需要每次都创建一个新的字符串对象。`StringBuilder` 的 `append()` 方法就相当于建造者模式中的“构建”方法，最终通过 `toString()` 获取结果。

#### 3.3 案例

[建造者模式-自行车加工](https://kamacoder.com/problempage.php?pid=1084)

::: info

**题目描述**

小明家新开了一家自行车工厂，用于使用自行车配件（车架 frame 和车轮 tires ）进行组装定制不同的自行车，包括山地车和公路车。

山地车使用的是Aluminum Frame（铝制车架）和 Knobby Tires（可抓地轮胎），公路车使用的是 Carbon Frame （碳车架）和 Slim Tries。

现在它收到了一笔订单，要求定制一批自行车，请你使用【建造者模式】告诉小明这笔订单需要使用那些自行车配置吧。

**输入描述**

输入的第一行是一个整数 N（1 ≤ N ≤ 100），表示订单的数量。 

接下来的 N 行，每行输入一个字符串，字符串表示客户的自行车需求。

字符串可以包含关键词 "mountain" 或 "road"，表示客户需要山地自行车或公路自行车。

**输出描述**

对于每笔订单，输出该订单定制的自行车配置。

**输入示例**

```
3
mountain
road
mountain
```

**输出示例**

```
Aluminum Frame Knobby Tires
Carbon Frame Slim Tires
Aluminum Frame Knobby Tires
```

**提示信息**

在本例中：产品为自行车，可以有两个建造者：山地车建造者和公路车建造者。

:::

```java
import java.util.Scanner;

// 自行车产品
class Bike {
    private String frame;
    private String tires;

    public void setFrame(String frame) {
        this.frame = frame;
    }

    public void setTires(String tires) {
        this.tires = tires;
    }

    @Override
    public String toString() {
        return frame + " " + tires;
    }
}

// 自行车建造者接口
interface BikeBuilder {
    void buildFrame();
    void buildTires();
    Bike getResult();
}

// 山地自行车建造者
class MountainBikeBuilder implements BikeBuilder {
    private Bike bike;

    public MountainBikeBuilder() {
        this.bike = new Bike();
    }

    @Override
    public void buildFrame() {
        bike.setFrame("Aluminum Frame");
    }

    @Override
    public void buildTires() {
        bike.setTires("Knobby Tires");
    }

    @Override
    public Bike getResult() {
        return bike;
    }
}

// 公路自行车建造者
class RoadBikeBuilder implements BikeBuilder {
    private Bike bike;

    public RoadBikeBuilder() {
        this.bike = new Bike();
    }

    @Override
    public void buildFrame() {
        bike.setFrame("Carbon Frame");
    }

    @Override
    public void buildTires() {
        bike.setTires("Slim Tires");
    }

    @Override
    public Bike getResult() {
        return bike;
    }
}

// 自行车Director，负责构建自行车
class BikeDirector {
    public Bike construct(BikeBuilder builder) {
        builder.buildFrame();
        builder.buildTires();
        return builder.getResult();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int N = scanner.nextInt();  // 订单数量
        scanner.nextLine();

        BikeDirector director = new BikeDirector();

        for (int i = 0; i < N; i++) {
            String bikeType = scanner.nextLine();

            BikeBuilder builder;
            // 根据输入类别，创建不同类型的具体建造者
            if (bikeType.equals("mountain")) {
                builder = new MountainBikeBuilder();
            } else {
                builder = new RoadBikeBuilder();
            }
			// Director负责指导生产产品
            Bike bike = director.construct(builder);
            System.out.println(bike);
        }
    }
}
```

### 4. 原型模式(Prototype)

#### 4.1 概述

**原型模式**`Prototype`是一种创建型设计模式， 使你能够复制已有对象， 而又无需使代码依赖它们所属的类。

![原型设计模式](/images/design-pattern/prototype.png)

该模式的核心思想是基于现有的对象创建新的对象，而不是从头开始创建。

在原型模式中，通常有一个原型对象，它被用作创建新对象的模板。新对象通过复制原型对象的属性和状态来创建，而无需知道具体的创建细节。

**为什么要使用原型模式？**

如果一个对象的创建过程比较复杂时（比如需要经过一系列的计算和资源消耗），那每次创建该对象都需要消耗资源，而通过原型模式就可以复制现有的一个对象来迅速创建/克隆一个新对象，不必关心具体的创建细节，可以降低对象创建的成本。

实现原型模式需要给【原型对象】声明一个克隆方法，执行该方法会创建一个当前类的新对象，并将原始对象中的成员变量复制到新生成的对象中，而不必实例化。并且在这个过程中只需要调用原型对象的克隆方法，而无需知道原型对象的具体类型。

原型模式包含两个重点模块：

- 抽象原型接口`prototype`: 声明一个克隆自身的方法`clone`
- 具体原型类`ConcretePrototype`: 实现`clone`方法，复制当前对象并返回一个新对象。

在客户端代码中，可以声明一个具体原型类的对象，然后调用`clone()`方法复制原对象生成一个新的对象。

![image-20250407163350302](/images/design-pattern/image-20250407163350302.png)

原型模式的实现过程即上面描述模块的实现过程：

- 创建一个抽象类或接口，声明一个克隆方法`clone`
- 实现具体原型类，重写克隆方法
- 客户端中实例化具体原型类的对象，并调用其克隆方法来创建新的对象。

```java
// 1. 定义抽象原型类
public abstract class Prototype implements Cloneable {
    public abstract Prototype clone();
}

// 2. 创建具体原型类
public class ConcretePrototype extends Prototype {
    private String data;

    public ConcretePrototype(String data) {
        this.data = data;
    }

    @Override
    public Prototype clone() {
        return new ConcretePrototype(this.data);
    }

    public String getData() {
        return data;
    }
}

// 3. 客户端代码
public class Client {
    public static void main(String[] args) {
        // 创建原型对象
        Prototype original = new ConcretePrototype("Original Data");

        // 克隆原型对象
        Prototype clone = original.clone();

        // 输出克隆对象的数据
        System.out.println("Clone Data: " + ((ConcretePrototype) clone).getData());
    }
}
```

#### 4.2 使用场景

相比于直接实例化对象，通过原型模式复制对象可以显著减少资源消耗并提高性能，尤其在对象创建过程复杂或对象创建代价较高的情况下，原型模式的优势更加明显。当需要频繁创建相似的对象，并且能够通过克隆来避免重复初始化的工作时，原型模式提供了一个理想的解决方案。通过克隆，我们不仅能够快速复制现有对象，还能够在克隆过程中灵活地添加或删除对象的属性，从而生成相似但不完全相同的对象。这种特性大大提高了灵活性与可定制性，尤其适用于需要动态调整对象状态的场景。

然而，在使用原型模式时，需要特别关注对象内部状态的问题，尤其是当对象包含引用类型成员变量时，克隆操作可能会变得复杂。如果实现的是深拷贝（deep clone），那么引用类型的成员变量也必须得到正确的克隆，这就要求对这些对象的克隆过程进行精细控制，确保对象间的引用不会互相干扰，从而避免共享引用带来的潜在问题。

原型模式在许多现代编程语言中得到了广泛应用，以下是一些经典的例子：

- `Java` 提供了 `Object` 类的 `clone()` 方法，可以实现对象的浅拷贝。要使用该方法，类需要实现 `Cloneable` 接口并重写 `clone()` 方法。
- `.NET` 中的 `ICloneable` 接口提供了 `Clone` 方法，用于对象的克隆操作。
- `Spring框架` 中，`Bean` 的作用域之一是 **原型作用域（Prototype Scope）**，在该作用域下，Spring 会为每次请求创建一个新的 `Bean` 实例，类似于原型模式的实现
- `游戏开发中的角色/装备创建`：通过原型模式快速克隆角色或装备对象。
- `配置对象的构建`：通过原型模式复制配置对象并调整属性（如日志、数据库连接）。
- `文档生成器中的对象创建`：通过克隆模板快速生成文档（如PDF报告、合同模板）。

#### 4.3 案例

[原型模式-矩形原型](https://kamacoder.com/problempage.php?pid=1083)

::: info

**题目描述**

公司正在开发一个图形设计软件，其中有一个常用的图形元素是矩形。设计师在工作时可能需要频繁地创建相似的矩形，而这些矩形的基本属性是相同的（颜色、宽度、高度），为了提高设计师的工作效率，请你使用原型模式设计一个矩形对象的原型。使用该原型可以快速克隆生成新的矩形对象。

**输入描述**

首先输入一个字符串，表示矩形的基本属性信息，包括颜色、长度和宽度，用空格分隔，例如 "Red 10 5"。

然后输入一个整数 N（1 ≤ N ≤ 100），表示使用原型创建的矩形数量。

**输出描述**

对于每个矩形，输出一行字符串表示矩形的详细信息，如 "Color: Red, Width: 10,Height: 5"。

**输入示例**

```
Red 10 5
3
```

**输出示例**

```
Color: Red, Width: 10, Height: 5
Color: Red, Width: 10, Height: 5
Color: Red, Width: 10, Height: 5
```

**提示信息**

使用原型模式中的克隆方法实现矩形对象的创建。

:::

```java
import java.util.Scanner;
 
// 抽象原型类
abstract class Prototype implements Cloneable {
    public abstract Prototype clone();
    public abstract String getDetails();
 
    // 公共的 clone 方法
    public Prototype clonePrototype() {
        try {
            return (Prototype) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
 
// 具体矩形原型类
class RectanglePrototype extends Prototype {
    private String color;
    private int width;
    private int height;
 
    // 构造方法
    public RectanglePrototype(String color, int width, int height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
 
    // 克隆方法
    @Override
    public Prototype clone() {
        return clonePrototype();
    }
 
    // 获取矩形的详细信息
    @Override
    public String getDetails() {
        return "Color: " + color + ", Width: " + width + ", Height: " + height;
    }
}
 
// 客户端程序
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        // 读取需要创建的矩形数量
        int N = scanner.nextInt();
 
        // 读取每个矩形的属性信息并创建矩形对象
        for (int i = 0; i < N; i++) {
            String color = scanner.next();
            int width = scanner.nextInt();
            int height = scanner.nextInt();
 
            // 创建原型对象
            Prototype originalRectangle = new RectanglePrototype(color, width, height);
 
            // 克隆对象并输出详细信息
            Prototype clonedRectangle = originalRectangle.clone();
            System.out.println(clonedRectangle.getDetails());
        }
    }
}
```

原型注册表实现：

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
 
// 原型模式抽象类Shape，表示形状的基类
abstract class Shape {
    protected int height;
    protected int width;
    protected String color;
 
    public Shape() {}
 
    public Shape(int height, int width, String color) {
        this.height = height;
        this.width = width;
        this.color = color;
    }
     
    // 抽象方法 clone，用于克隆形状
    public abstract Shape clone();
     
    //get、set方法。
    public int getHeight() {
        return height;
    }
 
    public void setHeight(int height) {
        this.height = height;
    }
 
    public int getWidth() {
        return width;
    }
 
    public void setWidth(int width) {
        this.width = width;
    }
 
    public String getColor() {
        return color;
    }
 
    public void setColor(String color) {
        this.color = color;
    }
}
 
// Rectangle 类，继承自 Shape 表示矩形
class Rectangle extends Shape {
    public Rectangle(int height, int width, String color) {
        super(height, width, color);
    }
     
    // 克隆方法，返回一个新的矩形对象
    @Override
    public Shape clone() {
        return new Rectangle(this.height, this.width, this.color);
    }
}
 
// 原型注册表类，用于存储和管理形状
class ShapeRegistry {
    private Map<String, Shape> shapeMap = new HashMap<>();
     
    // 注册形状，使用形状 ID 作为键
    public void registerShape(String shapeId, Shape shape) {
        shapeMap.put(shapeId, shape);
    }
    // 获取形状，通过克隆返回一个新的对象
    public Shape getShape(String shapeId) {
        Shape shape = shapeMap.get(shapeId);
        return shape != null ? shape.clone() : null;
    }
}
 
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ShapeRegistry shapeRegistry = new ShapeRegistry();
 
        // 注册一个默认的矩形形状
        shapeRegistry.registerShape("defaultRectangle", new Rectangle(10, 20, "red"));
         
        String input = scanner.nextLine();
        String[] parts = input.split(" ");
        if (parts.length == 3) {
            String color = parts[0];
            try {
                int width = Integer.parseInt(parts[1]);
                int height = Integer.parseInt(parts[2]);
                     
                //创建并注册一个新的矩形
                Shape newRectangle = new Rectangle(height, width, color);
                shapeRegistry.registerShape("userRectangle", newRectangle);
                     
                int num = scanner.nextInt();
                for (int i = 0; i < num; i++) {
                    Shape clonedShape = shapeRegistry.getShape("userRectangle");
                    if (clonedShape != null) {
                        System.out.println("Color: " + clonedShape.getColor() + 
                                 ", Width: " + clonedShape.getWidth() + 
                                ", Height: " + clonedShape.getHeight());
                    } else {
                        System.out.println("在注册表中找不到形状.");
                    }
                }
            } catch (NumberFormatException e) {
                System.out.println("输入错误，请重新输入.");
            }
        } else {
            System.out.println("输入格式错误，请按格式输入：颜色 宽度 高度.");
        }
        scanner.close();
    }
}
```



## 结构型模式

### 5. 适配器模式(Adapter)

#### 5.1 概述

**适配器模式**`Adapter`是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。

可以将一个类的接口转换成客户希望的另一个接口，主要目的是充当两个不同接口之间的桥梁，使得原本接口不兼容的类能够一起工作。

![适配器设计模式](/images/design-pattern/adapter-zh.png)

适配器模式分为以下几个基本角色：

可以把适配器模式理解成拓展坞，起到转接的作用，原有的接口是USB，但是客户端需要使用`type-c`， 便使用拓展坞提供一个`type-c`接口给客户端使用

- 目标接口`Target`: 客户端希望使用的接口
- 适配器类`Adapter`: 实现客户端使用的目标接口，持有一个需要适配的类实例。
- 被适配者`Adaptee`: 需要被适配的类

**对象适配器图**

![image-20250407183043832](/images/design-pattern/image-20250407183043832.png)

这样，客户端就可以使用目标接口，而不用对原来的`Adaptee`进行修改，`Adapter`起到一个转接扩展的作用

**简单实现**

```java
// 目标接口
interface Target {
    void request();
}

// 被适配者类
class Adaptee {
    void specificRequest() {
        System.out.println("Specific request");
    }
}

// 适配器类
class Adapter implements Target {
    // 持有一个被适配者实例
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void request() {
        // 调用被适配者类的方法
        adaptee.specificRequest();
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        Target target = new Adapter(new Adaptee());
        target.request();
    }
}
```

#### 5.2 使用场景

适配器模式常用于“补救”和“扩展”已有系统：

- 当现有类的接口与代码不兼容时，可以使用适配器模式进行适配。
- 在系统扩展阶段，如果新类的接口与现有系统不兼容，也可以使用适配器模式。
- 适配器模式通过解耦客户端代码和具体类，使客户端无需修改，提升系统的可扩展性，尽管这也会增加系统复杂度。

**具体应用：**

1. `日志框架适配`：不同项目和库可能使用不同的日志框架，适配器模式可以将不同的日志API统一为相同接口。
2. `Spring MVC中的HandlerAdapter`：该接口将处理器适配到框架，使不同类型的处理器能够统一处理请求。
3. `.NET中的DataAdapter`：用于在数据源（如数据库）和 `DataSet` 之间建立适配器，使数据可以方便地在.NET应用程序中使用。

#### 5.3 案例

[适配器模式-扩展坞](https://kamacoder.com/problempage.php?pid=1085)

::: info 

**题目描述**

小明购买了一台新电脑，该电脑使用 TypeC 接口，他已经有了一个USB接口的充电器和数据线，为了确保新电脑可以使用现有的USB接口充电器和数据线，他购买了一个TypeC到USB的扩展坞。

请你使用适配器模式设计并实现这个扩展坞系统，确保小明的新电脑既可以通过扩展坞使用现有的USB接口充电线和数据线，也可以使用TypeC接口充电。

**输入描述**

题目包含多行输入，第一行输入一个数字 N （1 < N <= 20)，表示后面有N组测试数据。

之后N行都是一个整数，1表示使用电脑本身的TypeC接口，2表示使用扩展坞的USB接口充电。

**输出描述**

根据每行输入，输出相应的充电信息。

**输入示例**

```
3
1
2
1
```

**输出示例**

```
TypeC
USB Adapter
TypeC
```

:::

```java
// 测试程序
import java.util.Scanner;
// USB 接口
interface USB {
    void charge();
}

// TypeC 接口
interface TypeC {
    void chargeWithTypeC();
}

// 适配器类
class TypeCAdapter implements USB {
    private TypeC typeC;

    public TypeCAdapter(TypeC typeC) {
        this.typeC = typeC;
    }

    @Override
    public void charge() {
        typeC.chargeWithTypeC();
    }
}

// 新电脑类，使用 TypeC 接口
class NewComputer implements TypeC {
    @Override
    public void chargeWithTypeC() {
        System.out.println("TypeC");
    }
}

// 适配器充电器类，使用 USB 接口
class AdapterCharger implements USB {
    @Override
    public void charge() {
        System.out.println("USB Adapter");
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取连接次数
        int N = scanner.nextInt();
        scanner.nextLine(); // 消耗换行符

        for (int i = 0; i < N; i++) {
            // 读取用户选择
            int choice = scanner.nextInt();

            // 根据用户的选择创建相应对象
            if (choice == 1) {
                TypeC newComputer = new NewComputer();
                newComputer.chargeWithTypeC();
            } else if (choice == 2) {
                USB usbAdapter = new AdapterCharger();
                usbAdapter.charge();
            }
        }
        scanner.close();
    }
}
```

类适配器模式代码：

```java
import java.util.*;

// 定义计算机端口接口
interface ComputerPort {
    void connect();
}

// TypeC端口类实现ComputerPort接口
class TypeCPort implements ComputerPort {
    @Override
    public void connect() {
        System.out.println("TypeC");
    }
}

// USB设备类
class USBDevice {
    public void connectUSB() {
        System.out.println("USB Adapter");
    }
}

// TypeC到USB适配器类
class TypeCToUSBAdapter extends USBDevice implements ComputerPort {
    @Override
    public void connect() {
        super.connectUSB();
    }
}

public class Main{
    public static void main(String[] args) {
        Scanner inputScanner = new Scanner(System.in);

        Map<Integer, ComputerPort> connectionModes = new HashMap<>();
        connectionModes.put(1, new TypeCPort());
        connectionModes.put(2, new TypeCToUSBAdapter());

        int totalConnections = inputScanner.nextInt();
        inputScanner.nextLine();

        while (inputScanner.hasNextInt()) {
            int choice = inputScanner.nextInt();
            connectionModes.getOrDefault(choice, () -> System.out.println("")).connect();
        }

        inputScanner.close();
    }
}
```



### 6. 代理模式(Proxy)

#### 6.1 概述

**代理模式**`Proxy`是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问，并允许在将请求提交给对象前后进行一些处理。

![代理设计模式](/images/design-pattern/proxy.png)

在代理模式中，允许一个对象（代理）充当另一个对象（真实对象）的接口，以控制对这个对象的访问。通常用于在访问某个对象时引入一些间接层(中介的作用)，这样可以在访问对象时添加额外的控制逻辑，比如限制访问权限，延迟加载。

比如说有一个文件加载的场景，为了避免直接访问“文件”对象，我们可以新增一个代理对象，代理对象中有一个对“文件对象”的引用，在代理对象的 `load` 方法中，可以在访问真实的文件对象之前进行一些操作，比如权限检查，然后调用真实文件对象的 `load` 方法，最后在访问真实对象后进行其他操作，比如记录访问日志。

代理模式的主要角色有：

- `Subject（抽象主题）`： 抽象类，通过接口或抽象类声明真实主题和代理对象实现的业务方法。
- `RealSubject（真实主题）`：定义了Proxy所代表的真实对象，是客户端最终要访问的对象。
- `Proxy（代理）`：包含一个引用，该引用可以是RealSubject的实例，控制对RealSubject的访问，并可能负责创建和删除RealSubject的实例。

![image-20250407192554304](/images/design-pattern/image-20250407192554304.png)

**简单实现：**

```java
// 1. 定义抽象主题, 一般是接口或者抽象类，声明真实主题和代理对象实现的业务方法。
interface Subject {
    void request();
}

// 2. 定义真实主题，实现抽象主题中的具体业务
class RealSubject implements Subject {
    @Override
    public void request() {
        System.out.println("RealSubject handles the request.");
    }
}

// 3. 定义代理类，包含对RealSubject的引用，并提供和真实主题相同的接口，这样代理就可以替代真实主题，并对真实主题进行功能扩展。
class Proxy implements Subject {
    // 包含一个引用
    private RealSubject realSubject;

    @Override
    public void request() {
        // 在访问真实主题之前可以添加额外的逻辑
        if (realSubject == null) {
            realSubject = new RealSubject();
        }
        // 调用真实主题的方法
        realSubject.request();

        // 在访问真实主题之后可以添加额外的逻辑
    }
}

// 4. 客户端使用代理
public class Main {
    public static void main(String[] args) {
        // 使用代理
        Subject proxy = new Proxy();
        proxy.request();
    }
}
```

#### 6.2 使用场景

代理模式通过控制客户端对真实对象的访问，常用于限制访问权限或在访问前后执行额外操作（如日志记录），从而扩展功能。

**主要应用场景：**

1. **虚拟代理**：当对象的创建和初始化代价较高时，使用虚拟代理延迟创建对象，直到真正需要时才初始化。
2. **安全代理**：根据访问者权限，决定是否允许访问真实对象的方法。

代理模式增加了系统复杂性，并可能在频繁访问真实对象时带来性能问题。

**实际应用：**

1. **Spring AOP**：Spring 使用代理模式实现切面编程，在方法执行前后或抛出异常时插入逻辑，而无需修改原始代码。
2. **Java 动态代理**：Java 提供动态代理机制，允许在运行时生成代理类。
3. **Android Glide**：Glide 框架利用代理模式实现图片的延迟加载。

#### 6.3 案例

[代理模式-小明买房子](https://kamacoder.com/problempage.php?pid=1088)

::: info

**题目描述**

小明想要购买一套房子，他决定寻求一家房屋中介来帮助他找到一个面积超过100平方米的房子，只有符合条件的房子才会被传递给小明查看。

**输入描述**

第一行是一个整数 N（1 ≤ N ≤ 100），表示可供查看的房子的数量。

接下来的 N 行，每行包含一个整数，表示对应房子的房屋面积。

**输出描述**

对于每个房子，输出一行，表示是否符合购房条件。如果房屋面积超过100平方米，输出 "YES"；否则输出 "NO"。

**输入示例**

```
3
120
80
110
```

**输出示例**

```
YES
NO
YES
```

:::

```java
import java.util.Scanner;

// 抽象主题
interface HomePurchase {
    void requestPurchase(int area);
}

//真实主题
class HomeBuyer implements HomePurchase {
    @Override
    public void requestPurchase(int area) {
        System.out.println("YES");
    }
}

// 代理类
class HomeAgentProxy implements HomePurchase {
    private HomeBuyer homeBuyer = new HomeBuyer();

    @Override
    public void requestPurchase(int area) {
        if (area > 100) {
            homeBuyer.requestPurchase(area);
        } else {
            System.out.println("NO");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        HomePurchase buyerProxy = new HomeAgentProxy();

        int n = scanner.nextInt();
        for (int i = 0; i < n; i++) {
            int area = scanner.nextInt();
            buyerProxy.requestPurchase(area);
        }

        scanner.close();
    }
}
```



### 7. 装饰模式(Decorator)

**亦称：** 封装器模式、Wrapper、Adapter

#### 7.1 概述

**装饰模式**`Decorator`是一种结构型设计模式， 允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

![装饰设计模式](/images/design-pattern/decorator.png)

通常情况下，扩展类的功能可以通过继承实现，但是扩展越多，子类越多，装饰模式可以在<u>不定义子类的情况下动态的给对象添加一些额外的功能。</u>具体的做法是将原始对象放入包含行为的特殊封装类(装饰类)，从而为原始对象动态添加新的行为，而无需修改其代码。

举个简单的例子，假设你有一个基础的图形类，你想要为图形类添加颜色、边框、阴影等功能，如果每个功能都实现一个子类，就会导致产生大量的类，这时就可以考虑使用装饰模式来动态地添加，而不需要修改图形类本身的代码，这样可以使得代码更加灵活、更容易维护和扩展。

装饰模式包含以下四个主要角色：

- 组件`Component`：通常是抽象类或者接口，是具体组件和装饰者的父类，定义了具体组件需要实现的方法，比如说我们定义`Coffee`为组件。
- 具体组件`ConcreteComponent`: 实现了Component接口的具体类，是**被装饰的对象**。
- 装饰类`Decorator`: 一个抽象类，给具体组件添加功能，但是具体的功能由其子类具体装饰者完成，持有一个指向Component对象的引用。
- 具体装饰类`ConcreteDecorator`: 扩展Decorator类，负责向Component对象添加新的行为，加牛奶的咖啡是一个具体装饰类，加糖的咖啡也是一个具体装饰类。

![image-20250407200342273](/images/design-pattern/image-20250407200342273.png)

**简单实现：**

```java
// 1. 定义Component接口
// 组件接口
public interface Component {
    void operation();
}

// 2. 实现 ConcreteComponent
// 具体组件
public class ConcreteComponent implements Component {
    @Override
    public void operation() {
        System.out.println("ConcreteComponent operation");
    }
}

// 3. 定义Decorator装饰类，继承自Component
// 定义一个抽象的装饰者类，继承自Component
public abstract class Decorator implements Component {
    protected Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    @Override
    public void operation() {
        component.operation();
    }
}

// 4. 定义具体的装饰者实现，给具体组件对象添加功能。
// 具体的装饰者实现
public class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component component) {
        super(component);
    }

    // 根据需要添加额外的方法

    @Override
    public void operation() {
        // 可以在调用前后添加额外的行为
        System.out.println("Before operation in ConcreteDecorator");
        super.operation();
        System.out.println("After operation in ConcreteDecorator");
    }
}

// 5. 在客户端使用
public class Main {
    public static void main(String[] args) {
        // 创建具体组件
        Component concreteComponent = new ConcreteComponent();

        // 使用具体装饰者包装具体组件
        Decorator decorator = new ConcreteDecorator(concreteComponent);

        // 调用操作
        decorator.operation();
    }
}
```

#### 7.2 使用场景

装饰模式通常在以下情况使用：

- 当无法通过继承扩展现有类时，可以使用装饰模式为类添加附加功能。
- 当需要动态地添加、覆盖或撤销对象功能时，装饰模式是理想选择。

在 Java 的 I/O 库中，装饰模式被广泛应用于增强 I/O 流功能。例如，`BufferedInputStream` 和 `BufferedOutputStream` 为输入流和输出流添加缓冲区，提升读写效率；它们是 `InputStream` 和 `OutputStream` 的装饰器。类似地，`BufferedReader` 和 `BufferedWriter` 为字符流提供缓冲功能，是 `Reader` 和 `Writer` 的装饰者。

#### 7.3 案例

[装饰器模式-咖啡加糖](https://kamacoder.com/problempage.php?pid=1086)

::: info

**题目描述**

小明喜欢品尝不同口味的咖啡，他发现每种咖啡都可以加入不同的调料，比如牛奶、糖和巧克力。他决定使用装饰者模式制作自己喜欢的咖啡。 

请设计一个简单的咖啡制作系统，使用装饰者模式为咖啡添加不同的调料。系统支持两种咖啡类型：黑咖啡（Black Coffee）和拿铁（Latte）。

**输入描述**

多行输入，每行包含两个数字。第一个数字表示咖啡的选择（1 表示黑咖啡，2 表示拿铁），第二个数字表示要添加的调料类型（1 表示牛奶，2 表示糖）。

**输出描述**

根据每行输入，输出制作咖啡的过程，包括咖啡类型和添加的调料。

**输入示例**

```
1 1
2 2
```

**输出示例**

```
Brewing Black Coffee
Adding Milk
Brewing Latte
Adding Sugar
```

:::

```java
import java.util.Scanner;

// 咖啡接口
interface Coffee {
    void brew();
}

// 具体的黑咖啡类
class BlackCoffee implements Coffee {
    @Override
    public void brew() {
        System.out.println("Brewing Black Coffee");
    }
}

// 具体的拿铁类
class Latte implements Coffee {
    @Override
    public void brew() {
        System.out.println("Brewing Latte");
    }
}

// 装饰者抽象类
abstract class Decorator implements Coffee {
    protected Coffee coffee;

    public Decorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public void brew() {
        coffee.brew();
    }
}

// 具体的牛奶装饰者类
class MilkDecorator extends Decorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public void brew() {
        super.brew();
        System.out.println("Adding Milk");
    }
}

// 具体的糖装饰者类
class SugarDecorator extends Decorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public void brew() {
        super.brew();
        System.out.println("Adding Sugar");
    }
}

// 客户端代码
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            int coffeeType = scanner.nextInt();
            int condimentType = scanner.nextInt();

            // 根据输入制作咖啡
            Coffee coffee;
            if (coffeeType == 1) {
                coffee = new BlackCoffee();
            } else if (coffeeType == 2) {
                coffee = new Latte();
            } else {
                System.out.println("Invalid coffee type");
                continue;
            }

            // 根据输入添加调料
            if (condimentType == 1) {
                coffee = new MilkDecorator(coffee);
            } else if (condimentType == 2) {
                coffee = new SugarDecorator(coffee);
            } else {
                System.out.println("Invalid condiment type");
                continue;
            }

            // 输出制作过程
            coffee.brew();
        }
    }
}
```

将处理输入和创建对象的逻辑分离到方法中

```java
import java.util.Scanner;
 
// 定义咖啡接口
interface Coffee {
    void execute();
}
 
// 黑咖啡类，实现咖啡接口
class BrewingBlackCoffee implements Coffee {
    @Override
    public void execute() {
        System.out.println("Brewing Black Coffee");
    }
}
 
// 拿铁类，实现咖啡接口
class BrewingLatte implements Coffee {
    @Override
    public void execute() {
        System.out.println("Brewing Latte");
    }
}
 
// 咖啡装饰器抽象类，实现咖啡接口
abstract class Decorator implements Coffee {
    private Coffee coffee;
 
    public Decorator(Coffee coffee) {
        this.coffee = coffee;
    }
 
    @Override
    public void execute() {
        coffee.execute();
    }
}
 
// 牛奶装饰器类，继承自装饰器类
class MilkDecorator extends Decorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
 
    @Override
    public void execute() {
        super.execute();
        System.out.println("Adding Milk");
    }
}
 
// 糖装饰器类，继承自装饰器类
class SugarDecorator extends Decorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
 
    @Override
    public void execute() {
        super.execute();
        System.out.println("Adding Sugar");
    }
}
 
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            String input;
            while (scanner.hasNextLine()) {
                input = scanner.nextLine();
 
                if (input.equalsIgnoreCase("exit")) {
                    break;
                }
                processInput(input);
            }
        } catch (NumberFormatException e) {
            System.out.println("输入格式无效：" + e.getMessage());
        } finally {
            scanner.close();
        }
    }
     
    // 处理输入的方法
    private static void processInput(String input) {
        String[] parts = input.split(" ");
        if (parts.length != 2) {
            System.out.println("输入格式无效。请提供两个数字，中间用空格分隔。");
            return;
        }
 
        try {
            int type1 = Integer.parseInt(parts[0]);
            int type2 = Integer.parseInt(parts[1]);
 
            Coffee coffee = createCoffee(type1);
            if (coffee == null) {
                System.out.println("咖啡类型无效。请输入1（黑咖啡）或2（拿铁）。");
                return;
            }
 
            coffee = decorateCoffee(coffee, type2);
            if (coffee == null) {
                System.out.println("装饰类型无效。请输入1（牛奶）或2（糖）。");
                return;
            }
 
            coffee.execute();
        } catch (NumberFormatException e) {
            System.out.println("输入格式无效：两个输入都必须是数字。");
        }
    }
     
    // 创建咖啡对象的方法
    private static Coffee createCoffee(int type) {
        switch (type) {
            case 1:
                return new BrewingBlackCoffee();
            case 2:
                return new BrewingLatte();
            default:
                return null;
        }
    }
     
    // 添加装饰器的方法
    private static Coffee decorateCoffee(Coffee coffee, int type) {
        switch (type) {
            case 1:
                return new MilkDecorator(coffee);
            case 2:
                return new SugarDecorator(coffee);
            default:
                return null;
        }
    }
}
```







### 8. 外观模式(Facade)

#### 8.1 概述

**外观模式**`Facade`是一种结构型设计模式， 能为程序库、 框架或其他复杂类提供一个简单的接口。

![外观设计模式](/images/design-pattern/facade.png)

该模式也被称为“门面模式”，外观模式定义了一个高层接口，这个接口使得子系统更容易使用，同时也隐藏了子系统的复杂性。

::: tip 提示

门面模式可以将子系统关在“门里”隐藏起来，客户端只需要通过外观接口与外观对象进行交互，而不需要直接和多个子系统交互，无论子系统多么复杂，对于外部来说是隐藏的，这样可以降低系统的耦合度。

:::

举个例子，假设你正在编写的一个模块用来处理文件读取、解析、存储，我们可以将这个过程拆成三部分，然后创建一个外观类，将文件系统操作、数据解析和存储操作封装在外观类中，为客户端提供一个简化的接口，如果后续需要修改文件处理的流程或替换底层子系统，也只需在外观类中进行调整，不会影响客户端代码。

外观模式的基本结构比较简单，只包括“外观”和“子系统类”

- `外观类Facade`：对外提供一个统一的高层次接口，使复杂的子系统变得更易使用。
- `子系统类Subsystem`：实现子系统的功能，处理外观类指派的任务。

![image-20250407203503318](/images/design-pattern/image-20250407203503318.png)

**简易实现**

代码中，`Facade` 类是外观类，封装了对三个子系统`SubSystem`的操作。客户端通过调用外观类的方法来实现对子系统的访问，而不需要直接调用子系统的方法。

```java
// 子系统A
class SubsystemA {
    public void operationA() {
        System.out.println("SubsystemA operation");
    }
}

// 子系统B
class SubsystemB {
    public void operationB() {
        System.out.println("SubsystemB operation");
    }
}

// 子系统C
class SubsystemC {
    public void operationC() {
        System.out.println("SubsystemC operation");
    }
}

// 外观类
class Facade {
    private SubsystemA subsystemA;
    private SubsystemB subsystemB;
    private SubsystemC subsystemC;

    public Facade() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }

    // 外观方法，封装了对子系统的操作
    public void facadeOperation() {
        subsystemA.operationA();
        subsystemB.operationB();
        subsystemC.operationC();
    }
}

// 客户端
public class Main {
    public static void main(String[] args) {
        // 创建外观对象
        Facade facade = new Facade();

        // 客户端通过外观类调用子系统的操作
        facade.facadeOperation();
    }
}
```

#### 8.2 使用场景

**优缺点和使用场景**

外观模式通过提供简化的接口，隐藏系统复杂性，减少客户端与子系统的耦合度。客户端无需了解内部实现细节，只需通过外观接口与外观对象交互。

然而，当需要添加新子系统或修改子系统行为时，可能需要修改外观类，这可能违反“开闭原则”。

外观模式应用广泛，以下是一些典型案例：

- **Spring框架**：Spring提供了如依赖注入、AOP和事务管理等功能，`ApplicationContext` 作为外观，隐藏了底层复杂性，使开发者更易使用。
- **JDBC**：`DriverManager` 类作为外观，简化了数据库驱动加载和连接过程，隐藏了底层复杂性。
- **Android**：`Activity` 类作为外观，简化了应用生命周期管理，开发者无需关注底层事件和状态管理。

#### 8.3 案例

[外观模式-电源开关](https://kamacoder.com/problempage.php?pid=1089)

::: info 

**题目描述**

小明家的电源总开关控制了家里的三个设备：空调、台灯和电视机。每个设备都有独立的开关密码，分别用数字1、2和3表示。即输入1时，空调关闭，输入2时，台灯关闭，输入3时，电视机关闭，当输入为4时，表示要关闭所有设备。请你使用外观模式编写程序来描述电源总开关的操作。

**输入描述**

第一行是一个整数 N（1 <= N <= 100），表示后面有 N 行输入。

 接下来的 N 行，每行包含一个数字，表示对应设备的开关操作（1表示关闭空调，2表示关闭台灯，3表示关闭电视机，4表示关闭所有设备）。

**输出描述**

输出关闭所有设备后的状态，当输入的数字不在1-4范围内时，输出Invalid device code.

**输入示例**

```
4
1
2
3
4
```

**输出示例**

```
Air Conditioner is turned off.
Desk Lamp is turned off.
Television is turned off.
All devices are off.
```

:::

```java
import java.util.Scanner;

class AirConditioner {
    public void turnOff() {
        System.out.println("Air Conditioner is turned off.");
    }
}
class DeskLamp {
    public void turnOff() {
        System.out.println("Desk Lamp is turned off.");
    }
}
class Television {
    public void turnOff() {
        System.out.println("Television is turned off.");
    }
}

class PowerSwitchFacade {
    private DeskLamp deskLamp;
    private AirConditioner airConditioner;
    private Television television;

    public PowerSwitchFacade() {
        this.deskLamp = new DeskLamp();
        this.airConditioner = new AirConditioner();
        this.television = new Television();
    }

    public void turnOffDevice(int deviceCode) {
        switch (deviceCode) {
            case 1:
                airConditioner.turnOff();
                break;
            case 2:
                deskLamp.turnOff();
                break;
            case 3:
                television.turnOff();
                break;
            case 4:
                System.out.println("All devices are off.");
                break;
            default:
                System.out.println("Invalid device code.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取输入
        int n = scanner.nextInt();
        int[] input = new int[n];

        for (int i = 0; i < n; i++) {
            input[i] = scanner.nextInt();
        }

        // 创建电源总开关外观
        PowerSwitchFacade powerSwitch = new PowerSwitchFacade();

        // 执行操作
        for (int i = 0; i < n; i++) {
            powerSwitch.turnOffDevice(input[i]);
        }
    }
}
```



### 9. 桥接模式(Bridge)

#### 9.1 概述

**桥接模式**是一种结构型设计模式， 可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构， 从而能在开发时分别使用。

![桥接设计模式](/images/design-pattern/bridge.png)

桥接模式（Bridge Pattern）是一种结构型设计模式，它的UML图很像一座桥，它通过将【抽象部分】与【实现部分】分离，使它们可以独立变化，从而达到降低系统耦合度的目的。桥接模式的主要目的是通过组合建立两个类之间的联系，而不是继承的方式。

举个简单的例子，图形编辑器中，每一种图形都需要蓝色、红色、黄色不同的颜色，如果不使用桥接模式，可能需要为每一种图形类型和每一种颜色都创建一个具体的子类，而使用桥接模式可以将图形和颜色两个维度分离，两个维度都可以独立进行变化和扩展，如果要新增其他颜色，只需添加新的 `Color` 子类，不影响图形类；反之亦然。

![image-20250407211551331](/images/design-pattern/image-20250407211551331.png)

桥接模式的基本结构分为以下几个角色：

- 抽象`Abstraction`：一般是抽象类，定义抽象部分的接口，维护一个对【实现】的引用。
- 修正抽象`RefinedAbstaction`：对抽象接口进行扩展，通常对抽象化的不同维度进行变化或定制。
- 实现`Implementor`： 定义实现部分的接口，提供具体的实现。这个接口通常是抽象化接口的实现。
- 具体实现`ConcreteImplementor`：实现实现化接口的具体类。这些类负责实现实现化接口定义的具体操作。

![image-20250407211143342](/images/design-pattern/image-20250407211143342.png)

再举个例子，遥控器就是抽象接口，它具有开关电视的功能，修正抽象就是遥控器的实例，对遥控器的功能进行实现和扩展，而电视就是实现接口，具体品牌的电视机是具体实现，遥控器中包含一个对电视接口的引用，通过这种方式，遥控器和电视的实现被分离，我们可以创建多个遥控器，每个遥控器控制一个品牌的电视机，它们之间独立操作，不受电视品牌的影响，可以独立变化。

**简单实现：**

抽象版：

```java
// 1. 创建实现接口
interface Implementation {
    void operationImpl();
}

// 2. 创建具体实现类：实际提供服务的对象。
class ConcreteImplementationA implements Implementation {
    @Override
    public void operationImpl() {
        // 具体实现A
    }
}
class ConcreteImplementationB implements Implementation {
    @Override
    public void operationImpl() {
        // 具体实现B
    }
}

// 3. 创建抽象接口：包含一个对实现化接口的引用。
public abstract class Abstraction {

    protected IImplementor mImplementor;

    public Abstraction(IImplementor implementor) {
        this.mImplementor = implementor;
    }

    public void operation() {
        this.mImplementor.operationImpl();
    }
    
}

// 4. 实现抽象接口，创建RefinedAbstaction类
class RefinedAbstraction extends Abstraction {
    private Implementation implementation;

    public RefinedAbstraction(Implementation implementation) {
        this.implementation = implementation;
    }

    @Override
    public void operation() {
        // 委托给实现部分的具体类
        implementation.operationImpl();
    }
}

// 5. 客户端使用
// 客户端代码
public class Main {
    public static void main(String[] args) {
        // 创建具体实现化对象
        Implementation implementationA = new ConcreteImplementationA();
        Implementation implementationB = new ConcreteImplementationB();

        // 使用扩充抽象化对象，将实现化对象传递进去
        Abstraction abstractionA = new RefinedAbstraction(implementationA);
        Abstraction abstractionB = new RefinedAbstraction(implementationB);

        // 调用抽象化的操作
        abstractionA.operation();
        abstractionB.operation();
    }
}
```

实例版：

```java
// 1. 创建实现接口
// 以电视举例, 具有开关和切换频道的功能。
interface TV {
    void on();
    void off();
    void tuneChannel();
}

// 2. 创建具体实现类：实际提供服务的对象。
// 以电视举例，创建具体实现类
class ATV implements TV {
    @Override
    public void on() {
        System.out.println("A TV is ON");
    }

    @Override
    public void off() {
        System.out.println("A TV is OFF");
    }

    @Override
    public void tuneChannel() {
        System.out.println("Tuning A TV channel");
    }
}
class BTV implements TV {
    @Override
    public void on() {
        System.out.println("B TV is ON");
    }

    @Override
    public void off() {
        System.out.println("B TV is OFF");
    }

    @Override
    public void tuneChannel() {
        System.out.println("Tuning B TV channel");
    }
}

// 3. 创建抽象接口：包含一个对实现化接口的引用。
abstract class RemoteControl {
    // 持有一个实现化接口的引用
    protected TV tv;

    public RemoteControl(TV tv) {
        this.tv = tv;
    }

    abstract void turnOn();
    abstract void turnOff();
    abstract void changeChannel();
}
// 4. 实现抽象接口，创建BasicRemoteControl类
class BasicRemoteControl extends RemoteControl {
    public BasicRemoteControl(TV tv) {
        super(tv);
    }

    @Override
    void turnOn() {
        tv.on();
    }

    @Override
    void turnOff() {
        tv.off();
    }

    @Override
    void changeChannel() {
        tv.tuneChannel();
    }
}
// 5. 客户端使用
// 客户端代码
public class Main {
    public static void main(String[] args) {
        // 创建具体实现化对象
        TV aTV = new ATV();
        TV bTV = new BTV();

        // 使用扩充抽象化对象，将实现化对象传递进去
        RemoteControl basicRemoteForA = new BasicRemoteControl(aTV);
        RemoteControl basicRemoteForB = new BasicRemoteControl(bTV);

        // 调用抽象化的操作
        basicRemoteForA.turnOn();  // A TV is ON
        basicRemoteForA.changeChannel();  // Tuning A TV channel
        basicRemoteForA.turnOff();  // A TV is OFF

        // 调用抽象化的操作
        basicRemoteForB.turnOn();  // B TV is ON
        basicRemoteForB.changeChannel();  // Tuning B TV channel
        basicRemoteForB.turnOff();  // B TV is OFF
    }
}
```

#### 9.2 使用场景

桥接模式在开发中使用较少，通常在以下情况下使用：

- 当一个类有两个独立变化的维度，且需要对这两个维度进行扩展时，桥接模式可以使它们独立变化，减少耦合。
- 当不希望使用继承，或继承导致类的膨胀时，桥接模式提供了更灵活的解决方案。

总体来说，桥接模式适用于那些具有多个独立变化维度且需要灵活扩展的系统。

#### 9.3 案例

[桥接模式-万能遥控器](https://kamacoder.com/problempage.php?pid=1092)

::: info 

**题目描述**

小明家有一个万能遥控器，能够支持多个品牌的电视。每个电视可以执行开机、关机和切换频道的操作，请你使用桥接模式模拟这个操作。

**输入描述**

第一行是一个整数 N（1 <= N <= 100），表示后面有 N 行输入。

接下来的 N 行，每行包含两个数字。第一个数字表示创建某个品牌的遥控和电视，第二个数字表示执行的操作。

其中，0 表示创建 Sony 品牌的电视，1 表示创建 TCL 品牌的遥控和电视；

2 表示开启电视、3表示关闭电视，4表示切换频道。

**输出描述**

对于每个操作，输出相应的执行结果。

**输入示例**

```
6
0 2
1 2
0 4
0 3
1 4
1 3
```

**输出示例**

```
Sony TV is ON
TCL TV is ON
Switching Sony TV channel
Sony TV is OFF
Switching TCL TV channel
TCL TV is OFF
```

:::

```java
import java.util.Scanner;

// 步骤1: 创建实现化接口
interface TV {
    void turnOn();
    void turnOff();
    void switchChannel();
}

// 步骤2: 创建具体实现化类
class SonyTV implements TV {
    @Override
    public void turnOn() {
        System.out.println("Sony TV is ON");
    }

    @Override
    public void turnOff() {
        System.out.println("Sony TV is OFF");
    }

    @Override
    public void switchChannel() {
        System.out.println("Switching Sony TV channel");
    }
}

class TCLTV implements TV {
    @Override
    public void turnOn() {
        System.out.println("TCL TV is ON");
    }

    @Override
    public void turnOff() {
        System.out.println("TCL TV is OFF");
    }

    @Override
    public void switchChannel() {
        System.out.println("Switching TCL TV channel");
    }
}

// 步骤3: 创建抽象化接口
abstract class RemoteControl {
    protected TV tv;

    public RemoteControl(TV tv) {
        this.tv = tv;
    }

    abstract void performOperation();
}

// 步骤4: 创建扩充抽象化类
class PowerOperation extends RemoteControl {
    public PowerOperation(TV tv) {
        super(tv);
    }

    @Override
    void performOperation() {
        tv.turnOn();
    }
}

class OffOperation extends RemoteControl {
    public OffOperation(TV tv) {
        super(tv);
    }

    @Override
    void performOperation() {
        tv.turnOff();
    }
}

class ChannelSwitchOperation extends RemoteControl {
    public ChannelSwitchOperation(TV tv) {
        super(tv);
    }

    @Override
    void performOperation() {
        tv.switchChannel();
    }
}

// 步骤5: 客户端代码
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int N = scanner.nextInt();
        scanner.nextLine();

        for (int i = 0; i < N; i++) {
            String[] input = scanner.nextLine().split(" ");
            int brand = Integer.parseInt(input[0]);
            int operation = Integer.parseInt(input[1]);

            TV tv;
            if (brand == 0) {
                tv = new SonyTV();
            } else {
                tv = new TCLTV();
            }

            RemoteControl remoteControl;
            if (operation == 2) {
                remoteControl = new PowerOperation(tv);
            } else if (operation == 3) {
                remoteControl = new OffOperation(tv);
            } else {
                remoteControl = new ChannelSwitchOperation(tv);
            }

            remoteControl.performOperation();
        }

        scanner.close();
    }
}
```

### 10. 组合模式

**亦称：** 对象树、Object Tree、Composite

#### 10.1 概述

**组合模式**是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。

![组合设计模式](/images/design-pattern/composite.png)

它**将对象组合成树状结构**来表示“部分-整体”的层次关系。组合模式使得客户端可以**统一处理单个对象和对象的组合**，而无需区分它们的具体类型。

组合模式包括下面几个角色：

理解起来比较抽象，我们用“省份-城市”举个例子，省份中包含了多个城市，如果将之比喻成一个树形结构，城市就是叶子节点，它是省份的组成部分，而“省份”就是合成节点，可以包含其他城市，形成一个整体，省份和城市都是组件，它们都有一个共同的操作，比如获取信息。

- `Component`组件： 组合模式的“根节点”，定义组合中所有对象的通用接口，可以是抽象类或接口。该类中定义了子类的共性内容。
- `Leaf`叶子：实现了Component接口的叶子节点，表示组合中的叶子对象，叶子节点没有子节点。
- `Composite`合成： 作用是存储子部件，并且在Composite中实现了对子部件的相关操作，比如添加、删除、获取子组件等。

通过组合模式，整个省份的获取信息操作可以一次性地执行，而无需关心省份中的具体城市。这样就实现了对国家省份和城市的管理和操作。

![image-20250407214203536](/images/design-pattern/image-20250407214203536.png)

**简单实现：**

```java
// 组件接口
interface Component {
    void operation();
}

// 叶子节点
class Leaf implements Component {
    @Override
    public void operation() {
        System.out.println("Leaf operation");
    }
}

// 组合节点：包含叶子节点的操作行为
class Composite implements Component {
    private List<Component> components = new ArrayList<>();

    public void add(Component component) {
        components.add(component);
    }

    public void remove(Component component) {
        components.remove(component);
    }

    @Override
    public void operation() {
        System.out.println("Composite operation");
        for (Component component : components) {
            component.operation();
        }
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        // 创建叶子节点
        Leaf leaf = new Leaf();
        // 创建组合节点，并添加叶子节点
        Composite composite = new Composite();
        composite.add(leaf);

        composite.operation(); // 统一调用
    }
}
```

#### 10.2 使用场景

组合模式允许客户端统一处理单个对象和组合对象，无需区分它们的差异。例如，在图形编辑器中，图形对象可以是简单的线或圆形，也可以是复杂的组合图形，通过统一操作处理这些不同的元素。

总体而言，组合模式适用于构建具有部分-整体层次结构的场景，如组织架构管理、文件系统中的文件和文件夹等。

#### 10.3 案例

[组合模式-公司组织架构](https://kamacoder.com/problempage.php?pid=1090)

::: info 

**题目描述**

小明所在的公司内部有多个部门，每个部门下可能有不同的子部门或者员工。

请你设计一个组合模式来管理这些部门和员工，实现对公司组织结构的统一操作。部门和员工都具有一个通用的接口，可以获取他们的名称以及展示公司组织结构。

**输入描述**

第一行是一个整数 N（1 <= N <= 100），表示后面有 N 行输入。 

接下来的 N 行，每行描述一个部门或员工的信息。部门的信息格式为 D 部门名称，员工的信息格式为 E 员工名称，其中 D 或 E 表示部门或员工。

**输出描述**

输出公司的组织结构，展示每个部门下的子部门和员工

**输入示例**

```
MyCompany
8
D HR
E HRManager
D Finance
E AccountantA
E AccountantB
D IT
E DeveloperA
E DeveloperB
```

**输出示例**

```
Company Structure:
MyCompany
  HR
    HRManager
  Finance
    AccountantA
    AccountantB
  IT
    DeveloperA
    DeveloperB
```

:::

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

interface Component {
    void display(int depth);
}

class Department implements Component {
    private String name;
    private List<Component> children;

    public Department(String name) {
        this.name = name;
        this.children = new ArrayList<>();
    }

    public void add(Component component) {
        children.add(component);
    }

    @Override
    public void display(int depth) {
        StringBuilder indent = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            indent.append("  ");
        }
        System.out.println(indent + name);
        for (Component component : children) {
            component.display(depth + 1);
        }
    }
}

class Employee implements Component {
    private String name;

    public Employee(String name) {
        this.name = name;
    }

    @Override
    public void display(int depth) {
        StringBuilder indent = new StringBuilder();
        for (int i = 0; i < depth; i++) {
            indent.append("  ");
        }
        System.out.println(indent + "  " + name);
    }
}

class Company {
    private String name;
    private Department root;

    public Company(String name) {
        this.name = name;
        this.root = new Department(name);
    }

    public void add(Component component) {
        root.add(component);
    }

    public void display() {
        System.out.println("Company Structure:");
        root.display(0);  // 从 1 开始，以适配指定的缩进格式
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取公司名称
        String companyName = scanner.nextLine();
        Company company = new Company(companyName);

        // 读取部门和员工数量
        int n = scanner.nextInt();
        scanner.nextLine();

        // 读取部门和员工信息
        for (int i = 0; i < n; i++) {
            String type = scanner.next();
            String name = scanner.nextLine().trim();

            if ("D".equals(type)) {
                Department department = new Department(name);
                company.add(department);
            } else if ("E".equals(type)) {
                Employee employee = new Employee(name);
                company.add(employee);
            }
        }

        // 输出公司组织结构
        company.display();
    }
}
```

### 11. 享元模式

**亦称：** 缓存、Cache、Flyweight

#### 11.1 概述

**享元模式**是一种结构型设计模式， 它摒弃了在每个对象中保存所有数据的方式， 通过共享多个对象所共有的相同状态， 让你能在有限的内存容量中载入更多对象。

![享元设计模式](/images/design-pattern/flyweight-zh.png)

享元模式是一种结构型设计模式，在享元模式中，对象被设计为可共享的，可以被多个上下文使用，而不必在每个上下文中都创建新的对象。

想要了解享元模式，就必须要区分什么是内部状态，什么是外部状态。

- 内部状态是指那些可以被多个对象共享的状态，它存储在享元对象内部，并且对于所有享元对象都是相同的，这部分状态通常是不变的。
- 而外部状态是享元对象依赖的、可能变化的部分。这部分状态不存储在享元对象内部，而是在使用享元对象时通过参数传递给对象。

举个例子，图书馆中有很多相同的书籍，但每本书都可以被多个人借阅，图书馆里的书就是内部状态，人就是外部状态。

再举个开发中的例子，假设我们在构建一个简单的图形编辑器，用户可以在画布上绘制不同类型的图形，而图形就是所有图形对象的内部状态（不变的），而图形的坐标位置就是图形对象的外部状态（变化的）。

如果图形编辑器中有成千上万的图形对象，每个图形对象都独立创建并存储其内部状态，那么系统的内存占用可能会很大，在这种情况下，享元模式共享相同类型的图形对象，每种类型的图形对象只需创建一个共享实例，然后通过设置不同的坐标位置个性化每个对象，通过共享相同的内部状态，降低了对象的创建和内存占用成本。

享元模式包括以下几个重要角色：

- 享元接口`Flyweight`: 所有具体享元类的共享接口，通常包含对外部状态的操作。
- 具体享元类`ConcreteFlyweight`: 继承`Flyweight`类或实现享元接口，包含内部状态。
- 享元工厂类`FlyweightFactory`: 创建并管理享元对象，当用户请求时，提供已创建的实例或者创建一个。
- 客户端`Client`: 维护外部状态，在使用享元对象时，将外部状态传递给享元对象。

![image-20250407220854012](/images/design-pattern/image-20250407220854012.png)

**简易实现**

```java
// 1. 定义享元接口，接受外部状态作为参数并进行处理。
interface Flyweight {
    // 操作外部状态
    void operation(String externalState);
}

// 2. 实现具体享元类, 存储内部状态。
class ConcreteFlyweight implements Flyweight {
    private String intrinsicState; // 内部状态

    public ConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
    }

    @Override
    public void operation(String externalState) {
        System.out.println("Intrinsic State: " + intrinsicState + ", External State: " + externalState);
    }
}

// 3. 创建享元工厂类，创建并管理Flyweight对象，当用户请求一个Flyweight时，享元工厂会提供一个已经创建的实例或者创建一个。
class FlyweightFactory {
    private Map<String, Flyweight> flyweights = new HashMap<>();

    public Flyweight getFlyweight(String key) {
        if (!flyweights.containsKey(key)) {
            flyweights.put(key, new ConcreteFlyweight(key));
        }
        return flyweights.get(key);
    }
}

// 4. 客户端使用享元模式
public class Main {
    public static void main(String[] args) {
        FlyweightFactory factory = new FlyweightFactory();

        // 获取或创建享元对象，并传递外部状态
        Flyweight flyweight1 = factory.getFlyweight("A");
        flyweight1.operation("External State 1");

        Flyweight flyweight2 = factory.getFlyweight("B");
        flyweight2.operation("External State 2");

        Flyweight flyweight3 = factory.getFlyweight("A"); // 重复使用已存在的享元对象
        flyweight3.operation("External State 3");
    }
}
```

#### 11.2 使用场景

使用享元模式的关键在于包含大量相似对象，并且这些对象的内部状态可以共享。具体的应用场景包括文本编辑器，图形编辑器，游戏中的角色创建，这些对象的内部状态比较固定(外观，技能，形状)，但是外部状态变化比较大时，可以使用。

#### 11.3 案例

[享元模式-图形编辑器](https://kamacoder.com/problempage.php?pid=1091)

::: info 

**题目描述**

在一个图形编辑器中，用户可以绘制不同类型的图形，包括圆形（CIRCLE）、矩形（RECTANGLE）、三角形（TRIANGLE）等。现在，请你实现一个图形绘制程序，要求能够共享相同类型的图形对象，以减少内存占用。

**输入描述**

输入包含多行，每行表示一个绘制命令。每个命令包括两部分： 

图形类型（Circle、Rectangle 或 Triangle） 

绘制的坐标位置（两个整数，分别表示 x 和 y）

**输出描述**

对于每个绘制命令，输出相应图形被绘制的位置信息。如果图形是首次绘制，输出 "drawn at"，否则输出 "shared at"。

**输入示例**

```
CIRCLE 10 20
RECTANGLE 30 40
CIRCLE 15 25
TRIANGLE 5 15
CIRCLE 10 20
RECTANGLE 30 40
```

**输出示例**

```
CIRCLE drawn at (10, 20)
RECTANGLE drawn at (30, 40)
CIRCLE shared at (15, 25)
TRIANGLE drawn at (5, 15)
CIRCLE shared at (10, 20)
RECTANGLE shared at (30, 40)
```

:::

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
 
enum ShapeType {
    CIRCLE, RECTANGLE, TRIANGLE
}
 
class Position {
    private int x;
    private int y;
 
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }
 
    public int getX() {
        return x;
    }
 
    public int getY() {
        return y;
    }
}
 
interface Shape {
    void draw(Position position);
}
 
class ConcreteShape implements Shape {
    private ShapeType shapeType;
 
    public ConcreteShape(ShapeType shapeType) {
        this.shapeType = shapeType;
    }
 
    @Override
    public void draw(Position position) {
        System.out.println(shapeType + (isFirstTime ? " drawn" : " shared") + " at (" + position.getX() + ", " + position.getY() + ")");
    }
 
    private boolean isFirstTime = true;
 
    public void setFirstTime(boolean firstTime) {
        isFirstTime = firstTime;
    }
}
 
class ShapeFactory {
    private Map<ShapeType, Shape> shapes = new HashMap<>();
 
    public Shape getShape(ShapeType type) {
        if (!shapes.containsKey(type)) {
            shapes.put(type, new ConcreteShape(type));
        }
        return shapes.get(type);
    }
}
 
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ShapeFactory factory = new ShapeFactory();
 
        while (scanner.hasNext()) {
            String command = scanner.nextLine();
            processCommand(factory, command);
        }
    }
 
    private static void processCommand(ShapeFactory factory, String command) {
        String[] parts = command.split(" ");
        ShapeType type = ShapeType.valueOf(parts[0]);
        int x = Integer.parseInt(parts[1]);
        int y = Integer.parseInt(parts[2]);
 
        Shape shape = factory.getShape(type);
        shape.draw(new Position(x, y));
        ((ConcreteShape) shape).setFirstTime(false);
    }
}
```

## 行为型模式

### 12. 观察者模式

**亦称：** 事件订阅者、监听者、Event-Subscriber、Listener、Observer

#### 12.1 概述

**观察者模式**是一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。

![观察者设计模式](/images/design-pattern/observer.png)



观察者模式（发布-订阅模式）属于行为型模式，定义了一种一对多的依赖关系，让多个观察者对象同时监听一个主题对象，当主题对象的状态发生变化时，所有依赖于它的观察者都得到通知并被自动更新。

观察者模式依赖两个模块：

- `Subject`(主题)：也就是被观察的对象，它可以维护一组观察者，当主题本身发生改变时就会通知观察者。
- `Observer`(观察者)：观察主题的对象，当“被观察”的主题发生变化时，观察者就会得到通知并执行相应的处理。

![image-20250408090254855](/images/design-pattern/image-20250408090254855.png)

使用观察者模式有很多好处，比如说观察者模式将主题和观察者之间的关系解耦，主题只需要关注自己的状态变化，而观察者只需要关注在主题状态变化时需要执行的操作，两者互不干扰，并且由于观察者和主题是相互独立的，可以轻松的增加和删除观察者，这样实现的系统更容易扩展和维护。

观察者模式依赖主题和观察者，但是一般有4个组成部分：

- `主题Subject`， 一般会定义成一个接口，提供方法用于**注册、删除和通知观察者**，通常也包含一个状态，当状态发生改变时，通知所有的观察者。
- `观察者Observer`: 观察者也需要实现一个接口，包含一个更新方法，在接收主题通知时执行对应的操作。
- `具体主题ConcreteSubject`: 主题的具体实现, 维护一个观察者列表，包含了观察者的注册、删除和通知方法。
- `具体观察者ConcreteObserver`: 观察者接口的具体实现，每个具体观察者都注册到具体主题中，当主题状态变化并通知到具体观察者，具体观察者进行处理。

![image-20250408094213288](/images/design-pattern/image-20250408094213288.png)

**简单实现：**

```java
// 主题接口 （主题）
interface Subject {
    // 注册观察者
    void registerObserver(Observer observer);
    // 移除观察者
    void removeObserver(Observer observer);
    // 通知观察者
    void notifyObservers();
}
// 观察者接口 (观察者)
interface Observer {
    // 更新方法
    void update(String message);
}

// 具体主题实现
class ConcreteSubject implements Subject {
    // 观察者列表
    private List<Observer> observers = new ArrayList<>();
    // 状态
    private String state;
	
    // 注册观察者
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
	// 移除观察者
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
	// 通知观察者
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            // 观察者根据传递的信息进行处理
            observer.update(state);
        }
    }
	// 更新状态
    public void setState(String state) {
        this.state = state;
        notifyObservers();
    }
}

// 具体观察者实现
class ConcreteObserver implements Observer {
    // 更新方法
    @Override
    public void update(String message) {
    }
}
```

#### 12.2 使用场景

观察者模式非常适用于**当一个对象的状态变化会影响到其他对象，并且希望这些对象在状态变化时能够自动更新的场景**。例如，在图形用户界面（GUI）中，按钮、滑动条等组件的状态变化可能需要通知其他组件进行更新，因此观察者模式被广泛应用于GUI框架中，像Java的Swing框架就是一个典型的应用案例。

除了GUI框架，观察者模式还被广泛应用于前端开发和分布式系统中。例如，在前端框架`Vue`中，当数据发生变化时，视图会自动更新，这正是通过观察者模式来实现的。在分布式系统中，观察者模式则可以用于实现节点间的消息通知机制，当某个节点的状态变化时，其他相关节点会收到通知并作出响应。

#### 12.3 案例

[观察者模式-时间观察者](https://kamacoder.com/problempage.php?pid=1075)

::: info

**题目描述**

小明所在的学校有一个时钟（主题），每到整点时，它就会通知所有的学生（观察者）当前的时间，请你使用观察者模式实现这个时钟通知系统。

注意点：时间从 0 开始，并每隔一个小时更新一次。

**输入描述**

输入的第一行是一个整数 N（1 ≤ N ≤ 20），表示学生的数量。 

接下来的 N 行，每行包含一个字符串，表示学生的姓名。 

最后一行是一个整数，表示时钟更新的次数。

**输出描述**

对于每一次时钟更新，输出每个学生的姓名和当前的时间。

**输入示例**

```
2
Alice
Bob
3
```

**输出示例**

```
Alice 1
Bob 1
Alice 2
Bob 2
Alice 3
Bob 3
```

**提示信息**

初始时钟时间为0（12:00 AM）。

第一次更新后，时钟变为1（1:00 AM），然后通知每个学生，输出学生名称和时钟点数。

第二次更新后，时钟变为2（2:00 AM），然后再次通知每个学生，输出学生名称和时钟点数

:::

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// 观察者接口
interface Observer {
    void update(int hour);
}

// 主题接口
interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// 具体主题实现
class Clock implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int hour = 0;

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(hour);
        }
    }

    public void tick() {
        hour = (hour + 1) % 24; // 模拟时间的推移
        notifyObservers();
    }
}

// 具体观察者实现
class Student implements Observer {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    @Override
    public void update(int hour) {
        System.out.println(name + " " + hour);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取学生数量
        int N = scanner.nextInt();

        // 创建时钟
        Clock clock = new Clock();

        // 注册学生观察者
        for (int i = 0; i < N; i++) {
            String studentName = scanner.next();
            clock.registerObserver(new Student(studentName));
        }

        // 读取时钟更新次数
        int updates = scanner.nextInt();

        // 模拟时钟每隔一个小时更新一次
        for (int i = 0; i < updates; i++) {
            clock.tick();
        }
    }
}
```

### 13. 策略模式(Strategy)

#### 13.1 概述

**策略模式**是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。

![策略设计模式](/images/design-pattern/strategy.png)

策略模式定义了一系列算法（这些算法完成的是相同的工作，只是实现不同），并将每个算法封装起来，使它们可以相互替换，而且算法的变化不会影响使用算法的客户。

举个例子，电商网站对于商品的折扣策略有不同的算法，比如新用户满减优惠，不同等级会员的打折情况不同，这种情况下会产生大量的`if-else语句`, 并且如果优惠政策修改时，还需要修改原来的代码，不符合开闭原则。

这就可以将不同的优惠算法封装成独立的类来避免大量的条件语句，如果新增优惠算法，可以添加新的策略类来实现，客户端在运行时选择不同的具体策略，而不必修改客户端代码改变优惠策略。

![image-20250408101025748](/images/design-pattern/image-20250408101025748.png)

策略模式包含下面几个结构：

- 策略类`Strategy`: 定义所有支持的算法的公共接口。
- 具体策略类`ConcreteStrategy`: 实现了策略接口，提供具体的算法实现。
- 上下文类`Context`: 包含一个策略实例，并在需要时调用策略对象的方法。

![image-20250408102425091](/images/design-pattern/image-20250408102425091.png)

**简单实现：**

```java
// 1. 抽象策略抽象类
abstract class Strategy {
    // 抽象方法
    public abstract void algorithmInterface();
}

// 2. 具体策略类1
class ConcreteStrategyA extends Strategy {
    @Override
    public void algorithmInterface() {
        System.out.println("Strategy A");
        // 具体的策略1执行逻辑
    }
}

// 3. 具体策略类2
class ConcreteStrategyB extends Strategy {
    @Override
    public void algorithmInterface() {
        System.out.println("Strategy B");
        // 具体的策略2执行逻辑
    }
}

// 4. 上下文类
class Context {
    private Strategy strategy;

    // 设置具体的策略
     public Context(Strategy strategy) {
        this.strategy = strategy;
     }

    // 执行策略
    public void contextInterface() {
        strategy.algorithmlnterface();
    }
}

// 5. 客户端代码
public class Main{
    public static void main(String[] args) {
        // 创建上下文对象，并设置具体的策略
        Context contextA = new Context(new ConcreteStrategyA());
        // 执行策略
        contextA.contextInterface();

        Context contextB = new Context(new ConcreteStrategyB());
        contextB.contextInterface();u
    }
}
```

#### 13.2 使用场景

那什么时候可以考虑使用策略模式呢？

- 当一个系统根据业务场景需要动态地在几种算法中选择一种时，可以使用策略模式。例如，根据用户的行为选择不同的计费策略。
- 当代码中存在大量条件判断，条件判断的区别仅仅在于行为，也可以通过策略模式来消除这些条件语句。

在已有的工具库中，Java 标准库中的 `Comparator` 接口就使用了策略模式，通过实现这个接口，可以创建不同的比较器（指定不同的排序策略）来满足不同的排序需求。

#### 13.3 案例

[策略模式-超市打折](https://kamacoder.com/problempage.php?pid=1082)

::: info

**题目描述**

小明家的超市推出了不同的购物优惠策略，你可以根据自己的需求选择不同的优惠方式。其中，有两种主要的优惠策略： 

1. 九折优惠策略：原价的90%。 

2. 满减优惠策略：购物满一定金额时，可以享受相应的减免优惠。

具体的满减规则如下： 

满100元减5元 

满150元减15元 

满200元减25元 

满300元减40元

请你设计一个购物优惠系统，用户输入商品的原价和选择的优惠策略编号，系统输出计算后的价格。

**输入描述**

输入的第一行是一个整数 N（1 ≤ N ≤ 20），表示需要计算优惠的次数。 

接下来的 N 行，每行输入两个整数，第一个整数M( 0 < M < 400) 表示商品的价格, 第二个整数表示优惠策略，1表示九折优惠策略，2表示满减优惠策略

**输出描述**

每行输出一个数字，表示优惠后商品的价格

**输入示例**

```
4
100 1
200 2
300 1
300 2
```

**输出示例**

```
90
175
270
260
```

:::

```java
import java.util.Scanner;

// 抽象购物优惠策略接口
interface DiscountStrategy {
    int applyDiscount(int originalPrice);
}

// 九折优惠策略
class DiscountStrategy1 implements DiscountStrategy {
    @Override
    public int applyDiscount(int originalPrice) {
        return (int) Math.round(originalPrice * 0.9);
    }
}

// 满减优惠策略
class DiscountStrategy2 implements DiscountStrategy {
    private int[] thresholds = {100, 150, 200, 300};
    private int[] discounts = {5, 15, 25, 40};

    @Override
    public int applyDiscount(int originalPrice) {
        for (int i = thresholds.length - 1; i >= 0; i--) {
            if (originalPrice >= thresholds[i]) {
                return originalPrice - discounts[i];
            }
        }
        return originalPrice;
    }
}

// 上下文类
class DiscountContext {
    private DiscountStrategy discountStrategy;

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public int applyDiscount(int originalPrice) {
        return discountStrategy.applyDiscount(originalPrice);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取需要计算优惠的次数
        int N = Integer.parseInt(scanner.nextLine());

        for (int i = 0; i < N; i++) {
            // 读取商品价格和优惠策略
            String[] input = scanner.nextLine().split(" ");
            int M = Integer.parseInt(input[0]);
            int strategyType = Integer.parseInt(input[1]);

            // 根据优惠策略设置相应的打折策略
            DiscountStrategy discountStrategy;
            switch (strategyType) {
                case 1:
                    discountStrategy = new DiscountStrategy1();
                    break;
                case 2:
                    discountStrategy = new DiscountStrategy2();
                    break;
                default:
                    // 处理未知策略类型
                    System.out.println("Unknown strategy type");
                    return;
            }

            // 设置打折策略
            DiscountContext context = new DiscountContext();
            context.setDiscountStrategy(discountStrategy);

            // 应用打折策略并输出优惠后的价格
            int discountedPrice = context.applyDiscount(M);
            System.out.println(discountedPrice);
        }
    }
}
```

使用策略枚举类实现

```java
import java.util.Scanner;

interface Strategy {
    void preferentialMethod(int price);
}

//策略枚举类
enum DiscountStrategy implements Strategy {
    STRATEGY1 {
        @Override
        public void preferentialMethod(int price) {
            double discountedPrice = 0.9 * price;
            System.out.println((int) discountedPrice);
        }
    },
    STRATEGY2 {
        @Override
        public void preferentialMethod(int price) {
            int[][] discountRules = {
                {300, 40},
                {200, 25},
                {150, 15},
                {100, 5}
            };

            for (int[] rule : discountRules) {
                if (price >= rule[0]) {
                    price -= rule[1];
                    break;
                }
            }
            System.out.println(price);
        }
    };

    public static DiscountStrategy fromType(int type) {
        switch (type) {
            case 1:
                return STRATEGY1;
            case 2:
                return STRATEGY2;
            default:
                throw new IllegalArgumentException("无效选择，请输入1或2");
        }
    }
}

class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public void executeStrategy(int price) {
        strategy.preferentialMethod(price);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try {
            int num = scanner.nextInt();
            scanner.nextLine();

            for (int i = 0; i < num; i++) {
                try {
                    String input = scanner.nextLine();
                    String[] parts = input.split(" ");

                    if (parts.length != 2) {
                        System.out.println("输入错误！");
                        continue;
                    }

                    int price = Integer.parseInt(parts[0]);
                    int type = Integer.parseInt(parts[1]);

                    DiscountStrategy strategy = DiscountStrategy.fromType(type);
                    Context context = new Context(strategy);
                    context.executeStrategy(price);
                } catch (NumberFormatException e) {
                    System.out.println("输入格式错误，请输入有效的价格和类型！");
                } catch (IllegalArgumentException e) {
                    System.out.println(e.getMessage());
                }
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            scanner.close();
        }
    }
}
```

### 14. 命令模式

**亦称：** 动作、事务、Action、Transaction、Command

#### 14.1 概述

**命令模式**是一种行为设计模式， 它可将请求转换为一个包含与请求相关的所有信息的独立对象。 该转换让你能根据不同的请求将方法参数化、 延迟请求执行或将其放入队列中， 且能实现可撤销操作。

![命令设计模式](/images/design-pattern/command-zh.png)

命令模式其允许**将请求封装成一个对象**(命令对象，包含执行操作所需的所有信息)，**并将命令对象按照一定的顺序存储在队列中，然后再逐一调用执行，这些命令也可以支持反向操作，进行撤销和重做。**

这样一来，发送者只需要触发命令就可以完成操作，不需要知道接受者的具体操作，从而实现两者间的解耦。

举个现实中的应用场景，遥控器可以控制不同的设备，在命令模式中，可以假定每个按钮都是一个命令对象，包含执行特定操作的命令，不同设备对同一命令的具体操作也不同，这样就可以方便的添加设备和命令对象。

命令模式包含以下几个基本角色：

- 命令接口`Command`：接口或者抽象类，定义执行操作的接口。
- 具体命令类`ConcreteCommand`: 实现命令接口，执行具体操作，在调用`execute`方法时使“接收者对象”根据命令完成具体的任务，比如遥控器中的“开机”，“关机”命令。
- 接收者类`Receiver`: 接受并执行命令的对象，可以是任何对象，遥控器可以控制空调，也可以控制电视机，电视机和空调负责执行具体操作，是接收者。
- 调用者类`Invoker`: 发起请求的对象，有一个将命令作为参数传递的方法。它不关心命令的具体实现，只负责调用命令对象的 `execute()` 方法来传递请求，在本例中，控制遥控器的“人”就是调用者。
- 客户端：创建具体的命令对象和接收者对象，然后将它们组装起来。

![image-20250408110515991](/images/design-pattern/image-20250408110515991.png)

**简易实现**

```java
// 1. 定义执行操作的接口：包含一个execute方法。有的时候还会包括unExecute方法，表示撤销命令。
public interface Command {
    void execute();
}

// 2. 实现命令接口，执行具体的操作。
public class ConcreteCommand implements Command {
    // 接收者对象
    private Receiver receiver;

    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        // 调用接收者相应的操作
        receiver.action();
    }
}

// 3. 定义接受者类，知道如何实施与执行一个请求相关的操作。
public class Receiver {
    public void action() {
        // 执行操作
    }
}

// 4. 定义调用者类，调用命令对象执行请求。
public class Invoker {
    private Command command;

    public Invoker(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        command.execute();
    }
}

// 调用者类中可以维护一个命令队列或者“撤销栈”，以支持批处理和撤销命令。
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

// 调用者类：命令队列和撤销请求
class Invoker {
    private Queue<Command> commandQueue; // 命令队列
    private Stack<Command> undoStack;    // 撤销栈

    public Invoker() {
        this.commandQueue = new LinkedList<>();
        this.undoStack = new Stack<>();
    }

    // 设置命令并执行
    public void setAndExecuteCommand(Command command) {
        command.execute();
        commandQueue.offer(command);
        undoStack.push(command);
    }

    // 撤销上一个命令
    public void undoLastCommand() {
        if (!undoStack.isEmpty()) {
            Command lastCommand = undoStack.pop();
            lastCommand.undo(); // 需要命令类实现 undo 方法
            commandQueue.remove(lastCommand);
        } else {
            System.out.println("No command to undo.");
        }
    }

    // 执行命令队列中的所有命令
    public void executeCommandsInQueue() {
        for (Command command : commandQueue) {
            command.execute();
        }
    }
}

// 5. 客户端使用，创建具体的命令对象和接收者对象，然后进行组装。
public class Main {
    public static void main(String[] args) {
        Receiver receiver = new Receiver();
        Command command = new ConcreteCommand(receiver);
        Invoker invoker = new Invoker(command);

        invoker.executeCommand();
    }
}
```

#### 14.2 使用场景

命令模式在以下场景中非常有效：

- **撤销操作**：命令模式通过存储历史命令，实现轻松的撤销功能。
- **队列请求**：命令模式可将请求排队，形成命令队列并按顺序执行。
- **可扩展性**：新增命令类和接收者类时不影响现有代码，符合开闭原则，轻松扩展系统。

然而，每个命令都需要一个具体的命令类，可能导致类数量激增，增加系统复杂度。

命令模式在多个现实场景中有广泛应用：

- **Git**：Git中的提交（commit）、合并（merge）等操作都是命令模式的应用，用户通过命令操作版本库。
- **Java GUI编程**：在GUI中，每个按钮都关联一个 `Action`，代表一个命令，按钮点击触发相应的 `Action` 执行。

#### 14.3 案例

[命令模式-自助点餐机](https://kamacoder.com/problempage.php?pid=1093)

::: info

**题目描述**

小明去奶茶店买奶茶，他可以通过在自助点餐机上来点不同的饮品，请你使用命令模式设计一个程序，模拟这个自助点餐系统的功能。

**输入描述**



- 第一行是一个整数 n（1 ≤ n ≤ 100），表示点单的数量。
- 接下来的 n 行，每行包含一个字符串，表示点餐的饮品名称。

**输出描述**

输出执行完所有点单后的制作情况，每行输出一种饮品的制作情况。如果制作完成，输出 "XXX is ready!"，其中 XXX 表示饮品名称。

**输入示例**

```
4
MilkTea
Coffee
Cola
MilkTea
```

**输出示例**

```
MilkTea is ready!
Coffee is ready!
Cola is ready!
MilkTea is ready!
```

:::

```java
import java.util.Scanner;

// 命令接口
interface Command {
    void execute();
}

// 具体命令类 - 点餐命令
class OrderCommand implements Command {
    private String drinkName;
    private DrinkMaker receiver;

    public OrderCommand(String drinkName, DrinkMaker receiver) {
        this.drinkName = drinkName;
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.makeDrink(drinkName);
    }
}

// 接收者类 - 制作饮品
class DrinkMaker {
    public void makeDrink(String drinkName) {
        System.out.println(drinkName + " is ready!");
    }
}

// 调用者类 - 点餐机
class OrderMachine {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeOrder() {
        command.execute();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 创建接收者和命令对象
        DrinkMaker drinkMaker = new DrinkMaker();

        // 读取命令数量
        int n = scanner.nextInt();
        scanner.nextLine();

        while (n-- > 0) {
            // 读取命令
            String drinkName = scanner.next();

            // 创建命令对象
            Command command = new OrderCommand(drinkName, drinkMaker);

            // 执行命令
            OrderMachine orderMachine = new OrderMachine();
            orderMachine.setCommand(command);
            orderMachine.executeOrder();
        }
        scanner.close();
    }
}
```

使用命令模式+工厂模式，进一步将程序进行解耦，主程序不需要知道具体命令类的实现细节，后续增加新命令或饮料类型时，只需修改工厂类，不会影响主程序的结构。

```java
import java.util.Scanner;

// 命令接口
interface Command {
    void execute();
}

// 具体命令类 - 点餐命令
class OrderCommand implements Command {
    private String drinkName;
    private DrinkMaker receiver;

    public OrderCommand(String drinkName, DrinkMaker receiver) {
        this.drinkName = drinkName;
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.makeDrink(drinkName);
    }
}

// 接收者类 - 制作饮品
class DrinkMaker {
    public void makeDrink(String drinkName) {
        System.out.println(drinkName + " is ready!");
    }
}

// 调用者类 - 点餐机
class OrderMachine {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeOrder() {
        if (command != null) {
            command.execute();
        } else {
            System.out.println("未设置命令.");
        }
    }
}

// 命令工厂类
class CommandFactory {
    private DrinkMaker drinkMaker;

    public CommandFactory(DrinkMaker drinkMaker) {
        this.drinkMaker = drinkMaker;
    }

    public Command createCommand(String drinkName) {
        return new OrderCommand(drinkName, drinkMaker);
    }
}

// 主类
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 创建接收者和工厂对象
        DrinkMaker drinkMaker = new DrinkMaker();
        CommandFactory commandFactory = new CommandFactory(drinkMaker);
        OrderMachine orderMachine = new OrderMachine();

        // 读取命令数量
        int n = scanner.nextInt();
        scanner.nextLine();

        while (n-- > 0) {
            // 读取命令
            String drinkName = scanner.nextLine().trim();

            if (drinkName.isEmpty()) {
                System.out.println("无效输入，请输入饮品名.");
                continue;
            }

            // 使用工厂创建命令对象
            Command command = commandFactory.createCommand(drinkName);

            // 设置命令并执行
            orderMachine.setCommand(command);
            orderMachine.executeOrder();
        }
        scanner.close();
    }
}
```

### 15. 中介者模式

**亦称：** 调解人、控制器、Intermediary、Controller、Mediator

#### 15.1 概述

**中介者模式**是一种行为设计模式， 能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作。

![中介者设计模式](/images/design-pattern/mediator.png)

中介者模式（Mediator Pattern）也被称为调停者模式，是一种行为型设计模式，它通过一个中介对象来封装一组对象之间的交互，从而使这些对象不需要直接相互引用。这样可以降低对象之间的耦合度，使系统更容易维护和扩展。

当一个系统中的对象有很多且多个对象之间有复杂的相互依赖关系时，其结构图可能是下面这样的。

![用户界面中各元素间的混乱关系](/images/design-pattern/problem1-zh.png)

这种依赖关系很难理清，这时我们可以引入一个中介者对象来进行协调和交互。中介者模式可以使得系统的网状结构变成以中介者为中心的星形结构，每个具体对象不再通过直接的联系与另一个对象发生相互作用，而是通过“中介者”对象与另一个对象发生相互作用。

![UI 元素必须通过中介者进行沟通。](/images/design-pattern/solution1-zh.png)

中介者模式包括以下几个重要角色：

- `抽象中介者（Mediator）`： 定义中介者的接口，用于各个具体同事对象之间的通信。
- `具体中介者（Concrete Mediator）`：实现抽象中介者接口，负责协调各个具体同事对象的交互关系，它需要知道所有具体同事类，并从具体同事接收消息，向具体同事对象发出命令。
- `抽象同事类（Colleague）`： 定义同事类的接口，维护一个对中介者对象的引用，用于通信。
- `具体同事类（Concrete Colleague）`： 实现抽象同事类接口，每个具体同事类只知道自己的行为，而不了解其他同事类的情况，因为它们都需要与中介者通信，通过中介者协调与其他同事对象的交互。

![image-20250408140739568](/images/design-pattern/image-20250408140739568.png)

**简单实现：**

```java
// 抽象中介者
public abstract class Mediator {
    abstract void register(Colleague colleague);
    // 定义一个抽象的发送消息方法
    public abstract void send(String message, Colleague colleague);
    
}

// 具体中介者
public class ConcreteMediator extends Mediator {
    private List<Colleague> colleagues = new ArrayList<>();
    
    public void register(Colleague colleague) {
        colleagues.add(colleague);
    }

    @Override
    public void send(String message, Colleague colleague) {
        for (Colleague c : colleagues) {
            // 排除发送消息的同事对象
            if (c != colleague) {
                c.receive(message);
            }
        }
    }
}

// 同事对象
abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    // 发送消息
    public abstract void send(String message);

    // 接收消息
    public abstract void receive(String message);
}

// 具体同事对象1
class ConcreteColleague1 extends Colleague {
    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void send(String message) {
        mediator.send(message, this);
    }

    @Override
    public void receive(String message) {
        System.out.println("ConcreteColleague1 received: " + message);
    }
}

// 具体同事对象2
class ConcreteColleague2 extends Colleague {
    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    @Override
    public void send(String message) {
        mediator.send(message, this);
    }

    @Override
    public void receive(String message) {
        System.out.println("ConcreteColleague2 received: " + message);
    }
}

// 客户端
public class Main{
    public static void main(String[] args) {
        // 创建中介者
        Mediator mediator = new ConcreteMediator();

        // 创建同事对象
        Colleague colleague1 = new ConcreteColleague1(mediator);
        Colleague colleague2 = new ConcreteColleague2(mediator);

        // 注册同事对象到中介者
        mediator.register(colleague1);
        mediator.register(colleague2);

        // 同事对象之间发送消息
        colleague1.send("Hello from Colleague1!");
        colleague2.send("Hi from Colleague2!");
    }
}
```

#### 15.2 使用场景

中介者模式通过使同事对象只与中介者通信，避免了它们直接相互了解和依赖，简化了系统复杂度并降低了耦合度。然而，这也可能导致中介者对象过于庞大和复杂，一旦出现问题，整个系统可能受到影响。

中介者模式适用于对象间存在复杂交互或需要灵活通信的场景，能够有效简化问题。

#### 15.3 案例

[中介者模式-简易聊天室](https://kamacoder.com/problempage.php?pid=1094)

::: info

**题目描述**

小明正在设计一个简单的多人聊天室系统，有多个用户和一个聊天室中介者，用户通过中介者进行聊天，请你帮他完成这个系统的设计。

**输入描述**

第一行包括一个整数N,表示用户的数量（1 <= N <= 100) 第二行是N个用户，比如User1 User2 User3，用空格分隔 第三行开始，每行包含两个字符串，表示消息的发出者和消息内容，用空格分隔

**输出描述**

对于每个用户，输出一行，包含该用户收到的所有消息内容。

**输入示例**

```
3
User1 User2 User3
User1 Hello_All!
User2 Hi_User1!
User3 How_is_everyone?
```

**输出示例**

```
User2 received: Hello_All!
User3 received: Hello_All!
User1 received: Hi_User1!
User3 received: Hi_User1!
User1 received: How_is_everyone?
User2 received: How_is_everyone?
```

:::

```java
import java.util.*;
 
// 抽象中介者
interface ChatRoomMediator {
    void sendMessage(String sender, String message);
    void addUser(ChatUser user); 
    Map<String, ChatUser> getUsers(); 
}
 
// 具体中介者
class ChatRoomMediatorImpl implements ChatRoomMediator {
    private Map<String, ChatUser> users = new LinkedHashMap<>(); 
 
    @Override
    public void sendMessage(String sender, String message) {
        for (ChatUser user : users.values()) {
            if (!user.getName().equals(sender)) {
                user.receiveMessage(sender, message);
            }
        }
    }
 
    @Override
    public void addUser(ChatUser user) {
        users.put(user.getName(), user);
    }
 
    @Override
    public Map<String, ChatUser> getUsers() {
        return users;
    }
}
 
// 抽象同事类
abstract class ChatUser { 
    private String name;
    private ChatRoomMediator mediator;
    private List<String> receivedMessages = new ArrayList<>();
 
    public ChatUser(String name, ChatRoomMediator mediator) {
        this.name = name;
        this.mediator = mediator;
        mediator.addUser(this);
    }
 
    public String getName() {
        return name;
    }
 
    public void sendMessage(String message) {
        mediator.sendMessage(name, message);
    }
 
    public abstract void receiveMessage(String sender, String message);
 
    public List<String> getReceivedMessages() {
        return receivedMessages;
    }
 
    protected void addReceivedMessage(String message) {
        receivedMessages.add(message);
    }
}
 
// 具体同事类
class ConcreteChatUser extends ChatUser {
    public ConcreteChatUser(String name, ChatRoomMediator mediator) {
        super(name, mediator);
    }
 
    @Override
    public void receiveMessage(String sender, String message) {
        String receivedMessage = getName() + " received: " + message;
        addReceivedMessage(receivedMessage);
        System.out.println(receivedMessage); 
    }
}
 
// 客户端
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        int N = scanner.nextInt();
        List<String> userNames = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            userNames.add(scanner.next());
        }
 
        ChatRoomMediator mediator = new ChatRoomMediatorImpl();
 
        // 创建用户对象
        for (String userName : userNames) {
            new ConcreteChatUser(userName, mediator);
        }
 
        // 发送消息并输出
        while (scanner.hasNext()) {
            String sender = scanner.next();
            String message = scanner.next();
 
            ChatUser user = mediator.getUsers().get(sender);
            if (user != null) {
                user.sendMessage(message);
            }
        }
 
        scanner.close();
    }
}
```

### 16. 备忘录模式

**亦称：** 快照、Snapshot、Memento

#### 16.1 概述

**备忘录模式**是一种行为设计模式， 允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。

![4578](/images/design-pattern/memento-zh.png)

备忘录模式（Memento Pattern）是一种行为型设计模式，它允许在**不暴露对象实现的情况下捕获对象的内部状态**并**在对象之外保存这个状态**，以便稍后可以将其还原到先前的状态。

![image-20250408144440931](/images/design-pattern/image-20250408144440931.png)

备忘录模式包括以下几个重要角色：

- 发起人`Originator`： 需要还原状态的那个对象，负责创建一个【备忘录】，并使用备忘录记录当前时刻的内部状态。
- 备忘录`Memento`: 存储发起人对象的内部状态，它可以包含发起人的部分或全部状态信息，但是对外部是不可见的，只有发起人能够访问备忘录对象的状态。

::: tip 提示

备忘录有两个接口，发起人能够通过宽接口访问数据，管理者只能看到窄接口，并将备忘录传递给其他对象。

:::

- 管理者`Caretaker`: 负责存储备忘录对象，但并不了解其内部结构，管理者可以存储多个备忘录对象。
- 客户端：在需要恢复状态时，客户端可以从管理者那里获取备忘录对象，并将其传递给发起人进行状态的恢复。

![image-20250408145510415](/images/design-pattern/image-20250408145510415.png)

**简单实现：**

```java
// 1. 创建发起人类：可以创建备忘录对象
class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }
    public String getState() {
        return state;
    }
	// 创建备忘录对象
    public Memento createMemento() {
        return new Memento(state);
    }
	// 通过备忘录对象恢复状态
    public void restoreFromMemento(Memento memento) {
        state = memento.getState();
    }
}

// 2. 创建备忘录类：保存发起人对象的状态
class Memento {
    
    private String state;
	// 保存发起人的状态
    public Memento(String state) {
        this.state = state;
    }
	
    public String getState() {
        return state;
    }
}

// 3. 创建管理者：维护一组备忘录对象
class Caretaker {
    private List<Memento> mementos = new ArrayList<>();

    public void addMemento(Memento memento) {
        mementos.add(memento);
    }

    public Memento getMemento(int index) {
        return mementos.get(index);
    }
}

// 4. 客户端使用备忘录模式
public class Main {
    public static void main(String[] args) {
        // 创建发起人对象
        Originator originator = new Originator();
        originator.setState("State 1");

        // 创建管理者对象
        Caretaker caretaker = new Caretaker();

        // 保存当前状态
        caretaker.addMemento(originator.createMemento());

        // 修改状态
        originator.setState("State 2");

        // 再次保存当前状态
        caretaker.addMemento(originator.createMemento());

        // 恢复到先前状态
        originator.restoreFromMemento(caretaker.getMemento(0));

        System.out.println("Current State: " + originator.getState());
    }
}
```



#### 16.2 使用场景

备忘录模式通过保持对象内部状态的封装性，便于实现“备份”功能，允许轻松地添加新的备忘录和发起人。然而，备份对象可能消耗大量内存，增加资源开销。

备忘录模式常用于实现撤销和重做功能。例如，在Java Swing的GUI编程中，`javax.swing.undo`包中的撤销（undo）和重做（redo）机制就采用了备忘录模式，`UndoManager`和`UndoableEdit`接口是关键类。

#### 16.3 案例

[备忘录模式-redo计数器应用](https://kamacoder.com/problempage.php?pid=1095)

::: info 

**题目描述**

小明正在设计一个简单的计数器应用，支持增加（Increment）和减少（Decrement）操作，以及撤销（Undo）和重做（Redo）操作，请你使用备忘录模式帮他实现。

**输入描述**

输入包含若干行，每行包含一个字符串，表示计数器应用的操作，操作包括 "Increment"、"Decrement"、"Undo" 和 "Redo"。

**输出描述**

对于每个 "Increment" 和 "Decrement" 操作，输出当前计数器的值，计数器数值从0开始 对于每个 "Undo" 操作，输出撤销后的计数器值。 对于每个 "Redo" 操作，输出重做后的计数器值。

**输入示例**

```
Increment
Increment
Decrement
Undo
Redo
Increment
```

**输出示例**

```
1
2
1
2
1
2
```

:::

```java
import java.util.Scanner;
import java.util.Stack;

// 备忘录
class Memento {
    private int value;

    public Memento(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}

// 发起人（Originator）
class Counter {
    private int value;
    private Stack<Memento> undoStack = new Stack<>();
    private Stack<Memento> redoStack = new Stack<>();

    public void increment() {
        redoStack.clear();
        undoStack.push(new Memento(value));
        value++;
    }

    public void decrement() {
        redoStack.clear();
        undoStack.push(new Memento(value));
        value--;
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            redoStack.push(new Memento(value));
            value = undoStack.pop().getValue();
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            undoStack.push(new Memento(value));
            value = redoStack.pop().getValue();
        }
    }

    public int getValue() {
        return value;
    }
}

// 客户端
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Counter counter = new Counter();

        // 处理计数器应用的输入
        while (scanner.hasNext()) {
            String operation = scanner.next();
            switch (operation) {
                case "Increment":
                    counter.increment();
                    break;
                case "Decrement":
                    counter.decrement();
                    break;
                case "Undo":
                    counter.undo();
                    break;
                case "Redo":
                    counter.redo();
                    break;
            }

            // 输出当前计数器的值
            System.out.println(counter.getValue());
        }

        scanner.close();
    }
}
```



### 17. 模板方法模式

**亦称：** Template Method

#### 17.1 概述

**模板方法模式**是一种行为设计模式， 它在超类中定义了一个算法的框架， 允许子类在不修改结构的情况下重写算法的特定步骤。

![模板方法设计模式](/images/design-pattern/template-method.png)

模板方法模式（Template Method Pattern）是一种行为型设计模式, 它定义了一个算法的骨架，将**一些步骤的实现延迟到子类。**模板方法模式使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤。【引用自大话设计第10章】

举个简单的例子，做一道菜通常都需要包含至少三步：

- 准备食材
- 亨饪过程
- 上菜

不同菜品的亨饪过程是不一样的，但是我们可以先定义一个”骨架”，包含这三个步骤，亨饪过程的过程放到具体的炒菜类中去实现，这样，无论炒什么菜，都可以沿用相同的炒菜算法，只需在子类中实现具体的炒菜步骤，从而提高了代码的复用性。

模板方法模式的基本结构包含以下两个角色：

- 模板类`AbstractClass`：由一个模板方法和若干个基本方法构成，模板方法定义了逻辑的骨架，按照顺序调用包含的基本方法，基本方法通常是一些**抽象方法，这些方法由子类去实现**。基本方法还包含一些具体方法，它们是算法的一部分但已经有默认实现，在具体子类中可以继承或者重写。
- 具体类`ConcreteClass`：继承自模板类，实现了在模板类中定义的抽象方法，以完成算法中特定步骤的具体实现。

![image-20250408151157300](/images/design-pattern/image-20250408151157300.png)

**简易实现**

```java
// 1. 定义模板类，包含模板方法，定义了算法的骨架, 一般都加上final关键字，避免子类重写。
abstract class AbstractClass {
    // 模板方法，定义了算法的骨架
    public final void templateMethod() {
        step1();
        step2();
        step3();
    }

    // 抽象方法，由子类实现
    protected abstract void step1();
    protected abstract void step2();
    protected abstract void step3();
}

// 2. 定义具体类, 实现模板类中的抽象方法
class ConcreteClass extends AbstractClass {
    @Override
    protected void step1() {
        System.out.println("Step 1 ");
    }

    @Override
    protected void step2() {
        System.out.println("Step 2 ");
    }

    @Override
    protected void step3() {
        System.out.println("Step 3");
    }
}

// 3. 客户端实现
public class Main {
    public static void main(String[] args) {
        AbstractClass concreteTemplate = new ConcreteClass();
        // 触发整个算法的执行
        concreteTemplate.templateMethod();
    }
}
```

#### 17.2 使用场景

模板方法模式将算法的固定部分封装在模板方法中，而可变部分则由子类实现，从而提高了代码复用性。然而，当算法框架发生变化时，模板类也需要修改，可能会影响所有子类。

通常，当算法的步骤固定，但个别步骤的实现可能有所不同时，可以使用模板方法模式。在一些常见的工具和库中，模板方法模式得到了广泛应用：

- **Spring框架**中的 `JdbcTemplate` 类，定义了执行数据库操作的模板方法，具体操作由回调函数提供。
- **Java的JDK**中，`AbstractList` 类通过模板方法模式提供通用方法，具体的列表操作由子类实现。

#### 17.3 案例

[模板方法模式-咖啡馆](https://kamacoder.com/problempage.php?pid=1087)

::: info 

**题目描述**

小明喜欢品尝不同类型的咖啡，她发现每种咖啡的制作过程有一些相同的步骤，他决定设计一个简单的咖啡制作系统，使用模板方法模式定义咖啡的制作过程。系统支持两种咖啡类型：美式咖啡（American Coffee）和拿铁（Latte）。

咖啡制作过程包括以下步骤：

1. 研磨咖啡豆 Grinding coffee beans

2. 冲泡咖啡 Brewing coffee

3. 添加调料 Adding condiments

其中，美式咖啡和拿铁的调料添加方式略有不同, 拿铁在添加调料时需要添加牛奶Adding milk

**输入描述**

多行输入，每行包含一个数字，表示咖啡的选择（1 表示美式咖啡，2 表示拿铁）。

**输出描述**

根据每行输入，输出制作咖啡的过程，包括咖啡类型和各个制作步骤，末尾有一个空行。

**输入示例**

```
1
2
```

**输出示例**

```
Making American Coffee:
Grinding coffee beans
Brewing coffee
Adding condiments

Making Latte:
Grinding coffee beans
Brewing coffee
Adding milk
Adding condiments
```

:::

```java
import java.util.Scanner;

// 抽象类
abstract class CoffeeMakerTemplate {
    private String coffeeName; // 添加咖啡名称字段

    // 构造函数，接受咖啡名称参数
    public CoffeeMakerTemplate(String coffeeName) {
        this.coffeeName = coffeeName;
    }

    // 模板方法定义咖啡制作过程
    final void makeCoffee() {
        System.out.println("Making " + coffeeName + ":");
        grindCoffeeBeans();
        brewCoffee();
        addCondiments();
        System.out.println();
    }

    // 具体步骤的具体实现由子类提供
    abstract void grindCoffeeBeans();
    abstract void brewCoffee();

    // 添加调料的默认实现
    void addCondiments() {
        System.out.println("Adding condiments");
    }
}

// 具体的美式咖啡类
class AmericanCoffeeMaker extends CoffeeMakerTemplate {
    // 构造函数传递咖啡名称
    public AmericanCoffeeMaker() {
        super("American Coffee");
    }

    @Override
    void grindCoffeeBeans() {
        System.out.println("Grinding coffee beans");
    }

    @Override
    void brewCoffee() {
        System.out.println("Brewing coffee");
    }
}

// 具体的拿铁咖啡类
class LatteCoffeeMaker extends CoffeeMakerTemplate {
    // 构造函数传递咖啡名称
    public LatteCoffeeMaker() {
        super("Latte");
    }

    @Override
    void grindCoffeeBeans() {
        System.out.println("Grinding coffee beans");
    }

    @Override
    void brewCoffee() {
        System.out.println("Brewing coffee");
    }

    // 添加调料的特定实现
    @Override
    void addCondiments() {
        System.out.println("Adding milk");
        System.out.println("Adding condiments");
    }
}

// 客户端代码
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            int coffeeType = scanner.nextInt();

            CoffeeMakerTemplate coffeeMaker = null; 

            if (coffeeType == 1) {
                coffeeMaker = new AmericanCoffeeMaker();
            } else if (coffeeType == 2) {
                coffeeMaker = new LatteCoffeeMaker();
            } else {
                System.out.println("Invalid coffee type");
                continue;
            }

            // 制作咖啡
            coffeeMaker.makeCoffee();
        }
    }
}
```

添加钩子函数，也可由用户来确定是否添加牛奶或其它配料。

```java
import java.util.Scanner;

// 抽象类，定义咖啡制作的基本步骤
abstract class CoffeeModel {
    private String coffeeName;

    // 构造函数，接受咖啡名称参数
    public CoffeeModel(String coffeeName) {
        this.coffeeName = coffeeName;
    }

    protected abstract void grind();
    protected abstract void brew();
    protected abstract void addCondiments();
    
    // 添加其他调料可使用该类
    public void addThings(){};

    // 模板方法，定义咖啡制作的流程
    public final void createCoffeeTemplate() {
        System.out.println("Making " + coffeeName + ":");
        grind();
        brew();
        //根据情况，是否调用添加更多调料
        if (isAddThings()) {
            addThings(); 
        }
        addCondiments();
        System.out.println();
    }

    // 默认不添加其他调料。如牛奶等
    public boolean isAddThings() {
        return false;
    }
}

//美式咖啡类实现
class CreateAmericanCoffee extends CoffeeModel {
    public CreateAmericanCoffee() {
        super("American Coffee");
    }

    @Override
    protected void grind() {
        System.out.println("Grinding coffee beans");
    }

    @Override
    protected void brew() {
        System.out.println("Brewing coffee");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding condiments");
    }
    
    // 美式咖啡默认不添加其他调料，如牛奶等
    @Override
    public boolean isAddThings() {
        return false; 
    }
}

//拿铁类实现
class CreateLatte extends CoffeeModel {
    private boolean addThingsFlag = true;

    public CreateLatte() {
        super("Latte");
    }

    @Override
    protected void grind() {
        System.out.println("Grinding coffee beans");
    }

    @Override
    protected void brew() {
        System.out.println("Brewing coffee");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding condiments");
    }
    
    //需要添加调料，牛奶
    @Override
    public void addThings(){
        System.out.println("Adding milk");
    }
    
    // 拿铁默认添加牛奶
    @Override
    public boolean isAddThings() {
        return this.addThingsFlag; 
    }

    // 外部调用以改变是否添加牛奶的状态，钩子函数
    public void setAddThingsFlag(boolean flag) {
        this.addThingsFlag = flag;
    }
}

//客户端
public class Main {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            while (scanner.hasNextInt()) {
                int input = scanner.nextInt();
                CoffeeModel coffee;
                switch (input) {
                    case 1:
                        coffee = new CreateAmericanCoffee();
                        break;
                    case 2:
                        coffee = new CreateLatte();
                        break;
                    default:
                        System.out.println("无效选择，请输入1或2");
                        continue;
                }
                coffee.createCoffeeTemplate();
            }
        }
    }
}
```

### 18. 迭代器模式(Iterator)

#### 18.1 概述

**迭代器模式**是一种行为设计模式， 让你能在不暴露集合底层表现形式 （列表、 栈和树等） 的情况下遍历集合中所有的元素。

![迭代器设计模式](/images/design-pattern/iterator-zh.png)

迭代器模式是一种行为设计模式，是一种使用频率非常高的设计模式，在各个语言中都有应用，其主要目的是**提供一种统一的方式来访问一个聚合对象中的各个元素，**而不需要暴露该对象的内部表示。通过迭代器，客户端可以顺序访问聚合对象的元素，而无需了解底层数据结构。

迭代器模式应用广泛，但是大多数语言都已经内置了迭代器接口，不需要自己实现。

迭代器模式包括以下几个重要角色

- 迭代器接口`Iterator`：定义访问和遍历元素的接口, 通常会包括`hasNext()`方法用于检查是否还有下一个元素，以及`next()`方法用于获取下一个元素。有的还会实现获取第一个元素以及获取当前元素的方法。
- 具体迭代器`ConcreateIterator`：实现迭代器接口，实现遍历逻辑对聚合对象进行遍历。
- 抽象聚合类：定义了创建迭代器的接口，包括一个`createIterator`方法用于创建一个迭代器对象。
- 具体聚合类：实现在抽象聚合类中声明的`createIterator()`方法，返回一个与具体聚合对应的具体迭代器

![image-20250408153548942](/images/design-pattern/image-20250408153548942.png)

**简易实现**

```java
// 1. 定义迭代器接口：通常会有检查是否还有下一个元素以及获取下一个元素的方法
public interface Iterator{
    // 检查是否还会有下一个元素
    boolean hasNext();
    // 获取下一个元素
    Object next();
}

// 2. 定义具体迭代器：实现迭代器接口，遍历集合
public class ConcreteIterator implements Iterator {
    private int index;
    private List<Object> elements;

    // 构造函数初始化迭代器
    public ConcreteIterator(List<Object> elements) {
        this.elements = elements;
        this.index = 0;
    }

    @Override
    public boolean hasNext() {
        return index < elements.size();
    }

    @Override
    public Object next() {
        if (hasNext()) {
            return elements.get(index++);
        }
        return null;
    }
}

// 3. 定义聚合接口：通常包括createIterator()方法，用于创建迭代器
public interface Iterable {
    Iterator createIterator();
}

// 4. 实现具体聚合：创建具体的迭代器
public class ConcreteIterable implements Iterable {
    private List<Object> elements;

    // 构造函数初始化可迭代对象
    public ConcreteIterable(List<Object> elements) {
        this.elements = elements;
    }

    @Override
    public Iterator createIterator() {
        return new ConcreteIterator(elements);
    }
}

// 5. 客户端使用
import java.util.ArrayList;
import java.util.List;

public class IteratorPatternExample {
    public static void main(String[] args) {
        List<Object> elements = new ArrayList<>();
        elements.add("Element 1");
        elements.add("Element 2");
        elements.add("Element 3");

        Iterable iterable = new ConcreteIterable(elements);
        Iterator iterator = iterable.createIterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```

#### 18.2 使用场景

迭代器模式通过将集合的遍历和内部结构封装，使客户端无需了解集合的具体实现，只需依赖迭代器接口即可访问集合元素，从而简化了代码。尽管如此，使用迭代器模式会增加额外的类，每当增加新的集合类型时，必须为其添加相应的迭代器，这可能会增加系统的复杂度。

在许多编程语言中，迭代器模式被广泛使用，提供了一致的集合元素遍历机制。以下是几种语言的实现示例：

- **Java**: 集合类（如 `ArrayList`、`LinkedList`）通过 `Iterator` 接口支持遍历。

```java
List<String> list = new ArrayList<>();
list.add("Item 1");
list.add("Item 2");
list.add("Item 3");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

- **Python**: 使用 `iter()` 和 `next()` 函数实现迭代。

```python
elements = ["Element 1", "Element 2", "Element 3"]
iterator = iter(elements)

while True:
    try:
        element = next(iterator)
        print(element)
    except StopIteration:
        break
```

- **C++**: STL提供 `begin()` 和 `end()` 支持迭代。

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::string> elements = {"Element 1", "Element 2", "Element 3"};

    for (auto it = elements.begin(); it != elements.end(); ++it) {
        std::cout << *it << std::endl;
    }

    return 0;
}
```

- **JavaScript**: ES6引入了迭代器协议，简化了遍历操作。

```javascript
class IterableObject {
  constructor() {
    this.elements = [];
  }
  addElement(element) {
    this.elements.push(element);
  }
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.elements.length) {
          return { value: this.elements[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

const iterableObject = new IterableObject();
iterableObject.addElement("Element 1");
iterableObject.addElement("Element 2");
iterableObject.addElement("Element 3");

for (const element of iterableObject) {
  console.log(element);
}
```

#### 18.3 案例

[迭代器模式-学生名单](https://kamacoder.com/problempage.php?pid=1099)

::: info 

**题目描述**

小明是一位老师，在进行班级点名时，希望有一个学生名单系统，请你实现迭代器模式提供一个迭代器使得可以按顺序遍历学生列表。

**输入描述**

第一行是一个整数 N （1 <= N <= 100), 表示学生的数量。

接下来的 N 行，每行包含一个学生的信息，格式为 姓名 学号

**输出描述**

输出班级点名的结果，即按顺序遍历学生列表，输出学生的姓名和学号

**输入示例**

```
3
Alice 1001
Bob 1002
Charlie 1003
```

**输出示例**

```
Alice 1001
Bob 1002
Charlie 1003
```

:::

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// 可迭代对象接口
interface StudentCollection {
    java.util.Iterator<Student> iterator();
}

// 具体可迭代对象
class ConcreteStudentCollection implements StudentCollection {
    private List<Student> students = new ArrayList<>();

    public void addStudent(Student student) {
        students.add(student);
    }

    @Override
    public java.util.Iterator<Student> iterator() {
        return new ConcreteStudentIterator(students);
    }
}

// 迭代器接口
interface Iterator<T> {
    boolean hasNext();

    T next();
}

// 具体迭代器
class ConcreteStudentIterator implements java.util.Iterator<Student> {
    private List<Student> students;
    private int currentIndex = 0;

    public ConcreteStudentIterator(List<Student> students) {
        this.students = students;
    }

    @Override
    public boolean hasNext() {
        return currentIndex < students.size();
    }

    @Override
    public Student next() {
        if (hasNext()) {
            Student student = students.get(currentIndex);
            currentIndex++;
            return student;
        }
        return null;
    }
}

// 学生类
class Student {
    private String name;
    private String studentId;

    public Student(String name, String studentId) {
        this.name = name;
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public String getStudentId() {
        return studentId;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 读取学生数量
        int n = scanner.nextInt();
        scanner.nextLine(); // 读取换行符

        // 创建具体可迭代对象
        ConcreteStudentCollection studentCollection = new ConcreteStudentCollection();

        // 读取学生信息并添加到集合
        for (int i = 0; i < n; i++) {
            String[] input = scanner.nextLine().split(" ");
            if (input.length == 2) {
                String name = input[0];
                String studentId = input[1];
                Student student = new Student(name, studentId);
                studentCollection.addStudent(student);
            } else {
                System.out.println("Invalid input");
                return;
            }
        }

        // 使用迭代器遍历学生集合
        java.util.Iterator<Student> iterator = studentCollection.iterator();
        while (iterator.hasNext()) {
            Student student = iterator.next();
            System.out.println(student.getName() + " " + student.getStudentId());
        }
    }
}
```

Java 内置的 List 接口的 iterator() 方法实现。

```java
import java.util.*;

// 学生类
class Student {
    String name;
    String id;

    Student(String name, String id) {
        this.name = name;
        this.id = id;
    }

    String getInfo() {
        return name + " " + id;
    }
}

// 学生列表系统
class StudentListSystem {
    private List<Student> students = new ArrayList<>();

    void addStudent(String name, String id) {
        students.add(new Student(name, id));
    }

    Iterator<Student> iterator() {
        return students.iterator();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StudentListSystem studentList = new StudentListSystem();

        int n = scanner.nextInt();
        scanner.nextLine(); 

        for (int i = 0; i < n; i++) {
            String[] s = scanner.nextLine().split(" ");
            studentList.addStudent(s[0], s[1]);
        }

        Iterator<Student> iterator = studentList.iterator();
        while (iterator.hasNext()) {
            Student student = iterator.next();
            System.out.println(student.getInfo());
        }
        scanner.close();
    }
}
```

### 19. 状态模式(State)

#### 19.1 概述

**状态模式**是一种行为设计模式， 让你能在一个对象的内部状态变化时改变其行为， 使其看上去就像改变了自身所属的类一样。

![状态设计模式](/images/design-pattern/state-zh.png)

状态模式（State Pattern）是一种行为型设计模式，它适用于一个对象在在不同的状态下有不同的行为时，比如说电灯的开、关、闪烁是不停的状态，状态不同时，对应的行为也不同，在没有状态模式的情况下，为了添加新的状态或修改现有的状态，往往**需要修改已有的代码**，这违背了开闭原则，而且如果对象的状态切换逻辑和各个状态的行为都在同一个类中实现，就可能导致该类的职责过重，不符合单一职责原则。

而状态模式将每个状态的行为封装在一个具体状态类中，使得每个状态类相对独立，并将对象在不同状态下的行为进行委托，从而使得对象的状态可以在运行时动态改变，每个状态的实现也不会影响其他状态。

状态模式包括以下几个重要角色：

- `State`（状态）： 定义一个接口，用于封装与Context的一个特定状态相关的行为。
- `ConcreteState`（具体状态）： 负责处理Context在状态改变时的行为, 每一个具体状态子类实现一个与`Context`的一个状态相关的行为。
- `Context`（上下文）: 维护一个具体状态子类的实例，这个实例定义当前的状态。

![image-20250408155153177](/images/design-pattern/image-20250408155153177.png)

**简单实现：**

```java
// 1. 定义状态接口：创建一个状态接口，该接口声明了对象可能的各种状态对应的方法
public interface State {
    void handle();
}

// 2. 实现具体状态类： 为对象可能的每种状态创建具体的状态类，实现状态接口中定义的方法
// 具体状态类1
public class ConcreteState1 implements State {
    @Override
    public void handle() {
        // 执行在状态1下的操作
    }
}

// 具体状态类2
public class ConcreteState2 implements State {
    @Override
    public void handle() {
        // 执行在状态2下的操作
    }
}

// 3. 创建上下文类：该类包含对状态的引用，并在需要时调用当前状态的方法
public class Context {
    private State currentState;

    public void setState(State state) {
        this.currentState = state;
    }

    public void request() {
        currentState.handle();
    }
}

// 4. 客户端使用：创建具体的状态对象和上下文对象，并通过上下文对象调用相应的方法。通过改变状态，可以改变上下文对象的行为
public class Client {
    public static void main(String[] args) {
        Context context = new Context();

        State state1 = new ConcreteState1();
        State state2 = new ConcreteState2();

        context.setState(state1);
        context.request(); // 执行在状态1下的操作

        context.setState(state2);
        context.request(); // 执行在状态2下的操作
    }
}
```

#### 19.2 使用场景

状态模式将每个状态封装为独立的类，使得添加新状态或修改现有状态变得更加灵活，避免了大量条件语句的使用。然而，若状态过多，可能会导致类的数量增加，进而使代码结构变得复杂。

总体而言，状态模式适用于有限状态机（FSM）场景，特别是当对象的行为在运行时依赖于其状态时。在游戏开发中，Unity3D 的 Animator 控制器是一个典型的状态机应用，它允许通过定义不同的动画状态，并通过状态转换来控制角色的行为和动画。

#### 19.3 案例

[状态模式-开关台灯](https://kamacoder.com/problempage.php?pid=1097)

::: info 

**题目描述**

小明家有一个灯泡，刚开始为关闭状态（OffState）。台灯可以接收一系列的指令，包括打开（"ON"）、关闭（"OFF"）和闪烁（"blink"）。每次接收到一个指令后，台灯会执行相应的操作，并输出当前灯泡的状态。请设计一个程序模拟这个灯泡系统。

**输入描述**

第一行是一个整数 n（1 <= n <= 1000），表示接收的命令数量。 

接下来的 n 行，每行包含一个字符串 s，表示一个命令（"ON"、"OFF"或"blink"）。

**输出描述**

对于每个命令，输出一行，表示执行该命令后灯泡的状态。

**输入示例**

```
5
ON
OFF
BLINK
OFF
ON
```

**输出示例**

```
Light is ON
Light is OFF
Light is Blinking
Light is OFF
Light is ON
```

:::

```java
import java.util.Scanner;

// 状态接口
interface State {
    String handle(); // // 处理状态的方法
}

// 具体状态类
class OnState implements State {
    @Override
    public String handle() {
        return "Light is ON";
    }
}

class OffState implements State {
    @Override
    public String handle() {
        return "Light is OFF";
    }
}

class BlinkState implements State {
    @Override
    public String handle() {
        return "Light is Blinking";
    }
}

// 上下文类
class Light {
    private State state; // 当前状态

    public Light() {
        this.state = new OffState(); // 初始状态为关闭
    }

    public void setState(State state) { // 设置新的状态
        this.state = state;
    }

    public String performOperation() { // 执行当前状态的操作
        return state.handle();
    }
}

public class Main {
    public static void main(String[] args) {
        // 创建一个Scanner对象以读取用户输入
        Scanner scanner = new Scanner(System.in);

        int n = scanner.nextInt();
        scanner.nextLine(); 

        Light light = new Light();
		// 处理用户输入
        for (int i = 0; i < n; i++) {
            String command = scanner.nextLine().trim();
			// 根据输入修改灯的状态
            switch (command) {
                case "ON":
                    light.setState(new OnState());
                    break;
                case "OFF":
                    light.setState(new OffState());
                    break;
                case "BLINK":
                    light.setState(new BlinkState());
                    break;
                default:
                    System.out.println("Invalid command: " + command);
                    break;
            }
			// 显示灯的当前状态
            System.out.println(light.performOperation());
        }
    }
}
```

### 20. 责任链模式

**亦称：** 职责链模式、命令链、CoR、Chain of Command、Chain of Responsibility

#### 20.1 概述

**责任链模式**是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。

![责任链设计模式](/images/design-pattern/chain-of-responsibility.png)

责任链模式是一种行为型设计模式，它允许你构建一个对象链，让请求从链的一端进入，然后沿着链上的对象依次处理，直到链上的某个对象能够处理该请求为止。

职责链上的处理者就是一个对象，可以对请求进行处理或者将请求转发给下一个节点，这个场景在生活中很常见，就是一个逐层向上递交的过程，最终的请求要么被处理者所处理，要么处理不了，这也因此可能导致请求无法被处理。

![image-20250408161326022](/images/design-pattern/image-20250408161326022.png)

责任链模式包括以下几个基本结构：

1. 处理者`Handler` ：定义一个处理请求的接口，包含一个处理请求的抽象方法和一个指向下一个处理者的链接。
2. 具体处理者`ConcreteHandler`: 实现处理请求的方法，并判断能否处理请求，如果能够处理请求则进行处理，否则将请求传递给下一个处理者。
3. 客户端：创建并组装处理者对象链，并将请求发送到链上的第一个处理者。

![image-20250408162046701](/images/design-pattern/image-20250408162046701.png)

**简单实现：**

```java
// 1. 处理者：定义处理请求的接口
interface Handler {
    // 处理请求的方法
    void handleRequest(double amount);
    // 设置下一个处理者的方法
    void setNextHandler(Handler nextHandler);
}

// 2. 具体处理者：实现处理请求
class ConcreteHandler implements Handler {
    private Handler nextHandler;

    @Override
    public void handleRequest(Request request) {
        // 根据具体情况处理请求，如果无法处理则交给下一个处理者
        if (canHandle(request)) {
            // 处理请求的逻辑
        } else if (nextHandler != null) {
            // 交给下一个处理者处理
            nextHandler.handleRequest(request);
        } else {
            // 无法处理请求的逻辑
        }
    }
    
    @Override
    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }

    // 具体处理者自己的判断条件
    private boolean canHandle(Request request) {
        // 根据具体情况判断是否能够处理请求
        return /* 判断条件 */;
    }
}

// 3. 客户端创建并组装处理者对象链，将请求发送给链上第一个处理者
public class Main {
    public static void main(String[] args) {
        // 创建处理者实例
        Handler handler1 = new ConcreteHandler();
        Handler handler2 = new ConcreteHandler();
        // ...

        // 构建责任链
        handler1.setNextHandler(handler2);
        // ...

        // 发送请求
        Request request = new Request(/* 请求参数 */);
        handler1.handleRequest(request);
    }
}
```

#### 20.2 使用场景

责任链模式具有以下优点：

- **降低耦合度**：请求的发送者和接收者解耦，每个处理者只负责处理相关请求，客户端无需知道具体处理者。
- **增强灵活性**：可以动态地添加、删除处理者，或改变处理者顺序，满足不同需求。

然而，由于请求可能经过多个处理者，这可能带来性能问题。如果链上没有合适的处理者，请求将无法被处理。

责任链模式是设计模式中常见且简单的模式，广泛应用于Java中的过滤器链和Spring框架中的拦截器链，处理请求和响应。

#### 20.3 案例

[责任链模式-请假审批](https://kamacoder.com/problempage.php?pid=1100)

::: info 

**题目描述**

小明所在的公司请假需要在OA系统上发布申请，整个请求流程包括多个处理者，每个处理者负责处理不同范围的请假天数，如果一个处理者不能处理请求，就会将请求传递给下一个处理者，请你实现责任链模式，可以根据请求天数找到对应的处理者。

审批责任链由主管(Supervisor), 经理(Manager)和董事（Director)组成，他们分别能够处理3天、7天和10天的请假天数。如果超过10天，则进行否决。

**输入描述**

第一行是一个整数N（1 <= N <= 100), 表示请求申请的数量。

接下来的N行，每行包括一个请求申请的信息，格式为"姓名 请假天数"

**输出描述**

对于每个请假请求，输出一行，表示该请求是否被批准。如果被批准/否决，输出被哪一个职级的人批准/否决。

**输入示例**

```
4
Alice 2
Bob 5
Tom 10
Jerry 12
```

**输出示例**

```
Alice Approved by Supervisor.
Bob Approved by Manager.
Tom Approved by Director.
Jerry Denied by Director.
```

:::

```java
import java.util.Scanner;
 
// 处理者：定义接口
interface LeaveHandler {
    void handleRequest(LeaveRequest request);
}
 
// 具体处理者：可以有多个，负责具体处理，这里分为 Supervisor、Manager、Director
class Supervisor implements LeaveHandler {
    private static final int MAX_DAYS_SUPERVISOR_CAN_APPROVE = 3;
    private LeaveHandler nextHandler;
 
    public Supervisor(LeaveHandler nextHandler) {
        this.nextHandler = nextHandler;
    }
 
    @Override
    public void handleRequest(LeaveRequest request) {
        if (request.getDays() <= MAX_DAYS_SUPERVISOR_CAN_APPROVE) {
            System.out.println(request.getName() + " Approved by Supervisor.");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        } else {
            System.out.println(request.getName() + " Denied by Supervisor.");
        }
    }
}
 
class Manager implements LeaveHandler {
    private static final int MAX_DAYS_MANAGER_CAN_APPROVE = 7;
    private LeaveHandler nextHandler;
 
    public Manager(LeaveHandler nextHandler) {
        this.nextHandler = nextHandler;
    }
 
    @Override
    public void handleRequest(LeaveRequest request) {
        if (request.getDays() <= MAX_DAYS_MANAGER_CAN_APPROVE) {
            System.out.println(request.getName() + " Approved by Manager.");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        } else {
            System.out.println(request.getName() + " Denied by Manager.");
        }
    }
}
 
class Director implements LeaveHandler {
    private static final int MAX_DAYS_DIRECTOR_CAN_APPROVE = 10;
 
    @Override
    public void handleRequest(LeaveRequest request) {
        if (request.getDays() <= MAX_DAYS_DIRECTOR_CAN_APPROVE) {
            System.out.println(request.getName() + " Approved by Director.");
        } else {
            System.out.println(request.getName() + " Denied by Director.");
        }
    }
}
 
// 请求类
class LeaveRequest {
    private String name;
    private int days;
 
    public LeaveRequest(String name, int days) {
        this.name = name;
        this.days = days;
    }
 
    public String getName() {
        return name;
    }
 
    public int getDays() {
        return days;
    }
}
 
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        int n = scanner.nextInt();
        scanner.nextLine();  
 		// 组装职责链
        LeaveHandler director = new Director();
        LeaveHandler manager = new Manager(director);
        LeaveHandler supervisor = new Supervisor(manager);
 
        for (int i = 0; i < n; i++) {
            String[] input = scanner.nextLine().split(" ");
            if (input.length == 2) {
                String name = input[0];
                int days = Integer.parseInt(input[1]);
                LeaveRequest request = new LeaveRequest(name, days);
                supervisor.handleRequest(request);
            } else {
                System.out.println("Invalid input");
                return;
            }
        }
    }
}
```

使用枚举封装了请求级别的逻辑，方便未来的修改和扩展。

```java
import java.util.Scanner;

// 抽象处理器类，定义了责任链的基本结构
abstract class Handler {
    public final static int SUPERVISOR_LEVEL_REQUEST = 1;
    public final static int MANAGER_LEVEL_REQUEST = 2;
    public final static int DIRECTOR_LEVEL_REQUEST = 3;
    
    private Handler nextHandler;
    private int level = 0;
    
    // 构造函数，设置处理器的级别
    public Handler(int _level) {
        this.level = _level;
    }
    
    // 处理请求的方法
    public final Response handleMessage(Request request) {
        if (this.level == request.getRequestLevel()) {
            return this.response(request);
        } else {
            if (this.nextHandler != null) {
                return this.nextHandler.handleMessage(request);
            } else {
                return new Response("Request denied");
            }
        }
    }
    
    // 设置下一个处理器
    public void setNext(Handler _handler) {
        this.nextHandler = _handler;
    }
    
    protected abstract Response response(Request request);
}

// 主管处理
class SupervisorHandler extends Handler {
    public SupervisorHandler() {
        super(Handler.SUPERVISOR_LEVEL_REQUEST);
    }
    
    @Override
    protected Response response(Request request) {
        System.out.println(request.getName() + " Approved by Supervisor.");
        return new Response("Approved by Supervisor");
    }
}

// 经理处理
class ManagerHandler extends Handler {
    public ManagerHandler() {
        super(Handler.MANAGER_LEVEL_REQUEST);
    }
    
    @Override
    protected Response response(Request request) {
        System.out.println(request.getName() + " Approved by Manager.");
        return new Response("Approved by Manager");
    }
}

// 董事处理
class DirectorHandler extends Handler {
    public DirectorHandler() {
        super(Handler.DIRECTOR_LEVEL_REQUEST);
    }
    
    @Override
    protected Response response(Request request) {
        System.out.println(request.getName() + " Approved by Director.");
        return new Response("Approved by Director");
    }
}

// 请求级别的枚举，定义了不同级别的请假天数范围
enum RequestLevel {
    SUPERVISOR(1, 3),
    MANAGER(4, 7),
    DIRECTOR(8, 10);

    private final int minDays;
    private final int maxDays;

    RequestLevel(int minDays, int maxDays) {
        this.minDays = minDays;
        this.maxDays = maxDays;
    }

    // 根据天数确定请求级别
    public static RequestLevel fromDays(int days) {
        for (RequestLevel level : values()) {
            if (days >= level.minDays && days <= level.maxDays) {
                return level;
            }
        }
        return null;
    }

    public int getValue() {
        return ordinal() + 1;
    }
}

// 请求类，包含请求的详细信息
class Request {
    private String name;
    private int level;
    private int nums;
    
    public Request(String name, int nums) {
        this.name = name;
        this.nums = nums;
        RequestLevel requestLevel = RequestLevel.fromDays(nums);
        this.level = (requestLevel != null) ? requestLevel.getValue() : -1;
    }
    
    public int getRequestLevel() {
        return this.level;
    }
    
    public String getName() {
        return this.name;
    }
    
    public int getNums() {
        return this.nums;
    }
}

// 响应类，包含处理结果
class Response {
    private String message;
    
    public Response(String message) {
        this.message = message;
    }
    
    public String getMessage() {
        return this.message;
    }
}

// 主类
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 创建处理器链
        SupervisorHandler supervisorHandler = new SupervisorHandler();
        ManagerHandler managerHandler = new ManagerHandler();
        DirectorHandler directorHandler = new DirectorHandler();
        
        // 设置处理器链的顺序
        supervisorHandler.setNext(managerHandler);
        managerHandler.setNext(directorHandler);
        
        int n = scanner.nextInt();
        scanner.nextLine(); 
        
        // 处理每个请求
        while (n-- > 0) {
            String[] s = scanner.nextLine().split(" ");
            Request request = new Request(s[0], Integer.parseInt(s[1]));
            Response response = supervisorHandler.handleMessage(request);
            if (request.getRequestLevel() == -1) {
                System.out.println(request.getName() + " Denied by Director.");
            }
        }
        
        scanner.close();
    }
}
```

### 21. 解释器模式

#### 21.1 概述

解释器模式（Interpreter Pattern）是一种行为型设计模式，它定义了一个语言的文法，并且建立一个【解释器】来解释该语言中的句子。

比如说SQL语法、正则表达式，这些内容比较简短，但是表达的内容可不仅仅是字面上的那些符号，计算机想要理解这些语法，就需要解释这个语法规则，因此解释器模式常用于实现编程语言解释器、正则表达式处理等场景。

解释器模式主要包含以下几个角色：

1. `抽象表达式（Abstract Expression）`：定义了解释器的接口，包含了解释器的方法 `interpret`。
2. `终结符表达式（Terminal Expression）`：在语法中不能再分解为更小单元的符号。
3. `非终结符表达式（Non-terminal Expression）`：文法中的复杂表达式，它由终结符和其他非终结符组成。
4. `上下文（Context）`：包含解释器之外的一些全局信息，可以存储解释器中间结果，也可以用于向解释器传递信息。

举例来说，表达式 "3 + 5 * 2"，数字 "3" 和 "5"， "2" 是终结符，而运算符 "+", "*"都需要两个操作数, 属于非终结符

![image-20250408164642105](/images/design-pattern/image-20250408164642105.png)

**简单实现**

```java
// 1. 创建抽象表达式接口： 定义解释器的接口，声明一个 interpret 方法，用于解释语言中的表达式
public interface Expression {
    int interpret();
}

// 2. 创建具体的表达式类： 实现抽象表达式接口，用于表示语言中的具体表达式
public class TerminalExpression implements Expression {
    private int value;

    public TerminalExpression(int value) {
        this.value = value;
    }

    @Override
    public int interpret() {
        return value;
    }
}

// 3. 非终结符表达式：抽象表达式的一种，用于表示语言中的非终结符表达式，通常包含其他表达式
public class AddExpression implements Expression {
    private Expression left;
    private Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

// 4. 上下文：包含解释器需要的一些全局信息或状态
public class Context {
    // 可以在上下文中存储一些全局信息或状态
}

// 5. 客户端：构建并组合表达式，然后解释表达式
public class Main {
    public static void main(String[] args) {
        Context context = new Context();

        Expression expression = new AddExpression(
                new TerminalExpression(1),
                new TerminalExpression(2)
        );

        int result = expression.interpret();
        System.out.println("Result: " + result);
    }
}
```

#### 21.2 使用场景

当需要解释和执行特定领域或业务规则的语言时，可以使用解释器模式。例如，SQL解释器、正则表达式解释器等。但是需要注意的是解释器模式可能会导致类的层次结构较为复杂，同时也可能不够灵活，使用要慎重。

#### 21.3 案例

[解释器模式-数学表达式](https://kamacoder.com/problempage.php?pid=1096)

::: info 

**题目描述**

小明正在设计一个计算器，用于解释用户输入的简单数学表达式，每个表达式都是由整数、加法操作符+、乘法操作符组成的，表达式中的元素之间用空格分隔，请你使用解释器模式帮他实现这个系统。

**输入描述**

每行包含一个数学表达式，表达式中包含整数、加法操作符（+）和乘法操作符（*）。 表达式中的元素之间用空格分隔。

**输出描述**

对于每个输入的数学表达式，每行输出一个整数，表示对应表达式的计算结果。

**输入示例**

```
2 + 3
5 * 2
3 + 4 * 2
```

**输出示例**

```
5
10
11
```

:::

```java
import java.util.Scanner;
import java.util.Stack;

// 抽象表达式接口
interface Expression {
    int interpret();
}

// 终结符表达式类 - 数字
class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret() {
        return number;
    }
}

// 非终结符表达式类 - 加法
class AddExpression implements Expression {
    private Expression left;
    private Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

// 非终结符表达式类 - 乘法
class MultiplyExpression implements Expression {
    private Expression left;
    private Expression right;

    public MultiplyExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() * right.interpret();
    }
}

// 上下文类
class Context {
    private Stack<Expression> expressionStack = new Stack<>();

    public void pushExpression(Expression expression) {
        expressionStack.push(expression);
    }

    public Expression popExpression() {
        return expressionStack.pop();
    }
}

public class Main{
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Context context = new Context();

        // 处理用户输入的数学表达式
        while (scanner.hasNextLine()) {
            String userInput = scanner.nextLine();
            Expression expression = parseExpression(userInput);
            if (expression != null) {
                context.pushExpression(expression);
                System.out.println(expression.interpret());
            } else {
                System.out.println("Invalid expression.");
            }
        }

        scanner.close();
    }

    // 解析用户输入的数学表达式并返回相应的抽象表达式类
    private static Expression parseExpression(String userInput) {
        try {
            Stack<Expression> expressionStack = new Stack<>();
            char[] tokens = userInput.toCharArray();

            for (int i = 0; i < tokens.length; i++) {
                char token = tokens[i];

                if (Character.isDigit(token)) {
                    expressionStack.push(new NumberExpression(Character.getNumericValue(token)));

                    // 如果下一个字符不是数字，且栈中有两个以上的元素，说明可以进行运算
                    if (i + 1 < tokens.length && !Character.isDigit(tokens[i + 1]) && expressionStack.size() >= 2) {
                        Expression right = expressionStack.pop();
                        Expression left = expressionStack.pop();
                        char operator = tokens[i + 1];

                        if (operator == '+') {
                            expressionStack.push(new AddExpression(left, right));
                        } else if (operator == '*') {
                            expressionStack.push(new MultiplyExpression(left, right));
                        }

                        i++; // 跳过下一个字符，因为已经处理过了
                    }
                } else {
                    return null; 
                }
            }

            return expressionStack.pop();
        } catch (Exception e) {
            return null;
        }
    }
}
```



### 22. 访问者模式(Visitor)

#### 22.1 概述

**访问者模式**是一种行为设计模式， 它能将算法与其所作用的对象隔离开来。

![访问者设计模式](/images/design-pattern/visitor.png)

访问者模式（Visitor Pattern）是一种行为型设计模式，可以在不改变对象结构的前提下，对对象中的元素进行新的操作。

举个例子，假设有一个动物园，里面有不同种类的动物，比如狮子、大象、猴子等。每个动物都会被医生检查身体，被管理员投喂，被游客观看，医生，游客，管理员都属于访问者。

```java
// 定义动物接口
interface Animal {
    void accept(Visitor visitor);
}

// 具体元素类：狮子
class Lion implements Animal {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素类：大象
class Elephant implements Animal {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素类：猴子
class Monkey implements Animal {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
```

如果你想对动物园中的每个动物执行一些操作，比如医生健康检查、管理员喂食、游客观赏等。就可以使用访问者模式来实现这些操作。

```java
// 定义访问者接口
interface Visitor {
    void visit(Animal animal);
}

// 具体访问者类：医生
class Vet implements Visitor {
    @Override
    public void visit(Animal animal) {
  
    }
}

// 具体访问者类：管理员
class Zookeeper implements Visitor {
    @Override
    public void visit(Animal animal) {
    }
}

// 具体访问者类：游客
class VisitorPerson implements Visitor {
    @Override
    public void visit(Animal animal) {
    }
}
```

将这些访问者应用到动物园的每个动物上

```java
public class Main {
    public static void main(String[] args) {
        Animal lion = new Lion();
        Animal elephant = new Elephant();
        Animal monkey = new Monkey();

        Visitor vet = new Vet();
        Visitor zookeeper = new Zookeeper();
        Visitor visitorPerson = new VisitorPerson();

        // 动物接受访问者的访问
        lion.accept(vet);
        elephant.accept(zookeeper);
        monkey.accept(visitorPerson);
    }
}
```

访问者模式包括以下几个基本角色：

- `抽象访问者（Visitor）`：声明了访问者可以访问哪些元素，以及如何访问它们的方法`visit`。
- `具体访问者（ConcreteVisitor）` ：实现了抽象访问者定义的方法，不同的元素类型可能有不同的访问行为。医生、管理员、游客都属于具体的访问者，它们的访问行为不同。
- `抽象元素（Element）`： 定义了一个accept方法，用于接受访问者的访问。
- `具体元素（ConcreteElement）`：实现了accept方法，是访问者访问的目标。
- `对象结构（Object Structure）`：包含元素的集合，可以是一个列表、一个集合或者其他数据结构。负责遍历元素，并调用元素的接受方法。

![image-20250408185055160](/images/design-pattern/image-20250408185055160.png)

**简单实现：**

```java
// 1. 定义抽象访问者: 声明那些元素可以访问
interface Visitor {
    void visit(ConcreteElementA element);
    void visit(ConcreteElementB element);
}

// 2. 实现具体访问者：实现具体的访问逻辑
// 具体访问者A
class ConcreteVisitorA implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("ConcreteVisitorA Visit ConcreteElementA");
    }

    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("ConcreteVisitorA Visit ConcreteElementB");
    }
}

// 具体访问者B
class ConcreteVisitorB implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("ConcreteVisitorB Visit ConcreteElementA");
    }

    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("ConcreteVisitorB Visit ConcreteElementB");
    }
}

// 3. 定义元素接口：声明接收访问者的方法
interface Element {
    void accept(Visitor visitor);
}

// 4. 实现具体元素：实现接受访问者的方法
// 具体元素A
class ConcreteElementA implements Element {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

// 具体元素B
class ConcreteElementB implements Element {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

//5. 创建对象结构：提供一个接口让访问者访问它的元素
class ObjectStructure {
    private List<Element> elements = new ArrayList<>();

    public void attach(Element element) {
        elements.add(element);
    }

    public void detach(Element element) {
        elements.remove(element);
    }

    public void accept(Visitor visitor) {
        for (Element element : elements) {
            element.accept(visitor);
        }
    }
}

// 6. 客户端调用
public class Main {
    public static void main(String[] args) {
        ObjectStructure objectStructure = new ObjectStructure();
        objectStructure.attach(new ConcreteElementA());
        objectStructure.attach(new ConcreteElementB());

        Visitor visitorA = new ConcreteVisitorA();
        Visitor visitorB = new ConcreteVisitorB();

        objectStructure.accept(visitorA);
        objectStructure.accept(visitorB);
    }
}
```

#### 22.2 使用场景

访问者模式结构较为复杂，但它将相同类型的操作封装在一个访问者类中，使相关操作集中，提高了代码的可读性和维护性。此模式适用于**对象结构稳定，但需要频繁添加新操作的场景**。通过引入新的访问者类，可以在不修改现有元素类的情况下添加新操作。

#### 22.3 案例

[访问者模式-图形的面积](https://kamacoder.com/problempage.php?pid=1098)

::: info 

**题目描述**

小明家有一些圆形和长方形面积的土地，请你帮他实现一个访问者模式，使得可以通过访问者计算每块土地的面积。

图形的面积计算规则如下：

- 圆形的面积计算公式为：3.14 * 半径 * 半径
- 矩形的面积计算公式为：长 * 宽

**输入描述**

第一行是一个整数 n（1 <= n <= 1000），表示图形的数量。 

接下来的 n 行，每行描述一个图形，格式为 "Circle r" 或 "Rectangle width height"，其中 r、width、height 是正整数。

**输出描述**

对于每个图形，输出一行，表示该图形的面积。

**输入示例**

```
3
Circle 5
Rectangle 3 4
Circle 2
```

**输出示例**

```
78.5
12
12.56
```

:::

```java
import java.util.Scanner;
 
// 元素接口
interface Shape {
    void accept(Visitor visitor);
}
 
// 具体元素类
class Circle implements Shape {
    private int radius;
 
    public Circle(int radius) {
        this.radius = radius;
    }
 
    public int getRadius() {
        return radius;
    }
 
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
 
class Rectangle implements Shape {
    private int width;
    private int height;
 
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
 
    public int getWidth() {
        return width;
    }
 
    public int getHeight() {
        return height;
    }
 
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
 
// 访问者接口
interface Visitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}
 

// 具体访问者类
class AreaCalculator implements Visitor {
    @Override
    public void visit(Circle circle) {
        double area = 3.14 * Math.pow(circle.getRadius(), 2);
        System.out.println(area);
    }
 
    @Override
    public void visit(Rectangle rectangle) {
        int area = rectangle.getWidth() * rectangle.getHeight();
        System.out.println(area);
    }
}
 
// 对象结构类
class Drawing {
    private Shape[] shapes;
 
    public Drawing(Shape[] shapes) {
        this.shapes = shapes;
    }
 
    public void accept(Visitor visitor) {
        for (Shape shape : shapes) {
            shape.accept(visitor);
        }
    }
}
 
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        int n = scanner.nextInt();
        scanner.nextLine();  
 		// 创建一个数组来存储图形对象
        Shape[] shapes = new Shape[n];
 		// 根据用户输入创建不同类型的图形对象
        for (int i = 0; i < n; i++) {
            String[] input = scanner.nextLine().split(" ");
            if (input[0].equals("Circle")) {
                int radius = Integer.parseInt(input[1]);
                shapes[i] = new Circle(radius);
            } else if (input[0].equals("Rectangle")) {
                int width = Integer.parseInt(input[1]);
                int height = Integer.parseInt(input[2]);
                shapes[i] = new Rectangle(width, height);
            } else {
                System.out.println("Invalid input");
                return;
            }
        }
 		// 创建一个图形集合
        Drawing drawing = new Drawing(shapes);
        // 创建一个面积计算访问者
        Visitor areaCalculator = new AreaCalculator();
        // 访问图形集合并计算面积
        drawing.accept(areaCalculator);
    }
}
```
