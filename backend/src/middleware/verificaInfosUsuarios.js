const schemaCadastroUser = require('../validation/schemaCadastroUser.js ')
const schemaLoginUser = require('../validation/schemaLoginUsers')

const verificaEmailSenha = async (req, res, next) => {
    try {
        await schemaLoginUser.validate(req.body)

    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }
    next()
}

const verificaNomeEmailSenha = async (req, res, next) => {
    try {
        await schemaCadastroUser.validate(req.body)

    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }

    next()
}
module.exports = {
    verificaEmailSenha,
    verificaNomeEmailSenha
}