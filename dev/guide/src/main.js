

function Util() {}
if (
  ((Util.hasClass = function (e, t) {
    return e.classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
  }),
  (Util.addClass = function (e, t) {
    var n = t.split(" ");
    e.classList ? e.classList.add(n[0]) : Util.hasClass(e, n[0]) || (e.className += " " + n[0]), 1 < n.length && Util.addClass(e, n.slice(1).join(" "));
  }),
  (Util.removeClass = function (e, t) {
    var n = t.split(" ");
    if (e.classList) e.classList.remove(n[0]);
    else if (Util.hasClass(e, n[0])) {
      var s = new RegExp("(\\s|^)" + n[0] + "(\\s|$)");
      e.className = e.className.replace(s, " ");
    }
    1 < n.length && Util.removeClass(e, n.slice(1).join(" "));
  }),
  (Util.toggleClass = function (e, t, n) {
    n ? Util.addClass(e, t) : Util.removeClass(e, t);
  }),
  (Util.setAttributes = function (e, t) {
    for (var n in t) e.setAttribute(n, t[n]);
  }),
  (Util.getChildrenByClassName = function (e, t) {
    e.children;
    for (var n = [], s = 0; s < e.children.length; s++) Util.hasClass(e.children[s], t) && n.push(e.children[s]);
    return n;
  }),
  (Util.is = function (e, t) {
    if (t.nodeType) return e === t;
    for (var n = "string" == typeof t ? document.querySelectorAll(t) : t, s = n.length; s--; ) if (n[s] === e) return !0;
    return !1;
  }),
  (Util.setHeight = function (s, e, o, i, r) {
    var l = e - s,
      a = null,
      c = function (e) {
        a || (a = e);
        var t = e - a,
          n = parseInt((t / i) * l + s);
        (o.style.height = n + "px"), t < i ? window.requestAnimationFrame(c) : r();
      };
    (o.style.height = s + "px"), window.requestAnimationFrame(c);
  }),
  (Util.scrollTo = function (s, o, i, e) {
    var r = e || window,
      l = r.scrollTop || document.documentElement.scrollTop,
      a = null;
    e || (l = window.scrollY || document.documentElement.scrollTop);
    var c = function (e) {
      a || (a = e);
      var t = e - a;
      o < t && (t = o);
      var n = Math.easeInOutQuad(t, l, s - l, o);
      r.scrollTo(0, n), t < o ? window.requestAnimationFrame(c) : i && i();
    };
    window.requestAnimationFrame(c);
  }),
  (Util.moveFocus = function (e) {
    e || (e = document.getElementsByTagName("body")[0]), e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus());
  }),
  (Util.getIndexInArray = function (e, t) {
    return Array.prototype.indexOf.call(e, t);
  }),
  (Util.cssSupports = function (e, t) {
    return "CSS" in window
      ? CSS.supports(e, t)
      : e.replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }) in document.body.style;
  }),
  (Util.extend = function () {
    var n = {},
      s = !1,
      e = 0,
      t = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && ((s = arguments[0]), e++);
    for (
      var o = function (e) {
        for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (s && "[object Object]" === Object.prototype.toString.call(e[t]) ? (n[t] = extend(!0, n[t], e[t])) : (n[t] = e[t]));
      };
      e < t;
      e++
    ) {
      o(arguments[e]);
    }
    return n;
  }),
  (Util.osHasReducedMotion = function () {
    if (!window.matchMedia) return !1;
    var e = window.matchMedia("(prefers-reduced-motion: reduce)");
    return !!e && e.matches;
  }),
  Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function (e) {
      var t = this;
      if (!document.documentElement.contains(t)) return null;
      do {
        if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode;
      } while (null !== t && 1 === t.nodeType);
      return null;
    }),
  "function" != typeof window.CustomEvent)
) {
  function CustomEvent(e, t) {
    t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
  }
  (CustomEvent.prototype = window.Event.prototype), (window.CustomEvent = CustomEvent);
}
(Math.easeInOutQuad = function (e, t, n, s) {
  return (e /= s / 2) < 1 ? (n / 2) * e * e + t : (-n / 2) * (--e * (e - 2) - 1) + t;
}),
  (Math.easeInQuart = function (e, t, n, s) {
    return n * (e /= s) * e * e * e + t;
  }),
  (Math.easeOutQuart = function (e, t, n, s) {
    return (e /= s), -n * (--e * e * e * e - 1) + t;
  }),
  (Math.easeInOutQuart = function (e, t, n, s) {
    return (e /= s / 2) < 1 ? (n / 2) * e * e * e * e + t : (-n / 2) * ((e -= 2) * e * e * e - 2) + t;
  }),
  (Math.easeOutElastic = function (e, t, n, s) {
    var o = 1.70158,
      i = 0.7 * s,
      r = n;
    if (0 == e) return t;
    if (1 == (e /= s)) return t + n;
    if ((i || (i = 0.3 * s), r < Math.abs(n))) {
      r = n;
      o = i / 4;
    } else o = (i / (2 * Math.PI)) * Math.asin(n / r);
    return r * Math.pow(2, -10 * e) * Math.sin(((e * s - o) * (2 * Math.PI)) / i) + n + t;
  }),
  (function () {
    var s = document.getElementsByClassName("js-tab-focus");
    function t() {
      0 < s.length && (o(!1), window.addEventListener("keydown", n)), window.removeEventListener("mousedown", t);
    }
    function n(e) {
      9 === e.keyCode && (o(!0), window.removeEventListener("keydown", n), window.addEventListener("mousedown", t));
    }
    function o(e) {
      for (var t = e ? "" : "none", n = 0; n < s.length; n++) s[n].style.setProperty("outline", t);
    }
    window.addEventListener("mousedown", t);
  })(),
  (function () {
    var e = function (e) {
      (this.element = e),
        (this.select = this.element.getElementsByTagName("select")[0]),
        (this.optGroups = this.select.getElementsByTagName("optgroup")),
        (this.options = this.select.getElementsByTagName("option")),
        (this.selectedOption = (function (e) {
          var t = "";
          t = "selectedIndex" in e.select ? e.options[e.select.selectedIndex].text : e.select.querySelector("option[selected]").text;
          return t;
        })(this)),
        (this.selectId = this.select.getAttribute("id")),
        (this.trigger = !1),
        (this.dropdown = !1),
        (this.customOptions = !1),
        (this.arrowIcon = this.element.getElementsByTagName("svg")),
        (this.label = document.querySelector('[for="' + this.selectId + '"]')),
        (this.optionIndex = 0),
        (function (e) {
          e.element.insertAdjacentHTML(
            "beforeend",
            (function (e) {
              var t = e.element.getAttribute("data-trigger-class") ? " " + e.element.getAttribute("data-trigger-class") : "",
                n = e.options[e.select.selectedIndex].innerHTML + ", " + e.label.textContent,
                s = '<button type="button" class="js-select__button select__button' + t + '" aria-label="' + n + '" aria-expanded="false" aria-controls="' + e.selectId + '-dropdown"><span aria-hidden="true" class="js-select__label select__label">' + e.selectedOption + "</span>";
              if (0 < e.arrowIcon.length && e.arrowIcon[0].outerHTML) {
                var o = e.arrowIcon[0].cloneNode(!0);
                Util.removeClass(o, "select__icon"), (s += o.outerHTML);
              }
              return s + "</button>";
            })(e) +
              (function (e) {
                var t,
                  n = '<div class="js-select__dropdown select__dropdown" aria-describedby="' + e.selectId + '-description" id="' + e.selectId + '-dropdown">';
                if (((n += (t = e).label ? '<p class="sr-only" id="' + t.selectId + '-description">' + t.label.textContent + "</p>" : ""), 0 < e.optGroups.length))
                  for (var s = 0; s < e.optGroups.length; s++) {
                    var o = e.optGroups[s].getElementsByTagName("option"),
                      i = '<li><span class="select__item select__item--optgroup">' + e.optGroups[s].getAttribute("label") + "</span></li>";
                    n = n + '<ul class="select__list" role="listbox">' + i + l(e, o) + "</ul>";
                  }
                else n = n + '<ul class="select__list" role="listbox">' + l(e, e.options) + "</ul>";
                return n;
              })(e)
          ),
            (e.dropdown = e.element.getElementsByClassName("js-select__dropdown")[0]),
            (e.trigger = e.element.getElementsByClassName("js-select__button")[0]),
            (e.customOptions = e.dropdown.getElementsByClassName("js-select__item")),
            Util.addClass(e.select, "is-hidden"),
            0 < e.arrowIcon.length && (e.arrowIcon[0].style.display = "none");
          i(e);
        })(this),
        (function (t) {
          (n = t),
            n.dropdown.addEventListener("click", function (e) {
              var t = e.target.closest(".js-select__item");
              t &&
                (function (e, t) {
                  if (t.hasAttribute("aria-selected") && "true" == t.getAttribute("aria-selected")) e.trigger.setAttribute("aria-expanded", "false");
                  else {
                    var n = e.dropdown.querySelector('[aria-selected="true"]');
                    n && n.setAttribute("aria-selected", "false"), t.setAttribute("aria-selected", "true"), (e.trigger.getElementsByClassName("js-select__label")[0].textContent = t.textContent), e.trigger.setAttribute("aria-expanded", "false"), (s = e), (o = t.getAttribute("data-index")), (s.select.selectedIndex = o), s.select.dispatchEvent(new CustomEvent("change", { bubbles: !0 })), r(e);
                  }
                  var s, o;
                  e.trigger.focus();
                })(n, t);
            }),
            t.trigger.addEventListener("click", function () {
              o(t, !1);
            }),
            t.label &&
              t.label.addEventListener("click", function () {
                Util.moveFocus(t.trigger);
              });
          var n;
          t.dropdown.addEventListener("keydown", function (e) {
            (e.keyCode && 38 == e.keyCode) || (e.key && "arrowup" == e.key.toLowerCase()) ? s(t, "prev", e) : ((e.keyCode && 40 == e.keyCode) || (e.key && "arrowdown" == e.key.toLowerCase())) && s(t, "next", e);
          }),
            t.element.addEventListener("select-updated", function (e) {
              !(function (e) {
                var t = e.dropdown.querySelector('[aria-selected="true"]');
                t && t.setAttribute("aria-selected", "false");
                var n = e.dropdown.querySelector('.js-select__item[data-index="' + e.select.selectedIndex + '"]');
                n.setAttribute("aria-selected", "true"), (e.trigger.getElementsByClassName("js-select__label")[0].textContent = n.textContent), e.trigger.setAttribute("aria-expanded", "false"), r(e);
              })(t);
            });
        })(this);
    };
    function o(t, e) {
      var n, s;
      if (((n = e || ("true" == t.trigger.getAttribute("aria-expanded") ? "false" : "true")), t.trigger.setAttribute("aria-expanded", n), "true" == n)) {
        var o = (s = t).dropdown.querySelector('[aria-selected="true"]') || s.dropdown.getElementsByClassName("js-select__item")[0];
        Util.moveFocus(o),
          t.dropdown.addEventListener("transitionend", function e() {
            Util.moveFocus(o), t.dropdown.removeEventListener("transitionend", e);
          }),
          i(t);
      }
    }
    function i(e) {
      Util.removeClass(e.dropdown, "select__dropdown--right select__dropdown--up");
      var t = e.trigger.getBoundingClientRect();
      Util.toggleClass(e.dropdown, "select__dropdown--right", document.documentElement.clientWidth - 5 < t.left + e.dropdown.offsetWidth);
      var n = window.innerHeight - t.bottom - 5 < t.top;
      Util.toggleClass(e.dropdown, "select__dropdown--up", n);
      var s = n ? t.top - 20 : window.innerHeight - t.bottom - 20;
      e.dropdown.setAttribute("style", "max-height: " + s + "px; width: " + t.width + "px;");
    }
    function s(e, t, n) {
      n.preventDefault();
      var s = Util.getIndexInArray(e.customOptions, document.activeElement);
      (s = "next" == t ? s + 1 : s - 1) < 0 && (s = e.customOptions.length - 1), s >= e.customOptions.length && (s = 0), Util.moveFocus(e.customOptions[s]);
    }
    function r(e) {
      e.trigger.setAttribute("aria-label", e.options[e.select.selectedIndex].innerHTML + ", " + e.label.textContent);
    }
    function l(e, t) {
      for (var n = "", s = 0; s < t.length; s++) {
        var o = t[s].hasAttribute("selected") ? ' aria-selected="true"' : ' aria-selected="false"';
        (n = n + '<li><button type="button" class="reset js-select__item select__item select__item--option" role="option" data-value="' + t[s].value + '" ' + o + ' data-index="' + e.optionIndex + '">' + t[s].text + "</button></li>"), (e.optionIndex = e.optionIndex + 1);
      }
      return n;
    }
    var t,
      n = document.getElementsByClassName("js-select");
    if (0 < n.length) {
      for (var a = [], c = 0; c < n.length; c++) (t = c), a.push(new e(n[t]));
      window.addEventListener("keyup", function (e) {
        ((e.keyCode && 27 == e.keyCode) || (e.key && "escape" == e.key.toLowerCase())) &&
          a.forEach(function (e) {
            var t;
            (t = e), document.activeElement.closest(".js-select") && t.trigger.focus(), o(e, "false");
          });
      }),
        window.addEventListener("click", function (s) {
          a.forEach(function (e) {
            var t, n;
            (t = e), (n = s.target), t.element.contains(n) || o(t, "false");
          });
        });
    }
  })(),
  (function () {
    function n(e) {
      var t = getComputedStyle(e, ":before").getPropertyValue("content").replace(/\'|"/g, "");
      Util.toggleClass(e, o, "collapsed" != t);
    }
    var s = document.getElementsByClassName("js-table"),
      o = "table--expanded";
    if (0 < s.length) {
      for (var e = 0, i = 0; i < s.length; i++) {
        var t = getComputedStyle(s[i], ":before").getPropertyValue("content");
        t && "" != t && "none" != t
          ? (!(function (e) {
              var t;
              n((t = s[i])),
                Util.addClass(t, "table--loaded"),
                t.addEventListener("update-table", function (e) {
                  n(t);
                });
            })(),
            (e += 1))
          : Util.addClass(s[i], "table--loaded");
      }
      if (0 < e) {
        var r = !1,
          l = new CustomEvent("update-table");
        function a() {
          for (var e = 0; e < s.length; e++) s[e].dispatchEvent(l);
        }
        window.addEventListener("resize", function (e) {
          clearTimeout(r), (r = setTimeout(a, 300));
        }),
          window.requestAnimationFrame ? window.requestAnimationFrame(a) : a();
      }
    }
  })(),
  (function () {
    var e = function (e) {
      (this.element = e),
        (this.triggers = document.querySelector(".style-guide__header-control")),
        (this.list = this.element.getElementsByClassName("style-guide__nav-list")[0]),
        (this.anchors = this.list.querySelectorAll('a[href^="#"]')),
        (this.indicator = this.element.getElementsByClassName("style-guide__nav-indicator")[0]),
        (this.sections = (function (e) {
          for (var t = [], n = 0; n < e.anchors.length; n++) {
            var s = document.getElementById(e.anchors[n].getAttribute("href").replace("#", ""));
            s && t.push(s);
          }
          return t;
        })(this)),
        (this.firstFocusable = this.element.querySelector("[href]")),
        (this.selectedTrigger = null),
        (this.showClass = "style-guide__header--is-visible"),
        (this.clickScrolling = !1),
        (this.intervalID = !1),
        (this.select = document.getElementById("select-theme")),
        (this.main = document.getElementsByClassName("style-guide")[0]),
        (function (t) {
          (s = t),
            s.triggers &&
              (s.triggers.addEventListener("click", function (e) {
                var n, t;
                s.element.classList.contains(s.showClass)
                  ? r(s, e)
                  : ((n = s),
                    (t = e).preventDefault(),
                    (n.selectedTrigger = n.triggers),
                    t.target.setAttribute("aria-expanded", "true"),
                    n.element.classList.add(n.showClass),
                    n.firstFocusable.focus(),
                    n.element.addEventListener("transitionend", function e(t) {
                      n.element.removeEventListener("transitionend", e), n.firstFocusable.focus();
                    }));
              }),
              window.addEventListener("keyup", function (e) {
                ((e.keyCode && 27 == e.keyCode) || (e.key && "escape" == e.key.toLowerCase())) && r(s, e), ((e.keyCode && 9 == e.keyCode) || (e.key && "tab" == e.key.toLowerCase())) && (document.activeElement.closest(".style-guide__header") || r(s, e, !0));
              })),
            (i = t),
            l(i, i.anchors[0]),
            i.list.addEventListener("click", function (e) {
              var t,
                n,
                s,
                o = e.target.closest('a[href^="#"]');
              o && !o.classList.contains("style-guide__nav-link--current") && (i.clickScrolling ? e.preventDefault() : ((i.clickScrolling = !0), l(i, o), r(i, !1, !0), (t = document.documentElement.offsetHeight), (n = window.innerHeight), (s = window.scrollY || window.pageYOffset || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0)), t - 2 <= n + s && window.dispatchEvent(new CustomEvent("scroll"))));
            }),
            a &&
              (function (n) {
                for (
                  var e = new IntersectionObserver(
                      function (e, t) {
                        e.forEach(function (e) {
                          n.clickScrolling || o(n);
                        });
                      },
                      { rootMargin: "0px 0px -50% 0px" }
                    ),
                    t = 0;
                  t < n.sections.length;
                  t++
                )
                  e.observe(n.sections[t]);
                n.element.addEventListener("fixed-nav-scroll", function (e) {
                  n.clickScrolling || o(n), (n.clickScrolling = !1);
                });
              })(t);
          var i;
          var s;
          t.select.addEventListener("change", function (e) {
            t.main.setAttribute("data-theme", t.select.options[t.select.selectedIndex].value);
          });
        })(this);
    };
    function r(e, t, n) {
      e.element.classList.contains(e.showClass) && (t && t.preventDefault(), e.element.classList.remove(e.showClass), e.selectedTrigger && (e.selectedTrigger.setAttribute("aria-expanded", "false"), n || e.selectedTrigger.focus(), (e.selectedTrigger = !1)));
    }
    function l(e, t) {
      if (a) {
        for (var n = 0; n < e.anchors.length; n++) e.anchors[n].classList.remove("style-guide__nav-link--current");
        var s;
        t && (t.classList.add("style-guide__nav-link--current"), (s = t), (e.indicator.style.transform = "translateX(" + s.offsetLeft + "px) scaleX(" + s.offsetWidth + ")"));
      }
    }
    function o(s) {
      s.intervalID ||
        (s.intervalID = setTimeout(function () {
          for (var e = window.innerHeight / 2, t = -1, n = 0; n < s.sections.length; n++) {
            s.sections[n].getBoundingClientRect().top < e && (t = n);
          }
          -1 < t && l(s, s.anchors[t]), (s.intervalID = !1);
        }, 100));
    }
    var t,
      n = document.getElementsByClassName("style-guide__header"),
      a = "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype,
      s = [];
    if (0 < n.length) {
      for (var i = 0; i < n.length; i++) (t = i), s.push(new e(n[t]));
      var c = !1,
        d = new CustomEvent("fixed-nav-scroll");
      function u() {
        for (var e = 0; e < s.length; e++) s[e].element.dispatchEvent(d);
      }
      window.addEventListener("scroll", function () {
        clearTimeout(c), (c = setTimeout(u, 100));
      });
    }
  })();
