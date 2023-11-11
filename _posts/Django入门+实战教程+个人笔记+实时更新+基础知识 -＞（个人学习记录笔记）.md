@[TOC](文章目录)

# 1、初识

    python manage.py startapp stu   创建新应用  名称

	&emsp; 制表符

	python manage.py runserver 127.0.0.1:8000   启动服务器

	python manage.py  查看功能

	python manage.py makemigrations 名称      创建迁移表

# 2、登录，登录首页实现步骤

 

	1.创建一个Djan项目
	2.在终端中创建应用 python manage.py startapp 应用名
	3.在项目包中的settings.py中添加应用

```python
INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'stu'
```
    4.确定访问路径http://127.0.0.1:8000/student/
	5.配置项目根路由
	

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('student/', include('stu.urls'))   # ctrl+目标即可超链接，，include是添加子路由
]
```
    6.在应用包下创建并配置url.py文件
```python
# -*- codeing = utf-8 -*-
# @Time : 2020/10/25  18:53
# @Author : 宋保贤
# @File : urls.py
# @Software : PyCharm

from django.conf.urls import url
from . import views  # python3 必须加 from .

urlpatterns=[
    url('', views.login_view)
]
```
	7.在应用宝下view.py文件创建处理函数
	8.在templates目录下创建login.html文件
	
    action=' ', 就是账号密码提交地址
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action=""  method="get">
        <p>
            <label>用户名：</label><input type="text" name="unname"/>
        </p>
        <p>
            <label>密&emsp;码：</label><input type="password" name="pwd"/>
        </p>
        <p>
            &emsp;&emsp;&emsp;&emsp;<input type="submit" value="登录"/>
        </p>

    </form>
</body>
</html>
```
    效果图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201025193518699.png#pic_center)

# 3、GET方式_登录功能

	

## 1、post请求的请求报文

```python
  		POST /06_web_HTTP/success.html HTTP/1.1
            Host: localhost:8080
            Connection: keep-alive
            Content-Length: 30   请求体中数据的长度(请求参数)
            Cache-Control: max-age=0   不缓存
            Origin: http://localhost:8080
            Upgrade-Insecure-Requests: 1
            User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36
            Content-Type: application/x-www-form-urlencoded   
            Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
            Referer: http://localhost:8080/06_web_HTTP/login.html
            Accept-Encoding: gzip, deflate, br
            Accept-Language: zh-CN,zh;q=0.8
            3、空行
            4、请求体(请求参数  多个参数之间使用&连接)
            username=admin&password=123213
```

## 2、post响应报文

			

```python
 HTTP/1.1 200 OK
            Date:Sun,01 Apr 2020 13:14:07 GMT(成功响应的时间)
            Server: Apache-Coyote/1.1   (服务器内核版本)
            Accept-Ranges: bytes   (数据单位)
            ETag: W/"157-1504593208325"
		    Content-Type: text/html;charset=utf-8  (响应文件的类型)
            Content-Length: 15    (响应体内容大小)
            3、空行
            
            4、响应体(服务器给浏览器的响应体中的内容才是浏览器解析显示在页面中的内容)
```

## 3、GET和POST请求区别

				1、POST请求的请求参数在请求实体内容中，GET请求的请求参数存放在URL中
                2、GET请求相对不安全，post相对安全 （其实都不安全）
                3、GET请求的URL参数长度有限（不超过2K），post参数大小没有限制
                4、GET请求一般做查询（有缓存），POST请求一般做添加/删除/修改（无缓存）
                5、Django服务器GET/POST请求为什么接受参数方式一样？
                	因为他们都是QueryDict对象（django.http.request）
    
   

## 4、GET请求方式

```html
<form method="get">
浏览器地址栏直接访问
<a href="/student/">超链接</a>
window.location.href="/student/"
```
   

## 5、POST请求方式

           
   

```html
<form method="post">
浏览器地址栏直接访问
<a href="/student/">超链接</a>
window.location.href="/student/"
```

## 6、HTTP特性

	

 	1. HTTP1.1版本后支持长连接
 	2. 单项性协议（必须先有请求后有响应）
 	3. 无状态的协议
 		Cookie：客户端相关
 		Session：服务器相关
 					

## 7、解决POST请求错误403

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
或者在html文件加入这个

```html
<body>
    <form action="/register/" method="post">
        {% csrf_token %}
        <input type="submit" value="注册"/>
    </form>
</body>
```


# 3、注册功能

**1、 student/models.py中创建Stu模型类**

```python
from django.db import models
# Create your models here.
class Student(models.Model):
    sname = models.CharField(max_length=30, unique=True)  # 设置唯一密码
    spwd = models.CharField(max_length=30)
```
**###2、 创建数据库表**

```python
#创建当前应用的迁移文件
python manage.py makemigrations student

#生成数据库表
python manage.py migrate
python manage.py migrate  应用名   # 只执行当前应用名
#查看迁移文件生成的SQL语句
python manage.py sqlmigrate student 0001
```
**###3、 配置URL（student/urls.py）**

```python
# -*- codeing = utf-8 -*-
# @Time : 2020/10/26  20:14
# @Author : 宋保贤
# @File : urls.py
# @Software : PyCharm
from django.conf.urls import url
from stu import views
from stu.views import index_view

urlpatterns = [
    url(r'^$',views.login_view),
    url(r'^login/',views.to_login_view),
    url(r'^register/',views.register_view)
]
```
	## 4、 连接数据库，修改settings.py文件的以下内容
```python
ATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mysql',    # 数据库名称
        'HOST': '127.0.0.1',	# 服务器
        'PORT': '3306',
        'USER': 'root',		
        'PASSWORD': '123456'    # 密码
    }
}
```
	##5、 语言编码也可以改一下
	
```python
LANGUAGE_CODE = 'zh-Hans'    # 语言编码

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True
```
	##6、 修改model.py的内容
	

```python
from django.db import models

class Student(models.Model):  # 创建模型类
    sname = models.CharField(max_length=30, unique=True)  # 设置唯一密码 字段类型 最大长度 唯一约束的意思
    spwd = models.CharField(max_length=30)

def __str__(self):
    return u'Student:%s'%self.sname       # Student:lisi
#     def __unicode__(self):    # python2.0版本这样写
#         return u'Student:%s'%self.sname
```
	##7、 views.py页面内容
	

