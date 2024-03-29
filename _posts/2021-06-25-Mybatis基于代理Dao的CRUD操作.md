---
layout: post
title: Java｜Mybatis基于代理Dao的CRUD操作
categories: [Java]
description: Mybatis基于代理Dao的CRUD操作
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

# 代码架构
![Alt Text](/images/posts/20210625114540639.png)
# java
## xyz.slienceme.dao.IUserDao

```java
package xyz.slienceme.dao;

import xyz.slienceme.domain.QueryVo;
import xyz.slienceme.domain.User;

import java.util.List;
public interface IUserDao {

    /**
     * 查询所有用户
     * @return
     */
    List<User> findAll();

    /**
     * 保存用户
     * @param user
     */
    void saveUser(User user);

    /**
     * 更新用户
     * @param user
     */
    void updateUser(User user);

    /**
     * 根据id删除用户
     * @param userId
     */
    void deleteUser(Integer userId);

    /**
     * 根据id查询用户信息
     * @param userId
     * @return
     */
    User findById(Integer userId);

    /**
     * 根据名称模糊查询用户信息
     * @param username
     * @return
     */
    List<User> findByName(String username);

    /**
     * 查询总用户数
     * @return
     */
    int findTotal();

    /**
     * 根据Queryvo中的条件查询用户
     * @param vo
     * @return
     */
    List<User> findUserByVo(QueryVo vo);
}

```
## xyz.slienceme.domain.User

```java
package xyz.slienceme.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

public class User implements Serializable {

    private Integer id;
    private String username;
    private String address;
    private String sex;
    private LocalDateTime birthday;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDateTime birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", address='" + address + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday=" + birthday +
                '}';
    }
}

```
## xyz.slienceme.domain.QueryVo

```java
package xyz.slienceme.domain;
public class QueryVo {
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

```
# resources
## xyz.slienceme.dao.IUserDao.xml
- 针对数据库字段与成员属性名不一致的解决办法有两种
	- 方法一：直接修改sql语句 `select id as userId,username as userName,address as userAddress,sex as userSex,birthday as userBirthday from user;`利用id as userId方法,在查询过程修改，这种好处是执行效率快，后期修改维护繁琐。
	- 方法二：采用如下列代码`resultMap`的方法，配置 查询结果的列名和实体类的属性名的对应关系，然后采用 `resultMap="userMap"` 的方式，解决问题，这种方法效率相较前一种慢，但是可操作性强，便于后期修改维护。
  
 ---

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="xyz.slienceme.dao.IUserDao">

    <!--    配置 查询结果的列名和实体类的属性名的对应关系-->
    <resultMap id="userMap" type="xyz.slienceme.domain.User">
        <!--   主键字段的对应     -->
        <id property="userId" column="id"/>
        <!--   非主键字段的对应     -->
        <result property="userName" column="username"/>
        <result property="userAddress" column="address"/>
        <result property="userSex" column="sex"/>
        <result property="userBirthday" column="birthday"/>
    </resultMap>

    <!--  查询所有操作  -->
