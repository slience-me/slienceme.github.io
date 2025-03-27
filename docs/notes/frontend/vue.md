# Vue

## 1. 指令

### 1.1 mustache

- mustache
  - {{}}

```html

<div id="app">
  <h2>{{message}}</h2>
  <h2>{{message}},李银河！</h2>
  <!-- mustache语法中，不仅仅可以直接写变量，也可以写简单的表达式 -->
  <h2>{{firstName + lastName}}</h2>
  <h2>{{firstName + ' ' +lastName}}</h2>
  <h2>{{firstName}} {{lastName}}</h2>
  <h2>{{counter * 2}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      firstName: 'kobe',
      lastName: 'bryant',
      counter: 100,
    }
  })
</script>
```

### 1.2 v-once

- `v-once`：
  - 该指令后边不需要跟任何表达式
  - 该指令表示元素和组件只渲染一次，不会随着数据的改变而改变

```html

<div id="app">
  <h2>{{message}}</h2>
  <h2 v-once>{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

![Alt Text](/images/e1502fde71f643f0aa43c873acbba00e.png)

### 1.3 v-html

- `v-html`：
  - 该指令后边往往会跟上一个string类型
  - 会将string的html解析出来并且渲染

```html

<div id="app">
  <h2>{{url}}</h2>
  <h2 v-html="url"></h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      url: '<a href="https://www.baidu.com">百度一下<a/>'
    }
  })
</script>
```

![Alt Text](/images/086eee1cef3743f5a5d1c6e8c2cfe2c5.png)

### 1.4 v-text

- `v-text`：
  - 该指令和Mustache比较相似：都是用于将数据显示在界面中
  - 该指令通常情况下，接受一个string类型
- 相对不灵活，不容易拼接内容，一般不用

```html

<div id="app">
  <h2>{{message}},slience_me!</h2>
  <h2 v-text="message">,slience_me!</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

![Alt Text](/images/0113c0d5d81b47768283b1ece1ee47b8.png)

### 1.5 v-pre

- `v-pre`:
  - 该指令用于跳过这个元素和它的子元素的编译过程，用于显示原本的`Mustache`语法
  - 原封不动的显示出来

```html

<div id="app">
  <h2>{{message}}</h2>
  <h2 v-pre>{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

![Alt Text](/images/dfad27c1af4946afaed90b76f468f5d7.png)

### 1.6 v-cloak

cloak:斗篷

- `v-cloak`:
  - 该指令防止不友好的{{message}}被看到
  - 不会看到{{}}内容

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
</head>
<body>
<div id="app" v-cloak>
  <h2>{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  //在vue解析之前，div有一个属性v-cloak
  //在vue解析之后，div中没有一个属性v-cloak
  setTimeout(function () {
    const app = new Vue({
      el: '#app',
      data: {
        message: '你好啊！'
      }
    })
  }, 1000)

</script>
</body>
</html>
```

![Alt Text](/images/91db6067135a427d9d57051b5844ab19.png)

### 1.7 v-bind

#### 1.7.1 基本使用

- `v-bind`:
  - 作用：动态绑定属性
  - 缩写：`:`
  - 预期：any(with argument) | Object (without argument)
  - 参数：attrOrProp(optional)
- 例子：`<img :src="imgURL" alt="">`

```html

<div id="app">
  <!--错误的语法：这里不可以使用mustache语法-->
  <!--<img src="{{imgURL}}" alt="">-->
  <!--正确的做法：使用v-bind指令-->
  <img v-bind:src="imgURL" alt="">
  <a v-bind:href="aHref">百度一下</a>
  <!--  <h2>{{}}</h2>-->
  <br>
  <!--语法糖的写法-->
  <img :src="imgURL" alt="">
  <a :href="aHref">百度一下</a>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      imgURL: 'https://cn.vuejs.org/images/logo.svg',
      aHref: 'https://www.baidu.com'
    }
  })
</script>
```

#### 1.7.2 动态绑定class

##### 对象语法

```html

<div id="app">
  <!--  <h2 class="active">{{message}}</h2>-->
  <!--  <h2 :class="active">{{message}}</h2>-->
  <!--  <h2 :class="{key1: value1,key2:value2}">{{message}}</h2>-->
  <!--  <h2 :class="{类名1: boolean,类名2:boolean}">{{message}}</h2>-->
  <!--  <h2 class="title" :class="{active: isActive,line:isLine}">{{message}}</h2>-->
  <h2 class="title" :class="getClasses()">{{message}}</h2>
  <button v-on:click="btnClick">按钮</button>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      isActive: true,
      isLine: true
    },
    methods: {
      btnClick: function () {
        this.isActive = !this.isActive
      },
      getClasses: function () {
        return {active: this.isActive, line: this.isLine}
      }
    }
  })
</script>
```

![Alt Text](/images/66e1c9d7b345461a8aaaf399629b29b7.png)

##### 数组语法

```html

<div id="app">
  <!-- 字符串 -->
  <h2 class="title" :class="['active', 'line']">{{message}}</h2>
  <!-- 变量 -->
  <h2 class="title" :class="[active, line]">{{message}}</h2>
  <h2 class="title" :class="getClasses()">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      active: 'aaaa',
      line: 'bbbbbb'
    },
    methods: {
      getClasses: function () {
        return [this.active, this.line]
      }
    }
  })
</script>
```

