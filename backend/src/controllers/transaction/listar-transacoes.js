const conexao = require('../../conexao');

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario;
    const filtro = req.query.filtro;

    try {
        const query = `
        SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        FROM transacoes t
        LEFT JOIN categorias c
        ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
        `;

        const { rows } = await conexao.query(query, [id]);

        if (filtro) {
            const transacoes = rows;
            const transacoesFiltradasPorCategoria = [];

            transacoes.filter(item => {
                if (filtro.includes((item.categoria_nome).toLowerCase())) {
                    transacoesFiltradasPorCategoria.push(item);
                }
            });

            return res.json(transacoesFiltradasPorCategoria);
        }



        return res.status(200).json(rows);

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    listarTransacoes
}