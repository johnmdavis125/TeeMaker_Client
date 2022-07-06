import React from 'react'; 

class Zoom extends React.Component {
    constructor(props){
        super(props)
    this.incrementSize = 0.01;
    }
    zoom = (zoomDirection) => {
        if (zoomDirection === 'out' && this.props.zoomFactor <= this.incrementSize){
            alert('Reached Max Zoom'); 
            return;
        } else if (zoomDirection === 'out'){
            this.props.setZoomFactor(this.props.zoomFactor - this.incrementSize);
        } else if (zoomDirection === 'in'){
            this.props.setZoomFactor(this.props.zoomFactor + this.incrementSize); 
        } else {
            console.log('invalid value'); 
        }
    }

    render(){
        return (
            <div>
                <button onClick={() => this.zoom('in')}>Zoom +</button>
                <button onClick={() => this.zoom('out')}>Zoom -</button>
            </div>
        )
    }
}

export default Zoom; 