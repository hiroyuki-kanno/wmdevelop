// Chartオブジェクト
var graphObj;

// 入力ファイル読込オブジェクト
var fileReader = {
	reader : new FileReader(),
	text : null,
	readEvent : null,
	readFile : function( inputFile ) {
		fileReader.reader.onload = function(e) {
			fileReader.text = e.target.result;
			fileReader.readEvent();
		}
		fileReader.reader.readAsText(inputFile, "Shift-JIS");
	}
};

var barGraph = {
	labels : null,
	datasets : [],
	fillColor : "rgba(220,220,220,0.5)",
	strokeColor : "rgba(220,220,220,1)",
	addData : function(data) {
		var	dataset = {
			fillColor : barGraph.fillColor,
			strokeColor : barGraph.strokeColor,
			data : data
		}
		barGraph.datasets.push(dataset)
	},
	dispGraph : function() {
		var chartData = {
			labels : barGraph.labels,
			datasets : barGraph.datasets
		}
		graphObj = new Chart(document.getElementById("dispGraphArea").getContext("2d")).Bar(chartData);
	},
	clearData : function () {
		barGraph.datasets = [];
	}
}

var lineGraph = {
	labels : null,
	datasets : [],
	fillColor : "rgba(220,220,220,0.5)",
	strokeColor : "rgba(220,220,220,1)",
	pointColor : "rgba(220,220,220,1)",
	pointStrokeColor : "#fff",
	addData : function(data) {
		var	dataset = {
			fillColor : lineGraph.fillColor,
			strokeColor : lineGraph.strokeColor,
			pointColor : lineGraph.pointColor,
			pointStrokeColor : lineGraph.pointStrokeColor,
			data : data
		}
		lineGraph.datasets.push(dataset)
	},
	dispGraph : function() {
		var chartData = {
			labels : lineGraph.labels,
			datasets : lineGraph.datasets
		}
		graphObj = new Chart(document.getElementById("dispGraphArea").getContext("2d")).Line(chartData);
	},
	clearData : function () {
		lineGraph.datasets = [];
	}
}

// イベント登録
window.onload = function () {
	// 棒グラフ表示イベント
	document.getElementById('barGraphBtn').addEventListener('click', function (evt) {
		var inputFile = document.getElementById('inputFile').files[0];
		// 読み込み後イベントの登録
		fileReader.readEvent = function () {
			var csvData = new String(fileReader.text);
			var csvContents = csvData.split("\r\n");
			barGraph.labels = new String(csvContents[0]).split(",");
			barGraph.addData(new String(csvContents[1]).split(","));
			barGraph.dispGraph();
		}
		fileReader.readFile(inputFile);
	}
	, false);
	
	// 線グラフ表示イベント
	document.getElementById('lineGraphBtn').addEventListener('click', function (evt) {
		var inputFile = document.getElementById('inputFile').files[0];
		// 読み込み後イベントの登録
		fileReader.readEvent = function () {
			var csvData = new String(fileReader.text);
			var csvContents = csvData.split("\r\n");
			lineGraph.labels = new String(csvContents[0]).split(",");
			lineGraph.addData(new String(csvContents[1]).split(","));
			lineGraph.dispGraph();
		}
		fileReader.readFile(inputFile);
	}
	, false);
	
	// クリアイベント
	document.getElementById('clearGraphBtn').addEventListener('click', function (evt) {
		barGraph.clearData();
		lineGraph.clearData();
		var cvs = document.getElementById("dispGraphArea");
		cvs.getContext("2d").clearRect(0, 0, cvs.width, cvs.height);
		graphObj.destroy();
	}
	, false);
}

