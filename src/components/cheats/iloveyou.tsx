import React from 'react';

const iloveyou: string[] = ['i', 'l', 'o', 'v', 'e', 'y', 'o', 'u'];
const iloveyou_info: string = `I'm sorry. You are so nice. But I'm a web application. This isn't going to work for us.`;

function ILoveYou() {
    let workingArray: Array<string|void> = [];
    
    document.addEventListener('keydown', (e) => {
        if (!workingArray.length) workingArray = [...iloveyou];

        if (e.key === workingArray[0]){
            workingArray.shift();
        } else {
            if (workingArray.length !== iloveyou.length) workingArray = [...iloveyou];
        }

        if (!workingArray.length) {
            alert(iloveyou_info);
        }
    })

    return (<div />)
}

export default ILoveYou;