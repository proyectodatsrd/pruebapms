//extiendo la funcionalidad del tipo de dato array...
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
    };
//creo un objeto de tipo sprite...
var Sprite = function(x,y){
    this.x = x;
    this.y = y;
    this.kill = false;
    this.image = new Image();
    this.dibuja = function(contexto){
        var cord = this.rect_center();
        contexto.drawImage(this.image, cord[0], cord[1]);
        };
    this.rect_center = function(){
        var ima_w = this.image.width/2; 
        var ima_h = this.image.height/2;
        //esto es una prueva del tipo de dato pair...
        var rect =  new Array(2);
        rect[0] = this.x-ima_w; rect[1] = this.y-ima_h
        return rect;
        };
    this.update = function(sprite){
        return 0;
        };
    this.colition = function(sprite){
        if(sprite!=null){
            return( this.x-this.image.width/2 < (sprite.x+sprite.image.width/2) &&
                    (this.x + this.image.width/2) > sprite.x-sprite.image.width/2 &&
                    this.y - this.image.height/2 < (sprite.y + sprite.image.height/2) &&
                    (this.y + this.image.height/2) >  sprite.y - sprite.image.height/2);
            };
        };
    };



//un objeto que representara a nuestro héroe...    
var Heroe = function(x,y){
    //esto es para heredar a la clase Sprite...
    //si, es mas molesto que en Python, mas simple que en C...
    this.Hers = Sprite;
    this.Hers(x,y);
    delete this.Hers;
    //cargamos su imagen
    this.imagen_redi = false;
    this.image.src = "datos/nave.png";
    this.image.onload = function () {
        this.imagen_redi = true;
        };
    this.update = function(){
        if(pres(38)){ //UP
            this.y-=10;};
        if(pres(39)){ //RIGHT
            this.x+=10;};
        if(pres(40)){ //DOWN
            this.y+=10;};
        if(pres(37)){ //LEFT
            this.x-=10;};
        if (this.x> 640){
            this.x = 0;};
        if (this.x < 0){
            this.x = 640;};
        if (this.y >= 400){
            this.y = 400;};
        if (this.y <= 0){
            this.y = 0;};
        };
    };

var random = function(max){
 return parseInt(Math.random()*max);
}


//un objeto que representa a nuestro villano
var Villano = function(){
    this.Hers = Sprite;
    this.Hers(random(620),0);
    delete this.Hers;
    this.contador = -1;
    this.direction = random(22);
    if (random(10)<5){
        this.direction = -this.direction;
        };
    this.vel = random(20)+5;
    this.image.src = "datos/enemigo.png";
    this.update = function(){
        if (this.x> 640 || this.x < 0){
            this.direction = -this.direction;
            };
        if (this.y >= 450){
            this.y = 0;
            };
        this.contador -= 1;
        this.x -= this.direction;
        this.y += this.vel;
        };
    };

var disparo_a = function(x,y){
    this.Hers = Sprite;
    this.Hers(x,y);
    delete this.Hers;
    this.vel = 10;
    this.image.src = "datos/rebel_laser.bmp";
    this.update = function(){
        this.y -= this.vel;
        if (this.y < 0){
            this.kill = true;};
        };
    };

var disparo_e = function(x,y){
    this.Hers = Sprite;
    this.Hers(x,y);
    delete this.Hers;
    this.vel = 15;
    this.image.src = "datos/empire_laser.bmp";
    this.update = function(){
        this.y += this.vel;
        if (this.y > 450){
            this.kill = true;};
        };
    };


var Hero = new Heroe(320, 370);

//creo un pequeño array que contendra los sprites enemigos
var Enemigos = new Array();
Enemigos.push( new Villano());
//otro que contendrá mis disparos los aliados...
var Disparos = new Array();
//y uno para los enemigos...
var Disparos_e = new Array();
//aquí, una pequeña serie de funciones para trabajar con los grupos...
var colision_sprite_grupo = function(Grupo, Sprite, dokill){
    var i = 0;
    for(i;i<Grupo.length;i++){
        if (Sprite.colition(Grupo[i]) ){
            if(dokill==1){
                Sprite.kill = true;};
            if(dokill==2){
                Grupo[i].kill = true;};
            if(dokill==3){
                Sprite.kill = true;
                Grupo[i].kill = true;};
            return true;
            };
        };
    return false;
    };
var colision_grupo_grupo = function(Grupo, Grupo_1, dokill){
    var i=0;
    for(i;i<Grupo.length;i++){
        if(colision_sprite_grupo(Grupo_1, Grupo[i], dokill)){
            return true;
            };
        };
    return false;
    };
