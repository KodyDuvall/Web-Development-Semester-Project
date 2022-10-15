let sumKey = localStorage.getItem("SUM");
let meanKey = localStorage.getItem("MEAN");
let varianceKey = localStorage.getItem("VARIANCE");
let standardDeviationKey = localStorage.getItem("STANDARDDEVIATION");
let modeKey = localStorage.getItem("MODE"); 
let modeOccurrenceKey = localStorage.getItem("MODENUM"); 
let entriesCountKey = localStorage.getItem("ENTRIESCOUNT");
let medianKey = localStorage.getItem("MEDIAN"); 

document.getElementById('sumOutput').textContent = sumKey;
document.getElementById('meanOutput').textContent = meanKey;
document.getElementById('varianceOutput').textContent = varianceKey;
document.getElementById('standardDeviationOutput').textContent = standardDeviationKey;
document.getElementById('modeTextArea').textContent = modeKey;
document.getElementById('modeNumLabel').textContent += modeOccurrenceKey + " time(s).";
document.getElementById('entriesCount').textContent = entriesCountKey;
document.getElementById('medianOutput').textContent = medianKey;