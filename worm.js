var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var count = 10;
var radius = 15;
var tail = [];
var xChange = 0;
var yChange = 0;
var maxChange = 10;
var change = 0.1;
var right = false, up = false, left = false, down = false;
var relativeX, relativeY, paddleX, paddleY;
var color = ['Beige', 'Bisque'];

for (var i = 0; i < count; i++){
	tail[i] = new Tail(30,30);
}
document.addEventListener("mousemove", mouseHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function mouseHandler(e) {
	relativeX = e.clientX;
  relativeY = e.clientY;
}

function keyDownHandler(e) {
	if (e.keyCode == 37 && !right) left = true;
	if (e.keyCode == 38 && !down) up = true;
	if (e.keyCode == 39 && !left) right = true;
	if (e.keyCode == 40 && !up) down = true;
}

function keyUpHandler(e) {
	if (e.keyCode == 37) {
		left = false;
	}
	if (e.keyCode == 38) {
		up = false;
	}
	if (e.keyCode == 39) {
		right = false;
	}
	if (e.keyCode == 40) {
		down = false;
	}
}

function Tail(x,y) {
	this.x = x;
	this.y = y; 
}

function moveHead() {
	/*if (right) xChange += change;
	else if (left) xChange += -change;
	else xChange -= xChange/10;
	if (up) yChange += -change;
	else if (down) yChange += change;
	else yChange -= yChange/10;
	if (xChange>maxChange) xChange = maxChange;
	if (yChange>maxChange) yChange = maxChange;*/
	if (tail[0].y > canvas.height/2) {
		xChange = (relativeX-tail[0].x)/canvas.width*maxChange;
		yChange = (relativeY-tail[0].y)/canvas.height*maxChange;
	} else {
		yChange += 0.1;
		if (tail[0].x<0 || tail[0].x>canvas.width) xChange = -xChange;
	}
	tail[0].x += xChange;
	tail[0].y += yChange;
}

function moveWorm() {
 for (i = tail.length-1; i > 0; i--){
 	paddleX = tail[i].x > tail[i-1].x ? 2 : -2;
 	paddley = tail[i].y > tail[i-1].y ? 2 : -2;
 	tail[i].x = tail[i-1].x;
 	tail[i].y = tail[i-1].y;
 }
}

function drawWorm() {
	for(i = count-1; i >= 0; i--) {
		ctx.beginPath();
		ctx.arc(tail[i].x, tail[i].y, radius, 0, Math.PI*2);
		ctx.fillStyle = color[i] ? color[i] : color[1];
		ctx.fill();
		ctx.closePath();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(0,canvas.height/2, canvas.width, canvas.height/2);
	ctx.fillStyle = "brown";
	ctx.fill();
	ctx.closePath();
	drawWorm();
	moveHead();
	moveWorm();
}

setInterval(draw, 20);
