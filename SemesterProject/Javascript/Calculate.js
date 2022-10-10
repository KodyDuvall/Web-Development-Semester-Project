document.getElementById('ButtonID').addEventListener('click', ButtonClick);
var buttonSound = new Audio("audio/ButtonSound.wav");

let userInput = "";
let tempString = "";
let isCorrectFormat;
let periodCount;//Because Javascript thinks things like 1.3.1.41.45 = 1.3  ?????
let entries = [];
let sum;
let mean;
let variance;
let mode;
let standardDeviation;

function ButtonClick(){
    window.localStorage.clear();
    buttonSound.play();
    
    sum = 0;
    mean = 0;
    variance = 0;
    standardDeviation = 0;
    periodCount = 0;
    mode = "";
    tempString = "";
    entries.splice(0, entries.length);//This removes all entries from the array
    isCorrectFormat = true;
    userInput = document.getElementById('TextAreaID').value;//get textarea contents

    /*
        The for loop below is rather large, busy, and perhaps somewhat unnecessarily convoluted, but I will 
        do my best to explain everything that is happening. 
    */

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
            }
        }
    
        else{//if current character is not a comma, it will check a few things
            if(isNaN(userInput[i]) && userInput[i] !== '.'){//here it will see if the character is not a number or if it is a period.
                isCorrectFormat = false;//if the character is not a number and is not a period, then it is impossible for it to be valid
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
    
                else{//if the character is not a period, then it must be a number, which is acceptable, so it is stored.
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
        sum = CalculateSum(entries);
        mean = CalculateMean(sum, entries.length);

        var e = document.getElementById("typeSelection");
        var value = e.value;
        var text = e.options[e.selectedIndex].text;

        if(text === "Population"){//if population radio button is selected, this if condition will be true
            variance = CalculateVariance(mean, entries, entries.length);
            standardDeviation = Math.sqrt(variance);
        }

        else if(text === "Sample"){//if sample radio button is selected, this else if condition will be true
            variance = CalculateVariance(mean, entries, entries.length - 1);
            standardDeviation = Math.sqrt(variance);
        }

        /*The commented code below was some debugging code. I am keeping it in just in case I need it again.
        alert("Sum: " + sum + " Mean: " + mean + " variance: " + variance + " Standard Deviation: " + standardDeviation);
        
        let arrayEles = "";
        for(let i = 0; i < entries.length; i++){
            arrayEles += "Entry # " + (i + 1) + ": " + entries[i] + " "
        }

        alert(arrayEles);
        */

        //usage of localStorage seems necessary in order for data to be transferred amongest different web pages
        //localStorage uses a Key-Value pair system, like the dictionary data structure
        localStorage.setItem("SUM", sum);
        localStorage.setItem("MEAN", mean);
        //localStorage.setItem("MODE", mode); //I haven't written the mode function yet
        localStorage.setItem("VARIANCE", variance);
        localStorage.setItem("STANDARDDEVIATION", standardDeviation);
        
        self.location = "calculationPage.html";//this is one way to open another page. self is called because the next webpage is locally found in a folder
    }
    
    else{//this else block handles what happens when one or more entries is not valid
        alert("Incorrect format");
        /*I want to do something else here other than just inform the user that the contents of the textarea is not in the
          right format using a pop-up message. I might want to make the text box red and as well or something.*/
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