![Alt Text](/images/9b4e129c759e4b2587f07300a9370e6b.png)

##### 案例

- 点击哪个那个变红

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
    .active {
      color: red;
    }
  </style>
</head>
<body>
<div id="app">
  <ul>
    <li v-for="(m, index) in movies"
        @click="liClick(index)"
        :class="{active:currentIndex===index}"> {{index}}-{{m}}
    </li>
  </ul>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      movies: ['海王', '海尔兄弟', '火影忍者', '进击的巨人'],
      currentIndex: 0
    },
    methods: {
      liClick(index) {
        this.currentIndex = index;
      }
    }
  })
</script>
</body>
</html>
```

![Alt Text](/images/b423fd366f614d2587b2fe48bba99758.png)

#### 1.7.3 动态绑定style

##### 对象绑定

- `:style="{fontSize:finalSize + 'px',color:finalColor}"`
- `style`后边跟的是一个对象类型
  - 对象的`key`是`CSS`属性名称
  - 对象的`value`是具体赋的值，值可以来自于`data`中的属性

```html

<div id="app">
  <!--  <h2 :style="{key(属性名): value(属性值)}">{{message}}</h2>-->
  <!--  '50px'必须加上单引号，否则是当作一个变量去解析-->
  <!--<h2 :style="{fontSize: finalSize}">{{message}}</h2>-->
  <!-- finalSize当成一个变量使用 -->
  <h2 :style="{fontSize:finalSize}">{{message}}</h2>
  <h2 :style="{fontSize:finalSize + 'px',color:finalColor}">{{message}}</h2>
  <h2 :style="getStyles()">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      // finalSize: '100px'
      finalSize: 100,
      finalColor: 'red'
    },
    methods: {
      getStyles: function () {
        return {fontSize: this.fontSize + 'px', backgroundColor: this.finalColor}
      }
    }
  })
</script>
```

![Alt Text](/images/ae389144bd444645bd773f815ef8077a.png)

##### 数组绑定

- `<div v-bind:style="[baseStyles, overridingStyles]"></div>`
- `style`后边跟的是一个数组类型
  - 多个值以逗号`,`分割即可

```html

<div id="app">
  <h2 :style="[baseStyle,baseStyle1]">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      baseStyle: {backgroundColor: 'red'},
      baseStyle1: {fontSize: '100px'},
    }
  })
</script>
```

![Alt Text](/images/f09c4ba6d38445308da6505f010d05c9.png)

### 1.8 v-on

- 作用：绑定事件监听器
- 缩写：`@`
- 预期：Function|Inline Statement |Object
- 参数： event

#### 1.8.1 基本使用

```html

<div id="app">
  <h2>{{counter}}</h2>
  <!--  <button v-on:click="counter++">+</button>-->
  <!--  <button v-on:click="counter&#45;&#45;">-</button>-->
  <!--<button v-on:click="increment()">+</button>
  <button v-on:click="decrement()">-</button>-->
  <button @click="increment()">+</button>
  <button @click="decrement()">-</button>

</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      counter: 0
    },
    methods: {
      increment() {
        this.counter++;
      },
      decrement() {
        this.counter--;
      }
    }
  })
</script>
```

#### 1.8.2 参数问题

- 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加
  - 但是注意：如果方法本身中有一个参数，那么会默认将原生事件event参数传递进去
- 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件

```html

<div id="app">
  <!--事件调用的方法没有参数-->
  <button @click="btn1Click()">按钮1</button>
  <button @click="btn1Click">按钮1</button>

  <!--在事件定义时，写函数时省略了小括号，但是方法本身是需要参数的，这个时候，
  Vue会默认将浏览器生产的event事件参数传入到方法中-->
  <!--<button @click="btn2Click(123)">按钮2</button>-->
  <!--<button @click="btn2Click()">按钮2</button>-->
  <button @click="btn2Click">按钮2</button>

  <!--方法定义时，我们需要event对象，同时又需要其他参数-->
  <!--在调用方法时，如何手动的获取到浏览器参数的event对象：-->
  <button @click="btn3Click(abc,$event)">按钮3</button>
  <button>按钮4</button>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      abc: 123
    },
    methods: {
      btn1Click() {
        console.log('btn1Click');
      },
      btn2Click(event) {
        console.log('btn2Click', event);
      },
      btn3Click(abc, event) {
        console.log('btn3Click', abc, event);
      },
    }
  })
</script>
```

![Alt Text](/images/4806fc79ee3c4087b40a4110ec229b42.png)

#### 1.8.3 修饰符

- Vue提供了修饰符来帮助我们方便的处理一些事件：
  - `.stop` 调用 `event.stopPropagation()` 避免事件冒泡
  - `.prevent`  调用 `event.preventDefault()` 阻止默认事件
  - `.{keyCode|keyAlias}` 只是事件从特定键触发时才触发回调 监听键盘的某个键帽的点击
  - `.native` 监听组件根元素的原生事件
  - `.once` 只触发一次回调

![Alt Text](/images/9c1406914f454fd09f727cb2f4bf74e9.png)

### 1.9 v-if & v-else

```html

