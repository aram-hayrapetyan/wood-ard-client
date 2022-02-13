import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useAddDataMutation } from '../../features/data/data-api-admin-slice';
import { Close } from '@material-ui/icons';

const fields = ['name', 'material', 'type', 'size'];

const defaultItem: any = {name: '', material: '', type: '', size: ''};
let item: any = Object.assign({}, defaultItem);

export default function ItemModal() {
    const [ addData, {data, isLoading} ] = useAddDataMutation();
    const theme = useAppSelector(state => state.theme.value);

    const [sent, setSent] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {setOpen(true); setSent(false)};
    const handleClose = () => {setOpen(false); item = Object.assign({}, defaultItem)};

    const setValue = (target: any) => {
        if (sent) setSent(false);
        // if (target.name === 'image') {
        //     let img = target.files[0];
        //     let fr = new FileReader();
        //     fr.onload = () => {
        //         let img = document.getElementById(`previewImg`);
        //         if (img) img.setAttribute('src', `${fr.result}`);
        //     }
        //     fr.readAsDataURL(img);

        //     item[target.name] = target.files[0];
        // } else {
        item[target.name] = target.value;
        // }
    };
    const handleSaveItem = (e: any) => {
        e.preventDefault();
        if (!sent) setSent(true);
        for (let value of Object.values(item)) {
            if (!value) return;
        }
        addData({ path: 'items', body: item });
        setOpen(false);
    };

    return (
        <div>
        <Button variant='outlined' className={`button-${theme}`} onClick={handleOpen}>Add New Item</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="item-modal"
        >
            <Box className={`item-modal-box item-modal-box-${theme}`}>
                <Box className="model-item-header-container">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Item
                    </Typography>
                    <Button className={`button-${theme} modal-close-button`} onClick={handleClose}>
                        <Close />
                    </Button>
                </Box>
                <Box 
                className="item-modal-box-form" 
                component="form"
                >
                    {fields.map((_, index) => (
                        // _ === 'image' ?
                        // <div className="MuiFormControl-marginNormal">
                        //     <Button
                        //     className={`button-${theme} ${!item[_] && sent ? "button-error": ''}`}
                        //     variant="outlined"
                        //     component="label"
                        //     >
                        //     Upload Image
                        //     <input
                        //         key={index}
                        //         id={'item_' + _ + '_' + index}
                        //         type="file"
                        //         accept="image/png, image/gif, image/jpeg"
                        //         onChange={e => setValue(e.target)}
                        //         name={_}
                        //         hidden
                        //     />
                        //     </Button>
                        //     <img id="previewImg" src="noimage" />
                        // </div>
                        // :
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
            </Box>
        </Modal>
        </div>
    );
}