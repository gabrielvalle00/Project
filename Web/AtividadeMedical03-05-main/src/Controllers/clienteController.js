
// Imports da classes
const Consulta = require('../models/classes/Consulta');
const Endereco = require('../models/classes/Endereco');
const Especialidade = require('../models/classes/Especialidade');
const Funcionario = require('../models/classes/Funcionario');
const Login = require('../models/classes/Login');
const Paciente = require('../models/classes/Paciente');
const Perfil = require('../models/classes/Perfil');
const Pessoa = require('../models/classes/Pessoa');
const Prontuario = require('../models/classes/Prontuario');
const Telefone = require('../models/classes/Telefone');
const Validacoes = require('../models/classes/Validacoes');


// Import das funções das ClienteModel
const { insert, remove, agendarConsulta, buscarPerfilPorLogin, getPacientesComConsultas } = require('../models/query/ClienteModel');

function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const clienteController = {

    index: async (req, res) => {
        return res.render('pages/index', { usuarioLogado: false });
    },


    // cadastro: async (req, res) => {
    //     return res.render('pages/cadastro', { usuarioLogado: true });
    // },

    // agendar: async (req, res) => {
    //     return res.render('pages/agendarConsulta', { usuarioLogado: true });
    // },

    // adm: async (req, res) => {
    //     return res.render('pages/adm', { usuarioLogado: true });
    // },

    // listar: async (req, res) => {
    //     return res.render('pages/listar', { usuarioLogado: true });
    // },

    // todosOsResultados: async (req, res) => {
    //     return res.render('pages/todosOsResultados', { usuarioLogado: true });
    // },

    // detalhesPaciente: async (req, res) => {
    //     return res.render('pages/detalhesPaciente', { usuarioLogado: true });
    // },

    // Função para remover acentos de caracteres

    login: async (req, res) => {
        try {
            const { login, senha } = req.body;

            // Verifica o tipo de perfil com base no login e senha
            const tipoPerfil = await buscarPerfilPorLogin(login, senha);

            if (!tipoPerfil) {
                return res.render('pages/index', { usuarioLogado: false, error: 'Login ou senha inválidos!' });
            }

            // Normaliza o tipo de perfil para lowercase e remove acentos para evitar problemas de comparação
            const tipoPerfilNormalizado = removerAcentos(tipoPerfil.toLowerCase());

            // Redirecionar com base no tipo de perfil
            switch (tipoPerfilNormalizado) {
                case 'paciente':
                    return res.render('pages/listar', { usuarioLogado: true }); // Exemplo de passagem de usuarioLogado
                case 'medico':
                    return res.render('pages/todosOsResultados', { usuarioLogado: true }); // Exemplo de passagem de usuarioLogado
                case 'funcionario':
                    return res.render('pages/adm', { usuarioLogado: true }); // Exemplo de passagem de usuarioLogado
                default:
                    throw new Error('Tipo de perfil desconhecido!');
            }
        } catch (error) {
            console.log(error);
            return res.render('pages/index', { usuarioLogado: false, error: 'Erro ao fazer login. Tente novamente.' });
        }
    },


    adicionarCliente: async (req, res) => {
        try {

            const { cpf, nome, data_nasc, genero, email, logradouro, bairro, estado, numero, complemento, cep, tel1, tel2, data_admissao, crm, login, senha, status, perfil, desc_especialidade } = req.body;
            console.log(req.body);
            const objPessoa = new Pessoa({ cpf, nome, data_nasc, genero, email });
            if (data_nasc === null || data_nasc === "") {
                return res.json("Data de nascimento inválida!");
            } else {
                if (objPessoa.data_nasc == "Invalid Date" || !(objPessoa.data_nasc) instanceof Date) {
                    console.log("Erro!");
                    return res.json("Data de nascimento inválida!");
                }

            }




            console.log(logradouro, bairro, estado, numero, complemento, cep);


            const objEndereco = new Endereco({ id: null, logradouro: logradouro, bairro: bairro, estado: estado, numero: numero, complemento: complemento, cep: cep });

            console.log('HELP =>', objEndereco);

            let objTelefones = [];
            objTelefones.push(new Telefone({ id: null, numero: tel1 }));

            if (tel2 !== null || tel2 !== '') {
                objTelefones.push(new Telefone({ id: null, numero: tel2 }));
            }


            const objLogin = new Login({ id: null, login: login, senha: senha, status: status });

            const objPerfil = new Perfil({ id: null, tipo: perfil });

            let objEspecialidade = null;
            // console.log(funcionario);
            var objFuncionario = new Funcionario({ id: null, data_admissao: data_admissao, crm: crm });
            console.log(objFuncionario.data_admissao);
            if (objFuncionario.data_admissao === null || objFuncionario.data_admissao === "") {
                objFuncionario = null;
            } else {
                if (objFuncionario.data_admissao == "Invalid Date" || isNaN(Date.parse(objFuncionario.data_admissao))) {
                    console.log("Erro!");
                    return res.json("Data de admissão inválida!");
                }

                if (objFuncionario.crm !== null || objFuncionario.crm !== "") {
                    objEspecialidade = new Especialidade({ id: null, desc_especialidade: desc_especialidade });
                }

            }

            const result = await insert(objPessoa, objEndereco, objTelefones, objFuncionario, objLogin, objPerfil, objEspecialidade);

            if (result) {
                return res.render('pages/cadastro', { usuarioLogado: true, success: false, error: 'Erro ao cadastrar o cliente. Tente novamente.' });
            }

        } catch (error) {
            console.log(error);
            return res.render('pages/cadastro', { usuarioLogado: true, success: false, error: 'Ocorreu um erro ao cadastrar o cliente. Tente novamente.' });
        }

    },

    atualizarCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const { nome, data_nasc, genero, email, endereco, telefone, funcionario } = req.body;
            const objPessoa = new Pessoa({ cpf, nome, data_nasc, genero, email });
            const objEndereco = new Endereco(endereco);
            const objTelefones = telefone.map(tel => new Telefone(tel));
            const objFuncionario = new Funcionario(funcionario);
            const result = await update(objPessoa, objEndereco, objTelefones, objFuncionario);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const result = await remove(cpf);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    exibirTodos: async (req, res) => {
        try {
            const result = await findAll();
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    exibirCliente: async (req, res) => {
        try {
            const cpf = req.params.cpf;
            const result = await buscarCpf(cpf);
            return res.json(result);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    agendarConsulta: async (req, res) => {
        try {
            const { data, hora, status, paciente_id, paciente_pessoa_id, funcionario_id, funcionario_pessoa_id } = req.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (!data || !hora || !status || !paciente_id || !paciente_pessoa_id || !funcionario_id || !funcionario_pessoa_id) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const consulta = new Consulta({
                data,
                hora,
                status,
                paciente_id,
                paciente_pessoa_id,
                funcionario_id,
                funcionario_pessoa_id
            });

            // Chama a função de agendamento
            const response = await agendarConsulta(consulta);

            // Envia a resposta apropriada
            return res.status(response.status).json(response);
        } catch (error) {
            console.log("Erro ao agendar consulta:", error);
            return res.status(500).json({ message: "Erro ao agendar consulta." });
        }
    },

    listarPacientesComConsultas: async (req, res) => {
        try {
            const consultas = await getPacientesComConsultas();
            // Certifique-se de que o nome da variável "consultas" está correto aqui.
            res.render('pages/listar', { consultas });
        } catch (error) {
            console.error("Erro ao listar pacientes com consultas:", error.message);
            res.status(500).send("Erro ao listar pacientes com consultas.");
        }
    },
};


module.exports = clienteController;
