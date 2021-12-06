import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { amoutAdded } from './features/counter/counter-slice';
import './App.css';
import Header from './components/header/header';
import ItemCards from './components/cards/item-cards';

function App() {
  const theme = useAppSelector(state => state.theme.value);
  const count = useAppSelector((state) => state.counter.value);
  const language = useAppSelector((state) => state.language.value);
  const dispatch = useAppDispatch();

  function handleClick() {
    // dispatch(incremented());
    dispatch(amoutAdded(3));
  }

  return (
    <div className={`App App-${theme}`}>
      <Header></Header>
      <button onClick={handleClick}>
        count is: {count}
      </button>
      <button>{language}</button>
      <ItemCards path="new"></ItemCards>
    </div>
  );
}

export default App;
