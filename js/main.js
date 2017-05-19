/*IE footer FIX*/
if (!!navigator.userAgent.match(/Trident\/7\./))
    $(function () {
        $(window).scroll(function () {
            var distanceTop = $('#footerIEfix').offset().top - $(window).height();
            if ($(window).scrollTop() > distanceTop) {
                document.getElementById('footer').style.position = "fixed";
            }
            if ($(window).scrollTop() < distanceTop) {
                document.getElementById('footer').style.position = "absolute";
            }
        });
    });
/*IE footer FIX*/


/* Randomize background */
var images = [
'../img/bg1.png', 
'../img/bg2.jpg', 
'../img/bg3.jpg', 
'../img/bg4.png', 
'../img/bg5.png', 
'../img/bg6.png', 
'../img/bg7.png', 
'../img/bg8.png'
];
$('#main-page').css({'background-image': 'url(../img/' + images[Math.floor(Math.random()*images.length)] + ')'});
/* Randomize background */

/*DropDown pos*/
var mq = window.matchMedia("(max-width: 991px)");

if (mq.matches) {
    // window width is at least 500px
    document.getElementById('drop-right').className += ' rightMenu'
}
/*DropDown pos*/



/*manual*/
$('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 40
});
/*manual*/

/*modal*/
$('#myModal').bind('hidden.bs.modal', function () {
    $("html").css("margin-right", "0px");
});
$('#myModal').bind('show.bs.modal', function () {
    $("html").css("margin-right", "0px");
});
/*modal*/

/*google analytics*/
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-43330640-3', 'auto');
ga('send', 'pageview');
/*google analytics*/

/*modal download*/
if (window.location.hash == "#more") {
    $('#myModal').modal('show');
}
/*modal download*/




/* cookie  */

if (!!navigator.userAgent.match(/Trident\/7\./)) {
    document.getElementById('iep').style.display = "block";
}

function displayCookie() {
    alert(document.cookie);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function set1() {
    setCookie("wbm", "1", 9999);
    document.getElementById('iep').style.display = "block";
}

function set0() {
    setCookie("wbm", "0", 9999);
    document.getElementById('iep').style.display = "none";
}

function checkCookie() {
    var coo = getCookie("wbm");
    if (coo == "1") {
        alert("1");
        document.getElementById('iep').style.display = "block";
    } else {
        alert("0");
        document.getElementById('iep').style.display = "none";
    }
}

function hideMsg() {
    setCookie("wbm", "0", 9999);
    document.getElementById('iep').style.display = "none";
}

var coo = getCookie("wbm");
if (coo == "1") {
    document.getElementById('iep').style.display = "block";
}
if (coo == "0") {
    document.getElementById('iep').style.display = "none";
}

/* cookie  */