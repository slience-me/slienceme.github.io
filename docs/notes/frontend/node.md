# Nodejs相关指令

是否使用nvm去控制版本 [相关链接](/notes/devops/nvm-nodejs.md)

```bash
# 安装
npm install <模块名>
npm install crypto-js --save // --save 参数表示将模块写入 package.json 文件中

# 卸载
npm uninstall crypto-js

# 查看 查看列表
npm list // -g 全局
# 查看某个模块版本
npm list <模块名>

# 更新
npm update  //更新 node_moudules 中所有模块
npm update <模块名> // 更新某个

# 设置国内镜像源
npm config set registry https://registry.npmmirror.com/

# 查看源
npm config get registry
    
# 设置官方源
npm config set registry https://registry.npmjs.org/

# cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install crypto-js --save

# require
const crypto = require('crypto-js');
const module = require('模块名'); // 一般前端做项目的话 这里命名是常量 不允许修改
```
