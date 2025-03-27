# 集群

## MySQL集群

> 当前笔记来自：尚硅谷-谷粒商城 后续关于Mysql集群的笔记汇总到这里

### 1. 集群原理

![image-20250320214513367](/images/cluster/image-20250320214513367.png)

- MySQL-MMM是Master-Master Replication Manager for MySQL（mysql 主主复制管理 器）的简称，是Google的开源项目 （Perl
  脚本）。MMM基于MySQL Replication 做的扩展架构，主要用 来监控mysql主主复制并做失败转 移。其原理是将真实数据库节点的
  IP（RIP）映射为虚拟IP（VIP）集。 mysql-mmm 的监管端会提供多个 虚拟IP（VIP），包括一个可写VIP， 多个可读VIP，通过监管的管理，这
  些IP会绑定在可用mysql之上，当 某一台mysql宕机时，监管会将VIP 迁移至其他mysql。在整个监管过 程中，需要在mysql中添加相关授
  权用户，以便让mysql可以支持监 理机的维护。授权的用户包括一个mmm_monitor 用户和一个mmm_agent用户，如果想使用mmm的备份工具则还要添
  加一个mmm_tools用户。

![image-20250320214649213](/images/cluster/image-20250320214649213.png)

- MHA（MasterHighAvailability）目前在 MySQL 高可用方面是一个相对成熟的解决方案,
  由日本DeNA公司youshimaton（现就职于Facebook公司）开发，是一套优秀的作为 MySQL高可用性环境下故障切换和主从提升的高可用软件。在MySQL故障切换过程中，
  MHA能做到在0~30秒之内自动完成数据库的故障切换操作（以2019年的眼光来说太 慢了），并且在进行故障切换的过程中，MHA能在最大程度上保证数据的一致性，以
  达到真正意义上的高可用。

- InnoDBCluster 支持自动Failover、强一致性、读写分离、读库高可用、读请求负载均 衡，横向扩展的特性，是比较完备的一套方案。但是部署起来复杂，想要解决router
  单点问题好需要新增组件，如没有其他更好的方案可考虑该方案。 InnoDBCluster主 要由MySQLShell、MySQLRouter 和MySQL
  服务器集群组成，三者协同工作，共同为 MySQL 提供完整的高可用性解决方案。MySQLShell 对管理人员提供管理接口，可以
  很方便的对集群进行配置和管理, MySQLRouter 可以根据部署的集群状况自动的初始 化，是客户端连接实例。如果有节点down机，集群会自动更新配置。集群包含单点写
  入和多点写入两种模式。在单主模式下，如果主节点down掉，从节点自动替换上来， MySQL Router 会自动探测，并将客户端连接到新节点。

![image-20250320214631570](/images/cluster/image-20250320214631570.png)

### 2. MySQL主从复制集群

> Docker安装模拟MySQL主从复制集群

#### 2.1 下载mysql镜像

```bash
# 拉取镜像
docker pull mysql:5.7
```

#### 2.2 创建Master实例并启动

```bash
# 创建映射路径
mkdir -p /home/slienceme/docker/cluster/mysql/master/log
mkdir -p /home/slienceme/docker/cluster/mysql/master/data
mkdir -p /home/slienceme/docker/cluster/mysql/master/conf

# 启动容器
# 主容器 mysql-master
docker run -p 3307:3306 --name mysql-master \
-v /home/slienceme/docker/cluster/mysql/master/log:/var/log/mysql \
-v /home/slienceme/docker/cluster/mysql/master/data:/var/lib/mysql \
-v /home/slienceme/docker/cluster/mysql/master/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7

# 参数说明:
# -p 3307:3306：将容器的3306端口映射到主机的3307端口
# -v /mydata/mysql/master/conf:/etc/mysql/conf.d：将配置文件夹挂在到主机
# -v /mydata/mysql/master/log:/var/log/mysql：将日志文件夹挂载到主机
# -v /mydata/mysql/master/data:/var/lib/mysql/：将配置文件夹挂载到主机
# -e MYSQL_ROOT_PASSWORD=root：初始化root用户的密码
```

修改`master`基本配置

```bash
vim /home/slienceme/docker/cluster/mysql/master/conf/my.cnf

# -----begin---------------------------------------------
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
init_connect='SET collation_connection=utf8_unicode_ci, NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
# -----end---------------------------------------------
# 注意：skip-name-resolve一定要加，不然连接mysql会超级慢
```

添加`master`主从复制部分配置，配置好后，重启`master`

```bash
# -----begin---------------------------------------------
server_id=1
log-bin=mysql-bin
read-only=0
binlog-do-db=gulimall_ums
binlog-do-db=gulimall_pms
binlog-do-db=gulimall_oms
binlog-do-db=gulimall_sms
binlog-do-db=gulimall_wms
binlog-do-db=gulimall_admin

replicate-ignore-db=mysql
replicate-ignore-db=sys
replicate-ignore-db=information_schema
replicate-ignore-db=performance_schema
# -----end---------------------------------------------
```

#### 2.3  创建Slave实例并启动

```bash
# 创建映射路径
mkdir -p /home/slienceme/docker/cluster/mysql/slaver/log
mkdir -p /home/slienceme/docker/cluster/mysql/slaver/data
mkdir -p /home/slienceme/docker/cluster/mysql/slaver/conf

# 启动容器
# 从容器 mysql-slaver-01
docker run -p 3317:3306 --name mysql-slaver-01 \
-v /home/slienceme/docker/cluster/mysql/slaver/log:/var/log/mysql \
-v /home/slienceme/docker/cluster/mysql/slaver/data:/var/lib/mysql \
-v /home/slienceme/docker/cluster/mysql/slaver/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7

# 参数说明:
# -p 3307:3306：将容器的3306端口映射到主机的3307端口
# -v /mydata/mysql/slaver/conf:/etc/mysql/conf.d：将配置文件夹挂在到主机
# -v /mydata/mysql/slaver/log:/var/log/mysql：将日志文件夹挂载到主机
# -v /mydata/mysql/slaver/data:/var/lib/mysql/：将配置文件夹挂载到主机
# -e MYSQL_ROOT_PASSWORD=root：初始化root用户的密码
```

修改`slaver`基本配置

```bash
vim /home/slienceme/docker/cluster/mysql/slaver/conf/my.cnf

# -----begin---------------------------------------------
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
init_connect='SET collation_connection=utf8_unicode_ci, NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
# -----end---------------------------------------------
# 注意：skip-name-resolve一定要加，不然连接mysql会超级慢
```

添加`master`主从复制部分配置，配置好后，重启`slaver`

```bash
# -----begin---------------------------------------------
server_id=2
log-bin=mysql-bin
read-only=1
binlog-do-db=gulimall_ums
binlog-do-db=gulimall_pms
binlog-do-db=gulimall_oms
binlog-do-db=gulimall_sms
binlog-do-db=gulimall_wms
binlog-do-db=gulimall_admin

replicate-ignore-db=mysql
replicate-ignore-db=sys
replicate-ignore-db=information_schema
replicate-ignore-db=performance_schema
# -----end---------------------------------------------
```

#### 2.4 为master授权用户来他的同步数据

```bash
# 进入master容器 进入mysql(初始密码root)
docker exec -it mysql-master mysql -uroot -p

# 授权root可以远程访问(主从无关，为了方便我们远程连接mysql)
grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option; 
flush privileges;

# 2）、添加用来同步的用户 
GRANT REPLICATION SLAVE ON *.* to 'backup'@'%' identified by '123456';

# 查看master状态
show master status\G;

# 查询到master_log_file和master_log_pos 用于下面
# 例如：mysql-bin.000001,154
```

#### 2.5 配置slaver同步master数据

```bash
# 进入slaver容器 进入mysql(初始密码root)
docker exec -it mysql-slaver-01 mysql -uroot -p

# 授权root可以远程访问(主从无关，为了方便我们远程连接mysql)
grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option; 
flush privileges;

# 设置主库连接 master_host主机IP 已经关闭了skip-name-resolve 

# master_host：gulimall-mysql-master.gulimall 集群中使用DNS
change master to
 master_host='192.168.50.2',   
 master_user='backup', 
 master_password='123456',
 master_log_file='mysql-bin.000001', 
 master_log_pos=889, 
 master_port=3306;
 
# 启动从库同步
start slave;

# 查看从库状态
# 表格格式
show slave status;
# 纵向格式
show slave status\G;
```

![image-20250320220635596](/images/cluster/image-20250320220635596.png)

至此主从配置完成；

总结：

- 主从数据库在自己配置文件中声明需要同步哪个数据库，忽略哪个数据库等信息。 并且server-id不能相同
- 主库授权某个账号密码来同步自己的数据
- 从库使用这个账号密码连接主库来同步数据

### 3. 分库分表

