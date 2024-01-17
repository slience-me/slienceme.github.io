---
layout: post
title: 机器学习｜transforms数据预处理【图像增强】
categories: [机器学习]
description: transforms数据预处理【图像增强】
keywords: 机器学习
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


> 数据增强又称为数据增广、数据扩增，它是对训练集进行变换，使训练集更丰富，从而让模型更具泛化能力。

**注意： 下面图片大小通过markdown代码，图片比例有所更改（=400x）**
## 1. 安装

```python
# 在进行下面代码学习前需要安装torchvision==0.8.2
!pip install torchvision==0.8.2 --user  #在jupyter notebook中pip前面要加上感叹号
# 常规情况
pip install torchvision==0.8.2
```

```python
from PIL import Image
from torchvision import transforms as T
import torch as t

to_tensor = T.ToTensor()
to_pil = T.ToPILImage()
dog = Image.open('./dog.jpeg')  # 从网上下载图片到本地后，再上传至DSW
```

## 2. transforms——Crop 裁剪

### 2.1 `transforms.CenterCrop`

```python
torchvision.transforms.CenterCrop(size)
```

> - **功能**：从图像`中心裁剪`图片
> - **size**：所需裁剪图片`尺寸`

### 2.2 `transforms.RandomCrop`

```python
torchvision.transforms.RandomCrop(size, padding=None, pad_tf_needed=False, fill=0, padding_mode='constant')
```


>  - **功能**：从图片中`随机裁剪`出尺寸为size的图片
>   - **size**: 所需裁剪图片`尺寸`
>   - **padding**: 设置填充大小
>        当为`a`时，上下左右均填充a个像素；
>        当为`(a, b)`时，上下填充b个像素，左右填充a个像素；
>        当为`(a, b, c, d)`时，左、上、右、下分别填充a、b、c、d。
>    - **pad_if_need**: 若图像小于设定size，则填充
>    - **padding_mode**: 填充模式，有4种模式  
>       ⅰ. `constant`： 默认模式，像素值由fill设定  
>       ⅱ. `edge`: 边缘填充，像素值由图像边缘像素设定  
>       ⅲ. `reflect`: 镜像填充，最后一个像素不镜像，例: $[1, 2, 3, 4]→[3, 2, 1, 2, 3, 4, 3, 2]$  
            ⅳ. `symmetric`: 镜像填充，最后一个像素镜像，例：$[1, 2, 3, 4]→[2, 1, 1, 2, 3, 4, 4, 3]$  
>    - **fill**: constant时，设置填充的像素值

### 2.3 `transforms.RandomResizedCrop`

```python
torchvision.transforms.RandomResizedCrop(size, scale=(0.08, 1.0), ratio=(3/4, 4/3), interpolation=2)
```

>  - **功能**：`随机大小、长宽`比裁剪图片
>   - **size**: 所需裁剪图片尺寸
>   - **scale**:  随机裁剪面积比例，默认（0.08, 1）
>    - **ratio**: 随机长宽比，默认（3/4, 4/3）
>    - **interpolation**: 插值方法
>       PIL.Image.NEAREST 最邻近插值
> 		 PIL.Image.BILINEAR 双线性插值
>       PIL.Image.BICUBIC 双三次插值

### 2.4 `transforms.FiveCrop`

```python
torchvision.transforms.FiveCrop(size)
```
>  - **功能**：`上下左右中心裁剪`

### 2.5 `transforms.TenCrop`

```python
torchvision.transforms.TenCrop(size, vertical_flip=False)
```
>  - **功能**：`上下左右中心裁剪后翻转`，在图像的上下左右以及中心裁剪出尺寸为size的5张图片，TenCrop对这5张图片进行水平或者垂直镜像获得10张图片，
>   - **size**: 所需裁剪图片尺寸
>   - **vertical_flip**:  是否垂直翻转

