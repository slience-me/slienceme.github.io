# JavaScript

## 1. JavaScript的介绍

JavaScript是运行在浏览器端的脚步语言, 是由浏览器解释执行的, 简称js, 它能够让网页和用户有交互功能, 增加良好的用户体验效果。

前端开发三大块 1、HTML：负责网页结构 2、CSS：负责网页样式 3、JavaScript：负责网页行为， 比如:网页与用户的交互效果

**JavaScript是运行在浏览器端的脚步语言，它的作用就是负责网页和用户的交互效果。**

## 2. JavaScript的使用方式

### 2.1 行内式（主要用于事件）

```html
<input type="button" name="" onclick="alert('ok！');">
```

### 2.2 内嵌式

```html

<script type="text/javascript">
  alert('ok！');
</script>
```

### 2.3 外链式

```html

<script type="text/javascript" src="js/index.js"></script>
```

## 3. 变量和数据类型

### 3.1 定义变量

JavaScript 是一种弱类型语言，也就是说不需要指定变量的类型，JavaScript的变量类型由它的值来决定， 定义变量需要用关键字 'var',
一条JavaScript语句应该以“;”结尾

定义变量的语法格式:

var 变量名 = 值;

```javascript
var iNum = 123;
var sTr = 'asd';

//同时定义多个变量可以用","隔开，公用一个‘var’关键字

var iNum = 45, sTr = 'qwe', sCount = '68';
```

### 3.2 JavaScript注释

