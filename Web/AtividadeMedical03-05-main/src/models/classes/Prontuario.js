class Prontuario {

    constructor(pProntuario) {
        this.id = (pProntuario.id !== null || pProntuario.id > 0) ? pProntuario.id : null;
        this.diagnostico = pProntuario.diagnostico;
        this.medicacao = pProntuario.medicacao;
        this.consulta_id = (pProntuario.consulta_id !== null || pProntuario.consulta_id > 0) ? pProntuario.consulta_id : null;
        this.consulta_paciente_id = (pProntuario.consulta_paciente_id !== null || pProntuario.consulta_paciente_id > 0) ? pProntuario.consulta_paciente_id : null;
        this.consulta_paciente_pessoa_id = (pProntuario.consulta_paciente_pessoa_id !== null || pProntuario.consulta_paciente_pessoa_id > 0) ? pProntuario.consulta_paciente_pessoa_id : null;
        this.consulta_funcionario_id = (pProntuario.consulta_funcionario_id !== null || pProntuario.consulta_funcionario_id > 0) ? pProntuario.consulta_funcionario_id : null;
        this.consulta_funcionario_pessoa_id = (pProntuario.consulta_funcionario_pessoa_id !== null || pProntuario.consulta_funcionario_pessoa_id > 0) ? pProntuario.consulta_funcionario_pessoa_id : null;
        this.consulta_especialidade_id = (pProntuario.consulta_especialidade_id !== null || pProntuario.consulta_especialidade_id > 0) ? pProntuario.consulta_especialidade_id : null;
    }

    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Diagnostico() { return this.diagnostico; }
    set Diagnostico(value) { this.diagnostico = value; }

    get Medicacao() { return this.medicacao; }
    set Medicacao(value) { this.medicacao = value; }

    get Consulta_id() { return this.consulta_id; }
    set Consulta_id(value) { this.consulta_id = value; }

    get Consulta_paciente_id() { return this.consulta_paciente_id; }
    set Consulta_paciente_id(value) { this.consulta_paciente_id = value; }

    get Consulta_paciente_pessoa_id() { return this.consulta_paciente_pessoa_id; }
    set Consulta_paciente_pessoa_id(value) { this.consulta_paciente_pessoa_id = value; }

    get Consulta_funcionario_id() { return this.consulta_funcionario_id; }
    set Consulta_funcionario_id(value) { this.consulta_funcionario_id = value; }

    get Consulta_funcionario_pessoa_id() { return this.consulta_funcionario_pessoa_id; }
    set Consulta_funcionario_pessoa_id(value) { this.consulta_funcionario_pessoa_id = value; }

    get Consulta_especialidade_id() { return this.consulta_especialidade_id; }
    set Consulta_especialidade_id(value) { this.consulta_especialidade_id = value; }

}

module.exports = Prontuario;
