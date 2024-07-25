const conectarBancoDeDados = require('../../config/db');

async function insert(cliente, endereco, telefone, funcionario, login, perfil, especialidade) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT COUNT(*) AS count FROM tbl_pessoa WHERE cpf = ?', [cliente.cpf]);
        if (rows[0].count > 0) {
            throw new Error('Já existe um CPF registrado!');
        }

        const resEnd = await connection.query('INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES (?,?,?,?,?,?)', [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numero, endereco.complemento, endereco.cep]);
        // console.log(resEnd);

        const enderecoId = resEnd[0].insertId;

        const resPessoa = await connection.query('INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email, endereco_id) VALUES (?, ?, ?, ?, ?, ?)', [cliente.cpf, cliente.nome, cliente.data_nasc, cliente.genero, cliente.email, enderecoId]);
        // console.log('RESULTADO INSERT CLIENTE =>', resPessoa);
        pessoaId = resPessoa[0].insertId;



        const idsTel = [];

        for (const tel of telefone) {
            const resTel = await connection.query('INSERT INTO tbl_telefone (numero) VALUES (?)', [tel.numero]);
            idsTel.push(resTel[0].insertId);
        }

        for (const idTel of idsTel) {
            await connection.query('INSERT INTO tbl_pessoa_has_tbl_telefone (pessoa_id, telefone_id, pessoa_tbl_endereco_id) VALUES (?,?,?)',
                [pessoaId, idTel, enderecoId]);
            // console.log(`ID DE TELEFONES =>`, idTel, `ID DE ENDEREÇO =>`, enderecoId, `ID DE PESSOA =>`, pessoaId);
        }

        // Adicionar automaticamente na tabela `tbl_paciente`
        await connection.query('INSERT INTO tbl_paciente (pessoa_id) VALUES (?)', [pessoaId]);
        // console.log('RESULTADO INSERT PACIENTE =>', resPaciente);
        
        let funcionarioId = null;
        if (funcionario !== null) {
            const resFuncionario = await connection.query('INSERT INTO tbl_funcionario (data_admissao, crm, pessoa_id, pessoa_endereco_id) VALUES (?, ?, ?, ?)', [funcionario.data_admissao, funcionario.crm, pessoaId, enderecoId])
            funcionarioId = resFuncionario[0].insertId;
        } 

        // console.log(login);
        const resLogin = await connection.query('INSERT INTO tbl_login (login, senha, status, pessoa_id, pessoa_endereco_id) VALUES ( ?, ?, ?, ?, ?)', [login.login, login.senha, login.status, pessoaId, enderecoId])
        const loginId = resLogin[0].insertId;
        console.log(resLogin);
        // console.log(perfil);
        await connection.query('INSERT INTO tbl_perfis (tipo, login_id, login_pessoa_id, login_pessoa_endereco_id) VALUES (?, ?, ?, ?)', [perfil.tipo, loginId, pessoaId, enderecoId])

        if (especialidade !== null){
            const resEspecialidade = await connection.query('INSERT INTO tbl_especialidade (desc_especialidade) VALUES (?)', [especialidade.desc_especialidade]);
            const especialidadeId = resEspecialidade[0].insertId;

            await connection.query('INSERT INTO tbl_funcionario_has_tbl_especialidade (funcionario_id, funcionario_pessoa_id, funcionario_pessoa_endereco_id, especialidade_id) VALUES (?, ?, ?, ?)',  [funcionarioId, pessoaId, enderecoId, especialidadeId])
        }

        await connection.commit();
        console.log('Transação concluída com sucesso.');
        return 'Transação concluída com sucesso.';
    } catch (error) {
        await connection.rollback();
        console.log(error.message);
        return error.message;
    } finally {
        connection.end();
    }
}



