import Source from "../classes/Source";

class ValidateSourceUtils {

    isWebUrl(input: string) {
        try {
            const url = new URL(input);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    }

    updateSourceArr(source: Source[], str: string): Source[] {
        source.forEach((e) => {
            if (this.isWebUrl(str)) {
                e.str = str
                e.flag = true
            }
        })
        return source
    }

}
export default ValidateSourceUtils