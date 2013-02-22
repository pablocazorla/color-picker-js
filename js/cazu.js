if(!window.cazu){
	window.cazu = {
		bind : function(eventTarget, eventType, eventHandler){
			if (eventTarget.addEventListener) {
				eventTarget.addEventListener(eventType, eventHandler,false);
			} else if (eventTarget.attachEvent) {
				eventType = "on" + eventType;
				eventTarget.attachEvent(eventType, eventHandler);
			} else {
				eventTarget["on" + eventType] = eventHandler;
			};
			return this;
		},
		click : function(eventTarget, eventHandler){
			this.bind(eventTarget, 'click', eventHandler);
			return this;
		},
		mousedown : function(eventTarget, eventHandler){
			this.bind(eventTarget, 'mousedown', eventHandler);
			return this;
		},
		mousemove : function(eventTarget, eventHandler){
			this.bind(eventTarget, 'mousemove', eventHandler);
			return this;
		},
		mouseup : function(eventTarget, eventHandler){
			this.bind(eventTarget, 'mouseup', eventHandler);
			return this;
		},
		image : function(source,callback){
			var imag = new Image();
			imag.src = source;
			imag.addEventListener('load', callback , false);
			return imag;
		}
		
	};
};