<div id="app">
  <h2 v-if="score>=90">优秀</h2>
  <h2 v-else-if="score>=80">良好</h2>
  <h2 v-else-if="score>=60">及格</h2>
  <h2 v-else>不及格</h2>
  ------------------------------------
  <h2>{{result}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      score: 88
    },
    computed: {
      result() {
        let showMessage = ''
        if (this.score >= 90) {
          showMessage = '优秀';
        } else if (this.score >= 80) {
          showMessage = '良好';
        } else if (this.score >= 60) {
          showMessage = '及格';
        } else {
          showMessage = '不及格';
        }
        return showMessage;
      }
    }
  })
</script>
```

![Alt Text](/images/11bedbd918aa4f30a668ccec8dd5691d.png)

##### 条件渲染案例

```html

<div id="app">
  <span v-if="isUser">
    <label for="username">用户账号</label>
    <input type="text" id="username" placeholder="用户账号" key="username">
  </span>

  <span v-else>
    <label for="email">用户邮箱</label>
    <input type="text" id="email" placeholder="用户邮箱" key="email">
  </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      isUser: true
    }
  })
</script>
```

### 1.10 v-show

- `v-if`和`v-show`都可以决定一个元素是否渲染，区别是：
  - `v-if`当条件为false时，压根不会有对应的元素在DOM中
  - `v-show`当条件为false时，仅仅是将元素的`display`属性设置为`none`而已
- 开发中需要在显示与隐藏之间切片很频繁时建议选择`v-show`
- 只有一次切换时，建议使用`v-if`

```html

<div id="app">
  <!--v-if:当条件为false时，包含v-if指令的元素，根本就不会存在dom中-->
  <h2 v-if="isShow" id="aaa">{{message}}</h2>
  <!--v-show:当条件为false时，v-show只是给我们的元素添加一个行内样式：display：none-->
  <h2 v-show="isShow" id="bbb">{{message}}</h2>

</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      isShow: true
    }
  })
</script>
```

![Alt Text](/images/58d17a5687d349f6ad85645e10045201.png)

### 1.11 v-for

- `v-for`的语法类似于`javaScript`中的`for`循环
- 格式如下：`item in items`的形式

---

- 如果便利的过程不需要索引值
  - `v-for="movie in movies"`
  - 依次从`movies`中取出`movie`，并且在元素中，我们可以使用`Mustache`语法，来使用`movie`
- 如果在遍历的过程中，我们需要拿到元素在数组中的索引值
  - 语法格式：`v-for=(item, index) in items`
  - 其中的`index`就代表了去除的`item`在原数组的索引值

---

- 官方推荐我们在使用v-for时，给对应的元素或组件添加上一个`:key`属性
- key的主要作用是为了高效的更新虚拟DOM

##### 遍历数组

- 响应式的相关方法
  - `push()` 在数组最后面添加元素
  - `pop()`  删除数组最后面的元素
  - `shift()`  删除数组的第一个元素
  - `unshift()`  在数组最前面添加元素
  - `splice()` 删除元素/插入元素/替换元素(start,num,value)
  - `set()` (要修改的对象,索引值,修改后内容)
  - `sort()` 数组排序
  - `reverse()` 数组反转
    ![Alt Text](/images/25184a3916294d7bb828a5ba724ae3f8.png)

```html

<div id="app">
  <!--1. 在遍历的过程中，没有使用索引值（下标值）-->
  <ul>
    <li v-for="item in names">{{item}}</li>
  </ul>
  <!--2. 在遍历的过程中，获取索引值（下标值）-->
  <ul>
    <li v-for="(item,index) in names">{{index+1}}. {{item}}</li>
  </ul>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      names: ['why', 'kobe', 'james', 'curry']
    }
  })
</script>
```

##### 遍历对象

```html

<div id="app">
  <!--1. 在遍历对象的过程中，如果只是获取一个值，那么获取到的是value-->
  <ul>
    <li v-for="item in info">{{item}}</li>
  </ul>

  <!--2. 获取key和value 格式：（value，key）-->
  <ul>
    <li v-for="(value,key,index) in info">{{value}}-{{key}}-{{index}}</li>
  </ul>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      info: {
        name: 'why',
        age: 18,
        height: 1.88
      }
    }
  })
</script>
```

---

- 绑定唯一key

```html

<div id="app">
  <ul>
    <li v-for="item in letters" :key="item">{{item}}</li>
  </ul>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      letters: ['A', 'B', 'C', 'D', 'E']
    }
  })
</script>
```

### 1.12 v-model

##### 原理

```html

<div id="app">
  <!--  <input type="text" v-model="message">-->
  <!--  <input type="text" :value="message" @input="valueChange">-->
  <input type="text" :value="message" @input="message = $event.target.value">
  {{message}}
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    methods: {
      valueChange(event) {
        console.log('-----');
        console.log(event);
        this.message = event.target.value;
      }
    }
  })
</script>
```

##### 基本使用

```html

<div id="app">
  <input type="text" v-model="message">
  {{message}}
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

