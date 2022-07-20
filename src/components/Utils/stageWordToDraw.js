let updatedPointsArr = null; 
let startPointsGenerated = 0; 
const checkIfPointIsAvailable = (availablePoints, splitWord, randTextDirection, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxWidth, gridBoxHeight) => {
    console.log('checkIfPointIsAvailable')
    
    // determine if word is available
    let numPointsAvailable = 0; 
    for (let i = 0; i < splitWordPoints.length; i++){ 
        availablePoints.forEach(el => {
            // if point is available
            if (splitWordPoints[i][0] === el[0] && splitWordPoints[i][1] === el[1]){
                numPointsAvailable++; 
                console.log(numPointsAvailable); 
            } 
        })
    }
    
    // try new start point or draw
    if (numPointsAvailable !== splitWordPoints.length){
        console.log('points unavailable, generate new start point'); 
        startPointsGenerated++; 
        genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, splitWord.join(''), randTextDirection, conflictingPointLocations, drawInputs);
    } else {
        // remove points from available points array
            console.log(`${numPointsAvailable} === ${splitWordPoints.length}`)
            console.log('remove points, draw'); 
            for (let n = 0; n < availablePoints.length; n++){
                for (let p = 0; p < splitWordPoints.length; p++){
                    if (availablePoints[n][0] === splitWordPoints[p][0] && availablePoints[n][1] === splitWordPoints[p][1]){
                        availablePoints.splice(n,1); 
                    }
                }      
            }
        updatedPointsArr = availablePoints; 
        drawInputs.push(splitWord, splitWordPoints); 
        return drawInputs; 
    }
}

const shiftTowardCenter = (availablePoints, startPos, splitWord, randTextDirection, gridBoxWidth, gridBoxHeight, conflictingPointLocations, drawInputs) => {
    console.log('shiftTowardCenter called'); 
    
    let wordEndPosition = null;
    let splitWordPoints = []; 

    if (randTextDirection === 'horizontalForward' || randTextDirection === 'horizontalBackward'){
        console.log(randTextDirection, 'shiftLeft?'); 
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                console.log(`${wordEndPosition} > ${gridBoxWidth * 12}`); 
                startPos[0] -= gridBoxWidth;
                console.log(`shifting ${splitWord.join('')} left to x: ${startPos[0]}`); 
            }
        }
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), startPos[1]]); 
        }; 
        console.log(splitWordPoints);

    } else if (randTextDirection === 'verticalDown' || randTextDirection === 'verticalUp'){
        console.log(randTextDirection, 'shiftUp?'); 

        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] + ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition > (gridBoxHeight * 16)){
                console.log(`${wordEndPosition} > ${gridBoxHeight * 16}`); 
                startPos[1] -= gridBoxHeight;
                console.log(`shifting ${splitWord.join('')} up to y: ${startPos[1]}`); 
            }
        }
    
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([startPos[0], (startPos[1] + (gridBoxHeight * i))]); 
        }; 
        console.log(splitWordPoints);
    } else if (randTextDirection === 'diagonalForwardDown' || randTextDirection === 'diagonalBackwardDown'){
        console.log(randTextDirection, 'shiftLeft? && shiftUp?'); 

        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                console.log(`${wordEndPosition} > ${gridBoxWidth * 12}`); 
                startPos[0] -= gridBoxWidth;
                console.log(`shifting ${splitWord.join('')} left to x: ${startPos[0]}`); 
            }
        }
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] + ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition > (gridBoxHeight * 16)){
                console.log(`${wordEndPosition} > ${gridBoxHeight * 16}`); 
                startPos[1] -= gridBoxHeight;
                console.log(`shifting ${splitWord.join('')} up to y: ${startPos[1]}`); 
            }
        }
    
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] + (gridBoxHeight * i))]); 
        }; 
        console.log(splitWordPoints);
    } else if (randTextDirection === 'diagonalForwardUp' || randTextDirection === 'diagonalBackwardUp'){
        console.log(randTextDirection, 'shiftLeft? && shiftDown?'); 

        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                console.log(`${wordEndPosition} > ${gridBoxWidth * 12}`); 
                startPos[0] -= gridBoxWidth;
                console.log(`shifting ${splitWord.join('')} left to x: ${startPos[0]}`); 
            }
        }
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] - ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition < (gridBoxHeight)){ // < 0?
                console.log(`${wordEndPosition} < ${gridBoxHeight}`); 
                startPos[1] += gridBoxHeight;
                console.log(`shifting ${splitWord.join('')} down to y: ${startPos[1]}`); 
            }
        }
    
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] - (gridBoxHeight * i))]); 
        }; 
        console.log(splitWordPoints); 
    }

    checkIfPointIsAvailable(availablePoints, splitWord, randTextDirection, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxWidth, gridBoxHeight); 
}
const genRandStartPos = (availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections) => {
    console.log('genRandStartPos called'); 

    if (startPointsGenerated > availablePoints.length){
        console.log('return');     
        return; 
        
    } else {
        console.log(`word: ${word}`)
        console.log(`gridBoxWidth: ${gridBoxWidth}`)
        console.log(`gridBoxHeight: ${gridBoxHeight}`)

        let randRow = Math.floor((Math.random() * 12) + 1); 
        console.log(`randRow: ${randRow}`);
        let randCol = Math.floor((Math.random() * 16) + 1);
        console.log(`randCol: ${randCol}`); 
        let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
        console.log(`${word} startPos: ${startPos}`); 
        let splitWord = word.split(''); 
        console.log(startPos);
        shiftTowardCenter(availablePoints, startPos, splitWord, randTextDirection, gridBoxWidth, gridBoxHeight, conflictingPointLocations, drawInputs);

    }

}

const stageWordToDraw = (availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections) => {
    console.log('stageWordToDraw called')
    console.log(availablePoints); 
    console.log(gridBoxWidth); 
    console.log(gridBoxHeight); 
    console.log(word); 
    console.log(randTextDirection); 
    console.log(conflictingPointLocations); 
    console.log(drawInputs); 
    console.log(textDirections); 
    genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections)   
}

export {
    stageWordToDraw,
    updatedPointsArr
}; 
