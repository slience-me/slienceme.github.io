# JavaSE知识点汇总

> 该笔记由[@TZ丶旭哥](https://blog.csdn.net/m0_53721382?type=blog)提供

## Java概述

### jdk和jre以及jvm的联系

```java
1.jvm(Java Virtual Machine):java运行所需要的环境,是一台假想计算机
2.跨平台:代码可以在不同的操作系统上运行
    a.跨:跨越
    b.平台:操作系统
3.jvm和跨平台关系:
  	java程序想要实现跨平台,需要安装不同版本的jvm(Linux\windows\macos)
4.jdk(Java Development Kit):java开发工具包,里面包含了jre,以及一些开发工具
5.jre(Java Runtime Environment):java运行的环境,jre包含jvm以及核心类库  
    
6.jdk > jre > jvm  (包含关系)      
7.环境变量配置  %JAVA_HOME%\bin
8.javac HelloWorld.java  ->  编译成 .class 文件
9.java  HelloWorld  ->  运行 .class 文件  注意不需要写后缀
10.javadoc -d 要生成的文件夹名字 -author -version 文件名.java  // 生成API文档
```

```java
┌────────────────────────────┐
│          JDK               │
│ (Java Development Kit)     │
│                            │
│  ┌──────────────────────┐  │
│  │        JRE           │  │
│  │ (Java Runtime Env.)  │  │
│  │                      │  │
│  │  ┌────────────────┐  │  │
│  │  │     JVM        │  │  │
│  │  │ (Java Virtual  │  │  │
│  │  │   Machine)     │  │  │
│  │  └────────────────┘  │  │
│  │                      │  │
│  │  + 核心类库（rt.jar）  │  │
│  └──────────────────────┘  │
│                            │
│  + 编译器（javac）           │
│  + 调试工具（jdb 等）        │
│  + 文档工具（javadoc）       │
│  + 其他开发工具              │
└────────────────────────────┘
```

| 术语    | 全称                     | 作用                                        | 备注                         |
| ------- | ------------------------ | ------------------------------------------- | ---------------------------- |
| **JVM** | Java Virtual Machine     | Java虚拟机，负责执行 `.class` 字节码文件    | 平台相关，但字节码是跨平台的 |
| **JRE** | Java Runtime Environment | Java运行环境，包括 JVM 和运行所需的核心类库 | 用于“运行”Java 程序          |
| **JDK** | Java Development Kit     | Java开发工具包，包括 JRE + 编译器等开发工具 | 用于“开发”和“运行”Java 程序  |

::: info

JDK = JRE + 开发工具（javac等）

JRE = JVM + Java类库（rt.jar 等）

JVM = 执行Java字节码的核心虚拟机

:::

### 注释

```java
1.概述:对代码进行的解释说明
2.分类:
  a.单行注释: //内容
  b.多行注释:
    /*
      内容
    */
  c.文档注释:
    /**
      内容
    */
3.快捷键 
    a.单行注释 ctrl(command) + /
    b.多行注释 ctrl(command) + shift(⬆️) + /
4.在类上,方法上写注释:建议用文档注释
5.方法内部写注释:可以用单行注释,或者多行注释
```

## Java基础数据类型

### 常量

```java
1.概述:在代码运行的过程中值不会发生改变的数据,也叫做"字面值"
2.分类:
  整数常量:所有整数
  小数常量:所有带小数点的
          2.5  2.0
  字符常量:带单引号的 ''   -> 单引号中必须有且只能有一个内容
          '1'
          '11' 不是字符
          'a'
          'a1' 不是字符
          ''   不是字符
          ' '  一个空格算一个内容,所以一个空格也算字符
          '  ' 两个空格算两个内容,所以不是字符
          '	'
  字符串常量:带双引号的 ""   -> 双引号中随意写
          ""  "1111"  "helloworld"
  布尔常量: true false
  空常量:null  代表数据不存在  不能直接使用    
  		给引用数据类型初始化的时候用null
```

### 变量

| 数据类型     | 关键字         | 内存占用 | 取值范围                                                 |
| :----------- | :------------- | :------- | :------------------------------------------------------- |
| 字节型       | byte           | 1个字节  | -128 至 127  定义byte变量时超出范围,废了                 |
| 短整型       | short          | 2个字节  | -32768 至 32767                                          |
| 整型         | int（默认）    | 4个字节  | -2^31^ 至 2^31^-1  正负21个亿<br>-2147483648——2147483647 |
| 长整型       | long           | 8个字节  | -2^63^ 至 2^63^-1   19位数字                             |
| 单精度浮点数 | float          | 4个字节  | 1.4013e-45 至 3.4028e+38                                 |
| 双精度浮点数 | double（默认） | 8个字节  | 4.9e-324 至 1.7977e+308                                  |
| 字符型       | char           | 2个字节  | 0 至 2^16^-1                                             |
| 布尔类型     | boolean        | 1个字节  | true，false(可以做判断条件使用)                          |

```java
1.概述:在代码的运行过程中值会随着不同的情况随时发生改变的数据
  double price = 10  -> 少了5元  -> price-5
  如果将一个数据用一个变量接收,后续什么时候想用这个数据,什么时候直接拿这个变量即可
2.作用:一次存储一个数据
3.定义格式:
  a.数据类型 变量名 = 值   -> 一定是先看等号右边的,然后将等号右边的值赋值给等号左边的变量 即使等号右边是一个运算,咱们都得先将右边的算出来,然后将结果赋值给等号左边的变量   
  b.数据类型 变量名;
    变量名 = 值;
4.java中变量的数据类型
  基本类型:4类8种
    整型: byte short int long
    浮点型:float double
    字符型:char
    布尔型:boolean
  引用类型:
    类  数组  接口  枚举  注解  Record   
5.注意:
  a.String字符串不是一个单独的类型.所以以后说数据类型的时候不要单独将String拎出来,因为String字符串属于引用类型中 类的一种
  b.整数默认类型 -> int
    小数默认类型 -> double
  c. long a = 10L
     float f = 10F 
6.按照取值范围排序(从小到大) -> byte,short,char -> int -> long -> float -> double
7.允许定义变量的时候,不用声明具体的数据类型,可以用var关键字
```

```java
变量使用时的注意事项：
  1.变量不初始化(第一次赋值)不能直接使用
  2.在同一个作用域(一对大括号)中不能定义重名的变量  
  3.不同的作用域中的数据不要随意互相使用
    a.在小作用域中 能直接使用大作用域中的数据
    b.在大作用域中 不能直接使用小作用域中的数据
```

### 名字

```java
 1.概述:给类,方法,变量取的名字
 2.硬性规定(必须遵守)
     a.名字中可以包含: 字母,数字,_,$
     b.不能以数字开头
     c.不要是关键字    
   软性建议(可遵守可不遵守,建议遵守)
     a.给类取名字 : 大驼峰式 (每个单词首字母大写)
     b.给方法,变量取名字:小驼峰式(从第二个单词开始首字母大写)    
```

### 数据类型转换

```java
1.什么时候会发生数据类型转换?
  等号左右两边的类型不一致
2.数据类型转换都有哪些转法?
  a.自动类型转换  小 -> 大
  b.强制类型转换(强转)  大 -> 小
    取值范围小的数据类型 变量名 = (取值范围小的数据类型)取值范围大的数据类型
3.按照取值范围大小 为基本类型排序(从小到大):
	byte, short, char -> int -> long -> float -> double
4.写代码的时候不要故意写成强转的形式,否则容易出现数据溢出以及精度损失现象
5.char类型一旦做运算,会自动提升为int型,char类型数据一旦提升为int型,会自动去ASCII码表中找此字符对应的int值,如果ASCII码表中找不到,会自动去Unicode码表(万国码)中去找
6.byte和short接受的值如果是字面值,且没有超出byte和short的范围,jvm会自动强转     但是byte和short接收的值如果有变量参与,结果重新赋值给byte或者short变量,byte和short会提升为int型,需要我们手动强转
```

> 将来如果**算钱**的时候,千万不要直接用float和double算,因为float和double直接参与运算也会出现精度损失现象
>
> 解决:将来会学**BigDecimal**,它会解决float或者double直接参与运算而出现的精度损失问题

```java
package day02.com.hebut;

public class Test {
    public static void main(String[] args) {
        char c1 = 'A';
        int result1 = c1 + 1;  // 'A'的ASCII码是65，result1 = 65 + 1 = 66
        System.out.println(result1); // 输出：66

        char c2 = '中';         // '中'的Unicode码是20013
        int result2 = c2 + 0;   // result2 = 20013 + 0 = 20013
        System.out.println(result2); // 输出：20013

        byte b1 = 100;      // 100在byte范围(-128~127)内，自动强转
        short s1 = 200;     // 200在short范围(-32768~32767)内，自动强转

        byte b2 = 50;
        byte b3 = 60;
        byte result3 = (byte) (b2 + b3); // b2+b3提升为int，需手动强转
        System.out.println(result3);     // 输出：110

        short s2 = 1000;
        short s3 = 2000;
        short result4 = (short) (s2 + s3); // s2+s3提升为int，需手动强转
        System.out.println(result4);       // 输出：3000
    }
}
```

### 运算符

#### 算术运算符

| 符号 | 说明     |
| ---- | -------- |
| +    | 加法     |
| -    | 减法     |
| *    | 乘法     |
| /    | 除法     |
| %    | 模(取余) |

```java
+:
  a.加法
  b.字符串拼接符号 -> 任意类型遇到字符串都会变成字符串 -> 直接往后拼接
  c.Java 表达式总是从左到右依次计算。括号内的表达式会优先计算
    
1.符号:
  ++  --
2.格式:
  变量名++  后自加
  ++变量名  前自加
  变量名--  后自减
  --变量名  前自减  
      
3.使用:
  a.单独使用:++ -- 单独为一句,没有和其他的语句掺和使用 -> 符号在前在后都是直接运算
      
  b.混合使用:++ --和其他语句掺和使用 (打印语句,赋值语句等)
    符号在前:先运算,再使用运算后的值
    符号在后:先使用原值,再加减
```

```java
int c = 100;
c = c++;  // 等价于  int temp = c;  c = c + 1;  c = temp 
System.out.println("c = " + c);  // c 100

int c = 100;
c = ++c;  // 1. c先自增为101；2.返回101并赋值给c
System.out.println("c = " + c);  // c 101
```

#### 赋值运算符

```java
1.基本赋值运算符
  =   -> 先看等号右边的,将右边的结果赋值给等号左边的变量
    
2.复合赋值运算符
 += 
    int i = 10;
    i+=2;  //i = i+2
 -=
 *=
 /=
 %=   
     
3.注意:
  byte,short如果使用复合赋值运算符,jvm会自动强转 结果回原类型（byte 或 short）
```

#### 关系运算符

```java
1.作用:做条件判断使用
2.结果:boolean结果  重点！！！
```

| 符号 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| ==   | 判断符号前后结果是否相等,如果相等,返回true;否则返回false     |
| >    | 判断符号前面的是否大于符号后面的结果,如果大于,返回true;否则返回false |
| <    | 判断符号前面的是否小于符号后面的结果,如果小于,返回true;否则返回false |
| >=   | 判断符号前面的是否大于或者等于符号后面的结果,如果大于或者等于,返回true;否则返回false |
| <=   | 判断符号前面的是否小于或者等于符号后面的结果,如果小于或者等于,返回true;否则返回false |
| !=   | 判断符号前后结果是否不相等,如果不相等返回true,否则返回flase  |

#### 逻辑运算符

```java
1.作用:连接多个boolean结果的
2.结果:boolean的结果
```

| 符号        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| &&(与,并且) | 有假则假,符号前后有一个结果为false,结果就是false             |
| \|\|(或者)  | 有真则真,符号前后有一个结果为true,结果就是true               |
| !(非,取反)  | 不是真,就是假;不是假,就是真                                  |
| ^(异或)     | 符号前后结果一样为false;不一样为true<br>true^true  -> false<br>true^false -> true <br>false^false -> false<br>false^true -> true |

```java
&:有假则假,但是符号前面为false,符号后面依然执行,而且符号前后都是数字,就算是位运算符
&&:有假则假,符号前面为false,符号后面不执行了-> 短路效果  

|:有真则真,但是符号前面为true,符号后面依然执行,而且符号前后都是数字,就算是位运算符
||:有真则真,符号前面为true,符号后面不执行了 -> 短路效果    
```

#### 三元运算符

```java
1.格式:
  boolean表达式?表达式1:表达式2
2.执行流程:
  先走boolean表达式判断,如果结果为true,就执行?后面的表达式1,否则就执行:后面的表达式2
```

#### 位运算符

![image-20250712130529149](/images/javase-concepts/image-20250712130529149.png)

```java
1代表true   0代表false
我们要知道计算机在存储数据的时候都是存储的数据的补码,而计算的也是数据的补码

1.正数二进制最高位为0;负数二进制最高位是1
2.正数的原码,反码,补码一致
  如:5的原码,反码,补码为:
     0000 0000 0000 0000 0000 0000 0000 0101->二进制最高位是0,因为是正数
3.负数的话原码,反码,补码就不一样了
  反码是原码的基础上最高位不变,其他的0和1互变
  补码是在反码的基础上+1
         
  一个快速的原码 补码 转换方法   第一位和最后一位1不变，中间的0->1 1->0
         
  如:-9
     原码:1000 0000 0000 0000 0000 0000 0000 1001
     反码:1111 1111 1111 1111 1111 1111 1111 0110
     补码:1111 1111 1111 1111 1111 1111 1111 0111
         
4.<< 左移几位就相当于乘以2的几次方   2<<2 等于8
5.>> 类似于除以2的几次方，如果不能整除，向下取整   9>>2  等于2  -9>>2  等于-3
6.>>> 无符号右移 往右移动后，左边空出来的位直接补0，不管最高位是0还是1空出来的都拿0补  9>>>2  等于2   -9>>>2  结果为:1073741821
    
7. 5&3 结果为1   -5&3 结果为3
 -5: 1111 1111 1111 1111 1111 1111 1111 1011  
 3: 0000 0000 0000 0000 0000 0000 0000 0011  
-----------------------------------------
 &: 0000 0000 0000 0000 0000 0000 0000 0011  （结果 = 3）
    
8. 5|3 结果为7   -5|3 结果为 -5
 |: 1111 1111 1111 1111 1111 1111 1111 1011  （-5 的补码）
    
9. 5^3 结果为6   -5^3 结果为 -8
 ^: 1111 1111 1111 1111 1111 1111 1111 1000  （-8的补码）
     
10. 按位取反   ~10     ->  结果为-11
	10: 0000 0000 0000 0000 0000 0000 0000 1010
	-----------------------------------------
	~:  1111 1111 1111 1111 1111 1111 1111 0101  （-11的补码）
```

![image-20250712131353222](/images/javase-concepts/image-20250712131353222.png)

> 笔试题:8>>>32位->相当于没有移动还是8
>
> ​             8>>>34位->相当于移动2位

### 优先级

![image-20250712193123433](/images/javase-concepts/image-20250712193123433.png)

```java
提示说明：
（1）表达式不要太复杂
（2）先算的使用(),记住,如果想让那个表达式先运行,就加小括号就可以了
```

## Scanner_键盘录入

```java
1.概述:java语言提前定义好的类
2.作用:通过键盘录入的形式将数据放到代码中参与运行
3.使用:
  a.导包:为了声明我们使用的是哪个包下的对象
    import java.util.Scanner;  
  b.创建对象:
    Scanner 对象名 = new Scanner(System.in)
  c.调用对象中的功能:
    对象名.nextInt() 键盘录入整数
    对象名.next() 键盘录入字符串 -> 遇到空格或者回车就结束录入
	对象名.nextLine() 键盘录入字符串-> 遇到回车就结束录入   
```

## switch

```java
1.格式:
  switch(变量){
      case 目标值1:
          执行语句1;
          break;
      case 目标值2:
          执行语句2;
          break;
      case 目标值3:
          执行语句3;
          break;
      ...
      default:
          执行语句n;
          break
  }
2.执行流程:
  用变量代表的值去和下面的case后面的目标值做匹配,配上哪个case,就执行哪个case对应的执行语句;如果以上所有的case都没有匹配上,就走default对应的执行语句n
      
3.关键字:
  break:结束switch语句
      
4.switch都能匹配什么类型的数据:
  byte short int char 枚举类型 String类型
      
5.如果case下面没有break,就会出现case的穿透性,会一直往下穿透执行,直到第一次遇到break或者switch代码运行完毕了才能结束
```

```java
传统的switch语句在使用中有以下几个问题。
（1）匹配是自上而下的，如果忘记写break，那么后面的case语句不论匹配与否都会执行。
（2）所有的case语句共用一个块范围，在不同的case语句定义的变量名不能重复。
（3）不能在一个case语句中写多个执行结果一致的条件，即每个case语句后只能写一个常量值。
（4）整个switch语句不能作为表达式返回值。 

switch新特性
    Java 12对switch语句进行了扩展，将其作为增强版的switch语句或称为switch表达式，可以写出更加简化的代码。
	- 允许将多个case语句合并到一行，可以简洁、清晰也更加优雅地表达逻辑分支。
	- 可以使用-> 代替 :
  		- ->写法默认省略break语句，避免了因少写break语句而出错的问题。
  		- ->写法在标签右侧的代码段可以是表达式、代码块或 throw语句。
  		- ->写法在标签右侧的代码块中定义的局部变量，其作用域就限制在代码块中，而不是蔓延到整个switch结构。
	- 同一个switch结构中不能混用“→”和“:”，否则会有编译错误。使用字符“:”，这时fall-through规则依然有效，即不能省略原有的break语句。"："的写法表示继续使用传统switch语法。
        
    Java 13提出了第二个switch表达式预览，引入了yield语句，用于返回值。这意味着，switch表达式（返回值）应该使用yield语句，switch语句（不返回值）应该使用break语句。
```

```java
package day03.com.hebut;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        switch (month) {
            case 12,1,2->
                    System.out.println("冬季");
            case 3,4,5->
                    System.out.println("春季");
            case 6,7,8->
                    System.out.println("夏季");
            case 9,10,11->
                    System.out.println("秋季");
            default->
                    System.out.println("输入有误");
        }
    }
}
```

```java
package day03.com.hebut;
import java.util.Scanner;

// 没有返回值
public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        String season = "";
        switch (month) {
            case 12, 1, 2 -> season = "冬季";
            case 3, 4, 5 -> season = "春季";
            case 6, 7, 8 -> season = "夏季";
            case 9, 10, 11 -> season = "秋季";
            default -> System.out.println("输入有误");
        }
        System.out.println(season);
    }
}

// 有返回值
public class Test {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        String season = switch (month) {
            case 12, 1, 2 -> {
                yield "冬季";
            }
            case 3, 4, 5 -> {
                yield "春季";
            }
            case 6, 7, 8 -> {
                yield "夏季";
            }
            case 9, 10, 11 -> {
                yield "秋季";
            }
            default -> {
                yield "输入有误";
            }
        };
        System.out.println(season);
    }
}
```

## if

```java
1.格式:
  if(boolean表达式){
      执行语句1
  }else if(boolean表达式){
      执行语句2
  }else if(boolean表达式){
      执行语句3
  }else if(boolean表达式){
      执行语句4
  }else{
      执行语句n
  }
2.执行流程:
  从上到下挨个判断,哪个if条件为true,就走哪个if对应的执行语句
  如果以上所有的条件都不满足,就走else对应的执行语句n
```

## 循环

### for

```java
1.格式:
  for(初始化变量;比较;步进表达式){
      循环语句
  }
2.执行流程:
  a.初始化变量
  b.比较,如果是true,走循环语句
  c.走步进表达式(初始化的这个变量的值发生变化),再比较,如果还是true,继续走循环语句
  d.继续走步进表达式,再比较,直到比较为false,循环结束
```

### while

```java
1.格式:
  初始化变量;
  while(比较){
      循环语句
      步进表达式
  }
2.执行流程:
  a.初始化变量
  b.比较,如果是true,走循环语句
  c.走步进表达式(初始化的这个变量的值发生变化),再比较,如果还是true,继续走循环语句
  d.继续走步进表达式,再比较,直到比较为false,循环结束 
```

### do-while

```java
1.格式:
  初始化变量;
  do{
      循环语句
      步进表达式
  }while(比较);
2.执行流程:
  a.先初始化变量
  b.走循环语句,走步进表达式
  c.比较,如果是true,继续循环,走步进表达式
  d.再比较,直到比较为false,循环结束
3.特点:
  至少执行一次
```

### 循环区别

```java
1.for循环中初始化的变量,出了for循环使用不了了
2.while循环中的初始化变量,出了while还能使用 
3.do...while至少执行一次   
```

### break continue

```java
1.break:
  a.在switch中代表结束switch语句
  b.在循环中代表结束循环
2.continue:
  a.结束当前本次循环,自动进入下一次循环
```

## Random随机数

```java
1.概述:java自带的类
2.作用:在指定的范围内随机一个数
3.使用:
  a.导包:import java.util.Random
  b.创建对象:
    Random 对象名 = new Random()
  c.调用方法:
    对象名.nextInt() -> 在int的取值范围随机一个数
    对象名.nextInt(int bound) -> 在0-(bound-1)之间随机一个数  
        
4.指定范围:
  1-10之间随机一个整数: nextInt(10)+1 -> (0-9)+1 -> 0-9的数整体都加1 -> 1-10
  1-100之间随机一个整数: nextInt(100)+1 -> (0-99)+1 -> 1-100
  100-999之间随机一个整数: nextInt(900)+100 -> (0-899)+100 -> 100-999
```

## 数组

```java
1.概述:是一个容器,属于引用数据类型
2.作用:一次存储多个数据
3.特点:
  a.存储的数据可以是基本类型,也可以是引用类型
  b.定长(长度是多少,最多能存多少个数据)
4.定义:
  a.动态初始化:
    数据类型[] 数组名 = new 数据类型[长度]
    数据类型 数组名[] = new 数据类型[长度] 
        
    等号左边的数据类型:规定了数组中能存什么类型的数据
    []:代表数组的意思
    数组名:给数组取的名字
    new:代表的是创建
    等号右边的数据类型:和等号左边的类型要保持一致
    [长度]:规定了数组的长度,最多能存多少个数据 
  b.静态初始化:
    数据类型[] 数组名 = new 数据类型[]{元素1,元素2...} -> 不推荐
    数据类型 数组名[] = new 数据类型[]{元素1,元素2...} -> 不推荐
        
  c.简化静态初始化:
    数据类型[] 数组名 = {元素1,元素2...}

5.数组名.length   length不是一个方法,所以不要带小括号,它是数组的一个属性

6.索引
    a.索引是唯一的
    b.索引都是从0开始,最大索引(数组长度-1) 
    c.操作数组中的元素,不管是存,还是取,都必须要通过索引来操作

7.不要直接输出数组名来获取元素,因为直接输出数组名拿到的是地址值
8.数组中的元素如果没有赋具体的值,直接输出来是有默认值
    整数: 0
    小数: 0.0
    字符: '\u0000'-> 空白字符
    布尔: false
    引用: null
9.地址值:引用数据类型在内存中的唯一标识,为的是能在内存中找到这个数据
10.遍历数组快捷键: 数组名.fori
11.数组索引越界异常_ArrayIndexOutOfBoundsException
12.空指针异常_NullPointerException
```

```java
随机产生10个[0,100]之间整数，统计既是3又是5，但不是7的倍数的个数
步骤:
  1.定义一个变量count用来统计个数
  2.定义一个数组,用来存储随机出来的10个数
  3.创建Random对象
  4.循环随机10个整数存储到数组中
  5.遍历数组,如果符合条件,count++
  6.输出count  
      
      
package day04.com.hebut;
import java.util.Random;

public class Test {
    public static void main(String[] args){
        //1.定义一个变量count用来统计个数
        int count=  0;
        //2.定义一个数组,用来存储随机出来的10个数
        int[] arr = new int[10];
        //3.创建Random对象
        Random r = new Random();
        //4.循环随机10个整数存储到数组中
        for (int i = 0; i < arr.length; i++) {
            arr[i] = r.nextInt(101);
        }
        //5.遍历数组,如果符合条件,count++
        for (int i = 0; i < arr.length; i++) {
            if (arr[i]%3==0 && arr[i]%5==0 && arr[i]%7!=0){
                count++;
            }
        }
        //6.输出count
        System.out.println("count = " + count);
    }
}      
```

## 内存

```java
1.内存的概述:就是运行内存,简单理解(内存条),只不过在java的世界里,将内存划分了5块
2.划分出来的哪五块:
  a.栈(Stack):
    专门运行方法的,所有的方法运行都会去栈内存中运行
        
  b.堆(Heap):
    放引用类型的数据
    而且我们每new一次,都会在堆内存中产生一个空间,堆内存会为这个空间分配一个地址值
    而且在堆中的数据都有默认值
    整数 0
    小数 0.0
    字符 '\u0000'
    布尔 false
    引用 null
             
  c.方法区(Method Area)
    可以理解为代码运行前的"预备区",所有的代码运行之前先加载到内存中,就先去方法区中做预备  到时候真正执行起来,该去栈就去栈,该进堆的就去堆

  d.本地方法栈(Native Method Stack)
    专门运行本地方法的(方法声明上带native关键字)
    本地方法:可以理解为对java无法实现的功能进行功能上的扩容的
            本地方法是由C语言编写的,我们是看不到本地方法的具体实现的,因为c语言没对我们开源
        
  e.寄存器(pc Register):和CPU有关
```

![image-20250712201814081](/images/javase-concepts/image-20250712201814081.png)

## 数组复杂操作

```java
1.数组扩容   arr1 123 -> arr2 12300
public class Test02 {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = new int[5];
        for (int i = 0; i < arr1.length; i++) {
            arr2[i] = arr1[i];
        }
        arr1 = arr2; // 把 arr2的地址值 -> arr1  相当于arr1扩容到5了
        for (int i = 0; i < arr1.length; i++) {
            System.out.println(arr1[i]); // 1 2 3 0 0
        }
    }
}  

2.数组合并
public class Test03 {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {4, 5, 6};
        int[] arr3 = new int[arr1.length + arr2.length];
        for (int i = 0; i < arr1.length; i++) {
            arr3[i] = arr1[i];
        }
        for (int i = 0; i < arr2.length; i++) {
            arr3[arr1.length + i] = arr2[i];
        }
        for (int i = 0; i < arr3.length; i++) {
            System.out.println(arr3[i]);
        }
    }
}
```

## 二维数组

```java
1.概述:数组中嵌套多个一维数组
2.定义:
  a.动态初始化:
    数据类型[][] 数组名 = new 数据类型[m][n]
    数据类型 数组名[][] = new 数据类型[m][n]
    数据类型[] 数组名[] = new 数据类型[m][n]  
        
    m:代表的是二维数组的长度
    n:每一个一维数组的长度
        
    数据类型[][] 数组名 = new 数据类型[m][] -> 代表的是二维数组中的一维数组没有被创建  
        
  b.静态初始化:
    数据类型[][] 数组名 = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...}...}
    数据类型 数组名[][] = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...}...}
    数据类型[] 数组名[] = new 数据类型[][]{{元素1,元素2...},{元素1,元素2...}...} 

  c.简化静态初始化:
    数据类型[][] 数组名 = {{元素1,元素2...},{元素1,元素2...}...}
```

![image-20250712202841335](/images/javase-concepts/image-20250712202841335.png)

```java
public class Test {
    public static void main(String[] args) {
        int[][] arr1 = new int[3][];

        arr1[1] = new int[]{1,2,3};

        arr1[2] = new int[3];

        arr1[2][1] = 100;
    }
}
```

![image-20250712203029983](/images/javase-concepts/image-20250712203029983.png)

## 方法

```java
1.概述:拥有功能性代码的代码块,我们将来一个功能就应该定义一个方法
      将来开发一个功能就应该对应搞一个方法,而不是将所有的功能相关代码放在一个方法中
      到时候执行哪个功能就单独调用哪个方法
    
2.方法的通用定义格式:
  修饰符 返回值类型 方法名(参数){
      方法体
      return 结果
  }

3.在通用格式的基础上,分成四种方法
  a.无参无返回值方法
  b.有参无返回值方法
  c.无参有返回值方法
  d.有参有返回值方法
    
4.注意:
  a.方法不调用不执行
  b.方法之间是平级关系,不能互相嵌套
  c.方法的执行顺序只和调用顺序有关
  d.main方法是jvm自动调用

5.各部分解释
  a.修饰符: 固定为public static
  b.返回值类型: 方法执行完毕之后最终返回的数据的数据类型
    比如:return 1 -> 返回值类型为int
        return 2.5 -> 返回值类型为double
        return "涛哥和三上...的故事" -> 返回值类型为String
  c.方法名:给方法取的名字 -> 见名知意
  d.参数:数据类型 变量名,数据类型 变量名 -> 用于接收别人传递过来的数据
  e.方法体:实现这个方法的具体代码
  f.return 结果 -> 方法运行之后最终的结果,将其返回 -> 返回值
     
6.形参(形式参数):在定义方法的时候,形式上定义的参数,此时并没有值
7.实参(实际参数):在调用方法的时候,给形参传递的具体的值
      
8.注意事项：
  a.方法不调用不执行
  b.方法之间是平级关系,不能互相嵌套
  c.方法的执行顺序只和调用顺序有关
  d.main方法是jvm自动调用   
  e.void不能和[return 结果]共存,但是void能和[return]共存
    void:代表无返回值
    return 结果:代表有返回值 -> 先将结果返回,然后结束方法
    return:仅仅代表结束方法,不代表有返回值    
  f.方法的调用必须完全匹配(参数个数,类型,顺序等)      
  g.一个方法中只能有一个返回值,不要连续写多个return  

9.打开方法分割线 如下图
10.在IDEA中同时修改方法名及其所有调用处的方法名的快捷键是 Shift + F6 (重命名 Refactor)  按Enter确定修改
```

![image-20250712205011958](/images/javase-concepts/image-20250712205011958.png)

```java
需求:
  在main方法中定义一个数组,将数组传递到方法中,在此方法中遍历数组

public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        method(arr);
    }

    public static void method(int[] arr2) {
        for (int i = 0; i < arr2.length; i++) {
            System.out.println(arr2[i]);
        }
    }
}
```

![image-20250712204251064](/images/javase-concepts/image-20250712204251064.png)

## 方法重载（Overload）

```java
1.概述:方法名相同,参数列表不同的方法->重载方法

2.什么叫做参数列表不同:
  a.参数个数不同
  b.参数类型不同
  c.参数类型顺序不同
      
3.和什么无关:
  a.和返回值无关
  b.和参数名无关
```

![image-20250712205306762](/images/javase-concepts/image-20250712205306762.png)

## 类和对象

```java
1.什么是面向对象思想:java的核心编程思想
2.为什么要使用面向对象思想编程:
  有很多功能别人都写好了我们直接创建这个对象,直接拿过来用我们的功能就能实现 -> 懒
   -> 为了少写代码 
3.什么时候要使用面向对象思想编程:
  在一个类中想使用别的类实现好的功能时,就需要使用面向对象思想编程了
4.怎么使用面向对象思想编程:
  a.new呀,点呀
  b.特殊:调用带static关键字的 -> 直接类名点
5.类分两种
  a.实体类 -> 世间万物的分类
  b.测试类 -> 带main方法的类 -> 为了测试代码是否能跑通的类
6.类的描述
  一类事物的抽象表示形式
7.实体类包含两部分:
  属性(这个分类有啥)-> 成员变量 
    a.定义格式:  数据类型 变量名
    b.定义位置:  类中方法外
    c.成员变量有默认值:
      整数 0
      小数 0.0
      字符 '\u0000'
      布尔  false
      引用  null
          
  行为(这个分类能干啥,有什么功能) -> 成员方法
      将之前的方法干掉static关键字,其他的一样
```

```java
public class Person {
    //属性 -> 成员变量
    String name;
    int age;

    //行为 -> 成员方法
    public void eat(){
        System.out.println("人要吃饭");
    }

    public void drink(){
        System.out.println("人要喝水");
    }

    public void la(){
        System.out.println("人要出恭");
    }

    public void sa(){
        System.out.println("人要嘘嘘");
    }
}
```

```java
1.对象概述:
  一类事物的具体体现
2.使用:
  a.导包:import 包名.类名
    如果两个类不在同一个包下,使用对方的成员就需要导包
    如果两个类在同一个包下,使用对方的成员就不需要导包
      
  b.创建对象:想要调用哪个类的成员,就new哪个类的对象
    类名 对象名 = new 类名()  
      
  c.调用成员(成员方法,成员变量)
    对象名.成员变量名 = 值
    对象名.方法名()

3.匿名对象:new对象的时候,没有等号左边,只有等号右边的new对象部分
  有名对象:Person p = new Person()
  匿名对象:new Person()
      
4.匿名对象使用:
  new Person().成员名
      
5.匿名对象优缺点:
  a.优点:好使用
  b.缺点大大的:对象不能循环使用,浪费内存
      
6.匿名对象注意:
  a.如果我们想临时的调用一次方法,我们可以使用匿名对象
  b.但是如果涉及到赋值,千万不要使用    
```

![image-20250712205807996](/images/javase-concepts/image-20250712205807996.png)

![image-20250712214217235](/images/javase-concepts/image-20250712214217235.png)

```java
1.定义位置不同:
  a.成员变量:类中方法外
  b.局部变量:方法内部,或者参数位置上
2.初始化值不同:
  a.成员变量:是有默认值的,不需要赋值就能直接使用
  b.局部变量:没有默认值的,必须先初始化才能使用
3.作用范围不同:
  a.成员变量:作用于整个类
  b.局部变量:只作用于自己所在的方法内部    
4.内存位置不同:
  a.成员变量:在堆中,因为成员变量跟着对象走
  b.局部变量:在栈中,因为局部变量跟着方法走    
5.生命周期不同:
  a.成员变量:随着对象的创建而创建,随着对象的消失而消失
  b.局部变量:随着方法的执行而创建,随着方法的弹栈而消失    
```

## 封装

```java
1.封装从生活角度来说:将一个物品封起来,外界不能直接使用
2.封装从java角度来说:将细节隐藏起来(不让外界直接使用),对外提供一套公共的接口(供外界通过这个公共的接口间接使用隐藏起来的细节)

3.举例说明:
  a.洗衣机洗衣服:
    我们使用洗衣机洗衣服,属于面向对象思想编程
    我们使用的时候直接点击按钮,洗衣机就洗衣服了(按钮下的零部件就是我们隐藏起来的细节,按钮就是对外提供的公共接口,我们通过按钮间接操作洗衣机的零部件)
        
4.封装怎么用:
  a.将代码放到一个方法中,方法体就是我们隐藏起来的细节,方法名就是对外提供的公共接口 -> 我们直接通过调用方法名,方法内部的细节就执行了,至于这个方法怎么实现的,我们无需关注,我们只关注调用方法
      
  b.将成员私有化 -> private
    private -> 代表的是私有的,被私有化的成员只能在自己当前类中使用
    private可以修饰成员变量,也可以修饰方法      
      
5.封装总结一句话:将细节隐藏起来(不让外界直接使用),对外提供一套公共的接口(供外界通过这个公共的接口间接使用隐藏起来的细节)
    
6.用private修饰成员之后(相当于隐藏细节)
7.提供getxxx/setxxx方法(相当于对外提供的公共接口)
  a.setxxx:为属性赋值
  b.getxxx:获取属性值   
8.快速生成get/set方法 快捷键  alt + insert 
```

```java
1.注意:当成员变量和局部变量重名的时候,遵循"就近原则",先走局部变量
2.this关键字:
  a.概述:代表的是当前对象
  b.用法:this.成员的
3.this代表的是当前对象,具体代表哪个当前对象呢?
  哪个对象调用的this所在的方法,this就代表哪个对象    
```

![image-20250712221517424](/images/javase-concepts/image-20250712221517424.png)

```java
1.构造方法作用:
  主要是new对象的
2.特点:
  a.方法名和类名一致
  b.没有返回值,连void都没有
      
3.格式:
  public 类名(){
      
  }
  public 类名(形参){
      为属性赋值
  }
4.注意:
  a.我们一new,就相当于调用了构造方法
  b.jvm会为每个类都提供一个空参构造,不写也有
  c.如果写了有参构造，则jvm不再提供无参构造，需要自己写无参构造
  d.如果被private修饰了构造方法,我们就不能利用构造方法new对象了
```

## JavaBean

```java
JavaBean是Java语言编写类的一种标准规范。符合`JavaBean` 的类，要求满足下面条件： 
（1）类必须是具体的(非抽象 abstract)和公共的，public class 类名
（2）具有无参数的构造方法
（3）成员变量私有化，并提供用来操作成员变量的set和get方法
（4）成员变量如果是基本类型的,需要使用对应的包装类定义  -> 后面的框架都是使用包装类
	  
```

```java
package day07.com.hebut;

public class JavaBean {
    private String name;
    private int age;

    public JavaBean() {
    }

    public JavaBean(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
  com.atguigu.controller(表现层)  存放接收请求回响应的类-> 和页面打交道
  com.atguigu.service(业务层) 存放写业务逻辑的类
  com.atguigu.dao/mapper(持久层) 存放和数据库打交道的类
  com.atguigu.pojo/entity 存放javabean类的
  com.atguigu.utils  存放工具类
```

![image-20250712222848333](/images/javase-concepts/image-20250712222848333.png)

![image-20250712222929197](/images/javase-concepts/image-20250712222929197.png)

![image-20250712223058728](/images/javase-concepts/image-20250712223058728.png)

> 封装小结:
>
> 1.知道什么是封装吗?  将细节隐藏起来,对外提供公共的接口
>
> 2.你知道private的作用嘛?  私有化成员,外界不能直接使用
>
> 3.知道set方法的作用嘛?  为属性赋值
>
> 4.知道get方法的作用嘛?  获取属性值
>
> 5.知道this的作用嘛? 区分重名的成员变量和局部变量
>
> 6.知道无参构造作用嘛? new对象的
>
> 7.知道有参构造作用嘛? new对象并为属性赋值
>
> 8.知道如何使用快捷键快速生成一个标准javabean类嘛? alt+insert

## static

```java
1.概述: static静态关键字
2.使用:
   a.修饰成员变量:  static 数据类型 变量名
   b.修饰方法: 
      修饰符 static 返回值类型 方法名(形参){
                 方法体
                  return 结果
      }

3.static的特点:
   a.静态成员属于类成员,静态成员会随着类的加载而加载
   b.静态成员会优先于对象存在(非静态成员属于对象的成员)
   c.凡是根据static所在的类创建出来的对象,都可以共享这个静态成员

4.调用:
   类名直接点
       
5.能在静态方法中能直接访问非静态成员嘛?不能，因为非静态成员还没加载
  new对象访问
    
6.能在静态方法中能直接访问静态成员嘛?能
  a.在同一个类中 -> 直接调用
  b.不在同一个类中 -> 类名调用
    
7.在非静态方法中能直接访问静态成员嘛?能
  a.在同一个类中 -> 直接调用
  b.不在同一个类中 -> 类名调用
    
8.在非静态方法中能直接访问非静态成员嘛?能
  a.在同一个类中 -> 直接调用
  b.不在同一个类中 -> new对象调用
       
9.调用静态的:不管在不在同一个类中,能直接调用就直接调用,不能直接调用类名调用
10.调用非静态的:不管在不在同一个类中,能直接调用就直接调用,不能直接调用就new对象调用
```

> 问题1:既然静态的那么好使,直接类名点即可,那么将来写代码能不能将所有的成员都定义成静态的?    不能
> 原因:静态的属于类成员,会随着类的加载而加载,如果将所有的成员都变成静态的,类一加载,这个类中所有的静态成员都会被加载,包括没有用到的,所以会造成占用内存空间,浪费内存的弊端
>
> 问题2:啥时候定义静态成员呢?
>   静态成员一般情况都是在**抽取工具类**的时候定义
>
> 问题3:啥时候抽取工具类
>    如果每个类中反复实现同一个功能,此时我们没必要在每一个类中都重复写相同的代码,此时我们就可以将这段代码抽取到一个工具类中

```java
public class ArraysUtils {
 	/**
     * 工具类中的构造要求私有化
     * 不让外界通过构造new对象
     */
    private ArraysUtils(){}

    public static void printArray(int[] arr){
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                System.out.print(arr[i] + "]");
            } else {
                System.out.print(arr[i] + ",");
            }
        }
    }
}
```

## 可变参数

```java
1.需求:定义一个方法,实现若干个整数相加
 
2.分析需求:
  参数:类型确定了,但是个数不确定

3.可变参数格式:
  数据类型...变量名
      
4.可变参数本质:可变参数本质上是数组 
    
5.可变参数注意:
  参数位置只能有一个可变参数,而且要在参数列表最后
```

![image-20250712224657152](/images/javase-concepts/image-20250712224657152.png)

## 递归

```java
1.概述:方法内部自己调用自己
2.分类:
  a.直接递归: 方法内部自己调用自己
  b.间接递归:
    方法之间互相调用
        
3.注意:
  a.递归必须要有出口,否则会出现"栈内存溢出"
  b.即使有出口,也不要递归太多次,否则也会出现"栈内存溢出"    
```

```java
计算斐波那契数列（Fibonacci）的第n个值

import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        System.out.println(fib(n));
    }
    
    public static int fib(int n) {
        if (n==1||n==2) {
            return 1;
        }
        return fib(n - 1) + fib(n - 2);
    }
}
```

## 冒泡排序、二分查找

```java
1.概述:数组中对称索引位置上的元素互换
public class ArrReverse {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        for (int min = 0, max = arr.length - 1; min <= max; min++, max--) {
            int temp = arr[max];
            arr[max] = arr[min];
            arr[min] = temp;
        }
        System.out.println(Arrays.toString(arr)); // [5, 4, 3, 2, 1]
    }
}

2.冒泡排序
public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {1, 4, 2, 3, 7, 6, 5};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
    }
}

3.二分查找
public class BinarySearch {
    public static void main(String[] args) {
        // 数组必须有序才能用二分查找
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        Scanner scanner = new Scanner(System.in);
        int key = scanner.nextInt();
        int result = method(arr, key);
        System.out.println(result);
    }

    private static int method(int[] arr, int key) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) >>> 1;
            if (arr[mid] == key) {
                return mid;
            } else if (arr[mid] > key) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;  // 没找到
    }
}

4.创建学生类，按照学生的成绩排序
    public class StudentArray {
    public static void main(String[] args) {
        Student[] p = new Student[3];
        Student s1 = new Student("张三", 90);
        Student s2 = new Student("李四", 70);
        Student s3 = new Student("王五", 80);

        p[0] = s1;
        p[1] = s2;
        p[2] = s3;

        for (int i = 0; i < p.length - 1; i++) {
            for (int j = 0; j < p.length - 1 - i; j++) {
                if (p[j].getScore() > p[j + 1].getScore()) {
                    Student temp = p[j];
                    p[j] = p[j + 1];
                    p[j + 1] = temp;
                }
            }
        }

        for (Student student : p) {
            System.out.println(student.getScore());
        }
    }
}
```

## 命令行参数

```java
命令行参数： String[] args
    
public class Command {
    public static void main(String[] args) {
        System.out.println(Arrays.toString(args));
    }
}

// 调用
java Command 1 2 3 4 asjdghajk  564 8
    
快速将一段代码放到一个方法中： ctrl + alt + m
```

![image-20250713200310680](/images/javase-concepts/image-20250713200310680.png)

## 继承

```java
1.父类怎么形成的:
  定义多个类的时候发现我们在反复定义相同的成员,此时我们就可以定义一个父类,将重复的成员都放到父类中,其他类直接继承这个父类,就可以直接使用父类中抽取出来的非私有成员

2.怎么继承:
  子类 extends 父类

3.注意:
  a.子类可以继承父类中私有和非私有成员,但是不能直接使用父类中私有成员
  b.构造方法不能被继承
  c.静态方法可以继承,但是不能被重写

4.继承怎么学习:
  不要从"是否拥有"的层面来理解继承,要从"是否能使用"的层面来理解继承

5.问题:如果不使用继承,能不能完成功能?能

       所以,继承是一种思想,是一种代码的设计理念,既然是设计理念,就可用可不用,只不过用了就比不用强,所以推荐使用
    
6.创建子类对象,调用继承的成员
```

![image-20250713200848636](/images/javase-concepts/image-20250713200848636.png)

```java
1.继承中,成员变量和成员方法的访问特点
    a.子类和父类中的成员变量不重名
    b.子类和父类中的成员变量重名 -> 看等号左边是谁,调用谁中的成员变量,子类没有,找父类
    
    c.子类和父类中的成员方法不重名
    d.子类和父类中的成员方法重名 -> 看new的是谁,调用谁中的方法,子类没有,找父类

2.方法的重写
    a.概述:
      子类中有一个和父类从方法名以及参数列表上一样的方法,叫做方法的重写
    b.前提:
      必须有子父类继承关系
    c.如何判断方法是否为重写的方法:
      在方法上加上一个注解 -> @Override
          
3.方法的重载:方法名相同,参数列表不同的方法-> 侧重同一个类
4.方法的重写:发生在继承中,子类中有一个和父类方法名以及参数列表一模一样的方法
    
5.子类方法重写父类方法，必须要保证权限大于等于父类权限。(权限修饰符)
   public -> protected -> 默认 -> private
6.子类方法重写父类方法,方法名和参数列表都要一模一样。
7.私有方法不能被重写,构造方法不能被重写,静态方法也不能重写
8.子类重写父类方法之后,返回值类型应该是父类方法返回值类型的子类类型  
   一般情况下,子类重写父类方法之后,都一样
9.私有方法,静态方法可以继承但是不能被重写,构造方法不能被继承,也不能被重写
10.方法重写的使用场景:主要是增强父类某个功能,对父类方法进行升级改造  
```

## super和this

```java
1.特点:
  创建子类对象时,先初始化父类(不是说new父类对象,而是先调用父类无参构造方法)
2.原因:
  构造方法第一行默认会有一个super(),不写也有
  super()代表的就是父类无参构造方法  
      
3.super关键字:代表的是父类引用(注意不是父类对象)
4.this关键字:代表的是当前对象
5.super和this主要体现在调用上:
  super:可以调用父类成员
  this:可以调用当前对象的成员

6.super具体使用
  a.调用父类构造方法:在子类的构造中使用(必须写在第一行)
    super() 调用父类无参构造
    super(实参) 调用父类有参构造
    
  b.调用父类成员变量:在子类中使用
    super.成员变量名
      
  c.调用父类成员方法:在子类中使用
    super.成员方法名()
      
7.this具体使用
  a.调用当前对象的构造:在本类的构造中(必须写在第一行)
    this()调用当前对象的无参构造
    this(实参)调用当前对象的有参构造  
  b.调用当前对象的成员变量:在本类中
    this.成员变量名  
  c.调用当前对象的方法:在本类中
    this.方法名()  
      
8.this和super就不能同时在构造方法中出现(因为都要写在第一行)

9.继承特点
    a.继承只支持单继承,不能多继承 -> 一个子类只能有一个亲爹
      public class A extends B,C{}  错误
      public class A extends B{} 正确

    b.继承支持多层继承
      public class A extends B{}
      public class B extends C{}

    c.一个父类可以有多个子类
      public class A extends C{}
      public class B extends C{} 

10.如何为父类中private的成员变量赋值
    a.利用set赋值
    b.利用构造方法赋值
```



## abstract

```java
1.抽象类和抽象方法的形成:
   a.将共有的方法抽取到父类之后,在父类中无法做具体实现,此时就可以定义成抽象方法,延伸到子类中做具体的实现
   b.抽象方法所在的类一定是抽象类  (抽象类不一定有抽象方法)
2.抽象类的定义 -> abstract
   public abstract class 类名{}
3.抽象方法的定义
  修饰符 abstract 返回值类型 方法名(形参);
4.实现:
   a.定义一个子类,继承抽象父类
   b.重写抽象父类中所有的抽象方法,做具体实现
   c.创建子类对象(抽象父类不能new对象)
   d.调用子类重写的方法
5.继承是为了少写代码,但是现在将父类中的方法整成抽象的,还必须在子类中重写一遍,那么继承还有什么意义呢?
   抽象也是一个代码的"设计思想",可用可不用,但是用了比不用强
       
6.可以将"抽象类"看做是一类事物的标准,只要属于我这个分类,就必须拥有我这个分类的功能,怎么代表拥有 -> 重写
       
7.抽象的注意事项
    a.抽象类不能直接new对象,只能创建非抽象子类的对象
    b.抽象类中,可以有构造方法,是供子类创建对象时,初始化父类中属性使用的
    c.抽象类中可以有成员变量,构造,成员方法
    d.抽象类中不一定非得有抽象方法,但是有抽象方法的类一定是抽象类
    e.抽象类的子类,必须重写父类中的所有抽象方法,否则,编译无法通过.除非该子类也是抽象类
```

![image-20250713202906469](/images/javase-concepts/image-20250713202906469.png)



```java
某IT公司有多名员工，按照员工负责的工作不同，进行了部门的划分（研发部、维护部）。
研发部(Developer)根据所需研发的内容不同，又分为 JavaEE工程师 、Android工程师 ；
维护部(Maintainer)根据所需维护的内容不同，又分为 网络维护工程师(Network) 、硬件维护工程师(Hardware) 。

公司的每名员工都有他们自己的员工编号、姓名，并要做他们所负责的工作。

工作内容:
- JavaEE工程师： 员工号为xxx的 xxx员工，正在研发电商网站
- Android工程师：员工号为xxx的 xxx员工，正在研发电商的手机客户端软件
- 网络维护工程师：员工号为xxx的 xxx员工，正在检查网络是否畅通
- 硬件维护工程师：员工号为xxx的 xxx员工，正在修复电脑主板

请根据描述，完成员工体系中所有类的定义，并指定类之间的继承关系。进行XX工程师类的对象创建，完成工作方法的调用。
```

```java
public abstract class Employee {
    private int id;
    private String name;

    public Employee() {
    }

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public abstract void work();
}

public abstract class Developer extends Employee{
    public Developer() {
    }

    public Developer(int id, String name) {
        super(id, name);
    }
}

public class JavaEE extends Developer{
    public JavaEE() {
    }

    public JavaEE(int id, String name) {
        super(id, name);
    }

    @Override
    public void work() {
        System.out.println("员工号为:"+this.getId()+"的"+this.getName()+"正在研发电商网站");
    }
}

public class Main {
    public static void main(String[] args) {
        JavaEE zuo = new JavaEE(1, "zuo");
        zuo.work();
    }
}
```

![image-20250713204345174](/images/javase-concepts/image-20250713204345174.png)

## 接口

```java
1.接口:是一种规则,一种标准
2.既然是一种标准,里面的成员就非常单一
3.jdk8之前:
  a.抽象方法: 默认 public abstract，无需显式声明。
  b.成员变量: 默认 public static final（常量），必须初始化。

 4. jdk8开始: 多了两个
   a.默认方法: 带default关键字的
   b.静态方法: 带static的方法 可直接通过接口调用，常用于工具方法。

5.jdk9开始:多了一个
   a.私有方法: 用于接口内部代码复用，仅限接口内调用。

6.接口的定义:interface
   public interface 接口名{}

7.实现接口: implements
   实现类 implements 接口名{}

8.接口中的成员
    a.抽象方法  不写public abstract关键字默认也有
    b.默认方法  1.可重写,可不重写   2.创建实现类对象,调用默认方法  
    c.静态方法  接口名直接调用
    d.成员变量  格式:public static final 数据类型 变量名 = 值
       不写 public static final 默认也有  接口名直接调用
       被static final修饰的变量需要手动赋值 习惯上将static final修饰的变量名大写
    e.私有方法  
        
9.接口的特点
    a.接口可以多实现:一个类可以实现一个或者多个接口
      public class InterfaceImpl implements InterfaceA,InterfaceB{}
    b.接口可以多继承:一个接口可以继承一个或者多个接口
      public interface InterfaceC extends InterfaceA,InterfaceB{}
    c.一个类可以继承一个父类的同时实现一个或者多个接口
      public class Zi extends Fu implements InterfaceA,InterfaceB{} 

10.接口和抽象类的区别
    相同点:
      a.都位于继承的顶端,用于被其他类实现或者继承
      b.都不能new
      c.都包含抽象方法,其子类都必须重写这些抽象方法

    不同点:
      a.抽象类:一般作为父类使用,可以有成员变量,构造,成员方法,抽象方法等
      b.接口:成员单一,一般抽取接口,抽取的都是方法,是功能的大集合
      c.类不能多继承,接口可以 
```

## 多态

```java
1.怎么学多态:
  a.前提  b.如何new对象  c.多态好处
      
2.前提:
  a.必须有子父类继承关系或者接口实现关系
  b.必须有方法的重写(没有方法的重写,多态没有任何意义)
  c.new对象 -> 父类引用指向子类对象 -> Fu fu = new Zi()
      
3.多态前提下,不能直接调用子类特有方法
      
4.成员变量: 看等号左边是谁,先调用谁中的成员变量
5.成员方法: 看new的是谁,先调用谁中的方法,子类没有,找父类
    
6.多态的好处
    1.问题:
      我们按照原始方式创建对象,既可以调用继承过来的,还能调用重写的,还能调用特有的;但是我们用多态形式new对象,不能调用子类特有功能,只能调用重写的方法,那么为啥还要用多态呢?

    2.原始方式:
      a.好处:既可以调用继承过来的,还能调用重写的,还能调用特有的
      b.坏处:扩展性差

    3.多态方式:
      a.好处:扩展性强
      b.坏处:不能直接调用子类特有功能
          
7.多态中的转型
     a.默认的: 父类引用指向子类对象    Fu fu = new Zi();
     b.将父类类型转成子类类型 -> 强转  Fu fu = new Zi(); Zi zi = (Zi)fu; 
8.转型可能会出现的问题
    1.类型转换异常:
      ClassCastException
    2.原因:
      强转的时候等号左右两边类型不一致
    3.判断: instanceof -> 判断类型
      a.格式1: 对象名 instanceof 类型 -> 判断instanceof前面的对象是否属于关键字后面的类型
      b.格式2: 对象名 instanceof 类型 对象名 -> 会自动强转    
```

```java
定义笔记本类，具备开机，关机和使用USB设备的功能。具体是什么USB设备，笔记本并不关心，只要符合USB规格的设备都可以。鼠标和键盘要想能在电脑上使用，那么鼠标和键盘也必须遵守USB规范，不然鼠标和键盘生产出来无法使用;
进行描述笔记本类，实现笔记本使用USB鼠标、USB键盘

- USB接口，包含开启功能、关闭功能
- 笔记本类，包含运行功能、关机功能、使用USB设备功能
- 鼠标类，要符合USB接口
- 键盘类，要符合USB接口
    
public interface USB {
   void open();
   void close();
}

public class Mouse implements USB{
    @Override
    public void open() {
        System.out.println("鼠标开启");
    }

    @Override
    public void close() {
        System.out.println("鼠标关闭");
    }

    //特有方法
    public void click(){
        System.out.println("鼠标点击");
    }
}

public class KeyBoard implements USB{
    @Override
    public void open() {
        System.out.println("键盘开启");
    }

    @Override
    public void close() {
        System.out.println("键盘关闭");
    }

    //特有方法
    public void input(){
        System.out.println("键盘输入");
    }
}

public class Computer {
    public void start(){
        System.out.println("开机");
    }

    /**
     * 传递mouse -> USB usb = mouse -> 多态
     * 传递keyBoard -> USB usb = keyBoard -> 多态
     * @param usb
     */
    public void useUSB(USB usb){
        usb.open();
        usb.close();
        // 下面相当于调用子类特有功能  涉及到强转
        if (usb instanceof Mouse mouse){
            mouse.click();
        }

        if (usb instanceof KeyBoard keyBoard){
            keyBoard.input();
        }

    }

    public void stop(){
        System.out.println("关机");
    }
}

public class Test {
    public static void main(String[] args) {
        Computer computer = new Computer();
        Mouse mouse = new Mouse();
        KeyBoard keyBoard = new KeyBoard();
        computer.start();
        computer.useUSB(mouse);
        computer.useUSB(keyBoard);
        computer.stop();
    }
}
```

![image-20250713212437937](/images/javase-concepts/image-20250713212437937.png)

## 权限修饰符

```java
在Java中提供了四种访问权限，使用不同的访问权限修饰符修饰时，被修饰的内容会有不同的访问权限
- public：公共的,最高权限,被public修饰的成员,在哪里都能访问
- protected：受保护的
- default：:默认的 注意  不写权限修饰符就是默认权限,不能直接把default写出来
- private：私有的,只能在自己的类中直接访问
    
属性用private -> 封装思想
构造用public -> 便于new对象
方法用public -> 便于调用
```

|                | public | protected | default（空的） | private |
| -------------- | ------ | --------- | --------------- | ------- |
| 同类           | yes    | yes       | yes             | yes     |
| 同包不同类     | yes    | yes       | yes             | no      |
| 不同包子父类   | yes    | yes       | no              | no      |
| 不同包非子父类 | yes    | no        | no              | no      |

## final

```java
1.概述:代表的是最终的
2.使用:
  修饰类			
      不能被继承
  修饰方法	  		
      a.不能被重写	b.不能和abstract一起使用
  修饰对象			
      地址值不能改变,但是属性值可以改变	final 类名 对象名 = new 类名()
  修饰局部变量	
      不能被二次赋值   final 数据类型 变量名 = 值
  修饰成员变量
      final 数据类型 变量名 = 值
      被final修饰的成员变量不能被二次赋值
  	  被final修饰的成员变量手动赋值  
```

## 代码块和内部类

```java
1.构造代码块 格式:
  {
    代码
  }
2.执行特点:
  优先于构造方法执行,而且每new一次就会执行一次
      
3.静态代码块 格式:
  static{
    代码
  }
4.执行特点:
  优先于构造代码块以及构造方法执行,只执行一次 
      
5.按照执行优先级来看: 静态代码块>构造代码块>构造方法
6.如果有一些数据,需要先初始化而且只需要初始化一次反复使用,那么这些数据就可以放到静态代码块中去初始化
```

![image-20250713224235249](/images/javase-concepts/image-20250713224235249.png)

```java
1.什么时候使用内部类:
  当一个事物的内部,还有一个部分需要完整的结构进行描述,而这个内部的完整的结构又只为外部事物提供服务,那么整个内部的完整结构最好使用内部类
  比如:人类都有心脏,人类本身需要用属性,行为去描述,那么人类内部的心脏也需要心脏特殊的属性和行为来描述,此时心脏就可以定义成内部类,人类中的一个内部类
  
  当一个类内部的成员也需要用属性和行为描述时,就可以定义成内部类了
      
2.在java中允许一个类的定义位于另外一个类内部,前者就称之为内部类,后者称之为外部类
  class A{
      class B{
          
      }
  }
  A就是B的外部类
  B就是A的内部类
      
3.分类:
  成员内部类(静态,非静态)
  局部内部类
  匿名内部类(重点) -> 匿名内部类属于局部内部类一种
      
4.静态成员内部类
    1.格式:直接在定义内部类的时候加上static关键字即可
      public class A{
          static class B{

          }
      }

    2.注意:
      a.内部类中可以定义属性,方法,构造等
      b.静态内部类可以被final或者abstract修饰
        给final修饰,不能被继承
        被abstract修饰,不能new
      c.静态内部类不能调用外部的非静态成员
      d.内部类还可以被四种权限修饰符修饰

    3.调用静态内部类成员:
      外部类.内部类 对象名 = new 外部类.内部类()
      Person.Heart heart = new Person.Heart();
          
5.非静态成员内部类
    1.格式:
      public class 类名{
          class 类名{

          }
      }

    2.注意:
      a.内部类中可以定义属性,方法,构造等
      b.静态内部类可以被final或者abstract修饰
        给final修饰,不能被继承
        被abstract修饰,不能new
      c.静态内部类不能调用外部的非静态成员
      d.内部类还可以被四种权限修饰符修饰

    3.调用非静态成员内部类
      外部类.内部类 对象名 = new 外部类().new 内部类()
      Person.Heart heart = new Person().new Heart();

6.外部类的成员变量和内部类的成员变量以及内部类的局部变量重名时,怎么区分?
    public class Student {
     String name = "张三";//外部类成员变量
     class Heart{
         String name = "李四";//内部类成员变量
         public void dispaly(){
             String name = "王五";//内部类局部变量
             System.out.println(name);//王五
             System.out.println(this.name);//李四
             System.out.println(Student.this.name);//张三
         }
     }
    }

7.局部内部类基本操作
    可以定义在方法中,代码块中,构造方法中
8.局部内部类实际操作
    接口类型作为方法参数传递和返回
    	a.接口作为方法参数传递,传递的是实现类对象
    	b.接口作为方法返回值类型,返回的也是实现类对象
    抽象类作为方法参数和返回值
    	a.抽象类作为方法参数传递,应该接收子类对象
    	b.抽象类作为方法返回值类型,返回的是子类对象
    普通类做方法参数和返回值
    	a.普通类作为方法参数传递,传递的是对象
    	b.普通类作为方法返回值类型返回,返回的也是对象
    
//局部内部类实际操作代码
public class Test {
    public static void main(String[] args) {
        USB usb = method01();//USB usb = mouse
        usb.open();
    }

    public static USB method01(){
        class Mouse implements USB{
            public void open() {
                System.out.println("鼠标打开");
            }
        }

        Mouse mouse = new Mouse();
        return mouse;// return new Mouse()
    }
}

9.匿名内部类(重点)
    1.匿名内部类是局部内部类的一种
    2.上面的代码Mouse类就是一个局部内部类,我们在定义的时候,显式的定义出此局部内部类叫啥了(叫Mouse),所以我们可以理解为这是一个"有名的内部类",而且这个内部类做了接口的实现类使用
      如果我们在定义局部内部类的时候,不显式的将此内部类定义一个名字,那么我们就可以将这个内部类叫做"匿名内部类",当然,这个匿名内部类也作为接口的实现类使用  
    
10.匿名内部类基本使用
    1.格式1:利用有名对象去创建匿名内部类的对象
      接口名 对象名 = new 接口(){
         重写方法(){}  
      } ;
      对象名.重写方法名();

    2.格式2:利用匿名对象去创建匿名内部类的对象
      new 接口(){
         重写方法(){}  
      }.重写的方法名(); 

    3.使用场景:如果我们就想简单的去实现一下接口中的某个抽象方法,去直接调用,此时我们就需要
          a.创建实现类
          b.实现接口
          c.重写抽象方法
          d.创建实现类对象,调用重写方法
          所以我们没必要这么麻烦,我们只需要用匿名内部类创建对象,然后一个格式就包含了以上四步

//匿名内部类实现
	new USB() {
        @Override
        public void open() {
            System.out.println("USB打开了");
        }
    }.open();

11.匿名内部类复杂用法_当参数传递
public class Test {
    public static void main(String[] args) {
        method01(new USB() {
            @Override
            public void open() {
                System.out.println("USB打开");
            }
        });
    }

    public static void method01(USB usb) {
        usb.open();
    }
}   

12.匿名内部类复杂用法_当返回值返回
public class Test {
    public static void main(String[] args) {
        USB usb = method();
        usb.open();
    }

    public static USB method(){
        return new USB() {
            @Override
            public void open() {
                System.out.println("USB打开了");
            }
        };
    }
}
```

## lombok 和 Junit

```java
1.概述:Lombok属于第三方工具,使用第三方工具时需要导第三方提供给咱们得jar包
2.什么叫做jar包:jar包是一种压缩包,里面装的一般都是class文件
3.如何导入jar包:
  a.在当前模块下右键->new->Directory
  b.取名为lib或者libs
  c.将jar包粘贴到lib文件夹下
  d.对着要解压的jar包 -> 右键 -> add as library -> 在level选择module(此时上面有一个输入框叫name,name栏会变成空的) -> ok
      
    或者直接对着lib文件夹右键 -> add as library -> 在level选择module(此时上面有一个输入框叫name,name栏会变成空的) -> ok
4.lombok作用: 简化javabean开发的
    
5.lombok常用注解
    a.@Getter和@Setter
    	- 作用：生成成员变量的get和set方法。
		- 写在成员变量上，指对当前成员变量有效。
		- 写在类上，对所有成员变量有效。
		- 注意：静态成员变量无效。
    b.@ToString
    	- 作用：生成toString()方法。
		- 注解只能写在类上。
    c.@NoArgsConstructor和@AllArgsConstructor
    	- @NoArgsConstructor：无参数构造方法。
		- @AllArgsConstructor：满参数构造方法。
		- 注解只能写在类上。
    	- 注意:如果手动添加了@AllArgsConstructor 一定要加上@NoArgsConstructor 
    d.@EqualsAndHashCode
    	- 作用：生成hashCode()和equals()方法。
		- 注解只能写在类上。
    e.@Data
    	- 作用：生成get/set，toString，hashCode，equals，无参构造方法
		- 注解只能写在类上。
    

```

![image-20250714085255204](/images/javase-concepts/image-20250714085255204.png)

![image-20250714085327487](/images/javase-concepts/image-20250714085327487.png)



```java
1.概述:是单元测试的一个小框架,用于测试方法,在一定程度上能代替main方法
2.使用:
  a.导入junit的jar包
  b.使用junit中的注解
  c.@Test  ->  放到方法上使用
  d.@Before:在@Test之前执行,有多少个@Test修饰的方法执行@Before就执行多少次
  e.@After:在@Test之后执行,有多少个@Test修饰的方法执行@After就执行多少次    
3.Junit的注意事项
    a.被修饰的方法不能有参数
	b.被修饰的方法不能有返回值
	c.被修饰的方法不能是静态的

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class PersonTest {
    @Test
    public void test(){
        Person p = new Person("张三", 18);
        Person p1 = new Person();
        System.out.println(p.getName() + p.getAge());
    }

    @Before
    public void beforeTest(){
        System.out.println("beforeTest");
    }

    @After
    public void afterTest(){
        System.out.println("afterTest");
    }
}
```

## debug

![image-20250714090901350](/images/javase-concepts/image-20250714090901350.png)

![image-20250714090932773](/images/javase-concepts/image-20250714090932773.png)

## 枚举

```java
1.概述:引用数据类型 (类 数组 接口 枚举 注解 Record)
2.定义:
  public enum 枚举类类名{
      
  }
3.枚举类中的成员(枚举值)定义:
  a.枚举类中的枚举值都是默认static final的,不要写出来 -> 直接写名字(大写)
  b.枚举值之间用,隔开,如果下面没有其他枚举值了,最后用;结束
4.注意:
  a.枚举类中的每一个枚举值都是当前类的一个对象
  b.问题:既然枚举值都是当前枚举类的对象,那么枚举值的类型是什么类型?
         当前类的类型
5.枚举使用场景:
  一般都是作为一个对象的状态来使用
6.枚举类中的构造:
  a.枚举类中的构造必须是privat的,不写也有
  b.枚举的构造方法本身就是私有的，无法通过 Lombok 生成
      
7.枚举的方法
      a.String toString()   返回枚举值的名字,返回的是字符串
      b.values()			返回所有的枚举值
      c.valueOf(String str) 将一个字符串转成枚举类型

public enum State {
    WEIFUKUAN("未付款"),//State WEIFUKUAN = new State("未付款");
    YIFUKUAN("已付款"),//State YIFUKUAN = new State("已付款");
    WEIFAHUO("未发货"),//State WEIFAHUO = new State("未发货");
    YIFAHUO("已发货");//State YIFAHUO = new State("已发货");

    String name;

    State(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

//    @Override
//    public String toString() {
//        return name;
//    }
}

public class Test {
    public static void main(String[] args) {
        State weifukuan = State.WEIFUKUAN;
        System.out.println(weifukuan); // WEIFUKUAN
        System.out.println(weifukuan.getName()); // 未付款
        System.out.println(weifukuan.toString()); // WEIFUKUAN
        State[] values = State.values();
        for (int i = 0; i < values.length; i++) {
            System.out.println(values[i].getName()); // 未付款 已付款 未发货 已发货
        }
        State weifukuan1 = State.valueOf("WEIFUKUAN");
        System.out.println(weifukuan1.getName()); // 未付款
    }
}
```

## 异常

```java
1.概述:指的是代码出现了不正常的现象,在java中异常其实是一个一个的类,一个一个的对象
2.之前见过的异常:
  ArrayIndexOutOfBoundsException -> 数组索引越界异常
  NullPointerException -> 空指针异常  （运行期异常）
  ClassCastException -> 类型转换异常
3.异常的分类:
  a.父类: Throwable
  b.Throwable有两个子类:
    Error(错误) : 相当于人得了绝症,重新写-> 不能用代码处理
    Exception(异常) : 相当于人得了感冒,可以治-> 能用代码处理
  c.Exception有两种异常:
    编译时期异常:Exception以及其子类(除了RuntimeException之外)
               语法没错,但是由于调用了某个方法,方法底层抛出了一个编译时期异常,导致调用的时候一编译就报红
        
    运行时期异常:RuntimeException以及子类:
               语法没错,编译的时候写没错,但是一运行就报错
	d.运行时期异常一般不用处理,因为一旦出现运行时期异常,肯定是代码写的有问题,我们只需	要修改代码即可
	e.编译时期异常需要处理,如果不处理代码中会有爆红,那么代码不管是否触发异常我们都运行不了
	f.怎么处理: alt+回车 /  先选中被try的代码 -> 按ctrl+alt+t
                   
4.创建异常对象(了解)    throw new 异常对象()
                   
5.异常处理方式(重点)
    a.在方法参数后面方法体前面
      throws 异常1,异常2...
      throws的多个异常之间如果有子父类继承关系,我们可以直接throws父类
        
    b.try...catch...finally
      try{
          可能出现异常的代码
      }catch(异常 对象名){
          处理异常的方案 -> 将异常信息打印到日志文件中
      }catch(异常 对象名){
          处理异常的方案 -> 将异常信息打印到日志文件中
      }finally{
         不管是否能捕获到异常一定会执行的代码 
      }
          如果try中的代码出现了异常,直接走catch进行捕获   捕获不到相当于没处理
          如果catch的多个异常之间有子父类继承关系,我们可以直接catch父类异常
          finally 后面的肯定执行  如果有return语句 则一定最后执行的是finally的return  其他的return都没用
          finally的使用场景:用于回收资源
          对象都在堆中,当对象不使用了,那么GC负责回收堆内存中的对象,但是有一些对象,GC是回收不了的
         比如:IO流对象,Socket对象,Connection数据库连接对象等,GC是回收不了的
         此时就需要我们手动回收,手动回收的代码就放到finally中   
             
6.抛异常时注意的事项
    a.父类方法抛异常了,子类重写此方法之后要不要抛?
      可抛可不抛  
    b.父类方法没有抛异常,子类重写此方法之后要不要抛?
      不能抛  
             
7.try_catch和throws的使用时机
    a.如果处理异常之后,还想让后续的代码正常执行,我们使用try...catch
    b.如果方法之间是递进关系(调用),我们可以先throws,但是到了最后需要用try...catch做一个统一的异常处理  (controller层必须try...catch  service和dao层可以直接throws)
        
8.打印异常信息的三个方法
    Throwable中的方法
      a.String toString():打印异常类型以及异常信息
      b.String getMessage():打印异常信息
      c.void printStackTrace() :打印的异常信息是最全的         
```

![image-20250714092945673](/images/javase-concepts/image-20250714092945673.png)

![image-20250714093446867](/images/javase-concepts/image-20250714093446867.png)



## Object类

```java
1.概述:Object是所有类的根类（父类）,所有的类都会直接或者间接继承Object类
2.比如:
  public class Zi extends Fu{}  -> Zi类的亲爹是Fu类
  public class Fu{} -> Fu类的亲爹就是Object
```

### native方法

```java
    private static native void registerNatives();->将当前类中的native方法注册进来
    static {
        registerNatives();//注册本地方法
    }
    方法作用:当该类被加载的时候，调用该方法完成对该类中本地方法的注册
        
    在Object类中，除了有registerNatives这个本地方法之外，还有hashCode()、clone()等本地方法，而在Class类中有forName0()这样的本地方法等等。也就是说，凡是包含registerNatives()本地方法的类，同时也包含了其他本地方法。所以，显然，当包含registerNatives()方法的类被加载的时候，注册的方法就是该类所包含的除了registerNatives()方法以外的所有本地方法
            
     registerNatives()注册当前类的本地方法

1.native:关键字->代表的本地方法
2.本地方法是有方法体的:c语言编写,本地方法的方法体源码没有对我们开源,所以我们看不到方法体,简单理解为本地方法就是对java语言的扩展,比如:后面io流部分,很多功能java本身没有,比如读写,那么就需要调用本地方法进进行读写
3.位置:在本地方法栈运行
4.意义:跟系统打交道
```

### GC垃圾回收简介

```java
运行垃圾回收器，JVM将从堆内存中清理对象，清理对象的同时会调用对象的finalize()方法，JVM的垃圾回收器是通过另一个线程开启的，因此程序中的效果并不明显。
    
1.方法:System类中的方法:public static void gc() -> 运行垃圾回收器
2.作用:主要用于回收堆内存中的数据 (方法在栈中会自动弹出)
3.堆内存中的数据什么时候被清理:如果我们的对象没有用了,GC底层会有很多精妙的算法,会做判断,做回收
  比如: Person p = new Person()
       p = null
      
       GC ROOTS->可达性算法 ->从根节点出发,是否能到达对应的对象,如果到不了,证明此对象为垃圾,直接清理
      
4.要了解到的:
  构造方法:new对象的
  析构函数:销毁对象,C语言中才有这个析构函数的概念
      
  Object中的finalize():相当于C语言中的析构函数,用于清理对象,在回收之前,会自动被调用;而且不是垃圾回收器直接调用的,而是垃圾回收器通知当前对象,自动调用此方法进行对象回收
      
public class Person {
    @Override
    protected void finalize() throws Throwable {
        System.out.println(this+".........被清理了");
    }
}  

public class Test01 {
    public static void main(String[] args) {
        Person person = new Person();

        System.out.println(person);//地址值

        person = null;

        System.gc();//运行垃圾回收器
    }
}

5.垃圾回收关键点
    a.垃圾回收机制只回收JVM堆内存里的对象空间。
    b.对其他物理连接，比如数据库连接(Connection)、输入流输出流(IO)、Socket连接(网络编程)无能为力
    c.现在的JVM有多种垃圾回收实现算法，表现各异。
    d.垃圾回收发生具有不可预知性，程序无法精确控制垃圾回收机制执行
    e.可以将对象的引用变量设置为null，暗示垃圾回收机制可以回收该对象。-自动
    f.程序员可以通过System.gc()或者Runtime.getRuntime().gc()来通知系统进行垃圾回收，会有一些效果，但是系统是否进行垃圾回收依然不确定。
    g.垃圾回收机制回收任何对象之前，总会先调用它的finalize()方法（如果重写该方法，让一个新的引用变量重新引用该对象，则会重新激活对象）。
    h.永远不要主动调用某个对象的finalize方法，应该交给垃圾回收机制通知。
```

### toString

```java
1.Object类中的toString:返回该对象的字符串表示
public String toString() {
      return getClass().getName() +"@"+Integer.toHexString(hashCode());
}
2.结论:
  a.如果没有重写Object中的toString,那么就会默认调用Object中的toString方法,输出的是地址值
  b.如果重写了Object中的toString方法,默认就会调用重写的toString方法,重写了toString方法,应该返回对象的内容 
      
3.代码
    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
```

### equals

```java
1.Object中的equals方法:指示其他某个对象是否与此对象“相等”。
  public boolean equals(Object obj) {
        return (this == obj);
  }

  针对于基本类型: ==比较的是值
  针对于引用类型: ==比较的是地址值
      
2.结论:
  a.如果没有重写Object中的equals方法,比较的是地址值
  b.如果重写了Object中的equals方法,应该比较对象的内容
      
3.代码:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }
```

## String

```java
1.概述:String 类代表字符串,属于字符串的类型
2.特点:
  a.Java 程序中的所有字符串字面值（如 "abc" ）都作为此类的实例(对象)实现
    凡是带双引号的都是String的对象
    比如: String s = "abc"  -> String是数据类型;s是对象名;"abc"是对象
        
  b.字符串是常量(底层是被final修饰的数组)；它们的值在创建之后不能更改
        jdk8: 被final修饰的一个char数组
        jdk8之后: 被final修饰的一个byte数组   private final byte[] value;                
  c.因为 String 对象是不可变的，所以可以共享
      
3.String的创建
    a.String()  利用空参构造创建String对象
    b.String(String s) 利用字符串创建String对象
    c.String(char[] chars) 根据char数组创建String对象
    d.String(byte[] bytes) 通过使用平台的默认字符集解码指定的 byte 数组，构造一个新的 String
    5.简化:  String 变量名 = "" 
    
        /*
          d.String(byte[] bytes)通过使用平台的默认字符集解码指定的 byte 数组，构造一个新的 String。
            a.如果字节是正数,会直接转成对应的字符
            b.如果是负数,就涉及到中文了,涉及到中文了,就涉及到编码问题了
              中文对应的字节都是负数

              GBK:一个汉字占2个字节
              UTF-8:一个汉字占3个字节

            c.注意:
              平台:操作系统
              咱们得操作系统默认字符集:GBK

              但是我们的代码是在idea中写的,idea在代码启动的时候,会给代码添加
              一个启动参数:-Dfile.encoding=UTF-8
              所以我们认为idea就是按照UTF-8来编码解码
         */
        byte[] bytes = {97,98,99};
        String s4 = new String(bytes);
        System.out.println(s4); // abc

        byte[] bytes1 = {-27,-101,-67};
        String s5 = new String(bytes1);
        System.out.println(s5); // 国
4.扩展构造:
  1.String(char[] chars,int offset,int length)->将字符数组的一部分转成String
           chars:代表的是被转的数组
           offset:代表的是从数组的哪个索引开始转
           length:转多少个
  2.String(byte[] bytes,int offset,int count) -> 将字节数组的一部分转成String
           bytes:被转的数组
           offset:从数组的哪个索引开始转
           count:转多少个
               
5.判断方法
    a.boolean equals(Object obj) ->比较字符串内容
    b.boolean equalsIgnoreCase(String s) -> 比较字符串内容,忽略大小写  -> 常见于验证码对比使用
               
6.获取功能
    a.String concat(String str)  拼接字符串,返回一个新串
    b.char charAt(int index) 根据索引获取对应的字符
    c.int indexOf(String str) 根据指定的字符串获取对应的第一次出现的索引
    d.String substring(int beginIndex) 从指定的索引位置开始截取字符串到最后,返回一个新串儿
    e.String substring(int beginIndex,int endIndex)从beginIndex截取到endIndex,返回一个新串儿 (含头不含尾)
    f.int length() 获取字符串长度

7.转换功能
    a.char[] toCharArray() -> 将字符串转成char数组
    b.byte[] getBytes() -> 将字符串转成byte数组
    c.String replace(CharSequence target, CharSequence replacement)->将target指定的字符串替换成replacement指定的串儿
    	String类是CharSequence接口的实现类
    d.byte[] getBytes(String charsetName)->将字符串按照指定的编码规则去转成byte数组    charsetName: 编码规则(不区分大小写)
               
8.分割功能
	String[] split(String regex)  -> 按照指定的规则切割字符串
               
9.其他方法
    boolean contains(CharSequence s)  -> 判断字符串中是否包含指定的串儿
    boolean endsWith(String suffix)  -> 判断字符串是否以指定的串儿结尾
    boolean startsWith(String prefix)  -> 判断字符串是否以指定的串儿开头
    String toLowerCase()  -> 将大写字母转成小写
    String toUpperCase() -> 将小写字母转成大写
    String trim() -> 去掉字符串两端空格    
```

![image-20250714214334803](/images/javase-concepts/image-20250714214334803.png)

![image-20250714214341766](/images/javase-concepts/image-20250714214341766.png)

```java
面试题1
public class Test {
    public static void main(String[] args) {
        String s1 = "abc";
        String s2 = "abc";
        String s3 = new String("abc");
        System.out.println(s1==s2);//true
        System.out.println(s1==s3);//false
    }
}

问题1: String s = new String("abc") 共有几个对象  -> 2个 
    
问题2: String s = new String("abc") 共创建了几个对象  -> 1个或2个  (看"abc"是否本来就存在  存在则创建一个对象  不存在则创建两个对象)

    
面试题2 
public class Test {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "world";
        String s3 = "helloworld";
        String s4 = "hello"+"world";
        String s5 = s1+s2;
        String s6 = s1+"world";
        System.out.println(s3==s4);//true
        System.out.println(s3==s5);//false
        System.out.println(s5==s6);//false
    }
}

如果拼接字符串时,等号右边没有变量参与,都是字符串字面值,那么不会随意产生新对象(假如之前有这个拼接好的串儿)

如果等号右边有变量参与拼接 ,即使之前有这个字符串内容,也会产生新对象
```

![image-20250714215217396](/images/javase-concepts/image-20250714215217396.png)

![image-20250714215605578](/images/javase-concepts/image-20250714215605578.png)

## String_文本块

```java
Java 15之后我们就可以放心使用该文本块了
// 源码
<html>
  <body>
      <p>Hello, 尚硅谷</p>
  </body>
</html>

//以前代码写法
"<html>\n" +
"    <body>\n" +
"        <p>Hello, 尚硅谷</p>\n" +
"    </body>\n" +
"</html>\n";

//文本块写法
"""
<html>
  <body>
      <p>Hello, world</p>
  </body>
</html>
""";
    
文本块是Java中的一种新形式，它可以用来表示任何字符串，并且提供更多的表现力和更少的复杂性。
	（1）文本块由零个或多个字符组成，由开始和结束分隔符括起来。
        - 开始分隔符由三个双引号字符表示，后面可以跟零个或多个空格，最终以行终止符结束。
        - 文本块内容以开始分隔符的行终止符（win:\r\n  linux:\n  macos:\r）后的第一个字符开始。
        - 结束分隔符也由三个双引号字符表示，文本块内容以结束分隔符的第一个双引号之前的最后一个字符结束。
	（2）允许开发人员使用“\n”“\f”和“\r”来进行字符串的垂直格式化，使用“\b”“\t”进行水平格式化。如以下示例代码就是合法的。   
    （3）在文本块中自由使用双引号是合法的。
            
String err1 = """""";//开始分隔符后没有行终止符,六个双引号最中间必须换行
String err2 = """  """;//开始分隔符后没有行终止符,六个双引号最中间必须换行
String ac3 = """
    """;  // 正确的  表示空字符串
```

## StringBuilder

```java
1.概述:一个可变的字符序列(底层数组没有被final修饰,数组地址值可以改变)。此类提供一个与 StringBuffer 兼容的 API(StringBuilder和StringBuffer使用一毛一样)
     
2.作用:主要是拼接字符串
     
3.问题:String就可以拼接字符串,那为啥还要学StringBuilder呢?
   a.String拼接字符串的时候,每拼接一次,都会产生一个新的字符串对象,如果拼接过多,会占用内存,而且拼接效率低
   b.StringBuilder底层自带缓冲区,我们所有拼接的字符串内容,都会保存到这个缓冲区中,而且不会随意创建新对象
     所以,用StringBuilder拼接字符串省内存,拼接效率高
     
4.StringBuilder的特点:
  a.底层自带缓冲区,拼接的过程中不会随意产生新对象,缓冲区默认是长度为16的数组
  b.拼接如果超出数组容量,会自动扩容(因为底层数组或者叫缓冲区,没有被final修饰,数组地址值可以改变)
  c.怎么扩容的:创建新数组,指明新数组容量,将老数组元素复制到新数组中去,然后将新数组地址值赋值给老数组
  d.默认扩容容量: 2倍+2   
    如果存储的数据没有超过默认扩容容量,就按照2倍+2扩容 
    如果存储的数据超过了默认扩容容量,那么就直接按照实际存的数据来扩容  
      
5.String,StringBuilder,StringBuffer区别:
    相同点:都可以字符串拼接
    不同点:
       a.String:每拼接一次都会产生新的对象,占用内存,拼接效率低
       b.StringBuilder:不会随意产生新对象,效率高,线程不安全
       c.StringBuffer:不会随意产生新对象,效率低,线程安全
    从拼接效率来说: StringBuilder>StringBuffer>String
        
6.StringBuilder使用:
    a.StringBuiler()
    b.StringBuilder(String str)
7.StringBuilder的常用方法       
    a.StringBuilder append(任意类型) -> 拼接字符串,返回的是StringBuilder自己
    b.StringBuilder reverse() -> 字符串翻转,返回的是StringBuilder自己
    c.String toString() -> 将StringBuilder转成String -> 将来用StringBuilder拼接之后,需要调用String中的方法去处理拼接好的字符串,所以我们需要将StringBuilder转成String   


```

## Math

```java
1.概述:数学工具类
2.作用:做数学运算
3.特点:
  a.构造私有
  b.方法都是静态的
4.使用:
  类名直接调用  Math.方法名
      
static int abs(int a) -> 求参数的绝对值
static double ceil(double a) -> 向上取整
static double floor(double a) ->向下取整
static long round(double a)  -> 四舍五入
static int max(int a, int b) ->求两个数之间的较大值 
static int min(int a, int b) ->求两个数之间的较小值
```

## BigInteger

```java
1.问题:将来我们可能会遇到超大整数,大到连long型都接收不了了,所以我们将这个整数可以称之为是一个"对象"
2.作用:
  处理超大整数
      
3.构造:
  BigInteger(String val) -> 字符串内容必须是数字格式
4.方法:
  BigInteger add(BigInteger val)  -> 加法 
  BigInteger subtract(BigInteger val) ->减法 
  BigInteger multiply(BigInteger val) -> 乘法
  BigInteger divide(BigInteger val)   -> 除法  
      
5.BigInteger可以操作的最大整数42亿的21亿次方,内存根本扛不住这么大的数,所以我们认为BigInteger是无限大的
```

## BigDecimal

```java
1.问题:float和double直接参与运算,会有精度损失问题
2.可以使用BigDecimal去解决
3.作用:解决float和double直接参与运算,会有精度损失的问题    

4.构造: 
  BigDecimal(String val)   
5.方法:
  static BigDecimal valueOf(double val)
  BigDecimal add(BigDecimal val)  -> 加法 
  BigDecimal subtract(BigDecimal val) ->减法 
  BigDecimal multiply(BigDecimal val) -> 乘法
  BigDecimal divide(BigDecimal val)   -> 除法  -> 如果除不尽,会报算数异常ArithmeticException
  BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)  
      divisor:除号后面的数
          scale:保留几位小数
              roundingMode:取舍方式 -> 传递的是BigDecimal中的静态变量    
                               static int ROUND_UP -> 向上加1
                               static int ROUND_DOWN -> 直接舍去
                               static int ROUND_HALF_UP -> 四舍五入
6.方法上一旦带@Deprecated(since="9")注解,证明此方法是过时方法
```

```java
import java.math.BigDecimal;

public class BigDecimalTest {
    public static void main(String[] args) {
        BigDecimal b1 = new BigDecimal("3.55");
        BigDecimal b2 = BigDecimal.valueOf(2.12);
        BigDecimal add = b1.add(b2);
        System.out.println(add);
        BigDecimal sub = b1.subtract(b2);
        System.out.println(sub);
        BigDecimal mul = b1.multiply(b2);
        System.out.println(mul);
        BigDecimal div = b1.divide(b2, 2, BigDecimal.ROUND_HALF_UP);
        System.out.println(div);
    }
}
```

## Date日期类

```java
1.概述:表示特定的瞬间，精确到毫秒
2.地理常识:
  a.北京经纬度:
    东经:116.20
    北纬:39.56
        
  b.北京时区: 东8区
      
3.时间原点:1970年1月1日 0时0分0秒    -> 0度经线 -> 跟咱们东八区差8个小时    
    
4.1秒 = 1000毫秒
    
5.构造:
  Date()-> 根据无参构造创建对象,代表当前系统时间,从时间原点算的
  Date(long time) -> 根据指定的毫秒值创建对象,从时间原点算的  经过time的时间（
注意时区偏移问题）
      
6.Date类的常用方法
    a.void setTime(long time) -> 设置时间,传递毫秒值  经过time的时间（
注意时区偏移问题）
    b.long getTime() -> 获取时间对应的毫秒值   
```

## Calendar日历类

```java
1.概述:日历类 -> 抽象类
2.作用:主要是操作时间字段的(年月日时分秒都叫时间字段)
3.获取:
  static Calendar getInstance()
4.注意:
  Calendar中的月份从0开始的,所以我们获取时需要+1
5.方法:
  int get(int field) ->返回给定日历字段的值
  void set(int field, int value)  :将给定的日历字段设置为指定的值
  void add(int field, int amount) :根据日历的规则,为给定的日历字段添加或者减去指定的时间量
  void set(int year, int month, int date)  -> 设置年月日
  Date getTime():将Calendar转成Date对象   
  
  field:代表的是字段,这些字段都是Calendar中的静态的成员变量,所以我们指定字段时,需要类名直接调用   
```

![image-20250714224635093](/images/javase-concepts/image-20250714224635093.png)

```java
需求:键盘录入一个年份,判断是否为闰年或者平年 
    
import java.util.Calendar;
import java.util.Scanner;

public class CalendarTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int year = scanner.nextInt();

        Calendar calendar = Calendar.getInstance();
        calendar.set(year, 2, 1);  // 相当于咱们的3.1日
        calendar.add(Calendar.DATE, -1);
        int day = calendar.get(Calendar.DATE);  // 返回当前日期中的“日”部分。
        if (day==29){
            System.out.println(year+"是闰年");
        }else {
            System.out.println(year+"不是闰年");
        }
    }
}
```

## SimpleDateFormat日期格式化类

```java
1.概述:SimpleDateFormat extends DateFormat
2.作用:
  a.将Date对象按照指定的格式格式化成String
  b.将符合日期格式的String转成Date对象
3.构造:
  SimpleDateFormat(String pattern) -> 按照指定的日期格式创建SimpleDateFormat对象
4.方法:
  a.String format(Date date)-> 将Date对象按照指定格式转成String
  b.Date parse(String time) -> 按照符合日期格式的字符串转成Date对象
      
```

| 时间字母表示 | 说明 |
| ------------ | ---- |
| y            | 年   |
| M            | 月   |
| d            | 日   |
| H            | 时   |
| m            | 分   |
| s            | 秒   |

> 字母不能改变,但是中间的连接符可以改变  -  : 等

## JDK8新日期类  LocalDate  LocalDateTime

```java
1.概述:LocalDate是一个不可变的日期时间对象，表示日期，通常被视为年月日 
2.作用:操作年月日
3.获取:
  a.static LocalDate now()  获取当前系统时间
  b.static LocalDate of(int year, int month, int dayOfMonth)  设置年月日   

4.概述:LocalDateTime是一个不可变的日期时间对象，代表日期时间，通常被视为年 - 月 - 日 - 时 - 分 - 秒   
5.作用:操作精确时间
6.获取: a.static LocalDateTime now()-> 获取当前系统时间  b.static LocalDateTime of(int year, int month, int dayOfMonth, int hour, int minute, int second)-> 设置年月日时分秒
    
int getYear()->获取年份
int getMonthValue()->获取月份
int getDayOfMonth()->获取月中的第几天
    
LocalDate withYear(int year):设置年份
LocalDate withMonth(int month):设置月份
LocalDate withDayOfMonth(int day):设置月中的天数

设置日期字段的偏移量,方法名plus开头,向后偏移
设置日期字段的偏移量,方法名minus开头,向前偏移
    
import java.time.LocalDate;

public class LocalDateTest {
    public static void main(String[] args) {
        LocalDate now = LocalDate.now();
        System.out.println(now); // 2025-07-15

        LocalDate localDate = now.plusYears(1);
        System.out.println(localDate); // 2026-07-15
    }
}
```

### Period和Duration类

```java
1.作用:计算年月日时间偏差
2.方法:
  static Period between(LocalDate d1,LocalDate d2):计算两个日期之间的差值
  
  getYears()->获取相差的年
  getMonths()->获取相差的月
  getDays()->获取相差的天

public class PeriodTest {
    public static void main(String[] args) {
        LocalDate local1 = LocalDate.of(2023, 10, 10);
        LocalDate local2 = LocalDate.of(2024, 11, 9);

        Period period = Period.between(local1, local2);
        System.out.println(period.getYears());
        System.out.println(period.getMonths());
        System.out.println(period.getDays());
    }
}


3.作用:计算精确时间
4.方法:
  static Duration between(Temporal startInclusive, Temporal endExclusive)  -> 计算时间差
      
  Temporal是一个接口,常用的实现类:LocalDate,LocalDateTime ,但是Duration是计算精确时间偏差的,所以这里传递能操作时分秒的LocalDateTime对象

5.利用Duration获取相差的时分秒 -> to开头
  toDays() :获取相差天数
  toHours(): 获取相差小时
  toMinutes():获取相差分钟
  toMillis():获取相差秒(毫秒)
      
public class DurationTest {
    public static void main(String[] args) {
        LocalDateTime local1 = LocalDateTime.of(2023, 10, 10, 10, 10, 10);
        LocalDateTime local2 = LocalDateTime.of(2024, 11, 11, 11, 11, 11);
        Duration duration = Duration.between(local1, local2);
        //toDays() :获取相差天数
        System.out.println(duration.toDays());
        //toHours(): 获取相差小时
        System.out.println(duration.toHours());
        //toMinutes():获取相差分钟
        System.out.println(duration.toMinutes());
        //toMillis():获取相差秒(毫秒)
        System.out.println(duration.toMillis());
    }
}

6.计算年月日时间偏差用Period
7.计算精确时间偏差用Duration
```

### DateTimeFormatter日期格式化类

```java
1.获取:
  static DateTimeFormatter ofPattern(String pattern)   -> 获取对象,指定格式
2.方法:
  a.String format(TemporalAccessor temporal)-> 将日期对象按照指定的规则转成String
    TemporalAccessor:是一个接口,实现类有LocalDate以及LocalDateTime  
        
  b.TemporalAccessor parse(CharSequence text)-> 将符合规则的字符串转成日期对象   
  c.LocalDateTime  from(TemporalAccessor temporalAccessor) -> 将TemporalAccessor 转换成LocalDateTime
        
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

public class DateTimeFormatTest {
    public static void main(String[] args) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.now();
        String format = dtf.format(localDateTime);
        System.out.println(format); // 2025-07-15 09:37:47

        String time = "2020-01-01 10:10:10";
        TemporalAccessor parse = dtf.parse(time);
        System.out.println(parse); // {},ISO resolved to 2020-01-01T10:10:10
        LocalDateTime localDateTime1 = LocalDateTime.from(parse);
        System.out.println(localDateTime1); // 2020-01-01T10:10:10
    }
}
```

![image-20250715093232074](/images/javase-concepts/image-20250715093232074.png)

## System类

```java
1.概述:系统相关工具类
2.特点:
  a.构造私有
  b.方法静态
3.使用:
  类名直接调用
```

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| static long currentTimeMillis()                              | 获取当前系统时间毫秒值                                       |
| static void exit(int status)                                 | 退出当前正在执行的jvm                                        |
| static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length) | 数组复制<br/>src:源数组<br/>srcPos:从源数组的哪个索引开始复制<br/>dest:目标数组<br/>destPos:从目标数组的哪个索引开始粘贴<br/>length:复制多少个 |

