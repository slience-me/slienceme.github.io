# yolov8 整体操作流程

::: tip 提示
注意：后面相关的脚本执行都在这个中
![image-20250416203108011](/images/yolov8/image-20250416203108011.png)
如果一定要用开发环境的终端，要选择cmd 不是powershell
:::

## 1. 环境相关

### 1.1 有Anaconda

=>打开它

![image-20250416195632153](/images/yolov8/image-20250416195632153.png)

![image-20250416200027876](/images/yolov8/image-20250416200027876.png)

先创建一个虚拟环境`yolov8`

```bash
conda create -n yolov8 python=3.10.16
```

由于我创建过了，我换一个名字, 下面是安装日志

```bash
(base) C:\Users\slien>conda create -n yolov8copy python=3.10.16
Retrieving notices: ...working... done
Channels:
 - defaults
Platform: win-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: C:\Users\slien\.conda\envs\yolov8copy

  added / updated specs:
    - python=3.10.16


The following NEW packages will be INSTALLED:

  bzip2              pkgs/main/win-64::bzip2-1.0.8-h2bbff1b_6
  ca-certificates    pkgs/main/win-64::ca-certificates-2025.2.25-haa95532_0
  libffi             pkgs/main/win-64::libffi-3.4.4-hd77b12b_1
  openssl            pkgs/main/win-64::openssl-3.0.16-h3f729d1_0
  pip                pkgs/main/win-64::pip-25.0-py310haa95532_0
  python             pkgs/main/win-64::python-3.10.16-h4607a30_1
  setuptools         pkgs/main/win-64::setuptools-75.8.0-py310haa95532_0
  sqlite             pkgs/main/win-64::sqlite-3.45.3-h2bbff1b_0
  tk                 pkgs/main/win-64::tk-8.6.14-h0416ee5_0
  tzdata             pkgs/main/noarch::tzdata-2025a-h04d1e81_0
  vc                 pkgs/main/win-64::vc-14.42-haa95532_5
  vs2015_runtime     pkgs/main/win-64::vs2015_runtime-14.42.34433-hbfb602d_5
  wheel              pkgs/main/win-64::wheel-0.45.1-py310haa95532_0
  xz                 pkgs/main/win-64::xz-5.6.4-h4754444_1
  zlib               pkgs/main/win-64::zlib-1.2.13-h8cc25b3_1


Proceed ([y]/n)? y   ========》 # 这里输入 y 回车 《============


Downloading and Extracting Packages:

Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate yolov8copy   激活环境
#
# To deactivate an active environment, use
#
#     $ conda deactivate 取消激活
```

然后激活环境

```bash
conda activate yolov8
```

![image-20250416200550795](/images/yolov8/image-20250416200550795.png)

### 1.2 没有Anaconda

