import { useAppSelector } from "../../app/hooks";

interface Image {
    id: number;
    image: string;
}

interface Slider {
    album: Image[];
}

function ImageSlider(props: Slider) {
    const theme = useAppSelector(state => state.theme.value);

    console.log(props.album)

  return (
      <div>
          {props.album.map(a => {
              return <img src={`${process.env.REACT_APP_BASE_URL}/${a.image}`} key={a.id} width='150px' height='150px'></img>
          })}
      </div>
  )
}

export default ImageSlider;