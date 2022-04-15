import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './items-list.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ItemModal from './items-modal';
import ItemsImage from './items-image';
import ItemsImageModal from './items-image-modal';
import { addItems } from '../../features/items/items-slice';
import ItemsActions from './item-action-buttons';

interface Column {
  id: 'type' | 'material' | 'name' | 'size' | 'image' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

interface Image {
  id: number;
  image: string;
}
  
const columns: readonly Column[] = [
  { id: 'image',  label: 'Image',  minWidth: 75 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'material', label: 'Material', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100, align: 'right' },
  { id: 'size',  label: 'Size',  minWidth: 100,  align: 'right' },
  { id: 'actions',  label: 'Actions',  minWidth: 34,  align: 'center' },
];

export default function ItemsList() {
    let imageArr: Image[] = [];
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.value);
    const items = useAppSelector(state => state.items.value);
    const { data = [], isFetching, isSuccess } = useFetchDataQuery('items');

    if (!isFetching && isSuccess && items.length === 0) {
      dispatch(addItems(data));
    }

    const [album = [], setAlbum] = useState(imageArr);
    const [open, setOpen] = useState(false);
    const [itemID, setitemID] = useState(0);

    function handleImageModal(item_id: number, index: number) {
      setAlbum(items[index].album);
      setitemID(item_id);
      setOpen(true);
    }

    return (
        <Paper className="items-paper">
          <ItemModal></ItemModal>
           {/* Table */}
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
                {items.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          return (
                            <TableCell className={`table-cell table-cell-${theme}`} key={column.id} align={column.align}>
                              {column.id === 'image' ? 
                                <Button 
                                className={`item-image-button-${theme} item-image-button`}
                                onClick={() => handleImageModal(row.id, index)}>
                                  <ItemsImage path={row[column.id]} />
                                </Button> 
                                : 
                                ( column.id === 'actions' ?
                                  <ItemsActions itemId={row.id} deleted={row.deleted} />
                                  : 
                                  row[column.id])}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Modal */}
          <ItemsImageModal open={open} openCall={setOpen} album={album} itemId={itemID} />
        </Paper>
      );
}