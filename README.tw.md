# 🌸 horoscope's blog

> 追尋你自己的星星！

基於 [Mizuki](https://github.com/LyraVoid/Mizuki) 模板，使用 [Astro](https://astro.build) 構建的個人部落格。

[![Astro](https://img.shields.io/badge/Astro-7.0.4-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

[**🖥️ 線上訪問**](https://blog.horoscope.xtkx.site/)

🌏 **README 語言：**
[**English**](./README.md) / [**中文**](./README.zh.md) / [**日本語**](./README.ja.md) / [**繁體中文**](./README.tw.md)

## 功能

- 明暗主題切換 & 自訂主題色
- 全螢幕桌布背景，支援輪播
- 基於 Pagefind 的全文搜尋
- 文章分類、標籤、置頂
- 日記、友鍊、專案、時間軸、相簿等特色頁面
- 增強 Markdown：語法高亮、數學公式、提示框、GitHub 卡片
- PhotoSwipe 圖片畫廊
- Twikoo 評論系統
- RSS 訂閱 & SEO 優化

## 快速開始

```bash
git clone https://github.com/horoscope963852/Mizuki_blog.git
cd Mizuki_blog
npm install -g pnpm
pnpm install
pnpm dev
```

訪問 `http://localhost:4321` 查看效果。

## 部署

```bash
pnpm build
```

建構產物在 `./dist/`，可部署到 Vercel、Netlify、GitHub Pages 等靜態託管平台。部署前請在 `src/config/siteConfig.ts` 中更新 `siteURL`。

## 授權

基於 [Mizuki](https://github.com/LyraVoid/Mizuki)（Apache-2.0），原始模板來自 [Fuwari](https://github.com/saicaca/fuwari)（MIT）。
