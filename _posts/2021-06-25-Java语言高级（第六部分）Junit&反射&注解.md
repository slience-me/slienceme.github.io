---
layout: post
title: Java｜Java语言高级（第六部分）Junit&反射&注解
categories: [Java]
description: Java语言高级（第六部分）Junit&反射&注解
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# Junit & 反射 & 注解
## 1. Junit单元测试：
![Alt Text](/images/posts/20210624211153674.bmp.jpg)

### 1.1 测试分类：
1. 黑盒测试：不需要写代码，给输入值，看程序是否能够输出期望的值。
2. 白盒测试：需要写代码的。关注程序具体的执行流程。

### 1.2 Junit使用：白盒测试

```java
package xyz.slienceme.junit;
/**
 * 计算器类
 */
public class Calculator {
    /**
     * 加法
     * @param a
     * @param b
     * @return
     */
    public int add (int a , int b){
        //int i = 3/0;
        return a - b;
    }
    /**
     * 减法
     * @param a
     * @param b
     * @return
     */
    public int sub (int a , int b){
        return a - b;
    }
}
```

```java
package xyz.slienceme.junit;
public class CalculatorTest {
    public static void main(String[] args) {
        //创建对象
        Calculator c = new Calculator();
        //调用
       /* int result = c.add(1, 2);
        System.out.println(result);*/
        int result = c.sub(1, 1);
        System.out.println(result);
        String str = "abc";
    }
}
```

#### 步骤：
1. 定义一个测试类(测试用例)
	- 建议：
		* 测试类名：被测试的类名Test		CalculatorTest
		* 包名：xxx.xxx.xx.test		xyz.slienceme.test

2. 定义测试方法：可以独立运行
	* 建议：
		* 方法名：test测试的方法名		testAdd()  
		* 返回值：void
		* 参数列表：空参

3. 给方法加@Test
4. 导入junit依赖环境

```java
package xyz.slienceme.test;
import xyz.slienceme.junit.Calculator;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CalculatorTest {
    /**
     * 初始化方法：
     *  用于资源申请，所有测试方法在执行之前都会先执行该方法
     */
    @Before
    public void init(){
        System.out.println("init...");
    }

    /**
     * 释放资源方法：
     *  在所有测试方法执行完后，都会自动执行该方法
     */
    @After
    public void close(){
        System.out.println("close...");
    }

    /**
     * 测试add方法
     */
    @Test
    public void testAdd(){
       // System.out.println("我被执行了");
        //1.创建计算器对象
        System.out.println("testAdd...");
        Calculator c  = new Calculator();
        //2.调用add方法
        int result = c.add(1, 2);
        //System.out.println(result);

        //3.断言  我断言这个结果是3
        Assert.assertEquals(3,result);

    }

    @Test
    public void testSub(){
        //1.创建计算器对象
        Calculator c  = new Calculator();
        int result = c.sub(1, 2);
        System.out.println("testSub....");
        Assert.assertEquals(-1,result);
    }
}

```

#### 判定结果：
* 红色：失败
* 绿色：成功
* 一般我们会使用断言操作来处理结果
	* Assert.assertEquals(期望的结果,运算的结果);

#### 补充：
* @Before:
	* 修饰的方法会在测试方法之前被自动执行
* @After:
	* 修饰的方法会在测试方法执行之后自动被执行


## 2. 反射：框架设计的灵魂
 - 框架：半成品软件。可以在框架的基础上进行软件开发，简化编码
 - 反射：将类的各个组成部分封装为其他对象，这就是反射机制
 - 好处：
		1. 可以在程序运行过程中，操作这些对象。
		2. 可以解耦，提高程序的可扩展性。


### 2.1 获取Class对象的方式：
1. `Class.forName("全类名")`：将字节码文件加载进内存，返回`Class`对象
多用于配置文件，将类名定义在配置文件中。读取文件，加载类
2. `类名.class`：通过类名的属性`class`获取
多用于参数的传递
3. `对象.getClass()`：`getClass()`方法在`Object`类中定义着。
多用于对象的获取字节码的方式

