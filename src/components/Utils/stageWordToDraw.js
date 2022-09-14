const selectRandTextDirection = () => {
    const textDirections = ['horizontalForward','horizontalForward','horizontalForward', 'horizontalForward', 'horizontalBackward', 'horizontalBackward', 'verticalDown', 'verticalUp', 'diagonalForwardDown', 'diagonalForwardUp', 'diagonalBackwardDown', 'diagonalBackwardUp'];
    let randTextDirection = textDirections[Math.floor(Math.random() * textDirections.length)];
     return randTextDirection; 
}


const genRandStartPos = (gridBoxWidth, gridBoxHeight) => {
    let randRow = Math.floor((Math.random() * 12) + 1); 
    let randCol = Math.floor((Math.random() * 16) + 1);
    let startPos = [randRow * gridBoxWidth, randCol * gridBoxHeight]; 
    return startPos;
}

const shiftTowardCenter = (gridBoxWidth, gridBoxHeight, splitWord, randTextDirection, startPos) => {
    let splitWordPoints = []; 
    let shiftTowardCenterFunctionReturnValues = null; 

    if (randTextDirection === 'horizontalForward' || randTextDirection === 'horizontalBackward'){  
            
            // Per startPos, determine word's right-most coordinate (Possibly overflows grid in X-direction)
            let wordGridSpaceX = (splitWord.length - 1) * gridBoxWidth; 
            let wordEndPositionX = startPos[0] + wordGridSpaceX;  
            
            // if overflow, shift word LEFT onto grid
            let rightEdgeOfGrid = gridBoxWidth * 12; 
            let gridOverflowInCoordsX = (wordEndPositionX - rightEdgeOfGrid);  
            let gridOverflowInUnitsX = gridOverflowInCoordsX / gridBoxWidth; 
            let shiftRangeMaxX = 12 - (splitWord.length - gridOverflowInUnitsX);
            let shiftRangeMinX = gridOverflowInUnitsX;  
          
            if (gridOverflowInCoordsX > 0){
                startPos[0] -= (((Math.floor(Math.random() * (shiftRangeMaxX + 1))) + shiftRangeMinX) * gridBoxWidth);
            }
           
            // startPos now set, add points of all characters to splitWordPoints array
            for (let i = 0; i < splitWord.length; i++){
                splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), startPos[1]]); 
            }; 
            shiftTowardCenterFunctionReturnValues = [startPos, splitWordPoints]; 

    } else if (randTextDirection === 'verticalDown' || randTextDirection === 'verticalUp'){
    
            // Per startPos, determine word's bottom-most coordinate (Possibly overflows grid in Y-direction)
            let wordGridSpaceY =(splitWord.length - 1) * gridBoxHeight; 
            let wordEndPositionY = startPos[1] + wordGridSpaceY;  
            
            // if overflow, shift word UP onto grid
            let bottomEdgeOfGrid = gridBoxHeight * 16; 
            let gridOverflowInCoordsY = (wordEndPositionY - bottomEdgeOfGrid);  
            let gridOverflowInUnitsY = gridOverflowInCoordsY / gridBoxHeight; 
            let shiftRangeMaxY = 16 - (splitWord.length - gridOverflowInUnitsY);
            let shiftRangeMinY = gridOverflowInUnitsY;  

            if (gridOverflowInCoordsY > 0){
                startPos[1] -= (((Math.floor(Math.random() * (shiftRangeMaxY + 1))) + shiftRangeMinY) * gridBoxHeight);
            }
            
            // startPos now set, add points of all characters to splitWordPoints array
            for (let i = 0; i < splitWord.length; i++){
                splitWordPoints.push([startPos[0], (startPos[1] + (gridBoxHeight * i))]); 
            }; 
            shiftTowardCenterFunctionReturnValues = [startPos, splitWordPoints]; 
        
    } else if (randTextDirection === 'diagonalForwardDown' || randTextDirection === 'diagonalBackwardDown'){

            // Per startPos, determine word's right-most & bottom-most coordinates (Possibly overflows grid in X and/or Y directions)
            let wordGridSpaceX = (splitWord.length - 1) * gridBoxWidth; 
            let wordEndPositionX = startPos[0] + wordGridSpaceX;  
            let wordGridSpaceY = (splitWord.length - 1) * gridBoxHeight; 
            let wordEndPositionY = startPos[1] + wordGridSpaceY;  
            
            // if overflow X, shift word LEFT onto grid
            let rightEdgeOfGrid = gridBoxWidth * 12; 
            let gridOverflowInCoordsX = (wordEndPositionX - rightEdgeOfGrid);  
            let gridOverflowInUnitsX = gridOverflowInCoordsX / gridBoxWidth; 
            let shiftRangeMaxX = 12 - (splitWord.length - gridOverflowInUnitsX);
            let shiftRangeMinX = gridOverflowInUnitsX;           

            if (gridOverflowInCoordsX > 0){
                startPos[0] -= (((Math.floor(Math.random() * (shiftRangeMaxX + 1))) + shiftRangeMinX) * gridBoxWidth);
            }
            // if overflow Y, shift word UP onto grid
            let bottomEdgeOfGrid = gridBoxHeight * 16; 
            let gridOverflowInCoordsY = (wordEndPositionY - bottomEdgeOfGrid);  
            let gridOverflowInUnitsY = gridOverflowInCoordsY / gridBoxHeight; 
            let shiftRangeMaxY = 16 - (splitWord.length - gridOverflowInUnitsY);
            let shiftRangeMinY = gridOverflowInUnitsY;  

            if (gridOverflowInCoordsY > 0){
                startPos[1] -= (((Math.floor(Math.random() * (shiftRangeMaxY + 1))) + shiftRangeMinY) * gridBoxHeight);
            }
            
            // startPos now set, add points of all characters to splitWordPoints array
            for (let i = 0; i < splitWord.length; i++){
                splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] + (gridBoxHeight * i))]); 
            }; 
            shiftTowardCenterFunctionReturnValues = [startPos, splitWordPoints]; 
                
    } else if (randTextDirection === 'diagonalForwardUp' || randTextDirection === 'diagonalBackwardUp'){
            // Per startPos, determine word's right-most & top-most coordinates (Possibly overflows grid in X and/or Y directions)
            let wordGridSpaceX =(splitWord.length - 1) * gridBoxWidth; 
            let wordEndPositionX = startPos[0] + wordGridSpaceX;  
            let wordGridSpaceY = (splitWord.length - 1) * gridBoxHeight; 
            let wordEndPositionY = startPos[1] - wordGridSpaceY;  
            
            // if overflow X, shift word LEFT onto grid
            let rightEdgeOfGrid = gridBoxWidth * 12; 
            let gridOverflowInCoordsX = (wordEndPositionX - rightEdgeOfGrid);  
            let gridOverflowInUnitsX = gridOverflowInCoordsX / gridBoxWidth; 
            let shiftRangeMaxX = 12 - (splitWord.length - gridOverflowInUnitsX);
            let shiftRangeMinX = gridOverflowInUnitsX;  

            if (gridOverflowInCoordsX > 0){
                startPos[0] -= (((Math.floor(Math.random() * (shiftRangeMaxX + 1))) + shiftRangeMinX) * gridBoxWidth);
            }
            // if overflow Y, shift word DOWN onto grid
            let gridOverflowInCoordsY = -wordEndPositionY;  
            let gridOverflowInUnitsY = gridOverflowInCoordsY / gridBoxHeight; 
            let shiftRangeMaxY = 16 - (splitWord.length - gridOverflowInUnitsY);
            let shiftRangeMinY = gridOverflowInUnitsY;  
           
            if (gridOverflowInCoordsY > 0){
                startPos[1] += (((Math.floor(Math.random() * (shiftRangeMaxY + 1))) + shiftRangeMinY) * gridBoxHeight);
            }
            
            // startPos now set, add points of all characters to splitWordPoints array
            for (let i = 0; i < splitWord.length; i++){
                splitWordPoints.push([(startPos[0] + (gridBoxWidth * i)), (startPos[1] - (gridBoxHeight * i))]); 
            }; 
            shiftTowardCenterFunctionReturnValues = [startPos, splitWordPoints]; 
    }
    return shiftTowardCenterFunctionReturnValues; 
}

