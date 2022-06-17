import React from 'react';

class Canvas extends React.Component {
    constructor(props){
        super(props);

        const {canvas, ctx} = this.props;
        console.log(canvas, ctx); 
    }

        // canvas.width = window.innerHeight * 0.53;
        // canvas.height = window.innerHeight * 0.7;
        // let drawing = false; 
        // canvas.addEventListener('mousemove', (e) => {
        //     if (drawing){
        //         const brush = new StandardBrush(e.x, e.y);  
        //         brush.standardPaint();     
        //         }
        //     }
        // );
        // canvas.addEventListener('mousedown', () => {
        //     drawing = true; 
        // });
        // canvas.addEventListener('mouseup', () => {
        //     drawing = false; 
        // });
    
    render() {
        return (
            <canvas id="canvas" style={{border: '1px solid red'}}></canvas>
        )
    }
}

export default Canvas; 

