const conexao = require('../../conexao');

const extratoTransacoes = async (req, res) => {
    const { id } = req.usuario;
    let entrada = 0;
    let saida = 0;

    try {
        const query = "SELECT * FROM transacoes WHERE usuario_id = $1";

        const { rows, rowCount } = await conexao.query(query, [id]);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não há transações para o usuário informado" });
        }

        for (let row of rows) {
            if (row.tipo === 'entrada') {
                entrada += row.valor;
            }

            if (row.tipo === 'saida') {
                saida += row.valor;
            }
        }

        return res.status(200).json({
            "entrada": entrada,
            "saida": saida
        });

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    extratoTransacoes
}