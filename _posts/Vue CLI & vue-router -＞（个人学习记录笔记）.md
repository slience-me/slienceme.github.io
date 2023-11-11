@[toc]
# Vue
## 1. vue-vli脚手架
### 1.1 介绍与安装
CLI是什么意思？
- CLI是 COmmand-Line Interface，翻译为命令行界面，俗称脚手架
- Vue CLI是一个官方发布vue.js项目脚手架
- 使用vue-cli可以快速搭建Vue开发环境以及对应的webpack配置
---
安装脚手架
```
npm install -g @vue/cli
```
拉取脚手架2

```
npm install @vue/cli-init -g
```
### 1.2 项目初始化
Vue CLI2初始化项目
```
vue init webpack my-project
```
Vue CLI3初始化项目
```
vue create my-project
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/16a5eea229024cb49f2698019fb5fb48.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/35f8e4b823d3489e982093c3eb9cb2e0.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/b408b15b51e241478b2999bc78ee468c.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/41f95311690040f085837e279c0ce745.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
## 2. 回顾箭头函数
### 2.1 基本使用

```html
<script>
        //箭头函数：也是一种定义函数的方式
        //1. 定义函数的方式:function
        const aaa = function(){

        }

        //2.对象字面量中定义函数
        const obj = {
            bbb: function(){

            },
            ccc(){

            }
        }

        //3. ES6中的箭头函数
        // const ccc = (参数列表) =>{
        // }
        const ddd = () => {

        }
    </script>
```
### 2.2 参数和返回值

```html
<script>
  //1. 参数问题
  //1.1 两个参数
  const sum = (num1, num2) => {
    return num1 + num2;
  }
  //1.2 一个参数
  const power = num => {
    return num * num;
  }

  // 2.函数中的代码数量问题
  // 2.1 函数代码块中有多行代码时
  const test = () => {
    //1. 打印HelloWorld
    console.log('Hello World');

    //2. 打印HelloVuejs
    console.log('Hello Vuejs');
  }

  // 2.2 函数代码块中只有一行代码
  // const mul = (num1, num2) => {
  //   return num1 * num2;
  // }
  const mul = (num1, num2) => num1 +num2;
  console.log(mul(20, 30));

  // const demo = () => {
  //   console.log('hello Demo');
  // }
  const demo = () => console.log('hello Demo');
  console.log(demo());
</script>
```
### 2.3 this指向

```html
<script>
  // 什么时候使用箭头
  // setTimeout(function (){
  //   console.log(this);
  // },1000)
  //
  //this = window
  //
  // setTimeout(() => {
  //   console.log(this);
  // }, 1000)

  //结论：箭头函数中的this引用就是最近作用域中的this
  //想外层作用域中，一层层查找this，直到有this的定义
  const obj = {
    aaa() {
      setTimeout(function (){
        setTimeout(function (){
          console.log(this); //windows
        })
        setTimeout(() => {
          console.log(this);//windows
        }, 1000)
      },1000)

      setTimeout(() => {
        setTimeout(function (){
          console.log(this); //windows
        })
        setTimeout(() => {
          console.log(this);//obj对象
        }, 1000)
      }, 1000)
    }
  }
  obj.aaa()
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f6f3352f8ba4ba4ae6bca025c051049.png)
## 3. 路由
- 路由(`routing`)就是通过互联的网络把信息从源地址传输到目的地址的活动

阶段
前后端不分离阶段 - > 前后端分离阶段 -> 单页面富应用阶段SPA
整个网页就只有一个`html`页面

---
两种修改路由的方式
`location.hash= 'home'`  不会刷新网页
`history.pushState({},'','home')` 不会刷新网页 类似栈结构`history.back()` 可以回退上一个页面
类似历史记录的功能
`history.replaceState()`就没法后退了上一个页面
`history.go(-1)` 前进(正数) 后退(负数)
`history.back(1)`  后退
`history.forword(1)` 前进

### 3.1 vue-router安装与配置
1. 安装vue-router
	```
	npm install vue-router --save
	```
2. 在模块化工程中使用它(因为他是一个插件，所有可以通过Vue.use()来安装路由功能)
	导入路由对象，并且调用Vue.use(VueRouter)
	创建路由示例,并且传入路由映射配置
	在Vue实例中挂载创建的路由实例 
---

```js
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 1.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

//2. 创建路由VueRouter对象
const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }
]
const router = new VueRouter({
  //配置路由和组件之间的应用关系
  routes
})
//3.将router对象传入到Vue实例
export default router;
```