```java
public class SystemTest {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10; i++) {
            if (i==5){
                //退出正在执行的jvm
                //System.exit(0);
            }
            System.out.println("哈哈哈");
        }
        long end = System.currentTimeMillis();

        System.out.println(end-start);

        System.out.println("============================");

        int[] arr1 = {1,2,3,4,5,6};
        int[] arr2 = new int[10];
        System.arraycopy(arr1,0,arr2,0,2);
        System.out.println(Arrays.toString(arr2));
    }
}
```

## Arrays数组工具类

```java
1.概述:数组工具类
2.作用:操作数组
3.特点:
  a.构造私有
  b.方法静态
4.使用:
  类名直接调用
```

| 方法                                               | 说明                               |
| -------------------------------------------------- | ---------------------------------- |
| static void sort(int[] a)                          | 数组升序                           |
| static String toString(int[] a)                    | 将数组元素打印出来[元素1,元素2...] |
| static int binarySearch(int[] a, int key)          | 二分查找,前提数组是升序的          |
| static int[] copyOf(int[] original, int newLength) | 数组扩容,返回新数组                |

![image-20250715094455473](/images/javase-concepts/image-20250715094455473.png)

## 包装类

```java
1.概述:基本数据类型对应的引用类型-> 包装类  (int char 特殊 -> Integer Character)
2.为啥要用包装类:
  将来我们在操作数据的时候或者调用方法的时候,人家要求用引用类型,不让直接传递基本类型的数据,此时我们就需要传递基本类型对应的包装类型
  比如: ArrayList<Integer> list = new ArrayList<Integer>()   
  再比如: add(Integer i) 
      
3.装箱
    a.装箱:将基本类型转成对应的包装类
    b.方法:Integer中的方法 -> static Integer valueOf(int i) 
    c.为啥装箱:将来操作某个方法,或者存某个数据,人家要求使用包装类,此时我们就需要装箱
    
4.拆箱
    a.拆箱:将包装类转成对应的基本类型
    b.方法:Integer中的方法
      int intValue() 
    c.为啥要拆箱:包装类不能直接用+ - * /等符号所以,需要先转成基本类型才能直接运算

5.自动拆箱装箱  将来一般情况下都是自动拆箱和装箱
    public class IntegerTest {
        public static void main(String[] args) {
            Integer i = 100;//自动装箱
            /*
               先将i拆箱,然后和10做运算
               得出一个结果,再重新装箱
               重新赋值给Integer的i
             */
            i+=10;
            System.out.println(i);
        }
    }

6.Integer基本使用
  Integer(int value) 
  Integer(String s)   s必须是数字格式 "1"
```

