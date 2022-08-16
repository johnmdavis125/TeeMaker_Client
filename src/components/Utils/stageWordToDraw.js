let updatedPointsArr = null; 
let startPointsGenerated = 0; 
const checkIfPointIsAvailable = (availablePoints, splitWord, randTextDirection, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxWidth, gridBoxHeight) => {
    
    let numPointsAvailable = 0; 
    for (let i = 0; i < splitWordPoints.length; i++){ 
        availablePoints.forEach(el => {
            if (splitWordPoints[i][0] === el[0] && splitWordPoints[i][1] === el[1]){
                numPointsAvailable++; 
            } 
        })
    }
    
    if (numPointsAvailable !== splitWordPoints.length){
        startPointsGenerated++; 
        genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, splitWord.join(''), randTextDirection, conflictingPointLocations, drawInputs);
    } else {
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
    let wordEndPosition = null;
    let splitWordPoints = []; 

    if (randTextDirection === 'horizontalForward' || randTextDirection === 'horizontalBackward'){
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                startPos[0] -= gridBoxWidth;
            }
        }
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), startPos[1]]); 
        }; 
    } else if (randTextDirection === 'verticalDown' || randTextDirection === 'verticalUp'){
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] + ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition > (gridBoxHeight * 16)){
                startPos[1] -= gridBoxHeight;
            }
        }
    
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([startPos[0], (startPos[1] + (gridBoxHeight * i))]); 
        }; 
    } else if (randTextDirection === 'diagonalForwardDown' || randTextDirection === 'diagonalBackwardDown'){
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                startPos[0] -= gridBoxWidth;
            }
        }
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] + ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition > (gridBoxHeight * 16)){
                startPos[1] -= gridBoxHeight;
            }
        }
    
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] + (gridBoxHeight * i))]); 
        }; 
    } else if (randTextDirection === 'diagonalForwardUp' || randTextDirection === 'diagonalBackwardUp'){
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
            if (wordEndPosition > (gridBoxWidth * 12)){
                startPos[0] -= gridBoxWidth;
            }
        }
        for (let i = 0; i < splitWord.length; i++){                
            wordEndPosition = startPos[1] - ((splitWord.length - 1)* gridBoxHeight); 
            if (wordEndPosition < (gridBoxHeight)){ // < 0?
                startPos[1] += gridBoxHeight;
            }
        }
        for (let i = 0; i < splitWord.length; i++){
            splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] - (gridBoxHeight * i))]); 
        }; 
    }
    checkIfPointIsAvailable(availablePoints, splitWord, randTextDirection, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxWidth, gridBoxHeight); 
}
const genRandStartPos = (availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections) => {
    if (startPointsGenerated > availablePoints.length){
        console.log('return');     
        return; 
    } else {
        let randRow = Math.floor((Math.random() * 12) + 1); 
        let randCol = Math.floor((Math.random() * 16) + 1);
        let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
        let splitWord = word.split(''); 
        shiftTowardCenter(availablePoints, startPos, splitWord, randTextDirection, gridBoxWidth, gridBoxHeight, conflictingPointLocations, drawInputs);
    }
}

const stageWordToDraw = (availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections) => {
    genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, word, randTextDirection, conflictingPointLocations, drawInputs, textDirections)   
}

export {
    stageWordToDraw,
    updatedPointsArr
}; 
