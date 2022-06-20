import React from 'react'; 
import './styles/Canvas.css'; 

class CanvasClassVersion extends React.Component {
    constructor(props){
        super(props)
        this.canvasRef = React.createRef(); 
        this.state = {painting: false}
        this.ctx = null;
    }
    componentDidMount() {
        let canvas = this.canvasRef.current; 
        this.ctx = canvas.getContext('2d'); 
        canvas.height = window.innerHeight * 0.70;
        canvas.width = window.innerHeight * 0.53;
        canvas.minHeight = window.innerHeight * 0.14;
        const translateOriginX = ((window.innerWidth / 2) - (canvas.width / 2));
        const translateOriginY = (((window.innerHeight + 45) / 2) - (canvas.height / 2)); 
        this.ctx.translate(-translateOriginX,-translateOriginY);
    }
    paint(x,y){
        if (this.state.painting){
            this.ctx.beginPath(); 
            this.ctx.arc(x, y, 25, 0, Math.PI * 2); 
            this.ctx.fillStyle = `hsl(0,100%,50%)`; 
            this.ctx.fill();
            console.log(this.state.painting); 
        }
    }
    render(){
        return (
            <canvas 
                id="canvas"
                ref={this.canvasRef}
                onMouseMove={(e) => this.paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
                onMouseDown={() => this.setState({painting: true})} 
                onMouseUp={() => this.setState({painting: false})}
            />
        )
    }
}

export default CanvasClassVersion; 