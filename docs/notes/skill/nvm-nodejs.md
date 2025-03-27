# 安装不同版本的nodejs环境以及版本切换

## 方案一：(简单版)直接安装不同的版本nodejs

假如你要安装以下两个版本node

![image-20240202105908677](/images/image-20240202105908677.png)

建议先安装低版本的node

选择安装路径为`C:\Program Files\nodejs\v10.14.2\`,进行安装，一直下一步即可，安装包会自动添加环境变量

安装完成后，更改文件名称`v10.14.2`为`nodejsv10.14.2`，否则安装高版本会覆盖低版本的内容，环境变量已经指明安装路径了

更改完文件名后，安装高版本的node

选择安装路径为`C:\Program Files\nodejs\v18.19.0\`,进行安装，一直下一步即可，安装包会自动添加环境变量

环境变量中，添加这个`C:\Program Files\nodejs\v18.19.0\`和`C:\Program Files\nodejs\v10.14.2\`

![image-20240202110534144](/images/image-20240202110534144.png)

在需要更改激活的node版本时候，修改`C:\Program Files\nodejs\`中文件的文件名即可，比如我现在想要激活版本`v18.19.0`，我将文件夹
`v10.14.2`更改为`nodejsv10.14.2`即可，环境变量就找不到10版本的了，因此就18版本生效

## 方案二：(一劳永逸版)安装node版本管理工具nvm

[点击下载链接](https://github.com/coreybutler/nvm-windows/releases)

根据自己电脑版本选择安装包

![image-20240202111041463](/images/image-20240202111041463.png)

安装过程中，选择nvm的安装路径，然后选择原始node的安装路径(可以直接下一步)，出现了某版本已安装，是否交给nvm管理，点击是即可
建议使用1.1.12版本, 最新的版本存在路径bug

NVM常用命令

`nvm list ` ：查看已安装的Node版本

`nvm use 10.14.2`：切换Node版本(以10.14.2版本为例)

`nvm -v`：查看NVM的版本

`nvm node_mirror https://npm.taobao.org/mirrors/node/`
：配置下载源（最新的源可能改变为`https://npmmirror.com/mirrors/node/`）

`nvm install 18.19.0`：下载Node(以18.19.0版本为例，通过多次下载可以下载多个版本的Node) 注意: 安装前记得切换到指定磁盘,否则会失败
`ctrl D`退出Node命令行

注意可能需要去安装路径下修改`settings.txt`文件，将`node_mirror`和`npm_mirror`的地址修改为淘宝镜像地址

```
root: D:\temp_environment\nvm
path: D:\temp_environment\nodejshub
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

::: tip 发布时间:
2024-02-02
:::
