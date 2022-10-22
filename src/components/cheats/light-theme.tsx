import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { changeTheme } from '../../features/themes/themes-slice';

const theme_loght: string[] = ['l', 'i', 'g', 'h', 't', 't', 'h', 'e', 'm', 'e'];

function LightTheme() {
    const dispatch = useAppDispatch();
    let workingArray: Array<string|void> = [];
    
    document.addEventListener('keydown', (e) => {
        if (!workingArray.length) workingArray = [...theme_loght];

        let first = workingArray[0];
        if (e.key === first){
            workingArray.shift();
        } else {
            if (workingArray.length !== theme_loght.length) workingArray = [...theme_loght];
        }

        if (!workingArray.length) {
            localStorage.setItem("woodArdTheme", 'light');
            dispatch(changeTheme('light'));
        }
    })

    return (<div />)
}

export default LightTheme;