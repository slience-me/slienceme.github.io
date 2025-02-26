# ElasticSearch

## 1. 安装

见 [我的博客(基于docker)](https://blog.slienceme.cn/2025/02/22/Docker/)

## 2. 初步检索

### 2.1 _cat

```bash
GET /_cat/nodes: 查看所有节点信息
GET /_cat/health: 查看es健康状况
GET /_cat/master: 查看主节点
GET /_cat/indices: 查看所有索引 相当于 show databases;
```

**注意：在Kibana里面, 应该删除我的全部代码里面的空行**


```
PUT customer/external/1  (这里不应该有空行, 由于md代码块json格式问题,我加了空行)
{
   "name" : "slience_me"  // 另外不要在这里面写注释(如果有需要删除)
}
```


### 2.2 索引一个文档（保存）

保存一个数据，保存在哪个索引的哪个类型下，指定用那个唯一标识 PUT customer/external/1; 在customer索引下的external类型下保存1号数据为

**PUT带ID的请求**

```text
# PUT /索引名称/类型名称/文档id
# PUT带ID的请求, 第一次created第二次updated. 
# _version会递增

PUT customer/external/1

# 请求体
{
   "name" : "slience_me"
}

// 返回结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

**POST请求**

```text
# POST /索引名称/类型名称
# 每次产生不同的_id, 每次都是新增操作

PUT customer/external/

# 请求体
{
   "name" : "slience_me"
}

// 返回结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "orSiMJUBQDaJZs9shqQ4",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

**情景总结：**

- 新增：不带ID/带ID但之前没有数据
- 修改：带ID,之前有数据

### 2.3 查看文档

```text
# GET /索引名称/类型名称/文档id
GET customer/external/1

# 返回结果
{
    "_index": "customer",//在哪个索引
    "_type": "external",//在哪个类型
    "_id": "1",//记录id
    "_version": 2,//版本号
    "_seq_no": 1,//并发控制字段，每次更新都会+1，用来做乐观锁
    "_primary_term": 1,//同上，主分片重新分配，如重启，就会变化
    "found": true,
    "_source": {
        "name": "slience_me"
    }
}
```

#### 并发案例

> 需求：将name更新为1

**请求1**

```text
# 先进行读取
GET customer/external/1

{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 2,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "name": "slience_me"
    }
}
# 得到 _seq_no=1&_primary_term=1
```

```text
# 准备修改请求
PUT customer/external/1?if_seq_no=1&if_primary_term=1

{
    "name": "1"
}

// 结果(先完成PUT)
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 5,
    "_primary_term": 1
}
```

**请求2**

```text
# 先进行读取
GET /customer/external/1

{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 2,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "name": "slience_me"
    }
}
# 得到 _seq_no=1&_primary_term=1
```

```text
# 准备修改请求
PUT customer/external/1?if_seq_no=1&if_primary_term=1

{
    "name": "2"
}

// 结果(后完成PUT)
{
    "error": {
        "root_cause": [
            {
                "type": "version_conflict_engine_exception",
                "reason": "[1]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [5] and primary term [1]",
                "index_uuid": "FTPilr1qTP6Aw8yri6AakQ",
                "shard": "0",
                "index": "customer"
            }
        ],
        "type": "version_conflict_engine_exception",
        "reason": "[1]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [5] and primary term [1]",
        "index_uuid": "FTPilr1qTP6Aw8yri6AakQ",
        "shard": "0",
        "index": "customer"
    },
    "status": 409
}
# 因此必须重新GET请求获取_seq_no=?&_primary_term=?
# 重新发送PUT请求
# 只有请求前后_seq_no=?&_primary_term=?值保持一致,才能完成PUT请求
```

### 2.4 更新文档

#### （1）带_update

**POST更新文档，带有_update**

```text
# 首次请求
POST customer/external/1/_update

{
    "doc": {
        "name": "2"
    }
}

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 4,
    "result": "updated",    # 更新成功
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 6,
    "_primary_term": 1
}
```

如果再次执行更新，则不执行任何操作，序列号也不发生变化

```text
# 再次请求
POST customer/external/1/_update

{
    "doc": {
        "name": "2"
    }
}

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 4,
    "result": "noop",  # no operation, 不做任何操作
    "_shards": {
        "total": 0,
        "successful": 0,
        "failed": 0
    },
    "_seq_no": 6,
    "_primary_term": 1
}
```

总结：POST更新方式，会对比原来的数据，和原来的相同，则不执行任何操作（version和_seq_no）都不变。

#### （2）不带_update

**POST更新文档，不带_update**

如果再次执行更新，则再次执行更新操作，序列号也发生变化

```text
# 首次再次请求
POST customer/external/1/

{
    "doc": {
        "name": "2"
    }
}

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 14, # 版本号增加
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 16, # 序列号增加
    "_primary_term": 1
}
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 15, # 版本号增加
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 17, # 序列号增加
    "_primary_term": 1
}
```

总结：在更新过程中，重复执行更新操作，数据也能够更新成功，不会和原来的数据进行对比。

#### （3）更新同时增加属性

```text
PUT customer/external/1/

{
    "name": "2",
    "age": 18
}

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 16,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 18,
    "_primary_term": 1
}
```

```text
# 首次再次请求
POST customer/external/1/

{
    "doc": {
        "name": "2",
        "age": 18
    }
}

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 17,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 19,
    "_primary_term": 1
}
```

总结：PUT和POST不带_update都可以

### 2.5 删除文档&索引

> elasticsearch并没有提供删除类型的操作，只提供了删除索引和文档的操作。

实例：删除id=1的数据，删除后继续查询

```text
DELETE customer/external/1/

// 结果
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 18,
    "result": "deleted", # 删除成功
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 20,
    "_primary_term": 1
}
# 再次查询
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "found": false
}
```

实例：删除整个costomer索引数据

```text
DELETE customer/

// 结果
{
    "acknowledged": true
}
// 再次查询
GET customer/external/1/
{
    "error": {
        "root_cause": [
            {
                "type": "index_not_found_exception",
                "reason": "no such index [customer]",
                "resource.type": "index_expression",
                "resource.id": "customer",
                "index_uuid": "_na_",
                "index": "customer"
            }
        ],
        "type": "index_not_found_exception",
        "reason": "no such index [customer]",
        "resource.type": "index_expression",
        "resource.id": "customer",
        "index_uuid": "_na_",
        "index": "customer"
    },
    "status": 404
}
```

### 2.6 bulk批量API

语法格式

```text
POST **/_bulk

{action:{metadata}}
{request body  }

{action:{metadata}}
{request body  }
```

案例：

```text
POST /customer/external/_bulk

{"index":{"_id": "1"}}
{"name": "slience_me_1"}
{"index":{"_id": "2"}}
{"name": "slience_me_2"}

// 结果
{
  "took" : 1241,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "1",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "2",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1,
        "status" : 201
      }
    }
  ]
}
```

复杂的案例：

```text
POST /_bulk

{"delete":{"_index":"website","_type":"blog","_id":"123"}}
{"create":{"_index":"website","_type":"blog","_id":"123"}}
{"title":"my first blog post"}
{"index":{"_index":"website","_type":"blog"}}
{"title":"my second blog post"}
{"update":{"_index":"website","_type":"blog","_id":"123"}}
{"doc":{"title":"my updated blog post"}}

// 结果
{
  "took" : 2623,
  "errors" : false,
  "items" : [
    {
      "delete" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 1,
        "result" : "not_found",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 404
      }
    },
    {
      "create" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 2,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "pbR5MZUBQDaJZs9s06Sm",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 2,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "update" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 3,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 3,
        "_primary_term" : 1,
        "status" : 200
      }
    }
  ]
}

```

### 2.7 样本测试数据

准备了一份顾客银行账户信息的虚构的JSON文档样本。每个文档都有下列的schema（模式）。

```text
{
	"account_number": 1,
	"balance": 39225,
	"firstname": "Amber",
	"lastname": "Duke",
	"age": 32,
	"gender": "M",
	"address": "880 Holmes Lane",
	"employer": "Pyrami",
	"email": "amberduke@pyrami.com",
	"city": "Brogan",
	"state": "IL"
}
```

[数据下载链接](https://github.com/elastic/elasticsearch/blob/7.5/docs/src/test/resources/accounts.json)

```text
POST /bank/account/_bulk

...[JSON data]...
```

## 3. 进阶检索

### 3.1 SearchAPI

ES支持两种基本方式检索；

- 通过REST request uri 发送搜索参数 （uri +检索参数）；
- 通过REST request body 来发送它们（uri+请求体）；

一切检索从_search开始

```
# 一些响应参数的解释
q=*: 查询所有文档
took: Elasticsearch搜索耗时(毫秒)
timed_out: 是否超时
_shards: 分片信息,多少个分片处理了请求，多少成功，多少失败
hits: 检索到的文档,搜索结果
hits.total: 检索到的文档总数,搜索结果
hits.hits: 实际检索到的文档(数组)默认前10的文档
sort: 排序字段(没有则按score排序)
_score: 相关性得分 score和max_score相关性得分和最高得分(全文检索时才有)
:asc 升序排序
```

详细的字段信息，参照： https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-search.html

> The response also provides the following information about the search request:
>
> - `took` – how long it took Elasticsearch to run the query, in milliseconds
> - `timed_out` – whether or not the search request timed out
> - `_shards` – how many shards were searched and a breakdown of how many shards succeeded, failed, or were skipped.
> - `max_score` – the score of the most relevant document found
> - `hits.total.value` - how many matching documents were found
> - `hits.sort` - the document’s sort position (when not sorting by relevance score)
> - `hits._score` - the document’s relevance score (not applicable when using `match_all`)

#### （1）检索信息

##### 请求方式：uri +检索参数

```text
GET bank/_search?q=*&sort=account_number:asc

{
  "took" : 20,  # 耗时
  "timed_out" : false,  # 是否超时
  "_shards" : {  // 分片信息
    "total" : 1,  // 总共分片数
    "successful" : 1,  // 成功处理分片数
    "skipped" : 0,  // 跳过的分片数
    "failed" : 0  // 失败的分片数
  },
  "hits" : {  // 检索到的文档
    "total" : {  // 检索到的文档总数
      "value" : 1000,  // 文档总数
      "relation" : "eq"  // 文档总数关系
    },
    "max_score" : null,  // 相关性得分
    "hits" : [  // 实际检索到的文档(数组)默认前10的文档
      {
        "_index" : "bank",  // 文档索引
        "_type" : "account",  // 文档类型
        "_id" : "0",  // 文档id
        "_score" : null,  // 相关性得分
        "_source" : {
          "account_number" : 0,  // 检索到的文档内容
          "balance" : 16623,
          "firstname" : "Bradshaw",
          "lastname" : "Mckenzie",
          "age" : 29,
          "gender" : "F",
          "address" : "244 Columbus Place",
          "employer" : "Euron",
          "email" : "bradshawmckenzie@euron.com",
          "city" : "Hobucken",
          "state" : "CO"
        },
        "sort" : [
          0
        ]
      },
      {},{},{},{},{},{},{},{},{},{}....... 
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "9",
        "_score" : null,
        "_source" : {
          "account_number" : 9,
          "balance" : 24776,
          "firstname" : "Opal",
          "lastname" : "Meadows",
          "age" : 39,
          "gender" : "M",
          "address" : "963 Neptune Avenue",
          "employer" : "Cedward",
          "email" : "opalmeadows@cedward.com",
          "city" : "Olney",
          "state" : "OH"
        },
        "sort" : [
          9
        ]
      }
    ]
  }
}

```

##### 请求方式：uri+请求体

```text
GET /bank/_search

# 参数解释样例
{
  "query": { "match_all": {} },  // 查询所有(注释记得删除)
  "sort": [  # 排序
    { "account_number": "asc" },  // 按照account_number升序排序(注释记得删除)
    {"balance":"desc"}  // 按照balance降序排序(注释记得删除)
  ],
  "from": 20,  // 从第20条开始(注释记得删除)
  "size": 10  // 每页显示10条(注释记得删除)
}

# 请求体
{
  "query": { "match_all": {} },
  "sort": [  # 排序
    { "account_number": "asc" },
    {"balance":"desc"}
  ],
  "from": 20,
  "size": 10
}

// 结果
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1000,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "20",
        "_score" : null,
        "_source" : {
          "account_number" : 20,
          "balance" : 16418,
          "firstname" : "Elinor",
          "lastname" : "Ratliff",
          "age" : 36,
          "gender" : "M",
          "address" : "282 Kings Place",
          "employer" : "Scentric",
          "email" : "elinorratliff@scentric.com",
          "city" : "Ribera",
          "state" : "WA"
        },
        "sort" : [
          20,
          16418
        ]
      },
      {},{},{},{},{},{},{},{},{},{},{},........
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "29",
        "_score" : null,
        "_source" : {
          "account_number" : 29,
          "balance" : 27323,
          "firstname" : "Leah",
          "lastname" : "Santiago",
          "age" : 33,
          "gender" : "M",
          "address" : "193 Schenck Avenue",
          "employer" : "Isologix",
          "email" : "leahsantiago@isologix.com",
          "city" : "Gerton",
          "state" : "ND"
        },
        "sort" : [
          29,
          27323
        ]
      }
    ]
  }
}
```

### 3.2 Query DSL

#### （1）基本语法

Elasticsearch提供了一个可以执行查询的Json风格的DSL。这个被称为Query DSL，该查询语言非常全面。

一个查询语句的典型结构

```text
GET bank/_search

QUERY_NAME:{
   ARGUMENT:VALUE,
   ARGUMENT:VALUE,...
}
```

如果针对于某个字段，那么它的结构如下：

```text
GET bank/_search

{
  QUERY_NAME:{
     FIELD_NAME:{
       ARGUMENT:VALUE,
       ARGUMENT:VALUE,...
      }   
   }
}
```

```text
GET bank/_search

{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 5,
  "sort": [
    {
      "account_number": {
        "order": "desc"
      }
    }
  ]
}
```

query定义如何查询；

- match_all查询类型【代表查询所有的所有】，es中可以在query中组合非常多的查询类型完成复杂查询；
- 除了query参数之外，我们可也传递其他的参数以改变查询结果，如sort，size；
- from+size限定，完成分页功能；
- sort排序，多字段排序，会在前序字段相等时后续字段内部排序，否则以前序为准；

#### （2）返回部分字段

_source: 指定返回结果包含的字段

```text
GET bank/_search

{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 5,
  "sort": [
    {
      "account_number": {
        "order": "desc"
      }
    }
  ],
  "_source": ["balance","firstname"]  // 指定返回结果包含的字段(注释记得删除)
  
}
```

#### （3）match匹配查询

##### 精确(非字符串)

基本类型（非字符串），精确控制

```text
GET bank/_search

{
  "query": {
    "match": {
      "account_number": "20"
    }
  }
}

// 结果
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,  // 匹配度
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "20",
        "_score" : 1.0,  // 匹配度
        "_source" : {
          "account_number" : 20,  // 匹配的字段
          "balance" : 16418,
          "firstname" : "Elinor",
          "lastname" : "Ratliff",
          "age" : 36,
          "gender" : "M",
          "address" : "282 Kings Place",
          "employer" : "Scentric",
          "email" : "elinorratliff@scentric.com",
          "city" : "Ribera",
          "state" : "WA"
        }
      }
    ]
  }
}
```

##### 模糊(字符串) 全文检索

全文检索，最终会按照评分进行排序，会对检索条件进行分词匹配。

```text
GET bank/_search

{
  "query": {
    "match": {
      "address": "kings"
    }
  }
}

// 结果
{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 5.9908285,  // 匹配度
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "20",
        "_score" : 5.9908285,  // 匹配度
        "_source" : {
          "account_number" : 20,
          "balance" : 16418,
          "firstname" : "Elinor",
          "lastname" : "Ratliff",
          "age" : 36,
          "gender" : "M",
          "address" : "282 Kings Place",  // 匹配
          "employer" : "Scentric",
          "email" : "elinorratliff@scentric.com",
          "city" : "Ribera",
          "state" : "WA"
        }
      },
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "722",
        "_score" : 5.9908285,  // 匹配度
        "_source" : {
          "account_number" : 722,
          "balance" : 27256,
          "firstname" : "Roberts",
          "lastname" : "Beasley",
          "age" : 34,
          "gender" : "F",
          "address" : "305 Kings Hwy",  // 匹配
          "employer" : "Quintity",
          "email" : "robertsbeasley@quintity.com",
          "city" : "Hayden",
          "state" : "PA"
        }
      }
    ]
  }
}

```

#### （4）match_phrase[短句匹配]

将需要匹配的值当成一整个单词（不分词）进行检索

```text
GET bank/_search

{
  "query": {
    "match_phrase": {
      "address": "mill road"
    }
  }
}

// 返回结果
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 8.926605,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 8.926605,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",  // 匹配
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      }
    ]
  }
}
```

#### （5）multi_math[多字段匹配]

例如：state或者address中包含mill，并且在查询过程中，会对于查询条件进行分词。

```text
GET bank/_search

{
  "query": {
    "multi_match": {
      "query": "mill",
      "fields": [
        "state",
        "address"
      ]
    }
  }
}

// 结果
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : 5.4032025,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 5.4032025,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",  // 查询结果
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"  // 查询结果
        }
      },
      {},{},{},....
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "472",
        "_score" : 5.4032025,
        "_source" : {
          "account_number" : 472,
          "balance" : 25571,
          "firstname" : "Lee",
          "lastname" : "Long",
          "age" : 32,
          "gender" : "F",
          "address" : "288 Mill Street",  // 查询结果
          "employer" : "Comverges",
          "email" : "leelong@comverges.com",
          "city" : "Movico",
          "state" : "MT"  // 查询结果
        }
      }
    ]
  }
}

```

#### （6）bool用来做符合查询

复合语句可以合并，任何其他查询语句，包括符合语句。这也就意味着，复合语句之间 可以互相嵌套，可以表达非常复杂的逻辑。

- must：必须达到must所列举的所有条件
- must_not：必须不满足must_not所列举的所有条件
- should：应该满足should所列举的条件，如果满足，则得分更高
- filter：必须满足filter所列举的条件，但是不计算得分
- boost：提升查询条件的重要程度
- minimum_should_match：should条件的最小满足数量
- boost_mode：boost的运算模式，有multiply和replace两种
- disable_coord：是否禁用协调因子
- boosting：正负boost，用于调整正负样本的权重
- adjust_pure_negative：是否调整负样本的得分
- name：查询的名称
- _ignored：忽略的参数
- _name：查询的名称

must样例

```text
GET bank/_search

{
   "query":{
        "bool":{
             "must":[
              {"match":{"address":"mill"}},
              {"match":{"gender":"F"}}
             ]
         }
    }
}

// 查询结果
{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 6.1104345,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "472",
        "_score" : 6.1104345,
        "_source" : {
          "account_number" : 472,
          "balance" : 25571,
          "firstname" : "Lee",
          "lastname" : "Long",
          "age" : 32,
          "gender" : "F",
          "address" : "288 Mill Street",
          "employer" : "Comverges",
          "email" : "leelong@comverges.com",
          "city" : "Movico",
          "state" : "MT"
        }
      }
    ]
  }
}

```

must not样例

```text
GET bank/_search

{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "gender": "M"
          }
        },
        {
          "match": {
            "address": "mill"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "age": "38"
          }
        }
      ]
    }
  }
}

// 结果
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 6.0824604,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 6.0824604,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      }
    ]
  }
}
```

should样例

```text
GET bank/_search

{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "gender": "M"
          }
        },
        {
          "match": {
            "address": "mill"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "age": "18"
          }
        }
      ],
      "should": [
        {
          "match": {
            "lastname": "Wallace"
          }
        }
      ]
    }
  }
}

// 结果
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 12.585751,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 12.585751,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      },
      {},...
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "345",
        "_score" : 6.0824604,
        "_source" : {
          "account_number" : 345,
          "balance" : 9812,
          "firstname" : "Parker",
          "lastname" : "Hines",
          "age" : 38,
          "gender" : "M",
          "address" : "715 Mill Avenue",
          "employer" : "Baluba",
          "email" : "parkerhines@baluba.com",
          "city" : "Blackgum",
          "state" : "KY"
        }
      }
    ]
  }
}
```

#### （7）filter[结果过滤]

并非所有查询都需要产生分数，特别是哪些仅用于filtering过滤的文档。为了不计算分数，elasticsearch会自动检查场景并且优化查询的执行。

```text
GET bank/_search

{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "address": "mill"
          }
        }
      ],
      "filter": {
        "range": {
          "balance": {
            "gte": "10000",
            "lte": "20000"
          }
        }
      }
    }
  }
}

// 结果
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 5.4032025,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "970",
        "_score" : 5.4032025,
        "_source" : {
          "account_number" : 970,
          "balance" : 19648,
          "firstname" : "Forbes",
          "lastname" : "Wallace",
          "age" : 28,
          "gender" : "M",
          "address" : "990 Mill Road",
          "employer" : "Pheast",
          "email" : "forbeswallace@pheast.com",
          "city" : "Lopezo",
          "state" : "AK"
        }
      }
    ]
  }
}
```

> - 在boolean查询中,must,should和must_not元素都被称为查询子句.
> - 文档是否符合每个“must”或“should”子句中的标准,决定了文档的“相关性得分”.
> - 得分越高,文档越符合您的搜索条件.
> - 默认情况下,Elasticsearch返回根据这些相关性得分排序的文档。

> - “must_not”子句中的条件被视为“过滤器”.
> - 它影响文档是否包含在结果中.但不影响文档的评分方式.
> - 还可以显式地指定任意过滤器来包含或排除基于结构化数据的文档。

#### （8）term

> 和match一样。匹配某个属性的值。`全文检索`字段用`match`，其他`非text字段`匹配用`term`。
> 
> 避免对文本字段使用“term”查询
> 
> 默认情况下，Elasticsearch作为analysis的一部分更改'text'字段的值。这使得为“text”字段值寻找精确匹配变得困难。
> 
> 要搜索“text”字段值，请使用匹配。
> https://www.elastic.co/guide/en/elasticsearch/reference/7.6/query-dsl-term-query.html

- 精确值的查询建议使用term
- 对于字符串模糊查询

使用term匹配查询  精确查询

```text
GET bank/_search

{
  "query": {
    "term": {
      "age": "28"
    }
  }
}

// 结果
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 51,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "13",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 13,
          "balance" : 32838,
          "firstname" : "Nanette",
          "lastname" : "Bates",
          "age" : 28,
          "gender" : "F",
          "address" : "789 Madison Street",
          "employer" : "Quility",
          "email" : "nanettebates@quility.com",
          "city" : "Nogal",
          "state" : "VA"
        }
      },
      {},{},{},{},{},{},.......
      {
        "_index" : "bank",
        "_type" : "account",
        "_id" : "758",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 758,
          "balance" : 15739,
          "firstname" : "Berta",
          "lastname" : "Short",
          "age" : 28,
          "gender" : "M",
          "address" : "149 Surf Avenue",
          "employer" : "Ozean",
          "email" : "bertashort@ozean.com",
          "city" : "Odessa",
          "state" : "UT"
        }
      }
    ]
  }
}
```

>Avoid using the term query for text fields.

> By default, Elasticsearch changes the values of text fields as part of analysis.
This can make finding exact matches for text field values difficult.

> To search text field values, use the match query instead.

使用term匹配查询 字符串查询

```text
GET bank/_search

{
  "query": {
    "term": {
      "address": "mill Road"
    }
  }
}

// 结果
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}
```

match匹配

```text
GET bank/_search

{
  "query": {
    "match": {
      "address": "990 Mill Road"
    }
  }
```

短语匹配

```text
GET bank/_search

{
  "query": {
    "match_phrase": {
      "address": "990 Mill Road"
    }
  }
}
```

使用keyword 进行精确匹配

```text
GET bank/_search

{
  "query": {
    "match": {
      "address.keyword": "990 Mill Road"
    }
  }
}
```

总结：`全文检索`字段用`match`，其他`非text字段匹配`用`term`

#### （9）Aggregation(执行聚合)
聚合提供了从数据中分组和提取数据的能力。最简单的聚合方法大致等于SQL Group by和SQL聚合函数。在elasticsearch中，执行搜索返回this（命中结果），并且同时返回聚合结果，把以响应中的所有hits（命中结果）分隔开的能力。这是非常强大且有效的，你可以执行查询和多个聚合，并且在一次使用中得到各自的（任何一个的）返回结果，使用一次简洁和简化的API啦避免网络往返。

"size":0 // 不显示搜索数据

aggs：执行聚合。聚合语法如下：

- avg: 平均数
- min: 最小值
- max: 最大值
- sum: 求和
- count: 计数
- terms: 按照某个字段的值进行分组
- range: 按照某个字段的值进行范围分组
- histogram: 按照某个字段的值进行柱状图分组
- date_histogram: 按照日期字段进行柱状图分组
- date_range: 按照日期字段进行范围分组
- top_hits: 获取聚合结果中的前N条数据
- sub_aggs: 子聚合
- filter: 过滤器
- missing: 缺失值
- percentiles: 百分位数
- stats: 统计
- extended_stats: 扩展统计
- geo_distance: 地理距离
- geo_bounds: 地理边界
- sampler: 样本
- composite: 复合
- bucket_script: 桶脚本
- bucket_sort: 桶排序
- bucket_selector: 桶选择器

```
"aggs":{
    "aggs_name这次聚合的名字，方便展示在结果集中":{
        "AGG_TYPE聚合的类型(avg,term,terms)":{}
     }
}，
```

搜索address中包含mill的所有人的年龄分布以及平均年龄，但不显示这些人的详情

```text
GET bank/_search

{
  "query": {
    "match": {
      "address": "Mill"
    }
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 10
      }
    },
    "ageAvg": {
      "avg": {
        "field": "age"
      }
    },
    "balanceAvg": {
      "avg": {
        "field": "balance"
      }
    }
  },
  "size": 0 // 不显示搜索数据
}

// 结果
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "ageAgg" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : 38,
          "doc_count" : 2
        },
        {
          "key" : 28,
          "doc_count" : 1
        },
        {
          "key" : 32,
          "doc_count" : 1
        }
      ]
    },
    "ageAvg" : {
      "value" : 34.0
    },
    "balanceAvg" : {
      "value" : 25208.0
    }
  }
}
```

复杂： 按照年龄聚合，并且求这些年龄段的这些人的平均薪资

```text
GET bank/_search

{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 100
      },
      "aggs": {
        "ageAvg": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  },
  "size": 0
}

// 结果
{
  "took" : 14,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1000,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "ageAgg" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : 31,
          "doc_count" : 61,
          "ageAvg" : {
            "value" : 28312.918032786885
          }
        },
        {},{},......
        {
          "key" : 29,
          "doc_count" : 35,
          "ageAvg" : {
            "value" : 29483.14285714286
          }
        }
      ]
    }
  }
}
```

查出所有年龄分布，并且这些年龄段中M的平均薪资和F的平均薪资以及这个年龄段的总体平均薪资

```text
GET bank/_search

{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 100
      },
      "aggs": {
        "genderAgg": {
          "terms": {
            "field": "gender.keyword"
          },
          "aggs": {
            "balanceAvg": {
              "avg": {
                "field": "balance"
              }
            }
          }
        },
        "ageBalanceAvg": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  },
  "size": 0
}

// 返回结果
{
  "took" : 23,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1000,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "ageAgg" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : 31,
          "doc_count" : 61,
          "genderAgg" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "M",
                "doc_count" : 35,
                "balanceAvg" : {
                  "value" : 29565.628571428573
                }
              },
              {
                "key" : "F",
                "doc_count" : 26,
                "balanceAvg" : {
                  "value" : 26626.576923076922
                }
              }
            ]
          },
          "ageBalanceAvg" : {
            "value" : 28312.918032786885
          }
        },
        {},{},{},{},......
        {
          "key" : 29,
          "doc_count" : 35,
          "genderAgg" : {
            "doc_count_error_upper_bound" : 0,
            "sum_other_doc_count" : 0,
            "buckets" : [
              {
                "key" : "M",
                "doc_count" : 23,
                "balanceAvg" : {
                  "value" : 29943.17391304348
                }
              },
              {
                "key" : "F",
                "doc_count" : 12,
                "balanceAvg" : {
                  "value" : 28601.416666666668
                }
              }
            ]
          },
          "ageBalanceAvg" : {
            "value" : 29483.14285714286
          }
        }
      ]
    }
  }
}
```

### 3.3 Mapping

#### （1）字段类型

[文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping.html)

核心类型

- 字符串(string): text、keyword
- 数值类型(Numeric): long、integer、short、double、float、half_float、scaled_float
- 日期类型(Date): date
- 布尔类型(Boolean): boolean
- 二进制类型(binary): binary
- 范围类型(Date): integer_range、float_range、long_range、double_range、date_range

复合类型
- 数组类型(Array): Array 支持不针对特定的类型
- 对象类型(Object): object 用于单JSON对象
- 嵌套类型(Nested): nested 用于JSON对象数组

地理类型(Geo)
- 地理坐标(Geo-points): geo_point 用于描述 经纬度坐标
- 地理图形(Geo-Shape): geo_shape 用于描述复杂形状、如多边形

特定类型
- IP类型: ip 用于描述IPv4和IPv6
- 补全类型(Completion): completion 提供自动补全功能
- 令牌计数类型(Token count): token_count 用于统计做分词后的词项个数
- 附件类型(attachment): 参考 mapper-attachment插件 支持将附件如MS Office格式，Open Document格式，ePub，HTML等等索引为attachment数据类型
- 抽取类型(extract): extract 提取指定字段中的文本内容
- ...

#### （2）映射

Mapping(映射) Maping是用来定义一个文档（document），以及它所包含的属性（field）是如何存储和索引的。比如：使用maping来定义：

- 哪些字符串属性应该被看做全文本属性（full text fields）；
- 哪些属性包含数字，日期或地理位置；
- 文档中的所有属性是否都嫩被索引（all 配置）；
- 日期的格式；
- 自定义映射规则来执行动态添加属性；
- 查看mapping信息 GET bank/_mapping

```text
GET bank/_mapping

// 返回
{
  "bank" : {
    "mappings" : {
      "properties" : {
        "account_number" : {
          "type" : "long"
        },
        "address" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "age" : {
          "type" : "long"
        },
        "balance" : {
          "type" : "long"
        },
        "city" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "email" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "employer" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "firstname" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "gender" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "lastname" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "state" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    }
  }
}
```

#### （3）新版本改变

ElasticSearch7-去掉type概念

1. 关系型数据库中两个数据表示是独立的，即使他们里面有相同名称的列也不影响使用，但ES中不是这样的。elasticsearch是基于Lucene开发的搜索引擎，而ES中不同type下名称相同的filed最终在Lucene中的处理方式是一样的。

   - 两个不同type下的两个user_name，在ES同一个索引下其实被认为是同一个filed，你必须在两个不同的type中定义相同的filed映射。否则，不同type中的相同字段名称就会在处理中出现冲突的情况，导致Lucene处理效率下降。
   - 去掉type就是为了提高ES处理数据的效率。

2. Elasticsearch 7.x URL中的type参数为可选。比如，索引一个文档不再要求提供文档类型。

3. Elasticsearch 8.x 不再支持URL中的type参数。

4. 解决： 将索引从多类型迁移到单类型，每种类型文档一个独立索引

   将已存在的索引下的类型数据，全部迁移到指定位置即可。详见数据迁移

> **Elasticsearch 7.x**
>
> - Specifying types in requests is deprecated. For instance, indexing a document no longer requires a document `type`. The new index APIs are `PUT {index}/_doc/{id}` in case of explicit ids and `POST {index}/_doc` for auto-generated ids. Note that in 7.0, `_doc` is a permanent part of the path, 和 represents the endpoint name rather than the document type.
> - 该 `include_type_name` parameter in the index creation, index template, 和 mapping APIs will default to `false`. Setting the parameter at all will result in a deprecation warning.
> - 该 `_default_` mapping type is removed.
>
> **Elasticsearch 8.x**
>
> - Specifying types in requests is no longer supported.
> - 该 `include_type_name` parameter is removed.

##### 创建映射

创建索引并指定映射

```text
PUT /my_index

{
  "mappings": {
    "properties": {
      "age": {
        "type": "integer"
      },
      "email": {
        "type": "keyword"
      },
      "name": {
        "type": "text"
      }
    }
  }
}

// 结果
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "my_index"
}
```

##### 查看映射

```text
GET /my_index

// 结果
{
  "my_index" : {
    "aliases" : { },
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "integer"
        },
        "email" : {
          "type" : "keyword"
        },
        "name" : {
          "type" : "text"
        }
      }
    },
    "settings" : {
      "index" : {
        "creation_date" : "1740302983112",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "6D6Pyw46SWmZQ4WGAV82BA",
        "version" : {
          "created" : "7040299"
        },
        "provided_name" : "my_index"
      }
    }
  }
}
```

##### 添加新的字段映射

这里的 "index": false，表明新增的字段不能被检索，只是一个冗余字段。

```text
PUT /my_index/_mapping

{
  "properties": {
    "employee-id": {
      "type": "keyword",
      "index": false  // 新增字段不能被检索
    }
  }
}

// 结果
{
  "acknowledged" : true
}
```

##### 更新映射

对于已经存在的字段映射，我们不能更新。更新必须创建新的索引，进行数据迁移。

##### 数据迁移

先创建new_twitter的正确映射。然后使用如下方式进行数据迁移。
```text
POST _reindex [固定写法]

{
  "source":{
      "index":"twitter"
   },
  "dest":{
      "index":"new_twitters"
   }
}
```

将旧索引的type下的数据进行迁移(旧版本)

```text
POST _reindex [固定写法]

{
  "source":{
      "index":"twitter",
      "type":"twitter"
   },
  "dest":{
      "index":"new_twitters"
   }
}
```

更多详情见： https://www.elastic.co/guide/en/elasticsearch/reference/7.6/docs-reindex.html

**案例**

先创建新的

- keyword： 不能被分词，只能被精确匹配
- text： 可以被分词，可以被全文搜索

```text
PUT /newbank

{
  "mappings": {
    "properties": {
      "account_number": {
        "type": "long"
      },
      "address": {
        "type": "text"
      },
      "age": {
        "type": "integer"
      },
      "balance": {
        "type": "long"
      },
      "city": {
        "type": "keyword"  // keyword字段不能被分词
      },
      "email": {
        "type": "keyword"
      },
      "employer": {
        "type": "keyword"
      },
      "firstname": {
        "type": "text"
      },
      "gender": {
        "type": "keyword"
      },
      "lastname": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "state": {
        "type": "keyword"
      }
    }
  }
}
```

然后重设索引

```text
POST _reindex

{
  "source":{
      "index":"bank",
      "type": "account"
   },
  "dest":{
      "index":"newbank"
   }
}

// 结果
{
  "took" : 536,
  "timed_out" : false,
  "total" : 1000,
  "updated" : 0,
  "created" : 1000,
  "deleted" : 0,
  "batches" : 1,
  "version_conflicts" : 0,
  "noops" : 0,
  "retries" : {
    "bulk" : 0,
    "search" : 0
  },
  "throttled_millis" : 0,
  "requests_per_second" : -1.0,
  "throttled_until_millis" : 0,
  "failures" : [ ]
}
```

查询
通过这样的操作, 可以不用type, 老的数据也可以迁移出来

```text
GET /newbank/_search

// 结果
{
  "took" : 489,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1000,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "newbank",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 1,
          "balance" : 39225,
          "firstname" : "Amber",
          "lastname" : "Duke",
          "age" : 32,
          "gender" : "M",
          "address" : "880 Holmes Lane",
          "employer" : "Pyrami",
          "email" : "amberduke@pyrami.com",
          "city" : "Brogan",
          "state" : "IL"
        }
      },
      {},{},......
      {
        "_index" : "newbank",
        "_type" : "_doc",
        "_id" : "49",
        "_score" : 1.0,
        "_source" : {
          "account_number" : 49,
          "balance" : 29104,
          "firstname" : "Fulton",
          "lastname" : "Holt",
          "age" : 23,
          "gender" : "F",
          "address" : "451 Humboldt Street",
          "employer" : "Anocha",
          "email" : "fultonholt@anocha.com",
          "city" : "Sunriver",
          "state" : "RI"
        }
      }
    ]
  }
}
```

### 3.4 分词

一个tokenizer（分词器）接收一个字符流，将之分割为独立的tokens（词元，通常是独立的单词），然后输出tokens流。

> 例如：whitespace tokenizer遇到空白字符时分割文本。它会将文本“Quick brown fox!”分割为[Quick,brown,fox!]。

该tokenizer（分词器）还负责记录各个terms(词条)的顺序或position位置（用于phrase短语和word proximity词近邻查询），以及term（词条）所代表的原始word（单词）的start（起始）和end（结束）的character offsets（字符串偏移量）（用于高亮显示搜索的内容）。

elasticsearch提供了很多内置的分词器，可以用来构建custom analyzers（自定义分词器）。

> 关于分词器： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis.html

```text
POST _analyze

{
  "analyzer": "standard",
  "text": "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
}

// 结果
{
  "tokens" : [
    {
      "token" : "the",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "<ALPHANUM>",
      "position" : 0
    },
    {
      "token" : "2",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "<NUM>",
      "position" : 1
    },
    {
      "token" : "quick",
      "start_offset" : 6,
      "end_offset" : 11,
      "type" : "<ALPHANUM>",
      "position" : 2
    },
    {
      "token" : "brown",
      "start_offset" : 12,
      "end_offset" : 17,
      "type" : "<ALPHANUM>",
      "position" : 3
    },
    {
      "token" : "foxes",
      "start_offset" : 18,
      "end_offset" : 23,
      "type" : "<ALPHANUM>",
      "position" : 4
    },
    {
      "token" : "jumped",
      "start_offset" : 24,
      "end_offset" : 30,
      "type" : "<ALPHANUM>",
      "position" : 5
    },
    {
      "token" : "over",
      "start_offset" : 31,
      "end_offset" : 35,
      "type" : "<ALPHANUM>",
      "position" : 6
    },
    {
      "token" : "the",
      "start_offset" : 36,
      "end_offset" : 39,
      "type" : "<ALPHANUM>",
      "position" : 7
    },
    {
      "token" : "lazy",
      "start_offset" : 40,
      "end_offset" : 44,
      "type" : "<ALPHANUM>",
      "position" : 8
    },
    {
      "token" : "dog's",
      "start_offset" : 45,
      "end_offset" : 50,
      "type" : "<ALPHANUM>",
      "position" : 9
    },
    {
      "token" : "bone",
      "start_offset" : 51,
      "end_offset" : 55,
      "type" : "<ALPHANUM>",
      "position" : 10
    }
  ]
}
```

#### （1）安装ik分词器

所有的语言分词，默认使用的都是“Standard Analyzer”，但是这些分词器针对于中文的分词，并不友好。为此需要安装中文的分词器。

注意：不能用默认elasticsearch-plugin install xxx.zip 进行自动安装 https://github.com/medcl/elasticsearch-analysis-ik/releases/download 对应es版本安装

> Github仓库的旧版本内容已经移除：迁移到 https://release.infinilabs.com/analysis-ik/stable/ 去下载对应的版本

在前面安装的elasticsearch时，我们已经将elasticsearch容器的“/usr/share/elasticsearch/plugins”目录，映射到宿主机的“ /mydata/elasticsearch/plugins”目录下，所以比较方便的做法就是下载“/elasticsearch-analysis-ik-7.6.2.zip”文件，然后解压到该文件夹下即可。安装完毕后，需要重启elasticsearch容器。

##### 查看elasticsearch版本号

```text
{
  "name" : "6bf8d224ae02",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "DZwHe7DhScWoyTMWzK_3Bg",
  "version" : {
    "number" : "7.4.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "2f90bbf7b93631e52bafb59b3b049cb44ec25e96",
    "build_date" : "2019-10-28T20:40:44.881551Z",
    "build_snapshot" : false,
    "lucene_version" : "8.2.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

##### 进入es容器内部plugin目录

[发现系统没有wget: 参考解决方案](https://blog.csdn.net/qq_67177419/article/details/144096396)

```bash
# pwd 当前路径 /usr/share/elasticsearch
# docker exec -it 容器id /bin/bash
docker exec -it elasticsearch /bin/bash 

# 下载 ik分词器 (wget也得安装`yum install wget`)
wget https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-7.4.2.zip

# 解压(unzip也得安装`yum install unzip`) PS:原教程真讨厌没有指定dir,害的我移动了好久
unzip elasticsearch-analysis-ik-7.4.2.zip -d ik

# 删除zip文件
rm -rf elasticsearch-analysis-ik-7.4.2.zip

# 移动
mv ik plugins

# 确认安装
cd bin
elasticsearch-plugin list # 查看插件列表
```

#### （2）测试分词器

使用默认

```text
GET my_index/_analyze

{
   "text":"我是中国人"
}

// 结果
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "<IDEOGRAPHIC>",
      "position" : 0
    },
    {
      "token" : "是",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "<IDEOGRAPHIC>",
      "position" : 1
    },
    {
      "token" : "中",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "<IDEOGRAPHIC>",
      "position" : 2
    },
    {
      "token" : "国",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "<IDEOGRAPHIC>",
      "position" : 3
    },
    {
      "token" : "人",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "<IDEOGRAPHIC>",
      "position" : 4
    }
  ]
}
```

使用ik_smart分词器, 智能分词

```text
GET my_index/_analyze