- 结论：
	同一个字节码文件`(*.class)`在一次程序运行过程中，只会被加载一次，不论通过哪一种方式获取的`Class`对象都是同一个。

![Alt Text](/images/posts/20210624213837359.bmp.jpg)

```java
package xyz.slienceme.reflect;
import xyz.slienceme.domain.Person;
import xyz.slienceme.domain.Student;
public class ReflectDemo1 {
    /**
        获取Class对象的方式：
            1. Class.forName("全类名")：将字节码文件加载进内存，返回Class对象
            2. 类名.class：通过类名的属性class获取
            3. 对象.getClass()：getClass()方法在Object类中定义着。
     */
    public static void main(String[] args) throws Exception {
        //1.Class.forName("全类名")
        Class cls1 = Class.forName("xyz.slienceme.domain.Person");
        System.out.println(cls1);
        //2.类名.class
        Class cls2 = Person.class;
        System.out.println(cls2);
        //3.对象.getClass()
        Person p = new Person();
        Class cls3 = p.getClass();
        System.out.println(cls3);
        //== 比较三个对象
        System.out.println(cls1 == cls2);//true
        System.out.println(cls1 == cls3);//true
        Class c = Student.class;
        System.out.println(c == cls1);
    }
}
//输出内容
/*
class xyz.slienceme.domain.Person
class xyz.slienceme.domain.Person
class xyz.slienceme.domain.Person
true
true
false
*/
```

### 2.2 Class对象功能：
####  2.2.1 获取功能：
##### 1. 获取成员变量
* `Field[] getFields()` ：获取所有public修饰的成员变量
* `Field getField(String name)`   获取指定名称的 public修饰的成员变量

* `Field[] getDeclaredFields()`  获取所有的成员变量，不考虑修饰符
* `Field getDeclaredField(String name)`   获取指定名称的的成员变量，不考虑修饰符

```java
package xyz.slienceme.reflect;
import xyz.slienceme.domain.Person;
import java.lang.reflect.Field;
public class ReflectDemo2 {
    public static void main(String[] args) throws Exception {
        //0.获取Person的Class对象
        Class personClass = Person.class;
        //1.Field[] getFields()获取所有public修饰的成员变量
        Field[] fields = personClass.getFields();
        for (Field field : fields) {
            System.out.println(field);
        }
        System.out.println("------------");
        //2.Field getField(String name)
        Field a = personClass.getField("a");
        //获取成员变量a 的值
        Person p = new Person();
        Object value = a.get(p);
        System.out.println(value);
        //设置a的值
        a.set(p,"张三");
        System.out.println(p);
        System.out.println("===================");
        //Field[] getDeclaredFields()：获取所有的成员变量，不考虑修饰符
        Field[] declaredFields = personClass.getDeclaredFields();
        for (Field declaredField : declaredFields) {
            System.out.println(declaredField);
        }
        //Field getDeclaredField(String name)
        Field d = personClass.getDeclaredField("d");
        //忽略访问权限修饰符的安全检查
        d.setAccessible(true);//暴力反射
        Object value2 = d.get(p);
        System.out.println(value2);
    }
}
/*
public java.lang.String xyz.slienceme.domain.Person.a
------------
null
Person{name='null', age=0, a='张三', b='null', c='null', d='null'}
===================
private java.lang.String xyz.slienceme.domain.Person.name
private int xyz.slienceme.domain.Person.age
public java.lang.String xyz.slienceme.domain.Person.a
protected java.lang.String xyz.slienceme.domain.Person.b
java.lang.String xyz.slienceme.domain.Person.c
private java.lang.String xyz.slienceme.domain.Person.d
null

 */
```

##### 2. 获取构造方法
* `Constructor<?>[] getConstructors()`  
* `Constructor<T> getConstructor(类<?>... parameterTypes)`  

* `Constructor<T> getDeclaredConstructor(类<?>... parameterTypes)`  
* `Constructor<?>[] getDeclaredConstructors()`  

