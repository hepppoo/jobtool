$(function(){
    'use strict';

    var upload = document.getElementById('upload');
    var tag = document.getElementById('tag');
    var trriger = document.getElementById('trriger');
    var variables = document.getElementById('variables');
    if (localStorage) var st = localStorage;


    upload.addEventListener('click', function () {
        //uploadfile読み込み
        var uploadFile = document.getElementById('upload-file');
        // var file = uploadFile.files[0];
        var file = document.querySelector('input').files[0];

        if (!file) alert('ファイルを選択してください。');

        var uploadDataJson = new Object();
        // var uploadText = document.getElementById('res');
        var fileToRead = document.querySelector('input').files[0];
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

            showTagList();
        }
    });

    function showTagList(){
        var str = '';
        for (var i = 0, len = st.length; i < len; i++) {
            var k = st.key(i);
            console.log(k);
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
        }
        $('#res').html(str);
    }
});
