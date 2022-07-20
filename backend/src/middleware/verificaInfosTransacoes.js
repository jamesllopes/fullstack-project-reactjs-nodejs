const verificaTransacao = (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {

        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ "mensagem": "Todos os campos obrigatórios devem ser informados" });
        }

        if (tipo !== 'saida' && tipo !== 'entrada') {
            return res.status(400).json({ "mensagem": "Os tipos válidos são 'entrada' ou 'saida'" });
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }

    next()
}


module.exports = {
    verificaTransacao,

}