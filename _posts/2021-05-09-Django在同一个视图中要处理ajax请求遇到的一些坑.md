---
layout: post
title: Web服务器｜Django在同一个视图中要处理ajax请求遇到的一些坑
categories: [Python, Web服务器]
description: Django在同一个视图中要处理ajax请求遇到的一些坑
keywords: Python, 服务器, Web
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

在写项目中遇到的一些ajax的坑，在这里做一下记录

一、先放一个完整的前，后端示例


```html
<!-- 用户登录 -->
<div id="login" class="layout_login">
    <div class="layout_login_" id="login_b">
        <div class="layout_login_title">
            用户登录
        </div>
        <div id="error_msg_login" style="color: red; text-align: center"></div>
        <form id="loginForm">
            <div class="layout_login_input">
                <input type="text" name="username" id="id_username_login" placeholder="账号" class="input_"/>
                <input type="password" name="password" id="id_password_login" placeholder="密码" class="input_"/>
                <input type="text" name="checkcode_login" id="id_checkcode_login" placeholder="验证码"
                       class="layout_login_input_checkcode" style="float: left;"/><img
                    src="{% url 'demo_app:getcode' %}" class="checkCode" style="float: right;"
                    onclick="changeCheckCode(this)">
                <script type="text/javascript">
                    //图片点击事件
                    function changeCheckCode(img) {
                        img.src = "{% url 'demo_app:getcode' %}?time=" + new Date().getTime();
                    }
                </script>
            </div>
            <input type="button" value="登录" class="layout_login_btn" id="login-form">
        </form>
        <div class="layout_login_url" id="onreg1">
            没有账号？去注册>>
        </div>
    </div>
</div>
```

```js
$("#login-form").click(function () {
        //1.发送数据到服务器
        if (checkUsername_login() && checkPassword_login() && checkCheckcode_login()) {
            //校验通过，发送ajax请求，提交表单的数据
            $.post("login", $("#loginForm").serialize(), function (data) {
                //处理服务器响应的数据   data {flag:true,errorMsg:"登录失败！"}
                if (data.code === 1) {
                    console.log("登录成功!");
                    //登录成功，跳转成功页面
                    location.href = "index";

                } else {
                    //登录失败，给errorMsg添加提示信息
                    console.log("登录失败!")
                    $("#error_msg_login").empty();
                    $("#error_msg_login").append(data.msg);

                }
            });
        } else {
        }
        //2.跳转页面
        return false;
    });
```
views的ajax接受方法

```python
def State(request):
    """
        获取用户登录状态函数，通过session实现
    """
        
    if request.method == 'GET':
        ...
 
    #要注意Ajax处理要放在中间
    if request.is_ajax():
        ...
        return JsonResponse({'res':'成功'})
 
 
    if request.method == 'POST':
        ...
 
    

#如果是类视图
 
class K (View):
    def get(self,request):
        if self.request.is_ajax:
            pass
        else:
            pass
 
    def post(self,request):
        if self.request.is_ajax:
            pass
        else:
            pass
    
    
```
二、button，type = "submit" 和 Ajax 不能同时使用，否则Ajax调用不成功

button按钮的type属性的默认值是submit，有提交form表单的功能。换成span标签可行，但是还要改样式，直接更改button的type为button

```html
<button>点我提交</button> →  <button type="button">点我提交</button>
```
