import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import './App.css';
import Header from './components/header/header';
import ItemCards from './components/cards/item-cards';
import ImageSlider from './components/imageSlider/image-slider';
import { Container } from '@material-ui/core';
import { useFetchDataQuery } from './features/data/data-api-slice';
import { addTypes } from './features/types/types-slice';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.value);
  const types = useAppSelector(state => state.types.value);

  const sliderFetch = useFetchDataQuery('slider');
  const typesFetch = useFetchDataQuery('types');

  if (!typesFetch.isFetching && typesFetch.isSuccess && types.length === 0) {
    dispatch(addTypes(typesFetch?.data));
  }
console.log(types)
  return (
    <div className={`App App-${theme}`} >
      <Header />
      <Container style={{position: 'relative'}}>
        {
          (!sliderFetch.isFetching && sliderFetch.isSuccess) ? 
            <ImageSlider 
              height={400} 
              background={true} 
              album={sliderFetch.data} 
              watermarkSize={50} 
              autoSlide={true} 
            /> 
            : 
            ''
        }
        {
          types.map(type =>
            <div key={type.id}>
              <h1>{type.name[0].toUpperCase() + type.name.slice(1)}</h1>
              <ItemCards path={type.id} />
              <hr></hr>
            </div>
          )
        }
      </Container>
    </div>
  );
}

export default App;
