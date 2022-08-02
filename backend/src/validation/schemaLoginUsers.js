const yup = require('./config')

const schemaLoginUser = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().min(8)
})


module.exports = schemaLoginUser