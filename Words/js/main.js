var width = Math.min(500, $(window).width() - 20);
var height = width;
var isMousedown = false;
var lastloc = {
	x: 0,
	y: 0
};
var lastTimestamp = 0;
var lastlineWidth = 0;
var strokeColor = "black";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var btn = document.getElementById('clearBtn');

canvas.width = width;
canvas.height = height;

btn.onclick = function() {
	ctx.clearRect(0, 0, width, height);
	drawGrid();
}
$(".colorBtn").click(
	function(e) {
		$(".colorBtn").removeClass("selected");
		$(this).addClass("selected");
		strokeColor = $(this).css("background-color");
	})
drawGrid();



function windowToCanvas(x, y) {
	var box = canvas.getBoundingClientRect();
	return {
		x: Math.round(x - box.left),
		y: Math.round(y - box.top)
	};
}

function beginStroke(point) {
	isMousedown = true;
	lastloc = windowToCanvas(point.x, point.y);
	lastTimestamp = new Date().getTime();
}

function endStroke() {
	isMousedown = false;
}

function moveStroke(point) {
	var curloc = windowToCanvas(point.x, point.y);
	var curTimestamp = new Date().getTime();
	var dis = calDis(curloc, lastloc);
	var t = curTimestamp - lastTimestamp;
	var lineWidth = calWidth(t, dis);
	console.log(lastlineWidth);
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.lineCap = "round";
	ctx.lineJoin = "join";
	ctx.moveTo(lastloc.x, lastloc.y);
	ctx.lineTo(curloc.x, curloc.y);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();
	lastloc = curloc;
	lastTimestamp = curTimestamp;
	lastlineWidth = lineWidth;
}
canvas.onmousedown = function(e) {
	e.preventDefault();
	console.log(111);
	beginStroke({
		x: e.clientX,
		y: e.clientY
	});
	console.log(e.clientX,e.clientY);
};
canvas.onmouseup = function(e) {
	e.preventDefault();
	endStroke();
};
canvas.onmouseout = function(e) {
	e.preventDefault();
	endStroke();
};
canvas.onmousemove = function(e) {
	e.preventDefault();
	if (isMousedown) {
		moveStroke({
			x: e.clientX,
			y: e.clientY
		});
	}
};
canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	touch=e.touches[0];
	beginStroke({
		x: touch.pageX,
		y: touch.pageY
	});
});
canvas.addEventListener('touchmove',function(e){
	e.preventDefault();
	touch=e.touches[0];
	moveStroke({
		x: touch.pageX,
		y: touch.pageY
	});
});
canvas.addEventListener('touchend',function(e){
	e.preventDefault();
	endStroke();
});

function calDis(loc1, loc2) {
	return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
};

function calWidth(t, s) {
	var v = s / t;
	var result;
	if (v <= 0.1) {
		result = 20;
	} else if (v >= 10) {
		result = 1;
	} else {
		result = 20 - (v - 0.1) / (10 - 0.1) * (20 - 1)
	}
	if (lastlineWidth == 0) {
		return result;
	} else {

		return lastlineWidth * 2 / 3 + result / 3;
	}
};

function drawGrid() {
	ctx.save();
	ctx.strokeStyle = "rgb(230,11,9)";
	ctx.beginPath();
	ctx.moveTo(3, 3);
	ctx.lineTo(width - 3, 3);
	ctx.lineTo(width - 3, height - 3);
	ctx.lineTo(3, height - 3);
	ctx.closePath();

	ctx.lineWidth = 6;
	ctx.stroke();

	//绘制斜线
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(width, height);

	ctx.moveTo(width, 0);
	ctx.lineTo(0, height);

	ctx.moveTo(width / 2, 0);
	ctx.lineTo(width / 2, height);

	ctx.moveTo(0, height / 2);
	ctx.lineTo(width, height / 2);

	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();
}