### 3.2 vue-router基本使用
#### 基本使用
使用vue-router的步骤：
1. 创建路由组件
2. 配置路由映射:组件和路径映射关系
3. 使用路由:通过`<router-link>` 跳转功能和`<router-view>`占位内容显示位置
	```js
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	import Home from "../components/Home";
	import About from "../components/About";
	
	// 1.通过Vue.use(插件)，安装插件
	Vue.use(VueRouter)
	
	//2. 创建路由VueRouter对象
	const routes = [
	  {
	    path: '/home',
	    name: 'Home',
	    component: Home
	  },
	  {
	    path: '/about',
	    name: 'About',
	    component: About
	  },
	
	]
	
	const router = new VueRouter({
	  //配置路由和组件之间的应用关系
	  routes
	})
	//3.将router对象传入到Vue实例
	export default router;
	
	```
	![在这里插入图片描述](https://img-blog.csdnimg.cn/524ed7cacd5046aab43a9c46324a6540.png)
---
#### router-link
属性:
- `to` : 属于指定跳转的路径
- `tag` : tag可以指定`<router-link>`之后渲染成什么组件
- `replace` : replace不会留下history记录, 指定后不会返回到上一个页面中
- `active-class`:当`<router-link>`对应的路由匹配成功时，会自动给当前元素设置一个`router-link-active`的`class`，设置`active-class`可以修改默认的名称。
	- 在进行高亮显示的导航栏菜单或者底部`tabbar`时，会使用到该类
	- 但是通常不会修改该类的属性，会直接使用默认的`router-link-active`即可
```html
<div id="app">
 <router-link to="/home" tag="button">首页</router-link>
 <router-link to="/about">关于</router-link>
 <router-view></router-view>
</div>
```
#### router-view
占位内容显示位置

#### 重定向

```js
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  }
]
```
#### 修改路由模式hash->history
`linkActiveClass`全局修改活跃的属性
```js
const router = new VueRouter({
  routes,
  mode:'history'
  linkActiveClass:'active
})
```
#### 不用router-link
但是目前相同页面会报错
 - `this.$router.push('/home');` 采用的是`pushState()`
 - `this.$router.replace('/home');`采用的是`replaceState()`
```html
<template>
  <div id="app">
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    homeClick(){
      // this.$router.push('/home');
      this.$router.replace('/home');
      console.log('homeClick');
    },
    aboutClick(){
      // this.$router.push('/about');
      this.$router.replace('/about');
      console.log('aboutClick');
    }
  }
}
</script>
```
### 3.3  vue-router动态路由
- `:userId`

配置路由
```js
  {
    path: '/user/:userId',
    name: 'User',
    component: User
  },
```
App.vue
```html
<template>
  <div id="app">
    <h2>我是App组件</h2>
    <router-link to="/home" tag="button" >首页</router-link>
    <router-link to="/about" tag="button" >关于</router-link>
    <router-link :to="/user/+userId" tag="button" >用户</router-link>
    <br>
    <img :src="imgURL" alt="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      userId:'lisi',
      imgURL:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
    }
  }
}
</script>
```
User.vue

- `$route`:当前活跃路由
- `$router`:路由对象
```html
<template>
  <div>
    <h2>我是用户界面</h2>
    <p>我是用户的相关信息,嘿嘿嘿</p>
    <h2>{{userId}}</h2>
    <h2>{{$route.params.userId}}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  computed:{
    userId(){
      return this.$route.params.userId;
    }
  }
}
</script>

<style scoped>

</style>

```
### 3.4 懒加载
当打包构建应用时，JavaScript包会非常大，影响页面加载
把不同的路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件

一个路由对应一个js文件

懒加载方式,动态导入

```js
const Home = () => import('../components/Home.vue')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/e516bdac3e4b4d0685175b7872c5c68f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

### 3.5 vue-router路由嵌套
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f35d76651eb4baa93a850348b60a330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

```js
const HomeNews = () => import("../components/HomeNews");
const HomeMessage = () => import("../components/HomeMessage");
```

```js
{
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
```

```html
<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容，哈哈哈</p>
    <router-link to="/home/news" tag="button" >新闻</router-link>
    <router-link to="/home/message" tag="button" >消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>
<style scoped>

</style>
```

### 3.6 vue-router参数传递
两种类型:params和query
params的类型:
- 配置路由格式:`/router/:id`
- 传递的方式: 在path后面跟上对应的值
- 传递后形成的路径:`/router/123,/router/abc`

query的类型:
- 配置路由格式：`/router`，也就是普通配置
- 传递的方式:对象中使用query的key作为传递方式
- 传递后形成的路径:`/router?id=123, /router?id=abc`

```html
<template>
  <div>
    <h2>我是Profile组件</h2>
    <p>{{$route.query}}</p>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>
```
```js
{
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
```

```html
<!--    <router-link to="/profile" tag="button">档案</router-link>-->
<router-link :to="{path :'/profile',query:{name:'slience',ahe:18,height:1.88}}" tag="button">档案</router-link>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/be14a974ffbd46cd943d5a8f2ffc8263.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

### 3.7 vue-router导航守卫
#### 全局守卫

功能：    `<title>05-learnvuerouter</title>`动态修改
mata：元数据，描述数据的数据

```js
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'个人中心'
    },
  },
```
获取路由修改内容动态，修改title
导航钩子
```js
//前置钩子(hook)(守卫)
router.beforeEach((to, from, next) => {
  //从from跳到to
  document.title = to.matched[0].meta.title
  next()
})
```

```js
//后置钩子不需要next()
router.afterEach((to,from) => {
  
})
```
#### 路由独享的守卫
[官网](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
你可以在路由配置上直接定义 beforeEnter 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

#### 组件内的守卫
最后，你可以在路由组件内直接定义以下路由导航守卫：

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 3.8 keep-alive
-  `keep-alive`是Vue内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染。
- `router-view`也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存

属性
- `include` - 字符串或正则表达式，只有匹配的组件会被缓存
- `exclude` - 字符串或正则表达式，任何匹配的组件都不会被缓存
```html
<keep-alive exclude="Profile,User">
  <router-view></router-view>
</keep-alive>
```

Vue生命周期
![在这里插入图片描述](https://img-blog.csdnimg.cn/7b17137bd90f4a9c84eb2a591611f480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

