
// 入力ファイル読込オブジェクト
var fileReader = {
	reader : new FileReader(),
	text : null,
	readFile : function( inputFile ) {
		fileReader.reader.onload = function(e) {
			text = e.target.result;
			
		}
		fileReader.reader.readAsText(inputFile, "Shift-JIS");
	}
};

var barGraph = {
	labels : null,
	datasets : null,
	fillColor : "rgba(220,220,220,0.5)",
	strokeColor : "rgba(220,220,220,1)"
}

// イベント登録
window.onload = function () {
	// 棒グラフ表示イベント
	document.getElementById('barGraphBtn').addEventListener('click', function (evt) {
		var inputFile = document.getElementById('inputFile').files[0];
		fileReader.readFile(inputFile);
		var barChartData = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : 
				[
					{
						fillColor : barGraph.fillColor,
						strokeColor : barGraph.strokeColor,
						data : [65,59,90,81,56,55,40]
					}
				]
		}
		var myLine = new Chart(document.getElementById("dispGraphArea").getContext("2d")).Bar(barChartData);
		
	}
	, false);
	
	// 線グラフ表示イベント
	document.getElementById('lineGraphBtn').addEventListener('click', function (evt) {
		var inputFile = document.getElementById('inputFile').files[0];
		fileReader.readFile(inputFile);
		var lineChartData = {
			labels : ["January","February","March","April","May","June","July"],
			datasets : 
				[
				 	{
				 		fillColor : "rgba(220,220,220,0.5)",
				 		strokeColor : "rgba(220,220,220,1)",
				 		pointColor : "rgba(220,220,220,1)",
				 		pointStrokeColor : "#fff",
				 		data : [65,59,90,81,56,55,40]
			 		},
			 	]
		}
		var myLine = new Chart(document.getElementById("dispGraphArea").getContext("2d")).Line(lineChartData);
	}
	, false);
}

