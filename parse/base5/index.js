let upload = document.getElementById('upload');
let tagBtn = document.getElementById('tag');
let triggerBtn = document.getElementById('trriger');
let variableBtn = document.getElementById('variables');

// uploadボタンを使わずファイル選択したらすぐuploadしたい場合は、changeを使う
// uploadFile.addEventListener('change', function() {

// uploadボタンをクリックでアップロード処理をし、ダウンロード用リンクを作成する
upload.addEventListener('click', function () {
    let uploadFile = document.getElementById('upload-file');
    let file = uploadFile.files[0];
    if (!file) alert('ファイルを選択してください。');

    /********************************
     * upload処理
     ********************************/
    let uploadDataJson;
    let uploadDataCsv;
    let uploadText = document.getElementById('res');
    let reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function () {
        let jsonData = JSON.parse(reader.result);
        // そのまま表示
        // uploadText.innerHTML = reader.result;

        //console.log(jsonData[0].containerVersion.tag[0].name);
        let jsonDataContainer = jsonData.containerVersion;
        let jsonDataTags = jsonDataContainer.tag;
        let jsonDataTriggers = jsonDataContainer.trigger;
        let jsonDataVariables = jsonDataContainer.variable;

        //トリガー配列作成
        let triggerSet = {};
        if (Array.isArray(jsonDataTriggers)) {
            for (let i = 0; i < jsonDataTriggers.length; i++) {
                let triggerName = jsonDataTriggers[i].name;
                let triggerId = String(jsonDataTriggers[i].triggerId);
                triggerSet[triggerId] = triggerName;
            }
            //console.log(triggerSet);
        }
        let htmlTable = "<table id='tbl'>";
        htmlTable += "<tr><td>tag name</td><td>trigger</td></tr>"
        for (let i = 0; i < jsonDataTags.length; i++) {
            let tagName = jsonDataTags[i].name;
            htmlTable += "<tr><td>" + tagName + "</td>";

            htmlTable += "<td>";
            if (Array.isArray(jsonDataTags[i].firingTriggerId)) {
                for (let j = 0; j < jsonDataTags[i].firingTriggerId.length; j++) {
                    let triggerId = jsonDataTags[i].firingTriggerId[j];
                    if (typeof triggerSet[triggerId] === "undefined") {
                        htmlTable += "[ trigger id：" + triggerId + " ] ";
                    } else {
                        htmlTable += "『" + triggerSet[triggerId] + "』";
                    }
                }
            }
            htmlTable += "</td></tr>";
        }
        htmlTable += "</table>";

        document.getElementById('res').innerHTML = htmlTable;
    }

    //menu表示
    document.getElementById('menu').style.display = "block";

    tagBtn.addEventListener('click', function (jsonDataTags) {
        //todo:タグ一覧表示
        document.getElementById('res').innerHTML = "";
    });

    triggerBtn.addEventListener('click', function (jsonDataTriggers) {
        //todo:トリガー一覧表示
        document.getElementById('res').innerHTML = "";
    });

    variableBtn.addEventListener('click', function (jsonDataVariables) {
        //todo:変数一覧表示
        document.getElementById('res').innerHTML = "";
    });


    /********************************
     * download用リンクの作成
     ********************************/
    //reader.onloadが非同期処理なので、ちょっとだけ遅延させる
    /*
    setTimeout(function () {
        let downloadFile = JSON.stringify(uploadDataJson);
        let a = document.createElement('a');
        a.textContent = 'json file download';
        a.download = 'file.json';
        a.href = URL.createObjectURL(new Blob([downloadFile], {
            type: 'text.plain'
        }));
        a.dataset.downloadurl = ['text/plain', a.json_download, a.href].join(':');

        let downloadLink = document.getElementById('json_download');
        downloadLink.appendChild(a);

        let downloadFile = JSON.stringify(uploadDataCsv);
        let a = document.createElement('a');
        a.textContent = 'csv file download';
        a.download = 'file.csv';
        a.href = URL.createObjectURL(new Blob([downloadFile], {
            type: 'text.plain'
        }));
        a.dataset.downloadurl = ['text/plain', a.csv_download, a.href].join(':');

        let downloadLink = document.getElementById('csv_download');
        downloadLink.appendChild(a);

    }, 1000);
    */

   let tableToCSV = {
        export: function (elm ,del) {
            let table = elm;
            let rows = this.getRows(table);
            let lines = [];
            let delimiter = del || ',';

            for (let i = 0, numOfRows = rows.length; i < numOfRows; i++) {
                let cols = this.getCols(rows[i]);
                let line = [];

                for (let j = 0, numOfCols = cols.length; j < numOfCols; j++) {
                    let text = cols[j].textContent || cols[j].innerText;
                    text = '"' + text.replace(/"/g, '""') + '"';

                    line.push(text);
                }

                lines.push(line.join(delimiter));
            }

            this.saveAsFile(lines.join("\r\n"));
        },

        saveAsFile: function (csv) {
            let blob = new Blob([csv], {
                type: 'text/csv'
            });
            let url = URL.createObjectURL(blob);

            let a = document.createElement("a");

            a.href = url;
            a.target = '_blank';
            a.download = 'taglist.csv';

            a.click();
        },

        getRows: function (elm) {
            return Util.getNodesByName(elm, 'tr');
        },

        getCols: function (elm) {
            return Util.getNodesByName(elm, ['td', 'th']);
        }
    }

    let Util = {
        getNodesByName: function (elm /*, string or array*/ ) {
            let children = elm.childNodes;
            let nodeNames = ('string' === typeof arguments[1]) ? [arguments[1]] : arguments[1];
            nodeNames = nodeNames.map(function (str) {
                return str.toLowerCase()
            });

            let results = [];

            for (let i = 0, max = children.length; i < max; i++) {
                if (nodeNames.indexOf(children[i].nodeName.toLowerCase()) !== -1) {
                    results.push(children[i]);
                } else {
                    results = results.concat(this.getNodesByName(children[i], nodeNames));
                }
            }

            return results;
        }
    }

    document.getElementById('csv_download').addEventListener('click', function (e) {
        e.preventDefault();
        tableToCSV.export(document.getElementById('tbl'));
    });
});

