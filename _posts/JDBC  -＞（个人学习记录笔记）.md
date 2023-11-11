@[TOC](文章目录)
# JDBC

1. JDBC基本概念
2. 快速入门
3. 对JDBC中各个接口和类详解

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210131165422212.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

## JDBC：
### 1. 概念：Java DataBase Connectivity  Java 数据库连接， Java语言操作数据库
* JDBC本质：其实是官方（sun公司）定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商去实现这套接口，提供数据库驱动jar包。我们可以使用这套接口（JDBC）编程，真正执行的代码是驱动jar包中的实现类。

### 2. 快速入门：
 步骤：
1. 导入驱动jar包 mysql-connector-java-8.0.23-bin.jar（注意你的mysql版本）
	
	1.复制mysql-connector-java-8.0.23-bin.jar到项目的libs目录下
	2.右键-->Add As Library
	
2. 注册驱动
3. 获取数据库连接对象 Connection
4. 定义sql
5. 获取执行sql语句的对象 Statement
6. 执行sql，接受返回结果
7. 处理结果
8. 释放资源

代码实现：
		 
```java
//1. 导入驱动jar包

//2.注册驱动
	Class.forName("com.mysql.cj.jdbc.Driver");
	
//3.获取数据库连接对象
	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
	
//4.定义sql语句
	String sql = "update account set balance = 500 where id = 1";
	
//5.获取执行sql的对象 Statement
	Statement stmt = conn.createStatement();
	
//6.执行sql
	int count = stmt.executeUpdate(sql);
	
//7.处理结果
	System.out.println(count);
	
//8.释放资源
	stmt.close();
	conn.close();
```

		  	
	
### 3. 详解各个对象：
#### 1. DriverManager：驱动管理对象
* 功能：
	##### 1. 注册驱动：告诉程序该使用哪一个数据库驱动jar
	- `static void registerDriver(Driver driver)` :注册与给定的驱动程序 DriverManager 
		
	- 写代码使用：  `Class.forName("com.mysql.cj.jdbc.Driver");`
		通过查看源码发现：在`com.mysql.cj.jdbc.Driver`类中存在静态代码块
		 
		 

```java
static {
  	try {
          java.sql.DriverManager.registerDriver(new Driver());
     } catch (SQLException E) {
     throw new RuntimeException("Can't register driver!");
   }
}
```

- 注意：mysql5之后的驱动jar包可以省略注册驱动的步骤。
	
##### 2. 获取数据库连接：
* 方法：`static Connection getConnection(String url, String user, String password)` 
* 参数：
	* `url`：指定连接的路径
		* 语法：`jdbc:mysql://ip地址(域名):端口号/数据库名称`
			* 例子：`jdbc:mysql://localhost:3306/db3`
			* 细节：如果连接的是本机`mysql`服务器，并且`mysql`服务默认端口是`3306`，则url可以简写为：`jdbc:mysql:///数据库名称`
	* `user`：用户名
	* `password`：密码 
#### 2. Connection：数据库连接对象
##### 1. 功能：
1. 获取执行`sql` 的对象
	* `Statement createStatement()`
	* `PreparedStatement prepareStatement(String sql)`  
2. 管理事务：
	* 开启事务：`setAutoCommit(boolean autoCommit)` ：调用该方法设置参数为`false`，即开启事务
	* 提交事务：`commit()` 
	* 回滚事务：`rollback()` 
#### 3. Statement：执行sql的对象
##### 1. 执行sql
1. `boolean execute(String sql)` ：可以执行任意的sql (了解) 
2. `int executeUpdate(String sql)` ：执行DML（`insert、update、delete）`语句、`DDL(create，alter、drop)`语句
	* 返回值：影响的行数，可以通过这个影响的行数判断DML语句是否执行成功 返回值>0的则执行成功，反之，则失败。
3. `ResultSet executeQuery(String sql)`  ：执行`DQL（select)`语句
##### 2. 练习：
1. account表 添加一条记录
2. account表 修改记录
3. account表 删除一条记录

