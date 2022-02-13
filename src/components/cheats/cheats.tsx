import React from 'react';
import Hesoyam from './hesoyam';
import ILoveYou from './iloveyou';
import Konami from './konami';
import DarkTheme from './dark-theme';
import LightTheme from './light-theme';

function Cheats() {
    return (
    <div>
        <Konami />
        <ILoveYou />
        <Hesoyam />
        <DarkTheme />
        <LightTheme />
    </div>
    )
}

export default Cheats;