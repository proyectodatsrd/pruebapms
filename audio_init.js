var canPlayMp3, canPlayOgg;
var audioExtension = ".none";

// Need to check the canPlayType first or an exception
// will be thrown for those browsers that don't support it      
var myAudio = document.createElement('audio');

if (myAudio.canPlayType) {
    // Currently canPlayType(type) returns: "", "maybe" or "probably" 
    canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
    canPlayOgg = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"');
}

if (canPlayMp3)
    audioExtension = ".mp3";
else if (canPlayOgg) {
    audioExtension = ".ogg";
}
// If the browser supports either MP3 or OGG
if (audioExtension !== ".none") {    
    var sonido_explo_1 = "datos/explode1"+audioExtension;
    var sonido_explo_2 = "datos/explode2"+audioExtension;
    var sonido_up = "datos/uplong"+audioExtension;
    var sonido_tema = "datos/spaceship"+audioExtension;
    };

//ahora, agregamos el audio..
var explo_sound = document.createElement('audio');
explo_sound.setAttribute('src', sonido_explo_1);
explo_sound.addEventListener("load", function() {
$(".duration span").html(explo_sound.duration);
$(".filename span").html(explo_sound.src);
}, true);

var explo2_sound = document.createElement('audio');
explo2_sound.setAttribute('src', sonido_explo_2);
explo2_sound.addEventListener("load", function() {
$(".duration span").html(explo2_sound.duration);
$(".filename span").html(explo2_sound.src);
}, true);

var level_up_sound = document.createElement('audio');
level_up_sound.setAttribute('src', sonido_up);
level_up_sound.addEventListener("load", function() {
$(".duration span").html(level_up_sound.duration);
$(".filename span").html(level_up_sound.src);
}, true);

var tema_sound = document.createElement('audio');
tema_sound.setAttribute('src', sonido_tema);
tema_sound.addEventListener("load", function() {
$(".duration span").html(tema_sound.duration);
$(".filename span").html(tema_sound.src);
}, true);
