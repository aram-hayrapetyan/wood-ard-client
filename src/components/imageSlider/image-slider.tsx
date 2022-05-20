import { Box, IconButton } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import './image-slider.css'

interface Image {
    id: number;
    image: string;
    order: number;
    visible?: boolean;
}

interface Slider {
    album: Image[];
    height?: number;
    background?: boolean;
    watermarkSize?: number;
    autoSlide?: boolean;
}

const emptySlider: Image[] = [{id: 0, image: 'public/items/noImage.png', order: 0}];

function ImageSlider(props: Slider) {
    const theme = useAppSelector(state => state.theme.value);
    const [slider, setSlider] = useState((props.album.length ? props.album : emptySlider).map((a, i) => {
        return {
            ...a,
            visible: i === 0
        }
    }));

    const [ slideStartX, setSlideStartX ] = useState(0);
    const [ currentSlideIndex, setCurrentSlideIndex ] = useState(0);
    
    function sliderChange(index: number) {
        setSlider(slider.map((a, i) => { return { ...a, visible: i === index } } ));
        setCurrentSlideIndex(index);
    }

    function sliderSlideStart(e: any){
        setSlideStartX(e.touches[0].clientX);
    }

    function sliderSlideEnd(e: any, index: number){
        let slided: number = e.changedTouches[0].clientX - slideStartX;
        let visilbe_index: number = index + (slided < 0 ? +1 : -1);
        if (visilbe_index < 0) visilbe_index = slider.length - 1;
        if (visilbe_index > (slider.length - 1)) visilbe_index = 0;

        if (Math.abs(slided) > 50) {
            sliderChange(visilbe_index);
        }
    }

    // if (props.autoSlide) {
    //     setInterval(() => {
    //         let index: number = (currentSlideIndex === (slider.length - 1)) ? 0 : (currentSlideIndex + 1);
    //         console.log(index)
    //         sliderChange(index);
    //     }, 5000);
    // }

    return (
        <Box className="slider-container">
            {slider.map((s, i) => 
                <Box 
                onTouchStart={sliderSlideStart}
                onTouchEnd={(e) => sliderSlideEnd(e, i)}
                className={`slider-image-box shade ${s.visible ? 'slider-visible' : ''}`}  
                style={{
                    height: props.height||200 + 'px',
                    backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/${s.image})`,
                    backgroundSize: props.background ? 'cover' : 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                key={s.id}>
                    <span className="wood-watermark" style={{fontSize: props.watermarkSize||20}}>Made In Armenia</span>
                </Box>
            )}

            <Box className="slider-button-box">
                {slider.map((s, i) => (
                    <IconButton 
                    className={`slider-button button-icon-${theme} ${s.visible ? 'slider-button-active' : ''}`}
                    onClick={() => sliderChange(i)}
                    >    
                        <Fingerprint />
                    </IconButton>
                ))}
            </Box>

        </Box>
    )
}

export default ImageSlider;