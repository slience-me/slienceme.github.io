**在项目index.html中放上
生产环境下自动加载**


**src下可以把文件放到自己服务器，本地加载**
```html
 <% if(htmlWebpackPlugin.options.isProd){ %>
          <script src='file/20220519/vue.min.js' type='text/javascript'></script>
          <script src='file/20220519/vue-router.min.js' type='text/javascript'></script>
          <script src='file/20220519/vuex.min.js' type='text/javascript'></script>
          <script src='file/20220519/axios.min.js' type='text/javascript'></script>
        <% } %>
```

