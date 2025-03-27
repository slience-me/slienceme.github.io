# Ubuntu系统重装操作合集

## 1.1 系统安装：

[Ubuntu 双系统安装流程](https://blog.csdn.net/Flag_ing/article/details/121908340)

/boot : 1G 1024MB  主分区。系统的boot启动引导项安装位置

efi: 1G  主分区

/  : 剩余    主分区。根目录，所有目录的根节点，其下包含很多子目录，如/usr  /tmp等

/home :  2T   逻辑分区。一般放置自己的数据

swap : 64G 65536MB   逻辑分区。交换空间，一般是物理内存的1~2倍就行了

---

**注意：**

**开放root用户:**

Ubuntu 默认情况下禁用了 `root`用户，因此你需要通过 `sudo` 来执行具有管理员权限的操作。

```bash
# 首先，打开终端。
# 然后输入以下命令来切换到 root 用户： 
sudo -i
# 系统会要求你输入当前用户的密码。成功后，你将以 root 用户身份登录。

# 修改 root 用户的密码, 修改 root 用户的密码
passwd
```

**合盖后不睡眠**

如果使用笔记本，希望合盖后不睡眠

```bash
# 1. 打开文件 `/etc/systemd/logind.conf`。
# 2. 找到 `HandleLidSwitch=suspend`，如果前面有 `#`，去掉它。
# 3. 改成 `HandleLidSwitch=lock`，然后保存文件。
# 4. 重启 `systemd-logind` 服务以应用更改：
sudo systemctl restart systemd-logind
# 这样就能实现合盖时锁屏而不是休眠的效果。
```

## 1.2 安装openssh-server

> 在Ubuntu上安装和配置SSH服务器非常简单。以下是详细的步骤：
>
> ### 更新系统包
>
> 在安装任何新软件之前，最好更新现有的软件包，以确保你获得最新的版本。打开终端并运行以下命令：
>
> ```bash
> sudo apt update
> ```
>
> ### 安装OpenSSH服务器
>
> Ubuntu使用`openssh-server`作为SSH服务器。可以使用以下命令进行安装：
>
> ```bash
> sudo apt install openssh-server
> ```
>
> ### 检查SSH服务的状态
>
> 安装完成后，可以检查SSH服务是否正在运行：
>
> ```bash
> sudo systemctl status ssh
> ```
>
> 如果显示类似以下内容，说明SSH服务器已成功启动并正在运行：
>
> ```plaintext
> ● ssh.service - OpenBSD Secure Shell server
>   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)
>   Active: active (running) since ...
> ```
>
> 如果SSH服务未运行，可以使用以下命令启动它：
>
> ```bash
> sudo systemctl start ssh
> ```
>
> 要确保每次启动系统时SSH自动启动，可以使用：
>
> ```bash
> sudo systemctl enable ssh
> ```
>
> ### 配置防火墙以允许SSH
>
> 如果你使用`ufw`防火墙，可能需要显式允许SSH流量。运行以下命令：
>
> ```bash
> sudo ufw allow ssh
> ```
>
> ### 测试SSH连接
>
> 在本地计算机或其他设备上，可以通过以下命令测试连接到你的Ubuntu系统：
>
> ```bash
> ssh username@server_ip_address
> ```
>
> 将`username`替换为Ubuntu系统的用户名，将`server_ip_address`替换为该系统的IP地址。
>
> 你可以通过以下命令查找服务器的IP地址：
>
> ```bash
> ip a
> ```
>
> ### 配置SSH（可选）
>
> 默认情况下，SSH配置文件位于`/etc/ssh/sshd_config`。可以通过编辑该文件来更改默认设置，例如修改默认的SSH端口、禁用密码认证、启用密钥认证等。
>
> 编辑文件：
>
> ```bash
> sudo nano /etc/ssh/sshd_config
> ```
>
> 修改后，重新加载SSH服务以应用更改：
>
> ```bash
> sudo systemctl restart ssh
> ```
>
> 至此，Ubuntu上的SSH服务器已经成功安装并运行。

##  1.3 安装远程连接桌面

> 在Ubuntu上安装并配置远程桌面可以通过多种方式实现，最常见的选项是使用`xrdp`与桌面环境结合，让Windows用户通过远程桌面连接（RDP协议）访问Ubuntu桌面。以下是安装和配置远程桌面的详细步骤：
>
> ### 安装桌面环境（如果需要）
>
> 如果你使用的是Ubuntu Server或最小化安装版本，你需要首先安装一个桌面环境。最常用的桌面环境是`GNOME`，它是Ubuntu默认的桌面环境。你可以通过以下命令来安装完整的Ubuntu桌面：
>
> ```bash
> sudo apt install ubuntu-desktop
> ```
>
> 如果你希望安装较轻量的桌面环境，比如`Xfce`，可以执行以下命令：
>
> ```bash
> sudo apt install xfce4
> ```
>
> ### 安装`xrdp`
>
> 安装`xrdp`（远程桌面协议服务器），它允许你通过RDP协议远程连接到Ubuntu桌面。
>
> ```bash
> sudo apt install xrdp
> ```
>
> ### 启动和配置`xrdp`
>
> 安装完成后，启动并启用`xrdp`服务，使其每次启动系统时自动运行：
>
> ```bash
> sudo systemctl enable xrdp
> sudo systemctl start xrdp
> ```
>
> 你还可以检查`xrdp`服务的状态，以确保它正在运行：
>
> ```bash
> sudo systemctl status xrdp
> ```
>
> ### 将`xrdp`与桌面环境关联
>
> 在`xrdp`默认配置中，使用的是`Xfce`或`GNOME`桌面环境。你可以根据安装的桌面环境来配置`xrdp`。
>
> 如果你安装的是`Xfce`，需要为`xrdp`配置启动Xfce桌面。执行以下命令来创建一个`.xsession`文件并将其内容设置为`xfce4-session`：
>
> ```bash
> echo xfce4-session >~/.xsession
> ```
>
> 对于GNOME桌面，默认情况下应该无需额外配置。
>
> ### 配置防火墙以允许RDP
>
> 如果你使用`ufw`防火墙，需要允许RDP连接（默认端口是3389）：
>
> ```bash
> sudo ufw allow 3389
> ```
>
> ### 使用远程桌面客户端连接
>
> 在Windows、macOS或Linux的远程桌面客户端中输入你的Ubuntu服务器的IP地址，使用RDP协议进行连接。
>
> 在Windows中，打开“远程桌面连接”，输入Ubuntu的IP地址：
>
> ```plaintext
> IP_ADDRESS:3389
> ```
>
> 你将看到登录界面，输入Ubuntu的用户名和密码即可访问远程桌面。
>
> ### 可选配置：修改`xrdp`会话配置文件
>
> 如果遇到黑屏或登录失败等问题，可以尝试修改`xrdp`配置文件。例如，编辑`/etc/xrdp/startwm.sh`文件，在其中找到以下几行并注释掉：
>
> ```bash
> test -x /etc/X11/Xsession && exec /etc/X11/Xsession
> exec /bin/sh /etc/X11/Xsession
> ```
>
> 然后在这些行的下方添加你想使用的桌面环境。例如，如果你使用`Xfce`，可以添加以下内容：
>
> ```bash
> startxfce4
> ```
>
> 保存并重新启动`xrdp`服务：
>
> ```bash
> sudo systemctl restart xrdp
> ```
>
> ### 重新连接远程桌面
>
> 完成上述步骤后，你应该可以顺利通过远程桌面客户端连接到Ubuntu的桌面环境。
>
> 这样你就完成了Ubuntu的远程桌面配置，之后可以使用任何支持RDP的客户端工具进行远程桌面连接。

## 1.4 用户操作

查看全部用户`cat /etc/passwd`  修改密码` sudo passwd user`

新增用户`sudo adduser user`

> 由于重装系统，原始的用户信息丢失，需要重新创建用户，与home的用户对应上，但是会出现问题，user1:1001旧的，user1:1007 新的，用户目录权限对不上，所以需要该指令`sudo chown -R new_owner:new_group /home/username`

## 1.5 Cuda

> CUDA 是 NVIDIA 的并行计算平台和编程模型，用于 GPU 加速计算。安装 CUDA 工具包可以让你使用 GPU 进行高性能计算，`nvcc` 则是 CUDA 的编译器。以下是 Ubuntu 上安装 CUDA、`nvcc` 等相关工具的详细步骤。
>
> ### 检查硬件和操作系统兼容性
>
> 在安装 CUDA 之前，确保你的系统满足以下条件：
>
> - 你有一个支持 CUDA 的 NVIDIA 显卡。
> - 你使用的是 Ubuntu（例如 18.04、20.04 或 22.04 等版本）。
> - 你已经安装了合适的显卡驱动。
>
> ### 更新系统
>
> 首先，更新系统的包列表和软件包，确保一切都是最新的：
>
> ```bash
> sudo apt update
> sudo apt upgrade
> ```
>
> ### 安装 NVIDIA 驱动
>
> 通常 CUDA 工具包包含 NVIDIA 驱动，但是你也可以手动安装，建议确保安装的驱动是最新的兼容版本。
>
> - 检查 NVIDIA 显卡是否被识别：
    >
    >   ```bash
