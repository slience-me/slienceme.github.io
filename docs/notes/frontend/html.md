# HTML

## 第一个网页

```html
<!-- 文档声明 ： html5文档 -->
<!DOCTYPE html>
<!-- 当前网页的语言是英文，默认不指定是中文=> lang='zh'-->
<!-- 一般不用指定成en语言-->
<html lang="en">
<head>
  <!-- 指定网页的编码格式 -->
  <meta charset="UTF-8">
  <!-- 在移动设备浏览网页时，网页不缩放 -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <!-- 在ie浏览器浏览网页时，使用ie的最高版本-->
  <meta http-equiv="X-UA-Compatible" content="ie-enge">
  <title>Document</title>
</head>
<body>
<!-- html语言里边的注释快捷键：windows： ctrl + /  -->
hello
</body>
</html>
```

## 第一次学笔记

```html
<!--1、成对出现的标签-->
<h1>h1标题</h1>
<div>这是一个div标签</div>
<p>这是一个段落标签</p>

<!--2、单个出现的标签-->
<br>
<img src="images/pic.jpg" alt="图片">
<hr>

<!--3、带属性的标签，如src、 alt 和 href 等都是属性-->
<img src="images/pic.jpg" alt="图片">   <!--src="资源路径"-->
<a href="http://www.baidu.com">百度网</a>

<!--4、标签的嵌套-->
<!--div容器标签-->
<div>
  <img src="images/pic.jpg" alt="图片">
  <a href="http://www.baidu.com">百度网</a>
</div>
```

**总体标签大全**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 双标签：成对出现的标签 -->
<h1>标题标签</h1>
<h1>标题一共六级选，</h1>
<h2>文字加粗一行显。</h2>
<h3>由大到小依次减，</h3>
<h4>从重到轻随之变。</h4>
<h5>语法规范书写后，</h5>
<h6>具体效果刷新见。</h6>
<div>我是一个容器标签，可以包裹其他标签内容</div>
<p>我说一个段落标签</p>
<p>我说一个段落标签</p>
<!-- 单标签：只有一个标签，没有标签内容 -->
<!-- 水平分割线hr -->
<hr>
<img src="img/1.jpg" alt="图片加载失败会显示">
<br>
<img src="img/2.jpg" alt="图片加载失败会显示">

<!-- 带有属性标签 -->
<a href="http://www.baidu.com">百度</a>

<!-- 标签可以嵌套 ,不可以交叉嵌套-->
<DIV>
  <!-- 错误示例 -->
  <!-- <p>我说一个段落标签</div></p> -->
  <p>我说一个段落标签</p>
</DIV>

<!-- HTML不区分大小写，但是推荐大家使用小写 -->

</body>
</html>
```

### 1. 资源路径

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 资源路径分为绝对路径和相对路径 
    1.绝对路径是从根目录算起的路径叫绝对路径
    2.相对路径是当前目录算起的路径叫相对路径
    -->
<!-- 相对路径的第一种写法 -->
<img src="img/4.jpg" alt="">
<!-- 相对路径的第二种写法 -->
<img src="./img/4.jpg" alt="">
<!-- 绝对路径的写法 -->
<img src="D:\resource\前端\HTML5\img\3.png" alt="">

<!-- 资源路径一般会使用相对路径，更加通用方便，绝对路径把工程拷贝给别人可能会出现资源找不到的问题 -->
</body>
</html>
```

### 2. 列表标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 列表标签可以分为有序列表标签和无序列表标签 -->

<!-- 无序列表标签 -->
<ul>
  <li>苹果</li>
  <li>鸭梨</li>
</ul>

<!-- 有序列表标签 -->
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>
<!-- 强调显示的顺序使用有序列表标签，不强调顺序使用无序列表标签 -->
</body>
</html>

```

![Alt Text](/images/20201126133531399.png)

### 3. 表格标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- border-collapse: collapse 表示表格的边线进行合并 -->
<table style="border: 1px solid black; border-collapse: collapse;">
  <tr>
    <th style="border: 1px solid black;">姓名</th>
    <th style="border: 1px solid black;">年龄</th>
  </tr>
  <tr>
    <td style="border: 1px solid black;">张三</td>
    <td style="border: 1px solid black;">22</td>
  </tr>
</table>
</body>
</html>
```

