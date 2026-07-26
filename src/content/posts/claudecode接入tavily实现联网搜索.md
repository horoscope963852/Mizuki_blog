---
title: "claudecode 接入 tavily 实现联网搜索"
published: 2026-07-25
description: "通过配置 Tavily API Key 为 Claude Code 添加联网搜索能力"
tags: ["Claude Code", "Tavily", "联网搜索", "AI工具"]
category: "AI技术"
draft: false
---

1. 首先在 `C:\Users\你的用户名\.claude` 这个路径下找到 `settings.json` 这个文件，在配置文件中添加 `"env": { "TAVILY_API_KEY": "你的密钥" }`。

2. 接着在 Windows 终端中打开 Claudecode，依次输入下面的命令：

```
/plugin marketplace add tavily-ai/skills
/plugin install tavily@skills
```

3. 重启之后就可以开始使用联网搜索了。
