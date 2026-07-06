---
title: "在QWRT系统上运行校园网登录脚本"
published: 2026-01-01
description: "在OpenWrt系统上部署校园网自动登录脚本并设置开机自启"
tags: ["OpenWrt", "校园网", "路由器", "自动登录"]
category: "网络技术"
draft: false
---

## 使用脚本

自动登录脚本（需提前配置参数）：

```bash
cd /opt/AutoLogin/UESTC--main
python3 login_once.py
```

守护进程：

```bash
python3 always_online.py
```

后台运行守护进程：

```bash
nohup python3 /opt/AutoLogin/UESTC--main/always_online.py > /dev/null 2>&1 &
```

设置开机自启：

```bash
/etc/init.d/uestc start
```

## 进阶设置

将脚本注册成系统服务，在系统重启后也能继续守护进程。

创建 /opt/AutoLogin/UESTC--main/start_uestd.sh

```bash
#!/bin/sh
# OpenWrt 通用 sh，兼容 ash / bash

PY_DIR="/opt/AutoLogin/UESTC--main"
LOG_FILE="/var/log/uestc.log"

log() {
    echo "$(date '+%F %T') $*" >> "$LOG_FILE"
}

# 1. 先跑一次 login_once.py
log "Stage1: try login_once.py ..."
python3 "$PY_DIR/login_once.py" >> "$LOG_FILE" 2>&1
LOGIN_RET=$?
if [ $LOGIN_RET -ne 0 ]; then
    log "login_once.py failed, exit code=$LOGIN_RET"
    exit 1
fi

# 2. 等待网络真正连通（最多 60 s）
WAIT_SEC=60
while [ $WAIT_SEC -gt 0 ]; do
    # 用 ping 检测校园网认证地址，换成你能 ping 的地址
    if ping -c 1 -W 2 202.112.174.104 >/dev/null 2>&1; then
        log "Network is up."
        break
    fi
    log "Waiting for network ... $WAIT_SEC"
    sleep 1
    WAIT_SEC=$((WAIT_SEC - 1))
done

if [ $WAIT_SEC -eq 0 ]; then
    log "Network still down after 60 s, give up."
    exit 1
fi

# 3. 启动 always_online.py，使用 nohup 让它脱离终端
log "Stage2: start always_online.py in background"
nohup python3 -u "$PY_DIR/always_online.py" >> "$LOG_FILE" 2>&1 &

log "start_uestd.sh finished, always_online.py is running in background."
```

```bash
chmod +x /opt/AutoLogin/UESTC--main/start_uestd.sh
```

创建 /etc/init.d/uestc

```yaml
#!/bin/sh /etc/rc.common
# 放在 /etc/init.d/uestc
START=99     # 网络启动之后再跑
STOP=10

PROG=/opt/AutoLogin/UESTC--main/start_uestd.sh

start() {
    # 只在首次启动时跑一次，避免重复
    [ -f /var/lock/uestc.started ] && return 0
    touch /var/lock/uestc.started
    $PROG &
}

stop() {
    # 不杀 always_online.py，让它自生自灭
    :
}
```

```bash
chmod +x /etc/init.d/uestc
/etc/init.d/uestc enable
```

启动脚本：

```bash
/etc/init.d/uestc start
```

查看日志：

```bash
tail -f /var/log/uestc.log
```

**目前发现的问题：重启系统后，该脚本确实可以运行一次登录脚本，但是第二次重启后就失效了。**
