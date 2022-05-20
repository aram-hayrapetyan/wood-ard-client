import React from 'react';
import Cookies from 'js-cookie';
import { Button, Container, Tab, Tabs } from '@material-ui/core';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setToken } from '../../features/auth/token-slice';
import './page.css';
import ItemsList from '../itemsList/items-list';
import SliderList from '../sliderList/slider-list';
import NotFound from '../../404';

function Page() {
    const theme = useAppSelector(state => state.theme.value);
    const dispatch = useAppDispatch();

    function logout() {
        Cookies.remove('access_token');
        dispatch(setToken(null));
    }

    function handleTabChange(e: any, value: string) {
        document.getElementById(value)?.click();
    }

    return (
        <div id="admin_page" className={`page page-${theme}`}>
            <Button className={`button-logout button-reverse-${theme}`} onClick={logout}>Logout</Button>
            <Tabs className={`tabs tabs-${theme}`} onChange={handleTabChange}>
                <Tab label="Items" value="toItems" />
                <Tab label="Slider" value="toSlider" />
            </Tabs>
            
            <Link id="toItems" to="items" hidden={true}>Items</Link>
            <Link id="toSlider" to="slider" hidden={true}>Slider</Link>
            <Routes>
                <Route path="/"></Route>
                <Route path="/items" element={<ItemsList />}></Route>
                <Route path="/slider" element={<SliderList />}></Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Page;