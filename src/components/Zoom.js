import React from 'react'; 

class Zoom extends React.Component {
    constructor(props){
        super(props)
    }
    zoom = (zoomDirection) => {
        if (zoomDirection === 'out'){
            this.props.setZoomFactor(this.props.zoomFactor - 0.1);
        } else if (zoomDirection === 'in'){
            this.props.setZoomFactor(this.props.zoomFactor + 0.1); 
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