import React from 'react';
import { Box, Button, Modal, Typography } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { Close } from '@material-ui/icons';
import ItemForm from '../itemsList/items-form';
import ItemDetails from '../cards/item-details';
import ItemsImageModal from '../itemsList/items-image-modal';
import TypeForm from '../typesList/types-form';

interface WoodModalProps {
    openCall: Function;
    open: boolean;
    modalTitle: string;
    modalMessage?: string;
    options: any;
    contentAlias?: any;
    fullScreen?: boolean;
}

export default function WoodModal(props: WoodModalProps) {
    const theme = useAppSelector(state => state.theme.value);
    const handleClose = () => props.openCall(false);

    function contAlias(alias: string): JSX.Element|string {
        switch(alias) {
            case 'TypeForm':
                return <TypeForm options={props.options} openCall={props.openCall} /> ;
            case 'ItemForm':
                return <ItemForm options={props.options} openCall={props.openCall} /> ;
            case 'ItemDetails':
                return <ItemDetails options={props.options} openCall={props.openCall} /> ;
            case 'ItemsImageModal':
                return <ItemsImageModal options={props.options} openCall={props.openCall} />;
            default:
                return '';
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`wood-modal wood-modal-${theme} ${props.fullScreen ? 'wood-modal-full-screen' : ''}`}>
                <Box className="modal-wood-header-container">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.modalTitle}
                    </Typography>
                    <Button className={`button-icon-${theme} modal-close-button`} onClick={handleClose}>
                        <Close />
                    </Button>
                </Box>
                <Box>{props.modalMessage}</Box>
                { contAlias(props.contentAlias) }
            </Box>
        </Modal>
    );
}