##### v-model:radio

```html

<div id="app">
  <label for="male">
    <input type="radio" id="male" value="男" v-model="sex">男
  </label>
  <label for="female">
    <input type="radio" id="female" value="女" v-model="sex">女
  </label>
  <h2>您选择的性别是: {{sex}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      sex: '男',
    }
  })
</script>
```

##### v-model:checkbox

```html

<div id="app">
  <!--1. 单选框-->
  <label for="agreement">
    <input type="checkbox" id="agreement" v-model="isAgree">同意协议
  </label>
  <h2>您选择的是：{{isAgree}}</h2>
  <button :disabled="!isAgree">下一步</button>

  <br>
  <!--2.多选框-->
  <label>
    <input type="checkbox" v-model="hobbies" value="篮球">篮球
    <input type="checkbox" v-model="hobbies" value="足球">足球
    <input type="checkbox" v-model="hobbies" value="乒乓球">乒乓球
    <input type="checkbox" v-model="hobbies" value="羽毛球">羽毛球
  </label>
  <h2>您的爱好是：{{hobbies}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      isAgree: false,
      hobbies: []
    },
  })
</script>
```

![Alt Text](/images/43f34a1af13e41f0a8c58c192ccc7938.png)

##### v-model:select

```html

<div id="app">
  <!--1. 选择一个-->
  <select name="abc" v-model="fruit">
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="西瓜">西瓜</option>
    <option value="菠萝">菠萝</option>
  </select>
  <h2>您选择是：{{fruit}}</h2>

  <br>
  <!--2. 选择多个-->
  <select name="abc" v-model="fruits" multiple>
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="西瓜">西瓜</option>
    <option value="菠萝">菠萝</option>
  </select>
  <h2>您选择是：{{fruits}}</h2>

  <label v-for="item in originFruits" :for="item">
    <input type="checkbox" :value="item" :id="item" v-model="balls">{{item}}
  </label>
  <h2>您选择是：{{balls}}</h2>

</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      fruit: '香蕉', //单选框
      fruits: [], //多选框
      originFruits: ['篮球', '足球', '乒乓球', '羽毛球', '台球', '高尔夫球'],
      balls: [],
    }
  })
</script>
```

![Alt Text](/images/2ebe4ee340334fb696e6a2d9e87196cb.png)

##### 修饰符

- `lazy`修饰符：
  - 默认情况下，v-model默认是在input事件中同步输入框的数据的
  - 一旦有数据发生改变对应的data中的数据就会自动发生改变
  - lazy修饰符可以让数据失去焦点或者回车时才更新

```html

<div id="app">
  <!--修饰符：lazy-->
  <input type="text" v-model.lazy="message">
  <h2>{{message}}</h2>

  <!--修饰符：number-->
  <input type="number" v-model.number="age">
  <h2>{{typeof age}}</h2>

  <!--修饰符：trim-->
  <input type="text" v-model.trim="name">
  <h2>{{name}}</h2>

</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

- `number`修饰符：
  - 默认情况下，在输入框中无论输入字母还是数字，都被认为字符串处理
  - 如果希望是数字类型，最好直接将内容数字处理
  - number修饰符可以让输入框中的内容转成数字类型

- `trim`修饰符：
  - trim修饰符可以去除两侧空格

## -------------------------------

### 2.计算属性

#### 2.1 基本使用

```html

<div id="app">
  <h2>{{firstName + ' ' + lastName}}</h2>
  <h2>{{firstName}} {{lastName}}</h2>
  <h2>{{getFullName()}}</h2>
  <h2>{{fullName}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      firstName: 'Lebron',
      lastName: 'James'
    },
    computed: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName;
      }
    },
    methods: {
      getFullName() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  })
</script>
```

#### 2.2 复杂操作

```html

<div id="app">
  <h2>总价格：{{totalPrice}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      books: [
        {id: 110, name: 'Unix编程艺术', price: 119},
        {id: 111, name: '代码大全', price: 105},
        {id: 112, name: '深入理解计算机原理', price: 98},
        {id: 113, name: '现代操作系统', price: 87},
      ]
    },
    computed: {
      totalPrice: function () {
        let result = 0
        for (let i = 0; i < this.books.length; i++) {
          result += this.books[i].price
        }
        return result

        // for (let i in this.books) {
        //   result += this.books[i].price
        // }
        //
        // for (let book of this.books) {
        //
        // }


      }
    }
  })
</script>
```

![Alt Text](/images/31e807a6d1eb47e79cbef21546aefff2.png)

#### 2.3 setter和getter

- 很好理解的`setter`和`getter`
- 一般只是用`getter`来读取，而`setter`不常用

```html

<div id="app">
  <h2>{{fullName}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      firstName: 'kobe',
      lastName: 'Bryant'
    },
    computed: {
      // fullName:function (){
      //   return this.firstName + ' ' + this.lastName;
      // },
      // name: 'coderwhy',
      //计算属性一般是没有set方法，只读属性
      fullName: {
        set: function (newValue) {
          console.log("---------" + newValue);
          const names = newValue.split(' ');
          this.firstName = names[0];
          this.lastName = names[1];
        },
        get: function () {
          return this.firstName + ' ' + this.lastName;
        }
      },
      // fullName:function () {
      //     return this.firstName + ' '  + this.lastName;
      //   }
    }
  })
