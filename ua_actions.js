function informationarrowright() {
    var text2 = document.getElementById('textInformation');
    var informationdiv = document.getElementById('informationimage');
    if (infotmationflag == 0) {
        infotmationflag = images.length;
    }
    infotmationflag--;
    var random = parseInt(Math.random() * 7);
    text2.innerText = textimages[random];
    informationdiv.src = 'images/' + images[random];
}

function informationarrowleft() {
    var text3 = document.getElementById('text1Information');
    var informationdiv = document.getElementById('informationimage');
    informationdiv.style.opacity = '0';
    setTimeout(opacity1, 1000);
    if (infotmationflag == 0) {
        infotmationflag = images.length;
    }
    infotmationflag--;
    var random = parseInt(Math.random() * 7);
    informationdiv.src = images[random];
    text3.innerText = textimages[random];
}
function opacity1() {
    var informationdiv = document.getElementById('informationimage');
    informationdiv.style.opacity = '1';
}
var images = ['navikatowice.jpg', 'navi21.jpg', 's1mple.png', 'navi20.jpg', 'katowice1.jpg', 'navi10.jpg', 'navi19.jpg'];
var textimages = ['Victory on BLAST', 'Victory over G2', 's1mple', 'navi20', 'katowice1', 'navi10', 'navi19'];
var infotmationflag = 0;