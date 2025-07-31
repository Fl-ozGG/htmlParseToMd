

class ReadSource {

    isWebUrl(input: string) {
        try {
            const url = new URL(input);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    }
}
export default ReadSource