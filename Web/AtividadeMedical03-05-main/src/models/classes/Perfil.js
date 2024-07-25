class Perfil {

    constructor(pPerfis) {
        this.id = (pPerfis.id !== null || pPerfis.id > 0) ? pPerfis.id : null;
        this.tipo = pPerfis.tipo;
        this.login_id = (pPerfis.login_id !== null || pPerfis.login_id > 0) ? pPerfis.login_id : null;
        this.login_pessoa_id = (pPerfis.login_pessoa_id !== null || pPerfis.login_pessoa_id > 0) ? pPerfis.login_pessoa_id : null;
        this.login_pessoa_endereco_id = (pPerfis.login_pessoa_endereco_id !== null || pPerfis.login_pessoa_endereco_id > 0) ? pPerfis.login_pessoa_endereco_id : null;
    }

    get Id() { return this.id; }
    set Id(value) { this.id = value; }

    get Tipo() { return this.tipo; }
    set Tipo(value) { this.tipo = value; }

    get Login_id() { return this.login_id; }
    set Login_id(value) { this.login_id = value; }

    get Login_pessoa_id() { return this.login_pessoa_id; }
    set Login_pessoa_id(value) { this.login_pessoa_id = value; }

    get Login_pessoa_endereco_id() { return this.login_pessoa_endereco_id; }
    set Login_pessoa_endereco_id(value) { this.login_pessoa_endereco_id = value; }
}

module.exports = Perfil;