</script>
```

#### 2.4 缓存

- `methods` 和 `computed`都可以实现功能
- 计算属性会进行缓存，如果多次使用时，计算属性只调用一次
- `computed`效率高

```html

<div id="app">
  <!-- 1. 直接拼接 : 语法过于繁琐3-->
  <h2>{{firstName}} {{lastName}}</h2>

  <!-- 2. 通过定义methods -->
  <h2>{{getFullName()}}</h2>
  <h2>{{getFullName()}}</h2>
  <h2>{{getFullName()}}</h2>
  <h2>{{getFullName()}}</h2>
  <h2>{{getFullName()}}</h2>

  <!-- 3. 通过computed -->
  <h2>{{fullName}}</h2>
  <h2>{{fullName}}</h2>
  <h2>{{fullName}}</h2>
  <h2>{{fullName}}</h2>
  <h2>{{fullName}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      firstName: 'kobe',
      lastName: 'Bryant'
    },
    methods: {
      getFullName() {
        console.log('getFullName');
        return this.firstName + ' ' + this.lastName;
      }
    },
    computed: {
      fullName: function () {
        console.log('fullName');
        return this.firstName + ' ' + this.lastName;
      }
    }
  })
</script>
```

![Alt Text](/images/2b1456ec90c348a5b77acafb02a012d7.png)

### 3. ES6补充

#### 3.1 let/var

- 事实上var的设计可以看成JavaScript语言设计上的错误，但是这种错误多半不能修复和移除，以为需要向后兼容
  - 大概十年前，Brendan Eich 就决定修复这个问题，于是他添加了一个新的关键词：`let`
- 块级作用域
  - JS中使用var来声明一个变量时，变量的作用域主要是和函数的定义有关
  - 针对于其他块定义来说是没有作用域的，比如if/for等，这在我们开发中往往会引起一些问题

- ES5之前因为if和for都没有块级作用域的概念，所以在很多时候，我们都必须借助于function的作用域来解决应用外面变量的问题

```html

<script>
  // 1.变量作用域：变量在什么范围内是可用的
  // {
  //   var name = 'why'
  //   console.log(name);
  // }
  // console.log(name);

  //2.没有块级作用域引起的问题 if 的块级
  // var func;
  // if (true){
  //   var name = 'why';
  //   func = function () {
  //     console.log(name);
  //   }
  //   func()
  // }
  // console.log(name);

  //2.没有块级作用域引起的问题 for 的块级
  var btns = document.getElementsByTagName('button');
  for (var i = 0; i < btns.length; i++) {
    (function (i) {
      btns[i].addEventListener('click', function () {
        console.log('第' + (i + 1) + '个按钮被点击');
      })
    })(i)
  }
  const btns = document.getElementsByTagName('button');
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      console.log('第' + (i + 1) + '个按钮被点击');
    })
  }
</script>
```

#### 3.2 const的使用

- const关键字
  - 将某个变量变为常量
  - 在js中，使用其标识后，不可再次赋值
- 不可修改
- 定义必须赋值

### 4. 购物车案例

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="app">
  <div v-if="books.length">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in books">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.date}}</td>
        <td>{{item.price | showPrice}}</td>
        <td>
          <button @click="decrement(index)" :disabled="item.count <= 1">-</button>
          {{item.count}}
          <button @click="increment(index)">+</button>
        </td>
        <td>
          <button @click="removeHandle(index)">移除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <h2>总价格:{{totalPrice}}</h2>
  </div>
  <h2 v-else>购物车为空</h2>
</div>
<script src="../js/vue.js"></script>
<script src="main.js"></script>
</body>
</html>
```

#### main.js

```js
const app = new Vue({
  el: '#app',
  data: {
    books: [
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2006-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-3',
        price: 128.00,
        count: 1
      }
    ]
  },
  computed: {
    totalPrice() {
      // 1.普通for循环
      let totalPrice = 0;
      // for (let i = 0; i < this.books.length; i++) {
      //   totalPrice += this.books[i].count * this.books[i].price;
      // }
      // return totalPrice;

      //2. for(let i in this.books)
      // for (let i in this.books) {
      //   totalPrice += this.books[i].count * this.books[i].price;
      // }
      // return totalPrice;

      // for(let i in/of this.books)
      for (let item of this.books) {
        console.log(i);
        totalPrice += item.count * item.price;
      }
      return totalPrice;
    },
  },
  methods: {
    // getFinalPrice(price){
    //   return '￥'+ price.toFixed(2);
    // }
    increment(index) {
      this.books[index].count++;
    },
    decrement(index) {
      this.books[index].count--;
    },
    removeHandle(index) {
      this.books.splice(index, 1)
    }
  },
  filters: {
    showPrice(price) {
      return '￥' + price.toFixed(2);
    }
  }
})
```

#### style.css

```css
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}

th, td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
```

#### 效果图

![Alt Text](/images/1719a220723845b883cf70849a14f3d1.png)
![Alt Text](/images/531b61ce07da4086a879718e32a56b09.png)
如果为空
![Alt Text](/images/28888730103149d9a66df0523f0f2285.png)

