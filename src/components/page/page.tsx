import { Button, Paper } from '@material-ui/core';
import Cookies from 'js-cookie';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setToken } from '../../features/auth/token-slice';
import ItemsList from '../itemsList/items-list';

function Page() {
    const theme = useAppSelector(state => state.theme.value);
    const dispatch = useAppDispatch();

    function logout() {
        Cookies.remove('access_token');
        dispatch(setToken(null));
    }

    return (
        <div id="admin_page" className={`page page-${theme}`}>
            <Button onClick={() => logout()}>Logout</Button>
            <Link to="items">Items</Link>
            <Routes>
                <Route path="/items" element={<ItemsList />}></Route>
            </Routes>
        </div>
    )
}

export default Page;