代码：

		
添加一条记录
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCDemo2 {
    public static void main(String[] args) {
        Statement stmt = null;
        Connection conn = null;
        try {
            //1.注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.定义sql
            String sql = "insert into account values(null,'王五',3000)";
            //3.获取Connection对象
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
            //4.获取执行sql的对象  Statement
            stmt = conn.createStatement();
            //5.执行sql
            int count = stmt.executeUpdate(sql);//影响的行数
            //6. 处理结果
            System.out.println(count);
            if (count > 0) {
                System.out.println("添加成功！");
            }else{
                System.out.println("添加失败！");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }finally {
            //stmt.close();
            //7. 释放资源
            //避免空指针异常
            if(stmt != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

            if(conn != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }
    }
}

```
修改记录
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCDemo3 {
    public static void main(String[] args) {
        Statement stmt = null;
        Connection conn = null;
        //1.注册驱动
        try {
            //1.注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.获取Connection对象
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
            //3.定义sql
            String sql = "update account set balance = 1500 where id = 3";
            //4.获取执行sql对象
            stmt = conn.createStatement();
            //5.执行sql
            int count = stmt.executeUpdate(sql);
            //6.处理结果
            System.out.println(count);
            if(count > 0){
                System.out.println("修改成功！");
            }else{
                System.out.println("修改失败！");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }finally {
            if(stmt != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

            if(conn != null){
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }

    }
}

```
删除一条记录	

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCDemo4 {
    public static void main(String[] args) {
        Statement stmt = null;
        Connection conn = null;
        //1.注册驱动
        try {
            //1.注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.获取Connection对象
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
            //3.定义sql
            String sql = "delete from account where id = 3";
            //4.获取执行sql对象
            stmt = conn.createStatement();
            //5.执行sql
            int count = stmt.executeUpdate(sql);
            //6.处理结果
            System.out.println(count);
            if(count > 0){
                System.out.println("删除成功！");
            }else{
                System.out.println("删除失败！");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }finally {
            if(stmt != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

            if(conn != null){
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }
    }
}

```

#### 4. ResultSet：结果集对象,封装查询结果
* `boolean next()`: 游标向下移动一行，判断当前行是否是最后一行末尾(是否有数据)，如果是，则返回`false`，如果不是则返回`true`
* `getXxx(参数)`:获取数据
	* `Xxx`：代表数据类型   如： `int getInt() ,	String getString()`
	* 参数：
		1. `int`：代表 **列** 的编号,从1开始   如： `getString(1)`
		2. `String`：代表列名称。 如： `getDouble("balance")`

* 注意：
	* 使用步骤：
		1. 游标向下移动一行
		2. 判断是否有数据
		3. 获取数据
		
```java
//循环判断游标是否是最后一行末尾。
while(rs.next()){
    //获取数据
    //6.2 获取数据
    int id = rs.getInt(1);
    String name = rs.getString("name");
    double balance = rs.getDouble(3);

    System.out.println(id + "---" + name + "---" + balance);
}
```

```java
import java.sql.*;

public class JDBCDemo6 {
    public static void main(String[] args) {
        Statement stmt = null;
        Connection conn = null;
        ResultSet rs = null;
        //1.注册驱动
        try {
            //1.注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.获取Connection对象
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
            //3.定义sql
            String sql = "select * from account";
            //4.获取执行sql对象
            stmt = conn.createStatement();
            //5.执行sql
            rs = stmt.executeQuery(sql);
            //6.处理结果
            //循环判断游标是否是最后一行末尾。
            while(rs.next()){
                //获取数据
                //6.2 获取数据
                int id = rs.getInt(1);
                String name = rs.getString("name");
                double balance = rs.getDouble(3);

                System.out.println(id + "---" + name + "---" + balance);
            }


        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if(stmt != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

            if(conn != null){
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }
    }
}

```

* 练习：
	* 定义一个方法，查询emp表的数据将其封装为对象，然后装载集合，返回。
		1. 定义Emp类
		2. 定义方法 public List<Emp> findAll(){}
		3. 实现方法 select * from emp;

- 方法一
```java
import java.util.Date;

public class Emp {
    private int id;
    private String ename;
    private int job_id;
    private int mgr;
    private Date joindate;
    private double salary;
    private double bonus;
    private int dept_id;

    public int getId() {
        return id;
    }

    public String getEname() {
        return ename;
    }

    public int getJob_id() {
        return job_id;
    }

    public int getMgr() {
        return mgr;
    }

    public Date getJoindate() {
        return joindate;
    }

    public double getSalary() {
        return salary;
    }



    public int getDept_id() {
        return dept_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public void setMgr(int mgr) {
        this.mgr = mgr;
    }

    public void setJoindate(Date joindate) {
        this.joindate = joindate;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }



    public void setDept_id(int dept_id) {
        this.dept_id = dept_id;
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "id=" + id +
                ", ename='" + ename + '\'' +
                ", job_id=" + job_id +
                ", mgr=" + mgr +
                ", joindate=" + joindate +
                ", salary=" + salary +
                ", bonus=" + bonus +
                ", dept_id=" + dept_id +
                '}';
    }
}
```

```java
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBCDemo8 {
    public static void main(String[] args) {
        List<Emp> list = new JDBCDemo8().findAll();
        System.out.println(list);
        System.out.println(list.size());
    }
    public List<Emp> findAll() {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<Emp> list = null;
        try {
            //1.注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.获取连接
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db3", "root", "root");
            //3.定义sql
            String sql = "select * from emp";
            //4.获取执行sql的对象
            stmt = conn.createStatement();
            //5.执行sql
            rs = stmt.executeQuery(sql);
            //6.遍历结果集，封装对象，装载集合
            Emp emp = null;
            list = new ArrayList<Emp>();
            while (rs.next()) {
                int id = rs.getInt("id");
                String ename = rs.getString("ename");
                int job_id = rs.getInt("job_id");
                int mgr = rs.getInt("mgr");
                Date joindate = rs.getDate("joindate");
                double salary = rs.getDouble("salary");
                double bouns = rs.getDouble("bonus");
                int dept_id = rs.getInt("dept_id");
                //创建emp对象
                emp = new Emp();
                emp.setId(id);
                emp.setEname(ename);
                emp.setJob_id(job_id);
                emp.setMgr(mgr);
                emp.setJoindate(joindate);
                emp.setSalary(salary);
                emp.setBonus(bouns);
                emp.setDept_id(dept_id);

                //装载集合
                list.add(emp);
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }finally {
            if(rs != null){
                try {
                    rs.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

            if(stmt != null){
                try {
                    stmt.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
            if(conn != null){
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }

        }
        return list;
    }
}
```
			
#### 5. PreparedStatement：执行sql的对象
##### 1. SQL注入问题：在拼接sql时，有一些sql的特殊关键字参与字符串的拼接。会造成安全性问题
1. 输入用户随便，输入密码：`a' or 'a' = 'a`
2. sql：`select * from user where username = 'fhdsjkf' and password = 'a' or 'a' = 'a'` 

##### 2. 解决sql注入问题：使用PreparedStatement对象来解决
##### 3. 预编译的SQL：参数使用?作为占位符
##### 4. 步骤：
1. 导入驱动jar包 mysql-connector-java-5.1.37-bin.jar
2. 注册驱动
3. 获取数据库连接对象 `Connection`
4. 定义sql
	* 注意：sql的参数使用？作为占位符。 如：`select * from user where username = ? and password = ?;`
5. 获取执行sql语句的对象 `PreparedStatement  Connection.prepareStatement(String sql)` 
6. 给？赋值：
	* 方法： `setXxx`(参数1,参数2)
		* 参数1：？的位置编号 从1 开始
		* 参数2：？的值
7. 执行sql，接受返回结果，不需要传递sql语句
8. 处理结果
9. 释放资源

##### 5. 注意：后期都会使用PreparedStatement来完成增删改查的所有操作
1. 可以防止SQL注入
2. 效率更高

## 抽取JDBC工具类 ： JDBCUtils
* 目的：简化书写
* 分析：
	1. 注册驱动也抽取
	2. 抽取一个方法获取连接对象
		* 需求：不想传递参数（麻烦），还得保证工具类的通用性。
		* 解决：配置文件
			jdbc.properties
				url=
				user=
				password=
	3. 抽取一个方法释放资源

 代码实现：
 在jdbc.properties文件写入
 

```java
url=
user=
password=
driver=
```
---
```java
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.Properties;

public class JDBCUtil {

    private static String url;
    private static String user;
    private static String password;
    private static String driver;

    /**
     * 文件的读取，只需要读取一次即可拿到这些值。使用静态代码块
     */
    static {

        try {
            //读取资源文件，获取值

            //1，创建Properties集合类。
            Properties pro = new Properties();

            //获取src路径下的文件的方式---->ClassLoader 类加载器
            ClassLoader classLoader = JDBCUtil.class.getClassLoader();
            URL res = classLoader.getResource("jdbc.properties");
            String path = res.getPath();
            System.out.println(path);

            //2.加载文件
//            pro.load(new FileReader("src/jdbc.properties"));
            pro.load(new FileReader(path));
            //3. 获取数据，赋值
            url = pro.getProperty("url");
            user = pro.getProperty("user");
            password = pro.getProperty("password");
            driver = pro.getProperty("driver");
            //4.注册驱动
            Class.forName(driver);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }


    /**
     * 获取连接
     *
     * @return 连接对象
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

	   /**
     * 释放资源
     * @param stmt
     * @param conn
     */
    public static void close(Statement stmt,Connection conn){
        if( stmt != null){
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if( conn != null){
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 释放资源
     *
     * @param stmt
     * @param conn
     */
    public static void close(ResultSet rs, Statement stmt, Connection conn) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }

        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }
}
```

```java
import util.JDBCUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JDBCDemo8 {
    public static void main(String[] args) {
        List<Emp> list = new JDBCDemo8().findAll();
        System.out.println(list);
        System.out.println(list.size());
    }
    public List<Emp> findAll() {
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<Emp> list = null;
        try {
            conn = JDBCUtil.getConnection();
            //3.定义sql
            String sql = "select * from emp";
            //4.获取执行sql的对象
            stmt = conn.createStatement();
            //5.执行sql
            rs = stmt.executeQuery(sql);
            //6.遍历结果集，封装对象，装载集合
            Emp emp = null;
            list = new ArrayList<Emp>();
            while (rs.next()) {
                int id = rs.getInt("id");
                String ename = rs.getString("ename");
                int job_id = rs.getInt("job_id");
                int mgr = rs.getInt("mgr");
                Date joindate = rs.getDate("joindate");
                double salary = rs.getDouble("salary");
                double bouns = rs.getDouble("bonus");
                int dept_id = rs.getInt("dept_id");
                //创建emp对象
                emp = new Emp();
                emp.setId(id);
                emp.setEname(ename);
                emp.setJob_id(job_id);
                emp.setMgr(mgr);
                emp.setJoindate(joindate);
                emp.setSalary(salary);
                emp.setBonus(bouns);
                emp.setDept_id(dept_id);

                //装载集合
                list.add(emp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JDBCUtil.close(rs,stmt,conn);
        }
        return list;
    }
}
```

		
 练习：
	
* 需求：
	1. 通过键盘录入用户名和密码
	2. 判断用户是否登录成功
		* select * from user where username = "" and password = "";
		* 如果这个sql有查询结果，则成功，反之，则失败

* 步骤：
	
1. 创建数据库表 user
				

```sql
CREATE TABLE USER(
					id INT PRIMARY KEY AUTO_INCREMENT,
					username VARCHAR(32),
					PASSWORD VARCHAR(32)	
				);
				
INSERT INTO USER VALUES(NULL,'zhangsan','123');
INSERT INTO USER VALUES(NULL,'lisi','234');		

SELECT * FROM USER;					
```
2. 代码实现：

```java
public class JDBCDemo9 {

				    public static void main(String[] args) {
				        //1.键盘录入，接受用户名和密码
				        Scanner sc = new Scanner(System.in);
				        System.out.println("请输入用户名：");
				        String username = sc.nextLine();
				        System.out.println("请输入密码：");
				        String password = sc.nextLine();
				        //2.调用方法
				        boolean flag = new JDBCDemo9().login(username, password);
				        //3.判断结果，输出不同语句
				        if(flag){
				            //登录成功
				            System.out.println("登录成功！");
				        }else{
				            System.out.println("用户名或密码错误！");
				        }
				
				
				    }
				
				
				
				    /**
				     * 登录方法
				     */
				    public boolean login(String username ,String password){
				        if(username == null || password == null){
				            return false;
				        }
				        //连接数据库判断是否登录成功
				        Connection conn = null;
				        Statement stmt =  null;
				        ResultSet rs = null;
				        //1.获取连接
				        try {
				            conn =  JDBCUtils.getConnection();
				            //2.定义sql
				            String sql = "select * from user where username = '"+username+"' and password = '"+password+"' ";
				            //3.获取执行sql的对象
				            stmt = conn.createStatement();
				            //4.执行查询
				            rs = stmt.executeQuery(sql);
				            //5.判断
				           /* if(rs.next()){//如果有下一行，则返回true
				                return true;
				            }else{
				                return false;
				            }*/
				           return rs.next();//如果有下一行，则返回true
				
				        } catch (SQLException e) {
				            e.printStackTrace();
				        }finally {
				            JDBCUtils.close(rs,stmt,conn);
				        }
				
				
				        return false;
				    }
				}


```

```java
import util.JDBCUtil;

import java.sql.*;
import java.util.Scanner;

/**
 * 练习
 *      *需求：
 *          1.通过键盘录入用户名和密码
 *          2. 判断用户是否登录成功
 */
public class JDBCDemo9 {

    public static void main(String[] args) {
        //1.键盘录入，接收用户名和密码
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名:");
        String username = sc.nextLine();
        System.out.println("请输入密码:");
        String password = sc.nextLine();
        // 2.调用方法
        boolean flag = new JDBCDemo9().login2(username, password);
        //3. 判断结果，输出不同语句
        if(flag){
            //登录成功
            System.out.println("登录成功！");
        }else {
            System.out.println("用户名或密码错误！");
        }
    }
    /**
     * 登录方法
     */
    public boolean login(String username, String password){
        if(username == null || password ==null){
            return false;
        }
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        //连接数据库判断是否登录成功
        try {
            //1.获取连接
            conn = JDBCUtil.getConnection();
            //2.定义sql
            String sql = "select * from user where username = '"+username+"' + and password = '"+password+"' ";
            //3.获取执行sql的对象
            stmt = conn.createStatement();
            //4.执行查询
            rs = stmt.executeQuery(sql);
            //5.判断
//            if(rs.next()){//如果有下一行，则返回true
//                return true;
//            }else{
//                return false;
//            }
            return rs.next();//如果有下一行，则返回true
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            JDBCUtil.close(rs,stmt,conn);
        }

        return false;
    }


    /**
     * 登录方法,使用PreparedStatement实现
     */
    public boolean login2(String username ,String password){
        if(username == null || password == null){
            return false;
        }
        //连接数据库判断是否登录成功
        Connection conn = null;
        PreparedStatement pstmt =  null;
        ResultSet rs = null;
        //1.获取连接
        try {
            conn =  JDBCUtil.getConnection();
            //2.定义sql   ？代表参数
            String sql = "select * from user where username = ? and password = ?";
            //3.获取执行sql的对象
            pstmt = conn.prepareStatement(sql);
            //给?赋值
            pstmt.setString(1,username);
            pstmt.setString(2,password);
            //4.执行查询,不需要传递sql
            rs = pstmt.executeQuery();
            //5.判断
           /* if(rs.next()){//如果有下一行，则返回true
                return true;
            }else{
                return false;
            }*/
            return rs.next();//如果有下一行，则返回true

        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JDBCUtil.close(rs,pstmt,conn);
        }
        return false;
    }
}
```
		
## JDBC控制事务：
1. 事务：一个包含多个步骤的业务操作。如果这个业务操作被事务管理，则这多个步骤要么同时成功，要么同时失败。
2. 操作：
	1. 开启事务
	2. 提交事务
	3. 回滚事务
3. 使用Connection对象来管理事务
	* 开启事务：setAutoCommit(boolean autoCommit) ：调用该方法设置参数为false，即开启事务
		* 在执行sql之前开启事务
	* 提交事务：commit() 
		* 当所有sql都执行完提交事务
	* 回滚事务：rollback() 
		* 在catch中回滚事务

4. 代码：

```java
public class JDBCDemo10 {

		    public static void main(String[] args) {
		        Connection conn = null;
		        PreparedStatement pstmt1 = null;
		        PreparedStatement pstmt2 = null;
		
		        try {
		            //1.获取连接
		            conn = JDBCUtils.getConnection();
		            //开启事务
		            conn.setAutoCommit(false);
		
		            //2.定义sql
		            //2.1 张三 - 500
		            String sql1 = "update account set balance = balance - ? where id = ?";
		            //2.2 李四 + 500
		            String sql2 = "update account set balance = balance + ? where id = ?";
		            //3.获取执行sql对象
		            pstmt1 = conn.prepareStatement(sql1);
		            pstmt2 = conn.prepareStatement(sql2);
		            //4. 设置参数
		            pstmt1.setDouble(1,500);
		            pstmt1.setInt(2,1);
		
		            pstmt2.setDouble(1,500);
		            pstmt2.setInt(2,2);
		            //5.执行sql
		            pstmt1.executeUpdate();
		            // 手动制造异常
		            int i = 3/0;
		
		            pstmt2.executeUpdate();
		            //提交事务
		            conn.commit();
		        } catch (Exception e) {
		            //事务回滚
		            try {
		                if(conn != null) {
		                    conn.rollback();
		                }
		            } catch (SQLException e1) {
		                e1.printStackTrace();
		            }
		            e.printStackTrace();
		        }finally {
		            JDBCUtils.close(pstmt1,conn);
		            JDBCUtils.close(pstmt2,null);
		        }
		
		
		    }
		
		}
```

```java
import util.JDBCUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * 事务操作
 */
public class JDBCDemo10 {


    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pstmt1 = null;
        PreparedStatement pstmt2 = null;

        try {
            //1.获取连接
            conn = JDBCUtils.getConnection();
            //开启事务
            conn.setAutoCommit(false);

            //2.定义sql
            //2.1 张三 - 500
            String sql1 = "update account set balance = balance - ? where id = ?";
            //2.2 李四 + 500
            String sql2 = "update account set balance = balance + ? where id = ?";
            //3.获取执行sql对象
            pstmt1 = conn.prepareStatement(sql1);
            pstmt2 = conn.prepareStatement(sql2);
            //4. 设置参数
            pstmt1.setDouble(1,500);
            pstmt1.setInt(2,1);

            pstmt2.setDouble(1,500);
            pstmt2.setInt(2,2);
            //5.执行sql
            pstmt1.executeUpdate();
            // 手动制造异常
            int i = 3/0;

            pstmt2.executeUpdate();
            //提交事务
            conn.commit();
        } catch (Exception e) {
            //事务回滚
            try {
                if(conn != null) {
                    conn.rollback();
                }
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }finally {
            JDBCUtils.close(pstmt1,conn);
            JDBCUtils.close(pstmt2,null);
        }


    }

}
```
		
## 数据库连接池
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210202102317981.bmp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NsaWVuY2VfbWU=,size_16,color_FFFFFF,t_70)

### 1. 概念：其实就是一个容器(集合)，存放数据库连接的容器。
   当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完之后，会将连接对象归还给容器。

### 2. 好处：
1. 节约资源
2. 用户访问高效

### 3. 实现：
#### 1. 标准接口：DataSource   javax.sql包下的
1. 方法：
	* 获取连接：`getConnection()`
	* 归还连接：`Connection.close()`。如果连接对象Connection是从连接池中获取的，那么调用`Connection.close()`方法，则不会再关闭连接了。而是归还连接

#### 2. 一般我们不去实现它，有数据库厂商来实现
1. `C3P0`：数据库连接池技术
2. `Druid`：数据库连接池实现技术，由阿里巴巴提供的


### 4. C3P0：数据库连接池技术
####  步骤：
1. `导入jar包 (两个) c3p0-0.9.5.2.jar mchange-commons-java-0.2.12.jar ，`
	* 不要忘记导入数据库驱动jar包
2. 定义配置文件：
	* 名称： `c3p0.properties` 或者 `c3p0-config.xml`
	* 路径：直接将文件放在src目录下即可。

3. 创建核心对象 数据库连接池对象 `ComboPooledDataSource`
4. 获取连接： `getConnection`
####  代码：

```java
 	//1.创建数据库连接池对象
      DataSource ds  = new ComboPooledDataSource();
      //2. 获取连接对象
      Connection conn = ds.getConnection();
```

```xml
<c3p0-config>
  <!-- 使用默认的配置读取连接池对象 -->
  <default-config>
  	<!--  连接参数 -->
    <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/db4</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <!--初始化申请的连接数量-->
    <property name="initialPoolSize">5</property>
    <!--最大的连接数量-->
    <property name="maxPoolSize">10</property>
    <!--超时时间-->
    <property name="checkoutTimeout">3000</property>
  </default-config>

  <named-config name="otherc3p0"> 
    <!--  连接参数 -->
    <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/db3</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <property name="initialPoolSize">5</property>
    <property name="maxPoolSize">8</property>
    <property name="checkoutTimeout">1000</property>
  </named-config>
</c3p0-config>
```

### 5. Druid：数据库连接池实现技术，由阿里巴巴提供的
#### 1. 步骤：
1. 导入jar包 `druid-1.0.9.jar`
2. 定义配置文件：
	* 是`properties`形式的
	* 可以叫任意名称，可以放在任意目录下
3. 加载配置文件。`Properties`
4. 获取数据库连接池对象：通过工厂类来获取  `DruidDataSourceFactory`
5. 获取连接：`getConnection`
####  代码：
 

```java
//3.加载配置文件
Properties pro = new Properties();
InputStream is = DruidDemo.class.getClassLoader().getResourceAsStream("druid.properties");
pro.load(is);
//4.获取连接池对象
DataSource ds = DruidDataSourceFactory.createDataSource(pro);
//5.获取连接
Connection conn = ds.getConnection();
```

#### 2. 定义工具类
1. 定义一个类 `JDBCUtils`
2. 提供静态代码块加载配置文件，初始化连接池对象
3. 提供方法
	1. 获取连接方法：通过数据库连接池获取连接
	2. 释放资源
	3. 获取连接池的方法


* 代码：

```java
public class JDBCUtils {

    //1.定义成员变量 DataSource
    private static DataSource ds ;

    static{
        try {
            //1.加载配置文件
            Properties pro = new Properties();
            pro.load(JDBCUtils.class.getClassLoader().getResourceAsStream("druid.properties"));
            //2.获取DataSource
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取连接
     */
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    /**
     * 释放资源
     */
    public static void close(Statement stmt,Connection conn){
       /* if(stmt != null){
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(conn != null){
            try {
                conn.close();//归还连接
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }*/

       close(null,stmt,conn);
    }


    public static void close(ResultSet rs , Statement stmt, Connection conn){


        if(rs != null){
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }


        if(stmt != null){
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(conn != null){
            try {
                conn.close();//归还连接
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取连接池方法
     */

    public static DataSource getDataSource(){
        return  ds;
    }

}
```

```java
import utils.JDBCUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 使用新的工具类
 */
public class DruidDemo2 {

    public static void main(String[] args) {
        /*
         * 完成添加操作：给account表添加一条记录
         */
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            //1.获取连接
            conn = JDBCUtils.getConnection();
            //2.定义sql
            String sql = "insert into account values(null,?,?)";
            //3.获取pstmt对象
            pstmt = conn.prepareStatement(sql);
            //4.给？赋值
            pstmt.setString(1,"王五");
            pstmt.setDouble(2,3000);
            //5.执行sql
            int count = pstmt.executeUpdate();
            System.out.println(count);
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            //6. 释放资源
            JDBCUtils.close(pstmt,conn);
        }
    }

}
```

## Spring JDBC
Spring框架对JDBC的简单封装。提供了一个`JDBCTemplate`对象简化`JDBC`的开发
###  步骤：
#### 1. 导入jar包
#### 2. 创建`JdbcTemplate`对象。依赖于数据源`DataSource`
* `JdbcTemplate template = new JdbcTemplate(ds);`

#### 3. 调用`JdbcTemplate`的方法来完成CRUD的操作
* `update()`:执行DML语句。增、删、改语句
* `queryForMap()`:查询结果将结果集封装为`map`集合，将列名作为`key`，将值作为`value` 将这条记录封装为一个`map`集合
	* 注意：这个方法查询的结果集长度只能是1
* `queryForList()`:查询结果将结果集封装为`list`集合
	* 注意：将每一条记录封装为一个`Map`集合，再将`Map`集合装载到`List`集合中
* `query()`:查询结果，将结果封装为`JavaBean`对象
	* `query`的参数：`RowMapper`
		* 一般我们使用`BeanPropertyRowMapper`实现类。可以完成数据到`JavaBean`的自动封装
		* `new BeanPropertyRowMapper<类型>(类型.class)`
* `queryForObject`：查询结果，将结果封装为对象
	* 一般用于聚合函数的查询


```java
import cn.itcast.utils.JDBCUtils;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * JdbcTemplate入门
 */
public class JdbcTemplateDemo1 {

    public static void main(String[] args) {
        //1.导入jar包
        //2.创建JDBCTemplate对象
        JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());
        //3.调用方法
        String sql = "update account set balance = 5000 where id = ?";
        int count = template.update(sql, 3);
        System.out.println(count);
    }
}
```

#### 4. 练习：
* 需求：
	1. 修改1号数据的 salary 为 10000
	2. 添加一条记录
	3. 删除刚才添加的记录
	4. 查询id为1的记录，将其封装为Map集合
	5. 查询所有记录，将其封装为List
	6. 查询所有记录，将其封装为Emp对象的List集合
	7. 查询总记录数

代码：

导入emp

```java
import java.util.Date;

public class Emp {
    private Integer id;
    private String ename;
    private Integer job_id;
    private Integer mgr;
    private Date joindate;
    private Double salary;
    private Double bonus;
    private Integer dept_id;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    public Integer getMgr() {
        return mgr;
    }

    public void setMgr(Integer mgr) {
        this.mgr = mgr;
    }

    public Date getJoindate() {
        return joindate;
    }

    public void setJoindate(Date joindate) {
        this.joindate = joindate;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setBonus(Double bonus) {
        this.bonus = bonus;
    }

    public Integer getDept_id() {
        return dept_id;
    }

    public void setDept_id(Integer dept_id) {
        this.dept_id = dept_id;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "id=" + id +
                ", ename='" + ename + '\'' +
                ", job_id=" + job_id +
                ", mgr=" + mgr +
                ", joindate=" + joindate +
                ", salary=" + salary +
                ", bonus=" + bonus +
                ", dept_id=" + dept_id +
                '}';
    }
}
```

```java
import domain.Emp;
	import utils.JDBCUtils;
	import org.junit.Test;
	import org.springframework.jdbc.core.BeanPropertyRowMapper;
	import org.springframework.jdbc.core.JdbcTemplate;
	import org.springframework.jdbc.core.RowMapper;
	
	import java.sql.Date;
	import java.sql.ResultSet;
	import java.sql.SQLException;
	import java.util.List;
	import java.util.Map;
	
	public class JdbcTemplateDemo2 {
	
	    //Junit单元测试，可以让方法独立执行
	
	
	    //1. 获取JDBCTemplate对象
	    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());
	    /**
	     * 1. 修改1号数据的 salary 为 10000
	     */
	    @Test
	    public void test1(){
	
	        //2. 定义sql
	        String sql = "update emp set salary = 10000 where id = 1001";
	        //3. 执行sql
	        int count = template.update(sql);
	        System.out.println(count);
	    }
	
	    /**
	     * 2. 添加一条记录
	     */
	    @Test
	    public void test2(){
	        String sql = "insert into emp(id,ename,dept_id) values(?,?,?)";
	        int count = template.update(sql, 1015, "郭靖", 10);
	        System.out.println(count);
	
	    }
	
	    /**
	     * 3.删除刚才添加的记录
	     */
	    @Test
	    public void test3(){
	        String sql = "delete from emp where id = ?";
	        int count = template.update(sql, 1015);
	        System.out.println(count);
	    }
	
	    /**
	     * 4.查询id为1001的记录，将其封装为Map集合
	     * 注意：这个方法查询的结果集长度只能是1
	     */
	    @Test
	    public void test4(){
	        String sql = "select * from emp where id = ? or id = ?";
	        Map<String, Object> map = template.queryForMap(sql, 1001,1002);
	        System.out.println(map);
	        //{id=1001, ename=孙悟空, job_id=4, mgr=1004, joindate=2000-12-17, salary=10000.00, bonus=null, dept_id=20}
	
	    }
	
	    /**
	     * 5. 查询所有记录，将其封装为List
	     */
	    @Test
	    public void test5(){
	        String sql = "select * from emp";
	        List<Map<String, Object>> list = template.queryForList(sql);
	
	        for (Map<String, Object> stringObjectMap : list) {
	            System.out.println(stringObjectMap);
	        }
	    }
	
	    /**
	     * 6. 查询所有记录，将其封装为Emp对象的List集合
	     */
	
	    @Test
	    public void test6(){
	        String sql = "select * from emp";
	        List<Emp> list = template.query(sql, new RowMapper<Emp>() {
	
	            @Override
	            public Emp mapRow(ResultSet rs, int i) throws SQLException {
	                Emp emp = new Emp();
	                int id = rs.getInt("id");
	                String ename = rs.getString("ename");
	                int job_id = rs.getInt("job_id");
	                int mgr = rs.getInt("mgr");
	                Date joindate = rs.getDate("joindate");
	                double salary = rs.getDouble("salary");
	                double bonus = rs.getDouble("bonus");
	                int dept_id = rs.getInt("dept_id");
	
	                emp.setId(id);
	                emp.setEname(ename);
	                emp.setJob_id(job_id);
	                emp.setMgr(mgr);
	                emp.setJoindate(joindate);
	                emp.setSalary(salary);
	                emp.setBonus(bonus);
	                emp.setDept_id(dept_id);
	
	                return emp;
	            }
	        });
	
	
	        for (Emp emp : list) {
	            System.out.println(emp);
	        }
	    }
	
	    /**
	     * 6. 查询所有记录，将其封装为Emp对象的List集合
	     */
	
	    @Test
	    public void test6_2(){
	        String sql = "select * from emp";
	        List<Emp> list = template.query(sql, new BeanPropertyRowMapper<Emp>(Emp.class));
	        for (Emp emp : list) {
	            System.out.println(emp);
	        }
	    }
	
	    /**
	     * 7. 查询总记录数
	     */
	
	    @Test
	    public void test7(){
	        String sql = "select count(id) from emp";
	        Long total = template.queryForObject(sql, Long.class);
	        System.out.println(total);
	    }
	
	}

```

				
				
