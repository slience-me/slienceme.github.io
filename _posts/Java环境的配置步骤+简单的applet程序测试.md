#### Java环境的配置步骤+简单的applet程序测试


第一步，你需要打开
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165326588.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

---

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165351662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165415574.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165520516.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
第二部分，重要的**参数注意了**

1.JAVA_HOME的路径，就是你的java包的路径 (该电脑为机房的电脑)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165832992.png)

像这样即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165243676.png)

2. 第二步
- `CLASSPATH`
- `.;%JAVA_HOME%\bin;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\tools.jar;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414165929785.png)
3. 第三步
- `Path`
- `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414170019835.png)
然后测试一下

win+r  , 输入指令  `cmd` 
- `java -version`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414170234578.png)
然后写一个测试java文件，放到一个你习惯的路径

```java
public class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("HelloWorld!");
    }
}
```

```java
C:\Users\pc65>cd C:\Users\pc65\Desktop\codeDemo\src\xyz\slienceme

C:\Users\pc65\Desktop\codeDemo\src\xyz\slienceme>javac HelloWorldApp.java

C:\Users\pc65\Desktop\codeDemo\src\xyz\slienceme>java HelloWorldApp
HelloWorld!

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414170414480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)
这样成功后，说明环境配置成功了

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021041417085933.png)

然后可以来一个applet程序玩一下
程序一  `HelloWorldApplet.java`
```java
import java.applet.Applet;
import java.awt.*;

public class HelloWorldApplet extends Applet {
    public void paint(Graphics g){
        g.drawString("Hello WOrld!",20,20);
    }
}
```
程序二  `Hello.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>An Applet</title>
</head>
<body>
<applet code="HelloWorldApplet.class" width=200 height=40 ></applet>
</body>
</html>
```

然后再（MS-DOS）窗口，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210414170941701.png)

```java
C:\Users\pc65\Desktop\codeDemo\src\xyz\slienceme>appletviewer HelloWorldApplet.java
C:\Users\pc65\Desktop\codeDemo\src\xyz\slienceme>appletviewer Hello.html
```
你就得到了一个这个窗口

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021041417101839.png)

