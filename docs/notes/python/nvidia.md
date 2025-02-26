# 显卡

```bash
#  查看显卡信息
nvidia-smi

# 查看cuda版本
nvcc --version
nvcc -V

# 查看cudnn版本
cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2

# 检查当前使用的CUDA路径
echo $PATH | grep -o 'cuda-[0-9\.]*'
echo $LD_LIBRARY_PATH | grep -o 'cuda-[0-9\.]*'

# 切换到正确的CUDA版本 配置环境变量
export CUDA_HOME=/usr/local/cuda-12.4
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH

```

```python
# 查询系统中是否安装了CUDA
import torch

torch.cuda.is_available()
True
```

英伟达官网 驱动下载

https://www.nvidia.cn/Download/index.aspx?lang=cn
