class Especialidade {

    constructor(pEspecialidade) {
        this.id = (pEspecialidade.id !== null || pEspecialidade.id > 0) ? pEspecialidade.id : null;
        this.desc_especialidade = pEspecialidade.desc_especialidade;
    }

    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Desc_especialidade() { return this.desc_especialidade; }
    set Desc_especialidade(value) { this.desc_especialidade = value; }
}

module.exports = Especialidade;