> 没有下载一个  [Anaconda官网](https://www.anaconda.com/download/success)

## 2. 下载代码

### 2.1 可以访问Github

如果可以访问Github情况下：

代码地址： https://github.com/ultralytics/ultralytics

#### 有git情况

```bash
# 找到合适的目录： 例如：D:\codeHub
# 继续用刚才的
# 依此输入下面内容 `>`后面 
> D:    
> cd D:\codeHub
> git clone git@github.com:ultralytics/ultralytics.git
```

![image-20250416201056639](/images/yolov8/image-20250416201056639.png)

![image-20250416201313072](/images/yolov8/image-20250416201313072.png)

#### 没有git情况

点击=>  [下载链接](https://github.com/ultralytics/ultralytics/archive/refs/heads/main.zip)

![image-20250416201517786](/images/yolov8/image-20250416201517786.png)

解压到对应位置即可

### 2.2 无法访问Github

使用我的临时仓库：
代码地址：https://gitee.com/slienceme/ultralytics

同上面git流程

## 3. 开始项目

### 3.1 起步测试

如果有pycharm或者vscode都可以

打开项目路径 , 例如`D:\codeHub\projectHub\ultralytics`

打开后如下图左边vscode(插件Material Icon Theme)右侧pycharm

![image-20250416202426100](/images/yolov8/image-20250416202426100.png)![image-20250416202536356](/images/yolov8/image-20250416202536356.png)



> 这里需要解释一下，为什么不直接安装这个包，直接安装就无法更改源码
> ![image-20250416202732144](/images/yolov8/image-20250416202732144.png)



首次使用需要安装，这里采用本地安装

```bash
> D:    # 切换盘符
> cd D:\codeHub\projectHub\ultralytics   # 打开文件
# Install the package in editable mode for development

# 记得激活环境
conda env list  # 查询虚拟环境列表
conda activate yolov8   # 激活环境

> pip install -e .      # 本地安装
```

![image-20250416203014863](/images/yolov8/image-20250416203014863.png)

![image-20250416203019927](/images/yolov8/image-20250416203019927.png)

安装日志(由于我安装了，所以全是缓存，正常是下载)：

```bash
(yolov8) D:\codeHub\projectHub\ultralytics>pip install -e .
Obtaining file:///D:/codeHub/projectHub/ultralytics
  Installing build dependencies ... done
  Checking if build backend supports build_editable ... done
  Getting requirements to build editable ... done
  Preparing editable metadata (pyproject.toml) ... done
Requirement already satisfied: numpy<=2.1.1,>=1.23.0 in c:\users\slien\.conda\envs\yolov8copy\lib\site-packages (from ultralytics==8.3.109) (2.1.1)
Collecting matplotlib>=3.3.0 (from ultralytics==8.3.109)
  Using cached matplotlib-3.10.1-cp310-cp310-win_amd64.whl.metadata (11 kB)
..............
Using cached matplotlib-3.10.1-cp310-cp310-win_amd64.whl (8.1 MB)
Using cached pandas-2.2.3-cp310-cp310-win_amd64.whl (11.6 MB)
Using cached seaborn-0.13.2-py3-none-any.whl (294 kB)
Using cached torchvision-0.21.0-cp310-cp310-win_amd64.whl (1.6 MB)
Using cached ultralytics_thop-2.0.14-py3-none-any.whl (26 kB)
Building wheels for collected packages: ultralytics
  Building editable for ultralytics (pyproject.toml) ... done
  Created wheel for ultralytics: filename=ultralytics-8.3.109-0.editable-py3-none-any.whl size=23372 sha256=78af81ef074a647b44013777eee29f3e604344c268d6e1abe8a40cb1d5daa025
  Stored in directory: C:\Users\slien\AppData\Local\Temp\pip-ephem-wheel-cache-hqfw8uc4\wheels\06\f8\73\62d38322a031ca64f183e0af65dafcdd52dc4ddd83fc920119
Successfully built ultralytics
Installing collected packages: pandas, matplotlib, ultralytics-thop, torchvision, seaborn, ultralytics
Successfully installed matplotlib-3.10.1 pandas-2.2.3 seaborn-0.13.2 torchvision-0.21.0 ultralytics-8.3.109 ultralytics-thop-2.0.14
(yolov8) D:\codeHub\projectHub\ultralytics>
```

尝试执行：

```bash
# 当前路径
(yolov8) D:\codeHub\projectHub\ultralytics>

> yolo predict model=yolov8n.pt source=ultralytics/assets/bus.jpg   # > 运行指令  yolov8n.pt 没有首次会下载
```

运行日志：

> 这里同样存在下载文件，这个有访问github问题再单独处理

```bash
(yolov8) D:\codeHub\projectHub\ultralytics>yolo predict model=yolov8n.pt source=ultralytics/assets/bus.jpg
Downloading https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8n.pt to 'yolov8n.pt'...
100%|█████████████████████████████████████████████████████████████████████████████| 6.25M/6.25M [00:02<00:00, 3.19MB/s]
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cpu CPU (13th Gen Intel Core(TM) i5-13500H)
YOLOv8n summary (fused): 72 layers, 3,151,904 parameters, 0 gradients, 8.7 GFLOPs

image 1/1 D:\codeHub\projectHub\ultralytics\ultralytics\assets\bus.jpg: 640x480 4 persons, 1 bus, 1 stop sign, 309.4ms
Speed: 9.8ms preprocess, 309.4ms inference, 4.4ms postprocess per image at shape (1, 3, 640, 480)
Results saved to D:\codeHub\projectHub\ultralytics\runs\detect\predict  #### 《====== 保存路径  ###
💡 Learn more at https://docs.ultralytics.com/modes/predict

(yolov8) D:\codeHub\projectHub\ultralytics>
```

<img src="/images/yolov8/image-20250416204834326.png" alt="image-20250416204834326" style="zoom: 50%;" />

<img src="/images/yolov8/bus.jpg" alt="img" style="zoom:50%;" />

### 3.2 预测

模型预测基本使用

::: code-group

```bash [方式一（命令行）]
yolo detect predict model=./yolov8n.pt source="ultralytics/assets/bus.jpg"
```

```python [方式二 （代码）]
from ultralytics import YOLO

yolo = YOLO("./yolov8n.pt", task="detect")

result = yolo(source="./ultralytics/assets/bus.jpg")
```

:::

![image-20250416210337662](/images/yolov8/image-20250416210337662.png)

![image-20250416211304500](/images/yolov8/image-20250416211304500.png)

```python
from ultralytics import YOLO

yolo = YOLO("./yolov8n.pt", task="detect")

# result = yolo(source="./ultralytics/assets/bus.jpg")  # 图片
# result = yolo(source="./BVN.mp4")    # 视频
# result = yolo(source="screen")      # 屏幕检测
# result = yolo(source=0)      # 摄像头检测

result = yolo(source="./ultralytics/assets/bus.jpg", save=True)  # 图片 save保存结果

```

为了好操作，安装一个`jupyterlab`

```bash
pip install jupyterlab
```

![image-20250416214257759](/images/yolov8/image-20250416214257759.png)



<img src="/images/yolov8/image-20250416214651803.png" alt="image-20250416214651803" style="zoom: 67%;" />

<img src="/images/yolov8/image-20250416214914512.png" alt="image-20250416214914512" style="zoom: 50%;" />

```python
# 检测结果可视化
import matplotlib.pyplot as plt
%matplotlib inline
plt.imshow(result[0].plot()[:,:,::-1])  # bgr -> rgb
```

<img src="/images/yolov8/image-20250416214925645.png" alt="image-20250416214925645" style="zoom: 67%;" />

<img src="/images/yolov8/image-20250416215007131.png" alt="image-20250416215007131" style="zoom:67%;" />

### 3.3 数据集构建

- 准备数据
- labelimg 数据集标注
- make sence 数据集标注
- roboflow 公开数据集

#### 数据准备

图片类型数据 ： 无需额外处理，直接标注

视频类型数据：进行抽帧处理，导出为图片

视频抽帧代码:

```python
import cv2
import matplotlib.pyplot as plt

video = cv2.VideoCapture("./BVN.mp4")
num = 0  # 计数器
save_step = 30 # 间隔帧
while True:
    ret, frame = video.read()
    plt.imshow(frame)
    if not ret:
        break
    num += 1
    if num % save_step == 0:
        cv2.imwrite("D:/codeHub/projectHub/ultralytics/images/"+str(num)+".jpg", frame)  # 我用的绝对路径，相对路径也行
```

#### labelimg

##### 闪退问题

> 闪退：将canvas.py文件 526、530、531行的float改为int。（找不到文件的话，直接搜索就行）
>
> pip list -v 查看路径

```
(yolov8) D:\codeHub\projectHub\ultralytics>pip list -v
Package                   Version        Editable project location         Location                                            Installer
------------------------- -------------- ---------------------------------- ---------
anyio                     4.9.0       c:\users\slien\.conda\envs\yolov8\lib\site-packages pip

进入c:\users\slien\.conda\envs\yolov8\lib\site-packages 搜索canvas.py
```

![image-20250416222623620](/images/yolov8/image-20250416222623620.png)

![image-20250416222716415](/images/yolov8/image-20250416222716415.png)

![image-20250416222833453](/images/yolov8/image-20250416222833453.png)

```python
p.drawRect(int(left_top.x()), int(left_top.y()), int(rect_width), int(rect_height))

if self.drawing() and not self.prev_point.isNull() and not self.out_of_pixmap(self.prev_point):
    p.setPen(QColor(0, 0, 0))
    p.drawLine(int(self.prev_point.x()), 0, int(self.prev_point.x()), int(self.pixmap.height()))
    p.drawLine(0, int(self.prev_point.y()), int(self.pixmap.width()), int(self.prev_point.y()))
```

##### 使用

安装

```bash
pip install labelimg
```

启动

```bash
labelimg
```

关键设置

```bash
autosave
YOLO format
```

<img src="/images/yolov8/image-20250416221119071.png" alt="image-20250416221119071" style="zoom:80%;" />

打开`图片文件夹 Open Dir`

![image-20250416221133059](/images/yolov8/image-20250416221133059.png)

以刚才视频抽帧的图片为例

![image-20250416221249236](/images/yolov8/image-20250416221249236.png)

设置自动保存模式` AutoSave mode`

![image-20250416221645824](/images/yolov8/image-20250416221645824.png)

点击切换模式`yolo mode`

![image-20250416221715292](/images/yolov8/image-20250416221715292.png)![image-20250416221725122](/images/yolov8/image-20250416221725122.png)

选择`标注文件`保存路径 `Annotation`

![image-20250417082459870](/images/yolov8/image-20250417082459870.png)

![image-20250416223056276](/images/yolov8/image-20250416223056276.png)

开始标记(闪退见上面)，右键选择 或者 快捷键W

- 快捷键W 标注框

- AD是左右切换

![image-20250416221807036](/images/yolov8/image-20250416221807036.png)

<img src="/images/yolov8/image-20250416223021194.png" alt="image-20250416223021194" style="zoom:67%;" />

![image-20250417082740534](/images/yolov8/image-20250417082740534.png)

#### make sence数据集标注

> 支持传入模型辅助标注
>
> ![image-20250417084118716](/images/yolov8/image-20250417084118716.png)

第二个标注软件 `make sence` [官网](https://www.makesense.ai/)

<img src="/images/yolov8/image-20250417083023486.png" alt="image-20250417083023486" style="zoom:67%;" />

<img src="/images/yolov8/image-20250417083046997.png" alt="image-20250417083046997" style="zoom:67%;" />

![image-20250417083103146](/images/yolov8/image-20250417083103146.png)

<img src="/images/yolov8/image-20250417083157420.png" alt="image-20250417083157420" style="zoom:50%;" />

再点一下选择标签

![image-20250417083428011](/images/yolov8/image-20250417083428011.png)

添加标签

![image-20250417083638605](/images/yolov8/image-20250417083638605.png)

<img src="/images/yolov8/image-20250417083213740.png" alt="image-20250417083213740" style="zoom: 67%;" />

<img src="/images/yolov8/image-20250417083252014.png" alt="image-20250417083252014" style="zoom:67%;" />

整体

![image-20250417083814671](/images/yolov8/image-20250417083814671.png)

导出数据

![image-20250417083834205](/images/yolov8/image-20250417083834205.png)

![image-20250417083856919](/images/yolov8/image-20250417083856919.png)

![image-20250417083928263](/images/yolov8/image-20250417083928263.png)

![image-20250416213905735](/images/yolov8/image-20250416213905735.png)

#### 公开数据集roboflow

地址  https://public.roboflow.com/object-detection

https://universe.roboflow.com/

<img src="/images/yolov8/image-20250417084748784.png" alt="image-20250417084748784" style="zoom:67%;" />

### 3.4 模型训练

#### 数据集处理

训练前准备

- images 存放图片
  - train 训练集图片
  - val 验证集图片
- labels 存放标签
  - train 训练集标签文件，要与训练集图片名称一一对应 (名称要求一样)
  - val 验证集标签文件，要与验证集图片名称一一对应

抽帧图片 + 标注文件

<img src="/images/yolov8/image-20250417090054460.png" alt="image-20250417090054460" style="zoom:67%;" />

<img src="/images/yolov8/image-20250417090129785.png" alt="image-20250417090129785" style="zoom:67%;" />



抽出一些图片到验证集中，注意标注需要相同

我用这些做验证集，其他作为训练集

![image-20250417090331674](/images/yolov8/image-20250417090331674.png)

![image-20250417090540488](/images/yolov8/image-20250417090540488.png)

![image-20250417090556767](/images/yolov8/image-20250417090556767.png)

最后给数据集起个名称，如SL，将其放到根项目的./datasets/下

![image-20250417090800757](/images/yolov8/image-20250417090800757.png)

![image-20250417090924224](/images/yolov8/image-20250417090924224.png)

找到描述文件

![image-20250417091311524](/images/yolov8/image-20250417091311524.png)

复制一份到项目根目录，改写，重命名

![image-20250417091404176](/images/yolov8/image-20250417091404176.png)

![image-20250417091442825](/images/yolov8/image-20250417091442825.png)

![image-20250417093647957](/images/yolov8/image-20250417093647957.png)

> path 实在不行就用绝对路径

#### 开始训练

::: code-group

```bash [方式一（命令行）]
yolo detect train model=./yolov8n.pt data="SL.yaml" epochs=30 workers=1 batch=16    # 使用哪个模型迁移学习
```

```python [方式二 （代码）]
from ultralytics import YOLO

# load a model
yolo = YOLO("./yolov8n.pt")

# train the model
model.train(data="data.yaml", workers=1, epochs=50, batch=16)
```

:::

训练案例

```python
from ultralytics import YOLO

# Load a COCO-pretrained YOLOv8n model
model = YOLO("yolov8n.pt")

# Display model information (optional)
model.info()

# Train the model on the COCO8 example dataset for 100 epochs
results = model.train(data="coco8.yaml", epochs=100, imgsz=640)

# Run inference with the YOLOv8n model on the 'bus.jpg' image
results = model("path/to/bus.jpg")
```

全部可配置内容：
![image-20250417100653083](/images/yolov8/image-20250417100653083.png)

复制配置文件`yolo copy-cfg`, 然后按照需要调参

```bash
(yolov8) D:\codeHub\projectHub\ultralytics>yolo copy-cfg
D:\codeHub\projectHub\ultralytics\ultralytics\cfg\default.yaml copied to D:\codeHub\projectHub\ultralytics\default_copy.yaml
Example YOLO command with this new custom cfg:
    yolo cfg='D:\codeHub\projectHub\ultralytics\default_copy.yaml' imgsz=320 batch=8

(yolov8) D:\codeHub\projectHub\ultralytics>
```

![image-20250417101135902](/images/yolov8/image-20250417101135902.png)

直接用配置文件训练

```bash
yolo cfg=default_copy.yaml
```

::: code-group

```python [全部可配置内容]
# Ultralytics 🚀 AGPL-3.0 License - https://ultralytics.com/license

# Global configuration YAML with settings and hyperparameters for YOLO training, validation, prediction and export
# For documentation see https://docs.ultralytics.com/usage/cfg/

task: detect # (str) YOLO task, i.e. detect, segment, classify, pose, obb
mode: train # (str) YOLO mode, i.e. train, val, predict, export, track, benchmark

# Train settings -------------------------------------------------------------------------------------------------------
model: # (str, optional) path to model file, i.e. yolov8n.pt, yolov8n.yaml
data: # (str, optional) path to data file, i.e. coco8.yaml
epochs: 100 # (int) number of epochs to train for
time: # (float, optional) number of hours to train for, overrides epochs if supplied
patience: 100 # (int) epochs to wait for no observable improvement for early stopping of training
batch: 16 # (int) number of images per batch (-1 for AutoBatch)
imgsz: 640 # (int | list) input images size as int for train and val modes, or list[h,w] for predict and export modes
save: True # (bool) save train checkpoints and predict results
save_period: -1 # (int) Save checkpoint every x epochs (disabled if < 1)
cache: False # (bool) True/ram, disk or False. Use cache for data loading
device: # (int | str | list, optional) device to run on, i.e. cuda device=0 or device=0,1,2,3 or device=cpu
workers: 8 # (int) number of worker threads for data loading (per RANK if DDP)
project: # (str, optional) project name
name: # (str, optional) experiment name, results saved to 'project/name' directory
exist_ok: False # (bool) whether to overwrite existing experiment
pretrained: True # (bool | str) whether to use a pretrained model (bool) or a model to load weights from (str)
optimizer: auto # (str) optimizer to use, choices=[SGD, Adam, Adamax, AdamW, NAdam, RAdam, RMSProp, auto]
verbose: True # (bool) whether to print verbose output
seed: 0 # (int) random seed for reproducibility
deterministic: True # (bool) whether to enable deterministic mode
single_cls: False # (bool) train multi-class data as single-class
rect: False # (bool) rectangular training if mode='train' or rectangular validation if mode='val'
cos_lr: False # (bool) use cosine learning rate scheduler
close_mosaic: 10 # (int) disable mosaic augmentation for final epochs (0 to disable)
resume: False # (bool) resume training from last checkpoint
amp: True # (bool) Automatic Mixed Precision (AMP) training, choices=[True, False], True runs AMP check
fraction: 1.0 # (float) dataset fraction to train on (default is 1.0, all images in train set)
profile: False # (bool) profile ONNX and TensorRT speeds during training for loggers
freeze: None # (int | list, optional) freeze first n layers, or freeze list of layer indices during training
multi_scale: False # (bool) Whether to use multiscale during training
# Segmentation
overlap_mask: True # (bool) merge object masks into a single image mask during training (segment train only)
mask_ratio: 4 # (int) mask downsample ratio (segment train only)
# Classification
dropout: 0.0 # (float) use dropout regularization (classify train only)

# Val/Test settings ----------------------------------------------------------------------------------------------------
val: True # (bool) validate/test during training
split: val # (str) dataset split to use for validation, i.e. 'val', 'test' or 'train'
save_json: False # (bool) save results to JSON file
conf: # (float, optional) object confidence threshold for detection (default 0.25 predict, 0.001 val)
iou: 0.7 # (float) intersection over union (IoU) threshold for NMS
max_det: 300 # (int) maximum number of detections per image
half: False # (bool) use half precision (FP16)
dnn: False # (bool) use OpenCV DNN for ONNX inference
plots: True # (bool) save plots and images during train/val

# Predict settings -----------------------------------------------------------------------------------------------------
source: # (str, optional) source directory for images or videos
vid_stride: 1 # (int) video frame-rate stride
stream_buffer: False # (bool) buffer all streaming frames (True) or return the most recent frame (False)
visualize: False # (bool) visualize model features
augment: False # (bool) apply image augmentation to prediction sources
agnostic_nms: False # (bool) class-agnostic NMS
classes: # (int | list[int], optional) filter results by class, i.e. classes=0, or classes=[0,2,3]
retina_masks: False # (bool) use high-resolution segmentation masks
embed: # (list[int], optional) return feature vectors/embeddings from given layers

# Visualize settings ---------------------------------------------------------------------------------------------------
show: False # (bool) show predicted images and videos if environment allows
save_frames: False # (bool) save predicted individual video frames
save_txt: False # (bool) save results as .txt file
save_conf: False # (bool) save results with confidence scores
save_crop: False # (bool) save cropped images with results
show_labels: True # (bool) show prediction labels, i.e. 'person'
show_conf: True # (bool) show prediction confidence, i.e. '0.99'
show_boxes: True # (bool) show prediction boxes
line_width: # (int, optional) line width of the bounding boxes. Scaled to image size if None.

# Export settings ------------------------------------------------------------------------------------------------------
format: torchscript # (str) format to export to, choices at https://docs.ultralytics.com/modes/export/#export-formats
keras: False # (bool) use Kera=s
optimize: False # (bool) TorchScript: optimize for mobile
int8: False # (bool) CoreML/TF INT8 quantization
dynamic: False # (bool) ONNX/TF/TensorRT: dynamic axes
simplify: True # (bool) ONNX: simplify model using `onnxslim`
opset: # (int, optional) ONNX: opset version
workspace: None # (float, optional) TensorRT: workspace size (GiB), `None` will let TensorRT auto-allocate memory
nms: False # (bool) CoreML: add NMS

# Hyperparameters ------------------------------------------------------------------------------------------------------
lr0: 0.01 # (float) initial learning rate (i.e. SGD=1E-2, Adam=1E-3)
lrf: 0.01 # (float) final learning rate (lr0 * lrf)
momentum: 0.937 # (float) SGD momentum/Adam beta1
weight_decay: 0.0005 # (float) optimizer weight decay 5e-4
warmup_epochs: 3.0 # (float) warmup epochs (fractions ok)
warmup_momentum: 0.8 # (float) warmup initial momentum
warmup_bias_lr: 0.1 # (float) warmup initial bias lr
box: 7.5 # (float) box loss gain
cls: 0.5 # (float) cls loss gain (scale with pixels)
dfl: 1.5 # (float) dfl loss gain
pose: 12.0 # (float) pose loss gain
kobj: 1.0 # (float) keypoint obj loss gain
nbs: 64 # (int) nominal batch size
hsv_h: 0.015 # (float) image HSV-Hue augmentation (fraction)
hsv_s: 0.7 # (float) image HSV-Saturation augmentation (fraction)
hsv_v: 0.4 # (float) image HSV-Value augmentation (fraction)
degrees: 0.0 # (float) image rotation (+/- deg)
translate: 0.1 # (float) image translation (+/- fraction)
scale: 0.5 # (float) image scale (+/- gain)
shear: 0.0 # (float) image shear (+/- deg)
perspective: 0.0 # (float) image perspective (+/- fraction), range 0-0.001
flipud: 0.0 # (float) image flip up-down (probability)
fliplr: 0.5 # (float) image flip left-right (probability)
bgr: 0.0 # (float) image channel BGR (probability)
mosaic: 1.0 # (float) image mosaic (probability)
mixup: 0.0 # (float) image mixup (probability)
copy_paste: 0.0 # (float) segment copy-paste (probability)
copy_paste_mode: "flip" # (str) the method to do copy_paste augmentation (flip, mixup)
auto_augment: randaugment # (str) auto augmentation policy for classification (randaugment, autoaugment, augmix)
erasing: 0.4 # (float) probability of random erasing during classification training (0-0.9), 0 means no erasing, must be less than 1.0.

# Custom config.yaml ---------------------------------------------------------------------------------------------------
cfg: # (str, optional) for overriding defaults.yaml

# Tracker settings ------------------------------------------------------------------------------------------------------
tracker: botsort.yaml # (str) tracker type, choices=[botsort.yaml, bytetrack.yaml]
```

```python [我的修改]
# Ultralytics 🚀 AGPL-3.0 License - https://ultralytics.com/license

# Global configuration YAML with settings and hyperparameters for YOLO training, validation, prediction and export
# For documentation see https://docs.ultralytics.com/usage/cfg/

task: detect # (str) YOLO task, i.e. detect, segment, classify, pose, obb
mode: train # (str) YOLO mode, i.e. train, val, predict, export, track, benchmark

# Train settings -------------------------------------------------------------------------------------------------------
model: yolov8n.pt # (str, optional) path to model file, i.e. yolov8n.pt, yolov8n.yaml
data: SL.yaml # (str, optional) path to data file, i.e. coco8.yaml
epochs: 50 # (int) number of epochs to train for
time: # (float, optional) number of hours to train for, overrides epochs if supplied
patience: 50 # (int) epochs to wait for no observable improvement for early stopping of training
batch: 16 # (int) number of images per batch (-1 for AutoBatch)
imgsz: 640 # (int | list) input images size as int for train and val modes, or list[h,w] for predict and export modes
save: True # (bool) save train checkpoints and predict results
save_period: -1 # (int) Save checkpoint every x epochs (disabled if < 1)
cache: False # (bool) True/ram, disk or False. Use cache for data loading
device: # (int | str | list, optional) device to run on, i.e. cuda device=0 or device=0,1,2,3 or device=cpu
workers: 8 # (int) number of worker threads for data loading (per RANK if DDP)
project: # (str, optional) project name
name: # (str, optional) experiment name, results saved to 'project/name' directory
exist_ok: False # (bool) whether to overwrite existing experiment
pretrained: True # (bool | str) whether to use a pretrained model (bool) or a model to load weights from (str)
optimizer: auto # (str) optimizer to use, choices=[SGD, Adam, Adamax, AdamW, NAdam, RAdam, RMSProp, auto]
verbose: True # (bool) whether to print verbose output
seed: 0 # (int) random seed for reproducibility
deterministic: True # (bool) whether to enable deterministic mode
single_cls: False # (bool) train multi-class data as single-class
rect: False # (bool) rectangular training if mode='train' or rectangular validation if mode='val'
cos_lr: False # (bool) use cosine learning rate scheduler
close_mosaic: 10 # (int) disable mosaic augmentation for final epochs (0 to disable)
resume: False # (bool) resume training from last checkpoint
amp: True # (bool) Automatic Mixed Precision (AMP) training, choices=[True, False], True runs AMP check
fraction: 1.0 # (float) dataset fraction to train on (default is 1.0, all images in train set)
profile: False # (bool) profile ONNX and TensorRT speeds during training for loggers
freeze: None # (int | list, optional) freeze first n layers, or freeze list of layer indices during training
multi_scale: False # (bool) Whether to use multiscale during training
# Segmentation
overlap_mask: True # (bool) merge object masks into a single image mask during training (segment train only)
mask_ratio: 4 # (int) mask downsample ratio (segment train only)
# Classification
dropout: 0.0 # (float) use dropout regularization (classify train only)

# Val/Test settings ----------------------------------------------------------------------------------------------------
val: True # (bool) validate/test during training
split: val # (str) dataset split to use for validation, i.e. 'val', 'test' or 'train'
save_json: False # (bool) save results to JSON file
conf: # (float, optional) object confidence threshold for detection (default 0.25 predict, 0.001 val)
iou: 0.7 # (float) intersection over union (IoU) threshold for NMS
max_det: 300 # (int) maximum number of detections per image
half: False # (bool) use half precision (FP16)
dnn: False # (bool) use OpenCV DNN for ONNX inference
plots: True # (bool) save plots and images during train/val

# Predict settings -----------------------------------------------------------------------------------------------------
source: # (str, optional) source directory for images or videos
vid_stride: 1 # (int) video frame-rate stride
stream_buffer: False # (bool) buffer all streaming frames (True) or return the most recent frame (False)
visualize: False # (bool) visualize model features
augment: False # (bool) apply image augmentation to prediction sources
agnostic_nms: False # (bool) class-agnostic NMS
classes: # (int | list[int], optional) filter results by class, i.e. classes=0, or classes=[0,2,3]
retina_masks: False # (bool) use high-resolution segmentation masks
embed: # (list[int], optional) return feature vectors/embeddings from given layers

# Visualize settings ---------------------------------------------------------------------------------------------------
show: False # (bool) show predicted images and videos if environment allows
save_frames: False # (bool) save predicted individual video frames
save_txt: False # (bool) save results as .txt file
save_conf: False # (bool) save results with confidence scores
save_crop: False # (bool) save cropped images with results
show_labels: True # (bool) show prediction labels, i.e. 'person'
show_conf: True # (bool) show prediction confidence, i.e. '0.99'
show_boxes: True # (bool) show prediction boxes
line_width: # (int, optional) line width of the bounding boxes. Scaled to image size if None.

# Export settings ------------------------------------------------------------------------------------------------------
format: torchscript # (str) format to export to, choices at https://docs.ultralytics.com/modes/export/#export-formats
keras: False # (bool) use Kera=s
optimize: False # (bool) TorchScript: optimize for mobile
int8: False # (bool) CoreML/TF INT8 quantization
dynamic: False # (bool) ONNX/TF/TensorRT: dynamic axes
simplify: True # (bool) ONNX: simplify model using `onnxslim`
opset: # (int, optional) ONNX: opset version
workspace: 2 # (float, optional) TensorRT: workspace size (GiB), `None` will let TensorRT auto-allocate memory
nms: False # (bool) CoreML: add NMS

# Hyperparameters ------------------------------------------------------------------------------------------------------
lr0: 0.01 # (float) initial learning rate (i.e. SGD=1E-2, Adam=1E-3)
lrf: 0.01 # (float) final learning rate (lr0 * lrf)
momentum: 0.937 # (float) SGD momentum/Adam beta1
weight_decay: 0.0005 # (float) optimizer weight decay 5e-4
warmup_epochs: 3.0 # (float) warmup epochs (fractions ok)
warmup_momentum: 0.8 # (float) warmup initial momentum
warmup_bias_lr: 0.1 # (float) warmup initial bias lr
box: 7.5 # (float) box loss gain
cls: 0.5 # (float) cls loss gain (scale with pixels)
dfl: 1.5 # (float) dfl loss gain
pose: 12.0 # (float) pose loss gain
kobj: 1.0 # (float) keypoint obj loss gain
nbs: 64 # (int) nominal batch size
hsv_h: 0.015 # (float) image HSV-Hue augmentation (fraction)
hsv_s: 0.7 # (float) image HSV-Saturation augmentation (fraction)
hsv_v: 0.4 # (float) image HSV-Value augmentation (fraction)
degrees: 0.0 # (float) image rotation (+/- deg)
translate: 0.1 # (float) image translation (+/- fraction)
scale: 0.5 # (float) image scale (+/- gain)
shear: 0.0 # (float) image shear (+/- deg)
perspective: 0.0 # (float) image perspective (+/- fraction), range 0-0.001
flipud: 0.0 # (float) image flip up-down (probability)
fliplr: 0.5 # (float) image flip left-right (probability)
bgr: 0.0 # (float) image channel BGR (probability)
mosaic: 1.0 # (float) image mosaic (probability)
mixup: 0.0 # (float) image mixup (probability)
copy_paste: 0.0 # (float) segment copy-paste (probability)
copy_paste_mode: "flip" # (str) the method to do copy_paste augmentation (flip, mixup)
auto_augment: randaugment # (str) auto augmentation policy for classification (randaugment, autoaugment, augmix)
erasing: 0.4 # (float) probability of random erasing during classification training (0-0.9), 0 means no erasing, must be less than 1.0.

# Custom config.yaml ---------------------------------------------------------------------------------------------------
cfg: # (str, optional) for overriding defaults.yaml

# Tracker settings ------------------------------------------------------------------------------------------------------
tracker: botsort.yaml # (str) tracker type, choices=[botsort.yaml, bytetrack.yaml]

```

:::

##### 配置文件训练

::: code-group

```bash [(训练差不多1分钟)(<1s/epoch)]
(yolov8) songbaoxian@ubuntu-Super-Server:~/codehub/ultralytics$ yolo cfg=default_copy.yaml
Overriding /home/songbaoxian/codehub/ultralytics/ultralytics/cfg/default.yaml with default_copy.yaml
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cu124 CUDA:0 (NVIDIA GeForce RTX 2080 Ti, 10825MiB)
engine/trainer: task=detect, mode=train, model=yolov8n.pt, data=SL.yaml, epochs=50, time=None, patience=50, batch=16, imgsz=640, save=True, save_period=-1, cache=False, device=None, workers=8, project=None, name=train2, exist_ok=False, pretrained=True, optimizer=auto, verbose=True, seed=0, deterministic=True, single_cls=False, rect=False, cos_lr=False, close_mosaic=10, resume=False, amp=True, fraction=1.0, profile=False, freeze=None, multi_scale=False, overlap_mask=True, mask_ratio=4, dropout=0.0, val=True, split=val, save_json=False, conf=None, iou=0.7, max_det=300, half=False, dnn=False, plots=True, source=None, vid_stride=1, stream_buffer=False, visualize=False, augment=False, agnostic_nms=False, classes=None, retina_masks=False, embed=None, show=False, save_frames=False, save_txt=False, save_conf=False, save_crop=False, show_labels=True, show_conf=True, show_boxes=True, line_width=None, format=torchscript, keras=False, optimize=False, int8=False, dynamic=False, simplify=True, opset=None, workspace=4, nms=False, lr0=0.01, lrf=0.01, momentum=0.937, weight_decay=0.0005, warmup_epochs=3.0, warmup_momentum=0.8, warmup_bias_lr=0.1, box=7.5, cls=0.5, dfl=1.5, pose=12.0, kobj=1.0, nbs=64, hsv_h=0.015, hsv_s=0.7, hsv_v=0.4, degrees=0.0, translate=0.1, scale=0.5, shear=0.0, perspective=0.0, flipud=0.0, fliplr=0.5, bgr=0.0, mosaic=1.0, mixup=0.0, copy_paste=0.0, copy_paste_mode=flip, auto_augment=randaugment, erasing=0.4, cfg=None, tracker=botsort.yaml, save_dir=runs/detect/train2
Overriding model.yaml nc=80 with nc=1

                   from  n    params  module                                       arguments
  0                  -1  1       464  ultralytics.nn.modules.conv.Conv             [3, 16, 3, 2]
  1                  -1  1      4672  ultralytics.nn.modules.conv.Conv             [16, 32, 3, 2]
  2                  -1  1      7360  ultralytics.nn.modules.block.C2f             [32, 32, 1, True]
  3                  -1  1     18560  ultralytics.nn.modules.conv.Conv             [32, 64, 3, 2]
  4                  -1  2     49664  ultralytics.nn.modules.block.C2f             [64, 64, 2, True]
  5                  -1  1     73984  ultralytics.nn.modules.conv.Conv             [64, 128, 3, 2]
  6                  -1  2    197632  ultralytics.nn.modules.block.C2f             [128, 128, 2, True]
  7                  -1  1    295424  ultralytics.nn.modules.conv.Conv             [128, 256, 3, 2]
  8                  -1  1    460288  ultralytics.nn.modules.block.C2f             [256, 256, 1, True]
  9                  -1  1    164608  ultralytics.nn.modules.block.SPPF            [256, 256, 5]
 10                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 11             [-1, 6]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 12                  -1  1    148224  ultralytics.nn.modules.block.C2f             [384, 128, 1]
 13                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 14             [-1, 4]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 15                  -1  1     37248  ultralytics.nn.modules.block.C2f             [192, 64, 1]
 16                  -1  1     36992  ultralytics.nn.modules.conv.Conv             [64, 64, 3, 2]
 17            [-1, 12]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 18                  -1  1    123648  ultralytics.nn.modules.block.C2f             [192, 128, 1]
 19                  -1  1    147712  ultralytics.nn.modules.conv.Conv             [128, 128, 3, 2]
 20             [-1, 9]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 21                  -1  1    493056  ultralytics.nn.modules.block.C2f             [384, 256, 1]
 22        [15, 18, 21]  1    751507  ultralytics.nn.modules.head.Detect           [1, [64, 128, 256]]
Model summary: 129 layers, 3,011,043 parameters, 3,011,027 gradients, 8.2 GFLOPs

Transferred 319/355 items from pretrained weights
Freezing layer 'model.22.dfl.conv.weight'
AMP: running Automatic Mixed Precision (AMP) checks...
AMP: checks passed ✅
train: Scanning /home/songbaoxian/codehub/ultralytics/datasets/SL/labels/train.cache... 85 images, 0 backgrounds, 0 corrupt: 100%|██████████| 85/85 [00:00<?, ?it/s]
val: Scanning /home/songbaoxian/codehub/ultralytics/datasets/SL/labels/val.cache... 8 images, 0 backgrounds, 0 corrupt: 100%|██████████| 8/8 [00:00<?, ?it/s]
Plotting labels to runs/detect/train2/labels.jpg...
optimizer: 'optimizer=auto' found, ignoring 'lr0=0.01' and 'momentum=0.937' and determining best 'optimizer', 'lr0' and 'momentum' automatically...
optimizer: AdamW(lr=0.002, momentum=0.9) with parameter groups 57 weight(decay=0.0), 64 weight(decay=0.0005), 63 bias(decay=0.0)
Image sizes 640 train, 640 val
Using 8 dataloader workers
Logging results to runs/detect/train2
Starting training for 50 epochs...

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       1/50      2.02G      2.314      4.096      1.557         11        640: 100%|██████████| 6/6 [00:01<00:00,  4.30it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00,  8.19it/s]
                   all          8          8    0.00333          1      0.879      0.464

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       2/50      2.06G      1.781        3.4        1.2          8        640: 100%|██████████| 6/6 [00:00<00:00,  9.46it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 13.16it/s]
                   all          8          8    0.00333          1      0.995      0.668

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       3/50      2.08G      1.375      2.104      1.042          6        640: 100%|██████████| 6/6 [00:00<00:00,  9.67it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.21it/s]
                   all          8          8    0.00333          1      0.995      0.515

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       4/50       2.1G      1.349      1.687      1.107         11        640: 100%|██████████| 6/6 [00:00<00:00, 10.76it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.02it/s]
                   all          8          8    0.00333          1      0.995      0.464

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       5/50      2.11G      1.376      1.643      1.103          9        640: 100%|██████████| 6/6 [00:00<00:00, 10.90it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.62it/s]
                   all          8          8    0.00333          1      0.995      0.609

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       6/50      2.11G      1.299      1.669      1.063          7        640: 100%|██████████| 6/6 [00:00<00:00, 10.89it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.97it/s]
                   all          8          8    0.00333          1      0.995      0.453

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       7/50      2.11G      1.257      1.401      1.043         11        640: 100%|██████████| 6/6 [00:00<00:00, 11.03it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.80it/s]
                   all          8          8    0.00333          1      0.995      0.534

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       8/50      2.11G      1.292      1.367      1.072          9        640: 100%|██████████| 6/6 [00:00<00:00, 11.06it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.62it/s]
                   all          8          8    0.00333          1      0.982      0.424

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       9/50      2.12G      1.256      1.273      1.078         10        640: 100%|██████████| 6/6 [00:00<00:00, 10.83it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.63it/s]
                   all          8          8    0.00333          1      0.995      0.397

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      10/50      2.14G      1.237       1.25       1.09         10        640: 100%|██████████| 6/6 [00:00<00:00, 11.19it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.84it/s]
                   all          8          8    0.00333          1      0.654      0.365

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      11/50      2.15G      1.246      1.382      1.088          9        640: 100%|██████████| 6/6 [00:00<00:00, 10.56it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.43it/s]
                   all          8          8     0.0141          1      0.995      0.716

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      12/50      2.17G      1.288      1.268      1.115          7        640: 100%|██████████| 6/6 [00:00<00:00, 10.68it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.34it/s]
                   all          8          8      0.896          1      0.995      0.625

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      13/50      2.19G      1.255      1.195      1.099         15        640: 100%|██████████| 6/6 [00:00<00:00, 10.24it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 13.63it/s]
                   all          8          8      0.962          1      0.995      0.669

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      14/50      2.21G      1.265      1.205      1.071          4        640: 100%|██████████| 6/6 [00:00<00:00, 10.52it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.81it/s]
                   all          8          8      0.973          1      0.995      0.571

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      15/50      2.22G      1.318      1.163      1.101         13        640: 100%|██████████| 6/6 [00:00<00:00, 11.22it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.10it/s]
                   all          8          8      0.977          1      0.995      0.549

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      16/50      2.24G      1.273      1.112      1.108          8        640: 100%|██████████| 6/6 [00:00<00:00, 10.86it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.09it/s]
                   all          8          8      0.981          1      0.995       0.66

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      17/50      2.26G      1.271      1.186      1.105          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.47it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 13.02it/s]
                   all          8          8       0.99          1      0.995      0.709

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      18/50      2.28G      1.132      1.094      1.016         11        640: 100%|██████████| 6/6 [00:00<00:00, 10.69it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.85it/s]
                   all          8          8      0.991          1      0.995      0.671

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      19/50      2.28G      1.246      1.136      1.096          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.23it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.67it/s]
                   all          8          8      0.993          1      0.995      0.671

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      20/50      2.28G      1.219      1.021      1.082          9        640: 100%|██████████| 6/6 [00:00<00:00, 10.70it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.02it/s]
                   all          8          8      0.993          1      0.995      0.669

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      21/50      2.28G      1.176      1.034      1.032         11        640: 100%|██████████| 6/6 [00:00<00:00, 11.28it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.07it/s]
                   all          8          8      0.993          1      0.995      0.631

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      22/50      2.28G      1.194      1.006      1.066          8        640: 100%|██████████| 6/6 [00:00<00:00, 10.70it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.69it/s]
                   all          8          8      0.993          1      0.995      0.607

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      23/50      2.28G      1.261     0.9534      1.089          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.72it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.30it/s]
                   all          8          8      0.992          1      0.995      0.562

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      24/50      2.28G      1.214     0.9964      1.062          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.15it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 19.50it/s]
                   all          8          8      0.994          1      0.995      0.565

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      25/50      2.28G       1.21      1.007      1.047          4        640: 100%|██████████| 6/6 [00:00<00:00, 12.10it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.31it/s]
                   all          8          8      0.994          1      0.995      0.564

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      26/50      2.28G      1.241     0.8818      1.073         11        640: 100%|██████████| 6/6 [00:00<00:00, 11.32it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.78it/s]
                   all          8          8      0.994          1      0.995      0.637

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      27/50      2.28G      1.214     0.8808      1.063         13        640: 100%|██████████| 6/6 [00:00<00:00, 11.74it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.04it/s]
                   all          8          8      0.994          1      0.995      0.605

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      28/50      2.28G      1.178     0.8998      1.061          9        640: 100%|██████████| 6/6 [00:00<00:00, 11.33it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 19.41it/s]
                   all          8          8      0.994          1      0.995      0.558

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      29/50      2.28G      1.201     0.8435      1.039         10        640: 100%|██████████| 6/6 [00:00<00:00, 11.76it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.78it/s]
                   all          8          8      0.994          1      0.995      0.552

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      30/50      2.28G      1.137     0.8773      1.038          8        640: 100%|██████████| 6/6 [00:00<00:00, 10.81it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.82it/s]
                   all          8          8      0.994          1      0.995      0.649

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      31/50      2.28G      1.127      0.839       1.04          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.42it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.78it/s]
                   all          8          8      0.993          1      0.995      0.665

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      32/50      2.28G      1.135     0.8685      1.035          6        640: 100%|██████████| 6/6 [00:00<00:00, 10.71it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 19.51it/s]
                   all          8          8      0.992          1      0.995       0.76

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      33/50      2.28G      1.232     0.8533      1.052         10        640: 100%|██████████| 6/6 [00:00<00:00, 11.38it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.12it/s]
                   all          8          8      0.992          1      0.995      0.745

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      34/50      2.28G      1.179     0.8403      1.047          7        640: 100%|██████████| 6/6 [00:00<00:00,  9.82it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.64it/s]
                   all          8          8      0.992          1      0.995      0.587

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      35/50      2.28G      1.137     0.8485      1.025          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.22it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.91it/s]
                   all          8          8      0.992          1      0.995      0.564

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      36/50      2.28G      1.175     0.7977      1.031          6        640: 100%|██████████| 6/6 [00:00<00:00, 10.48it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 20.41it/s]
                   all          8          8      0.992          1      0.995      0.532

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      37/50      2.28G      1.199     0.7938       1.05          8        640: 100%|██████████| 6/6 [00:00<00:00, 11.41it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.71it/s]
                   all          8          8      0.992          1      0.995      0.566

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      38/50      2.28G       1.14     0.7583      1.052          9        640: 100%|██████████| 6/6 [00:00<00:00, 11.31it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.83it/s]
                   all          8          8      0.992          1      0.995      0.613

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      39/50      2.28G       1.16      0.786      1.065         12        640: 100%|██████████| 6/6 [00:00<00:00, 11.94it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.05it/s]
                   all          8          8      0.993          1      0.995      0.635

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      40/50      2.28G      1.112     0.7539      1.045          8        640: 100%|██████████| 6/6 [00:00<00:00, 11.41it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 19.58it/s]
                   all          8          8      0.993          1      0.995      0.633
Closing dataloader mosaic

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      41/50      2.28G      1.148      1.132      1.033          5        640: 100%|██████████| 6/6 [00:01<00:00,  5.17it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.33it/s]
                   all          8          8      0.993          1      0.995      0.636

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      42/50      2.28G      1.113      1.056      1.012          3        640: 100%|██████████| 6/6 [00:00<00:00, 10.16it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.22it/s]
                   all          8          8      0.992          1      0.995      0.632

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      43/50      2.28G      1.153      1.109      1.053          4        640: 100%|██████████| 6/6 [00:00<00:00, 10.54it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.14it/s]
                   all          8          8      0.992          1      0.995      0.635

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      44/50      2.28G      1.134      1.043      1.018          5        640: 100%|██████████| 6/6 [00:00<00:00, 10.58it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.29it/s]
                   all          8          8      0.992          1      0.995      0.644

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      45/50      2.28G      1.205     0.9981      1.045          4        640: 100%|██████████| 6/6 [00:00<00:00, 11.45it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.09it/s]
                   all          8          8      0.993          1      0.995       0.65

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      46/50      2.28G       1.12     0.9871      1.025          5        640: 100%|██████████| 6/6 [00:00<00:00, 10.72it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.35it/s]
                   all          8          8      0.992          1      0.995      0.611

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      47/50      2.28G      1.131     0.9842      1.055          6        640: 100%|██████████| 6/6 [00:00<00:00, 11.12it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.86it/s]
                   all          8          8      0.992          1      0.995      0.611

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      48/50      2.28G      1.157     0.9498      1.058          4        640: 100%|██████████| 6/6 [00:00<00:00, 10.58it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.59it/s]
                   all          8          8      0.992          1      0.995      0.601

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      49/50      2.28G      1.134     0.9769      1.018          4        640: 100%|██████████| 6/6 [00:00<00:00, 11.34it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.33it/s]
                   all          8          8      0.992          1      0.995      0.636

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      50/50      2.28G      1.054     0.9468      1.016          4        640: 100%|██████████| 6/6 [00:00<00:00, 10.63it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.01it/s]
                   all          8          8      0.992          1      0.995      0.611

50 epochs completed in 0.014 hours.
Optimizer stripped from runs/detect/train2/weights/last.pt, 6.2MB
Optimizer stripped from runs/detect/train2/weights/best.pt, 6.2MB

Validating runs/detect/train2/weights/best.pt...
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cu124 CUDA:0 (NVIDIA GeForce RTX 2080 Ti, 10825MiB)
Model summary (fused): 72 layers, 3,005,843 parameters, 0 gradients, 8.1 GFLOPs
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 23.14it/s]
                   all          8          8      0.992          1      0.995       0.76
Speed: 0.2ms preprocess, 1.2ms inference, 0.0ms loss, 0.9ms postprocess per image
Results saved to runs/detect/train2
💡 Learn more at https://docs.ultralytics.com/modes/train
(yolov8) songbaoxian@ubuntu-Super-Server:~/codehub/ultralytics$
```

:::

##### 指令训练

::: code-group

```bash [我的电脑-差不多半小时(60s/epoch)]
(yolov8) D:\codeHub\projectHub\ultralytics>yolo detect train model=yolov8n.pt data=SL.yaml epochs=30 workers=1 batch=16
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cpu CPU (13th Gen Intel Core(TM) i5-13500H)
engine\trainer: task=detect, mode=train, model=yolov8n.pt, data=SL.yaml, epochs=30, time=None, patience=100, batch=16, imgsz=640, save=True, save_period=-1, cache=False, device=None, workers=1, project=None, name=train11, exist_ok=False, pretrained=True, optimizer=auto, verbose=True, seed=0, deterministic=True, single_cls=False, rect=False, cos_lr=False, close_mosaic=10, resume=False, amp=True, fraction=1.0, profile=False, freeze=None, multi_scale=False, overlap_mask=True, mask_ratio=4, dropout=0.0, val=True, split=val, save_json=False, conf=None, iou=0.7, max_det=300, half=False, dnn=False, plots=True, source=None, vid_stride=1, stream_buffer=False, visualize=False, augment=False, agnostic_nms=False, classes=None, retina_masks=False, embed=None, show=False, save_frames=False, save_txt=False, save_conf=False, save_crop=False, show_labels=True, show_conf=True, show_boxes=True, line_width=None, format=torchscript, keras=False, optimize=False, int8=False, dynamic=False, simplify=True, opset=None, workspace=None, nms=False, lr0=0.01, lrf=0.01, momentum=0.937, weight_decay=0.0005, warmup_epochs=3.0, warmup_momentum=0.8, warmup_bias_lr=0.1, box=7.5, cls=0.5, dfl=1.5, pose=12.0, kobj=1.0, nbs=64, hsv_h=0.015, hsv_s=0.7, hsv_v=0.4, degrees=0.0, translate=0.1, scale=0.5, shear=0.0, perspective=0.0, flipud=0.0, fliplr=0.5, bgr=0.0, mosaic=1.0, mixup=0.0, copy_paste=0.0, copy_paste_mode=flip, auto_augment=randaugment, erasing=0.4, cfg=None, tracker=botsort.yaml, save_dir=D:\codeHub\projectHub\yolov8\runs\detect\train11
Downloading https://ultralytics.com/assets/Arial.ttf to 'C:\Users\slien\AppData\Roaming\Ultralytics\Arial.ttf'...
100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 755k/755k [00:01<00:00, 769kB/s]
Overriding model.yaml nc=80 with nc=1

                   from  n    params  module                                       arguments
  0                  -1  1       464  ultralytics.nn.modules.conv.Conv             [3, 16, 3, 2]
  1                  -1  1      4672  ultralytics.nn.modules.conv.Conv             [16, 32, 3, 2]
  2                  -1  1      7360  ultralytics.nn.modules.block.C2f             [32, 32, 1, True]
  3                  -1  1     18560  ultralytics.nn.modules.conv.Conv             [32, 64, 3, 2]
  4                  -1  2     49664  ultralytics.nn.modules.block.C2f             [64, 64, 2, True]
  5                  -1  1     73984  ultralytics.nn.modules.conv.Conv             [64, 128, 3, 2]
  6                  -1  2    197632  ultralytics.nn.modules.block.C2f             [128, 128, 2, True]
  7                  -1  1    295424  ultralytics.nn.modules.conv.Conv             [128, 256, 3, 2]
  8                  -1  1    460288  ultralytics.nn.modules.block.C2f             [256, 256, 1, True]
  9                  -1  1    164608  ultralytics.nn.modules.block.SPPF            [256, 256, 5]
 10                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 11             [-1, 6]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 12                  -1  1    148224  ultralytics.nn.modules.block.C2f             [384, 128, 1]
 13                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 14             [-1, 4]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 15                  -1  1     37248  ultralytics.nn.modules.block.C2f             [192, 64, 1]
 16                  -1  1     36992  ultralytics.nn.modules.conv.Conv             [64, 64, 3, 2]
 17            [-1, 12]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 18                  -1  1    123648  ultralytics.nn.modules.block.C2f             [192, 128, 1]
 19                  -1  1    147712  ultralytics.nn.modules.conv.Conv             [128, 128, 3, 2]
 20             [-1, 9]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 21                  -1  1    493056  ultralytics.nn.modules.block.C2f             [384, 256, 1]
 22        [15, 18, 21]  1    751507  ultralytics.nn.modules.head.Detect           [1, [64, 128, 256]]
Model summary: 129 layers, 3,011,043 parameters, 3,011,027 gradients, 8.2 GFLOPs

Transferred 319/355 items from pretrained weights
Freezing layer 'model.22.dfl.conv.weight'
train: Scanning D:\codeHub\projectHub\ultralytics\datasets\SL\labels\train... 85 images, 0 backgrounds, 0 corrupt: 100%|██████████| 85/85 [00:00<00:00, 347.21it/s]
train: New cache created: D:\codeHub\projectHub\ultralytics\datasets\SL\labels\train.cache
val: Scanning D:\codeHub\projectHub\ultralytics\datasets\SL\labels\val... 8 images, 0 backgrounds, 0 corrupt: 100%|██████████| 8/8 [00:00<00:00, 1043.33it/s]
val: New cache created: D:\codeHub\projectHub\ultralytics\datasets\SL\labels\val.cache
Plotting labels to D:\codeHub\projectHub\yolov8\runs\detect\train11\labels.jpg...
optimizer: 'optimizer=auto' found, ignoring 'lr0=0.01' and 'momentum=0.937' and determining best 'optimizer', 'lr0' and 'momentum' automatically...
optimizer: AdamW(lr=0.002, momentum=0.9) with parameter groups 57 weight(decay=0.0), 64 weight(decay=0.0005), 63 bias(decay=0.0)
Image sizes 640 train, 640 val
Using 0 dataloader workers
Logging results to D:\codeHub\projectHub\yolov8\runs\detect\train11
Starting training for 30 epochs...

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       1/30         0G      2.048      3.887      1.388          9        640: 100%|██████████| 6/6 [00:58<00:00,  9.78s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.63s/it]
                   all          8          8    0.00333          1      0.995      0.728

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       2/30         0G      1.611      2.602      1.001          8        640: 100%|██████████| 6/6 [00:52<00:00,  8.81s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.29s/it]
                   all          8          8    0.00333          1      0.995       0.51

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       3/30         0G      1.322      1.741       1.04          8        640: 100%|██████████| 6/6 [00:52<00:00,  8.76s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.66s/it]
                   all          8          8    0.00333          1      0.995       0.68

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       4/30         0G      1.288       1.61      1.025         10        640: 100%|██████████| 6/6 [00:49<00:00,  8.30s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.15s/it]
                   all          8          8    0.00333          1      0.995      0.669

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       5/30         0G      1.275      1.527       1.03          7        640: 100%|██████████| 6/6 [00:48<00:00,  8.07s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.44s/it]
                   all          8          8    0.00333          1      0.995       0.59

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       6/30         0G      1.243      1.371      1.046         12        640: 100%|██████████| 6/6 [00:51<00:00,  8.61s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:02<00:00,  2.03s/it]
                   all          8          8    0.00333          1      0.995      0.562

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       7/30         0G       1.35      1.356      1.047         11        640: 100%|██████████| 6/6 [00:51<00:00,  8.60s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.38s/it]
                   all          8          8    0.00333          1      0.995       0.56

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       8/30         0G      1.327      1.374      1.072          7        640: 100%|██████████| 6/6 [00:52<00:00,  8.71s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.47s/it]
                   all          8          8    0.00333          1      0.995      0.503

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       9/30         0G      1.195      1.234      1.008         11        640: 100%|██████████| 6/6 [00:50<00:00,  8.45s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.47s/it]
                   all          8          8    0.00333          1      0.995      0.499

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      10/30         0G      1.236      1.241      1.008          8        640: 100%|██████████| 6/6 [00:51<00:00,  8.58s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.42s/it]
                   all          8          8    0.00333          1      0.995      0.419

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      11/30         0G      1.284      1.242      1.083          9        640: 100%|██████████| 6/6 [00:51<00:00,  8.58s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.51s/it]
                   all          8          8     0.0101          1      0.995      0.583

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      12/30         0G      1.261      1.286      1.058          6        640: 100%|██████████| 6/6 [00:51<00:00,  8.66s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.20s/it]
                   all          8          8      0.894          1      0.995      0.639

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      13/30         0G      1.244      1.175      1.039         12        640: 100%|██████████| 6/6 [00:51<00:00,  8.52s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.66s/it]
                   all          8          8       0.96          1      0.995      0.581

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      14/30         0G      1.234      1.219      1.066          7        640: 100%|██████████| 6/6 [00:51<00:00,  8.52s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.54s/it]
                   all          8          8      0.975          1      0.995      0.563

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      15/30         0G      1.241       1.13      1.036         11        640: 100%|██████████| 6/6 [00:50<00:00,  8.37s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.22s/it]
                   all          8          8      0.984          1      0.995      0.525

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      16/30         0G      1.267      1.084      1.046          8        640: 100%|██████████| 6/6 [00:50<00:00,  8.38s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.38s/it]
                   all          8          8      0.982          1      0.995      0.562

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      17/30         0G      1.253      1.077      1.048          9        640: 100%|██████████| 6/6 [00:51<00:00,  8.64s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.68s/it]
                   all          8          8      0.985          1      0.995       0.66

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      18/30         0G      1.182      1.063      1.031          9        640: 100%|██████████| 6/6 [00:50<00:00,  8.38s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.48s/it]
                   all          8          8      0.989          1      0.995      0.662

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      19/30         0G      1.207      1.172     0.9802          4        640: 100%|██████████| 6/6 [00:50<00:00,  8.40s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.16s/it]
                   all          8          8      0.986          1      0.995      0.653

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      20/30         0G      1.205      1.074      1.007         13        640: 100%|██████████| 6/6 [00:49<00:00,  8.28s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.39s/it]
                   all          8          8       0.99          1      0.995       0.57
Closing dataloader mosaic

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      21/30         0G      1.169      1.619      1.013          4        640: 100%|██████████| 6/6 [00:48<00:00,  8.04s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.51s/it]
                   all          8          8      0.989          1      0.995      0.516

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      22/30         0G      1.165      1.612     0.9998          3        640: 100%|██████████| 6/6 [00:48<00:00,  8.16s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.50s/it]
                   all          8          8      0.985          1      0.995      0.463

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      23/30         0G       1.27      1.481      1.042          4        640: 100%|██████████| 6/6 [00:50<00:00,  8.35s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.55s/it]
                   all          8          8      0.989          1      0.995      0.471

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      24/30         0G      1.215      1.374      1.033          5        640: 100%|██████████| 6/6 [00:49<00:00,  8.23s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.23s/it]
                   all          8          8      0.989          1      0.995      0.522

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      25/30         0G      1.197      1.391      1.035          5        640: 100%|██████████| 6/6 [00:49<00:00,  8.21s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.24s/it]
                   all          8          8      0.988          1      0.995       0.57

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      26/30         0G      1.222      1.474      1.014          4        640: 100%|██████████| 6/6 [00:48<00:00,  8.10s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.50s/it]
                   all          8          8      0.988          1      0.995      0.637

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      27/30         0G       1.11      1.416     0.9869          2        640: 100%|██████████| 6/6 [00:46<00:00,  7.82s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.35s/it]
                   all          8          8       0.99          1      0.995      0.647

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      28/30         0G      1.122      1.308     0.9948          3        640: 100%|██████████| 6/6 [00:49<00:00,  8.25s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.41s/it]
                   all          8          8      0.992          1      0.995      0.658

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      29/30         0G      1.214      1.389      1.037          4        640: 100%|██████████| 6/6 [00:49<00:00,  8.18s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.26s/it]
                   all          8          8      0.992          1      0.995      0.681

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      30/30         0G      1.116      1.236     0.9808          4        640: 100%|██████████| 6/6 [00:48<00:00,  8.00s/it]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.28s/it]
                   all          8          8      0.993          1      0.995      0.671

30 epochs completed in 0.440 hours.
Optimizer stripped from D:\codeHub\projectHub\yolov8\runs\detect\train11\weights\last.pt, 6.2MB
Optimizer stripped from D:\codeHub\projectHub\yolov8\runs\detect\train11\weights\best.pt, 6.2MB

Validating D:\codeHub\projectHub\yolov8\runs\detect\train11\weights\best.pt...
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cpu CPU (13th Gen Intel Core(TM) i5-13500H)
Model summary (fused): 72 layers, 3,005,843 parameters, 0 gradients, 8.1 GFLOPs
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:01<00:00,  1.73s/it]
                   all          8          8    0.00333          1      0.995      0.728
Speed: 39.8ms preprocess, 123.1ms inference, 0.0ms loss, 6.8ms postprocess per image
Results saved to D:\codeHub\projectHub\yolov8\runs\detect\train11
💡 Learn more at https://docs.ultralytics.com/modes/train

(yolov8) D:\codeHub\projectHub\ultralytics>
```

```bash [服务器训练日志-(训练差不多1分钟)(<1s/epoch)]
(base) slience_me@ubuntu-Super-Server:~$ cd codehub/ultralytics/
(base) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ ls
BVN.mp4       CONTRIBUTING.md  docker  examples  mkdocs.yml     pyproject.toml  README.zh-CN.md  tests        ultralytics.egg-info
CITATION.cff  datasets         docs    LICENSE   predict.ipynb  README.md       SL.yaml          ultralytics  yolov8n.pt

(base) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ conda create -n yolov8 python=3.10.16
Retrieving notices: ...working... done
Collecting package metadata (current_repodata.json): done
Solving environment: done


==> WARNING: A newer version of conda exists. <==
  current version: 23.7.4
  latest version: 25.3.1

Please update conda by running

    $ conda update -n base -c defaults conda

Or to minimize the number of packages updated during conda update use

     conda install conda=25.3.1



## Package Plan ##

  environment location: /home/slience_me/anaconda3/envs/yolov8

  added / updated specs:
    - python=3.10.16


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    ca-certificates-2025.2.25  |       h06a4308_0         129 KB
    openssl-3.0.16             |       h5eee18b_0         5.2 MB
    pip-25.0                   |  py310h06a4308_0         2.3 MB
    python-3.10.16             |       he870216_1        26.9 MB
    setuptools-75.8.0          |  py310h06a4308_0         1.6 MB
    tzdata-2025a               |       h04d1e81_0         117 KB
    wheel-0.45.1               |  py310h06a4308_0         115 KB
    xz-5.6.4                   |       h5eee18b_1         567 KB
    ------------------------------------------------------------
                                           Total:        37.0 MB

The following NEW packages will be INSTALLED:

  _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main
  _openmp_mutex      pkgs/main/linux-64::_openmp_mutex-5.1-1_gnu
  bzip2              pkgs/main/linux-64::bzip2-1.0.8-h5eee18b_6
  ca-certificates    pkgs/main/linux-64::ca-certificates-2025.2.25-h06a4308_0
  ld_impl_linux-64   pkgs/main/linux-64::ld_impl_linux-64-2.40-h12ee557_0
  libffi             pkgs/main/linux-64::libffi-3.4.4-h6a678d5_1
  libgcc-ng          pkgs/main/linux-64::libgcc-ng-11.2.0-h1234567_1
  libgomp            pkgs/main/linux-64::libgomp-11.2.0-h1234567_1
  libstdcxx-ng       pkgs/main/linux-64::libstdcxx-ng-11.2.0-h1234567_1
  libuuid            pkgs/main/linux-64::libuuid-1.41.5-h5eee18b_0
  ncurses            pkgs/main/linux-64::ncurses-6.4-h6a678d5_0
  openssl            pkgs/main/linux-64::openssl-3.0.16-h5eee18b_0
  pip                pkgs/main/linux-64::pip-25.0-py310h06a4308_0
  python             pkgs/main/linux-64::python-3.10.16-he870216_1
  readline           pkgs/main/linux-64::readline-8.2-h5eee18b_0
  setuptools         pkgs/main/linux-64::setuptools-75.8.0-py310h06a4308_0
  sqlite             pkgs/main/linux-64::sqlite-3.45.3-h5eee18b_0
  tk                 pkgs/main/linux-64::tk-8.6.14-h39e8969_0
  tzdata             pkgs/main/noarch::tzdata-2025a-h04d1e81_0
  wheel              pkgs/main/linux-64::wheel-0.45.1-py310h06a4308_0
  xz                 pkgs/main/linux-64::xz-5.6.4-h5eee18b_1
  zlib               pkgs/main/linux-64::zlib-1.2.13-h5eee18b_1


Proceed ([y]/n)? y


Downloading and Extracting Packages

Preparing transaction: done
Verifying transaction: |
SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/clear'
has an incorrect size.
  reported size: 14312 bytes
  actual size: 22719 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/infocmp'
has an incorrect size.
  reported size: 63536 bytes
  actual size: 71943 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/tabs'
has an incorrect size.
  reported size: 22424 bytes
  actual size: 30831 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/tic'
has an incorrect size.
  reported size: 92248 bytes
  actual size: 100655 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/toe'
has an incorrect size.
  reported size: 22424 bytes
  actual size: 30831 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/tput'
has an incorrect size.
  reported size: 22528 bytes
  actual size: 30935 bytes

SafetyError: The package for ncurses located at /home/slience_me/anaconda3/pkgs/ncurses-6.4-h6a678d5_0
appears to be corrupted. The path 'bin/tset'
has an incorrect size.
  reported size: 30696 bytes
  actual size: 39103 bytes

SafetyError: The package for tk located at /home/slience_me/anaconda3/pkgs/tk-8.6.14-h39e8969_0
appears to be corrupted. The path 'bin/tclsh8.6'
has an incorrect size.
  reported size: 15984 bytes
  actual size: 24391 bytes

SafetyError: The package for tk located at /home/slience_me/anaconda3/pkgs/tk-8.6.14-h39e8969_0
appears to be corrupted. The path 'bin/wish8.6'
has an incorrect size.
  reported size: 16136 bytes
  actual size: 24543 bytes

SafetyError: The package for sqlite located at /home/slience_me/anaconda3/pkgs/sqlite-3.45.3-h5eee18b_0
appears to be corrupted. The path 'bin/sqlite3'
has an incorrect size.
  reported size: 1777144 bytes
  actual size: 1785551 bytes

                                                                                                                                                                 do                                                             ne
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate yolov8
#
# To deactivate an active environment, use
#
#     $ conda deactivate

(base) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ conda activate yolov8
(yolov8) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ pip install -e .
Obtaining file:///home/slience_me/codehub/ultralytics
  Installing build dependencies ... done
  Checking if build backend supports build_editable ... done
  Getting requirements to build editable ... done
  Preparing editable metadata (pyproject.toml) ... done
Collecting numpy<=2.1.1,>=1.23.0 (from ultralytics==8.3.109)
  Downloading numpy-2.1.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (60 kB)
Collecting matplotlib>=3.3.0 (from ultralytics==8.3.109)
  Downloading matplotlib-3.10.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (11 kB)
Collecting opencv-python>=4.6.0 (from ultralytics==8.3.109)
  Downloading opencv_python-4.11.0.86-cp37-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (20 kB)
Collecting pillow>=7.1.2 (from ultralytics==8.3.109)
  Downloading pillow-11.2.1-cp310-cp310-manylinux_2_28_x86_64.whl.metadata (8.9 kB)
Collecting pyyaml>=5.3.1 (from ultralytics==8.3.109)
  Downloading PyYAML-6.0.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (2.1 kB)
Collecting requests>=2.23.0 (from ultralytics==8.3.109)
  Using cached requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
Collecting scipy>=1.4.1 (from ultralytics==8.3.109)
  Downloading scipy-1.15.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (61 kB)
Collecting torch>=1.8.0 (from ultralytics==8.3.109)
  Downloading torch-2.6.0-cp310-cp310-manylinux1_x86_64.whl.metadata (28 kB)
Collecting torchvision>=0.9.0 (from ultralytics==8.3.109)
  Downloading torchvision-0.21.0-cp310-cp310-manylinux1_x86_64.whl.metadata (6.1 kB)
Collecting tqdm>=4.64.0 (from ultralytics==8.3.109)
  Downloading tqdm-4.67.1-py3-none-any.whl.metadata (57 kB)
Collecting psutil (from ultralytics==8.3.109)
  Downloading psutil-7.0.0-cp36-abi3-manylinux_2_12_x86_64.manylinux2010_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (22 kB)
Collecting py-cpuinfo (from ultralytics==8.3.109)
  Using cached py_cpuinfo-9.0.0-py3-none-any.whl.metadata (794 bytes)
Collecting pandas>=1.1.4 (from ultralytics==8.3.109)
  Downloading pandas-2.2.3-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (89 kB)
Collecting seaborn>=0.11.0 (from ultralytics==8.3.109)
  Using cached seaborn-0.13.2-py3-none-any.whl.metadata (5.4 kB)
Collecting ultralytics-thop>=2.0.0 (from ultralytics==8.3.109)
  Downloading ultralytics_thop-2.0.14-py3-none-any.whl.metadata (9.4 kB)
Collecting contourpy>=1.0.1 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading contourpy-1.3.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (5.5 kB)
Collecting cycler>=0.10 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Using cached cycler-0.12.1-py3-none-any.whl.metadata (3.8 kB)
Collecting fonttools>=4.22.0 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading fonttools-4.57.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (102 kB)
Collecting kiwisolver>=1.3.1 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading kiwisolver-1.4.8-cp310-cp310-manylinux_2_12_x86_64.manylinux2010_x86_64.whl.metadata (6.2 kB)
Collecting packaging>=20.0 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading packaging-24.2-py3-none-any.whl.metadata (3.2 kB)
Collecting pyparsing>=2.3.1 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading pyparsing-3.2.3-py3-none-any.whl.metadata (5.0 kB)
Collecting python-dateutil>=2.7 (from matplotlib>=3.3.0->ultralytics==8.3.109)
  Using cached python_dateutil-2.9.0.post0-py2.py3-none-any.whl.metadata (8.4 kB)
Collecting pytz>=2020.1 (from pandas>=1.1.4->ultralytics==8.3.109)
  Downloading pytz-2025.2-py2.py3-none-any.whl.metadata (22 kB)
Collecting tzdata>=2022.7 (from pandas>=1.1.4->ultralytics==8.3.109)
  Downloading tzdata-2025.2-py2.py3-none-any.whl.metadata (1.4 kB)
Collecting charset-normalizer<4,>=2 (from requests>=2.23.0->ultralytics==8.3.109)
  Downloading charset_normalizer-3.4.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (35 kB)
Collecting idna<4,>=2.5 (from requests>=2.23.0->ultralytics==8.3.109)
  Using cached idna-3.10-py3-none-any.whl.metadata (10 kB)
Collecting urllib3<3,>=1.21.1 (from requests>=2.23.0->ultralytics==8.3.109)
  Downloading urllib3-2.4.0-py3-none-any.whl.metadata (6.5 kB)
Collecting certifi>=2017.4.17 (from requests>=2.23.0->ultralytics==8.3.109)
  Downloading certifi-2025.1.31-py3-none-any.whl.metadata (2.5 kB)
Collecting filelock (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading filelock-3.18.0-py3-none-any.whl.metadata (2.9 kB)
Collecting typing-extensions>=4.10.0 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading typing_extensions-4.13.2-py3-none-any.whl.metadata (3.0 kB)
Collecting networkx (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading networkx-3.4.2-py3-none-any.whl.metadata (6.3 kB)
Collecting jinja2 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading jinja2-3.1.6-py3-none-any.whl.metadata (2.9 kB)
Collecting fsspec (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading fsspec-2025.3.2-py3-none-any.whl.metadata (11 kB)
Collecting nvidia-cuda-nvrtc-cu12==12.4.127 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cuda_nvrtc_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting nvidia-cuda-runtime-cu12==12.4.127 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cuda_runtime_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting nvidia-cuda-cupti-cu12==12.4.127 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cuda_cupti_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl.metadata (1.6 kB)
Collecting nvidia-cudnn-cu12==9.1.0.70 (from torch>=1.8.0->ultralytics==8.3.109)
  Using cached nvidia_cudnn_cu12-9.1.0.70-py3-none-manylinux2014_x86_64.whl.metadata (1.6 kB)
Collecting nvidia-cublas-cu12==12.4.5.8 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cublas_cu12-12.4.5.8-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting nvidia-cufft-cu12==11.2.1.3 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cufft_cu12-11.2.1.3-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting nvidia-curand-cu12==10.3.5.147 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_curand_cu12-10.3.5.147-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting nvidia-cusolver-cu12==11.6.1.9 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cusolver_cu12-11.6.1.9-py3-none-manylinux2014_x86_64.whl.metadata (1.6 kB)
Collecting nvidia-cusparse-cu12==12.3.1.170 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cusparse_cu12-12.3.1.170-py3-none-manylinux2014_x86_64.whl.metadata (1.6 kB)
Collecting nvidia-cusparselt-cu12==0.6.2 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_cusparselt_cu12-0.6.2-py3-none-manylinux2014_x86_64.whl.metadata (6.8 kB)
Collecting nvidia-nccl-cu12==2.21.5 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_nccl_cu12-2.21.5-py3-none-manylinux2014_x86_64.whl.metadata (1.8 kB)
Collecting nvidia-nvtx-cu12==12.4.127 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_nvtx_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl.metadata (1.7 kB)
Collecting nvidia-nvjitlink-cu12==12.4.127 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading nvidia_nvjitlink_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl.metadata (1.5 kB)
Collecting triton==3.2.0 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading triton-3.2.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (1.4 kB)
Collecting sympy==1.13.1 (from torch>=1.8.0->ultralytics==8.3.109)
  Downloading sympy-1.13.1-py3-none-any.whl.metadata (12 kB)
Collecting mpmath<1.4,>=1.1.0 (from sympy==1.13.1->torch>=1.8.0->ultralytics==8.3.109)
  Using cached mpmath-1.3.0-py3-none-any.whl.metadata (8.6 kB)
Collecting six>=1.5 (from python-dateutil>=2.7->matplotlib>=3.3.0->ultralytics==8.3.109)
  Downloading six-1.17.0-py2.py3-none-any.whl.metadata (1.7 kB)
Collecting MarkupSafe>=2.0 (from jinja2->torch>=1.8.0->ultralytics==8.3.109)
  Downloading MarkupSafe-3.0.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.0 kB)
Downloading matplotlib-3.10.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (8.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.6/8.6 MB 27.3 MB/s eta 0:00:00
Downloading numpy-2.1.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (16.3 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 16.3/16.3 MB 29.0 MB/s eta 0:00:00
Downloading opencv_python-4.11.0.86-cp37-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (63.0 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 63.0/63.0 MB 31.9 MB/s eta 0:00:00
Downloading pandas-2.2.3-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (13.1 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 13.1/13.1 MB 36.8 MB/s eta 0:00:00
Downloading pillow-11.2.1-cp310-cp310-manylinux_2_28_x86_64.whl (4.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.6/4.6 MB 36.7 MB/s eta 0:00:00
Downloading PyYAML-6.0.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (751 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 751.2/751.2 kB 14.0 MB/s eta 0:00:00
Using cached requests-2.32.3-py3-none-any.whl (64 kB)
Downloading scipy-1.15.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (37.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 37.6/37.6 MB 36.5 MB/s eta 0:00:00
Using cached seaborn-0.13.2-py3-none-any.whl (294 kB)
Downloading torch-2.6.0-cp310-cp310-manylinux1_x86_64.whl (766.7 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 766.7/766.7 MB 20.6 MB/s eta 0:00:00
Downloading nvidia_cublas_cu12-12.4.5.8-py3-none-manylinux2014_x86_64.whl (363.4 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 363.4/363.4 MB 16.6 MB/s eta 0:00:00
Downloading nvidia_cuda_cupti_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl (13.8 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 13.8/13.8 MB 15.2 MB/s eta 0:00:00
Downloading nvidia_cuda_nvrtc_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl (24.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 24.6/24.6 MB 20.1 MB/s eta 0:00:00
Downloading nvidia_cuda_runtime_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl (883 kB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 883.7/883.7 kB 20.5 MB/s eta 0:00:00
Using cached nvidia_cudnn_cu12-9.1.0.70-py3-none-manylinux2014_x86_64.whl (664.8 MB)
Downloading nvidia_cufft_cu12-11.2.1.3-py3-none-manylinux2014_x86_64.whl (211.5 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 211.5/211.5 MB 28.5 MB/s eta 0:00:00
Downloading nvidia_curand_cu12-10.3.5.147-py3-none-manylinux2014_x86_64.whl (56.3 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 56.3/56.3 MB 19.0 MB/s eta 0:00:00
Downloading nvidia_cusolver_cu12-11.6.1.9-py3-none-manylinux2014_x86_64.whl (127.9 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 127.9/127.9 MB 18.7 MB/s eta 0:00:00
Downloading nvidia_cusparse_cu12-12.3.1.170-py3-none-manylinux2014_x86_64.whl (207.5 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 207.5/207.5 MB 21.4 MB/s eta 0:00:00
Downloading nvidia_cusparselt_cu12-0.6.2-py3-none-manylinux2014_x86_64.whl (150.1 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 150.1/150.1 MB 30.3 MB/s eta 0:00:00
Downloading nvidia_nccl_cu12-2.21.5-py3-none-manylinux2014_x86_64.whl (188.7 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 188.7/188.7 MB 12.3 MB/s eta 0:00:00
Downloading nvidia_nvjitlink_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl (21.1 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 21.1/21.1 MB 13.8 MB/s eta 0:00:00
Downloading nvidia_nvtx_cu12-12.4.127-py3-none-manylinux2014_x86_64.whl (99 kB)
Downloading sympy-1.13.1-py3-none-any.whl (6.2 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 6.2/6.2 MB 16.4 MB/s eta 0:00:00
Downloading triton-3.2.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (253.1 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 253.1/253.1 MB 26.3 MB/s eta 0:00:00
Downloading torchvision-0.21.0-cp310-cp310-manylinux1_x86_64.whl (7.2 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 7.2/7.2 MB 34.4 MB/s eta 0:00:00
Downloading tqdm-4.67.1-py3-none-any.whl (78 kB)
Downloading ultralytics_thop-2.0.14-py3-none-any.whl (26 kB)
Downloading psutil-7.0.0-cp36-abi3-manylinux_2_12_x86_64.manylinux2010_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl (277 kB)
Using cached py_cpuinfo-9.0.0-py3-none-any.whl (22 kB)
Downloading certifi-2025.1.31-py3-none-any.whl (166 kB)
Downloading charset_normalizer-3.4.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (146 kB)
Downloading contourpy-1.3.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (325 kB)
Using cached cycler-0.12.1-py3-none-any.whl (8.3 kB)
Downloading fonttools-4.57.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (4.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.6/4.6 MB 35.4 MB/s eta 0:00:00
Using cached idna-3.10-py3-none-any.whl (70 kB)
Downloading kiwisolver-1.4.8-cp310-cp310-manylinux_2_12_x86_64.manylinux2010_x86_64.whl (1.6 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.6/1.6 MB 33.9 MB/s eta 0:00:00
Downloading packaging-24.2-py3-none-any.whl (65 kB)
Downloading pyparsing-3.2.3-py3-none-any.whl (111 kB)
Using cached python_dateutil-2.9.0.post0-py2.py3-none-any.whl (229 kB)
Downloading pytz-2025.2-py2.py3-none-any.whl (509 kB)
Downloading typing_extensions-4.13.2-py3-none-any.whl (45 kB)
Downloading tzdata-2025.2-py2.py3-none-any.whl (347 kB)
Downloading urllib3-2.4.0-py3-none-any.whl (128 kB)
Downloading filelock-3.18.0-py3-none-any.whl (16 kB)
Downloading fsspec-2025.3.2-py3-none-any.whl (194 kB)
Downloading jinja2-3.1.6-py3-none-any.whl (134 kB)
Downloading networkx-3.4.2-py3-none-any.whl (1.7 MB)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.7/1.7 MB 33.2 MB/s eta 0:00:00
Downloading MarkupSafe-3.0.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (20 kB)
Using cached mpmath-1.3.0-py3-none-any.whl (536 kB)
Downloading six-1.17.0-py2.py3-none-any.whl (11 kB)
Building wheels for collected packages: ultralytics
  Building editable for ultralytics (pyproject.toml) ... done
  Created wheel for ultralytics: filename=ultralytics-8.3.109-0.editable-py3-none-any.whl size=23153 sha256=47c384a6db5351c3cd8268d0daddba89e449e047c8b11cbf8cd0420                                                             6524c01ef
  Stored in directory: /tmp/pip-ephem-wheel-cache-nk57ps6e/wheels/de/88/0e/b8ba430f91c5262bfeb4e8a907073659049e73a0ea2a81cd50
Successfully built ultralytics
Installing collected packages: triton, pytz, py-cpuinfo, nvidia-cusparselt-cu12, mpmath, urllib3, tzdata, typing-extensions, tqdm, sympy, six, pyyaml, pyparsing, p                                                             sutil, pillow, packaging, nvidia-nvtx-cu12, nvidia-nvjitlink-cu12, nvidia-nccl-cu12, nvidia-curand-cu12, nvidia-cufft-cu12, nvidia-cuda-runtime-cu12, nvidia-cuda-n                                                             vrtc-cu12, nvidia-cuda-cupti-cu12, nvidia-cublas-cu12, numpy, networkx, MarkupSafe, kiwisolver, idna, fsspec, fonttools, filelock, cycler, charset-normalizer, cert                                                             ifi, scipy, requests, python-dateutil, opencv-python, nvidia-cusparse-cu12, nvidia-cudnn-cu12, jinja2, contourpy, pandas, nvidia-cusolver-cu12, matplotlib, torch,                                                              seaborn, ultralytics-thop, torchvision, ultralytics
Successfully installed MarkupSafe-3.0.2 certifi-2025.1.31 charset-normalizer-3.4.1 contourpy-1.3.2 cycler-0.12.1 filelock-3.18.0 fonttools-4.57.0 fsspec-2025.3.2 i                                                             dna-3.10 jinja2-3.1.6 kiwisolver-1.4.8 matplotlib-3.10.1 mpmath-1.3.0 networkx-3.4.2 numpy-2.1.1 nvidia-cublas-cu12-12.4.5.8 nvidia-cuda-cupti-cu12-12.4.127 nvidia                                                             -cuda-nvrtc-cu12-12.4.127 nvidia-cuda-runtime-cu12-12.4.127 nvidia-cudnn-cu12-9.1.0.70 nvidia-cufft-cu12-11.2.1.3 nvidia-curand-cu12-10.3.5.147 nvidia-cusolver-cu1                                                             2-11.6.1.9 nvidia-cusparse-cu12-12.3.1.170 nvidia-cusparselt-cu12-0.6.2 nvidia-nccl-cu12-2.21.5 nvidia-nvjitlink-cu12-12.4.127 nvidia-nvtx-cu12-12.4.127 opencv-pyt                                                             hon-4.11.0.86 packaging-24.2 pandas-2.2.3 pillow-11.2.1 psutil-7.0.0 py-cpuinfo-9.0.0 pyparsing-3.2.3 python-dateutil-2.9.0.post0 pytz-2025.2 pyyaml-6.0.2 requests                                                             -2.32.3 scipy-1.15.2 seaborn-0.13.2 six-1.17.0 sympy-1.13.1 torch-2.6.0 torchvision-0.21.0 tqdm-4.67.1 triton-3.2.0 typing-extensions-4.13.2 tzdata-2025.2 ultralyt                                                             ics-8.3.109 ultralytics-thop-2.0.14 urllib3-2.4.0
(yolov8) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ pip list
Package                  Version     Editable project location
------------------------ ----------- -------------------------------------
certifi                  2025.1.31
charset-normalizer       3.4.1
contourpy                1.3.2
cycler                   0.12.1
filelock                 3.18.0
fonttools                4.57.0
fsspec                   2025.3.2
idna                     3.10
Jinja2                   3.1.6
kiwisolver               1.4.8
MarkupSafe               3.0.2
matplotlib               3.10.1
mpmath                   1.3.0
networkx                 3.4.2
numpy                    2.1.1
nvidia-cublas-cu12       12.4.5.8
nvidia-cuda-cupti-cu12   12.4.127
nvidia-cuda-nvrtc-cu12   12.4.127
nvidia-cuda-runtime-cu12 12.4.127
nvidia-cudnn-cu12        9.1.0.70
nvidia-cufft-cu12        11.2.1.3
nvidia-curand-cu12       10.3.5.147
nvidia-cusolver-cu12     11.6.1.9
nvidia-cusparse-cu12     12.3.1.170
nvidia-cusparselt-cu12   0.6.2
nvidia-nccl-cu12         2.21.5
nvidia-nvjitlink-cu12    12.4.127
nvidia-nvtx-cu12         12.4.127
opencv-python            4.11.0.86
packaging                24.2
pandas                   2.2.3
pillow                   11.2.1
pip                      25.0
psutil                   7.0.0
py-cpuinfo               9.0.0
pyparsing                3.2.3
python-dateutil          2.9.0.post0
pytz                     2025.2
PyYAML                   6.0.2
requests                 2.32.3
scipy                    1.15.2
seaborn                  0.13.2
setuptools               75.8.0
six                      1.17.0
sympy                    1.13.1
torch                    2.6.0
torchvision              0.21.0
tqdm                     4.67.1
triton                   3.2.0
typing_extensions        4.13.2
tzdata                   2025.2
ultralytics              8.3.109     /home/slience_me/codehub/ultralytics
ultralytics-thop         2.0.14
urllib3                  2.4.0
wheel                    0.45.1
(yolov8) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$ yolo detect train model=./yolov8n.pt data="SL.yaml" epochs=30 workers=1 batch=16
Creating new Ultralytics Settings v0.0.6 file ✅
View Ultralytics Settings with 'yolo settings' or at '/home/slience_me/.config/Ultralytics/settings.json'
Update Settings with 'yolo settings key=value', i.e. 'yolo settings runs_dir=path/to/dir'. For help see https://docs.ultralytics.com/quickstart/#ultralytics-settin                                                             gs.
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cu124 CUDA:0 (NVIDIA GeForce RTX 2080 Ti, 10825MiB)
engine/trainer: task=detect, mode=train, model=./yolov8n.pt, data=SL.yaml, epochs=30, time=None, patience=100, batch=16, imgsz=640, save=True, save_period=-1, cach                                                             e=False, device=None, workers=1, project=None, name=train, exist_ok=False, pretrained=True, optimizer=auto, verbose=True, seed=0, deterministic=True, single_cls=Fa                                                             lse, rect=False, cos_lr=False, close_mosaic=10, resume=False, amp=True, fraction=1.0, profile=False, freeze=None, multi_scale=False, overlap_mask=True, mask_ratio=                                                             4, dropout=0.0, val=True, split=val, save_json=False, conf=None, iou=0.7, max_det=300, half=False, dnn=False, plots=True, source=None, vid_stride=1, stream_buffer=                                                             False, visualize=False, augment=False, agnostic_nms=False, classes=None, retina_masks=False, embed=None, show=False, save_frames=False, save_txt=False, save_conf=F                                                             alse, save_crop=False, show_labels=True, show_conf=True, show_boxes=True, line_width=None, format=torchscript, keras=False, optimize=False, int8=False, dynamic=Fal                                                             se, simplify=True, opset=None, workspace=None, nms=False, lr0=0.01, lrf=0.01, momentum=0.937, weight_decay=0.0005, warmup_epochs=3.0, warmup_momentum=0.8, warmup_b                                                             ias_lr=0.1, box=7.5, cls=0.5, dfl=1.5, pose=12.0, kobj=1.0, nbs=64, hsv_h=0.015, hsv_s=0.7, hsv_v=0.4, degrees=0.0, translate=0.1, scale=0.5, shear=0.0, perspectiv                                                             e=0.0, flipud=0.0, fliplr=0.5, bgr=0.0, mosaic=1.0, mixup=0.0, copy_paste=0.0, copy_paste_mode=flip, auto_augment=randaugment, erasing=0.4, cfg=None, tracker=botso                                                             rt.yaml, save_dir=runs/detect/train
Downloading https://ultralytics.com/assets/Arial.ttf to '/home/slience_me/.config/Ultralytics/Arial.ttf'...
100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 755k/755k [00:03<00:00, 244kB/s]
Overriding model.yaml nc=80 with nc=1

                   from  n    params  module                                       arguments
  0                  -1  1       464  ultralytics.nn.modules.conv.Conv             [3, 16, 3, 2]
  1                  -1  1      4672  ultralytics.nn.modules.conv.Conv             [16, 32, 3, 2]
  2                  -1  1      7360  ultralytics.nn.modules.block.C2f             [32, 32, 1, True]
  3                  -1  1     18560  ultralytics.nn.modules.conv.Conv             [32, 64, 3, 2]
  4                  -1  2     49664  ultralytics.nn.modules.block.C2f             [64, 64, 2, True]
  5                  -1  1     73984  ultralytics.nn.modules.conv.Conv             [64, 128, 3, 2]
  6                  -1  2    197632  ultralytics.nn.modules.block.C2f             [128, 128, 2, True]
  7                  -1  1    295424  ultralytics.nn.modules.conv.Conv             [128, 256, 3, 2]
  8                  -1  1    460288  ultralytics.nn.modules.block.C2f             [256, 256, 1, True]
  9                  -1  1    164608  ultralytics.nn.modules.block.SPPF            [256, 256, 5]
 10                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 11             [-1, 6]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 12                  -1  1    148224  ultralytics.nn.modules.block.C2f             [384, 128, 1]
 13                  -1  1         0  torch.nn.modules.upsampling.Upsample         [None, 2, 'nearest']
 14             [-1, 4]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 15                  -1  1     37248  ultralytics.nn.modules.block.C2f             [192, 64, 1]
 16                  -1  1     36992  ultralytics.nn.modules.conv.Conv             [64, 64, 3, 2]
 17            [-1, 12]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 18                  -1  1    123648  ultralytics.nn.modules.block.C2f             [192, 128, 1]
 19                  -1  1    147712  ultralytics.nn.modules.conv.Conv             [128, 128, 3, 2]
 20             [-1, 9]  1         0  ultralytics.nn.modules.conv.Concat           [1]
 21                  -1  1    493056  ultralytics.nn.modules.block.C2f             [384, 256, 1]
 22        [15, 18, 21]  1    751507  ultralytics.nn.modules.head.Detect           [1, [64, 128, 256]]
Model summary: 129 layers, 3,011,043 parameters, 3,011,027 gradients, 8.2 GFLOPs

Transferred 319/355 items from pretrained weights
Freezing layer 'model.22.dfl.conv.weight'
AMP: running Automatic Mixed Precision (AMP) checks...
Downloading https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt to 'yolo11n.pt'...
100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 5.35M/5.35M [00:24<00:00, 232kB/s]
AMP: checks passed ✅
train: Scanning /home/slience_me/codehub/ultralytics/datasets/SL/labels/train... 85 images, 0 backgrounds, 0 corrupt: 100%|██████████| 85/85 [00:01<00:00, 83.24it/s]
train: New cache created: /home/slience_me/codehub/ultralytics/datasets/SL/labels/train.cache
val: Scanning /home/slience_me/codehub/ultralytics/datasets/SL/labels/val... 8 images, 0 backgrounds, 0 corrupt: 100%|██████████| 8/8 [00:00<00:00, 53.09it/s]
val: New cache created: /home/slience_me/codehub/ultralytics/datasets/SL/labels/val.cache
Plotting labels to runs/detect/train/labels.jpg...
optimizer: 'optimizer=auto' found, ignoring 'lr0=0.01' and 'momentum=0.937' and determining best 'optimizer', 'lr0' and 'momentum' automatically...
optimizer: AdamW(lr=0.002, momentum=0.9) with parameter groups 57 weight(decay=0.0), 64 weight(decay=0.0005), 63 bias(decay=0.0)
Image sizes 640 train, 640 val
Using 1 dataloader workers
Logging results to runs/detect/train
Starting training for 30 epochs...

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       1/30      2.02G      2.311      4.153      1.502          7        640: 100%|██████████| 6/6 [00:01<00:00,  3.41it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00,  1.19it/s]
                   all          8          8    0.00333          1      0.296      0.146

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       2/30      2.05G      1.822      3.028      1.154          9        640: 100%|██████████| 6/6 [00:00<00:00,  7.99it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.52it/s]
                   all          8          8    0.00333          1      0.995      0.634

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       3/30      2.06G      1.429      2.044      1.016          4        640: 100%|██████████| 6/6 [00:00<00:00,  8.39it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.31it/s]
                   all          8          8    0.00333          1      0.995      0.684

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       4/30      2.08G      1.285      1.539      1.034          7        640: 100%|██████████| 6/6 [00:00<00:00,  8.17it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.39it/s]
                   all          8          8    0.00333          1      0.995      0.618

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       5/30       2.1G      1.182      1.416     0.9996         12        640: 100%|██████████| 6/6 [00:00<00:00,  8.41it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 12.08it/s]
                   all          8          8    0.00333          1     0.0652      0.028

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       6/30       2.1G      1.202      1.378     0.9993          8        640: 100%|██████████| 6/6 [00:00<00:00,  8.21it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.15it/s]
                   all          8          8    0.00333          1      0.995      0.597

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       7/30       2.1G      1.264      1.329       1.03          6        640: 100%|██████████| 6/6 [00:00<00:00,  8.41it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 12.17it/s]
                   all          8          8    0.00333          1      0.995      0.476

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       8/30       2.1G      1.274      1.289      1.064          9        640: 100%|██████████| 6/6 [00:00<00:00,  8.14it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.74it/s]
                   all          8          8    0.00333          1      0.955      0.765

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
       9/30      2.12G      1.245      1.266      1.051         13        640: 100%|██████████| 6/6 [00:00<00:00,  8.53it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.15it/s]
                   all          8          8    0.00333          1      0.995       0.74

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      10/30      2.14G      1.196      1.247       1.02         10        640: 100%|██████████| 6/6 [00:00<00:00,  7.91it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.02it/s]
                   all          8          8    0.00333          1      0.995      0.667

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      11/30      2.16G      1.234      1.232      1.023          9        640: 100%|██████████| 6/6 [00:00<00:00,  8.46it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.28it/s]
                   all          8          8    0.00333          1      0.995      0.736

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      12/30      2.17G      1.292      1.142      1.024         16        640: 100%|██████████| 6/6 [00:00<00:00,  8.35it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.08it/s]
                   all          8          8      0.928          1      0.995      0.662

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      13/30      2.19G      1.254      1.163      1.024          8        640: 100%|██████████| 6/6 [00:00<00:00,  8.55it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.15it/s]
                   all          8          8    0.00868          1      0.995      0.583

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      14/30      2.21G      1.259      1.241      1.031          5        640: 100%|██████████| 6/6 [00:00<00:00,  8.35it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.54it/s]
                   all          8          8      0.967          1      0.995      0.583

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      15/30      2.22G      1.283      1.169       1.04         12        640: 100%|██████████| 6/6 [00:00<00:00,  8.62it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 12.20it/s]
                   all          8          8      0.973          1      0.995      0.611

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      16/30      2.24G      1.256      1.186      1.059          7        640: 100%|██████████| 6/6 [00:00<00:00,  8.47it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.20it/s]
                   all          8          8      0.981          1      0.995      0.582

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      17/30      2.26G      1.278      1.124      1.041         11        640: 100%|██████████| 6/6 [00:00<00:00,  8.83it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.14it/s]
                   all          8          8      0.987          1      0.995      0.629

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      18/30      2.26G       1.19      1.085      1.019         11        640: 100%|██████████| 6/6 [00:00<00:00,  8.38it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.77it/s]
                   all          8          8      0.987          1      0.995      0.652

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      19/30      2.26G      1.231      1.127      1.073         12        640: 100%|██████████| 6/6 [00:00<00:00,  8.76it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 11.92it/s]
                   all          8          8      0.984          1      0.995      0.615

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      20/30      2.26G      1.226      1.065      1.043          8        640: 100%|██████████| 6/6 [00:00<00:00,  8.58it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.43it/s]
                   all          8          8      0.991          1      0.995      0.646
Closing dataloader mosaic

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      21/30      2.26G      1.164      1.579      1.017          5        640: 100%|██████████| 6/6 [00:01<00:00,  3.43it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.73it/s]
                   all          8          8       0.99          1      0.995      0.689

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      22/30      2.26G      1.251      1.526      1.042          4        640: 100%|██████████| 6/6 [00:00<00:00,  8.66it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.92it/s]
                   all          8          8       0.99          1      0.995       0.61

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      23/30      2.26G      1.208      1.478       1.02          5        640: 100%|██████████| 6/6 [00:00<00:00,  9.05it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.58it/s]
                   all          8          8      0.991          1      0.995      0.597

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      24/30      2.26G      1.309      1.653      1.061          2        640: 100%|██████████| 6/6 [00:00<00:00,  8.75it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 18.22it/s]
                   all          8          8      0.992          1      0.995      0.567

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      25/30      2.26G      1.184      1.457      1.001          4        640: 100%|██████████| 6/6 [00:00<00:00,  9.29it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 12.45it/s]
                   all          8          8      0.992          1      0.995       0.58

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      26/30      2.26G      1.274      1.411       1.06          5        640: 100%|██████████| 6/6 [00:00<00:00,  7.51it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.13it/s]
                   all          8          8      0.992          1      0.995      0.557

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      27/30      2.26G      1.189      1.446      1.008          4        640: 100%|██████████| 6/6 [00:00<00:00,  9.55it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.40it/s]
                   all          8          8      0.992          1      0.995      0.621

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      28/30      2.26G      1.165      1.438      1.024          3        640: 100%|██████████| 6/6 [00:00<00:00,  8.86it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.85it/s]
                   all          8          8      0.992          1      0.995      0.641

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      29/30      2.26G      1.212      1.454      1.059          4        640: 100%|██████████| 6/6 [00:00<00:00,  9.73it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 10.89it/s]
                   all          8          8      0.992          1      0.995      0.641

      Epoch    GPU_mem   box_loss   cls_loss   dfl_loss  Instances       Size
      30/30      2.26G      1.061      1.304       1.01          4        640: 100%|██████████| 6/6 [00:00<00:00,  9.17it/s]
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 17.80it/s]
                   all          8          8      0.993          1      0.995      0.626

30 epochs completed in 0.010 hours.
Optimizer stripped from runs/detect/train/weights/last.pt, 6.2MB
Optimizer stripped from runs/detect/train/weights/best.pt, 6.2MB

Validating runs/detect/train/weights/best.pt...
Ultralytics 8.3.109 🚀 Python-3.10.16 torch-2.6.0+cu124 CUDA:0 (NVIDIA GeForce RTX 2080 Ti, 10825MiB)
Model summary (fused): 72 layers, 3,005,843 parameters, 0 gradients, 8.1 GFLOPs
                 Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00, 16.92it/s]
                   all          8          8    0.00333          1      0.955      0.759
Speed: 0.2ms preprocess, 1.7ms inference, 0.0ms loss, 1.3ms postprocess per image
Results saved to runs/detect/train
💡 Learn more at https://docs.ultralytics.com/modes/train
(yolov8) slience_me@ubuntu-Super-Server:~/codehub/ultralytics$
```

:::

#### 训练完成

- best.pt 最好的模型
- last.pt 最后一轮的模型

![image-20250417102038429](/images/yolov8/image-20250417102038429.png)

![image-20250417102200527](/images/yolov8/image-20250417102200527.png)

#### 测试效果

```bash
yolo detect predict model=runs/detect/train/weights/best.pt source=./BVN.mp4 show=True
```

简单训练，效果不太好，使用开源模型试试

```bash
yolo detect predict model=./yolov8n.pt source=./BVN.mp4 show=True
```

<img src="/images/yolov8/image-20250417103204254.png" alt="image-20250417103204254" style="zoom: 50%;" />

![image-20250417103219047](/images/yolov8/image-20250417103219047.png)

#### 导出onnx

```bash
from ultralytics import YOLO

# Load a model
model = YOLO("yolo11n.pt")  # load an official model
model = YOLO("path/to/best.pt")  # load a custom trained model

# Export the model
model.export(format="onnx")
```

