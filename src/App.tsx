import React from 'react';
import { useAppSelector } from './app/hooks';
import './App.css';
import Header from './components/header/header';
import ItemCards from './components/cards/item-cards';
import ImageSlider from './components/imageSlider/image-slider';
import { Container } from '@material-ui/core';
import { useFetchDataQuery } from './features/data/data-api-slice';

function App() {
  const theme = useAppSelector(state => state.theme.value);

  const { data = [], isFetching, isSuccess } = useFetchDataQuery('slider');

  return (
    <div className={`App App-${theme}`} >
      <Header />
      <Container style={{position: 'relative'}}>
        {(!isFetching && isSuccess) ? <ImageSlider height={400} background={true} album={data} watermarkSize={50} autoSlide={true} /> : ''}
        <h1>Woodoo</h1>
        <ItemCards path="new" />
        <hr></hr>
        <h1>Woodoo</h1>
        <ItemCards path="new" />
      </Container>
    </div>
  );
}

export default App;