{
   "analyzer": "ik_smart", 
   "text":"我是中国人"
}

// 结果
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "是",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "中国人",
      "start_offset" : 2,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 2
    }
  ]
}
```

ik_max_word分词器, 获取最大单词组合

```text
GET my_index/_analyze

{
   "analyzer": "ik_max_word", 
   "text":"我是中国人"
}

// 结果
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "是",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "中国人",
      "start_offset" : 2,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 2
    },
    {
      "token" : "中国",
      "start_offset" : 2,
      "end_offset" : 4,
      "type" : "CN_WORD",
      "position" : 3
    },
    {
      "token" : "国人",
      "start_offset" : 3,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 4
    }
  ]
}
```

#### （3）自定义词库

先安装nginx， 见 [我的博客(基于docker)](https://blog.slienceme.cn/2025/02/22/Docker/)

然后在`/home/slienceme/docker/nginx/html/`创建文件夹`es`

创建文件`fenci.txt`, 执行指令`vim fenci.txt`，写入例如如下内容

```
slience_me
尚硅谷
巧碧螺
```

访问`http://ngix所在主机的IP:80/es/fenci.txt`测试是否配置成功

修改`/usr/share/elasticsearch/plugins/ik/config`中的`IKAnalyzer.cfg.xml` ，打开远程拓展的注释，放入nginx配置的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
	<comment>IK Analyzer 扩展配置</comment>
	<!--用户可以在这里配置自己的扩展字典 -->
	<entry key="ext_dict"></entry>
	 <!--用户可以在这里配置自己的扩展停止词字典-->
	<entry key="ext_stopwords"></entry>
	<!--用户可以在这里配置远程扩展字典 -->
	<entry key="remote_ext_dict">http://192.168.50.2/es/fenci.txt</entry> 
	<!--用户可以在这里配置远程扩展停止词字典-->
	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

