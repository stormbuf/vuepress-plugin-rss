# vuepress-plugin-rss
 [English](README.md)  [中文](README_zh.md)

面向 VuePress 2.x ，生成 RSS, Atom, 和 JSON feeds 的插件

基于 `@vuepress/plugin-git`

`@vuepress/plugin-git` 通过 git 获取 md 最后的 commit 时间。

rss item 的推送时间来自 `@vuepress/plugin-git`。

## 安装

```bash
yarn add -D @stormbuf/vuepress-plugin-rss
// or
// npm i -D @stormbuf/vuepress-plugin-rss
```

## 用例

```typescript
export default defineUserConfig<DefaultThemeOptions> ( {
  plugins: [
    ['@stormbuf/vuepress-plugin-rss',
      {
        // 网站域名，必填
        // string
        websiteDomain: 'https://stormbuf.top',
        // rss item 数量
        // 默认: 20
        // number
        count: 60,
        // 生成的 rss 是否获取页面内容
        // 默认: true
        // boolearn
        content: false,
        // 生成 RSS 时，是否包括指定页面。generatePath 优先于 ignorePath。
        // 支持正则
        // Arrary<string>
        // default: []
        generatePath: ['.* ( html|htm ) '],
        // 生成 RSS 时，是否不包括指定页面。
        // 支持正则
        // Arrary<string>
        // default: ['/404.html','/404.htm']
        ignorePath: ['/404.html', '/404.htm','/HelloWorld.html']
      }
    ],
  ],
} )
```
