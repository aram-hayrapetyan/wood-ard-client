import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './items-list.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ItemModal from './items-modal';
import ItemsImage from './items-image';
import { addItems } from '../../features/items/items-slice';
import ItemsActions from './item-action-buttons';
import WoodModal from '../popups/modal';

interface Image {
  id: number;
  image: string;
}

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
        <div className="items-paper">
          <ItemModal></ItemModal>
           {/* Table */}
           <div className="items-list-conatiner">
            {items.map((row, index) => {
              return(
                <div className={`items-list-item items-list-item-${theme}`}>
                  <div className="item-image-container">
                    <Button 
                    className={`item-image-button-${theme} item-image-button`}
                    onClick={() => handleImageModal(row.id, index)}>
                      <ItemsImage path={row.image} />
                    </Button> 
                  </div>
                  <div className="item-description-container">
                    <p>{`Name: ${row.name}`}</p>
                    <p>{`${row.type} made of ${row.material.split(', ').join(' and ')}`}</p>
                  </div>
                  <ItemsActions itemId={row.id} deleted={row.deleted} />
                </div>)
            })}
           </div>
          {/* Modal */}
          <WoodModal
                open={open}
                openCall={setOpen}
                modalTitle='Add New Images For Item'
                modalMessage=''
                options={{itemId: itemID, album}}
                contentAlias='ItemsImageModal'
            />
        </div>
      );
}