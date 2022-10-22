import React, { useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './items-list.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ItemModal from './items-modal';
import ItemsImage from './items-image';
import { addItems } from '../../features/items/items-slice';
import { addTypes } from '../../features/types/types-slice';
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
    const types = useAppSelector(state => state.types.value);
    const itemsFetch = useFetchDataQuery('items');
    const typesFetch = useFetchDataQuery('types');

    if (!itemsFetch.isFetching && itemsFetch.isSuccess && items.length === 0) {
      dispatch(addItems(itemsFetch?.data));
    }

    if (!typesFetch.isFetching && typesFetch.isSuccess && types.length === 0) {
      dispatch(addTypes(typesFetch?.data));
    }

    const [open, setOpen] = useState(false);
    const album = useRef(imageArr);
    const itemID = useRef(0);

    function handleImageModal(item_id: number, item_album: Image[]) {
      itemID.current = item_id;
      album.current = item_album;
      setOpen(true);
    }

    return (
        <div className="items-paper">
          <ItemModal></ItemModal>
           {/* Table */}
           <div className="items-list-conatiner">
            {items.map(row => {
              return(
                <div className={`items-list-item items-list-item-${theme}`} key={row.id}>
                  <div className="item-image-container">
                    <Button 
                    className={`item-image-button-${theme} item-image-button`}
                    onClick={() => handleImageModal(row.id, row.album)}>
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
                options={{itemId: itemID.current, album: album.current}}
                contentAlias='ItemsImageModal'
            />
        </div>
      );
}