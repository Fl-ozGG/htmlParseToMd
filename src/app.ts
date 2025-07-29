import readline from 'readline';
import parseFileByUrl from '.';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let urlOrigin = ""


rl.question('Introduce la url de tu archivo html: ', (url => {
    console.log(`Recibido: ${url}`)
    urlOrigin = url
    rl.question('introduce la ruta donde quieres guardar tu archivo md: ', ((urlDest) => {
        rl.question('introduzca un nombre para el archivo que contendra el resultado...', ((fileName) => {
            parseFileByUrl(urlOrigin, urlDest, fileName)
            rl.close();
        }))
    }))
}))