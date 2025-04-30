# Anaconda常用指令

## 1. 激活环境

```bash
# 咱们的服务器一般都是默认dash脚本，所以我们先执行一下
# 激活环境
/bin/bash

# 激活的过程
source ~/.bashrc
source activate torch

# 退出环境
conda deactivate

# 多shell指令 先激活环境然后打开文件路径，最后启动notebook
activate torch&&d:&&cd D:\codeHub\machine-learning&&jupyter notebook

# 查看安装了哪些包  
conda list    

# 查看当前存在哪些虚拟环境
conda env list
conda info -e

# 对虚拟环境中安装额外的包
conda install -n your_env_name [package]

# 检查更新当前conda
conda update conda

# 创建python版本为x.x，名字为your_env_name的虚拟环境
conda create -n your_env_name python=x.x

# 指定路径
conda create --prefix /home/slienceme/software/anaconda3/your_env_name python=x.x

# 删除虚拟环境
conda remove -n your_env_name --all

# 删除环境钟的某个包
conda remove --name $your_env_name $package_name 

# anaconda命令创建python版本为x.x，名字为your_env_name的虚拟环境。**your_env_name文件可以在Anaconda安装目录envs文件下找到**。

# 打开命令行，输入python --version检查当前 python 版本。

# 设置国内镜像
[http://Anaconda.org](https://link.zhihu.com/?target=http%3A//Anaconda.org)的服务器在国外，安装多个packages时，conda下载的速度经常很慢。清华TUNA镜像源有Anaconda仓库的镜像，将其加入conda的配置即可：
# 添加Anaconda的TUNA镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

# TUNA的help中镜像地址加有引号，需要去掉
# 设置搜索时显示通道地址
conda config --set show_channel_urls yes

# 恢复默认镜像
conda config --remove-key channels

# 查看需要安装的模块的所有版本
pip index versions [your python module name]

# 创建虚拟环境venv
python3 -m venv 包名
conda create -n 虚拟环境名字 python=版本
conda remove -n 虚拟环境名字 --all

# 导出/入包环境为文件
pip freeze > requirements.txt         
pip install -r requirements.txt
conda install --yes --file requirements.txt
conda install --use-local 包名称    # 安装根目录的pkgs文件下的本地包
pip list --format=freeze > requirements.txt

# 导出conda环境
conda activate pytorch  # 先进入需要导出的环境
conda env export > env.yaml
cat env.yaml

# 导入conda环境
conda env create -f /mnt/hgfs/虚拟机/PaddleRobotics-main/env.yaml

# 换源 豆瓣源
pip3 install 模块 -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
pip3 install 模块 -i http://pypi.tuna.tsinghua.edu.cn/simple/ --trusted-host tuna.tsinghua.edu.cn
pip3 install 模块 -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host aliyun.com
  
防止权限不足 加 --user

# pip相关
pip -V  # 查询
pip list

# 如果发现激活环境后，pip list -v 有base环境的包，关闭用户的环境变量
vim ~/.bashrc
i
export PYTHONNOUSERSITE=1
:wq

# 设置工作路径
export PYTHONPATH=`readlink -f ./

# 注意
用户目录下的.local文件下为用户的环境可以删除, `pip list`的指令会显示这个环境的包,使得创建的Anaconda的虚拟环境的piplist不是空的
```

## 2. 相关源

```text
清华：https://pypi.tuna.tsinghua.edu.cn/simple/

阿里云：http://mirrors.aliyun.com/pypi/simple/

中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/

华中科技大学：http://pypi.hustunique.com/

山东理工大学：http://pypi.sdutlinux.org/

豆瓣：http://pypi.douban.com/simple/

中科大：https://pypi.mirrors.ustc.edu.cn
```
