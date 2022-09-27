import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './catalog-page.css';
import { Container, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import { addItems } from '../../features/items/items-slice';
import { addTypes } from '../../features/types/types-slice';
import ItemCatalogCard from '../cards/item-catalog-card';

function CatalogPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.value);
  const items = useAppSelector(state => state.items.value);
  const types = useAppSelector(state => state.types.value);

  const [ typeSelect, setTypeSelect ] = useState(-1);

  const itemsFetch = useFetchDataQuery(`items/public?type=${typeSelect}`);
  const typesFetch = useFetchDataQuery('types');

  let sessionType = sessionStorage.getItem("woodArdCatalogType");

  if (sessionType && typeSelect !== parseInt(sessionType)) {
    setTypeSelect(parseInt(sessionType));
  } else if (!sessionType) {
    sessionStorage.setItem("woodArdCatalogType", '-1');
  }

  if (!itemsFetch.isFetching && itemsFetch.isSuccess && items.length === 0) {
    dispatch(addItems(itemsFetch?.data));
  }

  if (!typesFetch.isFetching && typesFetch.isSuccess && types.length === 0) {
    dispatch(addTypes(typesFetch?.data));
  }

  function handleChange(e: any) {
    dispatch(addItems([]));
    setTypeSelect(e.target.value)
    sessionStorage.setItem("woodArdCatalogType", `${e.target.value}`);
  }

  return (
    <div className={`Catalog Catalog-${theme}`} >
      <Container style={{position: 'relative'}}>
        <div className={`type-select-container select-${theme}`}>
          <InputLabel id="type-select-filled-label">Types</InputLabel>
          <Select
            className={`type-select`}
            labelId="type-select-filled-label"
            id="type-select-filled"
            value={typeSelect}
            onChange={handleChange}
          >
            <MenuItem value={-1} selected>All</MenuItem>
            {types.map(type => <MenuItem key={type.id} value={type.id}>{type.name[0].toUpperCase() + type.name.slice(1)}</MenuItem>)}
            <MenuItem value={0}>Rest</MenuItem>
          </Select>
        </div>
        <div className='catalog-card-container'>
          {items?.map(item => <ItemCatalogCard key={item.id} item={item} />)}
        </div>
      </Container>
    </div>
  );
}

export default CatalogPage;
