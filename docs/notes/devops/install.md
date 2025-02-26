# 软件安装合集

## 1. Anaconda

```bash
# ubuntu操作步骤
# 1. 下载 Anaconda
# 在Anaconda官网（https://www.anaconda.com/）下载最新版。
# 2. 安装 Anaconda
# 1）打开terminal；
# 2）打开下载文件的位置
# 3）运行 .sh 文件：bash （AnacondaXXXXX-Linux-x86_64.sh 用table键代码补全即可）
bash Anaconda3-2021.11-Linux-x86_64.sh 
# 3. 进入注册信息页面，持续点击空格即可跳过注册信息， 输入yes；
# 4. 阅读注册信息，然后输入yes；查看文件即将安装的位置，按enter，即可安装，
# 5. 安装完成后，收到加入环境变量的提示信息，输入yes
# 6. 我们执行(选择性, 可以不用动，新手慎重修改)：
sudo gedit ~/.bashrc  # 用vim也行
# 然后在打开的文件最后加两行命令，用于配置环境
export PATH="~/anaconda3/bin":$PATH
source ~/anaconda3/bin/activate #修改终端的默认 python 为 anaconda
# 保存文件后关闭，然后在终端执行，用于保存环境配置
source ~/.bashrc
# 7. 重启终端，会看到命令行前面出现（base）环境，即可默认使用Anaconda3；
# 8. 可以使用`conda -V`验证是否安装完毕，若安装完成，则会出现版本号。
conda -V
```

## 2. Java

### 【本地安装】

```bash
#【本地安装】
# 1. 上传或下载安装包
cd/usr/local
jdk-8u121-linux-x64.tar.gz
# 2. 解压安装包
tar -zxvf jdk-8u121-linux-x64.tar.gz
# 3. 建立软连接
ln -s /usr/local/jdk1.8.0_121/ /usr/local/jdk
# 4. 修改环境变量
vim /etc/profile
export JAVA_HOME=/usr/local/jdk
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
# 通过命令source /etc/profile让profile文件立即生效
source /etc/profile
#5. 测试是否安装成功
使用java -version，出现版本
```

### 【网络安装】

```bash
#【ubuntu】
# 1. 更新包列表
sudo apt update

# 2. 安装 Java 1.8（OpenJDK 8）
sudo apt install openjdk-8-jdk

# 3. 验证安装
java -version
# 打印出如下内容
# openjdk version "1.8.0_282"
# OpenJDK Runtime Environment (build 1.8.0_282-8u282-b08-0ubuntu1~16.04.1)
# OpenJDK 64-Bit Server VM (build 25.282-b08, mixed mode)

# 4. 配置默认的 Java 版本（如果系统中有多个版本的 Java）
# 如果你系统中已经安装了其他版本的 Java，并且想要将 Java 1.8 设置为默认版本，可以使用 update-alternatives 工具：
sudo update-alternatives --config java
# 执行命令后，会出现一个选择框，列出所有安装的 Java 版本。你可以输入相应的数字来选择 Java 1.8（通常是数字 1）。
# 同样地，如果你还安装了 javac（Java 编译器），可以使用以下命令设置默认的 javac 版本：
sudo update-alternatives --config javac

# 5. 设置 JAVA_HOME 环境变量
# 一般来说，OpenJDK 8 会安装在 /usr/lib/jvm/ 目录下。你可以通过以下命令查找确切路径：
sudo update-alternatives --config java
# 假设你的安装路径是 /usr/lib/jvm/java-8-openjdk-amd64，你需要将其添加到 JAVA_HOME 环境变量中。
# 编辑 ~/.bashrc 文件：
nano ~/.bashrc
# 在文件的末尾添加以下行：
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
# 保存并关闭文件。然后，使这些更改生效：
source ~/.bashrc
# 你可以通过以下命令来验证 JAVA_HOME 是否设置成功：
echo $JAVA_HOME
```

## 3. Git

### 【Centos】

```bash
# 直接使用指令
#【Centos】
yum -y install git
```

### 【Ubuntu】

```bash
#【Ubuntu】
sudo apt update
sudo apt install git
git --version
```
