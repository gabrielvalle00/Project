class Login {

    constructor(pLogin) {
        this.id = (pLogin.id !== null || pLogin.id > 0) ? pLogin.id : null;
        this.login = pLogin.login;
        this.senha = pLogin.senha;
        this.status = pLogin.status;
        this.pessoa_id = (pLogin.pessoa_id !== null || pLogin.pessoa_id > 0) ? pLogin.pessoa_id : null;
        this.pessoa_endereco_id = (pLogin.pessoa_endereco_id !== null || pLogin.pessoa_endereco_id > 0) ? pLogin.pessoa_endereco_id : null;
    }

    get Login() { return this.login; }
    set Login(value) { this.login = value; }

    get Senha() { return this.senha; }
    set Senha(value) { this.senha = value; }

    get Status() { return this.status; }
    set Status(value) { this.status = value; }

    get Pessoa_id() { return this.pessoa_id; }
    set Pessoa_id(value) { this.pessoa_id = value; }

    get Pessoa_endereco_id() { return this.pessoa_endereco_id; }
    set Pessoa_endereco_id(value) { this.pessoa_endereco_id = value; }

}

module.exports = Login;
