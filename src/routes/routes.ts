import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import HtmlConverter from '../services/htmlConverter';
import ReadSource from '../services/readSource';
import * as path from 'path';
import os from 'os';


const app = express();
const port = 3000;

app.use(bodyParser.json());
const read = new ReadSource
const htmlConverter = new HtmlConverter();

app.post('/convert-html-url', async (req: Request, res: Response) => {
    const source: string = req.body.html;

    if (!source || typeof source !== 'string') {
        return res.status(400).json({ error: 'El campo "html" es requerido y debe ser una cadena de texto.' });
    }

    try {
        const html = await read.readUrl(source);
        const markdown = htmlConverter.convertToMd(html);
        res.json({ markdown });
    } catch (error) {
        console.error("❌ Error en la conversión:", error);
        res.status(500).json({ error: 'Error al convertir HTML a Markdown.' });
    }
});

app.post('/convert-html-local', (req: Request, res: Response) => {
    const source: string = req.body.html;
    const desktopDir = path.join(os.homedir(), 'Desktop');
    if (!source || typeof source !== 'string') {
        return res.status(400).json({ error: 'El campo "html" es requerido y debe ser una cadena de texto.' });
    }

    try {
        htmlConverter.parseFileByPath(source);
        res.status(200).json({ message: `Archivo generado en la ruta especificada: ${desktopDir} ` })
    } catch (error) {
        console.error("❌ Error en la conversión:", error);
        res.status(500).json({ error: 'Error al convertir HTML a Markdown.' });
    }
});


app.listen(port, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
