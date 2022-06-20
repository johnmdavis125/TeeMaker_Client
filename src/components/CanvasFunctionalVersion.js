import React from 'react'; 
import { useState, useEffect, useRef } from 'react';
import './styles/Canvas.css';

let canvas = null;
let ctx = null;
const CanvasFunctionalVersion = () => {
    const [painting, setPainting] = useState(false); 
    let canvasRef = useRef();

    useEffect(() => {  
        canvas = canvasRef.current; 
        ctx = canvas.getContext('2d'); 
        canvas.height = window.innerHeight * 0.70;
        canvas.width = window.innerHeight * 0.53;
        canvas.minHeight = window.innerHeight * 0.14;
        const translateOriginX = ((window.innerWidth / 2) - (canvas.width / 2));
        const translateOriginY = (((window.innerHeight + 45) / 2) - (canvas.height / 2)); 
        ctx.translate(-translateOriginX,-translateOriginY); 
    },[]);

    const paint = (x,y) => {
        if (painting){
            ctx.beginPath(); 
            ctx.arc(x, y, 25, 0, Math.PI * 2); 
            ctx.fillStyle = `hsl(0,100%,50%)`; 
            ctx.fill();
        }
    }

    return (
        <canvas 
            id="canvas"    
            ref={canvasRef}
            onMouseMove={(e) => paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
            onMouseDown={() => setPainting(true)} 
            onMouseUp={() => setPainting(false)}
        /> 
    )
}

export default CanvasFunctionalVersion; 