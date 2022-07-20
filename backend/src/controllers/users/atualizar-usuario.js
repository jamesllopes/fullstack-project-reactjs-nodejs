const conexao = require('../../conexao');
const senhaCriptografada = require('secure-password');

const pwd = senhaCriptografada();

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    try {

        const query = "SELECT * FROM usuarios WHERE email = $1";
        const usuario = await conexao.query(query, [email]);

        if (usuario.rowCount > 0 && usuario.rows[0].id !== Number(id)) {
            return res.status(400).json({ "mensagem": "O e-mail informado já está sendo utilizado por outro usuário." });
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');

        const usuarioAtualizado = "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4";
        await conexao.query(usuarioAtualizado, [nome, email, hash, id]);

        return res.status(204).json();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    atualizarUsuario
}