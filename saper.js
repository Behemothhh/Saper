var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var relativeX = 0;
var relativeY = 0;
var bricks = [];
var brickSideHeightCount = prompt("Введите количество строк");
var brickSideWidthCount = prompt("Введите количество столбиков");
var brickSide = 17;
var bombCount = prompt("Введите количество бомб");
var start = true;
var bricksPaddle = 2;
var shift = false;
var count = brickSideHeightCount* brickSideWidthCount;

canvas.height = (brickSide+2)*brickSideHeightCount;
canvas.width = (brickSide+2)*brickSideWidthCount;



for (var c = 0; c < brickSideWidthCount; c++) {
	bricks[c] = [];
	for (var r = 0; r < brickSideHeightCount; r++) {
		bricks[c][r] = {x: 0, y: 0, status: 1, bomb: false, count: 0};
	};
};


document.addEventListener("mouseup", mouseUpHandler, false);
//document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", downHandler, false);
document.addEventListener("keyup", upHandler, false);

/*function mouseDownHandler(e) {
	for(c=0; c<brickSideWidthCount; c++) {
		for(r=0; r<brickSideHeightCount; r++) {
			var b = bricks[c][r];
			if (relativeX > b.x && relativeX < b.x + brickSide && relativeY > b.y && relativeY < b.y + brickSide) {
				bricks[c][r].status = 4;
			};
		};
	}; 
}*/

function downHandler(e) {
	if (e.keyCode == 16) {
		shift = true;
	}
}

function upHandler(e) {
	if (e.keyCode == 16) {
		shift = false;
	}
}

function mouseMoveHandler(e) {
	relativeY = e.pageY - 10;
	relativeX = e.pageX-10;
}

function mouseUpHandler(e) {
	for(c=0; c<brickSideWidthCount; c++) {
		for(r=0; r<brickSideHeightCount; r++) {
			var b = bricks[c][r];
			if (relativeX > b.x && relativeX < b.x + brickSide && relativeY > b.y && relativeY < b.y + brickSide) {
				if (!shift) {
					if (start) {
						makeBombs(c,r);
					};
					if (b.status == 1) {
						open(c, r);
					}
				} else if (shift) {
					switch(b.status) {
						case 4:
							bricks[c][r].status = 1;
							break;
						case 1:
							bricks[c][r].status = 4;
						default:
					}				
				}
			};
		};
	}; 
};

function open(c, r) {
	bricks[c][r].status = 0; 
	count -= 1;
	if (bricks[c][r].bomb == true) {
		var reload = confirm("Вы проиграли! Начать игру заново?");
		if (reload) {
			location.reload();
		} else {
			for (c = 0; c < brickSideWidthCount; c++) {
				for(r = 0; r < brickSideHeightCount; r++) {
					bricks[c][r].status = 1;
				}
			}
		}
	}
	if (bricks[c][r].count == 0) {
		check();
	};
};

function check() {
	for (c = 0; c < brickSideWidthCount; c++) {
		for(r = 0; r < brickSideHeightCount; r++) {
			if (bricks[c][r].status == 1) {
				if (c>0){
					if (bricks[c-1][r].count === 0 && bricks[c-1][r].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (c>0 && r>0) {
					if (bricks[c-1][r-1].count === 0 && bricks[c-1][r-1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (c>0 && r<brickSideHeightCount-1) {
					if (bricks[c-1][r+1].count === 0 && bricks[c-1][r+1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (r>0){ 
					if (bricks[c][r-1].count === 0 && bricks[c][r-1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (r<brickSideHeightCount-1) {
					if (bricks[c][r+1].count === 0 && bricks[c][r+1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (c<brickSideWidthCount-1 && r>0) {
					if (bricks[c+1][r-1].count === 0 && bricks[c+1][r-1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (c<brickSideWidthCount-1) {
					if (bricks[c+1][r].count === 0 && bricks[c+1][r].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
				if (c< brickSideWidthCount-1 && r<brickSideHeightCount-1) {
					if (bricks[c+1][r+1].count === 0 && bricks[c+1][r+1].status == 0 && bricks[c][r].status == 1) {
						open(c,r);
					};
				}
			};
		};
	};
};


function makeBombs(с,r) {
	for (var i = 0; i < bombCount; i++) {
		var bombX = Math.floor(Math.random() * (brickSideWidthCount));
		var bombY = Math.floor(Math.random() * (brickSideHeightCount));
		while (bricks[bombX][bombY].bomb || (c == bombX && r == bombY) || (c == bombX && r == bombY) || (c+1 == bombX && r == bombY) || (c+1 == bombX && r+1 == bombY) || (c+1 == bombX && r-1 == bombY) || (c == bombX && r+1 == bombY) || (c == bombX && r-1 == bombY) || (c-1 == bombX && r == bombY) || (c-1 == bombX && r+1 == bombY) || (c-1 == bombX && r-1 == bombY)) {
			bombX = Math.floor(Math.random() * (brickSideWidthCount));
			bombY = Math.floor(Math.random() * (brickSideHeightCount));
		};
		bricks[bombX][bombY].bomb = true;
	};
	calc(c,r);
};

function calc(e,y) {
	for (c = 0; c < brickSideWidthCount; c++) {
		for (r = 0; r < brickSideHeightCount; r++) {
			if (c>0){
				if (bricks[c-1][r].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (c>0 && r>0) {
				if (bricks[c-1][r-1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (c>0 && r<brickSideHeightCount-1) {
				if (bricks[c-1][r+1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (r>0){ 
				if (bricks[c][r-1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (r<brickSideHeightCount-1) {
				if (bricks[c][r+1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (c<brickSideWidthCount-1 && r>0) {
				if (bricks[c+1][r-1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (c<brickSideWidthCount-1) {
				if (bricks[c+1][r].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
			if (c< brickSideWidthCount-1 && r<brickSideHeightCount-1) {
				if (bricks[c+1][r+1].bomb === true) {
					bricks[c][r].count += 1;
				};
			};
		};
	};
	start = false;
	open(e,y);
};

function drawBricks() {
	for(c=0; c<brickSideWidthCount; c++) {
		for(r=0; r<brickSideHeightCount; r++) {
			var brickX = c*(brickSide + bricksPaddle);
			var brickY = r*(brickSide + bricksPaddle);
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			if (bricks[c][r].status === 1) {
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickSide, brickSide);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			} else if(bricks[c][r].status === 4) { 
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickSide, brickSide);
				ctx.fillStyle = "green";
				ctx.fill();
				ctx.closePath();
			}else if (bricks[c][r].bomb === false ) {
				ctx.font = brickSide + "px Arial";
				ctx.fillStyle = "#0095DD";
				ctx.fillText(bricks[c][r].count, brickX, brickY+brickSide)
			} else {
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickSide, brickSide);
				ctx.fillStyle = "#000000";
				ctx.fill();
				ctx.closePath();
			};
		};
	};
};

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(count, 20,20);
}


function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	/*if (start) {
		makeBombs(c,r);
		calc();
		start = false;
	};*/
	drawBricks();
	drawScore();
	if (count == bombCount) {
		alert("Вы победили!");
		location.reload();
	}
};

setInterval(draw, 10);
