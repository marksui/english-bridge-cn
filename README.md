# 日常英文单词表

一个面向中文使用者的静态英文词汇学习网站，使用图片、例句和浏览器发音学习美国日常生活英语。

## 功能

- 首页分类卡片：蔬菜、水果、汽车、超市、餐厅、厨房、家具、衣服、身体部位、学校、公寓、工具、药店、银行、交通、天气，以及健康和情绪相关分类
- 分类页、全部单词页、收藏页
- 英文、中文、分类名称搜索
- 分类筛选
- 浏览器 Text-to-Speech 美式英语发音
- localStorage 本地收藏
- 无后端、无数据库、无登录、无测验、无分数系统

## 本地运行

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

线上地址：

```text
https://marksui.github.io/english-bridge-cn/
```

项目使用 Vite，并在 `vite.config.ts` 中配置了：

```ts
base: "/english-bridge-cn/"
```

如果你的 GitHub 仓库名不是 `english-bridge-cn`，请把 `base` 改成你的仓库名，例如：

```ts
base: "/daily-english-cn/"
```

部署到 `gh-pages` 分支：

```bash
npm run build
npm run deploy
```

`deploy` 脚本会使用 `gh-pages -d dist --nojekyll` 发布构建后的 `dist` 目录。

## 编辑词汇数据

词汇数据在：

```text
src/data/vocabulary.ts
```

每个单词最终会生成以下结构：

```ts
{
  id: string;
  categoryId: string;
  categoryChinese: string;
  categoryEnglish: string;
  word: string;
  chinese: string;
  pronunciationHint: string;
  imageUrl: string;
  example: string;
  exampleChinese: string;
}
```

图片使用公开可直接访问的 `imageUrl`，并通过 `ImageWithFallback` 在加载失败时显示默认占位图。
