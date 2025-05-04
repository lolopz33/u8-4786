const express = require('express');
const path = require('path');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = 3000;

// Configura o servidor para arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar a imagem (OCR)
app.post('/extract-text', async (req, res) => {
    try {
        const { image } = req.body;
        const result = await Tesseract.recognize(image);
        res.json({ text: result.data.text });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar imagem.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
