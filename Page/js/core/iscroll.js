/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
!function(a, b, c) {
    function f(a, c) {
        this.wrapper = "string" == typeof a ? b.querySelector(a) : a, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {resizeScrollbars: !0, mouseWheelSpeed: 20, snapThreshold: .334, startX: 0, startY: 0, scrollY: !0, directionLockThreshold: 5, momentum: !0, bounce: !0, bounceTime: 600, bounceEasing: "", preventDefault: !0, preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}, HWCompositing: !0, useTransition: !0, useTransform: !0};
        for (var d in c)
            this.options[d] = c[d];
        this.translateZ = this.options.HWCompositing && e.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = e.hasTransition && this.options.useTransition, this.options.useTransform = e.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? e.ease[this.options.bounceEasing] || e.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
    }
    function g(a, c, d) {
        var e = b.createElement("div"), f = b.createElement("div");
        return d === !0 && (e.style.cssText = "position:absolute;z-index:9999", f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), f.className = "iScrollIndicator", "h" == a ? (d === !0 && (e.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", f.style.height = "100%"), e.className = "iScrollHorizontalScrollbar") : (d === !0 && (e.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", f.style.width = "100%"), e.className = "iScrollVerticalScrollbar"), e.style.cssText += ";overflow:hidden", c || (e.style.pointerEvents = "none"), e.appendChild(f), e
    }
    function h(c, d) {
        this.wrapper = "string" == typeof d.el ? b.querySelector(d.el) : d.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = c, this.options = {listenX: !0, listenY: !0, interactive: !1, resize: !0, defaultScrollbars: !1, shrink: !1, fade: !1, speedRatioX: 0, speedRatioY: 0};
        for (var f in d)
            this.options[f] = d[f];
        this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (e.addEvent(this.indicator, "touchstart", this), e.addEvent(a, "touchend", this)), this.options.disablePointer || (e.addEvent(this.indicator, e.prefixPointerEvent("pointerdown"), this), e.addEvent(a, e.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (e.addEvent(this.indicator, "mousedown", this), e.addEvent(a, "mouseup", this))), this.options.fade && (this.wrapperStyle[e.style.transform] = this.scroller.translateZ, this.wrapperStyle[e.style.transitionDuration] = e.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
    }
    var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b) {
        a.setTimeout(b, 1e3 / 60)
    }, e = function() {
        function g(a) {
            return f === !1 ? !1 : "" === f ? a : f + a.charAt(0).toUpperCase() + a.substr(1)
        }
        var d = {}, e = b.createElement("div").style, f = function() {
            for (var b, a = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, d = a.length; d > c; c++)
                if (b = a[c] + "ransform", b in e)
                    return a[c].substr(0, a[c].length - 1);
            return!1
        }();
        d.getTime = Date.now || function() {
            return(new Date).getTime()
        }, d.extend = function(a, b) {
            for (var c in b)
                a[c] = b[c]
        }, d.addEvent = function(a, b, c, d) {
            a.addEventListener(b, c, !!d)
        }, d.removeEvent = function(a, b, c, d) {
            a.removeEventListener(b, c, !!d)
        }, d.prefixPointerEvent = function(b) {
            return a.MSPointerEvent ? "MSPointer" + b.charAt(9).toUpperCase() + b.substr(10) : b
        }, d.momentum = function(a, b, d, e, f, g) {
            var j, k, h = a - b, i = c.abs(h) / d;
            return g = void 0 === g ? 6e-4 : g, j = a + i * i / (2 * g) * (0 > h ? -1 : 1), k = i / g, e > j ? (j = f ? e - f / 2.5 * (i / 8) : e, h = c.abs(j - a), k = h / i) : j > 0 && (j = f ? f / 2.5 * (i / 8) : 0, h = c.abs(a) + j, k = h / i), {destination: c.round(j), duration: k}
        };
        var h = g("transform");
        return d.extend(d, {hasTransform: h !== !1, hasPerspective: g("perspective")in e, hasTouch: "ontouchstart"in a, hasPointer: a.PointerEvent || a.MSPointerEvent, hasTransition: g("transition")in e}), d.isBadAndroid = /Android /.test(a.navigator.appVersion) && !/Chrome\/\d/.test(a.navigator.appVersion), d.extend(d.style = {}, {transform: h, transitionTimingFunction: g("transitionTimingFunction"), transitionDuration: g("transitionDuration"), transitionDelay: g("transitionDelay"), transformOrigin: g("transformOrigin")}), d.hasClass = function(a, b) {
            var c = new RegExp("(^|\\s)" + b + "(\\s|$)");
            return c.test(a.className)
        }, d.addClass = function(a, b) {
            if (!d.hasClass(a, b)) {
                var c = a.className.split(" ");
                c.push(b), a.className = c.join(" ")
            }
        }, d.removeClass = function(a, b) {
            if (d.hasClass(a, b)) {
                var c = new RegExp("(^|\\s)" + b + "(\\s|$)", "g");
                a.className = a.className.replace(c, " ")
            }
        }, d.offset = function(a) {
            for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent; )
                b -= a.offsetLeft, c -= a.offsetTop;
            return{left: b, top: c}
        }, d.preventDefaultException = function(a, b) {
            for (var c in b)
                if (b[c].test(a[c]))
                    return!0;
            return!1
        }, d.extend(d.eventType = {}, {touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2, pointerdown: 3, pointermove: 3, pointerup: 3, MSPointerDown: 3, MSPointerMove: 3, MSPointerUp: 3}), d.extend(d.ease = {}, {quadratic: {style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(a) {
                    return a * (2 - a)
                }}, circular: {style: "cubic-bezier(0.1, 0.57, 0.1, 1)", fn: function(a) {
                    return c.sqrt(1 - --a * a)
                }}, back: {style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", fn: function(a) {
                    var b = 4;
                    return(a -= 1) * a * ((b + 1) * a + b) + 1
                }}, bounce: {style: "", fn: function(a) {
                    return(a /= 1) < 1 / 2.75 ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }}, elastic: {style: "", fn: function(a) {
                    var b = .22, d = .4;
                    return 0 === a ? 0 : 1 == a ? 1 : d * c.pow(2, -10 * a) * c.sin((a - b / 4) * 2 * c.PI / b) + 1
                }}}), d.tap = function(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(c, !0, !0), d.pageX = a.pageX, d.pageY = a.pageY, a.target.dispatchEvent(d)
        }, d.click = function(a) {
            var d, c = a.target;
            /(SELECT|INPUT|TEXTAREA)/i.test(c.tagName) || (d = b.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, a.view, 1, c.screenX, c.screenY, c.clientX, c.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), d._constructed = !0, c.dispatchEvent(d))
        }, d
    }();
    f.prototype = {version: "5.1.3", _init: function() {
            this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
        }, destroy: function() {
            this._initEvents(!0), this._execEvent("destroy")
        }, _transitionEnd: function(a) {
            a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        }, _start: function(a) {
            if (!(1 != e.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && e.eventType[a.type] !== this.initiated)) {
                !this.options.preventDefault || e.isBadAndroid || e.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
                var d, b = a.touches ? a.touches[0] : a;
                this.initiated = e.eventType[a.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = e.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, d = this.getComputedPosition(), this._translate(c.round(d.x), c.round(d.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = b.pageX, this.pointY = b.pageY, this._execEvent("beforeScrollStart")
            }
        }, _move: function(a) {
            if (this.enabled && e.eventType[a.type] === this.initiated) {
                this.options.preventDefault && a.preventDefault();
                var h, i, j, k, b = a.touches ? a.touches[0] : a, d = b.pageX - this.pointX, f = b.pageY - this.pointY, g = e.getTime();
                if (this.pointX = b.pageX, this.pointY = b.pageY, this.distX += d, this.distY += f, j = c.abs(this.distX), k = c.abs(this.distY), !(g - this.endTime > 300 && 10 > j && 10 > k)) {
                    if (this.directionLocked || this.options.freeScroll || (this.directionLocked = j > k + this.options.directionLockThreshold ? "h" : k >= j + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough)
                            a.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough)
                            return this.initiated = !1, void 0;
                        f = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough)
                            a.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough)
                            return this.initiated = !1, void 0;
                        d = 0
                    }
                    d = this.hasHorizontalScroll ? d : 0, f = this.hasVerticalScroll ? f : 0, h = this.x + d, i = this.y + f, (h > 0 || h < this.maxScrollX) && (h = this.options.bounce ? this.x + d / 3 : h > 0 ? 0 : this.maxScrollX), (i > 0 || i < this.maxScrollY) && (i = this.options.bounce ? this.y + f / 3 : i > 0 ? 0 : this.maxScrollY), this.directionX = d > 0 ? -1 : 0 > d ? 1 : 0, this.directionY = f > 0 ? -1 : 0 > f ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(h, i), g - this.startTime > 300 && (this.startTime = g, this.startX = this.x, this.startY = this.y)
                }
            }
        }, _end: function(a) {
            if (this.enabled && e.eventType[a.type] === this.initiated) {
                this.options.preventDefault && !e.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
                var d, f, g = (a.changedTouches ? a.changedTouches[0] : a, e.getTime() - this.startTime), h = c.round(this.x), i = c.round(this.y), j = c.abs(h - this.startX), k = c.abs(i - this.startY), l = 0, m = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = e.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(h, i), !this.moved)
                        return this.options.tap && e.tap(a, this.options.tap), this.options.click && e.click(a), this._execEvent("scrollCancel"), void 0;
                    if (this._events.flick && 200 > g && 100 > j && 100 > k)
                        return this._execEvent("flick"), void 0;
                    if (this.options.momentum && 300 > g && (d = this.hasHorizontalScroll ? e.momentum(this.x, this.startX, g, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {destination: h, duration: 0}, f = this.hasVerticalScroll ? e.momentum(this.y, this.startY, g, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {destination: i, duration: 0}, h = d.destination, i = f.destination, l = c.max(d.duration, f.duration), this.isInTransition = 1), this.options.snap) {
                        var n = this._nearestSnap(h, i);
                        this.currentPage = n, l = this.options.snapSpeed || c.max(c.max(c.min(c.abs(h - n.x), 1e3), c.min(c.abs(i - n.y), 1e3)), 300), h = n.x, i = n.y, this.directionX = 0, this.directionY = 0, m = this.options.bounceEasing
                    }
                    return h != this.x || i != this.y ? ((h > 0 || h < this.maxScrollX || i > 0 || i < this.maxScrollY) && (m = e.ease.quadratic), this.scrollTo(h, i, l, m), void 0) : (this._execEvent("scrollEnd"), void 0)
                }
            }
        }, _resize: function() {
            var a = this;
            clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                a.refresh()
            }, this.options.resizePolling)
        }, resetPosition: function(a) {
            var b = this.x, c = this.y;
            return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
        }, disable: function() {
            this.enabled = !1
        }, enable: function() {
            this.enabled = !0
        }, refresh: function() {
            this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = e.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
        }, on: function(a, b) {
            this._events[a] || (this._events[a] = []), this._events[a].push(b)
        }, off: function(a, b) {
            if (this._events[a]) {
                var c = this._events[a].indexOf(b);
                c > -1 && this._events[a].splice(c, 1)
            }
        }, _execEvent: function(a) {
            if (this._events[a]) {
                var b = 0, c = this._events[a].length;
                if (c)
                    for (; c > b; b++)
                        this._events[a][b].apply(this, [].slice.call(arguments, 1))
            }
        }, scrollBy: function(a, b, c, d) {
            a = this.x + a, b = this.y + b, c = c || 0, this.scrollTo(a, b, c, d)
        }, scrollTo: function(a, b, c, d) {
            d = d || e.ease.circular, this.isInTransition = this.options.useTransition && c > 0, !c || this.options.useTransition && d.style ? (this._transitionTimingFunction(d.style), this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, d.fn)
        }, scrollToElement: function(a, b, d, f, g) {
            if (a = a.nodeType ? a : this.scroller.querySelector(a)) {
                var h = e.offset(a);
                h.left -= this.wrapperOffset.left, h.top -= this.wrapperOffset.top, d === !0 && (d = c.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), f === !0 && (f = c.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), h.left -= d || 0, h.top -= f || 0, h.left = h.left > 0 ? 0 : h.left < this.maxScrollX ? this.maxScrollX : h.left, h.top = h.top > 0 ? 0 : h.top < this.maxScrollY ? this.maxScrollY : h.top, b = void 0 === b || null === b || "auto" === b ? c.max(c.abs(this.x - h.left), c.abs(this.y - h.top)) : b, this.scrollTo(h.left, h.top, b, g)
            }
        }, _transitionTime: function(a) {
            if (a = a || 0, this.scrollerStyle[e.style.transitionDuration] = a + "ms", !a && e.isBadAndroid && (this.scrollerStyle[e.style.transitionDuration] = "0.001s"), this.indicators)
                for (var b = this.indicators.length; b--; )
                    this.indicators[b].transitionTime(a)
        }, _transitionTimingFunction: function(a) {
            if (this.scrollerStyle[e.style.transitionTimingFunction] = a, this.indicators)
                for (var b = this.indicators.length; b--; )
                    this.indicators[b].transitionTimingFunction(a)
        }, _translate: function(a, b) {
            if (this.options.useTransform ? this.scrollerStyle[e.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = c.round(a), b = c.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px"), this.x = a, this.y = b, this.indicators)
                for (var d = this.indicators.length; d--; )
                    this.indicators[d].updatePosition()
        }, _initEvents: function(b) {
            var c = b ? e.removeEvent : e.addEvent, d = this.options.bindToWrapper ? this.wrapper : a;
            c(a, "orientationchange", this), c(a, "resize", this), this.options.click && c(this.wrapper, "click", this, !0), this.options.disableMouse || (c(this.wrapper, "mousedown", this), c(d, "mousemove", this), c(d, "mousecancel", this), c(d, "mouseup", this)), e.hasPointer && !this.options.disablePointer && (c(this.wrapper, e.prefixPointerEvent("pointerdown"), this), c(d, e.prefixPointerEvent("pointermove"), this), c(d, e.prefixPointerEvent("pointercancel"), this), c(d, e.prefixPointerEvent("pointerup"), this)), e.hasTouch && !this.options.disableTouch && (c(this.wrapper, "touchstart", this), c(d, "touchmove", this), c(d, "touchcancel", this), c(d, "touchend", this)), c(this.scroller, "transitionend", this), c(this.scroller, "webkitTransitionEnd", this), c(this.scroller, "oTransitionEnd", this), c(this.scroller, "MSTransitionEnd", this)
        }, getComputedPosition: function() {
            var c, d, b = a.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (b = b[e.style.transform].split(")")[0].split(", "), c = +(b[12] || b[4]), d = +(b[13] || b[5])) : (c = +b.left.replace(/[^-\d.]/g, ""), d = +b.top.replace(/[^-\d.]/g, "")), {x: c, y: d}
        }, _initIndicators: function() {
            function i(a) {
                for (var b = e.indicators.length; b--; )
                    a.call(e.indicators[b])
            }
            var d, a = this.options.interactiveScrollbars, b = "string" != typeof this.options.scrollbars, c = [], e = this;
            this.indicators = [], this.options.scrollbars && (this.options.scrollY && (d = {el: g("v", a, this.options.scrollbars), interactive: a, defaultScrollbars: !0, customStyle: b, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenX: !1}, this.wrapper.appendChild(d.el), c.push(d)), this.options.scrollX && (d = {el: g("h", a, this.options.scrollbars), interactive: a, defaultScrollbars: !0, customStyle: b, resize: this.options.resizeScrollbars, shrink: this.options.shrinkScrollbars, fade: this.options.fadeScrollbars, listenY: !1}, this.wrapper.appendChild(d.el), c.push(d))), this.options.indicators && (c = c.concat(this.options.indicators));
            for (var f = c.length; f--; )
                this.indicators.push(new h(this, c[f]));
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                i(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                i(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                i(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                i(function() {
                    this.fade(1, !0)
                })
            })), this.on("refresh", function() {
                i(function() {
                    this.refresh()
                })
            }), this.on("destroy", function() {
                i(function() {
                    this.destroy()
                }), delete this.indicators
            })
        }, _initWheel: function() {
            e.addEvent(this.wrapper, "wheel", this), e.addEvent(this.wrapper, "mousewheel", this), e.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                e.removeEvent(this.wrapper, "wheel", this), e.removeEvent(this.wrapper, "mousewheel", this), e.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        }, _wheel: function(a) {
            if (this.enabled) {
                a.preventDefault(), a.stopPropagation();
                var b, d, e, f, g = this;
                if (void 0 === this.wheelTimeout && g._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    g._execEvent("scrollEnd"), g.wheelTimeout = void 0
                }, 400), "deltaX"in a)
                    1 === a.deltaMode ? (b = -a.deltaX * this.options.mouseWheelSpeed, d = -a.deltaY * this.options.mouseWheelSpeed) : (b = -a.deltaX, d = -a.deltaY);
                else if ("wheelDeltaX"in a)
                    b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed, d = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta"in a)
                    b = d = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail"in a))
                        return;
                    b = d = -a.detail / 3 * this.options.mouseWheelSpeed
                }
                if (b *= this.options.invertWheelDirection, d *= this.options.invertWheelDirection, this.hasVerticalScroll || (b = d, d = 0), this.options.snap)
                    return e = this.currentPage.pageX, f = this.currentPage.pageY, b > 0 ? e-- : 0 > b && e++, d > 0 ? f-- : 0 > d && f++, this.goToPage(e, f), void 0;
                e = this.x + c.round(this.hasHorizontalScroll ? b : 0), f = this.y + c.round(this.hasVerticalScroll ? d : 0), e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), f > 0 ? f = 0 : f < this.maxScrollY && (f = this.maxScrollY), this.scrollTo(e, f, 0)
            }
        }, _initSnap: function() {
            this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                var b, e, f, g, i, l, a = 0, d = 0, h = 0, j = this.options.snapStepX || this.wrapperWidth, k = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0)
                        for (f = c.round(j / 2), g = c.round(k / 2); h > -this.scrollerWidth; ) {
                            for (this.pages[a] = [], b = 0, i = 0; i > - this.scrollerHeight; )
                                this.pages[a][b] = {x: c.max(h, this.maxScrollX), y: c.max(i, this.maxScrollY), width: j, height: k, cx: h - f, cy: i - g}, i -= k, b++;
                            h -= j, a++
                        }
                    else
                        for (l = this.options.snap, b = l.length, e = - 1; b > a; a++)
                            (0 === a || l[a].offsetLeft <= l[a - 1].offsetLeft) && (d = 0, e++), this.pages[d] || (this.pages[d] = []), h = c.max(-l[a].offsetLeft, this.maxScrollX), i = c.max(-l[a].offsetTop, this.maxScrollY), f = h - c.round(l[a].offsetWidth / 2), g = i - c.round(l[a].offsetHeight / 2), this.pages[d][e] = {x: h, y: i, width: l[a].offsetWidth, height: l[a].offsetHeight, cx: f, cy: g}, h > this.maxScrollX && d++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), 0 === this.options.snapThreshold % 1 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = c.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = c.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }), this.on("flick", function() {
                var a = this.options.snapSpeed || c.max(c.max(c.min(c.abs(this.x - this.startX), 1e3), c.min(c.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
            })
        }, _nearestSnap: function(a, b) {
            if (!this.pages.length)
                return{x: 0, y: 0, pageX: 0, pageY: 0};
            var d = 0, e = this.pages.length, f = 0;
            if (c.abs(a - this.absStartX) < this.snapThresholdX && c.abs(b - this.absStartY) < this.snapThresholdY)
                return this.currentPage;
            for (a > 0?a = 0:a < this.maxScrollX && (a = this.maxScrollX), b > 0?b = 0:b < this.maxScrollY && (b = this.maxScrollY); e > d; d++)
                if (a >= this.pages[d][0].cx) {
                    a = this.pages[d][0].x;
                    break
                }
            for (e = this.pages[d].length; e > f; f++)
                if (b >= this.pages[0][f].cy) {
                    b = this.pages[0][f].y;
                    break
                }
            return d == this.currentPage.pageX && (d += this.directionX, 0 > d ? d = 0 : d >= this.pages.length && (d = this.pages.length - 1), a = this.pages[d][0].x), f == this.currentPage.pageY && (f += this.directionY, 0 > f ? f = 0 : f >= this.pages[0].length && (f = this.pages[0].length - 1), b = this.pages[0][f].y), {x: a, y: b, pageX: d, pageY: f}
        }, goToPage: function(a, b, d, e) {
            e = e || this.options.bounceEasing, a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0), b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
            var f = this.pages[a][b].x, g = this.pages[a][b].y;
            d = void 0 === d ? this.options.snapSpeed || c.max(c.max(c.min(c.abs(f - this.x), 1e3), c.min(c.abs(g - this.y), 1e3)), 300) : d, this.currentPage = {x: f, y: g, pageX: a, pageY: b}, this.scrollTo(f, g, d, e)
        }, next: function(a, b) {
            var c = this.currentPage.pageX, d = this.currentPage.pageY;
            c++, c >= this.pages.length && this.hasVerticalScroll && (c = 0, d++), this.goToPage(c, d, a, b)
        }, prev: function(a, b) {
            var c = this.currentPage.pageX, d = this.currentPage.pageY;
            c--, 0 > c && this.hasVerticalScroll && (c = 0, d--), this.goToPage(c, d, a, b)
        }, _initKeys: function() {
            var d, c = {pageUp: 33, pageDown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40};
            if ("object" == typeof this.options.keyBindings)
                for (d in this.options.keyBindings)
                    "string" == typeof this.options.keyBindings[d] && (this.options.keyBindings[d] = this.options.keyBindings[d].toUpperCase().charCodeAt(0));
            else
                this.options.keyBindings = {};
            for (d in c)
                this.options.keyBindings[d] = this.options.keyBindings[d] || c[d];
            e.addEvent(a, "keydown", this), this.on("destroy", function() {
                e.removeEvent(a, "keydown", this)
            })
        }, _key: function(a) {
            if (this.enabled) {
                var j, b = this.options.snap, d = b ? this.currentPage.pageX : this.x, f = b ? this.currentPage.pageY : this.y, g = e.getTime(), h = this.keyTime || 0, i = .25;
                switch (this.options.useTransition && this.isInTransition && (j = this.getComputedPosition(), this._translate(c.round(j.x), c.round(j.y)), this.isInTransition = !1), this.keyAcceleration = 200 > g - h ? c.min(this.keyAcceleration + i, 50) : 0, a.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? d += b ? 1 : this.wrapperWidth : f += b ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? d -= b ? 1 : this.wrapperWidth : f -= b ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        d = b ? this.pages.length - 1 : this.maxScrollX, f = b ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        d = 0, f = 0;
                        break;
                    case this.options.keyBindings.left:
                        d += b ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        f += b ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        d -= b ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        f -= b ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                if (b)
                    return this.goToPage(d, f), void 0;
                d > 0 ? (d = 0, this.keyAcceleration = 0) : d < this.maxScrollX && (d = this.maxScrollX, this.keyAcceleration = 0), f > 0 ? (f = 0, this.keyAcceleration = 0) : f < this.maxScrollY && (f = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(d, f, 0), this.keyTime = g
            }
        }, _animate: function(a, b, c, f) {
            function l() {
                var n, o, p, m = e.getTime();
                return m >= k ? (g.isAnimating = !1, g._translate(a, b), g.resetPosition(g.options.bounceTime) || g._execEvent("scrollEnd"), void 0) : (m = (m - j) / c, p = f(m), n = (a - h) * p + h, o = (b - i) * p + i, g._translate(n, o), g.isAnimating && d(l), void 0)
            }
            var g = this, h = this.x, i = this.y, j = e.getTime(), k = j + c;
            this.isAnimating = !0, l()
        }, handleEvent: function(a) {
            switch (a.type) {
                case"touchstart":
                case"pointerdown":
                case"MSPointerDown":
                case"mousedown":
                    this._start(a);
                    break;
                case"touchmove":
                case"pointermove":
                case"MSPointerMove":
                case"mousemove":
                    this._move(a);
                    break;
                case"touchend":
                case"pointerup":
                case"MSPointerUp":
                case"mouseup":
                case"touchcancel":
                case"pointercancel":
                case"MSPointerCancel":
                case"mousecancel":
                    this._end(a);
                    break;
                case"orientationchange":
                case"resize":
                    this._resize();
                    break;
                case"transitionend":
                case"webkitTransitionEnd":
                case"oTransitionEnd":
                case"MSTransitionEnd":
                    this._transitionEnd(a);
                    break;
                case"wheel":
                case"DOMMouseScroll":
                case"mousewheel":
                    this._wheel(a);
                    break;
                case"keydown":
                    this._key(a);
                    break;
                case"click":
                    a._constructed || (a.preventDefault(), a.stopPropagation())
                }
        }}, h.prototype = {handleEvent: function(a) {
            switch (a.type) {
                case"touchstart":
                case"pointerdown":
                case"MSPointerDown":
                case"mousedown":
                    this._start(a);
                    break;
                case"touchmove":
                case"pointermove":
                case"MSPointerMove":
                case"mousemove":
                    this._move(a);
                    break;
                case"touchend":
                case"pointerup":
                case"MSPointerUp":
                case"mouseup":
                case"touchcancel":
                case"pointercancel":
                case"MSPointerCancel":
                case"mousecancel":
                    this._end(a)
                }
        }, destroy: function() {
            this.options.interactive && (e.removeEvent(this.indicator, "touchstart", this), e.removeEvent(this.indicator, e.prefixPointerEvent("pointerdown"), this), e.removeEvent(this.indicator, "mousedown", this), e.removeEvent(a, "touchmove", this), e.removeEvent(a, e.prefixPointerEvent("pointermove"), this), e.removeEvent(a, "mousemove", this), e.removeEvent(a, "touchend", this), e.removeEvent(a, e.prefixPointerEvent("pointerup"), this), e.removeEvent(a, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        }, _start: function(b) {
            var c = b.touches ? b.touches[0] : b;
            b.preventDefault(), b.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = c.pageX, this.lastPointY = c.pageY, this.startTime = e.getTime(), this.options.disableTouch || e.addEvent(a, "touchmove", this), this.options.disablePointer || e.addEvent(a, e.prefixPointerEvent("pointermove"), this), this.options.disableMouse || e.addEvent(a, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
        }, _move: function(a) {
            var c, d, f, g, b = a.touches ? a.touches[0] : a;
            e.getTime(), this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, c = b.pageX - this.lastPointX, this.lastPointX = b.pageX, d = b.pageY - this.lastPointY, this.lastPointY = b.pageY, f = this.x + c, g = this.y + d, this._pos(f, g), a.preventDefault(), a.stopPropagation()
        }, _end: function(b) {
            if (this.initiated) {
                if (this.initiated = !1, b.preventDefault(), b.stopPropagation(), e.removeEvent(a, "touchmove", this), e.removeEvent(a, e.prefixPointerEvent("pointermove"), this), e.removeEvent(a, "mousemove", this), this.scroller.options.snap) {
                    var d = this.scroller._nearestSnap(this.scroller.x, this.scroller.y), f = this.options.snapSpeed || c.max(c.max(c.min(c.abs(this.scroller.x - d.x), 1e3), c.min(c.abs(this.scroller.y - d.y), 1e3)), 300);
                    (this.scroller.x != d.x || this.scroller.y != d.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = d, this.scroller.scrollTo(d.x, d.y, f, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        }, transitionTime: function(a) {
            a = a || 0, this.indicatorStyle[e.style.transitionDuration] = a + "ms", !a && e.isBadAndroid && (this.indicatorStyle[e.style.transitionDuration] = "0.001s")
        }, transitionTimingFunction: function(a) {
            this.indicatorStyle[e.style.transitionTimingFunction] = a
        }, refresh: function() {
            this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (e.addClass(this.wrapper, "iScrollBothScrollbars"), e.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (e.removeClass(this.wrapper, "iScrollBothScrollbars"), e.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = c.max(c.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = c.max(c.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        }, updatePosition: function() {
            var a = this.options.listenX && c.round(this.sizeRatioX * this.scroller.x) || 0, b = this.options.listenY && c.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = c.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px"), a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = c.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = c.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px"), b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = c.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = a, this.y = b, this.scroller.options.useTransform ? this.indicatorStyle[e.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px", this.indicatorStyle.top = b + "px")
        }, _pos: function(a, b) {
            0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX), 0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY), a = this.options.listenX ? c.round(a / this.sizeRatioX) : this.scroller.x, b = this.options.listenY ? c.round(b / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(a, b)
        }, fade: function(a, b) {
            if (!b || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var c = a ? 250 : 500, d = a ? 0 : 300;
                a = a ? "1" : "0", this.wrapperStyle[e.style.transitionDuration] = c + "ms", this.fadeTimeout = setTimeout(function(a) {
                    this.wrapperStyle.opacity = a, this.visible = +a
                }.bind(this, a), d)
            }
        }}, f.utils = e, "undefined" != typeof module && module.exports ? module.exports = f : a.IScroll = f
}(window, document, Math);