```python
from django.http import HttpResponse
from django.shortcuts import render
from .models import *

def index_view(request):
    # 获取当前请求方式
    m = request.method
    if m == 'GET':
        return render(request, 'register.html')
    else:
        # 1.获取请求参数
        uname = request.POST.get('uname', '')
        pwd = request.POST.get('pwd', '')
        # 2.判断非空
        if uname and pwd:
            # 3.创建模型对象
            stu = Student(sname=uname, spwd=pwd)
            # 4.插入数据库
            stu.save()
            # 5.页面响应
            return HttpResponse('注册成功！')
        return HttpResponse('注册失败！')
        
def show_view(request):
    # 1.查询stu_student表中的所有数据
    stus = Student.objects.all()        # 查询所有
    # 2.
    return render(request, 'show.html', {'students': stus})  # 字典传值

def login_view(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        # 1.获取请求参数
        uname = request.POST.get('uname', '')
        pwd = request.POST.get('pwd', '')
        # 2.查询数据库
        if uname and pwd:
            c = Student.objects.filter(sname=uname, spwd=pwd).count()   # 根据某个条件查询
            if c == 1:
                return HttpResponse('登录成功！')
        # 3.判断是否登录成功
        return HttpResponse('登录失败！')
```
	##8、 然后就是简单的注册页面HTML源码
	
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册界面</title>
</head>
<body>

    <form action="/register/" method="post">
        {% csrf_token %}
        <p>
            <label for="ua">用户名：</label><input type="text" name="uname" id="ua"/>
        </p>
        <p>
            <label for="pd">密&emsp;码：</label><input type="password" name="pwd" id="pd"/>
        </p>
        <p>
            <input type="submit" value="注册"/>
        </p>
    </form>

</body>
</html>
```
	##9、 如果你访问127.0.0.1:8000/student/show/，就可以利用模型，调用mysql库，在html网页查看数据库信息
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <table border="1" cellspacing="0" width="500px">
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>密码</th>
        </tr>
        {% for stu in students %}
            <tr>
                <td>{{ forloop.counter }}</td>
                <td>{{ stu.sname }}</td>
                <td>{{ stu.spwd }}</td>
            </tr>
        {% endfor %}
    </table>
</body>
</html>
```

# 4、admin后台管理类操作数据库

	python manage.py createsuperuser   创建超级用户
	设置你想要的账号和密码，注意密码不显示！记住一定要注释，很容易忘记。
	添加  admin.site.register(Movie)  使得其与后台站点绑定

# 5、单表查询

定义一个函数_显示ORM底层生成SQL
```python
showsql():
	from django.db import connection
    print(connection.queries[-1]['sql'])
```

## 1、查询单个对象

 **ASC升序  ---------------------  DESC降序**
```python
 	
	所有的继承自model.Model的类 都会有一个叫objects（管理者）
	
	----查询一个 （有且只能有一个）（少于一个或者多于一个都报错 ）
						 返回值Movie对象
						Movie.object.get(mid=147)   注意当不存在时会报错！！！
						SELECT `movie`.`mid`, `movie`.`mname`, `movie`.`mdesc`, `movie`.`mimg`, `movie`.`mlink` FROM `movie` LIMIT 21
						
	----获得第一个
						Movie.objects.first()
						Movie.objects.filter()
						
	----获得最后一个
						Movie.objects.last()
					
	----获得记录的总数
						Movie.objects.count()

```


 	

## 2、 查询多个对象

```python
----获得所有的记录
						Movie.objects.all()
						#在django的1.11.6中默认中只是获得21个
						#懒加载
						Movie.objects.filter()
						
	----切片 （不支持负数索引）
						Movie.objects.all()[20:40]
						# 底层直接使用了limit字句，可以自动的分页
						# django的orm性能非常强大，能节省很多工作
						
	----过滤 
						# 集合（游标，结果集，查询集）
						Movie.objects.filter(mname=‘麻辣学院’)
						
						# 底层直接使用了limit字句，可以自动的分页
						# django的orm性能非常强大，能节省很多工作		
						
	----模糊查询
						like
						%（多个字符） _(一个字符)
						SELECT * from movie WHERE mname LIKE '%爱情'
						
	----查询爱情结尾的			
						  SELECT * from movie WHERE mname LIKE '%爱情'
						  Movie.objects.filter(mname__endswith='爱情')
						  
														
	----忽略大小写
						  Movie.objects.filter(mname__istartswith='h')
						  
	----查询某个字段是否为null			
						  Movie.objects.filter(mname__isnull=True)
						  
	----多条件查询			
						  Movie.objects.filter(mname__contains='爱情',mid=147)
						  	and
						  Movie.objects.filter(mname__contains='爱情').filter(mid=147)
						  		
	----部分查询
						  Movie.objects.values('mname','mid').filter(mname__contains='爱情')
						  
	----排除一部分		
						  Movie.objects.filter(mname__contains='爱情').exclude(mname__startswith='爱情')
						  
	----排序
					Movie.objects.order_by('mid')        升序
					
					Movie.object.order_by('-mid')	       降序
	
```
	
	

## 3、 日期查询

				
	

```python
----查询大于某个时间的记录
					Post.objects.filter(created__gt='2017-10-20')
	
	----查询最近一个月的帖子（查询最近不活跃的用户）
					def get_recent_month_post():
						import datetime
						current = date.date.today()-datetime.timedelta(days=30)
						current = str(current)
						return Post.objects.filter(created__gt=current)
						
	----查询十月二十号--十一月二十号的所有的记录
		错误的
						Post.objects.filter(created__in=('2017-10-20','2017-11-20'))
						指的是这两个时间中的一个
		正确的（SQL语句）
						Post.objects.filter(created__range=('2017-10-20','2017-11-20'))
						Post.objects.filter(created__range=(147,149))    或者 BETWEEN 147 AND 149
						
				
```

# 6、单表增_删 改

	

## 1、 增加

	

```python
#方法1
	
			post = Post(title='博客11',created='2017-2-20')
			post.save()
		
	#方法2

			Post.objects.create(title='博客12',created='2018-11-11')	
			返回值是添加的对象
```

## 2、 删除

	

```python
#方法1
			m = Movie.objects.filters(mname__startswith='h')
			m.delete()
			
			# BINARY不是函数，是类型转换运算符，比较时，区分大小写
			DELETE FROM 'movie' WHERE 'movie', 'mname' LIKE BINARY ‘h%’
			
	#方法2（删除所有包含博客名字的帖子）
			Post.objects.filter(tiltle__contains='博客').delete()		
```
			
	

## 3、 修改

