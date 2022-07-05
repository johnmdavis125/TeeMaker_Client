import React from 'react';
import Zoom from './Zoom'; 
import './styles/GlobalControlPanel.css';

class GlobalControlPanel extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div id="GlobalControlPanel" style={{display: 'flex'}}>
               <div className="colorPicker"></div> 
               <div className="toolSize"></div> 
               <Zoom
                    zoomFactor={this.props.zoomFactor}
                    setZoomFactor={this.props.setZoomFactor}        
                />
            </div>
        )
    }
}

export default GlobalControlPanel; 