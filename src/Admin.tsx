import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import './Admin.css';
import Header from './components/header/header';
import { setToken } from './features/auth/token-slice';
import Cookies from 'js-cookie';
import { Container } from '@material-ui/core';
import NotFound from './404';
const loadable = require('@loadable/component');

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
    const Login = loadable.default(() => import('./components/login/login'));
    const Page = loadable.default(() => import('./components/page/page'));

    return (
        <div className={`Admin Admin-${theme}`}>
            <Header />
            <Container style={{position: 'relative'}}>
                <Routes>
                    <Route path="/login" element={(access_token || token) ? <Navigate to='../page' /> : <Login />} />
                    <Route path="/page/*" element={(access_token || token) ? <Page /> : <Navigate to='../login' />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Container>
        </div>
    )
}

export default Admin;