### 5. JavaScript高阶函数

#### filter()

```js
const nums = [10, 20, 30, 40, 50, 222, 50, 15]
let newNums = nums.filter(function (n) {
  return n >= 100;
})
//newNums = [10, 20, 40, 50]
```

#### map()

```js
const newNums = [10, 20, 40, 50]
let new2Nums = newNums.map(function (n) {
  return n * 2;
})
//new2Nums= [20, 40, 80, 100]
```

#### reduce()

```js
new2Nums = [20, 40, 80, 100]
let total = new2Nums.reduce(function (preValue, n) {
  return preValue + n;
}, 0)
//240
```

#### 综合

```js
const nums = [10, 20, 111, 222, 444, 40, 50]

let total = nums.filter(function (n) {
  return n < 100;
}).map(function (n) {
  return n * 2;
}).reduce(function (preValue, n) {
  return preValue + n;
}, 0)

console.log(total);
```

#### 简化

```js
const nums = [10, 20, 111, 222, 444, 40, 50]
let total = nums.filter(n => n < 100).map(n => n * 2).reduce((pre, n) => pre + n);
console.log(total);
```

# Vue

## 1. 组件化开发

### 1.1 基本使用过程

- 注册组件的基本步骤：
  - 创建组件
  - 注册组件
  - 使用组件

---

- `Vue.extend()`:
  - 调用`Vue.extend()`创建的是一个组件构造器。
  - 通常在创建组件构造器时，传入`template`代表我们自定义组件的模板
  - 改模板就是在使用到组件的地方，要显示的HTML代码
- `Vue.component()`:
  - 调用`Vue.component()`是将刚才的组件构造器注册为一个组件，并且给它起一个组件的标签名称
  - 所以需要传递两个参数：1、注册组件的标签名 2、组件构造器
- 组件必须挂载在某个Vue实例下。否则他不会生效

![Alt Text](/images/5a33043163de488e962b4ab590fc9a7e.png)

```html

<div id="app">
  <!-- 3.使用组件 -->
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
</div>
<script src="../js/vue.js"></script>
<script>
  //1.创建爱你组件构造器对象
  const cpnC = Vue.extend({
    template: `
        <div>
          <h2>我是标题</h2>
          <p>我是内容，哈哈哈</p>
          <p>我是内容，呵呵呵</p>
        </div>`
  })
  //2.注册组件
  Vue.component('my-cpn', cpnC);

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

### 1.2 全局组件和局部组件

- 全局组件：在Vue实例外注册，可以在多个Vue的实例下使用
- 局部组件：在Vue实例内注册，可以在其Vue的实例下使用

```html

<div id="app2">
  <cpn></cpn>
</div>
<div id="app">
  <!-- 3.使用组件 -->
  <cpn></cpn>
  <cpn></cpn>
</div>
<script src="../js/vue.js"></script>
<script>
  //1.创建爱你组件构造器对象
  const cpnC = Vue.extend({
    template: `
        <div>
          <h2>我是标题</h2>
          <p>我是内容，哈哈哈</p>
        </div>`
  })
  //2.注册组件(全局组件，意味着可以在多个Vue的实例下使用)
  // Vue.component('cpn', cpnC);

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      //cpn 使用组件时的标签名（局部组件）
      cpn: cpnC
    }
  })
  const app2 = new Vue({
    el: '#app2'
  })
</script>
```

### 1.3 父组件和子组件

```html

<div id="app">
  <cpn2></cpn2>
</div>
<script src="../js/vue.js"></script>
<script>
  //1. 创建第一个组件
  const cpnC1 = Vue.extend({
    template: `
      <div>
        <h2>我是标题1</h2>
        <p>我是内容1</p>
      </div>
    `
  })

  //2. 创建第二个组件
  const cpnC2 = Vue.extend({
    template: `
      <div>
        <h2>我是标题2</h2>
        <p>我是内容2</p>
        <cpn1></cpn1>
      </div>`,
    components: {
      cpn1: cpnC1
    }
  })

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      cpn2: cpnC2
    }
  })
</script>
```

### 1.4 注册组件的语法糖写法

- 省去`Vue.extend()`

```html

<div id="app">
  <cpn1></cpn1>
  <cpn2></cpn2>
</div>
<script src="../js/vue.js"></script>
<script>
  // 1. 全局组件注册的语法糖
  // 1. 创建组件构造器
  // const cpn1 = Vue.extend()
  // 2. 注册组件
  //全局组件
  Vue.component('cpn1', {
    template: `
      <div>
        <h2>我是标题1</h2>
        <p>我是内容1</p>
      </div>
    `
  });

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    //注册局部组件的语法糖
    components: {
      'cpn2': {
        template: `
            <div>
              <h2>我是标题2</h2>
              <p>我是内容2</p>
            </div>
          `
      }
    }
  })
</script>
```

![Alt Text](/images/3b1e41b795814644b85616fbe0e266d0.png)

### 1.5 组件模板抽离

- script标签
- template标签

```html

<div id="app">
  <cpn></cpn>
  <cpn></cpn>
  <cpn></cpn>
