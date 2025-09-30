# Linux相关指令

## 1. 常见指令

[跳转=>具体的指令笔记(基础)](/notes/hidden/linux-basic)

[跳转=>具体的指令笔记(高级)](/notes/hidden/linux-advanced)

```bash
# 查看相关进程
ps aux|grep uwsgi(管道过滤)
netstat -unltp | grep nginx(管道过滤)
whoami
ps -ef | grep "uwsgi"

# 查询端口占用状态
lsof -i:端口号

# 杀死进程
kill -9 进程号

# 查看sudo操作
cat /var/log/auth.log | grep sudo

# 更改文件的所有者和所属组
chown [新的所有者用户名]:[新的所属组名] [文件名]
chown newuser:newgroup example.txt

# 更改文件的权限 `u` 表示所有者权限，`go` 表示所属组和其他用户权限，`rw` 表示读取和写入权限，`r` 表示只读权限。
# -R 包括子文件操作
chmod [权限设置] [文件名]
chmod u=rw,go=r example.txt
chmod 644 example.txt

# 查看命令的手册页
man

# 查看命令的详细信息
info

#打印文本或变量
echo 

# 设置环境变量
export PATH=$PATH:/new/directory

## 常用命令
ls -l
cd
pwd
mkdir
rm -rf
cp    # cp file.txt /path/to/destination 复制文件或目录
mv    # mv file.txt /new/path/ 移动文件或目录
cat   # cat file.txt  连接文件并打印到标准输出设备上
more  # less largefile.txt  分页显示文件内容
less
head  # head -n 10 file.txt  显示文件开头或结尾的内容
tail
# 详细看 3.5 常用日志查看指令

## 系统信息
uname        # 显示系统信息 uname -a
lsb_release  # 显示发行版信息 lsb_release -a
hostname     # 显示主机名 hostname
cat /etc/os-release      # 查看当前的版本
cat /etc/debian_version  # 查看当前的 Debian 版本

## 系统操作
shutdown    # 关机或重启系统 shutdown -h now
reboot      # 重新启动系统 reboot

## 用户相关
su      	# 切换用户 su root
who         # 显示当前登录用户信息

useradd     # 添加新用户 useradd -m newuser
userdel     # 删除用户 userdel -r newuser
passwd      # 修改用户密码 passwd [选项] 用户名 -l 禁用账号 -u 口令解锁 -d 使账号无口令 -f 强迫用户下次登录时修改口令。

## 文件相关
chmod       # 修改文件权限 chmod 777 file.txt
chown       # 修改文件所有者和所属组 chown newuser:newgroup file.txt
find        # 在文件系统中查找文件 find / -name "*.txt"

## 程序相关
ps          # 显示进程状态 ps -ef | grep "uwsgi"
kill        # 终止进程 kill -9 1234
top         # 实时显示系统运行进程信息 top
vmstat      # 显示虚拟内存统计信息 vmstat 1 5

## 网络相关
ifconfig    # 显示网络接口信息 ifconfig -a
ping        # 测试与目标主机之间的连通性 ping www.baidu.com
netstat     # 显示网络状态信息 netstat -an
netstat -antlp
netstat -tuln | grep :80  # 网络状态命令，用于显示计算机网络的连接、路由表、接口统计等信息
# -t: 显示 TCP 连接。
# -u: 显示 UDP 连接。
# -l: 仅显示正在监听的端口。
# -n: 使用数字地址而不是解析主机名（即不显示域名，显示数字 IP 和端口号）。
lsof -i :80 # 列出打开文件的命令，在 Linux 中一切都被视为文件（包括网络连接）

## 其他
date        # 显示系统日期和时间
tar         # 压缩和解压文件
gzip/gunzip # 压缩和解压缩文件

## 系统管理
traceroute  # 显示数据包到达目标主机所经过的路由信息 traceroute www.baidu.com
iftop       # 显示网络带宽使用情况 iftop
systemctl   # 管理系统服务
journalctl  # 查询和检查系统日志

## 系统监控
iostat      # 显示系统IO统计信息 iostat -x 1
free        # 显示系统内存使用情况 free -m
df          # 显示文件系统使用情况 df -h  

## 软件管理
dpkg        # 安装、更新和卸载软件包 dpkg -i package.deb
apt         # 软件包管理器 apt install package
yum         # 软件包管理器 yum install package

##  系统配置
crontab     # 配置系统定时任务 crontab -e / -l
vi/vim       # 编辑文件 vi/vim file.txt
sudo        # 以管理员身份执行命令 sudo command

# 先将本地yum仓库换成阿里云的yum仓库
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
yum makecache
```

> 这里补充windows dos常用指令，不再单独创建新文件

```bash
netstat -anof   				# 查看网络开放端口
netstat -anof | findstr 9000	# 查看网络开放端口9000  可以得到进程ID
tasklist						# 查看全部进程
tasklist | findstr 进程ID			# 查看进程ID程序源
ping 
```

## 2. 用户相关指令

```bash
# ==============================
# 1. 用户管理 (User Management)
# ==============================

useradd -m newuser                   # 添加新用户 (同时创建主目录)
useradd -u 1001 -g users -s /bin/bash -c "Test User" newuser # 添加新用户并指定 UID、GID、默认 shell、描述信息
useradd -r sysuser                   # 添加一个系统用户 (不登录)
useradd -d /opt/myhome newuser       # 添加用户并设置家目录位置
passwd newuser                       # 设置用户密码
usermod -s /bin/zsh newuser          # 修改用户属性 (例如修改默认 shell)
usermod -l newname oldname           # 修改用户名
usermod -u 2000 newuser              # 修改用户 UID
usermod -d /home/newhome -m newuser  # 修改用户的家目录 (并移动旧目录下的文件)
usermod -L newuser                   # 锁定用户 (禁止登录)
passwd -l newuser                    # 锁定用户 (禁止登录)
usermod -U newuser                   # 解锁用户
passwd -u newuser                    # 解锁用户
userdel newuser                      # 删除用户 (保留家目录)
userdel -r newuser                   # 删除用户及其家目录

# ==============================
# 2. 用户组管理 (Group Management)
# ==============================

groupadd developers            # 新建用户组
usermod -aG developers newuser # 添加用户到组
usermod -g developers newuser  # 修改用户主组
groups newuser                 # 查看用户所属组
id newuser                     # 查看用户所属组
groupdel developers            # 删除用户组

# ==============================
# 3. 权限与切换用户 (Permissions & Switch User)
# ==============================

su - newuser                   # 切换用户 (需要密码)
sudo -i -u newuser             # 切换用户 (root 免密码)
sudo ls /root                  # 临时以 root 权限执行命令
chown newuser:developers /data/file  # 修改文件/目录所属用户和组
chmod 755 /data/file           # 修改权限 (读写执行 rwx = 421)  =mode & ~umask

# ==============================
# 4. 查看用户信息 (User Info)
# ==============================

id newuser                     # 查看用户 UID / GID / 组信息
finger newuser                 # 查看用户详细信息 # 可能需要安装 finger
cat /etc/passwd                # 查看所有用户
cat /etc/group                 # 查看所有组
cat /etc/shadow                # 查看 shadow 密码文件 (root)

# ==============================
# 5. 特殊案例 (Special Cases)
# ==============================

useradd -u 0 -o admin          # 创建一个 UID 为 0 的用户 (等于 root，危险!)
passwd admin

visudo                         # 添加 sudo 权限 (编辑 sudoers 文件)
                							 # 在文件中添加一行:  newuser ALL=(ALL) ALL  
usermod -aG sudo newuser       # 或者直接写入 sudo 组
```

## 3. 配置相关

### 3.1 目录介绍

```bash
# Linux根目录下每个文件夹的功能
/bin:   # 存放二进制可执行文件
/boot:  # 存放系统引导必需的文件
/dev:   # 存放设备文件
/etc:   # 存放系统配置文件
/home:  # 存放所有用户文件的根目录
/lib:   # 存放系统共享库和内核模块
/media: # 用于挂载可移动媒体设备
/mnt:   # 用于临时挂载文件系统
/opt:   # 用于存放可选的软件包
/proc:  # 虚拟文件系统,存放系统运行时信息
/root:  # 超级用户目录
/run:   # 存放系统运行时所需的文件
/sbin:  # 存放二进制可执行文件,只有root才能访问
/srv:   # 存放服务启动之后需要提取的数据
/sys:   # 虚拟文件系统,存放系统运行时信息
/tmp:   # 用于存放各种临时文件
/usr:   # 用于存放共享文件
/var:   # 用于存放运行时需要改变数据的文件
/lost+found:   # 用于存放系统异常退出时保存的文件
/media/cdrom:  # 挂载光盘时的默认目录
/media/floppy: # 挂载软盘时的默认目录
/media/usb:    # 挂载U盘时的默认目录
/media/usb0:   # 挂载U盘0时的默认目录
```