[transforms.Compose()使用](https://zhuanlan.zhihu.com/p/476220305)
```python
# torchvision.transforms.CenterCrop
# Compose装载操作组合的容器
# 定义Compose 先缩放 后中心裁剪 最后转为tensor张量
transforms = T.Compose([T.Resize(224),T.CenterCrop(224),T.ToTensor()])
# 传入transforms中的数据是PIL数据，lena_t为tensor
dog_t = transforms(dog)  
# 3*224*224 ; 当T.CenterCrop()的参数大于T.Resize()的参数时，周围用0填充
dog_t.shape  
# 最后再转换格式为PILImage
to_pil(dog_t)
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/88eef293e69f472d9769f9bcccc8f1d0.png)

```python
# torchvision.transforms.CenterCrop
# Compose装载操作组合的容器
# 定义Compose 先缩放 后随机裁剪，上下填充64 左右填充16 最后转为tensor张量
transforms = T.Compose([T.Resize(224),T.RandomCrop(224, padding=(16, 64)),T.ToTensor()])  
# 传入transforms中的数据是PIL数据，lena_t为tensor
dog_t = transforms(dog)  
# 3*224*224 ; 当T.CenterCrop()的参数大于T.Resize()的参数时，周围用0填充
dog_t.shape  
# 最后再转换格式为PILImage
to_pil(dog_t)
# Resize：缩放
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/c1d9699648c34f8dac2383e329dcf0cf.png)

## 3. transforms——Flip 翻转

### 3.1 `transforms.RandomHorizontalFlip`

```python
torchvision.transforms.RandomHorizontalFlip(p=0.5)
```
>  - **功能**：`随机水平翻转`


### 3.2 `transforms.RandomVerticalFlip`

```python
torchvision.transforms.RandomVerticalFlip(p=0.5)
```
>  - **功能**：`依据水平（左右）或垂直（上下）翻转图片（随机垂直翻转）`
>   - **p**: 翻转概率

### 3.3 `transforms.RandomRotation`

```python
torchvision.transforms.RandomRotation(degrees, resample=False, expand=False, center=None)
```

>  - **功能**：`随机旋转图片`
>   - **degrees**: 旋转角度
当为`a`时，在(-a, a)之间选择旋转角度；
当为`(a, b)`时，在(a, b)之间选择旋转角度。
>   - **resample**: 重采样方法
>   - **expand**: 是否扩大图片，以保持原图信息
>  - **center**: 中心  例如 (0, 0)

```python
# torchvision.transforms.RandomHorizontalFlip
# 随机水平翻转 
# 定义Compose 先缩放 后根据概率随机水平翻转 最后转为tensor张量
transforms = T.Compose([T.Resize(224),T.RandomHorizontalFlip(p=0.5),T.ToTensor()])  
# 传入transforms中的数据是PIL数据，lena_t为tensor
dog_t = transforms(dog)  
# 3*224*224 ; 当T.CenterCrop()的参数大于T.Resize()的参数时，周围用0填充
dog_t.shape 
to_pil(dog_t)
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/2865269626504c1b9096495c0ba9d7fe.png)

```python
# torchvision.transforms.RandomRotation
# 随机翻转 
# 定义Compose 先缩放 后随机旋转 30° 旋转中心(0, 0) 扩大图片 最后转为tensor张量
transforms = T.Compose([T.Resize(224),T.RandomRotation(30, center=(0, 0), expand=True),T.ToTensor()])  # Resize：缩放
# 传入transforms中的数据是PIL数据，lena_t为tensor
dog_t = transforms(dog)  
# 3*224*224 ; 当T.CenterCrop()的参数大于T.Resize()的参数时，周围用0填充
dog_t.shape 
to_pil(dog_t)
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/e18640e6ec16488d81108fac732d5e34.png)

## 4. 图像变换

### 4.1 `transforms.Pad`
```python
torchvision.transforms.Pad(padding, fill=0, padding_mode='constant')
```
>  - **功能**：`对图像边缘进行填充`
>   - **padding**: 设置填充大小
当为`a`时，上下左右均填充a个像素；
当为`(a, b)`时，上下填充b个像素，左右填充a个像素；
当为`(a, b, c, d)`时，左、上、右、下分别填充a、b、c、d。
>   - **padding_mode**: 填充模式，有4种模式，`constant`、`edge`、`reflect`和`symmetric` 见上边详细
>   - **fill**:  constant时，设置填充的像素值，（R, G, B）or（Gray）

