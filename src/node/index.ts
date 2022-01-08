import type { Page, Plugin,App } from '@vuepress/core'
import {RssPluginOptions} from './rssPlugin'



export const rssplugin: Plugin<RssPluginOptions> = (
    options: RssPluginOptions,app
) =>{


    return{
        name: "@stormbuf/vuepress-plugin-rss",

        extendsPage: async (page:Page) => {
            
        },

        onGenerated: async (app: App) => void {

        }
    }
}