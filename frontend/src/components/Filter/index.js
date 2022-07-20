import { useState } from 'react';
import './style.css'
import filter from '../../assets/filter.svg'
import plus from '../../assets/plus.svg'
import useDindin from '../../hooks/useDindin'


function Filter() {
    const [abaFilter, setAbaFilter] = useState(false)
    const [checked, setChecked] = useState([])
    const {
        transaction,
        categories,
        setTransactionList
    } = useDindin()


    const handleFilter = () => {
        const currentTransacao = [...transaction]
        const filter = []
        for (let categoria of checked) {
            const currentFilter = currentTransacao.filter(item => (
                item.categoria_nome === categoria
            ))
            filter.push(...currentFilter)
        }
        setTransactionList(filter)
    }

    const colorClass = (desc) => {
        if (checked.includes(desc)) {
            return 'btn-categories purple-bg'
        } else {
            return 'btn-categories'
        }
    }

    const handleClearFilter = () => {
        setChecked([])
        setTransactionList(transaction)
    }

    return (
        <>
            <button className='btn-filter'
                onClick={() => setAbaFilter(!abaFilter)}>
                <img className='filter__img' src={filter} alt='Filtrar' />
                Filtrar
            </button>
            {abaFilter && <div className='div__filter-options'>
                <h4 className='title__options'>Categoria</h4>
                <div className='cat'>
                    {categories.map(item => (
                        <label
                            key={item.id}
                            className='label__check'>
                            <div className={colorClass(item.descricao)}>
                                {item.descricao}
                                <img className='plus' src={plus} alt='Plus' />
                            </div>
                            <input
                                type='checkbox'
                                value={item.descricao}
                                className='input__checkbox'
                                onClick={(e) => setChecked([...checked, e.target.value])}
                            />
                        </label>

                    ))}
                </div>
                <div className='btns'>
                    <button
                        className='btn-clean'
                        onClick={() => handleClearFilter()}>Limpar Filtros</button>
                    <button
                        className='btn-apply'
                        type='button'
                        onClick={() => handleFilter()}>Aplicar Filtros</button>
                </div>
            </div>}
        </>
    );
}

export default Filter;