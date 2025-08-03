import TagsDic from './constants/tagsDic';
import ReadSource from './services/readSource';
import HtmlConverter from './services/htmlConverter';
import Input from './classes/input';

const htmlConverter = new HtmlConverter
const tags: TagsDic = new TagsDic
const readSource: ReadSource = new ReadSource



function convertHtmlToMarkdownFromSourceCLI() {
    let input: Input = new Input(process.argv[2], process.argv[3])
    readSource.isWebUrl(input.source) ? htmlConverter.parseFileByUrl(input.source, input.fileName) : htmlConverter.parseFileByPath(input.source, input.fileName)
}



export default convertHtmlToMarkdownFromSourceCLI
