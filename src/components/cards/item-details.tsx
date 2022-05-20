import { Button, Card, CardActions, CardContent, Tooltip, Typography } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useAppSelector } from "../../app/hooks";
import ImageSlider from "../imageSlider/image-slider";

function ItemDetails(props: any) {
    const theme = useAppSelector(state => state.theme.value);
    const items = useAppSelector(state => state.items.value);

    const item = items.find(item => item.id === props.options.itemId);

    console.log(item)

  return (
      <div className="item-details-contect">
        <ImageSlider album={item.album} />
        <Card className={`app-card-${theme}`} variant="outlined">
          <CardContent>
            <Typography variant="body2">
              Item Name
            </Typography>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <br />
            <Typography variant="body1">
              {item.type} from {item.material}
            </Typography>
          </CardContent>
        </Card>
      </div>
  )
}

export default ItemDetails;