# 【2025】Kubernetes

[官方网站 Kubernetes](https://kubernetes.io/zh-cn/)

在这个教程之前，已经完成了虚拟机集群的构建，如果没有完成，见 基于VMware虚拟机集群搭建教程

## 1. docker安装

我使用的是ubuntu-20.04.6-live-server-amd64版本  [跳转=>docker安装教程](/notes/middleware/docker#【ubuntu】)

> 注意：直接安装最新版即可

## 2. kubernetes安装前

在安装之前，需要对系统做一些调整，实现更好的性能

**关闭防火墙**

```bash
sudo systemctl stop ufw
sudo systemctl disable ufw
```

**关闭 SELinux**

```bash
sudo systemctl stop apparmor
sudo systemctl disable apparmor
```

**关闭 Swap**

```bash
sudo swapoff -a  # 临时关闭 swap
sudo sed -i '/swap/d' /etc/fstab  # 永久禁用 swap

free -g  # Swap 需要为 0 | 验证 Swap 是否关闭
```

**配置主机名和 Hosts 映射**

```bash
sudo hostnamectl set-hostname <newhostname>  # 修改主机名
sudo vim /etc/hosts  # 添加 IP 与主机名的映射

192.168.137.130 k8s-node01
192.168.137.131 k8s-node02
192.168.137.132 k8s-node03
```

**让 IPv4 流量正确传递到 iptables**

```bash
# 设置所需的 sysctl 参数，参数在重新启动后保持不变
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward = 1
EOF

# 应用 sysctl 参数而不重新启动
sudo sysctl --system

# 使用以下命令验证 net.ipv4.ip_forward 是否设置为 1
sysctl net.ipv4.ip_forward

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
sudo modprobe overlay
sudo modprobe br_netfilter	
```

**处理只读文件系统问题**

```bash
# 如果遇到 "只读文件系统（read-only filesystem）" 问题，可以尝试重新挂载：
sudo mount -o remount,rw /
```

**同步时间**

```bash
# 如果时间不同步，可能会影响 Kubernetes 组件的运行，可以使用 ntpdate 进行时间同步：
sudo apt update
sudo apt install -y ntpdate
sudo ntpdate time.windows.com

sudo timedatectl set-local-rtc 1   # 修改硬件时钟
sudo timedatectl set-timezone Asia/Shanghai  # 修改时钟
```

## 3. kubeadm,kubelet,kubectl

### 3.1 简介

在 Kubernetes（K8s）集群的安装和管理过程中，**`kubeadm`、`kubelet` 和 `kubectl`** 是三个最重要的组件，它们分别承担不同的职责：

| 组件        | 作用                       | 适用对象          |
|-----------|--------------------------|---------------|
| `kubeadm` | 初始化和管理 Kubernetes 集群     | 集群管理员         |
| `kubelet` | 运行在每个节点上，管理 Pod 和容器      | Kubernetes 节点 |
| `kubectl` | 用于操作 Kubernetes 资源的命令行工具 | 开发者 & 运维      |

#### kubeadm

> Kubernetes 集群初始化工具

`kubeadm` 是官方提供的 **快速部署和管理 Kubernetes 集群** 的工具，主要用于：

```sh
# 初始化 Kubernetes 控制平面（主节点）
kubeadm init
# 加入新的工作节点（Worker Node）
kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
# 升级 Kubernetes 版本
kubeadm upgrade apply v1.28.0
```

**特点:**

✅ **官方推荐方式**，简化集群安装
✅ **自动生成证书、配置文件、Pod 网络**
✅ **可升级 Kubernetes**（但不管理工作负载）

📌 **注意**：`kubeadm` 仅用于 **集群初始化和管理**，不会持续运行，而是一次性命令。

#### kubelet

> 运行在每个节点上，管理 Pod 和容器

`kubelet` 是 **Kubernetes 关键组件**，在 **每个节点（Master & Worker）** 上运行，负责：

- **与 API Server 通信**，获取调度任务
- **管理节点上的 Pod**（创建、监控、重启）
- **与容器运行时（如 Docker, containerd）交互**
- **健康检查**，自动恢复失败的 Pod

启动 kubelet

在每个节点上，`kubelet` 作为系统服务运行：

```sh
systemctl enable --now kubelet
```

📌 **注意**：

- `kubelet` **不会自己创建 Pod**，它只负责运行 **API Server 指定的 Pod**。
- 如果 `kubelet` 退出或崩溃，节点上的所有 Pod 可能会停止工作。

#### kubectl

> Kubernetes 命令行工具

`kubectl` 是 **Kubernetes 的命令行客户端**，用于与 Kubernetes API 交互，管理集群中的资源。

##### 常用指令

```sh
kubectl cluster-info    # 查看集群信息
kubectl get nodes       # 查看集群中的节点信息
kubectl get namespaces  # 查看所有命名空间
kubectl get pods        # 查看所有 Pod
kubectl get svc         # 查看所有服务
kubectl get deployments # 查看所有部署
kubectl get replicasets # 查看所有 ReplicaSets
kubectl get configmaps  # 查看所有 ConfigMap
kubectl get secrets     # 查看所有 Secrets

kubectl apply -f <file>.yaml    										# 使用 YAML 文件创建或更新资源
kubectl create deployment <deployment-name> --image=<image-name>    	# 创建一个新的 Deployment

kubectl set image deployment/<deployment-name> <container-name>=<new-image>    # 更新 Deployment 镜像
kubectl apply -f <updated-file>.yaml    			# 更新资源配置

kubectl delete pod <pod-name>   				 	# 删除指定的 Pod
kubectl delete deployment <deployment-name>    		# 删除指定的 Deployment
kubectl delete svc <service-name>    				# 删除指定的 Service
kubectl delete pod --all    						# 删除所有 Pod（例如：已退出的容器）

kubectl logs <pod-name>    							# 查看指定 Pod 的日志
kubectl logs <pod-name> -c <container-name>    		# 查看指定容器的日志
kubectl logs <pod-name> --previous    				# 查看最近已删除 Pod 的日志

kubectl exec -it <pod-name> -- /bin/bash    		# 在 Pod 中执行命令（进入容器 shell）
kubectl exec -it <pod-name> -c <container-name> -- /bin/bash    # 执行命令到指定容器

kubectl describe pod <pod-name>    					# 查看 Pod 的详细信息
kubectl describe deployment <deployment-name>    	# 查看 Deployment 的详细信息

kubectl top nodes    								# 查看节点的资源使用情况
kubectl top pods     								# 查看 Pod 的资源使用情况

kubectl port-forward pod/<pod-name> <local-port>:<pod-port>    			# 本地端口转发到 Pod 内部端口
kubectl port-forward svc/<service-name> <local-port>:<service-port>    	# 本地端口转发到 Service

kubectl get events    								# 查看集群中的事件
kubectl get events --field-selector involvedObject.kind=Node    		# 查看节点的事件

kubectl delete pod <pod-name> --force --grace-period=0    				# 强制删除未响应的 Pod

kubectl get pods -o yaml    # 获取 Pod 的详细 YAML 输出
kubectl get pods -o json    # 获取 Pod 的详细 JSON 输出
kubectl get pods -o wide    # 获取 Pod 的详细输出

kubectl help    			# 获取 kubectl 命令帮助信息
kubectl get pod --help    	# 获取特定命令（如 Pod）帮助信息
kubectl get all -o wide		# 获取集群中所有资源的详细信息，包括节点、Pod、Service 等
```

📌 **注意**：

- `kubectl` 需要**配置 `kubeconfig` 文件**才能连接 Kubernetes API Server。
- 常见 `kubectl` 配置文件路径：`~/.kube/config`。

**总结**

| 组件        | 作用                     | 运行环境                          |
|-----------|------------------------|-------------------------------|
| `kubeadm` | 初始化 & 管理 Kubernetes 集群 | **仅在主节点（Master）上运行一次**        |
| `kubelet` | 运行和管理 Pod              | **所有节点（Master & Worker）长期运行** |
| `kubectl` | 操作 Kubernetes 资源       | **运维 & 开发者本地工具**              |

👉 **`kubeadm` 负责安装，`kubelet` 负责运行，`kubectl` 负责操作。** 🚀

### 3.2 安装

列出已安装的所有软件包`apt list --installed | grep kube`

查找可用的 **Kubernetes** 相关包`apt search kube`

看官网分别安装三个 [官方文档](https://kubernetes.io/)

- kubeadm
- kubelet
- kubectl

```bash
# 1. 更新 apt 包索引并安装使用 Kubernetes apt 仓库所需要的包
sudo apt-get update
# apt-transport-https 可能是一个虚拟包（dummy package）；如果是的话，你可以跳过安装这个包
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

# 2. 下载用于 Kubernetes 软件包仓库的公共签名密钥。所有仓库都使用相同的签名密钥，因此你可以忽略URL中的版本
# 如果 `/etc/apt/keyrings` 目录不存在，则应在 curl 命令之前创建它，请阅读下面的注释。
# sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# 3. 添加 Kubernetes apt 仓库。 请注意，此仓库仅包含适用于 Kubernetes 1.32 的软件包； 对于其他 Kubernetes 次要版本，则需要更改 URL 中的 Kubernetes 次要版本以匹配你所需的次要版本 （你还应该检查正在阅读的安装文档是否为你计划安装的 Kubernetes 版本的文档）
# 此操作会覆盖 /etc/apt/sources.list.d/kubernetes.list 中现存的所有配置。
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# 4. 更新 apt 包索引，安装 kubelet、kubeadm 和 kubectl，并锁定其版本
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### 3.3 kubeadm初始化

这个指令只在`master节点(控制平面节点 (Control Plane Node))`
执行，就是主节点执行 [官方文档](https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-init/)

```bash
# 确保 containerd 运行正常
systemctl status containerd
sudo systemctl enable --now containerd

# 配置 containerd CRI 兼容性
sudo containerd config default | sudo tee /etc/containerd/config.toml # 检查 containerd 配置文件
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml # config.toml 内的 SystemdCgroup = true
sudo systemctl restart containerd

# 确保 kubeadm 使用正确的 CRI
sudo crictl --runtime-endpoint unix:///run/containerd/containerd.sock info # 验证 kubeadm 是否能正确检测 containerd
sudo systemctl restart containerd  # 如果返回错误，可能 containerd 没有正确监听 CRI，可以尝试

# 切换到 cgroups v2
mount | grep cgroup
sudo grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=1" # 如果仍然是 cgroup v1，请启用 cgroups v2
```

```bash
# apiserver-advertise-address 集群某一个master节点
kubeadm config images pull
kubeadm init --apiserver-advertise-address=192.168.137.130 --pod-network-cidr=10.244.0.0/16
```

打印的内容为：

```bash
# 正常日志
# W0317 21:29:46.144585   79912 validation.go:28] Cannot validate kube-proxy config - no validator is available
# W0317 21:29:46.144788   79912 validation.go:28] Cannot validate kubelet config - no validator is available
# ...............
# Your Kubernetes control-plane has initialized successfully!

# To start using your cluster, you need to run the following as a regular user:

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# You should now deploy a pod network to the cluster.
# Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
#   https://kubernetes.io/docs/concepts/cluster-administration/addons/

# Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.137.130:6443 --token nw0bbd.zjoqpprbte6ois80 \
        --discovery-token-ca-cert-hash sha256:f4c74cb6510c8fec6fb7f3129c08f22931ce6d6077889f7a9802194837f7c142
```

执行一下这个

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 检测所有节点
kubectl get nodes

# NAME        STATUS     ROLES    AGE     VERSION
# k8s-node1   NotReady   master   3m43s   v1.17.3
```

### 3.4 加入从节点(工作节点)

在`从节点(工作节点)`执行该指令

```bash
kubeadm join 192.168.137.130:6443 --token nw0bbd.zjoqpprbte6ois80 \
        --discovery-token-ca-cert-hash sha256:f4c74cb6510c8fec6fb7f3129c08f22931ce6d6077889f7a9802194837f7c142

kubectl config set-cluster kubernetes --server=https://192.168.137.130:6443
kubectl config set-credentials admin --client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt --client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
kubectl config set-context kubernetes --cluster=kubernetes --user=admin
kubectl config use-context kubernetes

# 正常日志
# [preflight] Running pre-flight checks
#         [WARNING SystemVerification]: cgroups v1 support is in maintenance mode, please migrate to cgroups v2
# [preflight] Reading configuration from the "kubeadm-config" ConfigMap in namespace "kube-system"...
# [preflight] Use 'kubeadm init phase upload-config --config your-config.yaml' to re-upload it.
# [kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
# [kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
# [kubelet-start] Starting the kubelet
# [kubelet-check] Waiting for a healthy kubelet at http://127.0.0.1:10248/healthz. This can take up to 4m0s
# [kubelet-check] The kubelet is healthy after 501.512978ms
# [kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap
# 
# This node has joined the cluster:
# * Certificate signing request was sent to apiserver and a response was received.
# * The Kubelet was informed of the new secure connection details.
# 
# Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

# 如果出问题 重置一下
# 重置 Kubernetes 状态
kubeadm reset -f
rm -rf ~/.kube
systemctl restart kubelet
kubeadm join 192.168.137.130:6443 --token nw0bbd.zjoqpprbte6ois80 \
    --discovery-token-ca-cert-hash sha256:f4c74cb6510c8fec6fb7f3129c08f22931ce6d6077889f7a9802194837f7c142



# 去master节点查一下
kubectl get nodes

# 正常日志
# NAME        STATUS     ROLES    AGE    VERSION
# k8s-node1   NotReady   master   7m4s   v1.17.3
# k8s-node2   NotReady   <none>   96s    v1.17.3
# k8s-node3   NotReady   <none>   96s    v1.17.3

# 查一下全部名称空间的节点情况
kubectl get pods --all-namespaces

# 正常日志
# NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
# kube-system   coredns-7f9c544f75-67njd            0/1     Pending   0          7m46s
# kube-system   coredns-7f9c544f75-z82nl            0/1     Pending   0          7m46s
# kube-system   etcd-k8s-node1                      1/1     Running   0          8m1s
# kube-system   kube-apiserver-k8s-node1            1/1     Running   0          8m1s
# kube-system   kube-controller-manager-k8s-node1   1/1     Running   0          8m1s
# kube-system   kube-proxy-fs2p6                    1/1     Running   0          2m37s
# kube-system   kube-proxy-x7rkp                    1/1     Running   0          2m37s
# kube-system   kube-proxy-xpbvt                    1/1     Running   0          7m46s
# kube-system   kube-scheduler-k8s-node1            1/1     Running   0          8m1s
```

### 3.5 安装Pod网络插件（CNI）

```bash
kubectl apply -f \
	https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
	
# 正常日志
# namespace/kube-flannel created
# clusterrole.rbac.authorization.k8s.io/flannel created
# clusterrolebinding.rbac.authorization.k8s.io/flannel created
# serviceaccount/flannel created
# configmap/kube-flannel-cfg created
# daemonset.apps/kube-flannel-ds created
```

## 4. KubeSphere

### 4.1 安装

[官方网站 kubesphere.io](https://kubesphere.io/zh/)

如果前面的都没做，直接看[Kubesphere的教程](https://www.kubesphere.io/zh/docs/v4.1/02-quickstart/01-install-kubesphere/)
，直接安装第三部分的全部内容

先安装helm（master节点执行）  [helm官网](https://helm.sh/zh/docs/intro/install/)

> Helm是Kubernetes的包管理器。包管理器类似于我们在Ubuntu中使用的apt、Centos 中使用的yum或者Python中的pip一样，能快速查找、下载和安装软件包。Helm由客
> 户端组件helm和服务端组件Tiller组成,能够将一组K8S资源打包统一管理,是查找、共 享和使用为Kubernetes构建的软件的最佳方式。

```bash
# 安装(master执行)
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh

# 正常日志
# Downloading https://get.helm.sh/helm-v3.17.2-linux-amd64.tar.gz
# Verifying checksum... Done.
# Preparing to install helm into /usr/local/bin
# helm installed into /usr/local/bin/helm

# 验证版本(master执行)
helm version

# 正常日志
# version.BuildInfo{Version:"v3.17.2", GitCommit:"cc0bbbd6d6276b83880042c1ecb34087e84d41eb", GitTreeState:"clean", GoVersion:"go1.23.7"}
```

```bash
# 安装kubesphere
# 如果无法访问 charts.kubesphere.io, 可将 charts.kubesphere.io 替换为 charts.kubesphere.com.cn
helm upgrade --install -n kubesphere-system --create-namespace ks-core https://charts.kubesphere.io/main/ks-core-1.1.3.tgz --debug --wait
```

```bash
# 正常日志
# NOTES:
# Thank you for choosing KubeSphere Helm Chart.
# 
# Please be patient and wait for several seconds for the KubeSphere deployment to complete.
# 
# 1. Wait for Deployment Completion
# 
#     Confirm that all KubeSphere components are running by executing the following command:
# 
#     kubectl get pods -n kubesphere-system
# 2. Access the KubeSphere Console
# 
#     Once the deployment is complete, you can access the KubeSphere console using the following URL:
# 
#     http://192.168.137.130:30880
# 
# 3. Login to KubeSphere Console
# 
#     Use the following credentials to log in:
# 
#     Account: admin
#     Password: P@88w0rd
# 
# NOTE: It is highly recommended to change the default password immediately after the first login.
# For additional information and details, please visit https://kubesphere.io.
```

### 4.2 使用

#### 多租户管理

`多租户管理快速入门admin`

为了更安全，创建新的用户

![image-20250319093102286](/images/kubernetes/image-20250319093102286.png)

最新版本做出了很多的调整

- 内置角色调整：移除了平台级内置角色 `users-manager`(用户管理员)和 `workspace-manager`（企业空间管理员），如果已有用户绑定了
  `users-manager` 或 `workspace-manager`，他们的角色将会在升级之后变更为 `platform-regular`。增加了平台级内置角色
  `platform-self-provisioner`
  。关于平台角色的具体描述，请参见[创建用户](https://www.kubesphere.io/zh/docs/v3.3/quick-start/create-workspace-and-project/#创建用户)。

**下面以谷粒商城为案例：**

开始新建用户和角色，然后分配用户相应的角色

新建账号

- 新建账号 `ws-manager`           role: `platform-self-provisioner` 描述：创建企业空间并成为所创建的企业空间的管理员
- 新建账号 `ws-admin`               role: `platform-regular`                    描述：被邀请加入企业空间之前无法访问任何资源
- 新建账号 `project-admin`     role: `platform-regular `                    描述：被邀请加入企业空间之前无法访问任何资源
- 新建账号 `project-regular` role: `platform-regular`                    描述：被邀请加入企业空间之前无法访问任何资源
- 登录进 `ws-manager` 创建企业空间 `gulimall-workspace` 进入企业空间设置-企业空间成员-分配给ws-admin角色：
  `gulimall-workspace-admin`
- 登录进 `ws-admin`   进入企业空间 `gulimall-workspace` 进入企业空间设置-企业空间成员
  - 分配给project-admin角色：`gulimall-workspace-self-provisioner`
  - 分配给project-admin角色：`gulimall-workspace-viewer`

> 注意：需要admin账户去开放集群可见性 集群管理-集群设置-集群可见性-设置企业可见

创建项目

- 创建项目 名称 `gulimall`， 别名 `谷粒商城`， 分配集群资源
- 创建devops 名称`gulimall-devops`, 别名 `gulimall的自动化部署`

登录`project-admin`账户

- 进入Devops项目`gulimall-devops`， 分配给`project-regular` Devops项目角色`operator`
- 进入项目`gulimall`， 分配给`project-regular` 项目角色`operator`

**创建并部署 WordPress**

- 创建数据库密钥
- 创建wordpress密钥
- 创建存储卷

https://www.kubesphere.io/zh/docs/v3.4/quick-start/wordpress-deployment/

这里完美成功

**Devops流水线**

- 持续集成
- 持续交付
- 持续部署

**Maven 流水线示例**

[官方教程](https://www.kubesphere.io/zh/docs/v3.4/devops-user-guide/examples/a-maven-project/#maven-%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%A4%BA%E4%BE%8B)

**将 SonarQube 集成到流水线**

[官方教程](https://www.kubesphere.io/zh/docs/v3.4/devops-user-guide/how-to-integrate/sonarqube/#%E5%AE%89%E8%A3%85-sonarqube-%E6%9C%8D%E5%8A%A1%E5%99%A8)

## 5. 直接新开

> PS: 一站式
>
> 注意事项：主机名称 hostname必须是小写，要不可能出现找不到主机的问题
>
> 注意删除 Kubernetes 节点上的 taint，否则就会没有工作节点工作，导致任务分发不下去
>
> `kubectl taint nodes thinkpad-server node-role.kubernetes.io/master:NoSchedule-`
>
> `kubectl describe node thinkpad-server | grep Taints`

[在 Linux 上安装 Kubernetes 和 KubeSphere](https://www.kubesphere.io/zh/docs/v4.1/03-installation-and-upgrade/02-install-kubesphere/02-install-kubernetes-and-kubesphere/)

直接在 Linux 上安装 Kubernetes 和 KubeSphere

[all-in-one-on-linux](https://www.kubesphere.io/zh/docs/v3.4/quick-start/all-in-one-on-linux/)

[集成DevOps](https://www.kubesphere.io/zh/docs/v3.4/pluggable-components/devops/)

![image-20250320100315796](/images/kubernetes/image-20250320100315796.png)

## 【Q&A】问题汇总

### 01-coredns工作不正常

```bash
# 问题描述
# root@k8s-node1:/home/slienceme# kubectl get pods --all-namespaces
# NAMESPACE      NAME                                READY   STATUS             RESTARTS   AGE
# kube-flannel   kube-flannel-ds-66bcs               1/1     Running            0          12h
# kube-flannel   kube-flannel-ds-ntwwx               1/1     Running            0          12h
# kube-flannel   kube-flannel-ds-vb6n9               1/1     Running            5          12h
# kube-system    coredns-7f9c544f75-67njd            0/1     CrashLoopBackOff   17         12h   // [!code focus:8]
# kube-system    coredns-7f9c544f75-z82nl            0/1     CrashLoopBackOff   17         12h
# kube-system    etcd-k8s-node1                      1/1     Running            4          12h
# kube-system    kube-apiserver-k8s-node1            1/1     Running            4          12h
# kube-system    kube-controller-manager-k8s-node1   1/1     Running            3          12h
# kube-system    kube-proxy-fs2p6                    1/1     Running            0          12h
# kube-system    kube-proxy-x7rkp                    1/1     Running            0          12h
# kube-system    kube-proxy-xpbvt                    1/1     Running            3          12h
# kube-system    kube-scheduler-k8s-node1            1/1     Running            3          12h
# kube-system    tiller-deploy-6ffcfbc8df-mzwd7      1/1     Running            0          39m
```

通过对问题的追踪，在github
issue找到 [CoreDNS pod goes to CrashLoopBackOff State](https://github.com/kubernetes-sigs/kubespray/issues/11093)

**解决流程如下：**

你需要修改 Kubernetes 中的 CoreDNS 配置，具体操作步骤如下：

**步骤 1: 修改 CoreDNS 配置ConfigMap**

```bash
kubectl edit configmap coredns -n kube-system
```

**步骤 2: 修改 `Corefile` 配置**

修改 `Corefile` 中的 `forward` 配置，当前配置为：

```yaml
forward . /etc/resolv.conf
```

需要及时修改 `/etc/resolv.conf`

```yaml
nameserver 8.8.8.8
nameserver 114.114.114.114
# options edns0 trust-ad
```

你需要将其修改为指向外部 DNS 服务器，比如 Google 的公共 DNS 服务器 `8.8.8.8` 或 `1.1.1.1`（Cloudflare DNS）。例如，你可以修改为：

```yaml
forward . 8.8.8.8
```

或者如果你希望使用多个 DNS 服务器，可以配置多个地址：

```yaml
forward . 8.8.8.8 8.8.4.4
```

**步骤 3: 保存并退出**

**步骤 4: 验证配置生效**

验证 CoreDNS 配置是否生效，可以查看 CoreDNS Pod 是否正常运行，并且配置是否正确生效。

```bash
kubectl get pods -n kube-system -l k8s-app=kube-dns
```

如果需要，也可以重启 CoreDNS Pods，以确保新的配置生效：

```bash
kubectl rollout restart deployment coredns -n kube-system
```

通过这些步骤，你就能避免 CoreDNS 发生循环请求，确保 DNS 请求被转发到外部的 DNS 服务器，而不是 CoreDNS 本身。
