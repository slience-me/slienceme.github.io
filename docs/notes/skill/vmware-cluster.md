# 基于VMware的虚拟机集群搭建

> 该集群采用镜像`ubuntu-20.04.6-live-server-amd64`构建集群
>
> 我使用的虚拟机版本为`VMware Workstation Pro 17`

## 1. 安装Vmware

这个教程居多，网上搜索即可

## 2. 构建虚拟机

**新建虚拟机**

![image-20250317160428945](/images/vmware-cluster/image-20250317160428945.png)

**选择典型后，下一步**

![image-20250317160532322](/images/vmware-cluster/image-20250317160532322.png)

**选择稍后安装操作系统，下一步，后面非重要部分，不再语言提示**

![image-20250317160716026](/images/vmware-cluster/image-20250317160716026.png)

![image-20250317160824417](/images/vmware-cluster/image-20250317160824417.png)

![image-20250317160955742](/images/vmware-cluster/image-20250317160955742.png)

![image-20250317161141504](/images/vmware-cluster/image-20250317161141504.png)

![image-20250317161210598](/images/vmware-cluster/image-20250317161210598.png)

## 3. 安装Linux

![image-20250317161553374](/images/vmware-cluster/image-20250317161553374.png)

![image-20250317161729665](/images/vmware-cluster/image-20250317161729665.png)

![image-20250317161840826](/images/vmware-cluster/image-20250317161840826.png)

![image-20250317162032527](/images/vmware-cluster/image-20250317162032527.png)

![image-20250317162053545](/images/vmware-cluster/image-20250317162053545.png)

![image-20250317162114568](/images/vmware-cluster/image-20250317162114568.png)

![image-20250317162219485](/images/vmware-cluster/image-20250317162219485.png)

![image-20250317162239059](/images/vmware-cluster/image-20250317162239059.png)

![image-20250317162323147](/images/vmware-cluster/image-20250317162323147.png)

![image-20250317162409725](/images/vmware-cluster/image-20250317162409725.png)

![image-20250317162419917](/images/vmware-cluster/image-20250317162419917.png)

![image-20250317162431064](/images/vmware-cluster/image-20250317162431064.png)

![image-20250317162505727](/images/vmware-cluster/image-20250317162505727.png)

![image-20250317162556846](/images/vmware-cluster/image-20250317162556846.png)

![image-20250317162631973](/images/vmware-cluster/image-20250317162631973.png)

![image-20250317162645237](/images/vmware-cluster/image-20250317162645237.png)

![image-20250317162922477](/images/vmware-cluster/image-20250317162922477.png)

![image-20250317163505309](/images/vmware-cluster/image-20250317163505309.png)

![image-20250317163635130](/images/vmware-cluster/image-20250317163635130.png)

![image-20250317163726429](/images/vmware-cluster/image-20250317163726429.png)

![image-20250317163746924](/images/vmware-cluster/image-20250317163746924.png)

**下面就是漫长的等待**

**安装成功**

![image-20250317164138254](/images/vmware-cluster/image-20250317164138254.png)

**输入你的账户密码启动**

![image-20250317164155988](/images/vmware-cluster/image-20250317164155988.png)

## 4. 网络配置

需要共享电脑的网络给虚拟机，

打开控制面板 `win + R`，输入`control`

![image-20250317164817683](/images/vmware-cluster/image-20250317164817683.png)

![image-20250317164848875](/images/vmware-cluster/image-20250317164848875.png)

**在这里需要注意，你使用的是Wifi还是网线，找到对应的网络适配器，以Wifi为例**

![image-20250317165017431](/images/vmware-cluster/image-20250317165017431.png)

![image-20250317165123548](/images/vmware-cluster/image-20250317165123548.png)

![image-20250317165146310](/images/vmware-cluster/image-20250317165146310.png)

![image-20250317165215225](/images/vmware-cluster/image-20250317165215225.png)

![image-20250317165230257](/images/vmware-cluster/image-20250317165230257.png)

**回到VMware，设置虚拟网络编辑器**

![image-20250317165331789](/images/vmware-cluster/image-20250317165331789.png)

![image-20250317165428664](/images/vmware-cluster/image-20250317165428664.png)

![image-20250317165535238](/images/vmware-cluster/image-20250317165535238.png)

![image-20250317165553382](/images/vmware-cluster/image-20250317165553382.png)

![image-20250317165621828](/images/vmware-cluster/image-20250317165621828.png)

![image-20250317165738507](/images/vmware-cluster/image-20250317165738507.png)

**尝试**`ping www.baidu.com`

