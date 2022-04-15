import { useAppSelector } from "../../app/hooks";
import ImageSlider from "../imageSlider/image-slider";

function ItemDetails(props: any) {
    const theme = useAppSelector(state => state.theme.value);
    const items = useAppSelector(state => state.items.value);

    const item = items.find(item => item.id === props.options.itemId);

    console.log(item)

  return (
      <div>
        <ImageSlider album={item.album} />
      </div>
  )
}

export default ItemDetails;