# PDF 预览功能使用指南

本博客支持两种 PDF 文档预览方案，可以根据需求选择使用。

## 方案 1: iframe 方案（推荐）

### 特点
- ✅ 实现最简单，零依赖
- ✅ 利用浏览器内置 PDF 阅读器
- ✅ 支持所有基本功能（缩放、翻页、搜索、打印、下载）
- ✅ 跨浏览器兼容性好

### 使用方法

1. 将 PDF 文件放在 `public/pdfs/` 目录下

2. 在 Markdown 文章中使用以下代码：

```markdown
---
title: "你的文章标题"
---

# 文章内容

<iframe 
  src="/pdfs/your-document.pdf" 
  width="100%" 
  height="800px"
  style="border: none; border-radius: 12px;"
></iframe>
```

### 示例

查看测试文章：`src/content/posts/ad-pdf预览测试.md`

---

## 方案 2: PDF.js 方案

### 特点
- ✅ 跨浏览器完全一致的渲染效果
- ✅ 高度可定制的界面
- ✅ 支持暗色模式
- ✅ 自带翻页、缩放、下载功能
- ❌ 需要额外依赖（pdfjs-dist ~2MB）

### 使用方法

1. 安装依赖：
```bash
pnpm add pdfjs-dist
```

2. 在 MDX 文章中导入并使用组件：

```markdown
---
title: "你的文章标题"
---

import PDFViewer from '../../components/features/posts/PDFViewer.astro';

# 文章内容

<PDFViewer url="/pdfs/your-document.pdf" height={800} />
```

### 示例

查看测试文章：`src/content/posts/ad-pdfjs预览测试.md`

---

## 两种方案对比

| 特性 | iframe 方案 | PDF.js 方案 |
|------|------------|-------------|
| 实现难度 | ⭐ 简单 | ⭐⭐⭐ 复杂 |
| 依赖大小 | 0 | ~2MB |
| 跨浏览器一致性 | ⚠️ 一般 | ✅ 完美 |
| 自定义程度 | ❌ 低 | ✅ 高 |
| 暗色模式支持 | ❌ 无 | ✅ 支持 |
| 移动端体验 | ⚠️ 一般 | ✅ 好 |
| 功能完整性 | ✅ 完整 | ✅ 完整 |

## 推荐使用场景

### 使用 iframe 方案当：
- 需要快速实现 PDF 预览
- 不想增加额外依赖
- 对界面一致性要求不高
- 主要在桌面端浏览

### 使用 PDF.js 方案当：
- 需要统一的跨浏览器体验
- 需要支持暗色模式
- 需要自定义界面样式
- 需要更好的移动端支持

## 注意事项

1. **文件大小**：PDF 文件建议不超过 10MB，否则影响加载速度
2. **文件名**：建议使用英文文件名，避免中文编码问题
3. **路径**：PDF 文件必须放在 `public/` 目录下才能被正确访问
4. **格式**：确保 PDF 文件格式正确，损坏的文件无法正常显示

## 故障排查

### PDF 无法显示
1. 检查文件路径是否正确
2. 确认 PDF 文件是否损坏
3. 检查浏览器控制台是否有错误信息

### PDF.js 加载失败
1. 确认已安装 pdfjs-dist 依赖
2. 检查网络连接（需要从 CDN 加载 worker 文件）
3. 查看浏览器控制台的详细错误信息

## 更多资源

- [PDF.js 官方文档](https://mozilla.github.io/pdf.js/)
- [iframe MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
