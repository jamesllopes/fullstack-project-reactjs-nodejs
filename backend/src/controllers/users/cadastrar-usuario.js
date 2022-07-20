const conexao = require('../../conexao');
const senhaCriptografada = require('secure-password');

const pwd = senhaCriptografada();

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {

        const query = "SELECT * FROM usuarios WHERE email = $1";
        const { rowCount: quantidadeUsuarios } = await conexao.query(query, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(400).json("Já existe usuário cadastrado com o e-mail informado.");
        }

    } catch (e) {
        return res.status(500).json(e.message);
    }

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)";
        const usuarioCadastrado = await conexao.query(query, [
            nome,
            email,
            hash
        ]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json("Erro na inserção");
        }

        const selecionarUsuarioCadastrado = "SELECT id, nome, email FROM usuarios WHERE email = $1";
        const { rows: dadosDoUsuario } = await conexao.query(selecionarUsuarioCadastrado, [email]);

        return res.status(201).json(dadosDoUsuario[0]);

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    cadastrarUsuario
}