var width;
var height;
var r;
var left;
var marginTop;
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600*1000*81);
var showSeconds=0;
var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=function(){
	width=document.documentElement.clientWidth;
	height=document.documentElement.clientHeight;
	left=Math.round(width/10);
	r=Math.round(width*4/5/108)-1;
	marginTop=Math.round(height/5);

	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	canvas.width=width;
	canvas.height=height;
    showSeconds=getShowSeconds();
	setInterval(
		function(){
			render(ctx);
			update();
		}
		,
		50
		);
}
function getShowSeconds(){
	var time=new Date();
	var ret=endTime.getTime()-time.getTime();
	ret=Math.round(ret/1000);
	return ret>0?ret:0;
}
function update(){
    var nextShowTimeSeconds=getShowSeconds();
    var nexthours=parseInt(nextShowTimeSeconds/3600);
	var nextminutes=parseInt((nextShowTimeSeconds-nexthours*3600)/60);
	var nextseconds=nextShowTimeSeconds%60;

	var curhours=parseInt(showSeconds/3600);
	var curminutes=parseInt((showSeconds-curhours*3600)/60);
	var curseconds=showSeconds%60;

	if(nextseconds!=curseconds){
		if(parseInt(curhours/10)!=parseInt(nexthours/10)){
			addBalls(left+0,marginTop,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nexthours%10)){
			addBalls(left+15*(r+1),marginTop,parseInt(curhours%10));
		}

		if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
			addBalls(left+39*(r+1),marginTop,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
			addBalls(left+54*(r+1),marginTop,parseInt(curminutes%10));
		}

		if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
			addBalls(left+78*(r+1),marginTop,parseInt(curseconds/10));
		}
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
			addBalls(left+93*(r+1),marginTop,parseInt(curseconds%10));
		}
		showSeconds=nextShowTimeSeconds;
	}

	updateBalls();
}
function render(ctx){
	ctx.clearRect(0,0,width,height);
	var hours=parseInt(showSeconds/3600);
	var minutes=parseInt((showSeconds-hours*3600)/60);
	var seconds=showSeconds%60;

	renderDigit(left,marginTop,parseInt(hours/10),ctx);
	renderDigit(left+15*(r+1),marginTop,parseInt(hours%10),ctx);
	renderDigit(left+30*(r+1),marginTop,10,ctx);
	renderDigit(left+39*(r+1),marginTop,parseInt(minutes/10),ctx);
	renderDigit(left+54*(r+1),marginTop,parseInt(minutes%10),ctx);
	renderDigit(left+69*(r+1),marginTop,10,ctx);
	renderDigit(left+78*(r+1),marginTop,parseInt(seconds/10),ctx);
	renderDigit(left+93*(r+1),marginTop,parseInt(seconds%10),ctx);

	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.save()
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
	
}

function renderDigit(x,y,num,ctx){
	ctx.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]){
				ctx.beginPath();
				ctx.arc(x+j*2*(r+1)+(r+1),y+i*2*(r+1)+(r+1),r,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}

}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				var aBall={
				x:x+j*2*(r+1)+(r+1),
				y:y+i*2*(r+1)+(r+1),
				g:3+Math.random(),
				vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
				vy:-5,
				color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=height-r){
			balls[i].y=height-r;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}

	var cnt=0;
	for(var i=0;i<balls.length;i++)
		if(balls[i].x+r>0&&balls[i].x-r<width)
			balls[cnt++]=balls[i];

	while(balls.length>Math.min(200,cnt)){
		balls.pop();
	}
}