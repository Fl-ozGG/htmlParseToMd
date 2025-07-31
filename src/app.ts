import TagsDic from './constants/tagsDic';
import ReadSource from './services/readSource';
import HtmlConverter from './services/htmlConverter';

const htmlConverter = new HtmlConverter
const tags: TagsDic = new TagsDic
const readSource: ReadSource = new ReadSource



function runApp() {
    let input: Input = new Input(process.argv[2], process.argv[3])
    if (readSource.isWebUrl(input.source)) {
        htmlConverter.parseFileByUrl("", "")
    } else {
        htmlConverter.parseFileBySource(input.source, input.fileName, tags.diccTags, tags.hTagArr)
    }
}
runApp()