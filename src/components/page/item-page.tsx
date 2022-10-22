import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom'

function ItemPage() {
    const theme = useAppSelector(state => state.theme.value);
    const items = useAppSelector(state => state.items.value);

    const [ item, setItem ] = useState<any>();

    const { item_id } = useParams();

    if (item_id && !item) {
        console.log("here")
        let i = items.find(({id}) => id === parseInt(item_id));
        console.log(i)
        setItem(i)
    }

    console.log(item)

    return (
        <div>
        The Item Page
        </div>
    );
}

export default ItemPage;
