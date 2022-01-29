# vuepress-plugin-rss
 [English](README.md)  [中文](README_zh.md)

RSS, Atom, and JSON feeds generator plugin for VuePress 2.x

base on `@vuepress/plugin-git`

`@vuepress/plugin-git` get the last commit time  of the md from git.

Rss item push time is from `@vuepress/plugin-git`.
## install

```bash
yarn add -D @stormbuf/vuepress-plugin-rss
// or
// npm i -D @stormbuf/vuepress-plugin-rss
```

## usage

```typescript
export default defineUserConfig<DefaultThemeOptions> ( {
  plugins: [
    ['@stormbuf/vuepress-plugin-rss',
      {
        // website domain,required
        // string
        websiteDomain: 'https://stormbuf.top',
        // rss item count
        // default: 20
        // number
        count: 60,
        // whether to get the content of a page
        // default: true
        // boolearn
        content: false,
        // pages that participate in generating RSS. generatePath before ignorePath.
        // support regex
        // arrary<string>
        // default: []
        generatePath: ['.* ( html|htm ) '],
        // pages that do not participate in generating RSS.
        // support regex
        // arrary<string>
        // default: ['/404.html','/404.htm']
        ignorePath: ['/404.html', '/404.htm','/HelloWorld.html']
      }
    ],
  ],
} )
```