```java
package xyz.slienceme.reflect;
import xyz.slienceme.domain.Person;
import java.lang.reflect.Constructor;
public class ReflectDemo3 {
    public static void main(String[] args) throws Exception {
        //0.获取Person的Class对象
        Class personClass = Person.class;
        //Constructor<T> getConstructor(类<?>... parameterTypes)
        Constructor constructor = personClass.getConstructor(String.class, int.class);
        System.out.println(constructor);
        //创建对象
        Object person = constructor.newInstance("张三", 23);
        System.out.println(person);
        System.out.println("----------");
        Constructor constructor1 = personClass.getConstructor();
        System.out.println(constructor1);
        //创建对象
        Object person1 = constructor1.newInstance();
        System.out.println(person1);
        Object o = personClass.newInstance();
        System.out.println(o);
        //constructor1.setAccessible(true);
    }
}
/*
public xyz.slienceme.domain.Person(java.lang.String,int)
Person{name='张三', age=23, a='null', b='null', c='null', d='null'}
----------
public xyz.slienceme.domain.Person()
Person{name='null', age=0, a='null', b='null', c='null', d='null'}
Person{name='null', age=0, a='null', b='null', c='null', d='null'}
* */
```

##### 3. 获取成员方法
* `Method[] getMethods()`  
* `Method getMethod(String name, 类<?>... parameterTypes)`  

* `Method[] getDeclaredMethods()`  
* `Method getDeclaredMethod(String name, 类<?>... parameterTypes)`  

```java
package xyz.slienceme.reflect;
import xyz.slienceme.domain.Person;
import java.lang.reflect.Method;
public class ReflectDemo4 {
    public static void main(String[] args) throws Exception {
        //0.获取Person的Class对象
        Class personClass = Person.class;
        //获取指定名称的方法
        Method eat_method = personClass.getMethod("eat");
        Person p = new Person();
        //执行方法
        eat_method.invoke(p);
        Method eat_method2 = personClass.getMethod("eat", String.class);
        //执行方法
        eat_method2.invoke(p,"饭");
        System.out.println("-----------------");
        //获取所有public修饰的方法
        Method[] methods = personClass.getMethods();
        for (Method method : methods) {
            System.out.println(method);
            String name = method.getName();
            System.out.println(name);
            //method.setAccessible(true);
        }
        //获取类名
        String className = personClass.getName();
        System.out.println(className);//xyz.slienceme.domain.Person
    }
}
/*
eat...
eat...饭
-----------------
public java.lang.String xyz.slienceme.domain.Person.getName()
getName
public java.lang.String xyz.slienceme.domain.Person.toString()
toString
public void xyz.slienceme.domain.Person.setName(java.lang.String)
setName
public int xyz.slienceme.domain.Person.getAge()
getAge
public void xyz.slienceme.domain.Person.eat(java.lang.String)
eat
public void xyz.slienceme.domain.Person.eat()
eat
public void xyz.slienceme.domain.Person.setAge(int)
setAge
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
wait
public final void java.lang.Object.wait() throws java.lang.InterruptedException
wait
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
wait
public boolean java.lang.Object.equals(java.lang.Object)
equals
public native int java.lang.Object.hashCode()
hashCode
public final native java.lang.Class java.lang.Object.getClass()
getClass
public final native void java.lang.Object.notify()
notify
public final native void java.lang.Object.notifyAll()
notifyAll
xyz.slienceme.domain.Person
*/
```

##### 4. 获取全类名	
* `String getName()`  


---
### 2.3 Field：成员变量
####  操作：
##### 1. 设置值
* `void set(Object obj, Object value)`  
##### 2. 获取值
* `get(Object obj)` 

##### 3. 忽略访问权限修饰符的安全检查
* `setAccessible(true)`:暴力反射


---
### 2.4 Constructor:构造方法
####  创建对象：
* `T newInstance(Object... initargs)`  