| 基本类型 | 包装类        |
| -------- | ------------- |
| byte     | Byte          |
| short    | Short         |
| int      | **Integer**   |
| long     | Long          |
| float    | Float         |
| double   | Double        |
| char     | **Character** |
| boolean  | Boolean       |

![image-20250715095418155](/images/javase-concepts/image-20250715095418155.png)



```java
public class IntegerTest {
 public static void main(String[] args) {
     Integer i1 = 100;
     Integer i2 = 100;
     System.out.println(i1 == i2);//true

     Integer i3 = 200;
     Integer i4 = 200;
     System.out.println(i3 == i4);//false
 }
}

默认缓冲区的数据为  -128 ~ 127  超了会new对象
```

![image-20250715095621305](/images/javase-concepts/image-20250715095621305.png)

![image-20250715095502943](/images/javase-concepts/image-20250715095502943.png)



```java
基本类型和String之间的转换
  
// 基本数据类型 -> String
1.方式1: + 拼接
2.方式2: String中的静态方法:
  String valueOf(int i)

// String  -> 基本数据类型
3.每一个包装类中都有一个类似的方法:parseXXX()
```

| 位置    | 方法                                  | 说明                    |
| ------- | ------------------------------------- | ----------------------- |
| Byte    | static byte parseByte(String s)       | 将字符串转成byte类型    |
| Short   | static short parseShort(String s)     | 将字符串转成short类型   |
| Integer | static int parseInt(String s)         | 将字符串转成int类型     |
| Long    | static long parseLong(String s)       | 将字符串转成long类型    |
| Float   | static float parseFloat(String s)     | 将字符串转成float类型   |
| Double  | static double parseDouble(String s)   | 将字符串转成double类型  |
| Boolean | static boolean parseBoolean(String s) | 将字符串转成boolean类型 |

