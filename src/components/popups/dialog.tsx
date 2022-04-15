import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';

interface WoodDialogProps {
    openCall: Function;
    actionCall: Function;
    open: boolean;
    dialogTitle: string;
    dialogMessage: string;
    options: any;
}

export default function WoodDialog(props: WoodDialogProps) {
    const theme = useAppSelector(state => state.theme.value);
    const handleClose = () => props.openCall(false);

    return (
        <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={`wood-dialog`}
        >
        <DialogTitle id="alert-dialog-title" className={`wood-dialog-${theme}`}>
            {props.dialogTitle}
        </DialogTitle>
        <DialogContent className={`wood-dialog-${theme}`}>
            <DialogContentText id="alert-dialog-description" className={`wood-dialog-${theme}`}>
                {props.dialogMessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions className={`wood-dialog-${theme}`}>
            <Button className={`button-${theme}`} onClick={handleClose}>No</Button>
            <Button className={`button-${theme}`} onClick={() => {props.actionCall(props.options)}} autoFocus>Yes</Button>
        </DialogActions>
        </Dialog>
    );
}