avaScript的注释分为单行注释(//注释内容)和多行注释(/多行注释/)

```javascript
<script type="text/javascript">

  // 单行注释
  var iNum = 123;
  /*
  多行注释
  1、...
  2、...
  */
  var sTr = 'abc123';
</script>
```

### 3.3 数据类型

js中有六种数据类型，包括五种基本数据类型和一种复杂数据类型(object)。

5种基本数据类型：
1、number 数字类型
2、string 字符串类型
3、boolean 布尔类型 true 或 false
4、undefined undefined类型，变量声明未初始化，它的值就是undefined
5、null null类型，表示空对象，如果定义的变量将来准备保存对象，可以将变量初始化为null,在页面上获取不到对象，返回的值就是null

1种复合类型：
1、object 后面学习的数组、函数和JavaScript对象都属于复合类型

```javascript
//1.1 数字 number
var iOne = 10.1;

//1.2 字符串 string
var sStr = '1234';

//1.3 布尔 boolean; 
var bIsTrue = false;

//1.4 未定义 undefined
var unData;

//1.5 null 表示空对象
var nullData = null;

//1.6 object 表示对象类型
var oObj = {
  name: "隔壁老王",
  age: 88
}
// 获取变量的类型
var type = typeof (oObj);
alert(type);
// 获取对象的name属性
alert(oObj.name);
```

### 3.4 变量命名规范

1、区分大小写
2、第一个字符必须是字母、下划线（_）或者美元符号（$）
3、其他字符可以是字母、下划线、美元符或数字

### 3.5 匈牙利命名风格

对象o Object 比如：oDiv
数组a Array 比如：aItems
字符串s String 比如：sUserName
整数i Integer 比如：iItemCount
布尔值b Boolean 比如：bIsComplete
浮点数f Float 比如：fPrice
函数fn Function 比如：fnHandler

## 4. 函数定义和调用

### 4.1 函数定义

函数就是可以重复使用的代码块, 使用关键字 function 定义函数。

```javascript
<script type="text/javascript">
  // 函数定义
  function fnAlert(){
  alert('hello!');
}
</script>
```

### 4.2 函数调用

函数调用就是函数名加小括号，比如:函数名(参数[参数可选])

```javascript
<script type="text/javascript">
  // 函数定义
  function fnAlert(){
  alert('hello!');
}
  // 函数调用
  fnAlert();
</script>
```

### 4.3 定义有参数有返回值的函数

定义函数时，函数如果有参数，参数放到小括号里面，函数如果有返回值，返回值通过 return 关键字来返回

```javascript
<script type="text/javascript">
  function fnAdd(iNum01,iNum02){
  var iRs = iNum01 + iNum02;
  return iRs;
  alert('here!');
}

  var iCount = fnAdd(3,4);
  alert(iCount); //弹出7
</script>
```

**函数中'return'关键字的作用:**
1、返回函数中的值
2、执行完return函数执行结束

### 4.4 小结

- 函数的定义

```javascript
function 函数名(参数

[参数可选]
)
{
  // 函数的代码实现  
...
}
```

- 函数的调用

```javascript
 函数名(参数[参数可选])
```

## 5. 变量作用域

### 5.1 变量作用域的介绍

变量作用域就是变量的使用范围，变量分为:

- 局部变量
- 全局变量

### 5.2 局部变量

局部变量就是在函数内使用的变量，只能在函数内部使用。

```javascript
<script type="text/javascript">
  function myalert()
  {
    // 定义局部变量
    var b = 23;
    alert(b);
  }
  myalert(); // 弹出23
  alert(b); // 函数外使用出错
</script>
```

### 5.3 全局变量

全局变量就是在函数外定义的变量，可以在不同函数内使用。

```javascript
<script type="text/javascript">
  // 定义全局变量
  var a = 12;
  function myalert()
  {
    // 修改全局变量
    a++;
  }
  myalert();
  alert(a); // 弹出13
</script>
```

## 6. 条件语句

### 6.1 条件语句的介绍

条件语句就是通过条件来控制程序的走向

### 6.2 条件语句语法

1. if 语句 - 只有当指定条件为 true 时，使用该语句来执行代码
2. if...else 语句 - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
3. if...else if....else 语句 - 使用该语句来判断多条件，执行条件成立的语句

### 6.3 比较运算符

假如 x = 5, 查看比较后的结果:
![Alt Text](/images/20201230211518160.png)
比较运算符示例代码:

```javascript
var iNum01 = 12;
var sNum01 = '12';

if (iNum01 == 12) {
  alert('相等！');
} else {
  alert('不相等！')
}

// "==" 符号默认会将符号两边的变量转换成数字再进行对比，这个叫做隐式转换
if (sNum01 == 12) {
  alert('相等！');
} else {
  alert('不相等！')
}

// "===" 符号不会转换符号两边的数据类型
if (sNum01 === 12) {
  alert('相等！');
} else {
  alert('不相等！')
}

// 多条件判断
var sFruit = "苹果";
if (sFruit == "苹果") {
  alert("您选择的水果是苹果");
} else if (sFruit == "鸭梨") {
  alert("您选择的水果是鸭梨");
} else {
  alert("对不起，您选择的水果不存在!")
}
```

### 6.4 逻辑运算符

假如 x=6, y=3, 查看比较后的结果:
![Alt Text](/images/20201230211559554.png)
逻辑运算符示例代码:

```javascript
var x = 6;
var y = 3;

if (x < 10 && y > 1) {
  alert('都大于');
} else {
  alert('至少有一个不大于');
}

if (x > 5 || y > 7) {
  alert('至少有一个大于');
} else {
  alert('都不大于');
}

if (!(x == y)) {
  alert('等于')
} else {
  alert('不等于')
}
```

## 7. 获取标签元素

### 7.1 获取标签元素

可以使用内置对象 document 上的 getElementById 方法来获取页面上设置了id属性的标签元素，获取到的是一个html对象，然后将它赋值给一个变量，比如：

```javascript
<script type="text/javascript">
  var oDiv = document.getElementById('div1');
  alert(oDiv);
</script>
<div id="div1">这是一个div元素</div>
```

**说明:**

上面的代码，如果把javascript写在元素的上面，就会出错，因为页面上从上往下加载执行的，javascript去页面上获取元素div1的时候，元素div1还没有加载。

**解决方法有两种:**

第一种方法：将javascript放到页面最下边

```javascript
<div id="div1">这是一个div元素</div>

<script type="text/javascript">
  var oDiv = document.getElementById('div1');
  alert(oDiv);
</script>
```

第二种方法：设置页面加载完成执行的函数，在执行函数里面获取标签元素。

```javascript
<script type="text/javascript">
  window.onload = function(){
  var oDiv = document.getElementById('div1');
}
</script>
```

**说明:**
onload是页面所有元素加载完成的事件，给onload设置函数时，当事件触发就会执行设置的函数。

**获取标签元素需要等待页面加载完成，使用document.getElementById('标签id');**

## 8. 操作标签元素属性

### 8.1 属性的操作

首先获取的页面标签元素，然后就可以对页面标签元素的属性进行操作，属性的操作包括:

- 属性的读取
- 属性的设置

属性名在js中的写法

1. html的属性和js里面属性大多数写法一样，但是“class” 属性写成 “className”
2. “style” 属性里面的属性，有横杠的改成驼峰式，比如：“font-size”，改成”style.fontSize”

```javascript
<style>
  .sty01{
  font - size:20px;
  color:red;
}
  .sty02{
  font - size:30px;
  color:pink;
  text-decoration:none;
}

</style>

<script type="text/javascript">

  window.onload = function(){
  var oInput = document.getElementById('input1');
  var oA = document.getElementById('link1');
  // 读取属性值
  var sValue = oInput.value;
  var sType = oInput.type;
  var sName = oInput.name;
  var sLinks = oA.href;

  // 操作class属性,需要写成“className”
  oA.className = 'sty02';

  // 写(设置)属性
  oA.style.color = 'red';
  oA.style.fontSize = sValue;
}

</script>

<input type="text" name="setsize" id="input1" value="20px">
  <a href="#" id="link01" class="sty01">这是一个链接</a>
```

### 8.2 innerHTML

innerHTML可以读取或者设置标签包裹的内容

```javascript
<script type="text/javascript">
  window.onload = function(){
  var oDiv = document.getElementById('div1');
  //读取
  var sTxt = oDiv.innerHTML;
  alert(sTxt);
  //写入
  oDiv.innerHTML = '<a href="http://"><a/>';
}
</script>


<div id="div1">这是一个div元素</div>
```

### 8.3 小结

标签属性的获取和设置:

1. var 标签对象 = document.getElementById('id名称'); -> 获取标签对象
2. var 变量名 = 标签对象.属性名 -> 读取属性
3. 标签对象.属性名 = 新属性值 -> 设置属性

## 9. 数组及操作方法

### 9.1 数组的介绍

数组就是一组数据的集合，javascript 中，数组里面的数据可以是不同类型的数据，好比 python 里面的列表。

### 9.2 数组的定义

```javascript
// 实例化对象方式创建
var aList = new Array(1, 2, 3);

// 字面量方式创建，推荐使用
var aList2 = [1, 2, 3, 'asd'];
```

### 9.3 多维数组

多维数组指的是数组的成员也是数组，把这样的数组叫做多维数组。

```javascript
var aList = [[1, 2, 3], ['a', 'b', 'c']];
```

### 9.4 数组的操作

**1、 获取数组的长度**

```javascript
var aList = [1, 2, 3, 4];
alert(aList.length); // 弹出4
```

**2、 根据下标取值**

```javascript
var aList = [1, 2, 3, 4];
alert(aList[0]); // 弹出1
```

**3、 从数组最后添加和删除数据**

```javascript
var aList = [1, 2, 3, 4];
aList.push(5);
alert(aList); //弹出1,2,3,4,5
aList.pop();
alert(aList); // 弹出1,2,3,4
```

**4、根据下标添加和删除元素**

arr.splice(start,num,element1,.....,elementN)

**参数解析：**

1. start：必需，开始删除的索引。
2. num：可选，删除数组元素的个数。
3. elementN：可选，在start索引位置要插入的新元素。

此方法会删除从start索引开始的num个元素，并将elementN参数插入到start索引位置。

```javascript
var colors = ["red", "green", "blue"];
colors.splice(0, 1);  //删除第一项
alert(colors);  //green,blue

colors.splice(1, 0, "yellow", "orange");  //从第一个索引位置插入两项数据
alert(colors);  //green,yellow,organge,blue

colors.splice(1, 1, "red", "purple");  //删除一项，插入两项数据
alert(colors);  //green,red,purple,orange,blue
```

### 9.5 小结

- 数组的定义使用一对中括号
- 获取数组的长度使用length属性
- 从数组最后添加元素使用push方法
- 从数组最后删除元素使用pop方法
- 根据下标添加和删除元素使用splice方法

## 10. 循环语句

### 10.1 循环语句的介绍

循环语句就是让一部分代码重复执行，javascript中常用的循环语句有:

- for
- while
- do-while

### 10.2 for循环

```javascript
var array = [1, 4, 5];

for (var index = 0; index < array.length; index++) {
  result = array[index];
  alert(result);
}
```

### 10.3 while循环

```javascript
var array = [1, 4, 5];
var index = 0;

while (index < array.length) {
  result = array[index];
  alert(result);
  index++;
}
```

**说明:**

当条件成立的时候, while语句会循环执行

### 10.4 do-while循环

```javascript
var array = [1, 4, 5];
var index = 0;

do {
  result = array[index];
  alert(result);
  index++;
} while (index < array.length);
```

**说明:**

当条件不成立的时候do语句也会执行一次

## 11. 字符串拼接

### 11.1 字符串拼接

字符串拼接使用: "+" 运算符

```javascript
var iNum1 = 10;
var fNum2 = 11.1;
var sStr = 'abc';

result = iNum1 + fNum2;
alert(result); // 弹出21.1

result = fNum2 + sStr;
alert(result); // 弹出11.1abc
```

**说明**

数字和字符串拼接会自动进行类型转换(隐士类型转换)，把数字类型转成字符串类型进行拼接

## 12. 定时器

### 12.1 定时器的介绍

定时器就是在一段特定的时间后执行某段程序代码。

### 12.2 定时器的使用

js 定时器有两种创建方式：

1. setTimeout(func[, delay, param1, param2, ...]) ：以指定的时间间隔（以毫秒计）调用一次函数的定时
2. setInterval(func[, delay, param1, param2, ...]) ：以指定的时间间隔（以毫秒计）重复调用一个函数的定时器

setTimeout函数的参数说明:

- 第一个参数 func , 表示定时器要执行的函数名
- 第二个参数 delay, 表示时间间隔，默认是0，单位是毫秒
- 第三个参数 param1, 表示定时器执行函数的第一个参数，一次类推传入多个执行函数对应的参数。

```javascript
<script>
  function hello(){
  alert('hello');
}

  // 执行一次函数的定时器
  setTimeout(hello, 500);
</script>
```

setInterval函数的参数说明:

- 第一个参数 func , 表示定时器要执行的函数名
- 第二个参数 delay, 表示时间间隔，默认是0，单位是毫秒
- 第三个参数 param1, 表示定时器执行函数的第一个参数，一次类推传入多个执行函数对应的参数。

```javascript
<script>
  function hello(){
  alert('hello');
}
  // 重复执行函数的定时器
  setInterval(hello, 1000);
</script>
```

### 12.3 清除定时器

js 清除定时器分别是:

- clearTimeout(timeoutID) 清除只执行一次的定时器(setTimeout函数)
- clearInterval(timeoutID) 清除反复执行的定时器(setInterval函数)

clearTimeout函数的参数说明:

- timeoutID 为调用 setTimeout 函数时所获得的返回值，使用该返回标识符作为参数，可以取消该 setTimeout 所设定的定时执行操作。

```javascript
<script>
  function hello(){
  alert('hello');
  // 清除只执行一次的定时器
  clearTimeout(t1)
}
  // 执行一次函数的定时器
  t1 = setTimeout(hello, 500);
</script>
```

clearInterval函数的参数说明:

- timeoutID 为调用 setInterval 函数时所获得的返回值，使用该返回标识符作为参数，可以取消该 setInterval 所设定的定时执行操作。

```javascript
<script>
  function hello(){
  alert('hello');
}
  // 重复执行函数的定时器
  var t1 = setInterval(hello, 1000);

  function stop(){
  // 清除反复执行的定时器
  clearInterval(t1);
}

</script>

<input type="button" value="停止" onclick="stop();">
```

### 12.5 小结

- 定时器的创建
  - 只执行一次函数的定时器, 对应的代码是setTimeout函数
  - 反复执行函数的定时器, 对应的代码是setInterval函数

- 反复执行函数的定时器, 对应的代码是setInterval函数
  - 清除只执行一次函数的定时器, 对应的代码是clearTimeout函数
  - 清除清除反复执行的定时器, 对应的代码是clearInterval函数

# JavaScript基础

## 概念： 一门客户端脚本语言

* 运行在客户端浏览器中的。每一个浏览器都有`JavaScript`的解析引擎
* 脚本语言：不需要编译，直接就可以被浏览器解析执行了

## 功能：

* 可以来增强用户和`html`页面的交互过程，可以来控制`html`元素，让页面有一些动态的效果，增强用户的体验。

## JavaScript发展史：

1. 1992年，`Nombase`公司，开发出第一门客户端脚本语言，专门用于表单的校验。命名为 ： `C--`  ，后来更名为：`ScriptEase`
2. 1995年，`Netscape`(网景)公司，开发了一门客户端脚本语言：`LiveScript`。后来，请来`SUN`公司的专家，修改`LiveScript`，命名为
   `JavaScript`
3. 1996年，微软抄袭`JavaScript`开发出`JScript`语言
4. 1997年，`ECMA`(欧洲计算机制造商协会)，制定出客户端脚本语言的标准：`ECMAScript`，就是统一了所有客户端脚本语言的编码方式。

- `JavaScript = ECMAScript + JavaScript自己特有的东西(BOM+DOM)`

## ECMAScript：客户端脚本语言的标准

### 1. 基本语法：

#### 1.1 与html结合方式

1. 内部JS：

   定义`<script>`，标签体内容就是js代码
2. 外部JS：

   定义`<script>`，通过src属性引入外部的js文件

* 注意：

  `<script`>可以定义在html页面的任何地方。但是定义的位置会影响执行顺序。
  `<script>`可以定义多个。

#### 1.2 注释

1. 单行注释：`//注释内容`
2. 多行注释：`/*注释内容*/`

#### 1.3 数据类型：

##### 1.3.1 原始数据类型(基本数据类型)：

1. `number`：数字。 `整数/小数/NaN(not a number 一个不是数字的数字类型)`
2. `string`：字符串。 `字符串  "abc" "a" 'abc'`
3. `boolean`: `true和false`
4. `null`：一个对象为空的占位符
5. `undefined`：未定义。如果一个变量没有给初始化值，则会被默认赋值为`undefined`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>变量</title>

  <script>

    //定义变量
    /* var a  = 3;
     alert(a);

     a = "abc";
     alert(a);*/

    //定义number类型

    var num = 1;
    var num2 = 1.2;
    var num3 = NaN;

    //输出到页面上
    document.write(num + "---" + typeof (num) + "<br>");
    document.write(num2 + "---" + typeof (num2) + "<br>");
    document.write(num3 + "---" + typeof (num3) + "<br>");

    //定义string类型

    var str = "abc";
    var str2 = 'edf';
    document.write(str + "---" + typeof (str) + "<br>");
    document.write(str2 + "---" + typeof (str2) + "<br>");

    //定义boolean
    var flag = true;
    document.write(flag + "---" + typeof (flag) + "<br>");

    // 定义null,undefined
    var obj = null;
    var obj2 = undefined;
    var obj3;
    document.write(obj + "---" + typeof (obj) + "<br>");
    document.write(obj2 + "---" + typeof (obj2) + "<br>");
    document.write(obj3 + "---" + typeof (obj3) + "<br>");

  </script>


</head>
<body>

</body>
</html>
```

##### 1.3.2 引用数据类型：对象

#### 1.4 变量

* 变量：一小块存储数据的内存空间
* `Java`语言是强类型语言，而`JavaScript`是弱类型语言。
  * 强类型：在开辟变量存储空间时，定义了空间将来存储的数据的数据类型。只能存储固定类型的数据
  * 弱类型：在开辟变量存储空间时，不定义空间将来的存储数据类型，可以存放任意类型的数据。
* 语法：
  * `var 变量名 = 初始化值;`

* `typeof`运算符：获取变量的类型。
  * 注：`null`运算后得到的是`object`

#### 1.5 运算符

##### 1.5.1 一元运算符：只有一个运算数的运算符

++，-- ， +(正号)

* `++ --`: 自增(自减)
  * `++(--)` 在前，先自增(自减)，再运算
  * `++(--)` 在后，先运算，再自增(自减)
* `+(-)`：正负号
  * 注意：在JS中，如果运算数不是运算符所要求的类型，那么js引擎会自动的将运算数进行类型转换
  * 其他类型转number：
    * `string转number`：按照字面值转换。如果字面值不是数字，则转为NaN（不是数字的数字）
    * `boolean转number`：true转为1，false转为0

```html

<script>
  var num = 3;
  var a = ++num;

  document.write(num);// 4
  document.write(a); // 3 4
  document.write("<hr>");

  var b = +"123abc";
  document.write(typeof (b));
  document.write(b + 1);
  document.write("<hr>");

  var flag = +true;
  var f2 = +false;
  document.write(typeof (flag) + "<br>");//number
  document.write(flag + "<br>");// 1
  document.write(f2 + "<br>");// 0


</script>
```

##### 1.5.2 算数运算符

	+ - * / % ...

```html

<script>
  var a = 3;
  var b = 4;

  document.write(a + b + "<br>");
  document.write(a - b + "<br>");
  document.write(a * b + "<br>");
  document.write(a / b + "<br>");
  document.write(a % b + "<br>");

</script>
```

##### 1.5.3 赋值运算符

	= += -+....

##### 1.5.4 比较运算符

	> < >= <= == ===(全等于)

比较方式

1. `类型相同`：直接比较

* `字符串`：按照字典顺序比较。按位逐一比较，直到得出大小为止。

2. `类型不同`：先进行类型转换，再比较

* `===`：全等于。在比较之前，先判断类型，如果类型不一样，则直接返回`false`

```html

<script>
  document.write((3 > 4) + "<br>");

  document.write(("abc" < "acd") + "<br>");


  document.write(("123" == 123) + "<br>");

  document.write(("123" === 123) + "<br>");

</script>
```

​

##### 1.5.5 逻辑运算符

	&& || !

* 其他类型转`boolean`：
  1. `number`：`0`或`NaN`为假，其他为真
  2. `string`：除了空字符串("")，其他都是`true`
  3. `null&undefined`:都是`false`
  4. `对象`：所有对象都为`true`

```html

<script>
  var flag = true;
  document.write(flag + "<br>");
  document.write(!flag + "<br>");

  document.write("<hr>");
  //number
  var num = 3;
  var num2 = 0;
  var num3 = NaN;
  document.write(!!num + "<br>");
  document.write(!!num2 + "<br>");
  document.write(!!num3 + "<br>");

  /*while(1){

  }*/

  document.write("<hr>");
  //string

  var str1 = "abc";
  var str2 = "";
  document.write(!!str1 + "<br>");
  document.write(!!str2 + "<br>");

  document.write("<hr>");


  // null & undefined
  var obj = null;
  var obj2;
  document.write(!!obj + "<br>");
  document.write(!!obj2 + "<br>");

  document.write("<hr>");

  // null & undefined
  var date = new Date();
  document.write(!!date + "<br>");

  document.write("<hr>");


  obj = "123";
  if (obj != null && obj.length > 0) {//防止空指针异常
    alert(123);
  }
  //js中可以这样定义，简化书写。
  if (obj) {//防止空指针异常
    alert(111);
  }


</script>
```

##### 1.5.6 三元运算符

	? : 表达式

```javascript
var a = 3;
var b = 4;
var c = a > b ? 1 : 0;
```

* 语法：
  * `表达式? 值1:值2;`
  * 判断表达式的值，如果是`true`则取值1，如果是`false`则取值2；

#### 1.6 流程控制语句：

1. `if...else...`
2. `switch`:

* 在java中，`switch`语句可以接受的数据类型： `byte int shor char,枚举(1.5) ,String(1.7)`
  * `switch`(变量):
    `case` 值:
* 在JS中,`switch`语句可以接受任意的原始数据类型

3. `while`
4. `do...while`
5. `for`

switch

```html

<script>
  var a;
  switch (a) {
    case 1:
      alert("number");
      break;
    case "abc":
      alert("string");
      break;
    case true:
      alert("true");
      break;
    case null:
      alert("null");
      break;
    case undefined:
      alert("undefined");
      break;
  }
</script> 
```

while

```html

<script>

  //1 ~ 100 求和  5050

  var sum = 0;
  var num = 1;

  while (num <= 100) {
    sum += num;
    num++;
  }
  alert(sum);

</script>
```

for

```html

<script>

  //1 ~ 100 求和  5050
  var sum = 0;
  for (var i = 1; i <= 100; i++) {
    sum += i;
  }
  alert(sum);

</script>
```

#### 1.7 JS特殊语法：

1. 语句以;结尾，如果一行只有一条语句则 ;可以省略 (不建议)
2. 变量的定义使用var关键字，也可以不使用

* 用： 定义的变量是局部变量
* 不用：定义的变量是全局变量(不建议)

```html

<script>
  //1. 语句以;结尾，如果一行只有一条语句则 ;可以省略 (不建议)
  var a = 3;
  //alert(a);


  /*   b = 4;
     alert(b);*/
  var b;

  function fun() {
    b = 4;
  }

  fun();

  alert(b);
</script>
```

#### 1.8 练习：99乘法表

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>99乘法表</title>
  <style>
    td {
      border: 1px solid;
    }
  </style>
  <script>
    document.write("<table  align='center'>");

    //1.完成基本的for循环嵌套，展示乘法表
    for (var i = 1; i <= 9; i++) {
      document.write("<tr>");
      for (var j = 1; j <= i; j++) {
        document.write("<td>");

        //输出  1 * 1 = 1
        document.write(i + " * " + j + " = " + (i * j) + "&nbsp;&nbsp;&nbsp;");

        document.write("</td>");
      }
      /*//输出换行
      document.write("<br>");*/

      document.write("</tr>");
    }

    //2.完成表格嵌套
    document.write("</table>");

  </script>
</head>
<body>
</body>
</html>
```

### 2. 基本对象：

#### 2.1 Function：函数(方法)对象

##### 1. 创建：

1. `var fun = new Function(形式参数列表,方法体);  //忘掉吧`
2.

```javascript
  function 方法名称(形式参数列表) {
  方法体
}  
```

3.

```javascript
var 方法名 = function (形式参数列表) {
  方法体
}
```

##### 2. 方法：

##### 3. 属性：

- `length`:代表形参的个数

##### 4. 特点：

1. 方法定义是，形参的类型不用写,返回值类型也不写。
2. 方法是一个对象，如果定义名称相同的方法，会覆盖
3. 在JS中，`方法的调用只与方法的名称有关，和参数列表无关`
4. 在方法声明中有一个隐藏的内置对象（数组），`arguments`,封装所有的实际参数

##### 5. 调用：

- `方法名称(实际参数列表);`

```html

<script>

  //1.创建方式1
  var fun1 = new Function("a", "b", "c", "alert(a);");
  //调用方法
  // fun1(3,4);
  // alert(fun1.length);
  //2. 创建方式2
  function fun2(a, b) {
    alert(a + b);
  }

  //fun2(3,4);

  //alert(fun2.length);
  var fun3 = function (a, b) {
    alert(a + b);

  }
  //alert(fun3.length);
  // fun3(3,4);


  /*fun2 = function(a , b){
      alert(a - b);
  }*/
  function fun2(a, b) {
    //alert(a - b);
    alert(a);
    alert(b);
  }

  //fun2(3,4);

  //方法调用
  //fun2(1,2);
  //fun2(1);
  //fun2();
  //fun2(1,2,3);

  /*
   * 求两个数的和
   */
  /*function  add(a , b){
      return a + b;
  }*/
  /**
   * 求任意个数的和
   */
  function add() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }

  var sum = add(1, 2, 3, 4);
  alert(sum);
  //add(1,3);
</script>
```

#### 2.2 Array:数组对象

##### 1. 创建：

- `var arr = new Array(元素列表);`
- `var arr = new Array(默认长度);`
- `var arr = [元素列表];`

##### 2. 方法

- `join(参数):`将数组中的元素按照指定的分隔符拼接为字符串
  - `push()`  向数组的末尾添加一个或更多元素，并返回新的长度。

##### 3. 属性

- `length`:数组的长度

##### 4. 特点：

1. JS中，数组元素的类型可变的。
2. JS中，数组长度可变的。

```html

<script>
  //1.创建方式1
  /* var arr1 = new Array(1,2,3);
   var arr2 = new Array(5);
   var arr3 = [1,2,3,4];

   var arr4 = new Array();

   document.write(arr1 +"<br>");
   document.write(arr2 +"<br>");
   document.write(arr3 +"<br>");
   document.write(arr4 +"<br>");*/


  var arr = [1, "abc", true];
  document.write(arr + "<br>");

  document.write(arr[0] + "<br>");
  document.write(arr[1] + "<br>");
  document.write(arr[2] + "<br>");

  //document.write(arr[10] +"<br>");
  arr[10] = "hehe";
  document.write(arr[10] + "<br>");
  document.write(arr[9] + "<br>");

  //alert(arr.length);//11
  document.write(arr.join("--") + "<br>");
  arr.push(11);
  document.write(arr.join("--") + "<br>");
</script>
```

#### 2.3 Boolean

- 没有什么方法

#### 2.4 Date：日期对象

##### 1. 创建：

- `var date = new Date();`

##### 2. 方法：

- `toLocaleString()`：返回当前date对象对应的时间本地字符串格式
- `getTime()`:获取毫秒值。返回当前如期对象描述的时间到1970年1月1日零点的毫秒值差

```html

<script>

  var date = new Date();

  document.write(date + "<br>");

  document.write(date.toLocaleString() + "<br>");

  document.write(date.getTime() + "<br>");

</script>
```

#### 2.5 Math：数学对象

##### 1. 创建：

特点：Math对象不用创建，直接使用。  `Math.方法名();`

##### 2. 方法：

- `random()`:返回 0 ~ 1 之间的随机数。 含0不含1
- `ceil(x)`：对数进行上舍入。
- `floor(x)`：对数进行下舍入。
- `round(x)`：把数四舍五入为最接近的整数。

##### 3. 属性：

- `PI`

```html

<script>

  document.write(Math.PI + "<br>");
  document.write(Math.random() + "<br>");
  document.write(Math.round(3.14) + "<br>");
  document.write(Math.ceil(3.14) + "<br>");
  document.write(Math.floor(3.14) + "<br>");

  /**
   * 取 1~100之间的随机整数
   *      1. Math.random()产生随机数：范围 [0,1)小数
   *      2. 乘以 100 --> [0,99.9999] 小数
   *      3. 舍弃小数部分 ：floor --> [0,99] 整数
   *      4. +1 -->[0,99] 整数 [1,100]
   *
   *
   */

  var number = Math.floor((Math.random() * 100)) + 1;
  document.write(number);

</script>
```

#### 2.6 Number

- 基本数据类型

#### 2.6 String

- 基本数据类型

#### 2.8 RegExp：正则表达式对象

##### 1. 正则表达式：定义字符串的组成规则。

1. 单个字符:`[]`
   如： `[a] [ab] [a-zA-Z0-9_]`

* 特殊符号代表特殊含义的单个字符:
  - `\d:单个数字字符 [0-9]`
  - `\w:单个单词字符[a-zA-Z0-9_]`

2. 量词符号：

- `?：表示出现0次或1次`
- `*：表示出现0次或多次`
- `+：出现1次或多次`
- `{m,n}:表示 m<= 数量 <= n`
  * m如果缺省： `{,n}:最多n次`
  * n如果缺省：`{m,} 最少m次`

3. 开始结束符号

* `^:开始`
* `$:结束`

- [访问具体知识](https://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

##### 2. 正则对象：

1. 创建
1. `var reg = new RegExp("正则表达式");`
2. `var reg = /正则表达式/;`
2. 方法
1. `test`(参数):验证指定的字符串是否符合正则定义的规范

```html

<script>

  //1.
  var reg = new RegExp("^\\w{6,12}$");
  //2.
  var reg2 = /^\w{6,12}$/;

  /*alert(reg);
  alert(reg2);*/

  var username = "zhangsan";

  //验证
  var flag = reg.test(username);
  alert(flag);

</script>
```

#### 2.9 Global

##### 1. 特点：

- 全局对象，这个Global中封装的方法不需要对象就可以直接调用。 方法名();

##### 2. 方法：

- `encodeURI()`:url编码

* `decodeURI()`:url解码

* `encodeURIComponent()`:url编码,编码的字符更多
* `decodeURIComponent()`:url解码

* `parseInt()`:将字符串转为数字
  * 逐一判断每一个字符是否是数字，直到不是数字为止，将前边数字部分转为number
* `isNaN()`:判断一个值是否是NaN
  * NaN六亲不认，连自己都不认。NaN参与的( ==比较) 全部为false

* `eval()`:将 JavaScript 字符串，并把它作为脚本代码来执行。

##### 3. URL编码

- `我爱学习 =  %E6%88%91%E7%88%B1%E5%AD%A6%E4%B9%A0`

```html

<script>

  var str = "http://www.baidu.com?wd=我爱学习";
  var encode = encodeURI(str);
  document.write(encode + "<br>");
  var s = decodeURI(encode);//%E6%88%91%E7%88%B1%E5%AD%A6%E4%B9%A0
  document.write(s + "<br>");//我爱学习


  var str1 = "http://www.baidu.com?wd=我爱学习";
  var encode1 = encodeURIComponent(str1);
  document.write(encode1 + "<br>");//%E6%88%91%E7%88%B1%E5%AD%A6%E4%B9%A0
  var s1 = decodeURIComponent(encode);
  document.write(s1 + "<br>");//我爱学习


  var str = "a234abc";
  var number = parseInt(str);
  //alert(number + 1);

  var a = NaN;

  document.write(a == NaN);
  document.write(isNaN(a));

  var jscode = "alert(123)";
  eval(jscode);

</script>
```

# JavaScript高级:

## DOM简单学习：为了满足案例要求

### 功能：

- 控制html文档的内容

  - 获取页面标签(元素)对象：`Element`

  - `document.getElementById("id值"):`通过元素的id获取元素对象

### 操作Element对象：

#### 1. 修改属性值：

1. 明确获取的对象是哪一个？
2. 查看API文档，找其中有哪些属性可以设置

#### 2. 修改标签体内容：

* 属性：`innerHTML`

1. 获取元素对象
2. 使用`innerHTML`属性修改标签体内容

## 事件简单学习

### 功能：

- 某些组件被执行了某些操作后，触发某些代码的执行。

* 造句： xxx被xxx,我就xxx
  * 我方水晶被摧毁后，我就责备对友。
  * 敌方水晶被摧毁后，我就夸奖自己。

### 如何绑定事件

1. 直接在html标签上，指定事件的属性(操作)，属性值就是js代码

- 事件：`onclick`--- 单击事件

2. 通过js获取元素对象，指定事件属性，设置一个函数

* 代码：

```html

<body>
<img id="light" src="img/off.gif" onclick="fun();">
<img id="light2" src="img/off.gif">

<script>
  function fun() {
    alert('我被点了');
    alert('我又被点了');
  }

  function fun2() {
    alert('咋老点我？');
  }

  //1.获取light2对象
  var light2 = document.getElementById("light2");
  //2.绑定事件
  light2.onclick = fun2;


</script>
</body>
```

​

#### 案例1：电灯开关

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>电灯开关</title>

</head>
<body>

<img id="light" src="img/off.gif">

<script>
  /*
      分析：
          1.获取图片对象
          2.绑定单击事件
          3.每次点击切换图片
              * 规则：
                  * 如果灯是开的 on,切换图片为 off
                  * 如果灯是关的 off,切换图片为 on
              * 使用标记flag来完成

   */

  //1.获取图片对象
  var light = document.getElementById("light");

  var flag = false;//代表灯是灭的。 off图片

  //2.绑定单击事件
  light.onclick = function () {
    if (flag) {//判断如果灯是开的，则灭掉
      light.src = "img/off.gif";
      flag = false;

    } else {
      //如果灯是灭的，则打开

      light.src = "img/on.gif";
      flag = true;
    }


  }

</script>
</body>
</html>
```

​

# BOM:

## 1. 概念：

- `Browser Object Model` 浏览器对象模型
  * 将浏览器的各个组成部分封装成对象。

## 2. 组成：

* `Window`：窗口对象
* `Navigator`：浏览器对象
* `Screen`：显示器屏幕对象
* `History`：历史记录对象
* `Location`：地址栏对象

## 3. Window：窗口对象

### 3.1 创建

### 3.2 方法

#### 3.2.1 与弹出框有关的方法：

- `alert()`  显示带有一段消息和一个确认按钮的警告框。
  - `confirm()`  显示带有一段消息以及确认按钮和取消按钮的对话框。
    * 如果用户`点击确定按钮`，则方法返回`true`

  * 如果用户`点击取消按钮`，则方法返回`false`
    - `prompt()`  显示可提示用户输入的对话框。

    * `返回值`：获取用户输入的值

#### 3.2.2 与打开关闭有关的方法：

- `close()`  关闭浏览器窗口。
  * 谁调用我 ，我关谁

  - `open()`  打开一个新的浏览器窗口

    * 返回新的Window对象

#### 3.2.3 与定时器有关的方式

- `setTimeout()`  在指定的毫秒数后调用函数或计算表达式。
  * 参数：
    1. js代码或者方法对象
    2. 毫秒值
  * 返回值：唯一标识，用于取消定时器
- `clearTimeout()`  取消由 `setTimeout()` 方法设置的 `timeout`。

- `setInterval()`  按照指定的周期（以毫秒计）来调用函数或计算表达式。
- `clearInterval()`  取消由 `setInterval()` 设置的 `timeout`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Window对象</title>
</head>
<body>
<input id="openBtn" type="button" value="打开窗口">
<input id="closeBtn" type="button" value="关闭窗口">

<script>
  alert("hello window");
  window.alert("hello a")

  //确认框
  var flag = confirm("您确定要退出吗？");

  if (flag) {
    //退出操作
    alert("欢迎再次光临！");
  } else {
    //提示：手别抖...
    alert("手别抖...");
  }


  //输入框
  var result = prompt("请输入用户名");
  alert(result);

  //打开新窗口
  var openBtn = document.getElementById("openBtn");
  var newWindow;
  openBtn.onclick = function () {
    //打开新窗口
    newWindow = open("https://www.baidu.com");
  }

  //关闭新窗口
  var closeBtn = document.getElementById("closeBtn");
  closeBtn.onclick = function () {
    // 关闭新窗口
    newWindow.close();
  }

  //一次性定时器
  setTimeout("fun();", 2000);
  var id = setTimeout(fun, 2000);
  clearTimeout(id);

  function fun() {
    alert('boom~~');
  }

  //循环定时器
  var id = setInterval(fun, 2000);
  clearInterval(id);

</script>
</body>
</html>
```

### 案例:轮播图

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>轮播图</title>

</head>
<body>
<img id="img" src="img/banner_1.jpg" width="100%">
<script>

  //修改图片src属性
  var number = 1;

  function fun() {
    number++;
    //判断number是否大于3
    if (number > 3) {
      number = 1;
    }
    //获取img对象
    var img = document.getElementById("img");
    img.src = "img/banner_" + number + ".jpg";
  }

  //2.定义定时器
  setInterval(fun, 3000);
</script>
</body>
</html>
```

### 3.3 属性：

#### 3.3.1 获取其他BOM对象：

- `history`
  - `location`
- `Navigator`
- `Screen`

#### 3.3.2 获取DOM对象

- `document`

### 3.4 特点

* Window对象不需要创建可以直接使用 window使用。 `window.方法名();`
* window引用可以省略。  `方法名();`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Window对象</title>
</head>
<body>
<input id="openBtn" type="button" value="打开窗口">
<input id="closeBtn" type="button" value="关闭窗口">

<script>
  //获取history
  var h1 = window.history;
  var h2 = history;

  alert(h1);
  alert(h2);

  var openBtn = window.document.getElementById("openBtn");
  alert(openBtn);
  /*document.getElementById("");*/
</script>
</body>
</html>
```

## 4. Location：地址栏对象

### 4.1 创建(获取)：

1. `window.location`
2. `location`

### 4.2 方法：

* `reload()`  重新加载当前文档。刷新

### 4.3 属性

* `href`  设置或返回完整的 URL。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Location对象</title>

</head>
<body>
<input type="button" id="btn" value="刷新">

<input type="button" id="goToBaidu" value="去百度">
<script>
  //reload方法，定义一个按钮，点击按钮，刷新当前页面
  //1.获取按钮
  var btn = document.getElementById("btn");
  //2.绑定单击事件
  btn.onclick = function () {
    //3.刷新页面
    location.reload();
  }

  //获取href
  var href = location.href;
  //alert(href);
  //点击按钮，去访问https://www.baidu.com官网
  //1.获取按钮
  var goToBaidu = document.getElementById("goToBaidu");
  //2.绑定单击事件
  goToBaidu.onclick = function () {
    //3.去访问https://www.baidu.com官网
    location.href = "https://www.baidu.com";
  }

</script>
</body>
</html>
```

### 案例:自动跳转页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>自动跳转</title>
  <style>
    p {
      text-align: center;
    }

    span {
      color: red;
    }

  </style>

</head>
<body>
<p>
  <span id="time">5</span>秒之后，自动跳转到首页...
</p>

<script>
  /*
      分析：
         1.显示页面效果  <p>
         2.倒计时读秒效果实现
             2.1 定义一个方法，获取span标签，修改span标签体内容，时间--
             2.2 定义一个定时器，1秒执行一次该方法
         3.在方法中判断时间如果<= 0 ，则跳转到首页

   */
  // 2.倒计时读秒效果实现

  var second = 5;
  var time = document.getElementById("time");

  //定义一个方法，获取span标签，修改span标签体内容，时间--
  function showTime() {
    second--;
    //判断时间如果<= 0 ，则跳转到首页
    if (second <= 0) {
      //跳转到首页
      location.href = "https://www.baidu.com";
    }

    time.innerHTML = second + "";
  }

  //设置定时器，1秒执行一次该方法
  setInterval(showTime, 1000);

</script>
</body>
</html>
```

## 5. History：历史记录对象

### 5.1 创建(获取)：

1. `window.history`
2. `history`

### 5.2 方法：

* `back()`  加载 history 列表中的前一个 URL。
  * `forward()`  加载 history 列表中的下一个 URL。
  * `go(参数)`  加载 history 列表中的某个具体页面。
  * 参数：
    * 正数：前进几个历史记录
    * 负数：后退几个历史记录

### 5.3 属性：

* `length`  返回当前窗口历史列表中的 URL 数量。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>History对象</title>
</head>
<body>
<input type="button" id="btn" value="获取历史记录个数">
<a href="09_History对象2.html">09页面</a>
<input type="button" id="forward" value="前进">
<script>

  //1.获取按钮
  var btn = document.getElementById("btn");
  //2.绑定单机事件
  btn.onclick = function () {
    //3.获取当前窗口历史记录个数
    var length = history.length;
    alert(length);
  }


  //1.获取按钮
  var forward = document.getElementById("forward");
  //2.绑定单机事件
  forward.onclick = function () {
    //前进
    // history.forward();
    history.go(1);
  }

</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>轮播图</title>
</head>
<body>
<img id="img" src="img/banner_1.jpg" width="100%">
<input type="button" id="back" value="后退">
<script>

  //修改图片src属性
  var number = 1;

  function fun() {
    number++;
    //判断number是否大于3
    if (number > 3) {
      number = 1;
    }
    //获取img对象
    var img = document.getElementById("img");
    img.src = "img/banner_" + number + ".jpg";
  }

  //2.定义定时器
  setInterval(fun, 3000);


  //1.获取按钮
  var back = document.getElementById("back");
  //2.绑定单机事件
  back.onclick = function () {
    //后退
    // history.back();
    history.go(-1);
  }

</script>
</body>
</html>
```

# DOM：

## 概念： Document Object Model 文档对象模型

* 将标记语言文档的各个组成部分，封装为对象。可以使用这些对象，对标记语言文档进行CRUD的动态操作

### W3C DOM 标准被分为 3 个不同的部分：

1. `核心 DOM`  针对任何结构化文档的标准模型

* `Document`：文档对象
* `Element`：元素对象
* `Attribute`：属性对象
* `Text`：文本对象
* `Comment`:注释对象
* `Node`：节点对象，其他5个的父对象

2. `XML DOM` - 针对 XML 文档的标准模型
3. `HTML DOM` - 针对 HTML 文档的标准模型

---

## 1. 核心DOM模型：

### 1.1 Document：文档对象

#### 1.1.1 创建(获取)：

- 在html dom模型中可以使用window对象来获取

1. `window.document`
2. `document`

#### 1.1.2 方法：

##### 1.1.2.1 获取Element对象：

1. `getElementById()`  ： 根据id属性值获取元素对象。id属性值一般唯一
2. `getElementsByTagName()`：根据元素名称获取元素对象们。返回值是一个数组
3. `getElementsByClassName()`:根据Class属性值获取元素对象们。返回值是一个数组
4. `getElementsByName()`: 根据name属性值获取元素对象们。返回值是一个数组

##### 1.1.2.2 创建其他DOM对象：

- `createAttribute(name)`  创建属性节点。
- `createComment()`
- `createElement()`   创建元素节点。
- `createTextNode()`  创建文本节点。

#### 1.1.3 属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document对象</title>
</head>
<body>

<div id="div1">div1</div>
<div id="div2">div2</div>
<div id="div3">div3</div>

<div class="cls1">div4</div>
<div class="cls1">div5</div>

<input type="text" name="username">

<script>

  //2.根据元素名称获取元素对象们。返回值是一个数组
  var divs = document.getElementsByTagName("div");
  //alert(divs.length);
  //3.根据Class属性值获取元素对象们。返回值是一个数组
  var div_cls = document.getElementsByClassName("cls1");
  // alert(div_cls.length);
  //4.根据name属性值获取元素对象们。返回值是一个数组
  var ele_username = document.getElementsByName("username");
  //alert(ele_username.length);

  var table = document.createElement("table");
  alert(table);


</script>
</body>
</html>
```

### 1.2 Element：元素对象

#### 1.2.1. 获取/创建：

- 通过`document`来获取和创建

#### 1.2.2 方法：

1. `removeAttribute()`：删除属性
2. `setAttribute()`：设置属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Element对象</title>
</head>
<body>
<a>点我试一试</a>
<input type="button" id="btn_set" value="设置属性">
<input type="button" id="btn_remove" value="删除属性">

<script>
  //获取btn
  var btn_set = document.getElementById("btn_set");
  btn_set.onclick = function () {

    //1.获取a标签
    var element_a = document.getElementsByTagName("a")[0];
    element_a.setAttribute("href", "https://www.baidu.com");
  }

  //获取btn
  var btn_remove = document.getElementById("btn_remove");
  btn_remove.onclick = function () {

    //1.获取a标签
    var element_a = document.getElementsByTagName("a")[0];
    element_a.removeAttribute("href");
  }

</script>
</body>
</html>
```

### 1.3 Node：节点对象，其他5个的父对象

#### 1.3.1 特点：

- 所有dom对象都可以被认为是一个节点

#### 1.3.2 方法：

* `CRUD dom`树：
  * `appendChild()`：向节点的子节点列表的结尾添加新的子节点。
  * `removeChild()`  ：删除（并返回）当前节点的指定子节点。
  * `replaceChild()`：用新节点替换一个子节点。

#### 1.3.3 属性：

* `parentNode` 返回节点的父节点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node对象</title>
  <style>

    div {

      border: 1px solid red;

    }

    #div1 {
      width: 200px;
      height: 200px;
    }

    #div2 {
      width: 100px;
      height: 100px;
    }


    #div3 {
      width: 100px;
      height: 100px;
    }

  </style>

</head>
<body>
<div id="div1">
  <div id="div2">div2</div>
  div1
</div>
<a href="javascript:void(0);" id="del">删除子节点</a>
<a href="javascript:void(0);" id="add">添加子节点</a>
<!--<input type="button" id="del" value="删除子节点">-->
<script>
  //1.获取超链接
  var element_a = document.getElementById("del");
  //2.绑定单击事件
  element_a.onclick = function () {
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    div1.removeChild(div2);
  }

  //1.获取超链接
  var element_add = document.getElementById("add");
  //2.绑定单击事件
  element_add.onclick = function () {
    var div1 = document.getElementById("div1");
    //给div1添加子节点
    //创建div节点
    var div3 = document.createElement("div");
    div3.setAttribute("id", "div3");

    div1.appendChild(div3);
  }


  /*
      超链接功能：
          1.可以被点击：样式
          2.点击后跳转到href指定的url

      需求：保留1功能，去掉2功能
      实现：href="javascript:void(0);"
   */

  var div2 = document.getElementById("div2");
  var div1 = div2.parentNode;
  alert(div1);

</script>
</body>
</html>
```

### 案例: 动态表格

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>动态表格</title>
  <style>
    table {
      border: 1px solid;
      margin: auto;
      width: 500px;
    }

    td, th {
      text-align: center;
      border: 1px solid;
    }

    div {
      text-align: center;
      margin: 50px;
    }
  </style>
</head>
<body>
<div>
  <input type="text" id="id" placeholder="请输入编号">
  <input type="text" id="name" placeholder="请输入姓名">
  <input type="text" id="gender" placeholder="请输入性别">
  <input type="button" value="添加" id="btn_add">
</div>

<table>
  <caption>学生信息表</caption>
  <tr>
    <th>编号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>操作</th>
  </tr>

  <tr>
    <td>1</td>
    <td>令狐冲</td>
    <td>男</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

  <tr>
    <td>2</td>
    <td>任我行</td>
    <td>男</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

  <tr>
    <td>3</td>
    <td>岳不群</td>
    <td>?</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

</table>


<script>
  /*
      分析：
          1.添加：
              1. 给添加按钮绑定单击事件
              2. 获取文本框的内容
              3. 创建td，设置td的文本为文本框的内容。
              4. 创建tr
              5. 将td添加到tr中
              6. 获取table，将tr添加到table中
          2.删除：
              1.确定点击的是哪一个超链接
                  <a href="javascript:void(0);" onclick="delTr(this);" >删除</a>
              2.怎么删除？
                  removeChild():通过父节点删除子节点

   */

  //1.获取按钮
  document.getElementById("btn_add").onclick = function () {
    //2.获取文本框的内容
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;

    //3.创建td，赋值td的标签体
    //id 的 td
    var td_id = document.createElement("td");
    var text_id = document.createTextNode(id);
    td_id.appendChild(text_id);
    //name 的 td
    var td_name = document.createElement("td");
    var text_name = document.createTextNode(name);
    td_name.appendChild(text_name);
    //gender 的 td
    var td_gender = document.createElement("td");
    var text_gender = document.createTextNode(gender);
    td_gender.appendChild(text_gender);
    //a标签的td
    var td_a = document.createElement("td");
    var ele_a = document.createElement("a");
    ele_a.setAttribute("href", "javascript:void(0);");
    ele_a.setAttribute("onclick", "delTr(this);");
    var text_a = document.createTextNode("删除");
    ele_a.appendChild(text_a);
    td_a.appendChild(ele_a);

    //4.创建tr
    var tr = document.createElement("tr");
    //5.添加td到tr中
    tr.appendChild(td_id);
    tr.appendChild(td_name);
    tr.appendChild(td_gender);
    tr.appendChild(td_a);
    //6.获取table
    var table = document.getElementsByTagName("table")[0];
    table.appendChild(tr);
  }

  //删除方法
  function delTr(obj) {
    var table = obj.parentNode.parentNode.parentNode;
    var tr = obj.parentNode.parentNode;

    table.removeChild(tr);
  }

</script>
</body>
</html>
```

## 2. HTML DOM

1. 标签体的设置和获取：`innerHTML`
2. 使用html元素对象的属性
3. 控制元素样式
1. 使用元素的style属性来设置
   如：
   //修改样式方式1
   `div1.style.border = "1px solid red";`
   `div1.style.width = "200px";`
   //font-size--> fontSize
   `div1.style.fontSize = "20px";`
2. 提前定义好类选择器的样式，通过元素的`className`属性来设置其`class`属性值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTMLDOM</title>
</head>
<body>
<div id="div1">
  div
</div>

<script>
  var div = document.getElementById("div1");
  var innerHTML = div.innerHTML;
  //alert(innerHTML);
  //div标签中替换一个文本输入框
  div.innerHTML = "<input type='text'>";
  //div标签中追加一个文本输入框
  div.innerHTML += "<input type='text'>";

</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>控制样式</title>

  <style>
    .d1 {
      border: 1px solid red;
      width: 100px;
      height: 100px;
    }

    .d2 {
      border: 1px solid blue;
      width: 200px;
      height: 200px;
    }

  </style>
</head>
<body>

<div id="div1">
  div1
</div>

<div id="div2">
  div2
</div>


<script>
  var div1 = document.getElementById("div1");
  div1.onclick = function () {
    //修改样式方式1
    div1.style.border = "1px solid red";
    div1.style.width = "200px";
    //font-size--> fontSize
    div1.style.fontSize = "20px";

  }

  var div2 = document.getElementById("div2");
  div2.onclick = function () {
    div2.className = "d1";
  }

</script>
</body>
</html>
```

### 案例: 动态表格

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>动态表格</title>
  <style>
    table {
      border: 1px solid;
      margin: auto;
      width: 500px;
    }

    td, th {
      text-align: center;
      border: 1px solid;
    }

    div {
      text-align: center;
      margin: 50px;
    }
  </style>
</head>
<body>
<div>
  <input type="text" id="id" placeholder="请输入编号">
  <input type="text" id="name" placeholder="请输入姓名">
  <input type="text" id="gender" placeholder="请输入性别">
  <input type="button" value="添加" id="btn_add">
</div>

<table>
  <caption>学生信息表</caption>
  <tr>
    <th>编号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>操作</th>
  </tr>

  <tr>
    <td>1</td>
    <td>令狐冲</td>
    <td>男</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

  <tr>
    <td>2</td>
    <td>任我行</td>
    <td>男</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

  <tr>
    <td>3</td>
    <td>岳不群</td>
    <td>?</td>
    <td><a href="javascript:void(0);" onclick="delTr(this);">删除</a></td>
  </tr>

</table>


<script>
  /*
      分析：
          1.添加：
              1. 给添加按钮绑定单击事件
              2. 获取文本框的内容
              3. 创建td，设置td的文本为文本框的内容。
              4. 创建tr
              5. 将td添加到tr中
              6. 获取table，将tr添加到table中
          2.删除：
              1.确定点击的是哪一个超链接
                  <a href="javascript:void(0);" onclick="delTr(this);" >删除</a>
              2.怎么删除？
                  removeChild():通过父节点删除子节点

   */

  //使用innerHTML添加
  document.getElementById("btn_add").onclick = function () {
    //2.获取文本框的内容
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;

    //获取table
    var table = document.getElementsByTagName("table")[0];

    //追加一行
    table.innerHTML += "<tr>\n" +
      "        <td>" + id + "</td>\n" +
      "        <td>" + name + "</td>\n" +
      "        <td>" + gender + "</td>\n" +
      "        <td><a href=\"javascript:void(0);\" onclick=\"delTr(this);\" >删除</a></td>\n" +
      "    </tr>";
  }

  //删除方法
  function delTr(obj) {
    var table = obj.parentNode.parentNode.parentNode;
    var tr = obj.parentNode.parentNode;

    table.removeChild(tr);
  }

</script>
</body>
</html>
```

---

## 事件监听机制：

### 1. 概念：

- 某些组件被执行了某些操作后，触发某些代码的执行。
  * 事件：某些操作。如： 单击，双击，键盘按下了，鼠标移动了
  * 事件源：组件。如： 按钮 文本输入框...
  * 监听器：代码。
  * 注册监听：将事件，事件源，监听器结合在一起。 当事件源上发生了某个事件，则触发执行某个监听器代码。

### 2. 常见的事件：

#### 2.1 点击事件：

1. `onclick`：单击事件
2. `ondblclick`：双击事件

#### 2.2 焦点事件

1. `onblur`：失去焦点

   一般用于表单验证
2. `onfocus`:元素获得焦点。

#### 2.3 加载事件：

1. `onload`：一张页面或一幅图像完成加载。

#### 2.4 鼠标事件：

1. `onmousedown`  鼠标按钮被按下。

- 定义方法时，定义一个形参，接收event对象
- event对象的button属性可以获取鼠标按钮键被点击了

3. `onmouseup`  鼠标按键被松开。
4. `onmousemove`  鼠标被移动。
5. `onmouseover`  鼠标移到某元素之上。
6. `onmouseout`  鼠标从某元素移开。

#### 2.5 键盘事件：

1. `onkeydown`  某个键盘按键被按下。
2. `onkeyup`    某个键盘按键被松开。
3. `onkeypress`  某个键盘按键被按下并松开。

#### 2.6 选择和改变

1. `onchange`  域的内容被改变。
2. `onselect`  文本被选中。

#### 2.7 表单事件：

1. `onsubmit`  确认按钮被点击。

- 可以阻止表单的提交
  - 方法返回false则表单被阻止提交。

3. `onreset`  重置按钮被点击。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>常见事件</title>

  <script>

    //2.加载完成事件  onload
    window.onload = function () {

      //1.失去焦点事件
      document.getElementById("username").onblur = function () {
        alert("失去焦点了...");
      }
      //3.绑定鼠标移动到元素之上事件
      document.getElementById("username").onmouseover = function () {
        alert("鼠标来了....");
      }

      //3.绑定鼠标点击事件
      document.getElementById("username").onmousedown = function (event) {
        // alert("鼠标点击了....");
        alert(event.button);
      }

      document.getElementById("username").onkeydown = function (event) {
        // alert("鼠标点击了....");
        // alert(event.button);
        // 回车是13，如果是回车提交
        if (event.keyCode == 13) {
          alert("提交表单");
        }

      }

      document.getElementById("username").onchange = function (event) {

        alert("改变了...")

      }

      document.getElementById("city").onchange = function (event) {

        alert("改变了...")

      }

      document.getElementById("form").onsubmit = function () {
        //校验用户名格式是否正确
        var flag = false;

        return flag;
      }
    }

    function checkForm() {
      return true;
    }


  </script>

</head>
<body>

<!--
    function fun(){
       return  checkForm();
    }

 -->

<form action="#" id="form" onclick="return  checkForm();">
  <input name="username" id="username">

  <select id="city">
    <option>--请选择--</option>
    <option>北京</option>
    <option>上海</option>
    <option>西安</option>
  </select>
  <input type="submit" value="提交">
</form>
</body>
</html>
```

### 案例：表格全选

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>表格全选</title>
  <style>
    table {
      border: 1px solid;
      width: 500px;
      margin-left: 30%;
    }

    td, th {
      text-align: center;
      border: 1px solid;
    }

    div {
      margin-top: 10px;
      margin-left: 30%;
    }

    .out {
      background-color: white;
    }

    .over {
      background-color: pink;
    }
  </style>

  <script>
    /*
      分析：
          1.全选：
              * 获取所有的checkbox
              * 遍历cb，设置每一个cb的状态为选中  checked

     */


    //1.在页面加载完后绑定事件
    window.onload = function () {
      //2.给全选按钮绑定单击事件
      document.getElementById("selectAll").onclick = function () {
        //全选
        //1.获取所有的checkbox
        var cbs = document.getElementsByName("cb");
        //2.遍历
        for (var i = 0; i < cbs.length; i++) {
          //3.设置每一个cb的状态为选中  checked
          cbs[i].checked = true;
        }
      }

      document.getElementById("unSelectAll").onclick = function () {
        //全不选
        //1.获取所有的checkbox
        var cbs = document.getElementsByName("cb");
        //2.遍历
        for (var i = 0; i < cbs.length; i++) {
          //3.设置每一个cb的状态为未选中  checked
          cbs[i].checked = false;
        }
      }

      document.getElementById("selectRev").onclick = function () {
        //反选
        //1.获取所有的checkbox
        var cbs = document.getElementsByName("cb");
        //2.遍历
        for (var i = 0; i < cbs.length; i++) {
          //3.设置每一个cb的状态为相反
          cbs[i].checked = !cbs[i].checked;
        }
      }

      document.getElementById("firstCb").onclick = function () {
        //第一个cb点击
        //1.获取所有的checkbox
        var cbs = document.getElementsByName("cb");
        //获取第一个cb

        //2.遍历
        for (var i = 0; i < cbs.length; i++) {
          //3.设置每一个cb的状态和第一个cb的状态一样
          cbs[i].checked = this.checked;
        }
      }

      //给所有tr绑定鼠标移到元素之上和移出元素事件
      var trs = document.getElementsByTagName("tr");
      //2.遍历
      for (var i = 0; i < trs.length; i++) {
        //移到元素之上
        trs[i].onmouseover = function () {
          this.className = "over";
        }

        //移出元素
        trs[i].onmouseout = function () {
          this.className = "out";
        }

      }

    }


  </script>

</head>
<body>

<table>
  <caption>学生信息表</caption>
  <tr>
    <th><input type="checkbox" name="cb" id="firstCb"></th>
    <th>编号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>操作</th>
  </tr>

  <tr>
    <td><input type="checkbox" name="cb"></td>
    <td>1</td>
    <td>令狐冲</td>
    <td>男</td>
    <td><a href="javascript:void(0);">删除</a></td>
  </tr>

  <tr>
    <td><input type="checkbox" name="cb"></td>
    <td>2</td>
    <td>任我行</td>
    <td>男</td>
    <td><a href="javascript:void(0);">删除</a></td>
  </tr>

  <tr>
    <td><input type="checkbox" name="cb"></td>
    <td>3</td>
    <td>岳不群</td>
    <td>?</td>
    <td><a href="javascript:void(0);">删除</a></td>
  </tr>

</table>
<div>
  <input type="button" id="selectAll" value="全选">
  <input type="button" id="unSelectAll" value="全不选">
  <input type="button" id="selectRev" value="反选">
</div>
</body>
</html>
```

### 案例：表单验证

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>注册页面</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
    }

    body {
      background: url("img/register_bg.png") no-repeat center;
      padding-top: 25px;
    }

    .rg_layout {
      width: 900px;
      height: 500px;
      border: 8px solid #EEEEEE;
      background-color: white;
      /*让div水平居中*/
      margin: auto;
    }

    .rg_left {
      /*border: 1px solid red;*/
      float: left;
      margin: 15px;
    }

    .rg_left > p:first-child {
      color: #FFD026;
      font-size: 20px;
    }

    .rg_left > p:last-child {
      color: #A6A6A6;
      font-size: 20px;

    }


    .rg_center {
      float: left;
      /* border: 1px solid red;*/

    }

    .rg_right {
      /*border: 1px solid red;*/
      float: right;
      margin: 15px;
    }

    .rg_right > p:first-child {
      font-size: 15px;

    }

    .rg_right p a {
      color: pink;
    }

    .td_left {
      width: 100px;
      text-align: right;
      height: 45px;
    }

    .td_right {
      padding-left: 50px;
    }

    #username, #password, #email, #name, #tel, #birthday, #checkcode {
      width: 251px;
      height: 32px;
      border: 1px solid #A6A6A6;
      /*设置边框圆角*/
      border-radius: 5px;
      padding-left: 10px;
    }

    #checkcode {
      width: 110px;
    }

    #img_check {
      height: 32px;
      vertical-align: middle;
    }

    #btn_sub {
      width: 150px;
      height: 40px;
      background-color: #FFD026;
      border: 1px solid #FFD026;
    }

    .error {
      color: red;
    }

    #td_sub {
      padding-left: 150px;
    }

  </style>
  <script>

    /*
        分析：
            1.给表单绑定onsubmit事件。监听器中判断每一个方法校验的结果。
                如果都为true，则监听器方法返回true
                如果有一个为false，则监听器方法返回false

            2.定义一些方法分别校验各个表单项。
            3.给各个表单项绑定onblur事件。



     */

    window.onload = function () {
      //1.给表单绑定onsubmit事件
      document.getElementById("form").onsubmit = function () {
        //调用用户校验方法   chekUsername();
        //调用密码校验方法   chekPassword();
        //return checkUsername() && checkPassword();

        return checkUsername() && checkPassword();
      }

      //给用户名和密码框分别绑定离焦事件
      document.getElementById("username").onblur = checkUsername;
      document.getElementById("password").onblur = checkPassword;
    }

    //校验用户名
    function checkUsername() {
      //1.获取用户名的值
      var username = document.getElementById("username").value;
      //2.定义正则表达式
      var reg_username = /^\w{6,12}$/;
      //3.判断值是否符合正则的规则
      var flag = reg_username.test(username);
      //4.提示信息
      var s_username = document.getElementById("s_username");

      if (flag) {
        //提示绿色对勾
        s_username.innerHTML = "<img width='35' height='25' src='img/gou.png'/>";
      } else {
        //提示红色用户名有误
        s_username.innerHTML = "用户名格式有误";
      }
      return flag;
    }

    //校验密码
    function checkPassword() {
      //1.获取用户名的值
      var password = document.getElementById("password").value;
      //2.定义正则表达式
      var reg_password = /^\w{6,12}$/;
      //3.判断值是否符合正则的规则
      var flag = reg_password.test(password);
      //4.提示信息
      var s_password = document.getElementById("s_password");

      if (flag) {
        //提示绿色对勾
        s_password.innerHTML = "<img width='35' height='25' src='img/gou.png'/>";
      } else {
        //提示红色用户名有误
        s_password.innerHTML = "密码格式有误";
      }
      return flag;
    }


  </script>
</head>
<body>

<div class="rg_layout">
  <div class="rg_left">
    <p>新用户注册</p>
    <p>USER REGISTER</p>

  </div>

  <div class="rg_center">
    <div class="rg_form">
      <!--定义表单 form-->
      <form action="#" id="form" method="get">
        <table>
          <tr>
            <td class="td_left"><label for="username">用户名</label></td>
            <td class="td_right">
              <input type="text" name="username" id="username" placeholder="请输入用户名">
              <span id="s_username" class="error"></span>
            </td>
          </tr>

          <tr>
            <td class="td_left"><label for="password">密码</label></td>
            <td class="td_right">
              <input type="password" name="password" id="password" placeholder="请输入密码">
              <span id="s_password" class="error"></span>
            </td>
          </tr>

          <tr>
            <td class="td_left"><label for="email">Email</label></td>
            <td class="td_right"><input type="email" name="email" id="email" placeholder="请输入邮箱"></td>
          </tr>

          <tr>
            <td class="td_left"><label for="name">姓名</label></td>
            <td class="td_right"><input type="text" name="name" id="name" placeholder="请输入姓名"></td>
          </tr>

          <tr>
            <td class="td_left"><label for="tel">手机号</label></td>
            <td class="td_right"><input type="text" name="tel" id="tel" placeholder="请输入手机号"></td>
          </tr>

          <tr>
            <td class="td_left"><label>性别</label></td>
            <td class="td_right">
              <input type="radio" name="gender" value="male" checked> 男
              <input type="radio" name="gender" value="female"> 女
            </td>
          </tr>

          <tr>
            <td class="td_left"><label for="birthday">出生日期</label></td>
            <td class="td_right"><input type="date" name="birthday" id="birthday" placeholder="请输入出生日期"></td>
          </tr>

          <tr>
            <td class="td_left"><label for="checkcode">验证码</label></td>
            <td class="td_right"><input type="text" name="checkcode" id="checkcode" placeholder="请输入验证码">
              <img id="img_check" src="img/verify_code.jpg">
            </td>
          </tr>


          <tr>
            <td colspan="2" id="td_sub"><input type="submit" id="btn_sub" value="注册"></td>
          </tr>
        </table>

      </form>


    </div>

  </div>

  <div class="rg_right">
    <p>已有账号?<a href="#">立即登录</a></p>
  </div>


</div>


</body>
</html>
```

### RegExp对象

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RegExp对象</title>
  <script>

    /*

       2. 正则对象：
            1. 创建
                1. var reg = new RegExp("正则表达式");
                2. var reg = /正则表达式/;
            2. 方法
                1. test(参数):验证指定的字符串是否符合正则定义的规范

     *
     */

    //1.
    var reg = new RegExp("^\\w{6,12}$");
    //2.
    var reg2 = /^\w{6,12}$/;

    /*alert(reg);
    alert(reg2);*/

    var username = "zhangsan";

    //验证
    var flag = reg.test(username);
    alert(flag);


  </script>
</head>
<body>

</body>
</html>
```

### Global对象

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Global对象</title>
  <script>

    /*

       Global
    1. 特点：全局对象，这个Global中封装的方法不需要对象就可以直接调用。  方法名();
    2. 方法：
        encodeURI():url编码
        decodeURI():url解码

        encodeURIComponent():url编码,编码的字符更多
        decodeURIComponent():url解码

        parseInt():将字符串转为数字
            * 逐一判断每一个字符是否是数字，直到不是数字为止，将前边数字部分转为number
        isNaN():判断一个值是否是NaN
            * NaN六亲不认，连自己都不认。NaN参与的==比较全部问false

        eval():讲 JavaScript 字符串，并把它作为脚本代码来执行。
            3. URL编码
               传智播客 =  %E4%BC%A0%E6%99%BA%E6%92%AD%E5%AE%A2



     *
     */
    var str = "http://www.baidu.com?wd=我爱学习";
    var encode = encodeURI(str);
    document.write(encode + "<br>");//%E6%88%91%E7%88%B1%E5%AD%A6%E4%B9%A0
    var s = decodeURI(encode);
    document.write(s + "<br>");//我爱学习


    var str1 = "http://www.baidu.com?wd=我爱学习";
    var encode1 = encodeURIComponent(str1);
    document.write(encode1 + "<br>");//%E6%88%91%E7%88%B1%E5%AD%A6%E4%B9%A0
    var s1 = decodeURIComponent(encode);
    document.write(s1 + "<br>");//我爱学习


    var str = "a234abc";
    var number = parseInt(str);
    //alert(number + 1);

    var a = NaN;

    document.write(a == NaN);
    document.write(isNaN(a));

    var jscode = "alert(123)";
    eval(jscode);

  </script>
</head>
<body>

</body>
</html>
```

::: tip 发布时间:
2021-02-10
:::
