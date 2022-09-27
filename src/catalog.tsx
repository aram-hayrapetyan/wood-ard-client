import React from 'react';
import { useAppSelector } from './app/hooks';
import './catalog.css';
import Header from './components/header/header';
import { Link, Routes, Route } from 'react-router-dom';
import CatalogPage from './components/page/catalog-page';
import ItemPage from './components/page/item-page';

function Catalog() {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className={`Catalog Catalog-${theme}`} >
      <Header />
      <Link id="toCatalog" to="" >Catalog</Link>
      <Routes>
          <Route path="/" element={<CatalogPage />}></Route>
          <Route path="/item/:item_id" element={<ItemPage />}></Route>
      </Routes>
    </div>
  );
}

export default Catalog;
