import React from 'react';
import Cookies from 'js-cookie';
import { Button, IconButton, Menu, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setToken } from '../../features/auth/token-slice';
import './admin-page.css';
import ItemsList from '../itemsList/items-list';
import SliderList from '../sliderList/slider-list';
import TypesList from '../typesList/types-list';
import NotFound from '../../404';
import { MenuBook } from '@material-ui/icons';

function AdminPage() {
    const theme = useAppSelector(state => state.theme.value);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <Tabs className={`tabs tabs-${theme} tabs-menu-large`} onChange={handleTabChange}>
                <Tab label="Items" value="toItems" />
                <Tab label="Slider" value="toSlider" />
                <Tab label="Types" value="toTypes" />
            </Tabs>

            <div className={`tabs-menu-mobile`}>
                <IconButton
                    className={`button-${theme} tab-menu-button`}
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuBook />
                </IconButton>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={(e: any) => {handleTabChange(e, 'toItems'); handleClose();}}>Items</MenuItem>
                    <MenuItem onClick={(e: any) => {handleTabChange(e, 'toSlider'); handleClose();}}>Slider</MenuItem>
                    <MenuItem onClick={(e: any) => {handleTabChange(e, 'toTypes'); handleClose();}}>Types</MenuItem>
                </Menu>
                </div>
            
            <Link id="toItems" to="items" hidden={true}>Items</Link>
            <Link id="toSlider" to="slider" hidden={true}>Slider</Link>
            <Link id="toTypes" to="types" hidden={true}>Types</Link>
            <Routes>
                <Route path="/"></Route>
                <Route path="/items" element={<ItemsList />}></Route>
                <Route path="/slider" element={<SliderList />}></Route>
                <Route path="/types" element={<TypesList />}></Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default AdminPage;