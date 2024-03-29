---
layout: post
title: 数学建模｜matplotlib画多个子图(散点图为例 左右对照画图)
categories: [数学建模]
description: 【数学建模相关】matplotlib画多个子图(散点图为例 左右对照画图)
keywords: 编程语言, 数学建模
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

### 例题
乙醇偶合制备 C4  烯烃

C4 烯烃广泛应用于化工产品及医药的生产，乙醇是生产制备 C4 烯烃的原料。

在制备过程中，催化剂组合（即：Co 负载量、Co/SiO2 和 HAP 装料比、乙醇浓度
的组合）与温度对 C4 烯烃的选择性和 C4 烯烃收率将产生影响（名词解释见附录）。
因此通过对催化剂组合设计，探索乙醇催化偶合制备 C4 烯烃的工艺条件具有非常
重要的意义和价值。

某化工实验室针对不同催化剂在不同温度下做了一系列实验，结果如附件 1 和
附件 2 所示。请通过数学建模完成下列问题：

(1) 对附件 1 中每种催化剂组合，分别研究乙醇转化率、C4 烯烃的选择性与温
度的关系，并对附件 2 中 350 度时给定的催化剂组合在一次实验不同时间的测试结
果进行分析。

(2) 探讨不同催化剂组合及温度对乙醇转化率以及 C4 烯烃选择性大小的影响。

(3) 如何选择催化剂组合与温度，使得在相同实验条件下 C4 烯烃收率尽可能
高。若使温度低于 350 度，又如何选择催化剂组合与温度，使得 C4 烯烃收率尽可
能高。

(4) 如果允许再增加 5 次实验，应如何设计，并给出详细理由。
### 例图
![Alt Text](/images/posts/ed9b66a70feb405a9ff2cbb6e8036ff2.png)
![Alt Text](/images/posts/1a9a60e9d5954f1daf6be1fbb7a2b9d2.png)
### 代码展示

