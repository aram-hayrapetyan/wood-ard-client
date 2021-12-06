import { AppBar, Toolbar, FormGroup, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeLanguage } from '../../features/language/language-slice';
import { changeTheme } from '../../features/themes/themes-slice';
import './header.css';

function Header() {
    const theme = useAppSelector(state => state.theme.value);
    const language = useAppSelector(state => state.language.value);

    const dispatch = useAppDispatch();

    function handleLanguageSwap(e: any) {
        dispatch(changeLanguage(e.target.value));
    }

    function handleThemeChange(e: any) {
        dispatch(changeTheme(e.target.checked ? 'dark' : 'light'));
    }

    return (
        <AppBar position='static' color='inherit' tabIndex={0} className={'AppBar-custom-' + theme}>
            <Toolbar variant="dense">
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        color='default'
                        checked={theme === 'dark'}
                        onChange={handleThemeChange}
                        aria-label={"Theme switch, " + theme}
                        />
                    }
                    label=''
                    />
                </FormGroup>
                <FormControl>
                    <InputLabel id="lang-select-label">Language</InputLabel>
                    <Select labelId='lang-select-label' value={language} aria-label={language} onChange={handleLanguageSwap}>
                        <MenuItem value='eng'>eng</MenuItem>
                        <MenuItem value='arm'>arm</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
    );
}

export default Header;