```python
#方法1 （更新的是所有的字段）
			
			post = Post.objects.first()
			post.title='更新了'
			post.save()
			
			UPDATE 'post_post' SET 'title' = '更新了','created' = '2017-11-27' WHERE 'post_post' ,'id' = 26

	#方法2（只更新修改的字段），推荐使用
			Post.objects.filter(id=26).update(title='又更新了')
			UPDATE 'post_post' SET 'title' = '又更新了' WHERE 'post_post'.'id' = 26
```

# 7、创建单表

## 1、 常用字段类型

	
```python
	—>  django所有的数据模型都继承自model.Model
	—>  CharField max_length (输入框)
	—>  TextField 没有长度限制的字符串（文本域）
	—>  DateField 日期
	—>  DateTimeField 日期+时间
	—>  BooleanField 真假
	—>  NullBooleanField ，Null 真假
	—>  Integer 整数
	—>  PositiveIntegerField 正整数
	—>  DecimalField max_digits(几位数) decimal_place (小数点后保留几位)
	—>  ImageField 图片 依赖于Pillow（处理图片）upload_to='upload'指定文件上传到目录
	—>  FileField（ImageField继承FileField）
	—>  AutoField
	—>  OneToOneField 1:1  一对一 学生和学生证  CASCADE 级联删除
	—>  ForeignKey 1:n 一对多 班级和学生
	—>  ManyToManyField n:n 多对多 学生和课程
	—>  EmailField 邮箱     #字符串@域名.comn
	—>  UUIDField 重复的概率非常低基本可以忽略，全世界都不一样的标示，uuid的产生和服务器的环境有关（CPU，网关）唯一的标示，用户模块，订单号    #唯一标识符
	—>  不同的字段在后台对应不同的html的组件
	—>  ImageField 依赖于Pillow组件（python库）
```

## 2、 常用属性

```python
	—>  unique 标示这个字段唯一
	—>  default 默认的意思，（如果不写的话就使用默认的值）
	—>  null=True 允许字段为null，（允许数据库为null）数据库层面的
	—>  blank=True 表单阶段的，admin后台的 可以为空
	—>  auto_now 针对时间段，自动调整单签，（当修改目的时候，这个时间会更新），每次修改都会更新（修改，保存的时候才会生效）
	—>  auto_now_add 针对时间的，只添加一次，（创建的时间）
```

## 3、 重点理解属性

```python
	—> 表单层面的东西（js判断字段是否是“”），不需要重写迁移数据库
	—> unique = True 可以任何字段
	—> default 数据库+表单层面（同时生效）
	—> auto_now_add 创建的时候回自动的添加时间（数据库）（后台表单层面找不到这个字段）
```

## 4、 使用OneToOneField（）

```python
	# -*- codeing = utf-8 -*-
	from django.db import models
	# 学生和学生证的关系
	class Student(models.Model):
		# 学号
		sno = models.AutoField(primary_key=True)
		# 学生姓名
		sname = models.CharField(max_length=30, unique=True)
		class Meta:
			db_table='t_student'
		
		def __str__(self):
			return u'Student:%s' %self.sname
			
	class Scard(models.Model):
		# 学号
		student = mdoels.OneToOneField(Student,Primary_key=True,on_delete=models.CASCADE)
		department = models.CharField(max_length=50)
		major = models.CharField(max_length=20)
		enterdate = models.DateField()

		class Meta:
			db_table='t_scard'
```

## 5、查询过程

```python
from stu.models import *
students = Student.objects.create(sname='zhangsan')
Scard.objects.creat(st=students,major='计算机')
# <Scard:[Bad Unicode data]>
Student.objects.first().scard   # 正向查询
# <Scard: Scaed:计算机> 
Scard.objects.first().st  		# 逆向查询
# <Student: Student:zhangsan>

```

## 6、 使用多对多ForeignKey（）

## 7、 一对多model.py

```python
class Clazz(models.Model):
    cno = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=30)


# 学生表（从表 多）
class Student(models.Model):
    sno = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=30)
    cno = models.ForeignKey(Clazz, on_delete=models.CASCADE, related_name='sts')

    def __str__(self):
        return u'Student:%s' % self.sname
```

```python
from stu.models import *
cls = Clazz.objects.create(cname='B201Python')
cls1 = Clazz.objects.create(cname='B202Java')
Student.objects.create(sname='zhangsan',cno=cls)
# <Student: Student:zhangsan>
Student.objects.create(sname='lisi',cno=cls)
# <Student: Student:lisi>
Clazz.objects.first().student_set.all()    # 正向查询
# <QuerySet [<Student: Student:zhangsan>, <Student: Student:lisi>]>
Student.objects.first().cno				   # 反向查询
# <Clazz: Clazz object (1)>
----------------------------------------------------------------------------
from stu.models import *
Clazz.objects.first().sts.all()   # related_name='sts'修改了 student_set.all()
# <QuerySet [<Student: Student:zhangsan>, <Student: Student:lisi>]>
```

## 8、 函数封装，打包输入，->>>多表的插入

```python
def insertData(clsname, *snames):
    try:
        cls = Clazz.objects.get(cname=clsname)
    except Clazz.DoesNotExist:
        cls = Clazz.objects.create(cname=clsname)
    for sn in snames:
        try:
            stu = Student.objects.get(sname=sn)
        except Student.DoesNotExist:
            Student.objects.create(sname=sn,cno=cls)
```

## 9、 可变参数

```python
def demo(*args, **kwargs):
	print args,kwargs
demo(1,2,c='a',b='d')
'''
(1,2)
{'c':'a','b':'d'}

# * args : 将手机所有位置相关的参数，并放到一个元组中，最后将这个元组赋值给args
# **kwargs : 针对关键字参数（a=3这一类型）这些关键字参数会放到一个相应的字典中，
然后同样的赋值给kwargs
'''
```

# 8、创建多表

```python
insertData('B203HTML5班','zhangjie','xiena')
```

## 1、 多对多关系

```python
# 课程表 和 教师表 n:n
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=30,unique=True)
	
	class Meta:
		db_table='t_course'
		
	def __str__(self):
        return u'Course:%s' % self.course_name
        
class Teacher(models.Model):
    tid= models.AutoField(primary_key=True)
    tname = models.CharField(max_length=30,unique=True)
    course = models.ManyToManyField(Course)
	
	class Meta:
		db_table='t_teacher'
		
    def __str__(self):
        return u'Teacher:%s--%s' % (self.tname,self.course)
```

