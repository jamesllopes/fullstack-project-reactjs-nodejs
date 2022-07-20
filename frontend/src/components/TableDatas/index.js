import { useEffect, useState } from 'react';
import api from '../../services/api'
import './style.css'
import { getItem } from '../../utils/storage';
import edit from '../../assets/edit.svg'
import delet from '../../assets/delete.svg'
import upArrow from '../../assets/upArrow.svg'
import format from 'date-fns/format'
import { dayOfTheWeek } from '../../utils/days';
import useDindin from '../../hooks/useDindin'


function Table() {
    const {
        setTransaction,
        newOrUpdateTransaction,
        setNewOrUpdateTransaction,
        setIdTransaction,
        transactionList,
        setTransactionList } = useDindin()
    const [del, setDel] = useState(false)
    const currentTransaction = [...transactionList]

    const handleOrdenar = () => {
        const currentList = [...transactionList]
        const datesSort = currentList.sort((a, b) => {
            const aData = format(new Date(a.data), `dd/MM/yyyy`)
            const bData = format(new Date(b.data), `dd/MM/yyyy`)
            let dataA = aData.split('/')
            let dataB = bData.split('/')
            a = new Date(dataA[2], dataA[1], dataA[0]);
            b = new Date(dataB[2], dataB[1], dataB[0]);

            return b.getTime() - a.getTime()
        })
        setTransactionList(datesSort)
    }

    const getContentApi = async () => {
        const token = getItem('token')
        try {
            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransaction([...response.data])
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteTransaction = async (e) => {
        const token = getItem('token')
        const id = e.target.name
        try {
            await api.delete(`/transacao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const findItem = currentTransaction.findIndex(item => (
                item.id === Number(id)
            ))
            currentTransaction.splice(findItem, 1)
            setTransactionList(currentTransaction)
        } catch (error) {
            throw error
        }
    }

    const handleUpdateTransacao = (e) => {
        setIdTransaction(e.target.name)
        setNewOrUpdateTransaction('atualizar')
    }

    useEffect(() => {
        getContentApi()
    }, [!newOrUpdateTransaction])

    return (
        <div className='content__data'>
            <div className='title__datas'>
                <ul className='div__intern'>
                    <li className='title date'
                        onClick={(() => handleOrdenar())}>Data <img className='up-Arrow' src={upArrow} alt='Seta' /></li>
                    <li className='title semana'>Dia da Semana</li>
                    <li className='title desc'>Descrição</li>
                    <li className='title categ'>Categoria</li>
                    <li className='title value'>Valor</li>
                </ul>
            </div>
            {transactionList.map(item => (
                <div key={item.id} className='datas'>
                    <ul className='div__intern intern__datas'>
                        <li className='data dateFormat'>{format(new Date(item.data), `dd/MM/yyyy`)}</li>
                        <li className='data'>{dayOfTheWeek(format(new Date(item.data), `eeee`))}</li>
                        <li className='data descFormat'>{item.descricao}</li>
                        <li className='data catFormat'>{item.categoria_nome}</li>
                        <li className={item.tipo === 'saida' ? 'data valueFormat orange' : 'data valueFormat purple'}>R$ {(item.valor / 100).toFixed(2).replace('.', ',')}</li>
                    </ul>
                    <div className='btn__data'>
                        <img
                            src={edit}
                            className='btn__edit'
                            alt='Editar'
                            name={item.id}
                            onClick={(e) => handleUpdateTransacao(e)}
                        />
                        <img
                            src={delet}
                            className='btn__delete'
                            alt='Excluir'
                            name={item.id}
                            onClick={() => setDel(item.id)} />

                        {del === item.id && <div className='modal__delete'>
                            <h4 className='title__delete'>Apagar Item?</h4>
                            <div className='btn__div'>
                                <button className='btn__modal blue-bg'
                                    name={item.id}
                                    onClick={(e) => handleDeleteTransaction(e)}>Sim</button>
                                <button className='btn__modal red-bg'
                                    onClick={() => setDel(0)}>Não</button>
                            </div>
                        </div>}
                    </div>
                </div>))}
        </div>
    );
}

export default Table;

