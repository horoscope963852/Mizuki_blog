---
title: "Altium Designer 使用指南 - PDF 预览测试"
published: 2026-07-16
description: "测试在博客中直接嵌入 PDF 文档预览功能"
tags: ["PCB设计", "Altium Designer", "硬件开发", "教程"]
category: "技术笔记"
draft: true
---

这是一篇用于测试 PDF 文档嵌入功能的博客文章。下面将直接展示 Altium Designer 使用指南的 PDF 文档。

## PDF 文档预览

<iframe 
  src="/pdfs/AD使用.pdf" 
  width="100%" 
  height="800px"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
></iframe>

## 功能说明

上面的 PDF 预览使用了 HTML 的 `<iframe>` 标签实现，具有以下特点：

1. **浏览器原生支持**：利用浏览器内置的 PDF 阅读器
2. **完整功能**：支持缩放、翻页、搜索、打印、下载等所有基本功能
3. **零依赖**：不需要任何额外的 JavaScript 库
4. **跨平台兼容**：所有现代浏览器都支持

## 使用方法

如果你想在其他文章中嵌入 PDF 文档，只需：

1. 将 PDF 文件放在 `public/pdfs/` 目录下
2. 在 Markdown 文章中使用以下代码：

```html
<iframe
  src="/pdfs/your-document.pdf"
  width="100%"
  height="800px"
  style="border: none; border-radius: 12px;"
></iframe>
```

## 下载链接

如果需要下载 PDF 文档，可以[点击这里](/pdfs/AD使用.pdf)。
