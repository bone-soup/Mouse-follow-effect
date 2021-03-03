// ===================================================================================================
// name:mouse
// author:bone
// ===================================================================================================

;(function() {

  function MyMouse(options) {
    var options = options || {}

    var defaultOptions = {
      changeClass: 'changeName',
      moreClass:'moreName',
      multiple: 3,
      size: '14',
      color: '#00ffff'
    }
    for (key in options) {
      defaultOptions[key] = options[key];
    }
    this.init(defaultOptions);
  }

  MyMouse.prototype = {
    version: "0.1",
    constructor: MyMouse,
    timer: null,
    ifIe: false,

    init: function(obj) {
      this.judge(obj);

	if (navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1) {
		return false;
	}
      this.createPoint(obj, this.getLocation);
    },
	  
    createPoint: function(obj, fun) {
      var box = document.createElement('div'),
	ball = document.createElement('div'),
	style = document.createElement('style'),
	body = document.getElementsByTagName('body')[0],
	head = document.getElementsByTagName('head')[0];
	style.innerText ='#myMouse{position:fixed;z-index:10000;border-radius:50%;left:0;top:0;pointer-events: none;backface-visibility:hidden;mix-blend-mode: difference;will-change:opacity;}#myMouse div{position: relative;transform: translate(-50%, -50%);border-radius:50%;background:' + obj.color + ';backface-visibility:hidden;transform-origin:center;pointer-events: none;display:flex;align-items:center;justify-content:center;transition:all .2s ease;opacity:' + (this.ifIe ? .6 : 1) + ';}#myMouse span{opacity:0;color:#000000;font-size:22px;font-weight:bold;}'
      head.appendChild(style);
      box.setAttribute('id', 'myMouse');
      ball.setAttribute('style', 'width:' + obj.size + 'px;height:' + obj.size + 'px;')
	ball.innerHTML = '<span id="myMouseText">More</span>';
      box.appendChild(ball);
      body.appendChild(box);
      fun.call(this, obj);
    },

    getLocation: function(obj) {
      var that = this,
	dom = document.getElementById('myMouse');
      dom.style.opacity = 1;
      window.onmousemove = function(e) {
        var e = window.event || e;
        that.updateLocation(e, obj);
      };
	that.iMouseBinding(obj);
	that.moreBinding(obj);
    },
		
    iMouseBinding: function(obj) {
      var dom = document.getElementById('myMouse');
      var iMouseDoms = document.getElementsByClassName(obj.changeClass);
      Array.prototype.forEach.call(iMouseDoms, function(ele, index) {
        ele.onmouseover = function() {
          dom.firstChild.style.width = obj.size * obj.multiple + 'px';
          dom.firstChild.style.height = obj.size * obj.multiple + 'px';
        }
        ele.onmouseleave = function() {
          dom.firstChild.style.width = obj.size + 'px';
          dom.firstChild.style.height = obj.size + 'px';
        }
      });
    },
		
    moreBinding:function (obj) {
	var dom = document.getElementById('myMouse');
	var domText = document.getElementById('myMouseText');
	var iMouseDoms = document.getElementsByClassName(obj.moreClass);
	Array.prototype.forEach.call(iMouseDoms, function(ele, index) {
		ele.onmousemove = function() {
			dom.firstChild.style.width = obj.size * obj.multiple + 'px';
			dom.firstChild.style.height = obj.size * obj.multiple + 'px';
		}
		ele.onmouseover = function() {
			domText.setAttribute('style','opacity:1;')
		}
		ele.onmouseleave = function() {
			domText.setAttribute('style','opacity:0;')
		}
	});
    },
		

    updateLocation: function(e, obj) {
			var dom = document.getElementById('myMouse');
			dom.setAttribute('style', 'transform:matrix(1,0,0,1,' + e.clientX + ',' + e.clientY +');-webkit-transform:matrix(1,0,0,1,' + e.clientX + ',' + e.clientY + ');-ms-transform:matrix(1,0,0,1,' + e.clientX + ',' + e.clientY + ');');
    },

    judge: function(obj) {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.ifIe = true;
        obj.multiple = 1;
      } else {
        this.ifIe = false;
      }
    }
  }

  if (typeof window != "undefined") {
    if (window.MyMouse) {
      window._MyMouse = window.MyMouse;
    }
    window.MyMouse = MyMouse;
  }

})();
