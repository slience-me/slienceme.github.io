---
layout: post
title: Python｜数据挖掘_Matplotlib
categories: [Python]
description: 数据挖掘_Matplotlib
keywords: 编程语言, Python 
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# Python--Matplotlib简单了解
![Alt Text](/images/posts/6e8e0128dba745a3bfbd7f346851a397.png)

## 一、数据挖掘基础环境安装与使用
### 1.1 库的安装
```py
matplotlib==2.2.2
numpy==1.14.2
pandas==0.20.3
TA-Lib==0.4.16 技术指标库
tables==3.4.2 hdf5
jupyter==1.0.0 数据分析与展示的平台
```
### 1.2 Jupyter Notebook使用
#### 1.2.1 Jupyter Notebook介绍
1. web版的ipython
2. 名字
	ju - Julia
	py - Python
	ter - R
Jupiter 木星 宙斯
3. 编程、写文档、记笔记、展示
4. .ipynb
#### 1.2.2 为什么使用Jupyter Notebook?
  1. 画图方面的优势
  2. 数据展示方面的优势
#### 1.2.3 Jupyter Notebook的使用-helloworld
1. 界面启动、创建文件
    * 在终端输入jupyter notebook / ipython notebook
    * 快速上手的方法：
        - 快捷键
            * 运行代码 shift + enter
2.  cell操作
	 * cell：一对In Out会话被视作一个代码单元，称为cell
	 * 编辑模式：
	     - enter
	     - 鼠标直接点
	 * 命令模式：
	     - esc
	     - 鼠标在本单元格之外点一下
 * 	快捷键操作
     执行代码：`shift + enter`
     - 命令模式：
     `A`：在当前cell的上面添加cell
     `B`：在当前cell的下面添加cell
     `双击D`：删除当前cell
     - 编辑模式：
     多光标操作：Ctrl键点击鼠标（Mac:CMD+点击鼠标）
     回退：`Ctrl+Z`（Mac:CMD+Z）
     补全代码：变量、方法后跟Tab键
     为一行或多行代码添加/取消注释：`Ctrl+/`（Mac:CMD+/）

## 二、Matplotlib
###  2.1 Matplotlib
#### 2.1.1 什么是Matplotlib 
- 画二维图表的python库
 
	- `mat` - matrix 矩阵
	- 二维数据 - 二维图表
	- `plot` - 画图
	- `lib` - library 库
	- `matlab` 矩阵实验室
	- `mat` - matrix
	- `lab` 实验室


#### 2.1.2 为什么要学习Matplotlib 
- 画图

   数据可视化 - 帮助理解数据，方便选择更合适的分析方法
   `js库` - D3 echarts
   奥卡姆剃刀原理 - 如无必要勿增实体
#### 2.1.3 实现一个简单的Matplotlib画图

```python
import matplotlib.pyplot as plt
%matplotlib inline 
plt.figure()
plt.plot([1,0,9],[4,5,6])
plt.show()
```
![Alt Text](/images/posts/9b13c951f88f40ca9ef4d9feebd1c590.png)


####  2.1.4 认识Matplotlib图像结构

#### 2.1.5 拓展知识点：Matplotlib三层结构
1. 容器层
      -  画板层`Canvas`
       - 画布层`Figure`
       - 绘图区/坐标系
           - x、y轴张成的区域
2. 辅助显示层
3. 图像层
![Alt Text](/images/posts/09de024856704f42a0e1138d1facd1cf.png)

### 2.2 常见图形种类及意义
- 折线图`plot`：以折线的上升或下降来表示统计数量的增减变化的统计图
- **特点：能够显示数据的变化趋势，反映事物的变化情况**
![Alt Text](/images/posts/7e5d41c702c04a838c5ac41c6bdb4216.png)

