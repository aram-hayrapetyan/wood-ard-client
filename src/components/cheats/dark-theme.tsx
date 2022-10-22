import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changeTheme } from '../../features/themes/themes-slice';

const theme_dark: string[] = ['d', 'a', 'r', 'k', 't', 'h', 'e', 'm', 'e'];

function DarkTheme() {
    const dispatch = useAppDispatch();
    let workingArray: Array<string|void> = [];
    
    document.addEventListener('keydown', (e) => {
        if (!workingArray.length) workingArray = [...theme_dark];

        let first = workingArray[0];
        if (e.key === first){
            workingArray.shift();
        } else {
            if (workingArray.length !== theme_dark.length) workingArray = [...theme_dark];
        }

        if (!workingArray.length) {
            localStorage.setItem("woodArdTheme", 'dark');
            dispatch(changeTheme('dark'));
        }
    })

    return (<div />)
}

export default DarkTheme;