import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFetchDataQuery } from "../../features/data/data-api-slice";
import { addItems } from "../../features/items/items-slice";
import WoodModal from "../popups/modal";
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

  function containerScroll(event: any) {
    
  }

  return (
      <div className="cards-container" onScroll={containerScroll}>
        <Container className="card-container">
        {data.map(item => {
          return <div key={item.id} id={`card_item_${item.id}`} className="app-card">
            <Card className={'app-card-content app-card-' + theme}>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.REACT_APP_BASE_URL}/${item.image}`}
                alt={item.name}
              />
            </Card>
            <Card className={'app-card-content transparency app-card-' + theme}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  Type: {item.type}
                </Typography>
                <Typography variant="body2">
                  Material: {item.material}
                </Typography>
                <Typography variant="body2">
                  Size: {item.size}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => handleItemModal(item.id)}>Details</Button>
              </CardActions>
            </Card>
          </div>
        })}
        <WoodModal
          open={open}
          openCall={setOpen}
          actionCall={handleItemModal}
          modalTitle={item?.name}
          modalMessage=''
          options={{itemId: item?.id}}
          contentAlias='ItemDetails'
        />
      </Container>
    </div>
  )
}

export default ItemCards;