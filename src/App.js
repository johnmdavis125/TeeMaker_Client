import React from 'react';
import HeaderMenu from './components/HeaderMenu';
import GlobalControlPanel from './components/GlobalControlPanel';
import ToolBar from './components/ToolBar';
import Canvas from './components/Canvas'; 
import './components/styles/App.css';
import LayersPanel from './components/LayersPanel';

class App extends React.Component {
        
    render(){    
        return(
            <div className="container is-fullhd" style={{border: '1px solid gold'}}>
                <div style={{border: '1px solid blue'}}>
                    <HeaderMenu /> 
                </div>
               
                <div className='columns'>
                    <div className='column'>
                        1/8
                        <div className="logoBox" style={{height: '14vh'}}>LogoBox</div>
                        <ToolBar />
                    </div>                  
                    <div className='column'>
                        <GlobalControlPanel />    
                        <Canvas />                        
                        <LayersPanel />
                    </div>                    
                    <div className='column'>
                        1/8
                        <div className='Mockup'>Mockup</div>
                        <div>Custom Brush Tool</div>
                        <div>Assets Panel</div>
                    </div>
                </div>
                

            </div>
        )
    }
}

export default App; 