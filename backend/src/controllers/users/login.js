const conexao = require('../../conexao');
const senhaCriptografada = require('secure-password');
const jwt = require('jsonwebtoken');

const pwd = senhaCriptografada();

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const usuario = await conexao.query(query, [email]);

        if (usuario.rowCount === 0) {
            return res.status(404).json({ "mensagem": "Usuário não encontrado" });
        }

        const usuarioEncontrado = usuario.rows[0];

        const resultado = await pwd.verify(
            Buffer.from(senha),
            Buffer.from(usuarioEncontrado.senha, "hex")
        );

        switch (resultado) {
            case senhaCriptografada.INVALID_UNRECOGNIZED_HASH:
            case senhaCriptografada.INVALID:
                return res.status(400).json({ "mensagem": "Email e/ou senha inválido(s)." });
            case senhaCriptografada.VALID:
                break;
            case senhaCriptografada.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    const query = "UPDATE usuarios SET senha = $1 WHERE email = $2";
                    await conexao.query(query, [hash, email]);
                } catch { }
                break;
        }

        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            },
            process.env.KEY_JWT,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            'usuario': {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            },
            token
        });

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    login
}