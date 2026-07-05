# 🌸 horoscope's blog

> 追寻你自己的星星！

A personal blog built with [Astro](https://astro.build), based on the [Mizuki](https://github.com/LyraVoid/Mizuki) template.

[![Astro](https://img.shields.io/badge/Astro-7.0.4-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

[**🖥️ Live Site**](https://blog.horoscope.xtkx.site/)

🌏 **README Languages:**
[**English**](./README.md) / [**中文**](./README.zh.md) / [**日本語**](./README.ja.md) / [**繁體中文**](./README.tw.md)

## Features

- Light/dark theme switching & custom theme colors
- Fullscreen wallpaper background with carousel
- Full-text search powered by Pagefind
- Post categories, tags, and pinning
- Diary, friends, projects, timeline, albums and more special pages
- Enhanced Markdown: syntax highlighting, math formulas, callouts, GitHub cards
- PhotoSwipe image gallery
- Twikoo comment system
- RSS feed & SEO optimization

## Quick Start

```bash
git clone https://github.com/horoscope963852/Mizuki_blog.git
cd Mizuki_blog
npm install -g pnpm
pnpm install
pnpm dev
```

Visit `http://localhost:4321` to preview.

## Deployment

```bash
pnpm build
```

The output is in `./dist/`, ready to deploy to Vercel, Netlify, GitHub Pages, or any static hosting platform. Remember to update `siteURL` in `src/config/siteConfig.ts` before deploying.

## License

Based on [Mizuki](https://github.com/LyraVoid/Mizuki) (Apache-2.0), original template by [Fuwari](https://github.com/saicaca/fuwari) (MIT).