---
- 散点图`scatter`：用两组数据构成多个坐标点，考察坐标点的分布，判断两个变量之间是否存在某种关联或总结坐标点的分布模式
- **特点：判断变量之间是否存在数量关联趋势，展示离群点（分布规律）**
![Alt Text](/images/posts/9850314571dc44e4ba528db80a632d25.png)
---
- 柱状图`bar`：排列在工作表的列或行中的数据可以绘制到柱状图中
- **特点：绘制连离散的数据，能够一眼看出各个数据的大小，比较数据之间的差别。(统计/对比)**
![Alt Text](/images/posts/37627f465f6c468dbe4ec43632983cac.png)
--- 
- 直方图`histogram`： 由一系列高度不等的纵向条纹或线段标识数据分布的情况。一般用横轴标识数据范围，纵轴表示分布情况
- **特点：绘制连续性的数据展示一组或者多组数据的分布情况(分布状况)**
![Alt Text](/images/posts/7966febd4ce0493e8bcb81296895890e.png)
---
- 饼图`pie π`：用于表示不同分类的占比情况，通过弧度大小来对比各种分类。
- **特点：分类数据的占比情况(占比)**
![Alt Text](/images/posts/fe57e884b7f9439e8a08a92efbc82a3a.png)

                    
###  2.3 折线图(plot)
- 与基础绘图功能
#### 2.3.1 容器层
##### 折线图绘制与保存图片
```python
# 展现上海一周的天气，比如从星期一到星期日的天气温度如下
# 1.创建画布
# plt.figure() 下图对比
plt.figure(figsize=(20,8), dpi=80)

# 2.绘制图像
plt.plot([1,2,3,4,5,6,7],[17,17,18,15,11,11,13])

# 保存图像
plt.savefig("test78.png")

# 3.显示图像
plt.show()
```
![Alt Text](/images/posts/0ebe2a875aad44f2ade17d8df954d03f.png)
![Alt Text](/images/posts/a39fc43c25904e96ac000fcb30e1ff95.png)


##### 设置画布属性与图片保存
  -  `figsize` : 画布大小
  -  `dpi` : `dot per inch` 图像的清晰度

```python
plt.figure(figsize=(), dpi=)
	figsize:指定图的长宽
	dpi：图像的清晰度
	返回fig对象
plt.savefig(path)
```
- 注意：`plt.show()`会释放figure资源，如果在显示图像之后保存图片只能保存空图片

#### 2.3.2 辅助显示层
案例：显示温度变化状况 
需求：画出某城市11点到12点1小时内每分钟的温度变化折线图，温度范围在15度~18度

```python
# 画出某城市11点到12点1小时内每分钟的温度变化折线图，温度范围在15度~18度
from pylab import mpl
mpl.rcParams['font.sans-serif'] = ['simhei'] # 指定默认字体
mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
import random
# 准备x,y坐标的数据
x = range(60)
y_sahnghai = [random.uniform(15, 18) for i in x]

# 2.创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3.绘制图像
plt.plot(x, y_sahnghai)

# 修改x,y刻度
# 准备x的刻度说明
x_label = ["11点{}分".format(i) for i in x]
plt.xticks(x[::5], x_label[::5])
plt.yticks(range(0, 40, 5))

# 添加网格显示
plt.grid(True, linestyle='--', alpha=0.5)

# 添加描述信息
plt.xlabel("时间")
plt.ylabel("温度")
plt.title("中午11点0分到12点之间的温度变化图示")

# 4.显示图像
plt.show()
```
效果：
![Alt Text](/images/posts/5af04846b69f41189629d8234168b06d.png)


##### 添加自定义刻度
- `plt.xticks(x, **kwargs)`
	- x:要显示的刻度值
- `plt.yticks(y, **kwargs)`
	-  y:要显示的刻度值
```python
# 添加以下两行代码
# 构造x轴刻度标签
x_ticks_label = ["11点{}分".format(i) for i in x]
# 构造y轴刻度
y_ticks = range(40)

# 修改x,y轴坐标的刻度显示
plt.xticks(x[::s], x_ticks_label[::5])
plt.yticks(y_ticks[::5])
```
##### 添加网格显示
```python
plt.grid(True, linestyle='--', alpha=0.5)
```
##### 添加描述信息
添加x轴、y轴描述信息及标题
```python
plt.xlabel("时间")
plt.ylabel("温度")
plt.title("中午11点0分到12点之间的温度变化图示")
```
##### 中文显示问题解决
![Alt Text](/images/posts/f21c2cd3a78a41bb9746aa8c643e7b7f.png)
- [ ] mac的一次配置，一劳永逸
- [ ] ubantu每创建一次新的虚拟环境，需要重新配置   
- [ ] windows
	1. 安装字体
	 mac/wins：双击安装
	 ubantu：双击安装
	2. 删除matplotlib缓存文件
	3. 配置文件

