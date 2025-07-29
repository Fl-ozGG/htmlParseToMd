# 🧾 HTML to Markdown Converter

Este proyecto convierte código HTML en texto plano con formato Markdown, utilizando TypeScript y Cheerio. 
Está diseñado para transformar etiquetas semánticas y estructurales de documentos HTML en su equivalente en sintaxis Markdown, preservando al máximo el contenido legible y su jerarquía.

## ✨ Características

- ✅ Conversión automática de etiquetas `<h1>` a `<h6>` a títulos Markdown (`#`, `##`, etc.)
- ✅ Reconocimiento de negritas (`<b>`, `<strong>` → `**texto**`) y cursivas (`<i>`, `<em>` → `*texto*`)
- ✅ Soporte para enlaces (`<a href="">` → `[texto](url)`)
- ✅ Soporte para imágenes (`<img>` → `![alt](src)`)
- ✅ Conversión de listas ordenadas y no ordenadas (`<ul>`, `<ol>`, `<li>`)
- ✅ Conversión de formularios simples (inputs, checkboxes, submits en formato Markdown legible)
- ✅ Manejo de etiquetas multimedia (videos, audios, fuentes)
- ✅ Limpieza de metadatos irrelevantes (doctype, `<meta>`, etc.)

## 🛠️ Tecnologías utilizadas

- **TypeScript** – Lenguaje principal del proyecto
- **Cheerio** – Librería para manipulación del DOM tipo jQuery en Node.js
- **Node.js** – Entorno de ejecución

## 📦 Instalación

git clone https://github.com/tu_usuario/html-to-md-converter.git
cd html-to-md-converter
npm install
