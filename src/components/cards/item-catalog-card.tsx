import * as React from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { Details, ShoppingCart } from '@material-ui/icons';
import { useAppSelector } from '../../app/hooks';
import './item-catalog-card.css';

export default function ItemCatalogCard(props: any) {
    const theme = useAppSelector(state => state.theme.value);

    return (
        <div className='catalog-card-box'>
            <Card className={`catalog-card catalog-card-${theme}`}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {props.item.name}
                </Typography>
                <Typography variant="subtitle1">
                    ${props.item.price}
                </Typography>
                </CardContent>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton className={`button-${theme}`}aria-label="deatils">
                    <Details></Details>
                </IconButton>
                <IconButton className={`button-${theme}`}aria-label="cart">
                    <ShoppingCart></ShoppingCart>
                </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                style={{ width: 151 }}
                image={`${process.env.REACT_APP_BASE_URL}/${props.item.thumb}`}
                alt="Live from space album cover"
            />
            </Card>
        </div>
    );
}
