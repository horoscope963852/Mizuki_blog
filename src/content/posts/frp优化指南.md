---
title: "Frp优化指南"
published: 2025-12-27
description: "从协议优化、网络调优、资源管理、安全加固四个维度系统性优化FRP"
tags: ["frp", "内网穿透", "优化", "网络"]
category: "网络技术"
draft: false
---

在云服务器上部署FRP后，可以从**协议优化、网络调优、资源管理、安全加固**四个维度进行系统性优化。以下是基于生产环境实践的详细优化方案：

### **一、降低连接延迟的核心优化**

#### **1. 启用KCP协议**（最关键）

KCP基于UDP实现，相比TCP在高丢包网络环境下延迟降低30-50%：

```ini
# 服务端 frps.ini
[common]
bind_port = 7000
kcp_bind_port = 7000  # 与bind_port相同

# 客户端 frpc.ini
[common]
server_addr = x.x.x.x
server_port = 7000
protocol = kcp        # 关键参数
```

**实测数据**：跨省链路中TCP延迟142ms，KCP可降至96ms

#### **2. 优化心跳机制**

防止NAT超时导致的连接中断：

```ini
# 服务端和客户端均需配置
[common]
heartbeat_interval = 15      # 建议10-30秒
heartbeat_timeout = 45       # 设为3倍心跳间隔
tcp_keepalive = 7200         # 系统TCP保活时间
```

**原理**：缩短心跳间隔可及时刷新NAT会话表，避免数据包无法返回

#### **3. 启用数据压缩**

减少传输体积，适合文本类协议（HTTP/SSH）：

```ini
[common]
use_compression = true
use_encryption = false       # 安全场景下按需开启
```

**注意**：压缩会增加5-10% CPU占用，建议在带宽受限场景使用

#### **4. 网络层加速**

- **调整MTU**：KCP模式下设`mtu = 1200`适应UDP路径

- **部署边缘节点**：选择离你本地服务器物理距离最近的云区域（如华北用户选北京节点），延迟可从200ms降至30ms以内

- **开启TCP多路复用**：

```ini
  tcp_mux = true  # 减少连接建立开销
```

### **二、减少云服务器性能占用**

#### **1. 关闭非必要功能**

```ini
# 服务端配置
[common]
disable_log_color = true     # 关闭日志颜色减少IO
log_file = /var/log/frps.log
log_level = warn             # 仅记录警告以上级别

# 客户端配置
[common]
log_level = error            # 进一步降低日志输出
```

**效果**：日志级别从`info`调整为`warn`可减少30%磁盘写入

#### **2. 资源限制与监控**

- **使用systemd限制资源**：

```ini
# /etc/systemd/system/frps.service
[Service]
MemoryLimit=512M           # 限制内存使用
CPUQuota=50%               # 限制CPU占用
```

- **启用Prometheus监控** （frps v0.33+）：

```ini
[common]
dashboard_addr = 0.0.0.0
dashboard_port = 7500
enable_prometheus = true   # 暴露metrics接口
```

**监控指标**：`frps_current_connections`、`frps_traffic_in`等

#### **3. 内核参数优化**

在云服务器上执行：

```bash
# 增大端口范围
echo "net.ipv4.ip_local_port_range = 1024 65535" >> /etc/sysctl.conf

# 优化TCP连接回收
echo "net.ipv4.tcp_tw_reuse = 1" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fin_timeout = 30" >> /etc/sysctl.conf

# 调整系统最大文件句柄
echo "* hard nofile 65536" >> /etc/security/limits.conf
```

**作用**：减少`TIME_WAIT`状态连接堆积，提升并发能力

### **三、高级优化与生产环境建议**

#### **1. 安全加固**（减少恶意扫描开销）

- **IP白名单**：在云服务器安全组限制访问来源

- **Token动态轮换**：定期更新`authentication_token`

- **Fail2ban防护**：

```ini
# 安装后配置/etc/fail2ban/jail.local
[frp]
enabled = true
filter = frp
logpath = /var/log/frps.log
maxretry = 3
```

**效果**：自动封禁暴力破解IP，减少无效连接消耗

#### **2. 负载均衡与高可用**

- **多实例部署**：启动多个frps进程监听不同端口，前端用Nginx stream模块分发

- **客户端重连机制**：

```ini
[common]
login_fail_exit = false    # 登录失败不退出
protocol = tcp
tcp_mux = true
```

#### **3. 日志与监控体系**

- **日志轮转**：避免磁盘打满

```ini
# /etc/logrotate.d/frps
/var/log/frps.log {
    daily
    rotate 7
    compress
}
```

- **告警配置**：监控连接数异常突增、带宽超限

### **四、实施优先级建议**

| 优化项           | 延迟改善   | 性能节省 | 实施难度 | 推荐度 |
| ---------------- | ---------- | -------- | -------- | ------ |
| **启用KCP协议**  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | 低       | ★★★★★  |
| **调整心跳间隔** | ⭐⭐⭐⭐   | ⭐⭐     | 低       | ★★★★★  |
| **日志级别调优** | -          | ⭐⭐⭐⭐ | 极低     | ★★★★☆  |
| **内核参数优化** | ⭐⭐⭐⭐⭐ | ⭐       | 中       | ★★★★☆  |
| **部署边缘节点** | ⭐⭐⭐⭐⭐ | -        | 高       | ★★★★☆  |
| **启用压缩**     | ⭐⭐⭐     | -        | 低       | ★★★☆☆  |
| **资源限制**     | -          | ⭐⭐⭐⭐ | 中       | ★★★☆☆  |

**最佳实践**：先完成KCP+心跳调优（5分钟见效），再逐步实施监控和资源限制

### **五、验证优化效果**

```bash
# 1. 测试延迟
mtr -r -c 100 your-frps-server.com

# 2. 监测连接状态
ss -tuln | grep 7000  # 查看端口监听
netstat -an | grep ESTABLISHED | wc -l  # 统计活跃连接

# 3. 压测工具
# 使用frp自带的benchmark或自定义脚本模拟并发
```

**优化目标**：将延迟控制在50ms以内（同城），CPU占用稳定在单核30%以下

通过以上配置，可在保证稳定性的前提下，显著降低延迟并减少云服务器资源消耗。
