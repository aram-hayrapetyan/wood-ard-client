import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './items-list.css'
import { useAppSelector } from '../../app/hooks';

interface Column {
    id: 'type' | 'material' | 'name' | 'size' | 'image';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'material', label: 'Material', minWidth: 100 },
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'size',
      label: 'Size',
      minWidth: 170,
      align: 'right',
    }
  ];

export default function ItemsList() {
    const theme = useAppSelector(state => state.theme.value);
    const { data = [], isFetching } = useFetchDataQuery('items');
    return (
        <Paper className="items-paper">
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
                {data.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell className={`table-cell table-cell-${theme}`} key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
}