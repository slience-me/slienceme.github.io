# Java便签
> 记录小知识点 做对了(仅仅是记录)✅ 做错了(记录一下错题)❌

::: info 1. java8中，下面哪个类用到了解决哈希冲突的开放定址法？C ThreadLocal ❌

官方解析：ThreadLocal类确实采用了开放定址法来解决哈希冲突。在ThreadLocal中，每个线程都维护了一个ThreadLocalMap，它使用开放定址法处理hash冲突。当发生hash冲突时，ThreadLocalMap会线性探测下一个空位置来存储元素。

分析其他选项：

- A. LinkedHashSet内部实际是基于LinkedHashMap实现的，它使用的是链地址法（拉链法）来解决哈希冲突，维护了一个双向链表来保持插入顺序。

- B. HashMap使用的是链地址法（拉链法）来解决哈希冲突。当多个键值对的hash值映射到同一个桶时，这些元素会形成一个链表（当链表长度超过阈值时会转换为红黑树）。

- D. TreeMap是基于红黑树实现的，它根本不涉及哈希冲突的问题，因为它是按照键的自然顺序或者自定义比较器来组织数据的。

所以ThreadLocal是这些选项中唯一使用开放定址法解决哈希冲突的类。开放定址法的优点是不需要额外的数据结构，只需要数组即可，这对于ThreadLocal这种需要频繁访问但冲突相对较少的场景来说是合适的选择。

:::

::: info 2. 下列关于JAVA多线程的叙述正确的是（BC）✅

- A. 调用start()方法和run()都可以启动一个线程

- B. CyclicBarrier和CountDownLatch都可以让一组线程等待其他线程

- C. Callable类的call()方法可以返回值和抛出异常

- D. 新建的线程调用start()方法就能立即进行运行状态

官方解析：这道题目考察了Java多线程的基本概念和特性。

选项B和C是正确的：

- B正确：CyclicBarrier和CountDownLatch确实都可以让一组线程等待其他线程。CyclicBarrier用于让一组线程互相等待，直到所有线程都到达某个公共屏障点。CountDownLatch则允许一个或多个线程等待其他线程完成一组操作。

- C正确：Callable接口的call()方法确实可以返回值，并且能够抛出异常。这是它区别于Runnable接口run()方法的重要特征。run()方法既不能返回值，也不能抛出受检异常。

分析错误选项：

- A错误：调用start()方法和run()方法的效果是不同的。start()方法会创建新的线程并执行run()方法，而直接调用run()方法只会在当前线程中执行，不会启动新线程。

- D错误：新建线程调用start()方法后，线程并不会立即进入运行状态。线程的状态变化是：新建→就绪→运行。调用start()方法后，线程会进入就绪状态，等待CPU调度才能进入运行状态。这取决于线程调度器的调度策略。

:::

::: info 3.下面HttpServletResponse方法调用，那些给客户端回应了一个定制的HTTP回应头：(  AB  )❌

- A. response.setHeader("X-MyHeader", "34");

- B. response.addHeader("X-MyHeader", "34");

- C. response.setHeader(new HttpHeader("X-MyHeader", "34"));

- D. response.addHeader(new HttpHeader("X-MyHeader", "34"));

- E. response.addHeader(new ServletHeader("X-MyHeader", "34"));

- F. response.setHeader(new ServletHeader("X-MyHeader", "34"));

官方解析：HttpServletResponse接口中提供了setHeader()和addHeader()两个方法来设置HTTP响应头,A和B选项正确地使用了这两个标准方法。

具体分析:

1. A选项:response.setHeader("X-MyHeader", "34")
   - 这是正确的用法,setHeader方法用于设置响应头,如果该头已存在则覆盖原值

2. B选项:response.addHeader("X-MyHeader", "34")
   - 这也是正确的用法,addHeader方法用于添加响应头,如果该头已存在则追加为多个值

3. C和D选项错误:
   - 使用了不存在的HttpHeader类
   - HttpServletResponse接口没有接受HttpHeader对象作为参数的方法

4. E和F选项错误:
   - 使用了不存在的ServletHeader类
   - HttpServletResponse接口没有接受ServletHeader对象作为参数的方法