* 如果使用空参数构造方法创建对象，操作可以简化：`Class`对象的`newInstance`方法
---


###  2.5 Method：方法对象
####  执行方法：
* `Object invoke(Object obj, Object... args)`  

####  获取方法名称：
* `String getName`:获取方法名


---
### 2.6 案例：
####  需求：
- 写一个"框架"，不能改变该类的任何代码的前提下，可以帮我们创建任意类的对象，并且执行其中任意方法
#### 实现：
1. 配置文件
2. 反射
#### 步骤：
1. 将需要创建的对象的全类名和需要执行的方法定义在配置文件中
2. 在程序中加载读取配置文件
3. 使用反射技术来加载类文件进内存
4. 创建对象
5. 执行方法

```java
package xyz.slienceme.reflect;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * 框架类
 */
public class ReflectTest {
    public static void main(String[] args) throws Exception {
        //可以创建任意类的对象，可以执行任意方法
        /*
            前提：不能改变该类的任何代码。可以创建任意类的对象，可以执行任意方法
         */
      /*  Person p = new Person();
        p.eat();*/
/*
        Student stu = new Student();
        stu.sleep();*/

        //1.加载配置文件
        //1.1创建Properties对象
        Properties pro = new Properties();
        //1.2加载配置文件，转换为一个集合
        //1.2.1获取class目录下的配置文件
        ClassLoader classLoader = ReflectTest.class.getClassLoader();
        InputStream is = classLoader.getResourceAsStream("pro.properties");
        pro.load(is);

        //2.获取配置文件中定义的数据
        String className = pro.getProperty("className");
        String methodName = pro.getProperty("methodName");

        //3.加载该类进内存
        Class cls = Class.forName(className);
        //4.创建对象
        Object obj = cls.newInstance();
        //5.获取方法对象
        Method method = cls.getMethod(methodName);
        //6.执行方法
        method.invoke(obj);
    }
}
/*sleep...*/
```

## 3. 注解：
### 概念：
- 说明程序的。给计算机看的
### 注释：
- 用文字描述程序的。给程序员看的

### 定义：
- 注解（`Annotation`），也叫元数据。一种代码级别的说明。它是JDK1.5及以后版本引入的一个特性，与类、接口、枚举是在同一个层次。它可以声明在包、类、字段、方法、局部变量、方法参数等的前面，用来对这些元素进行说明，注释。
### 概念描述：
* JDK1.5之后的新特性
* 说明程序的
* 使用注解：`@注解名称`


---
### 作用分类：
①编写文档：通过代码里标识的注解生成文档【`生成文档doc文档`】
②代码分析：通过代码里标识的注解对代码进行分析【`使用反射`】
③编译检查：通过代码里标识的注解让编译器能够实现基本的编译检查【`Override`】


### JDK中预定义的一些注解
* `@Override`	：检测被该注解标注的方法是否是继承自父类(接口)的
* `@Deprecated`：该注解标注的内容，表示已过时
* `@SuppressWarnings`：压制警告
	* 一般传递参数all  `@SuppressWarnings("all")`
	
---
### 自定义注解
#### 格式：
```java
元注解
public @interface 注解名称{
	属性列表;
}
```
#### 本质：
- 注解本质上就是一个接口，该接口默认继承Annotation接口
	* `public interface MyAnno extends java.lang.annotation.Annotation {}`
#### 属性：
- 接口中的抽象方法
#### 要求：
##### 1. 属性的返回值类型有下列取值
* 基本数据类型
* String
* 枚举
* 注解
* 以上类型的数组

##### 2. 定义了属性，在使用时需要给属性赋值
1. 如果定义属性时，使用`default`关键字给属性默认初始化值，则使用注解时，可以不进行属性的赋值。
2. 如果只有一个属性需要赋值，并且属性的名称是`value`，则`value`可以省略，直接定义值即可。
3. 数组赋值时，值使用{}包裹。如果数组中只有一个值，则`{}`可以省略
		
