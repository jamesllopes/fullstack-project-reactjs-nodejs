import './style.css';
import HeaderLoginSignUp from '../../components/Header/HeaderLoginSignUp';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email || !password) {
                setErrorMessage('Todos os campos são obrigatórios')
                return
            }
            const response = await api.post('/login', {
                email: email,
                senha: password
            })
            setErrorMessage('')
            const { token } = response.data
            setItem('token', token)
            const { id } = response.data.usuario
            setItem('userID', id)
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.response.data.mensagem)
        }
    }
    useEffect(() => {
        const token = getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

    return (
        <div className='container'>
            <HeaderLoginSignUp />
            <main className='main'>
                <div className='content__main'>
                    <h1 className='content__title'>Controle suas <span>finanças</span>,
                        sem planilha chata.</h1>
                    <p className='content__desc'>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button className='btn content__btn'
                        onClick={() => navigate('/cadastrar')}>Cadastre-se</button>
                </div>
                <div className='content__login'>
                    <h3 className='login__title'>Login</h3>
                    <form
                        className='form'
                        onSubmit={handleSubmit}>
                        <label className='email__label'>
                            E-mail
                            <input
                                type='email'
                                name='email'
                                className='input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className='pass__label'>
                            Password
                            <input
                                type='password'
                                name='password'
                                className='input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        {errorMessage && <span className='error'>{errorMessage}</span>}
                        <button className='btn login__btn'>Entrar</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;