```python
# -*- codeing = utf-8 -*-
# @Time : 2021/9/11  20:45
# @Author : slience_me
# @File : LS_9_11_1.py
# @Software : 数学建模
# - * - coding: utf - 8 -*-

import matplotlib.pyplot as plt
import numpy as np
import pylab as pl
from pylab import mpl

mpl.rcParams['font.sans-serif'] = ['FangSong']
mpl.rcParams['axes.unicode_minus'] = False


def func_Ls1(X_list, Y_list, Y_list_, label_list, y_label, title_list):
    def draw():
        plt.figure(figsize=(10, 24), dpi=80)
        num = 0
        for i in range(1, 29):
            print(num)
            if i % 2 == 0:
                fig1 = pl.subplot(14, 2, i)
                pl.scatter(X_list[num], Y_list[num], color="b", label="Point", linewidth=3)  # 画样本点
                plt.xlabel("温度变化")
                plt.ylabel("{}".format(y_label[1]))
                plt.title("{}".format(label_list[num] + "  " + title_list[num]))
                plt.legend()
                num += 1
                print("绘制图{}".format(i))
            else:
                fig2 = pl.subplot(14, 2, i)
                pl.scatter(X_list[num], Y_list_[num], color="r", label="Point", linewidth=3)  # 画样本点
                plt.xlabel("温度变化")
                plt.ylabel("{}".format(y_label[0]))
                plt.title("{}".format(label_list[num] + "  " + title_list[num]))
                plt.legend()
                print("绘制图{}".format(i))
        pl.tight_layout()  # 布局方法
        pl.show()  # 显示方法

    draw()


def func_Ls2(X_list, Y_list, Y_list_, label_list, y_label, title_list):
    def draw():
        plt.figure(figsize=(10, 24), dpi=80)
        num = 0
        for i in range(1, 15):
            print(num)
            if i % 2 == 0:
                fig1 = pl.subplot(7, 2, i)
                pl.scatter(X_list[num], Y_list[num], color="b", label="Point", linewidth=3)  # 画样本点
                plt.xlabel("温度变化")
                plt.ylabel("{}".format(y_label[1]))
                plt.title("{}".format(label_list[num] + "  " + title_list[num]))
                plt.legend()
                num += 1
                print("绘制图{}".format(i))
            else:
                fig2 = pl.subplot(7, 2, i)
                pl.scatter(X_list[num], Y_list_[num], color="r", label="Point", linewidth=3)  # 画样本点
                plt.xlabel("温度变化")
                plt.ylabel("{}".format(y_label[0]))
                plt.title("{}".format(label_list[num] + "  " + title_list[num]))
                plt.legend()
                print("绘制图{}".format(i))

        pl.tight_layout()  # 布局方法
        pl.show()  # 显示方法

    draw()


x_A1 = np.array([250, 275, 300, 325, 350])
y_A1_1 = np.array([2.07, 5.85, 14.97, 19.68, 36.80])
y_A1_2 = np.array([34.05, 37.43, 46.94, 49.7, 47.21])

x_A2 = np.array([250, 275, 300, 325, 350])
y_A2_1 = np.array([4.60, 17.20, 38.92, 56.38, 67.88])
y_A2_2 = np.array([18.07, 17.28, 19.6, 30.62, 39.1])

x_A3 = np.array([250, 275, 300, 325, 350, 400, 450])
y_A3_1 = np.array([9.7, 19.2, 29.3, 37.6, 48.9, 83.7, 86.4])
y_A3_2 = np.array([5.5, 8.04, 17.01, 28.72, 36.85, 53.43, 49.9])

x_A4 = np.array([250, 275, 300, 325, 350, 400])
y_A4_1 = np.array([4.0, 12.1, 29.5, 43.3, 60.5, 88.4])
y_A4_2 = np.array([9.62, 8.62, 10.72, 18.89, 27.25, 41.02])

x_A5 = np.array([250, 275, 300, 325, 350, 400])
y_A5_1 = np.array([14.8, 12.4, 20.8, 28.3, 36.8, 76.0])
y_A5_2 = np.array([1.96, 6.65, 10.12, 13.86, 18.75, 38.23])

x_A6 = np.array([250, 275, 300, 350, 400])
y_A6_1 = np.array([13.4, 12.8, 25.5, 55.8, 83.3])
y_A6_2 = np.array([3.3, 7.1, 7.18, 10.65, 37.33])

x_A7 = np.array([250, 275, 300, 350, 400])
y_A7_1 = np.array([19.7, 29.0, 40.0, 58.6, 76.0])
y_A7_2 = np.array([5.75, 6.56, 8.84, 18.64, 33.25])

x_A8 = np.array([250, 275, 300, 350, 400])
y_A8_1 = np.array([6.3, 8.8, 13.2, 31.7, 56.1])
y_A8_2 = np.array([5.63, 8.52, 13.82, 25.89, 41.42])

x_A9 = np.array([250, 275, 300, 350, 400])
y_A9_1 = np.array([2.1, 3.0, 4.7, 13.4, 40.8])
y_A9_2 = np.array([5.4, 9.68, 16.1, 31.04, 42.04])

x_A10 = np.array([250, 275, 300, 350, 400])
y_A10_1 = np.array([0.3, 1.0, 1.7, 9.0, 28.6])
y_A10_2 = np.array([2.19, 1.65, 2.17, 3.3, 10.29])

x_A11 = np.array([250, 275, 300, 350, 400])
y_A11_1 = np.array([0.2, 0.5, 1.6, 8.2, 32.6])
y_A11_2 = np.array([0.1, 1, 1.82, 4.35, 7.93])

x_A12 = np.array([250, 275, 300, 350, 400])
y_A12_1 = np.array([1.4, 3.5, 6.9, 19.9, 44.5])
y_A12_2 = np.array([6.17, 8.11, 11.22, 22.26, 36.3])

x_A13 = np.array([250, 275, 300, 350, 400])
y_A13_1 = np.array([1.3, 2.3, 4.1, 14.6, 40.0])
y_A13_2 = np.array([5.19, 7.62, 12.74, 23.46, 27.91])

x_A14 = np.array([250, 275, 300, 350, 400])
y_A14_1 = np.array([2.5, 5.3, 10.2, 24.0, 53.6])
y_A14_2 = np.array([1.89, 2.55, 3.61, 10.83, 22.3])

x_B1 = np.array([250, 275, 300, 350, 400])
y_B1_1 = np.array([1.4, 3.4, 6.7, 19.3, 43.6])
y_B1_2 = np.array([6.32, 8.25, 12.28, 25.97, 41.08])

x_B2 = np.array([250, 275, 300, 350, 400])
y_B2_1 = np.array([2.8, 4.4, 6.2, 16.2, 45.1])
y_B2_2 = np.array([3.26, 4.97, 9.32, 22.88, 38.7])

x_B3 = np.array([250, 275, 300, 325, 350, 400])
y_B3_1 = np.array([0.4, 0.6, 1.1, 3.3, 6.0, 21.1])
y_B3_2 = np.array([2.85, 5.35, 7.61, 7.74, 13.81, 21.21])

x_B4 = np.array([250, 275, 300, 325, 350, 400])
y_B4_1 = np.array([0.5, 1.1, 3.0, 6.1, 9.6, 33.5])
y_B4_2 = np.array([6.62, 6.62, 5.05, 8.33, 13.1, 21.45])

x_B5 = np.array([250, 275, 300, 325, 350, 400])
y_B5_1 = np.array([2.1, 3.8, 5.8, 9.8, 15.9, 45.0])
y_B5_2 = np.array([4.3, 5.06, 7.92, 11.69, 15.34, 25.83])

x_B6 = np.array([250, 275, 300, 325, 350, 400])
y_B6_1 = np.array([2.8, 7.5, 12.6, 15.9, 27.0, 63.2])
y_B6_2 = np.array([4.5, 4.79, 8.77, 16.06, 22.41, 30.48])

x_B7 = np.array([250, 275, 300, 325, 350, 400])
y_B7_1 = np.array([4.4, 7.9, 11.7, 17.8, 30.2, 69.4])
y_B7_2 = np.array([4.08, 6.62, 12.86, 18.45, 25.05, 38.17])

X_list = [x_A1, x_A2, x_A3, x_A4, x_A5, x_A6, x_A7, x_A8, x_A9, x_A10, x_A11, x_A12, x_A13, x_A14]
X_list_ = [x_B1, x_B2, x_B3, x_B4, x_B5, x_B6, x_B7]

Y_list = [y_A1_1, y_A2_1, y_A3_1, y_A4_1, y_A5_1, y_A6_1, y_A7_1, y_A8_1, y_A9_1, y_A10_1, y_A11_1, y_A12_1, y_A13_1,
          y_A14_1]
Y_list_ = [y_A1_2, y_A2_2, y_A3_2, y_A4_2, y_A5_2, y_A6_2, y_A7_2, y_A8_2, y_A9_2, y_A10_2, y_A11_2, y_A12_2, y_A13_2,
           y_A14_2]
Y_list__ = [y_B1_1, y_B2_1, y_B3_1, y_B4_1, y_B5_1, y_B6_1, y_B7_1]
Y_list___ = [y_B1_2, y_B2_2, y_B3_2, y_B4_2, y_B5_2, y_B6_2, y_B7_2]

label_list = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14"]
label_list_ = ["B1", "B2", "B3", "B4", "B5", "B6", "B7"]

title_list = ["200mg 1wt%Co/SiO2- 200mg HAP-乙醇浓度1.68ml/min",
              "200mg 2wt%Co/SiO2- 200mg HAP-乙醇浓度1.68ml/min",
              "200mg 1wt%Co/SiO2- 200mg HAP-乙醇浓度0.9ml/min",
              "200mg 0.5wt%Co/SiO2- 200mg HAP-乙醇浓度1.68ml/min",
              "200mg 2wt%Co/SiO2- 200mg HAP-乙醇浓度0.3ml/min",
              "200mg 5wt%Co/SiO2- 200mg HAP-乙醇浓度1.68ml/min",
              "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度0.3ml/min",
              "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度0.9ml/min",
              "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度2.1ml/min",
              "50mg 5wt%Co/SiO2- 50mg HAP-乙醇浓度2.1ml/min",
              "50mg 1wt%Co/SiO2+ 90mg石英砂-乙醇浓度1.68ml/min，无HAP",
              "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度1.68ml/min",
              "67mg 1wt%Co/SiO2- 33mg HAP-乙醇浓度1.68ml/min",
              "33mg 1wt%Co/SiO2- 67mg HAP-乙醇浓度1.68ml/min"
              ]

title_list_ = [
    "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度1.68ml/min",
    "100mg 1wt%Co/SiO2- 100mg HAP-乙醇浓度1.68ml/min",
    "10mg 1wt%Co/SiO2- 10mg HAP-乙醇浓度1.68ml/min",
    "25mg 1wt%Co/SiO2- 25mg HAP-乙醇浓度1.68ml/min",
    "50mg 1wt%Co/SiO2- 50mg HAP-乙醇浓度2.1ml/min",
    "75mg 1wt%Co/SiO2- 75mg HAP-乙醇浓度1.68ml/min",
    "100mg 1wt%Co/SiO2- 100mg HAP-乙醇浓度0.9ml/min"
]
y_label = ["乙醇转化率变化", "C4烯烃选择性变化"]

func_Ls1(X_list, Y_list, Y_list_, label_list, y_label, title_list)
func_Ls2(X_list_, Y_list__, Y_list___, label_list_, y_label, title_list_)

```

