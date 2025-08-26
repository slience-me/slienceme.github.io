#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CURRENT_DIR=$(
    cd "$(dirname "$0")" || exit
    pwd
)

function log() {
    message="[Docker Setup Log]: $1 "
    echo -e "${BLUE}${message}${NC}" 2>&1 | tee -a "${CURRENT_DIR}"/install.log
}

ACCELERATOR_URL="https://docker.1panel.live"
DAEMON_JSON="/etc/docker/daemon.json"
BACKUP_FILE="/etc/docker/daemon.json.1panel_bak"

function create_daemon_json() {
    log "创建新的 Docker 配置 ${DAEMON_JSON}..."
    mkdir -p /etc/docker
    echo '{
        "registry-mirrors": ["'"$ACCELERATOR_URL"'"]
    }' | tee "$DAEMON_JSON" > /dev/null
    log "Docker 加速配置已添加"
}

function configure_accelerator() {
    while true; do
        read -p "是否添加国内镜像加速源？[y/n] " configure_accelerator
        case "$configure_accelerator" in
            [yY])
                if ping -c 1 mirror.ccs.tencentyun.com &>/dev/null; then
                    ACCELERATOR_URL="https://mirror.ccs.tencentyun.com"
                    log "使用腾讯云镜像加速源"
                fi

                if [ -f "$DAEMON_JSON" ]; then
                    log "已有配置，备份为 ${BACKUP_FILE}"
                    cp "$DAEMON_JSON" "$BACKUP_FILE"
                    create_daemon_json
                else
                    create_daemon_json
                fi

                log "重启 Docker..."
                systemctl daemon-reload
                systemctl restart docker
                log "Docker 已重启"
                break
                ;;
            [nN])
                log "跳过加速配置"
                break
                ;;
            *)
                log "请输入 y 或 n"
                ;;
        esac
    done
}

function Install_Docker(){
    if which docker >/dev/null 2>&1; then
        docker_version=$(docker --version | grep -oE '[0-9]+\.[0-9]+' | head -n 1)
        log "检测到已安装 Docker 版本: $docker_version"
        if [[ $(curl -s ipinfo.io/country) == "CN" ]]; then
            configure_accelerator
        fi
    else
        while true; do
            read -p "是否安装 Docker？[y/n] " install_docker_choice
            case "$install_docker_choice" in
                [yY])
                    log "开始安装 Docker..."
                    if [[ $(curl -s ipinfo.io/country) == "CN" ]]; then
                        curl -fsSL "https://get.docker.com" -o get-docker.sh
                        sh get-docker.sh 2>&1 | tee -a "${CURRENT_DIR}"/install.log
                        systemctl enable docker; systemctl start docker
                        configure_accelerator
                    else
                        curl -fsSL "https://get.docker.com" -o get-docker.sh
                        sh get-docker.sh 2>&1 | tee -a "${CURRENT_DIR}"/install.log
                        systemctl enable docker; systemctl start docker
                    fi
                    log "Docker 安装完成"
                    break
                    ;;
                [nN])
                    log "取消安装 Docker"
                    break
                    ;;
                *)
                    log "请输入 y 或 n"
                    ;;
            esac
        done
    fi
}

function main(){
    Install_Docker
}
main