import React from 'react'; 
import { useEffect, useRef } from 'react';
import './styles/Canvas.css';

const Canvas = () => {
    const canvasRef = useRef(); 
    
    useEffect(() => {
        console.log(canvasRef);
        console.log(canvasRef.current);     
        
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 
        console.log(ctx); 
    },[]);

    const printMove = () => {
        console.log('mouseMove'); 
    }

    return (
        <canvas 
            id="canvas"    
            ref={canvasRef}
            onMouseMove={printMove} 
        /> 
    )
}

export default Canvas; 