import * as fs from 'fs';



class WriteSource {

    writeFile(fileName: string, finalCleaned: string) {
        fs.writeFileSync(`./${fileName}.md`, finalCleaned, 'utf-8');
    }
}
export default WriteSource