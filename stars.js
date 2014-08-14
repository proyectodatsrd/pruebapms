
var estrella = function(){
    this.x = Math.floor(Math.random()*640);
    this.y = Math.floor(Math.random()*400);
    this.radius =  Math.floor(Math.random()*3);
    this.vel =  Math.floor(Math.random()*10);
    this.update = function(){
        this.y += this.vel;
        if(this.y+this.radius>400){
            this.y = 0;
            this.x = Math.floor(Math.random()*640);
            }
        };
    this.dibuja = function(contexto){
        contexto.beginPath();
        //contexto.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        contexto.rect(this.x, this.y,this.radius*2,this.radius*2);
        contexto.fillStyle = "white";
        contexto.fill();
        };
    };

var campo_estrellas = function(){
    this.array_s = new Array();
    var i =0;
    for (i;i<100;i++){
        this.array_s.push(new estrella());
        };
    this.update = function(){
        var i = 0;
        for(i;i<this.array_s.length;i++){
            this.array_s[i].update();
            }
        };
    this.dibuja = function(contexto){
        var i = 0;
        for(i;i<this.array_s.length;i++){
            this.array_s[i].dibuja(contexto);
            }
        };
    };
