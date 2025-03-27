# Curl相关指令

`curl` 是一个强大的命令行工具，用于与服务器进行数据传输，支持多种协议（如 HTTP、HTTPS、FTP 等）。`curl` 常用于进行 API
调试、文件下载、上传等操作。以下是一些常见的 `curl` 使用方法和示例。

## 1. 常见指令

### 1.1 基础用法

```bash
# 简单GET请求(获取http://example.com 页面内容)
curl http://example.com

# 只显示响应头
curl -I http://example.com

# 获取HTTP状态码(只显示HTTP状态码)
curl -o /dev/null -s -w "%{http_code}" http://example.com  # 

# 获取HTTPS页面(页面内容)
curl https://example.com
```

### 1.2 文件操作

```bash
# 下载并保存为filename.txt
curl -o filename.txt http://example.com/file.txt

# 使用大写 -O 参数下载并保留原文件名
curl -O http://example.com/file.zip

# 下载并显示进度条
curl -# -O http://example.com/file.zip
```

### 1.3 HTTP 请求方法

```bash
# 发送一个简单的 POST 请求
curl -X POST http://example.com

# 发送带数据的 POST 请求
curl -X POST -d "name=value" http://example.com

# 发送 JSON 数据的 POST 请求
curl -X POST -H "Content-Type: application/json" -d '{"name":"value"}' http://example.com/api
```

### 1.4 请求头操作

```bash
# 添加 Authorization 请求头
curl -H "Authorization: Bearer <token>" http://example.com

# 多个请求头
curl -H "Content-Type: application/json" -H "Authorization: Bearer <token>" http://example.com

# 自定义 User-Agent
curl -A "Mozilla/5.0" http://example.com
```

### 1.5 认证与安全

```bash
# HTTP 基本认证（用户名和密码）
curl -u username:password http://example.com

# 使用客户端证书和私钥
curl --cert cert.pem --key key.pem https://example.com  

# 忽略 SSL 证书验证（不推荐用于生产环境）
curl -k https://example.com
```

### 1.6 文件上传与下载

```bash
# 上传文件
curl -X POST -F "file=@filename.txt" http://example.com/upload

# 上传多个文件
curl -X POST -F "file1=@file1.txt" -F "file2=@file2.txt" http://example.com/upload
```

### 1.7 重定向 & 代理

```bash
# 跟随 3xx 重定向
curl -L http://example.com  

# 通过代理服务器访问
curl -x http://proxyserver:port http://example.com
```

### 1.8 复杂请求

```bash
# 发送多个请求
curl -X GET http://example.com -X POST -d "name=value" http://example.com

# 并行请求 同时下载多个文件
curl -O http://example.com/file1.zip & curl -O http://example.com/file2.zip

# 保存响应到文件 output.txt
curl -o output.txt http://example.com

# 显示请求和响应的详细信息
curl -v http://example.com
```

### 1.9 进阶使用

```bash
# 设置超时时间(设置最大请求时间为10秒)
curl --max-time 10 http://example.com

# 限制请求速率(限制下载速度为100KB/s)
curl --limit-rate 100k http://example.com  

# 发送 PUT 请求
curl -X PUT -d "name=value" http://example.com/update
```

### 1.10 调试与日志

```bash
# 输出请求和响应的详细信息
curl -v http://example.com  

# 将详细日志输出到文件
curl -o output.txt -v http://example.com
```