```bash
apt-get install name  # 安装
apt-get update name   # 更新
apt-get remove name   # 卸载
apt-cache search name # 查找

systemctl start <service_name>  	# 启动服务
systemctl stop <service_name>  		# 停止服务
systemctl restart <service_name>  	# 重启服务
systemctl reload <service_name>  	# 重新加载服务配置
systemctl status <service_name>  	# 查看服务状态
systemctl enable <service_name>  	# 启用服务开机自启
systemctl disable <service_name>  	# 禁用服务开机自启
systemctl is-enabled <service_name> # 查看服务是否启用自启动
systemctl reboot 				    # 重启系统
systemctl poweroff  				# 关机
systemctl suspend  					# 挂起系统
systemctl hibernate  				# 休眠系统
systemctl get-default  				# 查看系统的运行级别
systemctl set-default <target>  	# 设置默认目标
journalctl  						# 查看系统日志
systemctl list-units --type=target  # 查看所有目标
systemctl isolate <target>  		# 切换到指定目标
systemctl list-units --type=service # 列出所有服务单元
systemctl list-units  				# 列出所有已加载的单元
systemctl show <unit_name>  		# 查看某个单元的详细信息
sudo systemctl daemon-reload  		# 重新加载 systemd 配置
sudo systemctl start <unit_file>  	# 启动单元
sudo systemctl stop <unit_file>  	# 停止单元
systemctl status  					# 查看系统信息
systemctl is-active <service_name>  # 查看服务是否正在运行
systemctl list-unit-files --state=enabled  	# 列出所有已启用的服务
systemctl list-unit-files --state=disabled  # 列出所有已禁用的服务
```

### 3.2 配置Linux环境变量

```bash
# 配置Linux环境变量
export PATH=$PATH:/usr/local/bin  # 添加到PATH环境变量中
source ~/.bashrc                  # 使环境变量生效
```

### 3.3 ufw防火墙

```bash
# 配置防火墙操作 【ubuntu】
ufw help  					# 帮助清单
sudo apt install firewalld  # 安装
ufw status    				# 查看防火墙状态和开放的端口
ufw status verbose  	 	# 查看防火墙状态和开放的端口，并显示端口名称
ufw status numbered   		# 查看防火墙状态和开放的端口，并显示端口号
ufw delete 序号  			   # 删除序号规则
ufw delete allow 22  		# 删除指令相关
ufw enable    				# 启动防火墙
ufw disable   				# 关闭防火墙
ufw allow 22
ufw allow 2290:2300/tcp 	# 范围开放端口
ufw allow 80/tcp
ufw reload
ufw allow from 192.168.0.104  # 允许来自xx的连接
ufw allow form 192.168.0.0/24
ufw allow from 192.168.0.104 proto tcp to any port 22
netstat -antp          			# 查看开放端口
ufw default deny incoming   	# 设置默认策略:设置默认拒绝所有传入连接
ufw default allow outgoing  	# 设置默认允许所有传出连接
sudo ufw logging on         	# 启动日志记录
sudo tail -f /var/log/ufw.log  	# 查询日志
```

### 3.3 firewalld防火墙

```bash
sudo apt update && sudo apt install firewalld  # 安装 firewalld
sudo systemctl start firewalld                 # 启动 firewalld 服务
sudo systemctl stop firewalld                  # 停止 firewalld 服务
sudo systemctl restart firewalld               # 重启 firewalld 服务
sudo systemctl status firewalld                # 查看 firewalld 服务状态
sudo systemctl enable firewalld                # 设置 firewalld 服务开机启动
sudo systemctl disable firewalld               # 禁用 firewalld 服务开机启动

sudo firewall-cmd --state                     # 查看防火墙状态（running 或 not running）
sudo firewall-cmd --get-default-zone          # 获取当前防火墙的默认区域
sudo firewall-cmd --set-default-zone=zone_name  # 设置防火墙默认区域
sudo firewall-cmd --zone=zone_name --list-all  # 查看某个区域的详细规则
sudo firewall-cmd --get-active-zones          # 查看当前激活的区域
sudo firewall-cmd --list-services             # 查看当前已启用的服务

sudo firewall-cmd --zone=zone_name --add-service=service_name  # 启用服务（如 http）
sudo firewall-cmd --zone=zone_name --remove-service=service_name  # 禁用服务（如 http）
sudo firewall-cmd --zone=zone_name --add-port=port/tcp   # 启用端口（如 80/tcp）
sudo firewall-cmd --zone=zone_name --remove-port=port/tcp  # 禁用端口（如 80/tcp）
sudo firewall-cmd --zone=public --add-port=22/tcp --permanent
sudo firewall-cmd --zone=public --remove-port=22/tcp --permanent
sudo firewall-cmd --zone=public --add-interface=<接口名> --permanent # 将指定的网络接口（网卡）绑定到 firewalld 的某个区域（zone）

sudo firewall-cmd --permanent --zone=zone_name --add-service=service_name  # 永久添加服务
sudo firewall-cmd --permanent --zone=zone_name --remove-service=service_name  # 永久移除服务
sudo firewall-cmd --permanent --zone=zone_name --add-port=port/tcp  # 永久启用端口
sudo firewall-cmd --permanent --zone=zone_name --remove-port=port/tcp  # 永久禁用端口

sudo firewall-cmd --runtime-to-permanent    # 将当前规则保存为永久规则
sudo firewall-cmd --reload                  # 重新加载防火墙配置
sudo firewall-cmd --list-ports              # 查看所有开放的端口
sudo firewall-cmd --zone=public --list-ports

sudo firewall-cmd --list-all  # 查看当前防火墙规则
sudo firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" port port=80 protocol=tcp accept'  # 开放某个 IP 访问指定端口
sudo firewall-cmd --permanent --remove-rich-rule='rule family="ipv4" source address="192.168.1.100" port port=80 protocol=tcp accept'  # 删除已添加的规则

sudo firewall-cmd --direct --add-rule ipv4 filter INPUT 0 -p tcp --dport 80 -j ACCEPT  # 添加直接规则
sudo firewall-cmd --direct --remove-rule ipv4 filter INPUT 0 -p tcp --dport 80 -j ACCEPT  # 移除直接规则

sudo dpkg-reconfigure tzdata                 # 配置系统时区
sudo timedatectl set-timezone Asia/Shanghai  # 设置时区为中国（上海）

sudo firewall-cmd --zone=public --add-masquerade --permanent  		# 开启命令 masquerade 允许 NAT，让内网设备通过服务器访问外网
sudo firewall-cmd --zone=public --remove-masquerade --permanent 	# 关闭命令
sudo firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=192.168.0.249 --permanent # 让外网访问服务器的80端口，然后 firewalld 转发到 内网设备的 8080
```

### 3.4 查看IP

```bash
# 查看IP 【ubuntu】
ip addr show
ip a
hostname -I  # 最精简的
ifconfig     # 需要安装 apt-get install net-tools
route -n     # 查看网关 

# centos 
ifconfig     # 需要安装 yum install net-tools
```

### 3.5 配置静态IP操作 ubuntu

```bash
# 没有则需要安装
sudo apt install openvswitch-switch -y
sudo systemctl enable --now openvswitch-switch

# 配置静态IP操作 【ubuntu】
cd /etc/netplan
sudo cp 01-network-manager-all.yaml 01-network-manager-all.yaml-before
sudo vim 01-network-manager-all.yaml
------------------------------------------------------------
network:
  version: 2
  ethernets:
    ens3:
      dhcp4: no
      addresses: [192.168.1.100/24]
      routes:
        - to: 0.0.0.0/0
          via: 192.168.1.1
          metric: 100
      nameservers:
        addresses: [114.114.114.114, 8.8.8.8]
-------------------------------------------------------------
sudo netplan apply


# 【centos】
vi /etc/sysconfig/network-scripts/ifcfg-ens33  # 编辑网络配置文件
BOOTPROTO=static         # 设置静态IP
ONBOOT=yes               # 设置自动启用网络连接
IPADDR=192.168.1.100     # 设置IP地址
GATEWAY=192.168.1.254    # 设置网关
DNS1=8.8.8.8             # 设置DNS服务器
service network restart  # 重启网络服务
```

