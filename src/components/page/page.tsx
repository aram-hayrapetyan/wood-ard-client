import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import ItemsList from '../itemsList/items-list';

function Page() {
    const theme = useAppSelector(state => state.theme.value);
    const token = useAppSelector(state => state.token.value);

    return (
        <div id="admin_page" className={`page page-${theme}`}>
        { !token ? <Navigate to="../login" /> : 
            <Routes>
                <Route path="/items" element={<ItemsList />}></Route>
            </Routes> 
        }
            Hello there
        </div>
    )
}

export default Page;