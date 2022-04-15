import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItems } from '../../features/items/items-slice';
import { Delete, Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import { useEditDataMutation, useDeleteDataMutation } from '../../features/data/data-api-admin-slice';
import WoodDialog from '../popups/dialog';
import WoodModal from '../popups/modal';

export default function ItemsActions(props: any) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.value);
    const [ editData, editStates ] = useEditDataMutation();
    const [ deleteData, deleteStates ] = useDeleteDataMutation();
    
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    function handleItemDeleteRestore(item_id: number, restore: boolean) {
      editData({ path: `items/${item_id}/${restore ? 'restore' : 'delete'}` })
            .then((res: any) => {
                let { data } = res.data;
                dispatch(addItems(data));
            })
            .catch((res: any) => {
                let error = res.error;
                console.error(error);
            });
    }

    function handleItemRemove({ itemId }: any) {
        let item_id = parseInt(itemId);
        deleteData({ path: `items/${item_id}` })
              .then((res: any) => {
                  let { data } = res.data;
                  dispatch(addItems(data));
              })
              .catch((res: any) => {
                  let error = res.error;
                  console.error(error);
              });
    }

    function handleItemEdit({ itemId }: any) {

    }

    const handleItemEditModal = () => setOpenEdit(true);
    const handleItemDeleteDialog = () => setOpenDelete(true);

    return (
        <Box>
            <Tooltip title={`This item is ${props.deleted ? 'in' : ''}visible`}>
                <IconButton className={`item-action-button button-${theme}`}>
                    {props.deleted ? 
                    <VisibilityOff onClick={() => handleItemDeleteRestore(props.itemId, true)} />
                    :
                    <Visibility onClick={() => handleItemDeleteRestore(props.itemId, false)} />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Item">
                <IconButton className={`item-action-button button-${theme}`}>
                    <Edit onClick={handleItemEditModal} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Item">
                <IconButton className={`item-action-button button-${theme}`}>
                    <Delete onClick={handleItemDeleteDialog} />
                </IconButton>
            </Tooltip>
            <WoodDialog 
                open={openDelete}
                openCall={setOpenDelete}
                actionCall={handleItemRemove}
                dialogTitle='Delete Item'
                dialogMessage='Item will be completely removed from the system. Are you sure you want to continue?'
                options={{itemId: props.itemId}}
            />
            <WoodModal
                open={openEdit}
                openCall={setOpenEdit}
                actionCall={handleItemEdit}
                modalTitle='Edit Item'
                modalMessage='Some message or description'
                options={{itemId: props.itemId}}
                contentAlias='ItemForm'
            />
        </Box>
      );
}