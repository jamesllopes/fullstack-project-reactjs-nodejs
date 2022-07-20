import './style.css';
import logo from '../../../assets/logo.svg'
import user from '../../../assets/user.svg'
import exit from '../../../assets/exit.svg'
import { clear } from '../../../utils/storage'
import { useNavigate } from 'react-router-dom'
import useDindin from '../../../hooks/useDindin'

function HeaderDashboard({ handleEditUser }) {
    const { users } = useDindin()

    const navigate = useNavigate('')
    const handleExit = () => {
        clear()
        navigate('/')
    }
    return (
        <header className='header'>
            <img className='img__header' src={logo} alt='Logo Dindin' />
            <div className='user__header'>
                <img
                    className='user__img'
                    src={user} alt='Avatar do Usuário'
                    onClick={() => handleEditUser()} />
                <h4 className='user__name'>{users.nome}</h4>
                <img
                    className='exit'
                    src={exit}
                    alt='Sair'
                    onClick={() => handleExit()} />
            </div>
        </header>

    );
}

export default HeaderDashboard;