```java
package xyz.slienceme.annotation;
public @interface MyAnno {
    int value();
    Person per();
    MyAnno2 anno2();
    String[] strs();
     /*String name() default "张三";*/
     /*String show2();
     Person per();
     MyAnno2 anno2();
     String[] strs();*/
}
```
```java
package xyz.slienceme.annotation;
@MyAnno(value=12,per = Person.P1,anno2 = @MyAnno2,strs="bbb")
@MyAnno3
public class Worker {
    @MyAnno3
    public String name = "aaa";
    @MyAnno3
    public void show(){
    }
}
```

### 元注解：用于描述注解的注解
* `@Target`：描述注解能够作用的位置
	* `ElementType`取值：
		* `TYPE`：可以作用于类上
		* `METHOD`：可以作用于方法上
		* `FIELD`：可以作用于成员变量上
* `@Retention`：描述注解被保留的阶段
	* `@Retention(RetentionPolicy.RUNTIME)`：当前被描述的注解，会保留到class字节码文件中，并被`JVM`读取到
* `@Documented`：描述注解是否被抽取到api文档中
* `@Inherited`：描述注解是否被子类继承

```java
package xyz.slienceme.annotation;
import java.lang.annotation.*;
/**

 元注解：用于描述注解的注解
     * @Target：描述注解能够作用的位置
     * @Retention：描述注解被保留的阶段
     * @Documented：描述注解是否被抽取到api文档中
     * @Inherited：描述注解是否被子类继承
 *
 */
@Target({ElementType.TYPE,ElementType.METHOD,ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface MyAnno3 {
}
```

```java
package xyz.slienceme.annotation;
@MyAnno(value=12,per = Person.P1,anno2 = @MyAnno2,strs="bbb")
@MyAnno3
public class Worker {
    @MyAnno3
    public String name = "aaa";
    @MyAnno3
    public void show(){
    }
}
```

---
* 在程序使用(解析)注解：获取注解中定义的属性值
1. 获取注解定义的位置的对象  （`Class，Method,Field`）
2. 获取指定的注解
	* `getAnnotation(Class)`
	//其实就是在内存中生成了一个该注解接口的子类实现对象
```java
  public class ProImpl implements Pro{
	                public String className(){
	                    return "xyz.slienceme.annotation.Demo1";
	                }
	                public String methodName(){
	                    return "show";
	                }
	            }
```

```java
package xyz.slienceme.annotation;

import java.lang.reflect.Method;

/**
 * 框架类
 */


@Pro(className = "xyz.slienceme.annotation.Demo1",methodName = "show")
public class ReflectTest {
    public static void main(String[] args) throws Exception {
        /*
            前提：不能改变该类的任何代码。可以创建任意类的对象，可以执行任意方法
         */

        //1.解析注解
        //1.1获取该类的字节码文件对象
        Class<ReflectTest> reflectTestClass = ReflectTest.class;
        //2.获取上边的注解对象
        //其实就是在内存中生成了一个该注解接口的子类实现对象
        /*

            public class ProImpl implements Pro{
                public String className(){
                    return "xyz.slienceme.annotation.Demo1";
                }
                public String methodName(){
                    return "show";
                }

            }
 */

        Pro an = reflectTestClass.getAnnotation(Pro.class);
        //3.调用注解对象中定义的抽象方法，获取返回值
        String className = an.className();
        String methodName = an.methodName();
        System.out.println(className);
        System.out.println(methodName);

        //3.加载该类进内存
        Class cls = Class.forName(className);
        //4.创建对象
        Object obj = cls.newInstance();
        //5.获取方法对象
        Method method = cls.getMethod(methodName);
        //6.执行方法
        method.invoke(obj);
    }
}

```
	          
3. 调用注解中的抽象方法获取配置的属性值


	* 案例：简单的测试框架
	* 小结：
		1. 以后大多数时候，我们会使用注解，而不是自定义注解
		2. 注解给谁用？
			1. 编译器
			2. 给解析程序用
		3. 注解不是程序的一部分，可以理解为注解就是一个标签
