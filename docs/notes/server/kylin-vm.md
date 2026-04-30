
# 虚拟化环境搭建（Kylin V10）

> 适用于：
> ✔ ARM / x86（部分包 ARM 专用） <br>
> ✔ 离线 / 内网环境 <br>
> ✔ QEMU + KVM + SPICE 图形化虚拟化


## 一、安装基础依赖

```bash
# ======================================== 编译环境 ========================================
yum -y install \
gcc gcc-c++ make automake libtool \
zlib-devel glib2-devel bzip2-devel \
libuuid-devel libaio-devel \
pixman-devel openssl-devel \
libjpeg-turbo-devel opus-devel \
gnutls-devel libgcrypt \
usbredir-devel python2 python3

# ARM 平台固件（仅 ARM 需要）
yum -y install edk2-aarch64.noarch
```


## 二、安装 SPICE 协议

::: tip

用于虚拟机图形化（类似远程桌面增强）
:::


### 2.1 安装 spice-protocol

```bash
tar -xf spice-protocol-0.14.1.tar.bz2
cd spice-protocol-0.14.1

./configure
make -j$(nproc)
make install

cd ..
```


### 2.2 安装 spice

```bash
tar -xf spice-0.14.3.tar.bz2
cd spice-0.14.3

./configure
make -j$(nproc)
make install

cd ..
```


## 三、安装 QEMU（核心）


### 3.1 解压源码

```bash
tar -xf qemu-4.2.1.tar.bz2
cd qemu-4.2.1
```


### 3.2 配置环境变量（重要）

```bash
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/usr/local/share/pkgconfig
```

👉 建议写入：

```bash
echo 'export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/usr/local/share/pkgconfig' >> /etc/profile
source /etc/profile
```


### 3.3 编译安装

```bash
./configure \
--prefix=/usr/local/qemu \
--enable-kvm \
--enable-vnc \
--enable-spice \
--enable-gnutls \
--enable-debug

make -j$(nproc)
make install
```


## 四、配置 QEMU 兼容 libvirt

👉 否则 virt-install 找不到 qemu

```bash
ln -sf /usr/local/qemu/bin/qemu-system-aarch64 /usr/bin/qemu-kvm
ln -sf /usr/local/qemu/bin/qemu-system-aarch64 /usr/libexec/qemu-kvm

# SPICE 库
ln -sf /usr/local/lib/libspice-server.so.1 /lib64/libspice-server.so.1
```


## 五、安装虚拟化管理工具

```bash
# 核心组件
yum -y install libvirt virt-install

# 可选图形工具
yum -y install virt-manager virt-viewer
```


### 启动服务

```bash
systemctl start libvirtd
systemctl enable libvirtd
systemctl status libvirtd
```


## 六、验证 KVM 是否可用

```bash
lsmod | grep kvm
```

👉 如果为空：

```bash
modprobe kvm
modprobe kvm_intel   # Intel CPU
modprobe kvm_arm     # ARM CPU
```


## 七、安装 VNC（远程图形）

> 默认端口：5901（对应 :1）
> 示例密码：`Aw197!@#`


### 7.1 安装 VNC

```bash
yum install -y tigervnc tigervnc-server
```


### 7.2 配置服务

```bash
cp /lib/systemd/system/vncserver@.service /etc/systemd/system/vncserver@:1.service
vim /etc/systemd/system/vncserver@:1.service
```

👉 修改关键项：

```ini
[Service]
User=root
ExecStart=
ExecStart=/usr/bin/vncserver :1 -geometry 1280x800 -depth 24
```


### 7.3 设置密码

```bash
vncpasswd
```


### 7.4 启动服务

```bash
systemctl daemon-reload
systemctl start vncserver@:1
systemctl enable vncserver@:1
systemctl status vncserver@:1
```


### 7.5 防火墙

```bash
# （建议只放行端口）
firewall-cmd --add-port=5901/tcp --permanent
firewall-cmd --reload
```

👉 ⚠️ 不建议直接关闭防火墙


## 八、常见问题


### 8.1 virt-install 报错找不到 qemu

👉 原因：路径未映射

```bash
ln -sf /usr/local/qemu/bin/qemu-system-* /usr/bin/qemu-kvm
```


### 8.2 无法使用 KVM（性能很差）

👉 检查 CPU 虚拟化：

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

👉 BIOS 未开启虚拟化


### 8.3 VNC 黑屏

👉 常见原因：

* 没有桌面环境
* 没启动 X11


### 8.4 SPICE 不生效

👉 检查：

```bash
ldconfig -p | grep spice
```


## 九、实用命令


### 9.1 网络配置

```bash
nmtui
```

👉 配置文件：

```bash
/etc/sysconfig/network-scripts/ifcfg-ensXXX
```


### 9.2 查看虚拟机

```bash
virsh list --all
```


### 9.3 启动虚拟机

```bash
virsh start vm-name
```


### 9.4 关闭虚拟机

```bash
virsh shutdown vm-name
```
