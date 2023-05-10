'use strict'
const canvasEl = document.querySelector('canvas');
const canvasCtx = canvasEl.getContext('2d');

function setup(){
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    canvasCtx.width = window.innerWidth;
    canvasCtx.height = window.innerHeight;
}
function draw(){
    let espessuraDaLinha = 15;
    let raio = 20

    //Desenhando o campo
    canvasCtx.fillStyle = '#286047';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);


    //Desenhando a linha central
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(window.innerWidth/2 - espessuraDaLinha/2, 0, espessuraDaLinha, window.innerHeight);

    //Desenhando as raquetes
    canvasCtx.fillRect(10, window.innerWidth/5, espessuraDaLinha, 100);
    canvasCtx.fillRect(window.innerWidth-espessuraDaLinha-10, window.innerWidth/5, espessuraDaLinha, 100);

    //Desenhando a bola
    canvasCtx.beginPath();
    canvasCtx.arc(200, 300, raio, 0, 2*Math.PI, false);
    canvasCtx.fill();

    //Desenhando o placar
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341D";
    canvasCtx.fillText("3", window.innerWidth/4, 50);
    canvasCtx.fillText("0", window.innerWidth/4 + window.innerWidth/2, 50);
}
setup()
draw()