> 注意有一种情况：此文件的配置可能会在每次系统重启时被cloud云文件配置的内容所进行覆盖，可以通过禁用 cloud-init 的网络配置来防止这种情况发生。
>
> 参考[Ubuntu Server 22.04.5 LTS重启后IP被重置问题](https://blog.csdn.net/hjl_and_djj/article/details/144293107)

### 3.6 MySQL(系统级)

```bash
# 配置MySQL操作  【ubuntu】系统
sudo apt install mysql-server  # 安装  也可以指定版本=5.6
sudo mysql_secure_installation  # 初始化操作
------------------------------------
Securing the MySQL server deployment....
Would you like to setup VALIDATE PASSWORD component?
Press y|Y for Yes, any other key for No: (写 NO 不进行密码的强校验)

Skipping....Remove anonymous users? (Press y|Y for Yes, any other key for No) : (选择Y，删除匿名用户)
Normally......Disallow root login remotely? (选择N，允许root远程连接)
By default, Remove test database and access to it? (选择N，不删除test数据库)
Reloading t....Reload privilege tables now? Y (选择Y，修改权限立即生效)

sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
#找到 bind-address 修改值为 0.0.0.0(如果需要远程访问)
# 修改密码
sudo mysql -u root  回车  # 以 root 用户身份登录 MySQL
USE mysql;               # 择 MySQL 数据库

UPDATE user SET authentication_string=PASSWORD('new_password') WHERE User='root';  # 更新 root 用户的密码 
# 在MySQL 8.04前，执行：SET PASSWORD=PASSWORD(‘[新密码]’);但是MySQL8.0.4开始，这样默认是不行的。因为之前，MySQL的密码认证插件是“mysql_native_password”，而现在使用的是“caching_sha2_password”。

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

FLUSH PRIVILEGES;        # 刷新权限：
exit;                    # 退出 MySQL

# 若要让其他主机登录数据库   host='%' 开放访问  host='localhost' 本机访问
USE mysql;  
update user set host='%' where user='root' and host='localhost' limit 1;
FLUSH PRIVILEGES;     
------------------------------------

service mysql start   # 启动MySQL服务
service mysql status  # 查看MySQL状态
service mysql restart  # 重启服务
service mysql stop    # 停止MySQL状态
mysql -u root -p        # 连接MySQL数据库
```

### 3.7 配置uwsgi操作

```bash
# 配置uwsgi操作
uwsgi --ini uwsgi.ini  # 启动uwsgi服务
uwsgi --stop uwsgi.pid  # 停止uwsgi服务
```

### 3.8 安装SSH服务

```bash
# 安装SSH服务 ubuntu
sudo apt-get install openssh-server
ps -e |grep ssh
service ssh start
service ssh status
service ssh restart  # 重启服务

# ssh配置文件
vim /etc/ssh/sshd_config

PermitRootLogin prohibit-password   # 禁止远程ssh
PermitRootLogin yes                 # 允许远程ssh

sudo systemctl daemon-reload   # 刷新配置
```

### 3.9 配置DNS

#### 1）永久修改DNS

修改 `/etc/systemd/resolved.conf` 文件：

```bash
vim /etc/systemd/resolved.conf
```

在文件中找到并修改以下参数： [Alidns](https://www.alidns.com/)

```makefile
# 指定 DNS 服务器，以空格分隔，支持 IPv4 或 IPv6 地址
DNS=8.8.8.8 223.5.5.5 223.6.6.6 2400:3200::1 2400:3200:baba::1
# 阿里DNS 
# IPv4地址：223.5.5.5 223.6.6.6
# IPv6地址：2400:3200::1, 2400:3200:baba::1

# 备用 DNS 服务器
FallbackDNS=8.8.4.4 114.114.114.114 1.1.1.1

# 设置搜索域名
Domains=domain.com

# 设置 LLMNR 是否激活，选项有: yes, no, resolve
# 启用或禁用 Link-Local Multicast Name Resolution (LLMNR)
# LLMNR 允许设备在本地网络中通过广播的方式解析主机名，而不依赖于外部 DNS 服务器
# 对于家庭或小型局域网环境，启用 LLMNR 是有益的，可以通过局域网内的主机名进行快速解析
# 不过，在企业环境中，为了安全考虑，可能更倾向于禁用 LLMNR（设置为 no），以减少潜在的中间人攻击风险
LLMNR=yes

# 设置 MulticastDNS 是否激活，选项有: yes, no, resolve
# 启用或禁用 Multicast DNS (mDNS)
# mDNS 是一种通过多播协议进行局域网内设备发现的机制，常用于没有传统 DNS 服务器的小型网络
# 如果你在局域网中使用 mDNS（例如，家庭网络中的智能设备或打印机），则建议启用 MulticastDNS
# 类似于 LLMNR，在企业环境中，为了减少不必要的网络广播或避免安全问题，通常建议禁用 MulticastDNS
MulticastDNS=yes

# 设置 DNSSEC 是否激活，选项有: yes, no, allow-downgrade
# 启用或禁用 DNS Security Extensions (DNSSEC)，DNSSEC 是用于防止 DNS 攻击（如缓存投毒、域名伪造等）的安全协议
# 启用 DNSSEC 可以有效防止 DNS 投毒攻击，是一种提高 DNS 查询安全性的好方式。
# 如果你对安全有较高要求，特别是在处理敏感数据时，建议启用（yes）。
DNSSEC=yes

# 设置缓存是否激活，选项有: yes, no, no-negative
# 启用 DNS 缓存可以提高查询速度，减少延迟。
# 对于大多数用户，启用缓存（yes）是有益的，特别是在访问相同站点或服务时。
# 如果你希望减少缓存引起的过期记录问题，使用 no-negative 也是一个不错的选择。
Cache=no-negative
```

根据需求修改 `resolved.conf` 文件中的 DNS 配置，然后保存文件。

重启 `systemd-resolved` 服务：

```bash
systemctl restart systemd-resolved
```

设置 `systemd-resolved` 服务开机启动：

```bash
systemctl enable systemd-resolved
```

备份当前的 `resolv.conf` 文件：

```bash
mv /etc/resolv.conf /etc/resolv.conf.bak
```

重新生成 `resolv.conf` 文件的符号链接：

```bash
ln -s /run/systemd/resolve/resolv.conf /etc/
```

**参数解释**

> 这些参数是用于配置 `systemd-resolved` 服务的行为，帮助你优化 DNS 解析、增强网络安全性以及调整缓存等设置。以下是每个参数的详细解释：
>
> ```makefile
> # 设置搜索域名
> # 作用：指定默认的搜索域名。这个设置会在你访问没有指定完全域名的主机时自动附加。例如，如果你设置了 `Domains=example.com`，然后访问 `webserver`，系统会尝试解析 `webserver.example.com`。
> # 使用场景：如果你经常访问某个特定域名下的主机（比如公司内部网络），可以通过这个设置自动附加该域名。
> Domains=domain.com
> 
> # 设置 LLMNR
> # 作用：启用或禁用 **Link-Local Multicast Name Resolution (LLMNR)**。LLMNR 允许设备在本地网络中通过广播的方式解析主机名，而不依赖于外部 DNS 服务器。
> # - `yes`：启用 LLMNR。
> # - `no`：禁用 LLMNR。
> # - `resolve`：只在本地无法通过 DNS 解析时使用 LLMNR。
> # 使用场景：适用于局域网环境，尤其是没有配置完整 DNS 服务器的场合。在没有设置 DNS 的情况下，LLMNR 可帮助你通过主机名进行局域网内的通信。
> LLMNR=yes
> 
> # 设置 MulticastDNS
> # 作用：启用或禁用 **Multicast DNS (mDNS)**。mDNS 是一种通过多播协议进行局域网内设备发现的机制，常用于没有传统 DNS 服务器的小型网络。
> # - `yes`：启用 mDNS。
> # - `no`：禁用 mDNS。
> # - `resolve`：只在无法通过其他 DNS 解析时使用 mDNS。
> # 使用场景：在家庭网络或小型局域网中使用 mDNS 来进行设备发现（例如，通过 `hostname.local` 访问设备）。例如，Apple 的 **Bonjour** 服务使用 mDNS 进行设备自动发现。
> MulticastDNS=yes
> 
> # 设置 DNSSEC
> # 作用：启用或禁用 **DNS Security Extensions (DNSSEC)**，DNSSEC 是用于防止 DNS 攻击（如缓存投毒、域名伪造等）的安全协议。
> # - `yes`：启用 DNSSEC，所有 DNS 请求会验证签名的合法性，增强安全性。
> # - `no`：禁用 DNSSEC。
> # - `allow-downgrade`：如果 DNSSEC 不可用，则允许降级使用普通 DNS（不进行安全验证）。
> # 使用场景：如果你需要提高 DNS 查询的安全性，防止 DNS 相关的安全攻击，可以启用 DNSSEC。适用于有较高安全要求的环境。
> DNSSEC=yes
> 
> # 设置缓存
> # - 作用：控制 DNS 查询结果的缓存行为。
> # - `yes`：启用缓存，DNS 结果会在缓存中存储并在一定时间内复用，减少 DNS 查询的延迟。
> # - `no`：禁用 DNS 缓存。
> # - `no-negative`：仅缓存正向（有效的）DNS 查询结果，不缓存负向查询（即没有找到的域名）。
> # 使用场景：启用缓存可以加快后续的 DNS 查询速度，尤其是在频繁访问相同网站时。如果对 DNS 缓存的准确性有高要求，可以选择禁用缓存或只缓存有效结果。
> Cache=no-negative
> ```

#### 2）临时修改DNS方法

如果只需要临时修改DNS，可以直接编辑 `/etc/resolv.conf` 文件：

```bash
vi /etc/resolv.conf
```

在文件中添加你想使用的 DNS 服务器：

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
```

每行一个 DNS 地址，修改后保存退出即可。此方法修改后即刻生效，但重启后失效。

### 3.10 设置定时任务

```bash
crontab [-u username]　　　　//省略用户表表示操作当前用户的crontab
    -e      (编辑工作表)
    -l      (列出工作表里的命令)
    -r      (删除工作作)
```

### 3.11 硬盘扩容

````bash
root@slienceme-wmware:~# lsblk

```
nvme0n1        40G   # 物理磁盘已扩到 40G
├─nvme0n1p1     953M /boot/efi
├─nvme0n1p2     1.8G /boot
└─nvme0n1p3     17.3G  # LVM PV
  └─ubuntu--vg-ubuntu--lv  10G  /   # 根分区挂载点
```

这说明：

VMware Fusion里你已经把硬盘扩到了 40GB（OK ✅）
但是你的 LVM 逻辑卷（`ubuntu--lv`）还是 10G
剩余的磁盘空间在 `nvme0n1p3` 分区外面，还没有加到 LVM 里

# 扩容步骤（LVM）

我们需要把**多出来的空间**加到 `nvme0n1p3`，再加到 LVM 逻辑卷中。

# 1. 扩展物理分区 nvme0n1p3
注意：修改分区前一定要备份，误操作会导致数据丢失

sudo apt install cloud-guest-utils parted -y

# 查看分区情况
sudo parted /dev/nvme0n1 print

# 扩展第3分区到磁盘末尾
sudo parted /dev/nvme0n1 resizepart 3 100%

# 2. 扩展 LVM 物理卷
sudo pvresize /dev/nvme0n1p3

# 3. 扩展逻辑卷
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv

# 4. 扩展文件系统

# 如果是 `ext4` 文件系统：
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

# 如果是 `xfs` 文件系统：
sudo xfs_growfs /

# 5. 验证
df -h

┌───────────────────────────────┐
│  VMware Fusion 虚拟机扩容流程   │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 1. 关闭虚拟机                   │
│   （必须关机，不能挂起）          │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 2. VMware Fusion 设置 → 硬盘   │
│    Disk size 从 20G 调到 40G   │
│    点击 Apply / 应用            │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 3. 启动虚拟机（Ubuntu）          │
│    查看新磁盘容量：              │
│    lsblk                      │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 4. 扩展 LVM 分区               │
│    sudo parted /dev/nvme0n1   │
│    resizepart 3 100%          │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 5. 扩展 LVM 物理卷              │
│   sudo pvresize /dev/nvme0n1p3│
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 6. 扩展逻辑卷                   │
│    sudo lvextend -l +100%FREE │
│      /dev/ubuntu-vg/ubuntu-lv │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 7. 扩展文件系统                 │
│    (ext4) sudo resize2fs ...  │
│    (xfs)  sudo xfs_growfs /   │
└───────────────────────────────┘
             │
             ▼
┌───────────────────────────────┐
│ 8. 验证                        │
│    df -h                      │
│    根分区容量已变大              │
└───────────────────────────────┘
````

### 3.12 修改时区

修改宿主机时间（永久生效）**Ubuntu/Debian**：

```bash
# 查看当前时区
timedatectl

# 设置时区为上海（北京时间 UTC+8）
sudo timedatectl set-timezone Asia/Shanghai

# 同步系统时间（可选，用网络时间）
sudo apt-get install -y ntpdate
sudo ntpdate time.windows.com

# 查看当前时间
date
```

## 4. 常用技巧(后期补充)

### 4.1 添加应用快捷方式到桌面

```bash
# 在桌面创建一个名称为 应用名称.desktop的文件，例如 test.desktop
vim test.desktop

# 编辑内容
[Desktop Entry]
Name=<程序/软件名> # test
Comment=<自定义的描述> # 无
Exec=<程序运行的绝对路径> # /home/slienceme/software/test/test-bin
Type=<类型，有Application和Link两种类型> ApplicationA
Terminal=<设置是否在终端运行，窗口应用程序填写false，命令行程序填true> # false
Icon=<程序图标的绝对路径>  # /home/slienceme/software/test/test.icon

# 然后给文件赋予权限
sudo chmod +x test.desktop

# 然后鼠标右键选取Allow Lanuching即可
```

### 4.2 彩色日志

`lnav` 是交互式日志分析工具，可以自动解析时间戳、日志级别、过滤等。

```bash
# 安装：
sudo apt install lnav

# 查看日志：
lnav app.log

# `lnav` 会自动彩色高亮，并能用 `/` 搜索，`f` 过滤，`q` 退出
```

### 4.3 存储占用排查

#### 常用命令速查表

**Linux磁盘占用分析常用命令速查表**（ `du`、`df`、`ls`、`ncdu` 对比）

```bash
# ===============================
# Linux 磁盘占用分析常用命令速查表
# ===============================

# ------- du (disk usage) -------
# 查看目录/文件大小
du -h --max-depth=1 /         # 查看根目录下一层大小
du -ah --max-depth=1 /        # 查看根目录下一层，包含文件
du -sh                        # 查看当前目录总大小
du -sh *                      # 查看当前目录下各文件/文件夹大小
du -ah . | sort -hr | head -20  # 查看当前目录下占用最大的20个文件/目录

# ------- df (disk free) -------
# 查看磁盘分区使用情况
df -h                         # 以人类可读方式显示磁盘空间使用情况
df -Th                        # 显示分区类型及使用情况
df -i                         # 查看inode使用情况（文件数量限制）

# ------- ls -------
# 按大小列出文件
ls -lh                        # 显示文件大小（人类可读）
ls -lhS                       # 按文件大小排序
ls -lhSr                      # 按文件大小逆序排序

# ------- ncdu (需要安装) -------
# 交互式查看目录占用（推荐）
ncdu /                        # 打开根目录磁盘占用分析
ncdu /var/log                 # 查看日志目录占用情况

# ------- find -------
# 查找大文件
find / -type f -size +500M    # 查找大于500M的文件
find . -type f -size +100M -exec ls -lh {} \; | sort -k 5 -h  # 当前目录大文件排序

# ------- 其他常用 -------
# 查看磁盘挂载点
mount | column -t
# 查看磁盘IO情况
iostat -x 1 10   # 需安装 sysstat
# 查看目录文件数
ls -lR | wc -l

# ===============================
# 常见场景推荐命令
# ===============================
# 1. 查看目录占用情况：du -sh *
# 2. 查找磁盘整体使用率：df -h
# 3. 找出当前目录下最大文件/目录：du -ah . | sort -hr | head -20
# 4. 交互式分析空间：ncdu /
# 5. 定位大文件：find / -type f -size +1G
```

#### 磁盘爆满排查步骤

**Linux 磁盘爆满排查步骤清单**

```bash
# ===============================
# Linux 磁盘爆满排查步骤清单
# ===============================

# ① 先看磁盘整体情况
df -h
# 关注 Use% 超过 90% 的分区（如 /、/var、/home 等）
# 如果 inode 用光（很多小文件），用：
df -i

# ② 定位到具体分区后，进入该目录
cd /var   # 举例进入占用大的分区

# ③ 用 du 查目录大小
du -h --max-depth=1
# 快速发现哪个子目录占用大

# ④ 进一步深入目录
cd log
du -h --max-depth=1
# 层层递进，直到找到占用空间的文件或目录

# ⑤ 找大文件
find . -type f -size +500M -exec ls -lh {} \; | sort -k 5 -h
# 或者只要前20个最大文件
du -ah . | sort -hr | head -20

# ⑥ 如果想更直观，用 ncdu
ncdu /
# 支持交互式界面，可直接删除

# ⑦ 常见“磁盘满”原因
# 1. 日志文件过大 ( /var/log/ )
# 2. 应用缓存、临时文件 ( /tmp/, /var/tmp/, /var/cache/ )
# 3. Docker/Podman 镜像和容器数据 ( /var/lib/docker/ )
# 4. 数据库数据文件 ( MySQL, PostgreSQL, MongoDB )
# 5. 用户目录大文件 ( ~/Downloads, ~/Videos 等 )
# 6. 已删除但仍被占用的文件（进程没释放）
#    用 lsof 查：
lsof | grep deleted

# ⑧ 清理建议
# - 日志：压缩或清空 (echo > xxx.log) 直接删除容易出问题
# - 缓存：apt-get clean, yum clean all
# - Docker：docker system prune -a
# - 临时文件：rm -rf /tmp/*
# - 已删除但占用：重启相关进程，或 kill -9 进程
```

### 4.4 日志轮转

#### 基础操作

::: info 基础操作

1. 创建配置文件

```bash
vim /etc/logrotate.d/nginx_error_log
```

2. 填入以下内容（每周轮转一次，保留4周）

```bash
# 使用下面的定义，不能加注释
# /data/logs/nginx/error.log {
#   weekly              # 每周轮转一次
#   rotate 4            # 保留4个旧日志文件
#   compress            # 使用 gzip 压缩旧日志
#   dateext             # 生成 error.log-20250821.gz 这种更直观的日期后缀; logrotate默认生成 error.log.1.gz
#   missingok           # 忽略文件不存在的情况
#   notifempty          # 空文件不处理
#   copytruncate        # 复制一份再清空原始日志，nginx 无需重启
#}

/data/logs/nginx/error.log {
    weekly
    rotate 4
    compress
    missingok
    notifempty
    copytruncate
}
```

3. 手动测试一次 logrotate 是否生效

```bash
logrotate -f /etc/logrotate.d/nginx_error_log
```

成功后，你会在 `/data/logs/nginx/` 下看到：

```bash
error.log
error.log.1.gz
```

或是带日期后缀的 `.gz` 文件（和你系统的全局 logrotate 设置有关）

4. 查看 logrotate 是否每天由系统调度运行（通常在 `/etc/cron.daily/logrotate`）

确认自动生效即可。你可以手动执行看看：

```bash
sudo /etc/cron.daily/logrotate
```

可选：为整个目录配置轮转（统一管理）

你也可以创建一个文件 `/etc/logrotate.d/nginx_all_logs`：

```conf
/data/logs/nginx/*.log {
   weekly
   rotate 4
   compress
   missingok
   notifempty
   copytruncate
}
```

适合统一管理 `web.log`、`access.log`、`error.log` 等多个日志。

:::

#### 常用模板

::: info 常用模板

**通用 Logrotate 模板库**

1. Nginx / Apache Web 日志

```conf
# Web 服务器日志轮转配置
/data/logs/nginx/*.log {
    # 每日轮转
    daily
    # 保留最近 14 天的日志
    rotate 14
    # 压缩旧日志
    compress
    # 延迟压缩上一轮日志
    delaycompress
    # 使用日期后缀
    dateext
    # 如果日志不存在则忽略
    missingok
    # 空日志不轮转
    notifempty
    # 创建新日志文件并设置权限
    create 0644 www-data www-data
    # 不重启 Nginx，复制再清空
    copytruncate
}
```

2. 应用日志（Java / SpringBoot / Node.js 等）

```conf
# 应用日志轮转配置
/data/logs/app/*.log {
    # 每周轮转
    weekly
    # 保留最近 8 周日志
    rotate 8
    # 压缩旧日志
    compress
    # 延迟压缩上一轮日志
    delaycompress
    # 使用日期后缀
    dateext
    # 如果日志不存在则忽略
    missingok
    # 空日志不轮转
    notifempty
    # 创建新日志文件并设置权限
    create 0644 appuser appgroup
    # 不重启应用，复制再清空
    copytruncate
}
```

3. 系统日志

```conf
# 系统日志轮转配置
/var/log/messages {
    # 每周轮转
    weekly
    # 保留最近 12 周日志
    rotate 12
    # 压缩旧日志
    compress
    # 延迟压缩上一轮日志
    delaycompress
    # 空日志不轮转
    notifempty
    # 如果日志不存在则忽略
    missingok
    # 创建新日志文件并设置权限
    create 0600 root root
    # 轮转后通知 rsyslog 重载
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate
    endscript
}
```

4. MySQL 数据库日志

```conf
# MySQL 日志轮转配置
/var/log/mysql/*.log {
    # 每日轮转
    daily
    # 保留最近 7 天日志
    rotate 7
    # 压缩旧日志
    compress
    # 使用日期后缀
    dateext
    # 如果日志不存在则忽略
    missingok
    # 空日志不轮转
    notifempty
    # 创建新日志文件并设置权限
    create 0640 mysql adm
    # 脚本共享，轮转后刷新日志
    sharedscripts
    postrotate
        # 刷新 MySQL 日志文件
        test -x /usr/bin/mysqladmin && /usr/bin/mysqladmin flush-logs
    endscript
}
```

5. PostgreSQL 日志

```conf
# PostgreSQL 日志轮转配置
/var/log/postgresql/*.log {
    # 每日轮转
    daily
    # 保留最近 10 天日志
    rotate 10
    # 压缩旧日志
    compress
    # 使用日期后缀
    dateext
    # 如果日志不存在则忽略
    missingok
    # 空日志不轮转
    notifempty
    # 创建新日志文件并设置权限
    create 0640 postgres postgres
    # 不重启 PostgreSQL，复制再清空
    copytruncate
}
```

6. Docker / 容器日志

```conf
# Docker 容器日志轮转配置
/var/lib/docker/containers/*/*.log {
    # 每日轮转
    daily
    # 保留最近 7 天日志
    rotate 7
    # 压缩旧日志
    compress
    # 使用日期后缀
    dateext
    # 如果日志不存在则忽略
    missingok
    # 空日志不轮转
    notifempty
    # 不重启容器，复制再清空日志
    copytruncate
}
```

说明：

- **每条参数单独一行**，注释独立一行，安全无报错。
- **copytruncate vs postrotate**：高并发日志建议用 `postrotate` reload，低并发或轻量日志用 `copytruncate`。
- **dateext + delaycompress**：方便查阅历史日志，同时压缩节省空间。

:::

#### 日志轮转应用场景对照表

::: info 日志轮转应用场景对照表

| 日志类型               | 轮转周期         | 保留策略     | 说明 / 建议                                                      |
|--------------------|--------------|----------|--------------------------------------------------------------|
| **Nginx / Apache** | daily/weekly | 14天 / 4周 | 高并发建议 `postrotate` reload，低并发 `copytruncate` 足够              |
| **应用日志**           | weekly       | 8周       | 日志量不大可直接 `copytruncate`，加 `dateext` 清楚历史                     |
| **系统日志**           | weekly       | 12周      | 轮转后通知 rsyslog reload，确保日志继续写入                                |
| **MySQL 日志**       | daily        | 7天       | 使用 `mysqladmin flush-logs` 刷新日志，避免丢失                         |
| **PostgreSQL 日志**  | daily        | 10天      | 轻量日志可用 copytruncate，高并发环境可用 postrotate + reload              |
| **Docker 容器日志**    | daily        | 7天       | 高并发推荐直接用 Docker 自身 `log-opts` 配置 `max-size` + `max-file`，更高效 |

| 日志类型               | 典型路径                                 | 压缩       | 方式                             |
|--------------------|--------------------------------------|----------|--------------------------------|
| **Nginx / Apache** | `/data/logs/nginx/*.log`             | compress | copytruncate / postrotate      |
| **应用日志**           | `/data/logs/app/*.log`               | compress | copytruncate                   |
| **系统日志**           | `/var/log/messages`                  | compress | postrotate                     |
| **MySQL 日志**       | `/var/log/mysql/*.log`               | compress | postrotate                     |
| **PostgreSQL 日志**  | `/var/log/postgresql/*.log`          | compress | copytruncate                   |
| **Docker 容器日志**    | `/var/lib/docker/containers/*/*.log` | compress | copytruncate / docker log-opts |

**关键配置说明**

1. **轮转周期**

- 日志量大（Nginx、Docker、高并发应用） → `daily`
- 日志量适中（普通应用、系统日志） → `weekly`

2. **保留策略**

- 保留天数或轮转次数，根据业务需求设置
- `rotate N` + `dateext` → N 个历史日志，带日期后缀

3. **压缩**

- `compress` + `delaycompress` 推荐使用，节省空间同时保留最新日志未压缩

4. **轮转方式**

- `copytruncate`：不重启应用，简单安全，轻量日志适用
- `postrotate ... endscript`：高并发应用或数据库，安全无日志丢失，但需要 reload

5. **权限设置**

- 每个应用 / 服务使用自己的运行用户与组 (`create 0644 www-data www-data`)
- 避免新日志权限错误导致无法写入

:::

### 4.5 常用日志查看指令

::: info 日志查看

1. **日志浏览类命令**

这些命令主要用于 **查看日志内容、翻页和搜索**

| 命令               | 用法 / 特点                                 |
|------------------|-----------------------------------------|
| **cat 文件**       | 全部显示文件内容，适合小文件，不分页                      |
| **more 文件**      | 分页显示，大文件可翻页（空格翻页、回车逐行）                  |
| **less 文件**      | 分页显示，比 `more` 强，支持前后翻页、搜索 `/关键词`、退出 `q` |
| **view 文件**      | 以只读模式打开文件，实际上是 `vim -R`                 |
| **vim 文件**       | 可编辑或只读查看文件，支持搜索、跳转行、语法高亮                |
| **tail -n N 文件** | 显示文件最后 N 行，常用于查看最新日志                    |
| **tail -f 文件**   | 实时跟踪文件追加内容，常用于监控日志                      |
| **tail -c 文件**   | 显示的是最后的字节数                              |
| **head -n N 文件** | 查看文件前 N 行                               |

**常用组合**：

```bash
tail -f /var/log/syslog | grep "error"
```

- 实时查看日志中包含 `error` 的行

2. **日志处理/行操作类命令**

这些命令主要用于 **格式化、筛选、加行号等**

| 命令       | 用法 / 特点                                                        |
|----------|----------------------------------------------------------------|
| **sed**  | 流编辑器，可对文件逐行处理示例：`sed '3,7d' 文件` 删除第3-7行，`sed -n '5p' 文件` 打印第5行 |
| **awk**  | 高级文本处理，按字段操作，统计、过滤示例：`awk '{print $1}' 文件` 输出每行第1列             |
| **nl**   | 给文件加行号输出示例：`nl 文件`                                             |
| **grep** | 按关键词过滤行示例：`grep "error" 文件`                                    |
| **cut**  | 按列截取文本示例：`cut -d',' -f1 文件` 提取第1列（逗号分隔）                        |
| **sort** | 排序文本示例：`sort 文件`                                               |
| **uniq** | 去重相邻重复行，常和 `sort` 配合使用                                         |

3. **使用场景总结**

- **快速查看整个日志** → `cat` / `more` / `less`
- **查看最新日志** → `tail -n` / `tail -f`
- **查看特定行/行号** → `sed` / `awk` / `nl`
- **筛选关键词** → `grep`
- **处理列/字段** → `cut` / `awk`
- **排序或去重** → `sort` / `uniq`

:::

### 4.6 fstab自动挂载的文件系统

::: info fstab

1. **fstab 简介**

- 文件路径：`/etc/fstab`
- 作用：定义系统启动时 **自动挂载** 的文件系统。
- 每一行描述一个文件系统，格式如下：

```text
<device>   <mount_point>   <filesystem_type>   <options>   <dump>   <pass>
```

字段说明：

1. **device**：设备名或UUID（推荐UUID，避免设备顺序变化导致出错）。
2. **mount_point**：挂载点目录。
3. **filesystem_type**：如 `ext4`、`xfs`、`swap`、`nfs` 等。
4. **options**：挂载选项，比如 `defaults`、`ro`、`rw`、`noexec`。
5. **dump**：`0`=不做dump备份，`1`=允许dump。
6. **pass**：fsck检查顺序，`0`=不检查，`1`=root分区，`2`=其他分区。

---

2. **常用命令**

（1）查看挂载状态

```bash
mount           # 查看当前已挂载的文件系统
mount -a        # 按照 /etc/fstab 配置重新挂载所有
findmnt         # 树状显示挂载点信息
df -h           # 查看挂载分区的空间使用情况
```

（2）测试 fstab 配置

```bash
mount -a        # 检查 /etc/fstab 是否有配置错误
```

⚠️ 如果写错了，系统可能开机卡死（推荐测试时先 `mount -a` 验证）。

（3）查看设备 UUID

```bash
blkid           # 列出所有分区及 UUID
lsblk -f        # 列出文件系统类型、挂载点和UUID
```

（4）手动挂载/卸载

```bash
mount /dev/sdb1 /mnt/data   # 临时挂载
umount /mnt/data            # 卸载
```

（5）修改 fstab 并生效

```bash
vim /etc/fstab
mount -a        # 检查是否配置正确
```

3. **fstab 常见挂载选项**

- `defaults`：常用默认选项（rw, suid, dev, exec, auto, nouser, async）。
- `ro`：只读。
- `rw`：可读写。
- `noexec`：禁止执行文件。
- `user`：允许普通用户挂载。
- `auto`：开机自动挂载。
- `noauto`：必须手动挂载。

示例：

```text
UUID=xxxx-xxxx   /data   ext4    defaults    0  2
```

4. 常见应用场景

1. **新增数据盘自动挂载**

   ```text
   UUID=1234-5678   /data   ext4    defaults    0  2
   ```

2. **挂载 swap 分区**

   ```text
   UUID=8765-4321   none    swap    sw          0  0
   ```

3. **挂载网络文件系统 (NFS)**

   ```text
   192.168.1.100:/share   /mnt/nfs   nfs   defaults  0  0
   ```

**常用操作步骤**

```bash
# 1. 查看当前挂载情况
mount              # 查看所有已挂载的分区和挂载点
findmnt            # 以树状结构显示挂载信息
cat /proc/mounts   # 查看内核实际挂载表（比 mount 更真实）

# 2. 测试 fstab 配置
mount -a           # 重新挂载 /etc/fstab 中所有能挂载的项目（测试配置是否有误）

# 3. 检查设备 UUID 和 LABEL
blkid              # 查看磁盘设备的 UUID / LABEL
lsblk -f           # 以树形结构显示文件系统类型、UUID、挂载点
udevadm info -q all -n /dev/sda1 | grep ID_FS_UUID

# 4. 手动挂载 / 卸载
mount /dev/sda1 /mnt          # 临时挂载（不会写入 fstab）
umount /mnt                   # 卸载挂载点
umount /dev/sda1              # 卸载设备

# 5. 使用 fstab 自动挂载（编辑配置文件）
vim /etc/fstab                 # 编辑配置
# 格式：
# <设备>   <挂载点>   <文件系统>   <选项>         <dump>  <pass>
# UUID=xxxx  /data   ext4         defaults       0       2

# 6. 挂载指定 fstab 项
mount /data        # 只挂载 fstab 中 /data 的配置项

# 7. 检查挂载是否成功
df -h              # 查看磁盘分区大小和挂载情况
lsblk              # 查看设备和挂载点对应关系
findmnt /data      # 查看某个挂载点的具体信息

# 8. 常用挂载选项（fstab 第四列）
defaults           # 默认选项，相当于 rw,suid,dev,exec,auto,nouser,async
ro / rw            # 只读 / 读写
noexec             # 禁止执行二进制文件
nosuid             # 禁止 SUID/SGID
nodev              # 禁止解释设备文件
noauto             # 不随开机自动挂载
user               # 普通用户可挂载
nofail             # 启动时挂载失败不报错
```

:::

### 4.7 Vim编辑器

::: info Vim

```bash
# ========================
# VIM 编辑器常用指令合集
# ========================

# 1. 进入和退出
vim filename            # 打开文件
:q                      # 退出
:q!                     # 强制退出（不保存）
:w                      # 保存
:wq / :x                # 保存并退出
ZZ                      # 保存并退出（大写ZZ）

# 2. 光标移动
h / l                   # 左 / 右
j / k                   # 下 / 上
0                       # 移动到行首
^                       # 移动到行首第一个非空字符
$                       # 移动到行尾
gg                      # 跳到文件第一行
G                       # 跳到文件最后一行
:n                      # 跳到第 n 行
Ctrl + f                # 向下翻页
Ctrl + b                # 向上翻页

# 3. 编辑操作
i                       # 在光标前插入
I                       # 在行首插入
a                       # 在光标后插入
A                       # 在行尾插入
o                       # 在当前行下插入新行
O                       # 在当前行上插入新行
r                       # 替换光标处字符
R                       # 替换模式（连续覆盖）

# 4. 删除操作
x                       # 删除光标所在字符
dd                      # 删除整行
ndd                     # 删除 n 行
d$                      # 删除到行尾
d0                      # 删除到行首
D                       # 删除到行尾（等于 d$）

# 5. 复制与粘贴
yy                      # 复制当前行
nyy                     # 复制 n 行
p                       # 粘贴到光标后
P                       # 粘贴到光标前

# 6. 撤销与恢复
u                       # 撤销
Ctrl + r                # 恢复撤销

# 7. 搜索与替换
/word                   # 向下搜索“word”
?word                   # 向上搜索“word”
n                       # 重复上次搜索（同方向）
N                       # 重复上次搜索（反方向）
:%s/old/new/g           # 替换所有 old 为 new
:n,m s/old/new/g        # 在 n 到 m 行之间替换

# 8. 可视化模式（选择文本）
v                       # 进入字符可视模式
V                       # 进入行可视模式
Ctrl + v                # 进入块选择模式
y                       # 复制选中
d                       # 删除选中
p                       # 粘贴

# 9. 窗口操作
:sp filename            # 水平分屏并打开文件
:vsp filename           # 垂直分屏并打开文件
Ctrl + w s              # 水平分屏
Ctrl + w v              # 垂直分屏
Ctrl + w w              # 在分屏间切换
Ctrl + w q              # 关闭当前分屏

# 10. 文件操作
:e filename             # 打开新文件
:r filename             # 读入文件内容到当前位置
:n                      # 打开下一个文件
:prev                   # 打开上一个文件
:ls                     # 查看已打开文件列表
:b n                    # 切换到第 n 个 buffer

# 11. 书签与跳转
ma                      # 标记当前位置为 a
`a                      # 跳转到标记 a
''                      # 跳转到上一次光标位置

# 12. 高级替换与正则
:%s/\<old\>/new/g       # 只替换整个单词 old
:%s/old/new/gi          # 全文替换，忽略大小写
```

建议学习顺序：

1. **基本移动** → h j k l / 0 / $ / gg / G
2. **编辑与删除** → i, a, o, dd, yy, p
3. **搜索替换** → /word, :%s/old/new/g
4. **分屏与 buffer** → :sp, :vsp, :ls, :b n
5. **进阶** → 可视化模式 (v, V, Ctrl+v)，标记跳转 (ma, `a)

:::

### 4.8 Nano编辑器

::: info nano

**nano 常用操作对照表**

| 命令 / 快捷键             | 功能说明                | 示例 / 说明            |
|----------------------|---------------------|--------------------|
| `nano file.txt`      | 打开或新建文件             | `nano /etc/hosts`  |
| **Ctrl + O** (`^O`)  | 保存文件（Write Out）     | 按下后确认文件名，回车保存      |
| **Ctrl + X** (`^X`)  | 退出 nano             | 如果有修改，会提示是否保存      |
| **Ctrl + R** (`^R`)  | 读取文件并插入到当前光标处       | 可用于合并内容            |
| **Ctrl + W** (`^W`)  | 搜索（Where Is）        | 输入关键字并回车           |
| **Ctrl + \** (`^\\`) | 替换文本                | 输入要查找和替换的字符串       |
| **Ctrl + K** (`^K`)  | 剪切整行                | 光标所在行会被剪切到缓冲区      |
| **Ctrl + U** (`^U`)  | 粘贴剪切的行              | 在光标位置粘贴            |
| **Ctrl + G** (`^G`)  | 帮助菜单（Get Help）      | 会显示所有快捷键           |
| **Ctrl + T** (`^T`)  | 调用拼写检查（Spell Check） | 依赖拼写检查工具           |
| **Ctrl + _** (`^_`)  | 跳转到指定行号             | 输入行号快速定位           |
| **Alt + A**          | 选中文本（开始标记）          | 可配合 `Ctrl + K` 剪切块 |
| **Alt + U**          | 撤销操作                | nano 2.3 以后支持      |
| **Alt + E**          | 重做操作                | 撤销的再恢复             |

**常见场景示例**

1. **编辑配置文件**

   ```bash
   nano /etc/fstab
   ```

   修改后：`Ctrl + O` 保存 → 回车 → `Ctrl + X` 退出。

2. **快速搜索关键词**

- `Ctrl + W` → 输入 `mount` → 回车。

3. **剪切多行**

- 光标移到行首 → `Ctrl + K` 连按几次 → `Ctrl + U` 粘贴。

**小技巧**

- `^` 表示 **Ctrl**，`M-` 表示 **Alt**。
  比如：`^X` = `Ctrl + X`，`M-U` = `Alt + U`。
- 和 `vim` 不同，nano 一进入就能直接输入文本，不需要模式切换。

:::

### 4.9 服务异常终止

#### Tomcat(java)服务异常终止

::: info Tomcat(java)服务异常终止

Tomcat 下线但日志无异常的常见原因

1. **操作系统 OOM Killer 杀死进程**

- **现象**：Tomcat 直接被系统干掉，Tomcat 日志里啥都没有。

- **原因**：JVM 占用内存超过物理内存，Linux 内核触发 OOM Killer。

- **排查**：

  - `dmesg -T | grep -i kill`

  - `/var/log/messages` 或 `/var/log/syslog`

  - 典型日志：

    ```
    Out of memory: Kill process 29172 (java) score 955 or sacrifice child
    Killed process 29172 (java) total-vm:2048000kB, anon-rss:1800000kB
    ```

- **解决**：

  - 调整 JVM 堆和 Metaspace 参数（`-Xmx`、`-XX:MaxMetaspaceSize`）。
  - 增加物理内存/容器限制（K8s、Docker 的 memory limit）。

2. **JVM 崩溃（本地代码、JNI、JIT Bug）**

- **现象**：Tomcat 日志正常，但生成了 `hs_err_pid<pid>.log` 文件。
- **原因**：JVM 层面崩溃，比如 native 库调用、JIT 优化 Bug、系统调用出错。
- **排查**：
  - 去 `$CATALINA_HOME/bin/` 或启动目录找 `hs_err_pid*.log`。
  - 里面会有线程栈、信号（如 SIGSEGV）、GC 状态。
- **解决**：
  - 升级 JDK 到更稳定版本。
  - 避免不安全的 native 库调用。

3. **系统资源耗尽**

- **文件句柄数 (ulimit -n)**：
  - Tomcat 没法再打开 socket → 直接挂掉。
  - 检查：`ulimit -n`，`lsof -p <PID> | wc -l`
- **线程数过多 (ulimit -u)**：
  - 报 `java.lang.OutOfMemoryError: unable to create new native thread`，有时没打印到日志。
  - 检查：`ps -eLf | grep java | wc -l`
- **磁盘写满**：
  - GC 日志、应用日志写不进去，JVM 有时直接挂掉。
  - 检查：`df -h`

---

建议排查路径

1. **确认是否进程被系统杀掉**
   - `dmesg -T | grep -i kill`
   - 系统日志 `/var/log/messages` 或 `/var/log/syslog`
   - 看是否有 `Killed process (java)`。
2. **确认是否 JVM 崩溃**
   - 查找 `hs_err_pid*.log` 是否生成。
   - 检查 `core dump` 是否存在。
3. **确认系统资源**
   - `free -m` → 内存是否耗尽
   - `ulimit -n` / `ulimit -u` → 是否过小
   - `df -h` → 磁盘是否满

```bash
########################################
# 1. 确认 OOM 类型
########################################
# 查看应用日志、hs_err_pid.log，确认 OOM 是 heap / metaspace / direct / thread
tail -n 1000 /path/to/app.log | grep "OutOfMemoryError"

########################################
# 2. 查看 GC 情况 (判断是否频繁 GC)
########################################
jstat -gc <pid> 1000 10

########################################
# 3. 快速查看对象分布 (直方图)
########################################
jmap -histo <pid> | head -30

########################################
# 4. 导出堆快照 (heap dump) 做深入分析
########################################
jmap -dump:format=b,file=/tmp/heap_<pid>.hprof <pid>

# 用 Eclipse MAT / VisualVM 打开 heap.hprof 文件
# - 找占用内存最多的对象
# - 查看是否有泄漏的引用链 (Leak Suspects)

########################################
# 5. 如果怀疑线程过多 (unable to create new native thread)
########################################
# 查看进程线程数
top -H -p <pid>
# 或者
ps -Lf <pid> | wc -l

# 导出线程堆栈分析线程创建点
jstack -l <pid> > /tmp/thread_<pid>.dump

########################################
# 6. 如果怀疑 Direct Memory / Metaspace
########################################
# 查看本地内存使用情况 (JDK 8+)
jcmd <pid> VM.native_memory summary

# 查看类加载情况
jmap -clstats <pid> | head -50

########################################
# 7. 最终定位
########################################
# - heap.hprof 用 MAT 分析大对象、泄漏路径
# - thread.dump 检查是否线程异常创建
# - 结合源码 / Arthas trace/watch 进一步确认问题代码
```

:::

#### CPU利用率排查

**vmstat命令**

::: info vmstat

一、`vmstat` 基本使用

`vmstat` (Virtual Memory Statistics) 用来观察 **虚拟内存、进程、CPU** 等系统整体状态。
 常见用法：

```bash
vmstat 1 5

procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 104592 117592 1070452   0    0     2     9    1    0  1  0 99  0  0
 0  0      0 104592 117592 1070488   0    0     0     0 1591 2726  2  1 97  0  0
 0  0      0 104592 117592 1070488   0    0     0     0 1546 2608  2  1 97  0  0
 0  0      0 104592 117596 1070488   0    0     0    52 1592 2628  3  1 96  0  0
 0  0      0 104592 117596 1070488   0    0     0     0 1532 2616  2  1 97  0  0
```

表示每 1 秒刷新一次，共采集 5 次。

输出字段主要包括：

- **procs**
  - `r`：运行队列中的进程数（可理解为等待 CPU 的进程数）
  - `b`：处于不可中断睡眠状态的进程数（如等待 IO）
- **memory**
  - `swpd`：使用的 swap 空间
  - `free`：空闲内存
  - `buff`：缓冲区使用的内存
  - `cache`：缓存使用的内存
- **swap**
  - `si`：从 swap 分页到内存的速率（KB/s）
  - `so`：从内存分页到 swap 的速率（KB/s）
- **io**
  - `bi`：块设备读速率
  - `bo`：块设备写速率
- **system**
  - `in`：每秒中断次数
  - `cs`：每秒上下文切换次数
- **cpu**
  - `us`：用户态 CPU 占比
  - `sy`：内核态 CPU 占比
  - `id`：空闲 CPU 占比
  - `wa`：等待 IO 占比
  - `st`：被虚拟机偷走的 CPU 占比

特点：**轻量、概览型、趋势观察**。

二、`top` 基本使用

`top` 用来实时显示 **进程级别的资源使用情况**，支持交互操作。

常见用法：

```bash
top

top - 10:02:39 up 145 days, 14:08,  1 user,  load average: 0.04, 0.08, 0.02
Tasks: 139 total,   1 running, 138 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.5 us,  1.0 sy,  0.0 ni, 96.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1673.0 total,     99.7 free,    411.6 used,   1161.7 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1076.3 avail Mem 
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                                                                                                     
 773526 root      10 -10  126456   8476   4956 S   5.0   0.5 955:15.37 AliYunDunMonito                                            773500 root      20   0   99316   8624   5420 S   0.7   0.5 381:08.33 AliYunDun                                                 1839840 root      20   0 1748364 128572  40516 S   0.7   7.5  33:56.87 1panel                                                         425 root      rt   0  289312  27096   9072 S   0.3   1.6  13:00.22 multipathd                                                 1050525 root      20   0  686292   8872   5644 S   0.3   0.5  65:41.92 aliyun-service                                                   1 root      20   0  167732  10152   5168 S   0.0   0.6   7:57.21 systemd
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.78 kthreadd
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp
      5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 slub_flushwq
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 netns
      8 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri            
```

常用交互命令：

- `M`：按内存使用排序
- `P`：按 CPU 使用排序
- `H`:   线程模式 搭配`p`指定查看线程的ID
- `1`：展开显示所有 CPU 核
- `k`：杀掉进程
- `h`：帮助

输出信息：

- 上方汇总区：系统运行时间、平均负载、任务数、CPU 使用率、内存和 swap 使用情况。
- 下方进程区：每个进程的 PID、USER、%CPU、%MEM、VSZ、RSS、COMMAND 等。

特点：**细节、交互性强、适合查找“谁在占用资源”**。

三、对比总结

| 特性         | `vmstat`                          | `top`                                |
| ------------ | --------------------------------- | ------------------------------------ |
| **定位层级** | 系统整体性能趋势                  | 单个进程的资源使用情况               |
| **输出形式** | 概览统计，按间隔打印              | 动态刷新，交互式                     |
| **优点**     | 轻量、低开销、适合监控和脚本化    | 直观、支持排序、能快速定位“罪魁祸首” |
| **缺点**     | 无法看到具体进程，粒度较粗        | 开销比 `vmstat` 大，趋势分析不方便   |
| **典型用途** | 判断系统是否有瓶颈（CPU/内存/IO） | 查找哪个进程占用过高资源             |

四、实战场景

1. **先用 `vmstat` 看系统趋势**
   - 如果 `r` 很高，说明 CPU 忙不过来 → 需要排查进程。
   - 如果 `wa` 很高，说明 IO 瓶颈严重。
   - 如果 `si/so` 明显不为 0，说明发生 swap → 内存压力大。
2. **再用 `top` 精细定位**
   - 看哪个进程 `%CPU` 或 `%MEM` 高。
   - 如果 IO 繁忙，可以结合 `iotop`、`iostat`。

:::

#### Java性能问题排查

::: info java性能问题排查

**1. `jstack` —— 线程栈分析**

用于导出 Java 进程的 **线程堆栈信息**，常用于 **CPU 占用过高、死锁、线程阻塞** 排查。

**基本用法**

```bash
jstack <pid>
```

- `<pid>`：Java 进程号，可用 `jps` 或 `ps -ef | grep java` 查到。

**常见用法**

```bash
jstack -l <pid> > thread.dump
```

- `-l`：打印更多锁信息（锁的持有情况等）。
- 导出的 `thread.dump` 文件可以配合 `grep`/分析工具看。

**常见场景**

- **CPU 飙高**：先用 `top -H -p <pid>` 找到占用高的线程 TID，再转十六进制对照 `jstack` 输出中的 `nid=0x...`，定位具体线程。
- **死锁/卡死**：`jstack` 输出末尾会直接提示 “Found one Java-level deadlock”。

**2. `jstat` —— JVM 运行时统计**

用于实时监控 JVM 的 **内存、GC、JIT 编译** 等运行时信息。轻量、适合持续观测趋势。

**基本用法**

```bash
jstat -gc <pid> 1000 5
```

- 每 1000ms 打印一次 GC 信息，共打印 5 次。
- 常用选项：
  - `-gc`：各个堆区（Eden/Survivor/Old/Metaspace）的容量、使用量，GC 次数/耗时。
  - `-gccapacity`：堆区容量分布。
  - `-gcutil`：各个堆区的利用率（更直观）。
  - `-class`：已加载类数量、字节数。
  - `-compiler`：JIT 编译统计。

**常见场景**

- **内存泄漏/GC 频繁**：通过 `-gc`/`-gcutil` 看 GC 次数、回收效率。
- **调优验证**：观察 JVM 参数调整对 GC 的影响。

**3. `jmap` —— 内存快照 & 对象统计**

用于生成 **堆转储文件（heap dump）** 或统计堆中对象分布。

**基本用法**

```bash
jmap -heap <pid>
```

查看 JVM 堆配置、使用情况。

```bash
jmap -histo <pid> | head -20
```

查看堆中对象的统计信息（类名、对象数、占用空间）。

```bash
jmap -dump:format=b,file=heap.hprof <pid>
```

生成堆转储文件，可用 **Eclipse MAT、VisualVM、JProfiler** 分析。

**常见场景**

- **内存泄漏**：dump 堆文件，分析哪些对象占用过多且无法释放。
- **对象分布分析**：看是否有异常数量的某类对象。

注意：

- `jmap -dump` 对运行中的大内存应用可能有明显停顿（Full GC）。生产环境要谨慎操作。
- JDK 8u92 之后，部分 `jmap` 命令对生产环境进程会有安全限制。

**4. 三者对比总结**

| 工具       | 作用                | 常用场景                        |
| ---------- | ------------------- | ------------------------------- |
| **jstack** | 导出线程堆栈        | CPU 飙高、死锁、线程卡住        |
| **jstat**  | 实时 JVM 运行时统计 | GC 频繁、堆利用率分析、调优监控 |
| **jmap**   | 堆信息 & dump 文件  | 内存泄漏排查、对象分布分析      |

简单理解：

- **CPU 问题** → `jstack`
- **GC/内存波动问题** → `jstat`
- **怀疑内存泄漏** → `jmap

**分析过程：**

```bash
# 1. 找出进程的 CPU 使用情况
top -p <pid>

# 2. 定位高 CPU 的线程 (TID)
top -H -p <pid>

# 3. 将线程 ID 转换为 16 进制 (nid 用)
printf "%x\n" <tid>

# 4. 导出线程堆栈
jstack -l <pid> > thread.dump

# 5. 在堆栈文件里查找对应线程
grep -A 30 "nid=0x<hex_tid>" thread.dump

# 直接看
jstack -l <pid> ｜ grep -A 30 "nid=0x<hex_tid>"

# 6. 定位到具体 Java 代码 (类名 + 方法 + 行号)
#    -> 进一步在源码里加 print/日志 或使用 Arthas trace/watch/stack 分析
```

:::
