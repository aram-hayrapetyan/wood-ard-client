import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import './Admin.css';
import Header from './components/header/header';
import Page from './components/page/page';
import Login from './components/login/login';
import { setToken } from './features/auth/token-slice';
import Cookies from 'js-cookie';

function Admin() {
    const theme = useAppSelector(state => state.theme.value);
    const token = useAppSelector(state => state.token.value);
    const dispatch = useAppDispatch();
    let access_token = Cookies.get('access_token');

    if (!token) {
        if (access_token && access_token !== '') dispatch(setToken(access_token));
    }

    /* 
        Route specific/individual builds

        Redirect by condition tutorial

        
    */

    return (
        <div className={`Admin Admin-${theme}`}>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/page/*" element={<Page />} />
            </Routes>
        </div>
    )
}

export default Admin;