import React, { useEffect, useRef, useState } from 'react';
import { Button, Tooltip, Typography } from '@material-ui/core';
import Sortable, { SortableEvent } from 'sortablejs';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import './slider-list.css'
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { addSlider } from '../../features/slider/slider-slice';
import { Close } from '@material-ui/icons';
import { useAddDataMutation, useDeleteDataMutation } from '../../features/data/data-api-admin-slice';

export default function ItemsList() {
    let emptyArr: any[] = [];
    let empty: any = null;

    const dispatch = useDispatch();
    const theme = useAppSelector(state => state.theme.value);
    const slider = useAppSelector(state => state.slider.value);
    const [ deleteData ] = useDeleteDataMutation();
    const [ addData ] = useAddDataMutation();
    const { data = [], isFetching, isSuccess } = useFetchDataQuery('slider?thumbnail=true');

    const sorted: React.MutableRefObject<any[]> = useRef(emptyArr);
    const [ sliderImage, setSliderImage ] = useState(empty);

    if (!isFetching && isSuccess && slider.length === 0) {
      dispatch(addSlider(data));
    }

    useEffect(() => {
      let el = document.getElementById('woodSortable');
      if (el){
        Sortable.create(el, {
          animation: 150,
          handle: '.slider-image',
          forceFallback: true,
          onEnd: function(event: SortableEvent) {
            let sorted_data: any[] = Array.from(event.from.children).map((child: Element, i: number) => {
              return { id: child.getAttribute('data-id'), order: i + 1 };
            })
            sorted.current = sorted_data;
          }
        });
      }
    }, slider);

    function saveOrder() {
      if (sorted.current.length) {
        addData({ path: 'slider/order', body: sorted.current })
          .then((res: any) => {
            let { data } = res.data;
            dispatch(addSlider(data));
          })
          .catch((res: any) => {
              let error = res.error;
              console.error(error);
          });
      }
    }
    
    function handleImageDelete(event: any, slider_id: number) {
      deleteData({ path: `slider/${slider_id}` })
          .then((res: any) => {
              let { data } = res.data;
              dispatch(addSlider(data));
          })
          .catch((res: any) => {
              let error = res.error;
              console.error(error);
          });
    }

    function handleAddImages(file: File) {
      setSliderImage(file)
    }

    function uploadSliderImage(e: any) {
      e.preventDefault();
      
      const formData = new FormData();

      if (sliderImage.length) {
        formData.append(`file`, sliderImage[0]);

        addData({ path: 'slider', body: formData })
          .then((res: any) => {
            let { data } = res.data;
            dispatch(addSlider(data));
            setSliderImage(empty);
          })
          .catch((res: any) => {
              let error = res.error;
              console.error(error);
          });

      }
    }

    return (
        <div>
          <div className="slider-list-actions">
              <Button className={`button-${theme}`} onClick={uploadSliderImage}>Save Image</Button>
              <Button className={`button-${theme}`}>
                Upload Image
                <input
                    className="in-button-input"
                    required
                    type="file"
                    id="item_itage_id"
                    onChange={(e: any) => handleAddImages(e.target.files)}
                />
              </Button>
              <Typography>Grab the image and slide trough the list to change the image order for General Slider.</Typography>
              <Button className={`button-${theme}`} onClick={saveOrder}>Save Order</Button>
          </div>
          <div id="woodSortable" className="slider-list">
            {slider.map(s => <Tooltip key={s.id} title="Grab and move" dir='top'>
              <div className="slider-image" data-id={s.id} data-order={s.order}
                style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/${s.image})` }}
              >
                <Tooltip title="Remove Image">
                  <Close className={`slider-album-image-icon slider-album-image-remove button-reverse-${theme}`} onClick={(e) => handleImageDelete(e, s.id)} />
                </Tooltip>
              </div>
            </Tooltip>)}
          </div>
        </div>
      );
}