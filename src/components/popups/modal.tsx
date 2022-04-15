import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { Close } from '@material-ui/icons';
import ItemForm from '../itemsList/items-form';
import ItemDetails from '../cards/item-details';

interface WoodModalProps {
    openCall: Function;
    actionCall: Function;
    open: boolean;
    modalTitle: string;
    modalMessage?: string;
    options: any;
    contentAlias?: any;
}

export default function WoodModal(props: WoodModalProps) {
    const theme = useAppSelector(state => state.theme.value);
    const handleClose = () => props.openCall(false);

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`wood-modal wood-modal-${theme}`}>
                <Box className="modal-wood-header-container">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.modalTitle}
                    </Typography>
                    <Button className={`button-${theme} modal-close-button`} onClick={handleClose}>
                        <Close />
                    </Button>
                </Box>
                <Box>{props.modalMessage}</Box>
                { 
                    (props.contentAlias === 'ItemForm') ? <ItemForm /> 
                    : ((props.contentAlias === 'ItemDetails') ? <ItemDetails options={props.options} /> : '')
                }
            </Box>
        </Modal>
    );
}