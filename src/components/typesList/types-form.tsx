import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useAddDataMutation, useEditDataMutation } from '../../features/data/data-api-admin-slice';
import { useDispatch } from 'react-redux';
import { addTypes } from '../../features/types/types-slice';
import './types-form.css';

const fields_add: string[] = ['name', 'description'];
const fields_edit: string[] = ['description'];

const defaultType: any = {name: '', description: null};

export default function TypeForm(props: any) {
    const dispatch = useDispatch();
    const [ addData ] = useAddDataMutation();
    const [ editData ] = useEditDataMutation();
    const theme = useAppSelector(state => state.theme.value);
    const types = useAppSelector(state => state.types.value);
    let working_type = Object.assign({}, defaultType);

    if (props.options.typeId) {
        let edit_type = {...types.find(type => type.id === props.options.typeId)};
        if (edit_type) working_type = Object.assign({}, {
            name: edit_type.name,
            description: edit_type.description,
        });
    }

    const [sent, setSent] = useState(false);
    const [type, setType] = useState(working_type);

    const setValue = (target: any) => {
        if (sent) setSent(false);
        setType({...type, [target.name]: target.value});
    };
    
    const handleSaveType = (e: any) => {
        e.preventDefault();
        if (!sent) setSent(true);

        for (let i in type) {
            if (i !== 'description' && !type[i]) return;
        }

        if (props.options.typeId) {
            editData({ path: `types/${props.options.typeId}`, body: type })
                .then((res: any) => {
                    let { data } = res.data;
                    dispatch(addTypes(data));
                })
                .catch((res: any) => {
                    let error = res.error;
                    console.error(error);
                });
        } else {
            addData({ path: 'types', body: type })
                .then((res: any) => {
                    let { data } = res.data;
                    dispatch(addTypes(data));
                })
                .catch((res: any) => {
                    let error = res.error;
                    console.error(error);
                });
        }
    };

    return (
        <Box 
        className="type-modal-box-form" 
        component="form"
        >
            {(props.options.typeId ? fields_edit : fields_add).map((_: string, index: number) => (
                <TextField
                key={index}
                className={`text-field-${theme} type-modal-text-field`}
                margin="normal"
                required
                fullWidth
                error={(!type[_] && sent && _ !== 'description') ? true : false}
                type="text"
                id={'type_' + _ + '_' + index}
                label={_.charAt(0).toUpperCase() + _.slice(1)}
                name={_}
                autoFocus
                variant="outlined"
                onChange={e => setValue(e.target)}
                value={type[_]}
                />
            ))}
            <Box className="modal-button-right MuiFormControl-fullWidth MuiFormControl-marginNormal">
                <Button className={`button-${theme}`} onClick={handleSaveType}>Save Type</Button>
            </Box>
        </Box>
    );
}