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
            wordSearchTitleArr: [],
            numPuzzles: 0,
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
                for (let j = 0; j < 16; j++){
                    gridPoints.push([(i * gridBoxWidth) + gridBoxWidth, (j * gridBoxHeight) + gridBoxHeight]); 
                }
            }
            availablePoints = gridPoints; 
        }
        buildGrid(); 
        
        // Define DrawKeyWords Function
        const titleArr = this.state.wordSearchTitleArr.titleArr;
        console.log(titleArr); 
        const allWordArrays = this.state.wordSearchWordArr.wordArr; 
        console.log(allWordArrays); 
        this.numPuzzles = allWordArrays.length; 
        this.setState({numPuzzles: this.numPuzzles});
        let wordArr = []; 
        let conflictingPointLocations = 0; 
        let drawInputs = [];
        let answerKeyPoints = [];  
        const drawKeyWords = (splitWord, splitWordPoints, textDirection) => {
            if (textDirection === 'horizontalForward' || textDirection === 'verticalDown' || textDirection === 'diagonalForwardDown' || textDirection === 'diagonalForwardUp'){
                for (let i = 0; i < splitWord.length; i++){
                    console.log(splitWord, splitWordPoints[i]); 
                    this.ctx.fillText(splitWord[i], splitWordPoints[i][0] + (this.scaledWidth * 0.025), splitWordPoints[i][1] + (this.scaledHeight * 0.018));
                        // record first and final point coordinates - for answer key lines
                        if (i === 0){
                            answerKeyPoints.push(splitWordPoints[i]); 
                            answerKeyPoints.push(splitWordPoints[splitWord.length - 1]);
                        }
                } 
            } else if (textDirection === 'horizontalBackward' || textDirection === 'verticalUp' || textDirection === 'diagonalBackwardDown' || textDirection === 'diagonalBackwardUp'){
                let reversedSplitWord = splitWord.reverse();
                for (let i = 0; i < splitWord.length; i++){
                    console.log(splitWord, reversedSplitWord, splitWordPoints[i]); 
                    // this.ctx.fillText(reversedSplitWord[i], splitWordPoints[i][0] + (this.scaledWidth * 0.025), splitWordPoints[i][1]);
                    this.ctx.fillText(reversedSplitWord[i], splitWordPoints[i][0] + (this.scaledWidth * 0.025), splitWordPoints[i][1] + (this.scaledHeight * 0.018));
                        // record first and final point coordinates - for answer key lines
                        if (i === 0){
                            answerKeyPoints.push(splitWordPoints[i]); 
                            answerKeyPoints.push(splitWordPoints[splitWord.length - 1]); 
                        }
                    }
                }
                console.log('answerKeyPoints', answerKeyPoints); 
                console.log('answerKeyPoints.length', answerKeyPoints.length); 
            } 
            // Canvas Image
            const image = new Image(); 
            image.src = './devGirl2.png';   
            image.onload = () => {
                // Loop -> Build & Export Search Word
                for (let i = 0; i < this.numPuzzles; i++){
                    // if (i !== 0){ 
                    //    this.ctx.clearRect(0,0,this.scaledWidth + 500,this.scaledHeight + 500);
                    // }
                    requestAnimationFrame(() => {

                    wordArr = allWordArrays[i].split(','); 
                    
                    this.ctx.drawImage(image,this.translateOriginX,this.translateOriginY); 
                
                    // Puzzle Border
                    this.ctx.strokeStyle = 'black';
                    this.ctx.lineWidth = 50; 
                    this.ctx.fillStyle = 'rgba(226,229,231,0.9)';
                    this.ctx.strokeRect(this.scaledWidth * .202,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    this.ctx.fillRect(this.scaledWidth * .202,this.scaledHeight * .1, this.scaledWidth * .7, this.scaledHeight * .7); 
                    // KeyWord Box
                    this.ctx.fillStyle = 'whitesmoke';
                    let clueStartPosX = this.scaledWidth * .183;  
                    let clueStartPosY = this.scaledHeight * .81;  
                    
                    this.ctx.strokeRect(this.scaledWidth * .202, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .2); 
                    this.ctx.fillRect(this.scaledWidth * .202, clueStartPosY, this.scaledWidth * .7, this.scaledHeight * .2); 
                    // Keyword Title
                    this.ctx.font = '220px serif';
                    this.ctx.fillStyle = 'rgba(0,0,0,1)';  
                    this.ctx.textAlign = 'center'; 
                    console.log(titleArr[i]); 

                    const numberedTitle = `#${i+1} ${titleArr[i]}`;
                    this.ctx.fillText(numberedTitle, clueStartPosX * 3, clueStartPosY * 1.03);  
                        // Title underline
                        this.ctx.beginPath(); 
                        this.ctx.moveTo(clueStartPosX * 1.5, clueStartPosY * 1.032); 
                        this.ctx.lineTo(clueStartPosX * 4.5, clueStartPosY * 1.032);
                        this.ctx.lineWidth = 20; 
                        this.ctx.stroke(); //***Look here***
                    // Keywords
                    for (let j = 0; j < wordArr.length; j++){
                        // console.log(wordArr)
                        if (j < 5){
                            console.log(wordArr[j]); 
                            this.ctx.fillText(wordArr[j], clueStartPosX * 2.25, clueStartPosY * (1.03 + (.04 * (j + 1)))); 
                        } else if (j < wordArr.length){
                            console.log(wordArr[j]); 
                            this.ctx.fillText(wordArr[j], clueStartPosX * 3.75, clueStartPosY * (1.03 + (.04 * ((j + 1) - 5))));
                        }
                    }

                    // Export
                    this.exportANDClearCanvas(`bgPage${i+1}`); 
                    
                    // wait for export & clear to complete before moving on
                

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
                            // this.ctx.fillText(fillLetters[(Math.floor(Math.random() * fillLetters.length))], el[0] + (this.scaledWidth * 0.025), el[1]); 
                            this.ctx.fillText(fillLetters[(Math.floor(Math.random() * fillLetters.length))], el[0] + (this.scaledWidth * 0.025), el[1] + (this.scaledHeight * 0.018)); 
                        });
                    
                        this.exportCanvas(`puzzle${i+1}`);   
                        // when export complete, draw answer key lines & export again & clear
                        console.log('answerKeyPoints', answerKeyPoints); 
                        console.log('draw answer key lines');
                        for (let i = 0; i < answerKeyPoints.length; i+=2){
                                this.ctx.textAlign = 'center'; 
                                this.ctx.lineWidth = 225;
                                this.ctx.lineCap = 'round';
                                this.ctx.strokeStyle = 'rgba(204,204,0,0.3)';  
                                this.ctx.beginPath(); 
                                this.ctx.moveTo(answerKeyPoints[i][0] + 155, answerKeyPoints[i][1] + 105); 
                                this.ctx.lineTo(answerKeyPoints[i+1][0] + 180, answerKeyPoints[i+1][1] + 105); 
                                this.ctx.stroke(); 

                                
                                // this.ctx.strokeStyle = 'black';
                                // this.ctx.lineWidth = 10; 
                                // this.ctx.fillStyle = 'rgba(204,204,0)';
                                // this.ctx.strokeRect(answerKeyPoints[i][0], answerKeyPoints[i][1], ); 
                                // this.ctx.fillRect(); 
                            }
                        for (let i = 0; i < 20; i++){
                            answerKeyPoints.shift(); 
                            // console.log(answerKeyPoints[i]); 
                            // console.log(answerKeyPoints.length); 
                        }
                        console.log('answerKeyPoints should be empty', answerKeyPoints); 
                       
                        this.exportANDClearCanvas(`solution${i+1}`); // i is from larger loop above
                       
                    }); // end initial requestAnimationFrame
                } 
            }
    }
    exportCanvas = (fileName) => {
        exportAsImage(this.canvasRef.current, fileName); 
    }
    exportANDClearCanvas = (fileName) => {
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
                    this.ctx.drawImage(bgPage,this.translateOriginX,this.translateOriginY,this.scaledWidth,this.scaledHeight); 
                }
                puzzle.onload = () => {        
                    console.log(puzzle); 
                    this.ctx.drawImage(puzzle,this.translateOriginX + (this.scaledWidth * .15),this.translateOriginY + (this.scaledHeight * .082), this.scaledWidth * .7, this.scaledHeight * .7);
                    
                    this.exportANDClearCanvas(`puzzlePage${p}`); 
                }
            }); 
        }
        for (let p = 1; p < numPuzzles + 1; p++){
            requestAnimationFrame(() => {
                let bgPageSoln = new Image(); 
                bgPageSoln.src = `./exportedFiles/bgPage${p}.png`  
                console.log(bgPageSoln); 
                let solution = new Image(); 
                solution.src = `./exportedFiles/solution${p}.png`
                console.log(solution);       
                
                bgPageSoln.onload = () => {        
                    console.log(bgPageSoln); 
                    this.ctx.drawImage(bgPageSoln,this.translateOriginX,this.translateOriginY,this.scaledWidth,this.scaledHeight); 
                }
                solution.onload = () => {        
                    console.log(solution); 
                    this.ctx.drawImage(solution,this.translateOriginX + (this.scaledWidth * .15),this.translateOriginY + (this.scaledHeight * .082), this.scaledWidth * .7, this.scaledHeight * .7);
                    
                    this.exportANDClearCanvas(`solutionPage${p}`); 
                }
            }); 
        }
            
    }
    setZoomFactor = (zoomFactor) => {
        this.setState({zoomFactor: zoomFactor});
    }
    setWordSearchWordArr = (wordArr) => {
        this.setState({wordSearchWordArr: wordArr});
    }
    setWordSearchTitleArr = (titleArr) => {
        this.setState({wordSearchTitleArr: titleArr});
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
                        setWordSearchTitleArr={this.setWordSearchTitleArr}
                        buildWordSearch={this.buildWordSearch}
                        combinePageANDPuzzle={this.combinePageANDPuzzle}
                        numPuzzles={this.state.numPuzzles}
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

// ***
// Modify export function to export 2 versions - one with solutions, one without
// ***

// export background
    // clear
// export puzzle (don't clear)
// Add lines
// Export solution
    // Clear
