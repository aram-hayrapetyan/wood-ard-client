import React from 'react';
import { useAppSelector } from '../../app/hooks';

interface Sizes {
    right?: boolean;
    width?: number;
    height?: number;
}

function ShadeGradient(props: Sizes) {
  const theme = useAppSelector(state => state.theme.value);

    return <div 
        className={`shade-gradient shade-gradient-${theme} shade-gradient-${props.right ? 'right' : 'left'}`} 
        style={{
            width: props.width ? props.width + 'px' : '100%',
            height: props.height ? props.height + 'px' : '100%'
        }}
    />
}

export default ShadeGradient;
