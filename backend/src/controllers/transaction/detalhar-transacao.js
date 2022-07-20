const conexao = require('../../conexao');

const detalharTransacao = async (req, res) => {
    const { id: transacaoId } = req.params;
    const { id } = req.usuario;

    try {
        const query = `
        SELECT * FROM transacoes WHERE id = $1
        `;
        const { rowCount } = await conexao.query(query, [transacaoId]);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Transação não encontrada." });
        }
    } catch (e) {
        return res.status(500).json(e.message);
    }

    try {
        const query = `
        SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        FROM transacoes t
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        AND t.id = $2
        `;

        const { rows, rowCount } = await conexao.query(query, [id, transacaoId]);

        if (rowCount === 0) {
            return res.status(401).json({ "mensagem": "Acesso negado" });
        }

        return res.status(200).json(rows[0]);

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    detalharTransacao
}