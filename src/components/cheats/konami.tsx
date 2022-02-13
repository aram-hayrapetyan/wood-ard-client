import React from 'react';

const konami: string[] = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const konami_info: string = `Up, Up, Down, Down, Left, Right, Left, Right, B, A. It's called the Konami Code, and it often meant the difference between life and death in a video game back in the 1980s. Perform those button presses in the right sequence, and you'll unlock cheats that help you win. And yes... you're a Cheater!!!`;

function Konami() {
    let workingArray: Array<string|void> = [];
    
    document.addEventListener('keydown', (e) => {
        if (!workingArray.length) workingArray = [...konami];

        if (e.key === workingArray[0]){
            workingArray.shift();
        } else {
            if (workingArray.length !== konami.length) workingArray = [...konami];
        }

        if (!workingArray.length) {
            alert(konami_info);
        }
    })

    return (<div />)
}

export default Konami;