![image-20250317165844337](/images/vmware-cluster/image-20250317165844337.png)

然后关机 `shutdown now`

## 5. 开始克隆

![image-20250317170027056](/images/vmware-cluster/image-20250317170027056.png)

![image-20250317170044085](/images/vmware-cluster/image-20250317170044085.png)

![image-20250317170057490](/images/vmware-cluster/image-20250317170057490.png)

![image-20250317170115555](/images/vmware-cluster/image-20250317170115555.png)

![image-20250317170158182](/images/vmware-cluster/image-20250317170158182.png)

![image-20250317170218280](/images/vmware-cluster/image-20250317170218280.png)

**根据实际情况 选择克隆的个数**

**克隆完成**

![image-20250317170353501](/images/vmware-cluster/image-20250317170353501.png)

**开机前需要修改一下MAC地址**

![image-20250317182900331](/images/vmware-cluster/image-20250317182900331.png)

**生成新的MAC地址**

![image-20250317182913703](/images/vmware-cluster/image-20250317182913703.png)

## 6. 初始化系统

启动全部的虚拟机，启动过程比较卡顿，需要等待

### 6.1 开放root账户

进入系统后，输入用户名密码

![image-20250317170848184](/images/vmware-cluster/image-20250317170848184.png)

需要打开root用户权限

输入指令`sudo -i` ，启用root用户，输入你的密码

![image-20250317171104618](/images/vmware-cluster/image-20250317171104618.png)

然后输入指令`passwd`，修改root密码

![image-20250317171301917](/images/vmware-cluster/image-20250317171301917.png)

每台设备都是相同的操作

### 6.2 SSH服务

首先判断一下，系统的sshd是否安装成功

执行指令 `systemctl status sshd`， 这样就算成功了

![image-20250317180954200](/images/vmware-cluster/image-20250317180954200.png)

### 6.3 设置静态IP

修改配置文件，每个电脑版本可能不同，但是路径相同，以我的为例：

可以先备份一下旧的 `cp /etc/netplan/00-installer.yaml /etc/netplan/00-installer.yaml-before`

`vim /etc/netplan/00-installer-config.yaml`

```yaml
network:
  ethernets:
    ens33:
      addresses: [ 192.168.137.130/24 ]
      gateway4: 192.168.137.2
      dhcp4: false
      nameservers:
        addresses: [ 114.114.114.114, 8.8.8.8 ]
  version: 2
```

应用配置：`netplan apply`

查看是否配置成功：`ip addr`

为了更好的控制服务器，我使用远程连接的方式，去管理

我使用的软件是

![image-20250317172106992](/images/vmware-cluster/image-20250317172106992.png)

### 6.4 镜像源 host 主机名

远程连接后：

![image-20250317185927828](/images/vmware-cluster/image-20250317185927828.png)

我将使用MobaXterm的多重执行功能：

![image-20250317190003104](/images/vmware-cluster/image-20250317190003104.png)

![image-20250317190040051](/images/vmware-cluster/image-20250317190040051.png)

**镜像源**

国内的话，最好换一个系统镜像源，使用[阿里的开源镜像源](https://developer.aliyun.com/mirror/)
也行，进入后选择对应的系统，[Ubuntu的镜像源](https://developer.aliyun.com/mirror/ubuntu)

注意root权限，否则需要加sudo

修改源文件名称 `cp/etc/apt/sources.list /etc/apt/sources.list.old`

新创建文件`vim /etc/apt/sources.list`，将对应的内容复制进去即可(注意需要对应版本)

例如我的是：

![image-20250317181554705](/images/vmware-cluster/image-20250317181554705.png)

可以顺手更新一下软件`apt update`

**主机名**

修改主机名称，`hostnamectl set-hostname 新主机名`

例如：

- `hostnamectl set-hostname k8s-node1`
- `hostnamectl set-hostname k8s-node2`
- `hostnamectl set-hostname k8s-node3`

控制台输入 `/bin/bash`，刷新一下名称 `root@原来的 -> root@新的`

**host**

修改host `vim /etc/hosts`, 修改`127.0.1.1`的后面为对应的名称

另外最后面需要加上

```bash
192.168.137.130 k8s-node1
192.168.137.131 k8s-node2
192.168.137.132 k8s-node3
```

修改后，可以尝试ping一下，是否修改成功

> 这些都完成后，需要拍摄一个快照，方便出现问题恢复到这个位置

![image-20250317191918336](/images/vmware-cluster/image-20250317191918336.png)

等待完成后，集群的初始化任务就完成了

后边的内容写在中间件 kubernates 部分
