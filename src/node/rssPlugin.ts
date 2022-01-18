import type { Page } from '@vuepress/core'
import { Feed } from 'feed';
import * as fs from 'fs/promises'
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

    /**
     * rss.xml output path
     * default: ''
     */
    dest: string

    /**
     * pages that do not participate in generating RSS.
     * default: ['/404.html','/404.htm']
     */
    ignorePath: string[]
}

const rssPluginDefaultOptions: RssPluginOptions = {
    websiteDomain: "",
    content: true,
    protocol: "RSSv2",
    count: 20,
    dest: '',
    ignorePath: ['/404.html', '/404.htm']
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

    public filter(path: string): boolean {
        for (const item in this.options.ignorePath) {
            if (item == path) {
                return true
            }
        }
        return false
    }

    public generate() {
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
            id: this.options.websiteDomain,
            link: this.options.websiteDomain,
            language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
            copyright: "",
            updated: new Date(), // optional, default = today
            generator: "https://github.com/stormbuf/vuepress-plugin-rss" // optional, default = 'Feed for Node.js'
        })

        pages.forEach(page => {
            feed.addItem({
                title: page.data.title,
                id: this.options.websiteDomain + page.data.path,
                link: this.options.websiteDomain + page.data.path,
                content: this.options.content ? page.contentRendered : undefined,
                date: new Date(page.data.git.updatedTime ? page.data.git.updatedTime : 0),
                description: ''
            })
        })

        const rss = feed.rss2();

        fs.writeFile(this.options.dest + '/rss.xml', rss).catch((err) => console.error(err))
    }

}