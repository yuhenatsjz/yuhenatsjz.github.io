window.onload=function() {
		am();
    }
	var bgImg=[];
    bgImg[0]=[20,0];
    bgImg[1]=[190,0];
    bgImg[2]=[360,0];
    bgImg[3]=[20,170];
    bgImg[4]=[190,170];
    bgImg[5]=[360,170];
	bgImg[6]=[20,340];
    bgImg[7]=[190,340];
    bgImg[8]=[360,340];
	var imageWidth = 150;
	var imageheight = 150;
	function am(){
		var Speed = 1; //速度
		var fps = 1000; 
		var canvas =document.getElementById("CanvasCup");      
		var context2D = canvas.getContext("2d");
		var pic = new Image();   
		pic.src = imgs.bg;  //注意目录结构，这里是把图片和html放在一个目录的
		var t =0; //定义第几个元素
		var ix =  bgImg[t][0];
		var iy = bgImg[t][1];
		var CenterPint = [190,170]; //中心坐标点
		var direction = true; //true正面转动，false 反面转动  stop(); return;
		var bool = true;  //维护反方向 x坐标 第一次初始化赋值
		var booly = true; //维护反方向 y坐标 第一次初始化赋值 
		//注意下面方法中画笔状态的保护，这在很多情况下都会使用到  
		function draw(){
			if(t > 8){stop(); direction=false;t--;ix = bgImg[t][0]; iy = bgImg[t][1];}
			if(t < 0){ direction=true; t++; stop(); boxclick(canvas,context2D); return;}
			if(direction){
				if( iy+Speed == CenterPint[1] || ix + Speed == CenterPint[0] || ix == CenterPint[0] && iy == CenterPint[1]  ){
					if(t<9){t++; ix = bgImg[t][0]; iy = bgImg[t][1];}
				}
			}
			else{
				if(iy+Speed == bgImg[t][1] || ix+Speed == bgImg[t][0] || ix == CenterPint[0] && iy == CenterPint[1])
				    if(t>=0){t--; ix = bgImg[t][0];iy = bgImg[t][1]; bool=true; booly=true;}
			}
			if(ix != CenterPint[0]){
			  if(direction){CenterPint[0]-ix > 0 ?  ix = ix + Speed : ix = ix - Speed;}
			  else{
				   if(CenterPint[0]-ix < 0){
						 if(bool){ 
							bool =false;
							ix = CenterPint[0];
						 }
						 ix = ix+ Speed;
					}
					else { if(bool){ 
						bool =false;ix = CenterPint[0];
					 }
					 ix = ix- Speed;}
				}
			}
			if(iy != CenterPint[1]){
			  if(direction){
			  	  CenterPint[1]-iy > 0 ?  iy = iy + Speed :  iy = iy - Speed;}
			  else{
				   if(CenterPint[1]-iy < 0){
						 if(booly){ 
							booly =false;
							iy = CenterPint[1];
						 }
						 iy = iy+ Speed;
					}
						else { if(booly){ 
							booly =false;iy = CenterPint[1];
						 }
						 iy = iy - Speed;
					}
			   }
			}
			context2D.clearRect(0,0,canvas.getAttribute("width"),canvas.getAttribute("height"));
			if( t >= 4) {context2D.drawImage(pic,bgImg[4][0], bgImg[4][1],imageWidth,imageheight);};
			for(var i =0;i<9;i++){
				if( t < i ){
					context2D.drawImage(pic,bgImg[i][0], bgImg[i][1],imageWidth,imageheight);
				}
			}
			context2D.save();//保存画笔状态
			context2D.translate(ix ,iy);
			context2D.drawImage(pic,0, 0,imageWidth,imageheight);  
			context2D.restore();//绘制结束以后，恢复画笔状态
		}
		interval = setInterval(draw, 1000/fps);  
	}
	function boxclick(canvas,context2D){
		canvas.onclick = function(e) {
			var canvasOffset = $(canvas).offset();
			var canvasX = Math.floor(e.pageX - canvasOffset.left);
			var canvasY = Math.floor(e.pageY - canvasOffset.top);
			//console.log("x:"+canvasX +"   y:"+canvasY);
			var p = new Image();   
			p.src = "img/get-2.png";  //注意目录结构，这里是把图片和html放在一个目录的
			lottery(canvasX,canvasY,context2D,p);
		}
	}
	function lottery(x,y,context2D,p){
		//alert("x:"+x+"y:"+y);	
		for(var i =0;i<9;i++){
			var w = bgImg[i][0] + imageWidth;
			var h = bgImg[i][1] + imageheight;
			
			if(bgImg[i][0] <=x && x <= w && bgImg[i][1]<=y && y<=h)
			{
				console.log("p:"+i);
				var pWidth = bgImg[i][0];
				var pHeight = bgImg[i][1];
				p.onload = function(){
					context2D.drawImage(p,pWidth,pHeight,imageWidth,imageheight);
				}
			}
		}
	}
	function stop(){
		clearInterval(interval);
	}
	//定时器
	var interval=null;

	var imgs = {
		bg:"img/bg.png"
	}