</div>
<!--1. script标签，注意：类型必须是text/x-template-->
<script type="text/x-template" id="cpn">
  <div>
    <h2>我是标题2</h2>
    <p>我是内容2</p>
  </div>
</script>
<!--2.template标签-->
<template id="cpn1">
  <div>
    <h2>我是标题2</h2>
    <p>我是内容2</p>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>

  //1.注册一个组件
  Vue.component('cpn', {
    template: '#cpn1'
  })

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

### 1.6 组件中的data

```html

<div id="app">
  <cpn></cpn>
</div>
<template id="cpn">
  <div>
    <h2>{{counter}}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  Vue.component('cpn', {
    template: '#cpn',
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      increment() {
        this.counter++;
      },
      decrement() {
        this.counter--;
      }
    }
  })
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    }
  })
</script>
```

### 1.7 父子组件通信

#### 父传子

- 方法
  - 通过`props`向子组件传递数据
  - 通过事件向父组件发送消息
    ![Alt Text](/images/98d2ffc959d14529b3dde68911515262.png)
- **Vue实例和子组件的通信 和 父组件和子组件的通信**过程是一样的

##### props

- 不要用驼峰标识 v-bind无法识别，如必须使用`:c-info="info"` 组件内用驼峰`cInfo`
- 在组件中，使用选项props来声明需要从父级接收到的数据。
- props的值有两种方式：
  - 方式一：字符串数组，数组中的字符串就是传递时的名称
  - 方式二：对象，对象可以设置传递时的类型，也可以设置默认值等

---

**props数据验证**

- 支持的类型
  - `String`
  - `Number`
  - `Boolean`
  - `Array`
  - `Object`
  - `Date`
  - `Function`
  - `Symbol`

```html

<div id="app">
  <cpn :cmovies="movies" :cmessage="message"></cpn>
</div>
<template id="cpn">
  <div>
    <ul>
      <li v-for="item in cmovies">{{item}}</li>
    </ul>
    <h2>{{cmessage}}</h2>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  //父传子 props
  const cpn = {
    template: '#cpn',
    // props: ['cmovies','cmessage'],
    props: {
      //1.类型限制
      // cmovies: Array,
      // cmessage: String,

      //2.提供一些默认值
      cmessage: {
        type: String, //类型
        default: 'aaaaa',  //默认值
        required: true
      },
      //类型是对象或者数组时，默认值必须是一个函数
      cmovies: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
  }

  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      movies: ['海王', '海贼王', '海尔兄弟']
    },
    components: {
      cpn,
    }
  })
</script>
```

#### 子传父

**自定义事件**

- `$emit`

```html
<!--父组件模板-->
<div id="app">
  <cpn @item-click="cpnClick"></cpn>
</div>

<!--子组件模板-->
<template id="cpn">
  <div>
    <button v-for="item in categories" @click="itemClick(item)">
      {{item.name}}
    </button>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  //子组件
  const cpn = {
    template: '#cpn',
    data() {
      return {
        categories: [
          {id: 'aaa', name: '热门推荐'},
          {id: 'bbb', name: '手机数码'},
          {id: 'ccc', name: '家用家电'},
          {id: 'ddd', name: '电脑办公'},
        ]
      }
    },
    methods: {
      itemClick(item) {
        this.$emit('item-click', item)
        // console.log(item);
      }
    }
  }

  //父组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      movies: ['海王', '海贼王', '海尔兄弟']
    },
    components: {
      cpn,
    },
    methods: {
      cpnClick(item) {
        console.log('aaaaa', item);
      }
    }
  })
</script>
```

#### 父子组件通信案例

```html

<div id="app">
  <cpn :number1="num1"
       :number2="num2"
       @num1change="num1change"
       @num2change="num2change"></cpn>
</div>

<template id="cpn">
  <div>
    <h2>props:{{number1}}</h2>
    <h2>data:{{dnumber1}}</h2>
    <!--    <input type="text" v-model="dnumber1">-->
    <input type="text" :value="dnumber1" @input="num1Input">
    <h2>props:{{number2}}</h2>
    <h2>data:{{dnumber2}}</h2>
    <!--    <input type="text" v-model="dnumber2">-->
    <input type="text" :value="dnumber2" @input="num2Input">
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      num1: 1,
      num2: 0
    },
    methods: {
      num1change(value) {
        this.num1 = parseInt(value);
      },
      num2change(value) {
        this.num2 = parseInt(value);
      }
    },
    components: {
      cpn: {
        template: '#cpn',
        props: {
          number1: Number,
          number2: Number
        },
        data() {
          return {
            dnumber1: this.number1,
            dnumber2: this.number2,
          }
        },
        methods: {
          num1Input(event) {
            this.dnumber1 = event.target.value;
            this.$emit('num1change', this.dnumber1);

            this.dnumber2 = this.dnumber1 * 100;
            this.$emit('num2change', this.dnumber2);
          },
          num2Input(event) {
            this.dnumber2 = event.target.value;
            this.$emit('num2change', this.dnumber2);

            this.dnumber1 = this.dnumber2 / 100;
            this.$emit('num1change', this.dnumber1)
          },
        }
      }
    },

  })
</script>
```