## 2、 向表中插入内容
```python
from stu.models import *
cour1 = Course.objects.create(course_name='Python')
cour2 = Course.objects.create(course_name='Java')
cour3 = Course.objects.create(course_name='HTML5')
t = Teacher.objects.create(tname='zhangsan')
t2 = Teacher.objects.create(tname='lisi')
t.cour.add(cour1,cour2,cour3)
Course.objects.first().teacher_set.all() # 正向查询# related_name='sts'修改名字_set
# <QuerySet [<Teacher: Teacher:zhangsan>]>
Teacher.objects.first().cour.all()			# 逆向查询
# <QuerySet [<Course: Course:Python>, <Course: Course:Java>, <Course: Course:HTML5>]>

```
## 3、 函数封装，打包输入，->>>多表的插入

```python
def insertData(tname, *coursenames):
     try:
         t = Teacher.objects.get(tname=tname)
     except Teacher.DoesNotExist:
         t = Teacher.objects.create(tname=tname)
     courseList = []
     for cn in coursenames:
         try:
             cou = Course.objects.get(course_name=cn)
         except Course.DoesNotExist:
             cou = Course.objects.create(course_name=cn)
         courseList.append(cou)
     t.cour.add(*courseList)
```

## 4、 可变参数

```python
def demo(*args, **kwargs):
      print(args)
      print(kwargs)       
      
demo()
()
{}
demo(1,2,3)
(1, 2, 3)
{}
demo(1,2,3,c='a')
(1, 2, 3)
{'c': 'a'}

```


## 5、 参数解包



```python
def demo(a,b,c):
	print a,b,c
kwargs = {'a':1,'b':'2','c':3}
demo(**kwargs)
# 结果： 1 2 3

args = (1,2,3)
demo(*args)
# 结果：1 2 3




def demo(a,b,c)
	print(a,b,c)

demo(1,2,3)
# 1 2 3
str = {'a':'a1','b':'b1','c':'c1'}
demo(**str)
# a1 b1 c1

str2 = (1,2,3,)
demo(*str2)
# 1 2 3 
'''
可变参数和采纳数解包的区别

可变参数是在 形参 中，利用*，**来实现的
参数解包是在 实参 中，李颖*，**来实现的
'''
```


## 6、自定义Manager model.py



```python
ffrom django.db import models
from django.db.models.manager import Manager


class CustomManager(Manager):
    # def all(self):
    #     return Manager.all(self).filter(isdelete=True)
    def get_queryset(self):
        return Manager.get_queryset(self).filter(isdelete=True)


# Create your models here.
class NotDeletedManager(Manager):
    def all(self):
        return Manager.all().filter(isdelete=False)


class BatchDelManager(Manager):

    def get_queryset(self):
        return Manager.get_queryset(self).filter(isdelete=False)

    def filter(self, *args, **kwargs):
        # 1.获取到需要删除的记录
        delList = Manager.get_queryset(self)

        # 2. 定义闭包方法执行修改isdelete=True操作
        def delete1(delqueryset):
            for dq in delqueryset:
                dq.isdelete = True
                dq.savq()
        import new
        delList.delete = new.instancemethod(delete1, delList, QuerySet)

class Student(models.Model):
    sname = models.CharField(max_length=30)
    isdelete = models.BooleanField(default=False)

    # objects = CustomManager()
    # objects = BatchDelManager()
    # show = NotDeletedManager()

    def __str__(self):
        return u'Student: %s' % self.isdelete

    #Student.delete()
    # 单个对象的删除
    # def delete(self, using=None, keep_parents=False):
    #     self.isdelete = True
    #     self.save()


# Student.objects.all() 默认返回全表数据
# Student.delete()
# Student.objects.filter()
```


## 7、逻辑删除



单个对象删除
```python
Student.objects.first().delete()
Student.delete() # 重写的是这个delete（）方法

#Student.delete()
    # 单个对象的删除
    def delete(self, using=None, keep_parents=False):
    	self.isdelete = True
        self.save()
```

批量删除

```python
Student.objects.filter().delete()
Student.objects.all() # 重写get_queryset()方法 查询所有记录


class BatchDelManager(Manager):

    def get_queryset(self):
        return Manager.get_queryset(self).filter(isdelete=False)

    def filter(self, *args, **kwargs):
        # 1.获取到需要删除的记录
        delList = Manager.get_queryset(self)

        # 2. 定义闭包方法执行修改isdelete=True操作
        def delete1(delqueryset):
            for dq in delqueryset:
                dq.isdelete = True
                dq.save()
        # python2使用new 
        import new
        delList.delete = new.instancemethod(delete1, delList, QuerySet)
		return delList

		objects = BatchDelManager()
```

# 9、配置URL

## 1.URL传参

 **1.1位置传参 (\d{占用位数})**
```python
# urls.py
urlpatterns = [
    url(r'^query1/(\d{4})/(\d{2})', views.query1_view),  # 2.位置传参 (\d{占用位数})
]
# views.py
def query1_view(request, year, month):
    return HttpResponse('hello1_%s_%s' % (year, month))
```
**1.2关键字传参**
```python
# urls.py
urlpatterns = [
    url(r'^query2/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})', views.query2_view),  # 3.关键字传参
]
# views.py
def query2_view(request, year, month):
    return HttpResponse('hello2_%s_%s' % (year, month))  # 关键字定位
```
**1.3加载其他映射**
```python
# urls.py
urlpatterns = [
    url(r'^query3/', include('aggregator.urls')), 
```
**1.4传参（参数名必须保持一致）**
```python
# urls.py
urlpatterns = [
    url(r'^query3/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})', views.query3_view,{'uname':'zhangsan'}), # 传参（参数名必须保持一致）
]
# views.py
def query3_view(request, year, month, uname):
    return HttpResponse('hello3_%s_%s_%s' % (year, month, uname))
```

## 2.逆向解析并且传参

**2.1通过模板页面逆向访问**
```python
# urls.py
urlpatterns = [
    url(r'^query4/(\d{2})', views.query4_view, name='q'),  # 逆向解析
]
# views.py
def index_view(request):
    return render(request, 'index.html', {'n': 16})
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <a href="{% url 'q' n %}">超链接</a>
    <a href="/student/query4/15">超链接</a>
</body>
</html>
```
**2.2通过Python代码逆向访问**
```python
# urls.py
urlpatterns = [
    url(r'^$', views.index_view),
    url(r'^query5/$', views.index5_view),
]
# views.py
def index5_view(request):
    # 重定向(重新访问)
    return HttpResponseRedirect(reverse('q', args=(66,)))  # name ='q'
```
**2.3定义根路由名称 ，应用名称**
```python
# 根路由
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^student/', include('stu.urls', namespace='stus')),  #定义根路由名称 ，应用名称
]
# urls.py子路由
app_name = 'stu'
urlpatterns = [
    url(r'^query6/', views.query6_view, name='qw'),
]
#views.py
def query6_view(request):
    return HttpResponse('query6_view')
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <a href="{% url 'stus:qw' %}">超链接3</a>
    <a href="{% url '根路由namespace:子路由name' %}">超链接3</a>
</body>
</html>
```

