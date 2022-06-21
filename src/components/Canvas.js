import { DragGesture } from '@use-gesture/vanilla';
import React from 'react'; 
import './styles/Canvas.css'; 

class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.canvasRef = React.createRef(); 
        this.canvasContainerRef = React.createRef(); 
        this.state = {painting: false, pan: {x: 0, y: 0}}
        this.ctx = null;
    }
    componentDidMount() {
        let canvas = this.canvasRef.current; 
        this.ctx = canvas.getContext('2d'); 

        canvas.width = window.innerHeight * 0.53; 
        canvas.height = window.innerHeight * 0.70;

        const translateOriginX = ((window.innerWidth / 2) - ((window.innerHeight * 0.53) / 2)) + this.state.pan.x;
        const translateOriginY = ((((window.innerHeight + 45) / 2) - ((window.innerHeight * 0.70) / 2))) + this.state.pan.y; 
        this.ctx.translate(-(translateOriginX), -(translateOriginY));

        const image = new Image(); 
        image.src = './sizeTestSmall.png'; 
        image.onload = () => {
            this.ctx.drawImage(image,translateOriginX, translateOriginY); 
        }

        const el = document.getElementById('drag'); 
        const gesture = new DragGesture(el, ({ active, offset }) => {
            console.log(el, active, offset[0], offset[1]); 
            this.setState({pan: {x: offset[0],y: offset[1]}}); 
        })

    }
    paint(x,y){
        if (this.state.painting){
            // console.log(`paint here: ${x},${y}`); 
            console.log('paint'); 
            // this.ctx.beginPath(); 
            // this.ctx.arc(x, y, 25, 0, Math.PI * 2); 
            // this.ctx.fillStyle = `hsl(0,100%,50%)`; 
            // this.ctx.fill();
        }
    }
    render(){
        return (
            <div id="canvasContainer">
                <canvas 
                    id="drag"
                    className='canvas'
                    ref={this.canvasRef}
                    style={{touchAction: 'none', left: this.state.pan.x, top: this.state.pan.y}}
                    onMouseMove={(e) => this.paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
                    onMouseDown={() => this.setState({painting: true})} 
                    onMouseUp={() => this.setState({painting: false})}
                />
            </div>
        )
    }
}

export default Canvas; 