## 多线程

```java
0.进程:进入到内存执行的应用程序

1.线程:进程中的一个执行单元
2.线程作用:负责当前进程中程序的运行.一个进程中至少有一个线程,一个进程还可以有多个线程,这样的应用程序就称之为多线程程序
3.简单理解:进程中的一个功能就需要一条线程去执行 
```

![image-20250715100626862](/images/javase-concepts/image-20250715100626862.png)

> 使用场景: 软件中的耗时操作 -> 拷贝大文件, 加载大量的资源
>
> ​                     所有的聊天软件
>
> ​                     所有的后台服务器
>
> 多线程程序同时干多件事儿,提高了CPU使用率

```java
并行:在同一个时刻,有多个指令在多个CPU上(同时)执行(好比是多个人做不同的事儿)
    比如:多个厨师在炒多个菜
        
并发:在同一个时刻,有多个指令在单个CPU上(交替)执行
    比如:一个厨师在炒多个菜
        
细节:
  1.之前CPU是单核,但是在执行多个程序的时候好像是在同时执行,原因是CPU在多个线程之间做高速切换
  2.现在咱们的CPU都是多核多线程的了,比如2核4线程,那么CPU可以同时运行4个线程,此时不用切换,但是如果多了,CPU就要切换了,所以现在CPU在执行程序的时候并发和并行都存在

CPU调度      
    1.分时调度:让所有的线程轮流获取CPU使用权,并且平均分配每个线程占用CPU的时间片
    2.抢占式调度:多个线程抢占CPU使用权,哪个线程优先级越高,先抢到CPU使用权的几率就大,但是不是说每次先抢到CPU使用权的都是优先级高的线程,只是优先级高的线程先抢到CPU使用权的几率会大一些 -> java代码
        
主线程：专门为main方法服务的线程
```

![image-20250716085844783](/images/javase-concepts/image-20250716085844783.png)

## 线程创建

```java
1.第一种方式_extends Thread
    a.定义一个自定义线程类,继承Thread类	
    b.重写Thread中的run方法,在run方法中设置线程任务(该线程要干的事儿,要执行的代码)
    c.创建自定义线程类对象
    d.调用Thread类中的start方法(开启线程,jvm会自动执行run方法) 
    e.如果直接调用run方法,并不代表将线程开启,仅仅是简单的调用方法. 只有调用start方法,线程才会真正开启
    f.同一个线程对象,不要连续调用多次start方法;如果想开启新线程,就需要重新new一个线程对象
    g.在run方法中有异常只能try,不能throws,因为Thread中的run方法没有throws,重写之后就不能throws

2.Thread类中的方法
    void start() -> 开启线程,jvm自动调用run方法
    void run()  -> 设置线程任务,这个run方法是Thread重写的接口Runnable中的run方法
    String getName()  -> 获取线程名字
    void setName(String name) -> 给线程设置名字
    static Thread currentThread() -> 获取正在执行的线程对象(此方法在哪个线程中使用,获取的就是哪个线程对象)
    static void sleep(long millis)->线程睡眠,超时后自动醒来继续执行,传递的是毫秒值
    void setPriority(int newPriority)   -> 设置线程优先级,优先级越高的线程,抢到CPU使用权的几率越大,但是不是每次都先抢到
        
    int getPriority()  -> 获取线程优先级
        
    void setDaemon(boolean on)  -> 设置为守护线程,当非守护线程执行完毕,守护线程就要结束,但是守护线程也不是立马结束,当非守护线程结束之后,系统会告诉守护线程人家结束了,你也结束吧,在告知的过程中,守护线程会执行,只不过执行到半路就结束了
        
    static void yield() -> 礼让线程,让当前线程让出CPU使用权
        场景说明:如果两个线程一起执行,可能会执行一会儿线程A,再执行一会线程B,或者可能线程A执行完毕了,线程B再执行
        那么我们能不能让两个线程尽可能的平衡一点 -> 尽量让两个线程交替执行
注意:只是尽可能的平衡,不是绝对的你来我往,有可能线程A线程执行,然后礼让了,但是回头A又抢到CPU使用权了
        
    void join() -> 插入线程或者叫做插队线程

public class MyThread extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try{
                Thread.sleep(1000);
            }catch (InterruptedException e){
                e.printStackTrace();
            }
        System.out.println(Thread.currentThread().getName() + "自定义线程");
        }
    }
}
        
public class ThreadTest {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.setName("zuo");
        myThread.start();
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + "方法");
        }
    }
}

```

![image-20250716090350628](/images/javase-concepts/image-20250716090350628.png)

![image-20250716091003269](/images/javase-concepts/image-20250716091003269.png)



```java
第二种方式_实现Runnable接口   
    a.定义一个类MyRunnable,实现Runnable接口
    b.重写run方法,设置线程任务
    c.创建MyRunnable对象,然后再创建Thread对象,将MyRunnable对象当参数传递到Thread对象中
      Thread(Runnable target) 
    d.调用Thread中的start方法,开启线程,jvm自动执行run方法
   
public class RunnableTest {
    public static void main(String[] args) {
//        MyRunnable myRunnable = new MyRunnable();
//        Thread thread = new Thread(myRunnable);
//        thread.start();

        // 匿名内部类创建多线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "自定义线程");
            }
        },"zuo").start();
        System.out.println(Thread.currentThread().getName() + "方法");
    }
}
    
1.继承方式:有局限性的,因为继承只支持单继承,如果一个线程类还需要继承一个其他的父类,此时就不能继承其他的父类了
    
2.接口方式:解决了单继承的局限性,因为一个子类继承一个父类的同时还可以实现一个或者多个接口  
    
3.实现多线程的方式有4种:
    a.继承Thead
    b.实现Runnable接口
    c.实现Callable接口
    d.线程池方式实现
```

## 线程安全和死锁

```java
出现线程不安全的原因:多个线程同时访问同一个资源
    
解决线程安全问题的第一种方式(使用同步代码块)
    1.格式:
      synchronized(锁对象){
          可能出现的线程不安全的代码
      }

    2.执行流程:
      线程抢到所之后进入到同步代码块中执行,其他线程就需要在外面等待,等待在同步代码块中的代码执行完毕,出了同步代码块,相当于释放锁了,等待的线程才会有机会抢到锁去执行

    3.注意:锁对象是任意对象,但是多个线程之间必须共享同一把锁对象
        
解决线程安全问题的第二种方式:同步方法
    1.普通同步方法_非静态
        a.格式:
      	修饰符 synchronized 返回值类型 方法名(形参){
          可能出现的线程不安全代码
      	}

    	b.默认锁:this
            
    2.静态同步方法
        a.格式:
          修饰符 static synchronized 返回值类型 方法名(形参){
              可能出现的线程不安全代码
          }

        b.默认锁:当前类.class -> 获取类的class对象,class对象只有一个
            
public class MyTicket implements Runnable {
    static int ticket = 100;

    //Object obj = new Object();

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            method();
        }
    }

    public synchronized void method1(){
        if (ticket > 0) {
            System.out.println(Thread.currentThread().getName() + "买了第" + ticket + "张票");
            ticket--;
        }
    }

/*    public void method1(){
        synchronized (this){
            if (ticket > 0) {
                System.out.println(Thread.currentThread().getName() + "买了第" + ticket + "张票");
                ticket--;
            }
        }
    }*/

    public static synchronized void method(){
        if (ticket > 0) {
            System.out.println(Thread.currentThread().getName() + "买了第" + ticket + "张票");
            ticket--;
        }
    }

/*    public static void method(){
        synchronized (MyTicket.class){
            if (ticket > 0) {
                System.out.println(Thread.currentThread().getName() + "买了第" + ticket + "张票");
                ticket--;
            }
        }
    }*/
}

public class Test {
    public static void main(String[] args) {
        MyTicket myTicket = new MyTicket();
        Thread t1 = new Thread(myTicket, "广坤");
        Thread t2 = new Thread(myTicket, "赵四");
        Thread t3 = new Thread(myTicket, "刘能");
        t1.start();
        t2.start();
        t3.start();
    }
}
```



```java
指的是两个或者两个以上的线程在执行的过程中由于竞争同步锁而产生的一种阻塞现象;如果没有外力的作用,他们将无法继续执行下去,这种情况称之为死锁
    
根据下图所示:线程1正在持有锁1,但是线程1必须再拿到锁2,才能继续执行
而线程2正在持有锁2,但是线程2需要再拿到锁1,才能继续执行
此时两个线程处于互相等待的状态,就是死锁,在程序中的死锁将出现在同步代码块的嵌套中
```

![image-20250716092525748](/images/javase-concepts/image-20250716092525748.png)

## 线程状态

```java
  当线程被创建并启动以后，它既不是一启动就进入了执行状态，也不是一直处于执行状态。在线程的生命周期中，有几种状态呢？在API中java.lang.Thread.State这个枚举中给出了六种线程状态。
```

| 线程状态                | 导致状态发生条件                                             |
| ----------------------- | ------------------------------------------------------------ |
| NEW(新建)               | 线程刚被创建，但是并未启动。还没调用start方法。              |
| Runnable(可运行)        | 线程可以在java虚拟机中运行的状态，可能正在运行自己代码，也可能没有，这取决于操作系统处理器。 |
| Blocked(锁阻塞)         | 当一个线程试图获取一个对象锁，而该对象锁被其他的线程持有，则该线程进入Blocked状态；当该线程持有锁时，该线程将变成Runnable状态。 |
| Waiting(无限等待)       | 一个线程在等待另一个线程执行一个（唤醒）动作时，该线程进入Waiting状态。进入这个状态后是不能自动唤醒的，必须等待另一个线程调用notify或者notifyAll方法才能够唤醒。 |
| Timed Waiting(计时等待) | 同waiting状态，有几个方法有超时参数，调用他们将进入Timed Waiting状态。这一状态将一直保持到超时期满或者接收到唤醒通知。带有超时参数的常用方法有Thread.sleep 、Object.wait。 |
| Terminated(被终止)      | 因为run方法正常退出而死亡，或者因为没有捕获的异常终止了run方法而死亡。或者调用过时方法stop() |

![image-20250716092936185](/images/javase-concepts/image-20250716092936185.png)



```java
要求:一条线程生产,一条线程消费,不能连续生产,不能连续消费 -> 线程的通信
```

![image-20250716093224978](/images/javase-concepts/image-20250716093224978.png)



```java
public class BaoZiPu {
    private int count;
    private boolean flag;

    public BaoZiPu() {
    }

    public BaoZiPu(int count, boolean flag) {
        this.count = count;
        this.flag = flag;
    }

    /**
     * get方法专门为消费线程服务
     */
    public void getCount() {
        System.out.println("消费了第......"+count+"个包子");
    }

    /**
     * set方法专门为生产线程服务
     */
    public void setCount() {
        count++;
        System.out.println("生产了第..."+count+"个包子");
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}

/**
 * 生产者
 */
public class Product implements Runnable {
    private BaoZiPu baoZiPu;
    public Product(BaoZiPu baoZiPu) {
        this.baoZiPu = baoZiPu;
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (baoZiPu) {
                //1.如果flag为true,证明有包子,生产线程等待
                if (baoZiPu.isFlag() == true) {
                    try {
                        baoZiPu.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                //2.如果flag为false,证明没有包子,就要生产包子
                baoZiPu.setCount();
                //3.修改flag状态为true,证明有包子了
                baoZiPu.setFlag(true);
                //4.唤醒消费线程
                baoZiPu.notify();
            }
        }
    }
}


/**
 * 消费者
 */
public class Consumer implements Runnable {
    private BaoZiPu baoZiPu;
    public Consumer(BaoZiPu baoZiPu) {
        this.baoZiPu = baoZiPu;
    }
    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (baoZiPu) {
                //1.如果flag为false,证明没有包子,消费线程等待
                if (baoZiPu.isFlag() == false) {
                    try {
                        baoZiPu.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                //2.如果flag为true,证明有包子,就要消费包子
                baoZiPu.getCount();
                //3.修改flag状态为false,证明没有包子了
                baoZiPu.setFlag(false);
                //4.唤醒生产线程
                baoZiPu.notify();
            }
        }
    }
}


public class Test {
    public static void main(String[] args) {
        BaoZiPu baoZiPu = new BaoZiPu();

        // 必须保证锁是同一个对象
        Product product = new Product(baoZiPu);
        Consumer consumer = new Consumer(baoZiPu);

        Thread t1 = new Thread(product);
        Thread t2 = new Thread(consumer);

        t1.start();
        t2.start();
    }
}
```

