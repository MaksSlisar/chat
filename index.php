<head>
<link type="text/css" rel="stylesheet" href="style.css"/>
    <script src="chat.js"></script>
    <meta charset="utf-8">
</head>
<body onload="get()" id="body">






<div id="chat" >
    <div id="chatmsg"></div>
    <div id="sss">
        <input type="text" id="nameinput"/>
        <input type="text" id="textinput" onkeydown="typing(event,this)"/>
        <button onclick="chat()" id="ok" >
            ok
        </button>

        <label id="label"></label>
        <img src="images/up.png" onclick="up()" id="up" >
        <img src="images/down.png" onclick="down()" id="down">
</div>

</body>
