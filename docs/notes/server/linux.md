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

## 2. 配置相关

### 2.1 目录介绍

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

### 2.2 配置Linux环境变量

```bash
# 配置Linux环境变量
export PATH=$PATH:/usr/local/bin  # 添加到PATH环境变量中
source ~/.bashrc                  # 使环境变量生效
```

### 2.3 ufw防火墙

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

### 2.3 firewalld防火墙

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

### 2.4 查看IP

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

### 2.5 配置静态IP操作 ubuntu

```bash
# 配置静态IP操作 【ubuntu】
cd /etc/netplan
sudo cp 01-network-manager-all.yaml 01-network-manager-all.yaml-before
sudo vim 01-network-manager-all.yaml
------------------------------------------------------------
network:
  ethernets:
    ens33:
      addresses: [192.168.5.130/24]  # 设置静态IP地址和掩码
      routes:
        - to: default
          via: 192.168.5.2
      # gateway4: 192.168.5.2 禁用了
      dhcp4: false                   # 禁用dhcp
      nameservers:
        addresses: [114.114.114.114, 8.8.8.8]  # 设置主、备DNS
  version: 2
  renderer: NetworkManager
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

### 2.6 MySQL(系统级)

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

### 2.7 配置uwsgi操作

```bash
# 配置uwsgi操作
uwsgi --ini uwsgi.ini  # 启动uwsgi服务
uwsgi --stop uwsgi.pid  # 停止uwsgi服务
```

### 2.8 安装SSH服务

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

### 2.9 配置DNS

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

### 2.10 设置定时任务

```bash
crontab [-u username]　　　　//省略用户表表示操作当前用户的crontab
    -e      (编辑工作表)
    -l      (列出工作表里的命令)
    -r      (删除工作作)
```

### 2.11 硬盘扩容

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

## 3. 常用技巧

### 3.1 添加应用快捷方式到桌面

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

### 3.2 彩色日志

`lnav` 是交互式日志分析工具，可以自动解析时间戳、日志级别、过滤等。

```bash
# 安装：
sudo apt install lnav

# 查看日志：
lnav app.log

# `lnav` 会自动彩色高亮，并能用 `/` 搜索，`f` 过滤，`q` 退出
```

### 3.3 存储占用排查

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

### 3.4 日志轮转

#### 基础操作

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

---

#### 常用模板

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

#### 日志轮转应用场景对照表

| 日志类型            | 轮转周期     | 保留策略   | 说明 / 建议                                                  |
| ------------------- | ------------ | ---------- | ------------------------------------------------------------ |
| **Nginx / Apache**  | daily/weekly | 14天 / 4周 | 高并发建议 `postrotate` reload，低并发 `copytruncate` 足够   |
| **应用日志**        | weekly       | 8周        | 日志量不大可直接 `copytruncate`，加 `dateext` 清楚历史       |
| **系统日志**        | weekly       | 12周       | 轮转后通知 rsyslog reload，确保日志继续写入                  |
| **MySQL 日志**      | daily        | 7天        | 使用 `mysqladmin flush-logs` 刷新日志，避免丢失              |
| **PostgreSQL 日志** | daily        | 10天       | 轻量日志可用 copytruncate，高并发环境可用 postrotate + reload |
| **Docker 容器日志** | daily        | 7天        | 高并发推荐直接用 Docker 自身 `log-opts` 配置 `max-size` + `max-file`，更高效 |

| 日志类型            | 典型路径                             | 压缩     | 方式                           |
| ------------------- | ------------------------------------ | -------- | ------------------------------ |
| **Nginx / Apache**  | `/data/logs/nginx/*.log`             | compress | copytruncate / postrotate      |
| **应用日志**        | `/data/logs/app/*.log`               | compress | copytruncate                   |
| **系统日志**        | `/var/log/messages`                  | compress | postrotate                     |
| **MySQL 日志**      | `/var/log/mysql/*.log`               | compress | postrotate                     |
| **PostgreSQL 日志** | `/var/log/postgresql/*.log`          | compress | copytruncate                   |
| **Docker 容器日志** | `/var/lib/docker/containers/*/*.log` | compress | copytruncate / docker log-opts |

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
