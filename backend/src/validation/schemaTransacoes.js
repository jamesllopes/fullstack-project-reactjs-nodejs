const yup = require('./config')

const schemaTransacoes = yup.object().shape({
    tipo: yup.string().required(),
    descricao: yup.string().required(),
    valor: yup.number().strict().required(),
    data: yup.date().required(),
    categoria_id: yup.number().strict().required()
})

module.exports = schemaTransacoes