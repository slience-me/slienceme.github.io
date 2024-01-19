---
layout: post
title: 论文笔记｜【论文笔记合集】TimesNet之TimesBlock详解
categories: [论文笔记]
description: 【论文笔记合集】TimesNet之TimesBlock详解
keywords: 机器学习, 论文笔记
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

![img](https://raw.githubusercontent.com/slience-me/picGo/master/images/logo_slienceme3.jpeg)

本文作者： [slience_me](https://slienceme.xyz/)

---

# TimesNet之TimesBlock详解

![image-20240119171017338](https://raw.githubusercontent.com/slience-me/picGo/master/images/image-20240119171017338.png)

## 1. 源代码

```python
class TimesBlock(nn.Module):
    def __init__(self, configs):
        super(TimesBlock, self).__init__()
        self.seq_len = configs.seq_len
        self.pred_len = configs.pred_len
        self.k = configs.top_k
        self.conv = nn.Sequential(
            Inception_Block_V1(configs.d_model, configs.d_ff,
                               num_kernels=configs.num_kernels),
            nn.GELU(),
            Inception_Block_V1(configs.d_ff, configs.d_model,
                               num_kernels=configs.num_kernels)
        )

    def forward(self, x):
        B, T, N = x.size()
        period_list, period_weight = FFT_for_Period(x, self.k)

        res = []
        for i in range(self.k):
            period = period_list[i]
            if (self.seq_len + self.pred_len) % period != 0:
                length = (((self.seq_len + self.pred_len) // period) + 1) * period
                padding = torch.zeros([x.shape[0], (length - (self.seq_len + self.pred_len)), x.shape[2]]).to(x.device)
                out = torch.cat([x, padding], dim=1)
            else:
                length = (self.seq_len + self.pred_len)
                out = x
            out = out.reshape(B, length // period, period, N).permute(0, 3, 1, 2).contiguous()
            out = self.conv(out)
            out = out.permute(0, 2, 3, 1).reshape(B, -1, N)
            res.append(out[:, :(self.seq_len + self.pred_len), :])
        res = torch.stack(res, dim=-1)
        period_weight = F.softmax(period_weight, dim=1)
        period_weight = period_weight.unsqueeze(1).unsqueeze(1).repeat(1, T, N, 1)
        res = torch.sum(res * period_weight, -1)
        res = res + x
        return res
```
## 2. 分步详解

### 2.1 init部分代码

> - **seq_lem**：序列长度
>
> - **pred_len**：预测长度
>
> - **tok_k**：最高的k个
>
> ---------------------------------------------------------------
>
> - **d_model**：模型的维数
> - **d_ff**：全连接层的维度
> - **num_kernels**：卷积核的数量

```python
def __init__(self, configs):
    super(TimesBlock, self).__init__()
    self.seq_len = configs.seq_len
    self.pred_len = configs.pred_len
    self.k = configs.top_k
    self.conv = nn.Sequential(
        Inception_Block_V1(configs.d_model, configs.d_ff, num_kernels=configs.num_kernels),
        nn.GELU(),
        Inception_Block_V1(configs.d_ff, configs.d_model, num_kernels=configs.num_kernels)
    )
```

```python
class Inception_Block_V1(nn.Module):
    def __init__(self, in_channels, out_channels, num_kernels=6, init_weight=True):
        super(Inception_Block_V1, self).__init__()
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.num_kernels = num_kernels
        kernels = []
        for i in range(self.num_kernels):
            kernels.append(nn.Conv2d(in_channels, out_channels, kernel_size=2 * i + 1, padding=i))
        self.kernels = nn.ModuleList(kernels)
        if init_weight:
            self._initialize_weights()

    def _initialize_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
                if m.bias is not None:
                    nn.init.constant_(m.bias, 0)

    def forward(self, x):
        res_list = []
        for i in range(self.num_kernels):
            res_list.append(self.kernels[i](x))
        res = torch.stack(res_list, dim=-1).mean(-1)
        return res
```



**GELU()函数**

![image-20240119181212904](https://raw.githubusercontent.com/slience-me/picGo/master/images/image-20240119181212904.png)

> GELU（Gaussian Error Linear Unit）是一种激活函数，它在神经网络中用于引入非线性性。GELU 的特点包括以下几个方面：
>
> 1. **光滑性：** GELU 是一种光滑的激活函数，它的导数在整个实数域内都是定义良好的。这对于反向传播算法的有效性和数值稳定性是有益的。
>
> 2. **非饱和性：** GELU 在整个实数域内都不饱和。这意味着在输入信号的范围内，梯度不会消失，避免了一些激活函数（如 sigmoid、tanh）中可能出现的梯度消失问题。
>
> 3. **逼近性质：** GELU 在大部分实数域内近似于线性函数，这使得它在模型中可以起到近似线性的作用。在输入较大或较小的情况下，GELU 可能不太线性，但在输入接近零时，它趋向于线性变换。
>
> 4. **归一化性质：** GELU 的形式中包含了高斯分布的累积分布函数（CDF），这使得 GELU 对输入信号的归一化具有一定的性质。这有助于训练深度神经网络时的稳定性。
>
> 5. **引入噪声：** GELU 的形式与高斯分布相关，因此在一定程度上可以被视为引入了一些噪声。这种噪声引入可以有助于模型的鲁棒性，对抗一些过拟合问题。
>
> GELU 出现在一些深度学习模型中，特别是在一些 Transformer 模型中，作为激活函数的选择。其性质使得它在一些情况下表现得很好，但在实践中，选择激活函数通常还取决于具体任务和经验。



>  **GELU的优点**   [参考链接](https://zhuanlan.zhihu.com/p/302394523)
>
> GELU的优点是，它在处理负数时不会像ReLU一样将输入裁剪到0，这可能导致梯度消失的问题。
>
> - 具有更光滑的导数：
>
> - - GELU函数的导数是连续的，这使得在训练深度神经网络时可以更容易地传播梯度，避免了ReLU函数在 处的导数不连续的问题，从而减少了训练过程中出现的梯度消失问题
>
> - 可以加速收敛：
>
> - - GELU函数在激活函数的非线性变换中引入了类似于sigmoid函数的变换，这使得GELU函数的输出可以落在一个更广的范围内，有助于加速模型的收敛速度。

### 2.2 forward部分代码

```python
def forward(self, x):
    B, T, N = x.size()
    period_list, period_weight = FFT_for_Period(x, self.k)

    res = []
    for i in range(self.k):
        period = period_list[i]
        if (self.seq_len + self.pred_len) % period != 0:
            length = (((self.seq_len + self.pred_len) // period) + 1) * period
            padding = torch.zeros([x.shape[0], (length - (self.seq_len + self.pred_len)), x.shape[2]]).to(x.device)
            out = torch.cat([x, padding], dim=1)
        else:
            length = (self.seq_len + self.pred_len)
            out = x
        out = out.reshape(B, length // period, period, N).permute(0, 3, 1, 2).contiguous()
        out = self.conv(out)
        out = out.permute(0, 2, 3, 1).reshape(B, -1, N)
        res.append(out[:, :(self.seq_len + self.pred_len), :])
    res = torch.stack(res, dim=-1)
    period_weight = F.softmax(period_weight, dim=1)
    period_weight = period_weight.unsqueeze(1).unsqueeze(1).repeat(1, T, N, 1)
    res = torch.sum(res * period_weight, -1)
    res = res + x
    return res
```



---



> - B: Batch size 批大小
> - T: Time steps or sequence length 时间序列长度
> - N: Number of channels or features 通道特征数量

```python
B, T, N = x.size() # 获取三个值的大小
period_list, period_weight = FFT_for_Period(x, self.k) # 函数调用
```

- **period_list**：信号中每个最大频率成分的周期长度list
- **period_weight**：相应频率成分的平均振幅信息

---

```python
res = []
for i in range(self.k):
    # 获取第i个频率对应的周期长度
    period = period_list[i]
    # 如果总的序列长度（self.seq_len + self.pred_len）不能被实际周期整除，说明需要进行填充
    if (self.seq_len + self.pred_len) % period != 0:
        # 计算调整后的序列长度，使其能够整除周期长度
        # 默认label_len=48，pred_len=96，48+96=144
        length = (((self.seq_len + self.pred_len) // period) + 1) * period
        # 创建一个零张量，用于进行填充，保持与输入序列相同的批量大小和特征数
        # 创建一个0填充张量，形状为 [B, 填充长度, N]
        padding = torch.zeros([x.shape[0], (length - (self.seq_len + self.pred_len)), x.shape[2]]).to(x.device)
        # 将输入序列 x 与填充的零张量拼接在时间步维度上，以得到填充后的新序列。
        out = torch.cat([x, padding], dim=1)
    else:
        length = (self.seq_len + self.pred_len)
        out = x
    out = out.reshape(B, length // period, period, N).permute(0, 3, 1, 2).contiguous()
    # 2D conv: from 1d Variation to 2d Variation
    out = self.conv(out)
    # reshape back
    # [B, period, N, length // period]
    # 使用 reshape 操作将张量的形状调整为 [B, -1(自动计算的维度，以确保总的元素数量不变), N]
    out = out.permute(0, 2, 3, 1).reshape(B, -1, N)
    res.append(out[:, :(self.seq_len + self.pred_len), :])
```



> <<<<<< 问题：>>>>>>

- **在1D变2D时，涉及到了 length = (((self.seq_len + self.pred_len) // period) + 1) * period，我不是很明白这边为什么要把self.pred_len也加入进去？**[来源](https://github.com/thuml/Time-Series-Library/issues/7)

> 对于预测任务来说，TimesNet的pipeline是：在embedding之后先将序列长度扩充为self.seq_len + self.pred_len，然后再不断refine预测结果。所以在中间层的TimesBlock其实在处理预测的中间结果（其长度为self.seq_len + self.pred_len）。但是对于其他任务，self.pred_len=0，所以加和不加self.pred_len没有影响。



- <<<<<< **填充的过程解析**>>>>>>

> 假设 `self.seq_len` 是 100，`self.pred_len` 是 20，`period_list` 是一个包含两个实际周期的列表 `[25, 30]`，而 `self.k` 是 2。
>
> 首先，对于第一个实际周期（25），计算填充后的新序列长度：
>
> ```python
> length = (((self.seq_len + self.pred_len) // 25) + 1) * 25
> ```
>
> 将具体数值代入计算：
>
> ```python
> length = (((100 + 20) // 25) + 1) * 25
>        = (120 // 25 + 1) * 25
>        = (4 + 1) * 25
>        = 5 * 25
>        = 125
> ```
>
> 因此，对于第一个实际周期，填充后的新序列长度是 125。然后，根据这个长度创建一个零张量 `padding`：
>
> ```python
> padding = torch.zeros([x.shape[0], (125 - (self.seq_len + self.pred_len)), x.shape[2]]).to(x.device)
> ```
>
> 接下来，将输入序列 `x` 与填充的零张量拼接在时间步维度上：
>
> ```python
> out = torch.cat([x, padding], dim=1)
> ```
>
> 对于第二个实际周期（30），同样进行类似的计算和操作。最终，`out` 将是根据实际周期填充或未填充的新序列。



```python
out = out.reshape(B, length // period, period, N).permute(0, 3, 1, 2).contiguous()
```

> 这行代码对 `out` 进行了形状调整（reshaping）和维度交换（permutation），并最终得到一个新的张量。让我们逐步解释：
>
> 1. `out.reshape(B, length // period, period, N)`: 这一步通过 `reshape` 操作将 `out` 的形状调整为四维张量。具体来说，新的形状是 `[B, length // period, period, N]`。这里的含义是：
>
>    - `B`: 批量大小，保持不变。
>    - `length // period`: 新的时间步数，表示实际周期的倍数。
>    - `period`: 实际周期，表示每个周期内的时间步数。
>    - `N`: 特征数，保持不变。
>
> 2. `.permute(0, 3, 1, 2)`: 这一步使用 `permute` 操作交换张量的维度。具体来说，它将原始张量的维度重新排列为 `[B, N, length // period, period]`。这里的含义是：
>
>    - 第一个维度保持为批量大小 `B`。
>    - 第二个维度变为特征数 `N`。
>    - 第三个维度变为新的时间步数 `length // period`。
>    - 第四个维度变为实际周期 `period`。
>
> 3. `.contiguous()`: 这一步确保张量的内存是连续的，有时在进行形状调整后可能会导致不连续的内存布局。
>
> 最终，通过这些操作，`out` 被调整为一个四维张量，表示批量中每个样本的时间序列，其中时间步按照实际周期分组，每个组内有 `period` 个时间步。这种形状的张量可能是为了后续的处理或模型输入的需要。
>
> self.seq_len + self.pred_len = 48 + 96 = 144
>
> ```
> length = (((self.seq_len + self.pred_len) // period) + 1) * period
> ```
>
> out before shape：    [B, period, N]
>
> out after shape：[B, N, length//period, period]



- <<<<<<**Inception_Block_V1的输入要求？**>>>>>>

> 这 `Inception_Block_V1` 模块的输入形状应该是一个四维的张量，即 `(batch_size, in_channels, height, width)`。让我们详细解释：
>
> 1. **输入张量 `x` 的形状：**
>    - `batch_size`: 表示批量中样本的数量。
>    - `in_channels`: 表示输入特征图的通道数。
>    - `height`: 表示输入特征图的高度。
>    - `width`: 表示输入特征图的宽度。
>
> 2. **模块内部操作：**
>    - 对于每个卷积核，它接收输入张量 `x`，其中卷积核的大小是 `2 * i + 1`，`padding` 为 `i`。这样设计的目的是使用不同大小的卷积核来捕获输入中的不同尺度的特征。
>    - 每个卷积核的输出形状是 `(batch_size, out_channels, height, width)`。
>
> 3. **`nn.ModuleList` 和权重初始化：**
>    - 使用 `nn.ModuleList` 存储多个卷积核。
>    - 在 `_initialize_weights` 方法中对每个卷积层的权重进行初始化。这里使用了 Kaiming 初始化。
>
> 4. **前向传播 (`forward` 方法)：**
>    - 对于每个卷积核，通过 `self.kernels[i](x)` 计算输出。
>    - 将所有卷积核的输出堆叠在一起，形成一个张量，其形状为 `(batch_size, out_channels, height, width, num_kernels)`。
>    - 沿着最后一个维度对这些卷积核的输出进行平均池化，得到最终的输出 `res`，其形状为 `(batch_size, out_channels, height, width)`。
>
> 因此，`Inception_Block_V1` 模块接受一个四维的输入张量，对每个卷积核计算输出，然后将这些输出进行平均池化，最终产生一个具有相同通道数和空间尺寸的输出张量。
>
> out before shape： [B, N, length//period, period]
>
> out after shape：    [B, N, length//period, period]



```python
out = out.permute(0, 2, 3, 1).reshape(B, -1, N)
```

> 这行代码对 `out` 进行了进一步的形状调整。让我们逐步解释：
>
> 1. `out.permute(0, 2, 3, 1)`: 使用 `permute` 操作重新排列张量的维度。具体来说，将 `out` 的维度重新排列为 `[B, period, N, length // period]`。这里的含义是：
>    - 第一个维度保持为批量大小 `B`。
>    - 第二个维度变为实际周期 `period`。
>    - 第三个维度变为特征数 `N`。
>    - 第四个维度变为新的时间步数 `length // period`。
>
> 2. `.reshape(B, -1, N)`: 使用 `reshape` 操作将张量的形状调整为 `[B, -1, N]`。这里 `-1` 表示自动计算该维度的大小，以保持总的元素数量不变。因此，最终形状是：
>
>    - `B`: 批量大小，保持不变。
>    - `-1`: 自动计算的维度，以确保总的元素数量不变。
>    - `N`: 特征数，保持不变。
>
> 通过这些操作，`out` 被调整为一个三维张量，表示批量中每个样本的时间序列，其中每个时间步对应于实际周期的一个子序列。这种形状可能是为了更方便地传递给模型的下一步处理。
>
> out before shape： [B, N, length//period, period]
>
> out after shape：    [B, period, N]



针对上述操作，一个shape样例：

> ```python
> period_list: [1751  583  437], period_list.shape: (3,)
> period_weight.shape: torch.Size([16, 3])
> period: 1751
> out.shape: torch.Size([16, 1751, 32])
> reshape&permute out.shape: torch.Size([16, 32, 1, 1751])
> self.conv(out) out.shape: torch.Size([16, 32, 1, 1751])
> permute&reshape out.shape: torch.Size([16, 1751, 32])
> period: 583
> out.shape: torch.Size([16, 2332, 32])
> reshape&permute out.shape: torch.Size([16, 32, 4, 583])
> self.conv(out) out.shape: torch.Size([16, 32, 4, 583])
> permute&reshape out.shape: torch.Size([16, 2332, 32])
> period: 437
> out.shape: torch.Size([16, 2185, 32])
> reshape&permute out.shape: torch.Size([16, 32, 5, 437])
> self.conv(out) out.shape: torch.Size([16, 32, 5, 437])
> permute&reshape out.shape: torch.Size([16, 2185, 32])
> ```



```python
res.append(out[:, :(self.seq_len + self.pred_len), :])
```

> 这行代码通过 `res.append(out[:, :(self.seq_len + self.pred_len), :])` 将处理后的 `out` 张量的一个部分添加到列表 `res` 中。让我们解释一下：
>
> - `out[:, :(self.seq_len + self.pred_len), :]`: 这部分代码是对 `out` 进行切片操作，选择每个样本的前 `(self.seq_len + self.pred_len)` 个时间步。具体来说：
>
>   - `[:, :(self.seq_len + self.pred_len), :]`: 
>     - 第一个冒号表示选择所有批次（样本）。
>     - `:(self.seq_len + self.pred_len)` 表示选择前 `(self.seq_len + self.pred_len)` 个时间步。
>     - 最后一个冒号表示选择所有特征（通道）。
>
> - `res.append(...)`: 这部分将上述切片得到的部分添加到列表 `res` 中。
>
> 整体而言，这行代码的作用是将处理后的时间序列数据的一个部分，即每个样本的前 `(self.seq_len + self.pred_len)` 个时间步，添加到结果列表 `res` 中。这样，`res` 中将包含每个样本的部分时间序列数据，可能是为了后续的模型训练或其他分析步骤。
>
> out before shape： [B, period, N]
>
> out after shape：    [B, period:(self.seq_len + self.pred_len), N]



```python
res = torch.stack(res, dim=-1) # 按最高维 对序列数据内部的张量进行扩维拼接
period_weight = F.softmax(period_weight, dim=1)
period_weight = period_weight.unsqueeze(1).unsqueeze(1).repeat(1, T, N, 1)
```

> 这两行代码涉及到对 `period_weight` 张量进行操作，其中 `F` 可能是指代 PyTorch 中的函数库（例如 `torch.nn.functional`）。让我们逐步解释这两行代码：
>
> 1. `period_weight = F.softmax(period_weight, dim=1)`: 这一行代码使用 softmax 操作对 `period_weight` 进行归一化，使得其每一行的元素都在 (0, 1) 范围内，并且所有行的元素之和为 1。`dim=1` 表示在第二个维度上进行 softmax 操作，通常这个维度表示不同的频率。
>
> 2. `period_weight = period_weight.unsqueeze(1).unsqueeze(1).repeat(1, T, N, 1)`: 这一行代码进行了一系列的张量操作：
>    - `period_weight.unsqueeze(1).unsqueeze(1)`: 通过 `unsqueeze` 在第二和第三个维度上插入维度，将 `period_weight` 转换为形状 `[B, 1, 1, k]`，其中 `B` 是批量大小，`k` 是振幅最高的前 k 个频率。
>    - `.repeat(1, T, N, 1)`: 通过 `repeat` 操作将张量在第一个维度上进行复制，使得最终的形状为 `[B, T, N, k]`，其中 `T` 是时间步数，`N` 是特征数。这样，`period_weight` 在每个时间步和特征上都有相同的权重值。
>
> 这样的操作可能是为了将振幅最高的前 k 个频率的权重在时间步和特征上进行扩展，以便后续的加权操作。可能是为了在模型的训练或预测中更好地考虑不同时间步和特征上的频率权重。



```python
res = torch.sum(res * period_weight, -1)
res = res + x
```

> 这行代码使用 `torch.sum` 对 `res` 和 `period_weight` 进行加权求和，其中权重由 `period_weight` 提供。让我们解释这一行代码：
>
> - `res * period_weight`: 这是一个逐元素的乘法操作，对 `res` 中的每个元素分别乘以对应位置上的 `period_weight` 中的元素。这实际上是在对每个时间步和特征上的频率分量进行加权。
>
> - `torch.sum(res * period_weight, -1)`: 这一步是在最后一个维度上（`-1` 表示最后一个维度）对上述乘法结果进行求和。这将得到一个形状为 `[B, T, N]` 的张量，其中每个元素表示对应位置上的频率分量经过加权求和后的结果。
>
> 整体而言，这行代码的作用是将 `res` 中的频率分量按照 `period_weight` 中的权重进行加权求和。这可能是为了在模型中更加重视振幅较高的频率分量，或者以某种方式调整时间序列的重要性。



维度变换的样例：

> ```python
> res.length: 3
> res:{}
> res.shape: torch.Size([16, 1751, 32, 3]) # 按最高维 对序列数据内部的张量进行扩维拼接
> period_weight.shape after softmax  : torch.Size([16, 3])
> period_weight.shape after unsqueeze: torch.Size([16, 1751, 32, 3])
> res.shape: torch.Size([16, 1751, 32])
> ```

