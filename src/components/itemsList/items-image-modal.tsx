import React, { useState } from 'react';
import { Box, Button, Tooltip } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAddDataMutation, useDeleteDataMutation } from '../../features/data/data-api-admin-slice';
import { Check, Close } from '@material-ui/icons';
import { addItems } from '../../features/items/items-slice';

export default function ItemsImageModal(props: any) {
    let empty: any;
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.value);
    const [ addData ] = useAddDataMutation();
    const [ deleteData ] = useDeleteDataMutation();

    const handleClose = () => props.openCall(false);

    const [images, setImageItem] = useState(empty);

    function handleAddImages(files: FileList) {
            let fileArr = Array.from(files);
            setImageItem(fileArr)
            // fileArr = fileArr.filter((a, i) => i != 0);
            // console.log(fileArr)
            let container = document.getElementById(`itemImagePreview`);
            for (let i = 0; i < files.length; i++) {
                let img = files[i];
                let fr = new FileReader();
                fr.onload = () => {
                    if (container) {
                        let img = document.createElement('img');
                        img.setAttribute('src', `${fr.result}`);
                        img.setAttribute('width', '75px');
                        img.setAttribute('height', '75px');
                        img.setAttribute('image_index', i + '');
                        img.setAttribute('alt', 'Click on image to remove from preview list.');
                        img.style.margin = '5px';
                        
                        container.appendChild(img);
                    }
                }
                fr.readAsDataURL(img);
            }
    }

    function handleImageDelete(event: any, image_id: number) {
        deleteData({ path: `items/image/${image_id}` })
            .then((res: any) => {
                let { data } = res.data;
                dispatch(addItems(data));
                event.target.closest('.item-album-images').remove()
            })
            .catch((res: any) => {
                let error = res.error;
                console.error(error);
            });
    }

    function handleImageGeneral(item_id: number, image_id: number) {
        addData({ path: `items/${item_id}/image/${image_id}`})
            .then((res: any) => {
                let { data } = res.data;
                dispatch(addItems(data));
            })
            .catch((res: any) => {
                let error = res.error;
                console.error(error);
            });
    }

    function uploadItemImage(e: any) {
      e.preventDefault();
      
      const formData = new FormData();

      if (images.length) {
        for (let i = 0; i < images.length||0; i ++) {
          formData.append(`files`, images[i]);
        }

        addData({ path: `items/${props.options.itemId}/image`, body: formData })
            .then((res: any) => {
                let { data } = res.data;
                dispatch(addItems(data));
                handleClose();
            })
            .catch((res: any) => {
                let error = res.error;
                console.error(error);
            });
      }

    }

    return (
        <Box 
        className="item-modal-box-form" 
        component="form"
        >
            <Box>
                {props.options.album?.map((image: any) => <div className='item-album-images'>
                    <img className='' key={`album_${image.id}`} width="75px" height="75px" src={`${process.env.REACT_APP_BASE_URL}/${image.image}`} alt=''/>
                    <Tooltip title="Remove Image from Item Album">
                        <Close className={`item-album-image-icon item-album-image-remove button-reverse-${theme}`} onClick={(e) => handleImageDelete(e, image.id)} />
                    </Tooltip>
                    <Tooltip title="Set Image as Item General">
                        <Check className={`item-album-image-icon item-album-image-general button-reverse-${theme}`} onClick={() => handleImageGeneral(props.options.itemId, image.id)} />
                    </Tooltip>
                </div>)}
            </Box>
            <hr />
            <Box id='itemImagePreview'>
            </Box>
            <div>
                <Button className={`button-${theme}`}>
                Upload Images
                <input
                    className="in-button-input"
                    required
                    type="file"
                    id="item_itage_id"
                    multiple={true}
                    onChange={(e: any) => handleAddImages(e.target.files)}
                />
                </Button>
                <Button className={`button-${theme}`} style={{marginLeft: '5px'}} onClick={uploadItemImage}>Save Item Image</Button>
            </div>
        </Box>
    );
}