![Alt Text](/images/20201126133620744.png)

### 4. 表单标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 把数据提交给web服务器使用表单标签：<form> -->
<form action="">
  <p>
    <!-- for 根据id名给指定id设置光标 -->
    <label for="name">用户名</label>
    <input type="text" name="" id="name">
  </p>
  <p>
    <label for="">密码</label>
    <input type="password" name="" id="">
  </p>
  <p>
    <label for="">性别</label>
    <input type="radio">男
    <input type="radio">女
  </p>
  <p>
    <label for="">爱好</label>
    <input type="checkbox">学习
    <input type="checkbox">睡觉
    <input type="checkbox">打游戏
  </p>
  <p>
    <label for="">照片</label>
    <input type="file">
  </p>
  <p>
    <label for="">个人描述</label>
    <textarea name="" id="" cols="30" rows="10"></textarea>
  </p>
  <p>
    <label for="">籍贯</label>
    <select name="" id="">
      <option value="">北京</option>
      <option value="">河北</option>
      <option value="">深圳</option>
      <option value="">湖北</option>
    </select>
  </p>
  <p>
    <input type="submit" value="提交">
    <input type="reset" value="重置">
    <input type="button" value="按钮">
  </p>


</form>
</body>
</html>
```

![Alt Text](/images/20201126133644728.png)

### 5. 表单提交

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 把数据提交给web服务器使用表单标签：<form>                -->
<!-- action 设置表单数据提交地址                             -->
<!-- method 是表单提交方式，提交方式有GET和POST               -->
<!-- name 表单元素的名称，用于作为提交表单数据时的参数名       -->
<!-- value 表单元素的值，用于作为提交表单数据时参数名所对应的值-->
<form action="https://www.baidu.com" method="GET">
  <p>
    <!-- for 根据id名给指定id设置光标 -->
    <label for="name">用户名</label>
    <input type="text" name="" id="name" name="username">
  </p>
  <p>
    <label for="">密码</label>
    <input type="password" name="password" id="">
  </p>
  <p>
    <label for="">性别</label>
    <input type="radio" name="sex" value="0">男
    <input type="radio" name="sex" value="1">女
  </p>
  <p>
    <label for="">爱好</label>
    <input type="checkbox" name="love" value="学习">学习
    <input type="checkbox" name="love" value="睡觉">睡觉
    <input type="checkbox" name="love" value="打游戏">打游戏
  </p>
  <p>
    <label for="">照片</label>
    <input type="file" name="pic">
  </p>
  <p>
    <label for="">个人描述</label>
    <textarea name="desc" id="" cols="30" rows="10"></textarea>
  </p>
  <p>
    <label for="">籍贯</label>
    <select name="position" id="">
      <option value="1">北京</option>
      <option value="2">河北</option>
      <option value="3">深圳</option>
      <option value="4">湖北</option>
    </select>
  </p>
  <p>
    <input type="submit" value="提交">
    <input type="reset" value="重置">
    <input type="button" value="按钮">
  </p>

  <!-- get和post方式提交表单数据都以http协议的方式提交数据给web服务器 -->
</form>
</body>
</html>
```

**GET请求会将内容放在路由里**

![Alt Text](/images/20201126135858502.png)

**请求头是GET**

![Alt Text](/images/20201126135942290.png)

**提交的内容**

