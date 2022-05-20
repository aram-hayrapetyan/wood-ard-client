import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import WoodModal from '../popups/modal';

export default function ItemModal() {
    const theme = useAppSelector(state => state.theme.value);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {setOpen(true)};

    return (
        <div style={{marginBottom: '5px'}}>
        <Button className={`button-${theme}`} onClick={handleOpen}>Add New Item</Button>
        <WoodModal
            open={open}
            openCall={setOpen}
            modalTitle='Add New Item'
            modalMessage=''
            options={{}}
            contentAlias='ItemForm'
        />
        </div>
    );
}