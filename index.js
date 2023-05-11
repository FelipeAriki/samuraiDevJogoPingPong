'use strict'
const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');
const espessuraDaLinha = 15;
const raio = 20;
const mouse = {x:0, y:0}
const gapX = 10;

//Objeto Campo
const campo = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function(){
        canvasCtx.fillStyle = '#286047';
        canvasCtx.fillRect(0, 0, this.w, this.h);
    }
}

//Objeto Linha Central
const linhaCentral = {
    w: window.innerWidth/2 - espessuraDaLinha/2,
    h: campo.h,
    draw: function(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(this.w, 0, espessuraDaLinha, window.innerHeight);
    }
}

//Objeto Raquete Esquerda
const raqueteEsq = {
    x:10,
    y: 100,
    w: espessuraDaLinha,
    h: 200,
    _move: function(){
        this.y = mouse.y - this.h/2;
    },
    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
};

//Objeto Raquete Direita
const raqueteDir = {
    x: window.innerWidth-espessuraDaLinha-gapX,
    y: 0,
    w: espessuraDaLinha,
    h: 200,
    speed: 3,
    _move: function(){
        if(this.y + this.h / 2 < bola.y + bola.r)
            this.y +=this.speed;
        else
            this.y -= this.speed;
    },
    speedUp: function(){
        this.speed += 2;
    },
    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);

        this._move();
    }
};

//Objeto Placar
const placar = {
    human: 0,
    computer: 0,
    increaseHuman: function () {
        this.human++
      },
      increaseComputer: function () {
        this.computer++
      },
    draw: function(){
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";
        canvasCtx.fillText(this.human, window.innerWidth/4, 50);
        canvasCtx.fillText(this.computer, window.innerWidth/4 + window.innerWidth/2, 50);
    }
}
//Objeto Bola
const bola = {
    x: 300,
    y: 200,
    r: raio,
    speed: 3,
    direcaoX:1,
    direcaoY:1,
    _calculaPosicao: function(){
        if(this.x > campo.w - this.r - raqueteEsq.w - gapX){
            if(this.y + this.r > raqueteDir.y && this.y - this.r < raqueteDir.y + raqueteDir.h)
                this._reverteX();
            else
            {
                placar.increaseHuman();
                this._pointUp();
            }       
        }

        if(this.x < this.r + raqueteEsq.w + gapX){
            if(this.y + this.r > raqueteEsq.y && this.y - this.r < raqueteEsq.y + raqueteEsq.h){
                this._reverteX();
            }
            else{
                placar.increaseComputer();
                this._pointUp();
            }
        }

        if( (this.y - this.r < 0 && this.direcaoY < 0) || (this.y > campo.h - this.r && this.direcaoY > 0))
            this._reverteY();
    },
    _reverteX: function(){
        this.direcaoX *= -1;
    },
    _reverteY: function(){
        this.direcaoY = this.direcaoY * -1;
    },
    _move: function(){
        this.x+= this.direcaoX * this.speed;
        this.y+= this.direcaoY * this.speed;
    },
    _speedUp: function(){
        this.speed+=2;
    },
    _pointUp: function(){
        this._speedUp();
        raqueteDir.speedUp();

        this.x = campo.w/2;
        this.y = campo.h/2;
    },
    draw: function(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        canvasCtx.fill();

        this._calculaPosicao();
        this._move();
    }
}


function setup(){
    canvasEl.width = campo.w;
    canvasEl.height = campo.h;

    canvasCtx.width = campo.w;
    canvasCtx.height = campo.h;
}
function draw(){

    //Desenhando campo
    campo.draw();

    //Desenhando a linha central
    linhaCentral.draw();

    //Desenhando as raquetes
    raqueteEsq.draw();
    raqueteDir.draw();

    //Desenhando o placar
    placar.draw();

    //Desenhando a bola
    bola.draw();
}

window.animateFrame = (function(){
    return(
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            return window.setTimeout(callback, 1000/60);
        }
    );
})();

function main(){
    animateFrame(main);
    draw()
}
setup();
main();

canvasEl.addEventListener('mousemove', function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});