import React from 'react';
import HeaderMenu from './components/HeaderMenu';
import GlobalControlPanel from './components/GlobalControlPanel';
import ToolBar from './components/ToolBar';
import { StandardBrush } from './components/Utils/StandardBrush.mjs';
import './components/styles/App.css';

class App extends React.Component {
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
                        <canvas id="canvas" style={{border: '1px solid red'}}>
                        </canvas>
                        <div className='layersPanel' style={{height: '13vh', border: '1px solid green'}}>Layers Panel</div>
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