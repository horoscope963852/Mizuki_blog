---
title: "优雅地访问校园网之Frp工具入门"
published: 2025-10-31
description: "详细介绍如何使用frp工具实现校园网内网穿透，解决校外访问校园网服务的问题"
tags: ["frp", "内网穿透", "校园网", "网络"]
category: "技术"
draft: false
---

## 背景

校园网（即[中国教育和科研计算机网 CERNET](https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E6%95%99%E8%82%B2%E5%92%8C%E7%A7%91%E7%A0%94%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91/6175431)）是由教育部主导、全国高校共建的学术宽带专网，电子科技大学是CERNET在西南地区的核心节点。由于很多校内服务（例如在线实验平台、服务器等）都部署在校园网内，还有一些限制在校学生才能使用的服务（例如知网、万方等文献下载），因此无法连接到校园网也就意味着无法使用这些服务；另外，连接校园网的电脑，即使有IPv6地址也无法通过微软的RDP工具进行远程连接。为了解决在校外也能访问校园网的问题，学校提供了Easy connect软件来搭建校园网VPN，只要开启并登录了Easy connect，就可以随时随地访问校园网了。

然而，由于2024年11月21日学校对VPN系统进行了[升级](https://info.uestc.edu.cn/info/1015/4035.htm)（实为阉割），Easy connect如今仅能用于校园正版软件激活，不再提供其他服务。现在，除了UESTC-WiFi、工位上的有线网络以及宿舍内的电信宽带，其他网络都不能再访问校园网了。因此，我们需要使用frp工具来实现内网穿透，也就是把校园网内网的服务穿透到外网，以满足在公网也能访问内网服务的需求。

截止写稿时，开源项目[frp](https://github.com/fatedier/frp)已经在Github上收获了正好100k Star。作为一款方便、轻量的内网穿透工具，frp被广泛应用于Minecraft游戏联机，例如[Sakura Frp](https://www.natfrp.com/)。但是，它的功能却远不止如此。

::github{repo="fatedier/frp"}

## 原理与优势

frp的原理是把内网端口“映射”到公网端口，公网服务器收到流量后通过反向隧道原路送回内网。不需要修改防火墙，只需几行代码即可实现。配置简单、延迟低、免费开源，还支持加密、压缩与多路复用。

## 准备材料

1.一台连接校园网的电脑（称为frpc）
2.一台拥有公网IP地址的云服务器（称为frps）
3.frp的服务端和客户端软件（[点此访问Github下载](https://github.com/fatedier/frp/releases)）
4.本文或者其他任何教程、AI工具用以提供指导
5.聪明的大脑和勤劳的双手

## 操作步骤

**1.安装frp**
关于在Linux和Windows上部署frp的服务端和客户端，可以直接参考[FRP 内网穿透全流程部署指南 (Windows/Linux)](https://blog.csdn.net/y_wu794/article/details/150637146)这篇文章。
在Linux上设置frp开机自启：
（路径请自行修改）

```bash
sudo nano /etc/systemd/system/frps.service`

```
[Unit]
Description=Frp Server
After=network.target

[Service]
Type=simple
User=frp
WorkingDirectory=/opt/frp
ExecStart=/opt/frp/frps -c /opt/frp/frps.toml
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

保存后执行：

```bash
sudo systemctl daemon-reload
```

```
sudo systemctl enable --now frps        # 立即启动并设为开机自启
```

在Windows上设置frp开机自启：
[Windows如何优雅地自启动Frp（其他软件也行）](https://zhuanlan.zhihu.com/p/714872074)

**2.写配置文件**
从 v0.52.0 版本开始，frp 开始支持 TOML、YAML 和 JSON 作为配置文件格式。
下面是可供参考的frps.toml和frpc.toml文件内容。

```toml
# frps.toml

bindPort = 7000               # 与客户端通信的端口，必须设置，端口自定

auth.method = "token"         # 认证方式，建议设置
auth.token = "your_token"     # 认证令牌，相当于密码，与客户端一致才能连接

# Web 控制台（可选，用于查看连接状态）
webServer.addr = "0.0.0.0"
webServer.port = 7500         # 控制台端口，可自定义
webServer.user = "admin"      # 控制台账号
webServer.password = "admin"  # 控制台密码
```

```
# frpc.toml

serverAddr = "your_server_ip" # 填写你的公网服务器IP
serverPort = 7000             # 与服务端通信的端口，必须设置，端口与frps.toml中的一致

auth.method = "token"         # 认证方式，建议设置
auth.token = "your_token"     # 认证令牌，相当于密码，与服务端一致才能连接

# 下面开始写具体需要穿透的内网IP及端口

[[proxies]]
name = "ssh"                  # 连接名称，自定义
type = "tcp"                  # 连接协议，如RDP连接采用TCP+UDP，SSH连接采用TCP
localIP = "127.0.0.1"
localPort = 22                # 连接端口，RDP默认为3389端口，SSH默认为22端口，http默认为80端口，不清楚端口号可以搜一下
remotePort = 6002             # 映射到公网的端口，也是远程访问使用的端口

# [[proxies]]可以写很多个，只要name和remotePort不冲突即可。
```

以上只提供一个可以使用的最简配置，网上还有很多关于如何写配置文件的教程，官方也有full example参考：
[frps_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frps_full_example.toml)
[frpc_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)

**3.启动frp**
使用以下命令启动服务器：`./frps -c ./frps.toml`
使用以下命令启动客户端：`./frpc -c ./frpc.toml`
如果配置文件没有问题，服务端和客户端就会建立连接，现在你只需要访问服务端IP+remotePort中填写的端口号，就可以访问内网中localIP:remotePort所在的服务了。

例如，在客户端使用如下的配置文件，可以在RDP中输入xtkx.site:10001远程连接内网电脑，也可以在浏览器中输入[http://xtkx.site:10002](http://xtkx.site:10002)来进行在线实验。

```toml
[[proxies]]
name = "RDPtcp"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 10001

[[proxies]]
name = "RDPudp"
type = "udp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 10001

[[proxies]]
name = "xyd"
type = "tcp"
localIP = "10.20.26.241"
localPort = 80
remotePort = 10002
```

## 进阶玩法

**1.局域网穿透**
有的同学可能发现了，[10.20.26.241](tel:102026241)是一个校园网内的网页服务，并不是运行frpc客户端的电脑。但是，frp却成功地把这个网页服务穿透到了外网，这是为什么？
其实从frp的原理来看，只要是内网可以访问的服务，都可以通过frpc中转后进行穿透。在外网访问[http://xtkx.site:10002](http://xtkx.site:10002)时，这个请求会经过公网服务器送到frpc所在的电脑，再由这台内网中的电脑发送到[10.20.26.241](tel:102026241)所在的网页服务器。也就是说，只需要一台内网中的frpc设备，就可以穿透整个局域网！理想的情况是，只要校园网内有一台运行frpc的设备，就可以让所有的外网用户访问所有校园网内的服务。

**2.流量加密**
当 frpc 和 frps 之间启用了 TLS 之后，流量会被全局加密，不再需要配置单个代理上的加密，新版本中已经默认启用。
从 v0.50.0 开始，transport.tls.enable 的默认值将会为 true，默认开启 TLS 协议加密。如果 frps 端没有配置证书，则会使用随机生成的证书来加密流量。默认情况下，frpc 开启 TLS 加密功能，但是不校验 frps 的证书。
下面讲讲如何生成TLS证书用于服务端和客户端的双向验证。参考教程：[加密 frp 配置教程](https://zdawng.github.io/posts/e8847680/)

确认机器上已经安装 openssl 与 frp（任一版本 ≥ 0.40 都支持 tls_enable）。
将下面的内容复制到新文件中并命名为gen-frp-tls.sh，注意修改SERVER_IP为真实IP地址：

```bash
#!/bin/bash
set -e
# ============= 唯一需要改的地方 =============
SERVER_IP="123.57.22.44"      # 改成你 frps 的公网 IP 或域名
CA_CN="frp-ca.local"
SERVER_CN="frp-server.local"
CLIENT_CN="frp-client.local"
# ===========================================
rm -f ca.* server.* client.* my-openssl.cnf

cat > my-openssl.cnf <<EOF
[ ca ]
default_ca = CA_default
[ CA_default ]
x509_extensions = usr_cert
[ req ]
default_bits        = 2048
default_md          = sha256
distinguished_name  = req_distinguished_name
x509_extensions     = v3_ca
[ req_distinguished_name ]
[ usr_cert ]
basicConstraints       = CA:FALSE
nsComment              = "OpenSSL Generated Certificate"
subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid,issuer
[ v3_ca ]
subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid:always,issuer
basicConstraints       = CA:true
EOF

# 1. 自签 CA
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=${CA_CN}" -days 3650 -out ca.crt

# 2. 服务端证书（含 SAN）
openssl genrsa -out server.key 2048
openssl req -new -sha256 -key server.key \
  -subj "/CN=${SERVER_CN}" \
  -reqexts SAN \
  -config <(cat my-openssl.cnf <(printf "\n[SAN]\nsubjectAltName=IP:${SERVER_IP},DNS:${SERVER_CN}")) \
  -out server.csr
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -days 825 -sha256 \
  -extfile <(printf "subjectAltName=IP:${SERVER_IP},DNS:${SERVER_CN}") \
  -out server.crt

# 3. 客户端证书
openssl genrsa -out client.key 2048
openssl req -new -sha256 -key client.key -subj "/CN=${CLIENT_CN}" -out client.csr
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -days 825 -sha256 -out client.crt

# 4. 清理无用文件
rm -f *.csr my-openssl.cnf ca.srl
chmod 600 *.key
echo "[✓] frp 双向 TLS 证书已生成："
ls -l /etc/frp/tls
```

```
sudo chmod +x gen-frp-tls.sh #给脚本执行权
```

```
sudo ./gen-frp-tls.sh #运行脚本
```

运行结束后目录里会有下面几个文件：
ca.crt
server.crt server.key
client.crt client.key

把证书添加到 frp 配置中：

```toml
# frps.toml

# ===== 新增 TLS =====
tls_enable = true
tls_cert_file = /etc/frp/tls/server.crt
tls_key_file  = /etc/frp/tls/server.key
tls_trusted_ca_file = /etc/frp/tls/ca.crt      # 只允许自家 CA 签的客户端
```

```
# frpc.toml

# ===== 新增 TLS =====
tls_enable = true
tls_cert_file = /etc/frp/tls/client.crt
tls_key_file  = /etc/frp/tls/client.key
tls_trusted_ca_file = /etc/frp/tls/ca.crt      # 验证服务端证书
```

把文件拷贝到对应目录并重启 frps / frpc 即可。
两端启动后都不会再出现 `tcp:... connected` 这种裸连提示，而是`login to server success, use tls`

如果frpc端是Windows，建议把证书文件放在frpc.exe相同目录下。

Q1. 脚本里-days 825 是什么意思？
A：证书有效期，可以自定义。

Q2. 怎么一次性给多个客户端签发证书？
A：多执行几次脚本，每次改 CLIENT_CN

Q3. 如何验证证书没问题？
A：

```bash
# 验证服务端证书
openssl x509 -in server.crt -noout -text | grep -A1 "Subject Alternative Name"
# 验证客户端证书
openssl verify -CAfile ca.crt client.crt
```

**3.流量混淆**
在不希望frp流量被发现时，可以通过流量混淆增强流量的隐匿性，下面举几个可供参考的方法。
[内网渗透代理之frp的应用与改造（一）](https://www.anquanke.com/post/id/231424)
[内网渗透代理之frp的应用与改造（二）](https://www.anquanke.com/post/id/231685)
[frp优化用于免杀和流量隐蔽](https://www.freebuf.com/sectool/332824.html)
[FRP改造计划](https://uknowsec.cn/posts/notes/FRP%E6%94%B9%E9%80%A0%E8%AE%A1%E5%88%92.html)

**4.智能解析**
以前，在内网访问用[10.20.26.241](tel:102026241)，外网访问用[http://xtkx.site:10002](http://xtkx.site:10002)。现在，借助DNS的智能解析功能，可以实现访问同一个域名，在内网时直连，在外网时中转。
[基于 frp 的教育网反向代理](https://yusanshi.com/posts/2021-11-05/frp-and-reverse-proxy/)

## 引用

1.[FRP 内网穿透全流程部署指南 (Windows/Linux)](https://blog.csdn.net/y_wu794/article/details/150637146)
2.[Windows如何优雅地自启动Frp（其他软件也行）](https://zhuanlan.zhihu.com/p/714872074)
3.[frp官方中文文档](https://gofrp.org/zh-cn/docs/)
4.[FRP - Linux & Win 内网穿透教程 手搓难度 ⭐️⭐️](https://github.com/CNFlyCat/UsefulTutorials/tree/master/Frp%E5%86%85%E7%BD%91%E7%A9%BF%E9%80%8F%E6%90%AD%E5%BB%BA%E6%95%99%E5%AD%A6)
5.[加密 frp 配置教程](https://zdawng.github.io/posts/e8847680/)
6.[内网渗透代理之frp的应用与改造（一）](https://www.anquanke.com/post/id/231424)
7.[内网渗透代理之frp的应用与改造（二）](https://www.anquanke.com/post/id/231685)
8.[frp优化用于免杀和流量隐蔽](https://www.freebuf.com/sectool/332824.html)
9.[FRP改造计划](https://uknowsec.cn/posts/notes/FRP%E6%94%B9%E9%80%A0%E8%AE%A1%E5%88%92.html)
10.[基于 frp 的教育网反向代理](https://yusanshi.com/posts/2021-11-05/frp-and-reverse-proxy/)

## 后记

这篇原创性比较低，由于frp已经是很成熟和很大众的工具，所以很多地方都直接引用了网上现有的参考资料（可用性已经经过笔者验证）。除了文中这些内容，还有frp-panel、frp插件等还未探索过的内容，等有时间也会去尝试。

下一篇：[优雅地访问校园网之搭建clash节点](https://horoscope.xtkx.site/archives/108)

访问原文：[优雅地访问校园网之Frp工具入门](https://horoscope.xtkx.site/archives/95)