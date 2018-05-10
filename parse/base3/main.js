$(function(){
    'use strict';

    var upload = document.getElementById('upload');
    var menu = document.getElementById('menu');
    var tag = document.getElementById('tag');
    var trriger = document.getElementById('trriger');
    var variables = document.getElementById('variables');
    var reset = document.getElementById('reset');


    if (localStorage) var st = localStorage;
    if(st.length) {
        menuSwitch(true);
        showTagList();
    }else{
        menuSwitch(false);
    }

    function menuSwitch(bool){
        //menu切り替え
        if(bool){
            // menu.style.display = "block";
            // document.getElementById("contents").style.display = "block";            document.getElementById("uploader").style.display = "none";

        } else {
            // menu.style.display = "none";
            // document.getElementById("contents").style.display = "none";            document.getElementById("uploader").style.display = "block";

        }

    }


    reset.addEventListener('click', function() {
        st.clear();
        location.reload();
    });

    upload.addEventListener('click', function () {
        //uploadfile読み込み
        // var uploadFile = document.getElementById('upload-file');
        // var file = uploadFile.files[0];
        var file = document.querySelector('input#upload-file').files[0];

        if (!file){ alert('ファイルを選択してください。'); return;}

        var uploadDataJson = new Object();
        // var uploadText = document.getElementById('res');
        // var fileToRead = document.querySelector('input').files[0];
        var reader = new FileReader();

        reader.readAsText(file);
        reader.onload = function () {
            // JSONに変換
            uploadDataJson = JSON.parse(reader.result);
            if (!st) return;
            //タグ、トリガー、変数の情報をlocalStorageに格納
            $.each(uploadDataJson.containerVersion, function(i, e) {
                if(i == 'tag'){
                    $.each(e, function(ii, ee) {
                        st.setItem('tagId_' + ee["tagId"], JSON.stringify(ee));
                        console.log("tagid",ee["tagId"]);
                    });
                }
                if(i == 'trigger'){
                    $.each(e, function(ii, ee) {
                        st.setItem('triggerId_' + ee["triggerId"], JSON.stringify(ee));
                        console.log('triggerId', ee["triggerId"]);
                    });
                }
                if(i == 'variable'){
                    $.each(e, function(ii, ee) {
                        st.setItem('variableId_' + ee["variableId"], JSON.stringify(ee));
                        console.log('variableId', ee["variableId"]);
                    });
                }
            });

            // menu.style.display = "block";
            showTagList();
            menuSwitch(true);
        }
    });

    function showTagList(){
        var str = '';
        // str += '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">';
        str += '<table>';
        str += '<thead><tr><th>tag name</th><th>firing trigger</th></tr></thead>'
        str += '<tbody>';
        for (var i = 0, len = st.length; i < len; i++) {
            var k = st.key(i);
            // console.log(k);
            var parsed = JSON.parse(st.getItem(k));

            // var k = JSON.parse(st.key(i));
            // var parsed = JSON.parse(st.getItem('tagId_'));
            //     $('#result1').html(parsed.name);

            if (parsed.tagId) {
                str += '<tr>';

                str += '<td>' + parsed.name + '</td>';
                if (parsed.firingTriggerId) {
//todo:トリガーの分だけ回す
                    var trg = JSON.parse(st.getItem('triggerId_' + parsed.firingTriggerId[0]));
                    var trgName = "";

                    console.log(trg);

                    if(trg != null){
                        trgName = trg.name;
                    // } else if(trg == "2147479553") {
                    //     trgName = "All Page View";
                    }
                }
                str += '<td>' + trgName + '</td>';
                str += '</tr>';

            }
            str += '</tbody>';
            str += '</table>';

        }
        $('#res').html(str);
    }


    function tableToCSV(tableId, separator, delimiter) {
    var csvDataAry = []; // テーブルデータを配列に格納
    var csvDataTxt = ""; // テーブルデータをテキスト形式に格納
    var rowData; // 行データ
    var colData; // 列データ
    var delimStr = delimiter ? "'" : ""; // ダブルクォート囲い文字 true:あり | false:なし
    try {
        $("#" + tableId + " tr").each(function(rowIdx, row) { // テーブル行数分の処理を行う
            rowData = $(row).children();　// 行データを取得


            csvDataAry[rowIdx] = [];
            rowData.each(function(colIdx, col) { // テーブル列分の処理を行う
console.log(col);

                colData = $.trim($(col).text());  // 列ごとに文字列を取得
                csvDataAry[rowIdx][colIdx] = colData; // 列データを配列に格納
                csvDataTxt += delimStr + colData + delimStr + separator; // 区切り文字、囲い文字を追加
            });
            csvDataTxt = csvDataTxt.slice(0,-1); // 余分な区切り文字を削除
            csvDataTxt += "\r\n"; // 改行文字を追加
        });
    } catch(e) {
        return null;
    }
    return csvDataTxt;
}

    $(document).ready(function(){
        $("#download_csv").click(function(){
            var fileName = "テストデータ.csv";
            var csvData = tableToCSV("res", "\t", false);
            if (csvData == undefined || csvData == "") {
                alert("CSVデータを出力できません");
                return false;
            } else {
                var a = document.createElement('a');
                a.textContent = 'json file download';
                a.download = fileName;
                a.href = URL.createObjectURL(new Blob([csvData], {type: 'text.plain'}));
                a.dataset.downloadurl = ['text/plain', a.download_csv, a.href].join(':');
                var downloadLink = document.getElementById('csv_download');
                downloadLink.appendChild(a);
                //
                // $("#csvDownload").attr("download", fileName);
                // $("#csvDownload").attr("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvData));

            }
        });
    });

});
