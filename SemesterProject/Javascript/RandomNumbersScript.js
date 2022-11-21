/*
    I tried putting this code in the results script, but it wouldn't work. I am not entirely sure why.
 */

document.getElementById('ButtonID_RanNums').addEventListener('click', ButtonClicked);

function ButtonClicked(){
    let isCorrrectFormat = true;
    let spaceErrorDetected = false;
    let hyphenCount = 0;
    let periodCount = 0;
    let lowerBound = 0.0;
    let upperBound = 0.0;
    let quantityOfRanNums = 0;
    let sum = 0;
    let mean = 0;
    let variance = 0;
    let standardDeviation = 0;
    let median = 0;
    let mode = "";
    let modeOccurrenceNum = "";
    let errorMessage = "";
    let ranNumString = "";
    let userInput = document.getElementById('countOfRandomNums').value;
    let e = document.getElementById("intOrDec");
    let text = e.options[e.selectedIndex].text;
    let ranNumsArray = [];
    let modeInformationArray = [];
    ranNumsArray.splice(0, ranNumsArray.length);
    /*
        You may notice that even if an error in the user's formatting is found, that this function will still
        keep searching for erorrs. I wrote it this way because I wanted the user to see nearly every error that he or she
        makes, and there can't be that many iterations to begin with (limited by the maxlength CSS rule). So the 
        efficieny will not really take that much of an impact (at least for the user input validation part!) .
    */

    if(userInput.length === 0){
        isCorrrectFormat = false;
        errorMessage += "You need to enter something in the text box when asked how many random numbers you want generated." + 
        " Please do not leave any text boxes empty." + "\r\n" + "\r\n";
    }
    
    else if(userInput.indexOf(' ') >= 0){
        isCorrrectFormat = false;

        if(!spaceErrorDetected){//to prevent erorr message duplication
            errorMessage += "Spaces are not allowed in any textbox." + "\r\n" + "\r\n";
            spaceErrorDetected = true;
        }
    }

    else{
        for(let i = 0; i < userInput.length; i++){
            if(isNaN(userInput[i])){
                isCorrrectFormat = false;
                errorMessage += "Please ensure that your input is numeric and greater than zero when asked how " +
                "many random numbers you want generated." + "\r\n" + "\r\n";
                break;
            }
        }

        if(isCorrrectFormat){
            if(parseInt(userInput) > 2000 || parseInt(userInput) === 0){
                isCorrrectFormat = false;
                errorMessage += "The number you entered when asked how many random numbers you want to generate must be greater than 0 and less than or equal to 2000." + "\r\n" + "\r\n";
            }
            
            else{
                quantityOfRanNums = parseInt(userInput);
            }
        }
    }

    if(text === "Generate Whole Numbers"){
        userInput = document.getElementById('lowerBound').value;
        
        if(userInput.length === 0){
            isCorrrectFormat = false;
            errorMessage += "You need to enter something in the text box when asked for the lower bound." + 
            " Please do not leave any text boxes empty." + "\r\n" + "\r\n";           
        }

        else if(userInput.indexOf(' ') >= 0){
            isCorrrectFormat = false;
    
            if(!spaceErrorDetected){//to prevent erorr message duplication
                errorMessage += "Spaces are not allowed in any textbox." + "\r\n" + "\r\n";
                spaceErrorDetected = true;
            }
        }

        else{
            for(let i = 0; i < userInput.length; i++)   {
                if(userInput[i] !== '-' && isNaN(userInput[i])){
                    isCorrrectFormat = false;
                    errorMessage += "You must enter a whole number when asked for a the lower bound." + "\r\n" + "\r\n";           
                    break;
                }

                else if(userInput[i] === '-'){
                    hyphenCount++;

                    if(hyphenCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a whole number when asked for a the lower bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }
            }

            if(isCorrrectFormat){
                lowerBound = parseInt(userInput);
            }
        }

        userInput = document.getElementById('upperBound').value;

        if(userInput.length === 0){
            isCorrrectFormat = false;
            errorMessage += "You need to enter something in the text box when asked for the upper bound." + 
            " Please do not leave any text boxes empty." + "\r\n" + "\r\n";           
        }

        else if(userInput.indexOf(' ') >= 0){
            isCorrrectFormat = false;
    
            if(!spaceErrorDetected){//to prevent erorr message duplication
                errorMessage += "Spaces are not allowed in any textbox." + "\r\n" + "\r\n";
                spaceErrorDetected = true;
            }
        }

        else{
            hyphenCount = 0;
            for(let i = 0; i < userInput.length; i++)   {
                if(userInput[i] !== '-' && isNaN(userInput[i])){
                    isCorrrectFormat = false;
                    errorMessage += "You must enter a whole number when asked for a the upper bound." + "\r\n" + "\r\n";           
                    break;
                }

                else if(userInput[i] === '-'){
                    hyphenCount++;

                    if(hyphenCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a whole number when asked for a the upper bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }
            }

            if(isCorrrectFormat){
                upperBound = parseInt(userInput);
            }
        }

        if(isCorrrectFormat && lowerBound >= upperBound){
            isCorrrectFormat = false;
            errorMessage += "You lower bound cannot be greater than or equal to your upper bound." + "\r\n" + "\r\n";           
        }
    }

    else{//I could have written a function to cut down on some code duplication, but since if/else blocks are used, efficiency shouldn't take too much of a hit.
        userInput = document.getElementById('lowerBound').value;
        
        if(userInput.length === 0){
            isCorrrectFormat = false;
            errorMessage += "You need to enter something in the text box when asked for the lower bound." + 
            " Please do not leave any text boxes empty." + "\r\n" + "\r\n";           
        }

        else if(userInput.indexOf(' ') >= 0){
            isCorrrectFormat = false;
    
            if(!spaceErrorDetected){//to prevent erorr message duplication
                errorMessage += "Spaces are not allowed in any textbox." + "\r\n" + "\r\n";
                spaceErrorDetected = true;
            }
        }

        else{
            for(let i = 0; i < userInput.length; i++)   {
                if(userInput[i] !== '-' && userInput[i] !== '.' && isNaN(userInput[i])){
                    isCorrrectFormat = false;
                    errorMessage += "You must enter a number when asked for a the lower bound." + "\r\n" + "\r\n";           
                    break;
                }

                else if(userInput[i] === '-'){
                    hyphenCount++;

                    if(hyphenCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a number when asked for a the lower bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }

                else if(userInput[i] === '.'){
                    periodCount++;

                    if(periodCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a number when asked for a the lower bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }
            }

            if(isCorrrectFormat){
                lowerBound = parseFloat(userInput);
            }
        }

        userInput = document.getElementById('upperBound').value;

        if(userInput.length === 0){
            isCorrrectFormat = false;
            errorMessage += "You need to enter something in the text box when asked for the upper bound." + 
            " Please do not leave any text boxes empty." + "\r\n" + "\r\n";           
        }

        else if(userInput.indexOf(' ') >= 0){
            isCorrrectFormat = false;
    
            if(!spaceErrorDetected){//to prevent erorr message duplication
                errorMessage += "Spaces are not allowed in any textbox." + "\r\n" + "\r\n";
                spaceErrorDetected = true;
            }
        }

        else{
            hyphenCount = 0;
            periodCount = 0;
            
            for(let i = 0; i < userInput.length; i++){
                if(userInput[i] !== '-' && userInput[i] !== '.' && isNaN(userInput[i])){
                    isCorrrectFormat = false;
                    errorMessage += "You must enter a number when asked for a the upper bound." + "\r\n" + "\r\n";           
                    break;
                }

                else if(userInput[i] === '-'){
                    hyphenCount++;

                    if(hyphenCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a number when asked for a the upper bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }

                else if(userInput[i] === '.'){
                    periodCount++;

                    if(periodCount === 2){
                        isCorrrectFormat = false;
                        errorMessage += "You must enter a number when asked for a the lower bound." + "\r\n" + "\r\n";           
                        break;
                    }
                }

                if(isCorrrectFormat){
                    upperBound = parseFloat(userInput);
                }
            }

            if(isCorrrectFormat && lowerBound >= upperBound){
                isCorrrectFormat = false;
                errorMessage += "You lower bound cannot be greater than or equal to your upper bound." + "\r\n" + "\r\n";           
            } 
        }
    }

    if(lowerBound > 100000000 || lowerBound < -100000000 || upperBound > 100000000 || upperBound < -100000000){
        isCorrrectFormat = false;
        errorMessage += "Your lower and upper bounds cannot be less than -100000000 or greater than 100000000." + "\r\n" + "\r\n";
    }

    if(!isCorrrectFormat){
        alert(errorMessage);
    }

    else{
        ranNumsArray = getRandomNumbers(lowerBound, upperBound, quantityOfRanNums, text);
        
        for(let i = 0; i < ranNumsArray.length; i++){
            ranNumString += ranNumsArray[i] + ", ";
        }

        ranNumString = ranNumString.slice(0, -1);
        ranNumString = ranNumString.slice(0, -1);
       
        if(text === "Generate Whole Numbers"){//the sum looked werid to me with trailing zeros when generating whole numbers
            sum = CalculateSum(ranNumsArray);    
        }
        else{
            sum = CalculateSum(ranNumsArray).toFixed(5);
        }
        
        mean = CalculateMean(sum, ranNumsArray.length);
        median = FindMedian(ranNumsArray);
        modeInformationArray = DetermineModes(ranNumsArray);
        mode = modeInformationArray[0];
        modeOccurrenceNum = modeInformationArray[1];

        let E = document.getElementById("typeSelectionRandomNums");
        let textE = E.options[e.selectedIndex].text;

        if(textE === "Population"){//if population is selected from the dropdown menu, run the following code
            variance = CalculateVariance(mean, ranNumsArray, ranNumsArray.length);
            standardDeviation = Math.sqrt(variance);
        }

        else if(textE === "Sample"){//if sample is selected from the dropdown menu, run the following code
            variance = CalculateVariance(mean, ranNumsArray, ranNumsArray.length - 1);
            standardDeviation = Math.sqrt(variance);
        }

        document.getElementById('randomNumbersTextArea').textContent = ranNumString;        
        document.getElementById('sumOutputRan').textContent = sum;
        document.getElementById('meanOutputRan').textContent = mean.toFixed(5);
        document.getElementById('varianceOutputRan').textContent = variance.toFixed(5);
        document.getElementById('standardDeviationOutputRan').textContent = standardDeviation.toFixed(5);
        document.getElementById('modeTextAreaRan').textContent = mode;
        document.getElementById('modeNumLabelRan').textContent = "Mode(s) for random numbers found below. Each value occured " + modeOccurrenceNum + " time(s).";
        document.getElementById('entriesCountRan').textContent = ranNumsArray.length;
        document.getElementById('medianOutputRan').textContent = median;//wasn't sure if I should fix the median or not. I will leave it unfixed for now
    }
}

function getRandomNumbers(lBound, uBound, quantity, type){
    let numsArray = [];

    if(type === "Generate Whole Numbers"){
        for(let i = 0; i < quantity; i++){
            numsArray[i] = Math.floor(Math.random() * ((uBound + 1) - lBound) + lBound);
        }
    }

    else{//TODO: I need to figure out a way to deal with fractional lower and upper bounds. 
        for(let i = 0; i < quantity; i++){
            numsArray[i] = parseFloat((Math.random() * ((uBound) - lBound) + lBound).toFixed(5));
            //For whatever reason, the above line of code was being treated as a string, resulting in UI bugs.
            //That is why that parseFloat is there.
        }
    }

    return numsArray;
}

//Below I just copied and pasted the code from our other file

function CalculateSum(array){
    let sum = 0;

    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }

    return sum;
}

function CalculateMean(sum, arrayLength){
    let mean = sum / arrayLength;

    return mean;
}

function CalculateVariance(mean, array, arrayLength){
    let variance = 0;

    for(let i = 0; i < array.length; i++){
        variance += Math.pow(array[i] - mean, 2);
    }

    return (variance = variance / arrayLength);
}

function DetermineModes(entriesArray){
    let count;
    let currentElement;
    let maximumCount;
    let modesString = "";
    let countArray = [];
    let countParallelArray = [];
    let resultantArray = []; //because I needed to return more than one variable. This might be considered bad practice, not sure lol

    entriesArray.sort(function(a, b){return b - a});
    
    for(let i = 0; i < entriesArray.length; i++){
        currentElement = entriesArray[i];//get the current element in the entriesArray
        count = 0;//the count needs to be reset to zero for each iteration

        if(currentElement === entriesArray[i + 1]){//this is here to save time on useless checks
            for(let I = i; I < entriesArray.length; I++){
                if(currentElement === entriesArray[I]){//if the current element is equal to another element in the entriesArray, it will have occured more than once
                    count++;//incrment count
                    i++;//we want to increment i to ensure that the same value is not processed multiple times
    
                    if(I === entriesArray.length - 1){ //to ensure last element is captured
                        countArray.push(count);//store the count of this element in the count array
                        countParallelArray.push(currentElement);//store the actual value in this array. 
                        break;//break out of the inner loop
                    }
                }
    
                else{//if the current element that is being assessed does not equal the element of EntriesArray[I], then, because the array is sorted, the current element's value won't appear again in the array, and therefore we have its maximum count
                    countArray.push(count);//store the count of this element in the count array
                    countParallelArray.push(currentElement);//store the actual value in this array. 
                    i--;//We need to decrement i because once we break out of the inner loop, i will be incremented by the for loop's condition. We need to ensure we set currentElement to the correct element in the array.
                    break;//break out of the inner loop
                }
            }
        }
    }

    maximumCount = 1;//set the maximum variable to 1 because each value must have occured at least once.

    for(let i = 0; i < countArray.length; i++){//find max
        if(countArray[i] > maximumCount){
            maximumCount = countArray[i];
        }
    }

    if(maximumCount === 1){//if the max count is equal to 1, then there is no reason to show the user the mode because then every entry would be the mode.
        resultantArray[0] = "No value has a frequency greater than one.";//this will be shown to the user
        resultantArray[1] = maximumCount.toString();//go ahead and inform the user that each value occured at least once. why not 

        return resultantArray;
    }

    else{
        for(let i = 0; i < countArray.length; i++){
            if(countArray[i] === maximumCount){
                modesString += countParallelArray[i].toString() + ", ";//I want to show the user the modes with commas inbetween each value. This will add a comma and a space at the end of each value.
            }
        }

        modesString = modesString.slice(0, -1);//remove the space at the end of this string
        modesString = modesString.slice(0, -1);//remove the comma at the end of this string.
        resultantArray[0] = modesString;//store the string of modes in this array
        resultantArray[1] = maximumCount.toString();//store their maximum count in this array

        return resultantArray;//returns an array because I needed to return more then one value. I am sure there is a better way of doing this, but I was unable to find a better solution at the time I wrote this code.
    }    
}

function FindMedian(entriesArray){
    entriesArray.sort(function(a, b){return b - a});//sort the array. It being in reverse doesn't matter for finding the median

    if(entriesArray.length % 2 === 1){//if the length of the entries is odd, then we find the median by finding the central value. The median is equal to exactly this value.
        return (entriesArray[(Math.ceil(entriesArray.length / 2) - 1)]);//one way of finding the median if entry count is odd
    }

    else{//if the length of the entries is even, then the median is equal to the two most central values being halved. 
        return ((entriesArray[(entriesArray.length / 2) - 1] + entriesArray[(entriesArray.length / 2)]) / 2);//this is one way of finding the median when the entries count is even
    }
}