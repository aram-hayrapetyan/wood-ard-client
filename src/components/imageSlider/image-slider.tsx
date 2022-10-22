import { Box, IconButton } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
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

    const slideStartX = useRef(0);
    const currentSlideIndex = useRef(0);
    
    function sliderChange(index: number) {
        setSlider(slider.map((a, i) => { return { ...a, visible: i === index } } ));
        currentSlideIndex.current = index;
    }

    function sliderSlideStart(e: any){
        slideStartX.current = e.touches[0].clientX;
    }

    function sliderSlideEnd(e: any, index: number){
        let slided: number = e.changedTouches[0].clientX - slideStartX.current;
        let visilbe_index: number = index + (slided < 0 ? +1 : -1);
        if (visilbe_index < 0) visilbe_index = slider.length - 1;
        if (visilbe_index > (slider.length - 1)) visilbe_index = 0;

        if (Math.abs(slided) > 50) {
            sliderChange(visilbe_index);
        }
    }

    useEffect(() => {
        if (props.autoSlide) {
            setInterval(() => {
                let index: number = (currentSlideIndex.current === (slider.length - 1)) ? 0 : (currentSlideIndex.current + 1);
                sliderChange(index);
            }, 10000);
        }
    }, []);

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
                    key={s.id}
                    >    
                        <Fingerprint />
                    </IconButton>
                ))}
            </Box>

        </Box>
    )
}

export default ImageSlider;