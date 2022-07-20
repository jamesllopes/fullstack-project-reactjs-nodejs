import { useEffect, useState } from 'react';
import './style.css'
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import useDindin from '../../hooks/useDindin'

function Resume() {
    const {
        setNewOrUpdateTransaction,
        transactionList
    } = useDindin()
    const [output, setOutput] = useState(0)
    const [entry, setEntry] = useState(0)
    const [balance, setBalance] = useState(0)
    const [noTransaction, setNoTransaction] = useState('')

    const getExtract = async () => {
        try {
            const token = getItem('token')
            const response = await api.get('/transacao/extrato',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const { entrada } = response.data
            const { saida } = response.data
            setEntry(entrada)
            setOutput(saida)
            setBalance(entrada - saida)
            setNoTransaction('')

        } catch (error) {
            setNoTransaction(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        if (!noTransaction) {
            setEntry(0)
            setOutput(0)
            setBalance(0)
        }
        getExtract()
    }, [transactionList])

    return (
        <>
            <div className='content__resume'>
                <h1 className='title__resume'>Resumo</h1>
                <div className='entrada__div'>
                    <h4 className='entradas'>Entradas</h4>
                    <h4 className='value__entrada purple'>R$ {(entry / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
                <div className='saida__div'>
                    <h4 className='saidas'>Saídas</h4>
                    <h4 className='value__saida orange'> R$ {(output / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
                <div className='saldo__div'>
                    <h4 className='saldo'>Saldo</h4>
                    <h4 className='value__saldo blue'>R$ {(balance / 100).toFixed(2).replace('.', ',')}</h4>
                </div>
                {noTransaction && <span className='semRegistro'>{noTransaction}</span>}
            </div>
            <button
                className='btn btn-register'
                onClick={() => setNewOrUpdateTransaction('cadastrar')}>Adicionar Registro</button>
        </>
    );
}

export default Resume;