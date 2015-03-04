
var fileReader = new FileReader();
fileReader.onload = function(e){
	document.getElementById('dispGraphArea').innerHTML = e.target.result;
};

window.onload = function () {
	document.getElementById('dispGraphBtn').addEventListener('click', function (evt) {
		var inputFile = document.getElementById('inputFile').files[0];
		fileReader.readAsText(inputFile, "Shift-JIS");
	}
	, false);
}

