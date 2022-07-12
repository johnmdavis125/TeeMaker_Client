const checkIfPointIsAvailable = (availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs) => {
    console.log('checkIfPointIsAvailable called'); 
    console.log(conflictingPointLocations); 
    let pointIsAvailable = null;
    for (let i = 0; i < splitWordPoints.length; i++){
        let singlePointNoMatchCount = 0; 
        availablePoints.forEach(el => {
            if (el[0] !== splitWordPoints[i][0] || el[1] !== splitWordPoints[i][1]){
                singlePointNoMatchCount ++; 
            } else {
                console.log(`${Math.floor(el[0])},${Math.floor(el[1])} === ${Math.floor(splitWordPoints[i][0])},${Math.floor(splitWordPoints[i][1])}`);
            }
            // console.log(singlePointNoMatchCount); // if === 192, point is not available
            if (singlePointNoMatchCount === availablePoints.length){
                return pointIsAvailable = false;
            } else {
                return pointIsAvailable = true; 
            }
        });
        if (pointIsAvailable === false){
            conflictingPointLocations++;
        }
        console.log(conflictingPointLocations); 
    }

    // If conflicts => move()
    // else draw(); => return splitWord, splitWordPoints - access back in canvas.js
    // drawInputs = [splitWord, splitWordPoints, conflictingPointLocations]; 
    drawInputs.push(splitWord, splitWordPoints); 
    console.log(drawInputs); 
    return drawInputs; 
}
const shiftLeft = (availablePoints, startPos, splitWord, gridBoxWidth, conflictingPointLocations, drawInputs) => {
    console.log('shiftLeft called'); 
    let wordEndPosition = null;
    for (let i = 0; i < splitWord.length; i++){                
        wordEndPosition = startPos[0] + ((splitWord.length - 1)* gridBoxWidth); 
        if (wordEndPosition > (gridBoxWidth * 12)){
            console.log(`${wordEndPosition} > ${gridBoxWidth * 12}`); 
            startPos[0] -= gridBoxWidth;
            console.log(`shifting ${splitWord.join('')} left to x: ${startPos[0]}`); 
        }
    }

    let splitWordPoints = []; 
    for (let i = 0; i < splitWord.length; i++){
        splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), startPos[1]]); 
    }; 
    console.log(splitWordPoints); 
    checkIfPointIsAvailable(availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs); 
}
const genRandStartPos = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    console.log('genRandStartPos called'); 
    let randRow = Math.floor((Math.random() * 12) + 1); 
    let randCol = Math.floor((Math.random() * 16) + 1);
    let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
    console.log(`${word} startPos: ${startPos}`); 
    let splitWord = word.split(''); 
    console.log(startPos);
    shiftLeft(availablePoints, startPos, splitWord, gridBoxWidth, conflictingPointLocations, drawInputs);
}
const buildGrid = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    console.log('buildGrid called'); 
    // no need to re-build the grid every loop...refactor later

    let gridPoints = []; 
    // let boxCount = 0; 
    for (let i = 0; i < 12; i++){
        for (let j = 0; j < 17; j++){
            gridPoints.push([(i * gridBoxWidth) + gridBoxWidth, j * gridBoxHeight]); 
            // boxCount += 1;
        }
    }
    availablePoints = gridPoints; 
    console.log(availablePoints); 
    genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs)
}

const stageWordToDraw = (availablePoints, gridBoxWidth, gridBoxHeight, wordArr, conflictingPointLocations, drawInputs) => {
    console.log('stageWordToDraw called')
    // for (let i = 0; i < 1; i++){
    for (let i = 0; i < wordArr.length; i++){
        buildGrid(availablePoints, gridBoxWidth, gridBoxHeight, wordArr[i],conflictingPointLocations, drawInputs)   
    }
}

export default stageWordToDraw; 