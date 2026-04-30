# 麒麟服务器V10本地YUM源配置（ISO挂载）

> 适用于：离线环境 / 内网环境 / 无公网服务器 <br>
> 挂载方式：按需挂载（推荐）<br>
> ISO存放目录：`/opt/iso/`

## 一、说明

::: tip

⚠️ 当前采用“按需挂载”方式

:::

```bash
# 需要使用本地源时执行
/opt/iso/mount_local_repo.sh
```

👉 优点：

* 不占用系统资源（未长期挂载）
* 可灵活切换不同 ISO
* 适合离线环境

## 二、准备ISO文件

将系统 ISO 上传到：

```bash
/opt/iso/
```

例如：

```bash
/opt/iso/Kylin-Server-V10.iso
```

## 三、手动挂载（一次性操作）

### 3.1 创建挂载目录

```bash
mkdir -p /mnt/kylinos
```

### 3.2 挂载 ISO

```bash
mount -o loop /opt/iso/Kylin-Server-V10.iso /mnt/kylinos
```

## 四、配置本地YUM源

### 4.1 备份原有源（重要）

```bash
mkdir -p /etc/yum.repos.d/bak
mv /etc/yum.repos.d/*.repo /etc/yum.repos.d/bak/
```

### 4.2 创建本地源配置

```bash
vim /etc/yum.repos.d/local.repo
```

写入：

```ini
[local]
name=Local Kylin Repository
baseurl=file:///mnt/kylinos
enabled=1
gpgcheck=0
```

👉 如果需要 GPG 校验：

```ini
gpgcheck=1
gpgkey=file:///mnt/kylinos/RPM-GPG-KEY*
```

## 五、刷新YUM缓存

```bash
yum clean all
yum makecache
```

## 六、验证是否成功

```bash
# 查看仓库
yum repolist

# 查看所有仓库
yum repolist all

# 查看可用软件包
yum list available
```

## 七、自动挂载脚本（推荐）

👉 脚本路径：

```bash
/opt/iso/mount_local_repo.sh
```

### 7.1 脚本内容（优化版）

```bash
#!/bin/bash
# mount_local_repo.sh

MOUNT_DIR="/mnt/kylinos"
ISO_PATH=$(ls /opt/iso/Kylin*.iso 2>/dev/null | head -n 1)

# 检查 root 权限
if [ "$(id -u)" != "0" ]; then
    echo "错误：请使用 root 用户执行"
    exit 1
fi

# 检查 ISO 是否存在
if [ -z "$ISO_PATH" ]; then
    echo "错误：未找到 ISO 文件 (/opt/iso/Kylin*.iso)"
    exit 1
fi

echo "检测到 ISO 文件: $ISO_PATH"

# 创建挂载目录
mkdir -p "$MOUNT_DIR"

# 判断是否已挂载
if mount | grep -q "$MOUNT_DIR"; then
    echo "检测到 $MOUNT_DIR 已挂载"
    read -p "是否重新挂载？(y/N): " choice
    if [[ "$choice" =~ ^[Yy]$ ]]; then
        umount "$MOUNT_DIR"
    else
        echo "已取消操作"
        exit 0
    fi
fi

# 执行挂载
echo "开始挂载..."
mount -o loop "$ISO_PATH" "$MOUNT_DIR"

if [ $? -ne 0 ]; then
    echo "挂载失败！"
    exit 1
fi

echo "挂载成功！"

# 显示挂载信息
echo "=============================="
df -h "$MOUNT_DIR"

echo -e "\n目录内容预览："
ls "$MOUNT_DIR" | head -10
echo "=============================="

# 刷新 yum
echo "刷新 YUM 缓存..."
yum clean all && yum makecache

echo "完成！"
```

### 7.2 授权执行

```bash
chmod +x /opt/iso/mount_local_repo.sh
```

### 7.3 使用方式

```bash
/opt/iso/mount_local_repo.sh
```

## 八、常见问题

### 8.1 yum 无法找到包

👉 检查：

```bash
yum repolist
```

👉 确认：

* 是否只启用了 local 源
* ISO 是否正确挂载

### 8.2 挂载失败

```bash
mount: failed to setup loop device
```

解决：

```bash
modprobe loop
```

### 8.3 ISO 路径错误

```bash
ls /opt/iso/
```

确认文件名

### 8.4 忘记恢复公网源

```bash
mv /etc/yum.repos.d/bak/*.repo /etc/yum.repos.d/
```
