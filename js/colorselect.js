var k = function(arg){console.log(arg);}

;(function(){
	var colorSelect = function(arg){
		this.canvas = document.getElementById(arg);
		this.c = canvas.getContext('2d');
		this.dimensions = function(){
			return this.canvas.getBoundingClientRect();
		},
		this.foreground = "#F00";
		this.background = "#FFF";
		this.c.strokeStyle = "#333"; 
		this.c.lineWidth = 1;
		this.c.lineJoin = 'miter';
		
		//
		var h = 0,
			s = 100,
			v = 100,
			offsetX = 0,
			offsetY = 0,
			delta = 2*Math.PI/3,
			x = this.dimensions().width/2 + offsetX,
			y = this.dimensions().height/2 + offsetY,
			r0 = 75,
			r1 = 85,
			r2 = 105,
			r1_5 = (r1+r2)/2,			
			t1 = [x + r0*Math.cos(2*Math.PI/3),y - r0*Math.sin(2*Math.PI/3)],
			t2 = [x + r0*Math.cos(4*Math.PI/3),y - r0*Math.sin(4*Math.PI/3)],
			t3 = [x + r0,y],
			triangSide = 2*r0*Math.cos(Math.PI/6),
			sampleSide = 18,
			markerRadius = 4,
			currentMarker = undefined,			
			markers = [[x-r1_5,y],[x+r0,y]],
			circleImg,
			
			setH = function(mX,mY){
				var hx = mX-x,
				hy = mY-y,
				ang = Math.atan(hy/hx);
				if(hx>=0){ang+=Math.PI}
				h = Math.round(180*ang/Math.PI)
				if(hy>0&&hx<0){h+=360};
				markers[0][0] = x-r1_5*Math.cos(ang);
				markers[0][1] = y-r1_5*Math.sin(ang);
			},
			setSV = function(mX,mY){
				
				var	minX = x-r0/2,
					maxX = x + r0,
					mkX = mX,
					mkY = mY;
				markers[1][0] = mX;
				markers[1][1] = mY;
					
				if(mX < minX){markers[1][0] = mkX = minX;};
				if(mX > maxX){markers[1][0] = mkX = maxX;};				
				
				var delY = (x+r0-mkX)*triangSide/(3*r0);
				
				var	minY = y-delY,
					maxY = y + delY;
				if(mY < minY){markers[1][1] = minY;};
				if(mY > maxY){markers[1][1] = maxY;};				 
			},
			
		drawTriang = function(fillSty){
			this.c.fillStyle = fillSty;
							
			this.c.beginPath();
			this.c.moveTo(t1[0], t1[1]);	
			this.c.lineTo(t2[0], t2[1]);
			this.c.lineTo(t3[0], t3[1]);
			
			this.c.closePath();
			this.c.fill(); 
		},
		drawCircle = function(r,va,fillSty){
			if(fillSty){
				this.c.fillStyle = fillSty;			
			}
			
			this.c.arc(x,y,r,0,2*Math.PI,va);
			this.c.closePath();
			
		},
		drawMarker = function(x,y){
			this.c.save();
			this.c.strokeStyle = "#999";
			this.c.beginPath();			
			this.c.arc(x,y,markerRadius+1,0,2*Math.PI,true);
			this.c.closePath();
			this.c.stroke();
			this.c.restore();
			this.c.beginPath();			
			this.c.arc(x,y,markerRadius,0,2*Math.PI,true);
			this.c.closePath();
			this.c.stroke();
		},
		drawRect = function(x,y,w,h){
			this.c.beginPath();
			this.c.moveTo(x, y);
			this.c.lineTo(x+w, y);
			this.c.lineTo(x+w, y+h);
			this.c.lineTo(x, y+h);
			this.c.closePath();
			
			this.c.fill();
			this.c.stroke();
		},
		
		mouseX = function(event){			
			// Convert mouse event coordinates to canvas coordinates
			return Math.round((event.clientX-this.dimensions().left) * (this.canvas.width/this.dimensions().width));
		},
		mouseY = function(event){			
			// Convert mouse event coordinates to canvas coordinates
			return Math.round((event.clientY-this.dimensions().top) * (this.canvas.height/this.dimensions().height));
		};
		
		this.draw = function(){
			this.c.clearRect(0,0,this.dimensions().width,this.dimensions().height);			
// 			console.log(this.dimensions().width);
			// var ix = x - circleImg.width/2,
				// iy = y - circleImg.height/2;			
			// this.c.drawImage(circleImg, ix, iy);
// 			
// 			
// 					
			
			//Draw Sample
			this.c.lineWidth = 2;
			this.c.fillStyle = this.background;
			drawRect(x-r2+sampleSide*0.4,y-r2+sampleSide*0.4,sampleSide,sampleSide);
			this.c.fillStyle = this.foreground;
			drawRect(x-r2,y-r2,sampleSide,sampleSide);
			this.c.lineWidth = 1;
			
			//Draw Circle
			this.c.beginPath();			
			drawCircle(r2,false,'#aaa');
			this.c.moveTo(x+r1,y)
			drawCircle(r1,true);
			
			this.c.save();
			var ix = x - circleImg.width/2,
				iy = y - circleImg.height/2;
			
			this.c.translate(ix,iy);
			var fillcircle = this.c.createPattern(circleImg,'no-repeat');
			this.c.fillStyle = fillcircle;	
			this.c.fill();
			this.c.stroke();
			this.c.restore();
			
			//Draw Triang
			var gS1 = x + r0*Math.cos(delta),
				gS2 = y - r0*Math.sin(delta),
				gS3 = gS1 + 1.5*r0*Math.cos(delta/2),
				gS4 = gS2 + 1.5*r0*Math.sin(delta/2),			
				gSaturation = this.c.createLinearGradient(gS1, gS2, gS3,gS4);
			gSaturation.addColorStop(0,'#FFF');
			gSaturation.addColorStop(1,Convert.hsvTOhex(h,100,100));
			
			var gV1 = x + r0*Math.cos(2*delta),
				gV2 = y - r0*Math.sin(2*delta),
				gV3 = gV1 + 1.5*r0*Math.cos(delta/2),
				gV4 = gV2 - 1.5*r0*Math.sin(delta/2),
				gValue = this.c.createLinearGradient(gV1, gV2, gV3,gV4);
			gValue.addColorStop(0,'rgba(0,0,0,1)');
			gValue.addColorStop(1,'rgba(0,0,0,0)');		
			
			drawTriang(gSaturation);
			drawTriang(gValue);
			this.c.stroke();
			
			for(var i=0;i<markers.length;i++){
				drawMarker(markers[i][0],markers[i][1]);
			};			
		};
		
		
		
		this.mDown = function(ev){
			var mX = mouseX(ev),mY = mouseY(ev);
			
			//Detect current Marker:
			
			var hx = mX-x,
				hy = mY-y,			
				h = Math.sqrt(hx*hx+hy*hy);
				
			if(h >= r1 && h <= r2){
				currentMarker = 0;				
				setH(mX,mY);								
				draw();				
			}else if(h <= r0){
				currentMarker = 1;
				setSV(mX,mY);
				draw();
			}else{
				currentMarker = undefined;
			}
			
			
			return false;
		};
		this.mMove = function(ev){
			var mX = mouseX(ev),mY = mouseY(ev);
			if(currentMarker != undefined){
				if(currentMarker == 0){
					setH(mX,mY);													
				}else if(currentMarker == 1){
					setSV(mX,mY);
				}
				draw();
			}
			return false;
		};
		this.mUp = function(ev){
			var mX = mouseX(ev),mY = mouseY(ev);
			currentMarker = undefined;
			return false;
		};
		
		
		cazu.mousedown(this.canvas,mDown).mousemove(this.canvas,mMove).mouseup(this.canvas,mUp);
		
		circleImg = cazu.image('img/hue.png',function(){
			draw();
		});
		
		return this;
	}
	
	
	//Shortcut
	if(!window.colorSelect){
		window.colorSelect = colorSelect;
	};	
})();
