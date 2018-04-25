var upload = document.getElementById('upload');
var tag = document.getElementById('tag');
var trriger = document.getElementById('trriger');
var variables = document.getElementById('variables');

function makeTable(data){
    var json = data;
    var callbackFunc = function() { document.getElementById('test-callback').innerHTML = 'Generated by a callback function'};
    JsonToHtmlTable(document.getElementById('test-table'), json, callbackFunc);
}

function makeTagTable(data){
    getElementById('res').innerHTML = data[0];
}

// uploadボタンを使わずファイル選択したらすぐuploadしたい場合は、changeを使う
// uploadFile.addEventListener('change', function() {

// uploadボタンをクリックでアップロード処理をし、ダウンロード用リンクを作成する
upload.addEventListener('click', function () {
    var uploadFile = document.getElementById('upload-file');
    var file = uploadFile.files[0];
    if (!file) alert('ファイルを選択してください。');

    /********************************
     * upload処理
     ********************************/
    var uploadDataJson;
    var uploadDataCsv;
    var uploadText = document.getElementById('res');
    var reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function () {
        var value = reader.result;
        // そのまま表示
        // uploadText.innerHTML = reader.result;

        //todo:一覧表示
        makeTable(value);

        // JSONに変換
        uploadDataJson = JSON.parse(value);
        // CSVに変換
        uploadDataCsv = "test,test,test";

    }

    //menu表示
    document.getElementById('menu').style.display = "block";

    tag.addEventListener('click', function (uploadDataJson) {
        makeTagTable(uploadDataJson);
    });


    /********************************
     * download用リンクの作成
     ********************************/
    //reader.onloadが非同期処理なので、ちょっとだけ遅延させる
    setTimeout(function () {
        var downloadFile = JSON.stringify(uploadDataJson);
        var a = document.createElement('a');
        a.textContent = 'json file download';
        a.download = 'file.json';
        a.href = URL.createObjectURL(new Blob([downloadFile], {type: 'text.plain'}));
        a.dataset.downloadurl = ['text/plain', a.json_download, a.href].join(':');

        var downloadLink = document.getElementById('json_download');
        downloadLink.appendChild(a);

        var downloadFile = JSON.stringify(uploadDataCsv);
        var a = document.createElement('a');
        a.textContent = 'csv file download';
        a.download = 'file.csv';
        a.href = URL.createObjectURL(new Blob([downloadFile], {type: 'text.plain'}));
        a.dataset.downloadurl = ['text/plain', a.csv_download, a.href].join(':');

        var downloadLink = document.getElementById('csv_download');
        downloadLink.appendChild(a);

    }, 1000);
});
