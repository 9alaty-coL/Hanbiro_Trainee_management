import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom'

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage'
import LogoutPage from './pages/LogoutPage';
import InternsPage from './pages/InternsPage';
import InternDetailPage from './pages/InternDetailPage';

import AuthContext from './context/AuthContext'
import { useContext } from 'react';

function App() {
  const authContext = useContext(AuthContext)
  return (
    <Routes>
      {authContext.isLoggedIn && <Route path='/' element={<HomePage />} />}
      {authContext.isLoggedIn && <Route path='/logout' element={<LogoutPage />} />}
      {authContext.isLoggedIn && <Route path='/interns' element={<InternsPage />} >
        <Route path=':internId' element={<InternDetailPage />} />
      </Route>}
      {!authContext.isLoggedIn && <Route path='/auth' element={<AuthPage />} />}
      <Route path="*" element={<Navigate replace to={`${authContext.isLoggedIn ? '/' : '/auth'}`} />} />
    </Routes>
  );
}

export default App;
