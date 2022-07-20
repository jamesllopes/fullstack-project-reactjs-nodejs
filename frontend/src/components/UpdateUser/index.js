import './style.css';
import close from '../../assets/close.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import useDindin from '../../hooks/useDindin'


function UpdateUser() {
    const [form, setForm] = useState({ nome: '', email: '', senha: '', conf_senha: '' })
    const { users,
        setUserEdit,
        errorMessage,
        setErrorMessage,
        success,
        setSuccess
    } = useDindin()

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.nome || !form.email || !form.senha || !form.conf_senha) {
            setErrorMessage('Todos os campos são obrigatórios.')
            return
        }
        if (form.senha !== form.conf_senha) {
            setErrorMessage('As senhas não são iguais')
            return
        }
        try {
            const token = getItem('token')
            await api.put('/usuario', {
                nome: form.nome,
                email: form.email,
                senha: form.senha
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setErrorMessage('')
            setSuccess(true)
            setTimeout(() => {
                setUserEdit(false)

            }, 1000)

        } catch (error) {
            setErrorMessage(error.response.data.mensagem)
        }
    }


    useEffect(() => {
        setSuccess(false)
        setForm({
            ...form,
            nome: users.nome,
            email: users.email
        })
    }, [])

    return (
        <div className='container__modal'>
            <div className='box__modal'>
                <div className='div__title'>
                    <h2 className='title__modal'>Editar Perfil</h2>
                    <img
                        className='close'
                        src={close} alt='Fechar'
                        onClick={() => setUserEdit(false)} />
                </div>
                <form className='form'
                    onSubmit={handleSubmit}>
                    <label className='name__label'>
                        Nome
                        <input
                            type='text'
                            name='nome'
                            className='input'
                            value={form.nome}
                            onChange={(e) => handleChangeInput(e)} />
                    </label>

                    <label className='email__label'>
                        E-mail
                        <input
                            type='email'
                            name='email'
                            className='input'
                            value={form.email}
                            onChange={(e) => handleChangeInput(e)} />
                    </label>

                    <label className='pass__label'>
                        Senha
                        <input
                            type='password'
                            name='senha'
                            className='input'
                            value={form.senha}
                            onChange={(e) => handleChangeInput(e)} />
                    </label>

                    <label className='pass--conf__label'>
                        Confirmação de senha
                        <input
                            type='password'
                            name='conf_senha'
                            className='input'
                            value={form.conf_senha}
                            onChange={(e) => handleChangeInput(e)} />
                    </label>

                    {errorMessage && <span className='error'>{errorMessage}</span>}
                    <button className='btn cadastrar__btn'
                    >Confirmar</button>
                    {success && <h2 className='text_sucess'>Atualizacao Realizado com Sucesso!</h2>}
                </form>

            </div>
        </div>

    );
}

export default UpdateUser;