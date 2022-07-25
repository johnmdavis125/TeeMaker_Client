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
            // zoomFactor: 1,
            zoomFactor: 0.073611111111111,
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
        this.numPuzzles = 0; 
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
        // const image2 = new Image(); 
        // // image.src = './SizeTest7200x9600.png';  
        // image.src = './bgPage1.png';  
        // image2.src = './puzzle1.png';  
        // image.onload = () => {
        //     this.ctx.drawImage(image,this.translateOriginX,this.translateOriginY); 
        //     this.ctx.drawImage(image2,this.translateOriginX,this.translateOriginY); 
        // }

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
        this.numPuzzles = allWordArrays.length; 
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
            for (let i = 0; i < this.numPuzzles; i++){
              
                    wordArr = allWordArrays[i].split(','); 
                    
                    this.ctx.drawImage(image,this.translateOriginX,this.translateOriginY); 
                
                    // Puzzle Border
                    this.ctx.strokeStyle = 'black';
                    this.ctx.lineWidth = 50; 
                    this.ctx.fillStyle = 'rgba(226,229,231,0.9)';
                    this.ctx.strokeRect(this.scaledWidth * .180,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    this.ctx.fillRect(this.scaledWidth * .180,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    // KeyWord Box
                    this.ctx.fillStyle = 'whitesmoke';
                    let clueStartPosX = this.scaledWidth * .180;  
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
            
                    this.exportCanvas(`bgPage${i+1}`); 
            
              
                        buildGrid(); 
                        availablePoints = gridPoints; 
                        conflictingPointLocations = 0; 
                        drawInputs = [];        
                        
                        for (let k = 0; k < wordArr.length; k++){
                            const textDirections = ['horizontalForward','horizontalForward','horizontalForward', 'horizontalForward', 'horizontalBackward', 'verticalDown', 'verticalUp', 'horizontalForward', 'horizontalBackward', 'verticalDown', 'verticalUp', 'diagonalForwardDown', 'diagonalForwardUp', 'diagonalBackwardDown', 'diagonalBackwardUp'];
                            let randTextDirection = textDirections[Math.floor(Math.random() * textDirections.length)];
                            console.log(randTextDirection); 
                            
                            stageWordToDraw( 
                                availablePoints, 
                                gridBoxWidth,
                                gridBoxHeight, 
                                wordArr[k], 
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
                                for (let t = 0; t < iterations; t++){
                                    drawInputs.shift(); 
                                    drawInputs.shift(); 
                                }
                        }
                        // Fill in remaining letter positions
                        let fillLetters = []; 
                        for (let u = 0; u < wordArr.length; u++){
                            for (let q = 0; q < wordArr[u].length; q++){
                                fillLetters.push(wordArr[u][q]); 
                            }
                        }
                        updatedPointsArr.forEach(el => {
                            this.ctx.fillText(fillLetters[(Math.floor(Math.random() * fillLetters.length))], el[0], el[1]); 
                        });
                    
                    this.exportCanvas(`puzzle${i+1}`);   
                }
            }
    }
    exportCanvas = (fileName) => {
        exportAsImage(this.canvasRef.current, fileName); 
        this.ctx.clearRect(0,0,this.scaledWidth + 500,this.scaledHeight + 500);
    }
    combinePageANDPuzzle = (numPuzzles) => {
        console.log('combinePageANDPuzzle method called'); 
        console.log(`numPuzzles: ${numPuzzles}`); 
        for (let p = 1; p < numPuzzles + 1; p++){
            requestAnimationFrame(() => {
                let bgPage = new Image(); 
                bgPage.src = `./exportedFiles/bgPage${p}.png`  
                console.log(bgPage); 
                let puzzle = new Image(); 
                puzzle.src = `./exportedFiles/puzzle${p}.png`
                console.log(puzzle);    
                
                bgPage.onload = () => {        
                    console.log(bgPage); 
                    console.log(this.ctx); 
                    this.ctx.drawImage(bgPage,this.translateOriginX,this.translateOriginY, this.scaledWidth, this.scaledHeight); 
                }
                
                puzzle.onload = () => {        
                    console.log(puzzle); 
                    this.ctx.drawImage(puzzle,this.translateOriginX + (this.scaledWidth * .175) - 190,this.translateOriginY + (this.scaledHeight * .091) - 80, this.scaledWidth * .7, this.scaledHeight * .7);
                    
                    this.exportCanvas(`page${p}`); 
                }
            })
        }
            
    }
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
                        combinePageANDPuzzle={this.combinePageANDPuzzle}
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

// check if any files in downloads folder -> if so, don't run program
// Custom named files 
// Script/Child process - move files to public folder ++
// drawImage background + drawImage puzzle (to scale) & export -*_*-
    // Fix bug -> file size not working - should be zoomfactor:1
// convert files to pdf
// combine files into single PDF