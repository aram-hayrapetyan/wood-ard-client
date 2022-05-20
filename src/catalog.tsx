import React from 'react';
import { useAppSelector } from './app/hooks';
import './App.css';
import Header from './components/header/header';
import { Container } from '@material-ui/core';

function Catalog() {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className={`App App-${theme}`} >
      <Header />
      <Container style={{position: 'relative'}}>
        
      </Container>
    </div>
  );
}

export default Catalog;
