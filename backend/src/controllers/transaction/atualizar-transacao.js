const conexao = require('../../conexao');

const atualizarTransacao = async (req, res) => {
    const { id: usuarioId } = req.usuario;
    const { id: transacaoId } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

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
        const query = 'SELECT * FROM categorias WHERE id = $1';
        const { rowCount } = await conexao.query(query, [categoria_id]);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não existe categoria com o id informado" });
        }

    } catch (e) {
        return res.status(500).json(e.message);
    }

    try {
        const atualizar = `
        UPDATE transacoes 
        SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
        WHERE id = $6
        `;

        const transacaoAtualizada = await conexao.query(atualizar, [
            descricao, valor, data, categoria_id, tipo, transacaoId
        ]);

        if (transacaoAtualizada.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Falha ao atualizar transação" });
        }

        return res.status(200).json();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    atualizarTransacao
}