# 10、HttpRequest和HttpResponse

## 1、HttpRequest请求对象（只读）

 - 当用户访问一个试图函数时，Django会创建一个request对象（HttpRequest）
 - HttpRequest对象中封装了所有的Http协议中的请求信息

## 2、常见的属性和方法
```python
HttpRequest.scheme  :返回协议类型（http/https）
HttpRequest.body    :返回请求实体内容
HttpRequest.path    :返回请求地址
HttpRequest.method  :返回当前请求方式（GET/POST）
HttpRequest.GET     :返回当前请求参数的字典QueryDict
HttpRequest.POST    :返回当前请求参数的字典QueryDict
HttpRequest.COOKIES :返回客户端所有的cookie信息

HttpRequest.FILES   :获取上传文件
（1.要求POST请求2.enctype="multipart/form-data"）

HttpRequest.META    :返回请求报文信息


HttpRequest.get_host()     :返回请求主机名和端口号
HttpRequest.get_full_path():返回请求地址（包括请求参数）
```
## 3、HttpResponse 响应对象
**1.用法** 

```python
# 响应内容

from django.http import HttpResponse
response = HttpResponse("Here's the text of the Web page.")
response = HttpResponse("Text only, please." content_type="text/plain")

response = HttpResponse()
response.write("<p>Here's the text of the Web page.</p>")
response.write("<p>Here's another paragraph.</p>")

response = HttpResponse(my_data, content_type='application/vnd.ms-excel')
response['Content-Disposition'] = 'attachment; filename="foo.xls"'

# 设置响应头信息

response = HttpResponse('hello')
response.__setitem__('hello','123')
response.__setitem__('Server','WBS')

response = HttpResponse('hello')
response['uname']= 'zhangsan'

response.setdefault('Server','WBS')
```

# 11、文件

## 1、文件上传

**模板**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/student/" method="post" enctype="multipart/form-data">
        {% csrf_token %}
        <p>
            <label for="ua">姓名：</label><input type="text" name="uname" id="ua"/>
        </p>
        <p>
            <label for="ph">头像：</label><input type="file" name="photo" id="ph"/>
        </p>
        <p>
            &emsp;&emsp;&emsp;&emsp;<input type="submit" value="注册"/>
        </p>
    </form>
</body>
</html>
```
views.py文件

```python
from django.http import HttpResponse
from django.shortcuts import render
def index_view(request):
    if request.method == 'GET':
        return render(request, 'index.html')
    elif request.method == 'POST':
        # 获取请求参数
        uname = request.POST.get('uname', '')
        photo = request.FILES.get('photo', '')
        import os  # 引入路径包
        if not os.path.exists('media'):
            os.makedirs('media')
            
        # mkdir()是创建子目录。mkdirs()是创建多级目录。
        # os.path.join拼接
        # os.getcwd()获取根路径
        # 'wb'二进制写入
        # as fw 命名
        with open(os.path.join(os.getcwd(), 'media', photo.name), 'wb') as fw:
            # photo.read() 一次性读取文件 
            # fw.write(photo.read()) 文件读进来写进去
            # fw.write(photo.read())

            # photo.chunks() 分块读取
            for ck in photo.chunks():
                fw.write(ck)

        print(photo.name)
        return HttpResponse('上传成功！')
    else:
        return HttpResponse('当前访问量过大，请稍后再试！')
```

## 2、图片读取
**1、settings.py 修改**

***写注释 注意加上  # coding=utf-8***
```python
# global_settings

# 指定上传文件的存储相对路径（读取文件）
MEDIA_URL = '/media/'

# 指定传文件存储绝对路径（存储文件）
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```
**2、model.py**

```python
from django.db import models

# Create your models here.

class Student(models.Model):
    sno = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='imgs')

    def __str__(self):
        return u'Student: %s' % self.sname
```
**3、修改admin.py**

```python
from django.contrib import admin

# Register your models here.

from .models import *
admin.site.register(Student)
```
**如果要用
{ src="{{MEDIA_URL}}{{ stu.photo }}/"}**

**1、修改根路由**

```python
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from .settings import DEBUG, MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('student/', include('stu.urls')),
]
# 加上这个 注意python3 用append python2 用+=
from django.views.static import serve
if DEBUG:
    urlpatterns.append(url(r'^media/(?P<path>.*)/$', serve, {'document_root': MEDIA_ROOT}))
```
**2、设置settings.py也要修改加上 'django.template.context_processors.media'**

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 'django.template.context_processors.media'
            ],
        },
    },
]
```

