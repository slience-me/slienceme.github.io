---
layout: post
title: Python｜数据挖掘_Pandas高级
categories: [Python]
description: 数据挖掘_Pandas高级
keywords: 编程语言, Python 
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

![Alt Text](/images/posts/f1807458341444e795ee930fa81f9295.png)

# Pandas高级处理
- 缺失值处理
- 数据离散化
- 合并
- 交叉表与透视表
- 分组与聚合
- 综合案例

## 1. 高级处理-缺失值处理
### 1.1 如何进行缺失值处理
#### 两种思路：
1. 删除含有缺失值的样本
2. 替换/插补
#### 如何处理nan
- 判断数据中是否存在NaN
	- `pd.isnull(df)`
	- `pd.notnull(df)`

![Alt Text](/images/posts/223b6f48d9dd4465b93c69d9fb9b191f.png)

2. 删除含有缺失值的样本
	- `df.dropna(inplace=False, axis='rows')` 不会修改原数据，需要接受返回值
	- 替换/插补
	- `df.fillna(value, inplace=False)`
		- `values` ： 替换成的值
		- `inplace` ：True 会修改原数据  False 不会修改原数据，生成新的对象 

![Alt Text](/images/posts/6293619391b849678b1ee2419e0ddebe.png)

#### 不是缺失值nan，有默认标记的
- 替换 `？-> np.nan`
	- `df.replace(to_replace="?", value=np.nan)`
		- `to_replace`：替换前的值
		- `value`：替换后的值
- 处理`np.nan`缺失值的步骤

```python
# 读取数据
path = "https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data"
name = ["Sample code number", "Clump Thickness", "Uniformity of Cell Size", "Uniformity of Cell Shape", "Marginal Adhesion", "Single Epithelial Cell Size", "Bare Nuclei", "Bland Chromatin", "Normal Nucleoli", "Mitoses", "Class"]

data = pd.read_csv(path, names=name)
```
![Alt Text](/images/posts/a542346dfccb4918b5e4c3892a325962.png)

## 2. 高级处理-数据离散化
|  |性别  | 年龄 |
|--|--|--|
| A | 1 |23 |
| B |  2|30 |
| C  | 1 |18 |

|  |物种| 毛发|
|--|--|--|
| A | 1 ||
| B |  2||
| C  | 3 ||

下边更合理

|  |男 | 女 | 年龄 |
|--|--|--|--|
| A | 1 |0 |23 |
| B |  0|1 |30 |
| C  | 1 |0 | 18|


|  |狗| 猪  | 老鼠 |毛发  |
|--|--|--|--| --|
| A | 1 |0 |0| 2 |
| B |  0|1 |0 | 1 |
| C  | 1 |0 | 1| 1 |

### one-hot编码&哑变量
### 2.1 什么是数据的离散化
   原始的身高数据：165，174，160，180，159，163，192，184
### 2.2 为什么要离散化
### 2.3 如何实现数据的离散化
- 对数据进行分组
     - 自动分组`sr=pd.qcut(data, bins)`
      - 自定义分组`sr=pd.cut(data， bins)`
      - 对数据进行分组将数据分组一般会与`value_counts`搭配使用，统计每组的个数
      	- `series.value_counts()` :统计分组次数
- 将分组好的结果转换成one-hot编码
     -  `pd.get_dummies(data, prefix=None)`
     	- `data`: array-like, Series, or DataFrame
     	- `prefix`: 分组名字

```python
# 1）准备数据
data = pd.Series([165,174,160,180,159,163,192,184], index=['No1:165', 'No2:174','No3:160', 'No4:180', 'No5:159', 'No6:163', 'No7:192', 'No8:184']) 
```
![Alt Text](/images/posts/ea3573dd4a324ab594d8fac87651cb8c.png)
![Alt Text](/images/posts/77cc0633755b485e83da74dadfadf34f.png)

## 3. 高级处理-合并
-  numpy
     - np.concatnate((a, b), axis=)
     - 水平拼接
         - np.hstack()
     - 竖直拼接
        -  np.vstack()
---            
- 按方向拼接
	- `pd.concat([data1, data2], axis=1)`
		- 按照行或列进行合并，axis=0为列索引，axis=1为行索引 
- 按索引拼接
	- `pd.merge`实现合并

- `pd.merge(left, right, how="inner", on=[索引])`
![Alt Text](/images/posts/a4d8f48e25f14111aac3e0d716ddfb0a.png)

![Alt Text](/images/posts/b6819159ffaf4b04abd6dd890bfbceee.png)

## 4. 高级处理-交叉表与透视表
  - 找到、探索两个变量之间的关系
### 4.1 交叉表与透视表什么作用
### 4.2 使用crosstab(交叉表)实现
   - `pd.crosstab(value1, value2)`
### 4.3 pivot_table

![Alt Text](/images/posts/8a49f7ebeabc40579328f31a3e77dc67.png)

## 5. 高级处理-分组与聚合
### 5.1 什么是分组与聚合
### 5.2 分组与聚合API
- `DataFrame.groupby(key, as_index=False)`
	- `key`：分组的列数据，可以多个 
- 案例：不同颜色的不同笔的价格数据

```python
col =pd.DataFrame({'color': ['white','red','green','red','green'], 'object': ['pen','pencil','pencil','ashtray','pen'],'price1':[5.56,4.20,1.30,0.56,2.75],'price2':[4.75,4.12,1.60,0.75,3.15]})

```
![Alt Text](/images/posts/c57467ac3cd14e308ce96327995af0b6.png)


## 6. 综合案例
![Alt Text](/images/posts/7c626edaf0054feca43d7cd4e3874d58.png)

