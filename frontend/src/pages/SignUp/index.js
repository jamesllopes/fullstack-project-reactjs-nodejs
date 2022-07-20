import './style.css';
import HeaderLoginSignUp from '../../components/Header/HeaderLoginSignUp';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from '../../services/api';
import useDindin from '../../hooks/useDindin'

function SignUp() {
    const { errorMessage, setErrorMessage, success, setSuccess } = useDindin()
    const navigate = useNavigate('')
    const [form, setForm] = useState({ nome: '', email: '', senha: '', conf_senha: '' })


    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!form.nome || !form.email || !form.senha || !form.conf_senha) {
                setErrorMessage('Todos os campos são obrigatórios.')
                return
            }
            if (form.senha !== form.conf_senha) {
                setErrorMessage('As senhas não são iguais')
                return
            }

            await api.post('/usuario', {
                nome: form.nome,
                email: form.email,
                senha: form.senha
            });
            setErrorMessage('')
            setSuccess(true)
            setTimeout(() => {
                navigate('/')
            }, 2000)

        } catch (error) {
            setErrorMessage(error.response.data)
        }
    }

    useEffect(() => {
        setSuccess(false)
        const token = getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);
    return (
        <div className='container'>
            <HeaderLoginSignUp />
            <main className='main'>
                <div className='box__singnup'>
                    <h1 className='signup__title'>Cadastre-se</h1>
                    <form
                        className='form'
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
                        <button className='btn cadastrar__btn'>Cadastrar</button>
                        <span className='login'>Já tem cadastro? <Link to="/" className='link'>Clique Aqui!</Link></span>
                        {success && <h2 className='text_sucess'>Cadastro Realizado com Sucesso!</h2>}
                    </form>
                </div>
            </main>
        </div>
    );
}

export default SignUp;