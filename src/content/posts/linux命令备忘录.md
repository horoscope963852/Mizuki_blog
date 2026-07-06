---
title: "VPS常用命令及脚本备忘录"
published: 2025-11-20
description: "收集整理的VPS常用命令和脚本，包括测速、优化、流媒体解锁等"
tags: ["VPS", "Linux", "运维", "脚本"]
category: "网络技术"
draft: true
---

正式成为一名新人MJJ，记录一下比较实用的脚本，后面用得多了再来评价一下好不好用。

## 查询登陆失败次数

```bash
sudo journalctl -u ssh --no-pager | grep "Failed password" | wc -l
```

## Node Quality

```
bash <(curl -sL https://run.NodeQuality.com)
```

## 流媒体解锁

```
bash <(curl -L -s check.unlock.media)
```

## 网页&DNS测速

```
bash <(wget -qO- https://raw.githubusercontent.com/Cd1s/network-latency-tester/main/latency.sh)
```

## Speedtest 多线程测速

```
curl -sL nws.sh | bash
```

## 国内测速

```
bash <(curl -sL https://raw.githubusercontent.com/i-abc/Speedtest/main/speedtest.sh)
```

## 开启bbr和自动调优

```
bash <(curl -sL https://raw.githubusercontent.com/yahuisme/network-optimization/main/script.sh)
```

```
bash <(curl -l -s https://raw.githubusercontent.com/byJoey/Actions-bbr-v3/refs/heads/main/install.sh)
```

## 查看版本号与内核

```
echo "内核: $(uname -r)" && echo "发行版: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
```
