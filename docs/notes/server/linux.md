# Linux相关指令

### 1. 常见指令

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
crontab     # 配置系统定时任务 crontab -e
vi/vim       # 编辑文件 vi/vim file.txt
sudo        # 以管理员身份执行命令 sudo command

# 先将本地yum仓库换成阿里云的yum仓库
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
yum makecache
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

Ubuntu中使用apt-get进行软件包管理：

```bash
# 安装：
apt-get install name
# 更新：
apt-get update name
# 卸载：
apt-get remove name
# 查找：
apt-cache search name

# 查看服务列表
systemctl list-unit-files --type=service
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
ufw help  # 帮助清单
sudo apt install firewalld  # 安装
ufw status    # 查看防火墙状态和开放的端口
ufw status verbose   # 查看防火墙状态和开放的端口，并显示端口名称
ufw status numbered   # 查看防火墙状态和开放的端口，并显示端口号
ufw delete 序号  # 删除序号规则
ufw enable    # 启动防火墙
ufw disable   # 关闭防火墙
ufw allow 22
ufw allow 80/tcp
ufw reload
netstat -antp          # 查看开放端口

ufw default deny incoming   # 设置默认策略:设置默认拒绝所有传入连接
ufw default allow outgoing  # 设置默认允许所有传出连接

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

### 2.7 Redis(系统级)

```bash
# 配置Redis操作
sudo apt install redis-server   # 安装
service redis start   # 启动Redis服务
service redis status  # 查看Redis状态
service redis restart  # 重启服务
service redis stop    # 停止Redis状态
redis-server /etc/redis/redis.conf  # 启动Redis服务
redis-cli                          # 连接Redis数据库
```

redis开启远程服务的操作方法：

```
1.打开redis的配置文件“redis.conf”。
2.将“bind 127.0.0.1”注释掉。
3.将“protected-mode yes”改成“protected-mode no”。
4.添加以下一行代码。
daemonize no
5.重启redis服务即可。
```

### 2.8 配置uwsgi操作

```bash
# 配置uwsgi操作
uwsgi --ini uwsgi.ini  # 启动uwsgi服务
uwsgi --stop uwsgi.pid  # 停止uwsgi服务
```

### 2.9 安装SSH服务

```bash
# 安装SSH服务 ubuntu
sudo apt-get install openssh-server
ps -e |grep ssh
service ssh start
service ssh status
service ssh restart  # 重启服务
```