**3、模板修改**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <table width="500px" border="1" cellspacing="0">
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>头像</th>
            <th>操作</th>
        </tr>
        {% for stu in stus %}
            <tr>
                <td>{{ forloop.counter }}</td>
                <td>{{ stu.sname }}</td>
                <td><img style="width: 200px;" src="/media/{{ stu.photo }}/"></td>
{# 注意这个需要修改上边的根路由 <td><img style="width: 200px;" src="{{MEDIA_URL}}{{ stu.photo }}/"></td>#}
                <td>下载</td>
            </tr>
        {% endfor %}
    </table>
</body>
</html>

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127095511734.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70#pic_center)
## 3、文件下载
**1、urls.py**

```python
urlpatterns = [
    path('download/', views.download_view),
]
```
**2、views.py**
```python
def download_view(request):
    # 获取请求参数（图片的存储位置）
    photo = request.GET.get('photo', '')

    # 获取图片文件名
    filename = photo[photo.rindex('/')+1:]

    # 开启一个流 rb 读

    path = os.path.join(os.getcwd(), 'media', photo.replace('/', '\\'))
    with open(path, 'rb') as fr:
        response = HttpResponse(fr.read())
        response['Content-type'] = 'image/jpg'
        # 预览模式
        response['Content-Disposition'] = 'inline; filename=' + filename
        # 附件模式
        # response['Content-Disposition'] = 'attachment; filename=' + filename
    return response
```
**3、html文件**

```html
{% for stu in stus %}
            <tr>
                <td>{{ forloop.counter }}</td>
                <td>{{ stu.sname }}</td>
{#                <td><img style="width: 200px;" src="/media/{{ stu.photo }}/"></td>#}
                <td><img style="width: 200px;" src="{{MEDIA_URL}}{{ stu.photo }}/"></td>
                <td><a href="/student/download/?photo={{ stu.photo }}">下载</a></td>
            </tr>
        {% endfor %}
```

# 12、重定向

## 1、HttpResponseRedirect(' ')

 - 302重定向
 
 

## 2、redirect(' ')

 
 - 301重定向
 - 默认302请求可以改为301
 - redirect(' ')
 
 
 301: 永久性重定向
 302: 临时性重定向

## 3、 配置URL

## 4、配置视图

```python
# coding=utf-8
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect


def index_view(request):
	
	# 方式1:302
    # return HttpResponseRedirect('/student/showall/')  # 状态码302
	
	# 方式2：默认302可以转换成301
    # return redirect('/student/showall/', permanent=True)  # 301: 永久性重定向
    # return redirect('/student/showall/')   # 302: 临时性重定向
	
	# 方式3：
	response = HttpResponse()
    response.status_code = 302
    response.setdefault('Location', '/student/showall/')
    return response
    
def showall_view(request):
    return HttpResponse('hello')
```

## 5、定制错误页面

```python
# 1、在settings文件修改
DEBUG = False

ALLOWED_HOSTS = ['*']
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127195816305.png)

# 12、cookie语法

## 1、Cookie中存数据 设置cookie

**1、普通**

response.set_cookie("uname","zhangsan",expires=value,path='/')

**2、加盐**

普通cookie是明文传输的，可以直接在客户端打开，所以需要加盐，解盐之后才能看
response.set_signed("k","v",salt="fdsa")
```python
# view.py
import datetime
def setcookie(request):
    # 创建响应对象
    response = HttpResponse()
    # 将数据存储在cookie中
    # 默认有效时间 保存浏览器缓存中，关闭浏览器数据丢失 max_age=()  单位是秒
    # response.set_cookie('uname', 'zhangsan', max_age=24*60*60)
    response.set_cookie('uname', 'zhangsan', expires=datetime.datetime.today() + datetime.timedelta(days=2))
    response.set_cookie('pwd', '123', expires=datetime.datetime.today() + datetime.timedelta(days=2))
    return response

def getcookie(request):
    str = request.COOKIES.get('uname')
    pwd = request.COOKIES.get('pwd')
    return HttpResponse(pwd)
```

## 2、Cookie中取数据 获取cookie

**1、普通**

request.COOKIES['hello']
request.COOKIES.get('hello', '')

**2、加盐**

request.get_signed_cookie('k', salt='fdsa')

```python
def setcookie(request):
    # 创建响应对象
    response = HttpResponse()
    # 将数据存储在cookie中
    # 默认有效时间 保存浏览器缓存中，关闭浏览器数据丢失 max_age=()  单位是秒
    response.set_signed_cookie('uname', 'zhangsan', salt='dsafasfdf')
    return response
def getcookie(request):
    uname = request.get_signed_cookie('uname', salt='dsafasfdf')
    return HttpResponse(uname)
```

## 3、删除值
```python
# 设置过期
1.默认情况关闭浏览器就失效
2. max_age=1(单位秒)
3. expires=datetime.datetime.today() + datetime.timedelta(days=2)(单位日期类型)
4. response.delete_cookie('uname', path='/student/login/')
5. path是设置根路径
```

## 4、涉及属性

```python
1、 max_age=1 : cookie 生效的时间，单位是秒
2、 expires： 具体过期时间
3、 path='/': 指定那个url可以访问到cookie： '/'是所有path='/'
4、 domain=None (None代表当前域名)：指定那个域名以及他下面的二级域名（子域名）可以访问这个cookie domain='.baidu.com'
```

## 5、语法

```python
# 判断一下是否存在这个值
    if 'uname' in request.COOKIES:
        uname = request.get_signed_cookie('uname', salt='dsafasfdf')
        return HttpResponse(uname)
    else:
        return HttpResponse('当前Cookie信息不存在！')
```

# 13、三天免登陆

## 1、修改view.py

```python
def login_view(request):
    if request.method == 'GET':
    	# 判断客户端是否存在对应的cookie信息
        if 'login' in request.COOKIES:
        	#login = request.COOKIES.get('login', '').split(',')
        	# 如果加密了
        	login = request.get_signed_cookie('login', salt='hello').split(',')
        	uname =  login[0]
        	pwd = login[1]
        	return render(request, 'login.html',{'uname': uname, 'pwd':pwd})
        return render(request, 'login.html')
    else:
        # 获取请求参数
        uname = request.POST.get('uname', '')
        pwd = request.POST.get('pwd', '')
        flag= request.POST.get('flag','')
		
		response = HttpResponse()
        # 判断是否登陆成功
        if uname == 'zhangsan' and pwd == '123':
        	# 记住密码
            response.content = '登陆成功！'
            if flag == '1':
                response.set_cookie('loginUser',uname+','+pwd,max_age=3*24*60*60,path='/student/')
                 #response.set_cookie('login', uname+ ',' + pwd, path='student/login/', max_age=24*60*60*3)
            # 如果加密了
            # response.set_signed_cookie('login', uname+ ',' +pwd, salt='hello',, max_age=24*60*60*3)
                return response
            else:
                #清空cookie信息中的loginUser
                response.delete_cookie('login',path='/student/login/')
                return response
        else:
        	response.delete_cookie('login', path='/student/login/')
        	response.content = '登陆失败！'
            return response
```

## 2、修改value="{{ uname }}

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/student/login/" method="post">
        {% csrf_token %}
        <p>
            <label for="sn">姓名：</label><input type="text" name="uname" id="sn" value="{{ uname }}"/>
        </p>
        <p>
            <label for="pd">密码：</label><input type="password" name="pwd" id="pd" value="{{ pwd }}" />
        </p>
        <p>
            <input type="checkbox" name="flag" value="1" />记住密码
        </p>
        <p>
            <input type="submit" value="login"/>
        </p>
    </form>
</body>
</html>
```

# 14、设置session对象

```python
# settings.py
from django.conf import global_settings
global_settings
#-------------------------------------------------------
# views.py
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
def setsession(request):
    #SessionStore()
    #在session中存放数据(默认的有效时间：2周)
    request.session['uname'] ='zhangsan'

    #输出Cookie中的
    print(request.session.session_key)

    #设置有效时间
    #1.参数类型：整数：秒 设置0表示关闭浏览器之后过期  日期:指定日期值过期  None:默认时间过期
    # request.session.set_expiry(3*24*60*60)

    #删除session数据(对象中session的数据)
    # del request.session['uname']


    # request.session.clear()

    #删除session对象和数据库中的数据
    # request.session.flush()
    return HttpResponse('设置成功！')


def getsession(request):
    #从session对象中取值
    uname = request.session['uname']

    return HttpResponse(uname)

class User(object):
    def __init__(self,uname,pwd):
        self.uname = uname
        self.pwd = pwd
import jsonpickle

def login(request):
    if request.method =='GET':
        return render(request,'login.html')
    else:
        #接收请求参数
        uname = request.POST.get('uname','')
        pwd = request.POST.get('pwd','')


        #判断
        if uname =='zhangsan' and pwd =='123':
            user = User(uname,pwd)
            #jsonpickle.dumps(user)  将python对象序列化成普通字符串
            request.session['login'] = jsonpickle.dumps(user)
            return HttpResponseRedirect('/student/usercenter/')
        return HttpResponseRedirect('/student/login/')


def usercenter(request):
    #获取session中的数据
    user =  request.session['login']
    #jsonpickle.loads(user) 将普通字符串反序列化成python对象
    uuser = jsonpickle.loads(user)
    return render(request,'center.html',{'user':uuser})


#urls.py
#-------------------------------------------------------
#coding=utf-8

from django.conf.urls import url
import views

urlpatterns=[
    url(r'^$',views.setsession),
    url(r'^get/$',views.getsession),
    url(r'^login/$',views.login),
    url(r'^usercenter/$',views.usercenter),
]
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h3>欢迎{{ user.pwd }}登录成功！</h3>
</body>
</html>
```

# 15、读取静态文件

```python
# 配置urls.py
from django.conf.urls import url
from stu import views

urlpatterns=[
    url(r'^$',views.IndexView.as_view()),
    url(r'^hello/(.*)$',views.StaticView.as_view()),
]
```

```python
# -*- coding: utf-8 -*-
from django.http import HttpResponse, Http404, FileResponse
from django.shortcuts import render
from django.views import View


class IndexView(View):
    def get(self,request,*args,**kwargs):
        return render(request,'index.html')

    def post(self,request,*args,**kwargs):
        return HttpResponse('POST请求')


class StaticView(View):
    def get(self, request, *args, **kwargs):
        import re
        import os
        #1.获取文件名
        filepath = request.path

        m = re.match(r'/student/hello/(.*)',filepath)
        filename = m.group(1)

        filedir = os.path.join(os.getcwd(),'static\\images',filename)



        if not os.path.exists(filedir):
            raise Http404()
        #mimetypes
        return FileResponse(open(filedir,'rb'),content_type='image/png')
        # content_type='*/*'  解决不同文件的格式
```
## 引入静态文件

```python
# 修改settings.py
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,'static\images'),
    os.path.join(BASE_DIR,'static\css'),
    os.path.join(BASE_DIR,'static\js'),
]
```

```html
{% load staticfiles %}
{#软解#}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="{% static 'my.css' %}" type="text/css"/>
    <script type="text/javascript" src="{% static 'my.js' %}"></script>
</head>
<body>

    <img src="/static/1.png"/>
    <img src="{% static '1.png' %}"/>
    <form action="/student/" method="post">
        {% csrf_token %}
        <input type="submit" id="btn"/>
    </form>

</body>
</html>
```

# 16、标签语法

```python
# -*- coding: utf-8 -*-
from django.shortcuts import render

# Create your views here.
from django.views import View


class GetDataView(View):
    def get(self,request):
        import datetime
        loc = '<script>location.href="/student2/r3/"</script>'
        return render(request,'getdata1.html',{'user':{'uname':'zhangsan','pwd':'123'},'numlist':[1,2,3,4,5],'current':datetime.datetime.today(),'str':'hello','score':88,'loc':loc})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<h3>获取views传值</h3>
    <ol>
        <li>{{ user.uname }}</li>
        <li>{{ numlist.2}}</li>
        <li>{{ current.year }}</li>
        <li>{{ str.upper }}</li>
        {# upper取大写 #}

    </ol>
{# reversed逆序 #}

{% for n in numlist reversed%}
	 {# 序号从1开始 #}
    {{ forloop.counter }}-{{ n }}<br/>
    {# 序号从0开始 #}
    {{ forloop.counter0 }}-{{ n }}<br/>
    {# 序号倒叙 #}
    {{ forloop.revcounter }}-{{ n }}<br/>
{% endfor %}
<br/>
<hr/>
{% for k,v in user.items %}
    {{ k }}-{{ v }}<br/>
{% endfor %}

<br/>
<hr/>


{% for foo in hello %}
    {{ foo }}
{% empty %}

    无记录
{% endfor %}


<hr/>
{% if score > 90 %}
优秀
{% elif score > 80 %}
良好
{% else %}
再接再厉~
{% endif %}


{#{% csrf_token %}#}
{# 自动转义为字符串 off关on开 #}
{% autoescape off %}
    {{ loc }}

{% endautoescape %}

</body>
</html>
```
# 17、过滤器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

{{ num|add:'2' }}<br/>
{{ str|capfirst }}<br/>			 {# 首字母大写#}
{{ d|date:'Y-m-d H:i:s' }}<br/> { # H 24小时制  h 12小时制#}
{{ num|divisibleby:'2' }}<br/>  {#被 2 整除 返回True False#}
{{ urlstr|safe }}<br/>			{# 进行HTML标签转换 #}
{{ str|truncatewords:'2' }}<br/>{# 进行截断 #}
{{ str|truncatechars:'5' }} 

</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201129161230934.png)

```python
from django.shortcuts import render

# Create your views here.
from django.views import View


class IndexView(View):
    def get(self,request):
        import datetime
        d = datetime.datetime.today()
        urlstr = '<h3>北京</h3>'

        return render(request,'index.html',{'num':8,'str':'明天天气咋样','d':d,'urlstr':urlstr})
```

# 18、全局上下文

```python
# views.py
# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template import Template, RequestContext
from django.views import View

from stu.my_context_processors import getData


class Index_View(View):
    def get(self,request):
        return render(request,'index.html')


class Index2_View(View):
    def get(self, request):
        t = Template('{{uname}}')
        str = t.render(RequestContext(request,dict_=None,processors=(getData,)))

        return HttpResponse(str)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        ul{
            list-style-type: none;
        }
        li{
            float: left;
            padding-right:20px;
        }

    </style>
</head>
<body>
    {{ uname }}

    <ul>
        {% for m in menu %}
            <li><a href="#">{{ m.mname }}</a></li>
        {% endfor %}
    
    </ul>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201129162954540.png)

```python
# my_context_processors.py
#coding=utf-8
from .models import *

def getData(request):

    return {'uname':'zhangsan'}

def getMenuInfo(request):
    #查询菜单表中的所有数据
    menus = Menu.objects.all().order_by('mid')

    return {'menu':menus}在这里插入代码片
```

```python
# settings.py
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'stu.my_context_processors.getData',
                'stu.my_context_processors.getMenuInfo'
            ],
        },
    },
]
```
## 19、admin修改

```python
# admin.py
# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import BlogArticles

class BlogAdmin(admin.ModelAdmin):
    # 显示表格列表字段
    list_display = ('title','author','publish')
    # 条件查询字段
    list_filter = ('publish','author')
    # 搜索框中根据某些字段进行查询
    search_fields = ('title','body')
    # 在admin后台中加入raw_id_fields（只适用于外键）后，会显示外键的详细信息
    raw_id_fields = ('author',)
    # 以某个日期字段分层次查询
    date_hierarchy = 'publish'
    # 排序字段
    ordering = ['publish', 'author']


admin.site.register(BlogArticles,BlogAdmin)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201129165431437.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

# 20、表单类

## 1、配置路由

```python
from django.conf.urls import url
import views

urlpatterns=[

    url(r'^login/',views.IndexView.as_view())
]
```

## 2、编写表单类（account.forms.LoginForm）

```python
# form.py
from django.conf.urls import url
from stu import views

urlpatterns=[

    url(r'^login/',views.IndexView.as_view())
]
```

## 3、配置视图函数

```python
# -*- coding: utf-8 -*-
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from .forms import *

class IndexView(View):
    def get(self,request):
        loginForm = LoginForm()

        return render(request,'login.html',{'loginForm':loginForm})

    def post(self,request):
        loginForm = LoginForm(request.POST)
        #校验数据是否合法
        if loginForm.is_valid():
            data = loginForm.cleaned_data
            #和数据库表中数据进行匹配
            user = authenticate(username=data['sname'],password=data['spwd'])
            #判断是否登录成功
            if user:
                #将用户信息存放到session中
                login(request,user)
                return HttpResponse('登录成功！')
        return HttpResponse('登录失败！')
```

## 4、模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/student/login/" method="post">
        {% csrf_token %}
        {{ loginForm.as_p }}
        <input type="submit" value="登录"/>
    </form>
</body>
</html>
```
**----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>

        .error-msg{
            color: red;
        }
    </style>
</head>
<body>

    <form action="/student/register/" method="post">
        {% csrf_token %}
        <p>
            <label for="{{ stuForm.sname.id_for_label }}">{{ stuForm.sname.label}}</label>{{ stuForm.sname }}
        </p>
        <p>
            <label for="{{ stuForm.password.id_for_label }}">{{ stuForm.password.label}}</label>{{ stuForm.password }}
        </p>
        <p>
            <label for="{{ stuForm.password2.id_for_label }}">{{ stuForm.password2.label}}</label>{{ stuForm.password2 }}<span class="error-msg">{{ stuForm.errors.password2.0 }}</span>
        </p>
        <p>
            <label for="{{ clsForm.cname.id_for_label }}">{{ clsForm.cname.label}}</label>{{ clsForm.cname }}
        </p>
        <input type="submit" value="注册"/>
    </form>

</body>
</html>
```

```python
# form.py
#coding=utf-8


from django import forms
from .models import *

class LoginForm(forms.Form):
    sname = forms.CharField(max_length=30,label=u'姓名')
    spwd = forms.CharField(label=u'密码',widget=forms.PasswordInput)


class ClazzForm(forms.ModelForm):
    class Meta:
        model= Clazz
        fields = ('cname',)

class StuForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput,max_length=30,label=u'密码1：')
    password2 = forms.CharField(widget=forms.PasswordInput,max_length=30,label=u'密码2：')

    class Meta:
        model = Stu
        fields = ('sname',)

    def clean_password2(self):
        data = self.cleaned_data
        if data['password'] != data['password2']:
            self.errors['password2'] = ['密码不一致！']

        return data['password']

```

```python
# views.py
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views import View
from .forms import *

class IndexView(View):
    def get(self,request):
        loginForm = LoginForm()

        return render(request,'login.html',{'loginForm':loginForm})

    def post(self,request):
        loginForm = LoginForm(request.POST)
        #校验数据是否合法
        if loginForm.is_valid():
            data = loginForm.cleaned_data
            #和数据库表中数据进行匹配
            user = authenticate(username=data['sname'],password=data['spwd'])


            #判断是否登录成功
            if user:
                #将用户信息存放到session中
                login(request,user)

                return HttpResponse('登录成功！')

        return HttpResponse('登录失败！')


class RegisterView(View):
    def get(self,request):
        #创建表单对象
        clsForm = ClazzForm()
        stuForm = StuForm()
        return render(request,'register.html',{'clsForm':clsForm,'stuForm':stuForm})

    def post(self,request):
        #创建表单对象
        clsForm = ClazzForm(request.POST)
        stuForm = StuForm(request.POST)

        #验证表单数据是否合法
        if clsForm.is_valid()*stuForm.is_valid():
            cls = clsForm.save()
            #commit=False:事务未提交
            stu = stuForm.save(commit=False)
            stu.clazz = cls
            stu.password = stuForm.clean_password2()
            stu.save()
            return HttpResponse('注册成功！')
        return render(request,'register.html',{'clsForm':clsForm,'stuForm':stuForm})
```

```python
# models.py
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

from django.db import models


# Create your models here.

class Clazz(models.Model):
    cno = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=20,verbose_name=u'班级:')

    def __unicode__(self):
        return u'Clazz:%s' % self.cname


class Stu(models.Model):
    sno = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=30,verbose_name=u'姓名:')
    password = models.CharField(max_length=30)
    clazz = models.ForeignKey(Clazz, on_delete=models.CASCADE)

    def __unicode__(self):
        return u'Stu:%s,%s' % (self.sno, self.sname)


```