#### watch监听改变

```js
 watch:{
  dnumber1(newValue)
  {
    this.dnumber2 = newValue * 100;
    this.$emit('num1change', newValue);
  }
,
  dnumber2(newValue)
  {
    this.dnumber1 = newValue * 100;
    this.$emit('num2change', newValue);
  }
}
,
```

#### 父子组件的访问方式: $children

- 父组件访问子组件：使用`$children`或`$refs`(引用)
- 子组件访问父组件：使用`$parent`

##### 父访问子

```html

<div id="app">
  <cpn></cpn>
  <cpn></cpn>
  <cpn ref="aaa"></cpn>
  <button @click="btnClick">按钮</button>
</div>
<template id="cpn">
  <div>我是子组件</div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    methods: {
      btnClick() {
        //1.关于$children
        // console.log(this.$children);
        // for(let c of this.$children){
        //   console.log(c.name);
        //   c.showMessage();
        // }

        //2.$refs
        console.log(this.$refs);

      }
    },
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            name: '我是子组件的name'
          }
        },
        methods: {
          showMessage() {
            console.log('showMessage');
          }
        }
      }
    }
  })
</script>
```

##### 子访问父

```html

<div id="app">
  <cpn></cpn>
</div>
<template id="cpn">
  <div>
    <h2>我是cpn组件</h2>
    <ccpn></ccpn>
  </div>
</template>
<template id="ccpn">
  <div>
    <h2>我是子组件</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            name: '我的cpn组件的name'
          }
        },
        components: {
          ccpn: {
            template: '#ccpn',
            methods: {
              btnClick() {
                //1.访问父组件
                console.log(this.$parent);
                console.log(this.$parent.name);

                //2.访问根组件$root
                console.log(this.$root);
                console.log(this.$root.message);
              }
            },
          }
        }
      }
    }
  })
</script>
```

## 2. 组件化高级

### 2.1 slot 插槽

#### 2.1.1 基本使用

1. 插槽的基本使用`<slot></slot>`
2. 插槽的默认值`<slot>button</slot>`
3. 多个值同时放入到组件中，则一起组我诶替换元素

```html
<!--1. 插槽的基本使用<slot></slot>-->
<!--2. 插槽的默认值<slot>button</slot>-->
<!--3. 多个值同时放入到组件中，则一起组我诶替换元素-->
<div id="app">
  <cpn>
    <button>案例</button>
  </cpn>
  <cpn>
    <span>哈哈哈</span>
  </cpn>
  <cpn>
    <i>哈哈哈</i>
    <div>我是div元素</div>
    <p>我是p元素</p></cpn>
  <cpn>
    <button>新按钮</button>
  </cpn>
  <cpn></cpn>
</div>
<template id="cpn">
  <div>
    <h2>我是组件</h2>
    <p>我是组件，哈哈哈</p>
    <!--设置默认值-->
    <slot>
      <button>默认按钮</button>
    </slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      cpn: {
        template: '#cpn',
      }
    }
  })
</script>
```

#### 2.1.2 具名插槽

- 多个插槽，区分通过添加`name`

```html

<div id="app">
  <cpn>
    <button slot="left">返回</button>
    <span slot="center">标题</span>
  </cpn>
</div>
<template id="cpn">
  <div>
    <slot name="left"><span>左边</span></slot>
    <slot name="center"><span>中间</span></slot>
    <slot name="right"><span>右边</span></slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      cpn: {
        template: '#cpn'
      }
    }
  })
</script>
```

### 2.2 编译作用域

```html

<div id="app">
  <cpn v-show="isShow"></cpn>
</div>
<template id="cpn">
  <div>
    <h2>我是子组件</h2>
    <p>我是内容，哈哈哈</p>
    <button v-show="isShow">按钮</button>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！',
      isShow: true
    },
    components: {
      cpn: {
        template: '#cpn',
        data() {
          return {
            isShow: true
          }
        }
      }
    }
  })
</script>
```

### 2.3 作用域插槽

```html

<div id="app">
  <cpn></cpn>
  <cpn>
    <!--<span v-for="item in pLanguages"></span>-->
    <template slot-scope="slot">
      <!--      <span v-for="item in slot.data"> {{item}}- </span>-->
      <span>{{slot.data.join(' - ')}}</span>
    </template>
  </cpn>

  <cpn>
    <!--<span v-for="item in pLanguages"></span>-->
    <template slot-scope="slot">
      <!--      <span v-for="item in slot.data"> {{item}}* </span>-->
      <span>{{slot.data.join(' * ')}}</span>
    </template>
  </cpn>
</div>
<template id="cpn">
  <div>
    <slot :data="pLanguages">
      <ul>
        <li v-for="item in pLanguages">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊！'
    },
    components: {
      cpn: {
        template: "#cpn",
        data() {
          return {
            pLanguages: ['JavaScript', 'C++', 'Java', 'C#', 'Python', 'Go', 'Swift']
          }
        }
      }
    }
  })
</script>
```

![Alt Text](/images/ac91df29eeb94196a4a0e37750df4eaf.png)

::: tip 发布时间:
2021-07-24
:::
