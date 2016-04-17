(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.loadEmbed = function(o) {
	ApplicationMain.embeds = (ApplicationMain.embeds != null?ApplicationMain.embeds:0) + 1;
	var f = null;
	f = function(_) {
		o.removeEventListener("load",f);
		if(--ApplicationMain.embeds == 0) ApplicationMain.preload();
	};
	o.addEventListener("load",f);
};
ApplicationMain.main = function() {
	if(ApplicationMain.embeds == null || ApplicationMain.embeds == 0) ApplicationMain.preload();
};
ApplicationMain.preload = function() {
	ApplicationMain.bytesLoaded = ApplicationMain.totalBytes = 0;
	var _g = 0;
	var _g1 = ApplicationMain.AssetBytes;
	while(_g < _g1.length) {
		var bytes = _g1[_g];
		++_g;
		ApplicationMain.totalBytes += bytes;
	}
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe_ds_StringMap();
	ApplicationMain.urlLoaders = new haxe_ds_StringMap();
	ApplicationMain.total = 0;
	openfl_Lib.get_current().loaderInfo = openfl_display_LoaderInfo.create(null);
	openfl_Lib.get_stage().set_frameRate(60);
	openfl_Lib.get_current().addChild(ApplicationMain.preloader = new NMEPreloader());
	ApplicationMain.preloader.onInit();
	ApplicationMain.loadFile("img/aura.png");
	ApplicationMain.loadFile("img/enemy_0.png");
	ApplicationMain.loadFile("img/enemy_0a.png");
	ApplicationMain.loadFile("img/enemy_1.png");
	ApplicationMain.loadFile("img/enemy_2.png");
	ApplicationMain.loadFile("img/enemy_a.png");
	ApplicationMain.loadFile("img/enemy_b.png");
	ApplicationMain.loadFile("img/player.png");
	ApplicationMain.loadFile("img/test.png");
	ApplicationMain.loadBinary("img/Untitled-1.psd");
	var resourcePrefix = "NME_:bitmap_";
	var _g2 = 0;
	var _g11 = haxe_Resource.listNames();
	while(_g2 < _g11.length) {
		var resourceName = _g11[_g2];
		++_g2;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total != 0) {
		ApplicationMain.loaderStack = [];
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			ApplicationMain.loaderStack.push(p);
		}
		ApplicationMain.urlLoaderStack = [];
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var p1 = $it1.next();
			ApplicationMain.urlLoaderStack.push(p1);
		}
		var _g3 = 0;
		while(_g3 < 8) {
			var i = _g3++;
			ApplicationMain.nextLoader();
		}
	} else ApplicationMain.begin();
};
ApplicationMain.nextLoader = function() {
	if(ApplicationMain.loaderStack.length != 0) {
		var p = ApplicationMain.loaderStack.shift();
		var o = ApplicationMain.loaders.get(p);
		o.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
		o.load(new openfl_net_URLRequest(p));
	} else if(ApplicationMain.urlLoaderStack.length != 0) {
		var p1 = ApplicationMain.urlLoaderStack.shift();
		var o1 = ApplicationMain.urlLoaders.get(p1);
		o1.addEventListener("complete",ApplicationMain.loader_onComplete);
		o1.load(new openfl_net_URLRequest(p1));
	}
};
ApplicationMain.loadFile = function(p) {
	var value = new openfl_display_Loader();
	ApplicationMain.loaders.set(p,value);
	ApplicationMain.total++;
};
ApplicationMain.loadBinary = function(p) {
	var o = new openfl_net_URLLoader();
	o.set_dataFormat(0);
	ApplicationMain.urlLoaders.set(p,o);
	ApplicationMain.total++;
};
ApplicationMain.loadSound = function(p) {
	return;
	var i = p.lastIndexOf(".");
	var c = openfl_media_Sound;
	var s;
	var o;
	var m = openfl_Lib.get_mobile();
	var f = null;
	var q = "canplaythrough";
	if(i == -1) return;
	if(!c.canPlayType || !c.canPlayType(HxOverrides.substr(p,i + 1,null))) return;
	s = HxOverrides.substr(p,0,i) + ".mp3";
	if(c.library.exists(s)) return;
	ApplicationMain.total++;
	c.library.set(s,o = new Audio(p));
	f = function(_) {
		if(!m) o.removeEventListener(q,f);
		ApplicationMain.preloader.onUpdate(++ApplicationMain.completed,ApplicationMain.total);
		if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
	};
	if(m) f(null); else o.addEventListener(q,f);
};
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener("complete",ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
};
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType;
	if(instance == null) classType = null; else classType = js_Boot.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
};
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.bytesLoaded += ApplicationMain.AssetBytes[HxOverrides.indexOf(ApplicationMain.AssetNames,event._target.url,0)];
	ApplicationMain.preloader.onUpdate(ApplicationMain.bytesLoaded,ApplicationMain.totalBytes);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin(); else ApplicationMain.nextLoader();
};
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener("complete",ApplicationMain.preloader_onComplete);
	openfl_Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Main.main == null) {
		var o = new DocumentClass();
		if(js_Boot.__instanceof(o,openfl_display_DisplayObject)) openfl_Lib.get_current().addChild(o);
	} else Main.main();
};
var openfl_events_IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl_events_IEventDispatcher;
openfl_events_IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl_events_IEventDispatcher.prototype = {
	__class__: openfl_events_IEventDispatcher
};
var openfl_events_EventDispatcher = function() {
	this.eventList = new haxe_ds_StringMap();
};
$hxClasses["openfl.events.EventDispatcher"] = openfl_events_EventDispatcher;
openfl_events_EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl_events_EventDispatcher.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_events_EventDispatcher.prototype = {
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o;
		if(!this.eventList.exists(type)) {
			var value = o = [];
			this.eventList.set(type,value);
		} else o = this.eventList.get(type);
		o.push(listener);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		if(this.eventList.exists(type)) {
			var r = this.eventList.get(type);
			var _g = 0;
			while(_g < r.length) {
				var o = r[_g];
				++_g;
				if(Reflect.compareMethods(o,listener)) {
					HxOverrides.remove(r,o);
					break;
				}
			}
			if(r.length == 0) this.eventList.remove(type);
		}
	}
	,hasEventListener: function(type) {
		return this.eventList.exists(type);
	}
	,dispatchEvent: function(event) {
		if(event.get_target() == null) event.set_target(this);
		event.set_currentTarget(this);
		var t = event.type;
		if(this.eventList.exists(t)) {
			var list = this.eventList.get(t);
			var i = 0;
			while(i < list.length) {
				var func = list[i];
				func(event);
				if(list[i] == func) i++;
			}
		}
		return true;
	}
	,__class__: openfl_events_EventDispatcher
};
var openfl_events_EventWrapper = function() {
	openfl_events_EventDispatcher.call(this);
	this.eventMap = new haxe_ds_ObjectMap();
};
$hxClasses["openfl.events.EventWrapper"] = openfl_events_EventWrapper;
openfl_events_EventWrapper.__name__ = ["openfl","events","EventWrapper"];
openfl_events_EventWrapper.__super__ = openfl_events_EventDispatcher;
openfl_events_EventWrapper.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var _g = this;
		openfl_events_EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
		var f;
		var wrapper = function(e) {
			if(e.get_target() == _g.component) e.set_target(_g);
			e.set_currentTarget(_g);
			listener(e);
		};
		f = wrapper;
		if(!(this.eventMap.h.__keys__[listener.__id__] != null)) this.eventMap.set(listener,f);
		this.component.addEventListener(type,f,useCapture);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		openfl_events_EventDispatcher.prototype.removeEventListener.call(this,type,listener,useCapture);
		if(this.eventMap.h.__keys__[listener.__id__] != null) {
			this.component.removeEventListener(type,this.eventMap.h[listener.__id__],useCapture);
			this.eventMap.remove(listener);
		}
	}
	,__class__: openfl_events_EventWrapper
});
var openfl_display_DisplayObject = function() {
	this.y = 0;
	this.x = 0;
	this.rotation = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.alpha = 1;
	this.visible = true;
	openfl_events_EventWrapper.call(this);
	this.eventRemap = new haxe_ds_StringMap();
	if(this.component == null) this.component = openfl_Lib.jsNode("div");
	this.component.node = this;
	this.transform = new openfl_geom_Transform(this);
};
$hxClasses["openfl.display.DisplayObject"] = openfl_display_DisplayObject;
openfl_display_DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl_display_DisplayObject.__super__ = openfl_events_EventWrapper;
openfl_display_DisplayObject.prototype = $extend(openfl_events_EventWrapper.prototype,{
	broadcastEvent: function(e) {
		this.dispatchEvent(e);
	}
	,invalidate: function() {
	}
	,syncMtx: function() {
		var s = this.component.style;
		var v;
		var n;
		if(this._syncMtx_set != true) {
			this._syncMtx_set = true;
			openfl_Lib.setCSSProperties(s,"transform-origin","0% 0%",31);
		}
		v = "";
		if(this.x != 0 || this.y != 0) v += "translate(" + this.x + "px, " + this.y + "px) ";
		if(this.scaleX != 1 || this.scaleY != 1) v += "scale(" + this.scaleX + ", " + this.scaleY + ") ";
		if(this.rotation != 0) v += "rotate(" + this.rotation + "deg) ";
		if(this.transform != null) {
			var m = this.transform.get_matrix();
			if(m != null && !m.isIdentity()) v += "matrix(" + m.a + ", " + m.b + ", " + m.c + ", " + m.d + ", " + m.tx + ", " + m.ty + ")" + " ";
		}
		n = "transform";
		s.setProperty(n,v,null);
		s.setProperty("-o-" + n,v,null);
		s.setProperty("-ms-" + n,v,null);
		s.setProperty("-moz-" + n,v,null);
		s.setProperty("-webkit-" + n,v,null);
	}
	,set_x: function(v) {
		if(this.x != v) {
			this.x = v;
			this.syncMtx();
		}
		return v;
	}
	,set_y: function(v) {
		if(this.y != v) {
			this.y = v;
			this.syncMtx();
		}
		return v;
	}
	,set_rotation: function(v) {
		if(this.rotation != v) {
			this.rotation = v;
			this.syncMtx();
		}
		return v;
	}
	,set_scaleX: function(v) {
		if(this.scaleX != v) {
			this.scaleX = v;
			this.syncMtx();
		}
		return v;
	}
	,set_scaleY: function(v) {
		if(this.scaleY != v) {
			this.scaleY = v;
			this.syncMtx();
		}
		return v;
	}
	,get_width: function() {
		return this.__width || 0;
	}
	,get_height: function() {
		return this.__height || 0;
	}
	,set_width: function(v) {
		var q = this.get_width();
		this.set_scaleX(q == 0 || q == null?1:v / q);
		this.__width = v;
		return v;
	}
	,set_height: function(v) {
		var q = this.get_height();
		this.set_scaleY(q == 0 || q == null?1:v / q);
		this.__height = v;
		return v;
	}
	,set_alpha: function(v) {
		if(v != this.alpha) this.component.style.opacity = (this.alpha = v).toFixed(4);
		return v;
	}
	,get_filters: function() {
		if(this.__filters == null) return [];
		return this.__filters.slice();
	}
	,set_filters: function(v) {
		this.__filters = v;
		return v;
	}
	,set_visible: function(v) {
		if(this.visible != v) {
			this.visible = v;
			if(v) this.component.style.display = ""; else this.component.style.display = "none";
		}
		return v;
	}
	,set_scrollRect: function(v) {
		return v;
	}
	,get_stage: function() {
		return this.__stage;
	}
	,set_stage: function(v) {
		if(this.__stage != v) {
			var z = this.__stage != null != (v != null);
			this.__stage = v;
			if(z) this.dispatchEvent(new openfl_events_Event(v != null?"addedToStage":"removedFromStage"));
		}
		return v;
	}
	,getBounds: function(o) {
		var m = this.getGlobalMatrix();
		var r = new openfl_geom_Rectangle(0,0,this.get_width(),this.get_height());
		if(o == null) o = this;
		if(o != this) {
			r.transform(m);
			if(o != null) {
				m = o.getGlobalMatrix();
				m.invert();
				r.transform(m);
			}
		}
		return r;
	}
	,getRect: function(o) {
		return this.getBounds(o);
	}
	,concatTransform: function(m) {
		if(!this.transform.get_matrix().isIdentity()) m.concat(this.transform.get_matrix());
		if(this.rotation != 0) m.rotate(this.rotation * Math.PI / 180);
		if(this.scaleX != 1 || this.scaleY != 1) m.scale(this.scaleX,this.scaleY);
		if(this.x != 0 || this.y != 0) m.translate(this.x,this.y);
	}
	,getGlobalMatrix: function(m) {
		if(m == null) m = new openfl_geom_Matrix();
		var o = this;
		while(o != null) {
			o.concatTransform(m);
			o = o.parent;
		}
		return m;
	}
	,globalToLocal: function(q,r) {
		if(r == null) r = new openfl_geom_Point();
		var m = openfl_display_DisplayObject.convMatrix;
		var u = q.x;
		var v = q.y;
		if(m == null) m = openfl_display_DisplayObject.convMatrix = new openfl_geom_Matrix();
		m.identity();
		m = this.getGlobalMatrix(m);
		m.invert();
		r.x = u * m.a + v * m.c + m.tx;
		r.y = u * m.b + v * m.d + m.ty;
		return r;
	}
	,localToGlobal: function(q,r) {
		if(r == null) r = new openfl_geom_Point();
		var m = openfl_display_DisplayObject.convMatrix;
		var u = q.x;
		var v = q.y;
		if(m == null) m = openfl_display_DisplayObject.convMatrix = new openfl_geom_Matrix();
		m.identity();
		m = this.getGlobalMatrix(m);
		r.x = u * m.a + v * m.c + m.tx;
		r.y = u * m.b + v * m.d + m.ty;
		return r;
	}
	,get_mouseX: function() {
		return (openfl_display_DisplayObject.convPoint = this.globalToLocal(openfl_Lib.get_current().get_stage().mousePos,openfl_display_DisplayObject.convPoint)).x;
	}
	,get_mouseY: function() {
		return (openfl_display_DisplayObject.convPoint = this.globalToLocal(openfl_Lib.get_current().get_stage().mousePos,openfl_display_DisplayObject.convPoint)).y;
	}
	,hitTestPoint: function(x,y,p) {
		if(p == null) p = false;
		openfl_display_DisplayObject.convPoint.x = x;
		openfl_display_DisplayObject.convPoint.y = y;
		this.globalToLocal(openfl_display_DisplayObject.convPoint,openfl_display_DisplayObject.convPoint);
		return this.hitTestLocal(openfl_display_DisplayObject.convPoint.x,openfl_display_DisplayObject.convPoint.y,p);
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && x >= 0 && y >= 0 && x <= this.get_width() && y <= this.get_height();
	}
	,addEventListener: function(type,listener,useCapture,priority,weak) {
		if(weak == null) weak = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		openfl_events_EventWrapper.prototype.addEventListener.call(this,type,listener,useCapture,priority,weak);
	}
	,broadcastMouse: function(h,e,ms,mc) {
		if(!this.visible) return false;
		var o;
		var t = e.type;
		var m;
		var m2;
		var d = h.length;
		var l;
		var x;
		var y;
		h.push(this);
		if(mc.length > 0) m = mc.pop(); else m = new openfl_geom_Matrix();
		l = ms.length;
		while(l <= d) {
			o = h[l];
			m.identity();
			o.concatTransform(m);
			m.invert();
			if(mc.length > 0) m2 = mc.pop(); else m2 = new openfl_geom_Matrix();
			if(l > 0) m2.copy(ms[l - 1]); else m2.identity();
			m2.concat(m);
			ms.push(m2);
			l++;
		}
		m.copy(ms[d]);
		x = e.stageX * m.a + e.stageY * m.c + m.tx;
		y = e.stageX * m.b + e.stageY * m.d + m.ty;
		mc.push(m);
		h.pop();
		if(this.hitTestLocal(x,y,true,true)) {
			if(e.relatedObject == null) {
				e.localX = x;
				e.localY = y;
				e.relatedObject = this;
			}
			this.dispatchEvent(e);
			return true;
		}
		return false;
	}
	,dispatchEvent: function(event) {
		var r = openfl_events_EventWrapper.prototype.dispatchEvent.call(this,event);
		if(r && event.bubbles) {
			var _g = event.type;
			switch(_g) {
			case "mouseMove":case "mouseOver":case "mouseOut":case "mouseClick":case "mouseDown":case "mouseUp":case "rightClick":case "rightMouseDown":case "rightMouseUp":case "middleClick":case "middleMouseDown":case "middleMouseUp":case "mouseWheel":case "touchMove":case "touchBegin":case "touchEnd":
				var parent = this.parent;
				if(parent != null) parent.dispatchEvent(event);
				break;
			}
		}
		return r;
	}
	,toString: function() {
		return Type.getClassName(js_Boot.getClass(this));
	}
	,__class__: openfl_display_DisplayObject
});
var openfl_display_InteractiveObject = function() {
	openfl_display_DisplayObject.call(this);
	this.tabEnabled = false;
	this.tabIndex = 0;
	this.mouseEnabled = this.doubleClickEnabled = true;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl_display_InteractiveObject;
openfl_display_InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl_display_InteractiveObject.__super__ = openfl_display_DisplayObject;
openfl_display_InteractiveObject.prototype = $extend(openfl_display_DisplayObject.prototype,{
	giveFocus: function() {
		this.component.focus();
	}
	,__class__: openfl_display_InteractiveObject
});
var openfl_display_DisplayObjectContainer = function() {
	openfl_display_InteractiveObject.call(this);
	this.children = [];
	this.mouseChildren = true;
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl_display_DisplayObjectContainer;
openfl_display_DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl_display_DisplayObjectContainer.__super__ = openfl_display_InteractiveObject;
openfl_display_DisplayObjectContainer.prototype = $extend(openfl_display_InteractiveObject.prototype,{
	get_numChildren: function() {
		return this.children.length;
	}
	,addChild: function(o) {
		if(o.parent != null) o.parent.removeChild(o);
		o.parent = this;
		o.set_stage(this.get_stage());
		this.children.push(o);
		this.component.appendChild(o.component);
		var e = new openfl_events_Event("added");
		o.dispatchEvent(e);
		this.dispatchEvent(e);
		return o;
	}
	,removeChild: function(o) {
		if(o.parent == this) {
			o.parent = null;
			o.set_stage(null);
			HxOverrides.remove(this.children,o);
			this.component.removeChild(o.component);
			var e = new openfl_events_Event("removed");
			o.dispatchEvent(e);
			this.dispatchEvent(e);
		}
		return o;
	}
	,addChildAt: function(o,v) {
		if(v < this.children.length) {
			if(o.parent != null) o.parent.removeChild(o);
			o.parent = this;
			o.set_stage(this.get_stage());
			this.component.insertBefore(o.component,this.children[v].component);
			this.children.splice(v,0,o);
			return o;
		} else return this.addChild(o);
	}
	,removeChildAt: function(v) {
		return this.removeChild(this.children[v]);
	}
	,removeChildren: function(b,e) {
		if(b == null) b = 0;
		if(e == null) e = this.children.length;
		var i = e - b;
		while(--i >= 0) this.removeChild(this.children[b]);
	}
	,getChildAt: function(v) {
		return this.children[v];
	}
	,getChildIndex: function(v) {
		var i = -1;
		var l = this.children.length;
		while(++i < l) if(this.children[i] == v) return i;
		return -1;
	}
	,setChildIndex: function(v,i) {
		if(v.parent == this && i >= 0 && i <= this.children.length) {
			this.removeChild(v);
			this.addChildAt(v,i);
		}
	}
	,contains: function(v) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			if(o == v) return true;
		}
		return false;
	}
	,broadcastEvent: function(e) {
		this.dispatchEvent(e);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.broadcastEvent(e);
		}
	}
	,broadcastMouse: function(h,e,ms,mc) {
		if(!this.visible) return false;
		var r = false;
		if(this.mouseChildren) {
			var i = this.children.length;
			if(i > 0) {
				h.push(this);
				while(--i >= 0) if(this.children[i].broadcastMouse(h,e,ms,mc)) {
					r = true;
					break;
				}
				h.pop();
			}
		}
		while(ms.length > h.length) mc.push(ms.pop());
		r = r || openfl_display_InteractiveObject.prototype.broadcastMouse.call(this,h,e,ms,mc);
		while(ms.length > h.length) mc.push(ms.pop());
		return r;
	}
	,hitTestLocal: function(x,y,p,v) {
		if(!v || this.visible) {
			var i = this.children.length;
			var m;
			var o;
			if(i > 0) {
				m = openfl_geom_Matrix.create();
				while(--i >= 0) {
					m.identity();
					o = this.children[i];
					o.concatTransform(m);
					m.invert();
					if(o.hitTestLocal(x * m.a + y * m.c + m.tx,x * m.b + y * m.d + m.ty,p,v)) return true;
				}
				openfl_geom_Matrix.pool.push(m);
			}
		}
		return false;
	}
	,set_stage: function(v) {
		openfl_display_InteractiveObject.prototype.set_stage.call(this,v);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var o = _g1[_g];
			++_g;
			o.set_stage(v);
		}
		return v;
	}
	,__class__: openfl_display_DisplayObjectContainer
});
var openfl_display_IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl_display_IBitmapDrawable;
openfl_display_IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl_display_IBitmapDrawable.prototype = {
	__class__: openfl_display_IBitmapDrawable
};
var openfl_display_Sprite = function() {
	openfl_display_DisplayObjectContainer.call(this);
};
$hxClasses["openfl.display.Sprite"] = openfl_display_Sprite;
openfl_display_Sprite.__name__ = ["openfl","display","Sprite"];
openfl_display_Sprite.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Sprite.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Sprite.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	get_graphics: function() {
		if(this._graphics == null) {
			var o = new openfl_display_Graphics();
			var q = o.component;
			o.set_displayObject(this);
			if(this.children.length == 0) this.component.appendChild(q); else this.component.insertBefore(q,this.children[0].component);
			this._graphics = o;
		}
		return this._graphics;
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = openfl_display_DisplayObjectContainer.prototype.set_stage.call(this,v);
		if(z && this._graphics != null) this._graphics.invalidate();
		return r;
	}
	,set_buttonMode: function(o) {
		if(o) this.component.style.cursor = "pointer"; else this.component.style.cursor = null;
		return this.useHandCursor = o;
	}
	,startDrag: function(c,r) {
		if(this.get_stage() != null) this.get_stage().__startDrag(this,c,r);
	}
	,stopDrag: function() {
		if(this.get_stage() != null) this.get_stage().__stopDrag(this);
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.get_graphics().drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,hitTestLocal: function(x,y,p,v) {
		if(openfl_display_DisplayObjectContainer.prototype.hitTestLocal.call(this,x,y,p,v)) return true;
		if(!v || this.visible) {
			var g = this._graphics;
			if(g != null) return g.hitTestLocal(x,y,p);
		}
		return false;
	}
	,__class__: openfl_display_Sprite
});
var Main = function() {
	openfl_display_Sprite.call(this);
	Controls.init();
	Sprites.init();
	openfl_Lib.get_current().get_stage().addChild(new Game());
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = openfl_display_Sprite;
Main.prototype = $extend(openfl_display_Sprite.prototype,{
	__class__: Main
});
var DocumentClass = function() {
	Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	get_stage: function() {
		return openfl_Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var Entity = function() {
	this.setAnim("");
	this.x = this.y = 0;
	this.collRadius = 0;
	this.collList = [];
	this.isDead = false;
};
$hxClasses["Entity"] = Entity;
Entity.__name__ = ["Entity"];
Entity.prototype = {
	setAnim: function(id,randomStart,keepState) {
		if(keepState == null) keepState = false;
		if(randomStart == null) randomStart = false;
		this.spriteID = id;
		this.animDelay = 0;
		this.totalFrames = 1;
		if(!keepState) {
			this.animTick = 0;
			this.frame = 0;
		}
		this.cx = this.cy = 0;
		var sheet = Sprites.getSheet(this.spriteID);
		if(sheet == null) return;
		this.animDelay = sheet.delay;
		if(!keepState) this.animTick = sheet.delay;
		if(randomStart) this.animTick = Std.random(sheet.delay);
		this.totalFrames = sheet.frames;
		this.w = sheet.data.component.width / sheet.frames | 0;
		this.h = sheet.data.component.height | 0;
		this.cx = this.w / 2 | 0;
		this.cy = this.h / 2 | 0;
	}
	,update: function() {
	}
	,postUpdate: function() {
		if(this.totalFrames > 1) {
			if(this.animTick <= 0) {
				this.animTick = this.animDelay;
				this.frame++;
				if(this.frame >= this.totalFrames) this.frame = 0;
			} else this.animTick--;
		}
	}
	,__class__: Entity
};
var Aura = function() {
	Entity.call(this);
	this.setAnim(Sprites.AURA);
	this.collRadius = this.cx;
	this.collType = CollType.AURA;
	this.collList.push(CollType.ENEMY);
};
$hxClasses["Aura"] = Aura;
Aura.__name__ = ["Aura"];
Aura.__super__ = Entity;
Aura.prototype = $extend(Entity.prototype,{
	update: function() {
		Entity.prototype.update.call(this);
		this.x = Game.INST.player.x + Game.INST.player.cx - this.cx;
		this.y = Game.INST.player.y + Game.INST.player.cy - this.cy;
	}
	,__class__: Aura
});
var Controls = function() { };
$hxClasses["Controls"] = Controls;
Controls.__name__ = ["Controls"];
Controls.init = function() {
	Controls.keys = new haxe_ds_IntMap();
	Controls.keys.h[38] = false;
	Controls.keys.h[39] = false;
	Controls.keys.h[40] = false;
	Controls.keys.h[37] = false;
	Controls.keys.h[32] = false;
	openfl_Lib.get_current().get_stage().addEventListener("keydown",Controls.keyDownHandler);
	openfl_Lib.get_current().get_stage().addEventListener("keyup",Controls.keyUpHandler);
};
Controls.isDown = function(k) {
	if(!Controls.keys.h.hasOwnProperty(k)) return false; else return Controls.keys.h[k];
};
Controls.keyDownHandler = function(e) {
	if(!Controls.keys.h.hasOwnProperty(e.keyCode)) return; else Controls.keys.h[e.keyCode] = true;
};
Controls.keyUpHandler = function(e) {
	if(!Controls.keys.h.hasOwnProperty(e.keyCode)) return; else Controls.keys.h[e.keyCode] = false;
};
var openfl_AssetLibrary = function() {
};
$hxClasses["openfl.AssetLibrary"] = openfl_AssetLibrary;
openfl_AssetLibrary.__name__ = ["openfl","AssetLibrary"];
openfl_AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBitmapData: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getText: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getMovieClip: function(id) {
		return null;
	}
	,getMusic: function(id) {
		return this.getSound(id);
	}
	,getPath: function(id) {
		return null;
	}
	,getSound: function(id) {
		return null;
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function(h) {
		h(this);
	}
	,loadBitmapData: function(id,h) {
		h(this.getBitmapData(id));
	}
	,loadBytes: function(id,h) {
		h(this.getBytes(id));
	}
	,loadText: function(id,h) {
		h(this.getText(id));
	}
	,loadFont: function(id,h) {
		h(this.getFont(id));
	}
	,loadMovieClip: function(id,h) {
		h(this.getMovieClip(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,__class__: openfl_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	this.className = new haxe_ds_StringMap();
	openfl_AssetLibrary.call(this);
	this.add("img/aura.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_0.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_0a.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_1.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_2.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_a.png",openfl_AssetType.IMAGE);
	this.add("img/enemy_b.png",openfl_AssetType.IMAGE);
	this.add("img/player.png",openfl_AssetType.IMAGE);
	this.add("img/test.png",openfl_AssetType.IMAGE);
	this.add("img/Untitled-1.psd",openfl_AssetType.BINARY);
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = openfl_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(openfl_AssetLibrary.prototype,{
	add: function(id,t,p) {
		this.type.set(id,t);
		this.path.set(id,p != null?p:id);
	}
	,getPath: function(id) {
		return this.path.get(id);
	}
	,exists: function(id,t) {
		var r = this.type.get(id);
		if(r != null) {
			if(r == t || t == null) return true;
			switch(t[1]) {
			case 5:
				return r == openfl_AssetType.MUSIC;
			case 4:
				return r == openfl_AssetType.SOUND;
			case 0:
				return true;
			default:
				return false;
			}
		}
		return false;
	}
	,getBitmapData: function(id) {
		var q;
		var key = this.path.get(id);
		q = ApplicationMain.loaders.get(key);
		var b = q.contentLoaderInfo.content;
		return b.bitmapData;
	}
	,getFont: function(id) {
		return null;
	}
	,getSound: function(id) {
		return new openfl_media_Sound(new openfl_net_URLRequest(this.path.get(id)));
	}
	,getMusic: function(id) {
		return new openfl_media_Sound(new openfl_net_URLRequest(this.path.get(id)));
	}
	,getBytes: function(id) {
		var r = null;
		var p = this.path.get(id);
		var d = ApplicationMain.urlLoaders.get(p).data;
		if(typeof(d) == "string") (r = new openfl_utils_ByteArray()).writeUTFBytes(d); else if(js_Boot.__instanceof(d,openfl_utils_ByteArray)) r = d; else r = null;
		if(r != null) {
			r.position = 0;
			return r;
		} else return null;
	}
	,getText: function(id) {
		var r = null;
		var p = this.path.get(id);
		var d = ApplicationMain.urlLoaders.get(p).data;
		if(typeof(d) == "string") return d; else if(js_Boot.__instanceof(d,openfl_utils_ByteArray)) {
			r = d;
			r.position = 0;
			return r.readUTFBytes(r.length);
		} else return null;
	}
	,list: function(t) {
		var r = [];
		var $it0 = this.type.keys();
		while( $it0.hasNext() ) {
			var id = $it0.next();
			if(t == null || this.exists(id,t)) r.push(id);
		}
		return r;
	}
	,loadBitmapData: function(id,h) {
		if(this.path.exists(id)) {
			var r = new openfl_display_Loader();
			var f = null;
			f = function(e) {
				r.contentLoaderInfo.removeEventListener("complete",f);
				var b = e.get_currentTarget().content;
				h(b.bitmapData);
				b = null;
				f = null;
				r = null;
			};
			r.addEventListener("complete",f);
			r.load(new openfl_net_URLRequest(this.path.get(id)));
		} else h(this.getBitmapData(id));
	}
	,loadFont: function(id,h) {
		h(this.getFont(id));
	}
	,loadSound: function(id,h) {
		h(this.getSound(id));
	}
	,loadMusic: function(id,h) {
		h(this.getMusic(id));
	}
	,loadBytes: function(id,h) {
		if(this.path.exists(id)) {
			var r = new openfl_net_URLLoader();
			var f = null;
			f = function(e) {
				r.removeEventListener("complete",f);
				var b = new openfl_utils_ByteArray();
				b.writeUTFBytes(e.get_currentTarget().data);
				b.position = 0;
				h(b);
				b = null;
				f = null;
				r = null;
			};
			r.addEventListener("complete",f);
		} else h(this.getBytes(id));
	}
	,loadText: function(id,h) {
		if(this.path.exists(id)) {
			var r = new openfl_net_URLLoader();
			var f = null;
			f = function(e) {
				r.removeEventListener("complete",f);
				h(e.get_currentTarget().data);
				f = null;
				r = null;
			};
			r.addEventListener("complete",f);
		} else h(this.getText(id));
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var MovingEntity = function() {
	Entity.call(this);
	this.friction = 1;
	this.xVelMax = 100;
	this.yVelMax = 100;
	this.velMax = -1;
	this.xVel = this.yVel = 0;
	this.currentMove = Move.DEFAULT;
};
$hxClasses["MovingEntity"] = MovingEntity;
MovingEntity.__name__ = ["MovingEntity"];
MovingEntity.__super__ = Entity;
MovingEntity.prototype = $extend(Entity.prototype,{
	update: function() {
		Entity.prototype.update.call(this);
		this.move();
		this.xVel = Math.max(Math.min(this.xVel * this.friction,this.xVelMax),-this.xVelMax);
		if(Math.abs(this.xVel) < 0.01) this.xVel = 0;
		this.x += this.xVel;
		this.yVel = Math.max(Math.min(this.yVel * this.friction,this.yVelMax),-this.yVelMax);
		if(Math.abs(this.yVel) < 0.01) this.yVel = 0;
		this.y += this.yVel;
	}
	,move: function() {
		var _g = this.currentMove;
		switch(_g[1]) {
		case 0:
			if(Controls.isDown(39)) this.xVel += this.xVelMax * 0.2;
			if(Controls.isDown(37)) this.xVel -= this.xVelMax * 0.2;
			if(Controls.isDown(38)) this.yVel -= this.yVelMax * 0.2;
			if(Controls.isDown(40)) this.yVel += this.yVelMax * 0.2;
			break;
		case 1:
			this.xVel = this.yVel = 0;
			break;
		default:
		}
	}
	,__class__: MovingEntity
});
var Enemy = function() {
	this.sizes = [Sprites.SIZE_A,Sprites.SIZE_B,Sprites.SIZE_C];
	MovingEntity.call(this);
	this.currentSize = 0;
	this.setAnim(this.sizes[this.currentSize]);
	this.collRadius = this.cx;
	this.collType = CollType.ENEMY;
	this.collList.push(CollType.AURA);
	this.collList.push(CollType.PLAYER);
	this.velMax = Std.random(2) * 2 - 1;
	this.velMax *= (Std.random(10) + 10) / 10;
	var angle = Math.random() * 6.28;
	this.xVel = this.velMax * Math.cos(angle);
	this.yVel = this.velMax * Math.sin(angle);
	this.growTick = this.growDelay = 120;
	this.isInAura = false;
};
$hxClasses["Enemy"] = Enemy;
Enemy.__name__ = ["Enemy"];
Enemy.__super__ = MovingEntity;
Enemy.prototype = $extend(MovingEntity.prototype,{
	update: function() {
		MovingEntity.prototype.update.call(this);
		this.isInAura = false;
		if(this.x + this.cx > Game.WIDTH || this.x + this.cx < 0) this.xVel = -this.xVel;
		if(this.y + this.cy > Game.HEIGHT || this.y + this.cy < 0) this.yVel = -this.yVel;
	}
	,postUpdate: function() {
		MovingEntity.prototype.postUpdate.call(this);
		if(this.isInAura) this.shrink(); else this.grow();
	}
	,grow: function() {
		if(this.growTick > 0) {
			this.growTick--;
			if(this.growTick == 0 && this.currentSize < this.sizes.length - 1) {
				this.currentSize++;
				this.setAnim(this.sizes[this.currentSize]);
				this.collRadius = this.cx;
				this.growTick = this.growDelay;
			}
		}
	}
	,shrink: function() {
		if(this.growTick <= this.growDelay) {
			this.growTick += 2;
			if(this.growTick >= this.growDelay) {
				if(this.currentSize > 0) {
					this.currentSize--;
					this.setAnim(this.sizes[this.currentSize]);
					this.collRadius = this.cx;
					this.growTick = 0;
				} else this.die();
			}
		}
	}
	,die: function() {
		this.isDead = true;
	}
	,__class__: Enemy
});
var CollType = $hxClasses["CollType"] = { __ename__ : true, __constructs__ : ["PLAYER","AURA","ENEMY"] };
CollType.PLAYER = ["PLAYER",0];
CollType.PLAYER.toString = $estr;
CollType.PLAYER.__enum__ = CollType;
CollType.AURA = ["AURA",1];
CollType.AURA.toString = $estr;
CollType.AURA.__enum__ = CollType;
CollType.ENEMY = ["ENEMY",2];
CollType.ENEMY.toString = $estr;
CollType.ENEMY.__enum__ = CollType;
var openfl_geom_Point = function(u,v) {
	this.x = u != null?u:0;
	this.y = v != null?v:0;
};
$hxClasses["openfl.geom.Point"] = openfl_geom_Point;
openfl_geom_Point.__name__ = ["openfl","geom","Point"];
openfl_geom_Point.interpolate = function(a,b,f) {
	return new openfl_geom_Point(a.x + f * (b.x - a.x),a.y + f * (b.y - a.y));
};
openfl_geom_Point.polar = function(l,d) {
	return new openfl_geom_Point(Math.cos(d) * l,Math.sin(d) * l);
};
openfl_geom_Point.prototype = {
	clone: function() {
		return new openfl_geom_Point(this.x,this.y);
	}
	,equals: function(o) {
		return this.x == o.x && this.y == o.y;
	}
	,setTo: function(u,v) {
		this.x = u;
		this.y = v;
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,toString: function() {
		return "point(" + this.x + ", " + this.y + ")";
	}
	,normalize: function(l) {
		if(this.y == 0) if(this.x < 0) this.x = -l; else this.x = l; else if(this.x == 0) if(this.y < 0) this.y = -l; else this.y = l; else {
			var m = l / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= m;
			this.y *= m;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,add: function(o) {
		return new openfl_geom_Point(this.x + o.x,this.y + o.y);
	}
	,subtract: function(o) {
		return new openfl_geom_Point(this.x - o.x,this.y - o.y);
	}
	,__class__: openfl_geom_Point
};
var openfl_geom_Rectangle = function(a,b,c,d) {
	if(d == null) d = 0;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 0;
	this.x = a;
	this.y = b;
	this.width = c;
	this.height = d;
};
$hxClasses["openfl.geom.Rectangle"] = openfl_geom_Rectangle;
openfl_geom_Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl_geom_Rectangle.prototype = {
	clone: function() {
		return new openfl_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,equals: function(o) {
		return this.x == o.x && this.y == o.y && this.width == o.width && this.height == o.height;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,copyFrom: function(o) {
		this.x = o.x;
		this.y = o.y;
		this.width = o.width;
		this.height = o.height;
	}
	,setTo: function(a,b,c,d) {
		this.x = a;
		this.y = b;
		this.width = c;
		this.height = d;
	}
	,setVoid: function() {
		this.width -= 2147483647 - this.x;
		this.x = 2147483647;
		this.width = -2147483648 - this.x;
		-2147483648;
		this.height -= 2147483647 - this.y;
		this.y = 2147483647;
		this.height = -2147483648 - this.y;
		-2147483648;
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(v) {
		this.width -= v - this.x;
		return this.x = v;
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(v) {
		this.height -= v - this.y;
		return this.y = v;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(v) {
		this.width = v - this.x;
		return v;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(v) {
		this.height = v - this.y;
		return v;
	}
	,get_size: function() {
		return new openfl_geom_Point(this.width,this.height);
	}
	,set_size: function(v) {
		this.width = v.x;
		this.height = v.y;
		return v.clone();
	}
	,get_topLeft: function() {
		return new openfl_geom_Point(this.x,this.y);
	}
	,set_topLeft: function(v) {
		this.width = v.x;
		this.height = v.y;
		return v.clone();
	}
	,get_bottomRight: function() {
		return new openfl_geom_Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(v) {
		this.width = v.x - this.x;
		this.height = v.y - this.y;
		return v.clone();
	}
	,contains: function(u,v) {
		return (u -= this.x) >= 0 && (v -= this.y) >= 0 && u < this.width && v < this.height;
	}
	,containsPoint: function(o) {
		return this.contains(o.x,o.y);
	}
	,containsRect: function(o) {
		if(o.width <= 0 || o.height <= 0) return o.x > this.x && o.y > this.y && o.x + o.width < this.x + this.width && o.y + o.height < this.y + this.height; else return o.x >= this.x && o.y >= this.y && o.x + o.width <= this.x + this.width && o.y + o.height <= this.y + this.height;
	}
	,intersection: function(o) {
		var x0;
		var x1;
		var y0;
		var y1;
		var a;
		var b;
		if(((a = this.x) < (b = o.x)?x0 = b:x0 = a) <= ((a += this.width) > (b += o.width)?x1 = b:x1 = a) && ((a = this.y) < (b = o.y)?y0 = b:y0 = a) <= ((a += this.height) > (b += o.height)?y1 = b:y1 = a)) return new openfl_geom_Rectangle(x0,y0,x1 - x0,y1 - y0); else return new openfl_geom_Rectangle();
	}
	,intersects: function(o) {
		var x0;
		var x1;
		var y0;
		var y1;
		if((this.x < (x0 = o.x)?x0 = x0:x0 = this.x) <= (this.x + this.width > (x1 = o.x + o.width)?x1 = x1:x1 = this.x + this.width)) return false; else return (this.y < (y0 = o.y)?y0 = y0:y0 = this.y) <= (this.y + this.height > (y1 = o.y + o.height)?y1 = y1:y1 = this.y);
	}
	,join: function(o) {
		var v;
		if((v = o.x - this.x) < 0) {
			this.x += v;
			this.width -= v;
		}
		if((v = o.y - this.y) < 0) {
			this.y += v;
			this.height -= v;
		}
		if((v = o.x + o.width - (this.x + this.width)) > 0) this.width += v;
		if((v = o.y + o.height - (this.y + this.height)) > 0) this.height += v;
	}
	,union: function(o) {
		var a;
		var b;
		var c;
		var d;
		return new openfl_geom_Rectangle((a = this.x) < (c = o.x)?a:c,(b = this.y) < (d = o.y)?b:d,(a += this.width) > (c += o.width)?a:c,(b += this.height) > (d += o.height)?b:d);
	}
	,inflate: function(u,v) {
		this.x -= u;
		this.y -= v;
		this.width += u * 2;
		this.height += v * 2;
	}
	,inflatePoint: function(v) {
		this.inflate(v.x,v.y);
	}
	,offset: function(u,v) {
		this.x += u;
		this.y += v;
	}
	,offsetPoint: function(o) {
		this.x += o.x;
		this.y += o.y;
	}
	,transform: function(m) {
		var v;
		var l;
		var t;
		var r;
		var b;
		r = l = m.a * this.x + m.c * this.y;
		b = t = m.b * this.x + m.d * this.y;
		v = m.a * (this.x + this.width) + m.c * this.y;
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * (this.x + this.width) + m.d * this.y;
		if(v < t) t = v;
		if(v > b) b = v;
		v = m.a * this.x + m.c * (this.y + this.height);
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * this.x + m.d * (this.y + this.height);
		if(v < t) t = v;
		if(v > b) b = v;
		v = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		if(v < l) l = v;
		if(v > r) r = v;
		v = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(v < t) t = v;
		if(v > b) b = v;
		this.x = l + m.tx;
		this.width = r - l;
		this.y = t + m.ty;
		this.height = b - t;
	}
	,toString: function() {
		return "Rectangle(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")";
	}
	,__class__: openfl_geom_Rectangle
};
var Game = function() {
	if(Game.INST != null) throw new js__$Boot_HaxeError(new openfl_errors_Error("Game already instanciated!")); else Game.INST = this;
	openfl_display_Sprite.call(this);
	this.reset();
	this.addEventListener("enterFrame",$bind(this,this.update));
};
$hxClasses["Game"] = Game;
Game.__name__ = ["Game"];
Game.__super__ = openfl_display_Sprite;
Game.prototype = $extend(openfl_display_Sprite.prototype,{
	reset: function() {
		this.canvasData = new openfl_display_BitmapData(Game.WIDTH,Game.HEIGHT,false);
		this.canvas = new openfl_display_Bitmap(this.canvasData);
		this.canvas.set_x(this.canvas.set_y(0));
		this.addChild(this.canvas);
		this.entities = [];
		this.spawnTick = this.spawnDelay = 120;
		this.hasGameStarted = this.hasGameEnded = false;
		if(this.player == null) this.player = new Player();
		HxOverrides.remove(this.entities,this.player);
		this.entities.push(this.player);
		this.player.x = Game.WIDTH / 2;
		this.player.y = Game.HEIGHT / 2;
		this.player.currentMove = Move.CONTROLLED;
	}
	,startGame: function() {
		if(this.aura == null) this.aura = new Aura();
		this.aura.x = this.player.x;
		this.aura.y = this.player.y;
		HxOverrides.remove(this.entities,this.aura);
		this.entities.push(this.aura);
		this.hasGameStarted = true;
	}
	,update: function(e) {
		if(this.hasGameStarted && !this.hasGameEnded) {
			this.spawnTick--;
			if(this.spawnTick == 0) {
				this.spawnEnemy();
				this.spawnTick = this.spawnDelay;
			}
		} else if(!this.hasGameStarted) {
			if(Controls.isDown(32)) this.startGame();
		} else if(this.hasGameEnded) {
			if(Controls.isDown(32)) this.reset();
		}
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var e1 = _g1[_g];
			++_g;
			e1.update();
		}
		this.checkCollisions();
		this.entities = this.entities.filter($bind(this,this.filterDead));
		var _g2 = 0;
		var _g11 = this.entities;
		while(_g2 < _g11.length) {
			var e2 = _g11[_g2];
			++_g2;
			e2.postUpdate();
		}
		this.render();
	}
	,spawnEnemy: function(playerOnTop) {
		if(playerOnTop == null) playerOnTop = true;
		var e = new Enemy();
		e.x = Std.random(Game.WIDTH - 2 * e.cx);
		e.y = Std.random(Game.HEIGHT - 2 * e.cy);
		this.entities.push(e);
		if(playerOnTop) {
			HxOverrides.remove(this.entities,this.player);
			this.entities.push(this.player);
		}
	}
	,filterDead: function(e) {
		return !e.isDead;
	}
	,checkCollisions: function() {
		var _g1 = 0;
		var _g = this.entities.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ea = this.entities[i];
			if(ea.isDead) continue;
			var _g3 = i + 1;
			var _g2 = this.entities.length;
			while(_g3 < _g2) {
				var j = _g3++;
				var eb = this.entities[j];
				if(eb.isDead) continue;
				if(HxOverrides.indexOf(ea.collList,eb.collType,0) == -1) continue;
				var dist = this.getDistance(ea,eb);
				if(dist < ea.collRadius + eb.collRadius) this.resolveCollision(ea,eb,dist);
			}
		}
	}
	,resolveCollision: function(ea,eb,dist) {
		if(js_Boot.__instanceof(ea,Aura) && js_Boot.__instanceof(eb,Enemy)) (js_Boot.__cast(eb , Enemy)).isInAura = true; else if(js_Boot.__instanceof(ea,Enemy) && js_Boot.__instanceof(eb,Aura)) (js_Boot.__cast(ea , Enemy)).isInAura = true; else if(js_Boot.__instanceof(ea,Player) || js_Boot.__instanceof(eb,Player)) this.endGame();
	}
	,getDistance: function(ea,eb) {
		var dx = eb.x + eb.cx - (ea.x + ea.cx);
		var dy = eb.y + eb.cy - (ea.y + ea.cy);
		return Math.sqrt(dx * dx + dy * dy);
	}
	,render: function() {
		this.canvasData.fillRect(this.canvasData.__rect.clone(),-15658721);
		var _g = 0;
		var _g1 = this.entities;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			Sprites.draw(this.canvasData,e.spriteID,e.x,e.y,e.frame);
		}
	}
	,endGame: function() {
		this.hasGameEnded = true;
		this.player.currentMove = Move.STATIC;
		this.player.xVel = this.player.yVel = 0;
		HxOverrides.remove(this.entities,this.player);
		HxOverrides.remove(this.entities,this.aura);
	}
	,__class__: Game
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
Math.__name__ = ["Math"];
var Move = $hxClasses["Move"] = { __ename__ : true, __constructs__ : ["CONTROLLED","STATIC","DEFAULT"] };
Move.CONTROLLED = ["CONTROLLED",0];
Move.CONTROLLED.toString = $estr;
Move.CONTROLLED.__enum__ = Move;
Move.STATIC = ["STATIC",1];
Move.STATIC.toString = $estr;
Move.STATIC.__enum__ = Move;
Move.DEFAULT = ["DEFAULT",2];
Move.DEFAULT.toString = $estr;
Move.DEFAULT.__enum__ = Move;
var NMEPreloader = function() {
	openfl_display_Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 7;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 2;
	this.outline = new openfl_display_Sprite();
	this.outline.get_graphics().beginFill(color,0.07);
	this.outline.get_graphics().drawRect(0,0,width,height);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl_display_Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl_display_Sprite;
NMEPreloader.prototype = $extend(openfl_display_Sprite.prototype,{
	getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 640;
		if(height > 0) return height; else return openfl_Lib.get_current().get_stage().get_stageHeight();
	}
	,getWidth: function() {
		var width = 640;
		if(width > 0) return width; else return openfl_Lib.get_current().get_stage().get_stageWidth();
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl_events_Event("complete"));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Player = function() {
	MovingEntity.call(this);
	this.setAnim(Sprites.PLAYER);
	this.collRadius = this.cx;
	this.collType = CollType.PLAYER;
	this.collList.push(CollType.ENEMY);
	this.friction = 0.85;
	this.xVelMax = 3;
	this.yVelMax = 3;
	this.currentMove = Move.CONTROLLED;
};
$hxClasses["Player"] = Player;
Player.__name__ = ["Player"];
Player.__super__ = MovingEntity;
Player.prototype = $extend(MovingEntity.prototype,{
	update: function() {
		MovingEntity.prototype.update.call(this);
		if(this.x < 10) this.x = 10; else if(this.x + 2 * this.cx - 10 > Game.WIDTH) this.x = Game.WIDTH - 2 * this.cx + 10;
		if(this.y + 2 * this.cy - 10 > Game.HEIGHT) this.y = Game.HEIGHT - 2 * this.cy + 10; else if(this.y < 10) this.y = 10;
	}
	,__class__: Player
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Sprites = function() { };
$hxClasses["Sprites"] = Sprites;
Sprites.__name__ = ["Sprites"];
Sprites.init = function() {
	Sprites.sprites = new haxe_ds_StringMap();
	var value = { data : openfl_Assets.getBitmapData("img/player.png"), frames : 1, delay : 0};
	Sprites.sprites.set(Sprites.PLAYER,value);
	var value1 = { data : openfl_Assets.getBitmapData("img/aura.png"), frames : 1, delay : 0};
	Sprites.sprites.set(Sprites.AURA,value1);
	var value2 = { data : openfl_Assets.getBitmapData("img/enemy_0.png"), frames : 4, delay : 4};
	Sprites.sprites.set(Sprites.SIZE_A,value2);
	var value3 = { data : openfl_Assets.getBitmapData("img/enemy_1.png"), frames : 3, delay : 6};
	Sprites.sprites.set(Sprites.SIZE_B,value3);
	var value4 = { data : openfl_Assets.getBitmapData("img/enemy_2.png"), frames : 4, delay : 8};
	Sprites.sprites.set(Sprites.SIZE_C,value4);
};
Sprites.getSheet = function(id) {
	if(Sprites.sprites == null || !Sprites.sprites.exists(id)) return null;
	return Sprites.sprites.get(id);
};
Sprites.draw = function(c,id,x,y,frame) {
	if(frame == null) frame = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(Sprites.sprites == null || !Sprites.sprites.exists(id)) return;
	var sheet = Sprites.sprites.get(id);
	var data = sheet.data;
	Game.TAR.width = data.component.width / sheet.frames;
	Game.TAR.height = data.component.height;
	Game.TAR.x = frame * Game.TAR.width;
	Game.TAR.y = 0;
	Game.TAP.x = Math.round(x);
	Game.TAP.y = Math.round(y);
	c.copyPixels(data,Game.TAR,Game.TAP);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
var haxe_StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
$hxClasses["haxe.CallStack"] = haxe_CallStack;
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = ["haxe","Resource"];
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var t0 = haxe_Timer.stamp();
	var r = f();
	haxe_Log.trace(haxe_Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var openfl_AssetCache = function() {
	this.__enabled = true;
	this.bitmapData = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.sound = new haxe_ds_StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl_AssetCache;
openfl_AssetCache.__name__ = ["openfl","AssetCache"];
openfl_AssetCache.prototype = {
	get_enabled: function() {
		return this.__enabled;
	}
	,set_enabled: function(v) {
		return this.__enabled = v;
	}
	,clear: function(prefix) {
		if(prefix == null) {
			this.bitmapData = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.sound = new haxe_ds_StringMap();
		} else {
			var $it0 = this.bitmapData.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				if(StringTools.startsWith(key,prefix)) this.bitmapData.remove(key);
			}
			var $it1 = this.font.keys();
			while( $it1.hasNext() ) {
				var key1 = $it1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var $it2 = this.sound.keys();
			while( $it2.hasNext() ) {
				var key2 = $it2.next();
				if(StringTools.startsWith(key2,prefix)) this.sound.remove(key2);
			}
		}
	}
	,getBitmapData: function(id) {
		return this.bitmapData.get(id);
	}
	,getFont: function(id) {
		return this.font.get(id);
	}
	,getSound: function(id) {
		return this.sound.get(id);
	}
	,hasBitmapData: function(id) {
		return this.bitmapData.exists(id);
	}
	,hasFont: function(id) {
		return this.font.exists(id);
	}
	,hasSound: function(id) {
		return this.sound.exists(id);
	}
	,removeBitmapData: function(id) {
		return this.bitmapData.remove(id);
	}
	,removeFont: function(id) {
		return this.font.remove(id);
	}
	,removeSound: function(id) {
		return this.sound.remove(id);
	}
	,setBitmapData: function(id,v) {
		this.bitmapData.set(id,v);
	}
	,setFont: function(id,v) {
		this.font.set(id,v);
	}
	,setSound: function(id,v) {
		this.sound.set(id,v);
	}
	,__class__: openfl_AssetCache
};
var openfl_Assets = function() { };
$hxClasses["openfl.Assets"] = openfl_Assets;
openfl_Assets.__name__ = ["openfl","Assets"];
openfl_Assets.exists = function(id,type) {
	openfl_Assets.initialize();
	var r = false;
	if(type == null) type = openfl_AssetType.BINARY;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) r = lr != null && lr.exists(sn,type); else null;
	return r;
};
openfl_Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = null;
	var c;
	var b;
	if(useCache && (c = openfl_Assets.cache).get_enabled() && c.bitmapData.exists(id) && openfl_Assets.isValidBitmapData(b = openfl_Assets.cache.bitmapData.get(id))) return b;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.IMAGE)) {
			r = lr.getBitmapData(sn);
			if(useCache) {
				if(c.get_enabled()) c.bitmapData.set(id,r);
			} else r = r.clone();
		} else null;
	} else null;
	return r;
};
openfl_Assets.getBytes = function(id) {
	openfl_Assets.initialize();
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.BINARY)) {
			if(lr.isLocal(sn,openfl_AssetType.BINARY)) r = lr.getBytes(sn); else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = null;
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.font.exists(id)) return openfl_Assets.cache.font.get(id);
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.FONT)) {
			if(lr.isLocal(sn,openfl_AssetType.FONT)) {
				r = lr.getFont(sn);
				if(useCache && openfl_Assets.cache.get_enabled()) openfl_Assets.cache.font.set(id,r);
			} else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.getLibrary = function(name) {
	return openfl_Assets.libraries.get(name == null || name == ""?"default":name);
};
openfl_Assets.getMovieClip = function(id) {
	openfl_Assets.initialize();
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.MOVIE_CLIP)) {
			if(lr.isLocal(sn,openfl_AssetType.MOVIE_CLIP)) r = lr.getMovieClip(sn); else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.getMusic = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = null;
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.sound.exists(id)) {
		var s = openfl_Assets.cache.sound.get(id);
		return s;
	}
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.MUSIC)) {
			if(lr.isLocal(sn,openfl_AssetType.MUSIC)) {
				r = lr.getMusic(sn);
				if(useCache && openfl_Assets.cache.get_enabled()) openfl_Assets.cache.sound.set(id,r);
			} else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.getPath = function(id) {
	openfl_Assets.initialize();
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,null)) r = lr.getPath(sn); else null;
	} else null;
	return r;
};
openfl_Assets.getSound = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = null;
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.sound.exists(id)) {
		var s = openfl_Assets.cache.sound.get(id);
		return s;
	}
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.SOUND)) {
			if(lr.isLocal(sn,openfl_AssetType.SOUND)) {
				r = lr.getMusic(sn);
				if(useCache && openfl_Assets.cache.get_enabled()) openfl_Assets.cache.sound.set(id,r);
			} else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.getText = function(id) {
	openfl_Assets.initialize();
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(lr.exists(sn,openfl_AssetType.TEXT)) {
			if(lr.isLocal(sn,openfl_AssetType.TEXT)) r = lr.getText(sn); else null;
		} else null;
	} else null;
	return r;
};
openfl_Assets.initialize = function() {
	if(!openfl_Assets.initialized) {
		openfl_Assets.registerLibrary("default",new DefaultAssetLibrary());
		openfl_Assets.initialized = true;
	}
};
openfl_Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	var r = false;
	if(useCache && openfl_Assets.cache.get_enabled()) {
		if(type == openfl_AssetType.IMAGE || type == null) {
			if(openfl_Assets.cache.bitmapData.exists(id)) return true;
		}
		if(type == openfl_AssetType.FONT || type == null) {
			if(openfl_Assets.cache.font.exists(id)) return true;
		}
		if(type == openfl_AssetType.SOUND || type == openfl_AssetType.MUSIC || type == null) {
			if(openfl_Assets.cache.sound.exists(id)) return true;
		}
	}
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) r = lr.isLocal(sn,type); else null;
	return r;
};
openfl_Assets.isValidBitmapData = function(bitmapData) {
	return true;
};
openfl_Assets.isValidSound = function(sound) {
	return true;
};
openfl_Assets.list = function(type) {
	openfl_Assets.initialize();
	var r = [];
	var $it0 = openfl_Assets.libraries.iterator();
	while( $it0.hasNext() ) {
		var o = $it0.next();
		var m = o.list(type);
		if(m != null) r = r.concat(m);
	}
	return r;
};
openfl_Assets.loadBitmapData = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.bitmapData.exists(id)) {
		var b = openfl_Assets.cache.bitmapData.get(id);
		handler(b);
		return;
	}
	var r = null;
	var sn2 = null;
	var lr2 = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.IMAGE)) {
			sn2 = sn;
			lr2 = lr;
		}
	} else null;
	if(r != null) {
		if(r) {
			if(useCache && openfl_Assets.cache.get_enabled()) lr2.loadBitmapData(sn2,function(b1) {
				openfl_Assets.cache.bitmapData.set(id,b1);
				handler(b1);
			}); else lr2.loadBitmapData(sn2,handler);
			return;
		} else null;
	}
	handler(null);
};
openfl_Assets.loadBytes = function(id,handler) {
	openfl_Assets.initialize();
	var r = false;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.BINARY)) lr.loadBytes(sn,handler); else null;
	} else null;
	if(r) return;
	handler(null);
};
openfl_Assets.loadFont = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.font.exists(id)) {
		handler(openfl_Assets.cache.font.get(id));
		return;
	}
	var lr2 = null;
	var sn2 = null;
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.FONT)) {
			lr2 = lr;
			sn2 = sn;
		}
	} else null;
	if(r != null) {
		if(r) {
			if(useCache && openfl_Assets.cache.get_enabled()) lr2.loadFont(sn2,function(o) {
				openfl_Assets.cache.font.set(id,o);
				handler(o);
			}); else lr2.loadFont(sn2,handler);
			return;
		} else null;
	}
	handler(null);
};
openfl_Assets.loadLibrary = function(name,handler) {
	openfl_Assets.initialize();
	var data = openfl_Assets.getText("libraries/" + name + ".dat");
	if(data != null && data != "") {
		var unserializer = new haxe_Unserializer(data);
		unserializer.setResolver({ resolveEnum : openfl_Assets.resolveEnum, resolveClass : openfl_Assets.resolveClass});
		var library = unserializer.unserialize();
		openfl_Assets.libraries.set(name,library);
		library.load(handler);
	} else null;
};
openfl_Assets.loadMusic = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.sound.exists(id)) {
		var sound = openfl_Assets.cache.sound.get(id);
		handler(sound);
		return;
	}
	var lr2 = null;
	var sn2 = null;
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.MUSIC)) {
			lr2 = lr;
			sn2 = sn;
		}
	} else null;
	if(r != null) {
		if(r) {
			if(useCache && openfl_Assets.cache.get_enabled()) lr2.loadMusic(sn2,function(s) {
				openfl_Assets.cache.sound.set(id,s);
				handler(s);
			}); else lr2.loadMusic(sn2,handler);
			return;
		} else null;
	}
	handler(null);
};
openfl_Assets.loadMovieClip = function(id,handler) {
	openfl_Assets.initialize();
	var r = false;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.MOVIE_CLIP)) lr.loadMovieClip(sn,handler); else null;
	} else null;
	if(r) return;
	handler(null);
};
openfl_Assets.loadSound = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl_Assets.initialize();
	if(useCache && openfl_Assets.cache.get_enabled() && openfl_Assets.cache.sound.exists(id)) {
		var sound = openfl_Assets.cache.sound.get(id);
		handler(sound);
		return;
	}
	var lr2 = null;
	var sn2 = null;
	var r = null;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.SOUND)) {
			lr2 = lr;
			sn2 = sn;
		}
	} else null;
	if(r != null) {
		if(r) {
			if(useCache && openfl_Assets.cache.get_enabled()) lr2.loadSound(sn2,function(s) {
				openfl_Assets.cache.sound.set(id,s);
				handler(s);
			}); else lr2.loadSound(sn2,handler);
			return;
		} else null;
	}
	handler(null);
};
openfl_Assets.loadText = function(id,handler) {
	openfl_Assets.initialize();
	var r = false;
	var i = id.indexOf(":");
	var ln = id.substring(0,i);
	var sn = id.substring(i + 1);
	var lr = openfl_Assets.getLibrary(ln);
	if(lr != null) {
		if(r = lr.exists(sn,openfl_AssetType.TEXT)) lr.loadText(sn,handler); else null;
	} else null;
	if(r) return;
	handler(null);
};
openfl_Assets.registerLibrary = function(name,library) {
	if(openfl_Assets.libraries.exists(name)) openfl_Assets.unloadLibrary(name);
	openfl_Assets.libraries.set(name,library);
};
openfl_Assets.resolveClass = function(name) {
	return Type.resolveClass(name);
};
openfl_Assets.resolveEnum = function(name) {
	var value = Type.resolveEnum(name);
	return value;
};
openfl_Assets.unloadLibrary = function(name) {
	openfl_Assets.initialize();
	var $it0 = openfl_Assets.cache.bitmapData.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		if(key.substring(0,key.indexOf(":")) == name) openfl_Assets.cache.bitmapData.remove(key);
	}
	openfl_Assets.libraries.remove(name);
};
var openfl_AssetData = function() {
};
$hxClasses["openfl.AssetData"] = openfl_AssetData;
openfl_AssetData.__name__ = ["openfl","AssetData"];
openfl_AssetData.prototype = {
	__class__: openfl_AssetData
};
var openfl_AssetType = $hxClasses["openfl.AssetType"] = { __ename__ : true, __constructs__ : ["BINARY","FONT","IMAGE","MOVIE_CLIP","MUSIC","SOUND","TEMPLATE","TEXT"] };
openfl_AssetType.BINARY = ["BINARY",0];
openfl_AssetType.BINARY.toString = $estr;
openfl_AssetType.BINARY.__enum__ = openfl_AssetType;
openfl_AssetType.FONT = ["FONT",1];
openfl_AssetType.FONT.toString = $estr;
openfl_AssetType.FONT.__enum__ = openfl_AssetType;
openfl_AssetType.IMAGE = ["IMAGE",2];
openfl_AssetType.IMAGE.toString = $estr;
openfl_AssetType.IMAGE.__enum__ = openfl_AssetType;
openfl_AssetType.MOVIE_CLIP = ["MOVIE_CLIP",3];
openfl_AssetType.MOVIE_CLIP.toString = $estr;
openfl_AssetType.MOVIE_CLIP.__enum__ = openfl_AssetType;
openfl_AssetType.MUSIC = ["MUSIC",4];
openfl_AssetType.MUSIC.toString = $estr;
openfl_AssetType.MUSIC.__enum__ = openfl_AssetType;
openfl_AssetType.SOUND = ["SOUND",5];
openfl_AssetType.SOUND.toString = $estr;
openfl_AssetType.SOUND.__enum__ = openfl_AssetType;
openfl_AssetType.TEMPLATE = ["TEMPLATE",6];
openfl_AssetType.TEMPLATE.toString = $estr;
openfl_AssetType.TEMPLATE.__enum__ = openfl_AssetType;
openfl_AssetType.TEXT = ["TEXT",7];
openfl_AssetType.TEXT.toString = $estr;
openfl_AssetType.TEXT.__enum__ = openfl_AssetType;
var openfl_display_Stage = function() {
	this.intervalHandle = null;
	this.touchCount = 0;
	this.isTouchScreen = false;
	this.frameRate = null;
	openfl_display_DisplayObjectContainer.call(this);
	var s = this.component.style;
	var o = window;
	var i;
	s.position = "absolute";
	s.overflow = "hidden";
	s.left = s.top = "0";
	s.width = s.height = "100%";
	this.mousePos = new openfl_geom_Point();
	o.addEventListener("contextmenu",function(_) {
		_.preventDefault();
	});
	o.addEventListener("click",$bind(this,this.onMouse));
	o.addEventListener("mousedown",$bind(this,this.onMouse));
	o.addEventListener("mouseup",$bind(this,this.onMouse));
	o.addEventListener("mousemove",$bind(this,this.onMouse));
	o.addEventListener("mousewheel",$bind(this,this.onWheel));
	o.addEventListener("DOMMouseScroll",$bind(this,this.onWheel));
	o.addEventListener("touchmove",this.getOnTouch(0));
	o.addEventListener("touchstart",this.getOnTouch(1));
	o.addEventListener("touchend",this.getOnTouch(2));
	o.addEventListener("touchcancel",this.getOnTouch(2));
	this.mouseMtxDepth = [];
	this.mouseMtxStack = [];
	this.mouseMtxCache = [];
	this.mouseTriggered = [];
	this.mouseUntrigger = [];
	i = -1;
	while(++i < 3) {
		this.mouseTriggered[i] = false;
		this.mouseUntrigger[i] = this.getMouseUntrigger(i);
	}
};
$hxClasses["openfl.display.Stage"] = openfl_display_Stage;
openfl_display_Stage.__name__ = ["openfl","display","Stage"];
openfl_display_Stage.__super__ = openfl_display_DisplayObjectContainer;
openfl_display_Stage.prototype = $extend(openfl_display_DisplayObjectContainer.prototype,{
	_broadcastMouseEvent: function(f) {
		var o = this.mouseOver;
		var q;
		f.stageX = this.mousePos.x;
		f.stageY = this.mousePos.y;
		this.broadcastMouse(this.mouseMtxDepth,f,this.mouseMtxStack,this.mouseMtxCache);
		this.mouseOver = q = f.relatedObject;
		if(o != q) {
			if(o != null) o.dispatchEvent(this._alterMouseEvent(f,"mouseOut"));
			if(q != null) q.dispatchEvent(this._alterMouseEvent(f,"mouseOver"));
		}
	}
	,_broadcastTouchEvent: function(f,x,y) {
		f.stageX = x;
		f.stageY = y;
		this.broadcastMouse(this.mouseMtxDepth,f,this.mouseMtxStack,this.mouseMtxCache);
	}
	,getMouseUntrigger: function(i) {
		var _g = this;
		return function() {
			_g.mouseTriggered[i] = false;
		};
	}
	,_alterMouseEvent: function(e,type) {
		var r = new openfl_events_MouseEvent(type,e.bubbles,e.cancelable,e.localX,e.localY,e.relatedObject,e.ctrlKey,e.altKey,e.shiftKey,e.buttonDown,e.delta);
		r.stageX = e.stageX;
		r.stageY = e.stageY;
		return r;
	}
	,_translateMouseEvent: function(e,type) {
		return new openfl_events_MouseEvent(type,true,false,null,null,null,e.ctrlKey,e.altKey,e.shiftKey);
	}
	,_translateTouchEvent: function(e,o,type) {
		var r = new openfl_events_TouchEvent(type,true,false,o.identifier,false,null,null,o.radiusX,o.radiusY,o.force,null,e.ctrlKey,e.altKey,e.shiftKey);
		r.__jsEvent = e;
		return r;
	}
	,mouseEventPrevent: function(o,x,y) {
		var mp = this.mousePos;
		var q = mp.x == x && mp.y == y;
		if(o >= 0 && q && this.mouseTriggered[o]) return true;
		if(!q) this.mousePos.setTo(x,y);
		if(o >= 0 && !this.mouseTriggered[o]) {
			this.mouseTriggered[o] = true;
			window.setTimeout(this.mouseUntrigger[o],0);
		}
		if(o == 1) {
			if(this.mouseDown) this._broadcastMouseEvent(this._alterMouseEvent(this.mouseLastEvent,"mouseUp")); else this.mouseDown = true;
		} else if(o == 2) {
			if(!this.mouseDown) this._broadcastMouseEvent(new openfl_events_MouseEvent("mouseDown")); else this.mouseDown = false;
		}
		return false;
	}
	,getOnTouch: function(i) {
		var _g = this;
		return function(e) {
			_g.onTouch(e,i);
		};
	}
	,onTouch: function(e,m) {
		var lt = e.targetTouches;
		var nt = lt.length;
		var lc = e.changedTouches;
		var nc = lc.length;
		var qt;
		if(nt > 0) qt = lt[0]; else if(nc > 0) qt = lc[0]; else qt = null;
		var i;
		var t;
		var o;
		e.preventDefault();
		this.isTouchScreen = true;
		if(qt != null && (m == 0 || m == 1 && nt == nc || m == 2 && nt == 0 && nc > 0) && !this.mouseEventPrevent(m,qt.pageX,qt.pageY)) {
			this.mouseLastEvent = new openfl_events_MouseEvent(m == 1?"mouseDown":m == 2?"mouseUp":"mouseMove");
			this.mouseLastEvent.__jsEvent = e;
			this._broadcastMouseEvent(this.mouseLastEvent);
			if(m == 2) {
				var ec = new openfl_events_MouseEvent("mouseClick");
				ec.__jsEvent = e;
				this._broadcastMouseEvent(ec);
			}
		}
		if(nc > 0) {
			switch(m) {
			case 1:
				t = "touchBegin";
				break;
			case 2:
				t = "touchEnd";
				break;
			default:
				t = "touchMove";
			}
			i = -1;
			while(++i < nc) {
				o = lc[i];
				this._broadcastTouchEvent(this._translateTouchEvent(e,o,t),o.pageX,o.pageY);
			}
		}
	}
	,onWheel: function(e) {
		var f = this._translateMouseEvent(e,"mouseWheel");
		var d = e.wheelDelta;
		if(d != null) {
			if(Math.abs(d) > 40) d = Math.round(d / 40); else if(d < 0) d = -1; else if(d > 0) d = 1; else d = 0;
		} else d = -e.detail;
		f.delta = d;
		this.mousePos.setTo(e.pageX,e.pageY);
		this._broadcastMouseEvent(f);
	}
	,onMouse: function(e) {
		var t = null;
		var o = -1;
		var b;
		if(e.type == "mousemove") {
			t = "mouseMove";
			o = 0;
		} else {
			b = e.button;
			var _g = e.type;
			switch(_g) {
			case "click":
				if(b == 0) t = "mouseClick"; else if(b == 1) t = "rightClick"; else if(b == 2) t = "middleClick"; else t = t;
				break;
			case "mousedown":
				if(b == 0) t = "mouseDown"; else if(b == 1) t = "middleMouseDown"; else if(b == 2) t = "rightMouseDown"; else t = t;
				o = 1;
				break;
			case "mouseup":
				if(b == 0) t = "mouseUp"; else if(b == 1) t = "middleMouseUp"; else if(b == 2) t = "rightMouseUp"; else t = t;
				o = 2;
				break;
			default:
				return;
			}
		}
		if(!this.mouseEventPrevent(o,e.pageX,e.pageY)) {
			this.mouseLastEvent = new openfl_events_MouseEvent(t);
			this.mouseLastEvent.__jsEvent = e;
			this._broadcastMouseEvent(this.mouseLastEvent);
		}
	}
	,__onDrag: function(e) {
		var parent = this.__dragObject.parent;
		if(parent == null) return;
		var mouse = parent.globalToLocal(this.mousePos);
		var x = this.__dragOffsetX + mouse.x;
		var y = this.__dragOffsetY + mouse.y;
		var r = this.__dragBounds;
		if(r != null) {
			if(x < r.x) x = r.x; else if(x > r.x + r.width) x = r.x + r.width;
			if(y < r.y) y = r.y; else if(y > r.y + r.height) y = r.y + r.height;
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__startDrag: function(o,c,r) {
		if(this.__dragObject == null) this.addEventListener("mouseMove",$bind(this,this.__onDrag));
		this.__dragObject = o;
		if(c) {
			this.__dragOffsetX = -this.__dragObject.get_width() / 2;
			this.__dragOffsetY = -this.__dragObject.get_height() / 2;
		} else {
			var mouse = this.__dragObject.parent.globalToLocal(this.mousePos);
			this.__dragOffsetX = this.__dragObject.x - mouse.x;
			this.__dragOffsetY = this.__dragObject.y - mouse.y;
		}
	}
	,__stopDrag: function(o) {
		if(this.__dragObject != null) {
			this.removeEventListener("mouseMove",$bind(this,this.__onDrag));
			this.__dragObject = null;
		}
	}
	,hitTestLocal: function(x,y,p,v) {
		return !v || this.visible;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		openfl_display_DisplayObjectContainer.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		this.component = o;
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		var o = this.component;
		this.component = window;
		openfl_display_DisplayObjectContainer.prototype.removeEventListener.call(this,type,listener,useCapture);
		this.component = o;
	}
	,get_focus: function() {
		var o = document.activeElement;
		if(o != null && Std["is"](o = o.node,openfl_display_InteractiveObject)) return o; else return null;
	}
	,set_focus: function(v) {
		if(v != null) v.giveFocus(); else this.component.blur();
		return v;
	}
	,get_stageWidth: function() {
		return window.innerWidth;
	}
	,get_stageHeight: function() {
		return window.innerHeight;
	}
	,get_stage: function() {
		return this;
	}
	,set_frameRate: function(v) {
		if(this.frameRate != v) {
			if(this.intervalHandle != null) {
				if(this.frameRate <= 0) window._cancelAnimationFrame(this.intervalHandle); else window.clearInterval(this.intervalHandle);
			}
			if((this.frameRate = v) <= 0) this.intervalHandle = window._requestAnimationFrame($bind(this,this.onTimer)); else this.intervalHandle = window.setInterval($bind(this,this.onTimer),Std["int"](Math.max(0,1000 / v)));
		}
		return v;
	}
	,onTimer: function() {
		var t = openfl_Lib.getTimer();
		var f;
		var i = -1;
		while(++i < openfl_Lib.schLength) {
			openfl_Lib.schList[i]();
			openfl_Lib.schList[i] = null;
		}
		openfl_Lib.schLength = 0;
		this.broadcastEvent(new openfl_events_Event("enterFrame"));
		f = this.frameRate;
		if(f <= 0) this.intervalHandle = window._requestAnimationFrame($bind(this,this.onTimer));
	}
	,__class__: openfl_display_Stage
});
var openfl_geom_Transform = function(displayObject) {
	if(displayObject == null) throw new js__$Boot_HaxeError("Cannot create Transform with no DisplayObject.");
	this._displayObject = displayObject;
	this._matrix = new openfl_geom_Matrix();
	this._fullMatrix = new openfl_geom_Matrix();
	this.set_colorTransform(new openfl_geom_ColorTransform());
};
$hxClasses["openfl.geom.Transform"] = openfl_geom_Transform;
openfl_geom_Transform.__name__ = ["openfl","geom","Transform"];
openfl_geom_Transform.prototype = {
	nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) (m = new openfl_geom_Matrix(localMatrix.a,localMatrix.b,localMatrix.c,localMatrix.d,localMatrix.tx,localMatrix.ty)).concat(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeSetMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,get_concatenatedMatrix: function() {
		return this.nmeGetFullMatrix(this._matrix);
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.syncMtx();
		return this._matrix;
	}
	,get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,__class__: openfl_geom_Transform
};
var openfl_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(a == null) this.a = 1; else this.a = a;
	if(b == null) this.b = 0; else this.b = b;
	if(c == null) this.c = 0; else this.c = c;
	if(d == null) this.d = 1; else this.d = d;
	if(tx == null) this.tx = 0; else this.tx = tx;
	if(ty == null) this.ty = 0; else this.ty = ty;
};
$hxClasses["openfl.geom.Matrix"] = openfl_geom_Matrix;
openfl_geom_Matrix.__name__ = ["openfl","geom","Matrix"];
openfl_geom_Matrix.create = function() {
	var m = openfl_geom_Matrix.pool;
	if(m.length > 0) return m.pop(); else return new openfl_geom_Matrix();
};
openfl_geom_Matrix.prototype = {
	setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.tx = tx;
		this.c = c;
		this.d = d;
		this.ty = ty;
	}
	,clone: function() {
		return new openfl_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,identity: function() {
		this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
	}
	,isIdentity: function() {
		return this.a == 1 && this.d == 1 && this.tx == 0 && this.ty == 0 && this.b == 0 && this.c == 0;
	}
	,copy: function(s) {
		this.a = s.a;
		this.b = s.b;
		this.c = s.c;
		this.d = s.d;
		this.tx = s.tx;
		this.ty = s.ty;
	}
	,invert: function() {
		var t;
		var n = this.a * this.d - this.b * this.c;
		if(n == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			n = 1 / n;
			t = this.d * n;
			this.d = this.a * n;
			this.a = t;
			this.b *= -n;
			this.c *= -n;
			t = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = t;
		}
	}
	,translate: function(x,y) {
		this.tx += x;
		this.ty += y;
	}
	,rotate: function(o) {
		var ox = Math.cos(o);
		var oy = Math.sin(o);
		var t;
		t = this.a * ox - this.b * oy;
		this.b = this.a * oy + this.b * ox;
		this.a = t;
		t = this.c * ox - this.d * oy;
		this.d = this.c * oy + this.d * ox;
		this.c = t;
		t = this.tx * ox - this.ty * oy;
		this.ty = this.tx * oy + this.ty * ox;
		this.tx = t;
	}
	,scale: function(x,y) {
		this.a *= x;
		this.b *= y;
		this.c *= x;
		this.d *= y;
		this.tx *= x;
		this.ty *= y;
	}
	,concat: function(o) {
		var t;
		t = this.a * o.a + this.b * o.c;
		this.b = this.a * o.b + this.b * o.d;
		this.a = t;
		t = this.c * o.a + this.d * o.c;
		this.d = this.c * o.b + this.d * o.d;
		this.c = t;
		t = this.tx * o.a + this.ty * o.c + o.tx;
		this.ty = this.tx * o.b + this.ty * o.d + o.ty;
		this.tx = t;
	}
	,transformPoint: function(o) {
		return new openfl_geom_Point(o.x * this.a + o.y * this.c + this.tx,o.x * this.b + o.y * this.d + this.ty);
	}
	,createBox: function(sx,sy,r,x,y) {
		this.a = sx;
		this.d = sy;
		this.b = r != null?r:0;
		this.tx = x != null?x:0;
		this.ty = y != null?y:0;
	}
	,createGradientBox: function(w,h,r,x,y) {
		this.a = w / 1638.4;
		this.d = h / 1638.4;
		if(r != null && r != 0) {
			var rx = Math.cos(r);
			var ry = Math.sin(r);
			this.b = ry * this.d;
			this.c = -ry * this.a;
			this.a *= rx;
			this.d *= rx;
		} else this.b = this.c = 0;
		if(x != null) this.tx = x + w / 2; else this.tx = w / 2;
		if(y != null) this.ty = y + h / 2; else this.ty = h / 2;
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,to3dString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", 0, 0, " + this.c + ", " + this.d + ", 0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,free: function() {
		openfl_geom_Matrix.pool.push(this);
	}
	,__class__: openfl_geom_Matrix
};
var openfl_geom_ColorTransform = function(r,g,b,a,ro,go,bo,ao) {
	this.redMultiplier = r != null?r:1;
	this.greenMultiplier = g != null?g:1;
	this.blueMultiplier = b != null?b:1;
	this.alphaMultiplier = a != null?a:1;
	this.redOffset = ro != null?ro:0;
	this.greenOffset = go != null?go:0;
	this.blueOffset = bo != null?bo:0;
	this.alphaOffset = ao != null?ao:0;
};
$hxClasses["openfl.geom.ColorTransform"] = openfl_geom_ColorTransform;
openfl_geom_ColorTransform.__name__ = ["openfl","geom","ColorTransform"];
openfl_geom_ColorTransform.prototype = {
	concat: function(o) {
		this.redMultiplier += o.redMultiplier;
		this.greenMultiplier += o.greenMultiplier;
		this.blueMultiplier += o.blueMultiplier;
		this.alphaMultiplier += o.alphaMultiplier;
	}
	,isColorSetter: function() {
		return this.redMultiplier == 0 && this.greenMultiplier == 0 && this.blueMultiplier == 0 && (this.alphaMultiplier == 0 || this.alphaOffset == 0);
	}
	,isAlphaMultiplier: function() {
		return this.redMultiplier == 1 && this.greenMultiplier == 1 && this.blueMultiplier == 1 && this.redOffset == 0 && this.greenOffset == 0 && this.blueOffset == 0 && this.alphaOffset == 0;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 0;
		return this.get_color();
	}
	,__class__: openfl_geom_ColorTransform
};
var openfl_Lib = function() { };
$hxClasses["openfl.Lib"] = openfl_Lib;
openfl_Lib.__name__ = ["openfl","Lib"];
openfl_Lib.get_mobile = function() {
	if(openfl_Lib._mobile == null) {
		var o = navigator.userAgent || navigator.vendor || wnd.opera;
		openfl_Lib._mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4));
	}
	return openfl_Lib._mobile;
};
openfl_Lib.__init = function() {
	var o;
	openfl_Lib.schList = [];
	openfl_Lib.schLength = 0;
	var wnd = window;
	var n = "equestAnimationFrame";
	var lrq = openfl_Lib.getTimer();
	wnd._requestAnimationFrame = wnd["r" + n] || wnd["webkitR" + n] || wnd["mozR" + n] || wnd["oR" + n] || wnd["msR" + n] || function(o1) {
		return wnd.setTimeout(o1,Std["int"](700 / openfl_Lib.get_stage().frameRate));
	};
	n = "ancelAnimationFrame";
	wnd._cancelAnimationFrame = wnd["c" + n] || wnd["webkitC" + n] || wnd["mozC" + n] || wnd["oC" + n] || wnd["msC" + n] || function(o2) {
		wnd.clearTimeout(o2);
		return;
	};
};
openfl_Lib.getTimer = function() {
	return Std["int"](new Date() - openfl_Lib.qTimeStamp);
};
openfl_Lib.getURL = function(url,target) {
	window.open(url.url,target);
};
openfl_Lib.jsNode = function(o) {
	var r = document.createElement(o);
	var s = r.style;
	s.position = "absolute";
	switch(o) {
	case "canvas":
		s.setProperty("-webkit-touch-callout","none",null);
		openfl_Lib.setCSSProperties(s,"user-select","none",47);
		break;
	case "input":case "textarea":
		s.outline = "none";
		break;
	}
	return r;
};
openfl_Lib.jsHelper = function() {
	if(openfl_Lib.qHelper == null) {
		var o = openfl_Lib.jsNode("div");
		openfl_Lib.get_stage().component.appendChild(o);
		o.style.visibility = "hidden";
		o.appendChild(openfl_Lib.qHelper = openfl_Lib.jsNode("div"));
	}
	return openfl_Lib.qHelper;
};
openfl_Lib.get_current = function() {
	if(openfl_Lib.qCurrent == null) openfl_Lib.get_stage().addChild(openfl_Lib.qCurrent = new openfl_display_MovieClip());
	return openfl_Lib.qCurrent;
};
openfl_Lib.get_stage = function() {
	if(openfl_Lib.qStage == null) document.body.appendChild((openfl_Lib.qStage = new openfl_display_Stage()).component);
	return openfl_Lib.qStage;
};
openfl_Lib.schedule = function(m) {
	openfl_Lib.schList[openfl_Lib.schLength++] = m;
};
openfl_Lib.rgba = function(color) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + ((color >> 24 & 255) / 255).toFixed(4) + ")";
};
openfl_Lib.rgbf = function(color,alpha) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + alpha.toFixed(4) + ")";
};
openfl_Lib.setCSSProperties = function(o,k,v,f) {
	if(!f) f = 31;
	if(f & 1) o.setProperty(k,v,null);
	if(f & 2) o.setProperty("-webkit-" + k,v,null);
	if(f & 4) o.setProperty("-moz-" + k,v,null);
	if(f & 8) o.setProperty("-ms-" + k,v,null);
	if(f & 16) o.setProperty("-o-" + k,v,null);
	if(f & 32) o.setProperty("-khtml-" + k,v,null);
};
var openfl_bitfive_NodeTools = function() { };
$hxClasses["openfl.bitfive.NodeTools"] = openfl_bitfive_NodeTools;
openfl_bitfive_NodeTools.__name__ = ["openfl","bitfive","NodeTools"];
openfl_bitfive_NodeTools.createElement = function(tag) {
	var r = window.document.createElement(tag);
	r.style.position = "absolute";
	return r;
};
openfl_bitfive_NodeTools.createInputElement = function() {
	var r;
	var _this = window.document;
	r = _this.createElement("input");
	var r_style = r.style;
	r_style.position = "absolute";
	r_style.outline = "none";
	return r;
};
openfl_bitfive_NodeTools.createCanvasElement = function() {
	var r;
	var _this = window.document;
	r = _this.createElement("canvas");
	var r_style = r.style;
	r_style.position = "absolute";
	r_style.setProperty("-webkit-touch-callout","none",null);
	openfl_bitfive_StyleTools.setProperties(r_style,"user-select","none",63);
	return r;
};
var openfl_bitfive_StyleTools = function() { };
$hxClasses["openfl.bitfive.StyleTools"] = openfl_bitfive_StyleTools;
openfl_bitfive_StyleTools.__name__ = ["openfl","bitfive","StyleTools"];
openfl_bitfive_StyleTools.setPropertyNp = function(self,name,value) {
	self.setProperty(name,value,null);
};
openfl_bitfive_StyleTools.setProperties = function(self,name,value,flags) {
	if(flags == null) flags = 31;
	if(flags & 1) self.setProperty("" + name,value,null);
	if(flags & 2) self.setProperty("-webkit-" + name,value,null);
	if(flags & 4) self.setProperty("-moz-" + name,value,null);
	if(flags & 8) self.setProperty("-ms-" + name,value,null);
	if(flags & 16) self.setProperty("-o-" + name,value,null);
	if(flags & 32) self.setProperty("-khtml-" + name,value,null);
};
var openfl_display_Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) smoothing = false;
	this.pixelSnapping = false;
	this.smoothing = false;
	openfl_display_DisplayObject.call(this);
	this.set_bitmapData(bitmapData);
};
$hxClasses["openfl.display.Bitmap"] = openfl_display_Bitmap;
openfl_display_Bitmap.__name__ = ["openfl","display","Bitmap"];
openfl_display_Bitmap.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Bitmap.__super__ = openfl_display_DisplayObject;
openfl_display_Bitmap.prototype = $extend(openfl_display_DisplayObject.prototype,{
	set_bitmapData: function(v) {
		if(this.bitmapData != null) this.component.removeChild(this.bitmapData.component);
		if(v != null) this.component.appendChild(v.handle());
		return this.bitmapData = v;
	}
	,get_width: function() {
		if(this.__width != null) return this.__width; else if(this.bitmapData != null) return this.bitmapData.component.width; else return 0;
	}
	,get_height: function() {
		if(this.__height != null) return this.__height; else if(this.bitmapData != null) return this.bitmapData.component.height; else return 0;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		this.bitmapData.drawToSurface(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing);
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && this.bitmapData != null && x >= 0 && y >= 0 && x < this.bitmapData.component.width && y < this.bitmapData.component.height;
	}
	,__class__: openfl_display_Bitmap
});
var openfl_display_BitmapData = function(w,h,t,c) {
	if(t == null) t = true;
	this.__sync = 1;
	this.__transparent = t;
	this.__revision = 0;
	this.__rect = new openfl_geom_Rectangle(0,0,w,h);
	this.component = openfl_bitfive_NodeTools.createCanvasElement();
	this.component.width = w;
	this.component.height = h;
	this.context = this.component.getContext("2d");
	openfl_display_BitmapData.setSmoothing(this.context,true);
	this.__pixelData = this.context.createImageData(1,1);
	if(c == null) c = -1;
	if(!t) c |= -16777216;
	if((c & -16777216) != 0) this.fillRect(this.__rect,c);
};
$hxClasses["openfl.display.BitmapData"] = openfl_display_BitmapData;
openfl_display_BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl_display_BitmapData.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_BitmapData.setSmoothing = function(o,v) {
	o.imageSmoothingEnabled = o.oImageSmoothingEnabled = o.msImageSmoothingEnabled = o.webkitImageSmoothingEnabled = o.mozImageSmoothingEnabled = v;
};
openfl_display_BitmapData.makeColor = function(color) {
	return "rgba(" + (color >> 16 & 255) + "," + (color >> 8 & 255) + "," + (color & 255) + "," + ((color >> 24 & 255) / 255).toFixed(4) + ")";
};
openfl_display_BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new openfl_display_BitmapData(0,0);
	bitmapData.__loadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
};
openfl_display_BitmapData.__isPNG = function(d) {
	if(d.length < 8) return false;
	d.position = 0;
	return d.data.getUint8(d.position++) == 137 && d.data.getUint8(d.position++) == 80 && d.data.getUint8(d.position++) == 78 && d.data.getUint8(d.position++) == 71 && d.data.getUint8(d.position++) == 13 && d.data.getUint8(d.position++) == 10 && d.data.getUint8(d.position++) == 26 && d.data.getUint8(d.position++) == 10;
};
openfl_display_BitmapData.__isJPG = function(d) {
	if(d.length < 2) return false;
	d.position = 0;
	return d.data.getUint8(d.position++) == 255 && d.data.getUint8(d.position++) == 216;
};
openfl_display_BitmapData.prototype = {
	get_rect: function() {
		return this.__rect.clone();
	}
	,fillRect: function(area,color) {
		if(area == null || area.width <= 0 || area.height <= 0) return;
		if(area.equals(this.__rect) && this.__transparent && (color & -16777216) == 0) {
			this.component.width = this.component.width;
			return;
		}
		if(!this.__transparent) color |= -16777216; else if((color & -16777216) != -16777216) this.context.clearRect(area.x,area.y,area.width,area.height);
		if((color & -16777216) != 0) {
			this.context.fillStyle = openfl_display_BitmapData.makeColor(color);
			this.context.fillRect(area.x,area.y,area.width,area.height);
		}
		this.__sync |= 5;
	}
	,clone: function() {
		this.syncCanvas();
		var r = new openfl_display_BitmapData(this.component.width,this.component.height,this.__transparent,0);
		r.context.drawImage(this.component,0,0);
		r.__sync |= 5;
		return r;
	}
	,dispose: function() {
		this.component.width = this.component.height = 1;
		this.__imageData = null;
		this.__sync = 5;
	}
	,handle: function() {
		this.syncCanvas();
		if((this.__sync & 4) != 0) {
			this.__revision++;
			this.__sync &= -5;
		}
		return this.component;
	}
	,drawToSurface: function(cnv,ctx,matrix,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(smoothing != null && ctx.imageSmoothingEnabled != smoothing) openfl_display_BitmapData.setSmoothing(ctx,smoothing);
		if(matrix != null) {
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
		}
		ctx.drawImage(this.handle(),0,0);
		ctx.restore();
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		this.syncCanvas();
		if(alphaBitmapData != null) throw new js__$Boot_HaxeError("alphaBitmapData is not supported yet.");
		var bit = sourceBitmapData.handle();
		var bw;
		var bh;
		var tw = this.component.width;
		var th = this.component.height;
		if(bit == null || (bw = bit.width) <= 0 || (bh = bit.height) <= 0) return;
		var dx = ~(~destPoint.x);
		var dy = ~(~destPoint.y);
		var sx;
		var sy;
		var sw;
		var sh;
		if(sourceRect != null) {
			sx = sourceRect.x;
			sy = sourceRect.y;
			sw = sourceRect.width;
			sh = sourceRect.height;
			if(sx < 0) {
				sw += sx;
				sx = 0;
			}
			if(sy < 0) {
				sh += sy;
				sy = 0;
			}
			if(sx + sw > bw) sw = bw - sx;
			if(sy + sh > bh) sh = bh - sy;
		} else {
			sx = sy = 0;
			sw = bw;
			sh = bh;
		}
		if(dx < 0) {
			sw += dx;
			sx -= dx;
			dx = 0;
		}
		if(dy < 0) {
			sh += dy;
			sy -= dy;
			dy = 0;
		}
		if(dx + sw > tw) sw = tw - dx;
		if(dy + sh > th) sh = th - dy;
		if(sw <= 0 || sh <= 0) return;
		if(this.__transparent && !mergeAlpha) this.context.clearRect(dx,dy,sw,sh);
		this.context.drawImage(bit,sx,sy,sw,sh,dx,dy,sw,sh);
		this.__sync |= 5;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		this.syncCanvas();
		var a = 0;
		this.context.save();
		if(colorTransform != null) {
			a = colorTransform.alphaMultiplier;
			colorTransform.alphaMultiplier = 1;
			this.context.globalAlpha *= a;
		}
		if(clipRect != null) {
			this.context.beginPath();
			this.context.rect(clipRect.x,clipRect.y,clipRect.width,clipRect.height);
			this.context.clip();
			this.context.beginPath();
		}
		if(smoothing != null) openfl_display_BitmapData.setSmoothing(this.context,smoothing);
		source.drawToSurface(this.handle(),this.context,matrix,colorTransform,blendMode,clipRect,null);
		this.context.restore();
		if(colorTransform != null) colorTransform.alphaMultiplier = a;
		this.__sync |= 5;
	}
	,lock: function() {
		this.syncData();
	}
	,unlock: function() {
		this.syncCanvas();
	}
	,hitTestLocal: function(x,y) {
		if(x >= 0 && y >= 0 && x < this.component.width && y < this.component.height) try {
			return this.context.getImageData(x,y,1,1).data[3] != 0;
		} catch( _ ) {
			haxe_CallStack.lastException = _;
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			return true;
		}
		return false;
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return 0;
		if(!((this.__sync & 3) != 1)) {
			var d = this.context.getImageData(x,y,1,1).data;
			return d[0] << 16 | d[1] << 8 | d[2];
		} else {
			var o = y * this.component.width + x << 2;
			return this.__imageData.data[o] << 16 | this.__imageData.data[o + 1] << 8 | this.__imageData.data[o + 2];
		}
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return 0;
		if(!((this.__sync & 3) != 1)) {
			var d = this.context.getImageData(x,y,1,1).data;
			return (this.__transparent?d[3] << 24:-16777216) | d[0] << 16 | d[1] << 8 | d[2];
		} else {
			var o = y * this.component.width + x << 2;
			return (this.__transparent?this.__imageData.data[o + 3] << 24:-16777216) | this.__imageData.data[o] << 16 | this.__imageData.data[o + 1] << 8 | this.__imageData.data[o + 2];
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return;
		if(!((this.__sync & 3) != 1)) {
			this.__pixelData.data[0] = color >>> 16 & 255;
			this.__pixelData.data[1] = color >>> 8 & 255;
			this.__pixelData.data[2] = color & 255;
			this.__pixelData.data[3] = 255;
			this.context.putImageData(this.__pixelData,x,y);
			this.__sync |= 5;
		} else {
			var o = y * this.component.width + x << 2;
			this.__imageData.data[o] = color >>> 16 & 255;
			this.__imageData.data[o + 1] = color >>> 8 & 255;
			this.__imageData.data[o + 2] = color & 255;
			this.__imageData.data[o + 3] = 255;
			this.__sync |= 6;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= this.component.width || y >= this.component.height) return;
		if(!((this.__sync & 3) != 1)) {
			this.__pixelData.data[0] = color >>> 16 & 255;
			this.__pixelData.data[1] = color >>> 8 & 255;
			this.__pixelData.data[2] = color & 255;
			this.__pixelData.data[3] = color >>> 24 & 255;
			this.context.putImageData(this.__pixelData,x,y);
			this.__sync |= 5;
		} else {
			var o = y * this.component.width + x << 2;
			this.__imageData.data[o] = color >>> 16 & 255;
			this.__imageData.data[o + 1] = color >>> 8 & 255;
			this.__imageData.data[o + 2] = color & 255;
			this.__imageData.data[o + 3] = color >>> 24 & 255;
			this.__sync |= 6;
		}
	}
	,getPixels: function(q) {
		var d;
		var v;
		var r = new openfl_utils_ByteArray();
		var u;
		var qx = q.x | 0;
		var qy = q.y | 0;
		var qw = q.width | 0;
		var qh = q.height | 0;
		var i = 0;
		var j;
		var l = qw * qh * 4;
		r.set_length(l);
		v = r.data;
		if(!((this.__sync & 3) != 1)) {
			d = this.context.getImageData(qx,qy,qw,qh);
			u = d.data;
			while(i < l) r.writeUnsignedInt(u[i++] << 16 | u[i++] << 8 | u[i++] | u[i++] << 24);
		} else {
			u = this.__imageData.data;
			if(qx == 0 && qy == 0 && qw == this.component.width && qh == this.component.height) while(i < l) r.writeUnsignedInt(u[i++] << 16 | u[i++] << 8 | u[i++] | u[i++] << 24); else while(qh-- > 0) {
				i = (qx + qy++ * (j = qw)) * 4;
				while(j-- > 0) r.writeUnsignedInt(u[i++] << 16 | u[i++] << 8 | u[i++] | u[i++] << 24);
			}
		}
		return r;
	}
	,setPixels: function(q,r) {
		var qx = q.x | 0;
		var qy = q.y | 0;
		var qw = q.width | 0;
		var qh = q.height | 0;
		var i = 0;
		var j;
		var l = qw * qh * 4;
		var p;
		var w = this.component.width;
		var d;
		var u;
		if((this.__sync & 3) != 2) {
			d = this.context.createImageData(qw,qh);
			u = d.data;
			while(i < l) {
				p = r.readUnsignedInt();
				u[i] = p >> 16 & 255;
				u[i + 1] = p >> 8 & 255;
				u[i + 2] = p & 255;
				u[i + 3] = p >>> 24 & 255;
				i += 4;
			}
			this.context.putImageData(d,qx,qy);
		} else {
			u = this.__imageData.data;
			while(qh-- > 0) {
				i = (qx + qy++ * w) * 4;
				j = qw;
				while(j-- > 0) {
					p = r.readUnsignedInt();
					u[i] = p >> 16 & 255;
					u[i + 1] = p >> 8 & 255;
					u[i + 2] = p & 255;
					u[i + 3] = p >>> 24 & 255;
					i += 4;
				}
			}
		}
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		this.syncData();
		var data = this.__imageData.data;
		var minX = this.component.width;
		var minY = this.component.height;
		var maxX = 0;
		var maxY = 0;
		var len = data.length;
		var i;
		var px;
		var x;
		var y;
		i = 0;
		while(i < len) {
			px = (this.__transparent?data[i + 3] << 24:-16777216) | (data[i] & 255) << 16 | (data[i + 1] & 255) << 8 | data[i + 2] & 255;
			if(px == color == findColor) {
				x = Math.floor((i >> 2) % this.component.width);
				y = Math.floor((i >> 2) / this.component.width);
				if(x < minX) minX = x;
				if(x > maxX) maxX = x;
				if(y < minY) minY = y;
				if(y > maxY) maxY = y;
			}
			i += 4;
		}
		if(minX <= maxX && minY <= maxY) return new openfl_geom_Rectangle(minX,minY,maxX - minX + 1,maxY - minY + 1);
		if(!findColor) return new openfl_geom_Rectangle(0,0,this.component.width,this.component.height);
		return new openfl_geom_Rectangle(0,0,0,0);
	}
	,floodFill: function(fx,fy,fc) {
		var wasCanvas = (this.__sync & 3) == 1;
		this.lock();
		var q = [fx | fy << 16];
		var c = 1;
		var d = this.__imageData.data;
		var zr;
		var zg;
		var zb;
		var za;
		var fr;
		var fg;
		var fb;
		var fa;
		var x;
		var y;
		var p;
		var o = [];
		var r;
		var w = this.component.width;
		var h = this.component.height;
		p = fy * this.component.width + fx << 4;
		zr = d[p];
		zg = d[p + 1];
		zb = d[p + 2];
		za = d[p + 3];
		fa = fc >>> 24;
		fr = fc >> 16 & 255;
		fg = fc >> 8 & 255;
		fb = fc & 255;
		y = -1;
		while(++y < h) {
			o.push(r = []);
			x = 0;
			while(x < w) {
				r.push(0);
				x += 32;
			}
		}
		while(c > 0) {
			p = q[--c];
			x = p & 65535;
			y = p >>> 16;
			if(x < 0 || y < 0 || x >= w || y >= h) continue;
			if((o[y][x >> 5] >> (x & 31) & 1) != 0) continue;
			o[y][x >> 5] |= 1 << (x & 31);
			p = y * this.component.width + x << 2;
			if(d[p] == zr && d[p + 1] == zg && d[p + 2] == zb && d[p + 3] == za) {
				d[p] = fr;
				d[p + 1] = fg;
				d[p + 2] = fb;
				d[p + 3] = fa;
				if((p = x + 1) < w && (o[y][p >> 5] >> (p & 31) & 1) == 0) q[c++] = y << 16 | p;
				if(x > 0 && (o[y][(p = x - 1) >> 5] >> (p & 31) & 1) == 0) q[c++] = y << 16 | p;
				if((p = y + 1) < h && (o[p][x >> 5] >> (x & 31) & 1) == 0) q[c++] = p << 16 | x;
				if(y > 0 && (o[p = y - 1][x >> 5] >> (x & 31) & 1) == 0) q[c++] = p << 16 | x;
			}
		}
		this.__sync |= 6;
		if(wasCanvas) this.unlock();
	}
	,colorTransform: function(q,o) {
		var x = ~(~q.x);
		var y = ~(~q.y);
		var w = ~(~q.width);
		var h = ~(~q.height);
		var tw = this.component.width;
		var th = this.component.height;
		var f = this.context.globalCompositeOperation;
		var a = this.context.globalAlpha;
		if(x < 0) {
			w += x;
			x = 0;
		}
		if(y < 0) {
			h += y;
			y = 0;
		}
		if(x + w > tw) w = tw - x;
		if(y + h > th) h = th - y;
		if(w <= 0 || h <= 0) return;
		if(o.isAlphaMultiplier()) {
			this.syncCanvas();
			this.context.globalCompositeOperation = "copy";
			this.context.globalAlpha *= o.alphaMultiplier;
			this.context.drawImage(this.component,x,y,w,h,x,y,w,h);
			this.__sync |= 5;
		} else if(o.isColorSetter()) {
			var s = this.context.fillStyle;
			if(o.alphaMultiplier != 0) {
				this.context.globalCompositeOperation = "source-in";
				this.context.fillStyle = "rgb(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + ")";
				this.context.fillRect(x,y,w,h);
				this.context.globalCompositeOperation = "copy";
				this.context.globalAlpha = o.alphaMultiplier;
				this.context.drawImage(this.component,x,y,w,h,x,y,w,h);
			} else {
				this.context.globalCompositeOperation = "copy";
				this.context.fillStyle = "rgba(" + ~(~o.redOffset) + "," + ~(~o.greenOffset) + "," + ~(~o.blueOffset) + "," + ~(~o.alphaOffset) + ")";
				this.context.fillRect(x,y,w,h);
			}
			this.context.fillStyle = s;
		} else {
			var wasCanvas = (this.__sync & 3) != 2;
			this.lock();
			var d = this.__imageData.data;
			var c = tw * th * 4;
			var i = c;
			var v;
			var rm = o.redMultiplier;
			var gm = o.greenMultiplier;
			var bm = o.blueMultiplier;
			var am = o.alphaMultiplier;
			var ro = o.redOffset;
			var go = o.greenOffset;
			var bo = o.blueOffset;
			var ao = o.alphaOffset;
			if(x == 0 && y == 0 && w == tw && h == th) while((i -= 4) >= 0) {
				if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
				if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
				if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
				if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
			} else {
				var px;
				var py = y - 1;
				var pb = y + h;
				var pr;
				while(++py < pb) {
					i = tw * py + x - 1 << 2;
					pr = i + w * 4;
					while((i += 4) < pr) {
						if((v = d[i + 3]) > 0) if((v = v * am + ao) < 0) d[i + 3] = 0; else if(v > 255) d[i + 3] = 255; else d[i + 3] = ~(~v);
						if((v = d[i + 2] * bm + bo) < 0) d[i + 2] = 0; else if(v > 255) d[i + 2] = 255; else d[i + 2] = ~(~v);
						if((v = d[i + 1] * gm + go) < 0) d[i + 1] = 0; else if(v > 255) d[i + 1] = 255; else d[i + 1] = ~(~v);
						if((v = d[i] * rm + ro) < 0) d[i] = 0; else if(v > 255) d[i] = 255; else d[i] = ~(~v);
					}
				}
			}
			this.__sync |= 6;
			if(wasCanvas) this.unlock();
		}
		this.context.globalCompositeOperation = f;
		this.context.globalAlpha = a;
	}
	,copyChannel: function(o,q,p,sourceChannel,destChannel) {
		var x = ~(~o.x);
		var px = ~(~p.x);
		var y = ~(~o.y);
		var py = ~(~p.y);
		var w = ~(~q.width);
		var h = ~(~q.height);
		var sw = o.component.width;
		var sh = o.component.height;
		var tw = this.component.width;
		var th = this.component.height;
		var i;
		var j;
		var u;
		var v;
		var c;
		var sc = sourceChannel;
		var dc = destChannel;
		if(px < 0) {
			w += px;
			px = 0;
		}
		if(py < 0) {
			h += py;
			py = 0;
		}
		if(x < 0) {
			w += x;
			x = 0;
		}
		if(y < 0) {
			h += y;
			y = 0;
		}
		if(x + w > sw) w = sw - x;
		if(y + h > sh) h = sh - y;
		if(px + w > tw) w = tw - px;
		if(py + h > th) h = th - py;
		if(w <= 0 || h <= 0) return;
		if(sc == 8 && dc == 8) {
			var f = this.context.globalCompositeOperation;
			var s = this.context.fillStyle;
			this.context.globalCompositeOperation = "darker";
			i = 0;
			while(i++ < 8) this.context.drawImage(this.component,px,py,w,h,px,py,w,h);
			this.context.globalCompositeOperation = "destination-over";
			this.context.fillStyle = "black";
			this.context.fillRect(x,y,w,h);
			this.context.globalCompositeOperation = "destination-atop";
			this.context.drawImage(o.handle(),x,y,w,h,px,py,w,h);
			this.context.globalCompositeOperation = f;
			this.context.fillStyle = s;
		} else {
			var wasCanvas = (this.__sync & 3) != 2;
			var ds;
			var dd;
			this.lock();
			dd = this.__imageData.data;
			o.lock();
			ds = o.__imageData.data;
			if(sc == 8) sc = 3; else if(sc == 4) sc = 2; else if(sc == 2) sc = 1; else if(sc == 1) sc = 0; else sc = -1;
			if(dc == 8) dc = 3; else if(dc == 4) dc = 2; else if(dc == 2) dc = 1; else if(dc == 1) dc = 0; else dc = -1;
			if(sc < 0 || dc < 0) return;
			j = py + h;
			v = y + h;
			while(--v >= y) {
				--j;
				c = w;
				i = (px + tw * j) * 4 + sc;
				u = (x + sw * v) * 4 + dc;
				while(c-- > 0) {
					dd[u] = ds[i];
					i += 4;
					u += 4;
				}
			}
			this.__sync |= 6;
			if(wasCanvas) this.unlock();
		}
	}
	,noise: function(q,l,h,c,m) {
		if(m == null) m = false;
		if(c == null) c = 7;
		if(h == null) h = 255;
		if(l == null) l = 0;
		var wasCanvas = (this.__sync & 3) != 2;
		var i = 0;
		var n;
		var p;
		var d = h - l + 1;
		var z = q;
		var r = (c & 1) > 0;
		var g = (c & 2) > 0;
		var b = (c & 4) > 0;
		var a = (c & 8) > 0;
		this.lock();
		p = this.__imageData.data;
		n = p.length;
		while(i < n) {
			if(m) {
				p[i] = p[i + 1] = p[i + 2] = l + (z = z * 16807 % 2147483647) % d;
				i += 3;
			} else {
				if(r) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
				if(g) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
				if(b) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 0;
			}
			if(a) p[i++] = l + (z = z * 16807 % 2147483647) % d; else p[i++] = 255;
		}
		this.__sync |= 6;
		if(wasCanvas) this.unlock();
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
	}
	,jeashOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.__rect = new openfl_geom_Rectangle(0,0,width,height);
		if(data.inLoader != null) {
			var e1 = new openfl_events_Event("complete");
			e1.set_target(data.inLoader);
			data.inLoader.dispatchEvent(e1);
		}
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = window.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.component, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					f(a1,e);
				};
			})($bind(this,this.jeashOnLoad),data),false);
			image.addEventListener("error",function(e1) {
				if(!image.complete) _g.jeashOnLoad(data,e1);
			},false);
		}
		image.src = inFilename;
	}
	,syncCanvas: function() {
		if(!((this.__sync & 3) != 2)) {
			this.context.putImageData(this.__imageData,0,0);
			this.__sync = this.__sync & -4;
		}
	}
	,syncData: function() {
		if(!((this.__sync & 3) != 1)) {
			this.__imageData = this.context.getImageData(0,0,this.component.width,this.component.height);
			this.__sync = this.__sync & -4;
		}
	}
	,__loadFromBytes: function(c,a,h) {
		var _g = this;
		var t = null;
		var o = document.createElement("img");
		var n = this.component;
		var q;
		var f = null;
		var i;
		var l;
		var p;
		if(openfl_display_BitmapData.__isPNG(c)) t = "png"; else if(openfl_display_BitmapData.__isJPG(c)) t = "jpeg"; else throw new js__$Boot_HaxeError(new openfl_errors_IOError("BitmapData can only load from ByteArrays with PNG/JPEG data."));
		f = function(_) {
			o.removeEventListener("load",f);
			_g.__rect.width = n.width = o.width;
			_g.__rect.height = n.height = o.height;
			q = _g.context = n.getContext("2d");
			q.drawImage(o,0,0);
			if(a != null) {
				i = -1;
				l = a.length;
				p = q.getImageData(0,0,o.width,o.height);
				while(++i < l) p.data[(i << 2) + 3] = a.data.getUint8(a.position++);
				q.putImageData(p,0,0);
			}
			if(h != null) h(_g);
		};
		o.addEventListener("load",f);
		o.src = "data:image/" + t + ";base64," + c.toBase64();
	}
	,__class__: openfl_display_BitmapData
};
var openfl_display_BitmapDataChannel = function() { };
$hxClasses["openfl.display.BitmapDataChannel"] = openfl_display_BitmapDataChannel;
openfl_display_BitmapDataChannel.__name__ = ["openfl","display","BitmapDataChannel"];
var openfl_display_IGraphics = function() { };
$hxClasses["openfl.display.IGraphics"] = openfl_display_IGraphics;
openfl_display_IGraphics.__name__ = ["openfl","display","IGraphics"];
openfl_display_IGraphics.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_IGraphics.prototype = {
	__class__: openfl_display_IGraphics
};
var openfl_display_Graphics = function() {
	this.rgPending = false;
	this.synced = true;
	this.component = openfl_Lib.jsNode("canvas");
	this.context = this.component.getContext("2d",null);
	this.context.save();
	this.bounds = new openfl_geom_Rectangle();
	this.resetBounds();
	this.irec = [];
	this.frec = [];
	this.arec = [];
	this.lineWidth = this.ilen = this.flen = this.alen = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl_display_Graphics;
openfl_display_Graphics.__name__ = ["openfl","display","Graphics"];
openfl_display_Graphics.__interfaces__ = [openfl_display_IGraphics,openfl_display_IBitmapDrawable];
openfl_display_Graphics.prototype = {
	regenerate: function() {
		var o = this.component;
		var s = this.component.style;
		var q = this.context;
		var b = this.bounds;
		var bx = ~(~(b.x - 2));
		var by = ~(~(b.y - 2));
		var bw = Math.ceil(b.width + 4);
		var bh = Math.ceil(b.height + 4);
		this.synced = true;
		this.rgPending = false;
		if(b.width <= 0 || b.height <= 0) {
			o.width = o.height = 1;
			s.top = s.left = "0";
			return;
		}
		if(this.offsetX != bx || this.offsetY != by) {
			s.left = (this.offsetX = bx) + "px";
			s.top = (this.offsetY = by) + "px";
		}
		if(bw != o.width || bh != o.height) {
			o.width = bw;
			o.height = bh;
		} else q.clearRect(0,0,bw,bh);
		q.save();
		q.translate(-bx,-by);
		this.render(o,q);
		q.restore();
	}
	,regenerateTask: function() {
		if(this.rgPending) this.regenerate();
	}
	,requestRegeneration: function() {
		openfl_Lib.schedule($bind(this,this.regenerateTask));
		this.rgPending = true;
	}
	,set_displayObject: function(v) {
		if(this.displayObject != v) {
			this.displayObject = v;
			if(!this.synced) this.requestRegeneration();
		}
		return v;
	}
	,resetBounds: function() {
		this.bounds.setVoid();
		this.invalidate();
	}
	,grab: function(x,y,r,b) {
		var i;
		if(x < (i = this.bounds.x)) {
			i = i - x;
			this.bounds.x -= i;
			this.bounds.width += i;
		}
		if(y < (i = this.bounds.y)) {
			i = i - y;
			this.bounds.y -= i;
			this.bounds.height += i;
		}
		if(r > (i = this.bounds.get_right())) this.bounds.width += r - i;
		if(b > (i = this.bounds.get_bottom())) this.bounds.height += b - i;
		this.invalidate();
	}
	,invalidate: function() {
		if(this.synced) {
			this.synced = false;
			if(!this.rgPending && this.displayObject != null && this.displayObject.get_stage() != null) this.requestRegeneration();
		}
	}
	,clear: function() {
		var i = 0;
		while(i < this.alen) this.arec[i++] = null;
		this.lineWidth = this.ilen = this.flen = this.alen = 0;
		this.resetBounds();
		this.invalidate();
	}
	,lineStyle: function(w,c,a,ph,sm,cs,js,ml) {
		this.irec[this.ilen++] = 1;
		var v;
		if(w > 0) v = this.lineWidth = w; else v = this.lineWidth = 0;
		this.frec[this.flen++] = v;
		if(w > 0) {
			var v1 = openfl_Lib.rgbf(c != null?c:0,a != null?a:1);
			this.arec[this.alen++] = v1;
			if(cs == "none") this.irec[this.ilen++] = 2; else if(cs == "square") this.irec[this.ilen++] = 1; else this.irec[this.ilen++] = 0;
			if(js == "bevel") this.irec[this.ilen++] = 2; else if(js == "miter") this.irec[this.ilen++] = 1; else this.irec[this.ilen++] = 0;
		}
	}
	,beginFill: function(c,a) {
		this.irec[this.ilen++] = 2;
		var v = openfl_Lib.rgbf(c != null?c:0,a != null?a:1);
		this.arec[this.alen++] = v;
	}
	,beginBitmapFill: function(bitmap,m,repeat,smooth) {
		this.irec[this.ilen++] = 3;
		this.arec[this.alen++] = bitmap;
		if(repeat != false) this.irec[this.ilen++] = 1; else this.irec[this.ilen++] = 0;
		var i;
		if(m != null) i = 1; else i = 0;
		this.irec[this.ilen++] = i;
		if(i) {
			var r = this.frec;
			var l = this.flen;
			r[l++] = m.a;
			r[l++] = m.b;
			r[l++] = m.c;
			r[l++] = m.d;
			r[l++] = m.tx;
			r[l++] = m.ty;
			this.flen = l;
		}
	}
	,beginGradientFill: function(type,colors,alphas,ratios,m,spreadMethod,interpolationMethod,fpr) {
		if(fpr == null) fpr = 0;
		var g;
		var i = -1;
		var n = colors.length;
		this.irec[this.ilen++] = 4;
		if(type == "LINEAR") g = this.context.createLinearGradient(-819.2 * m.a + m.tx,-819.2 * m.b + m.ty,819.2 * m.a + m.tx,819.2 * m.b + m.ty); else {
			fpr *= 819.2;
			g = this.context.createRadialGradient(fpr * m.a + m.tx,fpr * m.b + m.ty,0,819.2 * m.c + m.tx,fpr * m.b + m.ty,819.2 * m.d + m.ty);
		}
		while(++i < n) g.addColorStop(ratios[i] / 255,openfl_Lib.rgbf(colors[i],alphas[i]));
		this.arec[this.alen++] = g;
	}
	,endFill: function() {
		this.irec[this.ilen++] = 9;
		this.invalidate();
	}
	,moveTo: function(x,y) {
		this.irec[this.ilen++] = 10;
		this.frec[this.flen++] = x;
		this.frec[this.flen++] = y;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + r,y + r);
	}
	,lineTo: function(x,y) {
		this.irec[this.ilen++] = 11;
		this.frec[this.flen++] = x;
		this.frec[this.flen++] = y;
		var r = this.lineWidth / 2;
		this.grab(x - r,y - r,x + r,y + r);
	}
	,curveTo: function(u,v,x,y) {
		this.irec[this.ilen++] = 12;
		var r = this.frec;
		var l = this.flen;
		r[l++] = u;
		r[l++] = v;
		r[l++] = x;
		r[l++] = y;
		this.flen = l;
		var r1 = this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + r1,y + r1);
	}
	,drawRect: function(x,y,w,h) {
		this.irec[this.ilen++] = 13;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = w;
		r[l++] = h;
		this.flen = l;
		var r1 = this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + w + r1,y + h + r1);
	}
	,drawRoundRect: function(x,y,w,h,p,q) {
		this.irec[this.ilen++] = 15;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = w;
		r[l++] = h;
		r[l++] = p;
		r[l++] = q;
		this.flen = l;
		var r1 = this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + w + r1,y + h + r1);
	}
	,drawCircle: function(x,y,q) {
		this.irec[this.ilen++] = 14;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = q;
		this.flen = l;
		var r1 = q;
		r1 += this.lineWidth / 2;
		this.grab(x - r1,y - r1,x + r1,y + r1);
	}
	,drawEllipse: function(x,y,w,h) {
		this.irec[this.ilen++] = 17;
		var r = this.frec;
		var l = this.flen;
		r[l++] = x;
		r[l++] = y;
		r[l++] = w;
		r[l++] = h;
		this.flen = l;
		this.grab(x,y,x + w,y + h);
	}
	,drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		ctx.save();
		if(mtx != null) ctx.transform(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
		this.render(cnv,ctx);
		ctx.restore();
	}
	,hitTestLocal: function(x,y,p) {
		if(this.bounds.contains(x,y)) {
			if(p) {
				if(!this.synced) this.regenerate();
				try {
					return this.context.getImageData(x - this.offsetX,y - this.offsetY,1,1).data[3] != 0;
				} catch( _ ) {
					haxe_CallStack.lastException = _;
					if (_ instanceof js__$Boot_HaxeError) _ = _.val;
				}
			}
			return true;
		}
		return false;
	}
	,_closePath: function(cnv,ctx,f,m,texture) {
		if(f & 1) {
			ctx.closePath();
			if(f & 4) {
				ctx.save();
				ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
				ctx.fillStyle = ctx.createPattern(texture,f & 8?"repeat":"no-repeat");
				ctx.fill();
				ctx.restore();
			} else ctx.fill();
		}
		if(f & 2) ctx.stroke();
		ctx.beginPath();
		return f;
	}
	,render: function(cnv,ctx) {
		var f = 0;
		var p = -1;
		var m = this._drawMatrix;
		var v;
		var i;
		var d;
		var n = 0;
		var tex = null;
		var ir = this.irec;
		var ip = -1;
		var il = ir.length - 1;
		var ar = this.arec;
		var ap = -1;
		var nr = this.frec;
		var np = -1;
		if(m == null) this._drawMatrix = m = new openfl_geom_Matrix();
		ctx.save();
		while(ip < il) {
			var _g = i = ir[++ip];
			switch(_g) {
			case 1:
				if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
				ctx.lineWidth = d = nr[++np];
				if(d > 0) {
					f |= 2;
					ctx.strokeStyle = ar[++ap];
					if((i = ir[++ip]) == 2) ctx.lineCap = "butt"; else if(i == 1) ctx.lineCap = "square"; else ctx.lineCap = "round";
					if((i = ir[++ip]) == 2) ctx.lineJoin = "bevel"; else if(i == 1) ctx.lineJoin = "miter"; else ctx.lineJoin = "round";
				} else {
					f &= -3;
					ctx.strokeStyle = null;
				}
				break;
			case 2:case 3:case 4:
				if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
				f |= 1;
				if(i == 3) {
					tex = ar[++ap].handle();
					i = ir[++ip];
					if(ir[++ip] != 0) {
						if(i != 0) f |= 8; else f &= -9;
						m.a = nr[++np];
						m.b = nr[++np];
						m.c = nr[++np];
						m.d = nr[++np];
						m.tx = nr[++np];
						m.ty = nr[++np];
						f |= 4;
					} else {
						ctx.fillStyle = ctx.createPattern(tex,i != 0?"repeat":"no-repeat");
						f &= -5;
					}
				} else {
					ctx.fillStyle = ar[++ap];
					f &= -5;
				}
				n = 0;
				break;
			case 9:
				if(n > 0) {
					f = this._closePath(cnv,ctx,f,m,tex);
					n = 0;
				}
				f &= -2;
				break;
			case 10:
				ctx.moveTo(nr[++np],nr[++np]);
				n++;
				break;
			case 11:
				ctx.lineTo(nr[++np],nr[++np]);
				n++;
				break;
			case 12:
				ctx.quadraticCurveTo(nr[++np],nr[++np],nr[++np],nr[++np]);
				n++;
				break;
			case 13:
				ctx.rect(nr[++np],nr[++np],nr[++np],nr[++np]);
				n++;
				break;
			case 14:
				var x = nr[++np];
				var y = nr[++np];
				var r = nr[++np];
				if(r < 0) r = -r;
				ctx.moveTo(x + r,y);
				if(r != 0) ctx.arc(x,y,r,0,Math.PI * 2,true);
				n++;
				break;
			case 17:
				var x1 = nr[++np];
				var y1 = nr[++np];
				var w = nr[++np];
				var h = nr[++np];
				var x11 = x1 + w / 2;
				var y11 = y1 + h / 2;
				var x2 = x1 + w;
				var y2 = y1 + h;
				var m1 = 0.275892;
				var xm = w * m1;
				var ym = h * m1;
				ctx.moveTo(x11,y1);
				ctx.bezierCurveTo(x11 + xm,y1,x2,y11 - ym,x2,y11);
				ctx.bezierCurveTo(x2,y11 + ym,x11 + xm,y2,x11,y2);
				ctx.bezierCurveTo(x11 - xm,y2,x1,y11 + ym,x1,y11);
				ctx.bezierCurveTo(x1,y11 - ym,x11 - xm,y1,x11,y1);
				n++;
				break;
			case 15:
				var x3 = nr[++np];
				var y3 = nr[++np];
				var w1 = nr[++np];
				var h1 = nr[++np];
				var u = nr[++np];
				var q = nr[++np];
				if(q == null) {
					ctx.moveTo(x3 + u,y3 + h1);
					ctx.arcTo(x3 + w1 - u,y3 + h1 - u,x3 + w1,y3 + h1 - u,u);
					ctx.arcTo(x3 + w1,y3 + u,x3 + w1 - u,y3,u);
					ctx.arcTo(x3 + u,y3,x3,y3 + u,u);
					ctx.arcTo(x3 + u,y3 + h1 - u,x3 + u,y3 + h1,u);
				} else {
					ctx.moveTo(x3 + u,y3 + h1);
					ctx.lineTo(x3 + w1 - u,y3 + h1);
					ctx.quadraticCurveTo(x3 + w1,y3 + h1,x3 + w1,y3 + h1 - q);
					ctx.lineTo(x3 + w1,y3 + q);
					ctx.quadraticCurveTo(x3 + w1,y3,x3 + w1 - u,y3);
					ctx.lineTo(x3 + u,y3);
					ctx.quadraticCurveTo(x3,y3,x3,y3 + q);
					ctx.lineTo(x3,y3 + h1 - q);
					ctx.quadraticCurveTo(x3,y3 + h1,x3 + u,y3 + h1);
				}
				n++;
				break;
			case 16:
				var tex1 = ar[++ap];
				var d1 = tex1.handle();
				var fx = ir[++ip];
				var fs = (fx & 1) != 0;
				var fr = (fx & 2) != 0;
				var fc = (fx & 4) != 0;
				var fa = (fx & 8) != 0;
				var fm = (fx & 16) != 0;
				var c = ir[++ip];
				var tx;
				var ty;
				var ox;
				var oy;
				var rx;
				var ry;
				var rw;
				var rh;
				ctx.save();
				if((fx & 65536) != 0) ctx.globalCompositeOperation = "lighter"; else ctx.globalCompositeOperation = "source-over";
				while(--c >= 0) {
					tx = nr[++np];
					ty = nr[++np];
					ox = nr[++np];
					oy = nr[++np];
					rx = nr[++np];
					ry = nr[++np];
					rw = nr[++np];
					rh = nr[++np];
					ctx.save();
					if(fm) ctx.transform(nr[++np],nr[++np],nr[++np],nr[++np],tx,ty); else {
						ctx.translate(tx,ty);
						if(fs) ctx.scale(v = nr[++np],v);
						if(fr) ctx.rotate(nr[++np]);
					}
					if(fc) p += 3;
					if(fa) ctx.globalAlpha = nr[++np];
					ctx.drawImage(d1,rx,ry,rw,rh,-ox,-oy,rw,rh);
					ctx.restore();
				}
				ctx.restore();
				break;
			default:
				throw new js__$Boot_HaxeError(4000 + i);
			}
		}
		if(n > 0) f = this._closePath(cnv,ctx,f,m,tex);
		ctx.restore();
	}
	,__class__: openfl_display_Graphics
};
var openfl_display_ILoader = function() { };
$hxClasses["openfl.display.ILoader"] = openfl_display_ILoader;
openfl_display_ILoader.__name__ = ["openfl","display","ILoader"];
openfl_display_ILoader.prototype = {
	__class__: openfl_display_ILoader
};
var openfl_display__$JointStyle_JointStyle_$Impl_$ = {};
$hxClasses["openfl.display._JointStyle.JointStyle_Impl_"] = openfl_display__$JointStyle_JointStyle_$Impl_$;
openfl_display__$JointStyle_JointStyle_$Impl_$.__name__ = ["openfl","display","_JointStyle","JointStyle_Impl_"];
openfl_display__$JointStyle_JointStyle_$Impl_$._new = function(s) {
	return s;
};
openfl_display__$JointStyle_JointStyle_$Impl_$.toString = function(this1) {
	return this1;
};
openfl_display__$JointStyle_JointStyle_$Impl_$.fromString = function(s) {
	return s;
};
var openfl_display_LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl_display_LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl_display_LineScaleMode.HORIZONTAL.toString = $estr;
openfl_display_LineScaleMode.HORIZONTAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NONE = ["NONE",1];
openfl_display_LineScaleMode.NONE.toString = $estr;
openfl_display_LineScaleMode.NONE.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.NORMAL = ["NORMAL",2];
openfl_display_LineScaleMode.NORMAL.toString = $estr;
openfl_display_LineScaleMode.NORMAL.__enum__ = openfl_display_LineScaleMode;
openfl_display_LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl_display_LineScaleMode.VERTICAL.toString = $estr;
openfl_display_LineScaleMode.VERTICAL.__enum__ = openfl_display_LineScaleMode;
var openfl_display_Loader = function() {
	openfl_display_Sprite.call(this);
	this.contentLoaderInfo = openfl_display_LoaderInfo.create(this);
};
$hxClasses["openfl.display.Loader"] = openfl_display_Loader;
openfl_display_Loader.__name__ = ["openfl","display","Loader"];
openfl_display_Loader.__interfaces__ = [openfl_display_ILoader];
openfl_display_Loader.__super__ = openfl_display_Sprite;
openfl_display_Loader.prototype = $extend(openfl_display_Sprite.prototype,{
	load: function(request,context) {
		var extension = "";
		var i;
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var url = request.url;
		var p = url.lastIndexOf(".");
		if(p < 0) throw new js__$Boot_HaxeError("Extension must be specified, got \"" + url + "\"");
		var ct;
		var bt = true;
		var ext = url.substring(p + 1);
		switch(ext) {
		case "swf":
			ct = "application/x-shockwave-flash";
			break;
		case "png":
			ct = "image/png";
			break;
		case "gif":
			ct = "image/gif";
			break;
		case "jpg":case "jpeg":
			bt = false;
			ct = "image/jpeg";
			break;
		default:
			throw new js__$Boot_HaxeError("Unrecognized extension \"" + ext + "\" in \"" + url + "\"");
		}
		this.contentLoaderInfo.url = url;
		this.contentLoaderInfo.contentType = ct;
		this.mImage = new openfl_display_BitmapData(0,0,bt);
		try {
			this.contentLoaderInfo.addEventListener("complete",$bind(this,this.handleLoad),false);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new openfl_display_Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 62, className : "openfl.display.Loader", methodName : "load"});
			var evt = new openfl_events_IOErrorEvent("ioError");
			evt.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new openfl_display_Shape();
			this.addChild(this.mShape);
		}
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener("complete",$bind(this,this.handleLoad),false);
			openfl_display_BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new openfl_display_Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new openfl_events_Event("complete");
				evt.set_currentTarget(_g);
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 98, className : "openfl.display.Loader", methodName : "loadBytes"});
			var evt1 = new openfl_events_IOErrorEvent("ioError");
			evt1.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(evt1);
		}
	}
	,handleLoad: function(e) {
		e.set_currentTarget(this);
		this.contentLoaderInfo.removeEventListener("complete",$bind(this,this.handleLoad));
	}
	,__class__: openfl_display_Loader
});
var openfl_display_LoaderInfo = function() {
	openfl_events_EventDispatcher.call(this);
	this.bytesLoaded = this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl_display_LoaderInfo;
openfl_display_LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl_display_LoaderInfo.create = function(o) {
	var r = new openfl_display_LoaderInfo();
	if(o != null) r.loader = o; else r.url = "";
	return r;
};
openfl_display_LoaderInfo.__super__ = openfl_events_EventDispatcher;
openfl_display_LoaderInfo.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	__class__: openfl_display_LoaderInfo
});
var openfl_display_MovieClip = function() {
	openfl_display_Sprite.call(this);
	this.enabled = true;
	this.qIndex = this.qTotal = 0;
	this.loaderInfo = openfl_display_LoaderInfo.create();
};
$hxClasses["openfl.display.MovieClip"] = openfl_display_MovieClip;
openfl_display_MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl_display_MovieClip.__super__ = openfl_display_Sprite;
openfl_display_MovieClip.prototype = $extend(openfl_display_Sprite.prototype,{
	gotoAndPlay: function(v,o) {
	}
	,gotoAndStop: function(v,o) {
	}
	,nextFrame: function() {
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,get_currentFrame: function() {
		return this.qIndex;
	}
	,get_framesLoaded: function() {
		return this.qTotal;
	}
	,get_totalFrames: function() {
		return this.qTotal;
	}
	,__class__: openfl_display_MovieClip
});
var openfl_display_Shape = function() {
	(this.graphics = new openfl_display_Graphics()).set_displayObject(this);
	this.component = this.graphics.component;
	openfl_display_DisplayObject.call(this);
};
$hxClasses["openfl.display.Shape"] = openfl_display_Shape;
openfl_display_Shape.__name__ = ["openfl","display","Shape"];
openfl_display_Shape.__interfaces__ = [openfl_display_IBitmapDrawable];
openfl_display_Shape.__super__ = openfl_display_DisplayObject;
openfl_display_Shape.prototype = $extend(openfl_display_DisplayObject.prototype,{
	drawToSurface: function(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing) {
		this.graphics.drawToSurface(cnv,ctx,mtx,ctr,blendMode,clipRect,smoothing);
	}
	,set_stage: function(v) {
		var z = this.get_stage() == null && v != null;
		var r = openfl_display_DisplayObject.prototype.set_stage.call(this,v);
		if(z) this.graphics.invalidate();
		return r;
	}
	,hitTestLocal: function(x,y,p,v) {
		return (!v || this.visible) && this.graphics.hitTestLocal(x,y,p);
	}
	,__class__: openfl_display_Shape
});
var openfl_errors_Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["openfl.errors.Error"] = openfl_errors_Error;
openfl_errors_Error.__name__ = ["openfl","errors","Error"];
openfl_errors_Error.prototype = {
	getStackTrace: function() {
		return haxe_CallStack.toString(haxe_CallStack.exceptionStack());
	}
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl_errors_Error
};
var openfl_errors_IOError = function(message) {
	if(message == null) message = "";
	openfl_errors_Error.call(this,message);
};
$hxClasses["openfl.errors.IOError"] = openfl_errors_IOError;
openfl_errors_IOError.__name__ = ["openfl","errors","IOError"];
openfl_errors_IOError.__super__ = openfl_errors_Error;
openfl_errors_IOError.prototype = $extend(openfl_errors_Error.prototype,{
	__class__: openfl_errors_IOError
});
var openfl_events_Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
};
$hxClasses["openfl.events.Event"] = openfl_events_Event;
openfl_events_Event.__name__ = ["openfl","events","Event"];
openfl_events_Event.prototype = {
	get_target: function() {
		return this._target || this.target;
	}
	,set_target: function(v) {
		return this._target = v;
	}
	,get_currentTarget: function() {
		return this._current || this.currentTarget;
	}
	,set_currentTarget: function(v) {
		return this._current = v;
	}
	,preventDefault: function() {
		if(this.__jsEvent != null) this.__jsEvent.preventDefault();
		this.defaultPrevented = true;
	}
	,isDefaultPrevented: function() {
		return this.defaultPrevented;
	}
	,clone: function() {
		return new openfl_events_Event(this.type,this.bubbles,this.cancelable);
	}
	,__class__: openfl_events_Event
};
var openfl_events_TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl_events_TextEvent;
openfl_events_TextEvent.__name__ = ["openfl","events","TextEvent"];
openfl_events_TextEvent.__super__ = openfl_events_Event;
openfl_events_TextEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_TextEvent
});
var openfl_events_ErrorEvent = function(type,bubbles,cancelable,text) {
	openfl_events_TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl_events_ErrorEvent;
openfl_events_ErrorEvent.__name__ = ["openfl","events","ErrorEvent"];
openfl_events_ErrorEvent.__super__ = openfl_events_TextEvent;
openfl_events_ErrorEvent.prototype = $extend(openfl_events_TextEvent.prototype,{
	__class__: openfl_events_ErrorEvent
});
var openfl_events_HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	openfl_events_Event.call(this,type,bubbles,cancelable);
};
$hxClasses["openfl.events.HTTPStatusEvent"] = openfl_events_HTTPStatusEvent;
openfl_events_HTTPStatusEvent.__name__ = ["openfl","events","HTTPStatusEvent"];
openfl_events_HTTPStatusEvent.__super__ = openfl_events_Event;
openfl_events_HTTPStatusEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_HTTPStatusEvent
});
var openfl_events_IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl_events_IOErrorEvent;
openfl_events_IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl_events_IOErrorEvent.__super__ = openfl_events_Event;
openfl_events_IOErrorEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_IOErrorEvent
});
var openfl_events_KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue) {
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCodeValue;
	this.charCode = charCodeValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl_events_KeyboardEvent;
openfl_events_KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl_events_KeyboardEvent.__super__ = openfl_events_Event;
openfl_events_KeyboardEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_KeyboardEvent
});
var openfl_events_UIEvent = function(type,bubbles,cancelable) {
	openfl_events_Event.call(this,type,bubbles,cancelable);
};
$hxClasses["openfl.events.UIEvent"] = openfl_events_UIEvent;
openfl_events_UIEvent.__name__ = ["openfl","events","UIEvent"];
openfl_events_UIEvent.__super__ = openfl_events_Event;
openfl_events_UIEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_UIEvent
});
var openfl_events_MouseEvent = function(type,bubbles,cancelable,lx,ly,obj,ctrlKey,altKey,shiftKey,bt,delta) {
	openfl_events_UIEvent.call(this,type,bubbles != null?bubbles:true,cancelable != null?cancelable:false);
	this.ctrlKey = ctrlKey != null?ctrlKey:false;
	this.altKey = altKey != null?altKey:false;
	this.shiftKey = shiftKey != null?shiftKey:false;
	this.relatedObject = obj;
	this.buttonDown = bt != null?bt:false;
	this.delta = delta != null?delta:0;
};
$hxClasses["openfl.events.MouseEvent"] = openfl_events_MouseEvent;
openfl_events_MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl_events_MouseEvent.__super__ = openfl_events_UIEvent;
openfl_events_MouseEvent.prototype = $extend(openfl_events_UIEvent.prototype,{
	updateAfterEvent: function() {
	}
	,__class__: openfl_events_MouseEvent
});
var openfl_events_ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["openfl.events.ProgressEvent"] = openfl_events_ProgressEvent;
openfl_events_ProgressEvent.__name__ = ["openfl","events","ProgressEvent"];
openfl_events_ProgressEvent.__super__ = openfl_events_Event;
openfl_events_ProgressEvent.prototype = $extend(openfl_events_Event.prototype,{
	__class__: openfl_events_ProgressEvent
});
var openfl_events_SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl_events_ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.SecurityErrorEvent"] = openfl_events_SecurityErrorEvent;
openfl_events_SecurityErrorEvent.__name__ = ["openfl","events","SecurityErrorEvent"];
openfl_events_SecurityErrorEvent.__super__ = openfl_events_ErrorEvent;
openfl_events_SecurityErrorEvent.prototype = $extend(openfl_events_ErrorEvent.prototype,{
	__class__: openfl_events_SecurityErrorEvent
});
var openfl_events_TouchEvent = function(type,bubbles,cancelable,id,primary,lx,ly,sx,sy,ps,obj,ctrl,alt,shift) {
	openfl_events_UIEvent.call(this,type,bubbles,cancelable);
	this.altKey = alt;
	this.shiftKey = shift;
	this.ctrlKey = ctrl;
	this.touchPointID = id;
	this.sizeX = sx;
	this.sizeY = sy;
	this.pressure = ps;
};
$hxClasses["openfl.events.TouchEvent"] = openfl_events_TouchEvent;
openfl_events_TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl_events_TouchEvent.__super__ = openfl_events_UIEvent;
openfl_events_TouchEvent.prototype = $extend(openfl_events_UIEvent.prototype,{
	__class__: openfl_events_TouchEvent
});
var openfl_filters_BitmapFilter = function() {
};
$hxClasses["openfl.filters.BitmapFilter"] = openfl_filters_BitmapFilter;
openfl_filters_BitmapFilter.__name__ = ["openfl","filters","BitmapFilter"];
openfl_filters_BitmapFilter.prototype = {
	clone: function() {
		return new openfl_filters_BitmapFilter();
	}
	,__class__: openfl_filters_BitmapFilter
};
var openfl_media_Sound = function(stream,ctx) {
	openfl_events_EventDispatcher.call(this);
	if(stream != null) this.load(stream,ctx);
};
$hxClasses["openfl.media.Sound"] = openfl_media_Sound;
openfl_media_Sound.__name__ = ["openfl","media","Sound"];
openfl_media_Sound.canPlayType = function(o) {
	var f;
	var v;
	o = o.toLowerCase();
	if(openfl_media_Sound.canPlayMap != null) {
		if(openfl_media_Sound.canPlayMap.exists(o)) return openfl_media_Sound.canPlayMap.get(o);
	} else openfl_media_Sound.canPlayMap = new haxe_ds_StringMap();
	f = openfl_media_Sound.getFormatType(o);
	v = new Audio().canPlayType(f) != "no";
	openfl_media_Sound.canPlayMap.set(o,v);
	return v;
};
openfl_media_Sound.getFormatType = function(o) {
	if(o == "mp3") return "audio/mpeg;"; else if(o == "ogg") return "audio/ogg; codecs=\"vorbis\""; else return null;
};
openfl_media_Sound.__super__ = openfl_events_EventDispatcher;
openfl_media_Sound.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	close: function() {
		if(this.component != null) this.component = null; else throw new js__$Boot_HaxeError(new openfl_errors_IOError("Attempt to close unexisting stream."));
	}
	,load: function(stream,ctx) {
		var s = stream.url;
		var m = openfl_media_Sound.library;
		if(m != null && (__map_reserved[s] != null?m.existsReserved(s):m.h.hasOwnProperty(s))) {
			this.component = __map_reserved[s] != null?m.getReserved(s):m.h[s];
			var value = this.component.cloneNode(true);
			openfl_media_Sound.library.set(s,value);
		} else this.component = new Audio(s);
		this.qCache = [];
	}
	,play: function(ofs,loops,stf) {
		if(loops == null) loops = 0;
		if(ofs == null) ofs = 0;
		var o;
		var i;
		if(this.qCache.length == 0) {
			(o = new openfl_media_SoundChannel()).init(this,this.component,loops);
			this.component = this.component.cloneNode(true);
		} else {
			o = this.qCache[0];
			var _g = 0;
			var _g1 = this.qCache;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(v.component.currentTime * 1000 == ofs) {
					o = v;
					break;
				}
			}
			HxOverrides.remove(this.qCache,o);
		}
		o.set_soundTransform(stf);
		try {
			o._loops = loops;
			o.play(ofs);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			null;
		}
		return o;
	}
	,get_length: function() {
		if(this.component != null) return this.component.duration * 1000; else return 0;
	}
	,__class__: openfl_media_Sound
});
var openfl_media_SoundChannel = function() {
	this._loops = 1;
	this.active = false;
	this.rightPeak = 1;
	this.leftPeak = 1;
	openfl_events_EventDispatcher.call(this);
};
$hxClasses["openfl.media.SoundChannel"] = openfl_media_SoundChannel;
openfl_media_SoundChannel.__name__ = ["openfl","media","SoundChannel"];
openfl_media_SoundChannel.__super__ = openfl_events_EventDispatcher;
openfl_media_SoundChannel.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	init: function(q,v,loops) {
		if(loops == null) loops = 1;
		this.qSound = q;
		this.component = v;
		this._loops = loops;
		this.component.addEventListener("ended",$bind(this,this.onEnded));
	}
	,play: function(p) {
		var o = this.component;
		var l;
		if(!this.active) {
			l = this.get_duration();
			if(p == 0 || p / 1000 <= l) {
				this._position = this.set_position(p);
				o.load();
				o.play();
				this.active = true;
			} else {
				this.set_position(0);
				o.load();
				o.play();
				o.pause();
				this.qSound.qCache.push(this);
			}
		}
	}
	,stop: function() {
		if(this.active) {
			this.active = false;
			this.component.pause();
			this.qSound.qCache.push(this);
		}
	}
	,set_soundTransform: function(v) {
		this.soundTransform = v;
		if(v != null) this.component.volume = v.volume; else this.component.volume = 1;
		return v;
	}
	,get_duration: function() {
		var o = this.component;
		var f;
		try {
			if(o.buffered != null) f = o.buffered.end(0); else f = o.duration;
		} catch( _ ) {
			haxe_CallStack.lastException = _;
			if (_ instanceof js__$Boot_HaxeError) _ = _.val;
			f = o.duration;
			if(isNaN(f)) f = 0;
		}
		return f;
	}
	,get_position: function() {
		return this.component.currentTime * 1000;
	}
	,set_position: function(v) {
		if(this.component.currentTime != v / 1000) {
			var p = !this.component.paused;
			if(p) this.component.pause();
			this.component.currentTime = v / 1000;
			if(p) this.component.play();
		}
		return v;
	}
	,onEnded: function(e) {
		if(this.active) {
			if(--this._loops > 0) {
				this.set_position(this._position);
				if(this.component.paused) this.component.play();
			} else {
				this.stop();
				this.component.currentTime = 0;
				this.dispatchEvent(new openfl_events_Event("soundComplete"));
			}
		}
	}
	,__class__: openfl_media_SoundChannel
});
var openfl_media_SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["openfl.media.SoundLoaderContext"] = openfl_media_SoundLoaderContext;
openfl_media_SoundLoaderContext.__name__ = ["openfl","media","SoundLoaderContext"];
openfl_media_SoundLoaderContext.prototype = {
	__class__: openfl_media_SoundLoaderContext
};
var openfl_media_SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
};
$hxClasses["openfl.media.SoundTransform"] = openfl_media_SoundTransform;
openfl_media_SoundTransform.__name__ = ["openfl","media","SoundTransform"];
openfl_media_SoundTransform.prototype = {
	__class__: openfl_media_SoundTransform
};
var openfl_net_IURLLoader = function() { };
$hxClasses["openfl.net.IURLLoader"] = openfl_net_IURLLoader;
openfl_net_IURLLoader.__name__ = ["openfl","net","IURLLoader"];
openfl_net_IURLLoader.__interfaces__ = [openfl_events_IEventDispatcher];
openfl_net_IURLLoader.prototype = {
	__class__: openfl_net_IURLLoader
};
var openfl_net_URLLoader = function(request) {
	openfl_events_EventDispatcher.call(this);
	this.bytesLoaded = this.bytesTotal = 0;
	this.set_dataFormat(1);
	if(request != null) this.load(request);
};
$hxClasses["openfl.net.URLLoader"] = openfl_net_URLLoader;
openfl_net_URLLoader.__name__ = ["openfl","net","URLLoader"];
openfl_net_URLLoader.__interfaces__ = [openfl_net_IURLLoader];
openfl_net_URLLoader.__super__ = openfl_events_EventDispatcher;
openfl_net_URLLoader.prototype = $extend(openfl_events_EventDispatcher.prototype,{
	set_dataFormat: function(v) {
		if(v == 0 && window.ArrayBuffer == null) this.dataFormat = 1; else this.dataFormat = v;
		return this.dataFormat;
	}
	,close: function() {
	}
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState == 4) {
				var s;
				try {
					s = subject.status;
				} catch( _ ) {
					haxe_CallStack.lastException = _;
					if (_ instanceof js__$Boot_HaxeError) _ = _.val;
					s = null;
				}
				if(s != null) self.onStatus(s);
				if(s == null) self.onError("Failed to connect or resolve host"); else if(s >= 200 && s < 400) self.onData(subject.response); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
					self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
					self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
				} else self.onError("Http Error #" + subject.status);
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js_Boot.__instanceof(data,openfl_utils_ByteArray)) {
			var data1 = data;
			if(this.dataFormat == 0) uri = data1.data.buffer; else uri = data1.readUTFBytes(data1.length);
		} else if(js_Boot.__instanceof(data,openfl_net_URLVariables)) {
			var data2 = data;
			var _g = 0;
			var _g1 = Reflect.fields(data2);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.onError(e.toString());
			return;
		}
		if(this.dataFormat == 0) xmlHttpRequest.responseType = "arraybuffer";
		var _g2 = 0;
		while(_g2 < requestHeaders.length) {
			var header = requestHeaders[_g2];
			++_g2;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
	}
	,onData: function(_) {
		var v;
		if(_) v = _; else v = this.getData();
		var e;
		if(this.dataFormat == 0) this.data = openfl_utils_ByteArray.nmeOfBuffer(v); else this.data = Std.string(v);
		e = new openfl_events_Event("complete");
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onError: function(msg) {
		var e = new openfl_events_IOErrorEvent("ioError");
		e.text = msg;
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onOpen: function() {
		var e = new openfl_events_Event("open");
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,onProgress: function(event) {
		var e = new openfl_events_ProgressEvent("progress");
		e.set_currentTarget(this);
		e.bytesLoaded = event.loaded;
		e.bytesTotal = event.total;
		this.dispatchEvent(e);
	}
	,onSecurityError: function(msg) {
		var evt = new openfl_events_SecurityErrorEvent("securityError");
		evt.text = msg;
		evt.set_currentTarget(this);
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var e = new openfl_events_HTTPStatusEvent("httpStatus",false,false,status);
		e.set_currentTarget(this);
		this.dispatchEvent(e);
	}
	,__class__: openfl_net_URLLoader
});
var openfl_net_URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl_net_URLRequest;
openfl_net_URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl_net_URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js_Boot.__instanceof(this.data,openfl_utils_ByteArray)) (res = res.slice()).push(new openfl_net_URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		return res;
	}
	,__class__: openfl_net_URLRequest
};
var openfl_net_URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["openfl.net.URLRequestHeader"] = openfl_net_URLRequestHeader;
openfl_net_URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
openfl_net_URLRequestHeader.prototype = {
	__class__: openfl_net_URLRequestHeader
};
var openfl_net_URLVariables = function(o) {
	if(o != null) this.decode(o);
};
$hxClasses["openfl.net.URLVariables"] = openfl_net_URLVariables;
openfl_net_URLVariables.__name__ = ["openfl","net","URLVariables"];
openfl_net_URLVariables.prototype = {
	decode: function(s) {
		var o = 0;
		var i = -1;
		var l = s.length;
		var e = 0;
		var k;
		var v;
		var c;
		while(o < l) {
			i = s.indexOf("&",o);
			if(i < 0) i = l;
			e = s.indexOf("=",o);
			if(e == -1 || e > i) throw new js__$Boot_HaxeError(2101);
			k = s.substring(o,e);
			v = s.substring(e + 1,i);
			if(Object.prototype.hasOwnProperty.call(this,k)) {
				c = Reflect.field(this,k);
				if((c instanceof Array) && c.__enum__ == null) c.push(v); else c = [c,v];
			} else c = v;
			this[k] = c;
			o = i + 1;
		}
	}
	,toString: function() {
		var r = "";
		var o = Reflect.fields(this);
		var i = -1;
		var l = o.length;
		var k;
		var v;
		while(++i < l) {
			if(i > 0) r += "&";
			r += StringTools.urlEncode(k = o[i]) + "=";
			if((v = Reflect.field(this,k) instanceof Array) && (v = Reflect.field(this,k)).__enum__ == null) r += v.join("&" + k + "="); else r += Std.string(v);
		}
		return r;
	}
	,__class__: openfl_net_URLVariables
};
var openfl_text_Font = function() {
};
$hxClasses["openfl.text.Font"] = openfl_text_Font;
openfl_text_Font.__name__ = ["openfl","text","Font"];
openfl_text_Font.enumerateFonts = function(z) {
	if(z == null) z = false;
	return [];
};
openfl_text_Font.registerFont = function(v) {
};
openfl_text_Font.prototype = {
	hasGlyphs: function(v) {
		return false;
	}
	,__class__: openfl_text_Font
};
var openfl_text_FontStyle = $hxClasses["openfl.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] };
openfl_text_FontStyle.REGULAR = ["REGULAR",0];
openfl_text_FontStyle.REGULAR.toString = $estr;
openfl_text_FontStyle.REGULAR.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.ITALIC = ["ITALIC",1];
openfl_text_FontStyle.ITALIC.toString = $estr;
openfl_text_FontStyle.ITALIC.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
openfl_text_FontStyle.BOLD_ITALIC.toString = $estr;
openfl_text_FontStyle.BOLD_ITALIC.__enum__ = openfl_text_FontStyle;
openfl_text_FontStyle.BOLD = ["BOLD",3];
openfl_text_FontStyle.BOLD.toString = $estr;
openfl_text_FontStyle.BOLD.__enum__ = openfl_text_FontStyle;
var openfl_text_FontType = $hxClasses["openfl.text.FontType"] = { __ename__ : true, __constructs__ : ["EMBEDDED","DEVICE"] };
openfl_text_FontType.EMBEDDED = ["EMBEDDED",0];
openfl_text_FontType.EMBEDDED.toString = $estr;
openfl_text_FontType.EMBEDDED.__enum__ = openfl_text_FontType;
openfl_text_FontType.DEVICE = ["DEVICE",1];
openfl_text_FontType.DEVICE.toString = $estr;
openfl_text_FontType.DEVICE.__enum__ = openfl_text_FontType;
var openfl_ui_Keyboard = function() { };
$hxClasses["openfl.ui.Keyboard"] = openfl_ui_Keyboard;
openfl_ui_Keyboard.__name__ = ["openfl","ui","Keyboard"];
openfl_ui_Keyboard.isAccessible = function() {
	return false;
};
var openfl_utils_ByteArray = function() {
	this.littleEndian = false;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated = this.position = 0);
};
$hxClasses["openfl.utils.ByteArray"] = openfl_utils_ByteArray;
openfl_utils_ByteArray.__name__ = ["openfl","utils","ByteArray"];
openfl_utils_ByteArray.fromBytes = function(inBytes) {
	var r = new openfl_utils_ByteArray();
	r.byteView = new Uint8Array(inBytes.b.bufferValue);
	r.set_length(r.byteView.length);
	r.allocated = r.length;
	return r;
};
openfl_utils_ByteArray.nmeOfBuffer = function(buffer) {
	var r = new openfl_utils_ByteArray();
	r.set_length(r.allocated = buffer.byteLength);
	r.data = new DataView(buffer);
	r.byteView = new Uint8Array(buffer);
	return r;
};
openfl_utils_ByteArray.prototype = {
	__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,_getUTFBytesCount: function(value) {
		var r = 0;
		var i = -1;
		var l = value.length;
		var c;
		var count = 0;
		while(++i < l) {
			c = value.charCodeAt(i);
			if(c <= 127) r += 1; else if(c <= 2047) r += 2; else if(c <= 65535) r += 3; else r += 4;
		}
		return r;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,clear: function() {
		this.set_length(this.position = 0);
	}
	,nmeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b.bufferValue);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,nmeGet: function(pos) {
		return this.data.getUint8(pos);
	}
	,nmeGetBuffer: function() {
		return this.data.buffer;
	}
	,nmeSet: function(p,v) {
		this.data.setUint8(p,v);
	}
	,readBoolean: function() {
		return this.data.getUint8(this.position++) != 0;
	}
	,readByte: function() {
		return this.data.getUint8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		if(offset < 0 || length < 0) throw new js__$Boot_HaxeError(new openfl_errors_IOError("Read error - Out of bounds"));
		var l = offset + length;
		if(bytes.length < l) bytes.set_length(l);
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var r = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return r;
	}
	,readFloat: function() {
		var r = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) this.set_length(len);
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readInt: function() {
		var r = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return r;
	}
	,readShort: function() {
		var r = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUnsignedByte: function() {
		return this.data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var r = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return r;
	}
	,readUTF: function() {
		return this.readUTFBytes(this.readUnsignedShort());
	}
	,readUTFBytes: function(len) {
		var r = "";
		var max = this.position + len;
		while(this.position < max) {
			var c = this.data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				r += String.fromCharCode(c);
			} else if(c < 224) r += String.fromCharCode((c & 63) << 6 | this.data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | this.data.getUint8(this.position++) & 127);
			} else {
				var c21 = this.data.getUint8(this.position++);
				var c3 = this.data.getUint8(this.position++);
				r += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | this.data.getUint8(this.position++) & 127);
			}
		}
		return r;
	}
	,toString: function() {
		var o = this.position;
		var r;
		this.position = 0;
		r = this.readUTFBytes(this.length);
		this.position = o;
		return r;
	}
	,toBase64: function() {
		var o = this;
		var q = o.position;
		var l = o.length;
		var p = -1;
		var v = o.data;
		var r = "";
		var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var a;
		var b;
		var c;
		while(++p < l) {
			a = v.getUint8(p);
			if(++p < l) b = v.getUint8(p); else b = 0;
			if(++p < l) c = v.getUint8(p); else c = 0;
			r += m.charAt(a >> 2) + m.charAt((a & 3) << 4 | b >> 4) + (p - 1 < l?m.charAt((b & 15) << 2 | c >> 6):"=") + (p < l?m.charAt(c & 63):"=");
		}
		return r;
	}
	,writeBoolean: function(v) {
		this.writeByte(v?1:0);
	}
	,writeByte: function(v) {
		var l = this.position + 1;
		if(this.length < l) this.set_length(l);
		var data = this.data;
		data.setInt8(this.position,v);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new js__$Boot_HaxeError(new openfl_errors_IOError("Write error - Out of bounds"));
		var l = this.position + length;
		if(this.length < l) this.set_length(l);
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeDouble: function(x) {
		var l = this.position + 8;
		if(this.length < l) this.set_length(l);
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFloat: function(x) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var l = this.position + 2;
		if(this.length < l) this.set_length(l);
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var l = this.position + 4;
		if(this.length < l) this.set_length(l);
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var l = this.position + 2;
		if(this.length < l) this.set_length(l);
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var i = -1;
		var l = value.length;
		var c;
		while(++i < l) {
			c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		return this.length = value;
	}
	,__class__: openfl_utils_ByteArray
};
var openfl_utils_Endian = function() { };
$hxClasses["openfl.utils.Endian"] = openfl_utils_Endian;
openfl_utils_Endian.__name__ = ["openfl","utils","Endian"];
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
haxe_Resource.content = [];
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
openfl_Lib.__init();
(function() {
	var a = Event.prototype;
	var b = openfl_events_Event.prototype;
	a.clone = b.clone;
	a.isDefaultPrevented = b.isDefaultPrevented;
	a.get_target = b.get_target;
	a.set_target = b.set_target;
	a.get_currentTarget = b.get_currentTarget;
	a.set_currentTarget = b.set_currentTarget;
})();
ApplicationMain.config = { build : "251", company : "01101101", file : "LD35Haxe", fps : 60, name : "LD35Haxe", orientation : "", packageName : "com.m.LD35Haxe", version : "1.0.0", windows : [{ antialiasing : 0, background : 0, borderless : false, depthBuffer : false, display : 0, fullscreen : false, hardware : false, height : 640, parameters : "{}", resizable : true, stencilBuffer : true, title : "LD35Haxe", vsync : false, width : 640, x : null, y : null}]};
ApplicationMain.AssetNames = ["img/aura.png","img/enemy_0.png","img/enemy_0a.png","img/enemy_1.png","img/enemy_2.png","img/enemy_a.png","img/enemy_b.png","img/player.png","img/test.png","img/Untitled-1.psd"];
ApplicationMain.AssetBytes = [2105,3055,1167,1376,3360,1052,1052,989,1052,46182];
Game.TAR = new openfl_geom_Rectangle();
Game.TAP = new openfl_geom_Point();
Game.WIDTH = 640;
Game.HEIGHT = 640;
Sprites.PLAYER = "player";
Sprites.AURA = "aura";
Sprites.SIZE_A = "size_a";
Sprites.SIZE_B = "size_b";
Sprites.SIZE_C = "size_c";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
openfl_Assets.cache = new openfl_AssetCache();
openfl_Assets.libraries = new haxe_ds_StringMap();
openfl_Assets.initialized = false;
openfl_geom_Transform.DEG_TO_RAD = Math.PI / 180.0;
openfl_geom_Matrix.pool = [];
openfl_Lib.qTimeStamp = Date.now() + 0;
openfl_Lib.mouseX = 0;
openfl_Lib.mouseY = 0;
openfl_media_Sound.library = new haxe_ds_StringMap();
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