测试分词效果:

```text
GET my_index/_analyze

{
   "analyzer": "ik_max_word", 
   "text":"slience_me你好巧碧螺"
}

// 返回结果
{
  "tokens" : [
    {
      "token" : "slience_me",
      "start_offset" : 0,
      "end_offset" : 10,
      "type" : "LETTER",
      "position" : 0
    },
    {
      "token" : "slience",
      "start_offset" : 0,
      "end_offset" : 7,
      "type" : "ENGLISH",
      "position" : 1
    },
    {
      "token" : "me",
      "start_offset" : 8,
      "end_offset" : 10,
      "type" : "ENGLISH",
      "position" : 2
    },
    {
      "token" : "你好",
      "start_offset" : 10,
      "end_offset" : 12,
      "type" : "CN_WORD",
      "position" : 3
    },
    {
      "token" : "好巧",
      "start_offset" : 11,
      "end_offset" : 13,
      "type" : "CN_WORD",
      "position" : 4
    },
    {
      "token" : "巧碧螺",
      "start_offset" : 12,
      "end_offset" : 15,
      "type" : "CN_WORD",
      "position" : 5
    }
  ]
}
```

## 4. elasticsearch-Rest-Client

### 4.1 9300:TCP

- spring-data-elasticsearch:transport-api.jar;
  - springboot版本不同，ransport-api.jar不同，不能适配es版本
  - 7.x已经不建议使用，8以后就要废弃

### 4.2 9200:HTTP

- jestClient: 非官方，更新慢；
- RestTemplate：模拟HTTP请求，ES很多操作需要自己封装，麻烦；
- HttpClient：同上；
- Elasticsearch-Rest-Client：官方RestClient，封装了ES操作，API层次分明，上手简单； 最终选择Elasticsearch-Rest-Client（elasticsearch-rest-high-level-client）； https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high.html

::: tip 发布时间:
2025-02-22
:::
