'use strict'
const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');
const espessuraDaLinha = 15;
const raio = 20;

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
//Objeto Raquete
const raqueteEsq = {
    x:10,
    y: 100,
    w: espessuraDaLinha,
    h: 200,
    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
};
const raqueteDir = {
    x: window.innerWidth-espessuraDaLinha-10,
    y: 100,
    w: espessuraDaLinha,
    h: 200,
    draw: function(){
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
};
//Objeto Placar
const placar = {
    human: 1,
    computer: 2,
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
    draw: function(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        canvasCtx.fill();
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
setup()
draw()