document.getElementById('ButtonID').addEventListener('click', ButtonClick);

function ButtonClick(){
    window.localStorage.clear();
    let myModal = new bootstrap.Modal(document.getElementById('myModal1'));
    //buttonSound.play(); I couldn't get this working properly. I will see if I can another time.
    
    let sum = 0;
    let mean = 0;
    let variance = 0;
    let standardDeviation = 0;
    let periodCount = 0; //Because Javascript thinks things like 1.3.1.41.45 = 1.3
    let hyphenCount = 0;//I completely forgot about negative numbers, oops. (added 10/20/2022)
    let median = 0;
    let mode = "";
    let modeOccurrenceNum = "";
    let tempString = "";
    let entries = [];
    let modeInformationArray = [];
    let isCorrectFormat = true;
    let userInput = document.getElementById('TextAreaID').value;//get textarea contents

    /*
        The for loop below is rather large, busy, and perhaps somewhat unnecessarily convoluted, but I will 
        do my best to explain everything that is happening. 
    */

    entries.splice(0, entries.length);//This removes all entries from the array
    for(let i = 0; i < userInput.length; i++){
        if (userInput[i] === ','){//here it checks to see the current character is a comma (a crucial component to the required format)
            if(!parseFloat(tempString)){//Since commas signify the end of an entry, we need to check to see if the entry is valid
                isCorrectFormat = false;//if the entry is not valid, set this boolean variable to false, and break out of the loop
                break;
            }
            
            else{
                entries.push(parseFloat(tempString));//if the entry is valid, parse it to a numeric value and store it in the array
                tempString = "";//empty the string variable that temporarily stores the entry
                periodCount = 0;//reset this count for next entry
                hyphenCount = 0;
            }
        }
    
        else{//if current character is not a comma, it will check a few things
            if(isNaN(userInput[i]) && userInput[i] !== '.' && userInput[i] !== '-'){//here it will see if the character is not a number, a period, or a hyphen.
                isCorrectFormat = false;//if the character is not a number, hyphen, or a period then it is impossible for it to be valid
                break;//break out of loop to save time.
            }
            
            else{//if this point is reached, it is possible that the user has input a valid entry
                if(userInput[i] === '.'){//the user is allowed to enter periods because this calculator should be able to calculate non-whole numbers.
                    periodCount++;//increment variable    
    
                    if(periodCount === 2){//we need to make sure the user doesn't have more than one period per entry (Because Javascript wants do this: parseFloat(12.43.5) = 12.43)
                        isCorrectFormat = false;//if this is the case, then the user's input is not valid
                        break;
                    }
                    
                    else{//if this character is the only period for this entry, then the user's input could be valid and it needs to be stored into the tempString variable.
                        tempString += userInput[i];
                    }
                }

                //This handles negative numbers \
                else if(userInput[i] === '-'){
                    hyphenCount++;
    
                    if(hyphenCount === 2){
                        isCorrectFormat = false;
                        break;
                    }
                    
                    else{
                        tempString += userInput[i];
                    }
                }
                //end new code

                else{//if the character is not a period or a hyphen, then it must be a number, which is acceptable, so it is stored.
                    tempString += userInput[i];
                }
            }
        }
    }
    
    //the logic below handles what happens when user's input is or isn't valid

    if(isCorrectFormat){//this if block checks the last entry(because the loop only looks for commas to start checking an entry. As a result, the last entry needs to be assessed)
        if(!parseFloat(tempString)){
            isCorrectFormat = false;//if the last entry is not valid, make this boolean variable false
        }
    
        else{//if it is valid, store it in the arraylist
            entries.push(parseFloat(tempString));
        }
    }
    
    if(isCorrectFormat){//this if block handles what happens when all entries are considered valid
        sum = CalculateSum(entries);//calculate sum
        mean = CalculateMean(sum, entries.length);//calculate mean

        var e = document.getElementById("typeSelection");
        var text = e.options[e.selectedIndex].text;

        if(text === "Population"){//if population is selected from the dropdown menu, run the following code
            variance = CalculateVariance(mean, entries, entries.length);
            standardDeviation = Math.sqrt(variance);
        }

        else if(text === "Sample"){//if sample is selected from the dropdown menu, run the following code
            variance = CalculateVariance(mean, entries, entries.length - 1);
            standardDeviation = Math.sqrt(variance);
        }

        median = FindMedian(entries);//calculate median

        modeInformationArray = DetermineModes(entries);//copy data from function to this array
        mode = modeInformationArray[0];//get mode
        modeOccurrenceNum = modeInformationArray[1];//get the number of times each mode occurred 

        //usage of localStorage seems necessary in order for data to be transferred amongest different web pages
        //localStorage uses a Key-Value pair system, like the dictionary data structure
        localStorage.setItem("SUM", sum);
        localStorage.setItem("MEDIAN", median); 
        localStorage.setItem("MEAN", mean);
        localStorage.setItem("MODE", mode); 
        localStorage.setItem("MODENUM", modeOccurrenceNum); 
        localStorage.setItem("VARIANCE", variance);
        localStorage.setItem("ENTRIESCOUNT", entries.length);
        localStorage.setItem("STANDARDDEVIATION", standardDeviation);
        
        self.location = "calculationPage.html";//this is one way to open another page. self is called because the next webpage is locally found in a folder
    }
    
    else{//this else block handles what happens when one or more entries is not valid
        //alert("Incorrect format");
        myModal.show();
        document.getElementById("ERROR").textContent = "Incorrect format.";
    }
}

//below are the calculation functions.
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
    //Note that arrayLength is a necessary parameter here due to the distinction between the sample/population formulas
}

/*
    Below is the function that determines the mode(s) of the entries. My code here is probably very inefficient. 
    I just could not think of another way for the program to determine the mode(s) of the entries. If you know of 
    a better way of finding the mode(s), please rewrite it as you see fit!
*/

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

//I tried to get a little clever with this function. I might start writing more code like this to keep the files shorter.
function FindMedian(entriesArray){
    entriesArray.sort(function(a, b){return b - a});//sort the array. It being in reverse doesn't matter for finding the median

    if(entriesArray.length % 2 === 1){//if the length of the entries is odd, then we find the median by finding the central value. The median is equal to exactly this value.
        return (entriesArray[(Math.ceil(entriesArray.length / 2) - 1)]);//one way of finding the median if entry count is odd
    }

    else{//if the length of the entries is even, then the median is equal to the two most central values being halved. 
        return ((entriesArray[(entriesArray.length / 2) - 1] + entriesArray[(entriesArray.length / 2)]) / 2);//this is one way of finding the median when the entries count is even
    }
}