<!--    <select id="findAll" resultType="xyz.slienceme.domain.User">-->
<!--    修改后，数据库字段与类名不同-->
    <select id="findAll" resultMap="userMap">
        select * from user;
    </select>
    <!--    保存用户-->
    <insert id="saveUser" parameterType="xyz.slienceme.domain.User">
    <!-- 配置插入操作后，获取插入数据的id-->
        <selectKey keyProperty="id" keyColumn="id" resultType="int" order="AFTER">
            select last_insert_id();
        </selectKey>
        insert into user(username,address,sex,birthday)values(#{username},#{address},#{sex},#{birthday});
    </insert>
    <!--    更新用户-->
    <update id="updateUser" parameterType="xyz.slienceme.domain.User">
        update user set username=#{username},address=#{address},sex=#{sex},birthday=#{birthday} where id=#{id};
    </update>
    <!--    删除用户-->
    <delete id="deleteUser" parameterType="java.lang.Integer">
        delete from user where id=#{uid};
    </delete>
    <!--根据id查询用户 -->
    <select id="findById" parameterType="INT" resultType="xyz.slienceme.domain.User">
        select * from user where id=#{uid};
    </select>
    <!--根据名称模糊查询用户信息 -->
    <select id="findByName" parameterType="string" resultType="xyz.slienceme.domain.User">
--         select * from user where username like #{name};
        select * from user where username like '%${value}%';
    </select>
    <!--获取用户的总记录条数 -->
    <select id="findTotal" resultType="int">
        select count(id) from user;
    </select>
    <!--根据Queryvo中的条件查询用户-->
    <select id="findUserByVo" parameterType="xyz.slienceme.domain.QueryVo" resultType="xyz.slienceme.domain.User">
        select * from user where username like #{user.username};
    </select>
</mapper>
```
---

-    根据`Queryvo`中的条件查询用户
		- `OGNL`表达式：`Object Graphic Navigation Language` 对象	图	导航	   语言
		- 它是通过对象的取值方法来获取数据。在写法上把get给省略了。
		- 比如：我们获取用户的名称
			- 类中的写法：`user.getUsername();`
			- `OGNL`表达式写法：`user.username`
		- `mybatis`中为什么能直接写`username`,而不用`user`.呢：
			- 因为在`parameterType`中已经提供了属性所属的类，所以此时不需要写对象名 

```java
package xyz.slienceme.domain;
public class QueryVo {
    private User user;
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}
```
- 上边源代码部分截取片段
```xml
<!--根据Queryvo中的条件查询用户-->
    <select id="findUserByVo" parameterType="xyz.slienceme.domain.QueryVo" resultType="xyz.slienceme.domain.User">
        select * from user where username like #{user.username};
    </select>
```
- 完整的SqlMapConfig.xml代码
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--  配置环境  -->
    <environments default="mysql">
        <environment id="mysql">
            <!--   配置事务    -->
            <transactionManager type="JDBC"/>
            <!--    配置连接池        -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/eesy_mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>
    <!-- 映射文件位置-->
    <mappers>
        <mapper resource="xyz/slienceme/dao/IUserDao.xml"></mapper>
    </mappers>
</configuration>

```
# test
## xyz.slienceme.test.MybatisTest
- 这里简单提及一下模糊查询，两个注解的使用

```java
package xyz.slienceme.test;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import xyz.slienceme.dao.IUserDao;
import xyz.slienceme.domain.QueryVo;
import xyz.slienceme.domain.User;
import java.io.InputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
public class MybatisTest {

    private InputStream in;
    private SqlSession sqlSession;
    private IUserDao userDao;

    @Before
    public void init() throws Exception{
        //1.读取配置文件，生成字节输入流
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2.获取SqlSessionFactory
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        //3.获取SqlSession对象
        sqlSession = factory.openSession();
        //4.获取dao的代理对象
        userDao = sqlSession.getMapper(IUserDao.class);
    }

    @After
    public void destroy() throws Exception{
        //提交事务
        sqlSession.commit();
        //6.释放资源
        sqlSession.close();
        in.close();
    }

    /**
     * 测试查询所有
     */
    @Test
    public void testFindAll(){
        //5.执行查询所有方法
        List<User> users = userDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * 测试保存操作
     * @throws Exception
     */
    @Test
    public void testSave() throws Exception{
        User user = new User();
        user.setUsername("mybatis last insert");
//        user.setUsername("mybatis saveuser");
        user.setAddress("北京市顺义区");
        user.setSex("男");

        Date date = new Date();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());

        user.setBirthday(localDateTime);
        System.out.println("保存操作之前："+user);
        //5.执行保存方法
        userDao.saveUser(user);
        System.out.println("保存操作之后："+user);
    }

    /**
     * 测试更新操作
     * @throws Exception
     */
    @Test
    public void testUpdate() throws Exception{
        User user = new User();
        user.setId(50);
        user.setUsername("mybatis update");
        user.setAddress("北京市顺义区");
        user.setSex("女");

        Date date = new Date();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());

        user.setBirthday(localDateTime);
        //5.执行保存方法
        userDao.updateUser(user);
    }

    /**
     * 测试删除操作
     * @throws Exception
     */
    @Test
    public void testDelete(){
        userDao.deleteUser(50);
    }

    /**
     * 测试通过id查询操作
     * @throws Exception
     */
    @Test
    public void testFindOne(){
        User user = userDao.findById(48);
        System.out.println(user);
    }

    /**
     * 测试模糊查询操作
     * @throws Exception
     */
    @Test
    public void testFindByName(){
//        List<User> users = userDao.findByName("%王%");
        List<User> users = userDao.findByName("王");
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * 测试查询用户的总记录条数
     * @throws Exception
     */
    @Test
    public void testFindTotal(){
        int count = userDao.findTotal();
        System.out.println(count);
    }

    /**
     * 测试使用Queryvo作为条件
     * @throws Exception
     */
    @Test
    public void testFindByVo(){
        QueryVo vo = new QueryVo();
        User user = new User();
        user.setUsername("%王%");
        vo.setUser(user);
//        List<User> users = userDao.findByName("%王%");
        List<User> users = userDao.findUserByVo(vo);
        for (User u : users) {
            System.out.println(u);
        }
    }
}

```