```java
用同步方法改造等待唤醒案例
    
public class BaoZiPu {
    private int count;
    private boolean flag;

    public BaoZiPu() {
    }

    public BaoZiPu(int count, boolean flag) {
        this.count = count;
        this.flag = flag;
    }

    /**
     * get方法专门为消费线程服务
     */
    public synchronized void getCount() {
        //1.如果flag为false,证明没有包子,消费线程等待
        if (this.flag == false) {
            try {
               this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        //2.如果flag为true,证明有包子,就要消费包子
        System.out.println("消费了第......"+count+"个包子");
        //3.修改flag状态为false,证明没有包子了
        this.flag = false;
        //4.唤醒生产线程
        this.notify();
    }

    /**
     * set方法专门为生产线程服务
     */
    public synchronized void setCount() {
        //1.如果flag为true,证明有包子,生产线程等待
        if (this.flag == true) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        //2.如果flag为false,证明没有包子,就要生产包子
        count++;
        System.out.println("生产了第..."+count+"个包子");
        //3.修改flag状态为true,证明有包子了
        this.flag = true;
        //4.唤醒消费线程
        this.notify();
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}


/**
 * 生产者
 */
public class Product implements Runnable {
    private BaoZiPu baoZiPu;
    public Product(BaoZiPu baoZiPu) {
        this.baoZiPu = baoZiPu;
    }

    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            baoZiPu.setCount();
        }
    }
}


/**
 * 消费者
 */
public class Consumer implements Runnable {
    private BaoZiPu baoZiPu;
    public Consumer(BaoZiPu baoZiPu) {
        this.baoZiPu = baoZiPu;
    }
    @Override
    public void run() {
        while (true) {
            try {
                Thread.sleep(100L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
           baoZiPu.getCount();
        }
    }
}


// 解决多生产多消费问题(if改为while,将notify改为notifyAll)
public class BaoZiPu {
    private int count;
    private boolean flag;

    public BaoZiPu() {
    }

    public BaoZiPu(int count, boolean flag) {
        this.count = count;
        this.flag = flag;
    }

    /**
     * get方法专门为消费线程服务
     */
    public synchronized void getCount() {
        //1.如果flag为false,证明没有包子,消费线程等待
        while (this.flag == false) {
            try {
               this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        //2.如果flag为true,证明有包子,就要消费包子
        System.out.println("消费了第......"+count+"个包子");
        //3.修改flag状态为false,证明没有包子了
        this.flag = false;
        //4.唤醒等待线程
        this.notifyAll();
    }

    /**
     * set方法专门为生产线程服务
     */
    public synchronized void setCount() {
        //1.如果flag为true,证明有包子,生产线程等待
        while (this.flag == true) {
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        //2.如果flag为false,证明没有包子,就要生产包子
        count++;
        System.out.println("生产了第..."+count+"个包子");
        //3.修改flag状态为true,证明有包子了
        this.flag = true;
        //4.唤醒等待线程
        this.notifyAll();
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}
```

## 单例设计模式

```java
设计模式（Design pattern），是一套被反复使用、经过分类编目的、代码设计经验的总结，使用设计模式是为了可重用代码、保证代码可靠性、程序的重用性,稳定性。

1995 年，GoF（Gang of Four，四人组）合作出版了《设计模式：可复用面向对象软件的基础》一书，共收录了 23 种设计模式。  <<大话设计模式>>  --> 见资料pdf

总体来说设计模式分为三大类：

创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。-->创建对象

结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。-->对功能进行增强

行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。 
```

```java
单例设计模式
    目的:让一个类只产生一个对象,供外界使用
    单:一个
    例:实例,对象

饿汉式单例模式
    我好饿呀,想马上要一个对象,迫不及待的想要一个对象
    既然想马上来个对象,我们就需要让这个对象赶紧new出来,尽早new出来 
        
public class Singleton {
    /**
     * 由于我们一个类只产生一个对象
     * 所以我们就不能让外界随便new
     * 所以我们需要将构造方法私有化
     */
    private Singleton() {
    }

    /*
       由于是饿汉式,需要我们自己赶紧new一个对象出来
       所以我们需要在new的时候,将其变成静态的

       又由于我们new出来的对象不能随便让外界通过类名调用
       所以将其再变成private的
     */
    private static Singleton singleton = new Singleton();

    /**
     * 定义一个公共的接口,将内部的对象返回给外界
     */
    public static Singleton getInstance() {
        return singleton;
    }
}
        
懒汉式单例模式
	不着急new对象,啥时候用,啥时候new,也要保证一个类只产生一个对象
    
public class Singleton2 {
    /**
     * 由于我们一个类只产生一个对象
     * 所以我们就不能让外界随便new
     * 所以我们需要将构造方法私有化
     */
    private Singleton2() {
    }

    /*
       由于是懒汉式,不着急new对象了
     */
    private static Singleton2 singleton = null;

    /**
     * 定义一个公共的接口,将内部的对象返回给外界
     */
    public static Singleton2 getInstance() {
        if (singleton == null){
            synchronized (Singleton2.class){
                if (singleton == null){
                    singleton = new Singleton2();
                }
            }
        }
        return singleton;
    }
}
```

## Lambda表达式

```java
1.函数式编程思想和Lambda表达式定义格式
    a.面向对象思想:讲究的是先找对象,然后调用对象中的方法 -> 过于强调找对象这个过程
      好比是:去成都 -> 过于强调怎么去
    b.函数式编程思想:jdk8开始有的 -> 强调的是目的,结果,不强调过程
      比如:去成都 -> 强调的是去了还是没去
          
2.Lambda表达式使用前提
    a.必须是函数式接口作为方法参数传递
    b.函数式接口 -> 有且只有一个抽象方法的接口
          
3.Lambda表达式省略规则
    旭哥秘籍:初学者怎么学
       1.先观察是否是函数式接口做方法参数传递
       2.如果是,考虑使用lambda表达式
       3.调用方法,实参以匿名内部类方式传递
       4.从new接口开始到重写方法的方法名结束选中,删除,别忘记再删除一个右半个大括号
       5.在剩下的重写方法的参数和方法体之间,加上 -> 

    省略规则:
       1.重写方法的参数类型可以省略
       2.如果重写方法的参数只有一个,所在的小括号可以省略
       3.如果重写方法的方法体中只有一句代码,所在的大括号以及分号可以省略
       4.如果重写方法的方法体中只有一句代码,而且是带return的,那么所在的大括号,分号以及return关键字都可以省略
           
4.例子
// 函数式接口  只有一个抽象方法
public interface USB {
    public abstract String open(String s);
}

public class Test {
    public static void main(String[] args) {
        method(new USB() {
            @Override
            public String open(String s) {
                return s + "打开了...";
            }
        });

        System.out.println("============================");
        method(s -> s + "打开了...");
    }

    public static void method(USB usb){
        String result = usb.open("鼠标");
        System.out.println(result);
    }
}
```

## 函数式接口

```java
1.概述:有且只有一个抽象方法的接口
2.检测注解:@FunctionalInterface -> 在接口上写    
```

```java
1.Supplier
    a.Supplier接口
       java.util.function.Supplier<T>接口，它意味着"供给"->我们想要什么就给什么
    b.方法:
      T get() -> 我们想要什么,get方法就可以返回什么

    c.需求:
       使用Supplier接口作为方法的参数
       用Lambda表达式求出int数组中的最大值

    d.泛型:
      <引用数据类型> -> 规定了我们操作的数据是什么类型
      <>中只能写引用数据类型（包装类）,不能写基本数据类型
      泛型的作用就是为了统一类型 
          
    e.代码:
        public class SupplierTest {
            public static void main(String[] args) {
                method(new Supplier<Integer>() {
                    @Override
                    public Integer get() {
                        int[] arr = {2, 5, 3, 4, 1, 7, 9};
                        Arrays.sort(arr);
                        return arr[arr.length - 1];
                    }
                });
                System.out.println("=========================");
                method(() -> {int[] arr = {2, 5, 3, 4, 1, 7, 9};
                    Arrays.sort(arr);
                    return arr[arr.length - 1];});
            }

            public static void method(Supplier supplier) {
                System.out.println(supplier.get());
            }
        }


2.Consumer
    java.util.function.Consumer<T> ->消费型接口 ->操作
    方法:  void accept(T t)，意为消费一个指定泛型的数据
    "消费"就是"操作",至于怎么操作,就看重写accept方法之后,方法体怎么写了
    public class ConsumerTest {
        public static void main(String[] args) {
            method(new Consumer<String>(){
                @Override
                public void accept(String s) {
                    System.out.println(s);
                }
            });

            System.out.println("=====================");
            method(s -> System.out.println(s));
        }

        public static void method(Consumer consumer){
            consumer.accept("zuo");
        }
    }

3.Function
    java.util.function.Function<T,R>接口用来根据一个类型的数据得到另一个类型的数据
    方法: R apply(T t) 根据类型T参数获取类型R的结果  T类型 -> R类型  
    public class FunctionTest {
        public static void main(String[] args) {
            method(new Function<String, Integer>() {
                @Override
                public Integer apply(String s) {
                    return Integer.parseInt(s);
                }
            }, "100");
            System.out.println("===================");
            method(s -> Integer.parseInt(s), "1000");
        }

        public static void method(Function<String, Integer> function, String s) {
            Integer i = function.apply(s);
            System.out.println(i);
        }
    }

4.Predicate
    java.util.function.Predicate<T>接口 -> 判断型接口
        boolean test(T t) -> 用于判断的方法,返回值为boolean型
    public class PredicateTest {
        public static void main(String[] args) {
            method(new Predicate<String>() {
                @Override
                public boolean test(String s) {
                    return s.equals("abc");
                }
            }, "abc");
            System.out.println("===================");
            method(s -> s.equals("abc"), "ab");
        }

        public static void method(Predicate<String> predicate, String s) {
            boolean test = predicate.test(s);
            System.out.println(test);
        }
    }
```

## Stream流

```java
1.Stream流:其中的"流"不是"IO流",可以理解为"流水线"的"流",下一个操作都是在上一个操作的基础上完成的
2.Stream的获取
    a.针对集合:
      default Stream<E> stream()

    b.针对数组:Stream类中的静态方法
      static <T> Stream<T> of(T... values)
        
    c.使用
        public class StreamTest {
            public static void main(String[] args) {
                ArrayList<String> list = new ArrayList<>();
                list.add("hello");
                list.add("world");
                list.add("java");
                /*
                   1.针对集合:
                     default Stream<E> stream()
                 */
                Stream<String> stream = list.stream();
                System.out.println(stream);

                /*
                   2.针对数组:
                     static <T> Stream<T> of(T... values)
                 */
                Stream<String> stream1 = Stream.of("hello", "world", "java");
                System.out.println(stream1);
            }
        }

3.方法
    forEach 逐一处理->遍历
    void forEach(Consumer<? super T> action);
    注意:forEach方法是一个[终结方法],使用完之后,Stream流不能用了   

    count  统计元素个数
    注意:count也是一个终结方法
        
    Stream<T> filter(Predicate<? super T> predicate)方法,返回一个新的Stream流对象   ->  根据某个条件进行元素过滤
        
    Stream<T> limit(long maxSize):获取Stream流对象中的前n个元素,返回一个新的Stream流对象
        
	Stream<T> skip(long n): 跳过Stream流对象中的前n个元素,返回一个新的Stream流对象
        
    static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b):两个流合成一个流
        
    从Stream流对象转成集合对象，使用Stream接口方法collect()
        
    Stream<T> distinct()  元素去重复,需要重写hashCode和equals方法
        
    Stream<R> map(Function<T,R> mapper)-> 转换流中的数据类型
```

![image-20250716102656882](/images/javase-concepts/image-20250716102656882.png)

```java
   1. 第一个队伍只要名字为3个字的成员姓名；//filter
       
   2. 第一个队伍筛选之后只要前3个人；//limit
       
   3. 第二个队伍只要姓张的成员姓名；//filter
       
   4. 第二个队伍筛选之后不要前2个人；//skip
       
   5. 将两个队伍合并为一个队伍；//concat
       
   6. 打印整个队伍的姓名信息;//forEach


```

## 方法引用&其他新特性

```java
1.概述:就是在Lambda表达式的基础上再次简化
2.条件:
  a.被引用的方法需要在重写的方法中被引用
  b.被引用的方法从参数上以及返回值上要和所在的重写的方法一样
  c.干掉重写方法的参数位置以及->,以及被引用方法的参数,将调用方法的.改成:: 
3.举例
    public class Test {
        public static void main(String[] args) {
            ArrayList<String> one = new ArrayList<>();
            one.add("迪丽热巴");
            one.add("宋远桥");
            one.add("苏星河");
            one.add("老子");
            one.add("庄子");
            one.add("孙子");
            one.add("洪七公");

            ArrayList<String> two = new ArrayList<>();
            two.add("古力娜扎");
            two.add("张无忌");
            two.add("张三丰");
            two.add("赵丽颖");
            two.add("张二狗");
            two.add("张天爱");
            two.add("张三");

            Stream<String> stream1 = one.stream();
            Stream<String> stream2 = two.stream();

            Stream.concat(stream1.filter(s -> s.length() == 3).limit(3),
                            stream2.filter(s -> s.startsWith("张")).skip(2))
                    .forEach(s -> System.out.println(s));
        }
    }

4.引用成员方法
    a.使用对象名引用成员方法
      格式:  对象::成员方法名

    b.需求:
        函数式接口:Supplier
            java.util.function.Supplier<T>接口
        抽象方法:
            T get()。用来获取一个泛型参数指定类型的对象数据。
            Supplier接口使用什么泛型,就可以使用get方法获取一个什么类型的数据
    c.代码
    public class Test {
        public static void main(String[] args) {
            method(new Supplier<String>() {
                /*
                   get方法是重写的方法,无参,返回值类型String
                   trim方法无参,返回值类型String
                 */
                @Override
                public String get() {
                    return " abc ".trim();
                }
            });

            System.out.println("--------------------------");

            method(()-> " abc ".trim());

            System.out.println("===========================");
            method(" abc "::trim);
        }
        public static void method(Supplier<String> supplier){
            String s = supplier.get();
            System.out.println("s = " + s);
        }
    }

5.引用静态方法
    类名 -- 引用静态方法
        格式:  类名::静态成员方法
    代码:
        public class Test {
            public static void main(String[] args) {
                method(new Supplier<Double>() {
                    /*
                        get方法是重写的方法,无参,返回值类型double
                        random方法无参,返回值类型double
                     */
                    @Override
                    public Double get() {
                        return Math.random();
                    }
                });

                System.out.println("--------------------------");
                method(()-> Math.random());
                System.out.println("===========================");
                method(Math::random);
            }
            public static void method(Supplier<Double> supplier){
                Double v = supplier.get();
                System.out.println("v = " + v);
            }
        }

6.构造引用
    a. 类--构造方法引用
       格式:  构造方法名称::new

    b.需求:
        函数式接口:Function
            java.util.function.Function<T,R>接口
        抽象方法:
            R apply(T t)，根据类型T的参数获取类型R的结果。用于数类型转换
                
    c.代码:
        public class Test {
            public static void main(String[] args) {
                method(new Function<String, Person>() {
                    /*
                       apply方法是重写方法,参数类型String,返回值类型Person
                       Person(String name)参数类型String,返回值类型Person
                     */
                    @Override
                    public Person apply(String s) {
                        return new Person(s);
                    }
                },"张三");
                System.out.println("--------------------------");
                method(s-> new Person(s),"张三");
                System.out.println("===========================");
                method(Person::new,"李四");
            }
            public static void method(Function<String,Person> function,String name){
                Person person = function.apply(name);
                System.out.println(person);
            }
        }

7.数组引用
    数组--数组引用
         格式:
              数组的数据类型[]::new
              int[]::new  创建一个int型的数组
              double[]::new  创建于一个double型的数组
                  
    代码:
        public class Test {
            public static void main(String[] args) {
                method(new Function<Integer, int[]>() {
                    /*
                        apply方法重写,参数类型Integer,返回值类型int[]
                        int[] arr = new int[integer]
                        参数为Integer,返回值类型int[]

                     */
                    @Override
                    public int[] apply(Integer integer) {
                        return new int[integer];
                    }
                },100);
                System.out.println("===========================");
                method(len->new int[len],100);
                System.out.println("===========================");
                method(int[]::new,100);
            }

            public static void method(Function<Integer,int[]> function, Integer len){
                int[] arr = function.apply(len);
                System.out.println(arr.length);
            }
        }
```

## Record类

```java
Record类在JDK14、15预览特性，在JDK16中转正。

record是一种全新的类型，它本质上是一个 final类，同时所有的属性都是 final修饰，它会自动编译出get、hashCode 、比较所有属性值的equals、toString 等方法，减少了代码编写量。使用 Record 可以更方便的创建一个常量类。

1.注意:
- Record只会有一个全参构造
    
- 重写的equals方法比较所有属性值

- 可以在Record声明的类中定义静态字段、静态方法或实例方法(非静态成员方法)

- 不能在Record声明的类中定义实例字段(非静态成员变量)

- 类不能声明为abstract

- 不能显式的声明父类，默认父类是java.lang.Record类

- 因为Record类是一个 final类，所以也没有子类等。

    
public record Person(String name) {
    //int i;//不能声明实例变量

    static int i;//可以声明静态变量

//不能声明空参构造
/*    public Person(){

    }*/

    //可以声明静态方法
    public static void method(){

    }

    //可以声明非静态方法
    public void method01(){

    }
}

public class Test {
    public static void main(String[] args) {
        Person person = new Person("张三");
        Person person1 = new Person("张三");
        System.out.println(person);

        System.out.println(person.equals(person1)); // true
    }
}

//Record类反编译结果如下
public record Person(String name) {
    static int i;

    public Person(String name) {
        this.name = name;
    }

    public static void method() {
    }

    public void method1() {
    }

    public String name() {
        return this.name;
    }
}
```

## 密封类

```java
其实很多语言中都有`密封类`的概念，在Java语言中,也早就有`密封类`的思想，就是final修饰的类，该类不允许被继承。而从JDK15开始,针对`密封类`进行了升级。

Java 15通过密封的类和接口来增强Java编程语言，这是新引入的预览功能并在Java 16中进行了二次预览，并在Java17最终确定下来。这个预览功能用于限制超类的使用，密封的类和接口限制其他可能继承或实现它们的其他类或接口。
    
【修饰符】 sealed class 密封类 【extends 父类】【implements 父接口】 permits 子类{
    
}
【修饰符】 sealed interface 接口 【extends 父接口们】 permits 实现类{
    
}

- 密封类用 sealed 修饰符来描述，
- 使用 permits 关键字来指定可以继承或实现该类的类型有哪些
- 一个类继承密封类或实现密封接口，该类必须是sealed、non-sealed、final修饰的。
- sealed修饰的类或接口必须有子类或实现类
```

## 集合框架

```java
1.概述:容器
2.作用:一次存储多个数据
3.特点:
  a.长度可变
  b.只能存储引用类型的数据(如果存基本类型,到了集合中会自动转成包装类型)
4.分类:
  a.单列集合:一个元素只由一部分构成
    list.add("张三")
  b.双列集合:一个元素由两部分构成(key和value),称之为键值对
    map.put("涛哥","金莲")
```

![image-20250716111455870](/images/javase-concepts/image-20250716111455870.png)

## Collection接口

```java
1.概述:Collection是单列集合的顶级接口
2.使用:
  Collection<元素的数据类型> 集合名 = new  实现类对象<>()
3.泛型:
  a.作用:同一元素的数据类型
  b.<>里面只能写引用类型,不能写基本类型,如果想操作基本类型数据,那么就写包装类
  c.如果不指定泛型类型,元素默认类型就是Object
4.常用方法:
  boolean add(E e) : 将给定的元素添加到当前集合中(我们一般调add时,不用boolean接收,因为add一定会成功)
  boolean addAll(Collection<? extends E> c) :将另一个集合元素添加到当前集合中 (集合合并)
  void clear():清除集合中所有的元素
  boolean contains(Object o)  :判断当前集合中是否包含指定的元素
  boolean isEmpty() : 判断当前集合中是否有元素->判断集合是否为空
  boolean remove(Object o):将指定的元素从集合中删除
  int size() :返回集合中的元素个数。
  Object[] toArray(): 把集合中的元素,存储到数组中  
```

```java
1.概述:集合工具类
2.作用:操作集合
3.特点:
  a.构造私有
  b.成员静态
4.使用:类名直接调用
5.方法:
  static <T> boolean addAll(Collection<? super T> c, T... elements)->批量添加元素 
  static void shuffle(List<?> list) ->将集合中的元素顺序打乱
  static <T> void sort(List<T> list) ->将集合中的元素按照默认规则排序-> ASCII码值
  static <T> void sort(List<T> list, Comparator<? super T> c)->将集合中的元素按照指定规则排序
```

```java
1.概述:Comparator比较器接口
2.方法:    
  int compare(T o1, T o2)
      
  o1-o2 -> 升序
  o2-o1 -> 降序
      
public class Demo02Collections {
    public static void main(String[] args) {
        ArrayList<Person> list = new ArrayList<>();
        list.add(new Person("张三",20));
        list.add(new Person("李四",18));
        list.add(new Person("王五",19));
/*        Collections.sort(list, new Comparator<Person>() {
            @Override
            public int compare(Person o1, Person o2) {
                return o1.getAge()-o2.getAge();
            }
        });*/

        Collections.sort(list, (o1,o2)-> o1.getAge()-o2.getAge());
        System.out.println(list);
    }
}

```

```java
1.概述:Comparable接口-> 比较器
2.方法:
  public int compareTo(T o)
      
  this-o : 升序
  o-this : 降序
  
      
public class Person implements Comparable<Person>{
    private String name;
    private Integer age;

    public Person() {
    }

    public Person(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public int compareTo(Person o) {
        return o.getAge()-this.getAge();
    }
}

public class Demo03Collections {
    public static void main(String[] args) {
        ArrayList<Person> list = new ArrayList<>();
        list.add(new Person("张三",20));
        list.add(new Person("李四",18));
        list.add(new Person("王五",19));
        Collections.sort(list);
        System.out.println(list);
    }
}
```

```java
Arrays中的静态方法:
static <T> List<T> asList(T...a) -> 直接指定元素,转存到list集合中

1.注意:
使用此方法批量添加之后不要修改集合长度了,因为底层是一个数组,数组被final定死了
```

## 迭代器

```java
1.概述:Iterator接口
2.作用:遍历集合的
3.获取:Collection中的方法
  Iterator<E> iterator()
4.Iterator中的方法:
  boolean hasNext()判断有没有下一个元素
  E next() 获取下一个元素 
5.代码
public class IteratorTest {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("大耳朵图图");
        list.add("百变小樱");
        list.add("巴啦啦小魔仙");
        list.add("甜心格格");
        list.add("小马宝莉");
        list.add("爱神巧克力");
        list.add("猫眼三姐妹");

        //获取迭代器对象
        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()){
            String name = iterator.next();
            System.out.println(name);
        }
    }
}
      
6.迭代器底层原理
    Iterator<String> iterator = list.iterator();等号左边是接口类型,那么等号右边一定是Iterator接口的实现类对象,所以问,Iterator接口此时接收了哪个实现类对象?
    接收的是ArrayList的内部类Itr
```

![image-20250716111902457](/images/javase-concepts/image-20250716111902457.png)

```java
public class IteratorTest {
 public static void main(String[] args) {
     HashSet<String> set = new HashSet<>();
     set.add("张三");
     set.add("李四");
     set.add("王五");
     Iterator<String> iterator = set.iterator();
     while(iterator.hasNext()){
         String name = iterator.next();
         System.out.println(name);
     }
 }
}
```

![image-20250716112111165](/images/javase-concepts/image-20250716112111165.png)

```java
需求:定义一个集合,存储 唐僧,孙悟空,猪八戒,沙僧,遍历集合,如果遍历到猪八戒,往集合中添加一个白龙马
    
错误代码
public class Demo03Iterator {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("唐三藏");
        list.add("孙悟空");
        list.add("猪八戒");
        list.add("沙和尚");

        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            if ("猪八戒".equals(name)){
                list.add("白龙马");  // 并发修改异常
            }
        }
        System.out.println(list);
    }
}

总结一句话:使用迭代器遍历集合的过程中不要随意修改集合长度-> 尤其是添加操作
    
1.出现并发修改异常的原因:
  当实际操作次数和预期操作次数不相等时,会出现并发修改异常
      
  final void checkForComodification() {
      if (modCount != expectedModCount)
          throw new ConcurrentModificationException();
  }

2.我们干啥了,让实际操作次数和预期操作次数不相等了
list.add("白龙马")
=================================================
public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}  

添加完之后,modCount++了,然后紧接着调用了next方法
public E next() {
    checkForComodification();
} 

final void checkForComodification() {
    if (modCount != expectedModCount)
        throw new ConcurrentModificationException();
}

结论:我们调用add方法之后,底层单独给实际操作次数加1了,然后紧接着调用next方法,next方法底层做了判断,此时发现实际操作次数和预期操作次数不相等了,所以抛出了并发修改异常
    
扩展:ListIterator
    
正确代码
public class Demo04Iterator {
 public static void main(String[] args) {
     ArrayList<String> list = new ArrayList<>();
     list.add("唐三藏");
     list.add("孙悟空");
     list.add("猪八戒");
     list.add("沙和尚");

     ListIterator<String> listIterator = list.listIterator();
     while (listIterator.hasNext()) {
         String name = listIterator.next();
         if ("猪八戒".equals(name)){
             listIterator.add("白龙马");
         }
     }
     System.out.println(list);
 }
}    
```



## 数据结构

```java
数据结构是一种具有一定逻辑关系，在计算机中应用某种存储结构，并且封装了相应操作的数据元素集合。它包含三方面的内容，逻辑关系、存储关系及操作。
    
随着应用程序变得越来越复杂和数据越来越丰富，几百万、几十亿甚至几百亿的数据就会出现，而对这么大对数据进行搜索、插入或者排序等的操作就越来越慢，数据结构就是用来解决这些问题的。
    
数据的逻辑结构指反映数据元素之间的逻辑关系，而与他们在计算机中的存储位置无关：
    * 集合（数学中集合的概念）：数据结构中的元素之间除了“同属一个集合” 的相互关系外，别无其他关系；
    * 线性结构：数据结构中的元素存在一对一的相互关系；
    * 树形结构：数据结构中的元素存在一对多的相互关系；
    * 图形结构：数据结构中的元素存在多对多的相互关系。
    
数据的物理结构/存储结构：是描述数据具体在内存中的存储（如：顺序结构、链式结构、索引结构、哈希结构）等，一种数据逻辑结构可表示成一种或多种物理存储结构。

数据结构是一门完整并且复杂的课程，那么我们今天只是简单的讨论常见的几种数据结构，让我们对数据结构与算法有一个初步的了解。

栈、队列、数组、链表(单向、双向)
```



![image-20250716112609960](/images/javase-concepts/image-20250716112609960.png)

![image-20250716112625836](/images/javase-concepts/image-20250716112625836.png)

## List

```java
1.概述:Collection接口的子接口
2.实现类:
  ArrayList LinkedList Vector
```

