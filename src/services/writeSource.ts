import * as fs from 'fs';
import * as path from 'path';
import os from 'os';


class WriteSource {
    writeFile(fileName: string, content: string) {
        const desktopDir = path.join(os.homedir(), 'Desktop');
        const filePath = path.join(desktopDir, `${fileName}.md`);

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`📄 Archivo guardado en: ${filePath}`);
    }
}
export default WriteSource