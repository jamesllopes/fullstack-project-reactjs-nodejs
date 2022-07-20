import './style.css';
import close from '../../assets/close.svg'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import format from 'date-fns/format'
import useDindin from '../../hooks/useDindin'


function RegisterAndUpdateTransaction() {
    const [form, setForm] = useState({ valor: '', categoria: '', data: '', descricao: '' })

    const [selectedOption, setSelectedOption] = useState('saida')
    const {
        categories,
        newOrUpdateTransaction,
        setNewOrUpdateTransaction,
        idTransaction,
        transactionList,
        errorMessage,
        setErrorMessage
    } = useDindin()
    const token = getItem('token')

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    const findIdDescription = categories.find(cat => (
        cat.descricao === form.categoria
    ))
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.valor || !form.categoria || !form.data || !form.descricao) {
            setErrorMessage('Todos os campos são obrigatórios.')
            return
        }

        if (newOrUpdateTransaction === 'cadastrar') {
            return await registerTransaction()
        }

        if (newOrUpdateTransaction === 'atualizar') {
            return updateTransaction()
        }

    }

    const updateTransaction = async () => {
        try {
            await api.put(`/transacao/${idTransaction}`, {
                tipo: selectedOption,
                valor: form.valor,
                categoria_nome: form.categoria,
                data: new Date(form.data.split("/").reverse().join("/")),
                descricao: form.descricao,
                categoria_id: findIdDescription.id
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setErrorMessage('')
            setNewOrUpdateTransaction('')

        } catch (error) {
            setErrorMessage(error.response.data.mensagem)
        }
    }

    const registerTransaction = async () => {
        try {
            await api.post('/transacao', {
                tipo: selectedOption,
                valor: form.valor,
                categoria_nome: form.categoria,
                data: new Date(form.data.split("/").reverse().join("/")),
                descricao: form.descricao,
                categoria_id: findIdDescription.id
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setErrorMessage('')
            setNewOrUpdateTransaction('')

        } catch (error) {
            setErrorMessage(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        if (newOrUpdateTransaction === 'atualizar') {
            const update = transactionList.find(item => (
                item.id === Number(idTransaction)
            ))
            setForm({
                valor: update.valor,
                categoria: update.categoria_nome,
                data: format(new Date(update.data), 'dd/MM/yyyy'),
                descricao: update.descricao
            })
            setSelectedOption(update.tipo)
        }
    }, [])

    return (
        <div className='container__modal'>
            <div className='box__modal'>
                <div className='div__title'>
                    <h2 className='title__modal'>{newOrUpdateTransaction === 'cadastrar' ? 'Adicionar Registro' : 'Atualizar Registro'}</h2>
                    <img
                        className='close'
                        src={close} alt='Fechar'
                        onClick={() => setNewOrUpdateTransaction('')}
                    />
                </div>
                <form className='form'
                    onSubmit={handleSubmit}>
                    <div className='type__box'>
                        <label className={selectedOption === 'entrada' ? 'type__label blue-bg ' : 'type__label gray-bg '}>
                            Entrada
                            <input
                                type='radio'
                                name='tipo'
                                className='input__radio'
                                checked={selectedOption === 'entrada'}
                                value='entrada'
                                onChange={() => setSelectedOption('entrada')}
                            />
                        </label>
                        <label className={selectedOption === 'saida' ? 'type__label red-bg ' : 'type__label gray-bg '}>
                            Saída
                            <input
                                type='radio'
                                name='tipo'
                                className='input__radio'
                                checked={selectedOption === 'saida'}
                                value='saida'
                                onChange={() => setSelectedOption('saida')}
                            />
                        </label>
                    </div>
                    <label className='value__label'>
                        Valor
                        <input
                            type='text'
                            name='valor'
                            className='input'
                            value={form.valor}
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </label>
                    <label className='category__label'>
                        Categoria
                        <select
                            name='categoria'
                            className='input select'
                            value={form.categoria}
                            onChange={(e) => handleChangeInput(e)}
                        >
                            {categories.map(item => (
                                <option
                                    key={item.id}
                                    value={item.descricao}>{item.descricao}</option>
                            ))}
                        </select>
                    </label>
                    <label className='date__label'>
                        Data
                        <input
                            type='text'
                            name='data'
                            className='input'
                            value={form.data}
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </label>
                    <label className='desc__label'>
                        Descrição
                        <input
                            type='text'
                            name='descricao'
                            className='input'
                            value={form.descricao}
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </label>
                    {errorMessage && <span className='error'>{errorMessage}</span>}
                    <button className='btn cadastrar__btn'
                    >Confirmar</button>
                </form>
            </div>
        </div >
    );
}

export default RegisterAndUpdateTransaction;