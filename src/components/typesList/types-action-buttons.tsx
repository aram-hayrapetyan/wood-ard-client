import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useDeleteDataMutation } from '../../features/data/data-api-admin-slice';
import { useDispatch } from 'react-redux';
import { addTypes } from '../../features/types/types-slice';
import './types-list.css';
import { Delete, Edit } from '@material-ui/icons';
import WoodDialog from '../popups/dialog';
import WoodModal from '../popups/modal';

export default function TypesActionButtons(props: any) {
    const dispatch = useDispatch();
    const [ deleteData ] = useDeleteDataMutation();
    const theme = useAppSelector(state => state.theme.value);
    
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    function handleTypeRemove({ typeId }: any) {
        let type_id = parseInt(typeId);
        deleteData({ path: `types/${type_id}` })
              .then((res: any) => {
                  let { data } = res.data;
                  dispatch(addTypes(data));
              })
              .catch((res: any) => {
                  let error = res.error;
                  console.error(error);
              });
    }

    const handleTypeEditModal = () => setOpenEdit(true);
    const handleTypeDeleteDialog = () => setOpenDelete(true);

    return (
        <div>
            <Tooltip title="Edit Type">
                <IconButton className={`type-action-button button-icon-${theme}`}>
                    <Edit onClick={handleTypeEditModal} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Type">
                <IconButton className={`type-action-button button-icon-${theme}`}>
                    <Delete onClick={handleTypeDeleteDialog} />
                </IconButton>
            </Tooltip>

            <WoodDialog
                open={openDelete}
                openCall={setOpenDelete}
                actionCall={handleTypeRemove}
                dialogTitle='Delete Type'
                dialogMessage='Type will be completely removed from the system. Are you sure you want to continue?'
                options={{typeId: props.typeId}}
            />
            <WoodModal
                open={openEdit}
                openCall={setOpenEdit}
                modalTitle='Edit Type'
                modalMessage='Some message or description'
                options={{typeId: props.typeId}}
                contentAlias='TypeForm'
            />
        </div>
    );
}