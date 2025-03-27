# Windows相关指令

## 1. 常见指令

> 以下是Windows系统中常用的命令行指令（CMD 和 PowerShell），涵盖网络、进程、文件管理、系统信息等方面。

### 1.1 端口 & 网络

```bash
# 查看网络连接及端口
netstat -ano               # 查看所有网络连接、端口及进程ID
netstat -anof              # 查看所有端口及进程信息（包含防火墙信息）
netstat -ano | findstr 80  # 查询占用80端口的进程
netstat -rn                # 查看路由表

# 查看/清理DNS缓存
ipconfig /all               # 查看详细网络配置信息
ipconfig /flushdns          # 清理DNS缓存
ipconfig /renew             # 重新获取IP地址
ipconfig /release           # 释放IP地址

# 测试网络
ping www.baidu.com          # 测试网络连通性
ping 192.168.1.1 -t        	# 持续ping某个地址（Ctrl+C停止）
tracert www.baidu.com       # 跟踪到目标的路由路径
pathping www.baidu.com      # 综合ping和tracert，分析网络路径质量
nslookup www.baidu.com      # 查询域名对应的IP地址

# 查看/修改ARP缓存
arp -a                      # 查看ARP缓存
arp -d 192.168.1.1         	# 删除特定IP的ARP缓存
arp -d *                   	# 清空ARP缓存

# 查看系统共享
net share                   # 查看本机共享文件夹
net use                     # 查看已连接的共享
net use \\192.168.1.100 /user:admin  # 访问远程共享
```

### 1.2 进程 & 任务管理

```bash
# 查看进程
tasklist                    # 显示所有运行中的进程
tasklist | findstr chrome   # 查找chrome进程
tasklist /svc               # 显示进程及其关联的服务
tasklist /fi "pid eq 1234"  # 查询指定PID的进程

# 关闭进程
taskkill /F /PID 1234       # 强制终止进程
taskkill /IM notepad.exe    # 终止指定名称的进程
taskkill /F /IM chrome.exe  # 强制关闭所有chrome进程
```

### 1.3 文件 & 目录管理

```bash
# 文件操作
dir                         # 查看当前目录下的文件和文件夹
dir /s /b                   # 以列表形式显示所有文件（包含子目录）
cd C:\Windows               # 进入C:\Windows目录
cd ..                       # 返回上一级目录
mkdir test                  # 创建test文件夹
rmdir /s /q test            # 强制删除test文件夹及其内容
del /f /s /q test.txt       # 强制删除test.txt文件

# 磁盘管理
chkdsk C:                   # 检查C盘是否有磁盘错误
chkdsk C: /f /r /x          # 修复磁盘错误并回收坏扇区
format D:                   # 格式化D盘

# 文件权限
icacls 文件名 /grant 用户名:F  # 给予用户完全控制权限
icacls 文件名 /remove 用户名   # 移除用户的权限
takeown /f 文件名 /r /d y     # 取得文件所有权
```

### 1.4 系统信息 & 管理

```bash
# 系统信息
systeminfo                   # 查看系统详细信息
wmic os get Caption          # 获取Windows版本
wmic cpu get name            # 获取CPU型号
wmic memorychip get capacity # 获取内存信息

# 查看开机时间
net statistics workstation   # 统计信息中显示系统运行时间
wmic os get LastBootUpTime   # 获取系统最后启动时间

# 查看磁盘信息
wmic logicaldisk get name,filesystem,freespace,size

# 查看环境变量
set                         # 显示所有环境变量
echo %PATH%                 # 查看PATH环境变量
```

### 1.5 用户 & 权限管理

```bash
# 用户管理
net user                   	  # 显示本机所有用户
net user 用户名 /add 密码   	   # 添加用户
net user 用户名 /del        	# 删除用户

# 组管理
net localgroup              			  # 显示本机用户组
net localgroup Administrators 用户名 /add  # 添加用户到管理员组
net localgroup Administrators 用户名 /del  # 从管理员组移除用户
```

### 1.6 Windows服务管理

```bash
# 查看服务
sc query                    # 查看所有服务状态
sc queryex type= service    # 显示详细服务信息
sc queryex | findstr "Running"  # 查找正在运行的服务

# 启动/停止服务
net start 服务名            # 启动服务
net stop 服务名             # 停止服务
sc start 服务名             # 启动服务（与net start相同）
sc stop 服务名              # 停止服务
```

### 1.7 计划任务

```bash
schtasks /query /fo table /v  										# 查看计划任务
schtasks /create /tn "test" /tr "C:\test.bat" /sc daily /st 10:00   # 创建计划任务
schtasks /delete /tn "test" /f  									# 删除计划任务
```

### 1.8 注册表操作

```bash
reg query HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall 	 # 查询注册表
reg add HKEY_LOCAL_MACHINE\Software\Test /v TestValue /t REG_SZ /d "Hello"   		 # 修改注册表
reg delete HKEY_LOCAL_MACHINE\Software\Test /v TestValue /f  						 # 删除注册表项
```

### 1.9 远程管理

```bash
# 远程桌面 
mstsc /v:192.168.1.100      	# 连接远程桌面
mstsc /admin /v:192.168.1.100   # 以管理员身份远程连接

# 远程文件拷贝（PsExec工具）
psexec \\192.168.1.100 cmd  # 远程执行CMD
```

### 1.10 安全 & 日志管理

```bash
# 查看Windows日志
wevtutil qe System /c:10 /rd:true /f:text  # 查看最近10条系统日志

# 关闭Windows Defender
sc stop WinDefend                			# 关闭Windows Defender服务
sc config WinDefend start= disabled  		# 禁止Windows Defender开机自启
```