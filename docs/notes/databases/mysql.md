# MySQL

## 0. 官网

- [MySQL官网](https://www.mysql.com/)
- [菜鸟教程MySQL](https://www.runoob.com/mysql/mysql-tutorial.html)

## 1. SQL

`DDL(Data Definition Language)`数据定义语言：用来定义数据库对象：数据库，表，列表

`DML(Data Manipulation Language)`数据操纵语言：用来对数据库中的数据进行增删改

`DQL(Data Query Language)`数据查询语言：用来查询数据库中标的记录（数据）

`DCL(Data Control Language)`数据控制语言(了解)：用来定义数据库的访问权限和安全级别，及创建用户。
![Alt Text](/images/20210129201353404.bmp.jpg)

## 2. DDL:操作数据库、表

### 2.1 操作数据库：CRUD

::: code-group

```sql [C (Create)：创建]
-- 创建数据库
create database 数据库名称;

-- 创建数据库，判断不存在，再创建
create database if not exists 数据库名称;

-- 创建数据库，并指定字符集
create database 数据库名称 character set 字符集名;

-- 常用，创建数据库并指定字符集为utf8mb4
create database if not exists 数据库名称 character set utf8mb4;

-- 创建数据库并指定字符集与排序规则
create database if not exists 数据库名称 character set utf8mb4 collate utf8mb4_unicode_ci;
```

```sql [R (Retrieve)：查询]
-- 查询所有数据库的名称
show databases;

-- 查询某个数据库的字符集: 查询某个数据库的创建语句
show create database 数据库名称;

-- 查询数据库的默认字符集
select default_character_set_name from information_schema.schemata where schema_name = '数据库名称';

-- 查询数据库的所有表
show tables from 数据库名称;
```

```sql [U (Update)：修改]
-- 修改数据库的字符集
alter database 数据库名称 character set 字符集名称;

-- 修改数据库的字符集与排序规则
alter database 数据库名称 character set utf8mb4 collate utf8mb4_unicode_ci;
```

```sql [D (Delete)：删除]
-- 删除数据库
drop database 数据库名称;

-- 判断数据库存在，存在再删除
drop database if exists 数据库名称;

-- 强制删除数据库 (删除时不需要判断数据库是否存在)
drop database if exists 数据库名称 cascade;
```

```sql [使用]
-- 查询当前正在使用的数据库名称
select database();

-- 使用数据库
use 数据库名称;

-- 切换到另一个数据库
use 另一个数据库名称;
```
:::


### 2.2 操作表


::: code-group

```sql [C (Create)：创建]
-- 语法
create table 表名
(
  列名1 数据类型1,
  列名2 数据类型2, 
  . . . 
  列名n 数据类型n
);

-- 注意：最后一列，不需要加逗号（,）

-- 数据类型：
--  1. int：整数类型
--     age int,
--  2. double：小数类型
--     score double(5,2)
--  3. date：日期类型，仅包含年月日，格式为 yyyy-MM-dd
--     birth_date date
--  4. datetime：日期类型，包含年月日时分秒，格式为 yyyy-MM-dd HH:mm:ss
--     join_time datetime
--  5. timestamp：时间戳类型，包含年月日时分秒，格式为 yyyy-MM-dd HH:mm:ss
--     created_at timestamp
--     如果没有给字段赋值或赋值为 null，默认使用当前系统时间自动赋值。
--  6. varchar：字符串类型，指定最大字符长度
--     name varchar(20)  -- 姓名最多20个字符
--     zhangsan（8个字符）张三（2个字符）

--  创建表
create table student
(
  id          int,
  name        varchar(32),
  age         int,
  score       double(4, 1),
  birthday    date,
  insert_time timestamp
);

--  复制表
create table 新表名 like 被复制的表名;
```

```sql [R (Retrieve)：查询]
--  查询某个数据库中所有的表名称
show tables;

--  查询表结构
desc 表名;
```

```sql [U (Update)：修改]
--  修改表名
alter table 表名 rename to 新的表名;

--  修改表的字符集
alter table 表名 character set 字符集名称;

--  添加一列
alter table 表名 add 列名 数据类型;

--  修改列名称和类型
alter table 表名 change 列名 新列名 新数据类型;
alter table 表名 modify 列名 新数据类型;

--  删除列
alter table 表名 drop 列名;
```

```sql [D (Delete)：删除]
--  删除表
drop table 表名;

--  判断表是否存在，存在则删除
drop table if exists 表名;
```

:::


## 3. DML：增删改表中数据

::: code-group

```sql [添加数据]
--  语法
insert into 表名(列名1,列名2,...列名n) values(值1,值2,...值n);

--  注意：
--  1. 列名和值要一一对应。
--  2. 如果表名后，不定义列名，则默认给所有列添加值
insert into 表名 values(值1,值2,...值n);

--  3. 除了数字类型，其他类型需要使用引号(单双都可以)引起来
insert into student (id, name, age) values (1, '张三', 20);
insert into student values (2, '李四', 22, 85.5, '2002-03-15', '2025-03-27 12:00:00');
```

```sql [删除数据]
--  语法
delete from 表名 [where 条件];

--  注意：
--  1. 如果不加条件，则删除表中所有记录。
delete from student;

--  2. 如果要删除所有记录：
--    1. delete from 表名; -- 不推荐使用。有多少条记录就会执行多少次删除操作
delete from student;

--    2. TRUNCATE TABLE 表名; -- 推荐使用，效率更高，先删除表，然后再创建一张一样的表。
TRUNCATE TABLE student;
```

```sql [修改数据]
--  语法
update 表名 set 列名1 = 值1, 列名2 = 值2,... [where 条件];

--  注意：
--  1. 如果不加任何条件，则会将表中所有记录全部修改。
update student set age = 25 where id = 1;

--  2. 更新所有记录（注意：这样会修改表中的所有记录）
update student set age = 30;
```

::: 

明白了！我会将内容整理成一个清晰的代码块。以下是优化后的版本：

## 4. DQL：查询表中的记录

### 4.1 查询所有记录

```sql
SELECT * FROM 表名;

-- 1. 语法：
-- SELECT: 字段列表
-- FROM: 表名
-- WHERE: 条件列表
-- GROUP BY: 分组字段
-- HAVING: 分组后的条件
-- ORDER BY: 排序
-- LIMIT: 分页限制
```

### 4.2 基础查询

```sql
-- 1. 多个字段的查询
SELECT 字段名1, 字段名2, ... FROM 表名;

-- 如果查询所有字段，可以使用 * 替代字段列表
SELECT * FROM 表名;

-- 2. 去除重复的结果集
SELECT DISTINCT address FROM student2;
SELECT DISTINCT NAME, address FROM student2;

-- 3. 计算列
SELECT NAME, math, english, math + english AS total_score FROM student2;

-- 4. 处理 NULL 值
SELECT NAME, math, english, math + IFNULL(english, 0) AS total_score FROM student2;

-- 5. 起别名
SELECT NAME, math, english, math + IFNULL(english, 0) AS 总分 FROM student2;
SELECT NAME, math AS 数学, english AS 英语, math + IFNULL(english, 0) AS 总分 FROM student2;
```

### 4.3 条件查询

```sql
-- 1. where 子句后跟条件
SELECT * FROM student WHERE age > 20;
SELECT * FROM student WHERE age = 20;
SELECT * FROM student WHERE age != 20;
SELECT * FROM student WHERE age <> 20;

-- 2. 范围查询
SELECT * FROM student WHERE age BETWEEN 20 AND 30;

-- 3. 集合查询
SELECT * FROM student WHERE age IN (22, 18, 25);

-- 4. 空值判断
SELECT * FROM student WHERE english IS NULL;
SELECT * FROM student WHERE english IS NOT NULL;

-- 5. 模糊查询
-- 姓名以"马"开头
SELECT * FROM student WHERE NAME LIKE '马%';

-- 姓名第二个字是"化"
SELECT * FROM student WHERE NAME LIKE "_化%";

-- 姓名是3个字
SELECT * FROM student WHERE NAME LIKE '___';

-- 姓名中包含"德"
SELECT * FROM student WHERE NAME LIKE '%德%';
```

### 4.4 排序查询

```sql
-- 语法：order by 子句
-- order by 排序字段1 排序方式1, 排序字段2 排序方式2, ...

-- 排序方式：
-- ASC：升序（默认）
-- DESC：降序

-- 示例：根据年龄升序排列
SELECT * FROM student ORDER BY age ASC;

-- 示例：根据成绩降序排列
SELECT * FROM student ORDER BY score DESC;

-- 示例：根据性别升序、年龄降序排列
SELECT * FROM student ORDER BY sex ASC, age DESC;
```

### 4.5 聚合函数

```sql
-- 聚合函数：将一列数据作为一个整体，进行纵向计算

-- 1. COUNT：计算个数
SELECT COUNT(*) FROM student;  -- 计算所有学生数量

-- 2. MAX：计算最大值
SELECT MAX(score) FROM student;  -- 查询最高分

-- 3. MIN：计算最小值
SELECT MIN(score) FROM student;  -- 查询最低分

-- 4. SUM：计算和
SELECT SUM(score) FROM student;  -- 计算所有学生成绩的总和

-- 5. AVG：计算平均值
SELECT AVG(score) FROM student;  -- 计算所有学生的平均成绩

-- 聚合函数排除 null 值
SELECT COUNT(*) FROM student WHERE score IS NOT NULL;
SELECT SUM(IFNULL(score, 0)) FROM student;
```

### 4.6 分组查询

```sql
-- 语法：group by 分组字段;
SELECT sex, AVG(score) FROM student GROUP BY sex;

-- 按照性别分组，查询男、女同学的平均分和人数
SELECT sex, AVG(score), COUNT(id) FROM student GROUP BY sex;

-- 分数大于70的学生，按照性别分组查询平均分和人数
SELECT sex, AVG(score), COUNT(id) FROM student WHERE score > 70 GROUP BY sex;

-- 分组之后，人数大于2人的学生，按照性别分组查询
SELECT sex, AVG(score), COUNT(id) FROM student WHERE score > 70 GROUP BY sex HAVING COUNT(id) > 2;

-- 通过别名对分组结果命名
SELECT sex, AVG(score) AS 平均分, COUNT(id) AS 人数 FROM student GROUP BY sex;
```

### 4.7 分页查询

```sql
-- 语法：LIMIT 开始的索引, 每页查询的条数;
-- 公式：开始的索引 = (当前页码 - 1) * 每页显示的条数

-- 每页显示3条记录
SELECT * FROM student LIMIT 0, 3;  -- 第1页
SELECT * FROM student LIMIT 3, 3;  -- 第2页
SELECT * FROM student LIMIT 6, 3;  -- 第3页

-- LIMIT 是 MySQL "方言"，用于分页查询
```

### 4.8 多表查询

```sql
-- 内连接查询：

-- 1. 隐式内连接
-- 查询所有员工信息和对应的部门信息
SELECT * 
FROM emp, dept 
WHERE emp.dept_id = dept.id;

-- 2. 显式内连接
SELECT * 
FROM emp
INNER JOIN dept ON emp.dept_id = dept.id;

-- 外连接查询：

-- 1. 左外连接
-- 查询所有员工信息及其部门信息（即使没有部门）
SELECT t1.*, t2.name
FROM emp t1
LEFT JOIN dept t2 ON t1.dept_id = t2.id;

-- 2. 右外连接
-- 查询所有部门及其员工信息（即使没有员工）
SELECT *
FROM dept t2
RIGHT JOIN emp t1 ON t1.dept_id = t2.id;

-- 子查询：

-- 1. 子查询示例：查询工资最高的员工
SELECT * 
FROM emp 
WHERE salary = (SELECT MAX(salary) FROM emp);

-- 2. 子查询的结果是多行单列的：
-- 查询'财务部'和'市场部'所有的员工信息
SELECT * 
FROM emp 
WHERE dept_id IN (SELECT id FROM dept WHERE name IN ('财务部', '市场部'));

-- 3. 子查询的结果是多行多列的：
-- 查询员工入职日期在2011年11月11日之后的员工信息和部门信息
SELECT *
FROM dept t1,
     (SELECT * FROM emp WHERE join_date > '2011-11-11') t2
WHERE t1.id = t2.dept_id;
```

这样整理后的内容更简洁且包含了多个常见的多表查询示例。如果您需要更多的例子或进一步优化，请告诉我！

## 5. 约束

数据约束：保证数据的正确性、有效性和完整性。

分类：

- 主键约束
- 非空约束 
- 唯一约束
- 外键约束

::: code-group

```sql [非空约束]
-- 非空约束：NOT NULL，值不能为 null

-- 1. 创建表时添加非空约束
CREATE TABLE stu
(
  id   INT,
  NAME VARCHAR(20) NOT NULL -- name 为非空
);

-- 2. 创建表后，添加非空约束
ALTER TABLE stu MODIFY NAME VARCHAR(20) NOT NULL;

-- 3. 删除非空约束
ALTER TABLE stu MODIFY NAME VARCHAR(20);
```

```sql [唯一约束]
-- 唯一约束：UNIQUE，值不能重复

-- 1. 创建表时添加唯一约束
CREATE TABLE stu
(
  id           INT,
  phone_number VARCHAR(20) UNIQUE -- 添加唯一约束
);

-- 注意：在 MySQL 中，唯一约束允许列中的多个 NULL 值

-- 2. 删除唯一约束
ALTER TABLE stu DROP INDEX phone_number;

-- 3. 创建表后，添加唯一约束
ALTER TABLE stu MODIFY phone_number VARCHAR(20) UNIQUE;
```

```sql [主键约束]
-- 主键约束：PRIMARY KEY，非空且唯一

-- 1. 主键是表中记录的唯一标识
-- 2. 一张表只能有一个主键

-- 3. 在创建表时添加主键约束
CREATE TABLE stu
(
  id   INT PRIMARY KEY, -- 给 id 添加主键约束
  name VARCHAR(20)
);

-- 4. 删除主键约束
ALTER TABLE stu DROP PRIMARY KEY;

-- 5. 创建表后，添加主键
ALTER TABLE stu MODIFY id INT PRIMARY KEY;

-- 6. 自动增长：使用 auto_increment 可以实现主键值的自动增长
CREATE TABLE stu
(
  id   INT PRIMARY KEY AUTO_INCREMENT, -- 给 id 添加主键约束并自动增长
  name VARCHAR(20)
);

-- 7. 删除自动增长
ALTER TABLE stu MODIFY id INT;

-- 8. 添加自动增长
ALTER TABLE stu MODIFY id INT AUTO_INCREMENT;
```

```sql [外键约束]
-- 外键约束：FOREIGN KEY，建立表与表之间的关系，确保数据的完整性

-- 1. 在创建表时添加外键约束
CREATE TABLE child_table
(
  id      INT,
  parent_id INT,
  CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES parent_table(id)
);

-- 2. 删除外键约束
ALTER TABLE child_table DROP FOREIGN KEY fk_parent;

-- 3. 创建表后，添加外键约束
ALTER TABLE child_table ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES parent_table(id);

-- 4. 级联操作：确保数据一致性，更新或删除父表数据时，子表数据同步更新或删除

-- 1. 级联更新：ON UPDATE CASCADE
-- 2. 级联删除：ON DELETE CASCADE
ALTER TABLE child_table ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES parent_table(id)
ON UPDATE CASCADE ON DELETE CASCADE;
```

:::


## 6. 数据库的备份和还原

### 6.1 数据库备份

```sql
-- 使用 mysqldump 工具进行备份
-- 语法：mysqldump -u 用户名 -p 数据库名 > 备份文件路径
-- 示例：备份数据库 'mydb' 到 'mydb_backup.sql'
mysqldump -u root -p mydb > /path/to/backup/mydb_backup.sql;

-- 备份指定表
-- 语法：mysqldump -u 用户名 -p 数据库名 表名 > 备份文件路径
-- 示例：备份数据库 'mydb' 中的 'student' 表到 'student_backup.sql'
mysqldump -u root -p mydb student > /path/to/backup/student_backup.sql;

-- 备份所有数据库
-- 语法：mysqldump -u 用户名 -p --all-databases > 备份文件路径
mysqldump -u root -p --all-databases > /path/to/backup/all_databases_backup.sql;
```
### 6.2 数据库还原

```sql
-- 使用 mysql 工具进行还原
-- 语法：mysql -u 用户名 -p 数据库名 < 备份文件路径
-- 示例：还原数据库 'mydb' 从备份文件 'mydb_backup.sql'
mysql -u root -p mydb < /path/to/backup/mydb_backup.sql;

-- 还原到指定数据库
-- 如果要还原到一个新的数据库，可以先创建新数据库，再进行还原。
-- 示例：创建一个新数据库 'newdb' 并还原
CREATE DATABASE newdb;
mysql -u root -p newdb < /path/to/backup/mydb_backup.sql;
```

### 6.3 备份和还原过程中的常见选项

```sql
-- 排除某些表的备份
-- 使用 --ignore-table 选项来排除不需要备份的表
mysqldump -u root -p mydb --ignore-table=mydb.table1 --ignore-table=mydb.table2 > /path/to/backup/mydb_backup.sql;

-- 备份时压缩文件
-- 通过管道将备份文件压缩为 .gz 格式
mysqldump -u root -p mydb | gzip > /path/to/backup/mydb_backup.sql.gz;

-- 还原压缩的备份文件
-- 使用 gunzip 解压并还原
gunzip < /path/to/backup/mydb_backup.sql.gz | mysql -u root -p mydb;
```

### 6.4 定期备份和自动化

```sql
-- 使用 cron 定时备份
-- 在 Linux 中，可以使用 cron 来定期执行备份任务
-- 示例：每天凌晨 2 点自动备份
0 2 * * * mysqldump -u root -p mydb > /path/to/backup/mydb_backup_$(date +\%F).sql;
```

这是处理后的简化版：

------

## 7. 事务

### 7.1 事务的基本介绍

**概念：**事务管理一个包含多个步骤的业务操作，要求这些操作要么全部成功，要么全部失败。

**操作：**

- 开启事务：`START TRANSACTION;`
- 回滚：`ROLLBACK;`
- 提交：`COMMIT;`

**例子：**

```sql
CREATE TABLE account
(
  id      INT PRIMARY KEY AUTO_INCREMENT,
  NAME    VARCHAR(10),
  balance DOUBLE
);

-- 添加数据
INSERT INTO account (NAME, balance)
VALUES ('zhangsan', 1000),
       ('lisi', 1000);

SELECT * FROM account;

-- 开始事务
START TRANSACTION;

-- 张三转账：减去500元
UPDATE account
SET balance = balance - 500
WHERE NAME = 'zhangsan';

-- 李四转账：加上500元
UPDATE account
SET balance = balance + 500
WHERE NAME = 'lisi';

-- 如果没有问题，提交事务
COMMIT;

-- 如果有问题，回滚事务
ROLLBACK;
```

**MySQL的自动提交与手动提交**

- `自动提交`：MySQL默认每个DML语句都会自动提交事务。
- `手动提交`：可以通过`START TRANSACTION;`开启事务，操作完成后手动提交`COMMIT;`。

修改默认提交方式：

- 查看事务的默认提交方式：`SELECT @@autocommit;`
- 修改事务的默认提交方式：`SET @@autocommit = 0;`

### 7.2 事务的四大特征

1. `原子性`：事务是不可分割的操作，要么全部成功，要么全部失败。
2. `持久性`：一旦事务提交或回滚，数据就会持久化保存。
3. `隔离性`：多个事务操作时相互独立。
4. `一致性`：事务操作前后，数据库保持一致性。

### 7.3 事务的隔离级别（了解）

**概念：** 事务隔离性指的是多个事务之间的独立性。为了避免并发操作产生问题，通过设置不同的隔离级别来控制。

**存在的问题：**

1. **脏读**：一个事务读取了另一个事务尚未提交的数据。
2. **不可重复读**：同一个事务内，读取到的数据在两次查询之间发生了变化。
3. **幻读**：事务操作时，另一个事务在数据库中添加了新的数据，导致第一次事务无法看到其修改。

**隔离级别：**

1. **read uncommitted**：读未提交（脏读、不可重复读、幻读）
2. **read committed**：读已提交（不可重复读、幻读）
3. **repeatable read**：可重复读（幻读）
4. **serializable**：串行化（解决所有问题）

**隔离级别与安全性：**

- 隔离级别越低，效率越高，但安全性越差。
- 隔离级别越高，安全性越强，但效率越低。

查询和设置隔离级别：

- 查询当前隔离级别：`SELECT @@tx_isolation;`
- 设置隔离级别：`SET GLOBAL transaction isolation level 级别字符串;`

**示例：**

```sql
-- 设置隔离级别为 read uncommitted
SET GLOBAL transaction isolation level read uncommitted;

-- 开始事务
START TRANSACTION;

-- 执行转账操作
UPDATE account SET balance = balance - 500 WHERE id = 1;
UPDATE account SET balance = balance + 500 WHERE id = 2;
```

## 8. DCL

### 8.1 管理用户

```sql
-- 添加用户
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
-- 示例：创建一个名为 'zhangsan' 的用户，只允许从 'localhost' 主机访问。
CREATE USER 'zhangsan'@'localhost' IDENTIFIED BY '1234';

-- 删除用户
DROP USER '用户名'@'主机名';
DROP USER 'zhangsan'@'localhost';  -- 示例：删除 'zhangsan' 用户

-- 修改用户密码
-- 修改已有用户的密码，通常用于重置密码。
UPDATE USER SET PASSWORD = PASSWORD('新密码') WHERE USER = '用户名';
SET PASSWORD FOR '用户名'@'主机名' = PASSWORD('新密码');  -- 或者使用以下命令进行密码修改：
-- 示例：修改 'zhangsan' 用户的密码为 'newpassword'
SET PASSWORD FOR 'zhangsan'@'localhost' = PASSWORD('newpassword');

-- 查询用户
USE mysql;
SELECT * FROM USER;
SELECT User, Host FROM mysql.user;  -- 查看MySQL系统中的所有用户以及其连接主机

-- 通配符：% 表示可以在任意主机使用用户登录数据库
```

**忘记密码**

```sql
-- mysql中忘记了root用户的密码
-- 停止MySQL服务
cmd -- > net stop mysql
-- 使用无验证方式启动MySQL服务
mysqld --skip-grant-tables
-- 打开新的cmd窗口并登录MySQL
mysql
-- 使用mysql数据库
USE mysql;
-- 修改root用户密码
UPDATE user SET password = PASSWORD('你的新密码') WHERE user = 'root';
-- 关闭两个cmd窗口并结束MySQL进程
-- 启动MySQL服务并使用新密码登录
```

### 8.2 权限管理

```sql
-- 查询权限
SHOW GRANTS FOR '用户名'@'主机名';
SHOW GRANTS FOR 'zhangsan'@'localhost'; -- 示例：查询 'zhangsan' 用户的权限

-- 授予权限
-- 使用 GRANT 语句为某个用户授予访问数据库、表、列等的权限。
-- 可以授予特定权限（如SELECT、INSERT）或所有权限（ALL PRIVILEGES）
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
-- 示例：为用户 'zhangsan' 授予 'testdb' 数据库上的所有权限
GRANT ALL PRIVILEGES ON testdb.* TO 'zhangsan'@'localhost';
GRANT ALL ON *.* TO 'zhangsan'@'localhost';  -- 给张三用户授予所有权限

-- 撤销权限
-- 使用 REVOKE 语句撤销某个用户在特定数据库或表上的权限。
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
-- 示例：撤销 'lisi' 用户在 'db3' 数据库的 UPDATE 权限
REVOKE UPDATE ON db3.* FROM 'lisi'@'%';
```

### 8.3 案例

```sql
-- 1. 创建数据库
-- 创建一个名为 'mydb' 的数据库
CREATE DATABASE mydb;

-- 2. 创建用户
-- 创建一个用户 'username'，并为其设置密码 'password'，允许从任意主机 ('%') 进行连接
CREATE USER 'username'@'%' IDENTIFIED BY 'password';

-- 示例：创建一个名为 'john' 的用户，密码为 'john123'
CREATE USER 'john'@'%' IDENTIFIED BY 'john123';

-- 3. 授予权限
-- 为用户 'username' 授予对数据库 'mydb' 的所有权限
GRANT ALL PRIVILEGES ON mydb.* TO 'username'@'%';

-- 示例：为用户 'john' 授予对数据库 'mydb' 的所有权限
GRANT ALL PRIVILEGES ON mydb.* TO 'john'@'%';

-- 4. 刷新权限
-- 使用 FLUSH PRIVILEGES 确保权限更改生效
FLUSH PRIVILEGES;

-- 5. 查询用户权限
-- 查询指定用户的权限，确保授予正确
SHOW GRANTS FOR 'john'@'%';

-- 示例：验证 'john' 用户是否已经拥有对 'mydb' 数据库的所有权限
SHOW GRANTS FOR 'john'@'%';
```

::: tip 发布时间:
2021-01-29
:::

