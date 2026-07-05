# 🌸 horoscope's blog

> 追寻你自己的星星！

基于 [Mizuki](https://github.com/LyraVoid/Mizuki) 模板，使用 [Astro](https://astro.build) 构建的个人博客。

[![Astro](https://img.shields.io/badge/Astro-7.0.4-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

[**🖥️ 在线访问**](https://blog.horoscope.xtkx.site/)

🌏 **README 语言：**
[**English**](./README.md) / [**中文**](./README.zh.md) / [**日本語**](./README.ja.md) / [**繁體中文**](./README.tw.md)

## 功能

- 明暗主题切换 & 自定义主题色
- 全屏壁纸背景，支持轮播
- 基于 Pagefind 的全文搜索
- 文章分类、标签、置顶
- 日记、友链、项目、时间线、相册等特色页面
- 增强 Markdown：代码高亮、数学公式、提示框、GitHub 卡片
- PhotoSwipe 图片画廊
- Twikoo 评论系统
- RSS 订阅 & SEO 优化

## 快速开始

```bash
git clone https://github.com/horoscope963852/Mizuki_blog.git
cd Mizuki_blog
npm install -g pnpm
pnpm install
pnpm dev
```

访问 `http://localhost:4321` 查看效果。

## 部署

```bash
pnpm build
```

构建产物在 `./dist/`，可部署到 Vercel、Netlify、GitHub Pages 等静态托管平台。部署前请在 `src/config/siteConfig.ts` 中更新 `siteURL`。

## 许可证

基于 [Mizuki](https://github.com/LyraVoid/Mizuki)（Apache-2.0），原始模板来自 [Fuwari](https://github.com/saicaca/fuwari)（MIT）。
