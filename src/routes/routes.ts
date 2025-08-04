import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import HtmlConverter from '../services/htmlConverter';
import ReadSource from '../services/readSource';
import axios from 'axios';


const app = express();
const port = 4000;

app.use(bodyParser.json());
const read = new ReadSource
const htmlConverter = new HtmlConverter();


app.post('/convert-html-url', async (req: Request, res: Response) => {
    const source: string = req.body.html;

    if (!source || typeof source !== 'string') {
        return res.status(400).json({ error: 'El campo "html" es requerido y debe ser una cadena de texto.' });
    }

    try {
        // 1. Scrapear HTML desde la URL
        const html = await read.readUrl(source);

        // 2. Convertir HTML a Markdown
        console.log('Convirtiendo a Markdown...');
        const markdown = htmlConverter.convertToMd(html);
        console.log('Convertido a Markdown...');
        console.log('Enviado a API Python...');
        const response = await axios.post(
            'http://localhost:8000/process_and_vectorize_text',
            { text: markdown });
        // 4. Devolver resultado combinado (markdown + vector)
        res.json({
            vector: response.data.vector
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error en la API de Python:', error.response?.data || error.message);
        } else {
            console.error(error);
        }
        res.status(500).json({ error: 'Error al convertir o procesar el texto.' });
    }

});



app.get('/ping-python', async (req: Request, res: Response) => {
    console.log("Recibido ping-python");
    try {
        const response = await axios.get('http://localhost:8000/ping', { timeout: 5000 });
        res.json({
            status: 'ok',
            pythonResponse: response.data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No se pudo conectar con la API de Python',
            detail: (error as any).message
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
