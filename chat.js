var array;
var msgbase;
var oldmsg;

function chat() {
    var input = document.getElementById('textinput');
    var name = document.getElementById('nameinput');
    var now = new Date();
    var body = 'message=' + input.value + '&' + 'name=' + name.value + '&' + 'time=' + now.getHours() + ':' + now.getMinutes();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Addmsg.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    };
    xhttp.send(body);
}

function get() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "getmsg.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            array = JSON.parse(this.responseText);
            msgbase = array.length;
            remove();
            for (let i = array.length - 5; i < array.length; i++) {
                if (array[i] != null)
                    createmsg(array[i].name, array[i].msg, array[i].time);

            }
        }
    };
    xhttp.send();
}

function createmsg(name, msg, time) {
    //создаем элементы
    var chat = document.getElementById("chatmsg");
    var container = document.createElement("div");
    var namediv = document.createElement("div");
    var msgdiv = document.createElement("div");
    var timediv = document.createElement("div");
    var linediv = document.createElement("div");
    //присваиваем стиль
    linediv.className = "line"
    container.className = "msgcontainer";
    namediv.className = "name";
    msgdiv.className = "msg";
    timediv.className = "time";
    //содержимое сообщения
    namediv.innerText = name;
    msgdiv.innerText = msg;
    timediv.innerText = time;
    //добавляем все в один див
    container.append(namediv);
    container.append(msgdiv);
    container.append(timediv);
    container.append(linediv);
    //добавляем слушатель событий
    container.setAttribute("onclick", 'msgClick(event,this)');

    //добавляем все в главный чат
    chat.append(container);
}

function remove() {

    var chat = document.getElementById("chatmsg");
    for (var i = 0; chat.children.length; i++) {
        chat.removeChild(chat.firstChild);
    }
}

function up() {
    msgbase--;
    remove();
    for (let i = msgbase - 5; i < msgbase; i++) {
        if (array[i] != null)
            createmsg(array[i].name, array[i].msg, array[i].time);
    }
}

function down() {
    msgbase++;
    remove();
    for (let i = msgbase - 5; i < msgbase; i++) {
        if (array[i] != null)
            createmsg(array[i].name, array[i].msg, array[i].time);
    }
}

function deletemsg(msgContainer) {
    var body = 'message=' + msgContainer.firstChild.nextSibling.innerText + '&' + 'name=' + msgContainer.firstChild.innerText + '&' + 'time=' + msgContainer.firstChild.nextSibling.nextSibling.innerText;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "deletemsg.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            get();
        }
    };
    xhttp.send(body);


    // var dlt = document.getElementsByClassName("msgcontainer");
    // document.body.removeChild(dlt);
}

function update(event, inputcontainer) {
    if (event.code == 'Enter') {
        var name = document.getElementById('nameinput');
        if (inputcontainer.value == '') {
            return;
        }
        if (name.value == '') {
            return;
        }
        var body = 'message=' + oldmsg + '&name=' + inputcontainer.parentElement.parentElement.firstChild.innerText + "&newmsg=" + inputcontainer.value + "&newname=" + name.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "update.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                get();
            }
        };
        xhttp.send(body);
    }

}

function msgClick(event, msgContainer) {

    if (event.target.tagName == 'BUTTON') {
        if (event.target.innerText == "del")
            deletemsg(msgContainer);
        if (event.target.innerText == "up")
            // update(msgContainer);
            backspace(msgContainer);
        return;
    }
    if (msgContainer.childNodes.length > 4) {
        return;
    }
//msgContainer.style.width = msgContainer.style.width-50;
    var dlt = document.createElement('button');
    var updt = document.createElement('button');
    msgContainer.append(dlt);
    msgContainer.append(updt);
    dlt.className = 'msgBtn';
    updt.className = 'msgBtn';
    dlt.innerText = "del";
    updt.innerText = "up";


// dlt.setAttribute("onclick","deletemsg(msgContainer)");
// updt.setAttribute("onclick", "update(msgContainer)");

}

function backspace(container) {
    var msg = container.firstChild.nextSibling.innerText;
    container.firstChild.nextSibling.innerText = '';
    var input = document.createElement('input');
    input.type = 'text';
    container.firstChild.nextSibling.append(input);
    input.className = 'inputupdate';
    input.value = msg;
    input.setAttribute('onkeydown', 'update(event,this)');
    oldmsg = msg;
}

function typing(event, input) {
    var label = document.getElementById('label');
    var name = document.getElementById('nameinput');
    var body = "name="+name.value+"&type=";
    if (input.value.length > 1) {
      //  label.innerText = name.value + ' is typing';
        body+="true";
    } else {
      //  label.innerText = '';
        body+="false";
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "typing.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var arrayNames = Array();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arrayNames = JSON.parse(this.responseText);
            for (let i = 0; i < arrayNames.length; i++) {

                 label.innerText = arrayNames[i]+ ' is typing<br>';
            }
        }
    };
    xhttp.send(body);
}