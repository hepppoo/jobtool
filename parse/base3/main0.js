$(function(){
    'use strict';

    var upload = document.getElementById('upload');
    var tag = document.getElementById('tag');
    var trriger = document.getElementById('trriger');
    var variables = document.getElementById('variables');

    upload.addEventListener('click', function () {
        var uploadFile = document.getElementById('upload-file');
        var file = uploadFile.files[0];
        if (!file) alert('ファイルを選択してください。');

        /********************************
         * upload処理
         ********************************/
        var uploadDataJson = new Object();
        var uploadDataCsv;
        var uploadText = document.getElementById('res');
        var reader = new FileReader();

        reader.readAsText(file);
        reader.onload = function () {
            // var readRes = reader.result;
            // そのまま表示
            // uploadText.innerHTML = reader.result;

            // if(localStorage){
            //     var st = localStorage;
            //     // st.setItem('data',JSON.stringify(value));
            //     st.setItem('data', value);
            //
            //     var show = function() {
            //         var parsed = JSON.parse(st.getItem('data'));
            //
            //         console.log(parsed.exportFormatVersion);
            //
            //         $('#result1').html(parsed[0]);
            //         $('#result2').html(parsed[1]);
            //         $('#result3').html(parsed[2]);
            //     };
            //     show();
            // }


            // JSONに変換
            uploadDataJson = JSON.parse(reader.result);
            // uploadDataJson = value;
            var length = Object.keys(uploadDataJson).length;
            console.log(length);

            // $('#result1').html(Object.keys(uploadDataJson).length);
            $('#result2').html(uploadDataJson.containerVersion.tag[0].accountId);
            $('#result3').html(uploadDataJson.containerVersion.tag[0].tagId);


            // CSVに変換
            uploadDataCsv = "test,test,test";



        }

        //menu表示
        document.getElementById('menu').style.display = "block";






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
});
