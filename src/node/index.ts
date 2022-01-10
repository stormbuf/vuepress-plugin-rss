import type { Page, Plugin,App } from '@vuepress/core'
import {RssPluginOptions,RssPlugin} from './rssPlugin'
import type { GitPluginPageData } from './types'



const rssplugin: Plugin<RssPluginOptions> = (
    options: RssPluginOptions,app
) =>{

    const rssplugin: RssPlugin = new RssPlugin(options);

    return{
        name: "@stormbuf/vuepress-plugin-rss",

        extendsPage: async (page:Page<GitPluginPageData>) => {
            rssplugin.pages.push(page)
        },

        onGenerated: async (app: App) => {
            rssplugin.options.dest = app.options.dest
            rssplugin.generate()
        }
    }
}

export default rssplugin