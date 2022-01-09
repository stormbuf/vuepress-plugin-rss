import type { Page, Plugin, App } from '@vuepress/core'
import { Feed } from 'feed';
import { GitPluginPageData } from './types';

export interface RssPluginOptions {
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

    /**
     * rss item count 
     * default: 20
     */
    count?: number
}

const rssPluginDefaultOptions: RssPluginOptions = {
    websiteDomain: "",
    content: true,
    protocol: "RSSv2",
    count: 20
}

export class RssPlugin {
    constructor(options: RssPluginOptions) {
        this.options = rssPluginDefaultOptions
        for (const key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                const element = options[key];
                this.options[key] = element;
            }
        }
    }
    options: RssPluginOptions;

    pages: Page<GitPluginPageData>[] = [];

    generate() {
        const pages = this.pages.sort(function (a, b) {

            if (a.data.git || b.data.git) {
                return -1;
            }
            var aValue = a.data.git["updatedTime"] ? a.data.git["updatedTime"] : 0;
            var bValue = b.data.git["updatedTime"] ? b.data.git["updatedTime"] : 0;

            return aValue - bValue;
        }).slice(0, this.options.count);

        if (!pages || pages.length === 0) {
            return
        }


        // todo 待定添加属性 
        const feed = new Feed({
            title: pages[0].title,
            id: "http://example.com/",
            link: "http://example.com/",
            language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
            image: "http://example.com/image.png",
            favicon: "http://example.com/favicon.ico",
            copyright: "All rights reserved 2013, John Doe",
            updated: new Date(2013, 6, 14), // optional, default = today
            generator: "awesome", // optional, default = 'Feed for Node.js'
            feedLinks: {
                json: "https://example.com/json",
                atom: "https://example.com/atom"
            },
            author: {
                name: "John Doe",
                email: "johndoe@example.com",
                link: "https://example.com/johndoe"
            }
        })

        pages.forEach(page => {
            feed.addItem({
                title: page.title,
                id: page.url,
                link: page.url,
                content: page.content,
                date: new Date(page.data.git.updatedTime?page.data.git.updatedTime:0),
            })
        })
    }

}