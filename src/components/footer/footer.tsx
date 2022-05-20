import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './footer.css';

function Header() {
    const theme = useAppSelector(state => state.theme.value);

    return (
        <div></div>
    );
}

export default Header;