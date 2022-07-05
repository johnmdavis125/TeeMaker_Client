import React from 'react'; 
import { DragGesture } from '@use-gesture/vanilla';
import './styles/Canvas.css'; 

class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            painting: false,
            pan: {x: 0, y: 0, active: false}
            // zoomFactor: this.props.zoomFactor
            
        }
        this.canvasRef = React.createRef(); 
        this.canvasContainerRef = React.createRef(); 
        this.ctx = null;
    }
    componentDidMount() {
        // Configure Canvas
        let canvas = this.canvasRef.current; 
        this.ctx = canvas.getContext('2d'); 
        canvas.width = window.innerHeight * 0.53; 
        canvas.height = window.innerHeight * 0.70;
        const translateOriginX = ((window.innerWidth / 2) - ((window.innerHeight * 0.53) / 2)) + this.state.pan.x;
        const translateOriginY = ((((window.innerHeight + 45) / 2) - ((window.innerHeight * 0.70) / 2))) + this.state.pan.y; 
        this.ctx.translate(-(translateOriginX), -(translateOriginY));
        
        window.addEventListener('keydown', (e)=>{
            if (e.code === 'Space' && this.state.pan.active === false){
                this.setState({painting: false});
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: true}});
                console.log(e.code, 'bar down', this.state.painting); 
            }
            console.log(this.state.pan.active); 
        });
        window.addEventListener('keyup', (e)=>{
            if (e.code === 'Space'){
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: false}})
                console.log(e.code, 'bar up', this.state.painting);
            }
            console.log(this.state.pan.active); 
        })
        // Canvas Image
        const image = new Image(); 
        image.src = './sizeTestSmall.png';  
        image.onload = () => {
            this.ctx.drawImage(image,translateOriginX, translateOriginY); 
        }
        
        // Pan
        const el = document.getElementById('drag'); 
        const gesture = new DragGesture(el, ({ active, offset }) => {
            if (this.state.pan.active){
                this.setState({pan: {x: offset[0], y: offset[1], active: true}});
            }
        })
    }
    paint(x,y){
        if (this.state.painting){
            // console.log(`paint here: ${x},${y}`); 

            console.log('paint'); 
            console.log(this.props.zoomFactor); 
            this.ctx.beginPath(); 
            this.ctx.arc(x - this.state.pan.x, y - this.state.pan.y, 25, 0, Math.PI * 2); 
            this.ctx.fillStyle = `hsl(0,100%,50%)`; 
            this.ctx.fill();
        }
    }
    brushDown = () => {
        if (this.state.pan.active === false){
            this.setState({painting: true})
        }
    }
    render(){
        return (
            <div id="canvasContainer" style={{overflow: 'hidden'}}>
                <canvas 
                    id="drag"
                    className='canvas'
                    ref={this.canvasRef}
                    style={{left: this.state.pan.x, top: this.state.pan.y, transform: `scale(${this.props.zoomFactor})`, touchAction: 'none'}}
                    onMouseMove={(e) => this.paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
                    onMouseDown={this.brushDown} 
                    onMouseUp={() => this.setState({painting: false})}
                />
            </div>
        )
    }
}

export default Canvas; 