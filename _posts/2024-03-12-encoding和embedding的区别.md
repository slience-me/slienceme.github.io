---
layout: post
title: 论文笔记｜encoding和embedding的区别
categories: [论文笔记]
description: encoding和embedding的区别
keywords: 机器学习, 论文笔记
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


![在这里插入图片描述](https://raw.githubusercontent.com/slience-me/picGo/master/images/logo_slienceme3.jpeg)

本文作者： [slience_me](https://slienceme.xyz/)

---
# encoding和embedding的区别

"Embedding" 和 "Encoding" 是两个在计算机科学和机器学习领域中常用的术语，它们虽然有些相似，但指代的概念和用途有所不同。

 ## Embedding
 - 在自然语言处理（NLP）和图像处理等领域中， **Embedding 通常指将高维度的数据映射到低维度的空间中** 。例如，在NLP中，词嵌入（Word Embedding）是将单词映射到低维度的实数向量空间中的技术，其中每个单词都被表示为一个稠密的实数向量。这样的向量表示捕捉了单词之间的语义关系，常用的词嵌入模型包括Word2Vec、GloVe和BERT。
 - 在图像处理中，图像嵌入（Image Embedding）类似于将图像编码为向量形式的表示，使得计算机能够更好地理解图像的内容。通常使用深度学习模型（如卷积神经网络）来学习图像的嵌入。

> 采用Word Embedding，假设我们有一个句子：“猫坐在地毯上”。在词嵌入中，每个单词（如“猫”、“坐”、“地毯”等）都被映射为一个实数向量，以便计算机能够更好地理解这些单词之间的语义关系。 我们可以使用预训练的词嵌入模型（如Word2Vec或GloVe），将每个单词映射为一个低维度的实数向量。例如，“猫”可能被映射为[-0.5, 0.8, -0.3]，“坐”可能被映射为[0.2, -0.6, 0.9]，以此类推。
> 词嵌入（Word Embedding）主要关注于将单词映射到连续的实数向量空间中，以捕捉单词之间的语义关系。


## Encoding
   - 编码是将数据转换为特定格式或形式的过程。 **编码可以是将原始数据转换为适合存储或传输的形式，也可以是将数据转换为表示的形式，以便进一步处理。** 在计算机编程中，编码通常指将数据转换为比特流的过程，比如将字符转换为ASCII码或UTF-8编码。
  
   - 在机器学习领域中，编码也可以指将输入数据转换为机器学习模型可以处理的格式的过程。例如，将分类变量转换为数字形式的过程称为编码（如独热编码）。

> 采用One-Hot Encoding，例如，对于句子“猫坐在地毯上”，如果我们有一个词汇表包含["猫", "坐", "地毯", "上"]，那么“猫”可能被编码为[1, 0, 0, 0]，“坐”可能被编码为[0, 1, 0, 0]，以此类推。
> One-Hot Encoding 则是将单词编码为稀疏的二进制向量，以便计算机能够处理。

## 总结


总的来说，Embedding 更多地关注于将数据映射到低维度空间以捕捉其语义信息，而 Encoding 则更多地关注于将数据转换为特定格式或表示的过程。在某些情况下，两者的概念可能会有所重叠，但它们通常在不同的上下文中使用。
