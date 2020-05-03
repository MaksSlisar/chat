var array;
var msgbase;
var oldmsg;
//
setInterval(get, 5000);//1c = 1000 мс

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
let isUpdateMsg = true;

function get() {

    if (isUpdateMsg) {

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "getmsg.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                array = JSON.parse(this.responseText);
               //if (msgbase != array.length) {
                    msgbase = array.length;
                    remove();
                    for (let i = array.length - 5; i < array.length; i++) {
                        if (array[i] != null)
                            createmsg(array[i].name, array[i].msg, array[i].time);

                    }
                    backroundimage();
               // }
            }
        };
        xhttp.send();
    }
}

function msgClick(event, msgContainer) {

    if (event.target.tagName == 'BUTTON') {
        if (event.target.innerText == "del"){
            deletemsg(msgContainer);
        isUpdateMsg=true;}
        if (event.target.innerText == "up")
            // update(msgContainer);
            backspace(msgContainer);

        return;
    }

    if (msgContainer.childNodes.length > 4)
        return;


    isUpdateMsg=false;
    var dlt = document.createElement('button');
    var updt = document.createElement('button');
    msgContainer.append(dlt);
    msgContainer.append(updt);
    dlt.className = 'msgBtn';
    updt.className = 'msgBtn';
    dlt.innerText = "del";
    updt.innerText = "up";



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
    if (name == document.getElementById("nameinput").value ){
        container.className = "rightmsgcontainer";
        linediv.className = "lineright";
    }else{
        container.className = "leftmsgcontainer"
        linediv.className = "lineleft";
    }
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
        isUpdateMsg=true;
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
function backroundimage() {
   var images = ["wallpapers1.jpg","wallpapers2.jpg","Wa11papers.ru_textures_2560x1600_121.jpg","zastavki.jpg","1579207680110613969.jpg","wall.jpg"];
   let random = Math.floor(Math.random()*6);
   let path = "images/"+images[random];
    let chat =  document.getElementById("chat");
  chat.style.background= "url("+ path +")";
    let colors = ["rgb(59, 237, 9)","rgb(237, 161, 9)","rgb(9, 237, 142)","rgb(237, 9, 218)","rgb(237, 9, 218)","rgb(245, 120, 178)"];

    changeMsgContainerColor(chat.firstElementChild.firstElementChild, colors[random]);
    changeInputColor(chat.firstElementChild.nextElementSibling.firstElementChild, colors[random]);
}
function changeMsgContainerColor(msgContainer, color) {
    if (msgContainer==null)
        return;
    let name = msgContainer.firstElementChild;
    let msg =   msgContainer.firstElementChild.nextElementSibling;
    let time =  msgContainer.firstElementChild.nextElementSibling.nextElementSibling;
    name.style.color = color;
    msg.style.color = color;
    time.style.color = color;
    changeMsgContainerColor(msgContainer.nextElementSibling, color);
}
function changeInputColor(nameinput,color) {
let sss = document.getElementById("sss");
let textinput = sss.firstElementChild.nextElementSibling;
let button = sss.firstElementChild.nextElementSibling.nextElementSibling;
textinput.style.backgroundColor = color;
nameinput.style.backgroundColor = color;
button.style.backgroundColor = color;
}
function mymsg() {


}