动态设置参数（推荐方式）
在python脚本中动态设置matplotlibrc，这样就避免了更改配置文件的麻烦，方便灵活，例如:

```python
from pylab import mpl
mpl.rcParams['font.sans-serif'] = ['SimHei']
```
由于更改了字体导致显示不出负号，将配署文件中axes.unicode minus : True修改为Falsest就可以了，当然这而可以用代码来完成。
```python
from pylab import mpl
mpl.rcParams['font.sans-serif'] = ['FangSong'] # 指定默认字体
mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
```
#### 2.3.3 图像层
 

```python
# 需求：再添加一个曾是的温度变化
# 收集到北京当天温度变化情况，温度在1度到3度
from pylab import mpl
mpl.rcParams['font.sans-serif'] = ['simhei'] # 指定默认字体
mpl.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
import random
# 准备x,y坐标的数据
x = range(60)
y_shanghai = [random.uniform(15, 18) for i in x]
y_beijing =  [random.uniform(1, 3) for i in x]

# 2.创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3.绘制图像
plt.plot(x, y_shanghai, color="r", linestyle="--", label="上海")
plt.plot(x, y_beijing, color="b", label="北京")

# 显示图例
# plt.legend(loc=4)
plt.legend(loc='upper left')

# 修改x,y刻度
# 准备x的刻度说明
x_label = ["11点{}分".format(i) for i in x]
plt.xticks(x[::5], x_label[::5])
plt.yticks(range(0, 40, 5))

# 添加网格显示
plt.grid(True, linestyle='--', alpha=0.5)

# 添加描述信息
plt.xlabel("时间")
plt.ylabel("温度")
plt.title("上海、北京中午11点0分到12点之间的温度变化图示")

# 4.显示图像
plt.show()
```

|颜色字符| 风格字符 |
|--|--|
| r 红色 | `-` 实线 |
| g 绿色 | `--` 虚线 |
| b 蓝色 | `-.` 点划线 |
| w 白色 | `:` 点虚线 |
| c 青色 | `’‘`留空 |
| m 洋红 ||
| y 黄色 ||
| k 黑色||

|位置字符串| 位置代码|
|--|--|
| 'best' | 0 |
| 'upper right' | 1 |
|'upper left' | 2 |
| 'lower left' | 3 |
|'lower right' | 4 |
| 'right' | 5 |
| 'center left'| 6 |

![Alt Text](/images/posts/5bf4350a2c674e6bb9b1e7da23b50ee5.png)

##### 多个坐标系显示
相同图不同坐标系，效果图
![Alt Text](/images/posts/0b77e41a3caf4202a89355139169f22c.png)

- `plt.subplots`(面向对象的画图方法)
- `matplotlib.pyplot.subplots(nrows=1, ncols=1, **fig_kw)` 创建一个带有多个axes(坐标系/绘图区)的图

- 注意：plt.函数名()相当于面向过程的画图方法，axes.set_方法名()相当于面向对象的画图方法
```python
figure, axes = plt.subplots(nrows=1, ncols=2, **fig_kw)
axes[0].方法名()
axes[1]
```

```python
# 需求：再添加一个城市的温度变化
# 收集到北京当天温度变化情况，温度在1度到3度。 

# 1、准备数据 x y
x = range(60)
y_shanghai = [random.uniform(15, 18) for i in x]
y_beijing = [random.uniform(1, 3) for i in x]

# 2、创建画布
# plt.figure(figsize=(20, 8), dpi=80)
figure, axes = plt.subplots(nrows=1, ncols=2, figsize=(20, 8), dpi=80)

# 3、绘制图像
axes[0].plot(x, y_shanghai, color="r", linestyle="-.", label="上海")
axes[1].plot(x, y_beijing, color="b", label="北京")

# 显示图例
axes[0].legend()
axes[1].legend()

# 修改x、y刻度
# 准备x的刻度说明
x_label = ["11点{}分".format(i) for i in x]
axes[0].set_xticks(x[::5])
axes[0].set_xticklabels(x_label[::5])
axes[0].set_yticks(range(0, 40, 5))
axes[1].set_xticks(x[::5])
axes[1].set_xticklabels(x_label[::5])
axes[1].set_yticks(range(0, 40, 5))

# 添加网格显示
axes[0].grid(linestyle="--", alpha=0.5)
axes[1].grid(linestyle="--", alpha=0.5)

# 添加描述信息
axes[0].set_xlabel("时间变化")
axes[0].set_ylabel("温度变化")
axes[0].set_title("上海11点到12点每分钟的温度变化状况")
axes[1].set_xlabel("时间变化")
axes[1].set_ylabel("温度变化")
axes[1].set_title("北京11点到12点每分钟的温度变化状况")

# 4、显示图
plt.show()
```

