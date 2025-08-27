# Java便签
> 记录小知识点 做对了(仅仅是记录)✅ 做错了(记录一下错题)❌
>
> 题目来源：[牛客网](https://www.nowcoder.com/)

## 2025-08-22

::: info 1. java8中，下面哪个类用到了解决哈希冲突的开放定址法？`C ThreadLocal` ❌

官方解析：ThreadLocal类确实采用了开放定址法来解决哈希冲突。在ThreadLocal中，每个线程都维护了一个ThreadLocalMap，它使用开放定址法处理hash冲突。当发生hash冲突时，ThreadLocalMap会线性探测下一个空位置来存储元素。

分析其他选项：

- A. LinkedHashSet内部实际是基于LinkedHashMap实现的，它使用的是链地址法（拉链法）来解决哈希冲突，维护了一个双向链表来保持插入顺序。

- B. HashMap使用的是链地址法（拉链法）来解决哈希冲突。当多个键值对的hash值映射到同一个桶时，这些元素会形成一个链表（当链表长度超过阈值时会转换为红黑树）。

- D. TreeMap是基于红黑树实现的，它根本不涉及哈希冲突的问题，因为它是按照键的自然顺序或者自定义比较器来组织数据的。

所以ThreadLocal是这些选项中唯一使用开放定址法解决哈希冲突的类。开放定址法的优点是不需要额外的数据结构，只需要数组即可，这对于ThreadLocal这种需要频繁访问但冲突相对较少的场景来说是合适的选择。

:::

::: info 2. 下列关于JAVA多线程的叙述正确的是（BC）✅

A. `调用start()方法和run()都可以启动一个线程`

B. `CyclicBarrier和CountDownLatch都可以让一组线程等待其他线程`

C. `Callable类的call()方法可以返回值和抛出异常`

D. `新建的线程调用start()方法就能立即进行运行状态`

官方解析：这道题目考察了Java多线程的基本概念和特性。

选项B和C是正确的：

- B正确：CyclicBarrier和CountDownLatch确实都可以让一组线程等待其他线程。CyclicBarrier用于让一组线程互相等待，直到所有线程都到达某个公共屏障点。CountDownLatch则允许一个或多个线程等待其他线程完成一组操作。

- C正确：Callable接口的call()方法确实可以返回值，并且能够抛出异常。这是它区别于Runnable接口run()方法的重要特征。run()方法既不能返回值，也不能抛出受检异常。

分析错误选项：

- A错误：调用start()方法和run()方法的效果是不同的。start()方法会创建新的线程并执行run()方法，而直接调用run()方法只会在当前线程中执行，不会启动新线程。

- D错误：新建线程调用start()方法后，线程并不会立即进入运行状态。线程的状态变化是：新建→就绪→运行。调用start()方法后，线程会进入就绪状态，等待CPU调度才能进入运行状态。这取决于线程调度器的调度策略。

:::

::: info 3.下面HttpServletResponse方法调用，那些给客户端回应了一个定制的HTTP回应头：(  AB  )❌

A. `response.setHeader("X-MyHeader", "34");`

B. `response.addHeader("X-MyHeader", "34");`

C. `response.setHeader(new HttpHeader("X-MyHeader", "34"));`

D. `response.addHeader(new HttpHeader("X-MyHeader", "34"));`

E. `response.addHeader(new ServletHeader("X-MyHeader", "34"));`

F. `response.setHeader(new ServletHeader("X-MyHeader", "34"));`

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

A. `在子类构造方法中使用super（）显示调用父类的构造方法，super（）必须写在子类构造方法的第一行，否则编译不通过`

B. `super（）和this（）不一定要放在构造方法内第一行`

C. `this（）和super（）可以同时出现在一个构造函数中`

D. `this（）和super（）可以在static环境中使用，包括static方法和static语句块`

官方解析：在Java中使用super和this关键字有严格的语法规则。A选项正确,因为在子类构造方法中调用父类构造方法super()必须位于第一行,这是Java语言规范的要求。这样设计的原因是为了确保在初始化子类之前,父类已经完成初始化。

分析其他选项的错误原因:

- B错误:super()和this()都必须放在构造方法的第一行,这是Java编译器强制要求的。如果不遵循这个规则,代码将无法通过编译。

- C错误:this()和super()不能同时出现在同一个构造函数中。因为它们都必须位于第一行,而一个方法的第一行只能有一条语句,所以它们是互斥的。

- D错误:this()和super()只能在构造方法中使用,不能在static环境(包括static方法和static代码块)中使用。因为static成员属于类,而不是实例,而this和super都是和实例相关的概念。

基于继承关系的对象构造必须遵循"从父到子"的顺序,这就是为什么子类构造方法中super()必须在第一行的重要原因。这确保了父类成员的正确初始化。

:::

::: info 5. try块后必须有catch块。（`错误`）✅

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

A. `接口是公开的，里面不能有私有的方法或变量，是用于让别人使用的，而抽象类是可以有私有方法或私有变量的。`

B. `abstract class 在 Java 语言中表示的是一种继承关系，一个类只能使用一次继承关系。但是，一个类却可以实现多个interface，实现多重继承。接口还有标识（里面没有任何方法，如Remote接口）和数据共享（里面的变量全是常量）的作用。`

C. `在abstract class 中可以有自己的数据成员，也可以有非abstarct的成员方法，而在interface中，只能够有静态的不能被修改的数据成员（也就是必须是 static final的，不过在 interface中一般不定义数据成员），所有的成员方法默认都是 public abstract 类型的。`

D. `abstract class和interface所反映出的设计理念不同。其实abstract class表示的是"has-a"关系，interface表示的是"is-a"关系。`

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

## 2025-08-26

::: info 7.给出如下代码:以下选项中，将哪个插入上述代码的第7行中，会导致程序抛出java.lang.ClassCastException异常（B ）❌

A. `Alpha a = x;` B. `Foo f= (Delta)x;` C. `Foo f= (Alpha)x;` D. `Beta b = (Beta)(Alpha)x;`

```java
interface Foo {}
class Alpha implements Foo {}
class Beta extends Alpha {}
class Delta extends Beta {
  public static void main(String[] args) {
    Beta x = new Beta();
    // 此处插入代码
  }
}
```

官方解析：这道题目考察Java中类型转换和继承关系的知识点。

在题目中给出的类的继承关系是: `Delta extends Beta extends Alpha implements Foo`。这形成了一个继承链,其中Beta x = new Beta()创建了一个Beta类型的对象。

- B选项是正确答案,因为试图将Beta对象强制转换为Delta类型会抛出ClassCastException异常。这是因为虽然Delta是Beta的子类,但是x实际指向的是Beta对象,不能将父类对象强制转换为子类类型。

分析其他选项:

- A选项合法:Alpha a = x 是向上转型(upcasting),因为Alpha是Beta的父类,这种转换是自动的、安全的。

- C选项合法:Foo f = (Alpha)x 也是合法的,因为x可以先转换为Alpha(x本身就是Alpha类型的),而Alpha实现了Foo接口。

- D选项合法:Beta b = (Beta)(Alpha)x 虽然看起来复杂,但是x本身就是Beta类型,先将其转换为Alpha再转回Beta是允许的,不会抛出异常。

总的来说,在Java中:

- 向上转型<u>(子类转父类)</u>是自动和安全的
- 向下转型<u>(父类转子类)</u>需要显式转换,且只有当对象的实际类型是目标类型或其子类时才能成功,否则会抛出ClassCastException

:::

::: info 8.下列哪一个方法你认为是新线程开始执行的点，也就是从该点开始线程n被执行。(B)❌

A. `public void start()`  B. `public void run()`  C. `public void int()`

D. `public static void main(String args[])`  E. `public void runnable()`

官方解析：在Java多线程编程中，`run()方法是线程执行的入口点，也是新线程执行的起点`。当一个类继承Thread类或实现Runnable接口时，必须重写run()方法来定义线程要执行的任务。

- 选项B "public void run()" 是正确的，因为：
  1. run()方法包含了线程要执行的具体代码
  2. JVM会调用线程的run()方法来启动新线程的执行
  3. run()方法是Thread类的核心方法，定义了线程的实际行为

分析其他选项：

- A. start()方法是用来启动线程的方法，但它不是线程执行的入口点。start()方法的作用是使线程进入就绪状态，等待CPU调度

- C. int()方法不存在于Thread类中，这个选项完全错误

- D. main()方法是Java程序的入口点，但不是新线程的入口点。它是主线程的起点，而不是我们创建的新线程的起点

- E. runnable()方法不存在于Thread类中，这是一个错误的方法名

实际应用中，我们通常这样使用：

- 继承Thread类时，重写run()方法
- 实现Runnable接口时，实现run()方法

这两种方式都是通过定义run()方法来指定线程要执行的任务。

知识点：Java

:::

::: info 9. 下面代码的输出是什么？A ❌

```java
public class Base
{
    private String baseName = "base";
    public Base()
    {
        callName();
    }
    public void callName()
    {
        System. out. println(baseName);
    }
    static class Sub extends Base
    {
        private String baseName = "sub";
        public void callName()
        {
            System. out. println (baseName) ;
        }
    }
    public static void main(String[] args)
    {
        Base b = new Sub();
    }
}
```

A. `null` B. `sub` C. `base`

官方解析：这道题目考察了Java中构造方法调用顺序以及变量初始化的相关知识点。

当执行 new Sub() 时,流程如下:

1. 首先调用父类Base的构造方法
2. 在Base构造方法中调用了callName()方法
3. `由于此时是多态调用,会调用子类Sub重写的callName()方法`
4. 此时子类Sub的实例变量baseName还未初始化(还未执行子类的构造方法)
5. 因此子类中访问baseName时得到null

所以最终输出为null,A选项正确。

分析其他选项:

- B选项错误:sub是最终赋给子类baseName的值,但在调用时子类构造方法还未执行,变量未初始化。

- C选项错误:虽然父类baseName的值是"base",但由于多态,调用的是子类的callName()方法,访问的是子类的baseName变量。

这个题目体现了Java中一个重要的原则:
- <u>构造方法的调用顺序是先初始化父类再初始化子类</u>
- <u>成员变量的初始化在构造方法内容执行之前</u>
- <u>在构造方法中调用可被重写的方法要特别小心,因为此时子类对象可能尚未完全初始化</u>

这也是为什么在构造方法中应该尽量避免调用可被重写的方法。

知识点：Java

:::

::: info 10. 使用Java泛型时，下列描述正确的是：(C)❌

A. `实例化类型参数时可以使用基本类型`.  B. `运行时可以查询泛型`

C. `不能创建参数化类型的数组`   D. `可以直接对类型变量进行初始化`

官方解析：不能创建参数化类型的数组。因为会进行类型擦除

---

关于Java泛型，我们逐一分析各个选项： 

- A. 实例化类型参数时可以使用基本类型
   这是错误的。Java泛型不允许使用基本类型（如int、char、boolean等）作为类型参数。相反，必须使用其包装类（如Integer、Character、Boolean等）。 

- B. 运行时可以查询泛型
   这也是错误的。在Java中，泛型类型信息在编译时被擦除（类型擦除），因此在运行时无法直接查询泛型类型。这意味着泛型仅提供编译时的类型检查，而在运行时，泛型变量和泛型方法的类型被当作它们的原始类型（如Object）处理。 

- C. 不能创建参数化类型的数组
   这是正确的。在Java中，你不能直接创建参数化类型的数组，例如`ArrayList<String>[]`。这是因为数组在创建时需要知道其元素的确切类型，而泛型类型在运行时是不可知的。然而，你可以创建一个数组，其元素是参数化类型的实例，例如`ArrayList<String>[] arrays = (ArrayList<String>[]) new ArrayList[10];`，但这种做法通常是不安全的，因为它会产生未检查的类型转换警告，并可能在运行时导致ClassCastException。 

- D. 可以直接对类型变量进行初始化
   这是错误的。在Java中，类型变量（即泛型类型参数）是抽象的，它们不是具体的类型，因此不能直接对它们进行初始化。相反，类型变量用于定义泛型类、接口或方法的类型参数，这些参数在实例化泛型类型或调用泛型方法时会被具体的类型参数所替代。 

作者：[神奇的安迪面试中](https://www.nowcoder.com/exam/test/90761363/submission?examPageSource=Intelligent&pid=63501319&testCallback=https%3A%2F%2Fwww.nowcoder.com%2Fexam%2Fintelligent%3FquestionJobId%3D10%26subTabName%3Dintelligent_page&testclass=软件开发)

---

- A:错误 如：`List<int> list = new ArrayList<>();` // 编译错误 必须使用包装类Integer

- B错误 如 `List<String> list1 = new ArrayList<>();`在运行时泛型已经被擦除变成`List list1 = new ArrayList<>(); `变成`Object`， 没有泛型了。所以获取不到`String` （注：两种情况可以运行时获取泛型：1.继承带有泛型的类 2.声明了带泛型的字段）

- C： 就是说不能创建带泛型的数组，原因是允许`Object[ ] a = String[ ] b`，编译通过。但是不允许`List<Object> c = List<String> d`，编译出错，两者没有继承关系。因此c和d如果是数组也不行
- D：错误，`List<T>`不能用T实例化对象

作者：[xk1002](https://www.nowcoder.com/exam/test/90761363/submission?examPageSource=Intelligent&pid=63501319&testCallback=https%3A%2F%2Fwww.nowcoder.com%2Fexam%2Fintelligent%3FquestionJobId%3D10%26subTabName%3Dintelligent_page&testclass=软件开发)

:::

---

---

---

::: info 11. java中下面哪个能创建并启动线程 (C)❌

```java
public class MyRunnable implements Runnable { 
    public void run()             { 
        //some code here 
    } 
}
```

A. `new Runnable(MyRunnable).start().`     B. `new Thread(MyRunnable).run()`

C. `new Thread(new MyRunnable()).start().`    D. `new MyRunnable().start()`

官方解析：创建并启动线程的过程为：`定义线程->实例化线程->启动线程`。

定义线程有两种方式，一种是继承java.lang.Thread类，一种是实现java.lang.Runnable接口。<u>这两种方式实例化线程区别在于，如果是继承了Thread类，直接new一个对象就可以了，如果是实现了Runnable接口的类，则需要用Thread的构造方法</u>：

`Thread(Runnable target)`

`Thread(Runnable target, String name)` 

`Thread(ThreadGroup group, Runnable target)`

`Thread(ThreadGroup group, Runnable target, String name)` 

`Thread(ThreadGroup group, Runnable target, String name, long stackSize)`

因此A、D两个选项实例化线程存在错误。B选项中new Runnable(MyRunnable)中的MyRunnable还没有实例化，会导致编译不通过，该选项无论后面是调用run()还是start()都是错误的。

:::

---

---

---

::: info 12. 对于文件的描述正确的是（ ）❌

A. `文本文件是以“.txt”为后缀名的文件，其他后缀名的文件是二进制文件。`

B. `File类是Java中对文件进行读写操作的基本类。`

C. `无论文本文件还是二进制文件，读到文件末尾都会抛出EOFException异常。`

D. `Java中对于文本文件和二进制文件，都可以当作二进制文件进行操作。`

官方解析：D选项正确，因为在Java中，所有文件在底层都是以字节形式存储的，因此无论是文本文件还是二进制文件，都可以当作二进制文件来处理。这也是为什么Java提供了统一的字节流类（如FileInputStream和FileOutputStream）来处理所有类型的文件。

分析其他选项：

- A错误：文件是否为文本文件与后缀名无关。文本文件是指内容以文本形式存储的文件，而不是简单地以后缀名来区分。例如，.java、.xml等后缀的文件也都是文本文件。

- B错误：File类是用于表示文件和目录路径名的类，它只能用于获取文件信息、创建或删除文件，而不能直接进行文件的读写操作。文件的读写需要使用IO流相关的类。

- C错误：对于文件读取到末尾的处理方式与文件类型无关。在使用字节流读取时，read()方法返回-1表示到达文件末尾；使用缓冲字符流读取时，readLine()方法返回null表示到达文件末尾。这些都不会抛出EOFException异常。EOFException通常只在使用DataInputStream等特定类时才会出现。

:::

::: info 13. 假如某个JAVA进程的JVM参数配置如下：`-Xms1G -Xmx2G -Xmn500M -XX:MaxPermSize=64M -XX:+UseConcMarkSweepGC -XX:SurvivorRatio=3`,请问eden区最终分配的大小是多少？ C

A. `64M` B. `500M` C.` 300M` D. `100M`

官方解析：要计算eden区大小,我们需要分析JVM参数配置:

-Xmn500M 指定了新生代大小为500M
-XX:SurvivorRatio=3 指定了eden区与survivor区的比例为3:1:1

计算步骤:
1. 新生代总大小为500M
2. SurvivorRatio=3表示eden:s0:s1=3:1:1
3. 将500M按照3:1:1分配
4. 总份数为5份(3+1+1)
5. 每份大小为500M/5=100M
6. eden区占3份,所以eden区大小为300M

所以C选项300M是正确答案。

分析其他选项:
- A. 64M是错误的,这个值是MaxPermSize(永久代最大值)的配置
- B. 500M是错误的,这是整个新生代(-Xmn)的大小
- D. 100M是错误的,这是一个survivor区的大小

这个计算过程涉及JVM内存分配的重要概念:
1. 新生代分为eden区和两个survivor区
2. SurvivorRatio决定了这三个区域的比例关系
3. eden区通常会占用新生代的较大部分,用于处理新创建的对象

知识点：Java、安卓工程师、2018、JavaSE

---

`Xms` 起始内存

`Xmx` 最大内存

`Xmn` 新生代内存

`Xss` 栈大小。 就是创建线程后，分配给每一个线程的内存大小

`-XX:NewRatio=n`:设置年轻代和年老代的比值。如:为3，表示年轻代与年老代比值为1：3，年轻代占整个年轻代年老代和的1/4

`-XX:SurvivorRatio=n`:年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5

`-XX:MaxPermSize=n`:设置持久代大小

收集器设置<br>
`-XX:+UseSerialGC`:设置串行收集器 <br>
`-XX:+UseParallelGC`:设置并行收集器<br>
`-XX:+UseParalledlOldGC`:设置并行年老代收集器<br>
`-XX:+UseConcMarkSweepGC`:设置并发收集器<br>
垃圾回收统计信息<br>
`-XX:+PrintGC`<br>
`-XX:+PrintGCDetails`<br>
`-XX:+PrintGCTimeStamps`<br>
` -Xloggc:filename`<br>
并行收集器设置<br>
`-XX:ParallelGCThreads=n`:设置并行收集器收集时使用的CPU数。并行收集线程数。<br>
`-XX:MaxGCPauseMillis=n`:设置并行收集最大暂停时间<br>
`-XX:GCTimeRatio=n`:设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)<br>
并发收集器设置<br>
`-XX:+CMSIncrementalMode`:设置为增量模式。适用于单CPU情况。<br>
`-XX:ParallelGCThreads=n`:设置并发收集器年轻代收集方式为并行收集时，使用的CPU数。并行收集线程数。<br>

---

1. **前缀区分**

   - `-X` 开头 → 基本内存设置（常用基础参数）
   - `-XX` 开头 → 高级/实验参数（细粒度控制）

2. **缩写含义**

   - `ms = memory start` → 起始堆内存
   - `mx = memory max` → 最大堆内存
   - `mn = memory new` → 新生代
   - `ss = stack size` → 栈大小

   基本上 `ms / mx / mn / ss` 都是 **内存相关**。

3. **比例参数**

   - `NewRatio` → 新生代和老年代的比例
   - `SurvivorRatio` → 新生代里 Eden 和 Survivor 的比例

   记忆口诀：**New 老中比例，Survivor 新生里分配。**

4. **GC 收集器**

   - **Serial** → 串行，单线程，简单
   - **Parallel** → 并行，追求吞吐量
   - **ParallelOld** → 老年代的并行版
   - **CMS** (Concurrent Mark-Sweep) → 并发，追求低延迟

   口诀：

   - **Serial**：简单但慢
   - **Parallel**：多核提速
   - **CMS**：低延迟

5. **日志参数**

   - `PrintGC` → 打印 GC
   - `Details` → 细节
   - `TimeStamps` → 时间戳
   - `Xloggc:file` → 日志写文件

   记忆方式：像“开 debug 日志”，一层层加细节。

👉 **堆内存：ms 启动，mx 最大，mn 新生，ss 栈**
 👉 **比例：New 新生老比例，Survivor 新生里划分**
 👉 **GC：Serial 串行，Parallel 并行，CMS 并发低延迟**
 👉 **日志：PrintGC 打印，Details 更细，TimeStamps 加时间，Xloggc 输出文件**

:::

::: info 14. 对于构造方法，下列叙述正确的是（ ACD）。❌

A. `构造方法的优先级一般比代码块低` B. `构造方法的返回类型只能是void型。`

C. `构造方法的主要作用是完成对类的对象的初始化工作` D. `一般在创建新对象时，系统会自动调用构造方法。`

官方解析：让我们逐个分析构造方法的特性：

- A选项正确：构造方法的执行顺序确实比代码块晚。在Java中，执行顺序是：静态代码块 > 普通代码块 > 构造方法。

- B选项错误：构造方法没有返回类型，连void都不能写。这是构造方法的重要特征之一，它与普通方法的区别就在于此。

- C选项正确：构造方法的主要职责就是初始化对象的状态，包括为对象的成员变量赋初值，执行必要的初始化操作等。这是构造方法存在的核心目的。

- D选项正确：当使用new关键字创建对象时，Java虚拟机会自动调用相应的构造方法。这是Java对象创建过程的标准流程。

因此ACD正确。总结来说：
1. 构造方法在代码块之后执行
2. 构造方法用于对象初始化
3. 构造方法在new对象时自动调用
4. 构造方法没有返回值类型（不是void，而是完全没有）
5. 构造方法的名称必须与类名相同

这些特性共同构成了Java构造方法的完整概念。
:::

::: info 15. 下列说法错误的有（`ABCD` ）❌

A. `Java面向对象语言容许单独的过程与函数存在 `B.` Java面向对象语言容许单独的方法存在`

C. `Java语言中的非静态方法属于类中的成员（member）` D. `Java语言中的方法必定隶属于某一类（对象），调用方法与C语言的过程或C++语言的函数相同`

官方解析：在Java中，以下说法错误的有 A、B、C、D。具体分析如下：

选项解析

1. A. Java面向对象语言容许单独的过程与函数存在 <br>
   • 错误。Java是纯面向对象语言，所有代码必须定义在类中，不存在独立的“过程”或“函数”。

2. B. Java面向对象语言容许单独的方法存在 <br>
   • 错误。方法必须隶属于类或对象，不能单独存在。

3. C. Java语言中的非静态方法属于类中的成员（member） <br>
   • 错误。非静态方法属于实例成员（对象），而静态方法才属于类成员。

4. D. Java语言中的方法必定隶属于某一类（对象），调用方法与C语言的过程或C++语言的函数相同 <br>
   • 错误。虽然Java方法必须属于类或对象，但调用方式与C/C++不同：

   ◦ Java需通过类名（静态方法）或对象（实例方法）调用。

   ◦ C/C++允许独立调用函数或过程。

总结: 所有选项均错误。Java的严格面向对象特性要求方法必须定义在类中，且调用方式与C/C++存在本质区别。

知识点：2014、Java、Java工程师

:::

::: info 16 下列说法正确的是（AB）？❌

A. `对于局部内部类，只有在方法的局部变量被标记为final或局部变量是effctively final的，内部类才能使用它们`

B. `成员内部类位于外部类内部，可以直接调用外部类的所有方法（静态方法和非静态方法）`

C. `由于匿名内部类只能用在方法内部，所以匿名内部类的用法与局部内部类是一致的`

D. `静态内部类可以直接访问外部类的非静态成员`

官方解析：

- 选项A正确。对于局部内部类来说，如果它需要访问方法中的局部变量，这些变量必须是final或者effectively final的。这是因为局部内部类的生命周期可能会超过方法的调用期，为了保证数据一致性和安全性，要求被访问的局部变量不能被修改。

- 选项B正确。成员内部类作为外部类的一个成员，可以访问外部类的所有成员（包括私有成员），无论是静态还是非静态的方法和属性都可以直接调用。这是因为成员内部类与外部类有着特殊的关联关系。

- 选项C错误。<u>虽然匿名内部类确实经常用在方法内部，但它的使用场景和局部内部类并不完全一致</u>。匿名内部类可以用在任何需要创建类实例的地方，比如作为参数传递，而且它不需要显式定义类名。

- 选项D错误。静态内部类是外部类的一个静态成员，遵循静态成员的一般规则。静态内部类不能直接访问外部类的非静态成员，因为静态内部类在创建时不需要依赖外部类的实例。要访问外部类的非静态成员，需要先创建外部类的实例。

总的来说，这道题主要考察了Java中各种内部类的特性和使用规则，包括局部内部类对局部变量的访问限制、成员内部类对外部类成员的访问权限、匿名内部类的使用场景以及静态内部类的访问规则。

知识点：Java

![img](/images/java-notes/3807435_1530425536125_D49BCBCCF82CF58C566E12F1E3130070.png)

:::

::: info 17.在Java语言中，下列关于字符集编码（Character set encoding）和国际化（i18n）的问题，哪些是正确的？(CD)❌

A. `每个中文字符占用2个字节，每个英文字符占用1个字节`

B. `假设数据库中的字符是以GBK编码的，那么显示数据库数据的网页也必须是GBK编码的。`

C. `Java的char类型，通常以UTF-16 Big Endian的方式保存一个字符。`

D. `实现国际化应用常用的手段是利用ResourceBundle类`

官方解析：这道题目考察了Java中字符编码和国际化的相关知识点。

- 选项C正确：Java中的char类型确实是使用UTF-16编码的,默认采用Big Endian字节序。每个char固定占用2个字节(16位),可以表示基本多语言平面(BMP)中的所有字符。

- 选项D正确：ResourceBundle是Java国际化最常用的工具类,它可以根据不同的Locale加载相应的资源文件,实现应用程序的多语言支持。通过ResourceBundle可以方便地管理不同语言的文本资源。

分析错误选项：

- A错误：字符占用的字节数与具体的编码方案有关。在UTF-8编码中,英文字符占1个字节,而中文字符通常占3个字节；在GBK编码中,英文字符占1个字节,中文字符占2个字节。不能一概而论。

- B错误：数据库编码与网页编码可以不同。只要在读取数据时正确指定编码方式进行解码,再按照网页编码重新编码,就可以正确显示。这种编码转换在程序中是很常见的操作。

因此,综上所述选项CD是正确答案。这提醒我们在处理字符编码时要注意具体使用的编码方案,并在需要时进行适当的编码转换。同时在开发国际化应用时,ResourceBundle是一个很好的工具选择。

知识点：Java

:::

## 2025-08-27

::: info 18. 存根（Stub）与以下哪种技术有关?(B)❌

A. `交换` B.` 动态链接` C. `动态加载` D. `磁盘调度`

官方解析：存根(Stub)是一种与`动态链接技术`密切相关的程序代码。当程序需要调用动态链接库中的函数时,存根代码充当了程序和实际函数之间的桥梁,负责完成函数调用的重定向工作。

选项分析:
B正确:存根代码是动态链接的重要组成部分。当程序调用动态链接库中的函数时,存根代码会在运行时完成函数地址的重定位,建立实际的函数调用链接。

其他选项错误原因:
- A. 交换与进程/内存管理相关,与存根技术无关
- C. 动态加载虽然也涉及运行时加载,但更侧重于程序整体的加载过程,而非函数调用的重定向
- D. 磁盘调度是操作系统进行磁盘访问优化的技术,与存根完全无关

存根在动态链接中起着关键作用:
1. 提供间接调用层,隐藏了实际函数地址的细节
2. 支持运行时地址重定位
3. 实现了程序与动态链接库之间的解耦
4. 便于库函数的版本管理和更新

知识点：Java

:::

---

---

---

::: info 19. 下面关于Java 中 yield 和 sleep 方法说法正确的是（B）❌

A. `yield 方法会导致当前线程暂停指定的时间，同时也会导致 CPU 时间片的消耗`

B. `sleep 方法会导致当前线程暂停指定的时间，不会导致 CPU 时间片的消耗`

C. `yield 方法调用后当前线程一定会让出 CPU 时间，而导致线程上下文切换`

D. `yield 方法执行后，会使 running 状态的线程变为 waiting 状态.`

官方解析：【答案】B

【考察点】yield 和sleep 方法

【解析】yield 方法调用后，CPU 调度器有可能忽略该提示指令，如果这样的话，此时当前线程继续占用CPU时间片，否则当前线程会让出CPU时间片，导致线程上线文切换，执行yield方法由运行状态变为就绪状态，让OS再次选择线程。因此yield 方法无法确定调用后线程的状态。

知识点：Java

- A：yield不能指定暂停的具体时间，可能会继续消耗（没让出去就继续跑） 

- B：正确（sleep睡了 不会消耗cpu时间片） 

- C：yield方法不一定会让出cpu，尝试让去 不保证 

- D：yield方法执行后，会使running状态的线程变为runnable状态 

作者：[学不会学不会学不会](https://www.nowcoder.com/exam/test/90795156/submission?pid=63524052&testCallback=https%3A%2F%2Fwww.nowcoder.com%2Fexam%2Ftest%2F90794284%2Fsubmission%3FexamPageSource%3DIntelligent%26pid%3D63523480%26testCallback%3Dhttps%3A%2F%2Fwww.nowcoder.com%2Fexam%2Fintelligent%3FquestionJobId%3D10%26subTabName%3Dintelligent_page%26testclass%3D软件开发)

:::

::: info 20.@SuppressWarnings(“deprecation”)的功能是什么？()✅

A. `屏蔽不赞同使用的类和方法的警告`

B. `屏蔽在强制类型转换的时候编译器给出的警告`

C. `关闭所有警告信息`

D. `当在可序列化的类上缺少serialVersionUID定义的警告`

官方解析：`@SuppressWarnings("deprecation")`是Java中的一个注解,用于告诉编译器忽略代码中使用已过时的类和方法时产生的警告信息。A选项正确地描述了这个注解的主要功能。

分析其他选项：
- B错误：屏蔽强制类型转换警告使用的是`@SuppressWarnings("unchecked")`
- C错误：关闭所有警告信息使用的是`@SuppressWarnings("all")`
- D错误：序列化警告的抑制使用的是`@SuppressWarnings("serial")`

补充说明：
1. @SuppressWarnings注解可以接受不同的参数值来抑制不同类型的警告
2. "deprecation"参数专门用于处理代码中使用了被@Deprecated标记的过时API时的警告
3. 这个注解的使用场景通常是：
- 在必须使用某些过时API的场合
- 在过渡期间，还未来得及修改使用新API时
- 为了保持对旧版本的兼容性

使用这个注解需要谨慎，因为过时的API通常意味着在未来的版本中可能会被移除或者存在更好的替代方案。建议在可能的情况下使用推荐的新API来替代过时的API。

知识点：Java

:::

::: info 21. 在 Java 中，下列语句可运行有误的是（AD）❌

A. `short s = 2;s = s + 2;`

B. `short s = 2;s += 2;`

C. `short s = 2;s++;`

D. `short s = 2;s = s + (short)2;`

官方解析：

Java中小于int精度的计算都会自动转换为int计算。A和D选项等号右边的表达式计算结果都为int型，所以会报错。B选项隐式地包含了类型的强制转换，C选项也不会报错。

知识点：Java

- A:  s = s + 2; //  右边的s会自动提升为int --->  short = int + int
- B:  s += 2; //  等价于  s = (short) (s + 2)  
- C:  ++或--操作 会做特殊处理--->自动转为原类型short
- D:  s = s + (short)2; //  右边是int + int  左边是short 需要强转

总结：在 Java 中，只要是**参与加、减、乘、除运算的整数类型**，**如果是byte、short或char，都会自动被提升为int**！ ... 

作者：[xk1002](https://www.nowcoder.com/exam/test/90795156/submission?pid=63524052&testCallback=https%3A%2F%2Fwww.nowcoder.com%2Fexam%2Ftest%2F90794284%2Fsubmission%3FexamPageSource%3DIntelligent%26pid%3D63523480%26testCallback%3Dhttps%3A%2F%2Fwww.nowcoder.com%2Fexam%2Fintelligent%3FquestionJobId%3D10%26subTabName%3Dintelligent_page%26testclass%3D软件开发)

:::

---

---

---

::: info 22. 在java中，无论在何处调用，使用静态属性必须以类名做前缀。(错误)❌

官方解析：在Java中，静态属性可以使用类名作为前缀来访问，但这不是必须的。静态属性还可以直接在本类中访问，或者通过对象引用来访问（虽然不推荐）。

例如，假设有一个类Student：
```java
class Student {
public static int count = 0;
  public void method() {
    count++; // 直接访问静态属性
    Student.count++; // 使用类名访问
    Student s = new Student();
    s.count++; // 通过对象引用访问（不推荐）
  }	
}
```
虽然使用类名作为前缀来访问静态属性是一种良好的编程习惯，可以提高代码的可读性和可维护性，但这并不是Java语法所强制要求的。这就是为什么选项A"必须以类名做前缀"的说法是错误的。

开发中推荐使用类名访问静态属性的原因是：
1. 代码更清晰，明确表明这是一个静态成员
2. 避免与实例变量产生混淆
3. 符合面向对象编程的规范

所以B选项"错误"是正确答案。

知识点：Java
:::

::: info 23. 下面 Java 代码的运行结果为（）✅

`System.out.println(Math.round(10.5) + Math.round(-10.5));`

A. `0` B. `1` C. `-1` D. `21`

1. **四舍五入与取整**

| 方法                   | 描述                                 | 示例                        |
| ---------------------- | ------------------------------------ | --------------------------- |
| `Math.round(double a)` | 四舍五入到最接近的 long              | `Math.round(10.5) → 11`     |
| `Math.round(float a)`  | 四舍五入到最接近的 int               | `Math.round(-10.5f) → -10`  |
| `Math.ceil(double a)`  | 向上取整（大于或等于参数的最小整数） | `Math.ceil(10.1) → 11.0`    |
| `Math.floor(double a)` | 向下取整（小于或等于参数的最大整数） | `Math.floor(-10.1) → -11.0` |

2. **绝对值和符号**

| 方法                                            | 描述                         | 示例                       |
| ----------------------------------------------- | ---------------------------- | -------------------------- |
| `Math.abs(int a)` / `long` / `float` / `double` | 返回绝对值                   | `Math.abs(-5) → 5`         |
| `Math.signum(double a)`                         | 返回符号：正 1，负 -1，0 → 0 | `Math.signum(-3.5) → -1.0` |

3. **幂运算与开方**

| 方法                           | 描述        | 示例                   |
| ------------------------------ | ----------- | ---------------------- |
| `Math.pow(double a, double b)` | a 的 b 次幂 | `Math.pow(2, 3) → 8.0` |
| `Math.sqrt(double a)`          | 平方根      | `Math.sqrt(9) → 3.0`   |
| `Math.cbrt(double a)`          | 立方根      | `Math.cbrt(27) → 3.0`  |

4. **三角函数**

| 方法                         | 描述         | 示例                            |
| ---------------------------- | ------------ | ------------------------------- |
| `Math.sin(double a)`         | 正弦（弧度） | `Math.sin(Math.PI/2) → 1.0`     |
| `Math.cos(double a)`         | 余弦（弧度） | `Math.cos(0) → 1.0`             |
| `Math.tan(double a)`         | 正切（弧度） | `Math.tan(Math.PI/4) → 1.0`     |
| `Math.toRadians(double deg)` | 角度转弧度   | `Math.toRadians(180) → π`       |
| `Math.toDegrees(double rad)` | 弧度转角度   | `Math.toDegrees(Math.PI) → 180` |

5. **最大值/最小值 & 随机数**

| 方法             | 描述                              | 示例                           |
| ---------------- | --------------------------------- | ------------------------------ |
| `Math.max(a, b)` | 返回最大值                        | `Math.max(3, 7) → 7`           |
| `Math.min(a, b)` | 返回最小值                        | `Math.min(3, 7) → 3`           |
| `Math.random()`  | 返回 [0.0, 1.0) 之间的随机 double | `Math.random() → 0.0 ~ 0.999…` |

:::

::: info 24.Java 中，下面哪些异常类属于运行期异常（AC）❌

A. `NullPointerException` B. `IOException`

C. `ArithmeticException` D. `NoSuchMethodException`

官方解析：在Java中的异常分为两大类:编译时异常(checked exception)和运行时异常(runtime exception)。AC选项正确，因为：

1. A选项NullPointerException是典型的运行时异常，它继承自RuntimeException类，当应用程序试图在需要对象的地方使用null时抛出。

2. C选项ArithmeticException也是运行时异常，它同样继承自RuntimeException类，典型场景是除数为零的情况。

分析错误选项：

1. B选项IOException是编译时异常，它直接继承自Exception类而不是RuntimeException。编译器会强制要求程序员必须进行异常处理（使用try-catch或throws声明）。

2. D选项NoSuchMethodException也是编译时异常，通常在反射操作中使用某个不存在的方法时抛出，它需要在编译期就处理。

补充说明：
- 运行时异常都是RuntimeException类及其子类
- 运行时异常不需要显式处理，编译器不会强制要求
- 运行时异常通常由程序逻辑错误引起，应该通过修改代码来避免

这种区分有助于在编码时确定哪些异常必须处理，哪些可以通过良好的编程习惯来避免。

知识点：Java

```bash
// ================== 编译时异常（Checked Exception） ==================
// 特点：必须 try-catch 或 throws，否则编译报错
IOException
    └─ FileNotFoundException
SQLException
ClassNotFoundException
NoSuchMethodException
InstantiationException
IllegalAccessException
InterruptedException

// ================== 运行时异常（Runtime Exception） ==================
// 特点：编译器不强制处理，运行时可能抛出
NullPointerException
ClassCastException
ArrayIndexOutOfBoundsException
StringIndexOutOfBoundsException
ArithmeticException
ConcurrentModificationException
NoSuchElementException
IllegalArgumentException
IllegalStateException
```

:::

---

---

---

::: info 25. 下面关于 Java 中异常处理的说法错误的是（C）❌

A. `可以使用 try-catch-finally 块来捕获和处理异常` B. `可以使用 throws 关键字来声明方法可能抛出的异常`

C. `运行期异常不需要进行捕获或者声明` D. `编译期异常需要在代码中显式地进行异常处理`

官方解析：在Java异常处理机制中,运行时异常(RuntimeException)同样需要进行适当的处理,C选项的说法是错误的。虽然运行时异常在语法上不强制要求必须处理,但为了程序的健壮性和可靠性,也应当对其进行合理的捕获和处理。

分析其他选项：

- A正确:try-catch-finally是Java中最基本的异常处理结构,try块中包含可能抛出异常的代码,catch块用于捕获和处理特定类型的异常,finally块中的代码无论是否发生异常都会执行。

- B正确:throws关键字用于在方法声明中指明该方法可能抛出的异常类型,这是Java异常处理机制的一个重要组成部分。

- D正确:编译期异常(checked exception)必须在代码中通过try-catch显式捕获或者通过throws声明,否则代码将无法通过编译。这是Java编译器的强制要求。

总的来说,不论是运行时异常还是编译期异常,都建议在代码中进行适当的异常处理,这样可以提高程序的稳定性和用户体验。

知识点：Java

:::

::: info 26. 执行下列代码的输出结果是(`30`) ❌

```java
public class Demo{
　public static void main(String args[]){
　　　int num = 10;
　　　System.out.println(test(num));
}
public static int test(int b){
　　　try{
　　　　b += 10;
　　　　return b;
　　　}
　　　catch(RuntimeException e){}
　　　catch(Exception e2){}
　　　finally{
　　　　b += 10;
　　　　return b;
　　　}
　　}
}
```

官方解析：这道题目考察了Java中try-catch-finally语句块的执行流程以及返回值的确定机制。

代码执行过程分析:
1. main方法中调用test方法,传入num=10
2. 在test方法中,try块先执行 b+=10,此时b=20
3. try块中的return b未能真正返回,因为finally块必定执行
4. finally块执行 b+=10,此时b=30
5. finally块中的return b是最终实际返回的值

所以最终输出结果是30,C选项正确。

分析其他选项:

- A(10)错误:这是初始值,代码中经过了两次+=10操作,不可能返回初始值
- B(20)错误:这只是try块中第一次+=10后的值,未考虑finally块的执行
- D(40)错误:代码只进行了两次+=10操作,不可能得到40

重要知识点:
1. finally块一定会执行
2. 当try和finally块都有return语句时,finally块的return会覆盖try块的return
3. finally块主要用于资源清理,通常应避免在finally块中使用return语句,因为这会掩盖try块中的返回值

知识点：Java、JavaSE

注意⚠️：`如果finally块中有return语句的话，它将覆盖掉函数中其他return语句。`

:::

::: info 27. java如何返回request范围内存在的对象？(B)❌

A. `request.getRequestURL()` B.` request.getAttribute()`

C. `request.getParameter()` D. `request.getWriter()`

官方解析：request.getAttribute()方法是从request范围内获取存储对象的标准方法。在JavaWeb开发中,我们可以使用request.setAttribute()方法在request作用域中存储对象,然后通过getAttribute()方法获取这些对象。

分析其他选项:

- A. request.getRequestURL() - 该方法返回客户端请求的完整URL,而不是获取request范围内存储的对象。

- C. request.getParameter() - 该方法用于获取HTTP请求参数的值,通常用于获取表单提交的数据或URL中的查询参数,不是用来获取request范围内存储的对象。

- D. request.getWriter() - 该方法返回一个PrintWriter对象,用于向客户端发送字符响应,与获取request范围内的对象无关。

使用request.getAttribute()的典型场景是:
1. 在Servlet中通过setAttribute()存储数据
2. 在转发到JSP之前保存处理结果
3. 在同一个请求范围内的不同组件之间传递数据

需要注意的是,request范围的对象只在当前请求周期内有效,请求结束后对象就会被销毁。

```java
// 1. 获取请求相关信息
String method = request.getMethod();          // 获取请求方式：GET / POST
String uri = request.getRequestURI();         // 获取请求的资源路径
String url = request.getRequestURL().toString(); // 获取完整的请求URL
String query = request.getQueryString();      // 获取请求参数部分 ?a=1&b=2

// 2. 获取请求参数（前端 form 或 query string 提交的数据）
String value = request.getParameter("name");  // 获取单个参数
String[] values = request.getParameterValues("hobby"); // 获取多个值
Map<String, String[]> map = request.getParameterMap(); // 获取所有参数

// 3. request 域属性操作（在一次请求转发中共享数据）
request.setAttribute("key", obj);   // 保存对象到 request 域
Object obj = request.getAttribute("key"); // 从 request 域获取对象
request.removeAttribute("key");     // 删除 request 域中的对象

// 4. 获取头信息
String agent = request.getHeader("User-Agent"); // 获取请求头
Enumeration<String> names = request.getHeaderNames(); // 获取所有头字段名

// 5. 获取客户端信息
String ip = request.getRemoteAddr();   // 客户端 IP
int port = request.getRemotePort();    // 客户端端口
String host = request.getRemoteHost(); // 客户端主机名

// 6. 其他常用
BufferedReader reader = request.getReader();  // 获取请求体字符流
ServletInputStream in = request.getInputStream(); // 获取请求体字节流
```

知识点：Java

:::

::: info 28. 从以下哪一个选项中可以获得Servlet的初始化参数?(C)❌

A. `Servlet` B. `ServletContext` C. `ServletConfig` D. `GenericServlet`

官方解析： ServletConfig是用于获取Servlet初始化参数的标准接口。每个Servlet都有自己的ServletConfig对象,可以通过init()方法获得。开发者可以在web.xml中通过标签为Servlet配置初始化参数,然后在代码中通过ServletConfig的getInitParameter()方法获取这些参数值。

分析其他选项:

- A. Servlet错误:Servlet是一个接口,定义了Servlet的基本行为,本身不能获取初始化参数。

- B. ServletContext错误:ServletContext用于获取整个Web应用程序的配置信息和共享数据,而不是专门用于获取Servlet的初始化参数。虽然也可以通过它获取上下文参数,但这些是应用级别的,不是Servlet级别的初始化参数。

- D. GenericServlet错误:GenericServlet是一个抽象类,实现了Servlet接口。虽然它内部会使用ServletConfig,但它本身不是获取初始化参数的直接来源。它是通过持有的ServletConfig实例来间接获取初始化参数的。

因此C选项ServletConfig是获取Servlet初始化参数的标准方式和正确答案。这也体现了Java Servlet规范中关于初始化参数处理的设计理念。

知识点：Java、JavaSE

:::

---

---

---

::: info 29. 下面关于 Java 中 this 关键字的说法正确的是（ABC）❌

A. `this 可以用来访问本类中的普通成员变量`

B. `this 可以调用本类中的普通成员方法和构造方法`

C. `this 关键字用于引用当前对象的实例`

D. `this 可以用来调用本类中的静态方法和静态变量`

官方解析：this关键字是Java中的一个重要概念,用于引用当前对象的实例。选项ABC都是正确的。

具体分析如下:

- A正确: this关键字可以用来访问当前类的普通成员变量。例如在构造方法或普通方法中,可以使用this.name来访问类的name成员变量,这样可以明确区分成员变量和局部变量。

- B正确: this可以调用本类的成员方法和构造方法。在一个构造方法中可以使用this()调用其他构造方法;在普通方法中可以使用this.methodName()调用其他成员方法。

- C正确: this是对当前对象的引用,代表当前正在执行的对象实例。在实例方法中,this总是指向调用该方法的对象。

- D错误: this不能用来调用静态方法和静态变量。因为静态成员属于类,不属于对象实例,所以不能通过this来访问。静态成员应该通过类名来访问,如ClassName.staticMethod()。

使用this关键字的主要目的是:
1. 区分同名的局部变量和成员变量
2. 在构造方法中调用其他构造方法
3. 将当前对象作为参数传递给其他方法
4. 返回当前对象的引用

知识点：Java

`PS:我觉得D可以，但是强烈不推荐`

:::

::: info 30. java8中，忽略内部接口的情况，不能用来修饰interface里的方法的有（ AC）❌

A. `private` B. `public` C. `protected` D. `static`

官方解析：在Java 8中的interface中定义方法时，有特定的访问权限和修饰符规则。AC选项是正确答案，因为这两个修饰符确实不能用于接口方法。

具体分析：

1. private（A正确）：
- 在Java 8中，接口中的方法不能使用private修饰符
- 接口方法默认是public的，目的是为了保证实现类可以访问和重写这些方法
- 注：在Java 9及以后的版本中才允许在接口中使用private方法

2. protected（C正确）：
- protected修饰符不能用于接口方法
- 因为接口是用来定义公共行为的，而protected表示继承范围内的访问权限，这与接口的设计理念相违背

3. public（B错误）：
- public是接口方法的默认访问级别
- 即使不显式声明，接口中的方法也默认是public的
- 可以显式使用public来修饰接口方法

4. static（D错误）：
- Java 8允许在接口中定义静态方法
- static方法可以在接口中使用，用于提供工具类性质的功能
- 接口的静态方法必须有具体的实现

总结：接口方法的修饰符使用有严格限制，主要是为了保持接口作为行为契约的纯粹性和公开性。在Java 8中，接口方法可以是public、default、static，但不能是private或protected。

知识点：2014、Java、Java工程师

:::

::: info 31. 以下关于 Java 中 synchronized 锁和 ReentrantLock 锁说法错误的是（A）❌

A. `synchronized 锁不可锁重入，ReentrantLock 锁可以锁重入`

B. `synchronized 锁是非公平锁，而 ReentrantLock 锁可以实现公平锁`

C. `synchronized 锁不能被打断，而 ReentrantLock 锁可以被打断`

D. `synchronized 锁不支持多个条件变量，而 ReentrantLocK 锁支持多个条件变量`

官方解析：

- 选项A错误，synchronized锁和ReentrantLock锁都可以锁重入。
- 选项B正确，synchronized锁是非公平锁，而ReentrantLock可以通过修改参数来实现公平锁。
- 选项C正确，synchronized不能被主动打断，而ReentrantLock锁可以。
- 选项D正确，synchronized不支持多个条件变量，而ReentrantLocK可以调用newCondition方法实现多个条件变量。

知识点：Java

1. 基本概念

| 特性      | `synchronized`                         | `ReentrantLock`                          |
| --------- | -------------------------------------- | ---------------------------------------- |
| 类型      | 内置锁（JVM 提供）                     | 显式锁（java.util.concurrent 提供）      |
| 可重入    | ✅ 支持                                 | ✅ 支持                                   |
| 可中断    | ❌ 不可中断                             | ✅ 可中断 (`lockInterruptibly()`)         |
| 公平性    | ❌ 不可公平                             | ⚪ 可选择公平锁或非公平锁（构造函数指定） |
| 等待/通知 | ✅ 支持 (`wait()/notify()/notifyAll()`) | ✅ 支持 (`Condition`)                     |
| 自动释放  | ✅ 方法或代码块结束自动释放             | ❌ 需要手动 `unlock()`，否则可能死锁      |

2. 使用方式

synchronized

```java
// 修饰方法
public synchronized void method() { ... }

// 修饰代码块
synchronized(this) {
    // 需要加锁的代码
}
```

ReentrantLock

```java
ReentrantLock lock = new ReentrantLock();

// 加锁 - 最常用
lock.lock();
try {
    // 需要加锁的代码
} finally {
    lock.unlock();  // 必须在 finally 中释放锁
}

// 可中断锁
lock.lockInterruptibly();

// 尝试加锁，不阻塞
if (lock.tryLock()) {
    try { ... } finally { lock.unlock(); }
}
```

:::

::: info 32.下面哪个语句是创建数组的正确语句？( )

A. `float f[][] = new float[6][6];`

B. `float []f[] = new float[6][6];`

C. `float f[][] = new float[][6];`

D. `float [][]f = new float[6][6];`

E. `float [][]f = new float[6][];`

官方解析：

在Java中创建二维数组有多种语法形式,ABDE都是合法的数组声明和创建方式。让我们逐个分析:

A选项 正确: 这是最常见的二维数组声明方式,数组维度符号[][]可以放在变量名后面。

B选项正确: Java允许将第一个维度符号放在类型和变量名之间,第二个维度符号放在变量名后面。

C选项错误: 创建数组时必须指定第一维度的大小,不能只指定第二维度的大小。这种语法是非法的。

D选项正确: 这种写法将维度符号都放在类型和变量名之间,是标准的数组声明方式。

E选项正确: 这是创建不规则数组(交错数组)的方式,只指定第一维度的大小,第二维度的大小可以动态指定。

总的来说,Java在数组声明语法上比较灵活,维度符号可以放在类型和变量名之间,也可以放在变量名后面,或者混合使用。<u>`唯一的要求是在创建数组时必须至少指定第一维度的大小。`</u>选项C错误是因为违反了这个基本规则。

知识点：Java

:::

::: info 33. 类之间存在以下几种常见的关系：()

A. `“USES-A”关系` B. `“HAS-A”关系` C. `“IS-A”关系` D. `“INHERIT-A”关系`

官方解析：在面向对象设计中,主要存在三种基本的类关系："USES-A"(使用关系)、"HAS-A"(组合关系)和"IS-A"(继承关系)。这三种关系构成了面向对象设计的基础。

分析每个选项：

- A."USES-A"关系是正确的。这种关系表示一个类使用另一个类的服务,但两个类之间是松散耦合的。例如,当一个类的方法使用另一个类的对象作为参数或返回值时。

- B."HAS-A"关系是正确的。这种关系表示一个类包含另一个类的实例作为其成员变量,表示整体与部分的关系。例如,汽车类中包含引擎类的实例。

- C."IS-A"关系是正确的。这种关系表示继承关系,一个类是另一个类的特殊化。例如,猫类继承自动物类,表示猫是一种动物。

- D."INHERIT-A"关系是错误的。在面向对象设计中并没有"INHERIT-A"这个专门的术语,继承关系已经由"IS-A"关系表示了。这个选项是冗余且不准确的。

因此,ABC三个选项准确描述了面向对象中的三种基本类关系,而D选项是不恰当的表述。

知识点：Java

:::



## 总结

### 扩充相关

::: info 扩充相关

#### 1. ArrayList

- **默认初始容量**：10
- **扩容机制**：当 `size == capacity` 时，会扩容为 **原容量的 1.5 倍**（`newCapacity = oldCapacity + oldCapacity >> 1`）。
- **避免扩容开销**：通过构造函数 `new ArrayList<>(initialCapacity)` 预估初始容量。
- **扩容代价**：底层是数组，扩容会进行 **新数组分配 + 数据拷贝**，因此扩容是 **O(n)** 的操作。

------

#### 2. HashMap

- **默认初始容量**：16（必须是 2 的幂）。
- **负载因子**：0.75（即元素数量超过 16 × 0.75 = 12 时触发扩容）。
- **扩容机制**：容量扩为原来的 **2 倍**，并进行 **rehash（重新计算 hash 桶位置）**。
- **代价**：扩容时需要 **重新分配桶数组**，并且将所有节点重新挂载，开销大。

------

#### 3. HashSet

- **底层实现**：基于 HashMap（只存 `key`，`value` 用一个固定对象 `PRESENT` 占位）。
- **扩容机制**：和 HashMap 一致（容量 ×2，负载因子 0.75）。

------

#### 4. Hashtable

- **默认初始容量**：11。
- **负载因子**：0.75（即元素数量超过 11 × 0.75 = 8.25 时触发扩容）。
- **扩容机制**：当元素数量超过 `容量 × 负载因子` 时，容量扩为 **2n + 1**。
- **与 HashMap 区别**：线程安全（方法加锁），但扩容策略不同。

------

#### 5. ConcurrentHashMap

- **JDK7**：分段锁（Segment 数组），扩容时逐段扩展。
- **JDK8**：取消分段锁，改为 **CAS + synchronized**；扩容与 HashMap 类似，也是容量翻倍，但采用 **渐进式扩容**（迁移数据时允许并发完成）。

------

#### 6. StringBuilder / StringBuffer

- **底层存储**：char[]（JDK9 之后是 byte[] + coder）。
- **默认初始容量**：16。
- **扩容机制**：扩容为 **原容量 ×2 + 2**。
- **建议**：如果大致知道要拼接的字符串大小，使用 `new StringBuilder(int capacity)` 可以避免多次扩容。

------

#### 7. PriorityQueue

- **默认初始容量**：11。
- **扩容机制**：容量不足时，扩容为 **原容量 ×1.5**。

------

#### 8. Vector

- **默认初始容量**：10。
- **扩容机制**：如果没有设置 `capacityIncrement`，则扩容为 **2 倍**；否则扩容为 **oldCapacity + capacityIncrement**。
- **线程安全**（方法加锁），但性能不如 ArrayList。

------

#### 9. 数据库连接池（例如 HikariCP、Druid）

- **连接池大小**：通常有 `minIdle`（最小连接数）、`maxPoolSize`（最大连接数）。
- **扩容机制**：当连接数不足时，会新建连接直到上限。
- **代价**：频繁扩容会增加数据库连接压力，最好合理配置池大小。

------

#### 10. 缓存（Redis、Guava Cache）

- **Redis**：字典（哈希表）扩容时会触发 **渐进式 rehash**，避免一次性卡顿。
- **Guava Cache**：底层基于 ConcurrentHashMap，同样会有扩容逻辑。

:::

### 创建对象方式

- new操作符适用于普通对象创建
- 反射方式适用于动态加载场景
- clone方式适用于对象复制场景
- 反序列化方式适用于数据传输场景

```bash
使用new操作符创建对象是最基本也是最常用的方式。例如:
Student student = new Student();
这种方式直接调用构造方法创建对象,简单直接。

通过反射机制创建对象是一种动态创建对象的方式。可以通过以下两种方式:
- Class类的newInstance()方法
- Constructor类的newInstance()方法
这种方式的优点是可以动态加载类并创建对象。

clone()方法是Object类的一个protected方法,可以创建一个对象的副本。使用这种方式需要:
- 实现Cloneable接口
- 重写clone()方法
这种方式的特点是可以快速复制一个已有对象。

通过反序列化方式创建对象是指:
将之前序列化到磁盘的对象数据重新读取并转换成对象。需要:
- 类实现Serializable接口
- 使用ObjectInputStream的readObject()方法
这种方式常用于网络传输或持久化场景。
```

