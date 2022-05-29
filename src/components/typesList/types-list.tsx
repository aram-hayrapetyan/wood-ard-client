import React from 'react';
import { Tooltip } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { addTypes } from '../../features/types/types-slice';
import './types-list.css';
import { useFetchDataQuery } from '../../features/data/data-api-slice';
import TypesActionButtons from './types-action-buttons';
import TypeModal from './types-modal';

export default function TypesList(props: any) {
    const dispatch = useDispatch();
    const theme = useAppSelector(state => state.theme.value);
    const types = useAppSelector(state => state.types.value);
    
    const typesFetch = useFetchDataQuery('types');

    if (!typesFetch.isFetching && typesFetch.isSuccess && types.length === 0) {
        dispatch(addTypes(typesFetch?.data));
    }

    return (
        <div>
            <TypeModal></TypeModal>
            <div className='types-list'>
                {types.map(type => <Tooltip title={type.description} placement="top">
                    <div className={`type-unit type-unit-${theme}`}>
                        <span>{type.name}</span>
                        <TypesActionButtons typeId={type.id} />
                    </div>
                </Tooltip>)}
            </div>
        </div>
    );
}