```java
ArrayList集合
    1.概述:是List接口的实现类
    2.特点:
      a.元素有序
      b.有索引
      c.元素可重复
      d.线程不安全
    3.数据结构:
      数组
          
1.常用方法:
  boolean add(E e)  -> 将元素添加到集合中->尾部(add方法一定能添加成功的,所以我们不用boolean接收返回值)
  void add(int index, E element) ->在指定索引位置上添加元素
  boolean remove(Object o) ->删除指定的元素,删除成功为true,失败为false
  E remove(int index) -> 删除指定索引位置上的元素,返回的是被删除的那个元素
  E set(int index, E element) -> 将指定索引位置上的元素,修改成后面的element元素
  E get(int index) -> 根据索引获取元素
  int size()  -> 获取集合元素个数
      
2.ArrayList底层源码分析
    a.ArrayList()  构造一个初始容量为 10 的空列表(数组)
    b.ArrayList(int initialCapacity) 构造一个具有指定初始容量的空列表
    c.源码分析:
      a.不是一new底层就为其创建一个长度为10的空数组,而是第一次调用add方法的时候
      b.如果超出了数组容量,会自动扩容
      c.扩多少倍:1.5倍
```

```java
ArrayList<String> list = new ArrayList<>();
============================================
public ArrayList() {
    //transient Object[] elementData  这就是ArrayList底层的数组
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}  

==============================================
list.add("abc");

public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}

private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow();
    elementData[s] = e;
    size = s + 1;
}

private Object[] grow() {
     return grow(size + 1);
}

private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        //return elementData = new Object[10]
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}


假设我们正在存第11个abc
=================================================================
public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}

private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow();
    elementData[s] = e;
    size = s + 1;
}

private Object[] grow() {
     return grow(size + 1);
}

private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        //return elementData = new Object[10]
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}  

public class ArrayListTest {
 public static void main(String[] args) {
     ArrayList<Integer> list = new ArrayList<>();
     list.add(2);
     /*
         调用remove方法,传递的是整数,所以会自动找
         remove(int index) 按照索引删元素,所以会出现索引越界异常

         解决:
           a.可以按照0索引删除
           b.将int改成Integer -> 此时传递的是Integer类型,会去找remove(Object obj)-> 这个数直接删除指定元素

      */
     //list.remove(2);
     list.remove(Integer.valueOf(2));
     System.out.println(list);
 }
}
```

![image-20250716113356609](/images/javase-concepts/image-20250716113356609.png)

```java
1.LinkedList集合
    1.概述:是List接口的实现类
    2.特点:
      a.元素有序
      b.无索引
      c.元素可重复
      d.线程不安全
    3.数据结构:
      双向链表
    4.使用:和ArrayList一样
    5.特有方法:大量直接操作首尾元素的方法
      public void addFirst(E e):将指定元素插入此列表的开头。
      public void addLast(E e):将指定元素添加到此列表的结尾。
      public E getFirst():返回此列表的第一个元素。
      public E getLast():返回此列表的最后一个元素。
      public E removeFirst():移除并返回此列表的第一个元素。
      public E removeLast():移除并返回此列表的最后一个元素。
      public E pop():从此列表所表示的堆栈处弹出一个元素。
      public void push(E e):将元素推入此列表所表示的堆栈。
      public boolean isEmpty()：如果列表没有元素，则返回true。  
        
2.LinkedList底层成员解释说明
    1.LinkedList底层成员
      transient int size = 0;  元素个数
      transient Node<E> first; 第一个节点对象
      transient Node<E> last;  最后一个节点对象

    2.Node代表的是节点对象
       private static class Node<E> {
            E item;//节点上的元素
            Node<E> next;//记录着下一个节点地址
            Node<E> prev;//记录着上一个节点地址

            Node(Node<E> prev, E element, Node<E> next) {
                this.item = element;
                this.next = next;
                this.prev = prev;
            }
        }

3.LinkedList中add方法源码分析
    LinkedList<String> list = new LinkedList<>();
    list.add("a");
    list.add("b");    

    void linkLast(E e) {
            final Node<E> l = last;
            final Node<E> newNode = new Node<>(l, e, null);
            last = newNode;
            if (l == null)
                first = newNode;
            else
                l.next = newNode;
            size++;
            modCount++;
    }

4.LinkedList中get方法源码分析
    public E get(int index) {
        checkElementIndex(index);
        return node(index).item;
    } 

    Node<E> node(int index) {
        // assert isElementIndex(index);

        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

index < (size >> 1)采用二分思想，先将index与长度size的一半比较，如果index<size/2，就只从位置0往后遍历到位置index处，而如果index>size/2，就只从位置size往前遍历到位置index处。这样可以减少一部分不必要的遍历
```

![image-20250716113634604](/images/javase-concepts/image-20250716113634604.png)



## 增强for

```java
1.格式:
  for(元素类型 变量名:集合名或者数组名){
      变量名就代表每一个元素
  }

2.作用:
  遍历集合或者数组
      
3.快捷键:集合名或者数组名.for    
    
4.使用增强for遍历集合时:底层原理为迭代器 -> 所以在使用增强for遍历集合过程中,也不能随意修改集合长度    使用增强for遍历数组时:底层原理为普通for
```

![image-20250716113839924](/images/javase-concepts/image-20250716113839924.png)



## 泛型

```java
1.格式:
  <E>
2.作用:
  同一类型
3.注意:
  只能写引用类型,如果啥也不写,默认是Object类型
      
4.从使用层面来看:统一类型,防止类型转换异常
5.从定义层面来看:定义的时候不确定将来统一什么类型,此时我们可以定义泛型,等着将来使用的时候再规定和统一类型,代码更灵活
    
6.含有泛型的类
    a.格式:
      public class 类名<E>{
          此类中方法的参数和返回值类型都可以直接用E表示了
      }

    b.什么时候确定泛型类型:
      new 对象的时候
    
    c.代码
    public class MyArrayList<E> {
        //定义长度为10的数组
        Object[] obj = new Object[10];
        //定义size,代表集合中元素的个数
        int size = 0;

        /**
         * 定义一个add方法,代表往集合中添加元素
         */
        public boolean add(E e){
            obj[size] = e;
            size++;
            return true;
        }

        /**
         * 定义一个get方法,代表获取集合中指定位置的元素
         */
        public E get(int index){
            return (E) obj[index];
        }

        /**
         * 定义一个toString方法,直接打印集合元素
         */
        public String toString(){
            String result = Arrays.toString(obj);
            return result;
        }
    }

    public class Test {
        public static void main(String[] args) {
            MyArrayList<String> list1 = new MyArrayList<>();
            list1.add("a");
            list1.add("b");
            list1.add("c");
            String s = list1.get(0);
            System.out.println("s = " + s);
            System.out.println(list1);
        }
    }

7.含有泛型的方法
    a.格式:
      修饰符 <E> 返回值类型 方法名(E e){
          方法体
          return 结果
      }
    b.什么时候确定泛型类型:
      调用的时候   
          
    c.代码
    public class MyCollections {
        public static <E> void  addAll(ArrayList<E> list, E... e){
            for (E element : e) {
                list.add(element);
            }
        }
    }

    public class Test {
        public static void main(String[] args) {
            ArrayList<String> list = new ArrayList<>();
            MyCollections.addAll(list,"张三丰","张无忌","涛哥");
            System.out.println(list);
        }
    }

8.含有泛型的接口
    a.格式:
      public interface 接口名<E>{}
    b.什么时候确定泛型类型:
      a.在实现类的时候还没有确定泛型类型,只能到new实现类对象的时候确定了 -> ArrayList
      b.在实现类的时候直接确定泛型类型 -> Scanner
    c.代码
    public interface MyList <E>{
        public boolean add(E e);
    }

9.泛型通配符 ?   一般常见在方法的参数位置
    public class Test {
        public static void main(String[] args) {
            ArrayList<String> list1 = new ArrayList<>();
            list1.add("张三");
            list1.add("李四");
            list1.add("王五");
            list1.add("赵六");

            ArrayList<Integer> list2 = new ArrayList<>();
            list2.add(1);
            list2.add(2);
            list2.add(3);
            list2.add(4);

            method(list1);
            method(list2);
        }

        public static void method(ArrayList<?> list){
            for (Object o : list) {
                System.out.println(o);
            }
        }
    }

10.泛型的上限下限
    a.作用:可以规定泛型的范围
    b.上限:
      a.格式:<? extends 类型>
      b.含义:?只能接收extends后面的本类类型以及子类类型    
    c.下限:
      a.格式:<? super 类型>
      b.含义:?只能接收super后面的本类类型以及父类类型  
    d.代码
    //上限  ?只能接收extends后面的本类类型以及子类类型
    public static void get1(Collection<? extends Number> collection){

    }

    //下限  ?只能接收super后面的本类类型以及父类类型
    public static void get2(Collection<? super Number> collection){

    }
          
```

![image-20250717092010859](/images/javase-concepts/image-20250717092010859.png)



```java
package day18.com.hebut;

import java.util.ArrayList;
import java.util.Collections;

public class Poker {
    public static void main(String[] args) {
//        1.创建一个集合number,存储牌号
        String[] number = "2-3-4-5-6-7-8-9-10-J-Q-K-A".split("-");
//        2.创建一个集合color,存储花色
        String[] color = "♠-♥-♣-♦".split("-");
//        3.创建一个集合poker,存储组合好的牌面
        ArrayList<String> list = new ArrayList<>();
//        4.遍历number和color,进行字符串拼接组合牌,保存到poker中
        for (String num : number) {
            for (String huaSe : color) {
                String key = huaSe + num;
                list.add(key);
            }
        }
        list.add("😀");
        list.add("😔");
//        5.调用Collections中的shuffle方法,进行打乱
        Collections.shuffle(list);
//        6.创建4个集合对象分别为:player1  player2  player3  dipai
        ArrayList<String> p1 = new ArrayList<>();
        ArrayList<String> p2 = new ArrayList<>();
        ArrayList<String> p3 = new ArrayList<>();
        ArrayList<String> dipai = new ArrayList<>();
//        7.发牌,让牌面的索引%3,如果为0,存到player1中,如果为1,存到player2中;如果为2,存到player3中;如果索引大于等于51,证明是最后三张牌,就存到dipai中
        for (int i = 0; i < list.size(); i++) {
            String pokerPai = list.get(i);
            if(i >= 51){
                dipai.add(pokerPai);
            }else if(i % 3 == 0){
                p1.add(pokerPai);
            }else if (i % 3 == 1){
                p2.add(pokerPai);
            }else {
                p3.add(pokerPai);
            }
        }
//        8.遍历集合,看牌
        System.out.println("p1: " + p1);
        System.out.println("p2: " + p2);
        System.out.println("p3: " + p3);
        System.out.println("dipai: " + dipai);
    }
}
```



## 红黑树（了解）

```java
哈希表:
  jdk8之前:数组+链表
  jdk8开始:数组+链表+红黑树
      
加入红黑树原因:
  提高查询效率
      
1. 每一个节点或是红色的,或者是黑色的

2. 根节点必须是黑色

3. 如果一个节点没有子节点或者父节点,则该节点相应的指针属性值为Nil,这些Nil视为叶节点,每个叶节点(Nil)是黑色的

4. 如果某一个节点是红色,那么它的子节点必须是黑色(不能出现两个红色节点相连 的情况)

5. 对每一个节点,从该节点到其所有后代叶节点的简单路径上,均包含相同数目的黑色节点
      
```

> https://www.cs.usfca.edu/~galles/visualization/RedBlack

![image-20250717094447050](/images/javase-concepts/image-20250717094447050.png)



## Set集合

```java
1.概述:Set是一个接口,是Collection接口的子接口
2.特点:
  Set接口中的方法并没有对Collection接口进行扩充,而且所有set集合底层都是依靠map实现的
```

![image-20250717094618438](/images/javase-concepts/image-20250717094618438.png)

```java
HashSet集合的介绍和使用

1.概述:是Set接口的实现类
2.特点:
  a.元素无序(存进去的数据和取出来的顺序不一样)
  b.无索引
  c.元素唯一,不能重复
  d.线程不安全
3.数据结构:哈希表
  jdk8之前: 哈希表 = 数组+链表
  jdk8开始: 哈希表 = 数组+链表+红黑树
4.方法:
  和Collection一样
5.代码:
    public class HashSetTest {
        public static void main(String[] args) {
            HashSet<String> set = new HashSet<>();
            set.add("张三");
            set.add("李四");
            set.add("王五");
            set.add("赵六");
            set.add("赵六");
            System.out.println(set);

            //迭代器遍历
            Iterator<String> iterator = set.iterator();
            while(iterator.hasNext()){
                String name = iterator.next();
                System.out.println(name);
            }
            System.out.println("=========================");

            //增强for遍历
            for (String s : set) {
                System.out.println(s);
            }
        }
    }
```



```java
LinkedHashSet的介绍以及使用
    
1.概述:是HashSet的子类
2.特点:
  a.元素有序
  b.无索引
  c.元素唯一,不能重复
  d.线程不安全
3.数据结构:哈希表+链表
4.方法:
  和HashSet一样
5.代码:      
    public class LinkedHashSetTest {
        public static void main(String[] args) {
            LinkedHashSet<String> set = new LinkedHashSet<>();
            set.add("张三");
            set.add("李四");
            set.add("王五");
            set.add("赵六");
            set.add("赵六");
            System.out.println(set);

            //迭代器遍历
            Iterator<String> iterator = set.iterator();
            while(iterator.hasNext()){
                String name = iterator.next();
                System.out.println(name);
            }
            System.out.println("=========================");

            //增强for遍历
            for (String s : set) {
                System.out.println(s);
            }
        }
    }
```



```java
哈希值
    
1.概述:计算机自动计算出来的十进制数,可以代表对象的地址值
2.获取:调用Object中的方法:
       public native int hashCode(); 

3.注意:
  a.没有重写Object中的hashCode方法,获取的是对象本身的哈希值
  b.重写了Object中的hashCode方法之后,获取的是对象内容的哈希值
      
4.将下面的话背下来:
  a.哈希值不一样,内容肯定不一样
  b.哈希值一样,内容也有可能不一样
      
5.代码:
    public class HashTest {
        public static void main(String[] args) {
            Person p1 = new Person("张三", 10);
            Person p2 = new Person("张三", 10);
            System.out.println(p1.hashCode());
            System.out.println(p2.hashCode());

            String s1 = new String("abc");
            String s2 = new String("abc");
            System.out.println(s1.hashCode());
            System.out.println(s2.hashCode());

            System.out.println("=============================");

            String s3 = "通话";
            String s4 = "重地";
            System.out.println(s3.hashCode());//1179395
            System.out.println(s4.hashCode());//1179395
        }
    }
```

![image-20250717095029606](/images/javase-concepts/image-20250717095029606.png)



```java
字符串的哈希值时如何算出来的
    
String s = "abc"
到了String底层的数组中变成了: byte[] value = {97,98,99}  

public static int hashCode(byte[] value) {
    int h = 0;
    for (byte v : value) {
        h = 31 * h + (v & 0xff);
    }
    return h;
}

第一圈计算: h = 31*0+97 -> h=97
第二圈计算: h = 31*97+98 -> h = 3105
第三圈计算: h = 31*3105+99 -> h = 96354
    
在相乘的过程中为啥用31作为常量,31是一个质数,用31可以更好的解决哈希值一样,但内容不一样(哈希冲突,哈希碰撞)的情况
```



```java
HashSet的存储去重复的过程_背下来
    
先比较元素哈希值,再比较元素内容
  如果哈希值不一样,存
  如果哈希值一样,再比较内容
  如果哈希值一样,内容不一样,存; 如果哈希值一样,内容也一样去重复
```



```java
HashSet存储自定义类型如何去重复
    
public class Person{
    private String name;
    private Integer age;

    public Person() {
    }

    public Person(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(name, person.name) && Objects.equals(age, person.age);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

public class HashSetTest {
    public static void main(String[] args) {
        HashSet<Person> set = new HashSet<>();
        set.add(new Person("张三", 20));
        set.add(new Person("李四", 15));
        set.add(new Person("张三", 20));
        System.out.println(set);
    }
}

set存储自定义类型时需要重写hashCode和equals方法,让set比较对象内容的哈希值以及对象的内容
```

## Map集合

```java
双列集合:
  一个元素分成2部分 -> key和value (键值对)
  我们想要找value都是根据key去找
```

![image-20250717095627345](/images/javase-concepts/image-20250717095627345.png)



```java
HashMap的介绍和使用
    
1.概述:是Map的实现类
2.特点:
  a.无序
  b.无索引
  c.key唯一,value可重复
  d.线程不安全
  e.可以存null键null值
3.数据结构:
  哈希表
4.方法:
  V put(K key, V value)  -> 添加元素,返回的是被替换的value值
  V remove(Object key)  ->根据key删除键值对,返回的是被删除的value
  V get(Object key) -> 根据key获取value
  boolean containsKey(Object key)  -> 判断集合中是否包含指定的key
  Collection<V> values() -> 获取集合中所有的value,转存到Collection集合中    
  Set<K> keySet()->将Map中的key获取出来,转存到Set集合中  
  Set<Map.Entry<K,V>> entrySet()->获取Map集合中的键值对,转存到Set集合中
```

```java
1.概述:LinkedHashMap 是 HashMap的子类
2.特点:
  a.有序
  b.无索引
  c.key唯一,value可重复
  d.线程不安全
  e.可以存null键null值
3.数据结构:
  哈希表+链表
4.方法:
  和HashMap一样
```

```java
HashMap的两种遍历方式

方式1:获取key,根据key再获取value
    Set<K> keySet()->将Map中的key获取出来,转存到Set集合中
    
    public class HashMapTest {
        public static void main(String[] args) {
            HashMap<String, String> map = new HashMap<>();
            map.put("张无忌","赵敏");
            map.put("段誉","王语嫣");
            map.put("虚竹","梦姑");
            map.put("乔峰","阿朱");
            map.put("杨过","小龙女");

            Set<String> set = map.keySet();
            for (String key : set) {
                String value = map.get(key);
                System.out.println(key+"..."+value);
            }
        }
    }

    
方式2:同时获取key和value
    Set<Map.Entry<K,V>> entrySet() -> 获取Map集合中的键值对,转存到Set集合中
public class HashMapTest {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();
        map.put("张无忌","赵敏");
        map.put("段誉","王语嫣");
        map.put("虚竹","梦姑");
        map.put("乔峰","阿朱");
        map.put("杨过","小龙女");

        Set<Map.Entry<String, String>> set = map.entrySet();
        for (Map.Entry<String, String> entry : set) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println(key+"..."+value);
        }
    }
}  
```

![image-20250717100142078](/images/javase-concepts/image-20250717100142078.png)



```java
Map存储自定义对象时如何保证key唯一
    
    1.细节:
      HashSet存储的元素都会存到Map集合的key位置,所以map如何保证key唯一的,set集合就是如何保证元素唯一的,所以set集合保证元素唯一的原理和map保证key唯一原理是一样的

    2.想要保证key唯一,key必须重写hashCode和equals方法

    3.保证key唯一的过程:
      先比较key的哈希值,再比较key的内容
      如果哈希值不一样,存
      如果哈希值一样,内容不一样,存
      如果哈希值一样,内容也一样,value覆盖前面的value
```

```java
需求:用Map集合统计字符串中每一个字符出现的次数
步骤:
  1.创建String字符串
  2.创建HashMap集合,key为字符,value为次数
  3.遍历字符串,将每一个字符获取出来
  4.判断集合中是否包含指定的key,如果不包含,将该字符和1存到map中
  5.如果包含,根据key获取对应的value,将value+1,然后将字符和value重新存到map中
  6.输出map
      
package day19.com.hebut;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HashMapTest {
    public static void main(String[] args) {
        // 1.创建String字符串
        String s = "awkghfuiawanvadasfawiofeuifhasg";
        // 2.创建HashMap集合,key为字符,value为次数
        HashMap<String, Integer> hashMap = new HashMap<>();
        // 3.遍历字符串,将每一个字符获取出来
        char[] chars = s.toCharArray();
        for (char aChar : chars) {
            String key = String.valueOf(aChar);
            // 4.判断集合中是否包含指定的key,如果不包含,将该字符和1存到map中
            if (!hashMap.containsKey(key)) {
                hashMap.put(key, 1);
            } else {
                // 5.如果包含,根据key获取对应的value,将value+1,然后将字符和value重新存到map中
                Integer value = hashMap.get(key);
                hashMap.put(key, value + 1);
            }
        }
        // 6.输出map
        Set<Map.Entry<String, Integer>> entries = hashMap.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }
    }
}
```

```java
TreeSet

1.概述:是Set接口的实现类
2.特点:
  a.对元素进行排序
  b.无索引
  c.元素唯一
  d.线程不安全
3.数据结构:
  红黑树
4.构造方法:
  a.TreeSet() 将元素按照ASCII码排序
  b.TreeSet(Comparator<? super E> comparator) 按照指定的规则排序
5.代码:
    public class TreeSetTest {
        public static void main(String[] args) {
            TreeSet<String> set = new TreeSet<>();
            set.add("a.床前明月光");
            set.add("c.举头望明月");
            set.add("d.低头思故乡");
            set.add("b.疑是地上霜");
            System.out.println(set);

            System.out.println("===========================");
            TreeSet<Person> set2 = new TreeSet<>(new Comparator<Person>() {
                @Override
                public int compare(Person o1, Person o2) {
                    return o1.getAge()-o2.getAge();
                }
            });
            set2.add(new Person("张三", 18));
            set2.add(new Person("李四", 20));
            set2.add(new Person("王五", 19));
            System.out.println(set2);
        }
    }
```

```java
TreeMap
    
1.概述:是Map接口的实现类
2.特点:
  a.可以对key进行排序
  b.无索引
  c.key唯一,value可重复
  d.线程不安全
3.数据结构:
  红黑树
4.构造:
  TreeMap() -> 将key按照ASCII码排序
  TreeMap(Comparator<? super K> comparator) -> 对key进行指定顺序排序
5.代码:
    public class TreeMapTest {
        public static void main(String[] args) {
            TreeMap<String, String> map = new TreeMap<>();
            map.put("1","锄禾日当午");
            map.put("3","谁知盘中餐");
            map.put("4","粒粒皆辛苦");
            map.put("2","汗滴禾下土");
            System.out.println(map);

            System.out.println("========================");
            TreeMap<Person, String> map1 = new TreeMap<>(new Comparator<Person>() {
                @Override
                public int compare(Person o1, Person o2) {
                    return o2.getAge()-o1.getAge();
                }
            });
            map1.put(new Person("张三", 20), "河北");
            map1.put(new Person("李四", 30), "河南");
            map1.put(new Person("王五", 25), "山西");
            System.out.println(map1);
        }
    }
```

```java
Hashtable集合
    
1.概述:是Map接口的实现类
2.特点:
  a.无序
  b.无索引
  c.key唯一,value可重复
  d.线程安全
  e.不能存null
3.数据结构:
  哈希表
4.用法:和HashMap一样   
5.代码:
    public class HashtableTest {
        public static void main(String[] args) {
            Hashtable<String, String> hashtable = new Hashtable<>();
            hashtable.put("涛哥","金莲");
            hashtable.put("庆庆","莲莲");
            hashtable.put("松松","虎虎");
            //hashtable.put(null,null);
            System.out.println(hashtable);
        }
    }

Hashtable和HashMap区别:

相同点:元素无序,无索引,key唯一,都是哈希表

不同点:HashMap线程不安全,Hashtable线程安全
    
      HashMap可以存储null键null值;Hashtable不能
```

```java
Vector集合
    
1.概述:是List接口的实现类
2.特点:
  a.元素有序
  b.有索引
  c.元素可重复
  d.线程安全
3.数据结构:
  数组 
4.注意:
  a.如果利用空参构造创建对象,扩容默认是2倍
  b.如果利用有参构造创建对象,指定了容量增量,那么扩容就在数组长度的基础上加容量增量
5.代码:
    public class VectorTest {
        public static void main(String[] args) {
            Vector<String> vector = new Vector<>();
            vector.add("张三");
            vector.add("李四");
            vector.add("王五");
            vector.add("赵六");
            System.out.println(vector);
            for (String s : vector) {
                System.out.println(s);
            }
        }
    }

Vector() 构造一个空向量，使其内部数据数组的大小为 10，其标准容量增量(扩容的长度)为零
```

```java
Vector<String> vector = new Vector<>();
=======================================
public Vector() {
 this(10);
}  
public Vector(int initialCapacity) {
 this(initialCapacity, 0);
}
public Vector(int initialCapacity, int capacityIncrement) {
 super();
 if (initialCapacity < 0)
     throw new IllegalArgumentException("Illegal Capacity: "+
                                        initialCapacity);
 this.elementData = new Object[initialCapacity];
 this.capacityIncrement = capacityIncrement;
}

=========================================
假如正在添加第11个元素,会自动扩容
vector.add("赵六");
public synchronized boolean add(E e) {
 modCount++;
 add(e, elementData, elementCount);
 return true;
}
private void add(E e, Object[] elementData, int s) {
 if (s == elementData.length)
     elementData = grow();
 elementData[s] = e;
 elementCount = s + 1;
}
private Object[] grow() {
 return grow(elementCount + 1);
}
private Object[] grow(int minCapacity) {
 int oldCapacity = elementData.length;
 int newCapacity = ArraysSupport.newLength(oldCapacity,
         minCapacity - oldCapacity, /* minimum growth */
         capacityIncrement > 0 ? capacityIncrement : oldCapacity
                                    /* preferred growth */);
 return elementData = Arrays.copyOf(elementData, newCapacity);
}


1.Vector(int initialCapacity, int capacityIncrement)使用指定的初始容量和容量增量构造一个空的向量 
==============================
Vector<String> vector = new Vector<>(10,15);
public Vector(int initialCapacity, int capacityIncrement) {
 super();
 if (initialCapacity < 0)
     throw new IllegalArgumentException("Illegal Capacity: "+
                                        initialCapacity);
 this.elementData = new Object[initialCapacity];
 this.capacityIncrement = capacityIncrement;
}

===============================
假设存储第11个元素
public synchronized boolean add(E e) {
 modCount++;
 add(e, elementData, elementCount);
 return true;
}
private void add(E e, Object[] elementData, int s) {
 if (s == elementData.length)
     elementData = grow();
 elementData[s] = e;
 elementCount = s + 1;
}
private Object[] grow() {
 return grow(elementCount + 1);
}
private Object[] grow(int minCapacity) {
 int oldCapacity = elementData.length;
 int newCapacity = ArraysSupport.newLength(oldCapacity,
         minCapacity - oldCapacity, /* minimum growth */
         capacityIncrement > 0 ? capacityIncrement : oldCapacity
                                    /* preferred growth */);
 return elementData = Arrays.copyOf(elementData, newCapacity);
}    
```

## Properties集合(重点)

```java
1.概述:
  是Hashtable的子类
2.特点:
  a.无序
  b.无索引
  c.key唯一,value可重复
  d.线程安全
  e.不能存null
  f.key和value固定为String
3.数据结构:
  哈希表
4.用法:和HashMap一样
5.特有方法:
  a.setProperty(String key, String value)  存键值对
  b.String getProperty(String key)  根据key获取value
  c.Set<String> stringPropertyNames()  获取所有的key保存到set集合中,类似于keySet    
  d.void load(InputStream inStream)  -> 将流中的数据加载到properties集合中
      
      
public class PropertiesTest {
    public static void main(String[] args) {
        Properties properties = new Properties();
        properties.setProperty("username","root");
        properties.setProperty("password","123456");

        Set<String> set = properties.stringPropertyNames();
        for (String key : set) {
            String value = properties.getProperty(key);
            System.out.println(key+"..."+value);
        }
    }
}

6.使用场景  解析配置文件
    
创建一个xxx.properties文件
username=root
password=root
    
public class PropertiesTest {
 public static void main(String[] args) throws IOException {
     Properties properties = new Properties();
     FileInputStream fis = new FileInputStream("day19_map/jdbc.properties");
     properties.load(fis);

     Set<String> set = properties.stringPropertyNames();
     for (String key : set) {
         String value = properties.getProperty(key);
         System.out.println(key+"..."+value);
     }
 }
}
```