const checkIfPointsAreAvailable = (availablePoints, splitWordPoints) => {
    let inputs = []; 
    let numCharsInWordAvailable = 0; 
    for (let i = 0; i < splitWordPoints.length; i++){
        availablePoints.forEach(el => {
            if (splitWordPoints[i][0] === el[0] && splitWordPoints[i][1] === el[1]){
                numCharsInWordAvailable++; 
            }
        });
    }
        
    if (numCharsInWordAvailable !== splitWordPoints.length){
        inputs.push('repeatLoop'); 
    } else {
        // remove splitWordPoints from availablePoints array
        for (let n = 0; n < availablePoints.length; n++){
            for (let p = 0; p < splitWordPoints.length; p++){
                if (availablePoints[n][0] === splitWordPoints[p][0] && availablePoints[n][1] === splitWordPoints[p][1]){
                    
                    // console.log(`${splitWordPoints[p]} removed from available points`); 
                    // console.log(`${availablePoints[n]} removed from available points`); 
                    availablePoints.splice(n,1); 
                    // console.log(`availablePoints: ${availablePoints.length}`); 
                }
            }      
        }
        
        inputs.push(splitWordPoints, availablePoints); 
    }
    return inputs; 
}

export { 
    selectRandTextDirection, genRandStartPos, shiftTowardCenter, checkIfPointsAreAvailable
}