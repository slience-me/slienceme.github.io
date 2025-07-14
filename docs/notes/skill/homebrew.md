# Homebrew相关指令

## 一、常用软件包管理命令

| 操作           | 命令                    | 说明                           |
| -------------- | ----------------------- | ------------------------------ |
| 安装软件包     | `brew install <包名>`   | 安装一个软件包                 |
| 升级软件包     | `brew upgrade <包名>`   | 升级指定软件包                 |
| 升级所有包     | `brew upgrade`          | 升级所有已安装软件包           |
| 卸载软件包     | `brew uninstall <包名>` | 卸载一个软件包                 |
| 查看已安装包   | `brew list`             | 列出已安装的软件包             |
| 查看包信息     | `brew info <包名>`      | 查看软件包详细信息             |
| 搜索包         | `brew search <关键词>`  | 搜索可用的软件包               |
| 清理无用缓存   | `brew cleanup`          | 清理旧版本及缓存文件           |
| 检查系统问题   | `brew doctor`           | 检查 brew 安装和系统潜在问题   |
| 更新 brew 本体 | `brew update`           | 更新 Homebrew 自身和可用包信息 |

## 二、Services 管理命令（守护进程）

> 用于管理通过 `brew install` 安装的服务类软件（如 `mysql`, `redis`, `nginx` 等）

| 操作             | 命令                             | 说明                             |
| ---------------- | -------------------------------- | -------------------------------- |
| 启动服务         | `brew services start <服务名>`   | 启动并设置为开机启动             |
| 停止服务         | `brew services stop <服务名>`    | 停止并取消开机启动               |
| 重启服务         | `brew services restart <服务名>` | 重启服务                         |
| 查看所有服务状态 | `brew services list`             | 显示当前所有 brew 服务的运行状态 |

## 三、调试和日志相关

| 操作               | 命令                                         | 说明                        |
| ------------------ | -------------------------------------------- | --------------------------- |
| 查看日志（服务）   | `log show --predicate 'process == "mysqld"'` | 查看服务的系统日志（macOS） |
| 查看某包安装位置   | `brew --prefix <包名>`                       | 显示软件包的安装路径        |
| 查看 Homebrew 路径 | `brew --prefix`                              | 显示 Homebrew 的安装根路径  |

---

### 示例：安装并运行 MySQL 服务

```bash
brew install mysql
brew services start mysql
mysql -u root -p
```