async function update(cliente, endereco, telefone) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();

        const [rows] = await connection.query('SELECT COUNT(*) AS count FROM tbl_pessoa WHERE cpf = ?', [cliente.cpf]);
        if (rows[0].count === 0) {
            throw new Error('Cliente não encontrado!');
        }

        const resEnd = await connection.query(
            'UPDATE tbl_endereco SET logradouro = ?, bairro = ?, estado = ?, numero = ?, complemento = ?, cep = ? WHERE id = (SELECT endereco_id FROM tbl_pessoa WHERE cpf = ?)',
            [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numero, endereco.complemento, endereco.cep, cliente.cpf]
        );

        const resPessoa = await connection.query(
            'UPDATE tbl_pessoa SET nome = ?, data_nasc = ?, genero = ?, email = ? WHERE cpf = ?',
            [cliente.nome, cliente.data_nasc, cliente.genero, cliente.email, cliente.cpf]
        );

        await connection.query(
            'DELETE FROM tbl_pessoa_has_tbl_telefone WHERE pessoa_id = (SELECT id FROM tbl_pessoa WHERE cpf = ?)',
            [cliente.cpf]
        );

        // const idsTel = [];
        // for (const tel of telefone) {
        //     const resTel = await connection.query('INSERT INTO tbl_telefone (numero) VALUES (?)', [tel.numero]);
        //     idsTel.push(resTel[0].insertId);
        // }

        const pessoaId = (await connection.query('SELECT id FROM tbl_pessoa WHERE cpf = ?', [cliente.cpf]))[0][0].id;
        const enderecoId = (await connection.query('SELECT endereco_id FROM tbl_pessoa WHERE cpf = ?', [cliente.cpf]))[0][0].endereco_id;

        for (const idTel of idsTel) {
            await connection.query('INSERT INTO tbl_pessoa_has_tbl_telefone (pessoa_id, telefone_id, pessoa_tbl_endereco_id) VALUES (?, ?, ?)', [pessoaId, idTel, enderecoId]);
        }

        await connection.commit();
        console.log('Atualização concluída com sucesso.');
        return 'Atualização concluída com sucesso.';
    } catch (error) {
        await connection.rollback();
        console.log(error.message);
        return error.message;
    } finally {
        connection.end();
    }
}


async function read() {
    const connection = await conectarBancoDeDados();
    try {
        const [rows] = await connection.query(`
            SELECT p.cpf, p.nome, p.data_nasc, p.genero, p.email,
                   e.logradouro, e.bairro, e.estado, e.numero, e.complemento, e.cep,
                   GROUP_CONCAT(t.numero SEPARATOR ', ') AS telefones
            FROM tbl_pessoa p
            JOIN tbl_endereco e ON p.endereco_id = e.id
            LEFT JOIN tbl_pessoa_has_tbl_telefone pt ON p.id = pt.pessoa_id
            LEFT JOIN tbl_telefone t ON pt.telefone_id = t.id
            GROUP BY p.cpf, p.nome, p.data_nasc, p.genero, p.email, e.logradouro, e.bairro, e.estado, e.numero, e.complemento, e.cep
        `);
        return rows;
    } catch (error) {
        console.log(error.message);
        return error.message;
    } finally {
        connection.end();
    }
}
async function buscarCpf(cpf) {
    const connection = await conectarBancoDeDados();
    try {
        const [rows] = await connection.query(`
            SELECT p.cpf, p.nome, p.data_nasc, p.genero, p.email,
                   e.logradouro, e.bairro, e.estado, e.numero, e.complemento, e.cep,
                   GROUP_CONCAT(t.numero SEPARATOR ', ') AS telefones
            FROM tbl_pessoa p
            JOIN tbl_endereco e ON p.endereco_id = e.id
            LEFT JOIN tbl_pessoa_has_tbl_telefone pt ON p.id = pt.pessoa_id
            LEFT JOIN tbl_telefone t ON pt.telefone_id = t.id
            WHERE p.cpf = ?
            GROUP BY p.cpf, p.nome, p.data_nasc, p.genero, p.email, e.logradouro, e.bairro, e.estado, e.numero, e.complemento, e.cep
        `, [cpf]);
        if (rows.length === 0) {
            throw new Error('Cliente não encontrado!');
        }
        return rows[0];
    } catch (error) {
        console.log(error.message);
        return error.message;
    } finally {
        connection.end();
    }
}

