import React from 'react';

const hesoyam: string[] = ['h', 'e', 's', 'o', 'y', 'a', 'm'];
const hesoyam_info: string = `This is not GTA: San Andreas. If you have health issue, we highly recommend to visit a doctor.`;

function Hesoyam() {
    let workingArray: Array<string|void> = [];
    
    document.addEventListener('keydown', (e) => {
        if (!workingArray.length) workingArray = [...hesoyam];

        let first = workingArray[0];
        if (e.key === first){
            workingArray.shift();
        } else {
            if (workingArray.length !== hesoyam.length) workingArray = [...hesoyam];
        }

        if (!workingArray.length) {
            alert(hesoyam_info);
        }
    })

    return (<div />)
}

export default Hesoyam;