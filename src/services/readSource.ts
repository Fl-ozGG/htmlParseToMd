import axios from 'axios';
import * as fs from 'fs';

class ReadSource {

    isWebUrl(input: string) {
        try {
            const url = new URL(input);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    }
    readPath(source: string) {
        return fs.readFileSync(source, 'utf-8');
    }

    async readUrl(url: string): Promise<string> {
        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
                }
            })
            return response.data
        } catch (error: any) {
            console.error("error al obtener la paginaa: ", error.message);
            throw error
        }

    }

}
export default ReadSource