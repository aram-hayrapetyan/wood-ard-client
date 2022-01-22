import { Button, Paper } from '@material-ui/core';
import Cookies from 'js-cookie';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setToken } from '../../features/auth/token-slice';
import { useAddDataMutation } from '../../features/data/data-api-admin-slice';
import ItemsList from '../itemsList/items-list';

function Page() {
    const theme = useAppSelector(state => state.theme.value);
    const dispatch = useAppDispatch();

    function logout() {
        Cookies.remove('access_token');
        dispatch(setToken(null));
    }

    const [add, {data, isLoading}] = useAddDataMutation();

    function addItem() {
        add({ path: 'items', body: [{id: 1, message: 'hello'}] });
        if (!isLoading){
            console.log(data)
        }
    }

    return (
        <div id="admin_page" className={`page page-${theme}`}>
            <Button onClick={() => logout()}>Logout</Button>
            <Link to="items">Items</Link>
            <Routes>
                <Route path="/items" element={<ItemsList />}></Route>
            </Routes>
            Hello there
            <Paper>
                <Button onClick={() => addItem()}>Add</Button>
            </Paper>
        </div>
    )
}

export default Page;