const schemaTransacoes = require('../validation/schemaTransacoes')

const verificaTransacao = async (req, res, next) => {
    const { tipo } = req.body;

    try {
        await schemaTransacoes.validate(req.body)

        if (tipo !== 'saida' && tipo !== 'entrada') {
            return res.status(400).json({ "mensagem": "Os tipos válidos são 'entrada' ou 'saida'" });
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }

    next()
}

module.exports = {
    verificaTransacao
}