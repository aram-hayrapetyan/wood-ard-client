import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Edit } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export default function ItemsImage(attr: any) {
    const theme = useAppSelector(state => state.theme.value);
  
    return (
        <div className="item-image-button-container">
          <img width="75px" height="75px" src={`${process.env.REACT_APP_BASE_URL}/${attr.path}`} />
          <Tooltip title="Edit Item Album">
            <div className={`item-image-button-icon button-icon-${theme} ${theme === 'light' ? 'bg-light' : ''} transparency`}>
                <Edit/>
            </div>
          </Tooltip>
        </div>
    );
}