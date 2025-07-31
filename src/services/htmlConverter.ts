import TurndownService from 'turndown';
import Write from './writeSource';
import ReadSource from './readSource';

const writeService = new Write();
const readService = new ReadSource();

class HtmlConverter {
    private turndownService: TurndownService;

    constructor() {
        this.turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            emDelimiter: '*',
            bulletListMarker: '-',
        });

        this.addCustomRules();
    }

    private addCustomRules() {
        // Video
        this.turndownService.addRule('video', {
            filter: ['video'],
            replacement: (content, node) => {
                const src = (node as HTMLVideoElement).getAttribute('src') ||
                    (node.querySelector('source')?.getAttribute('src')) || '';
                return src ? `[Video](${src})` : '';
            }
        });

        // Audio
        this.turndownService.addRule('audio', {
            filter: ['audio'],
            replacement: (content, node) => {
                const src = (node as HTMLAudioElement).getAttribute('src') ||
                    (node.querySelector('source')?.getAttribute('src')) || '';
                return src ? `[Audio](${src})` : '';
            }
        });

        // Input
        this.turndownService.addRule('input', {
            filter: ['input'],
            replacement: (_content, node) => {
                const input = node as HTMLInputElement;
                const type = input.getAttribute('type') || 'text';
                const name = input.getAttribute('name') || '';
                const value = input.getAttribute('value') || '';
                return `\`${type}: ${name} = ${value}\``;
            }
        });

        // Label
        this.turndownService.addRule('label', {
            filter: ['label'],
            replacement: (content) => `**${content}**`
        });
    }

    parseFileByPath(urlOrigin: string, fileName: string) {
        try {
            const htmlContent = readService.readPath(urlOrigin);
            const markdown = this.convertToMd(htmlContent);
            writeService.writeFile(fileName, markdown);
            console.log(`✅ Markdown generado desde archivo.`);
        } catch (error) {
            console.error("❌ Error procesando archivo:", error);
        }
    }

    async parseFileByUrl(url: string, fileName: string) {
        try {
            const htmlContent = await readService.readUrl(url);
            const markdown = this.convertToMd(htmlContent);
            writeService.writeFile(fileName, markdown);
            console.log(`✅ Markdown generado desde URL.`);
        } catch (error) {
            console.error("❌ Error procesando URL:", error);
        }
    }

    convertToMd(htmlContent: string): string {
        return this.turndownService.turndown(htmlContent);
    }
}

export default HtmlConverter;
