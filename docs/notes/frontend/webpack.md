﻿# Webpack官网

[官网链接](https://webpack.docschina.org/)

## 1. 认识webpack

- 一个线代的`JavaScript`应用的静态**模块打包**工具
  ![Alt Text](/images/a2d4ae5c957e4d97baaaecaa962a67dc.png)

## 2. webpack的安装

管理员模式运行cmd

```
npm i -g webpack
npm i -g webpack-cli
```

![Alt Text](/images/346031446cd34d96a9832bfd9777a1ff.png)

## 3. webpack的起步

- 打包 入口文件 -o 保存路径
- `webpack ./src/main.js -o ./dist/bundle.js`

![Alt Text](/images/86722f0202244d998c998e525db3438b.png)
配置打包文件开发模式、生产模式

```js
module.exports = {
  // mode: 'production',
  mode: 'development',
}
```

- `main.js`

```js
//1. 使用commonjs模块化规范
const {add, mul} = require('./mathUtils')
console.log(add(20, 30));
console.log(mul(20, 30));

//2. 使用ES6的模块化的规范
import {name, age, height} from './info'

console.log(name);
console.log(age);
console.log(height);
```

- `info.js`

```js
//ES6导出
export const name = 'why';
export const age = 18;
export const height = 1.88;
```

- `mathUtils.js`

```js
function add(num1, num2) {
  return num1 + num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

//commonjs导出
module.exports = {
  add,
  mul
}
```

## 4. webpack的配置

1. 创建`webpack.config.js`
   ```js
   const path = require('path')
   module.exports={
   
     entry:'./src/main.js',    //入口
     output:{
       path: path.resolve(__dirname,'dist'), //动态获取绝对路径
       filename: 'bundle.js'
     },   //出口
     mode: 'development',//'production' 模式
   }
   ```
2. 输入命令，得到`package.json`文件
   `scripts`的脚本在执行时，查找命令的顺序为：
   先找本地的`node_modules/.bin`路径中对应的命令
   如果没找到,会去全局的环境变量中寻找
   ```
   npm init
   ```
   这里边的`scripts`，`命令名:指令`,之后用到`npm run build`
   `devDependencies`开发时依赖
   `dependencies`生产环境依赖
   ```json
   {
     "name": "meetwebpack",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build": "webpack"
     },
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "webpack": "^3.6.0"
     },
     "dependencies": {
       "webpack": "^3.6.0"
     }
   }
   ```
   在终端或者cmd都是全局环境打包
   局部环境：在终端输入 `./node_modules/webpack`执行
3. `npm install webpack@3.6.0 --save-dev`
   `--save-dev	`是开发时依赖，项目打包不需再使用

## 5. loader的使用

我们需要加载`css`、图片，也包括一些高级的将`ES6`转换成`ES5`代码，将`TypeScript`转换成`ES5`代码，将`scss`、`less`转成`css`，将
`.jsx`、`.vue`文件转成`.js`文件等等
![Alt Text](/images/a58cf92d242a49d7ae794737bc0bea43.png)

### 5.1 css文件的处理

1. 通过`npm`安装需要使用的`loader`
   两个建议一起使用注意版本兼容
   ```
   npm install --save-dev css-loader@3.4.2
   npm install --save-dev style-loader@1.1.3
   ```
2. 在`webpack.config.js`中的`modules`关键字下进行配置
   入门文件依赖一下
   ```js
   //依赖css文件
   require('./css/normal.css')
   ```
   ```js
   const path = require('path')
   module.exports = {
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js'
     },   //出口
     module: {
       rules: [
         {
           test: /\.css$/i,
           //位置不能更改，底层是从右向左读取
           //css-loader只负责将css文件进行加载
           //style-loader负责将样式添加到DOM中
           use: ["style-loader", "css-loader"],
         },
       ],
     }
   }
   ```

### 5.2 less文件的处理

1. 通过`npm`安装需要使用的`loader`
   两个建议一起使用注意版本兼容
   ```
   npm install --save-dev less-loader@5.0.0
   npm install --save-dev less@3.11.1
   ```
2. 在`webpack.config.js`中的`modules`关键字下进行配置
   入门文件依赖一下
   ```js
   //依赖less文件
   require('./css/special.less')
   ```
   ```js
   const path = require('path')
   module.exports = {
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js'
     },   //出口
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"],
         },
         {
           test: /\.less$/i,
           loader: [
             // compiles Less to CSS
             'style-loader',
             'css-loader',
             'less-loader',
           ],
         },
       ],
     },
   }
   ```

### 5.3 图片文件的处理

1. 通过`npm`安装需要使用的`loader`
   两个建议一起使用注意版本兼容
   ```
   npm install --save-dev file-loader@5.0.2
   npm install --save-dev url-loader@3.0.0
   ```
2. 在`webpack.config.js`中的`modules`关键字下进行配置
   入门文件依赖一下
   ```js
   body {
       /*background-color: red;*/
       background: url("../img/1.jpg");
   }
   ```
   `publicPath:'dist/'`防止找不到，`index.html`与不在`dict`文件夹时
   ![Alt Text](/images/e1241d4847304c73b15ed358640ad1f6.png)

   `name: 'img/[name].[hash:8].[ext]'`
   `img`:文件要打包的文件夹
   `name`:获取原来的图片名，放在该位置
   `hash:8`:添加hash，保留8位
   `ext`: 使用图片原来的扩展名
   `limit: 8192` 限制大小8kb

   ```js
   const path = require('path')
   module.exports = {
   
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js',
       publicPath:'dist/'
     },   //出口
     module: {
       rules: [
         {
           test: /\.(png|jpg|gif|jpeg)$/,
           use: [
             {
               loader: 'url-loader',
               options: {
                 //当加载的图片，小于limit时，会将图片编译成base64字符串格式  单位 byte  8kb
                 //当加载的图片，大于limit时，需要使用file-loader模块进行加载
                 name: 'img/[name].[hash:8].[ext]'
                 limit: 8192
                 // limit: 30000
               }
             }
           ]
         },
       ],
     },
   }
   ```

### 5.4. ES6转ES5的babel

1. 安装
   ```
   npm install --save-dev babel-loader@8.0.6  @babel/core @babel/preset-env
   ```
2. 在`webpack.config.js`中的`modules`关键字下进行配置
   入门文件依赖一下
   ```js
   //依赖less文件
   require('./css/special.less')
   ```
   ```js
   const path = require('path')
   module.exports = {
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js'
     },   //出口
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: ["style-loader", "css-loader"],
         },
         {
           test: /\.js$/,
           // exclude:排除
           // include:包含
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env'] 
             }
           }
         },
       ],
     },
   }
   ```

## 6. webpack中配置Vue

### 未抽离app.vue

1. 引入`vue.js`
   ```
   npm install vue --save
   ```
2. 写一些代码

   ```js
   import Vue from 'vue';
   new Vue({
     el: '#app',
     data:{
       message:'Hello Webpack!'
     }
   })
   ```

   ```html
   <div id="app">
     <h2>{{message}}</h2>
   </div>
   ```

3. 配置`webpack.config.js`
   `runtime-only`->代码中，不可以有任何的`template`
   `runtime-compiler`->代码中，可以有`compiler`可以用于编译`template`
   配置`resolve`，指定内容
   `extensions`:忽略文件扩展名可以直接引用名字`app.js -> import app`
   ```js
   module.exports = {
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js',
       publicPath:'dist/'
     },   //出口
     resolve:{
        extensions:['.js','.css','.vue'],
       //别名
       alias:{
         'vue$': 'vue/dist/vue.esm.js'
       }
     }
   }
   ```

---

### 抽离为app.vue

1. 安装注意版本号^13.0.0
   ```
   npm install --save-dev vue-loader vue-template-compiler
   ```
2. 配置
   ```js
   const path = require('path')
   module.exports = {
     entry: './src/main.js',    //入口
     output: {
       path: path.resolve(__dirname, 'dist'), //动态获取路径
       filename: 'bundle.js'
     },   //出口
     module: {
       rules: [
         {
           test: /\.vue$/,
           use:['vue-loader']
         },
       ],
     },
   }
   ```

![Alt Text](/images/d6e93db159464a21b2564b5fb64539d9.png)

## 7. plugin的使用

`loader`转换器 ，`plugin` 扩展器
`plugin` 使用过程

1. 通过`npm`安装需要使用的`plugin`
2. 在`webpack.config.js`中的`plugin`中配置插件

### 7.1 添加版权的Plugin

插件名`BannerPlugin`,属于webpack自带的插件

```js
const path = require('path')
var webpack = require('webpack');
module.exports = {
  entry: '',
  output: {},
  module: {},
  resolve: {},
  plugins: [
    new webpack.BannerPlugin('最终解释权规slience_me所有!')
  ],
}
```

![Alt Text](/images/09deb530079c492fafc7b6f33d7f93a9.png)

### 7.2 打包html的Plugin

作用：

1. 自动生成一个index.html文件
2. 将打包的js文件，自动通过script标签插入到body

---
安装插件版本3.2.0

```
npm install html-webpack-plugin --save-dev
```

使用插件，修改`webpack.config.js`文件中的`plugins`部分的内容如下：

1. 这里的`template`表示根据什么模板来生成`index.html`
2. 另外，我们要删除之前在`output`中添加的`publicPath`属性
3. 否则插入的`script`标签中的`src`可能出问题

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   plugins:[
       new HtmlWebpackPlugin({
         template:'index.html'
       })
     ],
   ```

### 7.3 js压缩的Plugin

安装插件版本^1.0.0

```
npm install uglifyjs-webpack-plugin --save-dev
```

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
plugins:[
  new UglifyjsWebpackPlugin()
]
```

## 8. 搭建本地服务器

### 搭建服务器

安装

```
npm install --save-dev webpack-dev-server@3.10.3
```

`devserver`也是作为webpack中的一个选项，选项本身可以设置如下属性

- `contentBase`：为哪一个文件夹提供本地服务，默认是根文件夹，这里写./dist
- `port`:端口号
- `inline`：页面实时刷新
- `historyApiFallback`：在SPA页面中，依赖HTML5的history模式

```js
devServer:{
  contentBase: './dist',
    inline
:
  true
}
,
```

```js
"scripts"
:
{
  "test"
:
  "echo \"Error: no test specified\" && exit 1",
    "build"
:
  "webpack",
    "dev"
:
  "webpack-dev-server"
}
,
```

### 配置文件分离

安装

```
npm install webpack-merge --save-dev 
```

#### dev.config.js

```js
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config')
module.exports = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    inline: true
  }
})
```

#### prod.config.js

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.config')
module.exports = webpackMerge.merge(baseConfig, {
  mode: 'production',
  plugins: [
    new UglifyjsWebpackPlugin()
  ]
})
```

#### base.config.js

```js
const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',    //入口
  output: {
    path: path.resolve(__dirname, '../dist'), //动态获取路径
    filename: 'bundle.js',
    // publicPath:'dist/'
  },   //出口
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        loader: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载的图片，小于limit时，会将图片编译成base64字符串格式  单位 byte
              //当加载的图片，大于limit时，需要使用file-loader模块进行加载
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
              // limit: 30000
            }
          }
        ]
      },
      {
        test: /\.js$/,
        // exclude:排除
        // include:包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.css', '.vue'],
    //别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.BannerPlugin('最终解释权规slience_me所有!'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

```

### package.json

```js
"scripts"
:
{
  "test"
:
  "echo \"Error: no test specified\" && exit 1",
    "build"
:
  "webpack --config build/prod.config.js",
    "dev"
:
  "webpack-dev-server --open --config ./build/dev.config.js"
}
,
```

::: tip 发布时间:
2021-07-29
:::
