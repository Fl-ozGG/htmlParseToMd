import * as fs from 'fs';
import * as cheerio from 'cheerio';
import TagUtils from './utils/convertTagsUtils';


const str = fs.readFileSync('../src/index.html', 'utf-8')




type tags = {
    html: string;
    md: string;
}
const utils: TagUtils = new TagUtils
let hTagArr: string[] = ["a", "img", "video", "audio", "input", "label"]
const diccTags: Record<string, tags> = {
    // Encabezados
    doctype: { html: "<!DOCTYPE html>", md: "" },
    title: { html: "<title>", md: "" },
    titlec: { html: "</title>", md: "" },
    html: { html: "<html>", md: "" },
    htmlC: { html: "</html>", md: "" },
    head: { html: "<head>", md: "" },
    headC: { html: "</head>", md: "" },
    body: { html: "<body>", md: "" },
    bodyC: { html: "</body>", md: "" },
    h1: { html: "<h1>", md: "# " },
    h1c: { html: "</h1>", md: "" },
    h2: { html: "<h2>", md: "## " },
    h2c: { html: "</h2>", md: "" },
    h3: { html: "<h3>", md: "### " },
    h3c: { html: "</h3>", md: "" },
    h4: { html: "<h4>", md: "#### " },
    h4c: { html: "</h4>", md: "" },
    h5: { html: "<h5>", md: "##### " },
    h5c: { html: "</h5>", md: "" },
    h6: { html: "<h6>", md: "###### " },
    h6c: { html: "</h6>", md: "" },

    // Párrafos y saltos de línea
    p: { html: "<p>", md: "" },
    pC: { html: "</p>", md: "\n" },
    br: { html: "<br>", md: "  \n" },

    // Texto en negrita o énfasis
    strong: { html: "<strong>", md: "**" },
    strongC: { html: "</strong>", md: "**" },
    b: { html: "<b>", md: "**" },
    bC: { html: "</b>", md: "**" },
    em: { html: "<em>", md: "*" },
    emC: { html: "</em>", md: "*" },
    i: { html: "<i>", md: "*" },
    iC: { html: "</i>", md: "*" },

    // Listas no ordenadas
    ul: { html: "<ul>", md: "" },
    ulC: { html: "</ul>", md: "" },
    li: { html: "<li>", md: "- " },
    liC: { html: "</li>", md: "\n" },

    // Listas ordenadas
    ol: { html: "<ol>", md: "" },
    olC: { html: "</ol>", md: "" },

    // Citas
    blockquote: { html: "<blockquote>", md: "> " },
    blockquoteC: { html: "</blockquote>", md: "" },

    // Código
    code: { html: "<code>", md: "`" },
    codeC: { html: "</code>", md: "`" },
    pre: { html: "<pre>", md: "```\n" },
    preC: { html: "</pre>", md: "\n```" },

    // Enlaces


    // Imágenes (Markdown: ![alt](url))
    img: { html: "<img>", md: "![alt](url)" }, // No se puede hacer conversión sin atributos

    // Subrayado y tachado (no estándar en Markdown)
    u: { html: "<u>", md: "" },
    uC: { html: "</u>", md: "" },
    s: { html: "<s>", md: "~~" },
    sC: { html: "</s>", md: "~~" },

    // Tablas (más complejas, solo etiquetas base)
    table: { html: "<table>", md: "" },
    tableC: { html: "</table>", md: "" },
    tr: { html: "<tr>", md: "" },
    trC: { html: "</tr>", md: "\n" },
    th: { html: "<th>", md: "" },
    thC: { html: "</th>", md: " |" },
    td: { html: "<td>", md: "" },
    tdC: { html: "</td>", md: " |" },

    //etiquetas genericas 
    article: { html: "<article>", md: "" },
    header: { html: "<header>", md: "" },
    headerC: { html: "</header>", md: "" },
    nav: { html: "<nav>", md: "" },
    navC: { html: "</nav>", md: "" },
    main: { html: "<main>", md: "" },
    mainC: { html: "</main>", md: "" },
    section: { html: "<section>", md: "" },
    sectionC: { html: "</section>", md: "" },
    mark: { html: "<mark>", md: "==" },
    markC: { html: "</mark>", md: "==" },
    footer: { html: "<footer>", md: "" },
    footerC: { html: "</footer>", md: "" },
    form: { html: "<form>", md: "" },
    formC: { html: "</form>", md: "" },
    label: { html: "<label>", md: "**" },
    labelC: { html: "</label>", md: "**" },
    input: { html: "<input>", md: "" },
    video: { html: "<video>", md: "" },
    videoC: { html: "</video>", md: "" },
    audio: { html: "<audio>", md: "" },
    audioC: { html: "</audio>", md: "" },
    source: { html: "<source>", md: "" }
};

function detectHtmlOnString(html: string): string {
    for (const key in diccTags) {
        const { html: htmlTag, md } = diccTags[key];
        html = html.replace(new RegExp(htmlTag, 'gi'), md);
    }
    return html;
}

function cleanStrongTags(html: string): string {
    hTagArr.forEach(tag => {
        html = utils.replaceHTag(tag, html);
    });
    return html;
}

function run() {
    const step1 = detectHtmlOnString(str);
    const step2 = cleanStrongTags(step1);
    fs.writeFileSync('output.md', step2);
    const finalCleaned = step2
        .replace(/<!DOCTYPE html>/gi, '')
        .replace(/<\/?html.*?>/gi, '')
        .replace(/<\/?head.*?>/gi, '')
        .replace(/<meta[^>]*>/gi, '')
        .replace(/<\/?body.*?>/gi, '')
        .replace(/<title>.*?<\/title>/gi, '')
        .trim();

    fs.writeFileSync('output.md', finalCleaned);
}

run();