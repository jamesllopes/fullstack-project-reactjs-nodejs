import { useEffect } from 'react';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import api from '../../services/api'
import './style.css'
import { getItem } from '../../utils/storage';
import UpdateUser from '../../components/UpdateUser';
import Filter from '../../components/Filter';
import Table from '../../components/TableDatas';
import Resume from '../../components/Resume';
import RegisterAndUpdateTransaction from '../../components/RegisterUpdateTransaction';
import useDindin from '../../hooks/useDindin'

function Main() {
    const {
        setUsers,
        userEdit,
        setUserEdit,
        transaction,
        setCategories,
        newOrUpdateTransaction,
        setTransactionList } = useDindin()
    const token = getItem('token')

    const getUserApi = async () => {
        try {
            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data)
        } catch (error) {
            throw error
        }
    }

    const handleEditUser = () => {
        setUserEdit(true)
    }
    const getCategorias = async () => {
        try {
            const response = await api.get('/categoria', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        setTransactionList(transaction)
    }, [transaction])

    useEffect(() => {
        getCategorias()
    }, [])

    useEffect(() => {
        getUserApi()
    }, [userEdit])

    return (
        <div className='container dashboard'>
            {userEdit && <UpdateUser />}
            {newOrUpdateTransaction && <RegisterAndUpdateTransaction />}
            <HeaderDashboard
                handleEditUser={handleEditUser}
            />
            <main className='main__dashboard'>
                <div className='content__left'>
                    <Filter />
                    <Table />
                </div>
                <div className='content__right'>
                    <Resume />
                </div>
            </main>
        </div>
    );
}

export default Main;