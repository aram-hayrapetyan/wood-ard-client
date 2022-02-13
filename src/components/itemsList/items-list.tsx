import React, { useState } from 'react';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './items-list.css'
import { useAppSelector } from '../../app/hooks';
import ItemModal from './items-modal';
import { Close, Edit } from '@material-ui/icons';
import { useAddDataMutation } from '../../features/data/data-api-admin-slice';

interface Column {
    id: 'type' | 'material' | 'name' | 'size' | 'image';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'image',  label: 'Image',  minWidth: 75 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'material', label: 'Material', minWidth: 100 },
    { id: 'type', label: 'Type', minWidth: 100, align: 'right' },
    { id: 'size',  label: 'Size',  minWidth: 100,  align: 'right' },
  ];

export default function ItemsList() {
    const theme = useAppSelector(state => state.theme.value);
    const { data = [], isFetching, isSuccess } = useFetchDataQuery('items');
    const [ addData, {isLoading} ] = useAddDataMutation();

    const [open, setOpen] = useState(false);
    const [imageItemID, setImageItemID] = useState(0);
    const [imageItem, setImageItem] = useState('');

    const handleClose = () => { setOpen(false); setImageItem('') };

    function handleImageModal(item_id: number) {
      setImageItemID(item_id);
      setOpen(true);
    }

    function uploadItemImage(e: any) {
      e.preventDefault();
      if (imageItem) {
        const formData = new FormData();
        formData.append('file', imageItem);
        addData({ path: `items/${imageItemID}/image`, body: formData });
      }
    }

    return (
        <Paper className="items-paper">
          <ItemModal></ItemModal>
          <TableContainer className="items-table-conatiner">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className={`table-header table-header-${theme}`}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess && data.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell className={`table-cell table-cell-${theme}`} key={column.id} align={column.align}>
                              {column.id === 'image' ? 
                                <Button 
                                className={`item-image-button-${theme} item-image-button`}
                                onClick={() => handleImageModal(row.id)}>
                                  <AdminImage path={value} />
                                </Button> 
                                : 
                                value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
                    <TextField
                        className={`text-field-${theme}`}
                        margin="normal"
                        required
                        fullWidth
                        type="file"
                        id="item_itage_id"
                        label="Item Image"
                        autoFocus
                        variant="outlined"
                        onChange={(e: any) => setImageItem(e.target.files[0])}
                        />
                      <Button className={`button-${theme}`} onClick={uploadItemImage}>Save Item Image</Button>
                  </Box>
              </Box>
          </Modal>
        </Paper>
      );
}

function AdminImage(attr: any) {
  const theme = useAppSelector(state => state.theme.value);

  return (
      <div className="item-image-button-container">
        <img width="75px" height="75px" src={`${process.env.REACT_APP_BASE_URL}/${attr.path}`} />
        <div className={`item-image-button-icon button-${theme} transparency`}>
            <Edit/>
        </div>
      </div>
  );
}