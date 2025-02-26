# ubuntu多版本cuda如何指定cuda版本

## 1. 关于cuda设置

在 Ubuntu 系统上选择和管理 CUDA 的多个版本可以通过以下步骤进行：

### 1.1 查看当前安装的 CUDA 版本
你可以通过以下命令查看当前安装的 CUDA 版本：

```bash
nvcc --version
```

### 1.2 下载并安装所需的 CUDA 版本
你可以从 [NVIDIA CUDA Toolkit 下载页面](https://developer.nvidia.com/cuda-downloads) 下载你需要的 CUDA 版本。选择你的操作系统（Linux）、架构（x86_64）、发行版（Ubuntu）和版本，然后按照提示下载并安装。

### 1.3 设置环境变量
每个 CUDA 版本都会安装在不同的目录中，例如 `/usr/local/cuda-10.1`, `/usr/local/cuda-10.2` 等。你可以通过设置环境变量 `CUDA_HOME` 和修改 `PATH` 来切换不同的 CUDA 版本。

以下是一个示例脚本，可以根据你需要的 CUDA 版本进行修改：

```bash
# 切换到 CUDA 10.1
export CUDA_HOME=/usr/local/cuda-10.1
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH

# 切换到 CUDA 10.2
# export CUDA_HOME=/usr/local/cuda-10.2
# export PATH=$CUDA_HOME/bin:$PATH
# export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

你可以将这个脚本添加到你的 `~/.bashrc` 或 `~/.zshrc` 文件中，或者每次需要切换 CUDA 版本时手动运行这个脚本。

### 1.4 验证切换
切换 CUDA 版本后，可以运行以下命令来验证切换是否成功：

```bash
nvcc --version
```

这个命令将显示当前使用的 CUDA 版本。

### 1.5 安装对应的 NVIDIA 驱动程序
确保你安装了与所需 CUDA 版本兼容的 NVIDIA 驱动程序。如果需要更新或切换驱动程序，可以使用以下命令：

```bash
sudo ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
```

或者你也可以从 [NVIDIA 驱动程序下载页面](https://www.nvidia.com/Download/index.aspx) 手动下载并安装所需的驱动程序。

通过以上步骤，你可以在 Ubuntu 系统上管理和切换多个 CUDA 版本。


## 2. 设置环境变量
在 Ubuntu 上修改环境变量可以通过编辑 `~/.bashrc` 或 `~/.zshrc` 文件来实现，具体取决于你使用的是 Bash 还是 Zsh。以下是详细步骤：

### 2.1 打开终端

### 2.2 编辑 `~/.bashrc` 或 `~/.zshrc`

如果你使用的是 Bash，编辑 `~/.bashrc` 文件：

```bash
nano ~/.bashrc
```

如果你使用的是 Zsh，编辑 `~/.zshrc` 文件：

```bash
nano ~/.zshrc
```

### 2.3 添加环境变量

在文件末尾添加以下行来设置 CUDA 环境变量。例如，假设你有两个 CUDA 版本：10.1 和 10.2，你可以按以下方式添加：

```bash
# 设置 CUDA 10.1 环境变量
export CUDA_HOME=/usr/local/cuda-10.1
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

如果你需要切换到 CUDA 10.2，则可以将上述代码注释掉，并添加如下代码：

```bash
# 设置 CUDA 10.2 环境变量
# export CUDA_HOME=/usr/local/cuda-10.1
# export PATH=$CUDA_HOME/bin:$PATH
# export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH

export CUDA_HOME=/usr/local/cuda-10.2
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

你也可以使用条件语句来更灵活地切换 CUDA 版本：

```bash
# 根据需要选择 CUDA 版本
if [ "$CUDA_VERSION" == "10.1" ]; then
    export CUDA_HOME=/usr/local/cuda-10.1
elif [ "$CUDA_VERSION" == "10.2" ]; then
    export CUDA_HOME=/usr/local/cuda-10.2
fi
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

然后在需要切换版本时设置 `CUDA_VERSION` 环境变量，例如：

```bash
export CUDA_VERSION=10.1
source ~/.bashrc  # 或者 source ~/.zshrc
```

### 2.4 保存并退出

编辑完成后，按 `Ctrl+O` 保存文件，然后按 `Ctrl+X` 退出编辑器。

### 2.5 使更改生效

运行以下命令使更改生效：

```bash
source ~/.bashrc  # 如果使用的是 Bash
source ~/.zshrc   # 如果使用的是 Zsh
```

### 2.6 验证更改

可以通过以下命令验证环境变量是否设置正确：

```bash
echo $CUDA_HOME
nvcc --version
```

通过这些步骤，你可以方便地修改和管理环境变量，以切换不同的 CUDA 版本。

::: tip 发布时间:
2024-06-21
:::