```java
集合嵌套
    
需求:创建2个List集合,每个集合中分别存储一些字符串,将2个集合存储到第3个List集合中
public class Demo01ListInList {
    public static void main(String[] args) {
        ArrayList<String> list1 = new ArrayList<>();
        list1.add("张三");
        list1.add("李四");
        list1.add("王五");

        ArrayList<String> list2 = new ArrayList<>();
        list2.add("赵六");
        list2.add("田七");
        list2.add("朱八");

        ArrayList<ArrayList<String>> list = new ArrayList<>();
        list.add(list1);
        list.add(list2);

        /*
          遍历
          先遍历大集合,将小集合获取出来
          再遍历小集合,将元素获取出来
         */
        
        for (ArrayList<String> arrayList : list) {
            for (String s : arrayList) {
                System.out.println(s);
            }
        }
    }
}


1班级有三名同学，学号和姓名分别为：1=张三，2=李四，3=王五，2班有三名同学，学号和姓名分别为：1=黄晓明，2=杨颖，3=刘德华,请将同学的信息以键值对的形式存储到2个Map集合中，再将2个Map集合存储到List集合中
    
public class ListInMapTest {
    public static void main(String[] args) {
        HashMap<Integer, String> map1 = new HashMap<>();
        map1.put(1,"张三");
        map1.put(2,"李四");
        map1.put(3,"王五");

        HashMap<Integer, String> map2 = new HashMap<>();
        map2.put(1,"黄晓明");
        map2.put(2,"杨颖");
        map2.put(3,"刘德华");

        ArrayList<HashMap<Integer, String>> list = new ArrayList<>();
        list.add(map1);
        list.add(map2);
        
        //先遍历list,将两个map获取出来
        for (HashMap<Integer, String> map : list) {
            //遍历小map
            Set<Map.Entry<Integer, String>> set = map.entrySet();
            for (Map.Entry<Integer, String> entry : set) {
                System.out.println(entry.getKey() + "=" + entry.getValue());
            }
        }
    }
}
```

## File类

```java
1.xxx.jpg一定是图片吗?
  不一定
2.什么叫做文本文档?
  用记事本打开人能看懂的文档 -> 比如.txt  .java .html .css  
3.F:\idea\io\1.jpg中1.jpg的父路径是谁?
  F:\idea\io 
4.路径名称分隔符:一个路径中,文件夹与文件夹或者与文件之间的分隔符    
    windows:\
    linux: /
        
  路径分隔符:一个路径和其他路径之间的分隔符
    ;  

5.File概述:文件和目录路径名的抽象表示形式 -> 说白了就是代表文件对象或者文件夹对象
```

```java
1.File的静态成员
    
static String pathSeparator  与系统有关的路径分隔符，为了方便，它被表示为一个字符串
static String separator  与系统有关的默认名称分隔符，为了方便，它被表示为一个字符串 
    
public class Demo01File {
    public static void main(String[] args) {
        //static String pathSeparator  与系统有关的路径分隔符，为了方便，它被表示为一个字符串
        System.out.println(File.pathSeparator); // ;
        //static String separator    与系统有关的默认名称分隔符，为了方便，它被表示为一个字符串
        System.out.println(File.separator); // \

        System.out.println("==================");
        /*
          写代码要求:一次编写,到处运行
          下面的代码直接写的是\
          但是代码到了linux上运行就不合适了,因为linux是/
         */
        //String path = "F:\\idea\\io\\1.png";
        //System.out.println(path);
        String path = "F:"+File.separator+"idea"+File.separator+"io"+File.separator+"1.png";
        System.out.println(path);
    }
}

2.File的构造方法
    
File(String parent, String child) 根据所填写的路径创建File对象
     parent:父路径
     child:子路径
File(File parent, String child)  根据所填写的路径创建File对象
     parent:父路径,是一个File对象
     child:子路径
File(String pathname)  根据所填写的路径创建File对象
     pathname:直接指定路径 
         
public class Demo02File {
    public static void main(String[] args) {
/*      File(String parent, String child) 根据所填写的路径创建File对象
        parent:父路径
        child:子路径*/
        File file1 = new File("F:\\idea\\io", "1.png");
        System.out.println("file1 = " + file1);
/*      File(File parent, String child)  根据所填写的路径创建File对象
        parent:父路径,是一个File对象
        child:子路径*/
        File parent = new File("F:\\idea\\io");
        File file2 = new File(parent, "1.jpg");
        System.out.println("file2 = " + file2);
/*      File(String pathname)  根据所填写的路径创建File对象
        pathname:直接指定路径*/

        File file3 = new File("F:\\idea\\io\\1.jpg");
        System.out.println("file3 = " + file3);
    }
}
//我们表示的文件或者文件夹的对象,可以不存在,但是没意义


3.File的获取方法
    
String getAbsolutePath() -> 获取File的绝对路径->带盘符的路径
String getPath() ->获取的是封装路径->new File对象的时候写的啥路径,获取的就是啥路径
String getName()  -> 获取的是文件或者文件夹名称
long length() -> 获取的是文件的长度 -> 文件的字节数
    
public class Demo03File {
    public static void main(String[] args) {
        //String getAbsolutePath() -> 获取File的绝对路径->带盘符的路径
        File file = new File("F:\\1.jpg");
        System.out.println(file.getAbsolutePath());
        //String getPath() ->获取的是封装路径->new File对象的时候写的啥路径,获取的就是啥路径
        System.out.println(file.getPath());
        //String getName()  -> 获取的是文件或者文件夹名称
        File file1 = new File("F:\\idea\\io\\1.txt");
        System.out.println(file1.getName());
        //long length() -> 获取的是文件的长度 -> 文件的字节数
        System.out.println(file1.length());
    }
}


4.File的创建方法
    
boolean createNewFile()  -> 创建文件
        如果要创建的文件之前有,创建失败,返回false
        如果要创建的文件之前没有,创建成功,返回true
    
boolean mkdirs() -> 创建文件夹(目录)既可以创建多级文件夹,还可以创建单级文件夹
        如果要创建的文件夹之前有,创建失败,返回false
        如果要创建的文件夹之前没有,创建成功,返回true
    
public class Demo04File {
    public static void main(String[] args) throws IOException {
        /*
          boolean createNewFile()  -> 创建文件
           如果要创建的文件之前有,创建失败,返回false
           如果要创建的文件之前没有,创建成功,返回true
         */
        File file = new File("F:\\idea\\io\\2.txt");
        System.out.println(file.createNewFile());

        /*
          boolean mkdirs() -> 创建文件夹(目录)既可以创建多级文件夹,还可以创建单级文件夹
           如果要创建的文件夹之前有,创建失败,返回false
           如果要创建的文件夹之前没有,创建成功,返回true
         */
        File file2 = new File("F:\\idea\\io\\a\\b\\c");
        System.out.println(file2.mkdirs());
    }
}


5.File类的删除方法
    
boolean delete()->删除文件或者文件夹

注意:
  1.如果删除文件,不走回收站
  2.如果删除文件夹,必须是空文件夹,而且也不走回收站 
      
public class Demo05File {
    public static void main(String[] args) {
       /*
        boolean delete()->删除文件或者文件夹

        注意:
        1.如果删除文件,不走回收站
        2.如果删除文件夹,必须是空文件夹,而且也不走回收站
        */
        File file = new File("F:\\idea\\io\\2.txt");
        System.out.println(file.delete());

        File file2 = new File("F:\\idea\\io\\a");
        System.out.println(file2.delete());
    }
}


6.File类的判断方法
    
boolean isDirectory() -> 判断是否为文件夹 
boolean isFile()  -> 判断是否为文件
boolean exists()  -> 判断文件或者文件夹是否存在    
    
public class Demo06File {
    public static void main(String[] args) {
        File file = new File("F:\\idea\\io\\1.txt");
        System.out.println(file.isFile());
        System.out.println(file.isDirectory());
        System.out.println(file.exists());
    }
}


7.File的遍历方法
    
File[] listFiles()-> 遍历指定的文件夹,返回的是File数组 -> 这个推荐使用

public static void main(String[] args) {
    File file = new File("F:\\idea\\io\\aa");
    File[] files = file.listFiles();
    for (File file1 : files) {
        System.out.println(file1);
    }
}


7.相对路径和绝对路径

    a.绝对路径:带盘符的路径
    b.相对路径:不带盘符的路径

    c.什么时候使用绝对路径和相对路径:
      跨盘符写路径可以使用使用绝对路径
      不跨盘符可以使用相对路径

    4.在idea中如何写相对路径:
      a.哪个路径为参照路径,哪个路径就可以省略不写
      b.什么是参照路径:当前project的绝对路径

      c.举例1:在day19_map_file这个模块下创建了一个1.txt,1.txt的相对路径怎么写?
             先将1.txt的绝对路径写出来:F:\idea\workspace\BJ_241229Java\day19_map_file\\1.txt
             再找出参照路径:F:\idea\workspace\BJ_241229Java
             干掉参照路径,剩下的就是1.txt的相对路径写法:day19_map_file\\1.txt   
    5.总结:
      a.在idea中写相对路径从模块名开始写
      b.如果不带模块名,那么默认位置就是在当前project下  
    
```

```java
练习:将指定文件夹下面的所有.jpg的图片都获取出来
    
public class Demo08File {
 public static void main(String[] args) {
     File file = new File("F:\\idea\\io\\aa");
     method(file);
 }

 private static void method(File file) {
     //1.遍历file对象表示的文件夹
     File[] files = file.listFiles();
     for (File file1 : files) {
         //2.判断如果是文件,就直接获取文件名
         if (file1.isFile()) {
             //3.判断文件名是否是以.jpg结尾的
             String name = file1.getName();
             if (name.endsWith(".jpg")){
                 System.out.println(name);
             }
         }else{
             method(file1);
         }
     }
 }
}
```

## 哈希表

![image-20250717104033780](/images/javase-concepts/image-20250717104033780.png)

## 正则表达式

```java
1.概述:用于校验一个字符串
2.作用:用于校验规则:比如用户名  密码   手机号  身份证号   邮箱等
3.方法:String中的方法:
  boolean matches(正则表达式)-> 判断字符串是否符合指定的正则规则
4.举例: 校验QQ号:
       不能以0开头,都是数字,5-15位
           
5.代码:
public class Demo01Regex {
    public static void main(String[] args) {
        /*
          不能以0开头,都是数字,5-15位
         */
        boolean result = "03112312312".matches("[1-9][0-9]{4,14}");
        System.out.println("result = " + result);
    }
}
```

```java
java.util.regex.Pattern:正则表达式的编译表示形式。
    正则表达式-字符类:[]表示一个区间,范围可以自己定义
        语法示例：
        1. [abc]：代表a或者b，或者c字符中的一个。
        2. [^abc]：代表除a,b,c以外的任何字符。
        3. [a-z]：代表a-z的所有小写字符中的一个。
        4. [A-Z]：代表A-Z的所有大写字符中的一个。
        5. [0-9]：代表0-9之间的某一个数字字符。
        6. [a-zA-Z0-9]：代表a-z或者A-Z或者0-9之间的任意一个字符。
        7. [a-dm-p]：a 到 d 或 m 到 p之间的任意一个字符

     正则表达式-逻辑运算符
            语法示例：
            1. &&：并且
            2. | ：或者

     正则表达式-预定义字符
        语法示例：
        1. "." ： 匹配任何字符。(重点)  不能加[]
        2. "\\d"：任何数字[0-9]的简写；(重点)
        3. "\\D"：任何非数字[^0-9]的简写；
        4. "\\s"： 空白字符：[ \t\n\x0B\f\r] 的简写
        5. "\\S"： 非空白字符：[^\s] 的简写
        6. "\\w"：单词字符：[a-zA-Z_0-9]的简写(重点)
        7. "\\W"：非单词字符：[^\w]

     正则表达式-数量词
            语法示例：x代表字符
            1. X? : x出现的数量为 0次或1次
            2. X* : x出现的数量为 0次到多次 任意次
            3. X+ : x出现的数量为 1次或多次 X>=1次
            4. X{n} : x出现的数量为 恰好n次 X=n次
            5. X{n,} : x出现的数量为 至少n次 X>=n次  x{3,}
            6. X{n,m}: x出现的数量为 n到m次(n和m都是包含的)   n=<X<=m

      正则表达式-分组括号( )  (abc)
                
String类中和正则表达式相关的方法
        boolean matches(String regex) 判断字符串是否匹配给定的正则表达式。
        String[] split(String regex) 根据给定正则表达式的匹配拆分此字符串。
        String replaceAll(String regex, String replacement)把满足正则表达式的字符串,替换为新的字符
                
public class RegexTest {
    public static void main(String[] args) {
        //String[] split(String regex) 根据给定正则表达式的匹配拆分此字符串。
        String s1 = "abc sdfads  sadfasd ";
        String[] arr = s1.split(" +");  // 空格出现1次或多次
        System.out.println(Arrays.toString(arr));
        //String replaceAll(String regex, String replacement)把满足正则表达式的字符串,替换为新的字符
        String s = s1.replaceAll(" +", "z");
        System.out.println("s = " + s);
    }
}
```

> https://www.sojson.com/regex/generate     正则表达式生成网址

## 字节流

```java
1.I:输入 -> Input
  O:输出 -> Output
2.概述:将一个数据从一个设备上传输到另外一个设备上的技术
    
      谁发数据谁就是输出 -> 写
      谁收数据谁就是输入 -> 读
    
3.针对于se阶段(内容和硬盘之间):
  输出:将数据从内存中写到硬盘上
  输入:从硬盘上将数据读到内存中

4.字节流:万物皆字节,所以字节流叫做"万能流"(侧重指的是复制)
    
  OutputStream:字节输出流的父类 -> 抽象类
  InputStream:字节输入流的父类 -> 抽象类
    
5.字符流:专门操作文本文档的
    
  Writer:字符输出流的父类 -> 抽象类
  Reader:字符输入流的父类 -> 抽象类

6.IO流四大基类:
    OutputStream
    InputStream
    Writer
    Reader
```

![image-20250717160215935](/images/javase-concepts/image-20250717160215935.png)





```java
1.字节输出流:FileOutputStream extends OutputStream
2.作用:写数据
3.构造:
  FileOutputStream(File file)
  FileOutputStream(String path)  
4.注意:
  a.输出流如果指定的文件没有,会自动创建
  b.默认情况下,每次执行,都会创建一个新的文件,覆盖老文件
5.方法:
  a.void write(int data) 一个字节一个字节的写
  b.void write(byte[] bytes) 一个字节数组一个字节数组的写
  c.void write(byte[] bytes,int offset,int count) 一次写一个字节数组一部分
  d.void close() 释放资源    
```



```java
public class Demo01FileOutputStream {
    public static void main(String[] args) throws Exception{
        //method01();
        method02();
    }

    /**
     * void write(int data) 一个字节一个字节的写
     * @throws Exception
     */
    private static void method01()throws Exception {
        FileOutputStream fos = new FileOutputStream("day20_IO/output/1.txt");
        fos.write(97);
        fos.close();
    }

    /**
     * void write(byte[] bytes) 一个字节数组一个字节数组的写
     * void write(byte[] bytes,int offset,int count) 一次写一个字节数组一部分
     */
    private static void method02()throws Exception {
        FileOutputStream fos = new FileOutputStream("day20_IO/output/1.txt");
        byte[] bytes = {97,98,99,100,101,102};
        //fos.write(bytes,0,3);
        //fos.write(bytes);

        //byte[] bytes1 = "中国".getBytes();
        //fos.write(bytes1);
        fos.write("你好吗".getBytes());
        fos.close();
    }
}


续写追加:
  FileOutputStream(String path,boolean flag) -> flag为true,就会实现续写追加 
      
    /**
     * 续写追加
     */
    private static void method03()throws Exception {
        FileOutputStream fos = new FileOutputStream("day20_IO/output/1.txt",true);
        fos.write("春种一粒粟\r\n".getBytes());
        fos.write("秋收万颗子\r\n".getBytes());
        fos.write("四海无闲田\r\n".getBytes());
        fos.write("农夫犹饿死\r\n".getBytes());
        fos.close();
    }
```

> 换行符:
>
> windows: \r\n 
>
> linux: \n
>
> mac os: \r

![image-20250717160556193](/images/javase-concepts/image-20250717160556193.png)



```java
1.概述:字节输入流 -> FileInputStream extends InputStream
2.作用:读数据
3.构造:
  FileInputStream(File file)
  FileInputStream(String path)
4.方法:
  a.int read() 一次读一个字节,返回的是读取的字节
  b.int read(byte[] bytes) 一次读一个字节数组,返回的是读取的个数
  c.int read(byte[] bytes,int offset,int count) 一次读一个字节数组一部分,返回的是读取的个数
  d.void close()释放资源    
```



```java
  /**
     * int read() 一次读一个字节,返回的是读取的字节
     */
    private static void method01() throws Exception {
        FileInputStream fis = new FileInputStream("day20_IO/output/2.txt");
        //int data1 = fis.read();
        //System.out.println(data1);

        //int data2 = fis.read();
        //System.out.println(data2);
        
        //int data3 = fis.read();
        //System.out.println(data3);

        //int data4 = fis.read();
        //System.out.println(data4);

        //int data5 = fis.read();
        //System.out.println(data5);

        //定义一个变量,接收读取的字节
        int len = 0;
        while((len = fis.read())!=-1){
            //System.out.println(len);
            System.out.println((char)len);
        }
        fis.close();
    }

1.流中的数据读完之后,就不能再继续读了,如果还想重新读,就再new一个对象

2.读取的过程中,不要连续写多个read

3.流关闭之后,不能再次使用,否则会报错
    
4.每个文件末尾都有一个"结束标记",这个"结束标记"我们看不见摸不到,但是当我们调用read方法,读到了"结束标记",就会固定返回-1
    
Exception in thread "main" java.io.IOException: Stream Closed
	at java.base/java.io.FileInputStream.read0(Native Method)
	at java.base/java.io.FileInputStream.read(FileInputStream.java:228)
	at com.atguigu.b_input.Demo01FileInputStream.method01(Demo01FileInputStream.java:34)
	at com.atguigu.b_input.Demo01FileInputStream.main(Demo01FileInputStream.java:8)
```

![image-20250717160751860](/images/javase-concepts/image-20250717160751860.png)

```java
  /**
     * int read(byte[] bytes) 一次读一个字节数组,返回的是读取的个数
     * @throws Exception
     */
    private static void method02() throws Exception{
        FileInputStream fis = new FileInputStream("day20_IO/output/2.txt");
        /*
           数组长度定为多少,那么每次就会读取多少个数据
           数据都会先保存到数组中,然后我们再从数组中获取
         */
        byte[] bytes = new byte[2];
       /*
        int len1 = fis.read(bytes);
        System.out.println(len1);

        int len2 = fis.read(bytes);
        System.out.println(len2);

        int len3 = fis.read(bytes);
        System.out.println(len3);*/

        //定义一个变量,代表读取的个数
        int len = 0;
        while((len = fis.read(bytes))!=-1){
            //System.out.println(new String(bytes));
            System.out.println(new String(bytes,0,len));
        }
        fis.close();
    }
```

![image-20250717160921101](/images/javase-concepts/image-20250717160921101.png)

```java
public class Demo02Copy {
    public static void main(String[] args) throws Exception {
        //1.创建FileInputStream用于读取本地上的图片字节
        FileInputStream fis = new FileInputStream("F:\\idea\\io\\2.png");
        //2.创建FileOutputStream用于将读取到的字节写到指定的位置
        FileOutputStream fos = new FileOutputStream("F:\\idea\\io\\2_copy.png");
        //3.边读边写
        byte[] bytes = new byte[1024];
        int len = 0;
        while((len = fis.read(bytes)) != -1){
            fos.write(bytes,0,len);
        }

        //4.关流 -> 先开后关
        fos.close();
        fis.close();
    }
}
```

## 字符流

```java
1.注意:
  a.英文字母:在GBK中,还是UTF-8中都是占一个字节
  b.中文:一个汉字在GBK中占2个字节
         一个汉字在UTF-8中占3个字节
2.字节流属于万能流(侧重于文件复制):但是不能边读边看(一边读,一边输出)   
  解决:我们在读取文本文档的时候,如果把内容看成是一个一个的字符去操作,就可以了
      
3.说明:即使用字符流去操作文本文档,那么前提也是编码和解码规则一致

       如果编码解码规则不一致,字符流操作也会出现乱码情况

       字符流操作文本文档,如果编码和解码一致,边读边看是不会乱的

       字节流操作文本文档,即使编码和解码一致,边读边看也有可能出现乱码
```

```java
1.概述:字符输入流-> FileReader extends Reader
2.作用:读字符
3.构造:
  FileReader(File file)
  FileReader(String path)
4.方法:
  a.int read() 一次读取一个字符,返回的是读取的字符
  b.int read(char[] chars)一次读取一个字符数组,返回的是读取的个数
  c.void close() 关闭资源
```

```java
    /**
     * int read() 一次读取一个字符,返回的是读取的字符
     * @throws Exception
     */
    private static void method02() throws Exception {
        FileReader fr = new FileReader("day20_IO/output/3.txt");
  /*      int data1 = fr.read();
        System.out.println((char) data1);

        int data2 = fr.read();
        System.out.println((char) data2);*/

        int len = 0;
        while((len = fr.read())!=-1){
            System.out.println((char) len);
        }
        fr.close();
    }
```

```java
    /**
     * int read(char[] chars)一次读取一个字符数组,返回的是读取的个数
     */
    private static void method03()throws Exception {
        FileReader fr = new FileReader("day20_IO/output/3.txt");
        char[] chars = new char[3];
        //定义一个len,接收读取的个数
        int len = 0;
        while((len = fr.read(chars))!=-1){
            System.out.println(new String(chars,0,len));
        }
    }
```

```java
1.概述:字符输出流 -> FileWriter extends Writer
2.作用:写字符
3.构造:
  FileWriter(File file)
  FileWriter(String path)
  FileWriter(String path,boolean flag)-> flag如果是true,就会实现续写追加
4.方法:
  void write(int i) -> 一次写一个字符
  void write(char[] chars) -> 一次写一个字符数组
  void write(char[] chars,int offset,int count) -> 一次写一个字符数组一部分 
  void write(String s) -> 一次写一个字符串
  void flush() 刷新缓冲区    
  void close() 关闭资源
5.注意:FileWriter底层自带一个缓冲区,我们写的数据先在缓冲区中,我们需要将数据从缓冲区中刷到文件中      
```

```java
    /**
     * void write(String s) -> 一次写一个字符串
     */
    private static void method01() throws IOException {
        FileWriter fw = new FileWriter("day20_IO/output/4.txt");
        fw.write("你好吗?小金莲111");
        fw.close();
    }
```

```java
1.flush():刷新缓冲区,这个方法刷完之后,流对象还能用
2.close():先刷新,后关闭,close之后,流对象就不能使用了    
```

```java
    /**
     * void write(String s) -> 一次写一个字符串
     */
    private static void method01() throws IOException {
        FileWriter fw = new FileWriter("day20_IO/output/4.txt",true);
        fw.write("你好吗?小金莲111");
        fw.flush();
        fw.write("小金莲说:涛哥,你好吗?");
        fw.flush();
        fw.close();
        //fw.write("涛哥说:小金莲,我嗑药了!你去和庆庆过吧");
    }
```

## IO异常处理方式

```java
public class Demo02FileWriter {
    public static void main(String[] args) {
        FileWriter fw = null;
        try {
            fw = new FileWriter("day20_IO/output/4.txt");
            fw.write("你好");

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            /*
              如果fw不是null,证明new了,所以最后要close
              如果是null,证明没new,这个时候就不用close了
             */
            if (fw!=null){
                try {
                    fw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

```java
1.格式:
  try(IO流对象;IO流对象){
      
  }catch(异常 对象名){
      对象名.printStackTrace()
  }
2.会自动关闭流对象


	/**
     * jdk7以后得IO流异常处理
     */
    private static void method02() {
        try (FileWriter fw = new FileWriter("day20_IO/output/4.txt")) {
            fw.write("涛哥问:小金莲,你在干什么?");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

```java
JDK1.9又对trywith-resources的语法升级了
    
IO流对象1声明和初始化;
IO流对象2声明和初始化;

try(IO流对象1;IO流对象2){
    可能出现异常的代码
}catch(异常类型 对象名){
	异常处理方案
}

	/**
     * 不用close
     * 还减少了try的压力
     * @throws IOException
     */
    private static void method03() throws IOException {
        FileWriter fw = new FileWriter("day20_IO/output/4.txt");
        try (fw) {
            fw.write("涛哥问:小金莲,你在干什么?");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

```

## 序列化流 + 反序列化流

```java'
1.有两个流对象:
  a.序列化流:ObjectOutputStream
  b.反序列化流:ObjectInputStream
2.作用:读写对象      
```

> 一个对象想要在网络上进行传输,这个对象必须要实现序列化接口

![image-20250717162004677](/images/javase-concepts/image-20250717162004677.png)

```java
1.概述:ObjectOutputStream
2.作用:写对象
3.构造:
  ObjectOutputStream(OutputStream os)
4.方法:
  writeObject(Object o) 写对象
  注意: 写对象时  对象必须实现 Serializable接口
```

```java
public class Person implements Serializable {
    private String name;
    private Integer age;

    public Person() {
    }

    public Person(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```java
    /**
     * 序列化流
     * 1.概述:ObjectOutputStream
     * 2.作用:写对象
     * 3.构造:
     *   ObjectOutputStream(OutputStream os)
     * 4.方法:
     *   writeObject(Object o) 写对象
     */
    private static void writer() throws Exception {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("day20_IO/output/person.txt"));
        Person p1 = new Person("小金莲", 18);
        oos.writeObject(p1);
        oos.close();
    }
```

```java
1.概述:ObjectInputStream
2.作用:读对象
3.构造:
  ObjectInputStream(InputStream is)
4.方法:
  Object readObject()
```

```java
   /**
     * 1.概述:ObjectInputStream
     * 2.作用:读对象
     * 3.构造:
     *   ObjectInputStream(InputStream is)
     * 4.方法:
     *   Object readObject()
     */
    private static void reader()throws Exception {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("day20_IO/output/person.txt"));
        Person p = (Person)ois.readObject();
        System.out.println(p);
        ois.close();
    }
```

```java
不想被序列化操作(了解)
    关键字: transient
        
反序列化时出现的问题以及分析以及解决
    问题描述:
      我们修改了源码,但是没有重新序列化,直接反序列化了,就会出现序列号冲突问题
	解决: 
	  人为的将序列号定死  public static final long serialVersionUID = 42L;
```

![image-20250717162533237](/images/javase-concepts/image-20250717162533237.png)



```java
如果我们序列化多个对象,我们反序列化时就需要循环读取,如果循环的次数和存储对象的个数不一样,就会出现EOFException(文件意外到达结尾异常) 
    解决办法: 使用List -> 只序列化一次  反序列化一次
    
public class Demo02ObjectWriteAndRead {
    public static void main(String[] args)throws Exception {
        //riter();
        reader();
    }

    /**
     * 1.概述:ObjectInputStream
     * 2.作用:读对象
     * 3.构造:
     *   ObjectInputStream(InputStream is)
     * 4.方法:
     *   Object readObject()
     */
    private static void reader()throws Exception {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("day20_IO/output/person.txt"));
        //Person p1 = (Person)ois.readObject();
        //Person p2 = (Person)ois.readObject();
        //Person p3 = (Person)ois.readObject();
        //Person p4 = (Person)ois.readObject();
        //System.out.println(p1);
        //System.out.println(p2);
        //System.out.println(p3);
        //System.out.println(p4);
        ArrayList<Person> list = (ArrayList<Person>) ois.readObject();
        for (Person person : list) {
            System.out.println(person);
        }
        ois.close();
    }

    /**
     * 序列化流
     * 1.概述:ObjectOutputStream
     * 2.作用:写对象
     * 3.构造:
     *   ObjectOutputStream(OutputStream os)
     * 4.方法:
     *   writeObject(Object o) 写对象
     */
    private static void writer() throws Exception {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("day20_IO/output/person.txt"));
        Person p1 = new Person("小金莲", 18);
        Person p2 = new Person("小涛哥", 20);
        Person p3 = new Person("小庆庆", 19);
        ArrayList<Person> list = new ArrayList<>();
        list.add(p1);
        list.add(p2);
        list.add(p3);
        //oos.writeObject(p1);
        //oos.writeObject(p2);
        //oos.writeObject(p3);
        oos.writeObject(list);
        oos.close();
    }
}
```

## 打印流

```java
1.概述:PrintStream extends OutputStream
2.作用:将数据打印到控制台上或者打印到指定文件中
3.构造:
  PrintStream(String path)
