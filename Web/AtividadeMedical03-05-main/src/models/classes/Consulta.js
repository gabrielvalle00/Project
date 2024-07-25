class Consulta {

    constructor(pCon) {
        this.id = (pCon.id !== null || pCon.id > 0) ? pCon.id : null;
        this.DataConvert(pCon.data);
        this.hora = pCon.hora;
        this.status = pCon.status;
        this.paciente_id = (pCon.paciente_id !== null || pCon.paciente_id > 0) ? pCon.paciente_id : null;
        this.paciente_pessoa_id = (pCon.paciente_pessoa_id !== null || pCon.paciente_pessoa_id > 0) ? pCon.paciente_pessoa_id : null;
        this.funcionario_id = (pCon.funcionario_id !== null || pCon.funcionario_id > 0) ? pCon.funcionario_id : null;
        this.funcionario_pessoa_id = (pCon.funcionario_pessoa_id !== null || pCon.funcionario_pessoa_id > 0) ? pCon.funcionario_pessoa_id : null;
    }

    get Data() { return this.data; }
    set Data(value) { this.data = value; }

    get Hora() { return this.hora; }
    set Hora(value) { this.hora = value; }

    get Status() { return this.status; }
    set Status(value) { this.status = value; }

    get Paciente_id() { return this.paciente_id; }
    set Paciente_id(value) { this.paciente_id = value; }

    get Paciente_pessoa_id() { return this.paciente_pessoa_id; }
    set Paciente_pessoa_id(value) { this.paciente_pessoa_id = value; }

    get Funcionario_id() { return this.funcionario_id; }
    set Funcionario_id(value) { this.funcionario_id = value; }

    get Funcionario_pessoa_id() { return this.funcionario_pessoa_id; }
    set Funcionario_pessoa_id(value) { this.funcionario_pessoa_id = value; }

    DataConvert(value) {
        let [dia, mes, ano] = value.split('/'); 
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.Data = new Date(dataFormatada);
        return this.Data;
    }
}

module.exports = Consulta;
