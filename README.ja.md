# 🌸 horoscope's blog

> 追寻你自己的星星！

[Mizuki](https://github.com/LyraVoid/Mizuki) テンプレートをベースに、[Astro](https://astro.build) で構築された個人ブログ。

[![Astro](https://img.shields.io/badge/Astro-7.0.4-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

[**🖥️ サイトを見る**](https://blog.horoscope.xtkx.site/)

🌏 **README の言語：**
[**English**](./README.md) / [**中文**](./README.zh.md) / [**日本語**](./README.ja.md) / [**繁體中文**](./README.tw.md)

## 機能

- ライト/ダークテーマ切り替え & カスタムテーマカラー
- カルーセル対応フルスクリーン壁紙
- Pagefind ベースの全文検索
- 記事のカテゴリ、タグ、ピン留め
- 日記、フレンドリンク、プロジェクト、タイムライン、アルバムなどのスペシャルページ
- 拡張 Markdown：シンタックスハイライト、数式、コールアウト、GitHub カード
- PhotoSwipe ギャラリー
- Twikoo コメントシステム
- フィード & SEO 最適化

## クイックスタート

```bash
git clone https://github.com/horoscope963852/Mizuki_blog.git
cd Mizuki_blog
npm install -g pnpm
pnpm install
pnpm dev
```

`http://localhost:4321` で確認できます。

## デプロイ

```bash
pnpm build
```

ビルド成果物は `./dist/` に出力されます。Vercel、Netlify、GitHub Pages などの静的ホスティングにデプロイできます。デプロイ前に `src/config/siteConfig.ts` の `siteURL` を更新してください。

## ライセンス

[Mizuki](https://github.com/LyraVoid/Mizuki)（Apache-2.0）ベース、オリジナルテンプレートは [Fuwari](https://github.com/saicaca/fuwari)（MIT）。