##### 折线图的应用场景
- 呈现某公司产品(不同区域)每天活跃用户数
- 呈现app每天下载数量
- 呈现产品新功能上线后，用户点击次数随时间的变化
- 拓展：画各种数学函数图像
	- 注意：`plt.plot()`除了可以画折线图，也可以用于各种数学函数图像
      
某事物、某指标随时间的变化状况
拓展：画各种数学函数图像

```python
import numpy as np
# 1.准备x,y数据
x = np.linspace(-1, 1, 1000)
y = 2 * x * x

# 2.创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3. 绘制图像
plt.plot(x, y)

# 添加网格
plt.grid(linestyle="--", alpha=0.5)

# 4. 显示图像
plt.show()
```
![Alt Text](/images/posts/b8092b48f0a34650b70ce260fcce51f9.png)

### 2.4 散点图(scatter)
#### **需求:探究房屋面积和房屋价格的关系**

房屋面积数据：

```python
x = [225.98, 247.07, 253.14, 457.85, 241.58, 301.01,  20.67, 288.64,
163.56, 120.06, 207.83, 342.75, 147.9 ,  53.06, 224.72,  29.51,
21.61, 483.21, 245.25, 399.25, 343.35]
```
房屋价格数据:
```python
y = [196.63, 203.88, 210.75, 372.74, 202.41, 247.61,  24.9 , 239.34,
140.32, 104.15, 176.84, 288.23, 128.79,  49.64, 191.74,  33.1 ,
30.74, 400.02, 205.35, 330.64, 283.45]
```

```python
# 需求：探究房屋面积和房屋价格的关系

# 1、准备数据
x = [225.98, 247.07, 253.14, 457.85, 241.58, 301.01,  20.67, 288.64,
       163.56, 120.06, 207.83, 342.75, 147.9 ,  53.06, 224.72,  29.51,
        21.61, 483.21, 245.25, 399.25, 343.35]

y = [196.63, 203.88, 210.75, 372.74, 202.41, 247.61,  24.9 , 239.34,
       140.32, 104.15, 176.84, 288.23, 128.79,  49.64, 191.74,  33.1 ,
        30.74, 400.02, 205.35, 330.64, 283.45]

# 2、创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3、绘制图像
plt.scatter(x, y)

# 4、显示图像
plt.show()
```
![Alt Text](/images/posts/e9fcfe52f3a7458e8907f69428b4a386.png)
### 2.5 柱状图(bar)
#### **需求1-对比每部电影的票房收入**
![Alt Text](/images/posts/ccc0580330f64d0ab2ad4db2972b3751.png)

```python
# 1、准备数据
movie_names = ['雷神3：诸神黄昏','正义联盟','东方快车谋杀案','寻梦环游记','全球风暴', '降魔传','追捕','七十七天','密战','狂兽','其它']
tickets = [73853,57767,22354,15969,14839,8725,8716,8318,7916,6764,52222]

# 2、创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3、绘制柱状图
x_ticks = range(len(movie_names))
plt.bar(x_ticks, tickets, color=['b','r','g','y','c','m','y','k','c','g','b'])

# 修改x刻度
plt.xticks(x_ticks, movie_names)

# 添加标题
plt.title("电影票房收入对比")

# 添加网格显示
plt.grid(linestyle="--", alpha=0.5)

# 4、显示图像
plt.show()
```
![Alt Text](/images/posts/75435c05ce92455d9e8d6b43a3eaf536.png)
#### **需求2-如何对比电影票房收入才更能加有说服力？**
比较相同天数的票房

