const conexao = require('../../conexao');

const excluirTransacao = async (req, res) => {
    const { id: usuarioId } = req.usuario;
    const { id: transacaoId } = req.params;

    try {
        const query = `
        SELECT * FROM transacoes WHERE id = $1`;

        const { rows, rowCount } = await conexao.query(query, [transacaoId]);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Transação não encontrada" });
        }

        if (rows[0].usuario_id !== usuarioId) {
            return res.status(401).json({ "mensagem": "Transação não vinculada ao usuário" });
        }

    } catch (e) {
        return res.status(500).json(e.message);
    }

    try {
        const query = `DELETE FROM transacoes WHERE id = $1`;
        const transacaoExcluida = await conexao.query(query, [transacaoId]);

        if (transacaoExcluida.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível excluir a transação" });
        }

        return res.status(200).json();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    excluirTransacao
}