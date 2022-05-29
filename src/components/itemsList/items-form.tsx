import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useAddDataMutation, useEditDataMutation } from '../../features/data/data-api-admin-slice';
import { useDispatch } from 'react-redux';
import { addItems } from '../../features/items/items-slice';
import './items-form.css';

const fields: string[] = ['name', 'material', 'type', 'details', 'price'];

const defaultItem: any = {name: '', material: '', type: '', details: '', price: null};

export default function ItemForm(props: any) {
    const dispatch = useDispatch();
    const [ addData ] = useAddDataMutation();
    const [ editData ] = useEditDataMutation();
    const theme = useAppSelector(state => state.theme.value);
    const items = useAppSelector(state => state.items.value);
    const types = useAppSelector(state => state.types.value);
    let working_item = Object.assign({}, defaultItem);

    if (props.options.itemId) {
        let edit_item = {...items.find(item => item.id === props.options.itemId)};
        if (edit_item) working_item = Object.assign({}, {
            name: edit_item.name,
            material: edit_item.material,
            type: edit_item.type,
            details: edit_item.details,
            price: edit_item.price
        });
    }

    const [sent, setSent] = useState(false);
    const [item, setItem] = useState(working_item);

    const setValue = (target: any) => {
        if (sent) setSent(false);
        setItem({...item, [target.name]: target.value});
    };
    
    const handleSaveItem = (e: any) => {
        e.preventDefault();
        if (!sent) setSent(true);

        for (let i in item) {
            if (i !== 'details' && !item[i]) return;
        }

        if (item.type) {
            let type_entity = types.find(type => type.name.toLowerCase() === item.type.toLowerCase());

            if (type_entity) item['type_id'] = type_entity.id;
        }

        if (props.options.itemId) {
            editData({ path: `items/${props.options.itemId}`, body: item })
                .then((res: any) => {
                    let { data } = res.data;
                    dispatch(addItems(data));
                })
                .catch((res: any) => {
                    let error = res.error;
                    console.error(error);
                });
        } else {
            addData({ path: 'items', body: item })
                .then((res: any) => {
                    let { data } = res.data;
                    dispatch(addItems(data));
                })
                .catch((res: any) => {
                    let error = res.error;
                    console.error(error);
                });
        }
    };

    return (
        <Box 
        className="item-modal-box-form" 
        component="form"
        >
            {fields.map((_: string, index: number) => (
                <TextField
                key={index}
                className={`text-field-${theme} item-modal-text-field`}
                margin="normal"
                required
                fullWidth
                error={(!item[_] && sent && _ !== 'details') ? true : false}
                type={_ === 'price' ? 'number' : 'text'}
                id={'item_' + _ + '_' + index}
                label={_.charAt(0).toUpperCase() + _.slice(1)}
                name={_}
                autoFocus
                variant="outlined"
                onChange={e => setValue(e.target)}
                value={item[_]}
                />
            ))}
            <Box className="modal-button-right MuiFormControl-fullWidth MuiFormControl-marginNormal">
                <Button className={`button-${theme}`} onClick={handleSaveItem}>Save Item</Button>
            </Box>
        </Box>
    );
}