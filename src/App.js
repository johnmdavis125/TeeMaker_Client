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
            zoomFactor: 0.073611111111111,
            wordSearchWordArr: [],
            painting: false,
            pan: {x: 0, y: 0, active: false}
        }
        this.canvasRef = React.createRef(); 
        // this.state = {zoomFactor: 0.073611111111111}
        // this.state = {zoomFactor: 0.2} // test only
        this.canvasContainerRef = React.createRef(); 
        this.ctx = null; 
        this.width = 530;
        this.height = 697;
        this.scaleFactor = 13.584905660377358;
        this.scaledWidth = 530 * this.scaleFactor; 
        this.scaledHeight = 697 * this.scaleFactor; 
    }
    componentDidMount() {
        let canvas = this.canvasRef.current; 
        this.ctx = canvas.getContext('2d'); 
        canvas.width = this.scaledWidth;
        canvas.height = this.scaledHeight;

        const translateOriginX = ((window.innerWidth / 2) - ((window.innerHeight * 0.53) / 2));
        const translateOriginY = ((((window.innerHeight + 45) / 2) - ((window.innerHeight * 0.70) / 2))); 
        this.ctx.translate(-(translateOriginX),-(translateOriginY));
        
        window.addEventListener('keydown', (e)=>{
            if (e.code === 'Space' && this.state.pan.active === false){
                this.setState({painting: false});
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: true}});
                // console.log(e.code, 'bar down', this.state.painting); 
            }
            // console.log(this.state.pan.active); 
        });
        window.addEventListener('keyup', (e)=>{
            if (e.code === 'Space'){
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: false}})
                // console.log(e.code, 'bar up', this.state.painting);
            }
            // console.log(this.state.pan.active); 
        })
        
        // Canvas Image
        const image = new Image(); 
        image.src = './SizeTest7200x9600.png';  
        // image.onload = () => {
        //     this.ctx.drawImage(image,translateOriginX,translateOriginY); 
        // }
        
        // Pan
        const el = document.getElementById('drag'); 
        const gesture = new DragGesture(el, ({ active, offset }) => {
            if (this.state.pan.active){
                this.setState({pan: {x: offset[0], y: offset[1], active: true}});
            }
        })

    }
    setZoomFactor = (zoomFactor) => {
        this.setState({zoomFactor: zoomFactor});
    }
    setWordSearchWordArr = (wordArr) => {
        this.setState({wordSearchWordArr: wordArr});
        // requestAnimationFrame(() => console.log(this.state.wordSearchWordArr.arr));
        
    }

    buildWordSearch = () => {
        console.log('buildWordSearch called'); 
        let availablePoints = []; 
        const gridBoxWidth = Math.floor((this.scaledWidth - 250) / 12); 
        const gridBoxHeight = Math.floor((this.scaledHeight - 400) / 16); 
        // const wordArr = [
        //     'MAP',
        //     'JOIN', 
        //     'SPLIT',
        //     'SLICE',
        //     'REDUCE',
        //     'TOSTRING',
        //     'LENGTH', 
        //     'POP',
        //     'PUSH',
        //     'SHIFT'
        // ]; 
        
        let gridPoints = []; 
        const buildGrid = () => {
            // console.log('buildGrid called'); 
            gridPoints = []; 
            for (let i = 0; i < 12; i++){
                for (let j = 0; j < 17; j++){
                    gridPoints.push([(i * gridBoxWidth) + gridBoxWidth, j * gridBoxHeight]); 
                }
            }
            availablePoints = gridPoints; 
            console.log(availablePoints); 
        }
        buildGrid(); 

        const allWordArrays = this.state.wordSearchWordArr.arr; 
        console.log(`allWordArrays: ${allWordArrays}`); 
        
        // allWordArrays.forEach(wordArr => {
        //     console.log(wordArr); 
        // });
        // cut off /r at the end of each line
        for (let i = 0; i < allWordArrays.length; i++){
            allWordArrays[i] = allWordArrays[i].slice(0, allWordArrays[i].length - 1); 
        }
        // console.log(allWordArrays); 
        // count number of puzzles to create based on input data
        let numPuzzles = allWordArrays.length; 
        // console.log(numPuzzles); 
        
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
    // start loop
    for (let i = 0; i < numPuzzles; i++){
    requestAnimationFrame(() => {
        console.log(`iteration: ${i}`);
        buildGrid(); 
        availablePoints = gridPoints; 
        console.log(availablePoints, gridPoints); 
        wordArr = allWordArrays[i].split(','); 
        console.log(wordArr); 
        conflictingPointLocations = 0; 
        drawInputs = [];        
            if (wordArr){
                for (let i = 0; i < wordArr.length; i++){
                    // randomly select text direction
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
                
                    console.log(updatedPointsArr); 
                    console.log(drawInputs); 
                    this.ctx.font = '220px serif';
                    this.ctx.fillStyle = 'green';  
                    this.ctx.textAlign = 'center'; 
                   
                    drawKeyWords(drawInputs[0], drawInputs[1], randTextDirection); 
                    let iterations = drawInputs.length / 3; 
                    for (let i = 0; i < iterations; i++){
                        drawInputs.shift(); 
                        drawInputs.shift(); 
                    }
                }
            
            // gather all possible letters from wordArr
            let fillLetters = []; 
            for (let i = 0; i < wordArr.length; i++){
                for (let j = 0; j < wordArr[i].length; j++){
                    fillLetters.push(wordArr[i][j]); 
                }
            }
            // console.log(fillLetters); 
            
            // Fill In remaining points with random letters
            this.ctx.font = '175px serif';
            this.ctx.fillStyle = 'rgba(0,0,0,1';  
            this.ctx.textAlign = 'center'; 
            updatedPointsArr.forEach(el => {
                this.ctx.fillText(fillLetters[(Math.floor(Math.random() * fillLetters.length))], el[0], el[1]); 
            });
            availablePoints = gridPoints; 
            console.log(availablePoints); 
        } 
        
    })
        this.exportCanvas(); 
        // clear canvas
        // requestAnimationFrame(() => this.ctx.clearRect(0,0,this.scaledWidth,this.scaledHeight)); 
        // run loop again
    }
}
    paint(x,y){
        if (this.state.painting){
            // console.log(`paint here: ${x},${y}`); 
            // console.log(`paint here: ${x * this.scaleFactor},${y * this.scaleFactor}`); 
            // console.log('paint');
            // console.log(this.state.zoomFactor); 
            // console.log(this.state.pan.x, this.state.pan.y); 
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
    exportCanvas = () => {
        // e.preventDefault(); 
        console.log('call exportCanvas'); 
        this.setState({zoomFactor: 1}); 
        requestAnimationFrame(() => exportAsImage(this.canvasRef.current, 'testFile')); 
        requestAnimationFrame(() => this.setState({zoomFactor: 0.073611111111111}));
        requestAnimationFrame(() => this.ctx.clearRect(0,0,this.scaledWidth,this.scaledHeight));
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