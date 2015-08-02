var WIDTH = 1024;
var HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2015,7,4,12,30,30)
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(
        function(){
            render(context);
            update();
        },
        50
    );
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nexthour = parseInt(nextShowTimeSeconds/3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthour*3600)/60);
    var nextseconds = nextShowTimeSeconds % 60;

    var curhour = parseInt(curShowTimeSeconds/3600);
    var curminutes = parseInt((curShowTimeSeconds - curhour*3600)/60);
    var curseconds = curShowTimeSeconds % 60;

    if(nextseconds != curseconds){
        if(parseInt(curhour/10) != parseInt(nexthour/10)) {
            addBalls(MARGIN_LEFT+0, MARGIN_TOP, parseInt(curhour/10));
        }
        if(parseInt(curhour%10) != parseInt(nexthour%10)) {
            addBalls(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(curhour%10));
        }

        if(parseInt(curminutes/10) != parseInt(nextminutes/10)) {
            addBalls(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(curminutes%10));
        }
        if(parseInt(curminutes%10) != parseInt(nextminutes%10)) {
            addBalls(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(curminutes%10));
        }

        if(parseInt(curseconds/10) != parseInt(nextseconds/10)) {
            addBalls(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(curseconds/10));
        }
        if(parseInt(curseconds%10) != parseInt(nextseconds%10)) {
            addBalls(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(nextseconds%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}

function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy+= balls[i].g;

        if (balls[i].y >= HEIGHT - RADIUS){
            balls[i].y = HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }
    }
}

function addBalls(x, y, num) {
    for (var i=0;i<digit[num].length;i++){
        for (var j=0;j<digit[num][i].length;j++){
            if (digit[num][i][j] == 1){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1, Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);
    return ret >= 0 ? ret : 0;
}

function render(ctx) {

    ctx.clearRect(0, 0, WIDTH, HEIGHT);


    var hour = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hour*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT,MARGIN_TOP, parseInt(hour/10), ctx);
    renderDigit( 15*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(hour%10), ctx);
    renderDigit( 30*(RADIUS+1)+MARGIN_LEFT,MARGIN_TOP, 10, ctx);
    renderDigit( 39*(RADIUS+1)+MARGIN_LEFT,MARGIN_TOP, parseInt(minutes/10), ctx);
    renderDigit( 54*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(minutes%10), ctx);
    renderDigit( 69*(RADIUS+1)+MARGIN_LEFT,MARGIN_TOP, 10, ctx);
    renderDigit( 78*(RADIUS+1)+MARGIN_LEFT,MARGIN_TOP, parseInt(seconds/10), ctx);
    renderDigit( 93*(RADIUS+1)+MARGIN_LEFT, MARGIN_TOP, parseInt(seconds%10), ctx);

     for (var i=0;i<balls.length;i++){
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {

    ctx.fillStyle = "rgb(0,102,153)";

    for (var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){

            if(digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS,0, 2*Math.PI);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}