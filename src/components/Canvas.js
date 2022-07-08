import React from 'react'; 
import { DragGesture } from '@use-gesture/vanilla';
import exportAsImage from './Utils/exportAsImage';
import './styles/Canvas.css'; 

class Canvas extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            painting: false,
            pan: {x: 0, y: 0, active: false}
        }
        this.canvasRef = React.createRef(); 
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
                console.log(e.code, 'bar down', this.state.painting); 
            }
            console.log(this.state.pan.active); 
        });
        window.addEventListener('keyup', (e)=>{
            if (e.code === 'Space'){
                this.setState({pan: {x: this.state.pan.x, y: this.state.pan.y, active: false}})
                console.log(e.code, 'bar up', this.state.painting);
            }
            console.log(this.state.pan.active); 
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
        // Build Grid Points
        let gridPoints = []; 
        let boxCount = 0; 
        const gridBoxWidth = (this.scaledWidth - 500) / 12; 
        const gridBoxHeight = (this.scaledHeight - 500) / 16; 
        for (let i = 0; i < 12; i++){
            for (let j = 0; j < 16; j++){
                gridPoints.push([i * gridBoxWidth, j * gridBoxHeight]); 
                boxCount += 1;
            }
        }
        // console.log(`boxCount: ${boxCount}`); 
        let availablePoints = gridPoints; 

        const wordArr = [
            'MAP',
            'JOIN', 
            'SPLIT',
            'SLICE',
            'REDUCE',
            'TOSTRING',
            'LENGTH', 
            'POP',
            'PUSH',
            'SHIFT'
        ]; 

        this.ctx.font = '220px serif';
        this.ctx.fillStyle = 'green';  
        this.ctx.textAlign = 'center'; 
        const drawKeyWords = (startPos, splitWord) => {
            for (let i = 0; i < splitWord.length; i++){
                this.ctx.fillText(splitWord[i], startPos[0] + (gridBoxWidth * i), startPos[1] + (gridBoxHeight * 0.4));
                console.log(splitWord[i], (startPos[0] + (gridBoxWidth * i)), startPos[1])
            } 
            // currently printout out x position relative to startPos[0]
            // might need to convert to absolute x value -> which is why some points aren't matching up
            // might also be because of manual y adjustment of whole grid (added 0.4 of gridBoxHeight) -> double check that's not the issue
        }
    //   // Draw Text Test
    //   this.ctx.font = '220px serif';
    //   this.ctx.fillStyle = 'white';  
    //   this.ctx.textAlign = 'center'; 
    //   for (let i = 0; i < gridPoints.length; i++){
    //       this.ctx.fillText('H', gridPoints[i][0] + (gridBoxWidth), gridPoints[i][1] + (gridBoxHeight * 1.4));
    //   }



        for (let i = 0; i < wordArr.length; i++){
            
            
            // pick word direction
            // For now, assume all go left to right
            
            // pick random row & column
            let randRow = Math.floor((Math.random() * 12) + 1); 
            let randCol = Math.floor((Math.random() * 16) + 1);
            let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
            // console.log(startPos); 
            let splitWord = wordArr[i].split('');  
            
            // Shift Left
            while (startPos[0] + (splitWord.length * gridBoxWidth) > (this.scaledWidth - gridBoxWidth)){
                console.log(`${startPos[0] + (splitWord.length * gridBoxWidth)}` > `${(this.scaledWidth - gridBoxWidth)}`); 
                console.log(wordArr[i]); 
                console.log('shifting word left'); 
                startPos[0] -= gridBoxWidth;
            }
            // Shift Down
                // availablePoints
                // loop through each point for potential word
                    // Count + 1 if point is available
                    // if numPoints === word.length
                    // draw it & remove points from available points array
            let splitWordPoints = []; 
            let pointToAdd = [startPos[0],startPos[1]]; 
            for (let i = 0; i < splitWord.length; i++){
                // splitWordPoints.push([startPos[0], startPos[1]]); 
                // startPos[0] += gridBoxWidth;
                splitWordPoints.push([pointToAdd[0],pointToAdd[1]]); 
                pointToAdd[0] += gridBoxWidth;
            }; 
            console.log(availablePoints); 
            console.log(splitWordPoints); 
            console.log(splitWordPoints.length); 

            let totalNoMatchPointCount = 0; 
            const checkIfArrayContainsPoint = (availablePoints, splitWordPoints) => {
                
                let pointIsAvailable = null;
                for (let i = 0; i < splitWordPoints.length; i++){
                    let singlePointNoMatchCount = 0; 
                    availablePoints.forEach(el => {
                        if (el[0] !== splitWordPoints[i][0] || el[1] !== splitWordPoints[i][1]){
                            singlePointNoMatchCount ++; 
                        }
                        console.log(singlePointNoMatchCount); // if === 192, point is not available
                        if (singlePointNoMatchCount === availablePoints.length){
                            return pointIsAvailable = false;
                        } else {
                            return pointIsAvailable = true; 
                        }
                    });
                    if (pointIsAvailable === false){
                        totalNoMatchPointCount++;
                    }
                }
            }
            checkIfArrayContainsPoint(availablePoints, splitWordPoints); 

            if (totalNoMatchPointCount === splitWordPoints.length){
                // then call write the word!
                console.log('word must be moved'); 
                // delete all points from available points
                
                // iterate loop
            } else {
                console.log('draw word in current position'); 
                // add to iteration tally
                // if tally > numRows, exit loop (switch word direction)
                // select new row
            }
            drawKeyWords(startPos, splitWord); 
                
        }

        // Draw Text Test
            this.ctx.font = '220px serif';
            this.ctx.fillStyle = 'rgba(255,255,255,0.1';  
            this.ctx.textAlign = 'center'; 
            for (let i = 0; i < gridPoints.length; i++){
                this.ctx.fillText('H', gridPoints[i][0] + (gridBoxWidth), gridPoints[i][1] + (gridBoxHeight * 1.4));
            }
        

        // const testArr = [[1,0],[2,4],[2,1],[2,5]]; 
        // const point = [2,5]
        // let arrContainsPoint = null;
        // const checkIfArrayContainsPoint = (testArr, point) => {
        //     let noMatchCount = 0; 
        //     testArr.forEach(el => {
        //         if (el[0] !== point[0] || el[1] !== point[1]){
        //             noMatchCount ++; 
        //         }
        //         console.log(noMatchCount); 
        //         if (noMatchCount === testArr.length){
        //             return arrContainsPoint = false; 
        //         } else {
        //             return arrContainsPoint = true; 
        //         }
        //     });
        // }
        // checkIfArrayContainsPoint(testArr, point); 
        // console.log(arrContainsPoint); 

    }
    paint(x,y){
        if (this.state.painting){
            console.log(`paint here: ${x},${y}`); 
            console.log(`paint here: ${x * this.scaleFactor},${y * this.scaleFactor}`); 
            console.log('paint');
            console.log(this.props.zoomFactor); 
            console.log(this.state.pan.x, this.state.pan.y); 
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
    export = () => {
        console.log('exporting canvas as Image'); 
        this.props.setZoomFactor(1); 
        requestAnimationFrame(() => exportAsImage(this.canvasRef.current, 'testFile')); 
        requestAnimationFrame(() => this.props.setZoomFactor(0.073611111111111)); 
    }

    render(){
        
        const shiftX = -(((this.scaleFactor - 1) * 0.5) * this.width) + this.state.pan.x;
        const shiftY = -(((this.scaleFactor - 1) * 0.5) * this.height) + this.state.pan.y;
        
        return (
            <div>
                <div id="canvasContainer" style={{overflow: 'hidden'}}>
                    <canvas 
                        id="drag"
                        className='canvas'
                        ref={this.canvasRef}
                        style={{left: shiftX, top: shiftY, transform: `scale(${this.props.zoomFactor})`, touchAction: 'none'}}
                        onMouseMove={(e) => this.paint(e.nativeEvent.clientX,e.nativeEvent.clientY)}
                        onMouseDown={this.brushDown} 
                        onMouseUp={() => this.setState({painting: false})}
                    />
                <button onClick={this.export} className="button is-small is-link" style={{width: '150px', marginLeft: '38%'}}>Export</button>
                </div>
            </div>
        )
    }
}

export default Canvas; 