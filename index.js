var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let time = 0;
let raf;
let color;

let startTime = performance.now();
let newTime = performance.now();

let mouseX = canvas.width/2;
let mouseY = canvas.height/2;
let oldMouseX = 0;
let oldMouseY = 0;

var points = new Array;

function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function lerp( a, b, alpha ) {
    return a + alpha * (b - a)
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        if(randInt(2)==2){this.vx=.1}else{this.vx=-.1} 
        if(randInt(2)==2){this.vy=.1}else{this.vy=-.1}
        this.radius = 5;
    }
}

function createPoints(amount) {
    for(let i=0; i<amount; i++) {
        points.push(new Point(randInt(canvas.width-20)+10, randInt(canvas.height - 20)+10));
        console.log(`Point ${i}`)
    }
	points.push(new Point(100, 100))
}

const tau = Math.PI * 2;

createPoints(50);

console.log("Points: \n", points)

points.sort();

//points[0].vx = 2;
//points[0].vy = 2;

function draw() {
	newTime = performance.now()/100 - startTime/100;
    //console.log("new frame")
    time = newTime;
	color = `rgba(64, 64, 64`
	/*color = `rgba(
	${128*(Math.sin(time+tau/3)+1)},
	${128*(Math.sin(time+2*tau/3)+1)},
	${128*(Math.sin(time)+1)}
	`*/
	ctx.fillStyle = `${color}, ${0.005})`
	ctx.strokeStyle = `${color}, ${0.05})`
	
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.closePath();
        for(let i=0;i<points.length;i++){
            ctx.beginPath();
			//ctx.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2, true);
            ctx.moveTo(points[i].x, points[i].y);
            try{ctx.lineTo(mouseX, mouseY);ctx.stroke();ctx.lineTo(points[i+1].x, points[i+1].y);}
            catch{ctx.lineTo(mouseX, mouseY)}
            //try{ctx.lineTo(points[0].x, points[0].y);ctx.stroke();ctx.lineTo(points[i+1].x, points[i+1].y);}catch{ctx.lineTo(mouseX, mouseY)}
            //console.log(128*(Math.sin(time+tau/3)+1), 128*(Math.sin(time+2*tau/3)+1));

            points[i].x += points[i].vx;
            points[i].y += points[i].vy;

            if (
                points[i].y + points[i].vy > canvas.height - points[i].radius ||
                points[i].y + points[i].vy < points[i].radius
            ) {
                points[i].vy = -points[i].vy;
                //console.log(1)
            }
            if (
                points[i].x + points[i].vx > canvas.width - points[i].radius ||
                points[i].x + points[i].vx < points[i].radius
            ) {
                points[i].vx = -points[i].vx;
                //console.log(2)
            }
            ctx.closePath(); 
            ctx.fill(); 
    }

    raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mouseover", (e) => {
    raf = window.requestAnimationFrame(draw);
});

function mousepos(event) {
    oldMouseX = mouseX;
    oldMouseY = mouseY;
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function windowResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", windowResize);
document.addEventListener("mousemove", mousepos, false);

window.onresize = windowResize();

draw()
window.requestAnimationFrame(draw)

//Point.draw();

/*function drawFrame(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("new frame")
    for(let i=0; i<points.length; i++){
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
        if (
            points[i].y + points[i].vy > canvas.height - points[i].radius ||
            points[i].y + points[i].vy < points[i].radius
          ) {
            points[i].vy = -points[i].vy;
          }
          if (
            points[i].x + points[i].vx > canvas.width - points[i].radius ||
            points[i].x + points[i].vx < points[i].radius
          ) {
            points[i].vx = -points[i].vx;
          }
    }
    
    raf = window.requestAnimationFrame(drawFrame());
}
raf;
drawFrame();

/*function updateFrame(ctx) {
    for(let i=0; i<points.length; i++){
        points[i].x + points[i].speed
    }
    drawFrame(ctx)
}

while(true){
    updateFrame(ctx)
}*/