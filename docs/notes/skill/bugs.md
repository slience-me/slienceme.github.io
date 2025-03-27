# 问题BUG合集

## 1 findfont: Generic family 'sans-serif' not found

> 详细问题：findfont: Generic family 'sans-serif' not found because none of the following families were found: simhei

```text
这个警告通常表示Matplotlib在绘制图时无法找到指定的字体。在你的情况中，警告指出找不到'sans-serif'（无衬线字体），可能是由于缺少相应的字体文件。
要解决这个问题，你可以尝试安装中文字体并告诉Matplotlib使用这些字体。以下是一种解决方法：

1. 安装中文字体： 在Linux系统上，你可以使用以下命令安装中文TrueType字体（例如，SimHei）：
  
sudo apt-get install fonts-wqy-zenhei

在Windows系统上，你可以下载并安装中文TrueType字体，然后将字体文件路径添加到Matplotlib的配置中。

2. 告诉Matplotlib使用中文字体： 在你的代码中添加以下内容：

import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = ['SimHei']  # 使用中文宋体

将上述两行代码放在绘图代码之前，这样Matplotlib就会使用指定的中文字体。
如果你在使用Jupyter Notebook等环境，可以将这两行代码放在Notebook的开头，以确保在绘图之前设置好字体。
请注意，确保字体文件路径正确，以及选择的字体是否与你的系统兼容。如果你使用其他字体，请相应地更改字体名称。
```

## 2 Cannot find a valid baseurl for repo: base/7/x86_64

> 详细问题：Cannot find a valid baseurl for repo: base/7/x86_64

1. 先测试网络连通性`ping www.baidu.com`
2. 通过 vi 命令编辑 `/etc/yum.repos.d/CentOS-Base.repo` 文件，将其中的 `mirrorlist` 行用 # 号注释掉，并将 baseurl
   行取消注释，并修改为其他可靠的镜像地址。
3. 指令`sudo vi /etc/yum.repos.d/CentOS-Base.repo`
4. 如将下图四个 baseurl 地址按顺序修改为阿里云的镜像地址：

> baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
> baseurl=http://mirrors.aliyun.com/centos/$releasever/updates/$basearch/
> baseurl=http://mirrors.aliyun.com/centos/$releasever/extras/$basearch/
> baseurl=http://mirrors.aliyun.com/centos/$releasever/centosplus/$basearch/
