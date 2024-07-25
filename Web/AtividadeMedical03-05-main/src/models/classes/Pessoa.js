const Validacoes = require('./Validacoes')

class Pessoa {

    constructor(pCli) {
        this.id = (pCli.id !== null || pCli.id > 0) ? pCli.id : null;
        this.cpf = pCli.cpf;
        this.nome = pCli.nome;
        this.data_nasc = Validacoes.DataConvert(pCli.data_nasc);
        this.genero = pCli.genero;
        this.email = pCli.email;
        this.data_cad = (pCli.data_cad !== null || pCli.data_cad > 0) ? pCli.data_cad : null;
        this.endereco_id = (pCli.endereco_id !== null || pCli.endereco_id > 0) ? pCli.endereco_id : null;
    }

    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

    get Data_nasc() { return this.data_nasc; }
    set Data_nasc(value) { this.data_nasc = value; }

    get Genero() { return this.genero; }
    set Genero(value) { this.genero = value }

    get Email() {return this.email;}
    set Email(value) { this.email = value}



    // DataConvert(value) {
    //     let [dia, mes, ano] = value.split('/'); 
    //     let dataFormatada = `${ano}-${mes}-${dia}`;
    //     this.Data_nasc = new Date(dataFormatada);
    //     return this.Data_nasc;
    // }
}

module.exports = Pessoa;