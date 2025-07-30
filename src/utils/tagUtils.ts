import * as fs from 'fs';
import tags from '../classes/Tags';
import * as cheerio from 'cheerio';

class TagUtils {


    detectHtmlOnString(html: string, diccTags: Record<string, tags>): string {
        for (const key in diccTags) {
            const { html: htmlTag, md } = diccTags[key];
            html = html.replace(new RegExp(htmlTag, 'gi'), md);
        }
        return html;
    }
    cleanStrongTags(html: string, hTagArr: string[]): string {
        hTagArr.forEach(tag => {
            html = this.replaceHTag(tag, html);
        });
        return html;
    }
    replaceHTag(tag: string, htmlText: string): string {
        const $ = cheerio.load(htmlText);

        switch (tag) {
            case "a":
                $('a').each((_, el) => {
                    const text = $(el).text();
                    const href = $(el).attr('href') || '';
                    $(el).replaceWith(`[${text}](${href})`);
                });
                break;

            case "img":
                $('img').each((_, el) => {
                    const alt = $(el).attr('alt') || '';
                    const src = $(el).attr('src') || '';
                    $(el).replaceWith(`![${alt}](${src})`);
                });
                break;

            case "video":
                $('video').each((_, el) => {
                    const src = $(el).find('source').attr('src') || $(el).attr('src') || '';
                    $(el).replaceWith(`[Video](${src})`);
                });
                break;

            case "audio":
                $('audio').each((_, el) => {
                    const src = $(el).find('source').attr('src') || $(el).attr('src') || '';
                    $(el).replaceWith(`[Audio](${src})`);
                });
                break;

            case "input":
                $('input').each((_, el) => {
                    const type = $(el).attr('type') || 'text';
                    const name = $(el).attr('name') || '';
                    const value = $(el).attr('value') || '';
                    $(el).replaceWith(`\`${type}: ${name} = ${value}\``);
                });
                break;

            case "label":
                $('label').each((_, el) => {
                    const text = $(el).text();
                    $(el).replaceWith(`**${text}**`);
                });
                break;
        }

        return $.html();
    }



}
export default TagUtils