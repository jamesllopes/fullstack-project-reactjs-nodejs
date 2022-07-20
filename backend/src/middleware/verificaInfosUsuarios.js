const verificaEmailSenha = (req, res, next) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ "mensagem": "Para realizar o login, informar email e senha" })
        }
    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }

    next()
}

const verificaNomeEmailSenha = (req, res, next) => {
    const { nome, email, senha } = req.body;
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios" });
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }

    next()
}
module.exports = {
    verificaEmailSenha,
    verificaNomeEmailSenha
}