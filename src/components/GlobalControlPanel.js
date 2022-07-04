import React from 'react';
import Zoom from './Zoom'; 
import './styles/GlobalControlPanel.css';

class GlobalControlPanel extends React.Component {
    constructor(props){
        super(props)
    }
    
    zoomOut(zoomFactor){
        console.log(zoomFactor); 
    }

    render(){
        return (
            <div id="GlobalControlPanel" style={{display: 'flex'}}>
               <div className="colorPicker"></div> 
               <div className="toolSize"></div> 
               <Zoom zoomOut={this.zoomOut}/>
            </div>
        )
    }
}

export default GlobalControlPanel; 