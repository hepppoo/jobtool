$(function(){
    'use strict';

    var upload = document.getElementById('upload');
    var tag = document.getElementById('tag');
    var trriger = document.getElementById('trriger');
    var variables = document.getElementById('variables');

    upload.addEventListener('click', function () {
        //uploadfile読み込み
        var uploadFile = document.getElementById('upload-file');
        // var file = uploadFile.files[0];
        var file = document.querySelector('input').files[0];

        if (!file) alert('ファイルを選択してください。');

        var uploadDataJson = new Object();
        var uploadText = document.getElementById('res');
        var reader = new FileReader();

        reader.readAsText(file);
        reader.onload = function () {
            // JSONに変換
            uploadDataJson = JSON.parse(reader.result);

            //成形
            // console.log('length-->',Object.keys(uploadDataJson).length);

            // $('#result1').html(Object.keys(uploadDataJson).length);
            $.each(uploadDataJson.containerVersion, function(i, e) {
                // console.log('i-->',i);
                // console.log('e-->',e);

//console.log('length-->',Object.keys(e).length)

                if(i == 'tag'){
                    var rows = '';
                    $.each(e, function(ii, ee) {
                        console.log('ii-->',ii);
                        console.log('ee-->',ee);
                        console.log('ee.name-->',ee.name);

                        rows += '<tr><td>';
                        rows += ee.name;
                        rows += '</td></tr>';

                    });
                    $('#res').append(rows);

                }
                // $('#res').html('<small>' + e + '</small>');
            });

            // $('#result2').html(uploadDataJson.containerVersion.tag[0].accountId);
            // $('#result3').html(uploadDataJson.containerVersion.tag[0].tagId);
        }
    });
});
