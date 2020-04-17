var socket = new WebSocket('localhost/typing.php');
socket.onopen = function() {
    alert("Соединение установлено.");
};

socket.onclose = function(event) {
    if (event.wasClean) {
        alert('Соединение закрыто чисто');
    } else {
    }
    alert('Код: ' + event.code + ' причина: ' + event.reason);
};
socket.onmessage = function(event) {//тут принимаем
    alert("Получены данные " + event.data);

};
socket.onerror = function(error) {
    alert("Ошибка " + error.message);
};
socket.send("Привет");//тут отправляем       alert('Обрыв соединения');
