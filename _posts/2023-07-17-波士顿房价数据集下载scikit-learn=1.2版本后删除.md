---
layout: post
title: 机器学习｜波士顿房价数据集下载scikit-learn=1.2版本后删除
categories: [机器学习]
description: 波士顿房价数据集下载 scikit-learn=1.2版本后删除【官方给出方案】
keywords: 机器学习
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

### 描述： 在你下载安装包sklearn后，调用以下包时，发现未找到，这是因为load_boston已经在版本1.2被删除

```py
from sklearn.datasets import load_boston
```
### 解决方案：相对于降低版本的复杂，有另外一种方案

```python
import pandas as pd
import numpy as np
data_url = "http://lib.stat.cmu.edu/datasets/boston"
raw_df = pd.read_csv(data_url, sep="\s+", skiprows=22, header=None)
data = np.hstack([raw_df.values[::2, :], raw_df.values[1::2, :2]])
target = raw_df.values[1::2, 2]
```

## 官方做出的解释
```py
FutureWarning: Function load_boston is deprecated; `load_boston` is deprecated in 1.0 and will be removed in 1.2.
    The Boston housing prices dataset has an ethical problem. You can refer to
    the documentation of this function for further details.
    The scikit-learn maintainers therefore strongly discourage the use of this
    dataset unless the purpose of the code is to study and educate about
    ethical issues in data science and machine learning.
    In this special case, you can fetch the dataset from the original
    source::
        import pandas as pd
        import numpy as np
        data_url = "http://lib.stat.cmu.edu/datasets/boston"
        raw_df = pd.read_csv(data_url, sep="\s+", skiprows=22, header=None)
        data = np.hstack([raw_df.values[::2, :], raw_df.values[1::2, :2]])
        target = raw_df.values[1::2, 2]
    Alternative datasets include the California housing dataset (i.e.
    :func:`~sklearn.datasets.fetch_california_housing`) and the Ames housing
    dataset. You can load the datasets as follows::
        from sklearn.datasets import fetch_california_housing
        housing = fetch_california_housing()
    for the California housing dataset and::
        from sklearn.datasets import fetch_openml
        housing = fetch_openml(name="house_prices", as_frame=True)
    for the Ames housing dataset.
  warnings.warn(msg, category=FutureWarning)

```

```python
FutureWarning: load_boston函数已弃用;' load_boston '在1.0中已弃用，将在1.2中删除。
波士顿房价数据集存在一个道德问题。你可以参考有关此函数的详细信息，请参阅文档。
因此，scikit-learn维护者强烈反对使用这种方法数据集，除非代码的目的是学习和教育数据科学和机器学习中的伦理问题。
```