4.方法:
  println():原样输出,自带换行效果
  print():原样输出,不带换行效果    
```

```java
public class Demo01PrintStream {
    public static void main(String[] args) throws Exception {
        PrintStream ps = new PrintStream("day20_IO/output/print.txt");
        ps.println("一片两片三四片");
        ps.println("五片六片七八片");
        ps.println("九片十片十一片");
        ps.println("香山红叶红满天");
        ps.close();
    }
}
```



```java
System类有一个静态方法:  setOut(PrintStream ps) -> 改变流向 -> 将输出语句在控制台上打印的结果转移到指定的文件中输出保存
    
public class Demo02PrintStream {
    public static void main(String[] args) throws Exception {
        PrintStream ps = new PrintStream("day20_IO/output/print.txt");
        System.out.println("哈哈哈");
        System.out.println("嘿嘿嘿");
        System.setOut(ps);  // 改变流向  后面的输出到文件中
        System.out.println("此类中有一个异常");
        System.out.println("叫做空指针异常");
        System.out.println("原因是:ps对象为null");
        System.out.println("在代码的第7行");
        ps.close();
    }
}

使用场景:
可以将输出的内容以及详细信息放到日志文件中,永久保存
以后我们希望将输出的内容永久保存,但是输出语句会将结果输出到控制台上,控制台是临时显示,如果有新的程序运行,新程序的运行结果会覆盖之前的结果,这样无法达到永久保存,到时候我们想看看之前的运行结果信息就看不到了,所以我们需要将输出的结果保存到日志文件中,就可以使用setOut改变流向
```

```java
PrintStream(OutputStream out)
            OutputStream抽象类,可以传递FileOutputStream,FileOutputStream中有一个追加续写的构造
    
public class Demo03PrintStream {
    public static void main(String[] args) throws Exception {
        PrintStream ps = new PrintStream(new FileOutputStream("day21_net/3.txt",true));
        ps.println("哈哈哈");
        ps.close();
    }
}
```

```java
void load(InputStream inStream)-> 将文件中的数据加载到properties集合中
    
问题描述:
  将来我们写代码的时候有很多重要的"硬数据",比如用户名,密码等,如果这些数据放到源代码中,后续要是修改,我们就要频繁的去源代码中修改,将来类和类之间有联系,频繁修改源代码,有可能导致代码出现问题,有可能牵连到其他的类
  所以我们应该将这些"硬数据"放到文件中,用java代码动态解析此文件,动态获取文件中重要的数据
     
1.创建xxx.properties配置文件
2.创建方式: 在当前模块下,右键 -> new -> file -> 取名xxx.properties
3.做配置:
  a.配置文件中数据格式:key=value形式
  b.每一个键值对写完,需要换行写下一对
  c.key和value都是String的,但是不要加""
  d.不要写中文
      
username=root
password=1234
      
public class Demo01Properties {
    public static void main(String[] args) throws Exception {
        Properties properties = new Properties();
        //创建FileInputStream
        FileInputStream fis = new FileInputStream("day20_IO/output/pro.properties");
        //调用load方法将流中的数据加载到properties集合中
        properties.load(fis);

        String username = properties.getProperty("username");
        String password = properties.getProperty("password");
        System.out.println(username+"..."+password);
    }
}
```

## 网络编程 和 类加载时机

```java
1.概述:在一定的协议下,完成数据的传输的技术  -> 网络编程
2.场景:
  聊天   网游
  只要是在一定协议下进行的网络传输,都会有网编的存在
```

![image-20250717164334068](/images/javase-concepts/image-20250717164334068.png)



```java
服务器概念：安装了服务器软件的计算机
    
网络通信协议:两台计算机在做数据交互时要遵守的规则,协议会对数据的格式,速率等进行规定,只有都遵守了这个协议,才能完成数据交互

两台计算机想完成数据交互,需要遵守网络通信协议
```

![image-20250717164427089](/images/javase-concepts/image-20250717164427089.png)

```java
通信三要素
    
[IP地址]:计算机的唯一标识,用于两台计算机之间的连接

      a.概述:指互联网协议地址（Internet Protocol Address），俗称IP
            计算机的唯一标识
      b.作用:可用于计算机和计算机之间的连接
      c.IPV4
        32位的二进制数，通常被分为4个字节，表示成a.b.c.d 的形式，例如192.168.65.100 。其中a、b、c、d都是0~255之间的十进制整数，那么最多可以表示42亿个。
        IPV6
        为了扩大地址空间，拟通过IPv6重新定义地址空间，采用128位地址长度，每16个字节一组，分成8组十六进制数，表示成ABCD:EF01:2345:6789:ABCD:EF01:2345:6789->号称能给地球上的每一粒沙子分配一个IP地址
        
      d.查看ip的命令:ipconfig
        测试是否能连接其他计算机的命令:ping ip地址
        
      e:特殊的地址:代表的是本机地址,到了哪里都不会变,代表自己
        127.0.0.1 -> 固定不变
        localhost
          
        localhost(主机名,写的是服务器的IP):端口号/应用名称/资源
        localhost:8080/web应用程序名称/资源       

[协议]
     TCP:面向连接协议
         需要先确认连接,才能进行数据交互
         三次握手:
            - 第一次握手，客户端向服务器端发出连接请求，等待服务器确认。
            - 第二次握手，服务器端向客户端回送一个响应，通知客户端收到了连接请求。
            - 第三次握手，客户端再次向服务器端发送确认信息，确认连接。
            
         好处:数据安全,能给数据的传输提供一个安全的传输环境
         坏处:效率低
     
     UDP:面向无连接协议
         好处:效率高
         坏处:传输的数据不安全,容易丢失数据包

[端口号]
   每一个应用程序的唯一标识
  
  用两个字节表示的整数，它的取值范围是0~65535。其中，0~1023之间的端口号用于一些知名的网络服务和应用，普通的应用程序需要使用1024以上的端口号。如果端口号被另外一个服务或应用所占用，会导致当前程序启动失败。
```

![image-20250717164531276](/images/javase-concepts/image-20250717164531276.png)

```java
TCP协议中的三次握手和四次挥手
    
三次握手:
- 第一次握手，客户端向服务器端发出连接请求，等待服务器确认。
- 第二次握手，服务器端向客户端回送一个响应，通知客户端收到了连接请求。
- 第三次握手，客户端再次向服务器端发送确认信息，确认连接。
    
四次挥手:
- 第一次挥手：客户端向服务器端提出结束连接，让服务器做最后的准备工作。此时，客户端处于半关闭状态，即表示不再向服务器发送数据了，但是还可以接受数据。
 
- 第二次挥手：服务器接收到客户端释放连接的请求后，会将最后的数据发给客户端。并告知上层的应用进程不再接收数据。
 
- 第三次挥手：服务器发送完数据后，会给客户端发送一个释放连接的报文。那么客户端接收后就知道可以正式释放连接了。
 
- 第四次挥手：客户端接收到服务器最后的释放连接报文后，要回复一个彻底断开的报文。这样服务器收到后才会彻底释放连接。这里客户端，发送完最后的报文后，会等待2MSL，因为有可能服务器没有收到最后的报文，那么服务器迟迟没收到，就会再次给客户端发送释放连接的报文，此时客户端在等待时间范围内接收到，会重新发送最后的报文，并重新计时。如果等待2MSL后，没有收到，那么彻底断开。
```

![image-20250717164600152](/images/javase-concepts/image-20250717164600152.png)

```java
类的加载时机
    1.new对象
    2.new子类(new子类先初始化父类)
    3.调用静态成员
    4.执行main方法
    5.利用反射获取class对象	
```

![image-20250717164652711](/images/javase-concepts/image-20250717164652711.png)



```java
类加载器(了解)_ClassLoader
    
作用:主要是将类加载到内存
    
1.概述:
   在jvm中,负责将本地上的class文件加载到内存的对象_ClassLoader
2.分类:
   BootStrapClassLoader:根类加载器->C语言写的,我们是获取不到的
                        也称之为引导类加载器,负责Java的核心类加载的
                        比如:System,String等
                        jre/lib/rt.jar下的类都是核心类
   ExtClassLoader:扩展类加载器
                  负责jre的扩展目录中的jar包的加载
                  在jdk中jre的lib目录下的ext目录
   AppClassLoader:系统类加载器
                  负责在jvm启动时加载来自java命令的class文件(自定义类),以及classPath环境变量所指定的jar包(第三方jar包)
        
    不同的类加载器负责加载不同的类
       
3.三者的关系(从类加载机制层面):AppClassLoader的父类加载器是ExtClassLoader
            ExtClassLoader的父类加载器是BootStrapClassLoader
 
  但是:他们从代码级别上来看,没有子父类继承关系->他们都有一个共同的父类->ClassLoader

4.获取类加载器对象:getClassLoader()是Class对象中的方法
  类名.class.getClassLoader() -> 记住  -> 或者指定类的类加载器
  
5.获取类加载器对象对应的父类加载器
  ClassLoader类中的方法:ClassLoader  	
  getParent()->没啥用
      
6.双亲委派(全盘负责委托机制)

   a.Person类中有一个String
     Person本身是AppClassLoader加载
     String是BootStrapClassLoader加载
   b.加载顺序:
     Person本身是App加载,按道理来说String也是App加载
     但是App加载String的时候,先问一问Ext,说:Ext你加载这个String吗?
     Ext说:我不加载,我负责加载的是扩展类,但是app你别着急,我问问我爹去->boot
     Ext说:boot,你加载String吗?
     boot说:正好我加载核心类,行吧,我加载吧!
         
7.类加载器的cache(缓存)机制(扩展):一个类加载到内存之后,缓存中也会保存一份儿,后面如果再使用此类,如果缓存中保存了这个类,就直接返回他,如果没有才加载这个类.下一次如果有其他类在使用的时候就不会重新加载了,直接去缓存中拿,保证了类在内存中的唯一性
     
8.所以:类加载器的双亲委派和缓存机制共同造就了加载类的特点:保证了类在内存中的唯一性
```

![image-20250717164945073](/images/javase-concepts/image-20250717164945073.png)



## 反射

```java
1.class对象-> class文件的对象
2.万物皆对象
   a.类有对象->Class对象 -> 用于描述class对象的类就是class类
   b.构造有对象->Constructor对象 -> 用于描述Constructor对象的类叫做Constructor类
   c.属性有对象-> Field对象 -> 用于描述Field对象的类叫做Field类
   d.方法有对象 -> Method对象 -> 用于描述Method对象的类叫做Method类

    
3.反射的作用:是用来解剖class对象的技术
4.解剖class对象能解剖出啥来呢?
  a.解剖出构造:创建对象
  b.解剖属性:赋值取值
  c.解剖方法:调用执行
5.反射怎么学:
   当成一套API来学 -> 调用不同的方法,有不同效果作用
6.通过旭哥的案例体会反射代码的灵活性,通用性
7.玩儿反射之前最重要的是干啥:拿到class对象       
```

![image-20250717165245946](/images/javase-concepts/image-20250717165245946.png)







```java
反射之获取Class对象
    
    1.new对象,调用Object类中的getClass方法
      Class<?> getClass()  

    2.调用Class类中的静态方法:
      static Class<?> forName(String className)  -> 参数传递的是类的全限定名(包名.类名)

    3.jvm为基本类型和引用类型都提供了一个共同的静态属性:
      class
```

```java
package day21.com.hebut;

public class ReflectTest {
    public static void main(String[] args) throws ClassNotFoundException {
        /*
        1.new对象,调用Object类中的getClass方法
           Class<?> getClass()
        */
        Student student = new Student("张三", 18);
        Class<? extends Student> aClass = student.getClass();
        System.out.println(aClass);
        System.out.println("=======================");

        /*
        2.调用Class.forName方法
           Class<?> forName(String className)
        */
        Class<?> aClass1 = Class.forName("day21.com.hebut.Student");
        System.out.println(aClass1);
        System.out.println("=======================");

        /*
        3.jvm为基本类型和引用类型都提供了一个共同的静态属性:
             class
        */
        Class<Student> aClass2 = Student.class;
        System.out.println(aClass2);
    }
}
```

>1.如何验证类的全限定名写对了:
>
>按住ctrl不放,鼠标往类名上点击,能跳到这个类里面就这名写对了
>
>2.如何保证类的全限定名一次性写对:
>
>![image-20250717170544768](/images/javase-concepts/image-20250717170544768.png)



```java
三种获取Class对象的方式最通用的一种
static Class<?> forName(String className)  -> 参数传递的是类的全限定名(包名.类名)

className=com.atguigu.a_reflect.Student
    
public class Demo02Reflect {
    public static void main(String[] args) throws ClassNotFoundException, IOException {
        Properties properties = new Properties();
        FileInputStream is = new FileInputStream("day21_reflect/pro.properties");
        properties.load(is);
        String className = properties.getProperty("className");

        Class<?> aClass = Class.forName(className);
        System.out.println("aClass = " + aClass);
    }
} 
```

```java
开发中最常用的是哪一种
类名.class    
```


```java
获取Class对象中的构造方法_Constructor

Class类中的方法:
   Constructor<?>[] getConstructors()  获取所有public的构造
       
    private static void method01() {
        Class<Person> personClass = Person.class;
        Constructor<?>[] constructors = personClass.getConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println("constructor = " + constructor);
        }
    }

1.Class类中的方法:
  Constructor<T> getConstructor(Class<?>... parameterTypes)获取指定的public的构造
      形参:是一个可变参数,可以传递0个或者多个实参
          传递的是参数类型的class对象
                                  
          如果获取空参构造,那么不用传递参数
          如果获取有参构造,就传递这个有参构造参数类型的class对象
                                    
2.Constructor类中的方法:
   T newInstance(Object... initargs)-> 根据构造创建对象
       initargs:是一个可变参数,可以传递0个或者多个实参 
           
    @Test
    public void method02()throws Exception {
        Class<Person> personClass = Person.class;
        Constructor<Person> constructor = personClass.getConstructor();
        //Person person = new Person()
        Person person = constructor.newInstance();
        //相当于直接输出对象名,默认调用toString方法
        System.out.println(person);
    }

 	@Test
    public void method04()throws Exception{
        Class<Person> personClass = Person.class;
        Constructor<Person> constructor = personClass.getConstructor(String.class, Integer.class);
        //好比是 Person person = new Person("张三",18);
        Person person = constructor.newInstance("张三", 18);
        System.out.println("person = " + person);
    }  
```


```java
利用反射获取私有构造(暴力反射)
    
1.Class类中的方法:
   Constructor<?>[] getDeclaredConstructors()获取所有的构造方法包括public以及private  
   Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)  获取指定的构造,包括public以及private的  
       
2.Constructor类中的方法:
   T newInstance(Object... initargs)-> 根据构造创建对象
                 initargs:是一个可变参数,可以传递0个或者多个实参  
                     
3.解除私有权限:Constructor, Field, Method 有一个共同的父类AccessibleObject,AccessibleObject中有一个方法:
  void setAccessible(boolean flag)  -> flag为true,证明是解除私有权限
      
    @Test
    public void method05()throws Exception{
        Class<Person> personClass = Person.class;
        Constructor<Person> constructor = personClass.getDeclaredConstructor(String.class);
        //接触私有权限
        constructor.setAccessible(true);
        //好比是 Person person = new Person("张三");
        Person person = constructor.newInstance("张三");
        System.out.println("person = " + person);
    }
```


```java
反射方法_Method
    
1.Class类中的方法:
  Method[] getMethods()  -> 获取所有的public的成员方法
      
   @Test
    public void method01(){
       Class<Person> personClass = Person.class;
       Method[] methods = personClass.getMethods();
       for (Method method : methods) {
           System.out.println("method = " + method);
       }
   }

1.Class类中的方法:
  Method getMethod(String name, Class<?>... parameterTypes) 获取指定的方法
                   name:方法名
                   parameterTypes:传递的是方法参数类型的class对象
2.Method类中的方法:
  Object invoke(Object obj, Object... args) 执行指定的方法
                obj:对象
                args:此方法的实参
                返回值Object: 被执行方法的返回值,如果此方法没有返回值,不需要用Object接收了 
                    
    @Test
    public void method02() throws Exception {
        Class<Person> personClass = Person.class;
        Person person = personClass.newInstance();
        Method setName = personClass.getMethod("setName", String.class);
        setName.invoke(person, "张三");
        System.out.println("person = " + person);

        Method getName = personClass.getMethod("getName");
        Object name = getName.invoke(person);
        System.out.println(name);
    }
```

```java
1.Class类中的方法:
  Method getDeclaredMethod(String name, Class<?>... parameterTypes)-> 获取指定的成员方法,包括public以及private
      name:方法名
      parameterTypes:方法参数类型的class对象
              
    @Test
    public void method03()throws Exception{
        Class<Person> personClass = Person.class;
        Person person = personClass.newInstance();
        Method eat = personClass.getDeclaredMethod("eat");
        eat.setAccessible(true);  // 必须设置
        eat.invoke(person);
    }
```


```java
反射成员变量_Field
    
1.Class类中的方法:
  Field[] getFields()  -> 获取所有public的属性
  Field[] getDeclaredFields() -> 获取所有属性包括public以及private的
      
    @Test
    public void method01()throws Exception{
        Class<Person> personClass = Person.class;
        Field[] fields = personClass.getFields();
        for (Field field : fields) {
            System.out.println(field);
        }

        System.out.println("========================");
        Field[] declaredFields = personClass.getDeclaredFields();
        for (Field declaredField : declaredFields) {
            System.out.println(declaredField);
        }
    } 

1.Class类中的方法:
  Field getField(String name)  -> 获取指定的public的属性
                 name:属性名
                     
  Field getDeclaredField(String name) -> 获取指定的属性包括public以及private
                 name:属性名
                     
                     
2.Field类中的方法:
  Object get(Object obj) 获取属性值 
  void set(Object obj, Object value) 为属性赋值
           obj:对象
           value:属性值
               
    @Test
    public void method02()throws Exception{
        Class<Person> personClass = Person.class;
        Person person = personClass.newInstance();
        Field gender = personClass.getField("gender");
        //为属性赋值
        gender.set(person, "男");
        //获取属性值
        Object o = gender.get(person);
        System.out.println("o = " + o);

        System.out.println("===============================");

        Field name = personClass.getDeclaredField("name");
        name.setAccessible(true);
        name.set(person, "小红");
        Object o1 = name.get(person);
        System.out.println("o1 = " + o1);
    }
```

```java
反射练习
    
public interface 接口{
    public Employee getEmployeeById(int id);
} 


xml配置文件:

<select id = "getEmployeeById" resultType = "Employee的全限定名">
     select 列名 from 表名 where 条件
</select>
    
框架可以根据指定的类获取对应的class对象,然后根据配置好的方法名获取此方法,执行此方法 
========================================================================    
1.要求:创建一个properties配置文件
      配置className = 类的全限定名
      配置methodName = 方法名
    
      解析配置文件,根据className拿到methodName,让其执行起来 
    
2.解析配置文件
  a.问题:配置文件应该放到什么位置上
        在模块下创建一个文件夹,取名为resources,并将其变成资源目录(如下图)
        然后将配置文件都放到这个resources目录下
      
        这样运行代码配置文件会自动在out路径下生成 ->然后我们就可以直接将out路径下的class文件以及项目用到的配置文件打包给用户了
      
      
  b.配置文件怎么读取? -> 类加载器
    InputStream is = 当前类名.class.getClassLoader().getResourceAsStream("配置文件名.后缀名") 
    
    自动读取resources目录下的配置文件
        
3.将配置文件中的className对应的类的全限定名获取出来,创建对应的class对象
4.根据配置文件中的methodName获取到方法名
5.执行方法
```

![image-20250717171815394](/images/javase-concepts/image-20250717171815394.png)

```java
className=day21.com.hebut.Student
methodName=Study

package day21.com.hebut;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

public class Demo01Reflect {
    public static void main(String[] args) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        //1.创建properties集合对象
        Properties properties = new Properties();
        //2.读取配置文件
        InputStream in = Demo01Reflect.class.getClassLoader().getResourceAsStream("application.properties");
        //3.将流中的数据加载到properties集合中
        properties.load(in);
        //4.获取propertis中的配置
        String className = properties.getProperty("className");
        String methodName = properties.getProperty("methodName");
        //5.根据获取出来的类的全限定名获取class对象
        Class<?> aClass = Class.forName(className);
        Constructor<?> constructor = aClass.getConstructor(String.class, Integer.class);
        //6.根据class对象获取对应的实例对象
        Object o = constructor.newInstance("zuo", 18);
        //7.根据class对象获取对应的方法对象
        Method method = aClass.getMethod(methodName);
        //8.执行方法
        method.invoke(o);
    }
}

InputStream is = 当前类名.class.getClassLoader().getResourceAsStream("配置文件名.后缀名") 解析

读取resources目录下的配置文件需要用到类的加载器

1.当前类调用class,获取Class对象

2.利用Class对象中的方法getClassLoader()获取类加载器对象(ClassLoader对象)

3.利用ClassLoader对象中的getResourceAsStream方法读取配置文件,此方法最终返回一个InputStream对象
```

## 注解

```java
1.引用数据类型:
  类 数组 接口 枚举 注解 Record
      
2.jdk1.5版本的新特性->一个引用数据类型
       和类,接口,枚举是同一个层次的
     
       引用数据类型:类 数组  接口 枚举 注解  Record
3.作用:
        说明:对代码进行说明,生成doc文档(API文档)
            
        检查:检查代码是否符合条件   @Override(会用) @FunctionalInterface 
            
        分析:对代码进行分析,起到了代替配置文件的作用(会用)
            
4.JDK中的注解:
        @Override  ->  检测此方法是否为重写方法
           jdk1.5版本,支持父类的方法重写
           jdk1.6版本,支持接口的方法重写
        @Deprecated -> 方法已经过时,不推荐使用
                       调用方法的时候,方法上会有横线,但是能用
        @SuppressWarnings->消除警告  @SuppressWarnings("all")  
```

![image-20250717173224227](/images/javase-concepts/image-20250717173224227.png)



```java
1.格式:
  public @interface 注解名{}

2.属性定义:增强注解的功能
  a.数据类型 属性名()  -> 这种属性没有默认值,到时候使用注解的时候,必须为其赋值
  b.数据类型 属性名() default 值 -> 这种属性是有默认值的,到时候使用注解的时候,不用为其赋值 
3.注解中能定义什么类型的属性呢?
  a.8种基本类型
  b.String类型,class类型,枚举类型,注解类型
  c.以及以上类型的一维数组         
```

```java
public @interface Book {
    String name();//书名
    String[] author();//作者
    int price();//价格
    int count() default 10;
}

public @interface Book2 {
    String value();
}

其实人家在注解中不是属性,其实是抽象方法

那为啥我跟它叫做属性呢?原因是一会使用注解的时候,我们会给这些方法赋值 -> 方法名 = 值  -> 跟属性赋值一样,所以跟它叫做属性
```

```java
1.注解的使用:为属性赋值
  a.使用位置:在类上,方法上,形参上,属性上,构造上等上使用
  b.@注解名(属性名 = 值,属性名 = 值...)
  c.如果注解中的属性是数组的话:
    @注解名(属性名 = {元素1,元素2})
        
@Book(name="金瓶梅",author={"旭哥","金莲"},price=69)
public class BookShelf {
}
```

```java
注解注意事项:
      1.空注解可以直接使用->空注解就是注解中没有任何的属性
      2.不同的位置可以使用一样的注解,但是同样的位置不能使用一样的注解
      3.使用注解时,如果此注解中有属性,注解中的属性一定要赋值,如果有多个属性,用,隔开
        如果注解中的属性有数组,使用{}
      4.如果注解中的属性值有默认值,不用重新赋值,反之必须赋值
      5.如果注解中只有一个属性,并且属性名叫value,那么使用注解的时候,属性名不用写,直接写值 (包括单个类型,还包括数组)
```

```java
@Book(name="金瓶梅",author={"旭哥","金莲"},price=69)
@Book2("旭哥和金莲在苞米地的故事")
//@Book2
public class BookShelf {
    @Book2("旭哥和金莲在苞米地的故事")
    public void method(){}
}
```

```java
注解解析的方法->AnnotatedElement接口
    
1.接口:AnnotatedElement接口
  实现类:AccessibleObject, Class, Constructor, Field, Method, Package 
      
2.接口中的方法:
  a.boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) -> 判断指定位置上有没有指定的注解 
      
    比如:判断BookShelf类上有没有Book注解
    Class class = BookShelf.class
    class.isAnnotationPresent(Book.class) 
        
  
  b.T getAnnotation(Class<T> annotationClass) -> 获取指定的注解
       
    比如:获取BookShelf类上的Book注解
        Class class = BookShelf.class
        boolean b = class.isAnnotationPresent(Book.class)
        如果b为true,就获取Book注解
        Book book = class.getAnnotation(Book.class);

public class Demo01Annotation {
    public static void main(String[] args) {
        //获取BookShelf的Class对象
        Class<BookShelf> bookShelfClass = BookShelf.class;
        //判断bookShelfClass是否有Book注解
        boolean b = bookShelfClass.isAnnotationPresent(Book.class);
        System.out.println("b = " + b);
        if (b){
            Book book = bookShelfClass.getAnnotation(Book.class);
            System.out.println(book.name());
            System.out.println(Arrays.toString(book.author()));
            System.out.println(book.price());
            System.out.println(book.count());
        }
    }
}
// 如果自定义的注解没有在运行的时候被加载到内存中,那么即使使用了,在内存中也获取不到
// 解决办法  添加元注解
```

## 元注解

```java
1.概述:元注解本身也是一个注解
2.作用:管理自定义的注解
3.都从哪些方面管理呢?
  a.管理注解的使用位置
  b.管理注解的生命周期
    
4.@Target: 管理注解的使用位置
  a.ElementType[] value();
  b.ElementType:是一个枚举类
    TYPE:控制注解只能在类上使用
    FIELD:控制注解只能在属性上使用
    METHOD:控制注解只能在方法上使用
    PARAMETER:控制注解只能在参数上使用
    CONSTRUCTOR:控制注解只能在构造上使用
    LOCAL_VARIABLE:控制注解只能在局部变量上使用
        
5.@Retention:控制注解的生命周期 
  a.@Retention中只有一个属性:RetentionPolicy value();
  b.RetentionPolicy:是一个枚举
    SOURCE:控制注解能在源码中出现
    CLASS:控制注解能在class文件中出现
    RUNTIME:控制注解能在运行时内存中出现          
```

```java
@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Book {
    String name();//书名
    String[] author();//作者
    int price();//价格
    int count() default 10;
}
```

```java
@Book(name = "金瓶梅", author = {"旭哥", "金莲"}, price = 99)
public class BookShelf {
    @Book(name = "金瓶梅", author = {"旭哥", "金莲"}, price = 66)
    public void method() {
    }
}
```

```java
public class Demo01Annotation {
    public static void main(String[] args) {
        //获取BookShelf的Class对象
        Class<BookShelf> bookShelfClass = BookShelf.class;
        //判断bookShelfClass是否有Book注解
        boolean b = bookShelfClass.isAnnotationPresent(Book.class);
        System.out.println("b = " + b);
        if (b){
            Book book = bookShelfClass.getAnnotation(Book.class);
            System.out.println(book.name());
            System.out.println(Arrays.toString(book.author()));
            System.out.println(book.price());
            System.out.println(book.count());
        }
    }
}
```
