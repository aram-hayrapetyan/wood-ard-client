import { Card, CardContent, Typography } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import ImageSlider from "../imageSlider/image-slider";

function ItemDetails(props: any) {
  const theme = useAppSelector(state => state.theme.value);

  return (
      <div className="item-details-contect">
        <ImageSlider album={props.options.album} />
        <Card className={`app-card-${theme}`} variant="outlined">
          <CardContent>
            <Typography variant="body2">
              Item Name
            </Typography>
            <Typography variant="h5" component="div">
              {props.options.name}
            </Typography>
            <br />
            <Typography variant="body1">
              {props.options.type} from {props.options.material}
            </Typography>
          </CardContent>
        </Card>
      </div>
  )
}

export default ItemDetails;