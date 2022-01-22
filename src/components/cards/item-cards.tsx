import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { useFetchDataQuery } from "../../features/data/data-api-slice";
import './item-cards.css';

function ItemCards(attr: any) {
  const theme = useAppSelector(state => state.theme.value);
  const { data = [], isFetching } = useFetchDataQuery('items');

  function containerScroll(event: any) {
    
  }

  function cardShow(event: any) {
    event.target.closest('.app-card-content').style.opacity = 0.8;
  }

  function cardHide(event: any) {
    event.target.closest('.app-card-content').style.opacity = 0;
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
                image={item.image}
                alt={item.name}
              />
            </Card>
            <Card className={'app-card-content transparency app-card-' + theme} onMouseEnter={cardShow} onMouseLeave={cardHide}>
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
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        })}
      </Container>
    </div>
  )
}

export default ItemCards;