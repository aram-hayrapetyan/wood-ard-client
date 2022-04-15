import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useAddDataMutation } from '../../features/data/data-api-admin-slice';

const fields = ['name', 'material', 'type', 'size'];

const defaultItem: any = {name: '', material: '', type: '', size: ''};
let item: any = Object.assign({}, defaultItem);

export default function ItemForm() {
    const [ addData, {data, isLoading} ] = useAddDataMutation();
    const theme = useAppSelector(state => state.theme.value);

    const [sent, setSent] = useState(false);

    const setValue = (target: any) => {
        if (sent) setSent(false);
        item[target.name] = target.value;
    };
    
    const handleSaveItem = (e: any) => {
        e.preventDefault();
        if (!sent) setSent(true);
        for (let value of Object.values(item)) {
            if (!value) return;
        }
        addData({ path: 'items', body: item });
    };

    return (
        <Box 
        className="item-modal-box-form" 
        component="form"
        >
            {fields.map((_, index) => (
                <TextField
                key={index}
                className={`text-field-${theme} item-modal-text-field`}
                margin="normal"
                required
                fullWidth
                error={!item[_] && sent ? true : false}
                type="text"
                id={'item_' + _ + '_' + index}
                label={_.charAt(0).toUpperCase() + _.slice(1)}
                name={_}
                autoFocus
                variant="outlined"
                onChange={e => setValue(e.target)}
                />
            ))}
            <Box className="modal-button-right MuiFormControl-fullWidth MuiFormControl-marginNormal">
                <Button className={`button-${theme}`} onClick={handleSaveItem}>Save Item</Button>
            </Box>
        </Box>
    );
}