import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import { getItem } from '../utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login />}>
                <Route path='/login' element={<Login />} />
            </Route>
            <Route path='/cadastrar' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<Main />} />
            </Route>
        </Routes>
    );
}

export default MainRoutes;