let updatedPointsArr = null; 
const checkIfPointIsAvailable = (availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxHeight) => {
    console.log('checkIfPointIsAvailable')
    // for each splitWordPoint
        // walk through availablePoints
            // -> if point is not available => modify point & start over function call
            // -> if point is available => remove from available points & add to drawInputs

    // determine if word is available
    let numPointsAvailable = 0; 
    let wordAvailable = null; 
    for (let i = 0; i < splitWordPoints.length; i++){ 
        availablePoints.forEach(el => {
        // if point is not available
        if (splitWordPoints[i][0] === el[0] && splitWordPoints[i][1] === el[1]){
            numPointsAvailable++; 
            console.log(numPointsAvailable); 
        } 
        })
    }

    // either modify or draw
    if (numPointsAvailable !== splitWordPoints.length){
        console.log('modify'); 
        console.log(splitWordPoints); 
            // check if I can move it down
            if ((splitWordPoints[0][1] + gridBoxHeight) > (gridBoxHeight * 17)){
                console.log('move points to top'); 
                for (let j = 0; j < splitWordPoints.length; j++){
                    splitWordPoints[j][1] = gridBoxHeight; 
                }
                console.log(splitWordPoints)
            } else {
                console.log('move points down'); 
                for (let k = 0; k < splitWordPoints.length; k++){
                    splitWordPoints[k][1]+=gridBoxHeight;
                }
                console.log(splitWordPoints)
            }
        // call function again with new arguments
        checkIfPointIsAvailable(availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxHeight); 
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
        // drawInputs.push(splitWord, splitWordPoints); 
        return drawInputs; 
    }
}

const shiftLeft = (availablePoints, startPos, splitWord, gridBoxWidth, gridBoxHeight, conflictingPointLocations, drawInputs) => {
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
    checkIfPointIsAvailable(availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxHeight); 
}
const genRandStartPos = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    console.log('genRandStartPos called'); 
    let randRow = Math.floor((Math.random() * 12) + 1); 
    let randCol = Math.floor((Math.random() * 16) + 1);
    let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
    console.log(`${word} startPos: ${startPos}`); 
    let splitWord = word.split(''); 
    console.log(startPos);
    shiftLeft(availablePoints, startPos, splitWord, gridBoxWidth, gridBoxHeight, conflictingPointLocations, drawInputs);
}

const stageWordToDraw = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    console.log('stageWordToDraw called')
    console.log(word); 
    genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs)   
}

export {
    stageWordToDraw,
    updatedPointsArr
}; 

// const stageWordToDraw = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    //     console.log('stageWordToDraw called')
    //     console.log(word); 
    //         buildGrid(availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs)   
    // }
    
    // const buildGrid = (availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs) => {
    //     console.log('buildGrid called'); 
    
    //         let gridPoints = []; 
    //         // let boxCount = 0; 
    //         for (let i = 0; i < 12; i++){
    //             for (let j = 0; j < 17; j++){
    //                 gridPoints.push([(i * gridBoxWidth) + gridBoxWidth, j * gridBoxHeight]); 
    //                 // boxCount += 1;
    //             }
    //         }
    //         availablePoints = gridPoints; 
    //         console.log(availablePoints); 
    
    //     genRandStartPos(availablePoints, gridBoxWidth, gridBoxHeight, word, conflictingPointLocations, drawInputs)
    // }
   
    // const checkIfPointIsAvailable = (availablePoints, splitWord, splitWordPoints, conflictingPointLocations, drawInputs, gridBoxHeight) => {
        //     console.log('checkIfPointIsAvailable called'); 
        //     console.log(conflictingPointLocations); 
        //     let pointIsAvailable = null;
//     for (let i = 0; i < splitWordPoints.length; i++){
//         let pointsUnequalToEl = 0; 
//         let pointsEqualToEl = 0; 
//         availablePoints.forEach(el => {
//             if (splitWordPoints[i][0] !== el[0] || splitWordPoints[i][1] !== el[1]){ 
//                 pointsUnequalToEl++; 
//             } else {
//                 console.log(`${Math.floor(el[0])},${Math.floor(el[1])} === ${Math.floor(splitWordPoints[i][0])},${Math.floor(splitWordPoints[i][1])}`);
//                 pointsEqualToEl++;
//             }
//             // console.log(pointsUnequalToEl); // if === 192, point is not available
//             // if (pointsUnequalToEl === availablePoints.length){
//             //     return pointIsAvailable = true;
//             // } else {
//             //     return pointIsAvailable = false; 
//             // }
//             if (pointsEqualToEl > 0){ // bad logic *****
//                 return pointIsAvailable = true; 
//             } else {
//                 return pointIsAvailable = false; 
//             }

            
//         });
//         if (pointIsAvailable === false){
//             conflictingPointLocations++;
//             // modify & restart function
//             console.log('change to new row, call again***********');
//         } else {
//             console.log('ready to draw, removing points from available array'); 
//             for (let j = 0; j < availablePoints.length; j++){
//                 if ( availablePoints[j][0] === splitWordPoints[i][0] && availablePoints[j][1] === splitWordPoints[i][1]){
//                     console.log(`removing ${availablePoints[j][0]},${availablePoints[j][1]} | ${splitWordPoints[i][0]},${splitWordPoints[i][1]}`)
//                     availablePoints.splice(j,1); 
//                 }
//             }

//         }
//         console.log(conflictingPointLocations); 
//     }


//     drawInputs.push(splitWord, splitWordPoints); 
//     console.log(drawInputs); 
//     return drawInputs; 
// }