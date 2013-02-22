if(!window.Convert){
	window.Convert = {
		rgbTOhsv : function(r,g,b){
			var h,s,v,delta,
			
				rgb = [r,g,b],
				maxim = 0,
				minim = 255;
				
			for(var i = 0;i<rgb.length;i++){
				if(rgb[i]<minim){minim=rgb[i];};
				if(rgb[i]>maxim){maxim=rgb[i];};		
			};
			
			delta = maxim - minim;
			v = Math.round(maxim/2.55);		
			
			if( maxim != 0 && delta != 0){
				s = Math.round(100*(delta/maxim));
				
				if( r == maxim ){
					h = (g-b)/delta;		// between yellow & magenta
				}else if( g == maxim ){
					h = 2+(b-r)/delta; // between cyan & yellow
				}else{
					h = 4+(r-g)/delta;	// between magenta & cyan
				}
				h *= 60;				// degrees
				if( h < 0 ){h += 360;};
				
				h = Math.round(h);
				
			}else {
				s = h = 0;
			};
			
			return [h,s,v];
		},
		
		hsvTOrgb : function(h,s,v){
			var i,f, p, q, t,r,g,b,vc;
			
			if( s == 0 ) {
				// achromatic (grey)
				r = g = b = Math.round(v*2.55);
			}else{
				s /= 100;
				v /= 100;
				
				h /= 60;			// sector 0 to 5
				i = Math.floor( h );
				f = h - i;			// factorial part of h
				p = Math.round(255*v * ( 1 - s ));
				q = Math.round(255*v * ( 1 - s * f ));
				t = Math.round(255*v * ( 1 - s * ( 1 - f ) ));
				vc = Math.round(255*v);
				
				switch( i ) {
					case 0:
						r = vc;
						g = t;
						b = p;
						break;
					case 1:
						r = q;
						g = vc;
						b = p;
						break;
					case 2:
						r = p;
						g = vc;
						b = t;
						break;
					case 3:
						r = p;
						g = q;
						b = vc;
						break;
					case 4:
						r = t;
						g = p;
						b = vc;
						break;
					default: // case 5:
						r = vc;
						g = p;
						b = q;
						break;
				}
			};	
			
			return [r,g,b];	
		},	
		
		hexTOrgb : function(h){
		
			var cutHex = function(h) {
				return (h.charAt(0)=="#") ? h.substring(1,7):h;
			};
			
			return [parseInt((cutHex(h)).substring(0,2),16),parseInt((cutHex(h)).substring(2,4),16),parseInt((cutHex(h)).substring(4,6),16)];
		},
		
		rgbTOhex : function(r,g,b){
			
			var toHex = function(n) {
				 n = parseInt(n,10);
				 if (isNaN(n)){ return "00";}
				 n = Math.max(0,Math.min(n,255));
				 return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
			};
		
			return '#'+toHex(r)+toHex(g)+toHex(b);
		},
		
		hexTOhsv : function(h){
			var rgb = this.hexTOrgb(h);
			return this.rgbTOhsv(rgb[0],rgb[1],rgb[2]);	
		},
		
		hsvTOhex : function(h,s,v){
			var rgb = this.hsvTOrgb(h,s,v);
			return this.rgbTOhex(rgb[0],rgb[1],rgb[2]);	
		}
	};
};