![Alt Text](/images/20201126135914208.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<!-- 把数据提交给web服务器使用表单标签：<form>                -->
<!-- action 设置表单数据提交地址                             -->
<!-- method 是表单提交方式，提交方式有GET和POST               -->
<!-- name 表单元素的名称，用于作为提交表单数据时的参数名       -->
<!-- value 表单元素的值，用于作为提交表单数据时参数名所对应的值-->
<form action="https://www.baidu.com" method="POST">
  <p>
    <!-- for 根据id名给指定id设置光标 -->
    <label for="name">用户名</label>
    <input type="text" name="" id="name" name="username">
  </p>
  <p>
    <label for="">密码</label>
    <input type="password" name="password" id="">
  </p>
  <p>
    <label for="">性别</label>
    <input type="radio" name="sex" value="0">男
    <input type="radio" name="sex" value="1">女
  </p>
  <p>
    <label for="">爱好</label>
    <input type="checkbox" name="love" value="学习">学习
    <input type="checkbox" name="love" value="睡觉">睡觉
    <input type="checkbox" name="love" value="打游戏">打游戏
  </p>
  <p>
    <label for="">照片</label>
    <input type="file" name="pic">
  </p>
  <p>
    <label for="">个人描述</label>
    <textarea name="desc" id="" cols="30" rows="10"></textarea>
  </p>
  <p>
    <label for="">籍贯</label>
    <select name="position" id="">
      <option value="1">北京</option>
      <option value="2">河北</option>
      <option value="3">深圳</option>
      <option value="4">湖北</option>
    </select>
  </p>
  <p>
    <input type="submit" value="提交">
    <input type="reset" value="重置">
    <input type="button" value="按钮">
  </p>

  <!-- get和post方式提交表单数据都以http协议的方式提交数据给web服务器 -->
</form>
</body>
</html>
```

**POST直接把内容放到请求头里**

![Alt Text](/images/20201126140249252.png)

## 第二次看笔记：

**语法：**

1. html文档后缀名 `.html` 或者 `.htm`
2. 标签分为
1. 围堵标签：有开始标签和结束标签。如 `<html> </html>`
2. 自闭和标签：开始标签和结束标签在一起。如 `<br/>`

3. 标签可以嵌套：
   需要正确嵌套，不能你中有我，我中有你
   错误：`<a><b></a></b>`
   正确：`<a><b></b></a>`

4. 在开始标签中可以定义属性。属性是由键值对构成，值需要用引号(单双都可)引起来
5. html的标签不区分大小写，但是建议使用小写。

**代码：**

~~~html

<html>
<head>
  <title>title</title>
</head>
<body>
<FONT color='red'>Hello World</font><br/>
<font color='green'>Hello World</font>
</body>
</html>
~~~

**标签学习：**

### 1. 文件标签：

**构成html最基本的标签**

* `html`:html文档的根标签
* `head`：头标签。用于指定html文档的一些属性。引入外部的资源
* `title`：标题标签。
* `body`：体标签
* `<!DOCTYPE html>`：html5中定义该文档是html文档

### 2. 文本标签：

**和文本有关的标签**

* 注释：<!-- 注释内容 -->
* `<h1> to <h6>`：标题标签
  * `h1~h6`:字体大小逐渐递减
* `<p>`：段落标签
* `<br>`：换行标签
* `<hr>`：展示一条水平线
  * 属性：
    * `color`：颜色
    * `width`：宽度
    * `size`：高度
    * `align`：对齐方式
      * `center`：居中
      * `left`：左对齐
      * `right`：右对齐
* `<b>`：字体加粗
* `<i>`：字体斜体
* `<font>`:字体标签
* `<center>`:文本居中
  * 属性：
    * `color`：颜色
    * `size`：大小
    * `face`：字体

* 属性定义：
  * `color`：
    1. 英文单词：`red,green,blue`
    2. `rgb(值1，值2，值3)`：值的范围：0~255 如 rgb(0,0,255)
    3. `#值1值2值3`：值的范围：00~FF之间。如： #FF00FF
  * `width`：
    1. `数值`：`width='20'` ,数值的单位，默认是 `px`(像素)
    2. `数值%`：占比相对于父元素的比例

### 3. 图片标签：

* `img`：展示图片
  * 属性：
    * `src`：指定图片的位置

* 代码：

```html
<!--展示一张图片 img-->

<img src="image/jingxuan_2.jpg" align="right" alt="古镇" width="500" height="500"/>

<!--
    相对路径
        * 以.开头的路径
            * ./：代表当前目录  ./image/1.jpg
            * ../:代表上一级目录
 -->

<img src="./image/jiangwai_1.jpg">

<img src="../image/jiangwai_1.jpg">
```

### 4. 列表标签：

* 有序列表：
  * `ol`:
  * `li`:
* 无序列表：
  * `ul`:
  * `li`:

### 5. 链接标签：

* `a`:定义一个超链接
  * 属性：
    * `href`：指定访问资源的URL(统一资源定位符)
    * `target`：指定打开资源的方式
      * `_self`:默认值，在当前页面打开
      * `_blank`：在空白页面打开

* 代码：

```html
 <!--超链接  a-->

<a href="http://www.baidu.cn">点我</a>
<br>

<a href="http://www.baidu.cn" target="_self">点我</a>
<br>
<a href="http://www.baidu.cn" target="_blank">点我</a>

<br>

<a href="./5_列表标签.html">列表标签</a><br>
<a href="mailto:baidu@baidu.cn">联系我们</a>

<br>
<a href="http://www.baidu.cn"><img src="image/jiangwai_1.jpg"></a>
```

### 6. div和span：

* `div`:每一个div占满一整行。块级标签
* `span`：文本信息在一行展示，行内标签 内联标签

### 7. 语义化标签：

**html5中为了提高程序的可读性，提供了一些标签。**

1. `<header>`：页眉
2. `<footer>`：页脚

### 8. 表格标签：

* `table`：定义表格
  * `width`：宽度
  * `border`：边框
  * `cellpadding`：定义内容和单元格的距离
  * `cellspacing`：定义单元格之间的距离。如果指定为0，则单元格的线会合为一条、
  * `bgcolor`：背景色
  * `align`：对齐方式
* `tr`：定义行
  * `bgcolor`：背景色
  * `align`：对齐方式
* `td`：定义单元格
  * `colspan`：合并列
  * `rowspan`：合并行
* `th`：定义表头单元格
* `<caption>`：表格标题
* `<thead>`：表示表格的头部分
* `<tbody>`：表示表格的体部分
* `<tfoot>`：表示表格的脚部分

### 9.表单标签:

概念：用于采集用户输入的数据的。用于和服务器进行交互。

`form`：用于定义表单的。可以定义一个范围，范围代表采集用户数据的范围

* 属性：
  * `action`：指定提交数据的`URL`
  * `method`:指定提交方式
    * 分类：一共7种，2种比较常用
      * `get`：
        1. 请求参数会在地址栏中显示。会封装到请求行中(HTTP协议后讲解)。
        2. 请求参数大小是有限制的。
        3. 不太安全。
      * `post`：
        1. 请求参数不会再地址栏中显示。会封装在请求体中(HTTP协议后讲解)

      2. 请求参数的大小没有限制。
      3. 较为安全。

  * 表单项中的数据要想被提交：必须指定其name属性

**表单项标签：**

* `input`：可以通过`type`属性值，改变元素展示的样式
  * `type`属性：
    * `text`：文本输入框，默认值
      * `placeholder`：指定输入框的提示信息，当输入框的内容发生变化，会自动清空提示信息
    * `password`：密码输入框
    * `radio`:单选框
      * 注意：
        1. 要想让多个单选框实现单选的效果，则多个单选框的`name`属性值必须一样。
        2. 一般会给每一个单选框提供`value`属性，指定其被选中后提交的值
        3. `checked`属性，可以指定默认值
    * `checkbox`：复选框
      * 注意：
        1. 一般会给每一个单选框提供`value`属性，指定其被选中后提交的值
        2. `checked`属性，可以指定默认值

    * `file`：文件选择框
    * `hidden`：隐藏域，用于提交一些信息。
    * 按钮：
      * `submit`：提交按钮。可以提交表单
      * `button`：普通按钮
      * `image`：图片提交按钮
        * `src`属性指定图片的路径

  * `label`：指定输入项的文字描述信息
    * 注意：
      * `label`的`for`属性一般会和 `input` 的 `id`属性值 对应。如果对应了，则点击`label`区域，会让`input`输入框获取焦点。
* `select`: 下拉列表

  * 子元素：`option`，指定列表项

* `textarea`：文本域
  * `cols`：指定列数，每一行有多少个字符
  * `rows`：默认多少行。

![Alt Text](/images/20210203112239434.png)

::: tip 发布时间:
2021-02-02
:::
