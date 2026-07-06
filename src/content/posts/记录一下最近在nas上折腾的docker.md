---
title: "记录一下最近在FnOS上折腾的docker"
published: 2025-11-06
description: "在飞牛NAS上安装Openlist、Open WebUI、AstrBot等Docker项目的记录"
tags: ["NAS", "Docker", "飞牛", "运维"]
category: "技术"
draft: false
---

开帖记录一下最近在宿舍的飞牛NAS上安装的docker项目，主要是防止文件丢失之后又要摸索半天安装方法，所以主要记录一下安装的方式。

## Openlist

Openlist是一个用来挂载各种网盘的工具，支持几乎所有的网盘，只要配置好token，就可以在线下载或者观看，不需要再安装官方的客户端。还可以通过网页分享给别人使用。

安装命令如下，直接在SSH终端中使用：

```bash
sudo chown -R 1001:1001 /vol1/1000/docker/openlist
docker run -d --restart=unless-stopped -v /vol1/1000/docker/openlist:/opt/openlist/data -p 5244:5244 -e UMASK=022 --name="openlist" openlistteam/openlist:latest
```

## Open webUI

仿照Chat GPT设计的大语言模型对话前端，后端可以接入Ollama运行本地模型或者API，不算很轻量，但是功能比较丰富，还有用户管理功能，可以分享给别人一起使用。最近因为买了15块钱GLM-4.6的token才想起来折腾这个项目。

docker compose命令如下：

```bash
docker run -d -p 3002:8080 \
  -v /vol1/1000/docker/open_webui:/app/backend/data \
  -e USER_AGENT="open-webui" \
  --name open-webui \
  --restart always \
  --network botnet \
  ghcr.io/open-webui/open-webui:main
```

