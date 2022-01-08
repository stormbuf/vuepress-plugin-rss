import type { Page, Plugin,App } from '@vuepress/core'

export interface RssPluginOptions{
    /**
     * website domain,required
     */
    websiteDomain: string

    /**
     * Whether to get the content of a page
     * default: true
     */
    content?: boolean

    /**
     * Which Protocol to Select?
     * default: RSSv2
     * options: RSSv2, JSON Feedv1, and Atomv1
     */
    protocol?: string
}

const rssPluginDefaultOptions: RssPluginOptions = {
    websiteDomain: "",
    content: true,
    protocol: "RSSv2"
}

export class RssPlugin{
    constructor(options: RssPluginOptions){
        this.pages = [];
        this.options = rssPluginDefaultOptions
        for (const key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                const element = options[key];
                this.options[key] = element;
            }
        }
    }
    options: RssPluginOptions;
    
    pages: Page[]; 

}