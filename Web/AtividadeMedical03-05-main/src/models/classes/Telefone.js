class Telefone {

    constructor(pTel) {
        this.id = (pTel.id !== null || pTel.id > 0) ? pTel.id : null;
        this.numero = pTel.numero;
    }
    // Getters and Setters
    get Numero() { return this.numero; }
    set Numero(value) { this.numero = value }
}

module.exports = Telefone;