>   lspci | grep -i nvidia
>   ```
>
> - 安装最新版本的驱动：
    >
    >   ```bash
>   sudo apt install nvidia-driver-###    # 将 ### 替换为推荐的驱动版本
>   ```
>
> 你可以使用 `ubuntu-drivers devices` 查看推荐的 NVIDIA 驱动版本。
>
> ### 添加 CUDA 相关的存储库
>
> 访问 [NVIDIA CUDA Toolkit 下载页面](https://developer.nvidia.com/cuda-downloads)，选择你对应的操作系统版本并跟随提示。通常可以使用以下步骤添加 CUDA 的存储库：
>
> - 访问 CUDA 的下载页面，选择你的操作系统，通常会得到类似以下的安装命令：
    >
    >   ```bash
>   wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu$(lsb_release -sr | cut -d. -f1)/x86_64/cuda-repo-ubuntu$(lsb_release -sr | cut -d. -f1)_<version>_amd64.deb
>   sudo dpkg -i cuda-repo-ubuntu$(lsb_release -sr | cut -d. -f1)_<version>_amd64.deb
>   sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu$(lsb_release -sr | cut -d. -f1)/x86_64/7fa2af80.pub
>   sudo apt update
>   ```
>
> - 我的版本
    >
    >   ```bash
