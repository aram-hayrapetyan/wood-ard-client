import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFetchDataQuery } from "../../features/data/data-api-slice";
import { addItems } from "../../features/items/items-slice";
import WoodModal from "../popups/modal";
import ShadeGradient from "../shades/shade-gradient";
import './item-cards.css';

function ItemCards(props: any) {
  let empty: any = null;
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.value);
  const items = useAppSelector(state => state.items.value);
  const { data = [], isFetching, isSuccess } = useFetchDataQuery('items/public');

    if (!isFetching && isSuccess && items.length === 0) {
      dispatch(addItems(data));
    }

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(empty);
  
  function handleItemModal(itemId: number) {
    setOpen(true);
    setItem(items.find(item => item.id === itemId));
  }

  return (
      <div style={{position: 'relative', paddingLeft: 5, paddingRight: 5}}>
        <div className="cards-container">
          <div className="card-container">
          {items.map(item => {
            return <div key={item.id} id={`card_item_${item.id}`} className="app-card">
              <Card className={'app-card-content app-card-' + theme}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_BASE_URL}/${item.thumb}`}
                  alt={item.name}
                />
              </Card>
              <Card className={'app-card-content-info transparency app-card-' + theme}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{whiteSpace: 'nowrap'}}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" style={{whiteSpace: 'nowrap'}}>
                    Type: {item.type}
                  </Typography>
                  <Typography variant="body2" style={{whiteSpace: 'nowrap'}}>
                    Material: {item.material}
                  </Typography>
                </CardContent>
                <CardActions style={{marginLeft: 'auto'}}>
                  <Tooltip title='Add to cart'> 
                    <Button className={`button-${theme}`}><ShoppingCart /></Button>
                  </Tooltip>
                  <Tooltip title='View itrem details'>
                    <Button className={`button-${theme}`} onClick={() => handleItemModal(item.id)}>Details</Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </div>
          })}
          <WoodModal
            open={open}
            openCall={setOpen}
            modalTitle={item?.name}
            modalMessage=''
            options={{itemId: item?.id}}
            contentAlias='ItemDetails'
          />
        </div>
      </div>
      <ShadeGradient right={false} width={24}/>
      <ShadeGradient right={true} width={24}/>
    </div>
  )
}

export default ItemCards;