另外使用GLM的API的时候，url应该填[https://open.bigmodel.cn/api/paas/v4/](https://open.bigmodel.cn/api/paas/v4/)，其他的链接好像都连接不上。

## AstrBot+Napcat

跑QQ机器人的小道具，无需多言。

`sudo docker run -itd -p 6180-6200:6180-6200 -p 11451:11451 -v $PWD/data:/AstrBot/data -v /etc/localtime:/etc/localtime:ro -v /etc/timezone:/etc/timezone:ro --name astrbot m.daocloud.io/docker.io/soulter/astrbot:latest`

```bash
docker run -d \
-e NAPCAT_GID=$(id -g) \
-e NAPCAT_UID=$(id -u) \
-p 4000:3000 \
-p 4001:3001 \
-p 6099:6099 \
--name napcat \
--restart=always \
mlikiowa/napcat-docker:latest
```

## Clash+yacd

Clash是众所周知的代理工具，yacd是docker版本Clash的webUI，主要的参考教程：[飞牛docker部署Clash与yacd-自动化安装脚本在最后](https://club.fnnas.com/forum.php?mod=viewthread&tid=11682&highlight=)

教程写的很好，但是这个教程要实现的最终效果是在Windows系统上，使用系统自带的代理工具访问外网，但是我安装Clash的目的是为了让安装在NAS上的docker能够访问外网，以便调用Gemini的API。

Clash的初始配置文件（没什么用，只是一个模板）：

```yaml
port: 7890
socks-port: 7891
redir-port: 7892
allow-lan: true
mode: Rule
log-level: silent
external-controller: '0.0.0.0:9090'
secret: ""
```

之后使用下面的脚本，连接我们购买的订阅链接并且每日更新节点：

```bash
# 下载订阅连接中的节点配置文件（替换xxxxxx的内容，有的尾部需要加入参数，如&flag=clash）：
wget -O "/vol1/1000/docker/clash/config.yaml" "https://你的订阅链接/api/v1/client/subscribe?token=你的订阅token&flag=clash"
# 修改节点配置文件部分端口、IP地址（每家配置文件各不相同，具体根据自己来，在线测试sed [https://sed.js.org/](https://sed.js.org/)）：
sed -i "s/mixed-port: 7890/port: 7890\nsocks-port: 7891/; s/external-controller: '127.0.0.1:9090'/external-controller: '0.0.0.0:9090'/" "/vol1/1000/docker/clash/config.yaml"

# 重新加载配置文件（参考官网API调用方法 [https://clash.gitbook.io/doc/restful-api/config](https://clash.gitbook.io/doc/restful-api/config)）：
curl --location --request PUT 'http://localhost:9090/configs' \
--header 'Content-Type: application/json' \
--data-raw '{"path": "/root/.config/clash/config.yaml"}'
```

把Clash的external-controller端口连接到yacd后，就可以在yacd中实时监测连接数和上传下载流量了。

## Sillytavern

这是用来玩酒馆的道具，目前还在摸索用法，但是好歹也是把docker安装成功了。

网上的教程大多围绕Windows系统来安装sillytavern，docker安装甚至连官方文档也没有讲明白。

```yaml
services:
  sillytavern:
    build: ..
    container_name: sillytavern
    hostname: sillytavern
    # 改用镜像仓库中下载的镜像
    image: goolashe/sillytavern:stable
    # 接入名为 botnet 的 Docker 网络
    networks:
      - botnet
    environment:
      - NODE_ENV=production
      - FORCE_COLOR=1
      # 代理配置
      - HTTP_PROXY=http://clash:7890
      - HTTPS_PROXY=http://clash:7890
      - NO_PROXY=localhost,127.0.0.1,clash
    ports:
      - "8888:8000"
    volumes:
      - "./config:/home/node/app/config"
      - "./data:/home/node/app/data"
      - "./plugins:/home/node/app/plugins"
      - "./extensions:/home/node/app/public/scripts/extensions/third-party"
      # 后续配置 HTTPS 时使用
      - "./certs:/home/node/app/certs"
    # 修改重启选项为 always
    restart: always

networks:
  botnet:
    external: true
```

请注意，sillytavern安装完成后只有localhost才能访问web界面，因此需要先修改配置文件，把192.168.1.0/24这个局域网网段添加进白名单，这样你就可以在局域网内开始玩耍了。

## Homepage

免费、开源、强大的导航页，据说功能很多所以比较折腾。玩的可不就是一个折腾么。

注：似乎还没找到把homepage容器连接到botnet网络的办法，不过应该也不需要访问外网吧。

下面是dokcer compose命令，美化教程参考：[Homepage：极简导航页](https://www.himiku.com/archives/homepage.html)

```yaml
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    volumes:
      - /vol1/1000/docker/homepage/config:/app/config # Make sure your local config directory exists
      - /vol1/1000/docker/homepage/docker.sock:/var/run/docker.sock # (optional) For docker integrations
      - /vol1/1000/docker/homepage/icons:/app/public/icons
      - /vol1/1000/docker/homepage/images:/app/public/images
      - /vol1/1000/docker/homepage/logs:/logs
    environment:
      HOMEPAGE_ALLOWED_HOSTS: 192.168.1.108:3000 # required, may need port. See gethomepage.dev/installation/#homepage_allowed_hosts
```

## 怎么让Docker访问外网？

这是最重要的问题。

首先，docker安装时默认连接到bridge网络中，这个网络中每个容器的IP会变动，而且不能用容器的名称来作为IP互相访问。所以我们需要新建一个自定义网络，我这里的自定义网络名叫botnet。

之后让所有的容器都连接到这个botnet网络，可以是安装时设置  --network botnet \  或者安装后再修改连接的网络。（后者可能丢失容器中的数据，我的Open webUI就是这样丢了一次数据，不过好在补救并不难）

在自定义的网络中，虽然每次重启容器的IP还是会发生变动，但是现在可以用容器名来作为IP互相访问了，比如 `http://clash:9090` 表示容器Clash的9090端口。

之后我们给每个需要访问外网的容器增加下面的系统变量（同样地，可以在docker安装时添加或者安装后修改系统变量）：

```bash
HTTP_PROXY=http://clash:7890
HTTPS_PROXY=http://clash:7890
NO_PROXY=localhost,127.0.0.1,clash
```

完成这些操作就可以让其他docker都走clash docker的代理了。甚至我也试过，你依然可以用你的NAS IP+Clash端口号来作为Windows的代理服务器来实现无Clash客户端访问外网。这是因为你的clash的端口已经映射到了NAS的端口，除非你没有这么做。
