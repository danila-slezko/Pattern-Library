!(function o(s, a, l) {
  function c(t, e) {
    if (!a[t]) {
      if (!s[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (u) return u(t, !0);
        var r = new Error("Cannot find module '" + t + "'");
        throw ((r.code = "MODULE_NOT_FOUND"), r);
      }
      var i = (a[t] = { exports: {} });
      s[t][0].call(
        i.exports,
        function (e) {
          return c(s[t][1][e] || e);
        },
        i,
        i.exports,
        o,
        s,
        a,
        l
      );
    }
    return a[t].exports;
  }
  for (var u = "function" == typeof require && require, e = 0; e < l.length; e++) c(l[e]);
  return c;
})(
  {
    1: [
      function (o, l, e) {
        (function (e) {
          "use strict";
          var t = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
          };
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          }
          var s = e.jQuery;
          o("select2");
          var a = o("../storage"),
            n =
              (t(i, [
                {
                  key: "_initTabs",
                  value: function () {
                    var r = this,
                      i = this._activeClass,
                      o = this._tabs,
                      e = Math.min(o.length - 1, a.get("browser.selectedTabIndex", 0));
                    o.on("click", function (e) {
                      var t = s(e.target).closest("a"),
                        n = t.parent();
                      return o.removeClass(i), a.set("browser.selectedTabIndex", o.index(n)), n.addClass(i), r._tabPanels.removeClass(i), r._tabPanels.filter(t.attr("href")).addClass(i), !1;
                    }),
                      o.removeClass("is-active"),
                      o.eq(e).find("a").trigger("click");
                  },
                },
                { key: "_initFileSwitcher", value: function () {} },
              ]),
              i);
          function i(e) {
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, i);
            var t = this;
            (this._el = s(e)),
              (this._tabs = this._el.find('[data-role="tab"]')),
              (this._tabPanels = this._el.find('[data-role="tab-panel"]')),
              (this._fileSwitcher = this._el.find('[data-role="switcher"]')),
              (this._codeViews = this._el.find('[data-role="code"]')),
              (this._resourcePreview = this._el.find('[data-role="resource-preview"]')),
              (this._activeClass = "is-active"),
              this._initTabs(),
              s(".FileBrowser-select")
                .select2({ minimumResultsForSearch: 1 / 0 })
                .on("change", function () {
                  s(this).closest(".FileBrowser").find('[data-role="resource-preview"]').removeClass(t._activeClass), s("#" + this.value).addClass(t._activeClass);
                }),
              this._initFileSwitcher();
          }
          l.exports = n;
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "../storage": 11, select2: 79 },
    ],
    2: [
      function (t, n, e) {
        (function (e) {
          "use strict";
          var x = e.jQuery,
            w = t("../storage"),
            _ = t("../utils"),
            T = t("../events");
          n.exports = function (e) {
            var t = x(window),
              n = x(document),
              r = x(e),
              i = x("html").attr("dir"),
              o = r.find('> [data-role="body"]'),
              s = r.find('[data-action="toggle-sidebar"]'),
              a = o.children('[data-role="sidebar"]'),
              l = o.children('[data-role="main"]'),
              c = o.children('[data-role="frame-resize-handle"]'),
              u = parseInt(a.css("min-width"), 10),
              d = _.isSmallScreen() ? u : w.get("frame.sidebar", a.outerWidth()),
              p = _.isSmallScreen() ? "closed" : w.get("frame.state", "open"),
              f = !1,
              h = !1,
              g = 0;
            function v() {
              if (!f && (h || "closed" != p)) {
                var e = a.outerWidth(),
                  t = { transform: "translate3d(" + ("rtl" == i ? e + "px" : -1 * e + "px") + ", 0, 0)" };
                "rtl" == i ? (t.marginLeft = -1 * e + "px") : (t.marginRight = -1 * e + "px"), (t.transition = h ? "none" : ".3s ease all"), o.css(t), (p = "closed"), r.addClass("is-closed"), w.set("frame.state", p), (h = !1);
              }
            }
            function m() {
              f || "open" == p || (_.isSmallScreen() && b(u), o.css({ marginRight: 0, marginLeft: 0, transition: "0.3s ease all", transform: "translate3d(0, 0, 0)" }), (p = "open"), r.removeClass("is-closed"), w.set("frame.state", p));
            }
            function y() {
              return "open" == p ? v() : m(), !1;
            }
            function b(e) {
              (d = e), a.outerWidth(e), w.set("frame.sidebar", e);
            }
            return (
              a.outerWidth(d),
              "closed" === p && ((h = !0), v()),
              c.on("mousedown", function (e) {
                if (
                  (g++,
                  setTimeout(function () {
                    g = 0;
                  }, 400),
                  2 === g)
                )
                  return (f = !1), y(), (g = 0), void e.stopImmediatePropagation();
              }),
              a.resizable({
                handleSelector: c,
                resizeHeight: !1,
                onDragStart: function () {
                  r.addClass("is-resizing"), T.trigger("start-dragging");
                },
                onDragEnd: function () {
                  b(a.outerWidth()), r.removeClass("is-resizing"), T.trigger("end-dragging"), "closed" === p && ((f = !1), m());
                },
                resizeWidthFrom: "rtl" === i ? "left" : "right",
              }),
              a.on(
                "scroll",
                _.debounce(function () {
                  w.set("frame.scrollPos", a.scrollTop());
                }, 50)
              ),
              s.on("click", y),
              t.on("resize", function () {
                "open" == p && n.outerWidth();
              }),
              T.on("toggle-sidebar", y),
              T.on("start-dragging", function () {
                return (f = !0);
              }),
              T.on("end-dragging", function () {
                setTimeout(function () {
                  f = !1;
                }, 200);
              }),
              T.on("scroll-sidebar", function () {
                var e = w.get("frame.scrollPos", 0);
                a.scrollTop(e);
              }),
              T.on("data-changed", function () {
                document.location.reload(!0);
              }),
              {
                closeSidebar: v,
                openSidebar: m,
                startLoad: function () {
                  l.addClass("is-loading");
                },
                endLoad: function () {
                  l.removeClass("is-loading");
                },
              }
            );
          };
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "../events": 9, "../storage": 11, "../utils": 12 },
    ],
    3: [
      function (t, n, e) {
        (function (e) {
          "use strict";
          var r = e.jQuery,
            i = t("./tree"),
            o = t("./search");
          n.exports = function e(t) {
            var n = this;
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this._el = r(t)),
              (this.navTrees = r.map(this._el.find('[data-behaviour="tree"]'), function (e) {
                return new i(e);
              })),
              r.map(this._el.find('[data-behaviour="search"]'), function (e) {
                return new o(e, n.navTrees);
              });
          };
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "./search": 6, "./tree": 7 },
    ],
    4: [
      function (u, d, e) {
        (function (e) {
          "use strict";
          var t = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
          };
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          }
          var n = e.jQuery,
            s = u("../storage"),
            a = u("../events"),
            l = u("./preview"),
            c = u("./browser");
          u("jquery-resizable-dom/dist/jquery-resizable.js");
          var i =
            (t(o, [
              {
                key: "_init",
                value: function () {
                  var e = this,
                    t = s.get("pen.previewHeight", this._el.outerHeight() / 2),
                    n = new l(this._previewPanel);
                  new c(this._browser);
                  var r = s.get("pen.previewState", "open"),
                    i = 0,
                    o = !1;
                  "open" === r ? (this._previewPanel.outerHeight(t), s.set("pen.previewHeight", t)) : this._previewPanel.css("height", "100%"),
                    this._handle.on("mousedown", function () {
                      if (
                        ((o = !1),
                        i++,
                        setTimeout(function () {
                          i = 0;
                        }, 400),
                        2 === i)
                      )
                        return !(o = !(i = 0));
                    }),
                    this._previewPanel.resizable({
                      handleSelector: this._handle,
                      resizeWidth: !1,
                      onDragStart: function () {
                        e._el.addClass("is-resizing"), n.disableEvents(), a.trigger("start-dragging");
                      },
                      onDragEnd: function () {
                        e._el.removeClass("is-resizing"),
                          n.enableEvents(),
                          a.trigger("end-dragging"),
                          o
                            ? "closed" === r
                              ? (e._previewPanel.css("height", s.get("pen.onClosedHeight", t)), (r = "open"), s.set("pen.previewState", "open"))
                              : (s.set("pen.onClosedHeight", e._previewPanel.outerHeight()), e._previewPanel.css({ height: "100%", transition: ".3s ease all" }), (r = "closed"), s.set("pen.previewState", "closed"))
                            : "closed" !== r
                            ? s.set("pen.previewHeight", e._previewPanel.outerHeight())
                            : setTimeout(function () {
                                o || ((r = "open"), s.set("pen.previewState", "open"), s.set("pen.previewHeight", e._previewPanel.outerHeight()));
                              }, 400);
                      },
                    });
                },
              },
            ]),
            o);
          function o(e) {
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, o),
              (this._el = n(e)),
              (this._id = this._el[0].id),
              (this._previewPanel = this._el.find('[data-behaviour="preview"]')),
              (this._browser = this._el.find('[data-behaviour="browser"]')),
              (this._handle = this._el.children('[data-role="resize-handle"]')),
              this._init();
          }
          d.exports = i;
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "../events": 9, "../storage": 11, "./browser": 1, "./preview": 5, "jquery-resizable-dom/dist/jquery-resizable.js": 76 },
    ],
    5: [
      function (l, c, e) {
        (function (e) {
          "use strict";
          var t = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
          };
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          }
          var i = e.jQuery,
            o = l("../storage"),
            s = l("../events");
          l("jquery-resizable-dom/dist/jquery-resizable.js");
          var n =
            (t(a, [
              {
                key: "_init",
                value: function () {
                  var e = this,
                    t = i("html").attr("dir"),
                    n = o.get("preview.width", this._resizer.outerWidth()),
                    r = 0;
                  n == this._el.outerWidth() ? this._resizer.css("width", "100%") : this._resizer.outerWidth(n),
                    this._handle.on("mousedown", function () {
                      if (
                        (r++,
                        setTimeout(function () {
                          r = 0;
                        }, 400),
                        2 === r)
                      )
                        return e._resizer.css("width", "calc(100% + 0.75rem)"), !1;
                    }),
                    this._resizer.resizable({
                      handleSelector: this._handle,
                      resizeHeight: !1,
                      onDragStart: function () {
                        e._el.addClass("is-resizing"), e.disableEvents(), s.trigger("start-dragging");
                      },
                      onDragEnd: function () {
                        e._resizer.outerWidth() == e._el.outerWidth() && e._resizer.css("width", "100%"), o.set("preview.width", e._resizer.outerWidth()), e._el.removeClass("is-resizing"), e.enableEvents(), s.trigger("end-dragging");
                      },
                      resizeWidthFrom: "rtl" === t ? "left" : "right",
                    });
                },
              },
              {
                key: "disableEvents",
                value: function () {
                  this._el.addClass("is-disabled");
                },
              },
              {
                key: "enableEvents",
                value: function () {
                  this._el.removeClass("is-disabled");
                },
              },
            ]),
            a);
          function a(e) {
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, a),
              (this._el = i(e)),
              (this._id = this._el[0].id),
              (this._handle = this._el.find('[data-role="resize-handle"]')),
              (this._iframe = this._el.children('[data-role="window"]')),
              (this._resizer = this._el.children('[data-role="resizer"]')),
              this._init();
          }
          c.exports = n;
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "../events": 9, "../storage": 11, "jquery-resizable-dom/dist/jquery-resizable.js": 76 },
    ],
    6: [
      function (s, a, e) {
        (function (e) {
          "use strict";
          var t = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
          };
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          }
          var f = e.jQuery,
            i = s("mark.js"),
            n =
              (t(o, [
                {
                  key: "handleInput",
                  value: function (e) {
                    var r = this,
                      i = e.currentTarget.value.toUpperCase();
                    this._clearButton && (i ? this._clearButton.removeAttr("hidden") : this._clearButton.attr("hidden", !0)),
                      this._marker.unmark(),
                      this._marker.mark(i),
                      this._trees.forEach(function (e) {
                        r.search(e._el.children("ul"), i, e._collections);
                        var t = f(e._el),
                          n = t.parent(".Navigation-group");
                        0 === t.find("> ul > li:not([hidden])").length ? n.attr("hidden", !0) : n.removeAttr("hidden");
                      });
                  },
                },
                {
                  key: "search",
                  value: function (e, u, d) {
                    var p = this;
                    f(e)
                      .children("li")
                      .each(function (e, t) {
                        var n = f(t),
                          r = n.parents(".Tree-collection").find("> .Tree-collectionLabel").text(),
                          i = n.text(),
                          o = n.find("[data-tags]"),
                          s = 0 < o.length ? o.attr("data-tags") : "",
                          a = -1 !== r.toUpperCase().indexOf(u),
                          l = -1 !== i.toUpperCase().indexOf(u),
                          c = -1 !== s.toUpperCase().indexOf(u);
                        a || l || c
                          ? (n.parents(".Tree-collection").each(function (e, t) {
                              var n = d.find(function (e) {
                                return e._el[0] === t;
                              });
                              u.length || n.containsCurrentItem() ? n.open(!0) : n.close(!0);
                            }),
                            n.removeAttr("hidden"),
                            p.search(n.children("ul"), u, d))
                          : n.attr("hidden", !0);
                      });
                  },
                },
              ]),
              o);
          function o(e, t) {
            var n = this;
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, o),
              (this._el = f(e)),
              (this._trees = t),
              (this._input = this._el.find('[data-role="input"]')),
              (this._clearButton = this._el.find('[data-behaviour="clear-search"]')),
              (this._marker = new i(
                f.map(this._trees, function (e) {
                  return e.getElement()[0];
                })
              )),
              this._el.on("submit", function (e) {
                e.preventDefault();
              }),
              this._input.on("input", this.handleInput.bind(this)),
              this._clearButton &&
                this._clearButton.on("click", function () {
                  n._input.val("").trigger("input");
                });
          }
          a.exports = n;
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "mark.js": 78 },
    ],
    7: [
      function (d, p, e) {
        (function (e) {
          "use strict";
          var t = function (e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e;
          };
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
            }
          }
          function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }
          var o = e.jQuery,
            s = d("../storage"),
            a = d("../events");
          var n =
            (t(l, [
              {
                key: "getElement",
                value: function () {
                  return this._el;
                },
              },
              {
                key: "selectItem",
                value: function (e) {
                  this._el.find(".is-current").removeClass("is-current"),
                    this._el
                      .find('[href="' + e + '"]')
                      .parent()
                      .addClass("is-current");
                },
              },
              {
                key: "_applyState",
                value: function () {
                  for (var e in this._collections) {
                    var t = this._collections[e];
                    -1 < this._state.indexOf(t.id) ? t.open(!0) : t.close(!0);
                  }
                  this._updateCollapseButtonVisibility();
                },
              },
              {
                key: "saveState",
                value: function () {
                  (this._state = this._collections
                    .filter(function (e) {
                      return e.isOpen;
                    })
                    .map(function (e) {
                      return e.id;
                    })),
                    s.set("tree." + this._id + ".state", this._state, "session"),
                    this._updateCollapseButtonVisibility();
                },
              },
              {
                key: "closeAll",
                value: function () {
                  this._collections.forEach(function (e) {
                    e.close();
                  }),
                    this._updateCollapseButtonVisibility();
                },
              },
              {
                key: "_updateCollapseButtonVisibility",
                value: function () {
                  this._collections.some(function (e) {
                    return e.isOpen;
                  })
                    ? this._collapseButton.removeAttr("hidden")
                    : this._collapseButton.attr("hidden", !0);
                },
              },
            ]),
            l);
          function l(e) {
            var n = this;
            for (var t in (i(this, l),
            (this._el = o(e)),
            (this._id = this._el[0].id),
            (this._state = s.get("tree." + this._id + ".state", [], "session")),
            (this._collections = o.map(this._el.find('[data-behaviour="collection"]'), function (e) {
              return new c(e, n);
            })),
            (this._collapseButton = this._el.find('[data-behaviour="collapse-tree"]')),
            this._collapseButton.on("click", this.closeAll.bind(this)),
            this._collections)) {
              var r = this._collections[t];
              r.containsCurrentItem() && this._state.push(r.id);
            }
            (this._state = o.unique(this._state)),
              this._applyState(),
              a.trigger("scroll-sidebar"),
              a.on("main-content-preload", function (e, t) {
                n.selectItem(
                  (function (e) {
                    var t = document.createElement("a");
                    t.href = e;
                    var n = t.pathname.split("/");
                    return n.push(n.pop()), n.join("/");
                  })(t)
                );
              });
          }
          var c =
            (t(u, [
              {
                key: "containsCurrentItem",
                value: function () {
                  return !!this._itemsWrapper.find('[data-state="current"]').length;
                },
              },
              {
                key: "open",
                value: function (e) {
                  this._el.removeClass("is-closed"), this._toggle.attr("aria-expanded", "true"), (this._isOpen = !0), e || this._tree.saveState();
                },
              },
              {
                key: "close",
                value: function (e) {
                  this._el.addClass("is-closed"), this._toggle.attr("aria-expanded", "false"), (this._isOpen = !1), e || this._tree.saveState();
                },
              },
              {
                key: "toggle",
                value: function () {
                  return this._isOpen ? this.close() : this.open(), !1;
                },
              },
              {
                key: "id",
                get: function () {
                  return this._el[0].id;
                },
              },
              {
                key: "isOpen",
                get: function () {
                  return this._isOpen;
                },
              },
            ]),
            u);
          function u(e, t) {
            i(this, u), (this._tree = t), (this._el = o(e)), (this._toggle = this._el.find('> [data-role="toggle"]')), (this._itemsWrapper = this._el.find('[data-role="items"]:not(> [data-behaviour] [data-role="items"])')), (this._isOpen = !0), this._toggle.on("click", this.toggle.bind(this));
          }
          p.exports = n;
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "../events": 9, "../storage": 11 },
    ],
    8: [
      function (e, t, n) {
        "use strict";
        t.exports = { breakpoints: { navCollapse: 500 } };
      },
      {},
    ],
    9: [
      function (e, t, n) {
        (function (e) {
          "use strict";
          t.exports = e.jQuery({});
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      {},
    ],
    10: [
      function (u, e, t) {
        (function (e) {
          "use strict";
          u("core-js/features/array/find"), (e.jQuery = u("jquery")), u("jquery-pjax");
          var t = e.jQuery,
            n = t(document),
            r = window.frctl || {},
            i = u("./events"),
            o = u("./utils"),
            s = u("./components/frame"),
            a = u("./components/pen");
          new (u("./components/navigation"))(t(".Navigation"));
          var l = s(t("#frame"));
          function c() {
            setTimeout(function () {
              t.map(t('[data-behaviour="pen"]'), function (e) {
                return new a(e);
              });
            }, 1);
          }
          (e.fractal = { events: i }),
            c(),
            "server" == r.env &&
              n
                .pjax("a[data-pjax], code a[href], .Prose a[href]:not([data-no-pjax]), .Browser a[href]:not([data-no-pjax])", "#pjax-container", { fragment: "#pjax-container", timeout: 1e4 })
                .on("pjax:start", function (e, t, n) {
                  o.isSmallScreen() && l.closeSidebar(), l.startLoad(), i.trigger("main-content-preload", n.url);
                })
                .on("pjax:end", function () {
                  i.trigger("main-content-loaded"), l.endLoad();
                }),
            i.on("main-content-loaded", c);
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "./components/frame": 2, "./components/navigation": 3, "./components/pen": 4, "./events": 9, "./utils": 12, "core-js/features/array/find": 14, jquery: 77, "jquery-pjax": 75 },
    ],
    11: [
      function (e, t, n) {
        "use strict";
        var i = { local: localStorage, session: sessionStorage };
        t.exports = {
          get: function (e, t, n) {
            var r = i[2 < arguments.length && void 0 !== n ? n : "local"].getItem(e);
            return r ? JSON.parse(r) : t;
          },
          set: function (e, t, n) {
            i[2 < arguments.length && void 0 !== n ? n : "local"].setItem(e, JSON.stringify(t));
          },
        };
      },
      {},
    ],
    12: [
      function (r, i, e) {
        (function (e) {
          "use strict";
          var t = e.jQuery,
            n = r("./config");
          i.exports = {
            debounce: function (r, i, o) {
              var s;
              return function () {
                var e = this,
                  t = arguments,
                  n = o && !s;
                clearTimeout(s),
                  (s = setTimeout(function () {
                    (s = null), o || r.apply(e, t);
                  }, i)),
                  n && r.apply(e, t);
              };
            },
            isSmallScreen: function () {
              return t(document).width() < n.breakpoints.navCollapse;
            },
          };
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      { "./config": 8 },
    ],
    13: [
      function (e, t, n) {
        e("../../modules/es.array.find");
        var r = e("../../internals/entry-unbind");
        t.exports = r("Array", "find");
      },
      { "../../internals/entry-unbind": 28, "../../modules/es.array.find": 74 },
    ],
    14: [
      function (e, t, n) {
        var r = e("../../es/array/find");
        t.exports = r;
      },
      { "../../es/array/find": 13 },
    ],
    15: [
      function (e, t, n) {
        t.exports = function (e) {
          if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
          return e;
        };
      },
      {},
    ],
    16: [
      function (e, t, n) {
        var r = e("../internals/well-known-symbol"),
          i = e("../internals/object-create"),
          o = e("../internals/object-define-property"),
          s = r("unscopables"),
          a = Array.prototype;
        null == a[s] && o.f(a, s, { configurable: !0, value: i(null) }),
          (t.exports = function (e) {
            a[s][e] = !0;
          });
      },
      { "../internals/object-create": 48, "../internals/object-define-property": 50, "../internals/well-known-symbol": 73 },
    ],
    17: [
      function (e, t, n) {
        var r = e("../internals/is-object");
        t.exports = function (e) {
          if (!r(e)) throw TypeError(String(e) + " is not an object");
          return e;
        };
      },
      { "../internals/is-object": 44 },
    ],
    18: [
      function (e, t, n) {
        function r(a) {
          return function (e, t, n) {
            var r,
              i = l(e),
              o = c(i.length),
              s = u(n, o);
            if (a && t != t) {
              for (; s < o; ) if ((r = i[s++]) != r) return !0;
            } else for (; s < o; s++) if ((a || s in i) && i[s] === t) return a || s || 0;
            return !a && -1;
          };
        }
        var l = e("../internals/to-indexed-object"),
          c = e("../internals/to-length"),
          u = e("../internals/to-absolute-index");
        t.exports = { includes: r(!0), indexOf: r(!1) };
      },
      { "../internals/to-absolute-index": 65, "../internals/to-indexed-object": 66, "../internals/to-length": 68 },
    ],
    19: [
      function (e, t, n) {
        function r(f) {
          var h = 1 == f,
            g = 2 == f,
            v = 3 == f,
            m = 4 == f,
            y = 6 == f,
            b = 5 == f || y;
          return function (e, t, n, r) {
            for (var i, o, s = _(e), a = w(s), l = x(t, n, 3), c = T(a.length), u = 0, d = r || E, p = h ? d(e, c) : g ? d(e, 0) : void 0; u < c; u++)
              if ((b || u in a) && ((o = l((i = a[u]), u, s)), f))
                if (h) p[u] = o;
                else if (o)
                  switch (f) {
                    case 3:
                      return !0;
                    case 5:
                      return i;
                    case 6:
                      return u;
                    case 2:
                      S.call(p, i);
                  }
                else if (m) return !1;
            return y ? -1 : v || m ? m : p;
          };
        }
        var x = e("../internals/function-bind-context"),
          w = e("../internals/indexed-object"),
          _ = e("../internals/to-object"),
          T = e("../internals/to-length"),
          E = e("../internals/array-species-create"),
          S = [].push;
        t.exports = { forEach: r(0), map: r(1), filter: r(2), some: r(3), every: r(4), find: r(5), findIndex: r(6) };
      },
      { "../internals/array-species-create": 21, "../internals/function-bind-context": 32, "../internals/indexed-object": 39, "../internals/to-length": 68, "../internals/to-object": 69 },
    ],
    20: [
      function (e, t, n) {
        function s(e) {
          throw e;
        }
        var a = e("../internals/descriptors"),
          l = e("../internals/fails"),
          c = e("../internals/has"),
          u = Object.defineProperty,
          d = {};
        t.exports = function (e, t) {
          if (c(d, e)) return d[e];
          var n = [][e],
            r = !!c((t = t || {}), "ACCESSORS") && t.ACCESSORS,
            i = c(t, 0) ? t[0] : s,
            o = c(t, 1) ? t[1] : void 0;
          return (d[e] =
            !!n &&
            !l(function () {
              if (r && !a) return !0;
              var e = { length: -1 };
              r ? u(e, 1, { enumerable: !0, get: s }) : (e[1] = 1), n.call(e, i, o);
            }));
        };
      },
      { "../internals/descriptors": 26, "../internals/fails": 31, "../internals/has": 35 },
    ],
    21: [
      function (e, t, n) {
        var r = e("../internals/is-object"),
          i = e("../internals/is-array"),
          o = e("../internals/well-known-symbol")("species");
        t.exports = function (e, t) {
          var n;
          return i(e) && ("function" != typeof (n = e.constructor) || (n !== Array && !i(n.prototype)) ? r(n) && null === (n = n[o]) && (n = void 0) : (n = void 0)), new (void 0 === n ? Array : n)(0 === t ? 0 : t);
        };
      },
      { "../internals/is-array": 42, "../internals/is-object": 44, "../internals/well-known-symbol": 73 },
    ],
    22: [
      function (e, t, n) {
        var r = {}.toString;
        t.exports = function (e) {
          return r.call(e).slice(8, -1);
        };
      },
      {},
    ],
    23: [
      function (e, t, n) {
        var a = e("../internals/has"),
          l = e("../internals/own-keys"),
          c = e("../internals/object-get-own-property-descriptor"),
          u = e("../internals/object-define-property");
        t.exports = function (e, t) {
          for (var n = l(t), r = u.f, i = c.f, o = 0; o < n.length; o++) {
            var s = n[o];
            a(e, s) || r(e, s, i(t, s));
          }
        };
      },
      { "../internals/has": 35, "../internals/object-define-property": 50, "../internals/object-get-own-property-descriptor": 51, "../internals/own-keys": 57 },
    ],
    24: [
      function (e, t, n) {
        var r = e("../internals/descriptors"),
          i = e("../internals/object-define-property"),
          o = e("../internals/create-property-descriptor");
        t.exports = r
          ? function (e, t, n) {
              return i.f(e, t, o(1, n));
            }
          : function (e, t, n) {
              return (e[t] = n), e;
            };
      },
      { "../internals/create-property-descriptor": 25, "../internals/descriptors": 26, "../internals/object-define-property": 50 },
    ],
    25: [
      function (e, t, n) {
        t.exports = function (e, t) {
          return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
        };
      },
      {},
    ],
    26: [
      function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r(function () {
          return (
            7 !=
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1]
          );
        });
      },
      { "../internals/fails": 31 },
    ],
    27: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/is-object"),
          o = r.document,
          s = i(o) && i(o.createElement);
        t.exports = function (e) {
          return s ? o.createElement(e) : {};
        };
      },
      { "../internals/global": 34, "../internals/is-object": 44 },
    ],
    28: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/function-bind-context"),
          o = Function.call;
        t.exports = function (e, t, n) {
          return i(o, r[e].prototype[t], n);
        };
      },
      { "../internals/function-bind-context": 32, "../internals/global": 34 },
    ],
    29: [
      function (e, t, n) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
      },
      {},
    ],
    30: [
      function (e, t, n) {
        var u = e("../internals/global"),
          d = e("../internals/object-get-own-property-descriptor").f,
          p = e("../internals/create-non-enumerable-property"),
          f = e("../internals/redefine"),
          h = e("../internals/set-global"),
          g = e("../internals/copy-constructor-properties"),
          v = e("../internals/is-forced");
        t.exports = function (e, t) {
          var n,
            r,
            i,
            o,
            s,
            a = e.target,
            l = e.global,
            c = e.stat;
          if ((n = l ? u : c ? u[a] || h(a, {}) : (u[a] || {}).prototype))
            for (r in t) {
              if (((o = t[r]), (i = e.noTargetGet ? (s = d(n, r)) && s.value : n[r]), !v(l ? r : a + (c ? "." : "#") + r, e.forced) && void 0 !== i)) {
                if (typeof o == typeof i) continue;
                g(o, i);
              }
              (e.sham || (i && i.sham)) && p(o, "sham", !0), f(n, r, o, e);
            }
        };
      },
      { "../internals/copy-constructor-properties": 23, "../internals/create-non-enumerable-property": 24, "../internals/global": 34, "../internals/is-forced": 43, "../internals/object-get-own-property-descriptor": 51, "../internals/redefine": 59, "../internals/set-global": 61 },
    ],
    31: [
      function (e, t, n) {
        t.exports = function (e) {
          try {
            return !!e();
          } catch (e) {
            return !0;
          }
        };
      },
      {},
    ],
    32: [
      function (e, t, n) {
        var o = e("../internals/a-function");
        t.exports = function (r, i, e) {
          if ((o(r), void 0 === i)) return r;
          switch (e) {
            case 0:
              return function () {
                return r.call(i);
              };
            case 1:
              return function (e) {
                return r.call(i, e);
              };
            case 2:
              return function (e, t) {
                return r.call(i, e, t);
              };
            case 3:
              return function (e, t, n) {
                return r.call(i, e, t, n);
              };
          }
          return function () {
            return r.apply(i, arguments);
          };
        };
      },
      { "../internals/a-function": 15 },
    ],
    33: [
      function (e, t, n) {
        function r(e) {
          return "function" == typeof e ? e : void 0;
        }
        var i = e("../internals/path"),
          o = e("../internals/global");
        t.exports = function (e, t) {
          return arguments.length < 2 ? r(i[e]) || r(o[e]) : (i[e] && i[e][t]) || (o[e] && o[e][t]);
        };
      },
      { "../internals/global": 34, "../internals/path": 58 },
    ],
    34: [
      function (e, n, t) {
        (function (e) {
          function t(e) {
            return e && e.Math == Math && e;
          }
          n.exports = t("object" == typeof globalThis && globalThis) || t("object" == typeof window && window) || t("object" == typeof self && self) || t("object" == typeof e && e) || Function("return this")();
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}));
      },
      {},
    ],
    35: [
      function (e, t, n) {
        var r = {}.hasOwnProperty;
        t.exports = function (e, t) {
          return r.call(e, t);
        };
      },
      {},
    ],
    36: [
      function (e, t, n) {
        t.exports = {};
      },
      {},
    ],
    37: [
      function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("document", "documentElement");
      },
      { "../internals/get-built-in": 33 },
    ],
    38: [
      function (e, t, n) {
        var r = e("../internals/descriptors"),
          i = e("../internals/fails"),
          o = e("../internals/document-create-element");
        t.exports =
          !r &&
          !i(function () {
            return (
              7 !=
              Object.defineProperty(o("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      { "../internals/descriptors": 26, "../internals/document-create-element": 27, "../internals/fails": 31 },
    ],
    39: [
      function (e, t, n) {
        var r = e("../internals/fails"),
          i = e("../internals/classof-raw"),
          o = "".split;
        t.exports = r(function () {
          return !Object("z").propertyIsEnumerable(0);
        })
          ? function (e) {
              return "String" == i(e) ? o.call(e, "") : Object(e);
            }
          : Object;
      },
      { "../internals/classof-raw": 22, "../internals/fails": 31 },
    ],
    40: [
      function (e, t, n) {
        var r = e("../internals/shared-store"),
          i = Function.toString;
        "function" != typeof r.inspectSource &&
          (r.inspectSource = function (e) {
            return i.call(e);
          }),
          (t.exports = r.inspectSource);
      },
      { "../internals/shared-store": 63 },
    ],
    41: [
      function (e, t, n) {
        var r,
          i,
          o,
          s = e("../internals/native-weak-map"),
          a = e("../internals/global"),
          l = e("../internals/is-object"),
          c = e("../internals/create-non-enumerable-property"),
          u = e("../internals/has"),
          d = e("../internals/shared-key"),
          p = e("../internals/hidden-keys"),
          f = a.WeakMap;
        if (s) {
          var h = new f(),
            g = h.get,
            v = h.has,
            m = h.set;
          (r = function (e, t) {
            return m.call(h, e, t), t;
          }),
            (i = function (e) {
              return g.call(h, e) || {};
            }),
            (o = function (e) {
              return v.call(h, e);
            });
        } else {
          var y = d("state");
          (p[y] = !0),
            (r = function (e, t) {
              return c(e, y, t), t;
            }),
            (i = function (e) {
              return u(e, y) ? e[y] : {};
            }),
            (o = function (e) {
              return u(e, y);
            });
        }
        t.exports = {
          set: r,
          get: i,
          has: o,
          enforce: function (e) {
            return o(e) ? i(e) : r(e, {});
          },
          getterFor: function (n) {
            return function (e) {
              var t;
              if (!l(e) || (t = i(e)).type !== n) throw TypeError("Incompatible receiver, " + n + " required");
              return t;
            };
          },
        };
      },
      { "../internals/create-non-enumerable-property": 24, "../internals/global": 34, "../internals/has": 35, "../internals/hidden-keys": 36, "../internals/is-object": 44, "../internals/native-weak-map": 47, "../internals/shared-key": 62 },
    ],
    42: [
      function (e, t, n) {
        var r = e("../internals/classof-raw");
        t.exports =
          Array.isArray ||
          function (e) {
            return "Array" == r(e);
          };
      },
      { "../internals/classof-raw": 22 },
    ],
    43: [
      function (e, t, n) {
        function r(e, t) {
          var n = a[s(e)];
          return n == c || (n != l && ("function" == typeof t ? i(t) : !!t));
        }
        var i = e("../internals/fails"),
          o = /#|\.prototype\./,
          s = (r.normalize = function (e) {
            return String(e).replace(o, ".").toLowerCase();
          }),
          a = (r.data = {}),
          l = (r.NATIVE = "N"),
          c = (r.POLYFILL = "P");
        t.exports = r;
      },
      { "../internals/fails": 31 },
    ],
    44: [
      function (e, t, n) {
        t.exports = function (e) {
          return "object" == typeof e ? null !== e : "function" == typeof e;
        };
      },
      {},
    ],
    45: [
      function (e, t, n) {
        t.exports = !1;
      },
      {},
    ],
    46: [
      function (e, t, n) {
        var r = e("../internals/fails");
        t.exports =
          !!Object.getOwnPropertySymbols &&
          !r(function () {
            return !String(Symbol());
          });
      },
      { "../internals/fails": 31 },
    ],
    47: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/inspect-source"),
          o = r.WeakMap;
        t.exports = "function" == typeof o && /native code/.test(i(o));
      },
      { "../internals/global": 34, "../internals/inspect-source": 40 },
    ],
    48: [
      function (e, t, n) {
        function r() {}
        function i(e) {
          return "<script>" + e + "</" + h + ">";
        }
        var o,
          s = e("../internals/an-object"),
          a = e("../internals/object-define-properties"),
          l = e("../internals/enum-bug-keys"),
          c = e("../internals/hidden-keys"),
          u = e("../internals/html"),
          d = e("../internals/document-create-element"),
          p = e("../internals/shared-key"),
          f = "prototype",
          h = "script",
          g = p("IE_PROTO"),
          v = function () {
            try {
              o = document.domain && new ActiveXObject("htmlfile");
            } catch (e) {}
            var e, t;
            v = o
              ? (function (e) {
                  e.write(i("")), e.close();
                  var t = e.parentWindow.Object;
                  return (e = null), t;
                })(o)
              : (((t = d("iframe")).style.display = "none"), u.appendChild(t), (t.src = String("javascript:")), (e = t.contentWindow.document).open(), e.write(i("document.F=Object")), e.close(), e.F);
            for (var n = l.length; n--; ) delete v[f][l[n]];
            return v();
          };
        (c[g] = !0),
          (t.exports =
            Object.create ||
            function (e, t) {
              var n;
              return null !== e ? ((r[f] = s(e)), (n = new r()), (r[f] = null), (n[g] = e)) : (n = v()), void 0 === t ? n : a(n, t);
            });
      },
      { "../internals/an-object": 17, "../internals/document-create-element": 27, "../internals/enum-bug-keys": 29, "../internals/hidden-keys": 36, "../internals/html": 37, "../internals/object-define-properties": 49, "../internals/shared-key": 62 },
    ],
    49: [
      function (e, t, n) {
        var r = e("../internals/descriptors"),
          s = e("../internals/object-define-property"),
          a = e("../internals/an-object"),
          l = e("../internals/object-keys");
        t.exports = r
          ? Object.defineProperties
          : function (e, t) {
              a(e);
              for (var n, r = l(t), i = r.length, o = 0; o < i; ) s.f(e, (n = r[o++]), t[n]);
              return e;
            };
      },
      { "../internals/an-object": 17, "../internals/descriptors": 26, "../internals/object-define-property": 50, "../internals/object-keys": 55 },
    ],
    50: [
      function (e, t, n) {
        var r = e("../internals/descriptors"),
          i = e("../internals/ie8-dom-define"),
          o = e("../internals/an-object"),
          s = e("../internals/to-primitive"),
          a = Object.defineProperty;
        n.f = r
          ? a
          : function (e, t, n) {
              if ((o(e), (t = s(t, !0)), o(n), i))
                try {
                  return a(e, t, n);
                } catch (e) {}
              if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
              return "value" in n && (e[t] = n.value), e;
            };
      },
      { "../internals/an-object": 17, "../internals/descriptors": 26, "../internals/ie8-dom-define": 38, "../internals/to-primitive": 70 },
    ],
    51: [
      function (e, t, n) {
        var r = e("../internals/descriptors"),
          i = e("../internals/object-property-is-enumerable"),
          o = e("../internals/create-property-descriptor"),
          s = e("../internals/to-indexed-object"),
          a = e("../internals/to-primitive"),
          l = e("../internals/has"),
          c = e("../internals/ie8-dom-define"),
          u = Object.getOwnPropertyDescriptor;
        n.f = r
          ? u
          : function (e, t) {
              if (((e = s(e)), (t = a(t, !0)), c))
                try {
                  return u(e, t);
                } catch (e) {}
              if (l(e, t)) return o(!i.f.call(e, t), e[t]);
            };
      },
      { "../internals/create-property-descriptor": 25, "../internals/descriptors": 26, "../internals/has": 35, "../internals/ie8-dom-define": 38, "../internals/object-property-is-enumerable": 56, "../internals/to-indexed-object": 66, "../internals/to-primitive": 70 },
    ],
    52: [
      function (e, t, n) {
        var r = e("../internals/object-keys-internal"),
          i = e("../internals/enum-bug-keys").concat("length", "prototype");
        n.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return r(e, i);
          };
      },
      { "../internals/enum-bug-keys": 29, "../internals/object-keys-internal": 54 },
    ],
    53: [
      function (e, t, n) {
        n.f = Object.getOwnPropertySymbols;
      },
      {},
    ],
    54: [
      function (e, t, n) {
        var s = e("../internals/has"),
          a = e("../internals/to-indexed-object"),
          l = e("../internals/array-includes").indexOf,
          c = e("../internals/hidden-keys");
        t.exports = function (e, t) {
          var n,
            r = a(e),
            i = 0,
            o = [];
          for (n in r) !s(c, n) && s(r, n) && o.push(n);
          for (; t.length > i; ) s(r, (n = t[i++])) && (~l(o, n) || o.push(n));
          return o;
        };
      },
      { "../internals/array-includes": 18, "../internals/has": 35, "../internals/hidden-keys": 36, "../internals/to-indexed-object": 66 },
    ],
    55: [
      function (e, t, n) {
        var r = e("../internals/object-keys-internal"),
          i = e("../internals/enum-bug-keys");
        t.exports =
          Object.keys ||
          function (e) {
            return r(e, i);
          };
      },
      { "../internals/enum-bug-keys": 29, "../internals/object-keys-internal": 54 },
    ],
    56: [
      function (e, t, n) {
        "use strict";
        var r = {}.propertyIsEnumerable,
          i = Object.getOwnPropertyDescriptor,
          o = i && !r.call({ 1: 2 }, 1);
        n.f = o
          ? function (e) {
              var t = i(this, e);
              return !!t && t.enumerable;
            }
          : r;
      },
      {},
    ],
    57: [
      function (e, t, n) {
        var r = e("../internals/get-built-in"),
          i = e("../internals/object-get-own-property-names"),
          o = e("../internals/object-get-own-property-symbols"),
          s = e("../internals/an-object");
        t.exports =
          r("Reflect", "ownKeys") ||
          function (e) {
            var t = i.f(s(e)),
              n = o.f;
            return n ? t.concat(n(e)) : t;
          };
      },
      { "../internals/an-object": 17, "../internals/get-built-in": 33, "../internals/object-get-own-property-names": 52, "../internals/object-get-own-property-symbols": 53 },
    ],
    58: [
      function (e, t, n) {
        var r = e("../internals/global");
        t.exports = r;
      },
      { "../internals/global": 34 },
    ],
    59: [
      function (e, t, n) {
        var a = e("../internals/global"),
          l = e("../internals/create-non-enumerable-property"),
          c = e("../internals/has"),
          u = e("../internals/set-global"),
          r = e("../internals/inspect-source"),
          i = e("../internals/internal-state"),
          o = i.get,
          d = i.enforce,
          p = String(String).split("String");
        (t.exports = function (e, t, n, r) {
          var i = !!r && !!r.unsafe,
            o = !!r && !!r.enumerable,
            s = !!r && !!r.noTargetGet;
          "function" == typeof n && ("string" != typeof t || c(n, "name") || l(n, "name", t), (d(n).source = p.join("string" == typeof t ? t : ""))), e !== a ? (i ? !s && e[t] && (o = !0) : delete e[t], o ? (e[t] = n) : l(e, t, n)) : o ? (e[t] = n) : u(t, n);
        })(Function.prototype, "toString", function () {
          return ("function" == typeof this && o(this).source) || r(this);
        });
      },
      { "../internals/create-non-enumerable-property": 24, "../internals/global": 34, "../internals/has": 35, "../internals/inspect-source": 40, "../internals/internal-state": 41, "../internals/set-global": 61 },
    ],
    60: [
      function (e, t, n) {
        t.exports = function (e) {
          if (null == e) throw TypeError("Can't call method on " + e);
          return e;
        };
      },
      {},
    ],
    61: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/create-non-enumerable-property");
        t.exports = function (t, n) {
          try {
            i(r, t, n);
          } catch (e) {
            r[t] = n;
          }
          return n;
        };
      },
      { "../internals/create-non-enumerable-property": 24, "../internals/global": 34 },
    ],
    62: [
      function (e, t, n) {
        var r = e("../internals/shared"),
          i = e("../internals/uid"),
          o = r("keys");
        t.exports = function (e) {
          return o[e] || (o[e] = i(e));
        };
      },
      { "../internals/shared": 64, "../internals/uid": 71 },
    ],
    63: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/set-global"),
          o = "__core-js_shared__",
          s = r[o] || i(o, {});
        t.exports = s;
      },
      { "../internals/global": 34, "../internals/set-global": 61 },
    ],
    64: [
      function (e, t, n) {
        var r = e("../internals/is-pure"),
          i = e("../internals/shared-store");
        (t.exports = function (e, t) {
          return i[e] || (i[e] = void 0 !== t ? t : {});
        })("versions", []).push({ version: "3.6.4", mode: r ? "pure" : "global", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });
      },
      { "../internals/is-pure": 45, "../internals/shared-store": 63 },
    ],
    65: [
      function (e, t, n) {
        var r = e("../internals/to-integer"),
          i = Math.max,
          o = Math.min;
        t.exports = function (e, t) {
          var n = r(e);
          return n < 0 ? i(n + t, 0) : o(n, t);
        };
      },
      { "../internals/to-integer": 67 },
    ],
    66: [
      function (e, t, n) {
        var r = e("../internals/indexed-object"),
          i = e("../internals/require-object-coercible");
        t.exports = function (e) {
          return r(i(e));
        };
      },
      { "../internals/indexed-object": 39, "../internals/require-object-coercible": 60 },
    ],
    67: [
      function (e, t, n) {
        var r = Math.ceil,
          i = Math.floor;
        t.exports = function (e) {
          return isNaN((e = +e)) ? 0 : (0 < e ? i : r)(e);
        };
      },
      {},
    ],
    68: [
      function (e, t, n) {
        var r = e("../internals/to-integer"),
          i = Math.min;
        t.exports = function (e) {
          return 0 < e ? i(r(e), 9007199254740991) : 0;
        };
      },
      { "../internals/to-integer": 67 },
    ],
    69: [
      function (e, t, n) {
        var r = e("../internals/require-object-coercible");
        t.exports = function (e) {
          return Object(r(e));
        };
      },
      { "../internals/require-object-coercible": 60 },
    ],
    70: [
      function (e, t, n) {
        var i = e("../internals/is-object");
        t.exports = function (e, t) {
          if (!i(e)) return e;
          var n, r;
          if (t && "function" == typeof (n = e.toString) && !i((r = n.call(e)))) return r;
          if ("function" == typeof (n = e.valueOf) && !i((r = n.call(e)))) return r;
          if (!t && "function" == typeof (n = e.toString) && !i((r = n.call(e)))) return r;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      { "../internals/is-object": 44 },
    ],
    71: [
      function (e, t, n) {
        var r = 0,
          i = Math.random();
        t.exports = function (e) {
          return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++r + i).toString(36);
        };
      },
      {},
    ],
    72: [
      function (e, t, n) {
        var r = e("../internals/native-symbol");
        t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
      },
      { "../internals/native-symbol": 46 },
    ],
    73: [
      function (e, t, n) {
        var r = e("../internals/global"),
          i = e("../internals/shared"),
          o = e("../internals/has"),
          s = e("../internals/uid"),
          a = e("../internals/native-symbol"),
          l = e("../internals/use-symbol-as-uid"),
          c = i("wks"),
          u = r.Symbol,
          d = l ? u : (u && u.withoutSetter) || s;
        t.exports = function (e) {
          return o(c, e) || (a && o(u, e) ? (c[e] = u[e]) : (c[e] = d("Symbol." + e))), c[e];
        };
      },
      { "../internals/global": 34, "../internals/has": 35, "../internals/native-symbol": 46, "../internals/shared": 64, "../internals/uid": 71, "../internals/use-symbol-as-uid": 72 },
    ],
    74: [
      function (e, t, n) {
        "use strict";
        var r = e("../internals/export"),
          i = e("../internals/array-iteration").find,
          o = e("../internals/add-to-unscopables"),
          s = e("../internals/array-method-uses-to-length"),
          a = "find",
          l = !0,
          c = s(a);
        a in [] &&
          Array(1)[a](function () {
            l = !1;
          }),
          r(
            { target: "Array", proto: !0, forced: l || !c },
            {
              find: function (e, t) {
                return i(this, e, 1 < arguments.length ? t : void 0);
              },
            }
          ),
          o(a);
      },
      { "../internals/add-to-unscopables": 16, "../internals/array-iteration": 19, "../internals/array-method-uses-to-length": 20, "../internals/export": 30 },
    ],
    75: [
      function (e, t, n) {
        !(function (v) {
          function e(e, t, n) {
            return (
              (n = c(t, n)),
              this.on("click.pjax", e, function (e) {
                var t = n;
                t.container || ((t = v.extend({}, n)).container = v(this).attr("data-pjax")), r(e, t);
              })
            );
          }
          function r(e, t, n) {
            n = c(t, n);
            var r = e.currentTarget,
              i = v(r);
            if ("A" !== r.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
            if (!(1 < e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== r.protocol || location.hostname !== r.hostname || (-1 < r.href.indexOf("#") && l(r) == l(location)) || e.isDefaultPrevented())) {
              var o = { url: r.href, container: i.attr("data-pjax"), target: r },
                s = v.extend({}, o, n),
                a = v.Event("pjax:click");
              i.trigger(a, [s]), a.isDefaultPrevented() || (m(s), e.preventDefault(), i.trigger("pjax:clicked", [s]));
            }
          }
          function t(e, t, n) {
            n = c(t, n);
            var r = e.currentTarget,
              i = v(r);
            if ("FORM" !== r.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
            var o = { type: (i.attr("method") || "GET").toUpperCase(), url: i.attr("action"), container: i.attr("data-pjax"), target: r };
            if ("GET" !== o.type && void 0 !== window.FormData) (o.data = new FormData(r)), (o.processData = !1), (o.contentType = !1);
            else {
              if (i.find(":file").length) return;
              o.data = i.serializeArray();
            }
            m(v.extend({}, o, n)), e.preventDefault();
          }
          function m(p) {
            (p = v.extend(!0, {}, v.ajaxSettings, m.defaults, p)), v.isFunction(p.url) && (p.url = p.url());
            var f = _(p.url).hash,
              e = v.type(p.container);
            if ("string" !== e) throw "expected string value for 'container' option; got " + e;
            var r,
              h = (p.context = v(p.container));
            if (!h.length) throw "the container selector '" + p.container + "' did not match anything";
            function g(e, t, n) {
              (n = n || {}).relatedTarget = p.target;
              var r = v.Event(e, n);
              return h.trigger(r, t), !r.isDefaultPrevented();
            }
            p.data || (p.data = {}),
              v.isArray(p.data) ? p.data.push({ name: "_pjax", value: p.container }) : (p.data._pjax = p.container),
              (p.beforeSend = function (e, t) {
                if (("GET" !== t.type && (t.timeout = 0), e.setRequestHeader("X-PJAX", "true"), e.setRequestHeader("X-PJAX-Container", p.container), !g("pjax:beforeSend", [e, t]))) return !1;
                0 < t.timeout &&
                  ((r = setTimeout(function () {
                    g("pjax:timeout", [e, p]) && e.abort("timeout");
                  }, t.timeout)),
                  (t.timeout = 0));
                var n = _(t.url);
                f && (n.hash = f), (p.requestUrl = u(n));
              }),
              (p.complete = function (e, t) {
                r && clearTimeout(r), g("pjax:complete", [e, t, p]), g("pjax:end", [e, p]);
              }),
              (p.error = function (e, t, n) {
                var r = T("", e, p),
                  i = g("pjax:error", [e, t, n, p]);
                "GET" == p.type && "abort" !== t && i && y(r.url);
              }),
              (p.success = function (e, t, n) {
                var r = m.state,
                  i = "function" == typeof v.pjax.defaults.version ? v.pjax.defaults.version() : v.pjax.defaults.version,
                  o = n.getResponseHeader("X-PJAX-Version"),
                  s = T(e, n, p),
                  a = _(s.url);
                if ((f && ((a.hash = f), (s.url = a.href)), i && o && i !== o)) y(s.url);
                else if (s.contents) {
                  if (((m.state = { id: p.id || x(), url: s.url, title: s.title, container: p.container, fragment: p.fragment, timeout: p.timeout }), (p.push || p.replace) && window.history.replaceState(m.state, s.title, s.url), v.contains(h, document.activeElement)))
                    try {
                      document.activeElement.blur();
                    } catch (e) {}
                  s.title && (document.title = s.title), g("pjax:beforeReplace", [s.contents, p], { state: m.state, previousState: r }), h.html(s.contents);
                  var l = h.find("input[autofocus], textarea[autofocus]").last()[0];
                  l && document.activeElement !== l && l.focus(),
                    (function (e) {
                      if (!e) return;
                      var r = v("script[src]");
                      e.each(function () {
                        var e = this.src;
                        if (
                          !r.filter(function () {
                            return this.src === e;
                          }).length
                        ) {
                          var t = document.createElement("script"),
                            n = v(this).attr("type");
                          n && (t.type = n), (t.src = v(this).attr("src")), document.head.appendChild(t);
                        }
                      });
                    })(s.scripts);
                  var c = p.scrollTo;
                  if (f) {
                    var u = decodeURIComponent(f.slice(1)),
                      d = document.getElementById(u) || document.getElementsByName(u)[0];
                    d && (c = v(d).offset().top);
                  }
                  "number" == typeof c && v(window).scrollTop(c), g("pjax:success", [e, t, n, p]);
                } else y(s.url);
              }),
              m.state || ((m.state = { id: x(), url: window.location.href, title: document.title, container: p.container, fragment: p.fragment, timeout: p.timeout }), window.history.replaceState(m.state, document.title)),
              b(m.xhr),
              (m.options = p);
            var t,
              n,
              i = (m.xhr = v.ajax(p));
            return 0 < i.readyState && (p.push && !p.replace && ((t = m.state.id), (n = [p.container, w(h)]), (E[t] = n), C.push(t), j(S, 0), j(C, m.defaults.maxCacheLength), window.history.pushState(null, "", p.requestUrl)), g("pjax:start", [i, p]), g("pjax:send", [i, p])), m.xhr;
          }
          function n(e, t) {
            var n = { url: window.location.href, push: !1, replace: !0, scrollTo: !1 };
            return m(v.extend(n, c(e, t)));
          }
          function y(e) {
            window.history.replaceState(null, "", m.state.url), window.location.replace(e);
          }
          var d = !0,
            p = window.location.href,
            i = window.history.state;
          function o(e) {
            d || b(m.xhr);
            var t,
              n = m.state,
              r = e.state;
            if (r && r.container) {
              if (d && p == r.url) return;
              if (n) {
                if (n.id === r.id) return;
                t = n.id < r.id ? "forward" : "back";
              }
              var i = E[r.id] || [],
                o = i[0] || r.container,
                s = v(o),
                a = i[1];
              if (s.length) {
                n &&
                  (function (e, t, n) {
                    var r, i;
                    (E[t] = n), (i = "forward" === e ? ((r = C), S) : ((r = S), C));
                    r.push(t), (t = i.pop()) && delete E[t];
                    j(r, m.defaults.maxCacheLength);
                  })(t, n.id, [o, w(s)]);
                var l = v.Event("pjax:popstate", { state: r, direction: t });
                s.trigger(l);
                var c = { id: r.id, url: r.url, container: o, push: !1, fragment: r.fragment, timeout: r.timeout, scrollTo: !1 };
                if (a) {
                  s.trigger("pjax:start", [null, c]), (m.state = r).title && (document.title = r.title);
                  var u = v.Event("pjax:beforeReplace", { state: r, previousState: n });
                  s.trigger(u, [a, c]), s.html(a), s.trigger("pjax:end", [null, c]);
                } else m(c);
                s[0].offsetHeight;
              } else y(location.href);
            }
            d = !1;
          }
          function s(e) {
            var t = v.isFunction(e.url) ? e.url() : e.url,
              n = e.type ? e.type.toUpperCase() : "GET",
              r = v("<form>", { method: "GET" === n ? "GET" : "POST", action: t, style: "display:none" });
            "GET" !== n && "POST" !== n && r.append(v("<input>", { type: "hidden", name: "_method", value: n.toLowerCase() }));
            var i = e.data;
            if ("string" == typeof i)
              v.each(i.split("&"), function (e, t) {
                var n = t.split("=");
                r.append(v("<input>", { type: "hidden", name: n[0], value: n[1] }));
              });
            else if (v.isArray(i))
              v.each(i, function (e, t) {
                r.append(v("<input>", { type: "hidden", name: t.name, value: t.value }));
              });
            else if ("object" == typeof i) {
              var o;
              for (o in i) r.append(v("<input>", { type: "hidden", name: o, value: i[o] }));
            }
            v(document.body).append(r), r.submit();
          }
          function b(e) {
            e && e.readyState < 4 && ((e.onreadystatechange = v.noop), e.abort());
          }
          function x() {
            return new Date().getTime();
          }
          function w(e) {
            var t = e.clone();
            return (
              t.find("script").each(function () {
                this.src || v._data(this, "globalEval", !1);
              }),
              t.contents()
            );
          }
          function u(e) {
            return (e.search = e.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, "")), e.href.replace(/\?($|#)/, "$1");
          }
          function _(e) {
            var t = document.createElement("a");
            return (t.href = e), t;
          }
          function l(e) {
            return e.href.replace(/#.*/, "");
          }
          function c(e, t) {
            return e && t ? (((t = v.extend({}, t)).container = e), t) : v.isPlainObject(e) ? e : { container: e };
          }
          function f(e, t) {
            return e.filter(t).add(e.find(t));
          }
          function h(e) {
            return v.parseHTML(e, document, !0);
          }
          function T(e, t, n) {
            var r,
              i,
              o = {},
              s = /<html/i.test(e),
              a = t.getResponseHeader("X-PJAX-URL");
            if (((o.url = a ? u(_(a)) : n.requestUrl), s)) {
              i = v(h(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
              var l = e.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
              r = null != l ? v(h(l[0])) : i;
            } else r = i = v(h(e));
            if (0 === i.length) return o;
            if (((o.title = f(r, "title").last().text()), n.fragment)) {
              var c = i;
              "body" !== n.fragment && (c = f(c, n.fragment).first()), c.length && ((o.contents = "body" === n.fragment ? c : c.contents()), o.title || (o.title = c.attr("title") || c.data("title")));
            } else s || (o.contents = i);
            return (
              o.contents &&
                ((o.contents = o.contents.not(function () {
                  return v(this).is("title");
                })),
                o.contents.find("title").remove(),
                (o.scripts = f(o.contents, "script[src]").remove()),
                (o.contents = o.contents.not(o.scripts))),
              o.title && (o.title = v.trim(o.title)),
              o
            );
          }
          i && i.container && (m.state = i), "state" in window.history && (d = !1);
          var E = {},
            S = [],
            C = [];
          function j(e, t) {
            for (; e.length > t; ) delete E[e.shift()];
          }
          function a() {
            return v("meta")
              .filter(function () {
                var e = v(this).attr("http-equiv");
                return e && "X-PJAX-VERSION" === e.toUpperCase();
              })
              .attr("content");
          }
          function g() {
            (v.fn.pjax = e), (v.pjax = m), (v.pjax.enable = v.noop), (v.pjax.disable = k), (v.pjax.click = r), (v.pjax.submit = t), (v.pjax.reload = n), (v.pjax.defaults = { timeout: 650, push: !0, replace: !1, type: "GET", dataType: "html", scrollTo: 0, maxCacheLength: 20, version: a }), v(window).on("popstate.pjax", o);
          }
          function k() {
            (v.fn.pjax = function () {
              return this;
            }),
              (v.pjax = s),
              (v.pjax.enable = g),
              (v.pjax.disable = v.noop),
              (v.pjax.click = v.noop),
              (v.pjax.submit = v.noop),
              (v.pjax.reload = function () {
                window.location.reload();
              }),
              v(window).off("popstate.pjax", o);
          }
          v.event.props && v.inArray("state", v.event.props) < 0 ? v.event.props.push("state") : "state" in v.Event.prototype || v.event.addProp("state"), (v.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)), v.support.pjax ? g() : k();
        })(jQuery);
      },
      {},
    ],
    76: [
      function (e, t, n) {
        var c;
        (c = jQuery).fn.resizable ||
          (c.fn.resizable = function (e) {
            var l = { handleSelector: null, resizeWidth: !0, resizeHeight: !0, resizeWidthFrom: "right", resizeHeightFrom: "bottom", onDragStart: null, onDragEnd: null, onDrag: null, touchActionNone: !0 };
            return (
              "object" == typeof e && (l = c.extend(l, e)),
              this.each(function () {
                var i,
                  t,
                  o = c(this),
                  e = l.handleSelector ? c(l.handleSelector) : o;
                function n(e) {
                  e.stopPropagation(), e.preventDefault();
                }
                function r(e) {
                  var t = a(e);
                  if (l.resizeWidth) {
                    if ("left" === l.resizeWidthFrom) var n = i.width - t.x + i.x;
                    else n = i.width + t.x - i.x;
                    o.width(n);
                  }
                  if (l.resizeHeight) {
                    if ("top" === l.resizeHeightFrom) var r = i.height - t.y + i.y;
                    else r = i.height + t.y - i.y;
                    o.height(r);
                  }
                  l.onDrag && l.onDrag(e, o, l);
                }
                function s(e) {
                  return e.stopPropagation(), e.preventDefault(), c(document).unbind("mousemove.rsz", l.dragFunc), c(document).unbind("mouseup.rsz", s), (window.Touch || navigator.maxTouchPoints) && (c(document).unbind("touchmove.rsz", l.dragFunc), c(document).unbind("touchend.rsz", s)), c(document).unbind("selectstart.rsz", n), o.css("transition", t), l.onDragEnd && l.onDragEnd(e, o, l), !1;
                }
                function a(e) {
                  var t = { x: 0, y: 0, width: 0, height: 0 };
                  if ("number" == typeof e.clientX) (t.x = e.clientX), (t.y = e.clientY);
                  else {
                    if (!e.originalEvent.touches) return null;
                    (t.x = e.originalEvent.touches[0].clientX), (t.y = e.originalEvent.touches[0].clientY);
                  }
                  return t;
                }
                l.touchActionNone && e.css("touch-action", "none"),
                  o.addClass("resizable"),
                  e.bind("mousedown.rsz touchstart.rsz", function (e) {
                    if ((((i = a(e)).width = parseInt(o.width(), 10)), (i.height = parseInt(o.height(), 10)), (t = o.css("transition")), o.css("transition", "none"), l.onDragStart && !1 === l.onDragStart(e, o, l))) return;
                    (l.dragFunc = r), c(document).bind("mousemove.rsz", l.dragFunc), c(document).bind("mouseup.rsz", s), (window.Touch || navigator.maxTouchPoints) && (c(document).bind("touchmove.rsz", l.dragFunc), c(document).bind("touchend.rsz", s));
                    c(document).bind("selectstart.rsz", n);
                  });
              })
            );
          });
      },
      {},
    ],
    77: [
      function (e, n, t) {
        !(function (e, t) {
          "use strict";
          "object" == typeof n && "object" == typeof n.exports
            ? (n.exports = e.document
                ? t(e, !0)
                : function (e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return t(e);
                  })
            : t(e);
        })("undefined" != typeof window ? window : this, function (T, e) {
          "use strict";
          function g(e) {
            return null != e && e === e.window;
          }
          var t = [],
            E = T.document,
            r = Object.getPrototypeOf,
            a = t.slice,
            v = t.concat,
            l = t.push,
            i = t.indexOf,
            n = {},
            o = n.toString,
            m = n.hasOwnProperty,
            s = m.toString,
            c = s.call(Object),
            y = {},
            b = function (e) {
              return "function" == typeof e && "number" != typeof e.nodeType;
            },
            u = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function x(e, t, n) {
            var r,
              i,
              o = (n = n || E).createElement("script");
            if (((o.text = e), t)) for (r in u) (i = t[r] || (t.getAttribute && t.getAttribute(r))) && o.setAttribute(r, i);
            n.head.appendChild(o).parentNode.removeChild(o);
          }
          function w(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e;
          }
          var S = function (e, t) {
              return new S.fn.init(e, t);
            },
            d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          function p(e) {
            var t = !!e && "length" in e && e.length,
              n = w(e);
            return !b(e) && !g(e) && ("array" === n || 0 === t || ("number" == typeof t && 0 < t && t - 1 in e));
          }
          (S.fn = S.prototype = {
            jquery: "3.4.0",
            constructor: S,
            length: 0,
            toArray: function () {
              return a.call(this);
            },
            get: function (e) {
              return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e];
            },
            pushStack: function (e) {
              var t = S.merge(this.constructor(), e);
              return (t.prevObject = this), t;
            },
            each: function (e) {
              return S.each(this, e);
            },
            map: function (n) {
              return this.pushStack(
                S.map(this, function (e, t) {
                  return n.call(e, t, e);
                })
              );
            },
            slice: function () {
              return this.pushStack(a.apply(this, arguments));
            },
            first: function () {
              return this.eq(0);
            },
            last: function () {
              return this.eq(-1);
            },
            eq: function (e) {
              var t = this.length,
                n = +e + (e < 0 ? t : 0);
              return this.pushStack(0 <= n && n < t ? [this[n]] : []);
            },
            end: function () {
              return this.prevObject || this.constructor();
            },
            push: l,
            sort: t.sort,
            splice: t.splice,
          }),
            (S.extend = S.fn.extend = function () {
              var e,
                t,
                n,
                r,
                i,
                o,
                s = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
              for ("boolean" == typeof s && ((c = s), (s = arguments[a] || {}), a++), "object" == typeof s || b(s) || (s = {}), a === l && ((s = this), a--); a < l; a++) if (null != (e = arguments[a])) for (t in e) (r = e[t]), "__proto__" !== t && s !== r && (c && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? ((n = s[t]), (o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}), (i = !1), (s[t] = S.extend(c, o, r))) : void 0 !== r && (s[t] = r));
              return s;
            }),
            S.extend({
              expando: "jQuery" + ("3.4.0" + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || ("function" == typeof (n = m.call(t, "constructor") && t.constructor) && s.call(n) === c));
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              globalEval: function (e, t) {
                x(e, { nonce: t && t.nonce });
              },
              each: function (e, t) {
                var n,
                  r = 0;
                if (p(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                return e;
              },
              trim: function (e) {
                return null == e ? "" : (e + "").replace(d, "");
              },
              makeArray: function (e, t) {
                var n = t || [];
                return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : l.call(n, e)), n;
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : i.call(t, e, n);
              },
              merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                return (e.length = i), e;
              },
              grep: function (e, t, n) {
                for (var r = [], i = 0, o = e.length, s = !n; i < o; i++) !t(e[i], i) != s && r.push(e[i]);
                return r;
              },
              map: function (e, t, n) {
                var r,
                  i,
                  o = 0,
                  s = [];
                if (p(e)) for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
                else for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                return v.apply([], s);
              },
              guid: 1,
              support: y,
            }),
            "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]),
            S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
              n["[object " + t + "]"] = t.toLowerCase();
            });
          var f = (function (n) {
            function d(e, t, n) {
              var r = "0x" + t - 65536;
              return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
            }
            function i() {
              _();
            }
            var e,
              f,
              x,
              o,
              s,
              h,
              p,
              g,
              w,
              l,
              c,
              _,
              T,
              a,
              E,
              v,
              u,
              m,
              y,
              S = "sizzle" + 1 * new Date(),
              b = n.document,
              C = 0,
              r = 0,
              j = le(),
              k = le(),
              A = le(),
              $ = le(),
              O = function (e, t) {
                return e === t && (c = !0), 0;
              },
              D = {}.hasOwnProperty,
              t = [],
              N = t.pop,
              q = t.push,
              L = t.push,
              P = t.slice,
              I = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                return -1;
              },
              R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              H = "[\\x20\\t\\r\\n\\f]",
              M = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
              z = "\\[" + H + "*(" + M + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + H + "*\\]",
              F = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)",
              W = new RegExp(H + "+", "g"),
              B = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
              U = new RegExp("^" + H + "*," + H + "*"),
              G = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
              X = new RegExp(H + "|>"),
              J = new RegExp(F),
              V = new RegExp("^" + M + "$"),
              Y = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M + "|[*])"), ATTR: new RegExp("^" + z), PSEUDO: new RegExp("^" + F), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"), bool: new RegExp("^(?:" + R + ")$", "i"), needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i") },
              K = /HTML$/i,
              Q = /^(?:input|select|textarea|button)$/i,
              Z = /^h\d$/i,
              ee = /^[^{]+\{\s*\[native \w/,
              te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              ne = /[+~]/,
              re = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
              ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              oe = function (e, t) {
                return t ? ("\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " ") : "\\" + e;
              },
              se = xe(
                function (e) {
                  return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              L.apply((t = P.call(b.childNodes)), b.childNodes), t[b.childNodes.length].nodeType;
            } catch (e) {
              L = {
                apply: t.length
                  ? function (e, t) {
                      q.apply(e, P.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            function ae(t, e, n, r) {
              var i,
                o,
                s,
                a,
                l,
                c,
                u,
                d = e && e.ownerDocument,
                p = e ? e.nodeType : 9;
              if (((n = n || []), "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))) return n;
              if (!r && ((e ? e.ownerDocument || e : b) !== T && _(e), (e = e || T), E)) {
                if (11 !== p && (l = te.exec(t)))
                  if ((i = l[1])) {
                    if (9 === p) {
                      if (!(s = e.getElementById(i))) return n;
                      if (s.id === i) return n.push(s), n;
                    } else if (d && (s = d.getElementById(i)) && y(e, s) && s.id === i) return n.push(s), n;
                  } else {
                    if (l[2]) return L.apply(n, e.getElementsByTagName(t)), n;
                    if ((i = l[3]) && f.getElementsByClassName && e.getElementsByClassName) return L.apply(n, e.getElementsByClassName(i)), n;
                  }
                if (f.qsa && !$[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                  if (((u = t), (d = e), 1 === p && X.test(t))) {
                    for ((a = e.getAttribute("id")) ? (a = a.replace(ie, oe)) : e.setAttribute("id", (a = S)), o = (c = h(t)).length; o--; ) c[o] = "#" + a + " " + be(c[o]);
                    (u = c.join(",")), (d = (ne.test(t) && me(e.parentNode)) || e);
                  }
                  try {
                    return L.apply(n, d.querySelectorAll(u)), n;
                  } catch (e) {
                    $(t, !0);
                  } finally {
                    a === S && e.removeAttribute("id");
                  }
                }
              }
              return g(t.replace(B, "$1"), e, n, r);
            }
            function le() {
              var r = [];
              return function e(t, n) {
                return r.push(t + " ") > x.cacheLength && delete e[r.shift()], (e[t + " "] = n);
              };
            }
            function ce(e) {
              return (e[S] = !0), e;
            }
            function ue(e) {
              var t = T.createElement("fieldset");
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function de(e, t) {
              for (var n = e.split("|"), r = n.length; r--; ) x.attrHandle[n[r]] = t;
            }
            function pe(e, t) {
              var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function fe(t) {
              return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
              };
            }
            function he(n) {
              return function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n;
              };
            }
            function ge(t) {
              return function (e) {
                return "form" in e ? (e.parentNode && !1 === e.disabled ? ("label" in e ? ("label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t) : e.isDisabled === t || (e.isDisabled !== !t && se(e) === t)) : e.disabled === t) : "label" in e && e.disabled === t;
              };
            }
            function ve(s) {
              return ce(function (o) {
                return (
                  (o = +o),
                  ce(function (e, t) {
                    for (var n, r = s([], e.length, o), i = r.length; i--; ) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
                  })
                );
              });
            }
            function me(e) {
              return e && void 0 !== e.getElementsByTagName && e;
            }
            for (e in ((f = ae.support = {}),
            (s = ae.isXML = function (e) {
              var t = e.namespaceURI,
                n = (e.ownerDocument || e).documentElement;
              return !K.test(t || (n && n.nodeName) || "HTML");
            }),
            (_ = ae.setDocument = function (e) {
              var t,
                n,
                r = e ? e.ownerDocument || e : b;
              return (
                r !== T &&
                  9 === r.nodeType &&
                  r.documentElement &&
                  ((a = (T = r).documentElement),
                  (E = !s(T)),
                  b !== T && (n = T.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", i, !1) : n.attachEvent && n.attachEvent("onunload", i)),
                  (f.attributes = ue(function (e) {
                    return (e.className = "i"), !e.getAttribute("className");
                  })),
                  (f.getElementsByTagName = ue(function (e) {
                    return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length;
                  })),
                  (f.getElementsByClassName = ee.test(T.getElementsByClassName)),
                  (f.getById = ue(function (e) {
                    return (a.appendChild(e).id = S), !T.getElementsByName || !T.getElementsByName(S).length;
                  })),
                  f.getById
                    ? ((x.filter.ID = function (e) {
                        var t = e.replace(re, d);
                        return function (e) {
                          return e.getAttribute("id") === t;
                        };
                      }),
                      (x.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && E) {
                          var n = t.getElementById(e);
                          return n ? [n] : [];
                        }
                      }))
                    : ((x.filter.ID = function (e) {
                        var n = e.replace(re, d);
                        return function (e) {
                          var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                          return t && t.value === n;
                        };
                      }),
                      (x.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && E) {
                          var n,
                            r,
                            i,
                            o = t.getElementById(e);
                          if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                            for (i = t.getElementsByName(e), r = 0; (o = i[r++]); ) if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                          }
                          return [];
                        }
                      })),
                  (x.find.TAG = f.getElementsByTagName
                    ? function (e, t) {
                        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0;
                      }
                    : function (e, t) {
                        var n,
                          r = [],
                          i = 0,
                          o = t.getElementsByTagName(e);
                        if ("*" !== e) return o;
                        for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                        return r;
                      }),
                  (x.find.CLASS =
                    f.getElementsByClassName &&
                    function (e, t) {
                      if (void 0 !== t.getElementsByClassName && E) return t.getElementsByClassName(e);
                    }),
                  (u = []),
                  (v = []),
                  (f.qsa = ee.test(T.querySelectorAll)) &&
                    (ue(function (e) {
                      (a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>"), e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + H + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + H + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]");
                    }),
                    ue(function (e) {
                      e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                      var t = T.createElement("input");
                      t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + H + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), (a.appendChild(e).disabled = !0), 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
                    })),
                  (f.matchesSelector = ee.test((m = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector))) &&
                    ue(function (e) {
                      (f.disconnectedMatch = m.call(e, "*")), m.call(e, "[s!='']:x"), u.push("!=", F);
                    }),
                  (v = v.length && new RegExp(v.join("|"))),
                  (u = u.length && new RegExp(u.join("|"))),
                  (t = ee.test(a.compareDocumentPosition)),
                  (y =
                    t || ee.test(a.contains)
                      ? function (e, t) {
                          var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                          return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                        }
                      : function (e, t) {
                          if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                          return !1;
                        }),
                  (O = t
                    ? function (e, t) {
                        if (e === t) return (c = !0), 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || (!f.sortDetached && t.compareDocumentPosition(e) === n) ? (e === T || (e.ownerDocument === b && y(b, e)) ? -1 : t === T || (t.ownerDocument === b && y(b, t)) ? 1 : l ? I(l, e) - I(l, t) : 0) : 4 & n ? -1 : 1);
                      }
                    : function (e, t) {
                        if (e === t) return (c = !0), 0;
                        var n,
                          r = 0,
                          i = e.parentNode,
                          o = t.parentNode,
                          s = [e],
                          a = [t];
                        if (!i || !o) return e === T ? -1 : t === T ? 1 : i ? -1 : o ? 1 : l ? I(l, e) - I(l, t) : 0;
                        if (i === o) return pe(e, t);
                        for (n = e; (n = n.parentNode); ) s.unshift(n);
                        for (n = t; (n = n.parentNode); ) a.unshift(n);
                        for (; s[r] === a[r]; ) r++;
                        return r ? pe(s[r], a[r]) : s[r] === b ? -1 : a[r] === b ? 1 : 0;
                      })),
                T
              );
            }),
            (ae.matches = function (e, t) {
              return ae(e, null, null, t);
            }),
            (ae.matchesSelector = function (e, t) {
              if (((e.ownerDocument || e) !== T && _(e), f.matchesSelector && E && !$[t + " "] && (!u || !u.test(t)) && (!v || !v.test(t))))
                try {
                  var n = m.call(e, t);
                  if (n || f.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return n;
                } catch (e) {
                  $(t, !0);
                }
              return 0 < ae(t, T, null, [e]).length;
            }),
            (ae.contains = function (e, t) {
              return (e.ownerDocument || e) !== T && _(e), y(e, t);
            }),
            (ae.attr = function (e, t) {
              (e.ownerDocument || e) !== T && _(e);
              var n = x.attrHandle[t.toLowerCase()],
                r = n && D.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
              return void 0 !== r ? r : f.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
            }),
            (ae.escape = function (e) {
              return (e + "").replace(ie, oe);
            }),
            (ae.error = function (e) {
              throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (ae.uniqueSort = function (e) {
              var t,
                n = [],
                r = 0,
                i = 0;
              if (((c = !f.detectDuplicates), (l = !f.sortStable && e.slice(0)), e.sort(O), c)) {
                for (; (t = e[i++]); ) t === e[i] && (r = n.push(i));
                for (; r--; ) e.splice(n[r], 1);
              }
              return (l = null), e;
            }),
            (o = ae.getText = function (e) {
              var t,
                n = "",
                r = 0,
                i = e.nodeType;
              if (i) {
                if (1 === i || 9 === i || 11 === i) {
                  if ("string" == typeof e.textContent) return e.textContent;
                  for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
              } else for (; (t = e[r++]); ) n += o(t);
              return n;
            }),
            ((x = ae.selectors = {
              cacheLength: 50,
              createPseudo: ce,
              match: Y,
              attrHandle: {},
              find: {},
              relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
              preFilter: {
                ATTR: function (e) {
                  return (e[1] = e[1].replace(re, d)), (e[3] = (e[3] || e[4] || e[5] || "").replace(re, d)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function (e) {
                  return (e[1] = e[1].toLowerCase()), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && ae.error(e[0]), e;
                },
                PSEUDO: function (e) {
                  var t,
                    n = !e[6] && e[2];
                  return Y.CHILD.test(e[0]) ? null : (e[3] ? (e[2] = e[4] || e[5] || "") : n && J.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                },
              },
              filter: {
                TAG: function (e) {
                  var t = e.replace(re, d).toLowerCase();
                  return "*" === e
                    ? function () {
                        return !0;
                      }
                    : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                      };
                },
                CLASS: function (e) {
                  var t = j[e + " "];
                  return (
                    t ||
                    ((t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) &&
                      j(e, function (e) {
                        return t.test(("string" == typeof e.className && e.className) || (void 0 !== e.getAttribute && e.getAttribute("class")) || "");
                      }))
                  );
                },
                ATTR: function (n, r, i) {
                  return function (e) {
                    var t = ae.attr(e, n);
                    return null == t ? "!=" === r : !r || ((t += ""), "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(W, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
                  };
                },
                CHILD: function (h, e, t, g, v) {
                  var m = "nth" !== h.slice(0, 3),
                    y = "last" !== h.slice(-4),
                    b = "of-type" === e;
                  return 1 === g && 0 === v
                    ? function (e) {
                        return !!e.parentNode;
                      }
                    : function (e, t, n) {
                        var r,
                          i,
                          o,
                          s,
                          a,
                          l,
                          c = m != y ? "nextSibling" : "previousSibling",
                          u = e.parentNode,
                          d = b && e.nodeName.toLowerCase(),
                          p = !n && !b,
                          f = !1;
                        if (u) {
                          if (m) {
                            for (; c; ) {
                              for (s = e; (s = s[c]); ) if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                              l = c = "only" === h && !l && "nextSibling";
                            }
                            return !0;
                          }
                          if (((l = [y ? u.firstChild : u.lastChild]), y && p)) {
                            for (f = (a = (r = (i = (o = (s = u)[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] || [])[0] === C && r[1]) && r[2], s = a && u.childNodes[a]; (s = (++a && s && s[c]) || (f = a = 0) || l.pop()); )
                              if (1 === s.nodeType && ++f && s === e) {
                                i[h] = [C, a, f];
                                break;
                              }
                          } else if ((p && (f = a = (r = (i = (o = (s = e)[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] || [])[0] === C && r[1]), !1 === f)) for (; (s = (++a && s && s[c]) || (f = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (p && ((i = (o = s[S] || (s[S] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[h] = [C, f]), s !== e)); );
                          return (f -= v) === g || (f % g == 0 && 0 <= f / g);
                        }
                      };
                },
                PSEUDO: function (e, o) {
                  var t,
                    s = x.pseudos[e] || x.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                  return s[S]
                    ? s(o)
                    : 1 < s.length
                    ? ((t = [e, e, "", o]),
                      x.setFilters.hasOwnProperty(e.toLowerCase())
                        ? ce(function (e, t) {
                            for (var n, r = s(e, o), i = r.length; i--; ) e[(n = I(e, r[i]))] = !(t[n] = r[i]);
                          })
                        : function (e) {
                            return s(e, 0, t);
                          })
                    : s;
                },
              },
              pseudos: {
                not: ce(function (e) {
                  var r = [],
                    i = [],
                    a = p(e.replace(B, "$1"));
                  return a[S]
                    ? ce(function (e, t, n, r) {
                        for (var i, o = a(e, null, r, []), s = e.length; s--; ) (i = o[s]) && (e[s] = !(t[s] = i));
                      })
                    : function (e, t, n) {
                        return (r[0] = e), a(r, null, n, i), (r[0] = null), !i.pop();
                      };
                }),
                has: ce(function (t) {
                  return function (e) {
                    return 0 < ae(t, e).length;
                  };
                }),
                contains: ce(function (t) {
                  return (
                    (t = t.replace(re, d)),
                    function (e) {
                      return -1 < (e.textContent || o(e)).indexOf(t);
                    }
                  );
                }),
                lang: ce(function (n) {
                  return (
                    V.test(n || "") || ae.error("unsupported lang: " + n),
                    (n = n.replace(re, d).toLowerCase()),
                    function (e) {
                      var t;
                      do {
                        if ((t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
                      } while ((e = e.parentNode) && 1 === e.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (e) {
                  var t = n.location && n.location.hash;
                  return t && t.slice(1) === e.id;
                },
                root: function (e) {
                  return e === a;
                },
                focus: function (e) {
                  return e === T.activeElement && (!T.hasFocus || T.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: ge(!1),
                disabled: ge(!0),
                checked: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                },
                selected: function (e) {
                  return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                },
                empty: function (e) {
                  for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                  return !0;
                },
                parent: function (e) {
                  return !x.pseudos.empty(e);
                },
                header: function (e) {
                  return Z.test(e.nodeName);
                },
                input: function (e) {
                  return Q.test(e.nodeName);
                },
                button: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return ("input" === t && "button" === e.type) || "button" === t;
                },
                text: function (e) {
                  var t;
                  return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: ve(function () {
                  return [0];
                }),
                last: ve(function (e, t) {
                  return [t - 1];
                }),
                eq: ve(function (e, t, n) {
                  return [n < 0 ? n + t : n];
                }),
                even: ve(function (e, t) {
                  for (var n = 0; n < t; n += 2) e.push(n);
                  return e;
                }),
                odd: ve(function (e, t) {
                  for (var n = 1; n < t; n += 2) e.push(n);
                  return e;
                }),
                lt: ve(function (e, t, n) {
                  for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
                  return e;
                }),
                gt: ve(function (e, t, n) {
                  for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                  return e;
                }),
              },
            }).pseudos.nth = x.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              x.pseudos[e] = fe(e);
            for (e in { submit: !0, reset: !0 }) x.pseudos[e] = he(e);
            function ye() {}
            function be(e) {
              for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
              return r;
            }
            function xe(a, e, t) {
              var l = e.dir,
                c = e.next,
                u = c || l,
                d = t && "parentNode" === u,
                p = r++;
              return e.first
                ? function (e, t, n) {
                    for (; (e = e[l]); ) if (1 === e.nodeType || d) return a(e, t, n);
                    return !1;
                  }
                : function (e, t, n) {
                    var r,
                      i,
                      o,
                      s = [C, p];
                    if (n) {
                      for (; (e = e[l]); ) if ((1 === e.nodeType || d) && a(e, t, n)) return !0;
                    } else
                      for (; (e = e[l]); )
                        if (1 === e.nodeType || d)
                          if (((i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {})), c && c === e.nodeName.toLowerCase())) e = e[l] || e;
                          else {
                            if ((r = i[u]) && r[0] === C && r[1] === p) return (s[2] = r[2]);
                            if (((i[u] = s)[2] = a(e, t, n))) return !0;
                          }
                    return !1;
                  };
            }
            function we(i) {
              return 1 < i.length
                ? function (e, t, n) {
                    for (var r = i.length; r--; ) if (!i[r](e, t, n)) return !1;
                    return !0;
                  }
                : i[0];
            }
            function _e(e, t, n, r, i) {
              for (var o, s = [], a = 0, l = e.length, c = null != t; a < l; a++) (o = e[a]) && ((n && !n(o, r, i)) || (s.push(o), c && t.push(a)));
              return s;
            }
            function Te(f, h, g, v, m, e) {
              return (
                v && !v[S] && (v = Te(v)),
                m && !m[S] && (m = Te(m, e)),
                ce(function (e, t, n, r) {
                  var i,
                    o,
                    s,
                    a = [],
                    l = [],
                    c = t.length,
                    u =
                      e ||
                      (function (e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) ae(e, t[r], n);
                        return n;
                      })(h || "*", n.nodeType ? [n] : n, []),
                    d = !f || (!e && h) ? u : _e(u, a, f, n, r),
                    p = g ? (m || (e ? f : c || v) ? [] : t) : d;
                  if ((g && g(d, p, n, r), v)) for (i = _e(p, l), v(i, [], n, r), o = i.length; o--; ) (s = i[o]) && (p[l[o]] = !(d[l[o]] = s));
                  if (e) {
                    if (m || f) {
                      if (m) {
                        for (i = [], o = p.length; o--; ) (s = p[o]) && i.push((d[o] = s));
                        m(null, (p = []), i, r);
                      }
                      for (o = p.length; o--; ) (s = p[o]) && -1 < (i = m ? I(e, s) : a[o]) && (e[i] = !(t[i] = s));
                    }
                  } else (p = _e(p === t ? p.splice(c, p.length) : p)), m ? m(null, t, p, r) : L.apply(t, p);
                })
              );
            }
            function Ee(e) {
              for (
                var i,
                  t,
                  n,
                  r = e.length,
                  o = x.relative[e[0].type],
                  s = o || x.relative[" "],
                  a = o ? 1 : 0,
                  l = xe(
                    function (e) {
                      return e === i;
                    },
                    s,
                    !0
                  ),
                  c = xe(
                    function (e) {
                      return -1 < I(i, e);
                    },
                    s,
                    !0
                  ),
                  u = [
                    function (e, t, n) {
                      var r = (!o && (n || t !== w)) || ((i = t).nodeType ? l(e, t, n) : c(e, t, n));
                      return (i = null), r;
                    },
                  ];
                a < r;
                a++
              )
                if ((t = x.relative[e[a].type])) u = [xe(we(u), t)];
                else {
                  if ((t = x.filter[e[a].type].apply(null, e[a].matches))[S]) {
                    for (n = ++a; n < r && !x.relative[e[n].type]; n++);
                    return Te(1 < a && we(u), 1 < a && be(e.slice(0, a - 1).concat({ value: " " === e[a - 2].type ? "*" : "" })).replace(B, "$1"), t, a < n && Ee(e.slice(a, n)), n < r && Ee((e = e.slice(n))), n < r && be(e));
                  }
                  u.push(t);
                }
              return we(u);
            }
            function Se(v, m) {
              function e(e, t, n, r, i) {
                var o,
                  s,
                  a,
                  l = 0,
                  c = "0",
                  u = e && [],
                  d = [],
                  p = w,
                  f = e || (b && x.find.TAG("*", i)),
                  h = (C += null == p ? 1 : Math.random() || 0.1),
                  g = f.length;
                for (i && (w = t === T || t || i); c !== g && null != (o = f[c]); c++) {
                  if (b && o) {
                    for (s = 0, t || o.ownerDocument === T || (_(o), (n = !E)); (a = v[s++]); )
                      if (a(o, t || T, n)) {
                        r.push(o);
                        break;
                      }
                    i && (C = h);
                  }
                  y && ((o = !a && o) && l--, e && u.push(o));
                }
                if (((l += c), y && c !== l)) {
                  for (s = 0; (a = m[s++]); ) a(u, d, t, n);
                  if (e) {
                    if (0 < l) for (; c--; ) u[c] || d[c] || (d[c] = N.call(r));
                    d = _e(d);
                  }
                  L.apply(r, d), i && !e && 0 < d.length && 1 < l + m.length && ae.uniqueSort(r);
                }
                return i && ((C = h), (w = p)), u;
              }
              var y = 0 < m.length,
                b = 0 < v.length;
              return y ? ce(e) : e;
            }
            return (
              (ye.prototype = x.filters = x.pseudos),
              (x.setFilters = new ye()),
              (h = ae.tokenize = function (e, t) {
                var n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  c = k[e + " "];
                if (c) return t ? 0 : c.slice(0);
                for (s = e, a = [], l = x.preFilter; s; ) {
                  for (o in ((n && !(r = U.exec(s))) || (r && (s = s.slice(r[0].length) || s), a.push((i = []))), (n = !1), (r = G.exec(s)) && ((n = r.shift()), i.push({ value: n, type: r[0].replace(B, " ") }), (s = s.slice(n.length))), x.filter)) !(r = Y[o].exec(s)) || (l[o] && !(r = l[o](r))) || ((n = r.shift()), i.push({ value: n, type: o, matches: r }), (s = s.slice(n.length)));
                  if (!n) break;
                }
                return t ? s.length : s ? ae.error(e) : k(e, a).slice(0);
              }),
              (p = ae.compile = function (e, t) {
                var n,
                  r = [],
                  i = [],
                  o = A[e + " "];
                if (!o) {
                  for (n = (t = t || h(e)).length; n--; ) (o = Ee(t[n]))[S] ? r.push(o) : i.push(o);
                  (o = A(e, Se(i, r))).selector = e;
                }
                return o;
              }),
              (g = ae.select = function (e, t, n, r) {
                var i,
                  o,
                  s,
                  a,
                  l,
                  c = "function" == typeof e && e,
                  u = !r && h((e = c.selector || e));
                if (((n = n || []), 1 === u.length)) {
                  if (2 < (o = u[0] = u[0].slice(0)).length && "ID" === (s = o[0]).type && 9 === t.nodeType && E && x.relative[o[1].type]) {
                    if (!(t = (x.find.ID(s.matches[0].replace(re, d), t) || [])[0])) return n;
                    c && (t = t.parentNode), (e = e.slice(o.shift().value.length));
                  }
                  for (i = Y.needsContext.test(e) ? 0 : o.length; i-- && ((s = o[i]), !x.relative[(a = s.type)]); )
                    if ((l = x.find[a]) && (r = l(s.matches[0].replace(re, d), (ne.test(o[0].type) && me(t.parentNode)) || t))) {
                      if ((o.splice(i, 1), !(e = r.length && be(o)))) return L.apply(n, r), n;
                      break;
                    }
                }
                return (c || p(e, u))(r, t, !E, n, !t || (ne.test(e) && me(t.parentNode)) || t), n;
              }),
              (f.sortStable = S.split("").sort(O).join("") === S),
              (f.detectDuplicates = !!c),
              _(),
              (f.sortDetached = ue(function (e) {
                return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
              })),
              ue(function (e) {
                return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
              }) ||
                de("type|href|height|width", function (e, t, n) {
                  if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                }),
              (f.attributes &&
                ue(function (e) {
                  return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                })) ||
                de("value", function (e, t, n) {
                  if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
                }),
              ue(function (e) {
                return null == e.getAttribute("disabled");
              }) ||
                de(R, function (e, t, n) {
                  var r;
                  if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                }),
              ae
            );
          })(T);
          (S.find = f), (S.expr = f.selectors), (S.expr[":"] = S.expr.pseudos), (S.uniqueSort = S.unique = f.uniqueSort), (S.text = f.getText), (S.isXMLDoc = f.isXML), (S.contains = f.contains), (S.escapeSelector = f.escape);
          function h(e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
              if (1 === e.nodeType) {
                if (i && S(e).is(n)) break;
                r.push(e);
              }
            return r;
          }
          function _(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
          }
          var C = S.expr.match.needsContext;
          function j(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function A(e, n, r) {
            return b(n)
              ? S.grep(e, function (e, t) {
                  return !!n.call(e, t, e) !== r;
                })
              : n.nodeType
              ? S.grep(e, function (e) {
                  return (e === n) !== r;
                })
              : "string" != typeof n
              ? S.grep(e, function (e) {
                  return -1 < i.call(n, e) !== r;
                })
              : S.filter(n, e, r);
          }
          (S.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ":not(" + e + ")"),
              1 === t.length && 1 === r.nodeType
                ? S.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : S.find.matches(
                    e,
                    S.grep(t, function (e) {
                      return 1 === e.nodeType;
                    })
                  )
            );
          }),
            S.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  i = this;
                if ("string" != typeof e)
                  return this.pushStack(
                    S(e).filter(function () {
                      for (t = 0; t < r; t++) if (S.contains(i[t], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
                return 1 < r ? S.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(A(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(A(this, e || [], !0));
              },
              is: function (e) {
                return !!A(this, "string" == typeof e && C.test(e) ? S(e) : e || [], !1).length;
              },
            });
          var $,
            O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((S.fn.init = function (e, t, n) {
            var r, i;
            if (!e) return this;
            if (((n = n || $), "string" != typeof e)) return e.nodeType ? ((this[0] = e), (this.length = 1), this) : b(e) ? (void 0 !== n.ready ? n.ready(e) : e(S)) : S.makeArray(e, this);
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : O.exec(e)) || (!r[1] && t)) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
              if (((t = t instanceof S ? t[0] : t), S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), k.test(r[1]) && S.isPlainObject(t))) for (r in t) b(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
              return this;
            }
            return (i = E.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this;
          }).prototype = S.fn),
            ($ = S(E));
          var D = /^(?:parents|prev(?:Until|All))/,
            N = { children: !0, contents: !0, next: !0, prev: !0 };
          function q(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          S.fn.extend({
            has: function (e) {
              var t = S(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                i = this.length,
                o = [],
                s = "string" != typeof e && S(e);
              if (!C.test(e))
                for (; r < i; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                      o.push(n);
                      break;
                    }
              return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
            },
            index: function (e) {
              return e ? ("string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (e, t) {
              return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
            },
            addBack: function (e) {
              return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
          }),
            S.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return h(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                  return h(e, "parentNode", n);
                },
                next: function (e) {
                  return q(e, "nextSibling");
                },
                prev: function (e) {
                  return q(e, "previousSibling");
                },
                nextAll: function (e) {
                  return h(e, "nextSibling");
                },
                prevAll: function (e) {
                  return h(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                  return h(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                  return h(e, "previousSibling", n);
                },
                siblings: function (e) {
                  return _((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return _(e.firstChild);
                },
                contents: function (e) {
                  return void 0 !== e.contentDocument ? e.contentDocument : (j(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
                },
              },
              function (r, i) {
                S.fn[r] = function (e, t) {
                  var n = S.map(this, i, e);
                  return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (N[r] || S.uniqueSort(n), D.test(r) && n.reverse()), this.pushStack(n);
                };
              }
            );
          var L = /[^\x20\t\r\n\f]+/g;
          function P(e) {
            return e;
          }
          function I(e) {
            throw e;
          }
          function R(e, t, n, r) {
            var i;
            try {
              e && b((i = e.promise)) ? i.call(e).done(t).fail(n) : e && b((i = e.then)) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          (S.Callbacks = function (r) {
            var e, n;
            r =
              "string" == typeof r
                ? ((e = r),
                  (n = {}),
                  S.each(e.match(L) || [], function (e, t) {
                    n[t] = !0;
                  }),
                  n)
                : S.extend({}, r);
            function i() {
              for (a = a || r.once, s = o = !0; c.length; u = -1) for (t = c.shift(); ++u < l.length; ) !1 === l[u].apply(t[0], t[1]) && r.stopOnFalse && ((u = l.length), (t = !1));
              r.memory || (t = !1), (o = !1), a && (l = t ? [] : "");
            }
            var o,
              t,
              s,
              a,
              l = [],
              c = [],
              u = -1,
              d = {
                add: function () {
                  return (
                    l &&
                      (t && !o && ((u = l.length - 1), c.push(t)),
                      (function n(e) {
                        S.each(e, function (e, t) {
                          b(t) ? (r.unique && d.has(t)) || l.push(t) : t && t.length && "string" !== w(t) && n(t);
                        });
                      })(arguments),
                      t && !o && i()),
                    this
                  );
                },
                remove: function () {
                  return (
                    S.each(arguments, function (e, t) {
                      for (var n; -1 < (n = S.inArray(t, l, n)); ) l.splice(n, 1), n <= u && u--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? -1 < S.inArray(e, l) : 0 < l.length;
                },
                empty: function () {
                  return (l = l && []), this;
                },
                disable: function () {
                  return (a = c = []), (l = t = ""), this;
                },
                disabled: function () {
                  return !l;
                },
                lock: function () {
                  return (a = c = []), t || o || (l = t = ""), this;
                },
                locked: function () {
                  return !!a;
                },
                fireWith: function (e, t) {
                  return a || ((t = [e, (t = t || []).slice ? t.slice() : t]), c.push(t), o || i()), this;
                },
                fire: function () {
                  return d.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!s;
                },
              };
            return d;
          }),
            S.extend({
              Deferred: function (e) {
                var o = [
                    ["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2],
                    ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"],
                  ],
                  i = "pending",
                  s = {
                    state: function () {
                      return i;
                    },
                    always: function () {
                      return a.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return s.then(null, e);
                    },
                    pipe: function () {
                      var i = arguments;
                      return S.Deferred(function (r) {
                        S.each(o, function (e, t) {
                          var n = b(i[t[4]]) && i[t[4]];
                          a[t[1]](function () {
                            var e = n && n.apply(this, arguments);
                            e && b(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
                          });
                        }),
                          (i = null);
                      }).promise();
                    },
                    then: function (t, n, r) {
                      var l = 0;
                      function c(i, o, s, a) {
                        return function () {
                          function e() {
                            var e, t;
                            if (!(i < l)) {
                              if ((e = s.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                              (t = e && ("object" == typeof e || "function" == typeof e) && e.then), b(t) ? (a ? t.call(e, c(l, o, P, a), c(l, o, I, a)) : (l++, t.call(e, c(l, o, P, a), c(l, o, I, a), c(l, o, P, o.notifyWith)))) : (s !== P && ((n = void 0), (r = [e])), (a || o.resolveWith)(n, r));
                            }
                          }
                          var n = this,
                            r = arguments,
                            t = a
                              ? e
                              : function () {
                                  try {
                                    e();
                                  } catch (e) {
                                    S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), l <= i + 1 && (s !== I && ((n = void 0), (r = [e])), o.rejectWith(n, r));
                                  }
                                };
                          i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), T.setTimeout(t));
                        };
                      }
                      return S.Deferred(function (e) {
                        o[0][3].add(c(0, e, b(r) ? r : P, e.notifyWith)), o[1][3].add(c(0, e, b(t) ? t : P)), o[2][3].add(c(0, e, b(n) ? n : I));
                      }).promise();
                    },
                    promise: function (e) {
                      return null != e ? S.extend(e, s) : s;
                    },
                  },
                  a = {};
                return (
                  S.each(o, function (e, t) {
                    var n = t[2],
                      r = t[5];
                    (s[t[1]] = n.add),
                      r &&
                        n.add(
                          function () {
                            i = r;
                          },
                          o[3 - e][2].disable,
                          o[3 - e][3].disable,
                          o[0][2].lock,
                          o[0][3].lock
                        ),
                      n.add(t[3].fire),
                      (a[t[0]] = function () {
                        return a[t[0] + "With"](this === a ? void 0 : this, arguments), this;
                      }),
                      (a[t[0] + "With"] = n.fireWith);
                  }),
                  s.promise(a),
                  e && e.call(a, a),
                  a
                );
              },
              when: function (e) {
                function t(t) {
                  return function (e) {
                    (i[t] = this), (o[t] = 1 < arguments.length ? a.call(arguments) : e), --n || s.resolveWith(i, o);
                  };
                }
                var n = arguments.length,
                  r = n,
                  i = Array(r),
                  o = a.call(arguments),
                  s = S.Deferred();
                if (n <= 1 && (R(e, s.done(t(r)).resolve, s.reject, !n), "pending" === s.state() || b(o[r] && o[r].then))) return s.then();
                for (; r--; ) R(o[r], t(r), s.reject);
                return s.promise();
              },
            });
          var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (S.Deferred.exceptionHook = function (e, t) {
            T.console && T.console.warn && e && H.test(e.name) && T.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
          }),
            (S.readyException = function (e) {
              T.setTimeout(function () {
                throw e;
              });
            });
          var M = S.Deferred();
          function z() {
            E.removeEventListener("DOMContentLoaded", z), T.removeEventListener("load", z), S.ready();
          }
          (S.fn.ready = function (e) {
            return (
              M.then(e).catch(function (e) {
                S.readyException(e);
              }),
              this
            );
          }),
            S.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (!0 === e ? --S.readyWait : S.isReady) || ((S.isReady = !0) !== e && 0 < --S.readyWait) || M.resolveWith(E, [S]);
              },
            }),
            (S.ready.then = M.then),
            "complete" === E.readyState || ("loading" !== E.readyState && !E.documentElement.doScroll) ? T.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", z), T.addEventListener("load", z));
          var F = function (e, t, n, r, i, o, s) {
              var a = 0,
                l = e.length,
                c = null == n;
              if ("object" === w(n)) for (a in ((i = !0), n)) F(e, t, a, n[a], !0, o, s);
              else if (
                void 0 !== r &&
                ((i = !0),
                b(r) || (s = !0),
                c &&
                  (t = s
                    ? (t.call(e, r), null)
                    : ((c = t),
                      function (e, t, n) {
                        return c.call(S(e), n);
                      })),
                t)
              )
                for (; a < l; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
              return i ? e : c ? t.call(e) : l ? t(e[0], n) : o;
            },
            W = /^-ms-/,
            B = /-([a-z])/g;
          function U(e, t) {
            return t.toUpperCase();
          }
          function G(e) {
            return e.replace(W, "ms-").replace(B, U);
          }
          function X(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
          }
          function J() {
            this.expando = S.expando + J.uid++;
          }
          (J.uid = 1),
            (J.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return t || ((t = {}), X(e) && (e.nodeType ? (e[this.expando] = t) : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
              },
              set: function (e, t, n) {
                var r,
                  i = this.cache(e);
                if ("string" == typeof t) i[G(t)] = n;
                else for (r in t) i[G(r)] = t[r];
                return i;
              },
              get: function (e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
              },
              access: function (e, t, n) {
                return void 0 === t || (t && "string" == typeof t && void 0 === n) ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  r = e[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(L) || []).length;
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 !== t && !S.isEmptyObject(r)) || (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !S.isEmptyObject(t);
              },
            });
          var V = new J(),
            Y = new J(),
            K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Q = /[A-Z]/g;
          function Z(e, t, n) {
            var r, i;
            if (void 0 === n && 1 === e.nodeType)
              if (((r = "data-" + t.replace(Q, "-$&").toLowerCase()), "string" == typeof (n = e.getAttribute(r)))) {
                try {
                  n = "true" === (i = n) || ("false" !== i && ("null" === i ? null : i === +i + "" ? +i : K.test(i) ? JSON.parse(i) : i));
                } catch (e) {}
                Y.set(e, t, n);
              } else n = void 0;
            return n;
          }
          S.extend({
            hasData: function (e) {
              return Y.hasData(e) || V.hasData(e);
            },
            data: function (e, t, n) {
              return Y.access(e, t, n);
            },
            removeData: function (e, t) {
              Y.remove(e, t);
            },
            _data: function (e, t, n) {
              return V.access(e, t, n);
            },
            _removeData: function (e, t) {
              V.remove(e, t);
            },
          }),
            S.fn.extend({
              data: function (n, e) {
                var t,
                  r,
                  i,
                  o = this[0],
                  s = o && o.attributes;
                if (void 0 !== n)
                  return "object" == typeof n
                    ? this.each(function () {
                        Y.set(this, n);
                      })
                    : F(
                        this,
                        function (e) {
                          var t;
                          if (o && void 0 === e) return void 0 !== (t = Y.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
                          this.each(function () {
                            Y.set(this, n, e);
                          });
                        },
                        null,
                        e,
                        1 < arguments.length,
                        null,
                        !0
                      );
                if (this.length && ((i = Y.get(o)), 1 === o.nodeType && !V.get(o, "hasDataAttrs"))) {
                  for (t = s.length; t--; ) s[t] && 0 === (r = s[t].name).indexOf("data-") && ((r = G(r.slice(5))), Z(o, r, i[r]));
                  V.set(o, "hasDataAttrs", !0);
                }
                return i;
              },
              removeData: function (e) {
                return this.each(function () {
                  Y.remove(this, e);
                });
              },
            }),
            S.extend({
              queue: function (e, t, n) {
                var r;
                if (e) return (t = (t || "fx") + "queue"), (r = V.get(e, t)), n && (!r || Array.isArray(n) ? (r = V.access(e, t, S.makeArray(n))) : r.push(n)), r || [];
              },
              dequeue: function (e, t) {
                t = t || "fx";
                var n = S.queue(e, t),
                  r = n.length,
                  i = n.shift(),
                  o = S._queueHooks(e, t);
                "inprogress" === i && ((i = n.shift()), r--),
                  i &&
                    ("fx" === t && n.unshift("inprogress"),
                    delete o.stop,
                    i.call(
                      e,
                      function () {
                        S.dequeue(e, t);
                      },
                      o
                    )),
                  !r && o && o.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                  V.get(e, n) ||
                  V.access(e, n, {
                    empty: S.Callbacks("once memory").add(function () {
                      V.remove(e, [t + "queue", n]);
                    }),
                  })
                );
              },
            }),
            S.fn.extend({
              queue: function (t, n) {
                var e = 2;
                return (
                  "string" != typeof t && ((n = t), (t = "fx"), e--),
                  arguments.length < e
                    ? S.queue(this[0], t)
                    : void 0 === n
                    ? this
                    : this.each(function () {
                        var e = S.queue(this, t, n);
                        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  S.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || "fx", []);
              },
              promise: function (e, t) {
                function n() {
                  --i || o.resolveWith(s, [s]);
                }
                var r,
                  i = 1,
                  o = S.Deferred(),
                  s = this,
                  a = this.length;
                for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; a--; ) (r = V.get(s[a], e + "queueHooks")) && r.empty && (i++, r.empty.add(n));
                return n(), o.promise(t);
              },
            });
          var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
            ne = ["Top", "Right", "Bottom", "Left"],
            re = E.documentElement,
            ie = function (e) {
              return S.contains(e.ownerDocument, e);
            },
            oe = { composed: !0 };
          re.attachShadow &&
            (ie = function (e) {
              return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
            });
          function se(e, t, n, r) {
            var i,
              o,
              s = {};
            for (o in t) (s[o] = e.style[o]), (e.style[o] = t[o]);
            for (o in ((i = n.apply(e, r || [])), t)) e.style[o] = s[o];
            return i;
          }
          var ae = function (e, t) {
            return "none" === (e = t || e).style.display || ("" === e.style.display && ie(e) && "none" === S.css(e, "display"));
          };
          function le(e, t, n, r) {
            var i,
              o,
              s = 20,
              a = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return S.css(e, t, "");
                  },
              l = a(),
              c = (n && n[3]) || (S.cssNumber[t] ? "" : "px"),
              u = e.nodeType && (S.cssNumber[t] || ("px" !== c && +l)) && te.exec(S.css(e, t));
            if (u && u[3] !== c) {
              for (l /= 2, c = c || u[3], u = +l || 1; s--; ) S.style(e, t, u + c), (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0), (u /= o);
              (u *= 2), S.style(e, t, u + c), (n = n || []);
            }
            return n && ((u = +u || +l || 0), (i = n[1] ? u + (n[1] + 1) * n[2] : +n[2]), r && ((r.unit = c), (r.start = u), (r.end = i))), i;
          }
          var ce = {};
          function ue(e, t) {
            for (var n, r, i, o, s, a, l, c = [], u = 0, d = e.length; u < d; u++) (r = e[u]).style && ((n = r.style.display), t ? ("none" === n && ((c[u] = V.get(r, "display") || null), c[u] || (r.style.display = "")), "" === r.style.display && ae(r) && (c[u] = ((l = s = o = void 0), (s = (i = r).ownerDocument), (a = i.nodeName), (l = ce[a]) || ((o = s.body.appendChild(s.createElement(a))), (l = S.css(o, "display")), o.parentNode.removeChild(o), "none" === l && (l = "block"), (ce[a] = l))))) : "none" !== n && ((c[u] = "none"), V.set(r, "display", n)));
            for (u = 0; u < d; u++) null != c[u] && (e[u].style.display = c[u]);
            return e;
          }
          S.fn.extend({
            show: function () {
              return ue(this, !0);
            },
            hide: function () {
              return ue(this);
            },
            toggle: function (e) {
              return "boolean" == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    ae(this) ? S(this).show() : S(this).hide();
                  });
            },
          });
          var de = /^(?:checkbox|radio)$/i,
            pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            fe = /^$|^module$|\/(?:java|ecma)script/i,
            he = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
          function ge(e, t) {
            var n;
            return (n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : []), void 0 === t || (t && j(e, t)) ? S.merge([e], n) : n;
          }
          function ve(e, t) {
            for (var n = 0, r = e.length; n < r; n++) V.set(e[n], "globalEval", !t || V.get(t[n], "globalEval"));
          }
          (he.optgroup = he.option), (he.tbody = he.tfoot = he.colgroup = he.caption = he.thead), (he.th = he.td);
          var me,
            ye,
            be = /<|&#?\w+;/;
          function xe(e, t, n, r, i) {
            for (var o, s, a, l, c, u, d = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
              if ((o = e[f]) || 0 === o)
                if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);
                else if (be.test(o)) {
                  for (s = s || d.appendChild(t.createElement("div")), a = (pe.exec(o) || ["", ""])[1].toLowerCase(), l = he[a] || he._default, s.innerHTML = l[1] + S.htmlPrefilter(o) + l[2], u = l[0]; u--; ) s = s.lastChild;
                  S.merge(p, s.childNodes), ((s = d.firstChild).textContent = "");
                } else p.push(t.createTextNode(o));
            for (d.textContent = "", f = 0; (o = p[f++]); )
              if (r && -1 < S.inArray(o, r)) i && i.push(o);
              else if (((c = ie(o)), (s = ge(d.appendChild(o), "script")), c && ve(s), n)) for (u = 0; (o = s[u++]); ) fe.test(o.type || "") && n.push(o);
            return d;
          }
          (me = E.createDocumentFragment().appendChild(E.createElement("div"))), (ye = E.createElement("input")).setAttribute("type", "radio"), ye.setAttribute("checked", "checked"), ye.setAttribute("name", "t"), me.appendChild(ye), (y.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked), (me.innerHTML = "<textarea>x</textarea>"), (y.noCloneChecked = !!me.cloneNode(!0).lastChild.defaultValue);
          var we = /^key/,
            _e = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Te = /^([^.]*)(?:\.(.+)|)/;
          function Ee() {
            return !0;
          }
          function Se() {
            return !1;
          }
          function Ce(e, t) {
            return (
              (e ===
                (function () {
                  try {
                    return E.activeElement;
                  } catch (e) {}
                })()) ==
              ("focus" === t)
            );
          }
          function je(e, t, n, r, i, o) {
            var s, a;
            if ("object" == typeof t) {
              for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t)) je(e, a, n, r, t[a], o);
              return e;
            }
            if ((null == r && null == i ? ((i = n), (r = n = void 0)) : null == i && ("string" == typeof n ? ((i = r), (r = void 0)) : ((i = r), (r = n), (n = void 0))), !1 === i)) i = Se;
            else if (!i) return e;
            return (
              1 === o &&
                ((s = i),
                ((i = function (e) {
                  return S().off(e), s.apply(this, arguments);
                }).guid = s.guid || (s.guid = S.guid++))),
              e.each(function () {
                S.event.add(this, t, i, r, n);
              })
            );
          }
          function ke(e, i, o) {
            o
              ? (V.set(e, i, !1),
                S.event.add(e, i, {
                  namespace: !1,
                  handler: function (e) {
                    var t,
                      n,
                      r = V.get(this, i);
                    if (1 & e.isTrigger && this[i]) {
                      if (r) (S.event.special[i] || {}).delegateType && e.stopPropagation();
                      else if (((r = a.call(arguments)), V.set(this, i, r), (t = o(this, i)), this[i](), r !== (n = V.get(this, i)) || t ? V.set(this, i, !1) : (n = void 0), r !== n)) return e.stopImmediatePropagation(), e.preventDefault(), n;
                    } else r && (V.set(this, i, S.event.trigger(S.extend(r.shift(), S.Event.prototype), r, this)), e.stopImmediatePropagation());
                  },
                }))
              : S.event.add(e, i, Ee);
          }
          (S.event = {
            global: {},
            add: function (t, e, n, r, i) {
              var o,
                s,
                a,
                l,
                c,
                u,
                d,
                p,
                f,
                h,
                g,
                v = V.get(t);
              if (v)
                for (
                  n.handler && ((n = (o = n).handler), (i = o.selector)),
                    i && S.find.matchesSelector(re, i),
                    n.guid || (n.guid = S.guid++),
                    (l = v.events) || (l = v.events = {}),
                    (s = v.handle) ||
                      (s = v.handle = function (e) {
                        return void 0 !== S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
                      }),
                    c = (e = (e || "").match(L) || [""]).length;
                  c--;

                )
                  (f = g = (a = Te.exec(e[c]) || [])[1]), (h = (a[2] || "").split(".").sort()), f && ((d = S.event.special[f] || {}), (f = (i ? d.delegateType : d.bindType) || f), (d = S.event.special[f] || {}), (u = S.extend({ type: f, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && S.expr.match.needsContext.test(i), namespace: h.join(".") }, o)), (p = l[f]) || (((p = l[f] = []).delegateCount = 0), (d.setup && !1 !== d.setup.call(t, r, h, s)) || (t.addEventListener && t.addEventListener(f, s))), d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, u) : p.push(u), (S.event.global[f] = !0));
            },
            remove: function (e, t, n, r, i) {
              var o,
                s,
                a,
                l,
                c,
                u,
                d,
                p,
                f,
                h,
                g,
                v = V.hasData(e) && V.get(e);
              if (v && (l = v.events)) {
                for (c = (t = (t || "").match(L) || [""]).length; c--; )
                  if (((f = g = (a = Te.exec(t[c]) || [])[1]), (h = (a[2] || "").split(".").sort()), f)) {
                    for (d = S.event.special[f] || {}, p = l[(f = (r ? d.delegateType : d.bindType) || f)] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--; ) (u = p[o]), (!i && g !== u.origType) || (n && n.guid !== u.guid) || (a && !a.test(u.namespace)) || (r && r !== u.selector && ("**" !== r || !u.selector)) || (p.splice(o, 1), u.selector && p.delegateCount--, d.remove && d.remove.call(e, u));
                    s && !p.length && ((d.teardown && !1 !== d.teardown.call(e, h, v.handle)) || S.removeEvent(e, f, v.handle), delete l[f]);
                  } else for (f in l) S.event.remove(e, f + t[c], n, r, !0);
                S.isEmptyObject(l) && V.remove(e, "handle events");
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                i,
                o,
                s,
                a = S.event.fix(e),
                l = new Array(arguments.length),
                c = (V.get(this, "events") || {})[a.type] || [],
                u = S.event.special[a.type] || {};
              for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
              if (((a.delegateTarget = this), !u.preDispatch || !1 !== u.preDispatch.call(this, a))) {
                for (s = S.event.handlers.call(this, a, c), t = 0; (i = s[t++]) && !a.isPropagationStopped(); ) for (a.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !a.isImmediatePropagationStopped(); ) (a.rnamespace && !1 !== o.namespace && !a.rnamespace.test(o.namespace)) || ((a.handleObj = o), (a.data = o.data), void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, l)) && !1 === (a.result = r) && (a.preventDefault(), a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result;
              }
            },
            handlers: function (e, t) {
              var n,
                r,
                i,
                o,
                s,
                a = [],
                l = t.delegateCount,
                c = e.target;
              if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                for (; c !== this; c = c.parentNode || this)
                  if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                    for (o = [], s = {}, n = 0; n < l; n++) void 0 === s[(i = (r = t[n]).selector + " ")] && (s[i] = r.needsContext ? -1 < S(i, this).index(c) : S.find(i, this, null, [c]).length), s[i] && o.push(r);
                    o.length && a.push({ elem: c, handlers: o });
                  }
              return (c = this), l < t.length && a.push({ elem: c, handlers: t.slice(l) }), a;
            },
            addProp: function (t, e) {
              Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: b(e)
                  ? function () {
                      if (this.originalEvent) return e(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[t];
                    },
                set: function (e) {
                  Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
                },
              });
            },
            fix: function (e) {
              return e[S.expando] ? e : new S.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return de.test(t.type) && t.click && j(t, "input") && void 0 === V.get(t, "click") && ke(t, "click", Ee), !1;
                },
                trigger: function (e) {
                  var t = this || e;
                  return de.test(t.type) && t.click && j(t, "input") && void 0 === V.get(t, "click") && ke(t, "click"), !0;
                },
                _default: function (e) {
                  var t = e.target;
                  return (de.test(t.type) && t.click && j(t, "input") && V.get(t, "click")) || j(t, "a");
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            (S.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (S.Event = function (e, t) {
              if (!(this instanceof S.Event)) return new S.Event(e, t);
              e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue) ? Ee : Se), (this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target), (this.currentTarget = e.currentTarget), (this.relatedTarget = e.relatedTarget)) : (this.type = e), t && S.extend(this, t), (this.timeStamp = (e && e.timeStamp) || Date.now()), (this[S.expando] = !0);
            }),
            (S.Event.prototype = {
              constructor: S.Event,
              isDefaultPrevented: Se,
              isPropagationStopped: Se,
              isImmediatePropagationStopped: Se,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = Ee), e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = Ee), e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = Ee), e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
              },
            }),
            S.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (e) {
                  var t = e.button;
                  return null == e.which && we.test(e.type) ? (null != e.charCode ? e.charCode : e.keyCode) : !e.which && void 0 !== t && _e.test(e.type) ? (1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0) : e.which;
                },
              },
              S.event.addProp
            ),
            S.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
              S.event.special[e] = {
                setup: function () {
                  return ke(this, e, Ce), !1;
                },
                trigger: function () {
                  return ke(this, e), !0;
                },
                delegateType: t,
              };
            }),
            S.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, i) {
              S.event.special[e] = {
                delegateType: i,
                bindType: i,
                handle: function (e) {
                  var t,
                    n = e.relatedTarget,
                    r = e.handleObj;
                  return (n && (n === this || S.contains(this, n))) || ((e.type = r.origType), (t = r.handler.apply(this, arguments)), (e.type = i)), t;
                },
              };
            }),
            S.fn.extend({
              on: function (e, t, n, r) {
                return je(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return je(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return (r = e.handleObj), S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" != typeof e)
                  return (
                    (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
                    !1 === n && (n = Se),
                    this.each(function () {
                      S.event.remove(this, e, n, t);
                    })
                  );
                for (i in e) this.off(i, t, e[i]);
                return this;
              },
            });
          var Ae = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            $e = /<script|<style|<link/i,
            Oe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          function Ne(e, t) {
            return (j(e, "table") && j(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0]) || e;
          }
          function qe(e) {
            return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
          }
          function Le(e) {
            return "true/" === (e.type || "").slice(0, 5) ? (e.type = e.type.slice(5)) : e.removeAttribute("type"), e;
          }
          function Pe(e, t) {
            var n, r, i, o, s, a, l, c;
            if (1 === t.nodeType) {
              if (V.hasData(e) && ((o = V.access(e)), (s = V.set(t, o)), (c = o.events))) for (i in (delete s.handle, (s.events = {}), c)) for (n = 0, r = c[i].length; n < r; n++) S.event.add(t, i, c[i][n]);
              Y.hasData(e) && ((a = Y.access(e)), (l = S.extend({}, a)), Y.set(t, l));
            }
          }
          function Ie(n, r, i, o) {
            r = v.apply([], r);
            var e,
              t,
              s,
              a,
              l,
              c,
              u = 0,
              d = n.length,
              p = d - 1,
              f = r[0],
              h = b(f);
            if (h || (1 < d && "string" == typeof f && !y.checkClone && Oe.test(f)))
              return n.each(function (e) {
                var t = n.eq(e);
                h && (r[0] = f.call(this, e, t.html())), Ie(t, r, i, o);
              });
            if (d && ((t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild), 1 === e.childNodes.length && (e = t), t || o)) {
              for (a = (s = S.map(ge(e, "script"), qe)).length; u < d; u++) (l = e), u !== p && ((l = S.clone(l, !0, !0)), a && S.merge(s, ge(l, "script"))), i.call(n[u], l, u);
              if (a) for (c = s[s.length - 1].ownerDocument, S.map(s, Le), u = 0; u < a; u++) (l = s[u]), fe.test(l.type || "") && !V.access(l, "globalEval") && S.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? S._evalUrl && !l.noModule && S._evalUrl(l.src, { nonce: l.nonce || l.getAttribute("nonce") }) : x(l.textContent.replace(De, ""), l, c));
            }
            return n;
          }
          function Re(e, t, n) {
            for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || S.cleanData(ge(r)), r.parentNode && (n && ie(r) && ve(ge(r, "script")), r.parentNode.removeChild(r));
            return e;
          }
          S.extend({
            htmlPrefilter: function (e) {
              return e.replace(Ae, "<$1></$2>");
            },
            clone: function (e, t, n) {
              var r,
                i,
                o,
                s,
                a,
                l,
                c,
                u = e.cloneNode(!0),
                d = ie(e);
              if (!(y.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || S.isXMLDoc(e))) for (s = ge(u), r = 0, i = (o = ge(e)).length; r < i; r++) (a = o[r]), (l = s[r]), "input" === (c = l.nodeName.toLowerCase()) && de.test(a.type) ? (l.checked = a.checked) : ("input" !== c && "textarea" !== c) || (l.defaultValue = a.defaultValue);
              if (t)
                if (n) for (o = o || ge(e), s = s || ge(u), r = 0, i = o.length; r < i; r++) Pe(o[r], s[r]);
                else Pe(e, u);
              return 0 < (s = ge(u, "script")).length && ve(s, !d && ge(e, "script")), u;
            },
            cleanData: function (e) {
              for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (X(n)) {
                  if ((t = n[V.expando])) {
                    if (t.events) for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                    n[V.expando] = void 0;
                  }
                  n[Y.expando] && (n[Y.expando] = void 0);
                }
            },
          }),
            S.fn.extend({
              detach: function (e) {
                return Re(this, e, !0);
              },
              remove: function (e) {
                return Re(this, e);
              },
              text: function (e) {
                return F(
                  this,
                  function (e) {
                    return void 0 === e
                      ? S.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              append: function () {
                return Ie(this, arguments, function (e) {
                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || Ne(this, e).appendChild(e);
                });
              },
              prepend: function () {
                return Ie(this, arguments, function (e) {
                  if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Ne(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return Ie(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return Ie(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(ge(e, !1)), (e.textContent = ""));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return S.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return F(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !$e.test(e) && !he[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                      e = S.htmlPrefilter(e);
                      try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(ge(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              replaceWith: function () {
                var n = [];
                return Ie(
                  this,
                  arguments,
                  function (e) {
                    var t = this.parentNode;
                    S.inArray(this, n) < 0 && (S.cleanData(ge(this)), t && t.replaceChild(e, this));
                  },
                  n
                );
              },
            }),
            S.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, s) {
              S.fn[e] = function (e) {
                for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) (t = o === i ? this : this.clone(!0)), S(r[o])[s](t), l.apply(n, t.get());
                return this.pushStack(n);
              };
            });
          var He,
            Me,
            ze,
            Fe,
            We,
            Be,
            Ue,
            Ge = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
            Xe = function (e) {
              var t = e.ownerDocument.defaultView;
              return (t && t.opener) || (t = T), t.getComputedStyle(e);
            },
            Je = new RegExp(ne.join("|"), "i");
          function Ve() {
            if (Ue) {
              (Be.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"), (Ue.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"), re.appendChild(Be).appendChild(Ue);
              var e = T.getComputedStyle(Ue);
              (He = "1%" !== e.top), (We = 12 === Ye(e.marginLeft)), (Ue.style.right = "60%"), (Fe = 36 === Ye(e.right)), (Me = 36 === Ye(e.width)), (Ue.style.position = "absolute"), (ze = 12 === Ye(Ue.offsetWidth / 3)), re.removeChild(Be), (Ue = null);
            }
          }
          function Ye(e) {
            return Math.round(parseFloat(e));
          }
          function Ke(e, t, n) {
            var r,
              i,
              o,
              s,
              a = e.style;
            return (n = n || Xe(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || ie(e) || (s = S.style(e, t)), !y.pixelBoxStyles() && Ge.test(s) && Je.test(t) && ((r = a.width), (i = a.minWidth), (o = a.maxWidth), (a.minWidth = a.maxWidth = a.width = s), (s = n.width), (a.width = r), (a.minWidth = i), (a.maxWidth = o))), void 0 !== s ? s + "" : s;
          }
          function Qe(e, t) {
            return {
              get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
              },
            };
          }
          (Be = E.createElement("div")),
            (Ue = E.createElement("div")).style &&
              ((Ue.style.backgroundClip = "content-box"),
              (Ue.cloneNode(!0).style.backgroundClip = ""),
              (y.clearCloneStyle = "content-box" === Ue.style.backgroundClip),
              S.extend(y, {
                boxSizingReliable: function () {
                  return Ve(), Me;
                },
                pixelBoxStyles: function () {
                  return Ve(), Fe;
                },
                pixelPosition: function () {
                  return Ve(), He;
                },
                reliableMarginLeft: function () {
                  return Ve(), We;
                },
                scrollboxSize: function () {
                  return Ve(), ze;
                },
              }));
          var Ze = ["Webkit", "Moz", "ms"],
            et = E.createElement("div").style,
            tt = {};
          function nt(e) {
            var t = S.cssProps[e] || tt[e];
            return (
              t ||
              (e in et
                ? e
                : (tt[e] =
                    (function (e) {
                      for (var t = e[0].toUpperCase() + e.slice(1), n = Ze.length; n--; ) if ((e = Ze[n] + t) in et) return e;
                    })(e) || e))
            );
          }
          var rt = /^(none|table(?!-c[ea]).+)/,
            it = /^--/,
            ot = { position: "absolute", visibility: "hidden", display: "block" },
            st = { letterSpacing: "0", fontWeight: "400" };
          function at(e, t, n) {
            var r = te.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
          }
          function lt(e, t, n, r, i, o) {
            var s = "width" === t ? 1 : 0,
              a = 0,
              l = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; s < 4; s += 2) "margin" === n && (l += S.css(e, n + ne[s], !0, i)), r ? ("content" === n && (l -= S.css(e, "padding" + ne[s], !0, i)), "margin" !== n && (l -= S.css(e, "border" + ne[s] + "Width", !0, i))) : ((l += S.css(e, "padding" + ne[s], !0, i)), "padding" !== n ? (l += S.css(e, "border" + ne[s] + "Width", !0, i)) : (a += S.css(e, "border" + ne[s] + "Width", !0, i)));
            return !r && 0 <= o && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - 0.5)) || 0), l;
          }
          function ct(e, t, n) {
            var r = Xe(e),
              i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
              o = i,
              s = Ke(e, t, r),
              a = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Ge.test(s)) {
              if (!n) return s;
              s = "auto";
            }
            return ((!y.boxSizingReliable() && i) || "auto" === s || (!parseFloat(s) && "inline" === S.css(e, "display", !1, r))) && e.getClientRects().length && ((i = "border-box" === S.css(e, "boxSizing", !1, r)), (o = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + lt(e, t, n || (i ? "border" : "content"), o, r, s) + "px";
          }
          function ut(e, t, n, r, i) {
            return new ut.prototype.init(e, t, n, r, i);
          }
          S.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = Ke(e, "opacity");
                    return "" === n ? "1" : n;
                  }
                },
              },
            },
            cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: {},
            style: function (e, t, n, r) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                  o,
                  s,
                  a = G(t),
                  l = it.test(t),
                  c = e.style;
                if ((l || (t = nt(a)), (s = S.cssHooks[t] || S.cssHooks[a]), void 0 === n)) return s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : c[t];
                "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && ((n = le(e, t, i)), (o = "number")), null != n && n == n && ("number" !== o || l || (n += (i && i[3]) || (S.cssNumber[a] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), (s && "set" in s && void 0 === (n = s.set(e, n, r))) || (l ? c.setProperty(t, n) : (c[t] = n)));
              }
            },
            css: function (e, t, n, r) {
              var i,
                o,
                s,
                a = G(t);
              return it.test(t) || (t = nt(a)), (s = S.cssHooks[t] || S.cssHooks[a]) && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = Ke(e, t, r)), "normal" === i && t in st && (i = st[t]), "" === n || n ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i) : i;
            },
          }),
            S.each(["height", "width"], function (e, l) {
              S.cssHooks[l] = {
                get: function (e, t, n) {
                  if (t)
                    return !rt.test(S.css(e, "display")) || (e.getClientRects().length && e.getBoundingClientRect().width)
                      ? ct(e, l, n)
                      : se(e, ot, function () {
                          return ct(e, l, n);
                        });
                },
                set: function (e, t, n) {
                  var r,
                    i = Xe(e),
                    o = !y.scrollboxSize() && "absolute" === i.position,
                    s = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
                    a = n ? lt(e, l, n, s, i) : 0;
                  return s && o && (a -= Math.ceil(e["offset" + l[0].toUpperCase() + l.slice(1)] - parseFloat(i[l]) - lt(e, l, "border", !1, i) - 0.5)), a && (r = te.exec(t)) && "px" !== (r[3] || "px") && ((e.style[l] = t), (t = S.css(e, l))), at(0, t, a);
                },
              };
            }),
            (S.cssHooks.marginLeft = Qe(y.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(Ke(e, "marginLeft")) ||
                    e.getBoundingClientRect().left -
                      se(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            S.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
              (S.cssHooks[i + o] = {
                expand: function (e) {
                  for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                  return n;
                },
              }),
                "margin" !== i && (S.cssHooks[i + o].set = at);
            }),
            S.fn.extend({
              css: function (e, t) {
                return F(
                  this,
                  function (e, t, n) {
                    var r,
                      i,
                      o = {},
                      s = 0;
                    if (Array.isArray(t)) {
                      for (r = Xe(e), i = t.length; s < i; s++) o[t[s]] = S.css(e, t[s], !1, r);
                      return o;
                    }
                    return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
                  },
                  e,
                  t,
                  1 < arguments.length
                );
              },
            }),
            (((S.Tween = ut).prototype = {
              constructor: ut,
              init: function (e, t, n, r, i, o) {
                (this.elem = e), (this.prop = n), (this.easing = i || S.easing._default), (this.options = t), (this.start = this.now = this.cur()), (this.end = r), (this.unit = o || (S.cssNumber[n] ? "" : "px"));
              },
              cur: function () {
                var e = ut.propHooks[this.prop];
                return e && e.get ? e.get(this) : ut.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = ut.propHooks[this.prop];
                return this.options.duration ? (this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e), (this.now = (this.end - this.start) * t + this.start), this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : ut.propHooks._default.set(this), this;
              },
            }).init.prototype = ut.prototype),
            ((ut.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType || (null != e.elem[e.prop] && null == e.elem.style[e.prop]) ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                },
                set: function (e) {
                  S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || (!S.cssHooks[e.prop] && null == e.elem.style[nt(e.prop)]) ? (e.elem[e.prop] = e.now) : S.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }).scrollTop = ut.propHooks.scrollLeft = {
              set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
              },
            }),
            (S.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: "swing",
            }),
            (S.fx = ut.prototype.init),
            (S.fx.step = {});
          var dt,
            pt,
            ft,
            ht,
            gt = /^(?:toggle|show|hide)$/,
            vt = /queueHooks$/;
          function mt() {
            pt && (!1 === E.hidden && T.requestAnimationFrame ? T.requestAnimationFrame(mt) : T.setTimeout(mt, S.fx.interval), S.fx.tick());
          }
          function yt() {
            return (
              T.setTimeout(function () {
                dt = void 0;
              }),
              (dt = Date.now())
            );
          }
          function bt(e, t) {
            var n,
              r = 0,
              i = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ne[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i;
          }
          function xt(e, t, n) {
            for (var r, i = (wt.tweeners[t] || []).concat(wt.tweeners["*"]), o = 0, s = i.length; o < s; o++) if ((r = i[o].call(n, t, e))) return r;
          }
          function wt(o, e, t) {
            var n,
              s,
              r = 0,
              i = wt.prefilters.length,
              a = S.Deferred().always(function () {
                delete l.elem;
              }),
              l = function () {
                if (s) return !1;
                for (var e = dt || yt(), t = Math.max(0, c.startTime + c.duration - e), n = 1 - (t / c.duration || 0), r = 0, i = c.tweens.length; r < i; r++) c.tweens[r].run(n);
                return a.notifyWith(o, [c, n, t]), n < 1 && i ? t : (i || a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c]), !1);
              },
              c = a.promise({
                elem: o,
                props: S.extend({}, e),
                opts: S.extend(!0, { specialEasing: {}, easing: S.easing._default }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: dt || yt(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                  var n = S.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                  return c.tweens.push(n), n;
                },
                stop: function (e) {
                  var t = 0,
                    n = e ? c.tweens.length : 0;
                  if (s) return this;
                  for (s = !0; t < n; t++) c.tweens[t].run(1);
                  return e ? (a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c, e])) : a.rejectWith(o, [c, e]), this;
                },
              }),
              u = c.props;
            for (
              !(function (e, t) {
                var n, r, i, o, s;
                for (n in e)
                  if (((i = t[(r = G(n))]), (o = e[n]), Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])), n !== r && ((e[r] = o), delete e[n]), (s = S.cssHooks[r]) && ("expand" in s))) for (n in ((o = s.expand(o)), delete e[r], o)) (n in e) || ((e[n] = o[n]), (t[n] = i));
                  else t[r] = i;
              })(u, c.opts.specialEasing);
              r < i;
              r++
            )
              if ((n = wt.prefilters[r].call(c, o, u, c.opts))) return b(n.stop) && (S._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n;
            return S.map(u, xt, c), b(c.opts.start) && c.opts.start.call(o, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), S.fx.timer(S.extend(l, { elem: o, anim: c, queue: c.opts.queue })), c;
          }
          (S.Animation = S.extend(wt, {
            tweeners: {
              "*": [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return le(n.elem, e, te.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              for (var n, r = 0, i = (e = b(e) ? ((t = e), ["*"]) : e.match(L)).length; r < i; r++) (n = e[r]), (wt.tweeners[n] = wt.tweeners[n] || []), wt.tweeners[n].unshift(t);
            },
            prefilters: [
              function (e, t, n) {
                var r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  c,
                  u,
                  d = "width" in t || "height" in t,
                  p = this,
                  f = {},
                  h = e.style,
                  g = e.nodeType && ae(e),
                  v = V.get(e, "fxshow");
                for (r in (n.queue ||
                  (null == (s = S._queueHooks(e, "fx")).unqueued &&
                    ((s.unqueued = 0),
                    (a = s.empty.fire),
                    (s.empty.fire = function () {
                      s.unqueued || a();
                    })),
                  s.unqueued++,
                  p.always(function () {
                    p.always(function () {
                      s.unqueued--, S.queue(e, "fx").length || s.empty.fire();
                    });
                  })),
                t))
                  if (((i = t[r]), gt.test(i))) {
                    if ((delete t[r], (o = o || "toggle" === i), i === (g ? "hide" : "show"))) {
                      if ("show" !== i || !v || void 0 === v[r]) continue;
                      g = !0;
                    }
                    f[r] = (v && v[r]) || S.style(e, r);
                  }
                if ((l = !S.isEmptyObject(t)) || !S.isEmptyObject(f))
                  for (r in (d &&
                    1 === e.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (c = v && v.display) && (c = V.get(e, "display")),
                    "none" === (u = S.css(e, "display")) && (c ? (u = c) : (ue([e], !0), (c = e.style.display || c), (u = S.css(e, "display")), ue([e]))),
                    ("inline" === u || ("inline-block" === u && null != c)) &&
                      "none" === S.css(e, "float") &&
                      (l ||
                        (p.done(function () {
                          h.display = c;
                        }),
                        null == c && ((u = h.display), (c = "none" === u ? "" : u))),
                      (h.display = "inline-block"))),
                  n.overflow &&
                    ((h.overflow = "hidden"),
                    p.always(function () {
                      (h.overflow = n.overflow[0]), (h.overflowX = n.overflow[1]), (h.overflowY = n.overflow[2]);
                    })),
                  (l = !1),
                  f))
                    l ||
                      (v ? "hidden" in v && (g = v.hidden) : (v = V.access(e, "fxshow", { display: c })),
                      o && (v.hidden = !g),
                      g && ue([e], !0),
                      p.done(function () {
                        for (r in (g || ue([e]), V.remove(e, "fxshow"), f)) S.style(e, r, f[r]);
                      })),
                      (l = xt(g ? v[r] : 0, r, p)),
                      r in v || ((v[r] = l.start), g && ((l.end = l.start), (l.start = 0)));
              },
            ],
            prefilter: function (e, t) {
              t ? wt.prefilters.unshift(e) : wt.prefilters.push(e);
            },
          })),
            (S.speed = function (e, t, n) {
              var r = e && "object" == typeof e ? S.extend({}, e) : { complete: n || (!n && t) || (b(e) && e), duration: e, easing: (n && t) || (t && !b(t) && t) };
              return (
                S.fx.off ? (r.duration = 0) : "number" != typeof r.duration && (r.duration in S.fx.speeds ? (r.duration = S.fx.speeds[r.duration]) : (r.duration = S.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                (r.old = r.complete),
                (r.complete = function () {
                  b(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
                }),
                r
              );
            }),
            S.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
              },
              animate: function (t, e, n, r) {
                function i() {
                  var e = wt(this, S.extend({}, t), s);
                  (o || V.get(this, "finish")) && e.stop(!0);
                }
                var o = S.isEmptyObject(t),
                  s = S.speed(e, n, r);
                return (i.finish = i), o || !1 === s.queue ? this.each(i) : this.queue(s.queue, i);
              },
              stop: function (i, e, o) {
                function s(e) {
                  var t = e.stop;
                  delete e.stop, t(o);
                }
                return (
                  "string" != typeof i && ((o = e), (e = i), (i = void 0)),
                  e && !1 !== i && this.queue(i || "fx", []),
                  this.each(function () {
                    var e = !0,
                      t = null != i && i + "queueHooks",
                      n = S.timers,
                      r = V.get(this);
                    if (t) r[t] && r[t].stop && s(r[t]);
                    else for (t in r) r[t] && r[t].stop && vt.test(t) && s(r[t]);
                    for (t = n.length; t--; ) n[t].elem !== this || (null != i && n[t].queue !== i) || (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
                    (!e && o) || S.dequeue(this, i);
                  })
                );
              },
              finish: function (s) {
                return (
                  !1 !== s && (s = s || "fx"),
                  this.each(function () {
                    var e,
                      t = V.get(this),
                      n = t[s + "queue"],
                      r = t[s + "queueHooks"],
                      i = S.timers,
                      o = n ? n.length : 0;
                    for (t.finish = !0, S.queue(this, s, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--; ) i[e].elem === this && i[e].queue === s && (i[e].anim.stop(!0), i.splice(e, 1));
                    for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete t.finish;
                  })
                );
              },
            }),
            S.each(["toggle", "show", "hide"], function (e, r) {
              var i = S.fn[r];
              S.fn[r] = function (e, t, n) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(bt(r, !0), e, t, n);
              };
            }),
            S.each({ slideDown: bt("show"), slideUp: bt("hide"), slideToggle: bt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, r) {
              S.fn[e] = function (e, t, n) {
                return this.animate(r, e, t, n);
              };
            }),
            (S.timers = []),
            (S.fx.tick = function () {
              var e,
                t = 0,
                n = S.timers;
              for (dt = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
              n.length || S.fx.stop(), (dt = void 0);
            }),
            (S.fx.timer = function (e) {
              S.timers.push(e), S.fx.start();
            }),
            (S.fx.interval = 13),
            (S.fx.start = function () {
              pt || ((pt = !0), mt());
            }),
            (S.fx.stop = function () {
              pt = null;
            }),
            (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (S.fn.delay = function (r, e) {
              return (
                (r = (S.fx && S.fx.speeds[r]) || r),
                (e = e || "fx"),
                this.queue(e, function (e, t) {
                  var n = T.setTimeout(e, r);
                  t.stop = function () {
                    T.clearTimeout(n);
                  };
                })
              );
            }),
            (ft = E.createElement("input")),
            (ht = E.createElement("select").appendChild(E.createElement("option"))),
            (ft.type = "checkbox"),
            (y.checkOn = "" !== ft.value),
            (y.optSelected = ht.selected),
            ((ft = E.createElement("input")).value = "t"),
            (ft.type = "radio"),
            (y.radioValue = "t" === ft.value);
          var _t,
            Tt = S.expr.attrHandle;
          S.fn.extend({
            attr: function (e, t) {
              return F(this, S.attr, e, t, 1 < arguments.length);
            },
            removeAttr: function (e) {
              return this.each(function () {
                S.removeAttr(this, e);
              });
            },
          }),
            S.extend({
              attr: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? S.prop(e, t, n) : ((1 === o && S.isXMLDoc(e)) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? _t : void 0)), void 0 !== n ? (null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n)) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!y.radioValue && "radio" === t && j(e, "input")) {
                      var n = e.value;
                      return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  r = 0,
                  i = t && t.match(L);
                if (i && 1 === e.nodeType) for (; (n = i[r++]); ) e.removeAttribute(n);
              },
            }),
            (_t = {
              set: function (e, t, n) {
                return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var s = Tt[t] || S.find.attr;
              Tt[t] = function (e, t, n) {
                var r,
                  i,
                  o = t.toLowerCase();
                return n || ((i = Tt[o]), (Tt[o] = r), (r = null != s(e, t, n) ? o : null), (Tt[o] = i)), r;
              };
            });
          var Et = /^(?:input|select|textarea|button)$/i,
            St = /^(?:a|area)$/i;
          function Ct(e) {
            return (e.match(L) || []).join(" ");
          }
          function jt(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
          }
          function kt(e) {
            return Array.isArray(e) ? e : ("string" == typeof e && e.match(L)) || [];
          }
          S.fn.extend({
            prop: function (e, t) {
              return F(this, S.prop, e, t, 1 < arguments.length);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[S.propFix[e] || e];
              });
            },
          }),
            S.extend({
              prop: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return (1 === o && S.isXMLDoc(e)) || ((t = S.propFix[t] || t), (i = S.propHooks[t])), void 0 !== n ? (i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e[t] = n)) : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = S.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Et.test(e.nodeName) || (St.test(e.nodeName) && e.href) ? 0 : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            y.optSelected ||
              (S.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
              S.propFix[this.toLowerCase()] = this;
            }),
            S.fn.extend({
              addClass: function (t) {
                var e,
                  n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l = 0;
                if (b(t))
                  return this.each(function (e) {
                    S(this).addClass(t.call(this, e, jt(this)));
                  });
                if ((e = kt(t)).length)
                  for (; (n = this[l++]); )
                    if (((i = jt(n)), (r = 1 === n.nodeType && " " + Ct(i) + " "))) {
                      for (s = 0; (o = e[s++]); ) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                      i !== (a = Ct(r)) && n.setAttribute("class", a);
                    }
                return this;
              },
              removeClass: function (t) {
                var e,
                  n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l = 0;
                if (b(t))
                  return this.each(function (e) {
                    S(this).removeClass(t.call(this, e, jt(this)));
                  });
                if (!arguments.length) return this.attr("class", "");
                if ((e = kt(t)).length)
                  for (; (n = this[l++]); )
                    if (((i = jt(n)), (r = 1 === n.nodeType && " " + Ct(i) + " "))) {
                      for (s = 0; (o = e[s++]); ) for (; -1 < r.indexOf(" " + o + " "); ) r = r.replace(" " + o + " ", " ");
                      i !== (a = Ct(r)) && n.setAttribute("class", a);
                    }
                return this;
              },
              toggleClass: function (i, t) {
                var o = typeof i,
                  s = "string" == o || Array.isArray(i);
                return "boolean" == typeof t && s
                  ? t
                    ? this.addClass(i)
                    : this.removeClass(i)
                  : b(i)
                  ? this.each(function (e) {
                      S(this).toggleClass(i.call(this, e, jt(this), t), t);
                    })
                  : this.each(function () {
                      var e, t, n, r;
                      if (s) for (t = 0, n = S(this), r = kt(i); (e = r[t++]); ) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                      else (void 0 !== i && "boolean" != o) || ((e = jt(this)) && V.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : V.get(this, "__className__") || ""));
                    });
              },
              hasClass: function (e) {
                var t,
                  n,
                  r = 0;
                for (t = " " + e + " "; (n = this[r++]); ) if (1 === n.nodeType && -1 < (" " + Ct(jt(n)) + " ").indexOf(t)) return !0;
                return !1;
              },
            });
          var At = /\r/g;
          S.fn.extend({
            val: function (n) {
              var r,
                e,
                i,
                t = this[0];
              return arguments.length
                ? ((i = b(n)),
                  this.each(function (e) {
                    var t;
                    1 === this.nodeType &&
                      (null == (t = i ? n.call(this, e, S(this).val()) : n)
                        ? (t = "")
                        : "number" == typeof t
                        ? (t += "")
                        : Array.isArray(t) &&
                          (t = S.map(t, function (e) {
                            return null == e ? "" : e + "";
                          })),
                      ((r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value")) || (this.value = t));
                  }))
                : t
                ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value"))
                  ? e
                  : "string" == typeof (e = t.value)
                  ? e.replace(At, "")
                  : null == e
                  ? ""
                  : e
                : void 0;
            },
          }),
            S.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = S.find.attr(e, "value");
                    return null != t ? t : Ct(S.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      i = e.options,
                      o = e.selectedIndex,
                      s = "select-one" === e.type,
                      a = s ? null : [],
                      l = s ? o + 1 : i.length;
                    for (r = o < 0 ? l : s ? o : 0; r < l; r++)
                      if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))) {
                        if (((t = S(n).val()), s)) return t;
                        a.push(t);
                      }
                    return a;
                  },
                  set: function (e, t) {
                    for (var n, r, i = e.options, o = S.makeArray(t), s = i.length; s--; ) ((r = i[s]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o;
                  },
                },
              },
            }),
            S.each(["radio", "checkbox"], function () {
              (S.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t)) return (e.checked = -1 < S.inArray(S(e).val(), t));
                },
              }),
                y.checkOn ||
                  (S.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                  });
            }),
            (y.focusin = "onfocusin" in T);
          function $t(e) {
            e.stopPropagation();
          }
          var Ot = /^(?:focusinfocus|focusoutblur)$/;
          S.extend(S.event, {
            trigger: function (e, t, n, r) {
              var i,
                o,
                s,
                a,
                l,
                c,
                u,
                d,
                p = [n || E],
                f = m.call(e, "type") ? e.type : e,
                h = m.call(e, "namespace") ? e.namespace.split(".") : [];
              if (((o = d = s = n = n || E), 3 !== n.nodeType && 8 !== n.nodeType && !Ot.test(f + S.event.triggered) && (-1 < f.indexOf(".") && ((f = (h = f.split(".")).shift()), h.sort()), (l = f.indexOf(":") < 0 && "on" + f), ((e = e[S.expando] ? e : new S.Event(f, "object" == typeof e && e)).isTrigger = r ? 2 : 3), (e.namespace = h.join(".")), (e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null), (e.result = void 0), e.target || (e.target = n), (t = null == t ? [e] : S.makeArray(t, [e])), (u = S.event.special[f] || {}), r || !u.trigger || !1 !== u.trigger.apply(n, t)))) {
                if (!r && !u.noBubble && !g(n)) {
                  for (a = u.delegateType || f, Ot.test(a + f) || (o = o.parentNode); o; o = o.parentNode) p.push(o), (s = o);
                  s === (n.ownerDocument || E) && p.push(s.defaultView || s.parentWindow || T);
                }
                for (i = 0; (o = p[i++]) && !e.isPropagationStopped(); ) (d = o), (e.type = 1 < i ? a : u.bindType || f), (c = (V.get(o, "events") || {})[e.type] && V.get(o, "handle")) && c.apply(o, t), (c = l && o[l]) && c.apply && X(o) && ((e.result = c.apply(o, t)), !1 === e.result && e.preventDefault());
                return (e.type = f), r || e.isDefaultPrevented() || (u._default && !1 !== u._default.apply(p.pop(), t)) || !X(n) || (l && b(n[f]) && !g(n) && ((s = n[l]) && (n[l] = null), (S.event.triggered = f), e.isPropagationStopped() && d.addEventListener(f, $t), n[f](), e.isPropagationStopped() && d.removeEventListener(f, $t), (S.event.triggered = void 0), s && (n[l] = s))), e.result;
              }
            },
            simulate: function (e, t, n) {
              var r = S.extend(new S.Event(), n, { type: e, isSimulated: !0 });
              S.event.trigger(r, null, t);
            },
          }),
            S.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  S.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return S.event.trigger(e, t, n, !0);
              },
            }),
            y.focusin ||
              S.each({ focus: "focusin", blur: "focusout" }, function (n, r) {
                function i(e) {
                  S.event.simulate(r, e.target, S.event.fix(e));
                }
                S.event.special[r] = {
                  setup: function () {
                    var e = this.ownerDocument || this,
                      t = V.access(e, r);
                    t || e.addEventListener(n, i, !0), V.access(e, r, (t || 0) + 1);
                  },
                  teardown: function () {
                    var e = this.ownerDocument || this,
                      t = V.access(e, r) - 1;
                    t ? V.access(e, r, t) : (e.removeEventListener(n, i, !0), V.remove(e, r));
                  },
                };
              });
          var Dt = T.location,
            Nt = Date.now(),
            qt = /\?/;
          S.parseXML = function (e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
              t = new T.DOMParser().parseFromString(e, "text/xml");
            } catch (e) {
              t = void 0;
            }
            return (t && !t.getElementsByTagName("parsererror").length) || S.error("Invalid XML: " + e), t;
          };
          var Lt = /\[\]$/,
            Pt = /\r?\n/g,
            It = /^(?:submit|button|image|reset|file)$/i,
            Rt = /^(?:input|select|textarea|keygen)/i;
          function Ht(n, e, r, i) {
            var t;
            if (Array.isArray(e))
              S.each(e, function (e, t) {
                r || Lt.test(n) ? i(n, t) : Ht(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i);
              });
            else if (r || "object" !== w(e)) i(n, e);
            else for (t in e) Ht(n + "[" + t + "]", e[t], r, i);
          }
          (S.param = function (e, t) {
            function n(e, t) {
              var n = b(t) ? t() : t;
              i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
            }
            var r,
              i = [];
            if (null == e) return "";
            if (Array.isArray(e) || (e.jquery && !S.isPlainObject(e)))
              S.each(e, function () {
                n(this.name, this.value);
              });
            else for (r in e) Ht(r, e[r], t, n);
            return i.join("&");
          }),
            S.fn.extend({
              serialize: function () {
                return S.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = S.prop(this, "elements");
                  return e ? S.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return this.name && !S(this).is(":disabled") && Rt.test(this.nodeName) && !It.test(e) && (this.checked || !de.test(e));
                  })
                  .map(function (e, t) {
                    var n = S(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? S.map(n, function (e) {
                          return { name: t.name, value: e.replace(Pt, "\r\n") };
                        })
                      : { name: t.name, value: n.replace(Pt, "\r\n") };
                  })
                  .get();
              },
            });
          var Mt = /%20/g,
            zt = /#.*$/,
            Ft = /([?&])_=[^&]*/,
            Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Bt = /^(?:GET|HEAD)$/,
            Ut = /^\/\//,
            Gt = {},
            Xt = {},
            Jt = "*/".concat("*"),
            Vt = E.createElement("a");
          function Yt(o) {
            return function (e, t) {
              "string" != typeof e && ((t = e), (e = "*"));
              var n,
                r = 0,
                i = e.toLowerCase().match(L) || [];
              if (b(t)) for (; (n = i[r++]); ) "+" === n[0] ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
            };
          }
          function Kt(t, i, o, s) {
            var a = {},
              l = t === Xt;
            function c(e) {
              var r;
              return (
                (a[e] = !0),
                S.each(t[e] || [], function (e, t) {
                  var n = t(i, o, s);
                  return "string" != typeof n || l || a[n] ? (l ? !(r = n) : void 0) : (i.dataTypes.unshift(n), c(n), !1);
                }),
                r
              );
            }
            return c(i.dataTypes[0]) || (!a["*"] && c("*"));
          }
          function Qt(e, t) {
            var n,
              r,
              i = S.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((i[n] ? e : (r = r || {}))[n] = t[n]);
            return r && S.extend(!0, e, r), e;
          }
          (Vt.href = Dt.href),
            S.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: { url: Dt.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Dt.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Jt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": S.parseXML }, flatOptions: { url: !0, context: !0 } },
              ajaxSetup: function (e, t) {
                return t ? Qt(Qt(e, S.ajaxSettings), t) : Qt(S.ajaxSettings, e);
              },
              ajaxPrefilter: Yt(Gt),
              ajaxTransport: Yt(Xt),
              ajax: function (e, t) {
                "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                var u,
                  d,
                  p,
                  n,
                  f,
                  r,
                  h,
                  g,
                  i,
                  o,
                  v = S.ajaxSetup({}, t),
                  m = v.context || v,
                  y = v.context && (m.nodeType || m.jquery) ? S(m) : S.event,
                  b = S.Deferred(),
                  x = S.Callbacks("once memory"),
                  w = v.statusCode || {},
                  s = {},
                  a = {},
                  l = "canceled",
                  _ = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (h) {
                        if (!n) for (n = {}; (t = Wt.exec(p)); ) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = n[e.toLowerCase() + " "];
                      }
                      return null == t ? null : t.join(", ");
                    },
                    getAllResponseHeaders: function () {
                      return h ? p : null;
                    },
                    setRequestHeader: function (e, t) {
                      return null == h && ((e = a[e.toLowerCase()] = a[e.toLowerCase()] || e), (s[e] = t)), this;
                    },
                    overrideMimeType: function (e) {
                      return null == h && (v.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (h) _.always(e[_.status]);
                        else for (t in e) w[t] = [w[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || l;
                      return u && u.abort(t), c(0, t), this;
                    },
                  };
                if ((b.promise(_), (v.url = ((e || v.url || Dt.href) + "").replace(Ut, Dt.protocol + "//")), (v.type = t.method || t.type || v.method || v.type), (v.dataTypes = (v.dataType || "*").toLowerCase().match(L) || [""]), null == v.crossDomain)) {
                  r = E.createElement("a");
                  try {
                    (r.href = v.url), (r.href = r.href), (v.crossDomain = Vt.protocol + "//" + Vt.host != r.protocol + "//" + r.host);
                  } catch (e) {
                    v.crossDomain = !0;
                  }
                }
                if ((v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Kt(Gt, v, t, _), h)) return _;
                for (i in ((g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), (v.type = v.type.toUpperCase()), (v.hasContent = !Bt.test(v.type)), (d = v.url.replace(zt, "")), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Mt, "+")) : ((o = v.url.slice(d.length)), v.data && (v.processData || "string" == typeof v.data) && ((d += (qt.test(d) ? "&" : "?") + v.data), delete v.data), !1 === v.cache && ((d = d.replace(Ft, "$1")), (o = (qt.test(d) ? "&" : "?") + "_=" + Nt++ + o)), (v.url = d + o)), v.ifModified && (S.lastModified[d] && _.setRequestHeader("If-Modified-Since", S.lastModified[d]), S.etag[d] && _.setRequestHeader("If-None-Match", S.etag[d])), ((v.data && v.hasContent && !1 !== v.contentType) || t.contentType) && _.setRequestHeader("Content-Type", v.contentType), _.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Jt + "; q=0.01" : "") : v.accepts["*"]), v.headers)) _.setRequestHeader(i, v.headers[i]);
                if (v.beforeSend && (!1 === v.beforeSend.call(m, _, v) || h)) return _.abort();
                if (((l = "abort"), x.add(v.complete), _.done(v.success), _.fail(v.error), (u = Kt(Xt, v, t, _)))) {
                  if (((_.readyState = 1), g && y.trigger("ajaxSend", [_, v]), h)) return _;
                  v.async &&
                    0 < v.timeout &&
                    (f = T.setTimeout(function () {
                      _.abort("timeout");
                    }, v.timeout));
                  try {
                    (h = !1), u.send(s, c);
                  } catch (e) {
                    if (h) throw e;
                    c(-1, e);
                  }
                } else c(-1, "No Transport");
                function c(e, t, n, r) {
                  var i,
                    o,
                    s,
                    a,
                    l,
                    c = t;
                  h ||
                    ((h = !0),
                    f && T.clearTimeout(f),
                    (u = void 0),
                    (p = r || ""),
                    (_.readyState = 0 < e ? 4 : 0),
                    (i = (200 <= e && e < 300) || 304 === e),
                    n &&
                      (a = (function (e, t, n) {
                        for (var r, i, o, s, a = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (r)
                          for (i in a)
                            if (a[i] && a[i].test(r)) {
                              l.unshift(i);
                              break;
                            }
                        if (l[0] in n) o = l[0];
                        else {
                          for (i in n) {
                            if (!l[0] || e.converters[i + " " + l[0]]) {
                              o = i;
                              break;
                            }
                            s = s || i;
                          }
                          o = o || s;
                        }
                        if (o) return o !== l[0] && l.unshift(o), n[o];
                      })(v, _, n)),
                    (a = (function (e, t, n, r) {
                      var i,
                        o,
                        s,
                        a,
                        l,
                        c = {},
                        u = e.dataTypes.slice();
                      if (u[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                      for (o = u.shift(); o; )
                        if ((e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = o), (o = u.shift())))
                          if ("*" === o) o = l;
                          else if ("*" !== l && l !== o) {
                            if (!(s = c[l + " " + o] || c["* " + o]))
                              for (i in c)
                                if ((a = i.split(" "))[1] === o && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                  !0 === s ? (s = c[i]) : !0 !== c[i] && ((o = a[0]), u.unshift(a[1]));
                                  break;
                                }
                            if (!0 !== s)
                              if (s && e.throws) t = s(t);
                              else
                                try {
                                  t = s(t);
                                } catch (e) {
                                  return { state: "parsererror", error: s ? e : "No conversion from " + l + " to " + o };
                                }
                          }
                      return { state: "success", data: t };
                    })(v, a, _, i)),
                    i ? (v.ifModified && ((l = _.getResponseHeader("Last-Modified")) && (S.lastModified[d] = l), (l = _.getResponseHeader("etag")) && (S.etag[d] = l)), 204 === e || "HEAD" === v.type ? (c = "nocontent") : 304 === e ? (c = "notmodified") : ((c = a.state), (o = a.data), (i = !(s = a.error)))) : ((s = c), (!e && c) || ((c = "error"), e < 0 && (e = 0))),
                    (_.status = e),
                    (_.statusText = (t || c) + ""),
                    i ? b.resolveWith(m, [o, c, _]) : b.rejectWith(m, [_, c, s]),
                    _.statusCode(w),
                    (w = void 0),
                    g && y.trigger(i ? "ajaxSuccess" : "ajaxError", [_, v, i ? o : s]),
                    x.fireWith(m, [_, c]),
                    g && (y.trigger("ajaxComplete", [_, v]), --S.active || S.event.trigger("ajaxStop")));
                }
                return _;
              },
              getJSON: function (e, t, n) {
                return S.get(e, t, n, "json");
              },
              getScript: function (e, t) {
                return S.get(e, void 0, t, "script");
              },
            }),
            S.each(["get", "post"], function (e, i) {
              S[i] = function (e, t, n, r) {
                return b(t) && ((r = r || n), (n = t), (t = void 0)), S.ajax(S.extend({ url: e, type: i, dataType: r, data: t, success: n }, S.isPlainObject(e) && e));
              };
            }),
            (S._evalUrl = function (e, t) {
              return S.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (e) {
                  S.globalEval(e, t);
                },
              });
            }),
            S.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (b(e) && (e = e.call(this[0])),
                    (t = S(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (n) {
                return b(n)
                  ? this.each(function (e) {
                      S(this).wrapInner(n.call(this, e));
                    })
                  : this.each(function () {
                      var e = S(this),
                        t = e.contents();
                      t.length ? t.wrapAll(n) : e.append(n);
                    });
              },
              wrap: function (t) {
                var n = b(t);
                return this.each(function (e) {
                  S(this).wrapAll(n ? t.call(this, e) : t);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not("body")
                    .each(function () {
                      S(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (S.expr.pseudos.hidden = function (e) {
              return !S.expr.pseudos.visible(e);
            }),
            (S.expr.pseudos.visible = function (e) {
              return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
            }),
            (S.ajaxSettings.xhr = function () {
              try {
                return new T.XMLHttpRequest();
              } catch (e) {}
            });
          var Zt = { 0: 200, 1223: 204 },
            en = S.ajaxSettings.xhr();
          (y.cors = !!en && "withCredentials" in en),
            (y.ajax = en = !!en),
            S.ajaxTransport(function (i) {
              var o, s;
              if (y.cors || (en && !i.crossDomain))
                return {
                  send: function (e, t) {
                    var n,
                      r = i.xhr();
                    if ((r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)) for (n in i.xhrFields) r[n] = i.xhrFields[n];
                    for (n in (i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e)) r.setRequestHeader(n, e[n]);
                    (o = function (e) {
                      return function () {
                        o && ((o = s = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null), "abort" === e ? r.abort() : "error" === e ? ("number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText)) : t(Zt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? { binary: r.response } : { text: r.responseText }, r.getAllResponseHeaders()));
                      };
                    }),
                      (r.onload = o()),
                      (s = r.onerror = r.ontimeout = o("error")),
                      void 0 !== r.onabort
                        ? (r.onabort = s)
                        : (r.onreadystatechange = function () {
                            4 === r.readyState &&
                              T.setTimeout(function () {
                                o && s();
                              });
                          }),
                      (o = o("abort"));
                    try {
                      r.send((i.hasContent && i.data) || null);
                    } catch (e) {
                      if (o) throw e;
                    }
                  },
                  abort: function () {
                    o && o();
                  },
                };
            }),
            S.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            S.ajaxSetup({
              accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (e) {
                  return S.globalEval(e), e;
                },
              },
            }),
            S.ajaxPrefilter("script", function (e) {
              void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            }),
            S.ajaxTransport("script", function (n) {
              var r, i;
              if (n.crossDomain || n.scriptAttrs)
                return {
                  send: function (e, t) {
                    (r = S("<script>")
                      .attr(n.scriptAttrs || {})
                      .prop({ charset: n.scriptCharset, src: n.url })
                      .on(
                        "load error",
                        (i = function (e) {
                          r.remove(), (i = null), e && t("error" === e.type ? 404 : 200, e.type);
                        })
                      )),
                      E.head.appendChild(r[0]);
                  },
                  abort: function () {
                    i && i();
                  },
                };
            });
          var tn,
            nn = [],
            rn = /(=)\?(?=&|$)|\?\?/;
          S.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var e = nn.pop() || S.expando + "_" + Nt++;
              return (this[e] = !0), e;
            },
          }),
            S.ajaxPrefilter("json jsonp", function (e, t, n) {
              var r,
                i,
                o,
                s = !1 !== e.jsonp && (rn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && rn.test(e.data) && "data");
              if (s || "jsonp" === e.dataTypes[0])
                return (
                  (r = e.jsonpCallback = b(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                  s ? (e[s] = e[s].replace(rn, "$1" + r)) : !1 !== e.jsonp && (e.url += (qt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                  (e.converters["script json"] = function () {
                    return o || S.error(r + " was not called"), o[0];
                  }),
                  (e.dataTypes[0] = "json"),
                  (i = T[r]),
                  (T[r] = function () {
                    o = arguments;
                  }),
                  n.always(function () {
                    void 0 === i ? S(T).removeProp(r) : (T[r] = i), e[r] && ((e.jsonpCallback = t.jsonpCallback), nn.push(r)), o && b(i) && i(o[0]), (o = i = void 0);
                  }),
                  "script"
                );
            }),
            (y.createHTMLDocument = (((tn = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === tn.childNodes.length)),
            (S.parseHTML = function (e, t, n) {
              return "string" != typeof e ? [] : ("boolean" == typeof t && ((n = t), (t = !1)), t || (y.createHTMLDocument ? (((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href), t.head.appendChild(r)) : (t = E)), (o = !n && []), (i = k.exec(e)) ? [t.createElement(i[1])] : ((i = xe([e], t, o)), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
              var r, i, o;
            }),
            (S.fn.load = function (e, t, n) {
              var r,
                i,
                o,
                s = this,
                a = e.indexOf(" ");
              return (
                -1 < a && ((r = Ct(e.slice(a))), (e = e.slice(0, a))),
                b(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (i = "POST"),
                0 < s.length &&
                  S.ajax({ url: e, type: i || "GET", dataType: "html", data: t })
                    .done(function (e) {
                      (o = arguments), s.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
                    })
                    .always(
                      n &&
                        function (e, t) {
                          s.each(function () {
                            n.apply(this, o || [e.responseText, t, e]);
                          });
                        }
                    ),
                this
              );
            }),
            S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
              S.fn[t] = function (e) {
                return this.on(t, e);
              };
            }),
            (S.expr.pseudos.animated = function (t) {
              return S.grep(S.timers, function (e) {
                return t === e.elem;
              }).length;
            }),
            (S.offset = {
              setOffset: function (e, t, n) {
                var r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  c = S.css(e, "position"),
                  u = S(e),
                  d = {};
                "static" === c && (e.style.position = "relative"), (a = u.offset()), (o = S.css(e, "top")), (l = S.css(e, "left")), (i = ("absolute" === c || "fixed" === c) && -1 < (o + l).indexOf("auto") ? ((s = (r = u.position()).top), r.left) : ((s = parseFloat(o) || 0), parseFloat(l) || 0)), b(t) && (t = t.call(e, n, S.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + i), "using" in t ? t.using.call(e, d) : u.css(d);
              },
            }),
            S.fn.extend({
              offset: function (t) {
                if (arguments.length)
                  return void 0 === t
                    ? this
                    : this.each(function (e) {
                        S.offset.setOffset(this, t, e);
                      });
                var e,
                  n,
                  r = this[0];
                return r ? (r.getClientRects().length ? ((e = r.getBoundingClientRect()), (n = r.ownerDocument.defaultView), { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 }) : void 0;
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n,
                    r = this[0],
                    i = { top: 0, left: 0 };
                  if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();
                  else {
                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position"); ) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && (((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0)), (i.left += S.css(e, "borderLeftWidth", !0)));
                  }
                  return { top: t.top - i.top - S.css(r, "marginTop", !0), left: t.left - i.left - S.css(r, "marginLeft", !0) };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (var e = this.offsetParent; e && "static" === S.css(e, "position"); ) e = e.offsetParent;
                  return e || re;
                });
              },
            }),
            S.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, i) {
              var o = "pageYOffset" === i;
              S.fn[t] = function (e) {
                return F(
                  this,
                  function (e, t, n) {
                    var r;
                    if ((g(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView), void 0 === n)) return r ? r[i] : e[t];
                    r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : (e[t] = n);
                  },
                  t,
                  e,
                  arguments.length
                );
              };
            }),
            S.each(["top", "left"], function (e, n) {
              S.cssHooks[n] = Qe(y.pixelPosition, function (e, t) {
                if (t) return (t = Ke(e, n)), Ge.test(t) ? S(e).position()[n] + "px" : t;
              });
            }),
            S.each({ Height: "height", Width: "width" }, function (s, a) {
              S.each({ padding: "inner" + s, content: a, "": "outer" + s }, function (r, o) {
                S.fn[o] = function (e, t) {
                  var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                  return F(
                    this,
                    function (e, t, n) {
                      var r;
                      return g(e) ? (0 === o.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s]) : 9 === e.nodeType ? ((r = e.documentElement), Math.max(e.body["scroll" + s], r["scroll" + s], e.body["offset" + s], r["offset" + s], r["client" + s])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
                    },
                    a,
                    n ? e : void 0,
                    n
                  );
                };
              });
            }),
            S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
              S.fn[n] = function (e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
              };
            }),
            S.fn.extend({
              hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
              },
            }),
            S.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
              },
            }),
            (S.proxy = function (e, t) {
              var n, r, i;
              if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), b(e)))
                return (
                  (r = a.call(arguments, 2)),
                  ((i = function () {
                    return e.apply(t || this, r.concat(a.call(arguments)));
                  }).guid = e.guid = e.guid || S.guid++),
                  i
                );
            }),
            (S.holdReady = function (e) {
              e ? S.readyWait++ : S.ready(!0);
            }),
            (S.isArray = Array.isArray),
            (S.parseJSON = JSON.parse),
            (S.nodeName = j),
            (S.isFunction = b),
            (S.isWindow = g),
            (S.camelCase = G),
            (S.type = w),
            (S.now = Date.now),
            (S.isNumeric = function (e) {
              var t = S.type(e);
              return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
            }),
            "function" == typeof define &&
              define.amd &&
              define("jquery", [], function () {
                return S;
              });
          var on = T.jQuery,
            sn = T.$;
          return (
            (S.noConflict = function (e) {
              return T.$ === S && (T.$ = sn), e && T.jQuery === S && (T.jQuery = on), S;
            }),
            e || (T.jQuery = T.$ = S),
            S
          );
        });
      },
      {},
    ],
    78: [
      function (e, t, n) {
        var r, i;
        (r = this),
          (i = function () {
            "use strict";
            function i(e, t) {
              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            var r =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    },
              e = function (e, t, n) {
                return t && o(e.prototype, t), n && o(e, n), e;
              };
            function o(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
              }
            }
            var t =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                  }
                  return e;
                },
              s =
                (e(
                  u,
                  [
                    {
                      key: "getContexts",
                      value: function () {
                        var n = [];
                        return (
                          (void 0 !== this.ctx && this.ctx ? (NodeList.prototype.isPrototypeOf(this.ctx) ? Array.prototype.slice.call(this.ctx) : Array.isArray(this.ctx) ? this.ctx : "string" == typeof this.ctx ? Array.prototype.slice.call(document.querySelectorAll(this.ctx)) : [this.ctx]) : []).forEach(function (t) {
                            var e =
                              0 <
                              n.filter(function (e) {
                                return e.contains(t);
                              }).length;
                            -1 !== n.indexOf(t) || e || n.push(t);
                          }),
                          n
                        );
                      },
                    },
                    {
                      key: "getIframeContents",
                      value: function (e, t, n) {
                        var r = 2 < arguments.length && void 0 !== n ? n : function () {},
                          i = void 0;
                        try {
                          var o = e.contentWindow;
                          if (((i = o.document), !o || !i)) throw new Error("iframe inaccessible");
                        } catch (e) {
                          r();
                        }
                        i && t(i);
                      },
                    },
                    {
                      key: "isIframeBlank",
                      value: function (e) {
                        var t = "about:blank",
                          n = e.getAttribute("src").trim();
                        return e.contentWindow.location.href === t && n !== t && n;
                      },
                    },
                    {
                      key: "observeIframeLoad",
                      value: function (e, t, n) {
                        function r() {
                          if (!o) {
                            (o = !0), clearTimeout(s);
                            try {
                              i.isIframeBlank(e) || (e.removeEventListener("load", r), i.getIframeContents(e, t, n));
                            } catch (e) {
                              n();
                            }
                          }
                        }
                        var i = this,
                          o = !1,
                          s = null;
                        e.addEventListener("load", r), (s = setTimeout(r, this.iframesTimeout));
                      },
                    },
                    {
                      key: "onIframeReady",
                      value: function (e, t, n) {
                        try {
                          "complete" === e.contentWindow.document.readyState ? (this.isIframeBlank(e) ? this.observeIframeLoad(e, t, n) : this.getIframeContents(e, t, n)) : this.observeIframeLoad(e, t, n);
                        } catch (e) {
                          n();
                        }
                      },
                    },
                    {
                      key: "waitForIframes",
                      value: function (e, t) {
                        var n = this,
                          r = 0;
                        this.forEachIframe(
                          e,
                          function () {
                            return !0;
                          },
                          function (e) {
                            r++,
                              n.waitForIframes(e.querySelector("html"), function () {
                                --r || t();
                              });
                          },
                          function (e) {
                            e || t();
                          }
                        );
                      },
                    },
                    {
                      key: "forEachIframe",
                      value: function (e, n, r, t) {
                        var i = this,
                          o = 3 < arguments.length && void 0 !== t ? t : function () {},
                          s = e.querySelectorAll("iframe"),
                          a = s.length,
                          l = 0;
                        function c() {
                          --a <= 0 && o(l);
                        }
                        (s = Array.prototype.slice.call(s)),
                          a || c(),
                          s.forEach(function (t) {
                            u.matches(t, i.exclude)
                              ? c()
                              : i.onIframeReady(
                                  t,
                                  function (e) {
                                    n(t) && (l++, r(e)), c();
                                  },
                                  c
                                );
                          });
                      },
                    },
                    {
                      key: "createIterator",
                      value: function (e, t, n) {
                        return document.createNodeIterator(e, t, n, !1);
                      },
                    },
                    {
                      key: "createInstanceOnIframe",
                      value: function (e) {
                        return new u(e.querySelector("html"), this.iframes);
                      },
                    },
                    {
                      key: "compareNodeIframe",
                      value: function (e, t, n) {
                        if (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) {
                          if (null === t) return !0;
                          if (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) return !0;
                        }
                        return !1;
                      },
                    },
                    {
                      key: "getIteratorNode",
                      value: function (e) {
                        var t = e.previousNode();
                        return { prevNode: t, node: null === t ? e.nextNode() : e.nextNode() && e.nextNode() };
                      },
                    },
                    {
                      key: "checkIframeFilter",
                      value: function (e, t, n, r) {
                        var i = !1,
                          o = !1;
                        return (
                          r.forEach(function (e, t) {
                            e.val === n && ((i = t), (o = e.handled));
                          }),
                          this.compareNodeIframe(e, t, n) ? (!1 !== i || o ? !1 === i || o || (r[i].handled = !0) : r.push({ val: n, handled: !0 }), !0) : (!1 === i && r.push({ val: n, handled: !1 }), !1)
                        );
                      },
                    },
                    {
                      key: "handleOpenIframes",
                      value: function (e, t, n, r) {
                        var i = this;
                        e.forEach(function (e) {
                          e.handled ||
                            i.getIframeContents(e.val, function (e) {
                              i.createInstanceOnIframe(e).forEachNode(t, n, r);
                            });
                        });
                      },
                    },
                    {
                      key: "iterateThroughNodes",
                      value: function (t, e, n, r, i) {
                        for (var o, s = this, a = this.createIterator(e, t, r), l = [], c = [], u = void 0, d = void 0; (o = s.getIteratorNode(a)), (d = o.prevNode), (u = o.node); )
                          this.iframes &&
                            this.forEachIframe(
                              e,
                              function (e) {
                                return s.checkIframeFilter(u, d, e, l);
                              },
                              function (e) {
                                s.createInstanceOnIframe(e).forEachNode(
                                  t,
                                  function (e) {
                                    return c.push(e);
                                  },
                                  r
                                );
                              }
                            ),
                            c.push(u);
                        c.forEach(function (e) {
                          n(e);
                        }),
                          this.iframes && this.handleOpenIframes(l, t, n, r),
                          i();
                      },
                    },
                    {
                      key: "forEachNode",
                      value: function (n, r, i, e) {
                        var o = this,
                          s = 3 < arguments.length && void 0 !== e ? e : function () {},
                          t = this.getContexts(),
                          a = t.length;
                        a || s(),
                          t.forEach(function (e) {
                            function t() {
                              o.iterateThroughNodes(n, e, r, i, function () {
                                --a <= 0 && s();
                              });
                            }
                            o.iframes ? o.waitForIframes(e, t) : t();
                          });
                      },
                    },
                  ],
                  [
                    {
                      key: "matches",
                      value: function (t, e) {
                        var n = "string" == typeof e ? [e] : e,
                          r = t.matches || t.matchesSelector || t.msMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                        if (r) {
                          var i = !1;
                          return (
                            n.every(function (e) {
                              return !r.call(t, e) || !(i = !0);
                            }),
                            i
                          );
                        }
                        return !1;
                      },
                    },
                  ]
                ),
                u);
            function u(e) {
              var t = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1],
                n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [],
                r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 5e3;
              i(this, u), (this.ctx = e), (this.iframes = t), (this.exclude = n), (this.iframesTimeout = r);
            }
            var a =
              (e(n, [
                {
                  key: "log",
                  value: function (e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "debug",
                      n = this.opt.log;
                    this.opt.debug && "object" === (void 0 === n ? "undefined" : r(n)) && "function" == typeof n[t] && n[t]("mark.js: " + e);
                  },
                },
                {
                  key: "escapeStr",
                  value: function (e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                  },
                },
                {
                  key: "createRegExp",
                  value: function (e) {
                    return "disabled" !== this.opt.wildcards && (e = this.setupWildcardsRegExp(e)), (e = this.escapeStr(e)), Object.keys(this.opt.synonyms).length && (e = this.createSynonymsRegExp(e)), (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)), this.opt.diacritics && (e = this.createDiacriticsRegExp(e)), (e = this.createMergedBlanksRegExp(e)), (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.createJoinersRegExp(e)), "disabled" !== this.opt.wildcards && (e = this.createWildcardsRegExp(e)), (e = this.createAccuracyRegExp(e));
                  },
                },
                {
                  key: "createSynonymsRegExp",
                  value: function (e) {
                    var t = this.opt.synonyms,
                      n = this.opt.caseSensitive ? "" : "i",
                      r = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
                    for (var i in t)
                      if (t.hasOwnProperty(i)) {
                        var o = t[i],
                          s = "disabled" !== this.opt.wildcards ? this.setupWildcardsRegExp(i) : this.escapeStr(i),
                          a = "disabled" !== this.opt.wildcards ? this.setupWildcardsRegExp(o) : this.escapeStr(o);
                        "" !== s && "" !== a && (e = e.replace(new RegExp("(" + this.escapeStr(s) + "|" + this.escapeStr(a) + ")", "gm" + n), r + "(" + this.processSynomyms(s) + "|" + this.processSynomyms(a) + ")" + r));
                      }
                    return e;
                  },
                },
                {
                  key: "processSynomyms",
                  value: function (e) {
                    return (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)), e;
                  },
                },
                {
                  key: "setupWildcardsRegExp",
                  value: function (e) {
                    return (e = e.replace(/(?:\\)*\?/g, function (e) {
                      return "\\" === e.charAt(0) ? "?" : "";
                    })).replace(/(?:\\)*\*/g, function (e) {
                      return "\\" === e.charAt(0) ? "*" : "";
                    });
                  },
                },
                {
                  key: "createWildcardsRegExp",
                  value: function (e) {
                    var t = "withSpaces" === this.opt.wildcards;
                    return e.replace(/\u0001/g, t ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, t ? "[\\S\\s]*?" : "\\S*");
                  },
                },
                {
                  key: "setupIgnoreJoinersRegExp",
                  value: function (e) {
                    return e.replace(/[^(|)\\]/g, function (e, t, n) {
                      var r = n.charAt(t + 1);
                      return /[(|)\\]/.test(r) || "" === r ? e : e + "\0";
                    });
                  },
                },
                {
                  key: "createJoinersRegExp",
                  value: function (e) {
                    var t = [],
                      n = this.opt.ignorePunctuation;
                    return Array.isArray(n) && n.length && t.push(this.escapeStr(n.join(""))), this.opt.ignoreJoiners && t.push("\\u00ad\\u200b\\u200c\\u200d"), t.length ? e.split(/\u0000+/).join("[" + t.join("") + "]*") : e;
                  },
                },
                {
                  key: "createDiacriticsRegExp",
                  value: function (n) {
                    var r = this.opt.caseSensitive ? "" : "i",
                      e = this.opt.caseSensitive ? ["aàáảãạăằắẳẵặâầấẩẫậäåāą", "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéẻẽẹêềếểễệëěēę", "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïī", "IÌÍỈĨỊÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøō", "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rř", "RŘ", "sšśșş", "SŠŚȘŞ", "tťțţ", "TŤȚŢ", "uùúủũụưừứửữựûüůū", "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿ", "YÝỲỶỸỴŸ", "zžżź", "ZŽŻŹ"] : ["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćčCÇĆČ", "dđďDĐĎ", "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ", "lłLŁ", "nñňńNÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rřRŘ", "sšśșşSŠŚȘŞ", "tťțţTŤȚŢ", "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿYÝỲỶỸỴŸ", "zžżźZŽŻŹ"],
                      i = [];
                    return (
                      n.split("").forEach(function (t) {
                        e.every(function (e) {
                          if (-1 !== e.indexOf(t)) {
                            if (-1 < i.indexOf(e)) return !1;
                            (n = n.replace(new RegExp("[" + e + "]", "gm" + r), "[" + e + "]")), i.push(e);
                          }
                          return !0;
                        });
                      }),
                      n
                    );
                  },
                },
                {
                  key: "createMergedBlanksRegExp",
                  value: function (e) {
                    return e.replace(/[\s]+/gim, "[\\s]+");
                  },
                },
                {
                  key: "createAccuracyRegExp",
                  value: function (e) {
                    var t = this,
                      n = this.opt.accuracy,
                      r = "string" == typeof n ? n : n.value,
                      i = "string" == typeof n ? [] : n.limiters,
                      o = "";
                    switch (
                      (i.forEach(function (e) {
                        o += "|" + t.escapeStr(e);
                      }),
                      r)
                    ) {
                      case "partially":
                      default:
                        return "()(" + e + ")";
                      case "complementary":
                        return "()([^" + (o = "\\s" + (o || this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿"))) + "]*" + e + "[^" + o + "]*)";
                      case "exactly":
                        return "(^|\\s" + o + ")(" + e + ")(?=$|\\s" + o + ")";
                    }
                  },
                },
                {
                  key: "getSeparatedKeywords",
                  value: function (e) {
                    var t = this,
                      n = [];
                    return (
                      e.forEach(function (e) {
                        t.opt.separateWordSearch
                          ? e.split(" ").forEach(function (e) {
                              e.trim() && -1 === n.indexOf(e) && n.push(e);
                            })
                          : e.trim() && -1 === n.indexOf(e) && n.push(e);
                      }),
                      {
                        keywords: n.sort(function (e, t) {
                          return t.length - e.length;
                        }),
                        length: n.length,
                      }
                    );
                  },
                },
                {
                  key: "isNumeric",
                  value: function (e) {
                    return Number(parseFloat(e)) == e;
                  },
                },
                {
                  key: "checkRanges",
                  value: function (e) {
                    var i = this;
                    if (!Array.isArray(e) || "[object Object]" !== Object.prototype.toString.call(e[0])) return this.log("markRanges() will only accept an array of objects"), this.opt.noMatch(e), [];
                    var o = [],
                      s = 0;
                    return (
                      e
                        .sort(function (e, t) {
                          return e.start - t.start;
                        })
                        .forEach(function (e) {
                          var t = i.callNoMatchOnInvalidRanges(e, s),
                            n = t.start,
                            r = t.end;
                          t.valid && ((e.start = n), (e.length = r - n), o.push(e), (s = r));
                        }),
                      o
                    );
                  },
                },
                {
                  key: "callNoMatchOnInvalidRanges",
                  value: function (e, t) {
                    var n = void 0,
                      r = void 0,
                      i = !1;
                    return e && void 0 !== e.start ? ((r = (n = parseInt(e.start, 10)) + parseInt(e.length, 10)), this.isNumeric(e.start) && this.isNumeric(e.length) && 0 < r - t && 0 < r - n ? (i = !0) : (this.log("Ignoring invalid or overlapping range: " + JSON.stringify(e)), this.opt.noMatch(e))) : (this.log("Ignoring invalid range: " + JSON.stringify(e)), this.opt.noMatch(e)), { start: n, end: r, valid: i };
                  },
                },
                {
                  key: "checkWhitespaceRanges",
                  value: function (e, t, n) {
                    var r = void 0,
                      i = !0,
                      o = n.length,
                      s = t - o,
                      a = parseInt(e.start, 10) - s;
                    return o < (r = (a = o < a ? o : a) + parseInt(e.length, 10)) && ((r = o), this.log("End range automatically set to the max value of " + o)), a < 0 || r - a < 0 || o < a || o < r ? ((i = !1), this.log("Invalid range: " + JSON.stringify(e)), this.opt.noMatch(e)) : "" === n.substring(a, r).replace(/\s+/g, "") && ((i = !1), this.log("Skipping whitespace only range: " + JSON.stringify(e)), this.opt.noMatch(e)), { start: a, end: r, valid: i };
                  },
                },
                {
                  key: "getTextNodes",
                  value: function (e) {
                    var t = this,
                      n = "",
                      r = [];
                    this.iterator.forEachNode(
                      NodeFilter.SHOW_TEXT,
                      function (e) {
                        r.push({ start: n.length, end: (n += e.textContent).length, node: e });
                      },
                      function (e) {
                        return t.matchesExclude(e.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
                      },
                      function () {
                        e({ value: n, nodes: r });
                      }
                    );
                  },
                },
                {
                  key: "matchesExclude",
                  value: function (e) {
                    return s.matches(e, this.opt.exclude.concat(["script", "style", "title", "head", "html"]));
                  },
                },
                {
                  key: "wrapRangeInTextNode",
                  value: function (e, t, n) {
                    var r = this.opt.element ? this.opt.element : "mark",
                      i = e.splitText(t),
                      o = i.splitText(n - t),
                      s = document.createElement(r);
                    return s.setAttribute("data-markjs", "true"), this.opt.className && s.setAttribute("class", this.opt.className), (s.textContent = i.textContent), i.parentNode.replaceChild(s, i), o;
                  },
                },
                {
                  key: "wrapRangeInMappedTextNode",
                  value: function (a, l, c, u, d) {
                    var p = this;
                    a.nodes.every(function (e, n) {
                      var t = a.nodes[n + 1];
                      if (void 0 === t || t.start > l) {
                        if (!u(e.node)) return !1;
                        var r = l - e.start,
                          i = (c > e.end ? e.end : c) - e.start,
                          o = a.value.substr(0, e.start),
                          s = a.value.substr(i + e.start);
                        if (
                          ((e.node = p.wrapRangeInTextNode(e.node, r, i)),
                          (a.value = o + s),
                          a.nodes.forEach(function (e, t) {
                            n <= t && (0 < a.nodes[t].start && t !== n && (a.nodes[t].start -= i), (a.nodes[t].end -= i));
                          }),
                          (c -= i),
                          d(e.node.previousSibling, e.start),
                          !(c > e.end))
                        )
                          return !1;
                        l = e.end;
                      }
                      return !0;
                    });
                  },
                },
                {
                  key: "wrapMatches",
                  value: function (i, e, o, s, t) {
                    var a = this,
                      l = 0 === e ? 0 : e + 1;
                    this.getTextNodes(function (e) {
                      e.nodes.forEach(function (e) {
                        e = e.node;
                        for (var t = void 0; null !== (t = i.exec(e.textContent)) && "" !== t[l]; )
                          if (o(t[l], e)) {
                            var n = t.index;
                            if (0 !== l) for (var r = 1; r < l; r++) n += t[r].length;
                            (e = a.wrapRangeInTextNode(e, n, n + t[l].length)), s(e.previousSibling), (i.lastIndex = 0);
                          }
                      }),
                        t();
                    });
                  },
                },
                {
                  key: "wrapMatchesAcrossElements",
                  value: function (o, e, s, a, l) {
                    var c = this,
                      u = 0 === e ? 0 : e + 1;
                    this.getTextNodes(function (e) {
                      for (var t = void 0; null !== (t = o.exec(e.value)) && "" !== t[u]; ) {
                        var n = t.index;
                        if (0 !== u) for (var r = 1; r < u; r++) n += t[r].length;
                        var i = n + t[u].length;
                        c.wrapRangeInMappedTextNode(
                          e,
                          n,
                          i,
                          function (e) {
                            return s(t[u], e);
                          },
                          function (e, t) {
                            (o.lastIndex = t), a(e);
                          }
                        );
                      }
                      l();
                    });
                  },
                },
                {
                  key: "wrapRangeFromIndex",
                  value: function (e, a, l, t) {
                    var c = this;
                    this.getTextNodes(function (o) {
                      var s = o.value.length;
                      e.forEach(function (t, n) {
                        var e = c.checkWhitespaceRanges(t, s, o.value),
                          r = e.start,
                          i = e.end;
                        e.valid &&
                          c.wrapRangeInMappedTextNode(
                            o,
                            r,
                            i,
                            function (e) {
                              return a(e, t, o.value.substring(r, i), n);
                            },
                            function (e) {
                              l(e, t);
                            }
                          );
                      }),
                        t();
                    });
                  },
                },
                {
                  key: "unwrapMatches",
                  value: function (e) {
                    for (var t = e.parentNode, n = document.createDocumentFragment(); e.firstChild; ) n.appendChild(e.removeChild(e.firstChild));
                    t.replaceChild(n, e), this.ie ? this.normalizeTextNode(t) : t.normalize();
                  },
                },
                {
                  key: "normalizeTextNode",
                  value: function (e) {
                    if (e) {
                      if (3 === e.nodeType) for (; e.nextSibling && 3 === e.nextSibling.nodeType; ) (e.nodeValue += e.nextSibling.nodeValue), e.parentNode.removeChild(e.nextSibling);
                      else this.normalizeTextNode(e.firstChild);
                      this.normalizeTextNode(e.nextSibling);
                    }
                  },
                },
                {
                  key: "markRegExp",
                  value: function (e, t) {
                    var n = this;
                    (this.opt = t), this.log('Searching with expression "' + e + '"');
                    var r = 0,
                      i = "wrapMatches";
                    this.opt.acrossElements && (i = "wrapMatchesAcrossElements"),
                      this[i](
                        e,
                        this.opt.ignoreGroups,
                        function (e, t) {
                          return n.opt.filter(t, e, r);
                        },
                        function (e) {
                          r++, n.opt.each(e);
                        },
                        function () {
                          0 === r && n.opt.noMatch(e), n.opt.done(r);
                        }
                      );
                  },
                },
                {
                  key: "mark",
                  value: function (e, t) {
                    var i = this;
                    this.opt = t;
                    var o = 0,
                      s = "wrapMatches",
                      n = this.getSeparatedKeywords("string" == typeof e ? [e] : e),
                      a = n.keywords,
                      l = n.length,
                      c = this.opt.caseSensitive ? "" : "i";
                    this.opt.acrossElements && (s = "wrapMatchesAcrossElements"),
                      0 === l
                        ? this.opt.done(o)
                        : (function e(n) {
                            var t = new RegExp(i.createRegExp(n), "gm" + c),
                              r = 0;
                            i.log('Searching with expression "' + t + '"'),
                              i[s](
                                t,
                                1,
                                function (e, t) {
                                  return i.opt.filter(t, n, o, r);
                                },
                                function (e) {
                                  r++, o++, i.opt.each(e);
                                },
                                function () {
                                  0 === r && i.opt.noMatch(n), a[l - 1] === n ? i.opt.done(o) : e(a[a.indexOf(n) + 1]);
                                }
                              );
                          })(a[0]);
                  },
                },
                {
                  key: "markRanges",
                  value: function (e, t) {
                    var i = this;
                    this.opt = t;
                    var n = 0,
                      r = this.checkRanges(e);
                    r && r.length
                      ? (this.log("Starting to mark with the following ranges: " + JSON.stringify(r)),
                        this.wrapRangeFromIndex(
                          r,
                          function (e, t, n, r) {
                            return i.opt.filter(e, t, n, r);
                          },
                          function (e, t) {
                            n++, i.opt.each(e, t);
                          },
                          function () {
                            i.opt.done(n);
                          }
                        ))
                      : this.opt.done(n);
                  },
                },
                {
                  key: "unmark",
                  value: function (e) {
                    var r = this;
                    this.opt = e;
                    var i = this.opt.element ? this.opt.element : "*";
                    (i += "[data-markjs]"),
                      this.opt.className && (i += "." + this.opt.className),
                      this.log('Removal selector "' + i + '"'),
                      this.iterator.forEachNode(
                        NodeFilter.SHOW_ELEMENT,
                        function (e) {
                          r.unwrapMatches(e);
                        },
                        function (e) {
                          var t = s.matches(e, i),
                            n = r.matchesExclude(e);
                          return !t || n ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
                        },
                        this.opt.done
                      );
                  },
                },
                {
                  key: "opt",
                  set: function (e) {
                    this._opt = t(
                      {},
                      {
                        element: "",
                        className: "",
                        exclude: [],
                        iframes: !1,
                        iframesTimeout: 5e3,
                        separateWordSearch: !0,
                        diacritics: !0,
                        synonyms: {},
                        accuracy: "partially",
                        acrossElements: !1,
                        caseSensitive: !1,
                        ignoreJoiners: !1,
                        ignoreGroups: 0,
                        ignorePunctuation: [],
                        wildcards: "disabled",
                        each: function () {},
                        noMatch: function () {},
                        filter: function () {
                          return !0;
                        },
                        done: function () {},
                        debug: !1,
                        log: window.console,
                      },
                      e
                    );
                  },
                  get: function () {
                    return this._opt;
                  },
                },
                {
                  key: "iterator",
                  get: function () {
                    return new s(this.ctx, this.opt.iframes, this.opt.exclude, this.opt.iframesTimeout);
                  },
                },
              ]),
              n);
            function n(e) {
              i(this, n), (this.ctx = e), (this.ie = !1);
              var t = window.navigator.userAgent;
              (-1 < t.indexOf("MSIE") || -1 < t.indexOf("Trident")) && (this.ie = !0);
            }
            return function (e) {
              var n = this,
                r = new a(e);
              return (
                (this.mark = function (e, t) {
                  return r.mark(e, t), n;
                }),
                (this.markRegExp = function (e, t) {
                  return r.markRegExp(e, t), n;
                }),
                (this.markRanges = function (e, t) {
                  return r.markRanges(e, t), n;
                }),
                (this.unmark = function (e) {
                  return r.unmark(e), n;
                }),
                this
              );
            };
          }),
          "object" == typeof n && void 0 !== t ? (t.exports = i()) : "function" == typeof define && define.amd ? define(i) : (r.Mark = i());
      },
      {},
    ],
    79: [
      function (e, t, n) {
        var r;
        (r = function (u) {
          var e = (function () {
              if (u && u.fn && u.fn.select2 && u.fn.select2.amd) var e = u.fn.select2.amd;
              var t, n, r, p, o, s, f, h, g, v, m, y, i, a, b;
              function x(e, t) {
                return i.call(e, t);
              }
              function l(e, t) {
                var n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  c,
                  u,
                  d,
                  p,
                  f = t && t.split("/"),
                  h = m.map,
                  g = (h && h["*"]) || {};
                if (e && "." === e.charAt(0))
                  if (t) {
                    for (s = (e = e.split("/")).length - 1, m.nodeIdCompat && b.test(e[s]) && (e[s] = e[s].replace(b, "")), e = f.slice(0, f.length - 1).concat(e), u = 0; u < e.length; u += 1)
                      if ("." === (p = e[u])) e.splice(u, 1), --u;
                      else if (".." === p) {
                        if (1 === u && (".." === e[2] || ".." === e[0])) break;
                        0 < u && (e.splice(u - 1, 2), (u -= 2));
                      }
                    e = e.join("/");
                  } else 0 === e.indexOf("./") && (e = e.substring(2));
                if ((f || g) && h) {
                  for (u = (n = e.split("/")).length; 0 < u; --u) {
                    if (((r = n.slice(0, u).join("/")), f))
                      for (d = f.length; 0 < d; --d)
                        if ((i = (i = h[f.slice(0, d).join("/")]) && i[r])) {
                          (o = i), (a = u);
                          break;
                        }
                    if (o) break;
                    !l && g && g[r] && ((l = g[r]), (c = u));
                  }
                  !o && l && ((o = l), (a = c)), o && (n.splice(0, a, o), (e = n.join("/")));
                }
                return e;
              }
              function w(t, n) {
                return function () {
                  var e = a.call(arguments, 0);
                  return "string" != typeof e[0] && 1 === e.length && e.push(null), s.apply(p, e.concat([t, n]));
                };
              }
              function _(t) {
                return function (e) {
                  g[t] = e;
                };
              }
              function T(e) {
                if (x(v, e)) {
                  var t = v[e];
                  delete v[e], (y[e] = !0), o.apply(p, t);
                }
                if (!x(g, e) && !x(y, e)) throw new Error("No " + e);
                return g[e];
              }
              function c(e) {
                var t,
                  n = e ? e.indexOf("!") : -1;
                return -1 < n && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))), [t, e];
              }
              return (
                (e && e.requirejs) ||
                  (e ? (n = e) : (e = {}),
                  (g = {}),
                  (v = {}),
                  (m = {}),
                  (y = {}),
                  (i = Object.prototype.hasOwnProperty),
                  (a = [].slice),
                  (b = /\.js$/),
                  (f = function (e, t) {
                    var n,
                      r,
                      i = c(e),
                      o = i[0];
                    return (
                      (e = i[1]),
                      o && (n = T((o = l(o, t)))),
                      o
                        ? (e =
                            n && n.normalize
                              ? n.normalize(
                                  e,
                                  ((r = t),
                                  function (e) {
                                    return l(e, r);
                                  })
                                )
                              : l(e, t))
                        : ((o = (i = c((e = l(e, t))))[0]), (e = i[1]), o && (n = T(o))),
                      { f: o ? o + "!" + e : e, n: e, pr: o, p: n }
                    );
                  }),
                  (h = {
                    require: function (e) {
                      return w(e);
                    },
                    exports: function (e) {
                      var t = g[e];
                      return void 0 !== t ? t : (g[e] = {});
                    },
                    module: function (e) {
                      return {
                        id: e,
                        uri: "",
                        exports: g[e],
                        config:
                          ((t = e),
                          function () {
                            return (m && m.config && m.config[t]) || {};
                          }),
                      };
                      var t;
                    },
                  }),
                  (o = function (e, t, n, r) {
                    var i,
                      o,
                      s,
                      a,
                      l,
                      c,
                      u = [],
                      d = typeof n;
                    if (((r = r || e), "undefined" == d || "function" == d)) {
                      for (t = !t.length && n.length ? ["require", "exports", "module"] : t, l = 0; l < t.length; l += 1)
                        if ("require" === (o = (a = f(t[l], r)).f)) u[l] = h.require(e);
                        else if ("exports" === o) (u[l] = h.exports(e)), (c = !0);
                        else if ("module" === o) i = u[l] = h.module(e);
                        else if (x(g, o) || x(v, o) || x(y, o)) u[l] = T(o);
                        else {
                          if (!a.p) throw new Error(e + " missing " + o);
                          a.p.load(a.n, w(r, !0), _(o), {}), (u[l] = g[o]);
                        }
                      (s = n ? n.apply(g[e], u) : void 0), e && (i && i.exports !== p && i.exports !== g[e] ? (g[e] = i.exports) : (s === p && c) || (g[e] = s));
                    } else e && (g[e] = n);
                  }),
                  (t = n = s = function (e, t, n, r, i) {
                    if ("string" == typeof e) return h[e] ? h[e](t) : T(f(e, t).f);
                    if (!e.splice) {
                      if (((m = e).deps && s(m.deps, m.callback), !t)) return;
                      t.splice ? ((e = t), (t = n), (n = null)) : (e = p);
                    }
                    return (
                      (t = t || function () {}),
                      "function" == typeof n && ((n = r), (r = i)),
                      r
                        ? o(p, e, t, n)
                        : setTimeout(function () {
                            o(p, e, t, n);
                          }, 4),
                      s
                    );
                  }),
                  (s.config = function (e) {
                    return s(e);
                  }),
                  (t._defined = g),
                  ((r = function (e, t, n) {
                    if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
                    t.splice || ((n = t), (t = [])), x(g, e) || x(v, e) || (v[e] = [e, t, n]);
                  }).amd = { jQuery: !0 }),
                  (e.requirejs = t),
                  (e.require = n),
                  (e.define = r)),
                e.define("almond", function () {}),
                e.define("jquery", [], function () {
                  var e = u || $;
                  return null == e && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), e;
                }),
                e.define("select2/utils", ["jquery"], function (o) {
                  var e = {};
                  function u(e) {
                    var t = e.prototype,
                      n = [];
                    for (var r in t) {
                      "function" == typeof t[r] && "constructor" !== r && n.push(r);
                    }
                    return n;
                  }
                  (e.Extend = function (e, t) {
                    var n = {}.hasOwnProperty;
                    function r() {
                      this.constructor = e;
                    }
                    for (var i in t) n.call(t, i) && (e[i] = t[i]);
                    return (r.prototype = t.prototype), (e.prototype = new r()), (e.__super__ = t.prototype), e;
                  }),
                    (e.Decorate = function (r, i) {
                      var e = u(i),
                        t = u(r);
                      function o() {
                        var e = Array.prototype.unshift,
                          t = i.prototype.constructor.length,
                          n = r.prototype.constructor;
                        0 < t && (e.call(arguments, r.prototype.constructor), (n = i.prototype.constructor)), n.apply(this, arguments);
                      }
                      (i.displayName = r.displayName),
                        (o.prototype = new (function () {
                          this.constructor = o;
                        })());
                      for (var n = 0; n < t.length; n++) {
                        var s = t[n];
                        o.prototype[s] = r.prototype[s];
                      }
                      function a(e) {
                        var t = function () {};
                        e in o.prototype && (t = o.prototype[e]);
                        var n = i.prototype[e];
                        return function () {
                          return Array.prototype.unshift.call(arguments, t), n.apply(this, arguments);
                        };
                      }
                      for (var l = 0; l < e.length; l++) {
                        var c = e[l];
                        o.prototype[c] = a(c);
                      }
                      return o;
                    });
                  function t() {
                    this.listeners = {};
                  }
                  return (
                    (t.prototype.on = function (e, t) {
                      (this.listeners = this.listeners || {}), e in this.listeners ? this.listeners[e].push(t) : (this.listeners[e] = [t]);
                    }),
                    (t.prototype.trigger = function (e) {
                      var t = Array.prototype.slice,
                        n = t.call(arguments, 1);
                      (this.listeners = this.listeners || {}), null == n && (n = []), 0 === n.length && n.push({}), (n[0]._type = e) in this.listeners && this.invoke(this.listeners[e], t.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
                    }),
                    (t.prototype.invoke = function (e, t) {
                      for (var n = 0, r = e.length; n < r; n++) e[n].apply(this, t);
                    }),
                    (e.Observable = t),
                    (e.generateChars = function (e) {
                      for (var t = "", n = 0; n < e; n++) {
                        t += Math.floor(36 * Math.random()).toString(36);
                      }
                      return t;
                    }),
                    (e.bind = function (e, t) {
                      return function () {
                        e.apply(t, arguments);
                      };
                    }),
                    (e._convertData = function (e) {
                      for (var t in e) {
                        var n = t.split("-"),
                          r = e;
                        if (1 !== n.length) {
                          for (var i = 0; i < n.length; i++) {
                            var o = n[i];
                            (o = o.substring(0, 1).toLowerCase() + o.substring(1)) in r || (r[o] = {}), i == n.length - 1 && (r[o] = e[t]), (r = r[o]);
                          }
                          delete e[t];
                        }
                      }
                      return e;
                    }),
                    (e.hasScroll = function (e, t) {
                      var n = o(t),
                        r = t.style.overflowX,
                        i = t.style.overflowY;
                      return (r !== i || ("hidden" !== i && "visible" !== i)) && ("scroll" === r || "scroll" === i || n.innerHeight() < t.scrollHeight || n.innerWidth() < t.scrollWidth);
                    }),
                    (e.escapeMarkup = function (e) {
                      var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                      return "string" != typeof e
                        ? e
                        : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                            return t[e];
                          });
                    }),
                    (e.appendMany = function (e, t) {
                      if ("1.7" === o.fn.jquery.substr(0, 3)) {
                        var n = o();
                        o.map(t, function (e) {
                          n = n.add(e);
                        }),
                          (t = n);
                      }
                      e.append(t);
                    }),
                    e
                  );
                }),
                e.define("select2/results", ["jquery", "./utils"], function (p, e) {
                  function r(e, t, n) {
                    (this.$element = e), (this.data = n), (this.options = t), r.__super__.constructor.call(this);
                  }
                  return (
                    e.Extend(r, e.Observable),
                    (r.prototype.render = function () {
                      var e = p('<ul class="select2-results__options" role="tree"></ul>');
                      return this.options.get("multiple") && e.attr("aria-multiselectable", "true"), (this.$results = e);
                    }),
                    (r.prototype.clear = function () {
                      this.$results.empty();
                    }),
                    (r.prototype.displayMessage = function (e) {
                      var t = this.options.get("escapeMarkup");
                      this.clear(), this.hideLoading();
                      var n = p('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                        r = this.options.get("translations").get(e.message);
                      n.append(t(r(e.args))), (n[0].className += " select2-results__message"), this.$results.append(n);
                    }),
                    (r.prototype.hideMessages = function () {
                      this.$results.find(".select2-results__message").remove();
                    }),
                    (r.prototype.append = function (e) {
                      this.hideLoading();
                      var t = [];
                      if (null != e.results && 0 !== e.results.length) {
                        e.results = this.sort(e.results);
                        for (var n = 0; n < e.results.length; n++) {
                          var r = e.results[n],
                            i = this.option(r);
                          t.push(i);
                        }
                        this.$results.append(t);
                      } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" });
                    }),
                    (r.prototype.position = function (e, t) {
                      t.find(".select2-results").append(e);
                    }),
                    (r.prototype.sort = function (e) {
                      return this.options.get("sorter")(e);
                    }),
                    (r.prototype.highlightFirstItem = function () {
                      var e = this.$results.find(".select2-results__option[aria-selected]"),
                        t = e.filter("[aria-selected=true]");
                      0 < t.length ? t.first().trigger("mouseenter") : e.first().trigger("mouseenter"), this.ensureHighlightVisible();
                    }),
                    (r.prototype.setClasses = function () {
                      var t = this;
                      this.data.current(function (e) {
                        var r = p.map(e, function (e) {
                          return e.id.toString();
                        });
                        t.$results.find(".select2-results__option[aria-selected]").each(function () {
                          var e = p(this),
                            t = p.data(this, "data"),
                            n = "" + t.id;
                          (null != t.element && t.element.selected) || (null == t.element && -1 < p.inArray(n, r)) ? e.attr("aria-selected", "true") : e.attr("aria-selected", "false");
                        });
                      });
                    }),
                    (r.prototype.showLoading = function (e) {
                      this.hideLoading();
                      var t = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(e) },
                        n = this.option(t);
                      (n.className += " loading-results"), this.$results.prepend(n);
                    }),
                    (r.prototype.hideLoading = function () {
                      this.$results.find(".loading-results").remove();
                    }),
                    (r.prototype.option = function (e) {
                      var t = document.createElement("li");
                      t.className = "select2-results__option";
                      var n = { role: "treeitem", "aria-selected": "false" };
                      for (var r in (e.disabled && (delete n["aria-selected"], (n["aria-disabled"] = "true")), null == e.id && delete n["aria-selected"], null != e._resultId && (t.id = e._resultId), e.title && (t.title = e.title), e.children && ((n.role = "group"), (n["aria-label"] = e.text), delete n["aria-selected"]), n)) {
                        var i = n[r];
                        t.setAttribute(r, i);
                      }
                      if (e.children) {
                        var o = p(t),
                          s = document.createElement("strong");
                        s.className = "select2-results__group";
                        p(s);
                        this.template(e, s);
                        for (var a = [], l = 0; l < e.children.length; l++) {
                          var c = e.children[l],
                            u = this.option(c);
                          a.push(u);
                        }
                        var d = p("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                        d.append(a), o.append(s), o.append(d);
                      } else this.template(e, t);
                      return p.data(t, "data", e), t;
                    }),
                    (r.prototype.bind = function (t, e) {
                      var l = this,
                        n = t.id + "-results";
                      this.$results.attr("id", n),
                        t.on("results:all", function (e) {
                          l.clear(), l.append(e.data), t.isOpen() && (l.setClasses(), l.highlightFirstItem());
                        }),
                        t.on("results:append", function (e) {
                          l.append(e.data), t.isOpen() && l.setClasses();
                        }),
                        t.on("query", function (e) {
                          l.hideMessages(), l.showLoading(e);
                        }),
                        t.on("select", function () {
                          t.isOpen() && (l.setClasses(), l.highlightFirstItem());
                        }),
                        t.on("unselect", function () {
                          t.isOpen() && (l.setClasses(), l.highlightFirstItem());
                        }),
                        t.on("open", function () {
                          l.$results.attr("aria-expanded", "true"), l.$results.attr("aria-hidden", "false"), l.setClasses(), l.ensureHighlightVisible();
                        }),
                        t.on("close", function () {
                          l.$results.attr("aria-expanded", "false"), l.$results.attr("aria-hidden", "true"), l.$results.removeAttr("aria-activedescendant");
                        }),
                        t.on("results:toggle", function () {
                          var e = l.getHighlightedResults();
                          0 !== e.length && e.trigger("mouseup");
                        }),
                        t.on("results:select", function () {
                          var e = l.getHighlightedResults();
                          if (0 !== e.length) {
                            var t = e.data("data");
                            "true" == e.attr("aria-selected") ? l.trigger("close", {}) : l.trigger("select", { data: t });
                          }
                        }),
                        t.on("results:previous", function () {
                          var e = l.getHighlightedResults(),
                            t = l.$results.find("[aria-selected]"),
                            n = t.index(e);
                          if (0 !== n) {
                            var r = n - 1;
                            0 === e.length && (r = 0);
                            var i = t.eq(r);
                            i.trigger("mouseenter");
                            var o = l.$results.offset().top,
                              s = i.offset().top,
                              a = l.$results.scrollTop() + (s - o);
                            0 === r ? l.$results.scrollTop(0) : s - o < 0 && l.$results.scrollTop(a);
                          }
                        }),
                        t.on("results:next", function () {
                          var e = l.getHighlightedResults(),
                            t = l.$results.find("[aria-selected]"),
                            n = t.index(e) + 1;
                          if (!(n >= t.length)) {
                            var r = t.eq(n);
                            r.trigger("mouseenter");
                            var i = l.$results.offset().top + l.$results.outerHeight(!1),
                              o = r.offset().top + r.outerHeight(!1),
                              s = l.$results.scrollTop() + o - i;
                            0 === n ? l.$results.scrollTop(0) : i < o && l.$results.scrollTop(s);
                          }
                        }),
                        t.on("results:focus", function (e) {
                          e.element.addClass("select2-results__option--highlighted");
                        }),
                        t.on("results:message", function (e) {
                          l.displayMessage(e);
                        }),
                        p.fn.mousewheel &&
                          this.$results.on("mousewheel", function (e) {
                            var t = l.$results.scrollTop(),
                              n = l.$results.get(0).scrollHeight - t + e.deltaY,
                              r = 0 < e.deltaY && t - e.deltaY <= 0,
                              i = e.deltaY < 0 && n <= l.$results.height();
                            r ? (l.$results.scrollTop(0), e.preventDefault(), e.stopPropagation()) : i && (l.$results.scrollTop(l.$results.get(0).scrollHeight - l.$results.height()), e.preventDefault(), e.stopPropagation());
                          }),
                        this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (e) {
                          var t = p(this),
                            n = t.data("data");
                          "true" !== t.attr("aria-selected") ? l.trigger("select", { originalEvent: e, data: n }) : l.options.get("multiple") ? l.trigger("unselect", { originalEvent: e, data: n }) : l.trigger("close", {});
                        }),
                        this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (e) {
                          var t = p(this).data("data");
                          l.getHighlightedResults().removeClass("select2-results__option--highlighted"), l.trigger("results:focus", { data: t, element: p(this) });
                        });
                    }),
                    (r.prototype.getHighlightedResults = function () {
                      return this.$results.find(".select2-results__option--highlighted");
                    }),
                    (r.prototype.destroy = function () {
                      this.$results.remove();
                    }),
                    (r.prototype.ensureHighlightVisible = function () {
                      var e = this.getHighlightedResults();
                      if (0 !== e.length) {
                        var t = this.$results.find("[aria-selected]").index(e),
                          n = this.$results.offset().top,
                          r = e.offset().top,
                          i = this.$results.scrollTop() + (r - n),
                          o = r - n;
                        (i -= 2 * e.outerHeight(!1)), t <= 2 ? this.$results.scrollTop(0) : (o > this.$results.outerHeight() || o < 0) && this.$results.scrollTop(i);
                      }
                    }),
                    (r.prototype.template = function (e, t) {
                      var n = this.options.get("templateResult"),
                        r = this.options.get("escapeMarkup"),
                        i = n(e, t);
                      null == i ? (t.style.display = "none") : "string" == typeof i ? (t.innerHTML = r(i)) : p(t).append(i);
                    }),
                    r
                  );
                }),
                e.define("select2/keys", [], function () {
                  return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
                }),
                e.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (n, e, i) {
                  function r(e, t) {
                    (this.$element = e), (this.options = t), r.__super__.constructor.call(this);
                  }
                  return (
                    e.Extend(r, e.Observable),
                    (r.prototype.render = function () {
                      var e = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                      return (this._tabindex = 0), null != this.$element.data("old-tabindex") ? (this._tabindex = this.$element.data("old-tabindex")) : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), e.attr("title", this.$element.attr("title")), e.attr("tabindex", this._tabindex), (this.$selection = e);
                    }),
                    (r.prototype.bind = function (e, t) {
                      var n = this,
                        r = (e.id, e.id + "-results");
                      (this.container = e),
                        this.$selection.on("focus", function (e) {
                          n.trigger("focus", e);
                        }),
                        this.$selection.on("blur", function (e) {
                          n._handleBlur(e);
                        }),
                        this.$selection.on("keydown", function (e) {
                          n.trigger("keypress", e), e.which === i.SPACE && e.preventDefault();
                        }),
                        e.on("results:focus", function (e) {
                          n.$selection.attr("aria-activedescendant", e.data._resultId);
                        }),
                        e.on("selection:update", function (e) {
                          n.update(e.data);
                        }),
                        e.on("open", function () {
                          n.$selection.attr("aria-expanded", "true"), n.$selection.attr("aria-owns", r), n._attachCloseHandler(e);
                        }),
                        e.on("close", function () {
                          n.$selection.attr("aria-expanded", "false"), n.$selection.removeAttr("aria-activedescendant"), n.$selection.removeAttr("aria-owns"), n.$selection.focus(), n._detachCloseHandler(e);
                        }),
                        e.on("enable", function () {
                          n.$selection.attr("tabindex", n._tabindex);
                        }),
                        e.on("disable", function () {
                          n.$selection.attr("tabindex", "-1");
                        });
                    }),
                    (r.prototype._handleBlur = function (e) {
                      var t = this;
                      window.setTimeout(function () {
                        document.activeElement == t.$selection[0] || n.contains(t.$selection[0], document.activeElement) || t.trigger("blur", e);
                      }, 1);
                    }),
                    (r.prototype._attachCloseHandler = function (e) {
                      n(document.body).on("mousedown.select2." + e.id, function (e) {
                        var t = n(e.target).closest(".select2");
                        n(".select2.select2-container--open").each(function () {
                          var e = n(this);
                          this != t[0] && e.data("element").select2("close");
                        });
                      });
                    }),
                    (r.prototype._detachCloseHandler = function (e) {
                      n(document.body).off("mousedown.select2." + e.id);
                    }),
                    (r.prototype.position = function (e, t) {
                      t.find(".selection").append(e);
                    }),
                    (r.prototype.destroy = function () {
                      this._detachCloseHandler(this.container);
                    }),
                    (r.prototype.update = function (e) {
                      throw new Error("The `update` method must be defined in child classes.");
                    }),
                    r
                  );
                }),
                e.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (e, t, n, r) {
                  function i() {
                    i.__super__.constructor.apply(this, arguments);
                  }
                  return (
                    n.Extend(i, t),
                    (i.prototype.render = function () {
                      var e = i.__super__.render.call(this);
                      return e.addClass("select2-selection--single"), e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), e;
                    }),
                    (i.prototype.bind = function (t, e) {
                      var n = this;
                      i.__super__.bind.apply(this, arguments);
                      var r = t.id + "-container";
                      this.$selection.find(".select2-selection__rendered").attr("id", r),
                        this.$selection.attr("aria-labelledby", r),
                        this.$selection.on("mousedown", function (e) {
                          1 === e.which && n.trigger("toggle", { originalEvent: e });
                        }),
                        this.$selection.on("focus", function (e) {}),
                        this.$selection.on("blur", function (e) {}),
                        t.on("focus", function (e) {
                          t.isOpen() || n.$selection.focus();
                        }),
                        t.on("selection:update", function (e) {
                          n.update(e.data);
                        });
                    }),
                    (i.prototype.clear = function () {
                      this.$selection.find(".select2-selection__rendered").empty();
                    }),
                    (i.prototype.display = function (e, t) {
                      var n = this.options.get("templateSelection");
                      return this.options.get("escapeMarkup")(n(e, t));
                    }),
                    (i.prototype.selectionContainer = function () {
                      return e("<span></span>");
                    }),
                    (i.prototype.update = function (e) {
                      if (0 !== e.length) {
                        var t = e[0],
                          n = this.$selection.find(".select2-selection__rendered"),
                          r = this.display(t, n);
                        n.empty().append(r), n.prop("title", t.title || t.text);
                      } else this.clear();
                    }),
                    i
                  );
                }),
                e.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (r, e, a) {
                  function i(e, t) {
                    i.__super__.constructor.apply(this, arguments);
                  }
                  return (
                    a.Extend(i, e),
                    (i.prototype.render = function () {
                      var e = i.__super__.render.call(this);
                      return e.addClass("select2-selection--multiple"), e.html('<ul class="select2-selection__rendered"></ul>'), e;
                    }),
                    (i.prototype.bind = function (e, t) {
                      var n = this;
                      i.__super__.bind.apply(this, arguments),
                        this.$selection.on("click", function (e) {
                          n.trigger("toggle", { originalEvent: e });
                        }),
                        this.$selection.on("click", ".select2-selection__choice__remove", function (e) {
                          if (!n.options.get("disabled")) {
                            var t = r(this).parent().data("data");
                            n.trigger("unselect", { originalEvent: e, data: t });
                          }
                        });
                    }),
                    (i.prototype.clear = function () {
                      this.$selection.find(".select2-selection__rendered").empty();
                    }),
                    (i.prototype.display = function (e, t) {
                      var n = this.options.get("templateSelection");
                      return this.options.get("escapeMarkup")(n(e, t));
                    }),
                    (i.prototype.selectionContainer = function () {
                      return r('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                    }),
                    (i.prototype.update = function (e) {
                      if ((this.clear(), 0 !== e.length)) {
                        for (var t = [], n = 0; n < e.length; n++) {
                          var r = e[n],
                            i = this.selectionContainer(),
                            o = this.display(r, i);
                          i.append(o), i.prop("title", r.title || r.text), i.data("data", r), t.push(i);
                        }
                        var s = this.$selection.find(".select2-selection__rendered");
                        a.appendMany(s, t);
                      }
                    }),
                    i
                  );
                }),
                e.define("select2/selection/placeholder", ["../utils"], function (e) {
                  function t(e, t, n) {
                    (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))), e.call(this, t, n);
                  }
                  return (
                    (t.prototype.normalizePlaceholder = function (e, t) {
                      return "string" == typeof t && (t = { id: "", text: t }), t;
                    }),
                    (t.prototype.createPlaceholder = function (e, t) {
                      var n = this.selectionContainer();
                      return n.html(this.display(t)), n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), n;
                    }),
                    (t.prototype.update = function (e, t) {
                      var n = 1 == t.length && t[0].id != this.placeholder.id;
                      if (1 < t.length || n) return e.call(this, t);
                      this.clear();
                      var r = this.createPlaceholder(this.placeholder);
                      this.$selection.find(".select2-selection__rendered").append(r);
                    }),
                    t
                  );
                }),
                e.define("select2/selection/allowClear", ["jquery", "../keys"], function (r, i) {
                  function e() {}
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                        this.$selection.on("mousedown", ".select2-selection__clear", function (e) {
                          r._handleClear(e);
                        }),
                        t.on("keypress", function (e) {
                          r._handleKeyboardClear(e, t);
                        });
                    }),
                    (e.prototype._handleClear = function (e, t) {
                      if (!this.options.get("disabled")) {
                        var n = this.$selection.find(".select2-selection__clear");
                        if (0 !== n.length) {
                          t.stopPropagation();
                          for (var r = n.data("data"), i = 0; i < r.length; i++) {
                            var o = { data: r[i] };
                            if ((this.trigger("unselect", o), o.prevented)) return;
                          }
                          this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
                        }
                      }
                    }),
                    (e.prototype._handleKeyboardClear = function (e, t, n) {
                      n.isOpen() || (t.which != i.DELETE && t.which != i.BACKSPACE) || this._handleClear(t);
                    }),
                    (e.prototype.update = function (e, t) {
                      if ((e.call(this, t), !(0 < this.$selection.find(".select2-selection__placeholder").length || 0 === t.length))) {
                        var n = r('<span class="select2-selection__clear">&times;</span>');
                        n.data("data", t), this.$selection.find(".select2-selection__rendered").prepend(n);
                      }
                    }),
                    e
                  );
                }),
                e.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (r, e, s) {
                  function t(e, t, n) {
                    e.call(this, t, n);
                  }
                  return (
                    (t.prototype.render = function (e) {
                      var t = r('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
                      (this.$searchContainer = t), (this.$search = t.find("input"));
                      var n = e.call(this);
                      return this._transferTabIndex(), n;
                    }),
                    (t.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        t.on("open", function () {
                          r.$search.trigger("focus");
                        }),
                        t.on("close", function () {
                          r.$search.val(""), r.$search.removeAttr("aria-activedescendant"), r.$search.trigger("focus");
                        }),
                        t.on("enable", function () {
                          r.$search.prop("disabled", !1), r._transferTabIndex();
                        }),
                        t.on("disable", function () {
                          r.$search.prop("disabled", !0);
                        }),
                        t.on("focus", function (e) {
                          r.$search.trigger("focus");
                        }),
                        t.on("results:focus", function (e) {
                          r.$search.attr("aria-activedescendant", e.id);
                        }),
                        this.$selection.on("focusin", ".select2-search--inline", function (e) {
                          r.trigger("focus", e);
                        }),
                        this.$selection.on("focusout", ".select2-search--inline", function (e) {
                          r._handleBlur(e);
                        }),
                        this.$selection.on("keydown", ".select2-search--inline", function (e) {
                          if ((e.stopPropagation(), r.trigger("keypress", e), (r._keyUpPrevented = e.isDefaultPrevented()), e.which === s.BACKSPACE && "" === r.$search.val())) {
                            var t = r.$searchContainer.prev(".select2-selection__choice");
                            if (0 < t.length) {
                              var n = t.data("data");
                              r.searchRemoveChoice(n), e.preventDefault();
                            }
                          }
                        });
                      var i = document.documentMode,
                        o = i && i <= 11;
                      this.$selection.on("input.searchcheck", ".select2-search--inline", function (e) {
                        o ? r.$selection.off("input.search input.searchcheck") : r.$selection.off("keyup.search");
                      }),
                        this.$selection.on("keyup.search input.search", ".select2-search--inline", function (e) {
                          if (o && "input" === e.type) r.$selection.off("input.search input.searchcheck");
                          else {
                            var t = e.which;
                            t != s.SHIFT && t != s.CTRL && t != s.ALT && t != s.TAB && r.handleSearch(e);
                          }
                        });
                    }),
                    (t.prototype._transferTabIndex = function (e) {
                      this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
                    }),
                    (t.prototype.createPlaceholder = function (e, t) {
                      this.$search.attr("placeholder", t.text);
                    }),
                    (t.prototype.update = function (e, t) {
                      var n = this.$search[0] == document.activeElement;
                      this.$search.attr("placeholder", ""), e.call(this, t), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), n && this.$search.focus();
                    }),
                    (t.prototype.handleSearch = function () {
                      if ((this.resizeSearch(), !this._keyUpPrevented)) {
                        var e = this.$search.val();
                        this.trigger("query", { term: e });
                      }
                      this._keyUpPrevented = !1;
                    }),
                    (t.prototype.searchRemoveChoice = function (e, t) {
                      this.trigger("unselect", { data: t }), this.$search.val(t.text), this.handleSearch();
                    }),
                    (t.prototype.resizeSearch = function () {
                      this.$search.css("width", "25px");
                      var e = "";
                      "" !== this.$search.attr("placeholder") ? (e = this.$selection.find(".select2-selection__rendered").innerWidth()) : (e = 0.75 * (this.$search.val().length + 1) + "em");
                      this.$search.css("width", e);
                    }),
                    t
                  );
                }),
                e.define("select2/selection/eventRelay", ["jquery"], function (s) {
                  function e() {}
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      var r = this,
                        i = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                        o = ["opening", "closing", "selecting", "unselecting"];
                      e.call(this, t, n),
                        t.on("*", function (e, t) {
                          if (-1 !== s.inArray(e, i)) {
                            t = t || {};
                            var n = s.Event("select2:" + e, { params: t });
                            r.$element.trigger(n), -1 !== s.inArray(e, o) && (t.prevented = n.isDefaultPrevented());
                          }
                        });
                    }),
                    e
                  );
                }),
                e.define("select2/translation", ["jquery", "require"], function (t, n) {
                  function r(e) {
                    this.dict = e || {};
                  }
                  return (
                    (r.prototype.all = function () {
                      return this.dict;
                    }),
                    (r.prototype.get = function (e) {
                      return this.dict[e];
                    }),
                    (r.prototype.extend = function (e) {
                      this.dict = t.extend({}, e.all(), this.dict);
                    }),
                    (r._cache = {}),
                    (r.loadPath = function (e) {
                      if (!(e in r._cache)) {
                        var t = n(e);
                        r._cache[e] = t;
                      }
                      return new r(r._cache[e]);
                    }),
                    r
                  );
                }),
                e.define("select2/diacritics", [], function () {
                  return {
                    "Ⓐ": "A",
                    Ａ: "A",
                    À: "A",
                    Á: "A",
                    Â: "A",
                    Ầ: "A",
                    Ấ: "A",
                    Ẫ: "A",
                    Ẩ: "A",
                    Ã: "A",
                    Ā: "A",
                    Ă: "A",
                    Ằ: "A",
                    Ắ: "A",
                    Ẵ: "A",
                    Ẳ: "A",
                    Ȧ: "A",
                    Ǡ: "A",
                    Ä: "A",
                    Ǟ: "A",
                    Ả: "A",
                    Å: "A",
                    Ǻ: "A",
                    Ǎ: "A",
                    Ȁ: "A",
                    Ȃ: "A",
                    Ạ: "A",
                    Ậ: "A",
                    Ặ: "A",
                    Ḁ: "A",
                    Ą: "A",
                    Ⱥ: "A",
                    Ɐ: "A",
                    Ꜳ: "AA",
                    Æ: "AE",
                    Ǽ: "AE",
                    Ǣ: "AE",
                    Ꜵ: "AO",
                    Ꜷ: "AU",
                    Ꜹ: "AV",
                    Ꜻ: "AV",
                    Ꜽ: "AY",
                    "Ⓑ": "B",
                    Ｂ: "B",
                    Ḃ: "B",
                    Ḅ: "B",
                    Ḇ: "B",
                    Ƀ: "B",
                    Ƃ: "B",
                    Ɓ: "B",
                    "Ⓒ": "C",
                    Ｃ: "C",
                    Ć: "C",
                    Ĉ: "C",
                    Ċ: "C",
                    Č: "C",
                    Ç: "C",
                    Ḉ: "C",
                    Ƈ: "C",
                    Ȼ: "C",
                    Ꜿ: "C",
                    "Ⓓ": "D",
                    Ｄ: "D",
                    Ḋ: "D",
                    Ď: "D",
                    Ḍ: "D",
                    Ḑ: "D",
                    Ḓ: "D",
                    Ḏ: "D",
                    Đ: "D",
                    Ƌ: "D",
                    Ɗ: "D",
                    Ɖ: "D",
                    Ꝺ: "D",
                    Ǳ: "DZ",
                    Ǆ: "DZ",
                    ǲ: "Dz",
                    ǅ: "Dz",
                    "Ⓔ": "E",
                    Ｅ: "E",
                    È: "E",
                    É: "E",
                    Ê: "E",
                    Ề: "E",
                    Ế: "E",
                    Ễ: "E",
                    Ể: "E",
                    Ẽ: "E",
                    Ē: "E",
                    Ḕ: "E",
                    Ḗ: "E",
                    Ĕ: "E",
                    Ė: "E",
                    Ë: "E",
                    Ẻ: "E",
                    Ě: "E",
                    Ȅ: "E",
                    Ȇ: "E",
                    Ẹ: "E",
                    Ệ: "E",
                    Ȩ: "E",
                    Ḝ: "E",
                    Ę: "E",
                    Ḙ: "E",
                    Ḛ: "E",
                    Ɛ: "E",
                    Ǝ: "E",
                    "Ⓕ": "F",
                    Ｆ: "F",
                    Ḟ: "F",
                    Ƒ: "F",
                    Ꝼ: "F",
                    "Ⓖ": "G",
                    Ｇ: "G",
                    Ǵ: "G",
                    Ĝ: "G",
                    Ḡ: "G",
                    Ğ: "G",
                    Ġ: "G",
                    Ǧ: "G",
                    Ģ: "G",
                    Ǥ: "G",
                    Ɠ: "G",
                    Ꞡ: "G",
                    Ᵹ: "G",
                    Ꝿ: "G",
                    "Ⓗ": "H",
                    Ｈ: "H",
                    Ĥ: "H",
                    Ḣ: "H",
                    Ḧ: "H",
                    Ȟ: "H",
                    Ḥ: "H",
                    Ḩ: "H",
                    Ḫ: "H",
                    Ħ: "H",
                    Ⱨ: "H",
                    Ⱶ: "H",
                    Ɥ: "H",
                    "Ⓘ": "I",
                    Ｉ: "I",
                    Ì: "I",
                    Í: "I",
                    Î: "I",
                    Ĩ: "I",
                    Ī: "I",
                    Ĭ: "I",
                    İ: "I",
                    Ï: "I",
                    Ḯ: "I",
                    Ỉ: "I",
                    Ǐ: "I",
                    Ȉ: "I",
                    Ȋ: "I",
                    Ị: "I",
                    Į: "I",
                    Ḭ: "I",
                    Ɨ: "I",
                    "Ⓙ": "J",
                    Ｊ: "J",
                    Ĵ: "J",
                    Ɉ: "J",
                    "Ⓚ": "K",
                    Ｋ: "K",
                    Ḱ: "K",
                    Ǩ: "K",
                    Ḳ: "K",
                    Ķ: "K",
                    Ḵ: "K",
                    Ƙ: "K",
                    Ⱪ: "K",
                    Ꝁ: "K",
                    Ꝃ: "K",
                    Ꝅ: "K",
                    Ꞣ: "K",
                    "Ⓛ": "L",
                    Ｌ: "L",
                    Ŀ: "L",
                    Ĺ: "L",
                    Ľ: "L",
                    Ḷ: "L",
                    Ḹ: "L",
                    Ļ: "L",
                    Ḽ: "L",
                    Ḻ: "L",
                    Ł: "L",
                    Ƚ: "L",
                    Ɫ: "L",
                    Ⱡ: "L",
                    Ꝉ: "L",
                    Ꝇ: "L",
                    Ꞁ: "L",
                    Ǉ: "LJ",
                    ǈ: "Lj",
                    "Ⓜ": "M",
                    Ｍ: "M",
                    Ḿ: "M",
                    Ṁ: "M",
                    Ṃ: "M",
                    Ɱ: "M",
                    Ɯ: "M",
                    "Ⓝ": "N",
                    Ｎ: "N",
                    Ǹ: "N",
                    Ń: "N",
                    Ñ: "N",
                    Ṅ: "N",
                    Ň: "N",
                    Ṇ: "N",
                    Ņ: "N",
                    Ṋ: "N",
                    Ṉ: "N",
                    Ƞ: "N",
                    Ɲ: "N",
                    Ꞑ: "N",
                    Ꞥ: "N",
                    Ǌ: "NJ",
                    ǋ: "Nj",
                    "Ⓞ": "O",
                    Ｏ: "O",
                    Ò: "O",
                    Ó: "O",
                    Ô: "O",
                    Ồ: "O",
                    Ố: "O",
                    Ỗ: "O",
                    Ổ: "O",
                    Õ: "O",
                    Ṍ: "O",
                    Ȭ: "O",
                    Ṏ: "O",
                    Ō: "O",
                    Ṑ: "O",
                    Ṓ: "O",
                    Ŏ: "O",
                    Ȯ: "O",
                    Ȱ: "O",
                    Ö: "O",
                    Ȫ: "O",
                    Ỏ: "O",
                    Ő: "O",
                    Ǒ: "O",
                    Ȍ: "O",
                    Ȏ: "O",
                    Ơ: "O",
                    Ờ: "O",
                    Ớ: "O",
                    Ỡ: "O",
                    Ở: "O",
                    Ợ: "O",
                    Ọ: "O",
                    Ộ: "O",
                    Ǫ: "O",
                    Ǭ: "O",
                    Ø: "O",
                    Ǿ: "O",
                    Ɔ: "O",
                    Ɵ: "O",
                    Ꝋ: "O",
                    Ꝍ: "O",
                    Ƣ: "OI",
                    Ꝏ: "OO",
                    Ȣ: "OU",
                    "Ⓟ": "P",
                    Ｐ: "P",
                    Ṕ: "P",
                    Ṗ: "P",
                    Ƥ: "P",
                    Ᵽ: "P",
                    Ꝑ: "P",
                    Ꝓ: "P",
                    Ꝕ: "P",
                    "Ⓠ": "Q",
                    Ｑ: "Q",
                    Ꝗ: "Q",
                    Ꝙ: "Q",
                    Ɋ: "Q",
                    "Ⓡ": "R",
                    Ｒ: "R",
                    Ŕ: "R",
                    Ṙ: "R",
                    Ř: "R",
                    Ȑ: "R",
                    Ȓ: "R",
                    Ṛ: "R",
                    Ṝ: "R",
                    Ŗ: "R",
                    Ṟ: "R",
                    Ɍ: "R",
                    Ɽ: "R",
                    Ꝛ: "R",
                    Ꞧ: "R",
                    Ꞃ: "R",
                    "Ⓢ": "S",
                    Ｓ: "S",
                    ẞ: "S",
                    Ś: "S",
                    Ṥ: "S",
                    Ŝ: "S",
                    Ṡ: "S",
                    Š: "S",
                    Ṧ: "S",
                    Ṣ: "S",
                    Ṩ: "S",
                    Ș: "S",
                    Ş: "S",
                    Ȿ: "S",
                    Ꞩ: "S",
                    Ꞅ: "S",
                    "Ⓣ": "T",
                    Ｔ: "T",
                    Ṫ: "T",
                    Ť: "T",
                    Ṭ: "T",
                    Ț: "T",
                    Ţ: "T",
                    Ṱ: "T",
                    Ṯ: "T",
                    Ŧ: "T",
                    Ƭ: "T",
                    Ʈ: "T",
                    Ⱦ: "T",
                    Ꞇ: "T",
                    Ꜩ: "TZ",
                    "Ⓤ": "U",
                    Ｕ: "U",
                    Ù: "U",
                    Ú: "U",
                    Û: "U",
                    Ũ: "U",
                    Ṹ: "U",
                    Ū: "U",
                    Ṻ: "U",
                    Ŭ: "U",
                    Ü: "U",
                    Ǜ: "U",
                    Ǘ: "U",
                    Ǖ: "U",
                    Ǚ: "U",
                    Ủ: "U",
                    Ů: "U",
                    Ű: "U",
                    Ǔ: "U",
                    Ȕ: "U",
                    Ȗ: "U",
                    Ư: "U",
                    Ừ: "U",
                    Ứ: "U",
                    Ữ: "U",
                    Ử: "U",
                    Ự: "U",
                    Ụ: "U",
                    Ṳ: "U",
                    Ų: "U",
                    Ṷ: "U",
                    Ṵ: "U",
                    Ʉ: "U",
                    "Ⓥ": "V",
                    Ｖ: "V",
                    Ṽ: "V",
                    Ṿ: "V",
                    Ʋ: "V",
                    Ꝟ: "V",
                    Ʌ: "V",
                    Ꝡ: "VY",
                    "Ⓦ": "W",
                    Ｗ: "W",
                    Ẁ: "W",
                    Ẃ: "W",
                    Ŵ: "W",
                    Ẇ: "W",
                    Ẅ: "W",
                    Ẉ: "W",
                    Ⱳ: "W",
                    "Ⓧ": "X",
                    Ｘ: "X",
                    Ẋ: "X",
                    Ẍ: "X",
                    "Ⓨ": "Y",
                    Ｙ: "Y",
                    Ỳ: "Y",
                    Ý: "Y",
                    Ŷ: "Y",
                    Ỹ: "Y",
                    Ȳ: "Y",
                    Ẏ: "Y",
                    Ÿ: "Y",
                    Ỷ: "Y",
                    Ỵ: "Y",
                    Ƴ: "Y",
                    Ɏ: "Y",
                    Ỿ: "Y",
                    "Ⓩ": "Z",
                    Ｚ: "Z",
                    Ź: "Z",
                    Ẑ: "Z",
                    Ż: "Z",
                    Ž: "Z",
                    Ẓ: "Z",
                    Ẕ: "Z",
                    Ƶ: "Z",
                    Ȥ: "Z",
                    Ɀ: "Z",
                    Ⱬ: "Z",
                    Ꝣ: "Z",
                    "ⓐ": "a",
                    ａ: "a",
                    ẚ: "a",
                    à: "a",
                    á: "a",
                    â: "a",
                    ầ: "a",
                    ấ: "a",
                    ẫ: "a",
                    ẩ: "a",
                    ã: "a",
                    ā: "a",
                    ă: "a",
                    ằ: "a",
                    ắ: "a",
                    ẵ: "a",
                    ẳ: "a",
                    ȧ: "a",
                    ǡ: "a",
                    ä: "a",
                    ǟ: "a",
                    ả: "a",
                    å: "a",
                    ǻ: "a",
                    ǎ: "a",
                    ȁ: "a",
                    ȃ: "a",
                    ạ: "a",
                    ậ: "a",
                    ặ: "a",
                    ḁ: "a",
                    ą: "a",
                    ⱥ: "a",
                    ɐ: "a",
                    ꜳ: "aa",
                    æ: "ae",
                    ǽ: "ae",
                    ǣ: "ae",
                    ꜵ: "ao",
                    ꜷ: "au",
                    ꜹ: "av",
                    ꜻ: "av",
                    ꜽ: "ay",
                    "ⓑ": "b",
                    ｂ: "b",
                    ḃ: "b",
                    ḅ: "b",
                    ḇ: "b",
                    ƀ: "b",
                    ƃ: "b",
                    ɓ: "b",
                    "ⓒ": "c",
                    ｃ: "c",
                    ć: "c",
                    ĉ: "c",
                    ċ: "c",
                    č: "c",
                    ç: "c",
                    ḉ: "c",
                    ƈ: "c",
                    ȼ: "c",
                    ꜿ: "c",
                    ↄ: "c",
                    "ⓓ": "d",
                    ｄ: "d",
                    ḋ: "d",
                    ď: "d",
                    ḍ: "d",
                    ḑ: "d",
                    ḓ: "d",
                    ḏ: "d",
                    đ: "d",
                    ƌ: "d",
                    ɖ: "d",
                    ɗ: "d",
                    ꝺ: "d",
                    ǳ: "dz",
                    ǆ: "dz",
                    "ⓔ": "e",
                    ｅ: "e",
                    è: "e",
                    é: "e",
                    ê: "e",
                    ề: "e",
                    ế: "e",
                    ễ: "e",
                    ể: "e",
                    ẽ: "e",
                    ē: "e",
                    ḕ: "e",
                    ḗ: "e",
                    ĕ: "e",
                    ė: "e",
                    ë: "e",
                    ẻ: "e",
                    ě: "e",
                    ȅ: "e",
                    ȇ: "e",
                    ẹ: "e",
                    ệ: "e",
                    ȩ: "e",
                    ḝ: "e",
                    ę: "e",
                    ḙ: "e",
                    ḛ: "e",
                    ɇ: "e",
                    ɛ: "e",
                    ǝ: "e",
                    "ⓕ": "f",
                    ｆ: "f",
                    ḟ: "f",
                    ƒ: "f",
                    ꝼ: "f",
                    "ⓖ": "g",
                    ｇ: "g",
                    ǵ: "g",
                    ĝ: "g",
                    ḡ: "g",
                    ğ: "g",
                    ġ: "g",
                    ǧ: "g",
                    ģ: "g",
                    ǥ: "g",
                    ɠ: "g",
                    ꞡ: "g",
                    ᵹ: "g",
                    ꝿ: "g",
                    "ⓗ": "h",
                    ｈ: "h",
                    ĥ: "h",
                    ḣ: "h",
                    ḧ: "h",
                    ȟ: "h",
                    ḥ: "h",
                    ḩ: "h",
                    ḫ: "h",
                    ẖ: "h",
                    ħ: "h",
                    ⱨ: "h",
                    ⱶ: "h",
                    ɥ: "h",
                    ƕ: "hv",
                    "ⓘ": "i",
                    ｉ: "i",
                    ì: "i",
                    í: "i",
                    î: "i",
                    ĩ: "i",
                    ī: "i",
                    ĭ: "i",
                    ï: "i",
                    ḯ: "i",
                    ỉ: "i",
                    ǐ: "i",
                    ȉ: "i",
                    ȋ: "i",
                    ị: "i",
                    į: "i",
                    ḭ: "i",
                    ɨ: "i",
                    ı: "i",
                    "ⓙ": "j",
                    ｊ: "j",
                    ĵ: "j",
                    ǰ: "j",
                    ɉ: "j",
                    "ⓚ": "k",
                    ｋ: "k",
                    ḱ: "k",
                    ǩ: "k",
                    ḳ: "k",
                    ķ: "k",
                    ḵ: "k",
                    ƙ: "k",
                    ⱪ: "k",
                    ꝁ: "k",
                    ꝃ: "k",
                    ꝅ: "k",
                    ꞣ: "k",
                    "ⓛ": "l",
                    ｌ: "l",
                    ŀ: "l",
                    ĺ: "l",
                    ľ: "l",
                    ḷ: "l",
                    ḹ: "l",
                    ļ: "l",
                    ḽ: "l",
                    ḻ: "l",
                    ſ: "l",
                    ł: "l",
                    ƚ: "l",
                    ɫ: "l",
                    ⱡ: "l",
                    ꝉ: "l",
                    ꞁ: "l",
                    ꝇ: "l",
                    ǉ: "lj",
                    "ⓜ": "m",
                    ｍ: "m",
                    ḿ: "m",
                    ṁ: "m",
                    ṃ: "m",
                    ɱ: "m",
                    ɯ: "m",
                    "ⓝ": "n",
                    ｎ: "n",
                    ǹ: "n",
                    ń: "n",
                    ñ: "n",
                    ṅ: "n",
                    ň: "n",
                    ṇ: "n",
                    ņ: "n",
                    ṋ: "n",
                    ṉ: "n",
                    ƞ: "n",
                    ɲ: "n",
                    ŉ: "n",
                    ꞑ: "n",
                    ꞥ: "n",
                    ǌ: "nj",
                    "ⓞ": "o",
                    ｏ: "o",
                    ò: "o",
                    ó: "o",
                    ô: "o",
                    ồ: "o",
                    ố: "o",
                    ỗ: "o",
                    ổ: "o",
                    õ: "o",
                    ṍ: "o",
                    ȭ: "o",
                    ṏ: "o",
                    ō: "o",
                    ṑ: "o",
                    ṓ: "o",
                    ŏ: "o",
                    ȯ: "o",
                    ȱ: "o",
                    ö: "o",
                    ȫ: "o",
                    ỏ: "o",
                    ő: "o",
                    ǒ: "o",
                    ȍ: "o",
                    ȏ: "o",
                    ơ: "o",
                    ờ: "o",
                    ớ: "o",
                    ỡ: "o",
                    ở: "o",
                    ợ: "o",
                    ọ: "o",
                    ộ: "o",
                    ǫ: "o",
                    ǭ: "o",
                    ø: "o",
                    ǿ: "o",
                    ɔ: "o",
                    ꝋ: "o",
                    ꝍ: "o",
                    ɵ: "o",
                    ƣ: "oi",
                    ȣ: "ou",
                    ꝏ: "oo",
                    "ⓟ": "p",
                    ｐ: "p",
                    ṕ: "p",
                    ṗ: "p",
                    ƥ: "p",
                    ᵽ: "p",
                    ꝑ: "p",
                    ꝓ: "p",
                    ꝕ: "p",
                    "ⓠ": "q",
                    ｑ: "q",
                    ɋ: "q",
                    ꝗ: "q",
                    ꝙ: "q",
                    "ⓡ": "r",
                    ｒ: "r",
                    ŕ: "r",
                    ṙ: "r",
                    ř: "r",
                    ȑ: "r",
                    ȓ: "r",
                    ṛ: "r",
                    ṝ: "r",
                    ŗ: "r",
                    ṟ: "r",
                    ɍ: "r",
                    ɽ: "r",
                    ꝛ: "r",
                    ꞧ: "r",
                    ꞃ: "r",
                    "ⓢ": "s",
                    ｓ: "s",
                    ß: "s",
                    ś: "s",
                    ṥ: "s",
                    ŝ: "s",
                    ṡ: "s",
                    š: "s",
                    ṧ: "s",
                    ṣ: "s",
                    ṩ: "s",
                    ș: "s",
                    ş: "s",
                    ȿ: "s",
                    ꞩ: "s",
                    ꞅ: "s",
                    ẛ: "s",
                    "ⓣ": "t",
                    ｔ: "t",
                    ṫ: "t",
                    ẗ: "t",
                    ť: "t",
                    ṭ: "t",
                    ț: "t",
                    ţ: "t",
                    ṱ: "t",
                    ṯ: "t",
                    ŧ: "t",
                    ƭ: "t",
                    ʈ: "t",
                    ⱦ: "t",
                    ꞇ: "t",
                    ꜩ: "tz",
                    "ⓤ": "u",
                    ｕ: "u",
                    ù: "u",
                    ú: "u",
                    û: "u",
                    ũ: "u",
                    ṹ: "u",
                    ū: "u",
                    ṻ: "u",
                    ŭ: "u",
                    ü: "u",
                    ǜ: "u",
                    ǘ: "u",
                    ǖ: "u",
                    ǚ: "u",
                    ủ: "u",
                    ů: "u",
                    ű: "u",
                    ǔ: "u",
                    ȕ: "u",
                    ȗ: "u",
                    ư: "u",
                    ừ: "u",
                    ứ: "u",
                    ữ: "u",
                    ử: "u",
                    ự: "u",
                    ụ: "u",
                    ṳ: "u",
                    ų: "u",
                    ṷ: "u",
                    ṵ: "u",
                    ʉ: "u",
                    "ⓥ": "v",
                    ｖ: "v",
                    ṽ: "v",
                    ṿ: "v",
                    ʋ: "v",
                    ꝟ: "v",
                    ʌ: "v",
                    ꝡ: "vy",
                    "ⓦ": "w",
                    ｗ: "w",
                    ẁ: "w",
                    ẃ: "w",
                    ŵ: "w",
                    ẇ: "w",
                    ẅ: "w",
                    ẘ: "w",
                    ẉ: "w",
                    ⱳ: "w",
                    "ⓧ": "x",
                    ｘ: "x",
                    ẋ: "x",
                    ẍ: "x",
                    "ⓨ": "y",
                    ｙ: "y",
                    ỳ: "y",
                    ý: "y",
                    ŷ: "y",
                    ỹ: "y",
                    ȳ: "y",
                    ẏ: "y",
                    ÿ: "y",
                    ỷ: "y",
                    ẙ: "y",
                    ỵ: "y",
                    ƴ: "y",
                    ɏ: "y",
                    ỿ: "y",
                    "ⓩ": "z",
                    ｚ: "z",
                    ź: "z",
                    ẑ: "z",
                    ż: "z",
                    ž: "z",
                    ẓ: "z",
                    ẕ: "z",
                    ƶ: "z",
                    ȥ: "z",
                    ɀ: "z",
                    ⱬ: "z",
                    ꝣ: "z",
                    Ά: "Α",
                    Έ: "Ε",
                    Ή: "Η",
                    Ί: "Ι",
                    Ϊ: "Ι",
                    Ό: "Ο",
                    Ύ: "Υ",
                    Ϋ: "Υ",
                    Ώ: "Ω",
                    ά: "α",
                    έ: "ε",
                    ή: "η",
                    ί: "ι",
                    ϊ: "ι",
                    ΐ: "ι",
                    ό: "ο",
                    ύ: "υ",
                    ϋ: "υ",
                    ΰ: "υ",
                    ω: "ω",
                    ς: "σ",
                  };
                }),
                e.define("select2/data/base", ["../utils"], function (r) {
                  function n(e, t) {
                    n.__super__.constructor.call(this);
                  }
                  return (
                    r.Extend(n, r.Observable),
                    (n.prototype.current = function (e) {
                      throw new Error("The `current` method must be defined in child classes.");
                    }),
                    (n.prototype.query = function (e, t) {
                      throw new Error("The `query` method must be defined in child classes.");
                    }),
                    (n.prototype.bind = function (e, t) {}),
                    (n.prototype.destroy = function () {}),
                    (n.prototype.generateResultId = function (e, t) {
                      var n = e.id + "-result-";
                      return (n += r.generateChars(4)), null != t.id ? (n += "-" + t.id.toString()) : (n += "-" + r.generateChars(4)), n;
                    }),
                    n
                  );
                }),
                e.define("select2/data/select", ["./base", "../utils", "jquery"], function (e, t, a) {
                  function n(e, t) {
                    (this.$element = e), (this.options = t), n.__super__.constructor.call(this);
                  }
                  return (
                    t.Extend(n, e),
                    (n.prototype.current = function (e) {
                      var n = [],
                        r = this;
                      this.$element.find(":selected").each(function () {
                        var e = a(this),
                          t = r.item(e);
                        n.push(t);
                      }),
                        e(n);
                    }),
                    (n.prototype.select = function (i) {
                      var o = this;
                      if (((i.selected = !0), a(i.element).is("option"))) return (i.element.selected = !0), void this.$element.trigger("change");
                      if (this.$element.prop("multiple"))
                        this.current(function (e) {
                          var t = [];
                          (i = [i]).push.apply(i, e);
                          for (var n = 0; n < i.length; n++) {
                            var r = i[n].id;
                            -1 === a.inArray(r, t) && t.push(r);
                          }
                          o.$element.val(t), o.$element.trigger("change");
                        });
                      else {
                        var e = i.id;
                        this.$element.val(e), this.$element.trigger("change");
                      }
                    }),
                    (n.prototype.unselect = function (i) {
                      var o = this;
                      if (this.$element.prop("multiple")) {
                        if (((i.selected = !1), a(i.element).is("option"))) return (i.element.selected = !1), void this.$element.trigger("change");
                        this.current(function (e) {
                          for (var t = [], n = 0; n < e.length; n++) {
                            var r = e[n].id;
                            r !== i.id && -1 === a.inArray(r, t) && t.push(r);
                          }
                          o.$element.val(t), o.$element.trigger("change");
                        });
                      }
                    }),
                    (n.prototype.bind = function (e, t) {
                      var n = this;
                      (this.container = e).on("select", function (e) {
                        n.select(e.data);
                      }),
                        e.on("unselect", function (e) {
                          n.unselect(e.data);
                        });
                    }),
                    (n.prototype.destroy = function () {
                      this.$element.find("*").each(function () {
                        a.removeData(this, "data");
                      });
                    }),
                    (n.prototype.query = function (r, e) {
                      var i = [],
                        o = this;
                      this.$element.children().each(function () {
                        var e = a(this);
                        if (e.is("option") || e.is("optgroup")) {
                          var t = o.item(e),
                            n = o.matches(r, t);
                          null !== n && i.push(n);
                        }
                      }),
                        e({ results: i });
                    }),
                    (n.prototype.addOptions = function (e) {
                      t.appendMany(this.$element, e);
                    }),
                    (n.prototype.option = function (e) {
                      var t;
                      e.children ? ((t = document.createElement("optgroup")).label = e.text) : void 0 !== (t = document.createElement("option")).textContent ? (t.textContent = e.text) : (t.innerText = e.text), e.id && (t.value = e.id), e.disabled && (t.disabled = !0), e.selected && (t.selected = !0), e.title && (t.title = e.title);
                      var n = a(t),
                        r = this._normalizeItem(e);
                      return (r.element = t), a.data(t, "data", r), n;
                    }),
                    (n.prototype.item = function (e) {
                      var t = {};
                      if (null != (t = a.data(e[0], "data"))) return t;
                      if (e.is("option")) t = { id: e.val(), text: e.text(), disabled: e.prop("disabled"), selected: e.prop("selected"), title: e.prop("title") };
                      else if (e.is("optgroup")) {
                        t = { text: e.prop("label"), children: [], title: e.prop("title") };
                        for (var n = e.children("option"), r = [], i = 0; i < n.length; i++) {
                          var o = a(n[i]),
                            s = this.item(o);
                          r.push(s);
                        }
                        t.children = r;
                      }
                      return ((t = this._normalizeItem(t)).element = e[0]), a.data(e[0], "data", t), t;
                    }),
                    (n.prototype._normalizeItem = function (e) {
                      a.isPlainObject(e) || (e = { id: e, text: e });
                      return null != (e = a.extend({}, { text: "" }, e)).id && (e.id = e.id.toString()), null != e.text && (e.text = e.text.toString()), null == e._resultId && e.id && null != this.container && (e._resultId = this.generateResultId(this.container, e)), a.extend({}, { selected: !1, disabled: !1 }, e);
                    }),
                    (n.prototype.matches = function (e, t) {
                      return this.options.get("matcher")(e, t);
                    }),
                    n
                  );
                }),
                e.define("select2/data/array", ["./select", "../utils", "jquery"], function (e, h, g) {
                  function r(e, t) {
                    var n = t.get("data") || [];
                    r.__super__.constructor.call(this, e, t), this.addOptions(this.convertToOptions(n));
                  }
                  return (
                    h.Extend(r, e),
                    (r.prototype.select = function (n) {
                      var e = this.$element.find("option").filter(function (e, t) {
                        return t.value == n.id.toString();
                      });
                      0 === e.length && ((e = this.option(n)), this.addOptions(e)), r.__super__.select.call(this, n);
                    }),
                    (r.prototype.convertToOptions = function (e) {
                      var t = this,
                        n = this.$element.find("option"),
                        r = n
                          .map(function () {
                            return t.item(g(this)).id;
                          })
                          .get(),
                        i = [];
                      function o(e) {
                        return function () {
                          return g(this).val() == e.id;
                        };
                      }
                      for (var s = 0; s < e.length; s++) {
                        var a = this._normalizeItem(e[s]);
                        if (0 <= g.inArray(a.id, r)) {
                          var l = n.filter(o(a)),
                            c = this.item(l),
                            u = g.extend(!0, {}, a, c),
                            d = this.option(u);
                          l.replaceWith(d);
                        } else {
                          var p = this.option(a);
                          if (a.children) {
                            var f = this.convertToOptions(a.children);
                            h.appendMany(p, f);
                          }
                          i.push(p);
                        }
                      }
                      return i;
                    }),
                    r
                  );
                }),
                e.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (e, t, o) {
                  function n(e, t) {
                    (this.ajaxOptions = this._applyDefaults(t.get("ajax"))), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), n.__super__.constructor.call(this, e, t);
                  }
                  return (
                    t.Extend(n, e),
                    (n.prototype._applyDefaults = function (e) {
                      var t = {
                        data: function (e) {
                          return o.extend({}, e, { q: e.term });
                        },
                        transport: function (e, t, n) {
                          var r = o.ajax(e);
                          return r.then(t), r.fail(n), r;
                        },
                      };
                      return o.extend({}, t, e, !0);
                    }),
                    (n.prototype.processResults = function (e) {
                      return e;
                    }),
                    (n.prototype.query = function (n, r) {
                      var i = this;
                      null != this._request && (o.isFunction(this._request.abort) && this._request.abort(), (this._request = null));
                      var t = o.extend({ type: "GET" }, this.ajaxOptions);
                      function e() {
                        var e = t.transport(
                          t,
                          function (e) {
                            var t = i.processResults(e, n);
                            i.options.get("debug") && window.console && console.error && ((t && t.results && o.isArray(t.results)) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), r(t);
                          },
                          function () {
                            (e.status && "0" === e.status) || i.trigger("results:message", { message: "errorLoading" });
                          }
                        );
                        i._request = e;
                      }
                      "function" == typeof t.url && (t.url = t.url.call(this.$element, n)), "function" == typeof t.data && (t.data = t.data.call(this.$element, n)), this.ajaxOptions.delay && null != n.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), (this._queryTimeout = window.setTimeout(e, this.ajaxOptions.delay))) : e();
                    }),
                    n
                  );
                }),
                e.define("select2/data/tags", ["jquery"], function (u) {
                  function e(e, t, n) {
                    var r = n.get("tags"),
                      i = n.get("createTag");
                    void 0 !== i && (this.createTag = i);
                    var o = n.get("insertTag");
                    if ((void 0 !== o && (this.insertTag = o), e.call(this, t, n), u.isArray(r)))
                      for (var s = 0; s < r.length; s++) {
                        var a = r[s],
                          l = this._normalizeItem(a),
                          c = this.option(l);
                        this.$element.append(c);
                      }
                  }
                  return (
                    (e.prototype.query = function (e, c, u) {
                      var d = this;
                      this._removeOldTags(),
                        null != c.term && null == c.page
                          ? e.call(this, c, function e(t, n) {
                              for (var r = t.results, i = 0; i < r.length; i++) {
                                var o = r[i],
                                  s = null != o.children && !e({ results: o.children }, !0);
                                if (o.text === c.term || s) return !n && ((t.data = r), void u(t));
                              }
                              if (n) return !0;
                              var a = d.createTag(c);
                              if (null != a) {
                                var l = d.option(a);
                                l.attr("data-select2-tag", !0), d.addOptions([l]), d.insertTag(r, a);
                              }
                              (t.results = r), u(t);
                            })
                          : e.call(this, c, u);
                    }),
                    (e.prototype.createTag = function (e, t) {
                      var n = u.trim(t.term);
                      return "" === n ? null : { id: n, text: n };
                    }),
                    (e.prototype.insertTag = function (e, t, n) {
                      t.unshift(n);
                    }),
                    (e.prototype._removeOldTags = function (e) {
                      this._lastTag;
                      this.$element.find("option[data-select2-tag]").each(function () {
                        this.selected || u(this).remove();
                      });
                    }),
                    e
                  );
                }),
                e.define("select2/data/tokenizer", ["jquery"], function (d) {
                  function e(e, t, n) {
                    var r = n.get("tokenizer");
                    void 0 !== r && (this.tokenizer = r), e.call(this, t, n);
                  }
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      e.call(this, t, n), (this.$search = t.dropdown.$search || t.selection.$search || n.find(".select2-search__field"));
                    }),
                    (e.prototype.query = function (e, t, n) {
                      var i = this;
                      t.term = t.term || "";
                      var r = this.tokenizer(t, this.options, function (e) {
                        var t,
                          n = i._normalizeItem(e);
                        if (
                          !i.$element.find("option").filter(function () {
                            return d(this).val() === n.id;
                          }).length
                        ) {
                          var r = i.option(n);
                          r.attr("data-select2-tag", !0), i._removeOldTags(), i.addOptions([r]);
                        }
                        (t = n), i.trigger("select", { data: t });
                      });
                      r.term !== t.term && (this.$search.length && (this.$search.val(r.term), this.$search.focus()), (t.term = r.term)), e.call(this, t, n);
                    }),
                    (e.prototype.tokenizer = function (e, t, n, r) {
                      for (
                        var i = n.get("tokenSeparators") || [],
                          o = t.term,
                          s = 0,
                          a =
                            this.createTag ||
                            function (e) {
                              return { id: e.term, text: e.term };
                            };
                        s < o.length;

                      ) {
                        var l = o[s];
                        if (-1 !== d.inArray(l, i)) {
                          var c = o.substr(0, s),
                            u = a(d.extend({}, t, { term: c }));
                          null != u ? (r(u), (o = o.substr(s + 1) || ""), (s = 0)) : s++;
                        } else s++;
                      }
                      return { term: o };
                    }),
                    e
                  );
                }),
                e.define("select2/data/minimumInputLength", [], function () {
                  function e(e, t, n) {
                    (this.minimumInputLength = n.get("minimumInputLength")), e.call(this, t, n);
                  }
                  return (
                    (e.prototype.query = function (e, t, n) {
                      (t.term = t.term || ""), t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : e.call(this, t, n);
                    }),
                    e
                  );
                }),
                e.define("select2/data/maximumInputLength", [], function () {
                  function e(e, t, n) {
                    (this.maximumInputLength = n.get("maximumInputLength")), e.call(this, t, n);
                  }
                  return (
                    (e.prototype.query = function (e, t, n) {
                      (t.term = t.term || ""), 0 < this.maximumInputLength && t.term.length > this.maximumInputLength ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } }) : e.call(this, t, n);
                    }),
                    e
                  );
                }),
                e.define("select2/data/maximumSelectionLength", [], function () {
                  function e(e, t, n) {
                    (this.maximumSelectionLength = n.get("maximumSelectionLength")), e.call(this, t, n);
                  }
                  return (
                    (e.prototype.query = function (n, r, i) {
                      var o = this;
                      this.current(function (e) {
                        var t = null != e ? e.length : 0;
                        0 < o.maximumSelectionLength && t >= o.maximumSelectionLength ? o.trigger("results:message", { message: "maximumSelected", args: { maximum: o.maximumSelectionLength } }) : n.call(o, r, i);
                      });
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
                  function n(e, t) {
                    (this.$element = e), (this.options = t), n.__super__.constructor.call(this);
                  }
                  return (
                    e.Extend(n, e.Observable),
                    (n.prototype.render = function () {
                      var e = t('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                      return e.attr("dir", this.options.get("dir")), (this.$dropdown = e);
                    }),
                    (n.prototype.bind = function () {}),
                    (n.prototype.position = function (e, t) {}),
                    (n.prototype.destroy = function () {
                      this.$dropdown.remove();
                    }),
                    n
                  );
                }),
                e.define("select2/dropdown/search", ["jquery", "../utils"], function (i, e) {
                  function t() {}
                  return (
                    (t.prototype.render = function (e) {
                      var t = e.call(this),
                        n = i('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                      return (this.$searchContainer = n), (this.$search = n.find("input")), t.prepend(n), t;
                    }),
                    (t.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        this.$search.on("keydown", function (e) {
                          r.trigger("keypress", e), (r._keyUpPrevented = e.isDefaultPrevented());
                        }),
                        this.$search.on("input", function (e) {
                          i(this).off("keyup");
                        }),
                        this.$search.on("keyup input", function (e) {
                          r.handleSearch(e);
                        }),
                        t.on("open", function () {
                          r.$search.attr("tabindex", 0),
                            r.$search.focus(),
                            window.setTimeout(function () {
                              r.$search.focus();
                            }, 0);
                        }),
                        t.on("close", function () {
                          r.$search.attr("tabindex", -1), r.$search.val("");
                        }),
                        t.on("focus", function () {
                          t.isOpen() && r.$search.focus();
                        }),
                        t.on("results:all", function (e) {
                          (null != e.query.term && "" !== e.query.term) || (r.showSearch(e) ? r.$searchContainer.removeClass("select2-search--hide") : r.$searchContainer.addClass("select2-search--hide"));
                        });
                    }),
                    (t.prototype.handleSearch = function (e) {
                      if (!this._keyUpPrevented) {
                        var t = this.$search.val();
                        this.trigger("query", { term: t });
                      }
                      this._keyUpPrevented = !1;
                    }),
                    (t.prototype.showSearch = function (e, t) {
                      return !0;
                    }),
                    t
                  );
                }),
                e.define("select2/dropdown/hidePlaceholder", [], function () {
                  function e(e, t, n, r) {
                    (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))), e.call(this, t, n, r);
                  }
                  return (
                    (e.prototype.append = function (e, t) {
                      (t.results = this.removePlaceholder(t.results)), e.call(this, t);
                    }),
                    (e.prototype.normalizePlaceholder = function (e, t) {
                      return "string" == typeof t && (t = { id: "", text: t }), t;
                    }),
                    (e.prototype.removePlaceholder = function (e, t) {
                      for (var n = t.slice(0), r = t.length - 1; 0 <= r; r--) {
                        var i = t[r];
                        this.placeholder.id === i.id && n.splice(r, 1);
                      }
                      return n;
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown/infiniteScroll", ["jquery"], function (i) {
                  function e(e, t, n, r) {
                    (this.lastParams = {}), e.call(this, t, n, r), (this.$loadingMore = this.createLoadingMore()), (this.loading = !1);
                  }
                  return (
                    (e.prototype.append = function (e, t) {
                      this.$loadingMore.remove(), (this.loading = !1), e.call(this, t), this.showLoadingMore(t) && this.$results.append(this.$loadingMore);
                    }),
                    (e.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        t.on("query", function (e) {
                          (r.lastParams = e), (r.loading = !0);
                        }),
                        t.on("query:append", function (e) {
                          (r.lastParams = e), (r.loading = !0);
                        }),
                        this.$results.on("scroll", function () {
                          var e = i.contains(document.documentElement, r.$loadingMore[0]);
                          if (!r.loading && e) {
                            var t = r.$results.offset().top + r.$results.outerHeight(!1);
                            r.$loadingMore.offset().top + r.$loadingMore.outerHeight(!1) <= t + 50 && r.loadMore();
                          }
                        });
                    }),
                    (e.prototype.loadMore = function () {
                      this.loading = !0;
                      var e = i.extend({}, { page: 1 }, this.lastParams);
                      e.page++, this.trigger("query:append", e);
                    }),
                    (e.prototype.showLoadingMore = function (e, t) {
                      return t.pagination && t.pagination.more;
                    }),
                    (e.prototype.createLoadingMore = function () {
                      var e = i('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                        t = this.options.get("translations").get("loadingMore");
                      return e.html(t(this.lastParams)), e;
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (h, a) {
                  function e(e, t, n) {
                    (this.$dropdownParent = n.get("dropdownParent") || h(document.body)), e.call(this, t, n);
                  }
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      var r = this,
                        i = !1;
                      e.call(this, t, n),
                        t.on("open", function () {
                          r._showDropdown(),
                            r._attachPositioningHandler(t),
                            i ||
                              ((i = !0),
                              t.on("results:all", function () {
                                r._positionDropdown(), r._resizeDropdown();
                              }),
                              t.on("results:append", function () {
                                r._positionDropdown(), r._resizeDropdown();
                              }));
                        }),
                        t.on("close", function () {
                          r._hideDropdown(), r._detachPositioningHandler(t);
                        }),
                        this.$dropdownContainer.on("mousedown", function (e) {
                          e.stopPropagation();
                        });
                    }),
                    (e.prototype.destroy = function (e) {
                      e.call(this), this.$dropdownContainer.remove();
                    }),
                    (e.prototype.position = function (e, t, n) {
                      t.attr("class", n.attr("class")), t.removeClass("select2"), t.addClass("select2-container--open"), t.css({ position: "absolute", top: -999999 }), (this.$container = n);
                    }),
                    (e.prototype.render = function (e) {
                      var t = h("<span></span>"),
                        n = e.call(this);
                      return t.append(n), (this.$dropdownContainer = t);
                    }),
                    (e.prototype._hideDropdown = function (e) {
                      this.$dropdownContainer.detach();
                    }),
                    (e.prototype._attachPositioningHandler = function (e, t) {
                      var n = this,
                        r = "scroll.select2." + t.id,
                        i = "resize.select2." + t.id,
                        o = "orientationchange.select2." + t.id,
                        s = this.$container.parents().filter(a.hasScroll);
                      s.each(function () {
                        h(this).data("select2-scroll-position", { x: h(this).scrollLeft(), y: h(this).scrollTop() });
                      }),
                        s.on(r, function (e) {
                          var t = h(this).data("select2-scroll-position");
                          h(this).scrollTop(t.y);
                        }),
                        h(window).on(r + " " + i + " " + o, function (e) {
                          n._positionDropdown(), n._resizeDropdown();
                        });
                    }),
                    (e.prototype._detachPositioningHandler = function (e, t) {
                      var n = "scroll.select2." + t.id,
                        r = "resize.select2." + t.id,
                        i = "orientationchange.select2." + t.id;
                      this.$container.parents().filter(a.hasScroll).off(n), h(window).off(n + " " + r + " " + i);
                    }),
                    (e.prototype._positionDropdown = function () {
                      var e = h(window),
                        t = this.$dropdown.hasClass("select2-dropdown--above"),
                        n = this.$dropdown.hasClass("select2-dropdown--below"),
                        r = null,
                        i = this.$container.offset();
                      i.bottom = i.top + this.$container.outerHeight(!1);
                      var o = { height: this.$container.outerHeight(!1) };
                      (o.top = i.top), (o.bottom = i.top + o.height);
                      var s = this.$dropdown.outerHeight(!1),
                        a = e.scrollTop(),
                        l = e.scrollTop() + e.height(),
                        c = a < i.top - s,
                        u = l > i.bottom + s,
                        d = { left: i.left, top: o.bottom },
                        p = this.$dropdownParent;
                      "static" === p.css("position") && (p = p.offsetParent());
                      var f = p.offset();
                      (d.top -= f.top), (d.left -= f.left), t || n || (r = "below"), u || !c || t ? !c && u && t && (r = "below") : (r = "above"), ("above" == r || (t && "below" !== r)) && (d.top = o.top - f.top - s), null != r && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + r), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + r)), this.$dropdownContainer.css(d);
                    }),
                    (e.prototype._resizeDropdown = function () {
                      var e = { width: this.$container.outerWidth(!1) + "px" };
                      this.options.get("dropdownAutoWidth") && ((e.minWidth = e.width), (e.position = "relative"), (e.width = "auto")), this.$dropdown.css(e);
                    }),
                    (e.prototype._showDropdown = function (e) {
                      this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown/minimumResultsForSearch", [], function () {
                  function e(e, t, n, r) {
                    (this.minimumResultsForSearch = n.get("minimumResultsForSearch")), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), e.call(this, t, n, r);
                  }
                  return (
                    (e.prototype.showSearch = function (e, t) {
                      return (
                        !(
                          (function e(t) {
                            for (var n = 0, r = 0; r < t.length; r++) {
                              var i = t[r];
                              i.children ? (n += e(i.children)) : n++;
                            }
                            return n;
                          })(t.data.results) < this.minimumResultsForSearch
                        ) && e.call(this, t)
                      );
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown/selectOnClose", [], function () {
                  function e() {}
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        t.on("close", function (e) {
                          r._handleSelectOnClose(e);
                        });
                    }),
                    (e.prototype._handleSelectOnClose = function (e, t) {
                      if (t && null != t.originalSelect2Event) {
                        var n = t.originalSelect2Event;
                        if ("select" === n._type || "unselect" === n._type) return;
                      }
                      var r = this.getHighlightedResults();
                      if (!(r.length < 1)) {
                        var i = r.data("data");
                        (null != i.element && i.element.selected) || (null == i.element && i.selected) || this.trigger("select", { data: i });
                      }
                    }),
                    e
                  );
                }),
                e.define("select2/dropdown/closeOnSelect", [], function () {
                  function e() {}
                  return (
                    (e.prototype.bind = function (e, t, n) {
                      var r = this;
                      e.call(this, t, n),
                        t.on("select", function (e) {
                          r._selectTriggered(e);
                        }),
                        t.on("unselect", function (e) {
                          r._selectTriggered(e);
                        });
                    }),
                    (e.prototype._selectTriggered = function (e, t) {
                      var n = t.originalEvent;
                      (n && n.ctrlKey) || this.trigger("close", { originalEvent: n, originalSelect2Event: t });
                    }),
                    e
                  );
                }),
                e.define("select2/i18n/en", [], function () {
                  return {
                    errorLoading: function () {
                      return "The results could not be loaded.";
                    },
                    inputTooLong: function (e) {
                      var t = e.input.length - e.maximum,
                        n = "Please delete " + t + " character";
                      return 1 != t && (n += "s"), n;
                    },
                    inputTooShort: function (e) {
                      return "Please enter " + (e.minimum - e.input.length) + " or more characters";
                    },
                    loadingMore: function () {
                      return "Loading more results…";
                    },
                    maximumSelected: function (e) {
                      var t = "You can only select " + e.maximum + " item";
                      return 1 != e.maximum && (t += "s"), t;
                    },
                    noResults: function () {
                      return "No results found";
                    },
                    searching: function () {
                      return "Searching…";
                    },
                  };
                }),
                e.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (h, g, v, m, y, b, x, w, _, T, E, t, S, C, j, k, A, $, O, D, N, q, L, P, I, R, H, M, e) {
                  function n() {
                    this.reset();
                  }
                  return (
                    (n.prototype.apply = function (t) {
                      if (null == (t = h.extend(!0, {}, this.defaults, t)).dataAdapter) {
                        if ((null != t.ajax ? (t.dataAdapter = j) : null != t.data ? (t.dataAdapter = C) : (t.dataAdapter = S), 0 < t.minimumInputLength && (t.dataAdapter = T.Decorate(t.dataAdapter, $)), 0 < t.maximumInputLength && (t.dataAdapter = T.Decorate(t.dataAdapter, O)), 0 < t.maximumSelectionLength && (t.dataAdapter = T.Decorate(t.dataAdapter, D)), t.tags && (t.dataAdapter = T.Decorate(t.dataAdapter, k)), (null == t.tokenSeparators && null == t.tokenizer) || (t.dataAdapter = T.Decorate(t.dataAdapter, A)), null != t.query)) {
                          var e = g(t.amdBase + "compat/query");
                          t.dataAdapter = T.Decorate(t.dataAdapter, e);
                        }
                        if (null != t.initSelection) {
                          var n = g(t.amdBase + "compat/initSelection");
                          t.dataAdapter = T.Decorate(t.dataAdapter, n);
                        }
                      }
                      if ((null == t.resultsAdapter && ((t.resultsAdapter = v), null != t.ajax && (t.resultsAdapter = T.Decorate(t.resultsAdapter, P)), null != t.placeholder && (t.resultsAdapter = T.Decorate(t.resultsAdapter, L)), t.selectOnClose && (t.resultsAdapter = T.Decorate(t.resultsAdapter, H))), null == t.dropdownAdapter)) {
                        if (t.multiple) t.dropdownAdapter = N;
                        else {
                          var r = T.Decorate(N, q);
                          t.dropdownAdapter = r;
                        }
                        if ((0 !== t.minimumResultsForSearch && (t.dropdownAdapter = T.Decorate(t.dropdownAdapter, R)), t.closeOnSelect && (t.dropdownAdapter = T.Decorate(t.dropdownAdapter, M)), null != t.dropdownCssClass || null != t.dropdownCss || null != t.adaptDropdownCssClass)) {
                          var i = g(t.amdBase + "compat/dropdownCss");
                          t.dropdownAdapter = T.Decorate(t.dropdownAdapter, i);
                        }
                        t.dropdownAdapter = T.Decorate(t.dropdownAdapter, I);
                      }
                      if (null == t.selectionAdapter) {
                        if ((t.multiple ? (t.selectionAdapter = y) : (t.selectionAdapter = m), null != t.placeholder && (t.selectionAdapter = T.Decorate(t.selectionAdapter, b)), t.allowClear && (t.selectionAdapter = T.Decorate(t.selectionAdapter, x)), t.multiple && (t.selectionAdapter = T.Decorate(t.selectionAdapter, w)), null != t.containerCssClass || null != t.containerCss || null != t.adaptContainerCssClass)) {
                          var o = g(t.amdBase + "compat/containerCss");
                          t.selectionAdapter = T.Decorate(t.selectionAdapter, o);
                        }
                        t.selectionAdapter = T.Decorate(t.selectionAdapter, _);
                      }
                      if ("string" == typeof t.language)
                        if (0 < t.language.indexOf("-")) {
                          var s = t.language.split("-")[0];
                          t.language = [t.language, s];
                        } else t.language = [t.language];
                      if (h.isArray(t.language)) {
                        var a = new E();
                        t.language.push("en");
                        for (var l = t.language, c = 0; c < l.length; c++) {
                          var u = l[c],
                            d = {};
                          try {
                            d = E.loadPath(u);
                          } catch (e) {
                            try {
                              (u = this.defaults.amdLanguageBase + u), (d = E.loadPath(u));
                            } catch (e) {
                              t.debug && window.console && console.warn && console.warn('Select2: The language file for "' + u + '" could not be automatically loaded. A fallback will be used instead.');
                              continue;
                            }
                          }
                          a.extend(d);
                        }
                        t.translations = a;
                      } else {
                        var p = E.loadPath(this.defaults.amdLanguageBase + "en"),
                          f = new E(t.language);
                        f.extend(p), (t.translations = f);
                      }
                      return t;
                    }),
                    (n.prototype.reset = function () {
                      function a(e) {
                        return e.replace(/[^\u0000-\u007E]/g, function (e) {
                          return t[e] || e;
                        });
                      }
                      this.defaults = {
                        amdBase: "./",
                        amdLanguageBase: "./i18n/",
                        closeOnSelect: !0,
                        debug: !1,
                        dropdownAutoWidth: !1,
                        escapeMarkup: T.escapeMarkup,
                        language: e,
                        matcher: function e(t, n) {
                          if ("" === h.trim(t.term)) return n;
                          if (n.children && 0 < n.children.length) {
                            for (var r = h.extend(!0, {}, n), i = n.children.length - 1; 0 <= i; i--) null == e(t, n.children[i]) && r.children.splice(i, 1);
                            return 0 < r.children.length ? r : e(t, r);
                          }
                          var o = a(n.text).toUpperCase(),
                            s = a(t.term).toUpperCase();
                          return -1 < o.indexOf(s) ? n : null;
                        },
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: !1,
                        sorter: function (e) {
                          return e;
                        },
                        templateResult: function (e) {
                          return e.text;
                        },
                        templateSelection: function (e) {
                          return e.text;
                        },
                        theme: "default",
                        width: "resolve",
                      };
                    }),
                    (n.prototype.set = function (e, t) {
                      var n = {};
                      n[h.camelCase(e)] = t;
                      var r = T._convertData(n);
                      h.extend(this.defaults, r);
                    }),
                    new n()
                  );
                }),
                e.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (r, o, i, s) {
                  function e(e, t) {
                    if (((this.options = e), null != t && this.fromElement(t), (this.options = i.apply(this.options)), t && t.is("input"))) {
                      var n = r(this.get("amdBase") + "compat/inputData");
                      this.options.dataAdapter = s.Decorate(this.options.dataAdapter, n);
                    }
                  }
                  return (
                    (e.prototype.fromElement = function (e) {
                      var t = ["select2"];
                      null == this.options.multiple && (this.options.multiple = e.prop("multiple")), null == this.options.disabled && (this.options.disabled = e.prop("disabled")), null == this.options.language && (e.prop("lang") ? (this.options.language = e.prop("lang").toLowerCase()) : e.closest("[lang]").prop("lang") && (this.options.language = e.closest("[lang]").prop("lang"))), null == this.options.dir && (e.prop("dir") ? (this.options.dir = e.prop("dir")) : e.closest("[dir]").prop("dir") ? (this.options.dir = e.closest("[dir]").prop("dir")) : (this.options.dir = "ltr")), e.prop("disabled", this.options.disabled), e.prop("multiple", this.options.multiple), e.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), e.data("data", e.data("select2Tags")), e.data("tags", !0)), e.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), e.attr("ajax--url", e.data("ajaxUrl")), e.data("ajax--url", e.data("ajaxUrl")));
                      var n = {};
                      n = o.fn.jquery && "1." == o.fn.jquery.substr(0, 2) && e[0].dataset ? o.extend(!0, {}, e[0].dataset, e.data()) : e.data();
                      var r = o.extend(!0, {}, n);
                      for (var i in (r = s._convertData(r))) -1 < o.inArray(i, t) || (o.isPlainObject(this.options[i]) ? o.extend(this.options[i], r[i]) : (this.options[i] = r[i]));
                      return this;
                    }),
                    (e.prototype.get = function (e) {
                      return this.options[e];
                    }),
                    (e.prototype.set = function (e, t) {
                      this.options[e] = t;
                    }),
                    e
                  );
                }),
                e.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (i, c, n, r) {
                  var u = function (e, t) {
                    null != e.data("select2") && e.data("select2").destroy(), (this.$element = e), (this.id = this._generateId(e)), (t = t || {}), (this.options = new c(t, e)), u.__super__.constructor.call(this);
                    var n = e.attr("tabindex") || 0;
                    e.data("old-tabindex", n), e.attr("tabindex", "-1");
                    var r = this.options.get("dataAdapter");
                    this.dataAdapter = new r(e, this.options);
                    var i = this.render();
                    this._placeContainer(i);
                    var o = this.options.get("selectionAdapter");
                    (this.selection = new o(e, this.options)), (this.$selection = this.selection.render()), this.selection.position(this.$selection, i);
                    var s = this.options.get("dropdownAdapter");
                    (this.dropdown = new s(e, this.options)), (this.$dropdown = this.dropdown.render()), this.dropdown.position(this.$dropdown, i);
                    var a = this.options.get("resultsAdapter");
                    (this.results = new a(e, this.options, this.dataAdapter)), (this.$results = this.results.render()), this.results.position(this.$results, this.$dropdown);
                    var l = this;
                    this._bindAdapters(),
                      this._registerDomEvents(),
                      this._registerDataEvents(),
                      this._registerSelectionEvents(),
                      this._registerDropdownEvents(),
                      this._registerResultsEvents(),
                      this._registerEvents(),
                      this.dataAdapter.current(function (e) {
                        l.trigger("selection:update", { data: e });
                      }),
                      e.addClass("select2-hidden-accessible"),
                      e.attr("aria-hidden", "true"),
                      this._syncAttributes(),
                      e.data("select2", this);
                  };
                  return (
                    n.Extend(u, n.Observable),
                    (u.prototype._generateId = function (e) {
                      return "select2-" + (null != e.attr("id") ? e.attr("id") : null != e.attr("name") ? e.attr("name") + "-" + n.generateChars(2) : n.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "");
                    }),
                    (u.prototype._placeContainer = function (e) {
                      e.insertAfter(this.$element);
                      var t = this._resolveWidth(this.$element, this.options.get("width"));
                      null != t && e.css("width", t);
                    }),
                    (u.prototype._resolveWidth = function (e, t) {
                      var n = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                      if ("resolve" == t) {
                        var r = this._resolveWidth(e, "style");
                        return null != r ? r : this._resolveWidth(e, "element");
                      }
                      if ("element" == t) {
                        var i = e.outerWidth(!1);
                        return i <= 0 ? "auto" : i + "px";
                      }
                      if ("style" != t) return t;
                      var o = e.attr("style");
                      if ("string" != typeof o) return null;
                      for (var s = o.split(";"), a = 0, l = s.length; a < l; a += 1) {
                        var c = s[a].replace(/\s/g, "").match(n);
                        if (null !== c && 1 <= c.length) return c[1];
                      }
                      return null;
                    }),
                    (u.prototype._bindAdapters = function () {
                      this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
                    }),
                    (u.prototype._registerDomEvents = function () {
                      var t = this;
                      this.$element.on("change.select2", function () {
                        t.dataAdapter.current(function (e) {
                          t.trigger("selection:update", { data: e });
                        });
                      }),
                        this.$element.on("focus.select2", function (e) {
                          t.trigger("focus", e);
                        }),
                        (this._syncA = n.bind(this._syncAttributes, this)),
                        (this._syncS = n.bind(this._syncSubtree, this)),
                        this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                      var e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                      null != e
                        ? ((this._observer = new e(function (e) {
                            i.each(e, t._syncA), i.each(e, t._syncS);
                          })),
                          this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 }))
                        : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", t._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", t._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", t._syncS, !1));
                    }),
                    (u.prototype._registerDataEvents = function () {
                      var n = this;
                      this.dataAdapter.on("*", function (e, t) {
                        n.trigger(e, t);
                      });
                    }),
                    (u.prototype._registerSelectionEvents = function () {
                      var n = this,
                        r = ["toggle", "focus"];
                      this.selection.on("toggle", function () {
                        n.toggleDropdown();
                      }),
                        this.selection.on("focus", function (e) {
                          n.focus(e);
                        }),
                        this.selection.on("*", function (e, t) {
                          -1 === i.inArray(e, r) && n.trigger(e, t);
                        });
                    }),
                    (u.prototype._registerDropdownEvents = function () {
                      var n = this;
                      this.dropdown.on("*", function (e, t) {
                        n.trigger(e, t);
                      });
                    }),
                    (u.prototype._registerResultsEvents = function () {
                      var n = this;
                      this.results.on("*", function (e, t) {
                        n.trigger(e, t);
                      });
                    }),
                    (u.prototype._registerEvents = function () {
                      var n = this;
                      this.on("open", function () {
                        n.$container.addClass("select2-container--open");
                      }),
                        this.on("close", function () {
                          n.$container.removeClass("select2-container--open");
                        }),
                        this.on("enable", function () {
                          n.$container.removeClass("select2-container--disabled");
                        }),
                        this.on("disable", function () {
                          n.$container.addClass("select2-container--disabled");
                        }),
                        this.on("blur", function () {
                          n.$container.removeClass("select2-container--focus");
                        }),
                        this.on("query", function (t) {
                          n.isOpen() || n.trigger("open", {}),
                            this.dataAdapter.query(t, function (e) {
                              n.trigger("results:all", { data: e, query: t });
                            });
                        }),
                        this.on("query:append", function (t) {
                          this.dataAdapter.query(t, function (e) {
                            n.trigger("results:append", { data: e, query: t });
                          });
                        }),
                        this.on("keypress", function (e) {
                          var t = e.which;
                          n.isOpen() ? (t === r.ESC || t === r.TAB || (t === r.UP && e.altKey) ? (n.close(), e.preventDefault()) : t === r.ENTER ? (n.trigger("results:select", {}), e.preventDefault()) : t === r.SPACE && e.ctrlKey ? (n.trigger("results:toggle", {}), e.preventDefault()) : t === r.UP ? (n.trigger("results:previous", {}), e.preventDefault()) : t === r.DOWN && (n.trigger("results:next", {}), e.preventDefault())) : (t === r.ENTER || t === r.SPACE || (t === r.DOWN && e.altKey)) && (n.open(), e.preventDefault());
                        });
                    }),
                    (u.prototype._syncAttributes = function () {
                      this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
                    }),
                    (u.prototype._syncSubtree = function (e, t) {
                      var n = !1,
                        r = this;
                      if (!e || !e.target || "OPTION" === e.target.nodeName || "OPTGROUP" === e.target.nodeName) {
                        if (t)
                          if (t.addedNodes && 0 < t.addedNodes.length)
                            for (var i = 0; i < t.addedNodes.length; i++) {
                              t.addedNodes[i].selected && (n = !0);
                            }
                          else t.removedNodes && 0 < t.removedNodes.length && (n = !0);
                        else n = !0;
                        n &&
                          this.dataAdapter.current(function (e) {
                            r.trigger("selection:update", { data: e });
                          });
                      }
                    }),
                    (u.prototype.trigger = function (e, t) {
                      var n = u.__super__.trigger,
                        r = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                      if ((void 0 === t && (t = {}), e in r)) {
                        var i = r[e],
                          o = { prevented: !1, name: e, args: t };
                        if ((n.call(this, i, o), o.prevented)) return void (t.prevented = !0);
                      }
                      n.call(this, e, t);
                    }),
                    (u.prototype.toggleDropdown = function () {
                      this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
                    }),
                    (u.prototype.open = function () {
                      this.isOpen() || this.trigger("query", {});
                    }),
                    (u.prototype.close = function () {
                      this.isOpen() && this.trigger("close", {});
                    }),
                    (u.prototype.isOpen = function () {
                      return this.$container.hasClass("select2-container--open");
                    }),
                    (u.prototype.hasFocus = function () {
                      return this.$container.hasClass("select2-container--focus");
                    }),
                    (u.prototype.focus = function (e) {
                      this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
                    }),
                    (u.prototype.enable = function (e) {
                      this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null != e && 0 !== e.length) || (e = [!0]);
                      var t = !e[0];
                      this.$element.prop("disabled", t);
                    }),
                    (u.prototype.data = function () {
                      this.options.get("debug") && 0 < arguments.length && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                      var t = [];
                      return (
                        this.dataAdapter.current(function (e) {
                          t = e;
                        }),
                        t
                      );
                    }),
                    (u.prototype.val = function (e) {
                      if ((this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == e || 0 === e.length)) return this.$element.val();
                      var t = e[0];
                      i.isArray(t) &&
                        (t = i.map(t, function (e) {
                          return e.toString();
                        })),
                        this.$element.val(t).trigger("change");
                    }),
                    (u.prototype.destroy = function () {
                      this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), (this._observer = null)) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), (this._syncA = null), (this._syncS = null), this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), (this.dataAdapter = null), (this.selection = null), (this.dropdown = null), (this.results = null);
                    }),
                    (u.prototype.render = function () {
                      var e = i('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                      return e.attr("dir", this.options.get("dir")), (this.$container = e), this.$container.addClass("select2-container--" + this.options.get("theme")), e.data("element", this.$element), e;
                    }),
                    u
                  );
                }),
                e.define("jquery-mousewheel", ["jquery"], function (e) {
                  return e;
                }),
                e.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (i, e, o, t) {
                  if (null == i.fn.select2) {
                    var s = ["open", "close", "destroy"];
                    i.fn.select2 = function (t) {
                      if ("object" == typeof (t = t || {}))
                        return (
                          this.each(function () {
                            var e = i.extend(!0, {}, t);
                            new o(i(this), e);
                          }),
                          this
                        );
                      if ("string" != typeof t) throw new Error("Invalid arguments for Select2: " + t);
                      var n,
                        r = Array.prototype.slice.call(arguments, 1);
                      return (
                        this.each(function () {
                          var e = i(this).data("select2");
                          null == e && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2."), (n = e[t].apply(e, r));
                        }),
                        -1 < i.inArray(t, s) ? this : n
                      );
                    };
                  }
                  return null == i.fn.select2.defaults && (i.fn.select2.defaults = t), o;
                }),
                { define: e.define, require: e.require }
              );
            })(),
            t = e.require("jquery.select2");
          return (u.fn.select2.amd = e), t;
        }),
          "function" == typeof define && define.amd ? define(["jquery"], r) : r("object" == typeof n ? e("jquery") : jQuery);
      },
      { jquery: 77 },
    ],
  },
  {},
  [10]
);
//# sourceMappingURL=mandelbrot.js.map