```python
# constant padding 上下左右 20 填充红色RGB 
transforms = T.Compose([T.Resize(224),T.Pad(padding=20, fill=(255, 0, 0), padding_mode='constant'),T.ToTensor()])  # Resize：缩放
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/3269374e34f84fb8bf543d08f50ec6c9.png)

```python
# 镜像填充。这时`padding_mode`属性不是`constant`， fill 属性不再生效。
transforms = T.Compose([T.Resize(224),T.Pad(padding=(6, 12, 24, 48), fill=(255, 0, 0), padding_mode='symmetric'),T.ToTensor()])  # Resize：缩放
```
**这是原图：**
![Alt Text](/images/posts/f38cbdf22ca7456fadd47b689a31e330.jpeg)
**处理过后：**
![Alt Text](/images/posts/2a92fcdcb0c0498aa2c9904da9b14342.png)

### 4.2 `transforms.ColorJitter`
```python
torchvision.transforms.ColorJitter(brightness=0, contrast=0, saturation=0, hue=0)
```
>  - **功能**：`调整亮度、对比度、饱和度和色相`
>   - **brightness**: 亮度调整因子
当为`a`时，从 [𝑚𝑎𝑥(0,1−𝑎),1+𝑎] 中随机选择；
当为`(a, b)`时，从 [𝑎,𝑏] 中随机选择。
>   - **contrast**: 对比度参数，同brightness
>   - **saturation**: 饱和度参数，同brightness
>   - **hue**:  色相参数
当为`a`时，从 [−𝑎,𝑎] 中选择参数，注： 0≤𝑎≤0.5
当为`(a, b)`时，从 [𝑎,𝑏] 中选择参数，注： −0.5≤𝑎≤𝑏≤0.5

```python
transforms = T.Compose([T.Resize(224),T.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.5, hue=0.3),T.ToTensor()])  # Resize：缩放
```
**狗狗颜色不太明显，换成了一只猫**
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/937e56c9c450483db4edaa89c044f05b.png)

### 4.3 `transforms.Grayscale`
```python
torchvision.transforms.Grayscale(num_output_channels=1)
```
>  - **功能**：`将图片转换为灰度图`
>   - **num_output_channels**: 输出的`通道数`。只能设置为 1 或者 3 (如果在后面使用了transforms.Normalize，则要设置为 3，因为transforms.Normalize只能接收 3 通道的输入)

**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/bcc3606b0ea84a49b7569d11e6d96f4b.png)


### 4.4 `transforms.RandomGrayscale`
```python
torchvision.transforms.RandomGrayscale(p=0.1)
```
>  - **功能**：`依概率将图片转换为灰度图`
>   - **p**: `概率值`，图像被转换为灰度图的概率

```python
transforms = T.Compose([T.Resize(224),T.RandomGrayscale(p=0.5),T.ToTensor()])  
```
### 4.5 `transforms.RandomAffine`
```python
torchvision.transforms.RandomAffine(degrees, translate=None, scale=None, shear=None, resample=0, fillcolor=0)
```
>  - **功能**：`对图像进行仿射变换`，仿射变换是二维的线性变换，由五种基本原子变换构成，分别是`旋转、平移、缩放、错切和翻转`
>   - **translate**: 平移区间设置，如(a, b)，a设置宽(width)，b设置高(height)，图像在宽维度平移区间为 `- img_width×a < dx < img_width×a`
>   - **scale**: 缩放比例（以面积为单位）
>   - **fill_color**: 填充颜色设置
>   - **shear**: 错切角度设置，有水平错切和垂直错切
>   若为`a`，则仅在x轴错切，错切角度在(-a, a)之间；
若为`(a, b)`，则a设置x轴角度，b设置y的角度；
若为`(a, b, c, d)`，则a、b设置x轴角度，c、d设置y轴角度。
>   - **resample**: 重采样方式，有`NEAREST、BILINEAR、BICUBIC`


```python
# 中心旋转 30 度
transforms = T.Compose([T.Resize(224),T.RandomAffine(30),T.ToTensor()]) 
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/34d1de54acc94043a80665fe3d816eda.png)

