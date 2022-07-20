const conexao = require('../../conexao');

const cadastrarTransacao = async (req, res) => {
    const { id } = req.usuario;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const query = "SELECT * FROM categorias WHERE id = $1"
        const { rowCount } = await conexao.query(query, [categoria_id]);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não existe categoria com o id informado" });
        }
        const inserirTransacao = `
            INSERT INTO transacoes
            (descricao, valor, data, categoria_id, tipo, usuario_id)
            VALUES($1, $2, $3, $4, $5, $6)
        `;

        const transacaoCadastrada = await conexao.query(inserirTransacao, [
            descricao, valor, data, categoria_id, tipo, id
        ]);

        if (transacaoCadastrada.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Erro ao cadastrar transação" });
        }

        const selecionarTransacaoCadastrada = `
        SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        FROM transacoes t
        LEFT JOIN categorias c
        ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        `;

        const { rows: dadosTransacao } = await conexao.query(selecionarTransacaoCadastrada, [id]);

        const ultimaTransacaoCadastrada = dadosTransacao[dadosTransacao.length - 1];

        return res.status(200).json(ultimaTransacaoCadastrada);

    } catch (e) {
        return res.status(400).json(e.message);
    }
}

module.exports = {
    cadastrarTransacao
}