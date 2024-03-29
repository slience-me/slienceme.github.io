---
layout: post
title: Python｜python文件流使txt文件内容替换
categories: [Python]
description: python文件流使txt文件内容替换
keywords: 编程语言, Python 
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# python文件流使txt文件内容替换

### 方法

```python

file_old = open(fileoldpath, 'r', encoding='utf-8')
file_new = open(filenewpath, 'w', encoding='utf-8')
# 循环读取旧文件
iname = 0 
for line in file_old:
    # 进行判断
    print(line)
    if str(imagefile[iname]) in line:
        line = line.replace(str(imagefile[iname]), str(imagename[iname]))
    print(line)
    file_new.write(line)
    iname += 1
file_old.close()
file_new.close()
```
### 解释：
- iname是索引使得内容一一对应替换
- imagefile，imagename是两个List数组
- 使得imagefile中的内容一一被imagename中的替换