async function remove(cpf) {
    const connection = await conectarBancoDeDados();
    try {
        await connection.beginTransaction();

        // Selecionar o endereço_id com base no CPF
        const [rows] = await connection.query('SELECT endereco_id FROM tbl_pessoa WHERE cpf = ?', [cpf]);
        if (rows.length === 0) {
            throw new Error('Cliente não encontrado!');
        }
        const enderecoId = rows[0].endereco_id;

        // Selecionar os IDs dos telefones associados à pessoa
        const [telefones] = await connection.query('SELECT t.id FROM tbl_telefone t JOIN tbl_pessoa_has_tbl_telefone pt ON t.id = pt.telefone_id JOIN tbl_pessoa p ON pt.pessoa_id = p.id WHERE p.cpf = ?', [cpf]);
        const telefoneIds = telefones.map(tel => tel.id);

        // Deletar o registro da tabela tbl_endereco (a exclusão em cascata cuidará do restante)
        await connection.query('DELETE FROM tbl_endereco WHERE id = ?', [enderecoId]);

        // Deletar os registros da tabela tbl_telefone
        if (telefoneIds.length > 0) {
            await connection.query('DELETE FROM tbl_telefone WHERE id IN (?)', [telefoneIds]);
        }

        await connection.commit();
        console.log('Remoção concluída com sucesso.');
        return 'Remoção concluída com sucesso.';
    } catch (error) {
        await connection.rollback();
        console.log(error.message);
        return error.message;
    } finally {
        connection.end();
    }
}

async function agendarConsulta(consulta) {
    const connection = await conectarBancoDeDados();
    try {
        // Insere os dados no banco de dados
        await connection.query(`
            INSERT INTO tbl_consulta (data, hora, status, paciente_id, paciente_pessoa_id, funcionario_id, funcionario_pessoa_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [consulta.data, consulta.hora, consulta.status, consulta.paciente_id, consulta.paciente_pessoa_id, consulta.funcionario_id, consulta.funcionario_pessoa_id]);

        return { status: 200, message: "Consulta agendada com sucesso!" };
    } catch (error) {
        console.error("Erro ao agendar consulta:", error);
        return { status: 500, message: "Erro ao agendar consulta." };
    } finally {
        connection.end();
    }
}

async function buscarPerfilPorLogin(login, senha) {
    const connection = await conectarBancoDeDados();
    try {
        const [rows] = await connection.query(`
            SELECT p.tipo
            FROM tbl_perfis p
            JOIN tbl_login l ON p.login_id = l.id
            WHERE l.login = ? AND l.senha = ?
        `, [login, senha]);

        if (rows.length === 0) {
            throw new Error('Login ou senha inválidos!');
        }

        return rows[0].tipo;
    } catch (error) {
        console.log(error.message);
        return null;
    } finally {
        connection.end();
    }
}

async function getPacientesComConsultas() {
    const connection = await conectarBancoDeDados();
    try {
        const [rows] = await connection.query(`
            SELECT
                c.status,
                c.data,
                c.hora,
                e.desc_especialidade AS especialidade,
                p.nome AS medico
            FROM
                tbl_consulta c
            JOIN
                tbl_funcionario f ON c.funcionario_id = f.id
            JOIN
                tbl_pessoa p ON f.pessoa_id = p.id
            JOIN
                tbl_funcionario_has_tbl_especialidade fe ON f.id = fe.funcionario_id
            JOIN
                tbl_especialidade e ON fe.especialidade_id = e.id
            ORDER BY
                c.data, c.hora;
        `);
        return rows;
    } catch (error) {
        console.error("Erro ao buscar pacientes com consultas:", error.message);
        return [];
    } finally {
        connection.end();
    }
}

module.exports = { insert, update, read, buscarCpf, remove, agendarConsulta, buscarPerfilPorLogin, getPacientesComConsultas };