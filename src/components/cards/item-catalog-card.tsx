import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Details, ShoppingCart } from '@material-ui/icons';
import { useAppSelector } from '../../app/hooks';
import './item-catalog-card.css';
import { Link } from 'react-router-dom';

export default function ItemCatalogCard(props: any) {
    const theme = useAppSelector(state => state.theme.value);

    return (
        <div className='catalog-card-box'>
            <Card className={`catalog-card catalog-card-${theme}`}>
                <CardMedia
                    className='catalog-card-img'
                    component="img"
                    style={{ height: '150px' }}
                    image={`${process.env.REACT_APP_BASE_URL}/${props.item.thumb}`}
                    alt="Live from space album cover"
                />
                <CardContent>
                    <Typography className='catalog-card-name' component="div" variant="h6">
                        {props.item.name}
                    </Typography>
                    <Typography variant="subtitle1">
                        ${props.item.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title='View item page'>
                        <IconButton className={`button-${theme}`}aria-label="deatils">
                            <Details></Details>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Add to cart'>
                        <IconButton className={`button-${theme}`}aria-label="cart">
                            <ShoppingCart></ShoppingCart>
                        </IconButton>
                    </Tooltip>
                    <Link id={`toCatalogItem${props.item.id}`} to={`item/${props.item.id}`} >Details</Link>
                </CardActions>
            </Card>
        </div>
    );
}
