class Endereco {

    constructor(pEnd) {
        
console.log(pEnd);
        this.id = pEnd.id !== null || pEnd.id > 0 ? pEnd.id : null;
        this.logradouro = pEnd.logradouro;
        this.bairro = pEnd.bairro;
        this.estado = pEnd.estado;
        this.numero = pEnd.numero;
        this.complemento = pEnd.complemento;
        this.cep = pEnd.cep;
    }

    // get Id() { return this.id }

    get Logradouro() { return this.logradouro; }
    set Logradouro(value) { this.logradouro = value; }

    get Numero() { return this.numero; }
    set Numero(value) { this.numero = value; }

    get Bairro() { return this.bairro; }
    set Bairro(value) { this.bairro = value; }

    get Complemento() { return this.complemento; }
    set Complemento(value) { this.complemento = value; }

    get Cep() { return this.cep; }
    set Cep(value) { this.cep = value; }

    get Estado() { return this.estado; }
    set Estado(value) { this.estado = value; }
}

module.exports = Endereco;
