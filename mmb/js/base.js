$(function(){
    setNowFontSize();

    function setNowFontSize() {
      
        var StandardWidth = 375;
        var StandardFontSize = 100;
        var maxFontSize = 200;
        var nowWidth = document.documentElement.offsetWidth;
        var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
        console.log(nowWidth);
        console.log(nowFontSize);
    
        if(nowFontSize > maxFontSize){
            nowFontSize = maxFontSize;
        }
        document.documentElement.style.fontSize = nowFontSize + 'px';
    }
	window.addEventListener('resize', setNowFontSize);
		move();
	function move(){
		// 悬浮球的移动
	    // 声明开始的距离 移动的Y  y的距离  到达的Y
    var startY = startX = moveY = moveX = distanceY = distanceX = currentY = currentX = 0 ;
    // 声明一个开关思想
    // 第一个开关检测点击后是否移动了  第二个是检测是否吸右边了  第三个是检测是否第一次还是多次点击移动了
    var kar = false;
    var clie = false;
    var pagez = false;
		// 手指按下事件
		$('.navbar').on('touchstart', function (e) {
			startY = e.touches[0].clientY
      startX = e.touches[0].clientX
		})
		// 移动事件
		$('.navbar').on('touchmove', function (e) {
      if(this.classList.contains('click')) {
        return false;
      }
			// 滑动的距离减去开始距离
			moveX = e.touches[0].clientX;
			moveY = e.touches[0].clientY;
			distanceY = moveY - startY;
      distanceX = moveX - startX;
      console.log("移动"+moveX,moveY);
      console.log($(document).width()-10);
        if(!clie) {
          distanceX =  moveX<=0?-10:distanceX;
          distanceX =  moveX>=$(document).width()-10?$(document).width()-40:distanceX;
          
        }else {
          distanceX =  moveX<=30?-$(document).width()+40:distanceX;
          distanceX =  moveX>=$(document).width()-10?10:distanceX;
        }

      // distanceX =  moveX>=$(document).width()-10?$(document).width()-40:distanceX;
      distanceY=  distanceY<=-70?-70:distanceY;
      distanceY=  distanceY>=$('body').height()-100?$('body').height()-100:distanceY;
      if (pagez) {
        $(this).css({
          transform: 'translate(' + (distanceX +currentX ) + 'px,' + (distanceY + currentY) + 'px)'
        });
      }else {
        $(this).css({
          transform: 'translate(' + distanceX  + 'px,' + distanceY+ 'px)'
        });

      }
      kar = true;
		})
		$('.navbar').on('touchend', function (e) {
      pagez = true;
      if(kar) {
        currentY = currentY + distanceY;
        currentX += distanceX;
        if(moveX > $(document).width()/2) {
          $(this).animate({
            transform: 'translate(' + ($('body').width()-50 )+ 'px,' + 0 + 'px)'
          });
          distanceX = startX =moveX  = currentX= $(document).width()-50 ;
          startY =  moveY   = distanceY  = currentY  = 0;
          clie = true;
        }else {
          $(this).animate({
            transform: 'translate(' + 0 + 'px,' + 0 + 'px)'
          });
        startY = startX = moveY =moveX = distanceY = distanceX = currentY = currentX = 0;
        clie = false;
        }
      }
      kar = false;
		})
		// 开关思想
		var i = 0;
		document.getElementsByClassName('navbar')[0].addEventListener('tap', function () {
		   
			if (i == 0) {
        if (clie) {
          $(this).animate({
            left:'-50px',
            top:   '50px'
          })
          
        }else {
          $(this).animate({
            left:'50px',
            top:   '50px'
          })
        }
        this.classList.add('click');
        i = 1;
			} else {
				this.classList.remove('click');
				i = 0;
				$(this).animate({
					left:'10px',
					top:   '70px'

				$(this).animate({
					left:'0.5rem',
					top:   '0.5rem'
				})
				this.classList.add('click');
				i = 1;
			} else {
			   
				this.classList.remove('click');
				i = 0;
				$(this).animate({
					left:'0.1rem',
					top:   '0.7rem'

				},)
			}
		})
	}



    //     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($, undefined){
    var prefix = '', eventPrefix,
      vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
      testEl = document.createElement('div'),
      supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
      transform,
      transitionProperty, transitionDuration, transitionTiming, transitionDelay,
      animationName, animationDuration, animationTiming, animationDelay,
      cssReset = {}
  
    function dasherize(str) { return str.replace(/([A-Z])/g, '-$1').toLowerCase() }
    function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() }
  
    if (testEl.style.transform === undefined) $.each(vendors, function(vendor, event){
      if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
        prefix = '-' + vendor.toLowerCase() + '-'
        eventPrefix = event
        return false
      }
    })
  
    transform = prefix + 'transform'
    cssReset[transitionProperty = prefix + 'transition-property'] =
    cssReset[transitionDuration = prefix + 'transition-duration'] =
    cssReset[transitionDelay    = prefix + 'transition-delay'] =
    cssReset[transitionTiming   = prefix + 'transition-timing-function'] =
    cssReset[animationName      = prefix + 'animation-name'] =
    cssReset[animationDuration  = prefix + 'animation-duration'] =
    cssReset[animationDelay     = prefix + 'animation-delay'] =
    cssReset[animationTiming    = prefix + 'animation-timing-function'] = ''
  
    $.fx = {
      off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
      speeds: { _default: 400, fast: 200, slow: 600 },
      cssPrefix: prefix,
      transitionEnd: normalizeEvent('TransitionEnd'),
      animationEnd: normalizeEvent('AnimationEnd')
    }
  
    $.fn.animate = function(properties, duration, ease, callback, delay){
      if ($.isFunction(duration))
        callback = duration, ease = undefined, duration = undefined
      if ($.isFunction(ease))
        callback = ease, ease = undefined
      if ($.isPlainObject(duration))
        ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
      if (duration) duration = (typeof duration == 'number' ? duration :
                      ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
      if (delay) delay = parseFloat(delay) / 1000
      return this.anim(properties, duration, ease, callback, delay)
    }
  
    $.fn.anim = function(properties, duration, ease, callback, delay){
      var key, cssValues = {}, cssProperties, transforms = '',
          that = this, wrappedCallback, endEvent = $.fx.transitionEnd,
          fired = false
  
      if (duration === undefined) duration = $.fx.speeds._default / 1000
      if (delay === undefined) delay = 0
      if ($.fx.off) duration = 0
  
      if (typeof properties == 'string') {
        // keyframe animation
        cssValues[animationName] = properties
        cssValues[animationDuration] = duration + 's'
        cssValues[animationDelay] = delay + 's'
        cssValues[animationTiming] = (ease || 'linear')
        endEvent = $.fx.animationEnd
      } else {
        cssProperties = []
        // CSS transitions
        for (key in properties)
          if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
          else cssValues[key] = properties[key], cssProperties.push(dasherize(key))
  
        if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
        if (duration > 0 && typeof properties === 'object') {
          cssValues[transitionProperty] = cssProperties.join(', ')
          cssValues[transitionDuration] = duration + 's'
          cssValues[transitionDelay] = delay + 's'
          cssValues[transitionTiming] = (ease || 'linear')
        }
      }
  
      wrappedCallback = function(event){
        if (typeof event !== 'undefined') {
          if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
          $(event.target).unbind(endEvent, wrappedCallback)
        } else
          $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout
  
        fired = true
        $(this).css(cssReset)
        callback && callback.call(this)
      }
      if (duration > 0){
        this.bind(endEvent, wrappedCallback)
        // transitionEnd is not always firing on older Android phones
        // so make sure it gets fired
        setTimeout(function(){
          if (fired) return
          wrappedCallback.call(that)
        }, ((duration + delay) * 1000) + 25)
      }
  
      // trigger page reflow so new elements can animate
      this.size() && this.get(0).clientLeft
  
      this.css(cssValues)
  
      if (duration <= 0) setTimeout(function() {
        that.each(function(){ wrappedCallback.call(this) })
      }, 0)
  
      return this
    }
  
    testEl = null
  })(Zepto)
})
