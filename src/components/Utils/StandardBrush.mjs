import React from "react";

class StandardBrush {
    constructor(x,y){
        this.x = x; 
        this.y = y;
    }
    standardPaint(){
        console.log('std paint')
    }    
}

class utilityClass extends React.Component {
    componentDidMount(){
        const canvas = document.getElementById('canvas'); 
        const ctx = canvas.getContext('2d'); 
        canvas.width = window.innerHeight * 0.53;
        canvas.height = window.innerHeight * 0.7;
        let drawing = false; 
        canvas.addEventListener('mousemove', (e) => {
            if (drawing){
                const brush = new StandardBrush(e.x, e.y);  
                brush.standardPaint();     
                }
            }
        );
        canvas.addEventListener('mousedown', () => {
            drawing = true; 
        });
        canvas.addEventListener('mouseup', () => {
            drawing = false; 
        });

    }
    render(){
        return (
            <div></div>
        )
    }
}



export {
    StandardBrush
}