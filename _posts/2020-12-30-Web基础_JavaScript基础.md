---
layout: post
title: 前端｜Web基础_JavaScript基础
categories: [前端]
description: Web基础_JavaScript基础
keywords: 前端, Web
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---




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
JavaScript 是一种弱类型语言，也就是说不需要指定变量的类型，JavaScript的变量类型由它的值来决定， 定义变量需要用关键字 'var', 一条JavaScript语句应该以“;”结尾

定义变量的语法格式:

var 变量名 = 值;

```javascript
var iNum = 123;
 var sTr = 'asd';

 //同时定义多个变量可以用","隔开，公用一个‘var’关键字

 var iNum = 45,sTr='qwe',sCount='68';
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
   name:"隔壁老王",
   age:88
}
// 获取变量的类型
var type = typeof(oObj);
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
alert(iCount);  //弹出7
</script>
```

**函数中'return'关键字的作用:**
1、返回函数中的值
2、执行完return函数执行结束

### 4.4 小结

 - 函数的定义

```javascript
function 函数名(参数[参数可选]){  
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
    alert(b);  // 函数外使用出错
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
    alert(a);  // 弹出13    
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
![Alt Text](/images/posts/20201230211518160.png)
比较运算符示例代码:

```javascript
var iNum01 = 12;
var sNum01 = '12';

if(iNum01==12){
    alert('相等！');
}
else{
    alert('不相等！')
}

// "==" 符号默认会将符号两边的变量转换成数字再进行对比，这个叫做隐式转换
if(sNum01==12){
    alert('相等！');
}
else{
    alert('不相等！')
}

// "===" 符号不会转换符号两边的数据类型
if(sNum01===12){
    alert('相等！');
}
else{
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
![Alt Text](/images/posts/20201230211559554.png)
逻辑运算符示例代码:

```javascript
var x = 6;
var y = 3;

if(x < 10 && y > 1){
    alert('都大于');
}
else{
    alert('至少有一个不大于');
}

if(x > 5 || y > 7 ){
    alert('至少有一个大于');
}
else{
    alert('都不大于');
}

if(!(x == y)){
    alert('等于')
}
else{
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
        font-size:20px;
        color:red;
    }
    .sty02{
        font-size:30px;
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
var aList = new Array(1,2,3);

// 字面量方式创建，推荐使用
var aList2 = [1,2,3,'asd'];
```
### 9.3 多维数组
多维数组指的是数组的成员也是数组，把这样的数组叫做多维数组。

```javascript
var aList = [[1,2,3],['a','b','c']];
```
### 9.4 数组的操作
**1、 获取数组的长度**

```javascript
var aList = [1,2,3,4];
alert(aList.length); // 弹出4
```
**2、 根据下标取值**

```javascript
var aList = [1,2,3,4];
alert(aList[0]); // 弹出1
```
**3、 从数组最后添加和删除数据**

```javascript
var aList = [1,2,3,4];
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
colors.splice(0,1);  //删除第一项
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

for(var index = 0; index < array.length; index++){
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

 

