/*Global Variable */

var historyList = [];
var current_even = '';

init();

function init() {
    drawAllItems();
    var input = document.getElementsByName('apps')[0];
    var y = document.createElement("DATALIST");
    y.setAttribute('id', 'histories');
    input.parentElement.appendChild(y);
    input.removeEventListener("keydown", null);
    input.removeEventListener("focusout", null);
    input.addEventListener("keydown", function (event) {
        current_even = '';
        if (event.keyCode === 13) {
            current_even = 'ENTER';
            drawContent(searchSesult(input.value));
            if (input.value != '') historyList.push(input.value);
            event.preventDefault();
            console.log(1);
        }
    });

    input.addEventListener("focusout", function (event) {
        if (current_even == 'ENTER') return;
        processInput();

        if (input.value != '') historyList.push(input.value);
        event.preventDefault();
        console.log(2);
    });

    var listEl = document.getElementById('histories');
    input.addEventListener("click", function (event) {
        input.setAttribute('list', 'histories');
        if (listEl) listEl.innerHTML = showHistorySearch();
        console.log(showHistorySearch(), input.parentNode.innerHTML);
    });

    if (localStorage) {
        localStorage.clear();
    } else {

    }
}

function drawAllItems() {
    var el_list_app = document.getElementsByClassName('contents')[0];
    var htm = '';
    for (var i = 0; i < TABLE_DATA.length; i++) {
        //console.log(TABLE_DATA[i]);
        htm += '<li>' +
        '<img src="' + TABLE_DATA[i].thumbnailUrl + '"><label>' +
        TABLE_DATA[i].name + '</label>' +
                '</li>'
    }
    console.log(htm);
    el_list_app.innerHTML = '<ul id="list_apps">' + htm + '</ul>'
}

function searchSesult(name) {
    if (name == '') return TABLE_DATA;
    var dataSearch = [];
    for (var i = 0; i < TABLE_DATA.length; i++) {
        //console.log(TABLE_DATA[i]);
        if (TABLE_DATA[i].name.toLowerCase().indexOf(name.toLowerCase()) != -1) {
            dataSearch.push(TABLE_DATA[i]);
        }
    }
    return dataSearch;

}

function processInput() {
    var input_el = document.getElementsByName('apps')[0];
    console.log(input_el.value);
    var result = [];
    result = searchSesult(input_el.value);
    drawContent(result);
}

function drawContent(result) {
    var el_list_app = document.getElementsByClassName('contents')[0];
    var htm = '';
    for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        htm += '<li>' +
        '<img src="' + result[i].thumbnailUrl + '"><label>' +
        result[i].name + '</label>' +
         '</li>'
    }
    //console.log(htm);
    el_list_app.innerHTML = '<ul id="list_apps">' + htm + '</ul>'
}

function showHistorySearch() {
    var htm = '';
    for (var i = 0; i < historyList.length; i++) {
        htm += '<option value="' + historyList[i] + '">'
    }
    return htm;
}