```python
# 平移
transforms = T.Compose([T.Resize(224),T.RandomAffine(degrees=0, translate=(0.5, 0.3)),T.ToTensor()])
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
![Alt Text](/images/posts/97e0d949ac224058af2af7497c6bdc4f.png)

```python
# 缩放
transforms = T.Compose([T.Resize(224),T.RandomAffine(degrees=0, scale=(0.6, 0.6)),T.ToTensor()])  # Resize：缩放
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/7365b0ad9dc342a895b5acd4d6c1b6c1.png)

```python
# 错切
transforms = T.Compose([T.Resize(224),T.RandomAffine(degrees=0, shear=(0, 30, 0, 30)),T.ToTensor()]) 
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/2de5d603099040e0a52fe81a46a3c505.png)

```python
# 错切
transforms = T.Compose([T.Resize(224),T.RandomAffine(degrees=0, shear=30, fillcolor=(255, 0, 0)),T.ToTensor()])
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/47b31e68544f44a7a43d23e9e7c10145.png)

### 4.6 `transforms.RandomErasing`
```python
torchvision.transforms.RandomErasing(p=0.5, scale=(0.02, 0.33), ratio=(0.3, 3.3), value=0, inplace=False)
```
>  - **功能**：`对图像进行随机遮挡`
>   - **p**: 概率值，执行该操作的概率
>   - **scale**: 遮挡区域的面积
>   - **ratio**: 遮挡区域长宽比
>   - **value**: 设置遮挡区域的像素值，（R, G, B）or（Gray）

```python
# 对图像进行随机遮挡。
# 输入是 tensor  先执行transforms.ToTensor()
transforms = T.Compose([T.Resize(224), T.ToTensor(), T.RandomErasing(p=0.5, scale=(0.03, 0.32), ratio=(0.2, 3.0), value=0, inplace=False)])
```
**这是原图：**
![Alt Text](/images/posts/a7c92405073e466a8287f0517650f777.jpeg)
**处理过后：**
![Alt Text](/images/posts/0b4172e0a459455ea13057abe250a2f4.png)

```python
transforms = T.Compose([T.Resize(224), T.ToTensor(), T.RandomErasing(p=1, scale=(0.03, 0.32), ratio=(0.2, 3.0), value='random')])
```
![Alt Text](/images/posts/95ca6f13c63d47f9ae8ddf2d521380eb.png)



### 4.7 `transforms.Lambda`
```python
torchvision.transforms.Lambda(lambd)
```
>  - **功能**：`用户自定义lambda方法`
>   - **lambd**: lambda匿名函数
>   例如：transforms.Lambda(lambda crops: torch.stack([transforms.Totensor()(crop) for crop in crops]))

### 4.8 `transforms.Resize`

>  - **功能**：`将输入图像(PIL Image or Tensor)调整为给定的大小`。如果图像是torch张量，则期望它具有[C，H, W]形状，C其中表示任意数量的张量维度
>   - **size (sequence or int)**: 期望输出大小。如果size是(h, w)这样的序列，则输出size将与此匹配。如果size为int，图像的较小边缘将匹配此数字。即，如果高度>宽度，那么图像将被重新缩放为(size*高度/宽度，size)
>   - **interpolation (InterpolationMode)**: 由torchvision.transforms.InterpolationMode定义的期望插值枚举。默认为InterpolationMode.BILINEAR。如果输入是张量，只有InterpolationMode
>   - **max_size (int, optional)**: 调整后图像的长边允许的最大值:如果根据size调整后图像的长边大于max size，则再次调整图像，使长边等于max size。因此，size可能被否决，即较小的边可能比大小短。这只在size为int(或在torchscript模式下长度为1的序列)时才支持。
>   - **antialias (bool, optional)**:  抗锯齿标志。如果img是PIL Image，该标志将被忽略，并且始终使用反别名。如果img是Tensor，该标志默认为False, InterpolationMode可以设置为True。双线性和插值模式。双三次的模式。这有助于使PIL图像的输出和张量更接近。    	

