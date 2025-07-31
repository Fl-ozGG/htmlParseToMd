# 📜 HTML to Markdown Converter

Este proyecto convierte código HTML a texto plano en formato **Markdown**, utilizando TypeScript, Node.js y Cheerio.
Está diseñado para transformar etiquetas semánticas y estructurales de documentos HTML en su equivalente Markdown, preservando su contenido de forma legible y organizada.

---

## ✨ Características

* ✅ Conversión de títulos `<h1>` a `<h6>` → `#`, `##`, etc.
* ✅ Conversión de texto en **negrita** (`<strong>`, `<b>`) y *cursiva* (`<em>`, `<i>`)
* ✅ Soporte para enlaces: `<a href="...">texto</a>` → `[texto](url)`
* ✅ Conversión de imágenes: `<img>` → `![alt](src)`
* ✅ Manejo de listas: `<ul>`, `<ol>`, `<li>`
* ✅ Conversión de inputs y formularios a texto Markdown legible
* ✅ Soporte para elementos multimedia: `<video>`, `<audio>`, `<source>`
* ✅ Limpieza de elementos irrelevantes (`<!DOCTYPE html>`, `<meta>`, `<head>`, etc.)
* ✅ El archivo convertido se guarda automáticamente en el **escritorio del usuario**

---

## 🛠️ Tecnologías utilizadas

* **TypeScript** – Tipado fuerte y desarrollo moderno
* **Cheerio** – Manipulación del DOM estilo jQuery en Node.js
* **Node.js** – Entorno de ejecución backend

---

## 📦 Instalación

```bash
git clone https://github.com/tu_usuario/html-to-md-converter.git
cd html-to-md-converter
npm install
```

---

## ⚙️ Compilación

Este proyecto usa TypeScript. Para compilarlo a JavaScript:

```bash
npm run build
```

Esto generará los archivos compilados en la carpeta `dist/`.

---

## 🚀 Ejecución

Una vez compilado, ejecuta el conversor desde la raíz del proyecto con:

```bash
npm start <SOURCE> <nombreSalida>
```

### 📅 Parámetros

* `<SOURCE>`:
  Puede ser un archivo HTML local (`./ejemplo.html`) **o** una URL (`https://ejemplo.com`).

* `<nombreSalida>`:
  Nombre del archivo Markdown que se generará **sin extensión**.

---

### 📤 ¿Dónde se guarda el archivo convertido?

El archivo `.md` resultante se guarda automáticamente en el **escritorio** del usuario que ejecuta el programa.

📌 Ejemplo:

```bash
npm start ./pagina.html resultado
```

Generará el archivo:

```
~/Desktop/resultado.md
```

---

## 🧪 Ejemplos

```bash
npm start ./test/input.html salida
npm start https://example.com ejemplo
```

---

## 🗼 Nota

Este proyecto es una herramienta básica para convertir HTML a Markdown. Si tu HTML contiene scripts complejos o contenido renderizado dinámicamente, es posible que no se convierta correctamente.

---

## 📄 Licencia

MIT – Puedes usarlo, modificarlo y distribuirlo libremente.
