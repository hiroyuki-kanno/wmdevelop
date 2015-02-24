function getXHR() {
	var req;
	try {
		req = new XMLHttpRequest();
	} catch(e) {
		try {
			req = new ActiveXObject('Msxml2.XMLHTTP');
		}  catch(e) {
			req = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	return req;
}

function searchAddress() {

	var req = getXHR();

	// コールバック関数を定義
	req.onreadystatechange = function() {
		var result = document.getElementById('result');

		// 応答データ取得
		if (req.readyState == 4) {

			// HTTPステータスが200
			if (req.status == 200) {

				// jsonデータを取得
				var jsonData = eval('(' + req.responseText + ')');

				if (jsonData.code != 200) {
					document.forms['inquiry'].elements['addressPref'].value = '';
					document.forms['inquiry'].elements['addressCity'].value = '';
					result.innerHTML = '存在しない郵便番号です。';

				// 住所が取得できた場合、入力フォームに設定
				} else {
					document.forms['inquiry'].elements['addressPref'].value = jsonData.data.pref;
					document.forms['inquiry'].elements['addressCity'].value = jsonData.data.address;
					result.innerHTML = '';
				}

			} else {
				document.forms['inquiry'].elements['addressPref'].value = '';
				document.forms['inquiry'].elements['addressCity'].value = '';
				result.innerHTML = '通信エラーが発生しました。';
			}

			// 処理終了後、ローディング画像を非表示にする
			document.getElementById('loading').style.visibility = "hidden";

		} else {
			// 通信中の場合、ローディング画像を表示する
			document.getElementById('loading').style.visibility = "visible";
		}
	}

	req.open('GET', 'searchAddress?zipcode=' + document.forms['inquiry'].elements['zip1'].value
			+ document.forms['inquiry'].elements['zip2'].value, true);

	req.send(null);
}