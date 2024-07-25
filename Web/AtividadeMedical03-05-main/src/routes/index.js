const express = require("express");
const router = express.Router();

const Controller = require("../Controllers/clienteController");


// Rotas GET
router.get('/', Controller.index);
router.get('/adm', Controller.login); // Rota de exemplo que usa login
router.get('/listar', Controller.login); // Rota de exemplo que usa login
router.get('/cadastro', Controller.login); // Rota de exemplo que usa login
router.get('/clientes', Controller.exibirTodos);
router.get('/cliente/:cpf', Controller.exibirCliente);
router.get('/agendarConsulta', Controller.login); // Rota de exemplo que usa login

// Rotas POST
router.post('/cadastro', Controller.adicionarCliente);
router.post('/agendarConsulta', Controller.agendarConsulta);
router.post('/login', Controller.login); // Rota para o processo de login

// Rotas PUT e DELETE
router.put('/cliente/:cpf', Controller.atualizarCliente);
router.delete('/cliente/:cpf', Controller.deletarCliente);

// router.get('/todosOsResultados', Controller.todosOsResultados);
// router.get('/detalhesPaciente', Controller.detalhesPaciente);
// router.get("/todosOsResultados'", (req, res) => {
//     res.render('pages/todosOsResultados', { usuarioLogado: true });
// });

// router.get('/listar', Controller.listarPacientesComConsultas); DESCOMENTAR QUANDO FUNCIONAR


router.use(function(req, res){
    res.status(404).render(`pages/pag_erro`, { message: '404 - Página não encontrada' });
});

module.exports = router;