import * as fs from 'fs';
import tags from '../classes/Tags';
import TagUtils from './tagUtils';

let tagUtils = new TagUtils
class ParseUtils {

    parseFileByPath(urlOrigin: string, fileName: string, diccTags: Record<string, tags>, hTagArr: string[]) {
        try {
            const htmlContent = fs.readFileSync(urlOrigin, 'utf-8');
            const step1 = tagUtils.detectHtmlOnString(htmlContent, diccTags);
            const step2 = tagUtils.cleanStrongTags(step1, hTagArr);
            const finalCleaned = step2
                .replace(/<!DOCTYPE html>/gi, '')
                .replace(/<\/?html.*?>/gi, '')
                .replace(/<\/?head.*?>/gi, '')
                .replace(/<meta[^>]*>/gi, '')
                .replace(/<\/?body.*?>/gi, '')
                .replace(/<title>.*?<\/title>/gi, '')
                .trim();

            fs.writeFileSync(`./output/${fileName}.md`, finalCleaned, 'utf-8');
            console.log(`✅ Archivo Markdown creado.`);
        } catch (error) {
            console.error("❌ Error procesando archivos:", error);
        }
    }

    parseFileByUrl() {

    }

}

export default ParseUtils