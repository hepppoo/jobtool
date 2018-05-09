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
            menu.style.display = "block";
            document.getElementById("contents").style.display = "block";            document.getElementById("uploader").style.display = "none";

        } else {
            menu.style.display = "none";
            document.getElementById("contents").style.display = "none";            document.getElementById("uploader").style.display = "block";

        }

    }


    reset.addEventListener('click', function() {
        st.clear();
        location.reload();
    });

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

            menu.style.display = "block";
            showTagList();
            menuSwitch(true);
        }
    });

    function showTagList(){
        var str = '';
        str += '<thead><tr><th>tag name</th><th>firing trigger</th></tr></thead>'
        for (var i = 0, len = st.length; i < len; i++) {
            var k = st.key(i);
            console.log(k);
            var parsed = JSON.parse(st.getItem(k));

            // var k = JSON.parse(st.key(i));
            // var parsed = JSON.parse(st.getItem('tagId_'));
            //     $('#result1').html(parsed.name);

            if (parsed.tagId) {
                str += '<tbody><tr>';

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
                str += '</tr></tbody>';

            }
        }
        $('#res').html(str);
    }
});
