(function() {
    var c = location.pathname, a = $('[name="apple-itunes-app"]')[0];
    if ("/mobile/search.html" === c) {
        a.content += ", app-argument=bilibili://search/?keyword="
    } else {
        if ("/mobile/myspace.html" === c) {
            try {
                var b = window.sessionStorage && window.sessionStorage.bili_login_status && JSON.parse(window.sessionStorage.bili_login_status);
                b[1].isLogin && (a.content += ", app-argument=bilibili://user/" + b[3])
            } catch (d) {
            }
        }
    }
})();
(function(c) {
    c = function(o) {
        for (var n = location.search.substring(1).split("&"), l, f = 0, i = n.length; f < i; f++) {
            if (l = n[f].split("="), o == decodeURIComponent(l[0])) {
                return decodeURIComponent(l[1])
            }
        }
        return !1
    };
    var a = "baidu_aladdin baidu_wise qq_video_app qq_browser_app iqiyi_app uc_video 360_video lenovo_browser_app vc_browser_app yidian_app opera_browser_app 2345_app".split(" ");
    try {
        var b = c("bilibili_from") || c("from");
        b && b && -1 < a.indexOf(b) && sessionStorage.setItem("bili_app_from", b)
    } catch (d) {
        navigator.userAgent.search(/iphone|ipad|safari/i) ? console.log("\u5927\u54e5\u4f60\u5728\u770b\u5565\u5462,\u8981\u7528\u9690\u79c1\u6a21\u5f0f") : console.log("\u597dlow\u7684\u624b\u673a\u554a...")
    }
})(jQuery);
(function(i) {
    function d(h, m) {
        var n = h[p], n = n && a[n];
        if (void 0 === m) {
            return n || f(h)
        }
        if (n) {
            if (m in n) {
                return n[m]
            }
            var g = c(m);
            if (g in n) {
                return n[g]
            }
        }
        return b.call(i(h), m)
    }
    function f(g, m, n) {
        var e = g[p] || (g[p] = ++i.uuid);
        g = a[e] || (a[e] = l(g));
        void 0 !== m && (g[c(m)] = n);
        return g
    }
    function l(g) {
        var h = {};
        i.each(g.attributes || o, function(m, e) {
            0 == e.name.indexOf("data-") && (h[c(e.name.replace("data-", ""))] = i.zepto.deserializeValue(e.value))
        });
        return h
    }
    if ("undefined" != typeof Zepto) {
        var a = {}, b = i.fn.data, c = i.camelCase, p = i.expando = "Zepto" + +new Date, o = [];
        i.fn.data = function(g, h) {
            return void 0 === h ? i.isPlainObject(g) ? this.each(function(m, e) {
                i.each(g, function(n, q) {
                    f(e, n, q)
                })
            }) : 0 in this ? d(this[0], g) : void 0 : this.each(function() {
                f(this, g, h)
            })
        };
        i.fn.removeData = function(g) {
            "string" == typeof g && (g = g.split(/\s+/));
            return this.each(function() {
                var e = this[p], h = e && a[e];
                h && i.each(g || h, function(m) {
                    delete h[g ? c(this) : m]
                })
            })
        };
        ["remove", "empty"].forEach(function(g) {
            var h = i.fn[g];
            i.fn[g] = function() {
                var e = this.find("*");
                "remove" === g && (e = e.add(this));
                e.removeData();
                return h.call(this)
            }
        })
    }
})($);
(function(c) {
    var a = location.hostname, b = location.pathname;
    c(".nav-item").removeClass("on");
    if ("www.bilibili.com" === a) {
        switch (b) {
            case"/mobile/index.html":
                c(".nav-index").addClass("on");
                break;
            case"/mobile/channel.html":
            case"/mobile/subchannel.html":
                c(".nav-channel").addClass("on");
                break;
            case"/mobile/myspace.html":
            case"/mobile/history.html":
                c(".nav-space").addClass("on");
                break;
            case"/mobile/rank.html":
                c(".nav-rank").addClass("on")
        }
    } else {
        "live.bilibili.com" === a ? c(".nav-live").addClass("on") : "space.bilibili.com" === a && c(".nav-space").addClass("on")
    }
})($);
(function(c) {
    function a(d) {
        this.options = {appendTo: "body", target: null, container: '<ul class="bilibili-suggest"></ul>', css: {}, position: null, positionOffset: {top: 0, left: 0}, minLength: 1, delay: 300, disabled: !1, menuItem: "menuItem", useBuffer: !0, source: null, defaultSource: null, renderMenu: this.renderMenu, renderItem: this.renderItem, create: function() {
            }, select: function() {
            }, change: function() {
            }, search: function() {
            }, open: function() {
            }, close: function() {
            }, focus: function() {
            }};
        this.merge(d);
        this.options._super = this;
        this.namespace = "bilibiliSuggest";
        this.$container = c(this.options.container);
        this.$target = c(this.options.target);
        this.elements = this._getMenuItem();
        this.source = {};
        this.value = this._value();
        this.selectedItem = null;
        this.tempValue = this.value;
        this.delayTimer = null;
        this.dataBuffer = {};
        this.loading = this.enterLock = 0
    }
    var b = 0;
    a.prototype = {escapeRegex: function(d) {
            return d.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function(g, f) {
            var d = RegExp(this.escapeRegex(f), "i");
            return c.grep(g, function(h) {
                return d.test(h.label || h.value || h)
            })
        }, init: function() {
            var f = this;
            this._create();
            this._initSource("source");
            this._initSource("defaultSource");
            var d = this.namespace;
            this.$target.data(d, this);
            this.options.target.off("." + d);
            this.options.target.on("input." + d, function(e) {
                f._change(e)
            }).on("focusout." + d, function(e) {
                f.cancelBlur ? delete f.cancelBlur : (clearTimeout(f.delayTimer), f._close(e))
            }).on("focus." + d, function(e) {
                f._change(e)
            });
            return this
        }, _change: function(d) {
            this.options.disabled || (this.value = this._value(), this.tempValue == this.value && "focus" != d.type) || (this.tempValue = this.value, d.stopPropagation(), this.search(d), this._trigger("change", d, {item: this.selectedItem}))
        }, _isActive: function() {
            return"block" == this.$container.css("display") && this.selectedItem
        }, _getMenuItem: function() {
            return this.$container.find("[role=" + this.options.menuItem + "]")
        }, _getMenuItemFocused: function() {
            return this._getMenuItem().filter(".focus")
        }, merge: function(f) {
            if ("object" == typeof f) {
                for (var d in this.options) {
                    f.hasOwnProperty(d) && (this.options[d] = f[d])
                }
            }
        }, _trigger: function() {
            var f = Array.prototype.slice.call(arguments, 0), d = f.shift();
            if (this.options[d]) {
                return this.options[d].apply(this, f)
            }
        }, _create: function() {
            this.setPos();
            this.$container.appendTo(this.options.appendTo).hide();
            "object" == typeof this.options.css && this.$container.css(this.options.css);
            this._trigger("create", this.$container)
        }, enable: function() {
            this.options.disabled = !1
        }, disable: function() {
            clearTimeout(this.delayTimer);
            this.options.disabled = !0
        }, destroy: function() {
            clearTimeout(this.delayTimer);
            this.$target.removeData(this.namespace);
            this.$target.off("." + this.namespace);
            this.$container.remove()
        }, setPos: function() {
            var d = this.options.position || {};
            this.options.position || (d.top = this.$target.offset().top + this.$target.height() + parseInt(this.$target.css("padding-top")) + parseInt(this.$target.css("padding-bottom")), d.left = this.$target.offset().left);
            this.$container.css({top: d.top + this.options.positionOffset.top, left: d.left + this.options.positionOffset.left})
        }, getPos: function() {
            return{top: this.$target.offset().top + this.$target.height() + parseInt(this.$target.css("padding-top")) + parseInt(this.$target.css("padding-bottom")) + this.options.positionOffset.top, left: this.$target.offset().left + this.options.positionOffset.left}
        }, _open: function(d) {
            this.setPos();
            this.$container.show();
            this._trigger("open", this.$container, d)
        }, _close: function(d) {
            this.$container.hide();
            this._trigger("close", this.$container, d)
        }, _initSource: function(g) {
            var f, d, i = this;
            c.isArray(this.options[g]) ? (f = this.options[g], this.source[g] = function(l, h) {
                h(i.filter(f, l.term))
            }) : "string" === typeof this.options[g] ? (d = this.options[g], this.source[g] = function(l, h) {
                i.xhr && i.xhr.abort();
                i.xhr = c.ajax({url: d, data: l, dataType: "json", success: function(m) {
                        h(m)
                    }, error: function() {
                        h([])
                    }})
            }) : this.source[g] = this.options[g]
        }, search: function(f) {
            var d = this;
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(function() {
                d.selectedItem = null;
                d._search(null, f)
            }, this.options.delay)
        }, _search: function(g, f) {
            g = null != g ? g : this._value();
            this.value = this._value();
            var d = "source";
            if (!this._value()) {
                d = "defaultSource"
            } else {
                if (this._value().length < this.options.minLength) {
                    this._close(f);
                    return
                }
            }
            !1 === this._trigger("search", f) ? this._close(f) : this.options.useBuffer && "undefined" != typeof this.dataBuffer[g] && !c.isArray(this.source[d]) ? this._response(this.dataBuffer[g]) : this.source[d] && (this.loading++, this.$container.addClass("loading"), this.source[d]({term: g}, this.response(g)))
        }, response: function(h) {
            var f = this, d = ++b;
            return function() {
                h && (f.dataBuffer[h] = arguments[0]);
                d === b && f._response.apply(f, arguments);
                f.loading--;
                f.loading || f.$container.removeClass("loading")
            }
        }, _response: function(d) {
            d = this._normalize(d);
            this.render(d)
        }, render: function(f) {
            this.$container.empty();
            var d = this;
            this.options.disabled || !f || !f.length || this.cancelSearch ? this._close() : (this._open(), this._renderMenu(this.$container, f), this.elements = this._getMenuItem(), this.elements.on("mousedown", function(g) {
                g.preventDefault();
                d.cancelBlur = !0;
                d._delay(function() {
                    delete d.cancelBlur
                })
            }).on("click", function(g) {
                var h = c(this);
                d.selectedItem = h;
                d._focus(g);
                d._select(g)
            }))
        }, _renderMenu: function(f, d) {
            this._trigger("renderMenu", f, d)
        }, renderMenu: function(g, f) {
            var d = this;
            c.each(f, function(i, e) {
                d._renderItem(g, e)
            })
        }, _renderItem: function(f, d) {
            this._trigger("renderItem", f, d).attr("role", this.options.menuItem).data("item", d)
        }, renderItem: function(f, d) {
            return c("<li>").addClass("suggest-item").attr({"data-value": d.value}).append(c("<div>").text(d.value)).appendTo(f)
        }, _normalize: function(d) {
            return d.length && d[0].label && d[0].value ? d : c.map(d, function(f) {
                return"string" === typeof f ? {label: f, value: f} : c.extend({label: f.label || f.value, value: f.value || f.label}, f)
            })
        }, _select: function(f) {
            var d = this.selectedItem.data("item");
            if (!this.enterLock || f.originalEvent && !/^key/.test(f.originalEvent.type)) {
                this.value = this.tempValue = this._value(d.value)
            }
            this._trigger("select", f, {item: d});
            this._close()
        }, _focus: function(f) {
            var d = this.selectedItem.data("item");
            !0 === this._trigger("focus", f, {item: d}) && (f.originalEvent && /^key/.test(f.originalEvent.type)) && this._value(d.value)
        }, _value: function(d) {
            d && this.$target.val(d);
            return this.$target.val()
        }, _delay: function(d) {
            setTimeout(d, 0)
        }};
    c.fn.bilibiliSuggestion = function(d) {
        d = d || {};
        d.target = this;
        return(new a(d)).init()
    }
})($);
(function() {
    function i(m) {
        var n = this, e = function() {
            $.getScript("http://interface.bilibili.com/nav.js").done(function() {
                n.isLogged = User.biliLoginStatus && User.biliLoginStatus.isLogin;
                n.userId = window.uid;
                n.init();
                m.init()
            }).fail(function() {
                n.isLogged = !1;
                n.init();
                m.init()
            })
        };
        try {
            var g = window.sessionStorage && window.sessionStorage.bili_login_status;
            (g = JSON.parse(g)) && Date.now() < g[0] && (!__GetCookie("DedeUserID") && void 0 === g[3] || parseInt(__GetCookie("DedeUserID")) == g[3]) ? (this.isLogged = User.biliLoginStatus && User.biliLoginStatus.isLogin, this.userId = g[3], this.init(), m.init()) : e()
        } catch (h) {
            e()
        }
    }
    function d(m) {
        var n = this;
        this.app = m;
        var e = function() {
            $.getScript("http://interface.bilibili.com/nav.js").done(function() {
                n.isLogged = User.biliLoginStatus && User.biliLoginStatus.isLogin;
                n.userId = window.uid;
                n.init();
                m.init()
            }).fail(function() {
                n.isLogged = !1;
                n.init();
                m.init()
            })
        };
        try {
            var g = window.sessionStorage && window.sessionStorage.bili_login_status;
            (g = JSON.parse(g)) && Date.now() < g[0] && (!__GetCookie("DedeUserID") && null == g[3] || parseInt(__GetCookie("DedeUserID")) == g[3]) ? (this.isLogged = g[1].isLogin, this.userId = g[3], this.init(), m.init()) : e()
        } catch (h) {
            e()
        }
    }
    var f, l, a, b, c, p, o, v = function(h, m) {
        function e() {
            this.constructor = h
        }
        for (var g in m) {
            m.hasOwnProperty(g) && (h[g] = m[g])
        }
        e.prototype = m.prototype;
        h.prototype = new e;
        h.__super__ = m.prototype;
        return h
    };
    window.Zepto && $.extend($, {getScript: function(h, m, e) {
            var g = document.createElement("script");
            g.async = "async";
            g.src = h;
            e && (g.onload = e);
            document.getElementsByTagName(m || "head")[0].appendChild(g)
        }});
    Date.prototype.toYMD = function() {
        var g, h, e;
        g = String(this.getFullYear());
        h = String(this.getMonth() + 1);
        1 == h.length && (h = "0" + h);
        e = String(this.getDate());
        1 == e.length && (e = "0" + e);
        return g + "-" + h + "-" + e
    };
    f = function() {
        return function(h, m, e) {
            var g;
            this.application = h;
            this._selector = m;
            this.parent = h.container;
            this.config = this.config || {};
            for (g in this.config) {
                e && e.hasOwnProperty(g) && (this.config[g] = e[g])
            }
            if (this._selector instanceof $ || "object" === typeof this._selector && void 0 !== this._selector.selector) {
                this.container = this._selector
            }
            "string" === typeof this._selector && (this.container = $(this._selector))
        }
    }();
    l = function() {
        function e() {
            this.map = {};
            this.TYPES = null
        }
        e.prototype.init = function(m) {
            if (m) {
                this.TYPES = m;
                for (var g in m) {
                    for (var h in m[g]) {
                        this.map[m[g][h].tid] = g
                    }
                }
            }
        };
        e.prototype.prev = function(g) {
            return this.map[g]
        };
        e.prototype.children = function(g) {
            return this.TYPES ? this.TYPES[g] : null
        };
        e.prototype.sibling = function(g) {
            return this.children(this.prev(g))
        };
        return e
    }();
    a = function() {
        function e(h) {
            this.config = {distance: 100, defaultImg: "http://static.hdslb.com/images/v3images/img_loading.png"};
            for (var g in this.config) {
                h && h.hasOwnProperty(g) && (this.config[g] = h[g])
            }
            this.covers = [];
            this._selector = "[data-img]";
            this.callback = null;
            this.init()
        }
        e.prototype.lazy = function(m, g) {
            var h = this;
            m.find(this._selector).each(function(q, n) {
                "undefined" != typeof $(n).attr("loaded") && null != $(n).attr("loaded") || h.covers.push(n)
            });
            this.callback = g || null;
            this.show()
        };
        e.prototype.init = function() {
            var g = this;
            $(window).scroll(function() {
                g.show()
            });
            $(window).on("orientationchange", function() {
                g.show()
            })
        };
        e.prototype.show = function() {
            for (var m = 0; m < this.covers.length; m++) {
                var g = $(this.covers[m]), h = g.attr("data-img");
                g.attr("loaded") || (g.css({"background-image": "url(" + this.config.defaultImg + ")"}), g.offset().top < $(window).scrollTop() + $(window).height() + this.config.distance && (this.load(g, h, this.callback), this.covers.splice(m, 1), m--))
            }
        };
        e.prototype.load = function(q, g, m) {
            var n = $("<img />"), h = $("<div>").addClass("cover-img").css("opacity", 0).appendTo(q);
            n.attr("src", g);
            n.on("load", function() {
                q.css({"background-image": ""});
                h.css({"background-image": "url(" + g + ")", opacity: 1});
                m && "function" == typeof m && m(q)
            });
            q.attr("loaded", "loaded");
            n.error(function() {
                h.remove()
            })
        };
        return e
    }();
    ListEffect = function() {
        function e(h) {
            this.config = {distance: 0, selector: ".list-item"};
            for (var g in this.config) {
                h && h.hasOwnProperty(g) && (this.config[g] = h[g])
            }
            this.listItems = [];
            this._selector = this.config.selector;
            this.callback = null;
            this.init()
        }
        e.prototype.lazy = function(m, g) {
            var h = this;
            $(m).find(this._selector).each(function(q, n) {
                $(n).hasClass("in") || h.listItems.push(n)
            });
            this.callback = g || null;
            this.show()
        };
        e.prototype.init = function() {
            var g = this;
            $(window).scroll(function() {
                g.show()
            });
            $(window).on("orientationchange", function() {
                g.show()
            })
        };
        e.prototype.show = function() {
            for (var h = 0; h < this.listItems.length; h++) {
                var g = $(this.listItems[h]);
                g.hasClass("in") || (g.addClass("out"), g.offset().top < $(window).scrollTop() + $(window).height() + this.config.distance && (this.render(g, this.callback), this.listItems.splice(h, 1), h--))
            }
        };
        e.prototype.render = function(h, g) {
            h.removeClass("out").addClass("in");
            g && "function" == typeof g && g(h)
        };
        return e
    }();
    b = function() {
        function e() {
            this.queue = {};
            this.cache = []
        }
        e.prototype.ajax = function(m) {
            var g = this;
            if (!this.push($.extend({}, m))) {
                if ($.extend(m, {success: function(q, n, r) {
                        g.cache[m.url] = q;
                        for (var s; s = g.queue[m.url].shift(); ) {
                            s.success.apply(this, arguments)
                        }
                    }, error: function(q, n, r) {
                        for (var s; s = g.queue[m.url].shift(); ) {
                            s.error.apply(this, arguments)
                        }
                    }}), m.useBuffer && this.cache[m.url]) {
                    for (var h; h = this.queue[m.url].shift(); ) {
                        h.success(this.cache[m.url])
                    }
                } else {
                    $.ajax(m)
                }
            }
        };
        e.prototype.push = function(g) {
            this.queue[g.url] = this.queue[g.url] || [];
            this.queue[g.url].push(g);
            return 1 < this.queue[g.url].length ? !0 : !1
        };
        return e
    }();
    c = function() {
        function e(g) {
            this.params = {};
            if ("undefined" != typeof g && (this.params = "string" == typeof g || g instanceof $ ? {item: g} : g, this.obj = $(this.params.item), this.obj.length)) {
                this.obj.hasClass("b-slt") || (this.obj = this.obj.find(".b-slt"));
                this._open = !1;
                if ("undefined" != typeof this.params.onInit) {
                    this.params.onInit(this.obj)
                }
                0 == this.obj.children().length || this.params.selectorData ? this.obj = this.createMenu(this.obj) : this.list = $(this.params.list);
                this.init()
            }
        }
        e.bind = function(g) {
            return new e(g)
        };
        e.create = function(t) {
            var g = $('<div class="b-slt"></div>');
            $("<span>").addClass("txt").appendTo(g);
            $("<div>").addClass("b-slt-arrow").appendTo(g);
            var m;
            m = t.list ? $(t.list) : $("<div>").addClass("b-slt-list").append("<ul></ul>").appendTo("body");
            t.wrapper && g.wrap(t.wrapper);
            for (var q = t.items || [], h = 0; h < q.length; h++) {
                var n = q[h], s = $("<li></li>").text(n.name).appendTo(m.find("ul"));
                n.selected && s.attr("selected", "selected");
                if (n.attributes) {
                    for (var r in n.attributes) {
                        s.attr(r, n.attributes[r])
                    }
                }
            }
            t.wrapper && (g = g.parent());
            return g
        };
        e.prototype.init = function() {
            var m = this.obj, g = this, h = this.list.find("[selected]");
            0 == h.length && (h = this.list.find("li").eq(0).attr("selected", "selected"));
            m.find(".txt").html(h.html());
            m.off("click.selectMenu");
            m.on("click", function(n) {
                g._tap(n)
            });
            this.list.find("li").off("click.selectMenu");
            this.list.on("click", "li", function(n) {
                n.stopPropagation();
                g.select(n, $(this))
            })
        };
        e.prototype._mover = function(h) {
            h.stopPropagation();
            var g = this;
            this.obj.addClass("on");
            this.list.show();
            this.open = !0;
            this.setPos(this.list);
            $("body").off("click.selectMenu");
            $("body").one("click.selectMenu", function(m) {
                g._mout(m)
            })
        };
        e.prototype._mout = function(g) {
            this.obj.removeClass("on");
            this.list.hide();
            this.open = !1;
            $("body").off("click.selectMenu")
        };
        e.prototype._tap = function(g) {
            this.open ? this._mout(g) : this._mover(g)
        };
        e.prototype.select = function(h, g) {
            this._mout(h);
            if (!g.attr("selected") && !g.attr("disabled") && ($("li", this.list).removeAttr("selected"), g.attr("selected", "selected"), $(".txt", this.obj).html(g.html()), "undefined" != typeof this.params.onChange)) {
                this.params.onChange(g)
            }
        };
        e.prototype.createMenu = function(m) {
            $("<span>").addClass("txt").appendTo(m);
            $("<div>").addClass("b-slt-arrow").appendTo(m);
            var g = this.params;
            this.list = g.list ? $(g.list) : $("<div>").addClass("b-slt-list").append("<ul></ul>").appendTo("body");
            "undefined" != typeof g.createList && g.createList(this.list);
            if ("undefined" != typeof g.selectorData) {
                for (var h in g.selectorData) {
                    this.add(g.selectorData[h].name, g.selectorData[h].attributes)
                }
            }
            return m
        };
        e.prototype.add = function(n, g) {
            var h = $("<li>").html(n).appendTo(this.list.find("ul"));
            if ("undefined" != typeof g) {
                for (var m in g) {
                    h.attr(m, g[m])
                }
            }
            return h
        };
        e.prototype.setPos = function(g) {
            this.list.css({top: this.obj.offset().top + this.obj.height() + parseInt(this.obj.css("padding-top")) + parseInt(this.obj.css("padding-bottom")) + 5})
        };
        return e
    }();
    window.__GetCookie = function(h) {
        var m = "" + document.cookie, e = m.indexOf(h + "=");
        if (-1 == e || "" == h) {
            return""
        }
        var g = m.indexOf(";", e);
        -1 == g && (g = m.length);
        return unescape(m.substring(e + h.length + 1, g))
    };
    window.__SetCookie = function(h, m, e) {
        e = e || 365;
        var g = new Date;
        g.setTime(g.getTime() + 86400000 * e);
        document.cookie = h + "=" + escape(m) + ";expires=" + g.toGMTString() + "; path=/; domain=.bilibili.com"
    };
    window.__GetUrlValue = function(e) {
        e = RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
        e = window.location.search.substr(1).match(e);
        if (null != e) {
            try {
                return decodeURIComponent(e[2])
            } catch (g) {
            }
        }
        return null
    };
    window.ChatGetSettings = function(e) {
        return"undefined" != typeof localStorage && localStorage && localStorage.getItem ? localStorage.getItem(e) : __GetCookie(e)
    };
    window.ChatSaveSettings = function(e, g) {
        return"undefined" != typeof localStorage && localStorage && localStorage.setItem ? localStorage.setItem(e, g) : __SetCookie(e, g)
    };
    window.GetRandomString = function(m) {
        for (var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), e = "", g = 0; g < m; g++) {
            var h = Math.floor(62 * Math.random()), e = e + n[h]
        }
        return e
    };
    window.formatFriendlyNumber = function(n, q) {
        if (void 0 === n || "string" == typeof n && isNaN(parseInt(n))) {
            return"--"
        }
        var e = {"\u4e07": 10000};
        q = "string" == typeof q ? q : "\u4e07";
        e = e[q] || e["\u4e07"];
        if (!("string" == typeof n && 0 <= n.indexOf(q))) {
            if ("string" == typeof n && 0 <= n.indexOf(",")) {
                for (var h = n.split(","), m = "", g = 0; g < h.length; g++) {
                    m += h[g]
                }
                n = m
            }
            n = parseInt(n);
            n >= e && (n = (n / e).toFixed(1) + q);
            return n
        }
    };
    window.User = function() {
        function e() {
            this.loginCallbacks = window.loginCallbacks = [];
            this.biliLoginStatus = null
        }
        e.prototype.onLoginInfoLoaded = function(g) {
            this.biliLoginStatus ? g(this.biliLoginStatus) : this.loginCallbacks.push(g)
        };
        e.prototype.loadLoginInfo = function(m, g) {
            window.biliLoginStatus = this.biliLoginStatus = m;
            this.onLogin(m);
            if (!g && window.sessionStorage) {
                var h = [(new Date).getTime() + 300000];
                h.push(m);
                h.push(window.AttentionList);
                h.push(window.uid);
                window.sessionStorage.bili_login_status = JSON.stringify(h)
            }
            for (h = 0; h < this.loginCallbacks.length; h++) {
                this.loginCallbacks[h](m)
            }
        };
        e.prototype.loadLoginStatus = function() {
            var m, g = function() {
                $.getScript("http://interface.bilibili.com/nav.js", "body")
            };
            try {
                window.sessionStorage && (m = window.sessionStorage.bili_login_status) && (m = JSON.parse(m)) && (new Date).getTime() < m[0] && (!__GetCookie("DedeUserID") && void 0 === m[3] || parseInt(__GetCookie("DedeUserID")) == m[3]) ? (window.AttentionList = m[2], window.uid = m[3], this.loadLoginInfo(m[1], !0)) : g()
            } catch (h) {
                g()
            }
        };
        e.prototype.onLogin = function(h) {
            var g = $("#user_status");
            h.isLogin ? ($("[guest=false]", g).show(), $("[guest=true]", g).hide(), $("#user_face", g).append('<img src="' + h.face + '" alt="' + h.uname + '"/>'), $(".login").append('<div class="user_detail"><span id="user_money">\u786c\u5e01:' + h.money + '</span><span id="user_name">' + h.uname + "</span></div>"), $('<div class="info-wrp"><a class="logout" href="https://secure.bilibili.com/login?act=exit"><i class="icons exit"></i>\u6ce8\u9500</a></div>').appendTo(".login")) : ($("[guest=true]", g).show(), $("[guest=false]", g).hide())
        };
        return new e
    }();
    window.loadLoginInfo = function(e) {
        return window.User.loadLoginInfo(e)
    };
    window.channelCount = function(e) {
        $.getScript("http://www.bilibili.com/online.js").done(function() {
            var n, g;
            if (countInfo) {
                for (n in countInfo) {
                    if (countInfo.hasOwnProperty(n) && (g = countInfo[n], !(0 >= g))) {
                        var h = $(".channel-" + n), m = $('<span class="channel-num" />');
                        10 > g && m.addClass("channel-singular");
                        g = 99 < g ? "99+" : g;
                        m.text(g);
                        h.append(m)
                    }
                }
            }
            e.init()
        }).fail(function() {
            e.init()
        })
    };
    window.HashManage = {_change: function(t, w) {
            var x = location.hash, y = {}, r = "", m = 0;
            x && (x = x.substring(1), "!" == x[0] && (x = x.substring(1)));
            for (var x = x.split("&"), A = 0; A < x.length; A++) {
                var s = x[A].split("=")[0], q = x[A].split("=")[1];
                s && (y[s] = q)
            }
            if ("object" == typeof t) {
                for (var n in t) {
                    (x = t[n]) ? y[n] = x : !1 === x && delete y[n]
                }
            } else {
                if (w) {
                    y[t] = w
                } else {
                    if (!1 === w) {
                        delete y[t]
                    } else {
                        return"undefined" == typeof t ? y : y[t] || null
                    }
                }
            }
            for (var u in y) {
                r = 0 != m ? r + "&" : r + "!", r += u + "=" + y[u], m++
            }
            location.hash = r;
            return y
        }, get: function(e) {
            return this._change(e, null)
        }, set: function(e, g) {
            return this._change(e, g)
        }, clear: function() {
            location.hash = ""
        }};
    p = function() {
        function e() {
            this.searchHost = "http://www.bilibili.com/search";
            this.suggestHost = "http://s.search.bilibili.com/main/suggest?jsoncallback=?";
            this.historyMaxCount = 5;
            this.ajaxQueue = new b;
            this.searchSuggest = {};
            this.isSearchPage = !1;
            this.init()
        }
        function g(h) {
            return String(h).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }
        e.prototype = {init: function() {
                this.$form = $("#search_form");
                this.$searchWrapper = $(".search-wrapper");
                $(".search-bar") && $(".search-bar").length ? (this.$searchBar = $(".search-bar"), this.$input = this.$form.find('input[name="keyword"]')) : $(".search-top") && $(".search-top").length && (this.$searchWrapper.addClass("search-page"), this.isSearchPage = !0, this.$emptyBtn = $(".search-top .close-icon"), this.$searchWrapper.prepend('<div class="search-bar"><form action="/mobile/search.html" method="GET" id="search_page_form"><input name="keyword" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="\u641c\u7d22\u89c6\u9891\u3001\u756a\u5267\u3001up\u4e3b\u6216AV\u53f7" /></form><i class="bili-icon-search search-icon"></i><i class="bili-icon-circle-del close-icon"></i><a class="search-cancel">\u53d6\u6d88</a></div>'), this.$showPanel = this.$form.find('input[name="keyword"]'), this.$form = $("#search_page_form"), this.$input = this.$form.find('input[name="keyword"]'), this.$searchBar = $(".search-wrapper .search-bar"), this.$cancelBtn = $(".search-wrapper .search-cancel"));
                this.$clearBtn = this.$searchBar && this.$searchBar.find(".close-icon");
                this.$input && this.$input.bilibiliSuggestion();
                this.initEvents();
                this.hotword()
            }, initEvents: function() {
                var h = this, m = null;
                this.$input && this.$input.on("input", function() {
                    var n = h.$input.val();
                    n && 0 < n.length ? (h.$clearBtn.show(), clearTimeout(m), m = setTimeout(function() {
                        h.suggest(n)
                    }, 200)) : (clearTimeout(m), h.$clearBtn.hide(), h.clear(), h.renderHotword(h.hotwordData))
                });
                this.isSearchPage ? (this.$showPanel.on("focus", function() {
                    h.$searchWrapper.show();
                    h.$input.focus()
                }), this.$cancelBtn.on("click", function() {
                    h.$searchWrapper.hide()
                }), this.$emptyBtn.on("click", function() {
                    h.$showPanel.val("");
                    h.$emptyBtn.hide()
                })) : this.$input && this.$input.on("focus", function() {
                    h.$searchWrapper.show()
                });
                this.$clearBtn && this.$clearBtn.on("click", function() {
                    h.$input.val("");
                    $(this).hide();
                    h.clear();
                    h.renderHotword(h.hotwordData)
                });
                this.$form && this.$form.on("submit", function(n) {
                    n.preventDefault();
                    h.check() && (n = h.$input.val(), h.storeHistory(n), window.location = "http://bilibili.com/mobile/search.html?keyword=" + n)
                })
            }, check: function() {
                var h = this.$input.val().trim();
                return 0 === h.length ? (alert("\u5173\u952e\u5b57\u4e0d\u80fd\u4e3a\u7a7a(\u00b4\u30fb\u03c9\u30fb\uff40)"), !1) : 25 < h.length ? (alert("\u5173\u952e\u5b57\u592a\u957f(\u00b4\u30fb\u03c9\u30fb\uff40)"), !1) : !0
            }, hotword: function() {
                var h = this;
                this.hotwordData && this.hotwordData.length ? this.renderHotword(this.hotwordData) : $.ajax({url: this.searchHost, type: "GET", dataType: "json", data: {action: "hotword", main_ver: "v1"}}).done(function(m) {
                    h.hotwordData = m && m.list || [];
                    m && (0 === m.code && h.hotwordData.length) && h.renderHotword(m.list)
                })
            }, renderHotword: function(h) {
                for (var n = this, q = '<div class="hot-wrapper"><div class="title"><span class="line"></span><span class="name">\u70ed\u95e8\u641c\u7d22</span><span class="line"></span></div><div class="hot-content clearfix">', m = 0, r = h.length; m < r; m++) {
                    q += '<a class="hot-item" data-key="' + h[m].keyword + '">' + h[m].keyword + "</a>"
                }
                this.$searchWrapper.append(q + "</div></div>");
                this.searchHistory();
                $(".hot-item").on("click", function(t) {
                    t.preventDefault();
                    t = $(this).attr("data-key");
                    var s = "http://www.bilibili.com/mobile/search.html?keyword=" + encodeURIComponent(t);
                    n.storeHistory(t);
                    location.href = s
                })
            }, searchHistory: function() {
                try {
                    var h = '<div class="history-wrapper"><div class="title"><span class="line"></span><span class="name">\u5386\u53f2\u641c\u7d22</span><span class="line"></span></div><div class="history-content">', n = window.localStorage && window.localStorage.search_history;
                    if (n) {
                        for (var n = JSON.parse(n), r = n.length > this.historyMaxCount ? this.historyMaxCount : n.length, m = 0; m < r; m++) {
                            h += '<a class="history-item" href="http://bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(n[m].value) + '"><i class="bili-icon-history"></i><span class="keyword">' + g(n[m].value) + '</span><i class="bili-icon-del history-clear" data-value="' + g(n[m].value) + '"></i></a>'
                        }
                        this.$searchWrapper.append(h + "</div></div>");
                        $(".history-clear").on("click", function(u) {
                            u.stopPropagation();
                            u.preventDefault();
                            u = $(this);
                            for (var s = u.attr("data-value"), t = 0, w = n.length; t < w; t++) {
                                if (n[t].value === s) {
                                    n.splice(t, 1);
                                    u.parent().remove();
                                    break
                                }
                            }
                            localStorage.setItem("search_history", JSON.stringify(n))
                        })
                    }
                } catch (q) {
                    console.log("\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u672c\u5730\u7f13\u5b58\u6216\u5904\u4e8e\u9690\u79c1\u6a21\u5f0f")
                }
            }, suggest: function(h) {
                var m = this, n = this.searchSuggest[h];
                n ? (this.clear(), this.renderSuggest(n)) : this.ajaxQueue.ajax({useBuffer: !1, url: this.suggestHost, dataType: "json", data: {func: "suggest", suggest_type: "accurate", sub_type: "tag", main_ver: "v1", highlight: "", bangumi_acc_num: 3, special_acc_num: 0, upuser_acc_num: 0, tag_num: 10, term: h, rnd: Math.random()}, success: function(q) {
                        m.clear();
                        m.searchSuggest[h] = q;
                        m.renderSuggest(q)
                    }})
            }, renderSuggest: function(h) {
                var n = this, q = h && h.result && h.result.accurate && h.result.accurate.bangumi || [];
                h = h && h.result && h.result.tag || [];
                var m, s, r = '<div class="suggest-wrapper"><div class="suggest-content">';
                m = 0;
                for (s = q.length; m < s; m++) {
                    r += '<a class="suggest-item" data-bangumi="true" href="' + q[m].url + '" data-key="' + q[m].value + '">' + q[m].name + '<span class="suggest-type">\u756a\u5267</span></a>'
                }
                m = 0;
                for (s = h.length; m < s; m++) {
                    r += '<a class="suggest-item" href="http://bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(h[m].value) + '" data-key="' + h[m].value + '">' + h[m].name + "</a>"
                }
                this.$searchWrapper.append(r + "</div></div>");
                $(".suggest-item").on("click", function(w) {
                    w.preventDefault();
                    w = $(this).attr("data-key");
                    var t = $(this).attr("data-bangumi"), u = "http://www.bilibili.com/mobile/search.html?keyword=" + encodeURIComponent(w);
                    n.storeHistory(w);
                    location.href = t ? $(this).attr("href") : u
                })
            }, clear: function() {
                $(".hot-wrapper").remove();
                $(".history-wrapper").remove();
                $(".suggest-wrapper").remove()
            }, storeHistory: function(h) {
                try {
                    var n = window.localStorage && window.localStorage.search_history, n = n ? JSON.parse(n) : [], q = n.length, m;
                    for (m = 0; m < q; m++) {
                        if (n[m].value === h) {
                            n.splice(m, 1);
                            q--;
                            break
                        }
                    }
                    q >= this.historyMaxCount && n.pop();
                    n.unshift({isHistory: 1, timestamp: Date.now(), value: h});
                    localStorage.setItem("search_history", JSON.stringify(n))
                } catch (r) {
                    console.log("\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u672c\u5730\u7f13\u5b58\u6216\u5904\u4e8e\u9690\u79c1\u6a21\u5f0f")
                }
            }};
        return e
    }();
    o = function() {
        function e() {
            this.data = {};
            this._stack = [];
            this.onComplete = null
        }
        e.prototype.parallel = function(q, g) {
            var m = 0;
            this._stack = [];
            this.onComplete = g;
            for (var n in q) {
                var h = q[n];
                this.data[n] = null;
                this._stack.push(n);
                "function" == typeof h && h(this._call(n));
                m++
            }
            if (0 == m) {
                this.onComplete(null, this.data)
            }
        };
        e.prototype._call = function(h) {
            var g = this;
            return function(n, q) {
                var m = g._stack.indexOf(h);
                g.data[h] = q;
                0 <= m && g._stack.splice(m, 1);
                if (!g._stack.length) {
                    return g.onComplete(n, g.data)
                }
            }
        };
        return new e
    }();
    window.browser = {version: function() {
            var e = navigator.userAgent;
            return{mobile: /AppleWebKit.*Mobile.*/i.test(e), ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(e), android: /Android/i.test(e) || /Linux/i.test(e), windowsphone: /Windows Phone/i.test(e), iPhone: /iPhone/i.test(e), iPad: /iPad/i.test(e), webApp: !/Safari/i.test(e), MicroMessenger: /MicroMessenger/i.test(e), weibo: /Weibo/i.test(e), uc: /UCBrowser/i.test(e), qq: /MQQBrowser/i.test(e), baidu: /Baidu/i.test(e)}
        }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()};
    $(function() {
        $("#change_to_computer").click(function() {
            __SetCookie("nmr", 1, 1);
            var h = $(this).attr("aid");
            setTimeout(function() {
                h ? window.location.href = "http://www.bilibili.com/video/av" + h + "/" : window.location.reload()
            }, 0)
        });
        $("#link_to_app").bindApplink();
        $("#back_to_top").click(function() {
            $("html, body").animate({scrollTop: 0}, 500)
        });
        var e = 0, g = setInterval(function() {
            if (window.biliios || window.biliandroid || window.biliapp) {
                clearInterval(g), $(".b-app-dl").parent().hide()
            }
            e += 50;
            2000 < e && (clearInterval(g), 0 == $(".b-app-dl").length && $('<div id="b_app_link" class="b-app-dl-wrp"><a class="b-app-dl"></a></div>').appendTo($("body")), $(".b-app-dl").html('<div class="app-logo"></div><div class="b-app-dl-top">\u4e0abilibili\u5ba2\u6237\u7aef</div><div class="b-app-dl-bottom">\u9ad8\u6e05\u89c6\u9891 \u79bb\u7ebf\u89c2\u770b \u65b0\u756a\u7535\u5f71\u4e00\u89c8\u65e0\u4f59</div><a target="_blank" class="dl-area">\u4e0b\u8f7d</a><div class="dl-close"></div>'), getDownloadUrl($(".b-app-dl").find(".dl-area")), window.UserCloseAppDl = 1, $(".b-app-dl").find(".dl-close").click(function() {
                window.UserCloseAppDl = 2;
                $(this).parent().parent().hide()
            }), $(".b-app-dl").parent().show())
        }, 50);
        $(window).scroll(function() {
            $(document).scrollTop() + $(window).height() > $("html, body").height() - 100 ? $(".b-app-dl").parent().stop().animate({bottom: "-54px"}, 100) : $(".b-app-dl").parent().stop().animate({bottom: "0px"}, 100)
        });
        $(window).scroll()
    });
    this.Application = function() {
        function e(m, g) {
            var h;
            window.User.loadLoginStatus();
            "undefined" != typeof FastClick && $(function() {
                FastClick.attach(document.body)
            });
            this._selector = m;
            this._notification = {};
            this._host = "/";
            this.components = {};
            this.compQueue = [];
            this.data = {};
            this.typeModule = new l;
            this.lazyImage = new a;
            this.ajaxQueue = new b;
            this.Search = new p;
            this.loadingMask = $(".load-cover").length ? $(".load-cover").html('<div class="loading-txt">(\u00b4\u30fb\u03c9\u30fb\uff40)\u6b63\u5728\u52a0\u8f7d...</div>') : $('<div class="load-cover"><div class="loading-txt">(\u00b4\u30fb\u03c9\u30fb\uff40)\u6b63\u5728\u52a0\u8f7d...</div></div>');
            this.config = this.config || {preload: [], onLoaded: function(q, n) {
                    parseInt(100 * (q / n))
                }, onReady: function() {
                }};
            for (h in this.config) {
                g && g.hasOwnProperty(h) && (this.config[h] = g[h])
            }
            if (this._selector instanceof $ || "object" === typeof this._selector && void 0 !== this._selector.selector) {
                this.container = this._selector
            }
            "string" === typeof this._selector && (this.container = $(this._selector));
            $(window).on("orientationchange", this.resize()).on("hashchange", this.hashChange())
        }
        e.prototype.init = function() {
            var s, g, m, n, h, r, q;
            n = this;
            m = {};
            q = this.config.preload;
            this.loadingMask.prependTo(this._selector);
            s = h = 0;
            for (r = q.length; h < r; s = ++h) {
                g = q[s], m[g] = function(u, t) {
                    return function(w) {
                        return $.ajax({url: u, dataType: "json", success: function(x) {
                                if (n.config.onLoaded) {
                                    n.config.onLoaded(t, n.config.preload.length)
                                }
                                return w(null, x)
                            }, error: function(x, y) {
                                $(".load-cover").hide();
                                return w(y, null)
                            }})
                    }
                }(g, s)
            }
            return o.parallel(m, function(u, t) {
                n.data = t;
                return n.ready()
            })
        };
        e.prototype.done = function() {
            var h, g;
            for (g = []; h = this.compQueue.shift(); ) {
                g.push(this.load.apply(this, h))
            }
            return g
        };
        e.prototype.ready = function() {
            this.typeModule.init(this.data[this.config.preload]);
            this.config.onReady();
            this.done();
            return this.container.addClass("loaded")
        };
        e.prototype.onData = function(g) {
            return g ? g : !1
        };
        e.prototype.load = function() {
            var m, g, h;
            g = arguments;
            h = g[0];
            m = g[1];
            g = g[2];
            if (this[h + "Component"]) {
                return m = new this[h + "Component"](this, m, g), null == this.components[h + "Component"] && (this.components[h + "Component"] = []), this.components[h + "Component"].push(m), m
            }
        };
        e.prototype.queue = function(m, g, h) {
            return this.compQueue.push([m, g, h])
        };
        e.prototype.resize = function() {
            var g;
            g = this;
            return function(h) {
                var n, r, m, t, s = g.components, q;
                n = $(window).scrollTop();
                window.scroll(0, 0);
                setTimeout(function() {
                    return window.scroll(0, n)
                }, 50);
                for (r in s) {
                    for (q = s[r], m = 0, t = q.length; m < t; m++) {
                        q[m].resize && q[m].resize(h)
                    }
                }
            }
        };
        e.prototype.hashChange = function() {
            var g;
            g = this;
            return function(h) {
                var n, q, m, s = g.components, r;
                for (n in s) {
                    for (r = s[n], q = 0, m = r.length; q < m; q++) {
                        r[q].hashChange && r[q].hashChange(h)
                    }
                }
            }
        };
        e.prototype.getTid = function() {
            var h = 0, g = window.location.href.match(/tid=(\d+)/);
            g && (h = g[1]);
            return h
        };
        e.prototype.sendNotification = function(q, g) {
            if ("undefined" !== typeof this._notification[q]) {
                var m = this._notification[q], n, h;
                for (h in m) {
                    n = m[h], n.apply(null, g)
                }
            }
        };
        e.prototype.bindNotification = function(h, g) {
            "undefined" !== typeof this._notification[h] ? this._notification[h].push(g) : this._notification[h] = [g]
        };
        e.prototype.NavigatorComponent = function(h) {
            function g(n, q, m) {
                this._selector = q;
                this.config = {tid: null, navigators: "[nav-tid]"};
                g.__super__.constructor.call(this, n, this._selector, m);
                this._tid = null;
                this._main = this._current = {elem: this.container.filter(".main")};
                n = this._value(this.config.tid);
                this.showSubChannel(n);
                this._sub = [];
                this._branch = [];
                this.buildMenu(n);
                3 <= this._branch.length && (n = this._value(this.application.typeModule.prev(n)));
                this.bindEvent();
                this.baseTitle = "_bilibili_\u54d4\u54e9\u54d4\u54e9\u5f39\u5e55\u89c6\u9891\u7f51";
                q = $('.roll-bar.main [nav-tid="' + this._tid + '"]').text();
                m = $('.roll-bar.sub [nav-tid="' + this._tid + '"]').text();
                document.title = (q ? q : m) + this.baseTitle;
                this.load(n)
            }
            v(g, h);
            g.prototype.showSubChannel = function(n) {
                $(".sub-wrapper").remove();
                if ((13 == n || 1 == n || 3 == n || 129 == n || 4 == n || 36 == n || 5 == n || 119 == n || 23 == n || 11 == n || 155 == n || 160 == n || 165 == n) && (n = this.application.typeModule.TYPES[n]) && n.length) {
                    var q = $('<div class="sub-wrapper clearfix" />');
                    4 > n.length && q.addClass("single");
                    for (var m = 0, r = n.length; m < r; m++) {
                        q.append('<a class="sub-item" nav-tid="' + n[m].tid + '"><div class="sub-icon bili-sub-icon-' + n[m].tid + '"></div><p class="sub-name">' + n[m].typename + "</p></a>")
                    }
                    $(".list-container").before(q)
                }
            };
            g.prototype.getMain = function(m) {
                return 0 == this.application.typeModule.prev(m) ? this.application.typeModule.children(m) : !1
            };
            g.prototype.getCurrentTid = function(m) {
                return m.find(".on").attr("nav-tid")
            };
            g.prototype.buildMenu = function(n, q) {
                var m = this.application.typeModule, r;
                q = void 0 === q ? [n] : q;
                if (void 0 !== (r = m.prev(q[0])) && 0 != r) {
                    return q.unshift(r), this.buildMenu(n, q)
                }
                this._branch = q;
                return this._buildMenu(n, q)
            };
            g.prototype._buildMenu = function(n, s) {
                for (var m = this.application.typeModule, w, u, t, r = s.length - 1, q = 0; q < s.length; q++) {
                    w = s[q], void 0 !== (t = m.children(w)) && (void 0 !== (u = s[q + 1]) && 0 >= q ? this.renderSub(q, w, u, t) : 1 >= s.length && this.renderSub(q, w, null, t))
                }
                m.children(s[r]) && r++;
                for (m = r; m < this._sub.length; m++) {
                    this._sub[m].elem.hide().find(".roll-bar-in").empty()
                }
            };
            g.prototype.bindEvent = function() {
                var m = this;
                $("body").on("click", this.config.navigators, function(n) {
                    if (!$(this).hasClass("on") || $(this).parents(".roll-bar.main").length) {
                        n = $(this), n = m._value(n.attr("nav-tid")), location.hash = "tid=" + n
                    }
                })
            };
            g.prototype.hashChange = function() {
                var m = this._value(this.application.getTid());
                this.showSubChannel(m);
                this.buildMenu(m);
                3 <= this._branch.length && (m = this._value(this.application.typeModule.prev(m)));
                this.load(m);
                var m = $('.roll-bar.main [nav-tid="' + this._tid + '"]').text(), n = $('.roll-bar.sub [nav-tid="' + this._tid + '"]').text();
                document.title = (m ? m : n) + this.baseTitle
            };
            g.prototype.setScroll = function(m) {
                return this.application.load("Roll", m)
            };
            g.prototype.on = function(n, q) {
                var m = n.find('[nav-tid="' + q + '"]');
                n.find("[nav-tid]").removeClass("on");
                return m.length ? n.find('[nav-tid="' + q + '"]').addClass("on") : n.find("[nav-tid]").eq(0).addClass("on")
            };
            g.prototype.renderSub = function(n, r, m, u) {
                (n = this._sub[n]) && n.elem.length ? n.elem.show().find(".roll-bar-in").empty() : (n = $('<div class="roll-bar sub"><ul class="roll-bar-in"></ul></div>').insertAfter(this._current.elem), n = {elem: n, iscroll: this.setScroll(n)}, this._sub.push(n));
                var t;
                13 == r ? t = "\u756a\u5267\uff1a" : 1 == r ? t = "\u52a8\u753b\uff1a" : 3 == r ? t = "\u97f3\u4e50\uff1a" : 129 == r ? t = "\u821e\u8e48\uff1a" : 4 == r ? t = "\u6e38\u620f\uff1a" : 36 == r ? t = "\u79d1\u6280\uff1a" : 5 == r ? t = "\u5a31\u4e50\uff1a" : 119 == r ? t = "\u9b3c\u755c\uff1a" : 23 == r ? t = "\u7535\u5f71\uff1a" : 11 == r ? t = "\u7535\u89c6\u5267\uff1a" : 155 == r ? t = "\u65f6\u5c1a\uff1a" : 160 == r ? t = "\u751f\u6d3b\uff1a" : 165 == r && (t = "\u5e7f\u544a\uff1a");
                var s = n.elem.find(".roll-bar-in");
                $("<li>").addClass("on").attr("nav-tid", r).append($("<a>").attr({href: "/mobile/subchannel.html#tid=" + r, title: "\u5168\u90e8"}).html(t)).appendTo(s);
                for (var q in u) {
                    r = u[q], $("<li>").attr("nav-tid", r.tid).append($("<a>").attr({href: "/mobile/subchannel.html#tid=" + r.tid, title: r.typename}).html(r.typename)).appendTo(s)
                }
                u = n.iscroll;
                m ? u.scrollToElem(this.on(n.elem, m)) : u.reset(200);
                u.resize();
                return this._current = n
            };
            g.prototype.load = function(m) {
                $(".list-container").empty();
                this.application.typeModule.TYPES ? 1 >= this._branch.length && this.application.typeModule.children(m) ? this.channelComp ? (this.channelComp.setTid(m), this.channelComp.init()) : this.channelComp = this.application.load("SubChannel", ".list-container", {tid: m}) : this.suggestListComp && this.recentlyListComp ? (this.subListContainer.init(), this.suggestListComp.reload({tid: m}), this.recentlyListComp.reload({tid: m})) : (this.subListContainer = this.application.load("SubList", ".list-container"), this.suggestListComp = this.application.load("List", ".list.suggest .list-body", {order: "hot", pagesize: 4, platform: "android", tid: m, loadMore: !1}), this.recentlyListComp = this.application.load("List", ".list.recently .list-body", {platform: "android", tid: m, loadMore: !0, selectMenu: ".list.recently .b-slt"})) : $(".list-container").append('<div class="b-loading error">\u52a0\u8f7d\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5( >\ufe4f<\u3002)\uff5e</div>')
            };
            g.prototype._value = function(m) {
                void 0 !== m && (this._tid = m);
                return this._tid
            };
            return g
        }(f);
        e.prototype.SearchComponent = function(h) {
            function g(m, n, q) {
                this._selector = n;
                this.wrap = $(this._selector).find(".list-wrp");
                this.config = {action: "http://www.bilibili.com/mobile/search.html", searchUrl: null, form: null, keyword: null, order: null, tids: null, page: null, distance: 0, type: null};
                this.hasData = !0;
                this.loading = !1;
                g.__super__.constructor.call(this, m, this._selector, q);
                this.listEffect = new ListEffect;
                this._main = this._current = {elem: this.container.find(".main")};
                this._sub = {elem: this.container.find(".sub")};
                this._bottom = {elem: this.container.find(".bottom")};
                this.bindEvent("type", "main");
                this.bindEvent("tids", "sub");
                this.bindEvent("order", "bottom");
                this.bindSpanner();
                $(this.config.selectList).find('[order="' + this.config.order + '"]').attr("selected", "selected");
                this.baseTitle = document.title;
                document.title = this.config.keyword + " " + this.baseTitle;
                this.init()
            }
            v(g, h);
            g.prototype.bindEvent = function(n, q, m) {
                var s = this, r = 0 < $("[nav-" + n + '="' + this.config[n] + '"]').length ? $("[nav-" + n + '="' + this.config[n] + '"]').index() : 0;
                m ? $(".roll-bar." + q).eq(r).addClass("on") : (this["_" + q].iscroll = this.setScroll(".roll-bar." + q), this["_" + q].iscroll.scrollToElem(this.on(this["_" + q].elem, n, r)));
                $("body").on("click", "[nav-" + n + "]", function(t) {
                    if (!$(this).hasClass("on") || $(this).parents(".roll-bar." + q).length) {
                        t = $(this), s.config[n] = t.attr("nav-" + n), window.location.href = s.config.action + "?keyword=" + encodeURIComponent(s.config.keyword) + "&p=1&order=" + s.config.order + "&tids=" + s.config.tids + "&type=" + s.config.type
                    }
                })
            };
            g.prototype.setScroll = function(m) {
                return this.application.load("Roll", m)
            };
            g.prototype.bindSpanner = function() {
                var n = this._main.elem.find(".spanner"), q = this._sub.elem, m = this._bottom.elem;
                if ("series" != this.config.type && "special" != this.config.type && "upuser" != this.config.type) {
                    n.show();
                    if ("" != this.config.order || "-1" != this.config.tids) {
                        n.addClass("on"), q.removeClass("hide"), m.removeClass("hide")
                    }
                    n.bind("click", function() {
                        q.addClass("initialized");
                        m.addClass("initialized");
                        n.hasClass("on") ? (n.removeClass("on"), q.addClass("hide"), m.addClass("hide")) : (n.addClass("on"), q.removeClass("hide"), m.removeClass("hide"))
                    })
                }
            };
            g.prototype.on = function(n, q, m) {
                var r = n.find("[nav-" + q + "]");
                n.find("[nav-" + q + "]").removeClass("on");
                return r.length ? n.find("[nav-" + q + "]").eq(m).addClass("on") : n.find("[nav-" + q + "]").eq(0).addClass("on")
            };
            g.prototype.init = function() {
                var n = this;
                $(window).scroll(function() {
                    !n.loading && (n.hasData && document.documentElement.scrollHeight <= $(window).scrollTop() + $(window).height() + n.config.distance) && (n.loading = !0, n.container.find(".b-loading").remove(), n.wrap.after('<div class="b-loading">(\u00b4\u30fb\u03c9\u30fb\uff40)\u6b63\u5728\u52a0\u8f7d...</div>'), n.nextPage())
                });
                $('[toggle-switch=".search"]').hide();
                $(".app").addClass("search");
                var q = $("#search_top .clear-history"), m = $('#search_top input[type="text"]');
                q.click(function() {
                    m.val("");
                    m.focus();
                    $(this).hide()
                });
                m.val(this.config.keyword);
                $("#search_top .close-icon").show();
                m.keyup(function() {
                    "" == $(this).val() ? q.hide() : q.show()
                });
                var r = this.application.data[this.config.searchUrl + "&keyword=" + this.config.keyword + "&page=" + this.config.page + "&order=" + this.config.order + "&tids=" + this.config.tids + "&type=" + this.config.type];
                this.wrap.empty();
                this.render(r, !0)
            };
            g.prototype.render = function(x, r) {
                this.container.find(".b-loading").remove();
                if (x) {
                    var w = x.sp_res, u = x.tp_res, t = x.up_res, s = x.res, q, n, m;
                    if (t && 0 === t.code && 0 !== t.result.length || w && 0 === w.code && 0 !== w.result.length || u && 0 === u.code && 0 !== u.result.length || s && 0 === s.code && 0 !== s.result.length) {
                        if (t.result) {
                            for (q = 0, n = t.result.length; q < n; q++) {
                                m = t.result[q], m = '<a class="list-item search" href="http://space.bilibili.com/' + m.mid + '"><div class="l"><div class="l-special-hint">up\u4e3b</div><div class="cover" data-img="' + m.upic + '"></div></div><div class="r"><div class="r-box"><div class="title">' + m.uname + '</div><div class="middle">\u89c6\u9891: <span counter="' + m.videos + '"></span></div><div class="desc">' + m.usign + "</div></div></div></a>", this.wrap.append(m)
                            }
                        }
                        if (w.result) {
                            for (q = 0, n = w.result.length; q < n; q++) {
                                m = w.result[q], t = m.is_bangumi ? "\u756a\u5267" : "\u4e13\u9898", m = '<a class="list-item search" href="' + m.arcurl + '"><div class="l"><div class="l-special-hint">' + t + '</div><div class="cover" data-img="' + m.pic + '"></div></div><div class="r"><div class="r-box"><div class="title">' + m.title + '</div><div class="middle"><div class="meta-item danmaku-info"><span class="meta-item-order">\u89c6\u9891\uff1a</span><span counter="' + m.count + '"></span></div><div class="meta-item play-info"><i class="icon-p play"></i><span counter="' + m.click + '"></span></div></div><div class="desc">' + m.description + "</div></div></div></a>", this.wrap.append(m)
                            }
                        }
                        if (u.result) {
                            for (q = 0, n = u.result.length; q < n; q++) {
                                m = u.result[q], t = m.is_bangumi ? "\u756a\u5267" : "\u4e13\u9898", m = '<a class="list-item search" href="' + m.arcurl + '"><div class="l"><div class="l-special-hint">' + t + '</div><div class="cover" data-img="' + m.pic + '"></div></div><div class="r"><div class="r-box"><div class="title">' + m.title + '</div><div class="middle"><div class="meta-item danmaku-info"><span class="meta-item-order">\u89c6\u9891\uff1a</span><span counter="' + m.bgmcount + '"></span></div><div class="meta-item play-info"><i class="icon-p play"></i><span counter="' + m.click + '"></span></div></div><div class="desc">' + m.description + "</div></div></div></a>", this.wrap.append(m)
                            }
                        }
                        if (s.result) {
                            for (q = 0, n = s.result.length; q < n; q++) {
                                m = s.result[q], m = '<a class="list-item search" title="' + m.title + '" href="' + m.arcurl + '"><div class="l"><div class="l-special-duration">' + m.duration + '</div><div class="cover" data-img="' + m.pic + '"></div></div><div class="r"><div class="r-box"><div class="title">' + m.title + '</div><div class="middle">UP\u4e3b:' + m.author + '</div><div class="meta"><div class="meta-item play-info"><i class="icon-p play"></i><span counter="' + m.play + '"></span></div><div class="meta-item danmaku-info"><i class="icon-p dm"></i><span class="meta-item-dm" counter="' + m.video_review + '"></span></div></div></div></div></a>', this.wrap.append(m)
                            }
                        }
                        new this.application.CounterComponent(this.application, "*[counter]");
                        this.list = this.wrap.find(".list-item");
                        this.application.lazyImage.lazy(this.wrap);
                        this.listEffect.lazy(this.wrap);
                        this.loading = !1
                    } else {
                        return this.wrap.after('<div class="b-loading load-fail">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86( >\ufe4f< )</div>'), this.loading = this.hasData = !1
                    }
                }
            };
            g.prototype.nextPage = function() {
                var m = this;
                this.hasData && 0 === this.wrap.find(".list-item.out").length && (m.config.page++, $.ajax({url: m.config.searchUrl + "&keyword=" + m.config.keyword + "&page=" + m.config.page + "&order=" + m.config.order + "&tids=" + m.config.tids + "&type=" + m.config.type, type: "get", dataType: "json", success: function(n) {
                        m.render(n)
                    }, error: function() {
                        m.loading = !1;
                        m.hasData = !1;
                        m.container.find(".b-loading").remove();
                        m.wrap.after('<div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div>')
                    }}))
            };
            return g
        }(f);
        e.prototype.SeriesComponent = function(h) {
            function g(m, n, q) {
                this.pos;
                this.cache = {};
                this._selector = n;
                this.config = {spid: null, season_id: null, isbangumi: null, lastPage: "", lastTime: new Date(-300), nocache: !1, share: {}};
                g.__super__.constructor.call(this, m, this._selector, q);
                this.list = this.container.find("#bgm_video_container");
                this.init()
            }
            v(g, h);
            g.prototype.setScroll = function(m) {
                return this.application.load("Roll", m)
            };
            g.prototype.init = function() {
                var m = this;
                if (0 < this.container.find(".bgm_list").find("li").length) {
                    this.iScroll = this.setScroll(".bgm_list");
                    this.iScroll.scroller.options.bounce = !1;
                    var n = window.location.hash.match(/^#S-(\d*)$/);
                    n && 2 === n.length ? (n = this.iScroll.container.find("li[season_id='" + n[1] + "']"), n.length ? this.changeSeason(n.index()) : this.changeSeason()) : this.changeSeason();
                    this.iScroll.scroller.on("scrollEnd", function() {
                        m.changeSeason()
                    })
                }
                $("#season_selector li").click(function() {
                    m.changeSeason($(this).index())
                });
                this.buildShareList(this.container.find(".sp-share-list"))
            };
            g.prototype.changeSeason = function(n) {
                var r = this, m = this.iScroll.container, u = m.find("li")[0], t = 99999, s;
                "undefined" !== typeof n ? (u = m.find("li")[n], s = n) : m.find("li").each(function(x, w) {
                    var y = Math.abs($(window).width() - 2 * $(w).offset().left - $(w).width());
                    y < t && (t = y, u = w, s = x)
                });
                $(u).siblings().removeClass("active");
                $(u).addClass("active");
                this.iScroll.scroller.scrollToElement(u, 600, !0);
                if (s != this.pos) {
                    this.list.empty();
                    this.pos = s;
                    var q = $(u).attr("season_id");
                    q && 0 < q ? (window.location.hash = "S-" + q, this.cache[q] ? this.renderSeason(this.cache[q]) : $.getJSON("http://www.bilibili.com/index/bangumi/" + r.config.spid + "-s" + q + ".json", function(w) {
                        w && 0 < w.length ? (r.cache[q] = w, r.renderSeason(w)) : r.list.html('<div class="b-loading load-fail">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86( &gt;\ufe4f&lt;\u3002)\uff5e</div>')
                    })) : -1 == q ? (window.location.hash = "", this.cache[q] ? this.renderSeason(this.cache[q]) : $.getJSON("http://www.bilibili.com/index/bangumi/" + r.config.spid + ".json", function(w) {
                        w && 0 < w.length ? (r.cache[q] = w, r.renderSeason(w)) : ($(u).remove(), r.pos = -1, r.changeSeason(0))
                    })) : (window.location.hash = "", this.cache.suggest_list ? this.renderSuggest(this.cache.suggest_list) : (n = "ad-recommend", 0 < $("#isnotbangumiType").length && (n = "tag-hot"), $.ajax({url: "http://www.bilibili.com/sppage/" + n + "-" + r.config.spid + "-1.html" + (r.config.nocache ? "?r=" + Math.random() : ""), success: function(w) {
                            r.cache.suggest_list = w;
                            r.renderSuggest(w)
                        }, error: function() {
                            r.list.html('<div class="b-loading load-fail">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86( &gt;\ufe4f&lt;\u3002)\uff5e</div>')
                        }})))
                }
            };
            g.prototype.renderSeason = function(n) {
                for (var m = this, u = !1, t = "", s = 0; s < n.length; s++) {
                    if (14 <= s && 14 < n.length && !u) {
                        var u = !0, t = "hide", r = $('<a class="sp-episode" href="javascript:void(0)">...</a>').appendTo(this.list);
                        r.click(function() {
                            r.remove();
                            m.list.find(".sp-episode.hide").removeClass("hide")
                        })
                    }
                    var q = -1 == n[s].episode ? "\u5168\u96c6" : n[s].episode;
                    this.list.append('<a class="sp-episode ' + t + '" title="' + q + '" href="http://www.bilibili.com/mobile/video/av' + n[s].aid + '.html">' + q + "</a>")
                }
                $("#sp_play").attr({href: "http://www.bilibili.com/mobile/video/av" + n[0].aid + ".html", title: n[0].episode})
            };
            g.prototype.renderSuggest = function(m) {
                this.list.html(m)
            };
            g.prototype.shareList = {weibo: {url: "http://service.weibo.com/share/share.php?url=$link&appkey=1727689474&pic=$pics&title=$comment&language=zh_cn"}, qzone: {url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=$link&desc=$comment&pics=$pics&style=203&width=98&height=22&otype=share"}, tieba: {url: "http://tieba.baidu.com/f/commit/share/openShareApi?url=$link&title=$title&desc=$comment$link"}};
            g.prototype.buildShareList = function(n) {
                var m, s, r = this, q = this.container.find(".load-layer img").attr("src");
                for (m in this.shareList) {
                    s = $('<a href="javascript:void(0)" class="icon ' + m + '" provider="' + m + '"></a>'), s.click(function(u) {
                        u = r.shareList[$(this).attr("provider")].url;
                        var t, w, x = ["title", "comment", "link", "pics"];
                        for (t in x) {
                            t = x[t], w = r.config.share[t], "pics" == t && (!w && q) && (w = q), u = r.replaceAll(u, "$" + t, encodeURIComponent(w))
                        }
                        window.open(u)
                    }), n.prepend(s)
                }
            };
            g.prototype.replaceAll = function(n, m, q) {
                return n.replace(RegExp(m.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), q)
            };
            return g
        }(f);
        e.prototype.ToggleComponent = function(h) {
            function g(m, n, r) {
                var q = this;
                this._selector = n;
                g.__super__.constructor.call(this, m, this._selector, r);
                this.switcher = !1;
                $("[toggle-switch='" + this._selector + "']").click(function() {
                    q.toggle()
                })
            }
            v(g, h);
            g.prototype.toggle = function() {
                if (this.switcher = !this.switcher) {
                    return this.container.addClass("on"), $("[toggle-switch='" + this._selector + "']").addClass("on"), setTimeout(function() {
                        $('#search_form input[name="keyword"]').focus()
                    }, 100), $("html,body").addClass("overlay")
                }
                this.container.removeClass("on");
                $("[toggle-switch='" + this._selector + "']").removeClass("on");
                return $("html,body").removeClass("overlay")
            };
            return g
        }(f);
        e.prototype.RollComponent = function(h) {
            function g(m, n, r) {
                this._selector = n;
                this.config = {iScroll: {}};
                g.__super__.constructor.call(this, m, this._selector, r);
                m = {scrollX: !0, scrollY: !1, scrollbars: !1, useTransform: !0, useTransition: !0, eventPassthrough: !0};
                for (var q in this.config.iScroll) {
                    m[q] = this.config.iScroll[q]
                }
                this.container.length && (this.scroller = new IScroll(this.container[0], m), this.container.find(".on")[0] && this.scroller.scrollToElement(this.prev(this.container.find(".on")), 0), this.resize())
            }
            v(g, h);
            g.prototype.scrollToElem = function(n, m) {
                var q = this;
                setTimeout(function() {
                    q.scroller.scrollToElement(q.prev(n), void 0 === m ? 200 : m)
                }, 0)
            };
            g.prototype.prev = function(m) {
                return m.prev().length ? m.prev()[0] : m[0]
            };
            g.prototype.reset = function(m) {
                return this.scroller.scrollTo(0, 0, m || 0, IScroll.utils.ease.back)
            };
            g.prototype.resize = function() {
                var m = this;
                setTimeout(function() {
                    m.scroller.refresh()
                }, 0)
            };
            return g
        }(f);
        e.prototype.SwipeComponent = function(m, g, h) {
            new Vue({el: g, data: {active: 0, activeClass: "on", sliderItems: null, swiper: null, showError: !1}, ready: function() {
                    var q = this, n;
                    (n = m.data && m.data["http://api.bilibili.com/x/web-show/res/loc?jsonp=jsonp&pf=0&id=23"]) ? (this.sliderItems = n.data || [], this.$nextTick(function() {
                        q.initSwipe()
                    })) : this.fetchData()
                }, methods: {fetchData: function() {
                        var n = this;
                        $.ajax({url: "http://api.bilibili.com/x/web-show/res/loc?jsonp=jsonp&pf=0&id=23", dataType: "json", success: function(q) {
                                n.sliderItems = q.data || [];
                                n.$nextTick(function() {
                                    n.initSwipe()
                                })
                            }, error: function() {
                                n.showError = !0
                            }})
                    }, initSwipe: function() {
                        var n = this;
                        this.swiper = new Swipe($("#slider")[0], {auto: 3000, continuous: !0, callback: function(q) {
                                n.active = q
                            }})
                    }, switchSwipe: function(q, n) {
                        q.preventDefault();
                        this.swiper.slide(n, 300)
                    }}})
        };
        e.prototype.HotRecommendComponent = function(m, g, h) {
            new Vue({el: g, data: {recommendItems: null, showError: !1, loading: !1, defaultImg: {backgroundImage: "url(http://static.hdslb.com/images/v3images/img_loading.png)", backgroundSize: "contain"}}, ready: function() {
                    var n = m.data && m.data["/index/ranking-3day.json"];
                    n ? this.handleData(n) : this.fetchData();
                    this.delayImg()
                }, methods: {handleData: function(q) {
                        var n = [], s, r = 0;
                        if ((q = q && q.recommend) && 0 === q.code) {
                            for (s in q.list) {
                                q.list.hasOwnProperty(s) && 4 > r && (q.list[s].link = "/mobile/video/av" + q.list[s].aid + ".html", n.push(q.list[s]), r++)
                            }
                        }
                        this.recommendItems = n
                    }, fetchData: function() {
                        var n = this;
                        this.loading = !0;
                        $.ajax({url: "/index/ranking-3day.json", dataType: "json", success: function(q) {
                                n.loading = !1;
                                n.handleData(q);
                                n.delayImg()
                            }, error: function() {
                                n.loading = !1;
                                n.showError = !0
                            }})
                    }, delayImg: function() {
                        this.$nextTick(function() {
                            m.lazyImage.lazy($(g))
                        })
                    }}})
        };
        e.prototype.LiveRecommendComponent = function(m, g, h) {
            new Vue({el: g, data: {loading: !0, liveItems: null, showError: !1}, ready: function() {
                    this.fetchData()
                }, methods: {fetchData: function() {
                        var n = this;
                        $.ajax({url: "http://live.bilibili.com/h5/recommendRooms", dataType: "jsonp", success: function(q) {
                                n.loading = !1;
                                q && 0 === q.code ? (q = q.data || [], 4 < q.length && (q = q.slice(0, 4)), n.liveItems = q, n.delayImg()) : n.showError = !0
                            }, error: function() {
                                n.loading = !1;
                                n.showError = !0
                            }})
                    }, delayImg: function() {
                        this.$nextTick(function() {
                            m.lazyImage.lazy($(g))
                        })
                    }}})
        };
        e.prototype.BangumiRecommendComponent = function(m, g, h) {
            new Vue({el: g, data: {loading: !0, bangumiItems: null, showError: !1}, ready: function() {
                    this.fetchData()
                }, methods: {fetchData: function() {
                        var n = this;
                        $.ajax({url: "http://www.bilibili.com/api_proxy?app=bangumi&action=timeline_v2", dataType: "json", success: function(q) {
                                n.loading = !1;
                                q && 0 === q.code ? (q = q.list || [], 6 < q.length && (q = q.slice(0, 6)), n.bangumiItems = q, n.delayImg()) : n.showError = !0
                            }, error: function() {
                                n.loading = !1;
                                n.showError = !0
                            }})
                    }, delayImg: function() {
                        this.$nextTick(function() {
                            m.lazyImage.lazy($(g))
                        })
                    }}})
        };
        e.prototype.ChannelComponent = function(h) {
            function g(m, n, q) {
                this._selector = n;
                this.config = this.config || {type: null, src: m._host + "index/ding.json", pagesize: 4};
                g.__super__.constructor.call(this, m, this._selector, q);
                this.init()
            }
            v(g, h);
            g.prototype.init = function() {
                this.load({type: this.config.type, loading: !1, src: this.config.src, container: this.container})
            };
            g.prototype.load = function(n) {
                var m = this;
                n.container.find(".channel-in").empty();
                this.application.data[n.src] ? (this.render(this.application.data[n.src], n.container.find(".channel-in")), this.application.sendNotification("_counter", [])) : (this.loading(n, !0), this.application.ajaxQueue.ajax({url: n.src, dataType: "json", success: function(q) {
                        m.application.data[n.src] || (m.application.data[n.src] = q);
                        m.loading(n, !1);
                        m.render(q, n.container.find(".channel-in"));
                        m.application.sendNotification("_counter", [])
                    }, error: function() {
                        m.loading(n, !1);
                        $('<div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div>').appendTo(n.container.find(".channel-in"))
                    }}))
            };
            g.prototype.loading = function(n, m) {
                if ("boolean" != typeof m) {
                    return n.loading
                }
                n.loading = m;
                n.loading ? $('<div class="b-loading">loading...</div>').appendTo(n.container.find(".channel-in")) : n.container.find(".b-loading").remove()
            };
            g.prototype.getData = function(m) {
                return !this.config.type && m.list ? m.list : m[this.config.type].list || m[this.config.type]
            };
            g.prototype.render = function(n, m) {
                var q = 0;
                n = this.getData(n);
                for (key in n) {
                    q < this.config.pagesize && (q++, value = n[key], m.append(this.renderItem(value)))
                }
                this.application.lazyImage.lazy(m);
                m.children().length || $('<div class="b-loading no-data">\u6ca1\u6709\u6570\u636e( >\ufe4f<\u3002)\uff5e</div>').appendTo(m)
            };
            g.prototype.renderItem = function(m) {
                return $('<li><div class="item"><div class="cover" data-img="' + m.pic + '"><div class="meta"><div class="cell"><span class="ui play"></span><span counter=\'' + m.play + '\'></span></div><div class="cell"><span class="ui danmaku"></span><span counter=\'' + m.video_review + "'></span></div></div><a href=\"/mobile/video/av" + m.aid + '.html" title="' + m.title + '"></a></div><span class="title"><a href="/mobile/video/av' + m.aid + '.html">' + m.title + "</a></span></div></li>")
            };
            g.prototype.setTid = function(m) {
                m && (this.config.tid = m);
                return this.config.tid
            };
            return g
        }(f);
        e.prototype.IndexChannelComponent = function(m, g, h) {
            new Vue({el: g, data: {loading: !1, showError: !1, channels: [{key: "douga", name: "\u52a8\u753b\u533a", icon: "bilibili-index-douga", link: "/mobile/subchannel.html#tid=1", items: []}, {key: "music", name: "\u97f3\u4e50\u533a", icon: "bilibili-index-music", link: "/mobile/subchannel.html#tid=3", items: []}, {key: "dance", name: "\u821e\u8e48\u533a", icon: "bilibili-index-dance", link: "/mobile/subchannel.html#tid=129", items: []}, {key: "game", name: "\u6e38\u620f\u533a", icon: "bilibili-index-game", link: "/mobile/subchannel.html#tid=4", items: []}, {key: "technology", name: "\u79d1\u6280\u533a", icon: "bilibili-index-technology", link: "/mobile/subchannel.html#tid=36", items: []}, {key: "life", name: "\u751f\u6d3b\u533a", icon: "bilibili-index-life", link: "/mobile/subchannel.html#tid=160", items: []}, {key: "kichiku", name: "\u9b3c\u755c\u533a", icon: "bilibili-index-kichiku", link: "/mobile/subchannel.html#tid=119", items: []}, {key: "fashion", name: "\u65f6\u5c1a\u533a", icon: "bilibili-index-fashion", link: "/mobile/subchannel.html#tid=155", items: []}, {key: "ent", name: "\u5a31\u4e50\u533a", icon: "bilibili-index-ent", link: "/mobile/subchannel.html#tid=5", items: []}, {key: "teleplay", name: "\u7535\u89c6\u5267\u533a", icon: "bilibili-index-teleplay", link: "/mobile/subchannel.html#tid=11", items: []}, {key: "movie", name: "\u7535\u5f71\u533a", icon: "bilibili-index-movie", link: "/mobile/subchannel.html#tid=23", items: []}, {key: "ad", name: "\u5e7f\u544a", icon: "bilibili-index-advertise", link: "/mobile/subchannel.html#tid=166", items: []}]}, ready: function() {
                    var n;
                    (n = m.data && m.data["/index/ding.json"]) ? this.handleData(n) : this.fetchData();
                    this.delayImg()
                }, methods: {handleData: function(q) {
                        for (var n, u, t, s = this.channels.length, r; s--; ) {
                            for (u in t = 0, n = this.channels[s], r = q[n.key] || {}, r) {
                                r.hasOwnProperty(u) && 4 > t && (r[u].link = "/mobile/video/av" + r[u].aid + ".html", n.items.push(r[u]), t++)
                            }
                        }
                    }, fetchData: function() {
                        var n = this;
                        this.loading = !0;
                        $.ajax({url: "/index/ding.json", dataType: "json", success: function(q) {
                                n.loading = !1;
                                n.handleData(q);
                                n.delayImg()
                            }, error: function() {
                                n.loading = !1;
                                n.showError = !0
                            }})
                    }, delayImg: function() {
                        this.$nextTick(function() {
                            m.lazyImage.lazy($(g))
                        })
                    }}})
        };
        e.prototype.SubChannelComponent = function(h) {
            function g(m, n, q) {
                this._selector = n;
                this.config = {tid: null, pagesize: 4};
                g.__super__.constructor.call(this, m, this._selector, q)
            }
            v(g, h);
            g.prototype.init = function() {
                this.subChannels = this.application.typeModule.children(this.config.tid);
                for (var n, m = 0; m < this.subChannels.length; m++) {
                    n = this.subChannels[m], n.loading = !1, n.src = this.application._host + "index/ding/" + n.tid + ".json", n.container = $('<div class="channel-block"></div>').appendTo(this.container), n.title = $('<a class="channel-title" nav-tid="' + n.tid + '" title="' + n.typename + '" href="/mobile/subchannel.html#tid=' + n.tid + '">' + n.typename + '<i class="ui arrow"></i></a>').appendTo(n.container), n.list = $('<div class="channel" tid="' + n.tid + '"><ul class="channel-in"></ul></div>').appendTo(n.container), this.load(n)
                }
            };
            g.prototype.getData = function(m) {
                return m.list
            };
            return g
        }(e.prototype.ChannelComponent);
        e.prototype.ShortcutComponent = function(h) {
            function g(m, r, q) {
                var n = this;
                this._selector = r;
                g.__super__.constructor.call(this, m, this._selector, q);
                this.container.find(".top").click(function() {
                    $(window).scrollTop(0)
                });
                this.application.bindNotification("_hide_float", function() {
                    n.container.hide()
                });
                this.application.bindNotification("_show_float", function() {
                    n.container.show()
                })
            }
            v(g, h);
            return g
        }(f);
        e.prototype.AddToLauncherComponent = function(h) {
            function g(m, s, r) {
                var q = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1, n = this;
                this._selector = s;
                g.__super__.constructor.call(this, m, this._selector, r);
                window.localStorage && "yes" != window.localStorage.add_to_launcher_hint && (m = this.container.find(".close"), m.click(function() {
                    n.container.hide();
                    window.localStorage.add_to_launcher_hint = "yes"
                }), q && this.container.show())
            }
            v(g, h);
            return g
        }(f);
        e.prototype.PlayerComponent = function(h) {
            function g(m, r, q) {
                var n = this;
                this._selector = r;
                this.config = {aid: null, page: 1, isbangumi: !1, share: {}, videoInfo: {}};
                g.__super__.constructor.call(this, m, this._selector, q);
                this.initialized = !1;
                this._page = HashManage.get("page") || 1;
                this.play_record_prev = "last_play_time_record";
                this.application.bindNotification("_load_video", function(s) {
                    !s || n._page == s && n.initialized || (n._page = s, n.load(), n.initialized = !0)
                });
                this.animateLock = !1;
                window.on_share_btn_click = function() {
                    n.onShare()
                };
                window.player_fullwin = function(s) {
                    s ? (n.container.addClass("fullwin"), $(".shortcut").hide()) : (n.container.removeClass("fullwin"), $(".shortcut").show())
                };
                this.config.isbangumi && this.loadBangumi();
                this.bindEvent();
                this.videoHistory();
                this.load()
            }
            v(g, h);
            g.prototype.videoHistory = function() {
                User.biliLoginStatus && User.biliLoginStatus.isLogin && $.ajax({url: "//api.bilibili.com/x/history/add", type: "post", data: {aid: this.config.aid, jsonp: "jsonp"}, xhrFields: {withCredentials: !0}, dataType: "json"})
            };
            g.prototype.bindEvent = function() {
                var m = this;
                m.lgWnd = $('<div class="float-wnd"><div class="txt">\u60a8\u5c1a\u672a\u767b\u5f55\u5e10\u53f7<br/>\u8bf7\u5148\u767b\u5f55<br/><a class="dl-btn" href="https://account.bilibili.com/login">\u7acb\u523b\u767b\u5f55</a></div><div class="close"></div></div>').on("click", ".close", function() {
                    m.lgWnd.hide()
                });
                $(".control-btn.btn-addFav").click(function() {
                    if ($(this).hasClass("active")) {
                        return !1
                    }
                    m.addFav(m.config.aid, $(this))
                });
                $(".control-btn.btn-share").bindShare({share: m.config.share});
                $(".up-follow").bindApplink({download: !1, mid: $(".up-follow").attr("user-id")});
                $(".video-info-span").click(function() {
                    var q = $(this).parent(), n = q.height() + 20;
                    q.css("height", "auto");
                    q.hasClass("auto") ? q.removeClass("auto") : q.addClass("auto");
                    var r = q.height() + 20;
                    q.css("height", n);
                    q.animate({height: r}, 300);
                    return !1
                })
            };
            g.prototype.loadBangumi = function() {
                var n = this, m = n.config.aid;
                window.seasonJsonCallback = function(s) {
                    if (0 == s.code) {
                        var r = s.result.newest_ep_index, q = formatFriendlyNumber(s.result.favorites);
                        $(".sp-update-num").html(r);
                        $(".sp-order-num").html(q);
                        $(".bangumi-list-wrp").empty();
                        $(".part-lst").hide();
                        if (s.result.episodes) {
                            for (r = 0; r < s.result.episodes.length; r++) {
                                q = s.result.episodes[r], $(".bangumi-list-wrp").append("<li " + (q.av_id == m && (0 == q.page || 0 != q.page && q.page == n._page) ? 'class="on"' : "") + ' data-index="' + q.index + '"><a href="/mobile/video/av' + q.av_id + ".html" + (0 != q.page ? "#page=" + q.page : "") + '" title="' + s.result.bangumi_title + " " + q.index + '"><span>' + q.index + "</span></a></li>")
                            }
                            $(".bangumi-list-wrp").find("li").click(function() {
                                $(this).addClass("on");
                                $(this).siblings().removeClass("on")
                            })
                        }
                        $(".sp-order-btn").bindApplink({true_season_id: !0, season_id: s.result.season_id})
                    }
                };
                $.ajax({url: "//app.bilibili.com/bangumi/avseason/" + m + ".ver", data: {}, dataType: "jsonp", jsonp: "callback", jsonpCallback: "seasonJsonCallback", error: function() {
                    }})
            };
            g.prototype.shareList = {weibo: {url: "http://service.weibo.com/share/share.php?url=$link&appkey=1727689474&pic=$pics&title=$comment&language=zh_cn"}, qzone: {url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=$link&desc=$comment&pics=$pics&style=203&width=98&height=22&otype=share"}, tieba: {url: "http://tieba.baidu.com/f/commit/share/openShareApi?url=$link&title=$title&desc=$comment$link"}};
            g.prototype.onShare = function() {
                var n = $(".control-btn.btn-share"), m = n.offset();
                0 < n.length && (n = $(".floating-share-wrp"), 0 < n.length ? (n.remove(), this.application.sendNotification("_show_float", [])) : (m.top - 50 >= $(window).scrollTop() ? $("body").append(this.buildShare(m.top - 60, m.left + 20, !1)) : $("body").append(this.buildShare(m.top + 50, m.left + 20, !0)), this.application.sendNotification("_hide_float", [])))
            };
            g.prototype.buildShare = function(n, m, r) {
                var q = this;
                r = $('<div class="floating-share-wrp ' + (r ? "reverse" : "") + '" style="height:' + $("body .app").height() + 'px">');
                n = $('<div class="floating-share-box" style="top:' + n + "px;left:" + (5 < m - 105 - 15 ? m - 105 - 15 : 5) + 'px">');
                m = $('<div class="share-list">');
                n.append('<div class="triangle-top">', m);
                m.append('<span class="label">\u5206\u4eab\u81f3\uff1a</span>');
                this.buildShareList(m);
                r.append(n);
                r.click(function() {
                    q.onShare()
                });
                return r
            };
            g.prototype.addFav = function(n, m) {
                var r = this, q;
                if (!User.biliLoginStatus || !User.biliLoginStatus.isLogin) {
                    return showDownloadPanel("\u8bf7\u5148\u767b\u5f55", "\u4e0d\u767b\u5f55\u7684\u8bdd\u65e0\u6cd5\u6536\u85cf\u54e6", "\u7acb\u523b\u767b\u5f55", function() {
                        window.location.href = "https://account.bilibili.com/login"
                    }), !1
                }
                $.ajax({url: "http://api.bilibili.com/favourite/add", data: {id: n, fav_box: 0, type: "jsonp"}, dataType: "jsonp", type: "post", success: function(s) {
                        q = s && s.data ? "\u5df2\u6dfb\u52a0\u8fdb\u6536\u85cf\u5939<br/>\u53ef\u4ee5\u5728\u5ba2\u6237\u7aef\u4e2d\u67e5\u770b\u5230" : "\u6536\u85cf\u5931\u8d25<br/>\u8bf7\u7a0d\u540e\u91cd\u8bd5~";
                        r.onAddFav(m, q);
                        ChatSaveSettings("last_addFav_time", Date.parse(new Date))
                    }, error: function() {
                        q = "\u7f51\u7edc\u9519\u8bef<br/>\u8bf7\u7a0d\u540e\u91cd\u8bd5~";
                        r.onAddFav(m, q)
                    }})
            };
            g.prototype.onAddFav = function(n, m) {
                var t = $(n).offset(), s, r;
                t.top + 50 <= $(window).height() ? (s = t.top + 50, r = t.left + 20, t = !0) : (s = t.top - 80, r = t.left + 20, t = !1);
                var q = $('<div class="floating-favor-box  ' + (t ? "reverse" : "") + '" style="top:' + s + "px;left:" + (r - 55 - 15) + 'px">');
                s = $('<div class="favor-list">');
                q.append('<div class="triangle-top">', s);
                s.append('<div class="label">' + m + "</div>");
                s = ChatGetSettings("last_addFav_time1") || 0;
                86400000 < Date.parse(new Date) - s && ($("body").append(q), setTimeout(function() {
                    q.animate({opacity: "0"}, function() {
                        q.remove()
                    })
                }, 2000));
                n.addClass("active")
            };
            g.prototype.buildShareList = function(n) {
                var m, s, r = this, q = this.container.find(".load-layer img").attr("src");
                for (m in this.shareList) {
                    s = $('<a href="javascript:void(0)" class="icon ' + m + '" provider="' + m + '"></a>'), s.click(function(u) {
                        u = r.shareList[$(this).attr("provider")].url;
                        var t, x, w = ["title", "comment", "link", "pics"];
                        for (t in w) {
                            t = w[t], x = r.config.share[t], "pics" == t && (!x && q) && (x = q), u = r.replaceAll(u, "$" + t, encodeURIComponent(x))
                        }
                        window.open(u)
                    }), n.append(s)
                }
            };
            g.prototype.replaceAll = function(n, m, q) {
                return n.replace(RegExp(m.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), q)
            };
            g.prototype.judgeConnection = function() {
                var n = parseInt(ChatGetSettings("last_judge_connection_time")) || 0, m = Date.parse(new Date);
                if (3600000 < m - n) {
                    ChatSaveSettings("last_judge_connection_time", m);
                    var n = navigator.connection || {type: 0}, m = !0, r;
                    switch (n.type) {
                        case n.CELL_2G:
                            m = !1, r = "2G";
                        case n.CELL_3G:
                            m = !1, r = "3G";
                        case n.CELL_4G:
                            m = !1, r = "4G"
                    }
                    if (!m && r) {
                        var q = $('<div class="float-hint">\u60a8\u6b63\u5728' + r + "\u7f51\u7edc\u4e0b\uff0c\u64ad\u653e\u89c6\u9891\u4f1a\u4ea7\u751f\u6d41\u91cf\u8d39\u7528</div>").appendTo($("#bofqi"));
                        setTimeout(function() {
                            q.animate({height: "0"}, 100, function() {
                                q.remove()
                            })
                        }, 2000)
                    }
                } else {
                    return !1
                }
            };
            g.prototype.judgeBuffHint = function(m) {
                this.buffTimeout = setTimeout(function() {
                    var n = $('<div class="float-hint advise"><i class="float-hide"></i>\u53ef\u80fd\u662f\u7f51\u7edc\u4e0d\u7a33\u5b9a\uff0c\u5efa\u8bae\u4f7f\u7528\u5ba2\u6237\u7aef\u89c2\u770b\u66f4\u5feb\u66f4\u6d41\u7545 <a href="' + m + '">\u70b9\u51fb\u4e0b\u8f7d</a></div>').appendTo($("#bofqi"));
                    $(".float-hide", n).click(function() {
                        clearTimeout(q);
                        n.remove()
                    });
                    var q = setTimeout(function() {
                        n && n.animate({opacity: "0"}, function() {
                            n.remove()
                        })
                    }, 5000)
                }, 5000)
            };
            g.prototype.clearJudgeBuffHint = function() {
                this.buffTimeout && clearTimeout(this.buffTimeout)
            };
            g.prototype.load = function() {
                var n = this, m;
                browser.version.MicroMessenger ? m = "http://a.app.qq.com/o/simple.jsp?pkgname=tv.danmaku.bili" : browser.version.android ? m = "http://dl.hdslb.com/mobile/latest/iBiliPlayer-bilih5.apk" : browser.version.ios ? (m = "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022?pt=10663829&ct=homeH5Offline&mt=8", browser.version.weibo && (m = "https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725")) : browser.version.windowsphone && (m = "https://www.windowsphone.com/zh-cn/store/purchase/validate?app=75620dee-4a7a-4dae-8677-0d930e05f57e&apptype=regular&offer=3869edb1-e34c-469a-af6e-2c8a7856cb61");
                this.container.html('<div class="hint">\u64ad\u653e\u5668\u52a0\u8f7d\u4e2d... > <</div>');
                $.getJSON(this.application._host + "m/html5?aid=" + this.config.aid + "&page=" + this._page, function(s) {
                    window.html5data = s || {};
                    var r = "", q = 0;
                    html5data.cid && html5data.cid.match(/[\d*]/g) ? (r = html5data.cid.match(/[\d*]/g).join(""), new n.application.RecommendComponent(n.application, ".recommend-comment", {cid: r, aid: n.config.aid, isbangumi: n.config.isbangumi})) : $(".recommend-comment").find(".channel-in").html('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>');
                    n.container.html('<link type="text/css" href="http://static.hdslb.com/css/simple.v2.min.css" rel="stylesheet" />');
                    $.getScript("http://static.hdslb.com/js/simple.v2.min.js", function() {
                        (new BiliH5Player).create({get_from_local: !0, comment: s.cid, image: s.img, video_url: s.src});
                        if (n.config.videoInfo.duration) {
                            var E = "aid_" + n.config.aid + "_play_" + n._page, D = JSON.parse(ChatGetSettings(n.play_record_prev));
                            if (D) {
                                var A = 0, z = {}, C;
                                for (C in D) {
                                    A++, D[C].ct && (z[D[C].ct] = C)
                                }
                                if (30 < A) {
                                    for (var w in z) {
                                        delete D[z[w]];
                                        break
                                    }
                                }
                            } else {
                                D = {}
                            }
                            0 < $(".bangumi-list-wrp").length ? (C = $(".bangumi-list-wrp .on").find("a").attr("title")) || (C = $(".sp-name").html()) : C = 0 < $("#part_list .lst").children().length ? $("#part_list .lst li[page='1']").text() === $("#part_list").attr("title") ? $(".video-title").html() : $("#part_list").attr("title") : $(".video-title").html();
                            $(".load-layer").append('<div class="player-inner-top">' + C + '</div><div class="player-total-time">' + n.config.videoInfo.duration + '</div><a class="player-inner-download" target="_blank">\u7c89\u8272\u6709\u89d2\u4e09\u500d\u901f\u7f13\u51b2\uff0c\u5c31\u7528bilibili\u5ba2\u6237\u7aef >></a>');
                            getDownloadUrl($(".load-layer").find(".player-inner-download"));
                            $(".load-layer").find(".player-inner-download").click(function(t) {
                                t.stopPropagation && t.stopPropagation()
                            });
                            A = n.config.videoInfo.duration.split(":");
                            for (C = 0; C < A.length; C++) {
                                1 == A[C].length && (A[C] = "0" + A[C])
                            }
                            n.config.videoInfo.duration = A.join(":");
                            1 == A.length && (n.config.videoInfo.duration = "00:" + n.config.videoInfo.duration);
                            $(".player-container .time-total-text").html(n.config.videoInfo.duration);
                            var y = n.container.find("video"), I, H = 0;
                            D[E] && (H = parseInt(D[E].t) >> 0);
                            if (0 < y.length) {
                                !browser.version.ios || browser.version.webApp && !browser.version.weibo || y.append('<track src="//www.bilibili.com/mobile/html5track.vtt" kind="caption" srclang="zh-cn" label="Chinese" default>');
                                $(".load-layer", n.container).click(function() {
                                    browser.version.ios && /MQQBrowser/i.test(navigator.userAgent) && $(".display", n.container).hide()
                                });
                                y.bind("waiting", function() {
                                    n.judgeConnection();
                                    n.judgeBuffHint(m)
                                });
                                y.bind("canplay", function() {
                                    n.clearJudgeBuffHint()
                                });
                                $(".buff-icon", n.container).click(function() {
                                    y[0].play()
                                });
                                var G, F = $('<div class="fullwin-hint"></div>');
                                $(".btn-widescreen", n.container).click(function() {
                                    clearTimeout(G);
                                    F.html((n.container.hasClass("fullwin") ? "\u8fdb\u5165" : "\u9000\u51fa") + "\u5168\u5c4f\u6a21\u5f0f").appendTo($(".player-box", n.container)).show();
                                    F.css("top", "-24pt");
                                    F.stop().animate({top: 0}, 300, function() {
                                        G = setTimeout(function() {
                                            F.fadeOut()
                                        }, 1500)
                                    })
                                });
                                10 < H && y.bind("loadstart", function() {
                                    var t = H, u = $('<div class="float-hint bottom-hint">\u60a8\u4e0a\u6b21\u89c2\u770b\u5230<span class="last-time">' + n.fmSeconds(H) + '</span><span class="jump-time">\u8df3\u8f6c</span></div>').appendTo($("#bofqi"));
                                    $(".jump-time", u).click(function() {
                                        u.remove();
                                        y[0].pause();
                                        y[0].currentTime = t;
                                        y[0].play()
                                    });
                                    setTimeout(function() {
                                        u.animate({opacity: "0"}, function() {
                                            u.remove()
                                        })
                                    }, 5000)
                                });
                                y.bind("play", function() {
                                    n.clearJudgeBuffHint();
                                    clearInterval(n.saveNowTime);
                                    n.saveNowTime = setInterval(function() {
                                        I = parseInt(y[0].currentTime) || 0;
                                        0 < Math.abs(I - H) && 10 < I && (D[E] = {t: I, ct: +new Date}, ChatSaveSettings(n.play_record_prev, JSON.stringify(D)), H = I)
                                    }, 1000);
                                    if (!q) {
                                        var t = {aid: n.config.aid, cid: +r, part: +HashManage.get("page") || 1, did: __GetCookie("sid") || Math.random().toString(36).slice(-8), ftime: __GetCookie("fts") || parseInt(new Date / 1000, 10), jsonp: "jsonp"};
                                        try {
                                            var x = window.sessionStorage && window.sessionStorage.bili_login_status, x = JSON.parse(x);
                                            x[1].isLogin ? (t.mid = x[3], t.lv = x[1].level_info.current_level) : (t.mid = "", t.lv = "")
                                        } catch (u) {
                                            t.mid = "", t.lv = ""
                                        }
                                        $.ajax({url: "//api.bilibili.com/x/report/click/now", type: "get", data: {jsonp: "jsonp"}, xhrFields: {withCredentials: !0}, dataType: "json"}).done(function(J) {
                                            J && 0 == J.code && (t.stime = J.data.now, $.ajax({url: "//api.bilibili.com/x/report/click/h5", type: "post", data: t, xhrFields: {withCredentials: !0}, dataType: "json"}).done(function() {
                                                q = !0
                                            }))
                                        })
                                    }
                                });
                                y.bind("ended", function() {
                                    browser.version.ios && /MQQBrowser/i.test(navigator.userAgent) && $(".display", n.container).show();
                                    n.saveNowTime && (clearInterval(n.saveNowTime), ChatSaveSettings(E, 0));
                                    $(".control-bar, .state-icon", n.container).addClass("hide");
                                    $(".play-over-cover").remove();
                                    var t = $('<div class="play-over-cover"><div class="player-inner-top pink"><span class="top-inner-text">\u7528\u5ba2\u6237\u7aef\uff0c\u65b0\u756a\u66f4\u65b0\uff0c\u5feb\u4eba\u4e00\u6b65\uff01</span><a target="_blank"><i class="icons icons-app-white"></i>\u4e0b\u8f7dAPP</a></div></div>');
                                    $(".display", n.container).append(t);
                                    getDownloadUrl(t.find("a"));
                                    $('<div class="play-over-btn play-replay-btn"><i class="icons icons-replay"></i><div>\u91cd\u65b0\u64ad\u653e</div></div>').appendTo(t).click(function() {
                                        t.remove();
                                        $(".control-bar, .state-icon", n.container).removeClass("hide");
                                        y[0].pause();
                                        y[0].currentTime = 0;
                                        y[0].play()
                                    });
                                    var x = $('<div class="play-over-btn play-share-btn"><i class="icons icons-share-bg"></i><div>\u5206\u4eab</div></div>');
                                    x.click(function() {
                                        $(".btn-share").click()
                                    });
                                    var u = $('<div class="play-over-btn play-next-btn"><i class="icons icons-next"></i><div>\u64ad\u653e\u4e0b\u4e00P</div></div>');
                                    u.click(function() {
                                        t.remove();
                                        n.play_next_auto = !0;
                                        window.location.hash = "page=" + (parseInt(n._page) + 1)
                                    });
                                    0 != $("#part_list").length ? ($("#part_list .on"), parseInt(n._page) < parseInt($("#part_list").attr("total_page")) >> 0 ? (u.appendTo(t), t.find(".top-inner-text").html("\u7528\u5ba2\u6237\u7aef\uff0c\u5207\u6362\u5206P\uff0c\u4e0d\u7528\u7b49\u5f85\uff01")) : x.appendTo(t)) : x.appendTo(t)
                                })
                            }
                        }
                    })
                }).fail(function() {
                    var q = $('<a href="javascript:void(0)">\u70b9\u6211\u5237\u65b0</a>');
                    q.click(function() {
                        n.load()
                    });
                    n.container.html('<div class="hint"> >O<\uff01\u52a0\u8f7d\u5931\u8d25\uff0c\u60a8\u53ef\u4ee5 </div>');
                    q.appendTo(n.container.find(".hint"))
                })
            };
            g.prototype.fmSeconds = function(n) {
                var m;
                n = Math.floor(n);
                m = ("0" + n % 60).slice(-2);
                m = Math.floor(n / 60) + ":" + m;
                5 > m.length && (m = "0" + m);
                return m
            };
            return g
        }(f);
        e.prototype.AppLinkComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.config = {aid: null, season_id: null, spid: null, share: {}};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.timeout = this.timer = null;
                this.autoLaunch = !1;
                this.init()
            }
            v(g, h);
            g.prototype.init = function() {
                this.container.find(".b-app-dl");
                this.href = "http://app.bilibili.com";
                browser.version.MicroMessenger ? this.href = "http://a.app.qq.com/o/simple.jsp?pkgname=tv.danmaku.bili" : browser.version.android ? this.href = "http://dl.hdslb.com/mobile/latest/iBiliPlayer-bilih5.apk" : browser.version.ios ? (this.href = this.config.aid ? "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022?pt=10663829&ct=homeH5Install&mt=8" : "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022?pt=10663829&ct=homeH5Front&mt=8", browser.version.weibo && (this.href = "https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725")) : browser.version.windowsphone && (this.href = "https://www.windowsphone.com/zh-cn/store/purchase/validate?app=75620dee-4a7a-4dae-8677-0d930e05f57e&apptype=regular&offer=3869edb1-e34c-469a-af6e-2c8a7856cb61");
                if (this.config.aid || this.config.spid) {
                    "true" == HashManage.get("auto_launch") && (this.autoLaunch = !0, HashManage.set("auto_launch", !1)), this.addLaunchBtn()
                }
            };
            g.prototype.addLaunchBtn = function() {
                var n = this;
                if (n.config.spid) {
                    n.container.find(".b-app-dl .dl-area").bindApplink({download: !1, aid: n.config.aid, season_id: n.config.season_id, spid: n.config.spid, room_id: n.config.room_id, title: "\u7f13\u5b58\u5230\u5ba2\u6237\u7aef", content: "\u514d\u6d41\u91cf\u968f\u65f6\u89c2\u770b", isBuffBtn: !0})
                } else {
                    var m = setInterval(function() {
                        if ($(".player-container").length && (clearInterval(m), !$(".player-container .launch-app").length)) {
                            var q = $('<a class="launch-app">\u7528\u5ba2\u6237\u7aef\u6253\u5f00</a>').appendTo("#video-opt");
                            $("body").append('<div class="loading-box-wrp" style="display:none"><div class="loading-box-cell"><div class="loading-box"><div class=\'lable\'>\u6b63\u5728\u6253\u5f00\u5ba2\u6237\u7aef</div><img src=\'http://static.hdslb.com/images/app-loading.gif\'></div></div></div>');
                            q.click(function() {
                                $(".loading-box-wrp").show();
                                setTimeout(function() {
                                    $(".loading-box-wrp").hide()
                                }, 2000)
                            });
                            q.bindApplink({download: !1, aid: n.config.aid, season_id: n.config.season_id, spid: n.config.spid, room_id: n.config.room_id, isBuffBtn: !1});
                            $(".control-btn.btn-download").bindApplink({download: !1, aid: n.config.aid, season_id: n.config.season_id, spid: n.config.spid, room_id: n.config.room_id, title: "\u7f13\u5b58\u5230\u5ba2\u6237\u7aef", content: "\u514d\u6d41\u91cf\u968f\u65f6\u89c2\u770b", isBuffBtn: !0})
                        }
                    }, 50)
                }
            };
            g.prototype.analysis = function() {
                var m = this.request("from");
                null != m && "" != m && (m = "http://bili-infoc.biligame.com/get?actionname=cooperate_analysis&from=" + m + "&id=" + this.config.aid + "&t=av&type=2", $("#analysis").attr("src", m))
            };
            g.prototype.request = function(n) {
                for (var m = location.href, m = m.substring(m.indexOf("?") + 1, m.length).split("&"), r = {}, q = 0; j = m[q]; q++) {
                    r[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
                }
                n = r[n.toLowerCase()];
                return"undefined" == typeof n ? "" : n
            };
            return g
        }(f);
        e.prototype.CounterComponent = function(h) {
            function g(m, r, q) {
                var n = this;
                this._selector = r;
                this.config = {attr: "counter", regexp: "", unit: {"\u4e07": 10000}};
                g.__super__.constructor.call(this, m, this._selector, q);
                this.application.bindNotification("_counter", function() {
                    n.execute()
                });
                this.execute()
            }
            v(g, h);
            g.prototype.execute = function() {
                var m = this;
                this.container = $(this._selector);
                this.container.each(function() {
                    var n = $(this).html(), s = parseInt($(this).attr(m.config.attr)), r, q;
                    $(this).removeAttr(m.config.attr);
                    for (q in m.config.unit) {
                        r = m.config.unit[q];
                        if (s >= r) {
                            return s = (s / r).toFixed(1) + " " + q, n = n.replace(m.config.regexp, s), $(this).html(n)
                        }
                        if (!s) {
                            return $(this).html(n.replace(m.config.regexp, "--"))
                        }
                    }
                    return $(this).html(n.replace(m.config.regexp, s))
                })
            };
            return g
        }(f);
        e.prototype.PartComponent = function(h) {
            function g(m, r, q) {
                var n = this;
                this._selector = r;
                this.config = {itemHeight: 45, length: 3, page: 1};
                g.__super__.constructor.call(this, m, this._selector, q);
                this._page = HashManage.get("page") || 1;
                this.isCr = !1;
                this._idx = 0;
                this._lst = this.container.find(".lst");
                this._currItm = this._lst.find("li[page='" + this._page + "']").addClass("on");
                this.application.bindNotification("_page_change", function(s) {
                    n.pageChange(s)
                });
                this._width = 0;
                m = null;
                this._currItm.length && (m = this._currItm.html().match(/\[\[(.*)\]\]/));
                null != m && ("undefined" != typeof m[1] && "copyright" == m[1]) && (this.isCr = !0, this._currItm.remove(), this.getItem().each(function(t, s) {
                    $(s).html($(s).html().replace(/.*\u3001/, ""));
                    n._width += $(s).width() + 15
                }));
                this.getItem();
                this.hashChange();
                this.getItem().on("click", function() {
                    var s = $(this);
                    if (!s.hasClass("on")) {
                        return page = parseInt(s.attr("page")), window.location.hash = "page=" + page, n.toggleBtn && (n.container.addClass("collapsed"), n.toggleBtn.addClass("collapsed")), $("html, body").animate({scrollTop: 0}, 500), !1
                    }
                });
                this.partSpan()
            }
            v(g, h);
            g.prototype.partSpan = function() {
                var n = this;
                this.container.attr({total_page: this._lst.children().length, title: this._lst.find(".on a").html()});
                if (4 < this._lst.children().length) {
                    var m = $("<div/>"), r = $('<li class="part-lst-more">\u67e5\u770b\u5168\u90e8\uff08\u5171' + this._lst.children().length + "P\uff09</li>"), q = this;
                    this._lst.children(":gt(2)").appendTo(m);
                    r.appendTo(this._lst);
                    r.click(function() {
                        m.children().appendTo(q._lst);
                        q._lst.find("li").removeClass("on");
                        q._lst.find("li[page=" + q._page + "]").addClass("on");
                        $(this).remove();
                        hide_btn = $('<li class="part-lst-more hide">\u6536\u8d77\u5217\u8868</li>').appendTo(q._lst);
                        hide_btn.click(function() {
                            var s = n.container.offset().top;
                            $("html, body").scrollTop(s);
                            $(this).remove();
                            q.partSpan()
                        })
                    });
                    this._lst.addClass("initialized")
                }
            };
            g.prototype.hashChange = function() {
                var m;
                m = location.hash && 0 <= location.hash.indexOf("page=") ? location.hash.match(/page=([\d]*)/)[1] : this._page;
                !this.isCr || 1 != m && void 0 !== m || (m = 2);
                this.container.attr({title: this._lst.find("[page=" + m + "] a").html()});
                this.application.sendNotification("_page_change", [m]);
                this.application.sendNotification("_load_video", [m])
            };
            g.prototype.pageChange = function(m) {
                m && (this._page = m, this.getItem().removeClass("on"), this._currItm = this._lst.find("li[page='" + m + "']").addClass("on"), this._idx = this._currItm.index(), this.container.hasClass("collapsed") && this.fixPos())
            };
            g.prototype.expandable = function() {
                var m = this;
                this.toggleBtn = $('<div class="part-collapse"></div>');
                this.toggleBtn.addClass("collapsed");
                this.container.before(this.toggleBtn);
                this.toggleBtn.click(function() {
                    m.toggle()
                })
            };
            g.prototype.expand = function() {
                this.container.removeClass("collapsed").css("height", "auto")
            };
            g.prototype.collapse = function() {
                return this.container.addClass("collapsed").css("height", (this.config.length * this.config.itemHeight + this.config.itemHeight / 2) / 16 + "rem")
            };
            g.prototype.getItem = function() {
                return this._lst.find("li")
            };
            g.prototype.fixPos = function() {
            };
            g.prototype.toggle = function() {
                this.container.hasClass("collapsed") ? (this.expand(), this.toggleBtn.removeClass("collapsed"), this._lst.css("top", ""), window.scroll(0, this._currItm.offset().top - 2 * this.config.itemHeight), this.scrollbar.scroller.options.eventPassthrough = !0, this.scrollbar.scroller.disable()) : (this.collapse(), this.toggleBtn.addClass("collapsed"), this.fixPos(), this.scrollbar.scroller.enable())
            };
            return g
        }(f);
        e.prototype.SubListComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.config = {selectMenu: !0};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.init()
            }
            v(g, h);
            g.prototype.init = function() {
                this.list = $('<div class="list suggest"><div class="title">\u672c\u533a\u63a8\u8350</div><div class="list-body"></div></div><div class="list recently"><div class="title"><span class="t">\u76f8\u5173\u89c6\u9891</span></div><div class="list-body"></div></div>').appendTo(this.container);
                if (this.config.selectMenu) {
                    var m = $('<div class="b-slt"></div>').insertAfter(this.list.find(".title .t"));
                    $('<div class="b-slt-list unselectable" id="list_sort"><ul><li order="default">\u65b0\u6295\u7a3f</li><li order="stow">\u6536\u85cf\u6570</li><li order="hot">\u70b9\u51fb\u6570</li><li order="review">\u8bc4\u8bba\u6570</li><li order="damku">\u5f39\u5e55\u6570</li><li order="promote">\u786c\u5e01\u6570</li></ul></div>').insertAfter(m)
                }
            };
            return g
        }(f);
        e.prototype.ListComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.loadingFlag = !1;
                this.initializingStatus = $('<div class="b-loading">loading...</div>');
                this.config = {totalPage: 1, api: m._host + "mobile/list", order: "default", origin: "", pagesize: null, platform: null, tid: null, loadMore: !1, selectMenu: null};
                this._page = 1;
                this.nomore = $('<div class="b-loading nomore">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86~</div>');
                this.errorMsg = $('<div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div>');
                g.__super__.constructor.call(this, m, this._selector, n);
                this.listEffect = new ListEffect;
                this.setup()
            }
            v(g, h);
            g.prototype.loading = function(m) {
                if ("boolean" != typeof m) {
                    return this.loadingFlag
                }
                this.loadingFlag = m;
                !this.loadingFlag && this.initializingStatus.parent().length && this.initializingStatus.remove();
                this.config.loadMore && (this.loadingFlag ? this.loadBtn.html("\u52a0\u8f7d\u4e2d...") : this.loadBtn.html("\u52a0\u8f7d\u66f4\u591a"))
            };
            g.prototype.more = function(m) {
                this.config.loadMore && (m ? this.loadBtn.appendTo(this.container).show() : this.loadBtn.hide())
            };
            g.prototype.setup = function() {
                var m = this;
                this.config.selectMenu && (this.selectMenu = $(this.config.selectMenu), c.bind({item: this.selectMenu, list: $("#list_sort"), onChange: function(n) {
                        m.config.order = n.attr("order");
                        m.load()
                    }}));
                this.config.loadMore && (this.loadBtn = $("<a class='list-item load-more' href='javascript:void(0)'>\u52a0\u8f7d\u66f4\u591a</a>"), this.loadBtn.click(function() {
                    m.next()
                }));
                this.load()
            };
            g.prototype.load = function() {
                this._page = 1;
                this.container.empty();
                this.initializingStatus.appendTo(this.container);
                this.next()
            };
            g.prototype.reload = function(m) {
                g.__super__.constructor.call(this, this.application, this._selector, m);
                this.setup()
            };
            g.prototype.setConfig = function(n) {
                for (var m in n) {
                    this.config[m] = n[m]
                }
                return this.config
            };
            g.prototype.next = function() {
                if (!this.loading()) {
                    this.loading(!0);
                    var n = this, m = this.config.origin, m = "/" + this.config.order + "-" + this.config.tid + "-" + this._page + "-" + this.getDay() + m + ".html";
                    $.ajax({url: this.config.api + m, success: function(q) {
                            n.config.totalPage = parseInt($(q).attr("pages")) || 0;
                            n.loading(!1);
                            n.container.append(q);
                            n.config.pagesize && n.container.find(".list-item").each(function(r, t) {
                                var s = $(t);
                                s.index() >= n.config.pagesize && s.remove()
                            });
                            n._page < n.config.totalPage || $(q).find(".list-item").length ? (n._page++, n.application.lazyImage.lazy(n.container), n.listEffect.lazy(n.container), n.more(!0), n.application.sendNotification("_counter", [])) : (n.more(!1), n.nomore.appendTo(n.container))
                        }, error: function() {
                            n.errorMsg.appendTo(n.container);
                            n.loading(!1)
                        }})
                }
            };
            g.prototype.getDay = function(n) {
                var m = new Date;
                m.setTime(m.getTime() - 86400000 * (n || 7));
                return m.toYMD() + "~" + (new Date).toYMD()
            };
            g.prototype.sign = function(n, m, s) {
                m = [];
                for (var r in n) {
                    m.push(r)
                }
                m.sort();
                var q = "";
                for (r = 0; r < m.length; r++) {
                    q += (q ? "&" : "") + m[r] + "=" + encodeURIComponent(n[m[r]])
                }
                return hex_md5(q + s)
            };
            return g
        }(f);
        e.prototype.RankingComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.config = {type: null, tid: 0};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.dataBuffer = [];
                this.list = this.container.find(".ranking-body");
                this.menu = this.container.find(".rank-links");
                this.loadingMsg = $('<div class="b-loading">loading...</div>');
                this.listEffect = new ListEffect;
                this.init()
            }
            v(g, h);
            g.prototype.init = function() {
                var m = this;
                this.config.type || this.setType();
                this.menu.find('li[type="' + this.config.type + '"]').addClass("on");
                this.menu.find("li").on("click", function() {
                    var n = $(this), q = $(this).attr("type");
                    n.hasClass("on") || (m.menu.find("li").removeClass("on"), n.addClass("on"), "bangumi" == q ? m.subMenu.hide() : (m.subMenu.show(), m.scrollbar.resize()), m.setType(q), m.load())
                });
                this.subMenu = $('<div class="roll-bar ranking"><ul class="roll-bar-in"><li class="on" tid="0"><a>\u5168\u7ad9</a></li><li tid="1"><a>\u52a8\u753b</a></li><li tid="3"><a>\u97f3\u4e50</a></li><li tid="129"><a>\u821e\u8e48</a></li><li tid="4"><a>\u6e38\u620f</a></li><li tid="36"><a>\u79d1\u6280</a></li><li tid="160"><a>\u751f\u6d3b</a></li><li tid="5"><a>\u5a31\u4e50</a></li><li tid="23"><a>\u7535\u5f71</a></li><li tid="119"><a>\u9b3c\u755c</a></li><li tid="155"><a>\u65f6\u5c1a</a></li><li tid="11"><a>\u7535\u89c6\u5267</a></li></ul></div>').insertAfter(this.menu);
                this.scrollbar = this.application.load("Roll", ".roll-bar.ranking");
                "bangumi" == this.config.type && this.subMenu.hide();
                this.subMenu.find("li").on("click", function() {
                    var n = $(this);
                    n.hasClass("on") || (m.subMenu.find("li").removeClass("on"), n.addClass("on"), m.scrollbar.scrollToElem(n), m.config.tid = n.attr("tid"), m.load())
                });
                this.load()
            };
            g.prototype.setType = function(m) {
                m ? this.config.type = m : (m = location.hash.match(/type=(.*)/), this.config.type = m && m[1] ? m[1] : "all");
                return this.config.type
            };
            g.prototype.load = function() {
                var n = this, m = this.config.type, q = this.config.tid;
                this.list.empty();
                this.loadingMsg.appendTo(this.list);
                "bangumi" == m && (m = "all", q = 33);
                this.application.ajaxQueue.ajax({useBuffer: !0, url: this.application._host + "index/rank/" + m + "-7-" + q + ".json", dataType: "json", success: function(r) {
                        n.loadingMsg.remove();
                        n.render(r.rank)
                    }, error: function() {
                        n.loadingMsg.remove();
                        $('<div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div>').appendTo(n.list)
                    }})
            };
            g.prototype.render = function(n) {
                var m = 0, s;
                for (s in n.list) {
                    if (30 <= m) {
                        break
                    }
                    var r = n.list[s], q = parseInt(s) + 1, r = $('<li><a class="list-item" href="/mobile/video/av' + r.aid + '.html"><div class="l"><div class="cover" data-img="' + r.pic + '"><div class="rank"><span class="rank-num">' + q + '</span></div></div></div><div class="r"><div class="r-box"><div class="title">' + r.title + '</div><div class="meta"><div class="up">UP\u4e3b\uff1a<span>' + r.author + "</span></div></div></div></div></a></li>").appendTo(this.list);
                    3 > s && r.find(".rank").addClass("top");
                    m++
                }
                this.application.lazyImage.lazy(this.list);
                this.listEffect.lazy(this.list)
            };
            return g
        }(f);
        e.prototype.TagComponent = function(h) {
            function g(m, s, r) {
                this._selector = $(s);
                this.box = this._selector.find(".channel-in");
                this.listEffect = new ListEffect;
                this.config = {tag_id: null, url: "/tag/partials/list"};
                g.__super__.constructor.call(this, m, this._selector, r);
                this.init();
                var q = $(".tag-description"), n = $(".tag-show-description");
                q.css("height", "auto");
                60 < q.height() ? (n.find(".icons-span").css("display", "inline-block"), q.css("height", "60px"), $(".tag-description, .tag-show-description").click(function() {
                    if (self.animateLock) {
                        return !1
                    }
                    self.animateLock = !0;
                    if (n.hasClass("auto")) {
                        q.stop().animate({height: "60px"}, 300, function() {
                            self.animateLock = !1;
                            n.removeClass("auto")
                        })
                    } else {
                        q.css("height", "auto");
                        var t = q.height();
                        q.css("height", "60px");
                        q.stop().animate({height: t}, 300, function() {
                            self.animateLock = !1;
                            n.addClass("auto")
                        })
                    }
                })) : n.hide()
            }
            v(g, h);
            g.prototype.init = function(n) {
                n = n ? n : 1;
                var m = this, q = $(".tag-head .tag-head-name span").eq(0).text() || "";
                this.application.ajaxQueue.ajax({url: m.config.url, dataType: "json", data: {page: n, pagesize: 20, order: "senddate", tag_id: m.config.tag_id, mobile: 1}, success: function(r) {
                        0 == r.code ? (m._selector.find(".load-more").parent().remove(), m.box.append(r.body), m.application.lazyImage.lazy(m.box), m.listEffect.lazy(m.box), m.pagination = m._selector.find(".load-more"), m.loadingError = m._selector.find(".b-loading.error"), m.loadingError && m.loadingError.append('<a class="tag-search-btn" href="http://www.bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(q) + '">\u641c\u7d22' + q + "</a>"), m.pagination.hasClass("disabled") && m.pagination.replaceWith('<a class="list-item load-more in list-search" href="http://www.bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(q) + '">\u641c\u7d22' + q + "</a>"), m.pagination.bind("click", function() {
                            $(this).hasClass("disabled") || ($(this).addClass("disabled"), $(this).html("\u52a0\u8f7d\u4e2d..."), m.init(n + 1))
                        })) : $('<div class="list"><a class="list-item load-more in list-search" href="http://www.bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(q) + '">\u641c\u7d22' + q + "</a></div>").appendTo(m.box)
                    }, error: function() {
                        $('<div class="list"><a class="list-item load-more in list-search" href="http://www.bilibili.com/mobile/search.html?keyword=' + encodeURIComponent(q) + '">\u641c\u7d22' + q + "</a></div>").appendTo(m.box)
                    }})
            };
            return g
        }(f);
        e.prototype.BangumiComponent = function(h) {
            function g(m, q, n) {
                this._selector = $(q);
                this.box = this._selector.find(".channel-in");
                this.listEffect = new ListEffect;
                this.config = {season_id: null};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.init()
            }
            v(g, h);
            g.prototype.init = function() {
                var n = this;
                n.config && n.config.season_id && n._selector.find(".order-btn").bindApplink({true_season_id: !0, season_id: n.config.season_id});
                if (0 == n.box.length) {
                    return !1
                }
                8 < n.box.find("li").length ? n.fakePagination() : (n.application.lazyImage.lazy(n.box), n.listEffect.lazy(n.box));
                n.recommend = n._selector.find("#recommend_list");
                0 < n.recommend.children().length && n.application.lazyImage.lazy(n.recommend);
                0 < n._selector.find(".bangumi-list-wrp").children().length && n._selector.find(".play-btn").attr("href", n._selector.find(".bangumi-list-wrp").children(":first").find("a").attr("href"));
                var m = n._selector.find(".bangumi-description"), q = n._selector.find(".bangumi-show-description");
                m.css("height", "auto");
                36 < m.height() && (q.find(".icons-span").css("display", "inline-block"), m.css("height", "36px"), n._selector.find(".bangumi-description, .bangumi-show-description").click(function() {
                    if (n.animateLock) {
                        return !1
                    }
                    n.animateLock = !0;
                    if (q.hasClass("auto")) {
                        m.stop().animate({height: "36px"}, 300, function() {
                            n.animateLock = !1;
                            q.removeClass("auto")
                        })
                    } else {
                        m.css("height", "auto");
                        var r = m.height();
                        m.css("height", "36px");
                        m.stop().animate({height: r}, 300, function() {
                            n.animateLock = !1;
                            q.addClass("auto")
                        })
                    }
                }))
            };
            g.prototype.fakePagination = function() {
                var n = this, m = $("<div/>");
                n.box.find("li:gt(7)").appendTo(m);
                n.application.lazyImage.lazy(n.box);
                n.listEffect.lazy(n.box);
                n.pagination = $('<li class="list"><a class="list-item load-more" href="javascript:void(0)">\u8bf7\u7ed9\u6211\u66f4\u591a!</a></li>').appendTo(n.box);
                n.pagination.bind("click", function() {
                    m.each(function(q, r) {
                        $(r).appendTo(n.box)
                    });
                    n.application.lazyImage.lazy(n.box);
                    n.listEffect.lazy(n.box);
                    $(this).remove();
                    n.box.append('<li class="list"><a class="list-item load-more disabled" >\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86</a></li>')
                })
            };
            return g
        }(f);
        e.prototype.RecommendComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.config = {cid: null, aid: null, isbangumi: !1};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.box = this.container.find(".channel-in");
                this.config.cid ? (this.listEffect = new ListEffect, this.init()) : this.box.html('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>')
            }
            v(g, h);
            g.prototype.init = function() {
                this.load()
            };
            g.prototype.load = function() {
                var n = this, m = "http://comment.bilibili.com/recommendnew," + this.config.aid;
                this.box.empty();
                this.loadingMsg = $('<li class="list"><div class="b-loading">loading...</div></li>');
                this.loadingMsg.appendTo(this.box);
                this.application.ajaxQueue.ajax({useBuffer: !1, url: m, dataType: "json", success: function(q) {
                        n.box.empty();
                        q ? n.render(q) : $('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>').appendTo(n.box)
                    }, error: function() {
                        n.loadingMsg.remove();
                        $('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>').appendTo(n.box)
                    }})
            };
            g.prototype.render = function(n) {
                for (var m = 0; m < n.data.length && !(30 <= m); m++) {
                    var q = n.data[m];
                    $('<li><div class="item"><div class="cover" data-img="' + q.pic + '"><a href="/mobile/video/av' + q.aid + '.html" title="' + q.title + '"></a></div><span class="video-title"><a href="/mobile/video/av' + q.aid + '.html" title="' + q.title + '">' + q.title + '</a></span><div class="video-meta"><div class="video-cell"><span class="icons icons-play"></span><span counter="' + q.stat.view + '"></span></div><div class="video-cell"><span class="icons icons-danmaku"></span><span counter="' + q.stat.danmaku + '"></span></div></div></div></li>').appendTo(this.box)
                }
                new this.application.CounterComponent(this.application, "*[counter]");
                8 < this.box.find("li").length ? this.fakePagination() : (this.application.lazyImage.lazy(this.box), this.listEffect.lazy(this.box))
            };
            g.prototype.renderBangumi = function(n) {
                for (var m = 0, r = 0; r < n.length && !(30 <= m); r++) {
                    var q = n[r];
                    q.season_info && (m += 1, q = {id: q.season_info.season_id, name: encodeURIComponent(q.season_info.title), pic: q.season_info.cover, title: q.season_info.title, categories: q.season_info.categories.join("/"), pubtime: q.season_info.pub_time.slice(0, 4)}, $('<li><div class="item bangumi-item"><div class="cover" data-img="' + q.pic + '"><a href="/mobile/bangumi/i/' + q.id + '" title="' + q.title + '"></a></div><span class="video-title"><a href="/mobile/bangumi/i/' + q.id + '" title="' + q.title + '">' + q.title + '</a></span><div class="video-meta"><span class="video-time">' + q.pubtime + '</span><span class="video-category">' + q.categories + "</span></div></div></li>").appendTo(this.box))
                }
                new this.application.CounterComponent(this.application, "*[counter]");
                0 === m ? browser.version.weibo ? $('<div class="download-link"><a class="download-link-btn" target="_blank" href="https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725">\u4e0b\u8f7dbilibili\u5ba2\u6237\u7aef\uff0c\u67e5\u770b\u66f4\u591a\u63a8\u8350</a></div>').appendTo(this.box) : $('<div class="download-link"><a class="download-link-btn" target="_blank" href="https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022">\u4e0b\u8f7dbilibili\u5ba2\u6237\u7aef\uff0c\u67e5\u770b\u66f4\u591a\u63a8\u8350</a></div>').appendTo(this.box) : 8 < m ? this.fakePagination() : (this.application.lazyImage.lazy(this.box), this.listEffect.lazy(this.box))
            };
            g.prototype.fakePagination = function() {
                var n = this, m = $("<div/>");
                n.box.find("li:gt(7)").appendTo(m);
                n.application.lazyImage.lazy(n.box);
                n.listEffect.lazy(n.box);
                n.pagination = $('<li class="list"><a class="list-item load-more" href="javascript:void(0)">\u8bf7\u7ed9\u6211\u66f4\u591a!</a></li>').appendTo(n.box);
                n.pagination.bind("click", function() {
                    m.each(function(q, r) {
                        $(r).appendTo(n.box)
                    });
                    n.application.lazyImage.lazy(n.box);
                    n.listEffect.lazy(n.box);
                    $(this).remove();
                    n.box.append('<li class="list"><a class="list-item load-more disabled" >\u6ca1\u6709\u66f4\u591a\u4fe1\u606f\u4e86</a></li>')
                })
            };
            return g
        }(f);
        e.prototype.CommentComponent = function(h) {
            function g(m, q, n) {
                this._selector = q;
                this.config = {aid: null, type: "aid", orderby: "default"};
                g.__super__.constructor.call(this, m, this._selector, n);
                this.box = this.container.find(".comment-in");
                if (this.config.aid) {
                    this.navigation = this.container.find(".rc-navigator-li");
                    this.id_name = "aid";
                    switch (this.config.type) {
                        case"topic":
                            this.id_name = "tp_id";
                            break;
                        case"news":
                            this.id_name = "news_id"
                    }
                    this.dataBuffer = [];
                    this.list = this.container.find(".ranking-body");
                    this.listEffect = new ListEffect;
                    this.init()
                } else {
                    this.box.html('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>')
                }
            }
            v(g, h);
            g.prototype.init = function() {
                this.navigation.click(function() {
                    $(this).hasClass("on") || ($(this).addClass("on"), $(this).siblings().removeClass("on"), $("[target-role]").hide(), $('[target-role="' + $(this).attr("role") + '"]').show())
                });
                this.load(1)
            };
            g.prototype.load = function(n) {
                var m = this;
                this.box.empty();
                this.loadingMsg = $('<li class="list"><div class="b-loading">loading...</div></li>');
                this.loadingMsg.appendTo(this.box);
                this.application.ajaxQueue.ajax({useBuffer: !0, url: "http://api.bilibili.com/x/reply", data: {jsonp: "jsonp", type: 1, sort: 2, oid: m.config.aid, pn: n, nohot: 1}, dataType: "jsonp", success: function(q) {
                        m.loadingMsg.remove();
                        if (q && 0 === q.code) {
                            q = q.data;
                            m.container.find(".comment-num").html(q.page.count).show();
                            var r = q.replies;
                            if (q.replies && 0 !== q.replies.length) {
                                6 < q.replies.length && (r = q.replies.slice(0, 5))
                            } else {
                                return $('<li class="list"><div class="download-link"><a class="download-link-btn" target="_blank">\u7acb\u5373\u4e0b\u8f7dbilibili\u5ba2\u6237\u7aef\uff0c\u62a2\u4e0b\u6c99\u53d1</a></div></li>').appendTo(m.box), getDownloadUrl($(".download-link-btn")), !0
                            }
                            for (q = 0; q < r.length; q++) {
                                m.box.append('<li class="list"><div class="rc-container clearfix"><a class="rc-pic" href="http://space.bilibili.com/' + r[q].mid + '"><img src="' + r[q].member.avatar + '" /></a><div class="rc-main"><div class="rc-head clearfix"><a class="rc-name" href="http://space.bilibili.com/' + r[q].mid + '">' + r[q].member.uname + '</a><span class="rc-time">' + m.getHumanTime(r[q].ctime) + '</span></div><div class="rc-comment">' + r[q].content.message + "</div></div></div></li>")
                            }
                            m.box.after('<div class="download-link"><a class="download-link-btn" target="_blank">\u4e0b\u8f7dbilibili\u5ba2\u6237\u7aef\uff0c\u67e5\u770b\u5168\u90e8\u8bc4\u8bba</a></div>');
                            getDownloadUrl($(".download-link-btn"))
                        } else {
                            $('<li class="list"><div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div></li>').appendTo(m.box)
                        }
                    }, error: function() {
                        m.loadingMsg.remove();
                        $('<div class="b-loading load-fail">\u52a0\u8f7d\u5931\u8d25( >\ufe4f<\u3002)\uff5e</div>').appendTo(m.box)
                    }})
            };
            g.prototype.getHumanTime = function(n) {
                n = new Date(1000 * n);
                var m = n.getFullYear(), s = n.getMonth() + 1, r = n.getDate(), q = n.getHours();
                n = n.getMinutes();
                return m + "-" + (10 < s ? s : "0" + s) + "-" + (10 < r ? r : "0" + r) + " " + (10 < q ? q : "0" + q) + ":" + (10 < n ? n : "0" + n)
            };
            g.prototype.render = function(n) {
                for (var m = 0, s = 0; s < n.length && !(30 <= m); s++) {
                    var r = n[s], r = {aid: r[1], pic: r[0], title: r[2], play: r[3], favorites: r[6], review: r[4], video_review: r[5], duration: r[7]}, q = parseInt(s) + 1, r = $('<li><a class="list-item" href="/mobile/video/av' + r.aid + '.html"><div class="l"><div class="cover" data-img="' + r.pic + '"><div class="rank"><span class="rank-num">' + q + '</span></div></div></div><div class="r"><div class="r-box"><div class="title">' + r.title + '</div><div class="meta"><div class="meta-item play-info"><i class="icon-p play"></i><span>' + r.play + '</span></div><div class="meta-item danmaku-info"><i class="icon-p dm"></i><span>' + r.video_review + "</span></div></div></div></div></a></li>").appendTo(this.list);
                    3 > s && r.find(".rank").addClass("top");
                    m++
                }
                this.application.lazyImage.lazy(this.list);
                this.listEffect.lazy(this.list)
            };
            return g
        }(f);
        e.prototype.ShareByApp = {defaultParams: {type: "image", url: location.href, title: document.title, image_url: "", text: ""}, shareDataStr: null, set: function(g) {
                g = $.extend(!0, this.defaultParams, g);
                g = JSON.stringify(g);
                window.biliios ? window.biliios.setShareContext(g) : window.biliandroid && window.biliandroid.setShareContext ? window.biliandroid.setShareContext(g) : window.biliandroid && window.biliandroid.setShareContent ? window.biliandroid.setShareContent(g) : window.biliapp && window.biliapp.setShareContent(g);
                return this.shareDataStr = g
            }, show: function() {
                window.biliios ? window.biliios.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams)) : window.biliandroid ? window.biliandroid.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams)) : window.biliapp && window.biliapp.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams))
            }, close: function() {
                window.biliios ? window.biliios.closeBrowser() : window.biliandroid ? window.biliandroid.closeBrowser() : window.biliapp && window.biliapp.closeBrowser()
            }};
        return e
    }();
    i.prototype.init = function() {
        this.$userWrapper = $(".user-wrapper");
        this.$avatarWrapper = $(".user-avatar");
        this.$userName = $(".user-info .user-name");
        this.$userCoin = $(".user-info .user-coin");
        this.$actWrapper = $(".act-wrapper ul");
        this.$accoutWrapper = $(".account-wrapper");
        this.isLogged ? this.login() : this.unlogin();
        this.buildAct();
        this.buildAccount()
    };
    i.prototype.unlogin = function() {
        $avatar = $("<img />").attr({src: avatarUrl, alt: "\u9ed8\u8ba4\u5934\u50cf"});
        this.$avatarWrapper.append($avatar);
        this.$userName.text("\u6e38\u5ba2");
        this.$userCoin.text("\u786c\u5e01\uff1a\uff0d")
    };
    i.prototype.login = function() {
        var e = this, g = User.biliLoginStatus;
        $avatar = $("<img />").attr({src: g.face, alt: g.uname});
        this.$userWrapper.append($('<i class="bili-icon-arrow"></i>'));
        this.$avatarWrapper.append($avatar);
        this.$userName.text(g.uname);
        this.$userCoin.text("\u786c\u5e01\uff1a" + g.money);
        this.$userWrapper.on("click", function() {
            window.location.href = "http://space.bilibili.com/" + e.userId
        })
    };
    i.prototype.buildAct = function() {
        var g = function(n, m, r, q) {
            return["<li>", "video" == q ? '<a class="act-item" href="http://space.bilibili.com/' + r + "/mobile/" + q + '">' : "fav" == q ? '<a class="act-item act-item-fav" href="http://space.bilibili.com/' + r + "/mobile/" + q + "/#fid=0&fname=" + encodeURIComponent("\u9ed8\u8ba4\u6536\u85cf\u5939") + '">' : '<a class="act-item" href="/mobile/history.html">', '<i class="bili-icon-' + m + '"></i>', '<span class="act-name">' + n + "</span>", '<i class="bili-icon-arrow"></i></a></li>'].join("")
        }, h, e = g("\u5386\u53f2\u8bb0\u5f55", "history-2");
        this.isLogged ? (h = g("\u6211\u7684\u6536\u85cf", "fav", this.userId, "fav"), g = g("\u6211\u7684\u6295\u7a3f", "upload", this.userId, "video"), this.$actWrapper.append(h, g, e)) : (this.$actWrapper.append(e), this.$actWrapper.after('<p class="act-tooltip">\u767b\u9646\u540e\u53ef\u4ee5\u540c\u6b65\u64ad\u653e\u8bb0\u5f55\u54e6\uff5e</p>'))
    };
    i.prototype.buildAccount = function() {
        this.isLogged ? this.$accoutWrapper.append('<a href="https://account.bilibili.com/login?act=exit" class="account-btn">\u9000\u51fa\u767b\u5f55</a>') : (this.$accoutWrapper.append('<a href="https://account.bilibili.com/login" class="account-login account-btn">\u767b&nbsp;&nbsp;\u5f55</a>', '<a href="https://account.bilibili.com/register/phone" class="account-register account-btn">\u6ce8&nbsp;&nbsp;\u518c</a>'), this.$accoutWrapper.append('<p class="reg-tooltip">\u636e\u8bf4\u7528\u5ba2\u6237\u7aef\u6ce8\u518c\u53ef\u4ee5\u51cf\u5c11\u7b54\u9898\u54df\uff5e</p>'))
    };
    this.UserSpace = i;
    d.prototype.init = function() {
        this.$container = $(".list > .list-wrp");
        this.page = 1;
        this.count = 20;
        this.loading = !0;
        this.loadFail = !1;
        this.distance = 100;
        this.listEffect = new ListEffect;
        this.initEvents();
        this.getData()
    };
    d.prototype.initEvents = function() {
        var e = this;
        $(window).on("scroll", function() {
            !e.loading && (!e.loadFail && document.documentElement.scrollHeight <= $(window).height() + $(window).scrollTop() + e.distance) && (e.loading = !0, e.getData())
        })
    };
    d.prototype.getData = function() {
        var t = this, u = $('<div class="b-loading">(\u00b4\u30fb\u03c9\u30fb\uff40)\u6b63\u5728\u52a0\u8f7d...</div>'), m = $('<div class="b-loading error">\u52a0\u8f7d\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5( >\ufe4f<\u3002)\uff5e</div>');
        this.$container.after(u);
        if (this.isLogged) {
            $.ajax({url: "//api.bilibili.com/x/history", data: {jsonp: "jsonp", pn: this.page, ps: this.count}, dataType: "jsonp"}).done(function(e) {
                u.remove();
                0 === e.code ? (t.page++, 0 === e.data.length && (t.loadFail = !0), t.render(e.data), t.loading = !1) : (t.loadFail = !0, m.insertAfter(t.$container))
            }).fail(function() {
                t.loadFail = !0;
                u.remove();
                m.insertAfter(t.$container)
            })
        } else {
            try {
                u.remove();
                var n = window.localStorage && window.localStorage.getItem("video_visited"), s = [], n = JSON.parse(n), r;
                for (r in n) {
                    n.hasOwnProperty(r) && s.push(n[r])
                }
                this.loading = !1;
                this.loadFail = !0;
                this.render(s)
            } catch (q) {
                this.loading = !1, this.loadFail = !0, this.render([])
            }
        }
    };
    d.prototype.render = function(n) {
        var q = 0, g = n.length, h, m = $(".list-item").length;
        if (0 === g && 0 === m) {
            this.$container.append('<div class="history-empty" />'), this.$container.append('<p class="history-empty-tooltip">\u8fd8\u6ca1\u6709\u53d1\u73b0\u8bb0\u5f55</p>'), this.$container.parent().addClass("empty")
        } else {
            for (; q < g; ) {
                h = h || "", m = n[q++], m = ['<a class="list-item" href="' + m.link + '">', '<div class="l">', '<div class="cover" data-img="' + m.pic + '"></div>', '</div><div class="r"><div class="r-box">', '<div class="title">' + m.title + "</div>", '<div class="up-name">UP\u4e3b\uff1a' + m.author + "</div>", '<div class="meta"><div class="meta-item play-info"><i class="icon-p play"></i>', '<span counter="' + m.play + '"></span>', '</div><div class="meta-item danmaku-info"><i class="icon-p dm"></i>', '<span counter="' + m.video_review + '"></span>', "</div></div></div></div></a>"].join(""), h += m
            }
            this.$container.append(h);
            app.lazyImage.lazy(this.$container);
            this.listEffect.lazy(this.$container);
            new this.app.CounterComponent(this.app, "*[counter]")
        }
    };
    this.History = d
}).call(this);
function bindAdmin() {
}
function getDownloadUrl(c) {
    var a = "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022", b;
    try {
        b = sessionStorage.getItem("bili_app_from")
    } catch (d) {
        b = null
    }
    browser.version.MicroMessenger ? a = "http://a.app.qq.com/o/simple.jsp?pkgname=tv.danmaku.bili" : browser.version.android ? a = browser.version.weibo || window.WeiboJSBridge || window.WebViewJavascriptBridge || window.__WeiboJSBridge ? "http://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_weibo.apk" : browser.version.baidu || window.bd_searchbox_interface || window.bdbox_android_common ? "http://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_bdbox.apk" : browser.version.qq || window.__mqqStartLoadTime ? "http://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_qq.apk" : (browser.version.uc || window.ucbrowser || window.ucapi) && 0 <= document.referrer.indexOf("tv.uc.cn") ? "http://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_uc_video.apk" : b ? "http://dl.hdslb.com/mobile/latest/iBiliPlayer-html5_" + encodeURIComponent(b) + ".apk" : "http://dl.hdslb.com/mobile/latest/iBiliPlayer-bilih5.apk" : browser.version.ios ? (a = "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022", browser.version.weibo && (a = "https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725")) : browser.version.windowsphone && (a = "https://www.windowsphone.com/zh-cn/store/purchase/validate?app=75620dee-4a7a-4dae-8677-0d930e05f57e&apptype=regular&offer=3869edb1-e34c-469a-af6e-2c8a7856cb61");
    c && ($(c).attr("href", a), browser.version.ios && browser.version.weibo && $(c).click(function() {
        location.href = "https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725";
        var f = $('<div class="float-notice"><div class="txt">\u8bf7\u70b9\u51fb\u53f3\u4e0a\u89d2\uff0c\u9009\u62e9\u201c<span>\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00</span>\u201d\uff0c\u518d\u8fdb\u884c\u64cd\u4f5c</div><div class="close"></div></div>').on("click", ".close", function() {
            f.remove()
        });
        f.appendTo("body").show();
        return !1
    }), browser.version.android ? $(c).attr("target", "_self") : $(c).attr("target", "_blank"), !browser.version.android || "360" != __GetUrlValue("from") && "undefined" == typeof AndroidWebview || $.getScript("http://openbox.mobilem.360.cn/html/api/js/qstore.js", function() {
        $(c).click(function() {
            return qStore && qStore.fn && "function" == typeof qStore.fn.download ? (qStore.fn.download("1343"), !1) : !0
        })
    }));
    return a
}
function showDownloadPanel(d, a, b, i) {
    if (!(window.biliapp || window.biliios || window.biliandroid)) {
        var c = checkUAFrom();
        if (c) {
            window.location.href = c
        } else {
            c = $('.black-wrp[role="showDownloadPanel"]');
            if (0 < c.length) {
                return c.find(".float-notice-title").html(d), c.find(".float-notice-content").html(a), "function" == typeof i && (c.find(".float-notice-download").unbind("click"), c.find(".float-notice-download").click(function() {
                    i()
                })), c.show(), !1
            }
            var f = $('<div class="black-wrp" role="showDownloadPanel"><div class="float-box-wrp"><div class="float-box"><div class="float-notice-title">' + d + '</div><div class="float-notice-content">' + a + '</div><div class="float-notice-options"><a class="options-btn float-notice-cancel">\u6211\u77e5\u9053\u4e86</a><a class="options-btn float-notice-download">' + ("undefined" == typeof b ? "\u4e0b\u8f7d\u5ba2\u6237\u7aef" : b) + "</a></div></div></div></div>");
            f.appendTo($("body"));
            f.find(".float-notice-cancel").click(function() {
                f.hide()
            });
            "function" == typeof i ? f.find(".float-notice-download").click(function() {
                i()
            }) : getDownloadUrl(f.find(".float-notice-download"));
            return !1
        }
    }
}
function checkUAFrom() {
    var d;
    try {
        d = sessionStorage.getItem("bili_app_from")
    } catch (a) {
        d = null
    }
    var b = ["yidian_app", "2345_app"], f;
    for (f in b) {
        if (d == b[f]) {
            return getDownloadUrl()
        }
    }
    d = ["YidianBot", "2345Browser"];
    var c = navigator.userAgent;
    for (f in d) {
        if (c.match(RegExp(d[f], "g"))) {
            return sessionStorage.setItem("bili_app_from", b[f]), getDownloadUrl()
        }
    }
}
(function(c) {
    function a(r) {
        var i = c(this), g = null, h = c.extend({share: {title: document.title, comment: "comment", desc: "desc", link: window.location.href, pics: "http://static.hdslb.com/mobile/img/app_logo.png", imgUrl: ""}, shareByApp: !0, timeout: 5000}, r), D = c('<div class="black-wrp"><div class="share-box"><div class="share-box-list"></div><div class="share-box-title clearfix"></div><div class="share-box-content clearfix"></div><a class="share-box-cancel clearfix">\u53d6\u6d88</a></div></div>');
        D.click(function(e) {
            var d = c(e.currentTarget).find(".share-box"), f = d.height();
            d.animate({bottom: -f - 50}, 300, function() {
                c(e.currentTarget).hide()
            })
        });
        D.find(".share-box").click(function() {
            event.stopPropagation()
        });
        var C = navigator.appVersion, E = {sinaWeibo: ["kSinaWeibo", "SinaWeibo", 11, "\u65b0\u6d6a\u5fae\u535a"], weixin: ["kWeixin", "WechatFriends", 1, "\u5fae\u4fe1\u597d\u53cb"], weixinFriend: ["kWeixinFriend", "WechatTimeline", "8", "\u5fae\u4fe1\u670b\u53cb\u5708"], QQ: ["kQQ", "QQ", "4", "QQ\u597d\u53cb"], QZone: ["kQZone", "QZone", "3", "QQ\u7a7a\u95f4"]}, w = "";
        r = "";
        w = function(d) {
            d = d.split(".");
            return parseFloat(d[0] + "." + d[1])
        };
        r = browser.version.qq ? w(C.split("MQQBrowser/")[1]) : 0;
        var w = browser.version.uc ? w(C.split("UCBrowser/")[1]) : 0, x = D.find(".share-box"), y = D.find(".share-box-list"), z = h.share, p = D.hide().appendTo(c("body"));
        i.click(function() {
            if (h.shareByApp && (window.biliios || window.biliandroid || window.biliapp)) {
                b.show()
            } else {
                p.css({display: "table-cell"});
                var d = x.height();
                x.css({bottom: -d - 50});
                x.animate({bottom: 0}, 300, function() {
                })
            }
        });
        p.find(".share-box-cancel").click(function() {
            var d = x.height();
            x.animate({bottom: -d - 50}, 300, function() {
                p.hide()
            })
        });
        var o = 0, g = setInterval(function() {
            if (window.biliios || window.biliandroid || window.biliapp) {
                clearInterval(g), b.set({title: h.share.title, text: h.share.comment, url: h.share.link, image_url: h.share.pics})
            }
            o += 50;
            o > h.timeout && clearInterval(g)
        }, 50), C = function() {
            var e = Date.parse(new Date) / 1000, d = GetRandomString(32);
            D.addClass("wx");
            c.ajax({url: "http://app.bilibili.com/x/display/wechat/sign", type: "get", data: {url: window.location.href, timestamp: e, nonce: d, jsonp: "jsonp"}, dataType: "jsonp", success: function(f) {
                    f && 0 == f.code && c.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
                        wx && (wx.config({beta: !0, debug: !1, appId: "wx108457cda8a1b9f9", nonceStr: d, timestamp: e, signature: f.data, jsApiList: "showOptionMenu onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone".split(" ")}), wx.ready(function() {
                            wx.onMenuShareTimeline(h.share);
                            wx.onMenuShareAppMessage(h.share);
                            wx.onMenuShareQQ(h.share);
                            wx.onMenuShareWeibo(h.share);
                            wx.onMenuShareQZone(h.share)
                        }))
                    })
                }, error: function() {
                }})
        }, A = function() {
            y.html('<a target="_blank" href="javascript:void(0);" class="share-box-item weibo" data-app="sinaWeibo"><i class="icons icons-weibo"></i><div>\u65b0\u6d6a\u5fae\u535a</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qzone" data-app="QZone"><i class="icons icons-qzone"></i><div>QQ\u7a7a\u95f4</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item wx" data-app="weixin"><i class="icons icons-wx"></i><div>\u5fae\u4fe1\u597d\u53cb</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item pyq" data-app="weixinFriend"><i class="icons icons-pyq"></i><div>\u670b\u53cb\u5708</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qq" data-app="QQ"><i class="icons icons-qq"></i><div>QQ\u597d\u53cb</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item other" data-app=""><i class="icons icons-other"></i><div>\u5176\u5b83</div></a>');
            y.find("[data-app]").click(function() {
                var d = c(this).attr("data-app"), d = "" == d ? "" : browser.version.ios ? E[d][0] : E[d][1];
                "QZone" == d && (D.hide(), B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url=" + z.pics + "&title=" + z.title + "&description=" + z.desc + "&url=" + z.link + "&app_name=@" + window.location.host, k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function() {
                    k && k.parentNode && k.parentNode.removeChild(k)
                }, 5000));
                "undefined" != typeof ucweb ? (D.hide(), ucweb.startRequest("shell.page_share", [z.title, z.link, z.link, d, "", "@" + window.location.host, ""])) : "undefined" != typeof ucbrowser && (D.hide(), ucbrowser.web_share(z.title, z.link, z.link, d, "", "@" + window.location.host, ""))
            })
        }, i = function() {
            y.html('<a target="_blank" href="javascript:void(0);" class="share-box-item weibo" data-app="sinaWeibo"><i class="icons icons-weibo"></i><div>\u65b0\u6d6a\u5fae\u535a</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qzone" data-app="QZone"><i class="icons icons-qzone"></i><div>QQ\u7a7a\u95f4</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item wx" data-app="weixin"><i class="icons icons-wx"></i><div>\u5fae\u4fe1\u597d\u53cb</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item pyq" data-app="weixinFriend"><i class="icons icons-pyq"></i><div>\u670b\u53cb\u5708</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qq" data-app="QQ"><i class="icons icons-qq"></i><div>QQ\u597d\u53cb</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item other" data-app=""><i class="icons icons-other"></i><div>\u5176\u5b83</div></a>');
            y.find("[data-app]").click(function() {
                var d = c(this).attr("data-app"), d = "" == d ? "" : E[d][2], d = {url: z.link, title: z.title, description: z.desc, img_url: z.pics, img_title: z.title, to_app: d, cus_txt: "\u8bf7\u8f93\u5165\u6b64\u65f6\u6b64\u523b\u60f3\u8981\u5206\u4eab\u7684\u5185\u5bb9"};
                "undefined" != typeof browser && "undefined" != typeof browser.app ? browser.app.share(d) : "undefined" != typeof window.qb && window.qb.share(d)
            })
        };
        (function() {
            y.html('<a target="_blank" href="javascript:void(0);" class="share-box-item weibo"><i class="icons icons-weibo"></i><div>\u65b0\u6d6a\u5fae\u535a</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qzone"><i class="icons icons-qzone"></i><div>QQ\u7a7a\u95f4</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item tieba"><i class="icons icons-tieba"></i><div>\u767e\u5ea6\u8d34\u5427</div></a><a target="_blank" href="javascript:void(0);" class="share-box-item qq"><i class="icons icons-qq"></i><div>QQ\u597d\u53cb</div></a>');
            var F = x.find(".weibo"), v = x.find(".qzone"), u = x.find(".tieba"), t = x.find(".qq"), s = {url: z.link, desc: z.desc, title: z.title + "#\u54d4\u54e9\u54d4\u54e9\u52a8\u753b#", summery: z.summery, pics: z.pics, pic: z.pics}, q = [], n;
            for (n in s) {
                q.push(n + "=" + encodeURIComponent(s[n] || ""))
            }
            F.click(function() {
                var d = "http://service.weibo.com/share/share.php?appkey=2841902482&language=zh_cn&" + q.join("&");
                F.attr("href", d)
            });
            t.click(function() {
                var d = "http://connect.qq.com/widget/shareqq/index.html?" + q.join("&");
                t.attr("href", d)
            });
            v.click(function() {
                var d = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?style=203&width=98&height=22&otype=share&" + q.join("&");
                v.attr("href", d)
            });
            u.click(function() {
                var d = "http://tieba.baidu.com/f/commit/share/openShareApi?" + q.join("&");
                u.attr("href", d)
            })
        })();
        browser.version.MicroMessenger ? C() : browser.version.uc && (10.2 < w && browser.version.iPhone || 9.7 < w && browser.version.android) ? A() : browser.version.weibo ? D.addClass("weibo") : browser.version.qq && browser.version.iPhone && 5.4 < r ? (w = "http://jsapi.qq.com/get?api=app.share", browser.version.android && 5.4 > r && (w = "http://3gimg.qq.com/html5/js/qb.js"), r = document.createElement("script"), C = document.getElementsByTagName("body")[0], r.setAttribute("src", w), C.appendChild(r), i()) : browser.version.ios && !browser.version.webApp && (D.addClass("safari"), x.find(".share-box-title").html('\u70b9\u51fb<i class="icons icons-safari"></i>\u53ef\u4ee5\u5206\u4eab\u5230\u66f4\u591a\u5730\u65b9\u54e6~'), x.find(".share-box-content").html("\u8fd8\u53ef\u4ee5\u6536\u85cf\u548c\u590d\u5236\u94fe\u63a5\u54e6"));
        c(window).bind("touchmove", function(d) {
            if (c(".black-wrp").is(":visible")) {
                return !1
            }
        })
    }
    var b = {defaultParams: {type: "image", url: window.location.href, title: document.title, image_url: "", text: ""}, shareDataStr: null, set: function(d) {
            d = c.extend(!0, this.defaultParams, d);
            d = JSON.stringify(d);
            window.biliios ? window.biliios.setShareContext(d) : window.biliandroid && window.biliandroid.setShareContext ? window.biliandroid.setShareContext(d) : window.biliandroid && window.biliandroid.setShareContent ? window.biliandroid.setShareContent(d) : window.biliapp && window.biliapp.setShareContent(d);
            return this.shareDataStr = d
        }, show: function() {
            window.biliios ? window.biliios.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams)) : window.biliandroid ? window.biliandroid.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams)) : window.app && window.biliapp.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams))
        }, close: function() {
            window.biliios ? window.biliios.closeBrowser() : window.biliandroid ? window.biliandroid.closeBrowser() : window.biliapp && window.biliapp.closeBrowser()
        }};
    c.fn.bindShare = function(d) {
        this.each(function() {
            a.call(this, d)
        });
        return this
    }
})($);
(function(b) {
    function a(G) {
        var I = b(this), E = null, z = "javascript:void(0);", D = b.extend({id: null, title: "\u8bf7\u5148\u4e0b\u8f7d\u5ba2\u6237\u7aef", content: "\u672c\u529f\u80fd\u7531\u5ba2\u6237\u7aef\u63d0\u4f9b _(:3\u300d\u2220)_", download: !1, aid: null, season_id: null, spid: null, room_id: null, mid: null, isBuffBtn: !1, isbangumi: !1, true_season_id: !1}, G), r = Date.parse(new Date) / 1000, p = GetRandomString(32), x = 5, J = !1, K = "bilibili://", L = b('<div class="float-notice"><div class="txt">\u8bf7\u70b9\u51fb\u53f3\u4e0a\u89d2\uff0c\u9009\u62e9\u201c<span>\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00</span>\u201d\uff0c\u518d\u70b9\u6253\u5f00\u5ba2\u6237\u7aef</div><div class="close"></div></div>').on("click", ".close", function() {
            L.hide()
        }), M = {packageName: "tv.danmaku.bilianime", packageUrl: "bilibili://"};
        browser.version.android && (M = {packageName: "tv.danmaku.bili"});
        var H = function() {
            L.appendTo("body").show();
            HashManage.set("auto_launch", !0)
        };
        G = function(e, d, f) {
            z = getDownloadUrl();
            I.unbind("click");
            I.click(function() {
                browser.version.weibo ? (location.href = "https://itunes.apple.com/cn/app/id736536022?mt=8#id1047562725", H()) : showDownloadPanel(e, d);
                return !1
            });
            f || I.click()
        };
        var F = function(e) {
            function d(c) {
                clearTimeout(E);
                document.removeEventListener("visibilitychange", d, !1)
            }
            var f = +new Date;
            clearTimeout(E);
            E = setTimeout(function() {
                2000 > +new Date - f && ("function" == typeof e ? e() : window.location = e)
            }, 1000);
            b(window).on("blur.applink", function(c) {
                clearTimeout(E);
                b(window).off("blur.applink")
            });
            document.addEventListener("visibilitychange", d)
        }, o = function() {
            I.attr({href: z, target: "_blank"});
            browser.version.MicroMessenger ? C() : browser.version.android && I.attr({target: "_self"});
            "true" == HashManage.get("auto_launch") && HashManage.set("auto_launch", !1);
            D.season_id && D.true_season_id ? K = "bilibili://bangumi/season/" + D.season_id : D.spid ? K = browser.version.android ? "bilibili://" + (D.season_id ? "bangumi/sp/" + D.spid : "splist/" + D.spid) : "bilibili://" + (D.season_id ? "bilibili.tv/bangumi?spid=" + D.spid : "sp/" + D.spid) : D.aid && !D.isbangumi ? K = "bilibili://video/" + D.aid : D.aid && D.isbangumi ? K = "bilibili://video/" + D.aid : D.room_id ? K = "bilibili://live/" + D.room_id : D.mid && (K = "bilibili://author/" + D.mid);
            if (browser.version.windowsphone) {
                I.on("click", function() {
                    location.href = K
                })
            } else {
                if (browser.version.android) {
                    I.on("click", function() {
                        location.href = K;
                        browser.version.MicroMessenger ? g("appLink", K, function() {
                            F(function() {
                                J ? H() : i()
                            })
                        }) : browser.version.weibo ? F(function() {
                            H()
                        }) : F(function() {
                            i()
                        });
                        return !1
                    })
                } else {
                    browser.version.ios && (I.attr({href: K, target: "_self"}), I.on("click", function() {
                        browser.version.MicroMessenger ? g("appLink", K, function() {
                            I.applink(function() {
                                J ? H() : i()
                            })
                        }) : browser.version.weibo ? F(function() {
                            H()
                        }) : F(function() {
                            i()
                        })
                    }))
                }
            }
        }, i = function() {
            b(".loading-box-wrp").hide();
            showDownloadPanel(D.title, D.content)
        }, C = function() {
            b.ajax({url: "http://app.bilibili.com/x/display/wechat/sign", type: "get", data: {url: window.location.href, timestamp: r, nonce: p, jsonp: "jsonp"}, dataType: "jsonp", success: function(c) {
                    c && 0 == c.code && b.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
                        wx && (wx.config({beta: !0, debug: !1, appId: "wx108457cda8a1b9f9", nonceStr: p, timestamp: r, signature: c.data, jsApiList: "getInstallState launch3rdApp onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone".split(" ")}), wx.ready(function() {
                            wx.invoke("getInstallState", M, function(e) {
                                for (var d in e) {
                                    "err_msg" == d && 0 < e[d].indexOf("yes") && (J = !0)
                                }
                            })
                        }))
                    })
                }, error: function() {
                    J = !1
                }})
        }, g = function(e, d, f) {
            wx ? wx.invoke("launch3rdApp", {appID: "wxcb8d4298c6a09bcb", messageExt: d, extInfo: d}, function(h) {
                for (var c in h) {
                    "err_msg" == c && ("launch_3rdApp:ok" == h[c] ? J = !0 : "function" == typeof f && f())
                }
            }) : 0 >= x ? "function" == typeof f && f() : (x--, setTimeout(function() {
                g(e, d, f)
            }, 300))
        };
        D.download ? G(D.title, D.content, !0) : o()
    }
    b.fn.bindApplink = function(c) {
        this.each(function() {
            a.call(this, c)
        });
        return this
    }
})($);
(function() {
    var d = 0, a = document.body.scrollWidth, b = 0, f = !1, c = $('<div class="fullwin-hint" style="top:30px;display:none;"></div>');
    $(".player-box .display").prepend(c);
    $(document).on("touchmove", ".control-slider", function(e) {
        e.stopPropagation();
        f = 0
    });
    $(document).on("touchstart", ".player-box .display", function() {
        4 == $("video")[0].readyState && (d = event.touches[0].clientX, $(".player-box").prepend(c))
    });
    $(window).on("orientationchange", function() {
        a = document.body.scrollWidth
    });
    $(document).on("touchmove", ".player-box .display", function(e) {
        e = event.touches[0].clientX;
        if (60 < e - d || -60 > e - d) {
            f = 1
        } else {
            if (!f) {
                return
            }
        }
        c.show();
        b = parseInt(60 * ((e - d) / a));
        c.text((0 <= b ? "+" : "-") + " " + (0 < b ? b : -1 * b) + "s")
    });
    $(document).on("touchend", ".player-box .display", function() {
        if (f) {
            f = 0;
            b = parseInt(60 * ((event.changedTouches[0].clientX - d) / a));
            var e = $("video")[0].currentTime;
            $("video")[0].currentTime = e + b;
            c.hide()
        }
    });
    $(document).on("click", ".recommend-comment .item a", function() {
        document.getElementsByTagName("video")[0].pause()
    })
})();