>   wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
>   sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
>   wget https://developer.download.nvidia.com/compute/cuda/12.6.2/local_installers/cuda-repo-ubuntu2004-12-6-local_12.6.2-560.35.03-1_amd64.deb
>   sudo dpkg -i cuda-repo-ubuntu2004-12-6-local_12.6.2-560.35.03-1_amd64.deb
>   sudo cp /var/cuda-repo-ubuntu2004-12-6-local/cuda-*-keyring.gpg /usr/share/keyrings/
>   sudo apt-get update
>   sudo apt-get -y install cuda-toolkit-12-6
>   ```
>
> ### 安装 CUDA 工具包
>
> 使用以下命令安装 CUDA 工具包：
>
> ```bash
> sudo apt install cuda
> ```
>
> 这会安装 CUDA 相关的工具，包括编译器 `nvcc`。
>
> ### 设置环境变量
>
> 安装完成后，还需要配置环境变量，才能正确地调用 CUDA 和 `nvcc`。可以在 `.bashrc` 中添加以下路径：
>
> - 编辑 `.bashrc` 文件：
    >
    >   ```bash
>   nano ~/.bashrc
>   ```
>
> - 添加以下行以设置 CUDA 环境变量（假设安装在默认位置 `/usr/local/cuda`）：
    >
    >   ```bash
>   export PATH=/usr/local/cuda/bin:$PATH
>   export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
>   ```
>
> - 使修改立即生效：
    >
    >   ```bash
>   source ~/.bashrc
>   ```
>
> ### 验证 CUDA 和 NVCC
>
> 验证安装是否成功。
>
> - 检查 NVIDIA 驱动是否工作：
    >
    >   ```bash
>   nvidia-smi
>   ```
    >
    >   你应该能够看到显卡的状态和驱动程序信息。
>
> - 检查 CUDA 编译器 `nvcc`：
    >
    >   ```bash
>   nvcc -V
>   ```
    >
    >   你应该看到 `nvcc` 版本信息，说明安装成功。
>
> ### 运行 CUDA 示例代码（可选）
>
> 安装 CUDA 工具包后，NVIDIA 通常会提供一些示例代码，可以用来测试 GPU 是否正常工作。
>
> - 进入 CUDA 示例代码目录：
    >
    >   ```bash
>   cd /usr/local/cuda/samples
>   ```
>
> - 编译并运行一个测试程序（例如 `deviceQuery`）：
    >
    >   ```bash
>   sudo make
>   cd 1_Utilities/deviceQuery
>   ./deviceQuery
>   ```
    >
    >   这将会展示 GPU 的一些详细信息，如果能够正确显示，那么说明 CUDA 工作正常。
>
> ### 总结
>
> 1. **更新系统**：`sudo apt update && sudo apt upgrade`
> 2. **安装 NVIDIA 驱动**：`sudo apt install nvidia-driver-###`
> 3. **添加 CUDA 存储库**：根据 CUDA 下载页面获取存储库地址并添加。
> 4. **安装 CUDA 工具包**：`sudo apt install cuda`
> 5. **设置环境变量**：编辑 `.bashrc`，添加 CUDA 相关路径。
> 6. **验证安装**：运行 `nvidia-smi` 和 `nvcc -V` 验证安装是否成功。
>
> 通过这些步骤，你应该能够在 Ubuntu 上顺利安装 CUDA 工具包，并开始使用 GPU 加速你的计算任务。

::: tip 发布时间:
2024-10-24
:::