```python
# 1、准备数据
movie_name = ['雷神3：诸神黄昏','正义联盟','寻梦环游记']

first_day = [10587.6,10062.5,1275.7]
first_weekend=[36224.9,34479.6,11830]

x = range(len(movie_name))

# 2、创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3、绘制柱状图
# plt.bar(range(3), first_day, width=0.2, label="首日票房")
plt.bar(x, first_day, width=0.2, label="首日票房")
# plt.bar([0.2, 1.2, 2.2], first_weekend, width=0.2, label="首周票房")
plt.bar([i+0.2 for i in x], first_weekend, width=0.2, label="首周票房")

# 显示图例
plt.legend()

# 修改刻度
# plt.xticks([0.1, 1.1, 2.1], movie_name)
plt.xticks([i+0.1 for i in x], movie_name)

# 4、显示图像
plt.show()
```
![Alt Text](/images/posts/e5d36ebc5e3443369306d9fb3b806b1d.png)

### 2.6 直方图(histogram)
组数=(175.5-150.5) / 5 =5
![Alt Text](/images/posts/b92e3d320e0848e5b276a32e4aa0c737.png)

```python
# 需求：电影时长分布状况
# 1、准备数据
time = [131,  98, 125, 131, 124, 139, 131, 117, 128, 108, 135, 138, 131, 102, 107, 114, 119, 128, 121, 142, 127, 130, 124, 101, 110, 116, 117, 110, 128, 128, 115,  99, 136, 126, 134,  95, 138, 117, 111,78, 132, 124, 113, 150, 110, 117,  86,  95, 144, 105, 126, 130,126, 130, 126, 116, 123, 106, 112, 138, 123,  86, 101,  99, 136,123, 117, 119, 105, 137, 123, 128, 125, 104, 109, 134, 125, 127,105, 120, 107, 129, 116, 108, 132, 103, 136, 118, 102, 120, 114,105, 115, 132, 145, 119, 121, 112, 139, 125, 138, 109, 132, 134,156, 106, 117, 127, 144, 139, 139, 119, 140,  83, 110, 102,123,107, 143, 115, 136, 118, 139, 123, 112, 118, 125, 109, 119, 133,112, 114, 122, 109, 106, 123, 116, 131, 127, 115, 118, 112, 135,115, 146, 137, 116, 103, 144,  83, 123, 111, 110, 111, 100, 154,136, 100, 118, 119, 133, 134, 106, 129, 126, 110, 111, 109, 141,120, 117, 106, 149, 122, 122, 110, 118, 127, 121, 114, 125, 126,114, 140, 103, 130, 141, 117, 106, 114, 121, 114, 133, 137,  92,121, 112, 146,  97, 137, 105,  98, 117, 112,  81,  97, 139, 113,134, 106, 144, 110, 137, 137, 111, 104, 117, 100, 111, 101, 110,105, 129, 137, 112, 120, 113, 133, 112,  83,  94, 146, 133, 101,131, 116, 111,  84, 137, 115, 122, 106, 144, 109, 123, 116, 111,111, 133, 150]

# 2、创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3、绘制直方图
distance = 2
group_num = int((max(time) - min(time)) / distance)
plt.hist(time, bins=group_num, density=True)
# 1、准备数据

# 修改x轴刻度
plt.xticks(range(min(time), max(time) + 2, distance))

# 添加标题
plt.title("电影时长分布状况")

# 添加网格
plt.grid(linestyle="--", alpha=0.5)

# 4、显示图像
plt.show()
```
![Alt Text](/images/posts/d1251570f8c94256b2386921d6ef8dd4.png)

### 2.7 饼状图(pie Π)

```python
# 1、准备数据
movie_name = ['雷神3：诸神黄昏','正义联盟','东方快车谋杀案','寻梦环游记','全球风暴','降魔传','追捕','七十七天','密战','狂兽','其它']

place_count = [60605,54546,45819,28243,13270,9945,7679,6799,6101,4621,20105]

# 2、创建画布
plt.figure(figsize=(20, 8), dpi=80)

# 3、绘制饼图
plt.pie(place_count, labels=movie_name, colors=['b','r','g','y','c','m','y','k','c','g','y'], autopct="%1.2f%%")

# 显示图例
plt.legend()

# 保证长宽一样
plt.axis('equal')

# 4、显示图像
plt.show()
```

![Alt Text](/images/posts/5a01eaa5b7f4444ea9c31eebbc8f519b.png)
