const conexao = require('../../conexao');

const listarCategorias = async (req, res) => {
    try {
        const query = "SELECT * FROM categorias";
        const { rowCount, rows } = await conexao.query(query);

        if (rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível listar categorias" });
        }

        return res.status(200).json(rows);

    } catch (e) {
        return res.status(401).json(e.message);
    }
}

module.exports = {
    listarCategorias
}