var update_grupo = function(Grupo){
    var i = 0;
    for(i;i<Grupo.length;i++){
        Grupo[i].update();
        if (Grupo[i].kill){
            Grupo.remove(i)
            };
        };
    };
var dibuja_grupo = function(Grupo, contexto){
    var i = 0;
    for(i;i<Grupo.length;i++){
        Grupo[i].dibuja(contexto);
        };
    }



//Imagen de fondo...
var imagen_fondo= false;
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function () {
    bgReady = true;
    alert("Todo cargado");
    };
bgImage.src = "datos/background.jpg";


//Para la gestionar las teclas
var lastKey= null;
var keydown = false;
var PRESSING = new Array();
document.addEventListener('keydown',
    function(evt){
        keydown = true;
        PRESSING[evt.keyCode]=true;
        },
    true);
    
document.addEventListener('keyup',
    function(evt){
        keydown = false;
        PRESSING[evt.keyCode]=false;
        },
    false);
var pres = function(numKey){
    if(PRESSING[numKey]){
        return true;
        };
    return false;
    };

//creamos un contador para los monstruos
var cont = 0;
//uno de nivel
var nivel = 1;
//uno de puntaje
var puntaje = 0;
//uno mas para le puntaje absoluto:
var puntaje_total = 0;
//vidas...
var vidas = 3;
//algo
var game_over = false;

var ultimo_disparo =  null;

//creo mi campo de estrellas...
var cam_str = new campo_estrellas();
for (i=0;i<100;i++){
        cam_str.update();
        };
//Creamos el equivalente a la función principal.
run = function(){
    var canvas = document.getElementById("Lienzo");
    var ctx = canvas.getContext("2d");
    ctx.font = "20pt Arial";
    ctx.fillStyle = 'white'
    if(bgReady){
    ctx.drawImage(bgImage,0,0);
    cam_str.update();
    cam_str.dibuja(ctx);
    if (!game_over){
        tema_sound.play(-1);
        ctx.font = "20pt Arial";
        ctx.fillStyle = 'white'
        cont += 1;
        if (cont>(100-nivel*2)){
            Enemigos.push( new Villano());
            cont = 0;
            };
        update_grupo(Enemigos);
        dibuja_grupo(Enemigos, ctx);
        if (nivel>=3){
            //revisamos a los enemigos para que disparen
            for(i=0;i<Enemigos.length;i++){
                if(Enemigos[i].contador<=0){
                    Disparos_e .push( new disparo_e(Enemigos[i].x,Enemigos[i].y));
                    Enemigos[i].contador = 30;
                    };
                };
            };
        update_grupo(Disparos_e);
        dibuja_grupo(Disparos_e, ctx);
        update_grupo(Disparos);
        dibuja_grupo(Disparos, ctx);
        Hero.dibuja(ctx);
        Hero.update();
        ctx.fillText('Nivel: '+nivel+'    Puntos: '+puntaje,0,20);
        ctx.fillText('Vidas: '+vidas,0,50);
        if (colision_sprite_grupo(Enemigos, Hero, 2) || colision_sprite_grupo(Disparos_e, Hero, 2)){
            explo2_sound.play();
            vidas-=1;
            };
        if (colision_grupo_grupo(Enemigos, Disparos, 3)){
            puntaje+=10;
            puntaje_total += 10;
            explo_sound.play();
            };
        if (puntaje>=100){
            level_up_sound.play();
            nivel+=1;
            puntaje = 0;
            };
        if (vidas<0){
            game_over = true;
            };
        if(pres(32) && keydown){
            if (ultimo_disparo === null || Date.now() - ultimo_disparo > 250) {
                Disparos.push( new disparo_a(Hero.x,Hero.y));
                ultimo_disparo = Date.now();
                };
            
            };
        };
    if (game_over){
        tema_sound.pause();
        level_up_sound.play();
        ctx.font = "50pt Arial";
        ctx.fillStyle = 'red';
        ctx.fillText('FIN DEL JUEGO',100,150);
        ctx.fillStyle = 'white';
        ctx.font = "30pt Arial";
        ctx.fillText("Puntaje Total:"+puntaje_total,100,275);
        ctx.font = "22pt Arial";
        ctx.fillText("Para volver a jugar presiona 'Z' :)",100,350);
        if(pres(90) && keydown){
            //
            Hero.x=320; Hero.y=370;
            //creamos un contador para los monstruos
            cont = 0;
            //uno de nivel
            nivel = 1;
            //uno de puntaje
            puntaje = 0;
            //uno mas para le puntaje absoluto:
            puntaje_total = 0;
            //vidas...
            vidas = 3;
            //reiniciamos
            game_over = false; 
            }
        };
        };
    };

setInterval(run,30);
