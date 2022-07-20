const conexao = require('../../conexao');

const detalharUsuario = async (req, res) => {
    const { usuario } = req;

    try {
        return res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });

    } catch (e) {
        return res.status(401).json(e.message);
    }
}

module.exports = {
    detalharUsuario
}