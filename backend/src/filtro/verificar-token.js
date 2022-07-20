const conexao = require("../conexao");
const jwt = require("jsonwebtoken");
const segredo = require("../chave-secreta");

const verificarToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json({ "mensagem": "Token não informado." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, segredo);
        const query = "SELECT * FROM usuarios WHERE id = $1";
        const { rows, rowCount } = await conexao.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json('Usuário não encontrado.')
        }

        const { senha, ...usuario } = rows[0];
        req.usuario = usuario;

        next();
    } catch (e) {
        return res.status(401).json(e.message);
    }
}

module.exports = { verificarToken };