关键点在于:

- setHeader和addHeader方法都接受两个String类型参数:头名称和头值
- 这两个方法是Servlet规范中定义的标准方法
- 不需要创建特殊的Header对象,直接传入字符串即可
- setHeader和addHeader的区别在于是覆盖还是追加已存在的头

:::

---

---

---

::: info 4. 在使用super 和this关键字时，以下描述正确的是(A)❌

- A. 在子类构造方法中使用super（）显示调用父类的构造方法，super（）必须写在子类构造方法的第一行，否则编译不通过

- B. super（）和this（）不一定要放在构造方法内第一行

- C. this（）和super（）可以同时出现在一个构造函数中

- D. this（）和super（）可以在static环境中使用，包括static方法和static语句块

官方解析：在Java中使用super和this关键字有严格的语法规则。A选项正确,因为在子类构造方法中调用父类构造方法super()必须位于第一行,这是Java语言规范的要求。这样设计的原因是为了确保在初始化子类之前,父类已经完成初始化。

分析其他选项的错误原因:

- B错误:super()和this()都必须放在构造方法的第一行,这是Java编译器强制要求的。如果不遵循这个规则,代码将无法通过编译。

- C错误:this()和super()不能同时出现在同一个构造函数中。因为它们都必须位于第一行,而一个方法的第一行只能有一条语句,所以它们是互斥的。

- D错误:this()和super()只能在构造方法中使用,不能在static环境(包括static方法和static代码块)中使用。因为static成员属于类,而不是实例,而this和super都是和实例相关的概念。

基于继承关系的对象构造必须遵循"从父到子"的顺序,这就是为什么子类构造方法中super()必须在第一行的重要原因。这确保了父类成员的正确初始化。

:::

::: info 5. try块后必须有catch块。（错误）✅

在Java异常处理机制中,try块后面可以有以下几种组合形式:

1. try + catch
2. try + finally
3. try + catch + finally

```java
try {
// 可能抛出异常的代码
} finally {
// 清理代码,总是执行
}
```

:::

::: info 6. JDK1.8版本之前，抽象类和接口的区别，以下说法错误的是(D)❌

- A. 接口是公开的，里面不能有私有的方法或变量，是用于让别人使用的，而抽象类是可以有私有方法或私有变量的。

- B. abstract class 在 Java 语言中表示的是一种继承关系，一个类只能使用一次继承关系。但是，一个类却可以实现多个interface，实现多重继承。接口还有标识（里面没有任何方法，如Remote接口）和数据共享（里面的变量全是常量）的作用。

- C. 在abstract class 中可以有自己的数据成员，也可以有非abstarct的成员方法，而在interface中，只能够有静态的不能被修改的数据成员（也就是必须是 static final的，不过在 interface中一般不定义数据成员），所有的成员方法默认都是 public abstract 类型的。

- D. abstract class和interface所反映出的设计理念不同。其实abstract class表示的是"has-a"关系，interface表示的是"is-a"关系。

官方解析：abstract class和interface的设计理念完全相反。abstract class表示的是"is-a"关系，interface表示的是"has-a"关系(拥有某种能力)。所以D选项的说法是错误的。

分析所有选项：

- A正确：接口确实都是public的，其中的方法和变量都必须是public的，不能有私有成员。而抽象类可以有各种访问权限的成员。

- B正确：Java是单继承的，一个类只能继承一个抽象类，但可以实现多个接口来达到多继承的效果。接口还可以用作标识接口(不含任何方法)和共享常量。

- C正确：抽象类可以包含普通成员变量和非抽象方法，而接口中的变量默认都是public static final的常量，方法默认都是public abstract的。

- D错误：这里完全搞反了两者的关系。举例说明：
  - "is-a"关系：猫是一种动物，所以动物适合用抽象类，猫继承动物抽象类
  - "has-a"关系：动物有奔跑能力，所以奔跑适合用接口，动物实现奔跑接口

因此抽象类表示的是对象的本质，即"is-a"关系；接口表示的是对象的功能，即"has-a"关系。这也是为什么Java允许多实现接口但只能单继承抽象类。

:::
