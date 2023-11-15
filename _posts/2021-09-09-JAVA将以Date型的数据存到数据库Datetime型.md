---
layout: post
title: Java｜JAVA中如何将以Date型的数据保存到数据库以Datetime型的字段中
categories: [Java]
description: JAVA中如何将以Date型的数据保存到数据库以Datetime型的字段中
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---


用Timestamp就行了

recordOuttime是Date类型

```java
import java.sql.Timestamp;
Record record = recordMapper.selectByPrimaryKey(recordId);
Date recordIntime = record.getRecordIntime();
Date dNow = new Date();
Timestamp recordOuttime = new Timestamp(dNow.getTime());
record.setRecordOuttime(recordOuttime);
```

