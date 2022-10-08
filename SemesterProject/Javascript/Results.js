let sumKey = localStorage.getItem("SUM");
let meanKey = localStorage.getItem("MEAN");
let varianceKey = localStorage.getItem("VARIANCE");
let standardDeviationKey = localStorage.getItem("STANDARDDEVIATION");

document.getElementById('sumOutput').textContent = "   " + sumKey;
document.getElementById('meanOutput').textContent = "   " + meanKey;
document.getElementById('varianceOutput').textContent = "   " + varianceKey;
document.getElementById('standardDeviationOutput').textContent = standardDeviationKey;
