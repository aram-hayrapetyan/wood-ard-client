import React from 'react';
import { AppBar, Toolbar, FormGroup, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem, Container } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeLanguage } from '../../features/language/language-slice';
import { changeTheme } from '../../features/themes/themes-slice';
import './header.css';

function Header() {
    const theme = useAppSelector(state => state.theme.value);
    const language = useAppSelector(state => state.language.value);

    const dispatch = useAppDispatch();

    let localTheme = localStorage.getItem("woodArdTheme");
    let localLanguage = localStorage.getItem("woodArdLangage");

    if (localTheme) {
        dispatch(changeTheme(localTheme));
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
            let isDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            handleThemeChange(isDark);
        }
    }

    if (localLanguage) {
        dispatch(changeLanguage(localLanguage));
    } else {
        fetch('https://ipapi.co/json/')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                handleLanguageSwap(data.country_code_iso3);
            });
    }

    function handleLanguageSwap(value: string) {
        dispatch(changeLanguage(value));
        localStorage.setItem("woodArdLangage", value);
    }

    function handleThemeChange(checked: boolean) {
        dispatch(changeTheme(checked ? 'dark' : 'light'));
        localStorage.setItem("woodArdTheme", checked ? 'dark' : 'light');
    }

    return (
        <AppBar position='static' color='inherit' tabIndex={0} className={'AppBar-custom-' + theme}>
            <Container style={{position: 'relative'}}>
                <Toolbar variant="dense">
                    <FormGroup>
                        <FormControlLabel
                        control={
                            <Switch
                            color='default'
                            checked={theme === 'dark'}
                            onChange={(e: any) => handleThemeChange(e.target.checked)}
                            aria-label={"Theme switch, " + theme}
                            />
                        }
                        label=''
                        />
                    </FormGroup>
                    <FormControl>
                        <InputLabel id="lang-select-label">Language</InputLabel>
                        <Select labelId='lang-select-label' value={language} aria-label={language} onChange={(e: any) => handleLanguageSwap(e.target.value)}>
                            <MenuItem value='ENG'>ENG</MenuItem>
                            <MenuItem value='ARM'>ARM</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;