### 4.9 `transforms.Totensor`
   >  - **功能**：将原始的PILImage格式或者numpy.array格式的数据格式化为可被pytorch快速处理的张量类型。
输入模式为（L、LA、P、I、F、RGB、YCbCr、RGBA、CMYK、1）的PIL Image或numpy.ndarray (形状为H x W x C)数据范围是[0, 255] 到一个Torch.FloatTensor，其形状 (C x H x W) 在 [0.0, 1.0] 范围内。
```python
import numpy as np
from torchvision import transforms

a = np.random.random((224,224,3))
transform = transforms.Compose([
    transforms.ToTensor()
])
b = transform(a)
print(b.shape)
# torch.Size([3, 224, 224])
```

### 4.10 `transforms.Normalize`

数据标准化，即均值为0，标准差为1

>  - **功能**：要将图像三个通道的数据 整理到 [-1,1] 之间 ，可以加快模型的收敛
    对图像张量的每一个数据进行如下公式操作：
    output[channel] = (input[channel] - mean[channel]) / std[channel],
     返回归一化张量图像 （返回类型 type）
>  - **mean**：(sequence)每个通道的均值序列
>  - **std**：(sequence)每个通道的标准差序列
>  - **inplace**：(bool，可选)bool值，使该操作就地执行



## 5. transforms的操作
### 5.1 `transforms.RandomChoice`


```python
torchvision.transforms.RandomChoice(transforms)
```


>  - **功能**：从一系列transforms方法中`随机挑选`一个


### 5.2 `transforms.RandomApply`

```python
torchvision.transforms.RandomApply(transforms, p=0.5)
```

>  - **功能**：`依据概率`执行一组transforms操作

### 5.3 `transforms.RandomOrder`

```python
torchvision.transforms.RandomOrder(transforms)
```

>  - **功能**：对一组transforms操作`打乱顺序`

## 6. 自定义transforms

> **自定义transforms要素**：
> - 仅接收一个参数，返回一个参数
> - 注意上下游的输出与输入

```python
class Compose(object):
    def __call__(self, img):
        for t in transforms:
            img = t(img)
        return img
```
**通过类实现多参数传入：**

```python
class YourTransforms(object):
    def __init__(self, transforms):
        self.transforms = transforms
    def __call__(self, img):
        for t in self.transforms:
            img = t(img)
        return img
```

> **椒盐噪声**又称为脉冲噪声，是一种随机出现的白点或者黑点，白点称为盐噪声，黑色为椒噪声。
信噪比（Signal-Noise Rate，SNR）是衡量噪声的比例，图像中为图像像素的占比。

```python
class AddPepperNoise(object):
    def __init__(self, snr, p):
        self.snr = snr
        self.p = p
    def __call__(self, img):
        # 添加椒盐噪声具体实现过程
        img = None
        return img
```
## 汇总
### transforms方法

1. 裁剪  
    a. transforms.CenterCrop  
    b. transforms.RandomCrop  
    c. transforms.RandomResizedCrop  
    d. transforms.FiveCrop  
    e. transforms.TenCrop  
2. 翻转和旋转  
    a. transforms.RandomHorizontalFlip  
    b. transforms.RandomVerticalFlip  
    c. transforms.RandomRotation  
3. 图像变换  
    a. transforms.Pad  
    b. transforms.ColorJitter  
    c. transforms.Grayscale  
    d. transforms.RandomGrayscale  
    e. transforms.RandomAffine  
    f. transforms.LinearTransformation   
    g. transforms.RandomErasing  
    h. transforms.Lambda  
    i. transforms.Resize  
    j. transforms.Totensor  
    k. transforms.Normalize  
4. transforms的操作  
    a. transforms.RandomChoice  
    b. transforms.RandomApply  
    c. transforms.RandomOrder  

> 部分学习内容来自： 天池实验室

