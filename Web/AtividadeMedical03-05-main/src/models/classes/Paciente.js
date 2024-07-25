class Paciente {

    constructor(pPaciente) {
        this.id = (pPaciente.id !== null || pPaciente.id > 0) ? pPaciente.id : null;
        this.pessoa_id = (pPaciente.pessoa_id !== null || pPaciente.pessoa_id > 0) ? pPaciente.pessoa_id : null;
    }

    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Pessoa_id() { return this.pessoa_id; }
    set Pessoa_id(value) { this.pessoa_id = value; }
}

module.exports = Paciente;
