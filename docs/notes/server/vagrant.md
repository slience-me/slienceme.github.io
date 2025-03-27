# 虚拟机virtualbox与vagrant的使用

## 1. 虚拟机安装与基本使用

由于VMware虚拟机收费，所以使用了[virtualbox](https://www.virtualbox.org/)，
镜像文件通过[vagrant镜像地址](https://portal.cloud.hashicorp.com/vagrant/discover)
网站进行下载  [vagrant下载地址](https://www.vagrantup.com/)  安装后USB可能不可用，记得下载拓展兼容包

执行 `vagrant init centos/7` 命令后，Vagrant 在当前目录下创建一个 `Vagrantfile` 文件。该文件是Vagrant的配置文件，定义了虚拟机的配置信息。

具体内容：

- Vagrant提示你当前目录已经生成了一个 `Vagrantfile`，它会用来定义你虚拟机的配置。
- 现在你可以通过 `vagrant up` 命令启动虚拟机，启动后Vagrant会自动下载指定的 box（比如这里的 `centos/7`），并且根据
  `Vagrantfile` 的配置来创建并启动虚拟机。

```bash
# 1.检查和编辑 Vagrantfile
# 如果你需要修改虚拟机的配置，可以编辑生成的 `Vagrantfile`。比如，你可以更改虚拟机的网络配置、共享文件夹等。
vagrant up      # 启动虚拟机
vagrant ssh     # 登录虚拟机
vagrant halt    # 停止虚拟机 
vagrant destroy # 销毁虚拟机
```

## 2. 虚拟机网络设置

如果需要修改网卡IP:

1. 首先需要去`cmd`通过指令`ipconfig`，查看一下虚拟机的网络IP地址，
2. 去`Vagrantfile`文件中修改`config.vm.network "private_network", ip: "192.168.56.10"`中的IP地址，然后重新启动虚拟机
   `vagrant reload`即可。
3. 连接虚拟机检查是否修改成功：`vagrant ssh`, 后`ip addr`查看, 可以尝试ping通。
