// npm install ejs express express-ejs-layouts

// Import do framework Express
const express = require("express");
const router = require('./src/routes/index');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

// BodyParser
const bodyParser = require('body-parser');

// Configurar o BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middleware para definir usuarioLogado em todas as renderizações
app.use((req, res, next) => {
    // Aqui você deve definir req.usuarioLogado conforme a lógica do seu projeto
    // Exemplo: verificar se o usuário está autenticado através de sessão, token JWT, etc.
    // Este é um exemplo simples para demonstração
    req.usuarioLogado = true; // Defina conforme a lógica de autenticação do seu projeto
    res.locals.usuarioLogado = req.usuarioLogado; // Torna usuarioLogado disponível para todos os templates
    next();
});

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(`${__dirname}/public`));

// Roteamento através do arquivo de rotas
app.use('/', router);

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor respondendo na porta ${port}`);
});