> 采用 MyCat 或者 [ShardingSphere官网](http://shardingsphere.apache.org/index_zh.html)

```bash
# 案例 奇偶分离
auto_increment_offset:1  # 从几开始增长 
auto_increment_increment:2  # 每次的步长
# 1 3 5 7 9 ...  库1
# 2 4 6 8 10...  库2
```

#### 3.1 下载安装Sharding-Proxy

> 进入官网选择一种方式去下载Sharding-proxy
>
> - [ 使用二进制发布包](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/startup/bin/)
> - [ 使用 Docker](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/startup/docker/)
> - [ 构建 GraalVM Native Image(Alpha)](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/startup/graalvm-native-image/)
> - [ 使用 Helm](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/startup/helm/)

PS：我采用的docker方案

#### 3.2 配置数据分片+读写分离(主从复制)

> 配置`./conf/*`下，有多个配置文件
>
> - `database-encrypt.yaml` : 数据加密：存储或传输时的加密
> - `database-mask.yaml` : 数据脱敏：数据保护
> - `database-sharding.yaml` : 分片规则配置：分片是将数据分散到多个数据库实例中
> - `database-readwrite-splitting.yaml` : 读写分离规则配置：将数据库的读操作和写操作分别指向不同的数据库实例
> - `database-shadow.yaml` : 数据库影像 ： 用于数据备份、复制或实时数据同步的数据库实例
> - `global.yaml` : 全局配置

> 注意：如果没驱动，则需要下载驱动(MySQL
> 数据库） [mysql-connector-java-5.1.49.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar)
> 或者 [mysql-connector-java-8.0.11.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.11/mysql-connector-java-8.0.11.jar)
>
> 将其放到`./lib/`目录下

数据分片配置
`database-sharding.yaml`  [参数解释](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-jdbc/yaml-config/rules/sharding/)

```yaml
######################################################################################################
#
# If you want to connect to MySQL, you should manually copy MySQL driver to lib directory.
#
######################################################################################################

databaseName: sharding_db_00

dataSources:
  ds_0:
    url: jdbc:mysql://192.168.50.2:3307/demo_ds_0?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1
  ds_1:
    url: jdbc:mysql://192.168.50.2:3307/demo_ds_1?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1

rules:
  - !SHARDING
    tables:
      t_order:
        actualDataNodes: ds_${0..1}.t_order_${0..1}
        tableStrategy:
          standard:
            shardingColumn: order_id
            shardingAlgorithmName: t_order_inline
        keyGenerateStrategy:
          column: order_id
          keyGeneratorName: snowflake
      #      auditStrategy:
      #        auditorNames:
      #          - sharding_key_required_auditor
      #        allowHintDisable: true
      t_order_item:
        actualDataNodes: ds_${0..1}.t_order_item_${0..1}
        tableStrategy:
          standard:
            shardingColumn: order_id
            shardingAlgorithmName: t_order_item_inline
        keyGenerateStrategy:
          column: order_item_id
          keyGeneratorName: snowflake
    bindingTables:
      - t_order,t_order_item
    defaultDatabaseStrategy:
      standard:
        shardingColumn: user_id
        shardingAlgorithmName: database_inline
    defaultTableStrategy:
      none:
    #  defaultAuditStrategy:
    #    auditorNames:
    #      - sharding_key_required_auditor
    #    allowHintDisable: true

    # 分库分表算法策略
    shardingAlgorithms:
      database_inline:
        type: INLINE
        props:
          algorithm-expression: ds_${user_id % 2}
      t_order_inline:
        type: INLINE
        props:
          algorithm-expression: t_order_${order_id % 2}
      t_order_item_inline:
        type: INLINE
        props:
          algorithm-expression: t_order_item_${order_id % 2}

    keyGenerators:
      snowflake:
        type: SNOWFLAKE

#  auditors:
#    sharding_key_required_auditor:
#      type: DML_SHARDING_CONDITIONS
#
#- !BROADCAST
#  tables:
#    - t_address
```

读写分离(主从复制)配置`database-readwrite-splitting-00.yaml`  dataSourceGroups只可以配置一个，因此需要分为两个配置文件

```yaml
######################################################################################################
#
# If you want to connect to MySQL, you should manually copy MySQL driver to lib directory.
#
######################################################################################################

databaseName: sharding_db_01

dataSources:
  write_0_ds:
    url: jdbc:mysql://192.168.50.2:3307/demo_ds_0?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1
  read_ds_0:
    url: jdbc:mysql://192.168.50.2:3317/demo_ds_0?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1

rules:
  - !READWRITE_SPLITTING
    dataSourceGroups:
      readwrite_0_ds:
        writeDataSourceName: write_0_ds
        readDataSourceNames:
          - read_ds_0
        loadBalancerName: random
    loadBalancers:
      random:
        type: RANDOM
```

读写分离(主从复制)配置`database-readwrite-splitting-01.yaml`

```yaml
######################################################################################################
#
# If you want to connect to MySQL, you should manually copy MySQL driver to lib directory.
#
######################################################################################################

databaseName: sharding_db_02

dataSources:
  write_1_ds:
    url: jdbc:mysql://192.168.50.2:3307/demo_ds_1?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1
  read_ds_1:
    url: jdbc:mysql://192.168.50.2:3317/demo_ds_1?useSSL=false
    username: root
    password: root
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
    minPoolSize: 1

rules:
  - !READWRITE_SPLITTING
    dataSourceGroups:
      readwrite_1_ds:
        writeDataSourceName: write_1_ds
        readDataSourceNames:
          - read_ds_1
        loadBalancerName: random
    loadBalancers:
      random:
        type: RANDOM
```

#### 3.3 配置server.yaml

> 注：现在更名为`global.yaml`
>
> ShardingSphere-Proxy 运行模式在 `global.yaml` 中配置
>
> [官网配置说明](https://shardingsphere.apache.org/document/current/cn/user-manual/shardingsphere-proxy/yaml-config/)

```yaml
# 采用官网的配置方案
authority:
  users:
    - user: root@%
      password: root
      admin: true
    - user: sharding
      password: sharding
    - user: test
      password: sharding
  privilege:
    type: DATABASE_PERMITTED
    props:
      user-database-mappings: sharding@%=*, test@%=test_db, test@%=sharding_db

# ...
# 另外开放了这些配置

props:
  #  system-log-level: INFO
  #  max-connections-size-per-query: 1
  kernel-executor-size: 16  # Infinite by default.
  #  proxy-frontend-flush-threshold: 128  # The default value is 128.
  #  # sql-show is the same as props in logger ShardingSphere-SQL, and its priority is lower than logging rule
  sql-show: false
```

#### 3.4 修改MySQL原有配置

在`master`和`slaver`数据库的配置文件中增加如下内容，后重启：

```bash
binlog-do-db=demo_ds_0
binlog-do-db=demo_ds_1
```

#### 3.5 正常启动日志

```bash
we find java version: java21, full_version=21.0.5, full_path=/opt/java/openjdk/bin/java
unadapted java version, please notice...
The port is 3308
The classpath is /opt/shardingsphere-proxy/conf:.:/opt/shardingsphere-proxy/lib/*:/opt/shardingsphere-proxy/ext-lib/*
main class org.apache.shardingsphere.proxy.Bootstrap 3308 /opt/shardingsphere-proxy/conf 0.0.0.0 false
[INFO ] 2025-03-21 07:07:07.296 [main] o.a.s.d.p.c.l.PipelineContextManagerLifecycleListener - mode type is not Cluster, mode type='Standalone', ignore
[INFO ] 2025-03-21 07:07:07.345 [main] o.a.s.p.v.ShardingSphereProxyVersion - Database type is `MySQL`, version is `5.7.44-log`, database name is `sharding_db_00`
[INFO ] 2025-03-21 07:07:07.354 [main] o.a.s.p.v.ShardingSphereProxyVersion - Database type is `MySQL`, version is `5.7.44-log`, database name is `sharding_db_01`
[INFO ] 2025-03-21 07:07:07.355 [main] o.a.s.p.v.ShardingSphereProxyVersion - Database type is `MySQL`, version is `5.7.44-log`, database name is `sharding_db_02`
[INFO ] 2025-03-21 07:07:07.356 [main] o.a.s.p.frontend.ssl.ProxySSLContext - Proxy frontend SSL/TLS is not enabled.
[INFO ] 2025-03-21 07:07:07.507 [main] o.a.s.p.frontend.ShardingSphereProxy - ShardingSphere-Proxy Standalone mode started successfully
```

#### 3.6  远程连接

> [官方提示](https://shardingsphere.apache.org/document/current/cn/quick-start/shardingsphere-proxy-quick-start/)：**使用限制
**
>
> ShardingSphere-Proxy 对系统库/表（如 information_schema、pg_catalog）支持有限，通过部分图形化数据库客户端连接 Proxy
> 时，可能客户端或 Proxy 会有错误提示。可以使用命令行客户端（`mysql`、`psql`、`gsql` 等）连接 Proxy 验证功能。
>
> 因此直接采用指令连接： `mysql -h192.168.50.2 -P13308 -uroot -proot`  端口为docker设置的端口

连接成功日志

```bash
mysql -h192.168.50.2 -P13308 -uroot -proot
# mysql: [Warning] Using a password on the command line interface can be insecure.
# Welcome to the MySQL monitor.  Commands end with ; or \g.
# Your MySQL connection id is 1
# Server version: 5.7.22-ShardingSphere-Proxy 5.5.2 Source distribution
# 
# Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.
# 
# Oracle is a registered trademark of Oracle Corporation and/or its
# affiliates. Other names may be trademarks of their respective
# owners.
# 
# Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
# 
# mysql> show databases;
# +--------------------+
# | Database           |
# +--------------------+
# | information_schema |
# | mysql              |
# | performance_schema |
# | sharding_db_00     |
# | sharding_db_01     |
# | sharding_db_02     |
# | shardingsphere     |
# | sys                |
# +--------------------+
# 8 rows in set (0.02 sec)
```

#### 3.7 案例

创建测试表

```mysql
USE sharding_db_00;

CREATE TABLE `t_order`
(
  `order_id` bigint(20) NOT NULL,
  `user_id`  int(11)    NOT NULL,
  `status`   varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin;

CREATE TABLE `t_order_item`
(
  `order_item_id` bigint(20) NOT NULL,
  `order_id`      bigint(20) NOT NULL,
  `user_id`       int(11)    NOT NULL,
  `content`       varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status`        varchar(50) COLLATE utf8_bin  DEFAULT NULL,
  PRIMARY KEY (`order_item_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_bin;

# 查询表创建结果
SHOW TABLES;

# +--------------------------+
# | Tables_in_sharding_db_00 |
# +--------------------------+
# | t_order                  |
# | t_order_item             |
# +--------------------------+
# 2 rows in set (0.01 sec)
```

插入数据

```mysql
INSERT INTO `t_order`(user_id, status)
VALUES (1, 1);
INSERT INTO `t_order`(user_id, status)
VALUES (2, 1);
INSERT INTO `t_order`(user_id, status)
VALUES (3, 1);

# 查询数据插入结果
select *
from t_order;

# +---------------------+---------+--------+
# | order_id            | user_id | status |
# +---------------------+---------+--------+
# | 1109754003958267905 |       2 | 1      |   -> user_id%2=0(ds_0) -> 1109754003958267905%2=1(t_order_1)
# | 1109753541007769600 |       1 | 1      |   -> user_id%2=0(ds_1) -> 1109753541007769600%2=0(t_order_0)
# | 1109754043657355264 |       3 | 1      |   -> user_id%2=0(ds_1) -> 1109754043657355264%2=0(t_order_0)
# +---------------------+---------+--------+
# 3 rows in set (0.01 sec)

# 根据分库分表的规则
# ds_${user_id % 2}
# t_order_${order_id % 2}
# t_order_item_${order_id % 2}
```

过程分析：

向库`sharding_db_00`创建表 --> `dataSources:ds_0,ds_1`分别建表 --> 各自的从库开始备份(
`write_0_ds->read_ds_0; write_1_ds->read_ds_1`)

### 4. k8s 有状态服务部署

可以使用kubesphere，快速搭建MySQL环境。

- 有状态服务抽取配置为ConfigMap
- 有状态服务必须使用pvc持久化数据
- 服务集群内访问使用DNS提供的稳定域名

![image-20250321211637258](/images/cluster/image-20250321211637258.png)

流程(以谷粒商城为例)：

进入`KUBESPHERE`，以`project-regular`身份登录，

进入项目`谷粒商城(gulimall)`

=>`应用负载`

=>`服务`

=>`创建有状态服务`

`配置`=>`创建配置字典`

=> 名称：`mysql-master-cnf` 别名：`master配置`

![image-20250321213848739](/images/cluster/image-20250321213848739.png)

> 内容来自主从复制的默认配置

![image-20250321213810770](/images/cluster/image-20250321213810770.png)

![image-20250321213837771](/images/cluster/image-20250321213837771.png)

![image-20250321214100736](/images/cluster/image-20250321214100736.png)

=> 创建持久卷声明：`mysql-master-pvc`

![image-20250322164927565](/images/cluster/image-20250322164927565.png)

![image-20250322164952284](/images/cluster/image-20250322164952284.png)

=> 名称：`mysql-master` 别名：`mysql主节点`  创建一个有状态的服务

![image-20250321212824897](/images/cluster/image-20250321212824897.png)

![image-20250321212916321](/images/cluster/image-20250321212916321.png)

![image-20250322165353534](/images/cluster/image-20250322165353534.png)

> 这个位置需要加上这个配置字典

![image-20250322200218876](/images/cluster/image-20250322200218876.png)

![image-20250322165610011](/images/cluster/image-20250322165610011.png)

![image-20250322165843203](/images/cluster/image-20250322165843203.png)

![image-20250322165900710](/images/cluster/image-20250322165900710.png)

![image-20250322170008846](/images/cluster/image-20250322170008846.png)

![image-20250322170018089](/images/cluster/image-20250322170018089.png)

![image-20250322193807557](/images/cluster/image-20250322193807557.png)

> 集群内可以通过DNS访问，测试连通性`gulimall-mysql-master.gulimall`

=> 创建从节点持久卷声明：`gulimall-mysql-slaver-pvc`  操作同上

=> 创建从节点配置字典：`mysql-slaver-cnf`    `slaver配置`   操作同上

=> 名称：`gulimall-mysql-slaver` 别名：`slaver从节点`  创建一个有状态的服务

=> 配置主从数据库，同上面第二节的内容

=> 测试

在主库创建数据库`CREATE DATABASE `gulimall_oms` DEFAULT CHARACTER SET utf8mb4`

=> 由于配置不足问题，后面的Redis和Elasticsearch和RabbitMQ集群都是相同的操作

> 注意事项：
>
> - 每一个MySQL/Redis必须都是一个有状态的服务
> - 每一个MySQL/Redis挂载自己的配置文件(configmap)和PVC
> - 以后的IP都用域名DNS，即可搭建出集群

## Redis集群

> 当前笔记来自：尚硅谷-谷粒商城 后续关于Redis集群的笔记汇总到这里

### 1. redis 集群形式

#### 1.1 数据分区方案

##### 1.1.1 客户端分区

![image-20250321162055590](/images/cluster/image-20250321162055590.png)

客户端分区方案的代表为 RedisSharding，RedisSharding 是 RedisCluster 出来之前，业界普遍使用的 Redis多实例集群 方法。Java 的
Redis 客户端驱动库 Jedis，支持 Redis Sharding 功能，即 ShardedJedis 以及 结合缓存池的 ShardedJedisPool。

**优点**: 不使用第三方中间件，分区逻辑可控，配置简单，节点之间无关联，容易线性扩展，灵活性强。

**缺点**: 客户端无法动态增删服务节点，客户端需要自行维护分发逻辑，客户端之间无连接共享， 会造成连接浪费。

##### 1.1.2 代理分区

![image-20250321162313599](/images/cluster/image-20250321162313599.png)

##### 1.1.3 redis-cluster(官方)

### 2. 高可用方式

#### 2.1 Sentinel（哨兵机制）支持高可用

前面介绍了主从机制，但是从运维角度来看，主节点出现了问题我们还需要通过人工干预的方式把从节点设为主节点，还要通知应用程序更新主节点地址，这种方式非常繁琐笨重，而且主节点的读写能力都十分有限，有没有较好的办法解决这两个问题，哨兵机制就是针对第
一个问题的有效解决方案，第二个问题则有赖于集群！哨兵的作用就是监控Redis系统的运行状况，其功能主要是包括以下三个：

- 监控(Monitoring): 哨兵(sentinel) 会不断地检查你的Master和Slave是否运作正常。
- 提醒(Notification): 当被监控的某个 Redis 出现问题时, 哨兵(sentinel) 可以通过 API 向管理员或者其他应用程序发送通知。
- 自动故障迁移(Automatic failover): 当主数据库出现故障时自动将从数据库转换为主数 据库。

![image-20250321162659545](/images/cluster/image-20250321162659545.png)

**哨兵的原理**

Redis 哨兵的三个定时任务，Redis哨兵判定一个Redis节点故障不可达主要就是通过三个定时监控任务来完成的：

- 每隔10秒每个哨兵节点会向主节点和从节点发送"inforeplication" 命令来获取最新的 拓扑结构

![image-20250321162749835](/images/cluster/image-20250321162749835.png)             ![image-20250321162758460](/images/cluster/image-20250321162758460.png)

- 每隔2秒每个哨兵节点会向Redis节点的`_sentinel_:hello`频道发送自己对主节点是否故障的判断以及自身的节点信息，并且其他的哨兵节点也会订阅这个频道来了解其他哨兵节点的信息以及对主节点的判断
- 每隔1秒每个哨兵会向主节点、从节点、其他的哨兵节点发送一个`“ping” `命令来做心 跳检测

![image-20250321162920766](/images/cluster/image-20250321162920766.png)

如果在定时Job3检测不到节点的心跳，会判断为“主观下线”。如果该节点还是主节点那么
还会通知到其他的哨兵对该主节点进行心跳检测，这时主观下线的票数超过了数时，那么这个主节点确实就可能是故障不可达了，这时就由原来的主观下线变为了“客观下
线”。

**故障转移和Leader选举**

如果主节点被判定为客观下线之后，就要选取一个哨兵节点来完成后面的故障转移工作，选举出一个leader，这里面采用的选举算法为Raft。选举出来的哨兵leader就要来完成故障转移工作，也就是在从节点中选出一个节点来当新的主节点，这部分的具体流程可参考引用. [《深入理解Redis哨兵搭建及原理》](https://blog.csdn.net/nuomizhende45/article/details/82831966)

#### 2.2 Redis-Cluster

[官方教程](https://redis.io/topics/cluster-tutorial/)

Redis的官方多机部署方案，RedisCluster。一组RedisCluster是由多个Redis实例组成，官方推荐我们使用6实例，其中3个为主节点，3个为从结点。一旦有主节点发生故障的时候，
RedisCluster可以选举出对应的从结点成为新的主节点，继续对外服务，从而保证服务的高可用性。那么对于客户端来说，知道知道对应的key是要路由到哪一个节点呢？RedisCluster
把所有的数据划分为16384个不同的槽位，可以根据机器的性能把不同的槽位分配给不同的Redis实例，对于Redis实例来说，他们只会存储部分的Redis数据，当然，槽的数据是可以迁移的，不同的实例之间，可以通过一定的协议，进行数据迁移。

![image-20250321163300024](/images/cluster/image-20250321163300024.png)

##### 2.2.1 槽

![image-20250321163339513](/images/cluster/image-20250321163339513.png)

Redis 集群的功能限制；Redis
集群相对单机在功能上存在一些限制，需要开发人员提前了解，在使用时做好规避。[JAVACRC16校验算法](https://blog.csdn.net/key_xyes/article/details/93614373?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)

- key批量操作支持有限。
  - 类似mset、mget 操作，目前只支持对具有相同 slot 值的 key 执行批量操作。 对于映射为不同slot 值的 key 由于执行 mget、mget
    等操作可能存在于多个节 点上，因此不被支持。
- key事务操作支持有限`(后续Lua脚本用的比较多)`。
  - 只支持多key 在同一节点上的事务操作，当多个 key 分布在不同的节点上时无法使用事务功能。
- key 作为数据分区的最小粒度
- 不能将一个大的键值对象如 hash、list 等映射到不同的节点。
- 不支持多数据库空间
  - 单机下的Redis 可以支持 16 个数据库（db0~db15），集群模式下只能使用一个数据库空间，即 db0。
- 复制结构只支持一层
  - 从节点只能复制主节点，不支持嵌套树状复制结构。
- 命令大多会重定向，耗时多

![image-20250321163646459](/images/cluster/image-20250321163646459.png)

##### 2.2.2 一致性hash

一致性哈希可以很好的解决稳定性问题，可以将所有的存储节点排列在收尾相接的Hash环上，每个key在计算Hash后会顺时针找到临接的存储节点存放。而当有节点加入或退出时，仅影响该节点在Hash环上顺时针相邻的后续节点。

![image-20250321164250565](/images/cluster/image-20250321164250565.png)

**Hash倾斜**

如果节点很少，容易出现倾斜，负载不均衡问题。一致性哈希算法，引入了虚拟节点，在整个环上，均衡增加若干个节点。比如`a1`，`a2`，`b1`，
`b2`，`c1`，`c2`，`a1`和`a2`都是属于A节点 的。解决hash倾斜问题

### 3. 部署Cluster

#### 3.1 创建6个redis节点

> 3 主 3 从 方式
>
> 从: 为了同步备份
>
> 主: 进行slot数据分片

```bash
# 循环创建节点(暂时去掉自动重启)
for port in $(seq 7001 7006); do
  mkdir -p /home/slienceme/docker/cluster/redis/node-${port}/conf
  touch /home/slienceme/docker/cluster/redis/node-${port}/conf/redis.conf
  cat << EOF > /home/slienceme/docker/cluster/redis/node-${port}/conf/redis.conf
port ${port}
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 192.168.50.2
cluster-announce-port ${port}
cluster-announce-bus-port 1${port}
appendonly yes
EOF
  docker run -p ${port}:${port} -p 1${port}:1${port} --name redis-${port} \
    -v /home/slienceme/docker/cluster/redis/node-${port}/data:/data \
    -v /home/slienceme/docker/cluster/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
    -d redis:5.0.7 redis-server /etc/redis/redis.conf;
done

# 查询运行情况
docker ps
# CONTAINER ID            IMAGE ...        STATUS          PORTS                     NAMES
# ... 0.0.0.0:7006->7006/tcp, :::7006->7006/tcp, 6379/tcp, 0.0.0.0:17006->17006/tcp, :::17006->17006/tcp   redis-7006
# ... 0.0.0.0:7005->7005/tcp, :::7005->7005/tcp, 6379/tcp, 0.0.0.0:17005->17005/tcp, :::17005->17005/tcp   redis-7005
# ... 0.0.0.0:7004->7004/tcp, :::7004->7004/tcp, 6379/tcp, 0.0.0.0:17004->17004/tcp, :::17004->17004/tcp   redis-7004
# ... 0.0.0.0:7003->7003/tcp, :::7003->7003/tcp, 6379/tcp, 0.0.0.0:17003->17003/tcp, :::17003->17003/tcp   redis-7003
# ... 0.0.0.0:7002->7002/tcp, :::7002->7002/tcp, 6379/tcp, 0.0.0.0:17002->17002/tcp, :::17002->17002/tcp   redis-7002
# ... 0.0.0.0:7001->7001/tcp, :::7001->7001/tcp, 6379/tcp, 0.0.0.0:17001->17001/tcp, :::17001->17001/tcp   redis-7001


# 停止并删除 Redis 容器 (统一删除的时候使用)
docker stop $(docker ps -a | grep redis-700 | awk '{ print $1 }')
docker rm $(docker ps -a | grep redis-700 | awk '{ print $1 }')
```

#### 3.2 使用redis建立集群

```bash
# 进入 redis-7001 容器，使用 bash 交互模式
docker exec -it redis-7001 /bin/bash

# 在容器内使用 redis-cli 创建一个 Redis 集群
# --cluster create: 指定要创建集群的 Redis 节点
# 后续列出的是所有参与集群的节点 IP 和端口
# 192.168.50.2:7001-7006 是参与集群的 Redis 节点
# --cluster-replicas 1: 表示每个主节点有一个从节点，即集群配置一个副本
redis-cli --cluster create \
  192.168.50.2:7001 192.168.50.2:7002 192.168.50.2:7003 \
  192.168.50.2:7004 192.168.50.2:7005 192.168.50.2:7006 \
  --cluster-replicas 1

# 执行日志
# >>> Performing hash slots allocation on 6 nodes...
# Master[0] -> Slots 0 - 5460
# Master[1] -> Slots 5461 - 10922
# Master[2] -> Slots 10923 - 16383
# Adding replica 192.168.50.2:7005 to 192.168.50.2:7001
# Adding replica 192.168.50.2:7006 to 192.168.50.2:7002
# Adding replica 192.168.50.2:7004 to 192.168.50.2:7003
# >>> Trying to optimize slaves allocation for anti-affinity
# [WARNING] Some slaves are in the same host as their master
# M: c2272de1873b8be6e37d0373b9a931908537c6d2 192.168.50.2:7001
#    slots:[0-5460] (5461 slots) master
# M: bd6273438bc3c07a20ecf4e5a21ab343d0d3fb62 192.168.50.2:7002
#    slots:[5461-10922] (5462 slots) master
# M: 5f3a68a4ec479c7e1f716757efbf6963e60856f1 192.168.50.2:7003
#    slots:[10923-16383] (5461 slots) master
# S: 7f28a5b326e812548748c819ffdd81dc8312959d 192.168.50.2:7004
#    replicates c2272de1873b8be6e37d0373b9a931908537c6d2
# S: a7f799d7979022301d2b397d2d66cf8d118f1fad 192.168.50.2:7005
#    replicates bd6273438bc3c07a20ecf4e5a21ab343d0d3fb62
# S: 72dbc09c46a58af82133909ea39d72d1b0d90f83 192.168.50.2:7006
#    replicates 5f3a68a4ec479c7e1f716757efbf6963e60856f1
# Can I set the above configuration? (type 'yes' to accept): 【yes】 这里输入yes回车
# >>> Nodes configuration updated
# >>> Assign a different config epoch to each node
# >>> Sending CLUSTER MEET messages to join the cluster
# Waiting for the cluster to join
# ..
# >>> Performing Cluster Check (using node 192.168.50.2:7001)
# M: c2272de1873b8be6e37d0373b9a931908537c6d2 192.168.50.2:7001
#    slots:[0-5460] (5461 slots) master
#    1 additional replica(s)
# S: a7f799d7979022301d2b397d2d66cf8d118f1fad 192.168.50.2:7005
#    slots: (0 slots) slave
#    replicates bd6273438bc3c07a20ecf4e5a21ab343d0d3fb62
# S: 72dbc09c46a58af82133909ea39d72d1b0d90f83 192.168.50.2:7006
#    slots: (0 slots) slave
#    replicates 5f3a68a4ec479c7e1f716757efbf6963e60856f1
# S: 7f28a5b326e812548748c819ffdd81dc8312959d 192.168.50.2:7004
#    slots: (0 slots) slave
#    replicates c2272de1873b8be6e37d0373b9a931908537c6d2
# M: bd6273438bc3c07a20ecf4e5a21ab343d0d3fb62 192.168.50.2:7002
#    slots:[5461-10922] (5462 slots) master
#    1 additional replica(s)
# M: 5f3a68a4ec479c7e1f716757efbf6963e60856f1 192.168.50.2:7003
#    slots:[10923-16383] (5461 slots) master
#    1 additional replica(s)
# [OK] All nodes agree about slots configuration.
# >>> Check for open slots...
# >>> Check slots coverage...
# [OK] All 16384 slots covered.
```

#### 3.3 测试集群效果

```bash
# 进入 redis-7002 容器
docker exec -it redis-7002 /bin/bash

# 使用 redis-cli 的cluster方式连接到集群中的某个节点（192.168.56.10:7006）
redis-cli -c -h 192.168.50.2 -p 7006

# 获取集群信息
cluster info

# cluster_state:ok
# cluster_slots_assigned:16384
# cluster_slots_ok:16384
# cluster_slots_pfail:0
# cluster_slots_fail:0
# cluster_known_nodes:6
# cluster_size:3
# cluster_current_epoch:6
# cluster_my_epoch:3
# cluster_stats_messages_ping_sent:526
# cluster_stats_messages_pong_sent:537
# cluster_stats_messages_meet_sent:3
# cluster_stats_messages_sent:1066
# cluster_stats_messages_ping_received:535
# cluster_stats_messages_pong_received:529
# cluster_stats_messages_meet_received:2
# cluster_stats_messages_received:1066

# 获取集群节点信息
cluster nodes

# 7f28a5b****312959d【4】 192.168.50.2:7004@17004 slave  c2272de****537c6d2【1】 0 1742553114000 4 connected
# c2272de****537c6d2【1】 192.168.50.2:7001@17001 master - 0 1742553115299 1 connected 0-5460
# 5f3a68e****60856f1【2】 192.168.50.2:7003@17003 master - 0 1742553114000 3 connected 10923-16383
# 72dbc0b****0d90f83【5】 192.168.50.2:7006@17006 myself, slave 5f3a68e****60856f1【2】 0 1742553112000 6 connected
# bd6243d****0d3fb62【3】 192.168.50.2:7002@17002 master - 0 1742553115000 2 connected 5461-10922
# a7f79d1****18f1fad【6】 192.168.50.2:7005@17005 slave bd6243d****0d3fb62【3】 0 1742553113000 2 connected

# 使用 GET/SET 命令进行测试，注意：操作会被自动重定向到其他节点
SET testkey "Hello, Redis!"
GET testkey

# 192.168.50.2:7006> SET testkey "Hello, Redis!"
# -> Redirected to slot [4757] located at 192.168.50.2:7001
# OK
# 192.168.50.2:7001> 

# 模拟节点宕机，停止某个主节点，观察从节点提升为主节点
docker stop redis-7001  # 停止主节点 redis-7001

# 查看集群节点状态，确认从节点是否已提升为主节点
docker exec -it redis-7002 /bin/bash
redis-cli -c -h 192.168.50.2 -p 7006 cluster nodes

# 7f28a5b****312959d【4】 192.168.50.2:7004@17004 master - 0 1742553682052 8 connected 0-5460 顶上了
# c2272de****537c6d2【1】 192.168.50.2:7001@17001 master,fail - 1742553634825 1742553634023 1 disconnected 断开连接
# 5f3a68e****60856f1【2】 192.168.50.2:7003@17003 master - 0 1742553682557 3 connected 10923-16383
# 72dbc0b****0d90f83【5】 192.168.50.2:7006@17006 myself,slave 5f3a68e****60856f1【2】 0 1742553682000 6 connected
# bd6243d****0d3fb62【3】 192.168.50.2:7002@17002 master - 0 1742553682557 2 connected 5461-10922
# a7f79d1****18f1fad【6】 192.168.50.2:7005@17005 slave bd6243d****0d3fb62【3】 0 1742553681000 2 connected


# 恢复主节点，重新启动它，它会变为从节点
docker start redis-7001

# 7f28a5b****312959d【4】 192.168.50.2:7004@17004 master - 0 1742553682052 8 connected 0-5460
# c2272de****537c6d2【1】 192.168.50.2:7001@17001 slave 7f28a5b****312959d【4】 0 1742553826731 8 connected 变为从节点
# 5f3a68e****60856f1【2】 192.168.50.2:7003@17003 master - 0 1742553682557 3 connected 10923-16383
# 72dbc0b****0d90f83【5】 192.168.50.2:7006@17006 myself,slave 5f3a68e****60856f1【2】 0 1742553682000 6 connected
# bd6243d****0d3fb62【3】 192.168.50.2:7002@17002 master - 0 1742553682557 2 connected 5461-10922
# a7f79d1****18f1fad【6】 192.168.50.2:7005@17005 slave bd6243d****0d3fb62【3】 0 1742553681000 2 connected
```

### 4. k8s部署redis

> 这个部分与Mysql集群有很多类似的部分 ，空间有限 单节点

=>创建配置`配置字典` 名称： `redis-conf`， 创建键值：`key`：`redis-conf`, `value`:  `appendonly yes`

=>创建存储`持久卷声明` 名称： `gulimall-redis-pvc`, 定义存储类：`自定义`， 访问模式：`ReadWriteOnce`，容量默认`10G`

=>创建有状态服务 名称： `redis`，镜像：`redis:5.0.7`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：`10-500Mi`

> 这里加一个启动命令，让其执行自己的配置文件`redis.conf`

![image-20250322210352632](/images/cluster/image-20250322210352632.png)

![image-20250322210614324](/images/cluster/image-20250322210614324.png)

![image-20250322210738785](/images/cluster/image-20250322210738785.png)

## Elasticsearch集群

> 当前笔记来自：尚硅谷-谷粒商城 后续关于Redis集群的笔记汇总到这里

### 1. 集群原理

https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html

https://www.elastic.co/guide/cn/elasticsearch/guide/current/distributed-cluster.html

elasticsearch
是天生支持集群的，他不需要依赖其他的服务发现和注册的组件，如zookeeper这些，因为他内置了一个名字叫ZenDiscovery的模块，是elasticsearch自己实现的一套用于节点发现和选主等功能的组件，所以elasticsearch做起集群来非常简单，不需要太多额外的配置和安装额外的第三方组件。

#### 1.1 单节点

![image-20250321185035848](/images/cluster/image-20250321185035848.png)

- 一个运行中的 Elasticsearch 实例称为一个节点，而集群是由一个或者**多个拥有相同cluster.name 配置的节点组成**，
  它们共同承担数据和负载的压力。**当有节点加入集群中或者从集群中移除节点时，集群将会重新平均分布所有的数据**。
- 当一个节点被选举成为**主节点**时， 它将负责管理集群范围内的所有变更，例如增加、删除索引，或者增加、删除节点等。
  而主节点并不需要涉及到文档级别的变更和搜索等操作，所以当集群只拥有一个主节点的情况下，即使流量的增加它也不会成为瓶颈。任何节点都可以成为主节点。我们的示例集群就只有一个节点，所以它同时也成为了主节点。
- 作为用户，我们可以将请求发送到 集群中的任何节点 ，包括主节点。 每个节点都知道任意文档所处的位置，并且能够将我们的请求直接转发到存储我们所需文档的节点。
  无论我们将请求发送到哪个节点，它都能负责从各个包含我们所需文档的节点收集回数据，并将最终结果返回給客户端。 Elasticsearch
  对这一切的管理都是透明的。

#### 1.2 集群健康

Elasticsearch 的集群监控信息中包含了许多的统计数据，其中最为重要的一项就是 集群健 康 ， 它在 status 字段中展示为 green 、
yellow 或者 red 。

`ET /_cluster/health`

`status` 字段指示着当前集群在总体上是否工作正常。它的三种颜色含义如下：

- `green`：所有的主分片和副本分片都正常运行。
- `yellow`：所有的主分片都正常运行，但不是所有的副本分片都正常运行。
- `red`：有主分片没能正常运行。

#### 1.3 分片

- 一个分片是一个底层的 工作单元 ，它仅保存了全部数据中的一部分。我们的文档被存储和索引到分片内，但是应用程序是直接与索引而不是与分片进行交互。分片就认为是一个数据区
- 一个分片可以是 主 分片或者 副本 分片。索引内任意一个文档都归属于一个主分片， 所以主分片的数目决定着索引能够保存的最大数据量。
- **在索引建立的时候就已经确定了主分片数**，但是副本分片数可以随时修改。
- 让我们在包含一个空节点的集群内创建名为 blogs 的索引。索引在默认情况下会被分配5个主分片， 但是为了演示目的，我们将分配3个主分片和一份副本（每个主分片
  拥有一个副本分片）：

```bash
PUT /blogs{
 "settings" : {
     "number_of_shards" : 3,
     "number_of_replicas" : 1
 }}
```

![image-20250321185446563](/images/cluster/image-20250321185446563.png)

此时集群的健康状况为 **yellow** 则表示全部 **主分片都正常运行**（集群可以正常服务所有请求），但是 **副本** **分片没有全部处在正常状态
**。实际上，所有3个副本分片都是 unassigned—— 它们都没有被分配到任何节点。**
在同一个节点上既保存原始数据又保存副本是没有意义的，因为一旦失去了那个节点，我们也将丢失该节点上的所有副本数据 **。

当前我们的集群是正常运行的，但是在硬件故障时有丢失数据的风险。

#### 1.4 新增节点

当你在同一台机器上启动了第二个节点时，只要它和第一个节点有同样的 cluster.name 配置，它就会自动发现集群并加入到其中。
但是在不同机器上启动节点的时候，为了加入到同一集群，你需要配置一个可连接到的单播主机列表。 详细信息请查看最好使用单播代替组播

![image-20250321185641328](/images/cluster/image-20250321185641328.png)

此时，cluster-health 现在展示的状态为 green ，这表示所有6个分片（包括3个主分片和3
个副本分片）都在正常运行。我们的集群现在不仅仅是正常运行的，并且还处于始终可用的状态。

#### 1.5 水平扩容

![image-20250321185718076](/images/cluster/image-20250321185718076.png)

Node 1 和 Node2 上各有一个分片被迁移到了新的 Node3 节点，现在每个节点上都拥有2个分片，而不是之前的3个。
这表示每个节点的硬件资源（CPU,RAM, I/O）将被更少的分片所共享，每个分片的性能将会得到提升。

在运行中的集群上是可以动态调整副本分片数目的，我们可以按需伸缩集群。让我们把副本数从默认的 1 增加到 2

```bash
PUT /blogs/_settings
 {
 "number_of_replicas" : 2
}
```

blogs 索引现在拥有9个分片：3个主分片和6个副本分片。 这意味着我们可以将集群扩容到9个节点，每个节点上一个分片。相比原来3个节点时，集群搜索性能可以提升3倍。

![image-20250321185818182](/images/cluster/image-20250321185818182.png)

#### 1.6 应对故障

![image-20250321185826754](/images/cluster/image-20250321185826754.png)

- 我们关闭的节点是一个主节点。而集群必须拥有一个主节点来保证正常工作，所以发生的第一件事情就是选举一个新的主节点： Node2 。
- 在我们关闭 Node1 的同时也失去了主分片 1 和 2 ，并且在缺失主分片的时候索引也不能正常工作。如果此时来检查集群的状况，我们看到的状态将会为
  red ：不是所有主分片都在正常工作。
- 幸运的是，在其它节点上存在着这两个主分片的完整副本， 所以新的主节点立即将这些分片在 Node2 和 Node3
  上对应的副本分片提升为主分片，此时集群的状态将会为 yellow 。 这个提升主分片的过程是瞬间发生的，如同按下一个开关一般。
- 为什么我们**集群状态是 yellow 而不是 green 呢**？ 虽然我们拥有所有的三个主分片， 但是同时设置了每个主分片需要对应2份副本分片，而此时只存在一份副本分片。
  所以集群不能为 green 的状态，不过我们不必过于担心：如果我们同样关闭了 Node2 ， 我们的程序依然可以保持在不丢任何数据的情况下运行，因为
  Node3 为每一个分片都保留着一份副本。
- 如果我们重新启动 Node1，集群可以将缺失的副本分片再次进行分配。如果 Node1依然拥有着之前的分片，它将尝试去重用它们，同时仅从主分片复制发生了修改的数据文件。

#### 1.7 问题与解决

1、主节点

主节点负责创建索引、删除索引、分配分片、追踪集群中的节点状态等工作。Elasticsearch中的主节点的工作量相对较轻，用户的请求可以发往集群中任何一个节点，由该节点负责分发和返回结果，而不需要经过主节点转发。
**而主节点是由候选主节点通过ZenDiscovery机制选举出来的，所以要想成为主节点，首先要先成为候选主节点。**

2、候选主节点

在elasticsearch 集群初始化或者主节点宕机的情况下，由候选主节点中选举其中一个作为主节点。指定候选主节点的配置为：*
*node.master:true**。

当主节点负载压力过大，或者集中环境中的网络问题，导致其他节点与主节点通讯的时候， 主节点没来的及响应，这样的话，某些节点就认为主节点宕机，重新选择新的主节点，这样
的话整个集群的工作就有问题了，比如我们集群中有10个节点，其中7个候选主节点，1个候选主节点成为了主节点，这种情况是正常的情况。但是如果现在出现了我们上面所说的主节点响应不及时，导致其他某些节点认为主节点宕机而重选主节点，那就有问题了，这剩
下的6个候选主节点可能有3个候选主节点去重选主节点，最后集群中就出现了两个主节点的情况，这种情况官方成为“**脑裂现象”**；

集群中不同的节点对于master的选择出现了分歧，出现了多个master竞争，导致主分片和副本的识别也发生了分歧，**对一些分歧中的分片标识为了坏片
**。

3、数据节点

数据节点负责数据的存储和相关具体操作，比如CRUD、搜索、聚合。所以，数据节点对机器配置要求比较高，首先需要有足够的磁盘空间来存储数据，其次数据操作对系统CPU、
Memory 和IO的性能消耗都很大。通常随着集群的扩大，需要增加更多的数据节点来提高可用性。指定数据节点的配置：`node.data: true`。
elasticsearch 是允许一个节点既做候选主节点也做数据节点的，但是数据节点的负载较重，
所以需要考虑将二者分离开，设置专用的候选主节点和数据节点，避免因数据节点负载重导致主节点不响应

4、客户端节点

客户端节点就是既不做候选主节点也不做数据节点的节点，只负责请求的分发、汇总等等， 但是这样的工作，其实任何一个节点都可以完成，因为elasticsearch
中一个集群内的节点 都可以执行任何请求，其会负责将请求转发给对应的节点进行处理。所以单独增加这样的节 点更多是为了负载均衡。指定该节点的配置为：

`node.master: false`

`node.data: false`

5、脑裂”问题可能的成因

1.网络问题：集群间的网络延迟导致一些节点访问不到master，认为master挂掉了从而选举出新的master，并对master上的分片和副本标红，分配新的主分片

2.节点负载：主节点的角色既为master又为data，访问量较大时可能会导致ES停止响应造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。

3.内存回收：data节点上的ES进程占用的内存较大，引发JVM的大规模内存回收，造成ES 进程失去响应。

脑裂问题解决方案：

- **角色分离**：即master节点与data节点分离，限制角色；数据节点是需要承担存储 和搜索的工作的，压力会很大。所以如果该节点同时作为候选主节点和数据节点，
  那么一旦选上它作为主节点了，这时主节点的工作压力将会非常大，出现脑裂现象 的概率就增加了。
- **减少误判**：配置主节点的响应时间，在默认情况下，主节点3秒没有响应，其他节 点就认为主节点宕机了，那我们可以把该时间设置的长一点，该配置是：
  `discovery.zen.ping_timeout: 5`
- **选举触发**：`discovery.zen.minimum_master_nodes:1`（默认是 1），该属性定义的是 为了形成一个集群，有主节点资格并互相连接的节点的最小数目。
  - 一个有10 节点的集群，且每个节点都有成为主节点的资格， discovery.zen.minimum_master_nodes 参数设置为 6。
  - 正常情况下，10个节点，互相连接，大于6，就可以形成一个集群。
  - 若某个时刻，其中有3个节点断开连接。剩下7个节点，大于6，继续运行之 前的集群。而断开的3个节点，小于6，不能形成一个集群。
  - 该参数就是为了防止”脑裂”的产生。
  - 建议设置为(候选主节点数 /2)+1,

#### 1.8 集群结构

以三台物理机为例。在这三台物理机上，搭建了6个ES的节点，三个data节点，三个master
节点（每台物理机分别起了一个data和一个master），3个master节点，目的是达到（n/2） +1
等于2的要求，这样挂掉一台master后（不考虑data），n等于2，满足参数，其他两 个master 节点都认为master挂掉之后开始重新选举

```bash
# master 节点上 
node.master = true 
node.data = false discovery.zen.minimum_master_nodes = 2 

# data 节点上 
node.master = false 
node.data = true
```

![image-20250321190904085](/images/cluster/image-20250321190904085.png)

### 2. 集群搭建

临时修改 `vm.max_map_count`（仅在当前会话有效）

```bash
# 临时修改 vm.max_map_count 以避免 JVM 错误
sysctl -w vm.max_map_count=262144
```

永久修改 `vm.max_map_count`（系统重启后依然生效）

```bash
# 永久修改 vm.max_map_count 以确保配置在重启后生效
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf

# 使配置生效
sudo sysctl -p
```

#### 2.0 准备docker网络

Docker 创建容器时默认采用bridge网络，自行分配ip，不允许自己指定

在实际部署中，我们需要指定容器ip，不允许其自行分配ip，尤其是搭建集群时，固定ip 是必须的。

我们可以创建自己的bridge网络：`mynet`，创建容器的时候指定网络为`mynet`并指定ip 即可。

查看网络模式`docker network ls`；

创建一个新的`bridge`网络

`docker network create --driver bridge --subnet=172.19.0.0/16 --gateway=172.19.1.1 mynet `

查看网络信息 `docker network inspect mynet`

以后使用 `--network=mynet--ip172.19.0.x` 指定ip

#### 2.1 3-Master节点创建

```bash
# 循环创建 Elasticsearch 节点
for port in $(seq 1 3); do
  # 创建必要的目录
  mkdir -p /home/slienceme/docker/cluster/elasticsearch/master-${port}/config
  mkdir -p /home/slienceme/docker/cluster/elasticsearch/master-${port}/data
  chmod -R 777 /home/slienceme/docker/cluster/elasticsearch/master-${port}

  # 创建配置文件
  cat << EOF > /home/slienceme/docker/cluster/elasticsearch/master-${port}/config/elasticsearch.yml
cluster.name: my-es # 集群的名称，同一个集群该值必须设置成相同的
node.name: es-master-${port} # 该节点的名字
node.master: true # 该节点有机会成为 master 节点
node.data: false # 该节点不存储数据
network.host: 0.0.0.0
http.host: 0.0.0.0 # 所有 http 请求均可访问
http.port: 920${port}
transport.tcp.port: 930${port}
# discovery.zen.minimum_master_nodes: 2 # 设置这个参数来保证集群中的节点可以知道其他 N 个有 master 资格的节点。官方推荐（N/2）+1
discovery.zen.ping_timeout: 10s # 设置集群中自动发现其他节点时 ping 连接的超时时间
discovery.seed_hosts: ["172.19.0.21:9301", "172.19.0.22:9302", "172.19.0.23:9303"] # 设置集群中的 Master 节点的初始列表，可以通过这些节点来自动发现其他新加入集群的节点，ES7 的新增配置
cluster.initial_master_nodes: ["172.19.0.21"] # 新集群初始时的候选主节点，ES7 的新增配置
EOF

  # 启动 Docker 容器
  docker run --name elasticsearch-node-${port} \
    -p 920${port}:920${port} -p 930${port}:930${port} \
    --network mynet --ip 172.19.0.2${port} \
    -e ES_JAVA_OPTS="-Xms300m -Xmx300m" \
    -v /home/slienceme/docker/cluster/elasticsearch/master-${port}/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
    -v /home/slienceme/docker/cluster/elasticsearch/master-${port}/data:/usr/share/elasticsearch/data \
    -v /home/slienceme/docker/cluster/elasticsearch/master-${port}/plugins:/usr/share/elasticsearch/plugins \
    -d elasticsearch:7.4.2
done

# ...     PORTS                       NAMES
# ...9200/tcp, 0.0.0.0:9203->9203/tcp, :::9203->9203/tcp, 9300/tcp, 0.0.0.0:9303->9303/tcp, :::9303->9303/tcp   el..-node-3
# ...9200/tcp, 0.0.0.0:9202->9202/tcp, :::9202->9202/tcp, 9300/tcp, 0.0.0.0:9302->9302/tcp, :::9302->9302/tcp   el..-node-2
# ...9200/tcp, 0.0.0.0:9201->9201/tcp, :::9201->9201/tcp, 9300/tcp, 0.0.0.0:9301->9301/tcp, :::9301->9301/tcp   el..-node-1

# 停止并删除所有 Elasticsearch 容器
docker stop $(docker ps -a | grep elasticsearch-node-* | awk '{print $1}')
docker rm $(docker ps -a | grep elasticsearch-node-* | awk '{print $1}')
```

#### 2.2 3-Data-Node创建

```bash
# 循环创建 Elasticsearch 节点
for port in $(seq 4 6); do
  # 创建必要的目录
  mkdir -p /home/slienceme/docker/cluster/elasticsearch/node-${port}/config
  mkdir -p /home/slienceme/docker/cluster/elasticsearch/node-${port}/data
  chmod -R 777 /home/slienceme/docker/cluster/elasticsearch/node-${port}

  # 创建配置文件
  cat << EOF > /home/slienceme/docker/cluster/elasticsearch/node-${port}/config/elasticsearch.yml
cluster.name: my-es  # 集群的名称，同一个集群该值必须设置成相同的
node.name: es-node-${port}  # 该节点的名字
node.master: false  # 该节点不会成为 master 节点
node.data: true  # 该节点存储数据
network.host: 0.0.0.0
# network.publish_host: 192.168.56.10  # 互相通信的 IP，要设置为本机可被外界访问的 IP，否则无法通信
http.host: 0.0.0.0  # 所有 http 请求均可访问
http.port: 920${port}
transport.tcp.port: 930${port}
# discovery.zen.minimum_master_nodes: 2  # 设置该参数来保证集群中的节点可以知道其他有 master 资格的节点，官方推荐（N/2）+1
discovery.zen.ping_timeout: 10s  # 设置集群中自动发现其他节点时 ping 连接的超时时间
discovery.seed_hosts: ["172.19.0.21:9301", "172.19.0.22:9302", "172.19.0.23:9303"]  # 设置集群中 Master 节点的初始列表，可以通过这些节点来自动发现其他新加入集群的节点，ES7 的新增配置
cluster.initial_master_nodes: ["172.19.0.21"]  # 新集群初始时的候选主节点，ES7 的新增配置
EOF

  # 启动 Docker 容器
  docker run --name elasticsearch-node-${port} \
    -p 920${port}:920${port} -p 930${port}:930${port} \
    --network mynet --ip 172.19.0.2${port} \
    -e ES_JAVA_OPTS="-Xms300m -Xmx300m" \
    -v /home/slienceme/docker/cluster/elasticsearch/node-${port}/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
    -v /home/slienceme/docker/cluster/elasticsearch/node-${port}/data:/usr/share/elasticsearch/data \
    -v /home/slienceme/docker/cluster/elasticsearch/node-${port}/plugins:/usr/share/elasticsearch/plugins \
    -d elasticsearch:7.4.2
done
```

![image-20250321200232137](/images/cluster/image-20250321200232137.png)

#### 2.3 测试集群

> 可以访问 链接 判断运行情况

```bash
http://192.168.50.2:9201/_nodes/process?pretty   # 查看节点状况
http://192.168.50.2:9201/_cluster/stats?pretty   # 查看集群状态
http://192.168.50.2:9201/_cluster/health?pretty  # 查看集群健康状况
http://192.168.50.2:9202/_cat/nodes              # 查看各个节点信息

# 172.19.0.26 44 54 29 1.50 1.35 1.28 dil - es-node-6
# 172.19.0.23 25 54 29 1.50 1.35 1.28 ilm - es-master-3
# 172.19.0.25 42 54 29 1.50 1.35 1.28 dil - es-node-5
# 172.19.0.22 36 54 52 1.50 1.35 1.28 ilm * es-master-2  主节点
# 172.19.0.24 43 54 52 1.50 1.35 1.28 dil - es-node-4
# 172.19.0.21 41 54 12 1.50 1.35 1.28 ilm - es-master-1

$curl localhost:9200/_cat
# =^.^=
# /_cat/allocation
# /_cat/shards
# /_cat/shards/{index}
# /_cat/master
# /_cat/nodes
# /_cat/tasks
# /_cat/indices
# /_cat/indices/{index}
# /_cat/segments
# /_cat/segments/{index}
# /_cat/count
# /_cat/count/{index}
# /_cat/recovery
# /_cat/recovery/{index}
# /_cat/health
# /_cat/pending_tasks
# /_cat/aliases
# /_cat/aliases/{alias}
# /_cat/thread_pool
# /_cat/thread_pool/{thread_pools}
# /_cat/plugins
# /_cat/fielddata
# /_cat/fielddata/{fields}
# /_cat/nodeattrs
# /_cat/repositories
# /_cat/snapshots/{repository}
# /_cat/templates
```

### 3. k8s 上部署Elasticsearch

=>创建配置`配置字典` 名称： `elastic-search-conf` 可配置很多内容

创建键值：`key`：`http.host`, `value`:  `0.0.0.0`

创建键值：`key`：`discovery-type`, `value`:  `single-node`

创建键值：`key`：`ES_JAVA_OPTS`, `value`:  `-Xms64m -Xmx512m`

> 出现报错： [1]: initial heap size [67108864] not equal to maximum heap size [536870912]; this can cause resize pauses
> and prevents mlockall from locking the entire heap
>
> 改为：-Xms512m -Xmx512m
>
> 出现报错： [2]: the default discovery settings are unsuitable for production use; at least one
> of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured
>
> discovery.seed_hosts: ["host1", "host2"]
> cluster.initial_master_nodes: ["node1", "node2"]
>
> 这个可以不改 保持单节点

=>创建存储`持久卷声明` 名称： `elasticsearch-pvc`, 定义存储类：`自定义`， 访问模式：`ReadWriteOnce`，容量默认`10G`

=>创建有状态服务 名称： `elasticsearch`，镜像：`elasticsearch:7.4.2`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：`10-1500Mi`

=> 挂载`/usr/share/elasticsearch/data`

![image-20250322212258568](/images/cluster/image-20250322212258568.png)

![image-20250322212520913](/images/cluster/image-20250322212520913.png)

=>创建无状态服务：`kibana`  镜像：`kibana:7.4.2`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：`10-500Mi`

设置环境变量  `key`: `ELASTICSEARCH_HOSTS`  `value`: `http://elasticsearch.gulimall:9200 (elasticsearch域名) `无需挂载pcv

![image-20250322214026867](/images/cluster/image-20250322214026867.png)

![image-20250322215232456](/images/cluster/image-20250322215232456.png)

> 使用任意一台集群主机，访问 http://集群主机IP:开放端口/ 即可访问kibana

## RabbitMQ集群

> 当前笔记来自：尚硅谷-谷粒商城 后续关于Redis集群的笔记汇总到这里
>
> 另外来源：[2024最全RabbitMQ集群方案汇总](https://developer.aliyun.com/article/1646161)

### 1. 集群形式

RabbiMQ 是用Erlang 开发的，集群非常方便，因为Erlang天生就是一门分布式语言，但其本身并不支持负载均衡。

RabbitMQ 集群中节点包括**内存节点(RAM)**、**磁盘节点(Disk，消息持久化)**，集群中至少有 一个Disk节点。

- **普通模式(默认)**

  对于普通模式，集群中各节点有相同的队列结构，但消息只会存在于集群中的一个节点。对于消费者来说，若消息进入A节点的Queue中，当从B节点拉取时，RabbitMQ会将消息从A中取出，并经过B发送给消费者。

  应用场景：该模式各适合于消息无需持久化的场合，如日志队列。当队列非持久化，且创建该队列的节点宕机，客户端才可以重连集群其他节点，并重新创建队列。若为持久化，只能等故障节点恢复。

如果生产者向集群中的Node3节点发送一条消息，此时集群中的其它节点是没有这条消息的，只有Node3才这条消息。

优点：资源利用效率高，因为消息不会被复制到所有节点。

缺点：如果持有队列的节点宕机，该队列将不可用，直到节点恢复。

![img](/images/cluster/qcazreabeg5vk_294e69a5f4104c31b98bbd52dadf17c9.jpeg)

- **镜像模式**

  与普通模式不同之处是消息实体会主动在镜像节点间同步，而不是在取数据时临时拉取，高可用；该模式下，mirrorqueue有一套选举算法，即1个master、n个slaver，生产者、消费者的请求都会转至master。

  应用场景：可靠性要求较高场合，如下单、库存队列。

  缺点：若镜像队列过多，且消息体量大，集群内部网络带宽将会被此种同步通讯所消耗。

  （1）镜像集群也是基于普通集群，即只有先搭建普通集群，然后才能设置镜像队列。

  （2）若消费过程中，master挂掉，则选举新master，若未来得及确认，则可能会重复消费

如果生产者向集群发送一条消息，此时集群中的其它节点都会有这条消息。

优点：提高了可用性，因为如果主副本所在的节点失效，最老的从副本会被提升为新的主副本。

缺点： 增加了网络带宽和磁盘空间的使用，因为每个消息都被复制到所有镜像。写入吞吐量可能下降，因为每个操作都需要被复制。在网络分区的情况下可能导致脑裂或数据丢失。

![img](/images/cluster/qcazreabeg5vk_df53f92f662b41e8bb53188c742fc17b.jpeg)

#### 1.1 搭建集群

```bash
# 创建目录结构
mkdir /home/slienceme/docker/cluster/rabbitmq
cd /home/slienceme/docker/cluster/rabbitmq
mkdir rabbitmq01 rabbitmq02 rabbitmq03

# 启动 rabbitmq01 容器
docker run -d --hostname rabbitmq01 --name rabbitmq01 -v /home/slienceme/docker/cluster/rabbitmq/rabbitmq01:/var/lib/rabbitmq -p 15673:15672 -p 5673:5672 -e RABBITMQ_ERLANG_COOKIE='slienceme' rabbitmq:management

# 启动 rabbitmq02 容器，并与 rabbitmq01 进行连接
docker run -d --hostname rabbitmq02 --name rabbitmq02 -v /home/slienceme/docker/cluster/rabbitmq/rabbitmq02:/var/lib/rabbitmq -p 15674:15672 -p 5674:5672 -e RABBITMQ_ERLANG_COOKIE='slienceme' --link rabbitmq01:rabbitmq01 rabbitmq:management

# 启动 rabbitmq03 容器，并与 rabbitmq01 和 rabbitmq02 进行连接
docker run -d --hostname rabbitmq03 --name rabbitmq03 -v /home/slienceme/docker/cluster/rabbitmq/rabbitmq03:/var/lib/rabbitmq -p 15675:15672 -p 5675:5672 -e RABBITMQ_ERLANG_COOKIE='slienceme' --link rabbitmq01:rabbitmq01 --link rabbitmq02:rabbitmq02 rabbitmq:management
```

> `--hostname`：设置容器的主机名（容器内的 `/etc/hosts` 会有映射）。
>
> `RABBITMQ_ERLANG_COOKIE`：Erlang cookie 用于节点间的认证，当集群部署时需要确保每个节点的值相同。
>
> `--link`：将容器间建立链接，确保它们能够相互通信。在这个例子中，`rabbitmq02` 和 `rabbitmq03` 会与 `rabbitmq01` 进行连接

![image-20250321202455093](/images/cluster/image-20250321202455093.png)

#### 1.2 节点加入集群

```bash
# 进入 rabbitmq01 容器并重置应用
docker exec -it rabbitmq01 /bin/bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
exit

# 进入 rabbitmq02 容器，加入 rabbitmq01 到集群
docker exec -it rabbitmq02 /bin/bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbitmq01
rabbitmqctl start_app
exit

# 进入 rabbitmq03 容器，加入 rabbitmq01 到集群
docker exec -it rabbitmq03 /bin/bash
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster --ram rabbit@rabbitmq01
rabbitmqctl start_app
exit
```

> `rabbitmqctl stop_app`：停止 RabbitMQ 应用。
>
> `rabbitmqctl reset`：重置 RabbitMQ 节点，清除现有的集群配置。
>
> `rabbitmqctl start_app`：重新启动 RabbitMQ 应用。
>
> `rabbitmqctl join_cluster --ram rabbit@rabbitmq01`：将 `rabbitmq02` 和 `rabbitmq03` 加入到 `rabbitmq01` 的集群中，并指定
`--ram`（内存节点），这意味着这些节点不持久化数据。

可以访问 `http://192.168.50.2:15675/`查看

![image-20250321202906776](/images/cluster/image-20250321202906776.png)

#### ~~1.3 实现镜像集群(deprecated)~~

**Classic Queue Mirroring已被弃用**

在RabbitMQ的早期版本中，经典队列镜像允许队列内容在集群中的多个节点上进行复制，以实现高可用性。然而，由于其性能和可扩展性的限制，它将在RabbitMQ
4.0版本中被弃用，并建议使用Quorum队列和Streams作为替代。

![image-20250321210632510](/images/cluster/image-20250321210632510.png)

```bash
# 进入 rabbitmq01 容器
docker exec -it rabbitmq01 /bin/bash

# 设置高可用（HA）策略，确保所有队列都能在集群中复制  ha高可用
# rabbitmqctl set_policy -p / ha "^" '{"ha-mode":"all","ha-sync-mode":"automatic"}' # deprecated since 2021
rabbitmqctl set_policy qq-overrides \
    "^" '{"delivery-limit": 50, "dead-letter-exchange": "redeliveries.limit.dlx"}' \
    --priority 123 \
    --apply-to "quorum_queues"


# 查看当前 vhost 下的所有 policy
rabbitmqctl list_policies -p /

# 设置另一个HA 策略，只复制到所有节点，包含新增节点
rabbitmqctl set_policy -p / ha-all "^" '{"ha-mode":"all"}'

# 查看版本
rabbitmqctl status
exit

# 停止并删除所有 Elasticsearch 容器
docker stop $(docker ps -a | grep rabbitmq* | awk '{print $1}')
docker rm $(docker ps -a | grep rabbitmq* | awk '{print $1}')
```

> `rabbitmqctl set_policy`：设置一个策略。`-p /` 表示设置在默认虚拟主机 `/` 下。
>
> `"ha-mode":"all"`：表示该策略会将队列复制到集群中的所有节点，包括新加入的节点。
>
> ~~`"ha-sync-mode":"automatic"`
：自动同步队列的镜像，使其在节点间保持一致。~~  [官网链接 ](https://www.rabbitmq.com/docs/3.13/ha#what-is-mirroring) [中文](https://rabbitmq.cn/docs/ha)
>
> `ha-params: 10000`：这个参数决定了队列复制到所有节点的数量。`10000` 是一个大数字，表示所有节点都应当复制该队列。
>
> `"^"`：正则表达式，表示匹配所有队列。`"^hello"` 表示只匹配队列名以 `hello` 开头的队列。
>
> `rabbitmqctl list_policies -p /`：列出当前虚拟主机 `/` 下的所有策略。

#### 1.4 Quorum队列模式（仲裁队列）

Quorum队列是在RabbitMQ 3.8中引入的，旨在克服镜像队列的一些限制。基于Raft共识算法，提供更强的一致性保证。队列数据在奇数个节点（通常是3或5）之间复制。只要大多数节点（即quorum）可用，队列就能继续工作。

![img](/images/cluster/qcazreabeg5vk_f07ce513bf61474a86c7c0ffb6a00330.jpeg)

Quorum队列与镜像队列类似，不过在性能与完整性做了权衡，只要集群中的大多数节点（即quorum）可用。另外集群的节点使用的是Leader和follower。

- **优点：**
  - 更好的故障处理：能更优雅地处理网络分区，减少数据丢失的风险。
  - 显式的故障转移：不像镜像队列中的隐式故障转移，Quorum队列中的leader选举是明确的。
  - 没有脑裂问题：由于使用了共识算法，即使在网络分区的情况下也能保证数据一致性。
- **缺点：**
  - 由于需要在多数节点上达成一致，可能比镜像队列稍慢一些。
  - 不支持一些高级特性，如优先级队列、消息TTL等。

![image-20250321211408334](/images/cluster/image-20250321211408334.png)

![image-20250321211457852](/images/cluster/image-20250321211457852.png)

#### 1.5 流模式（Streams）

Streams是RabbitMQ 3.9+ 最新引入的一种新型数据结构，借鉴了Apache Kafka的一些理念。消息以追加日志的形式存储，支持多消费者订阅，每个消费者维护自己的消费位置。

![img](/images/cluster/qcazreabeg5vk_76b0397965cd4cc7a4e57548a0865728.png)

RabbitMQ
3.9引入了流特性，它是为高吞吐量场景优化的。流由领导者和副本Erlang进程组成，分布在RabbitMQ集群的节点上。发布应用程序可以连接到任何节点，消息会自动转发到领导者进程所在的节点。而消费应用程序必须连接到包含流成员的节点，以利用sendfile优化。

- **优点：**
  - 持久化开销小，非常适合需要长期存储大量消息的场景。
  - 支持消息重放，消费者可以从任意位置开始消费。
  - 集群复制基于Raft算法，提供了类似Quorum队列的一致性保证。
- **缺点：**
  - 作为新特性，可能还不够成熟，某些客户端库的支持可能有限。

### 2. 集群测试

### 3. k8s 上部署

=>创建存储`持久卷声明` 名称： `rabbitmq-pvc`, 定义存储类：`自定义`， 访问模式：`ReadWriteOnce`，容量默认`10G`

=>创建有状态服务 名称： `rabbitmq-management`，镜像：`rabbitmq:management`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：
`10-1000Mi`

挂载路径 `/var/lib/rabbitmq`

![image-20250322215917987](/images/cluster/image-20250322215917987.png)

![image-20250322220102751](/images/cluster/image-20250322220102751.png)

## 其他部署k8s应用

### 1. nacos(服务中心配置中心)

> 注意：该项目nacos没有做集群的模式
>
> 如果需要，可以将nacos配置存储到数据库，持久化配置
>
> 设置配置文件`application.properties`里面指定如下：例如

```bash
db_num=2
db.url.0=jdbc:mysql://IP:3306/database_name?....
db.url.1=jdbc:mysql://IP:3306/database_name?....
db.user=nacos_devtest
db.password=nacos
```

=>创建存储`持久卷声明` 名称： `nacos-pvc`, 定义存储类：`自定义`， 访问模式：`ReadWriteOnce`，容量默认`1G`

=>创建有状态服务 名称： `nacos`，镜像：`nacos-server:1.1.4`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：`10-500Mi`

设置环境变量：`MODE`：`standalone`

挂载目录 `/home/nacos/data`

![image-20250322221706099](/images/cluster/image-20250322221706099.png)

![image-20250322221912538](/images/cluster/image-20250322221912538.png)

```bash
 docker run --env MODE=standalone --name nacos \
 -v /mydata/nacos/conf:/home/nacos/conf -d -p 8848:8848 nacos/nacos-server:1.1.4
```

> 可以在不重新创建容器的情况下，修改服务类型=>先删除服务但不删除关联内容=>重新`创建指定工作负载服务`

![image-20250323090341171](/images/cluster/image-20250323090341171.png)

> 这里是为了部署SpringBoot项目，开放使用内部域名访问的方式，无需开启外部访问

![image-20250323100213148](/images/cluster/image-20250323100213148.png)

![image-20250323090356599](/images/cluster/image-20250323090356599.png)

![image-20250323090446818](/images/cluster/image-20250323090446818.png)

访问 路径 `http://集群主机IP:开放端口/nacos/` 即可

### 2. zipkin(链路追踪)

=>创建无状态服务 名称： `zipkin`，镜像：`openzipkin/zipkin`, 默认镜像端口，CPU：`0.01-0.5 Core` 内存：`10-500Mi`

设置环境变量：`STORAGE_TYPE`：`elasticsearch`

设置环境变量：`ES_HOSTS`：`192.168.56.10:9200`

开放外网访问 `NodePort`

```bash
docker run -d -p 9411:9411 openzipkin/zipkin:2.20.1 
# 或者 
docker run --env STORAGE_TYPE=elasticsearch --env ES_HOSTS=192.168.56.10:9200 openzipkin/zipkin:2.20.1 
```

![image-20250323091603472](/images/cluster/image-20250323091603472.png)

访问 路径 `http://集群主机IP:开放端口` 即可

### 3. sentinel(流量监控)

> 注：sentinel没有官网镜像

=>创建无状态服务 名称： `sentinel`，镜像：`bladex/sentinel-dashboard:1.6.3`, 默认镜像端口`(我这里服务端口改为8333)`，CPU：
`0.01-0.5 Core` 内存：`10-500Mi`

设置环境变量：`STORAGE_TYPE`：`elasticsearch`

设置环境变量：`ES_HOSTS`：`192.168.56.10:9200`

开放外网访问 `NodePort`

```bash
# 可以制作一个镜像并启动它，暴露访问
docker run --name sentinel -d -p 8858:8858 bladex/sentinel-dashboard:1.6.3
```

访问 路径 `http://集群主机IP:开放端口` 即可

### 4. Spring Boot项目

![image-20250323094623380](/images/cluster/image-20250323094623380.png)

步骤如下：

=>为每一个微服务准备一个Dockerfile；Docker按照Dockerfile制作成镜像

=>为每一个微服务生成k8s的部署描述文件(与GUI界面中创建有无状态服务类似)

=>Jenkins编写好Jenkinsfile流水线部署



> 注意：关于内部访问模式的差异(预防IP的变化，部署采用内部域名更为稳妥)
>
> - 虚拟IP地址：为服务分配虚拟IP地址，可通过虚拟IP地址在集群内部访问服务
> - 内部域名：不为服务分配IP地址，可通过集群DNS机制在集群内部访问服务

=>进入项目创建一个生产环境配置文件`applications-prod.properties`, 使用对应的域名访问

```properties
# spring.profiles.active=prod
spring.application.name=gulimall-auth-server
server.port=20000
spring.thymeleaf.cache=false
spring.redis.port=6379
spring.session.store-type=redis
server.servlet.session.timeout=30m
management.endpoints.web.exposure.include=*
feign.sentinel.enabled=true
# 服务追踪
spring.redis.host=redis.gulimall
spring.cloud.nacos.discovery.server-addr=nacos-service.gulimall:8848
spring.cloud.sentinel.transport.dashboard=sentinel-service.gulimall:8333
spring.zipkin.base-url=http://zipkin-service.gulimall:9411/
spring.zipkin.discovery-client-enabled=false
spring.zipkin.sender.type=web
spring.sleuth.sampler.probability=1
```

=>修改完全部的项目配置文件后，打包maven安装

```bash
mvn clean install -Dmaven.test.skip=true
```

=>打包测试

```bash
# 现在有两个文件
ls

# Dockerfile  renren-fast.jar

# 文件内容为
cat Dockerfile

# FROM java:8  # openjdk:8  java:8-alpine这种用法2023年开始已经停止使用
# EXPOSE 8080
# LABEL authors="slience_me"
# VOLUME /tmp
# ADD renren-fast.jar  /app.jar
# RUN bash -c 'touch /app.jar'
# ENTRYPOINT ["java","-jar","/app.jar"]

# 开始封装镜像
docker build -f Dockerfile -t docker.io/sliencemehub/admin:v1.0.0 .  # 注意最后这个点代表当前目录

# 完成后 测试运行
docker run -d --name hello-admin -p 8080:8080 sliencemehub/admin:v1.0.0
```

![image-20250323150026348](/images/cluster/image-20250323150026348.png)

=>后面给每一个微服务创建一个Dockerfile文件：模板如下

```dockerfile
# 使用官方OpenJDK 8镜像作为基础镜像
FROM openjdk:8

# 开放容器的8080端口，用于应用程序通信
EXPOSE 8080

# 添加作者信息标签
LABEL authors="slience_me"

# 创建一个挂载点，用于容器运行时共享数据
VOLUME /tmp

# 将构建好的JAR包添加到容器的根目录下，并重命名为app.jar
ADD target/*.jar /app.jar

# 创建空文件，以确保JAR文件存在
RUN bash -c 'touch /app.jar'

# 容器启动时执行Java命令运行JAR文件
ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=prod"]
```

=>编写部署配置

这个可以之前从KubeSphere里面复制一份模板 `部署+服务`

```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: gulimall-admin
  namespace: gulimall
  labels:
    app: gulimall-admin
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gulimall-admin
  template:
    metadata:
      labels:
        app: gulimall-admin
    spec:
      containers:
        - name: gulimall-admin
          image: $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:$TAG_NAME
          ports:
            - containerPort: 8080
              protocol: TCP
          resources:
            limits:
              cpu: 1000m
              memory: 500Mi
            requests:
              cpu: 10m
              memory: 10Mi
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          imagePullPolicy: IfNotPresent
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%
      maxSurge: 25%
  revisionHistoryLimit: 10
  progressDeadlineSeconds: 600
---
kind: Service
apiVersion: v1
metadata:
  name: sentinel-service
  namespace: gulimall
  labels:
    app: gulimall-admin
spec:
  ports:
    - name: http
      protocol: TCP
      port: 8080
      targetPort: 8080
      nodePort: 20012
  selector:
    app: gulimall-admin
  type: NodePort
  sessionAffinity: None
```

=> 编写流水线 `jenkinsfile`

> 目前 SonarQube已经不支持jdk1.8了，需要jdk11起步，这里开发全程是1.8版本 ，目前没办法测试了

```bash
pipeline {
  agent {
    node {
      label 'maven'
    }
  }
  stages {
    stage('拉取代码') {
      agent none
      steps {
        git(url: 'https://github.com/slience-me/gulimall-test-deploy.git', credentialsId: 'github-id', branch: 'master', changelog: true, poll: false)
        sh 'echo 正在构建 $PROJECT_NAME 版本号 $PROJECT_VERSION 将会提交给 $REGISTRY 镜像仓库'
        container('maven') {
          sh 'mvn clean install -Dmaven.test.skip=true -gs `pwd`/mvn-settings.xml'
        }

      }
    }

    stage('sonar代码质量分析') {
      agent none
      steps {
        container('maven') {
          withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
            withSonarQubeEnv('sonar') {
              sh 'echo 当前目录： `pwd`'
              sh 'echo 当前目录文件： `ls`'
              sh 'mvn sonar:sonar -gs `pwd`/mvn-settings.xml -Dsonar.login=$SONAR_TOKEN'
            }

          }

          timeout(unit: 'HOURS', activity: true, time: 1) {
            waitForQualityGate 'true'
          }

        }

      }
    }

  }
  stage('构建镜像 & 推送镜像') {
      steps {
        container('maven') {
          sh 'mvn -Dmaven.test.skip=true -gs `pwd`/mvn-settings.xml clean package'
          sh 'cd $PROJECT_NAME && docker build -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
          withCredentials([usernamePassword(passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME', credentialsId: "$DOCKER_CREDENTIAL_ID")]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
          }

        }

      }
    }

    stage('推送最新版镜像') {
      when {
        branch 'master'
      }
      steps {
        container('maven') {
          sh 'docker tag $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:latest'
          sh 'docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:latest'
        }

      }
    }

    stage('部署到K8S') {
      agent none
      steps {
        input(id: 'deploy-to-dev-$PROJECT_NAME', message: '是否部署到集群中?')
        container('maven') {
          withCredentials([kubeconfigContent(credentialsId: 'demo-kubeconfig', variable: 'KUBECONFIG_CONTENT')]) {
            sh 'mkdir ~/.kube'
            sh 'echo "$KUBECONFIG_CONTENT" > ~/.kube/config'
            sh 'envsubst < $PROJECT_NAME/deploy/deploy.yaml | kubectl apply -f -'
          }

        }

      }
    }

    stage('发布版本') {
      when {
        expression {
          return params.PROJECT_VERSION =~ /v.*/
        }

      }
      steps {
        container('maven') {
          input(id: 'release-image-with-tag', message: '发布当前版本镜像吗?')
          withCredentials([usernamePassword(credentialsId: "$GITHUB_CREDENTIAL_ID", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
            sh 'git config --global user.email "slienceme.cn@gmail.com"'
            sh 'git config --global user.name "slience_me"'
            sh 'git tag -a $PROJECT_VERSION -m "$PROJECT_VERSION"'
            sh 'git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/$GITHUB_ACCOUNT/gulimall-test-deploy.git --tags --ipv4'
          }
          sh 'docker tag $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:$PROJECT_VERSION'
          sh 'docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$PROJECT_NAME:$PROJECT_VERSION'
        }

      }
    }

  }
  environment {
    DOCKER_CREDENTIAL_ID = 'dockerhub-id'
    GITHUB_CREDENTIAL_ID = 'github-id'
    KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
    REGISTRY = 'docker.io'
    DOCKERHUB_NAMESPACE = 'sliencemehub'
    GITHUB_ACCOUNT = 'slience-me'
    BRANCH_NAME = 'master'
  }
  parameters {
    string(name: 'PROJECT_VERSION', defaultValue: 'v0.0Beta', description: '版本号')
    string(name: 'PROJECT_NAME', defaultValue: 'gulimall-gateway', description: '构建模块')
  }
}
```

=> 临时开放数据库外部访问Node Port服务，进行数据库导入，完成后删除服务

=> 替换阿里云服务(可选)

=> 创建新的流水线，开始自动化部署

成功画面：

![image-20250324163236770](/images/cluster/image-20250324163236770.png)

=>打包部署前端nginx

```bash
FROM nginx
MAINTAINER author
ADD html.tar.gz /usr/share/nginx/html
ADD conf.tar.gz /etc/nginx
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
```

=>配置域名dns

=>配置服务告警

## 其他

> 整体

![image-20250323092712102](/images/cluster/image-20250323092712102.png)
