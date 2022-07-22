import React from 'react';
import HeaderMenu from './components/HeaderMenu';
import GlobalControlPanel from './components/GlobalControlPanel';
import ToolBar from './components/ToolBar';
import { DragGesture } from '@use-gesture/vanilla';
import './components/styles/App.css';
import './components/styles/Canvas.css'; 
import LayersPanel from './components/LayersPanel';
import exportAsImage from './components/Utils/exportAsImage';
import { stageWordToDraw, updatedPointsArr } from './components/Utils/stageWordToDraw';

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            zoomFactor: 1,
            // zoomFactor: 0.073611111111111,
            wordSearchWordArr: [],
            painting: false,
            pan: {x: 0, y: 0, active: false}
        }
        this.canvasRef = React.createRef(); 
        this.canvasContainerRef = React.createRef(); 
        this.width = 530;
        this.height = 697;
        this.scaleFactor = 13.584905660377358;
        this.scaledWidth = this.width * this.scaleFactor; 
        this.scaledHeight = this.height * this.scaleFactor; 
        this.ctx = null; 
        this.translateOriginX = ((window.innerWidth / 2) - ((window.innerHeight * 0.53) / 2));
        this.translateOriginY = ((((window.innerHeight + 45) / 2) - ((window.innerHeight * 0.70) / 2))); 
    }
    componentDidMount() {
        let canvas = this.canvasRef.current; 
        this.ctx = canvas.getContext('2d'); 
        canvas.width = this.scaledWidth;
        canvas.height = this.scaledHeight;

        // const translateOriginX = ((window.innerWidth / 2) - ((window.innerHeight * 0.53) / 2));
        // const translateOriginY = ((((window.innerHeight + 45) / 2) - ((window.innerHeight * 0.70) / 2))); 
        this.ctx.translate(-(this.translateOriginX),-(this.translateOriginY));
        
        window.addEventListener('keydown', (e)=>{
            if (e.code === 'Space' && this.state.pan.active === false){
                this.setState({painting: false});
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: true}});
            }
        });
        window.addEventListener('keyup', (e)=>{
            if (e.code === 'Space'){
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: false}})
            }
        })
        
        // // Canvas Image
        // const image = new Image(); 
        // // image.src = './SizeTest7200x9600.png';  
        // image.src = './devGirl2.png';   
        // image.onload = () => {
        //     this.ctx.drawImage(image,this.translateOriginX,this.translateOriginY); 
        
        // this.ctx.strokeStyle = 'black';
        // this.ctx.lineWidth = 50; 
        // this.ctx.fillStyle = 'rgba(226,229,231,0.9)';
        // this.ctx.strokeRect(this.scaledWidth * .177,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
        // this.ctx.fillRect(this.scaledWidth * .177,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
        
        // this.ctx.fillStyle = 'whitesmoke';
        // let clueStartPosX = this.scaledWidth * .177;  
        // let clueStartPosY = this.scaledHeight * .81;  
        // this.ctx.strokeRect(clueStartPosX, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .177); 
        // this.ctx.fillRect(clueStartPosX, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .177); 
        
        // this.ctx.font = '220px serif';
        // this.ctx.fillStyle = 'rgba(0,0,0,1)';  
        // this.ctx.textAlign = 'center'; 
        // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.03 ); 
        // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.07 ); 
        // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.11 ); 
        // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.15 ); 
        // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.19 ); 
   
        // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.03 ); 
        // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.07 ); 
        // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.11 ); 
        // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.15 ); 
        // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.19 ); 
        // }

        // Pan
        const el = document.getElementById('drag'); 
        const gesture = new DragGesture(el, ({ active, offset }) => {
            if (this.state.pan.active){
                this.setState({pan: {x: offset[0], y: offset[1], active: true}});
            }
        })
    }
    buildWordSearch = () => {
        console.log('buildWordSearch called'); 
        let availablePoints = []; 
        const gridBoxWidth = Math.floor((this.scaledWidth - 250) / 12); 
        const gridBoxHeight = Math.floor((this.scaledHeight - 400) / 16); 
        
        let gridPoints = []; 
        const buildGrid = () => {
            gridPoints = []; 
            for (let i = 0; i < 12; i++){
                for (let j = 0; j < 17; j++){
                    gridPoints.push([(i * gridBoxWidth) + gridBoxWidth, j * gridBoxHeight]); 
                }
            }
            availablePoints = gridPoints; 
        }
        buildGrid(); 
        
        // Define DrawKeyWords Function
        const allWordArrays = this.state.wordSearchWordArr.arr; 
        for (let i = 0; i < allWordArrays.length; i++){
            allWordArrays[i] = allWordArrays[i].slice(0, allWordArrays[i].length - 1); 
        }
        let numPuzzles = allWordArrays.length; 
        let wordArr = []; 
        let conflictingPointLocations = 0; 
        let drawInputs = []; 
        const drawKeyWords = (splitWord, splitWordPoints, textDirection) => {
            if (textDirection === 'horizontalForward' || textDirection === 'verticalDown' || textDirection === 'diagonalForwardDown' || textDirection === 'diagonalForwardUp'){
                for (let i = 0; i < splitWord.length; i++){
                    console.log(splitWord, splitWordPoints[i]); 
                    this.ctx.fillText(splitWord[i], splitWordPoints[i][0], splitWordPoints[i][1]);
                } 
            } else if (textDirection === 'horizontalBackward' || textDirection === 'verticalUp' || textDirection === 'diagonalBackwardDown' || textDirection === 'diagonalBackwardUp'){
                let reversedSplitWord = splitWord.reverse();
                for (let i = 0; i < splitWord.length; i++){
                    console.log(splitWord, reversedSplitWord, splitWordPoints[i]); 
                    this.ctx.fillText(reversedSplitWord[i], splitWordPoints[i][0], splitWordPoints[i][1]);
                }
            }
        } 
        // Canvas Image
        const image = new Image(); 
        image.src = './devGirl2.png';   
        image.onload = () => {
            // Loop -> Build & Export Search Word
            for (let i = 0; i < numPuzzles; i++){
              
                    wordArr = allWordArrays[i].split(','); 
                    
                    this.ctx.drawImage(image,this.translateOriginX,this.translateOriginY); 
                
                    // Puzzle Border
                    this.ctx.strokeStyle = 'black';
                    this.ctx.lineWidth = 50; 
                    this.ctx.fillStyle = 'rgba(226,229,231,0.9)';
                    this.ctx.strokeRect(this.scaledWidth * .177,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    this.ctx.fillRect(this.scaledWidth * .177,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    // KeyWord Box
                    this.ctx.fillStyle = 'whitesmoke';
                    let clueStartPosX = this.scaledWidth * .177;  
                    let clueStartPosY = this.scaledHeight * .81;  
                    this.ctx.strokeRect(clueStartPosX, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .177); 
                    this.ctx.fillRect(clueStartPosX, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .177); 
                    // Keywords
                    this.ctx.font = '220px serif';
                    this.ctx.fillStyle = 'rgba(0,0,0,1)';  
                    this.ctx.textAlign = 'center'; 
                    for (let j = 0; j < wordArr.length; j++){
                        console.log(wordArr)
                        if (j < 5){
                            console.log(wordArr[j]); 
                            this.ctx.fillText(wordArr[j], clueStartPosX * 2.25, clueStartPosY * (1.03 + (.04 * j))); 
                        } else if (j < wordArr.length){
                            console.log(wordArr[j]); 
                            this.ctx.fillText(wordArr[j], clueStartPosX * 3.75, clueStartPosY * (1.03 + (.04 * (j - 5))));
                        }
                    }
                    // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.03 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.07 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.11 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.15 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 2.25, clueStartPosY * 1.19 ); 
            
                    // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.03 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.07 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.11 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.15 ); 
                    // this.ctx.fillText('testing', clueStartPosX * 3.75, clueStartPosY * 1.19 ); 
                    // Export
            
                    this.exportCanvas(); 
            
              
                        buildGrid(); 
                        availablePoints = gridPoints; 
                        conflictingPointLocations = 0; 
                        drawInputs = [];        
                        
                        for (let i = 0; i < wordArr.length; i++){
                            const textDirections = ['horizontalForward','horizontalForward','horizontalForward', 'horizontalForward', 'horizontalBackward', 'verticalDown', 'verticalUp', 'horizontalForward', 'horizontalBackward', 'verticalDown', 'verticalUp', 'diagonalForwardDown', 'diagonalForwardUp', 'diagonalBackwardDown', 'diagonalBackwardUp'];
                            let randTextDirection = textDirections[Math.floor(Math.random() * textDirections.length)];
                            console.log(randTextDirection); 
                            
                            stageWordToDraw( 
                                availablePoints, 
                                gridBoxWidth,
                                gridBoxHeight, 
                                wordArr[i], 
                                randTextDirection,
                                conflictingPointLocations,
                                drawInputs,
                                textDirections
                                );
                                
                                this.ctx.font = '220px serif';
                                this.ctx.fillStyle = 'rgba(0,0,0,1)';  
                                this.ctx.textAlign = 'center'; 
                                drawKeyWords(drawInputs[0], drawInputs[1], randTextDirection); 
                                let iterations = drawInputs.length / 3; 
                                for (let i = 0; i < iterations; i++){
                                    drawInputs.shift(); 
                                    drawInputs.shift(); 
                                }
                        }
                        // Fill in remaining letter positions
                        let fillLetters = []; 
                        for (let i = 0; i < wordArr.length; i++){
                            for (let j = 0; j < wordArr[i].length; j++){
                                fillLetters.push(wordArr[i][j]); 
                            }
                        }
                        updatedPointsArr.forEach(el => {
                            this.ctx.fillText(fillLetters[(Math.floor(Math.random() * fillLetters.length))], el[0], el[1]); 
                        });
                    
         
                    this.exportCanvas();   
                 
                }
            
       
            }
    }
    exportCanvas = () => {
        // this.setState({zoomFactor: 1}); 
        exportAsImage(this.canvasRef.current, 'testFile'); 
        // this.setState({zoomFactor: 0.073611111111111});
        this.ctx.clearRect(0,0,this.scaledWidth + 500,this.scaledHeight + 500);
    }
    // exportCanvas = () => {
    //     this.setState({zoomFactor: 1}); 
    //     requestAnimationFrame(() => exportAsImage(this.canvasRef.current, 'testFile')); 
    //     requestAnimationFrame(() => this.setState({zoomFactor: 0.073611111111111}));
    //     requestAnimationFrame(() => this.ctx.clearRect(0,0,this.scaledWidth + 500,this.scaledHeight + 500));
    // }
    setZoomFactor = (zoomFactor) => {
        this.setState({zoomFactor: zoomFactor});
    }
    setWordSearchWordArr = (wordArr) => {
        this.setState({wordSearchWordArr: wordArr});
    }
    paint(x,y){
        if (this.state.painting){
            this.ctx.beginPath(); 
            this.ctx.arc(((x * this.scaleFactor) - 2550) - (this.state.pan.x * this.scaleFactor), ((y * this.scaleFactor) - 2150) - (this.state.pan.y * this.scaleFactor), 25 * this.scaleFactor, 0, Math.PI * 2); 
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
        const shiftX = -(((this.scaleFactor - 1) * 0.5) * this.width) + this.state.pan.x;
        const shiftY = -(((this.scaleFactor - 1) * 0.5) * this.height) + this.state.pan.y;
        return(
            <div className="container is-fullhd" style={{border: '1px solid gold'}}>
                <div style={{border: '1px solid blue'}}>
                    <HeaderMenu
                        setWordSearchWordArr={this.setWordSearchWordArr}
                        buildWordSearch={this.buildWordSearch}
                        exportCanvas={this.exportCanvas}
                    /> 
                </div>
                <div className='columns'>
                    <div className='column'>
                        1/8
                        <div className="logoBox" style={{height: '14vh'}}>LogoBox</div>
                        <ToolBar />
                    </div>                  
                    <div className='column'>
                        <GlobalControlPanel
                            zoomFactor={this.state.zoomFactor}    
                            setZoomFactor={this.setZoomFactor}
                        />
                        <div id="canvasContainer" style={{overflow: 'hidden'}}>
                            <canvas 
                                id="drag"
                                className='canvas'
                                ref={this.canvasRef}
                                style={{left: shiftX, top: shiftY, transform: `scale(${this.state.zoomFactor})`, touchAction: 'none'}}
                                onMouseMove={(e) => this.paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
                                onMouseDown={this.brushDown} 
                                onMouseUp={() => this.setState({painting: false})}
                            />
                        </div>
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