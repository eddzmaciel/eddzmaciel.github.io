! function(e, t) {
    "function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module.exports = t(e) : e.smoothScroll = t(e)
}("undefined" != typeof global ? global : this.window || this.global, function(e) {
    "use strict";
    var t, n, o, r, a = {}, u = !! e.document.querySelector && !! e.addEventListener,
        c = {
            speed: 500,
            easing: "easeInOutCubic",
            offset: 0,
            updateURL: !0,
            callback: function() {}
        }, i = function() {
            var e = {}, t = !1,
                n = 0,
                o = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);
            for (var r = function(n) {
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = t && "[object Object]" === Object.prototype.toString.call(n[o]) ? i(!0, e[o], n[o]) : n[o])
            }; o > n; n++) {
                var a = arguments[n];
                r(a)
            }
            return e
        }, s = function(e) {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
        }, l = function(e, t) {
            var n, o, r = t.charAt(0),
                a = "classList" in document.documentElement;
            for ("[" === r && (t = t.substr(1, t.length - 2), n = t.split("="), n.length > 1 && (o = !0, n[1] = n[1].replace(/"/g, "").replace(/'/g, ""))); e && e !== document; e = e.parentNode) {
                if ("." === r)
                    if (a) {
                        if (e.classList.contains(t.substr(1))) return e
                    } else if (new RegExp("(^|\\s)" + t.substr(1) + "(\\s|$)").test(e.className)) return e;
                if ("#" === r && e.id === t.substr(1)) return e;
                if ("[" === r && e.hasAttribute(n[0])) {
                    if (!o) return e;
                    if (e.getAttribute(n[0]) === n[1]) return e
                }
                if (e.tagName.toLowerCase() === t) return e
            }
            return null
        }, f = function(e) {
            for (var t, n = String(e), o = n.length, r = -1, a = "", u = n.charCodeAt(0); ++r < o;) {
                if (t = n.charCodeAt(r), 0 === t) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
                a += t >= 1 && 31 >= t || 127 == t || 0 === r && t >= 48 && 57 >= t || 1 === r && t >= 48 && 57 >= t && 45 === u ? "\\" + t.toString(16) + " " : t >= 128 || 45 === t || 95 === t || t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t ? n.charAt(r) : "\\" + n.charAt(r)
            }
            return a
        }, d = function(e, t) {
            var n;
            return "easeInQuad" === e && (n = t * t), "easeOutQuad" === e && (n = t * (2 - t)), "easeInOutQuad" === e && (n = .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t), "easeInCubic" === e && (n = t * t * t), "easeOutCubic" === e && (n = --t * t * t + 1), "easeInOutCubic" === e && (n = .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e && (n = t * t * t * t), "easeOutQuart" === e && (n = 1 - --t * t * t * t), "easeInOutQuart" === e && (n = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e && (n = t * t * t * t * t), "easeOutQuint" === e && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e && (n = .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), n || t
        }, h = function(e, t, n) {
            var o = 0;
            if (e.offsetParent)
                do o += e.offsetTop, e = e.offsetParent; while (e);
            return o = o - t - n, o >= 0 ? o : 0
        }, m = function() {
            return Math.max(e.document.body.scrollHeight, e.document.documentElement.scrollHeight, e.document.body.offsetHeight, e.document.documentElement.offsetHeight, e.document.body.clientHeight, e.document.documentElement.clientHeight)
        }, p = function(e) {
            return e && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(e) : {}
        }, g = function(t, n) {
            e.history.pushState && (n || "true" === n) && e.history.pushState(null, null, [e.location.protocol, "//", e.location.host, e.location.pathname, e.location.search, t].join(""))
        }, b = function(e) {
            return null === e ? 0 : s(e) + e.offsetTop
        };
    a.animateScroll = function(t, n, a) {
        var u = p(t ? t.getAttribute("data-options") : null),
            s = i(s || c, a || {}, u);
        n = "#" + f(n.substr(1));
        var l = "#" === n ? e.document.documentElement : e.document.querySelector(n),
            v = e.pageYOffset;
        o || (o = e.document.querySelector("[data-scroll-header]")), r || (r = b(o));
        var O, y, S, I = h(l, r, parseInt(s.offset, 10)),
            E = I - v,
            L = m(),
            C = 0;
        g(n, s.updateURL);
        var H = function(o, r, a) {
            var u = e.pageYOffset;
            (o == r || u == r || e.innerHeight + u >= L) && (clearInterval(a), l.focus(), s.callback(t, n))
        }, j = function() {
                C += 16, y = C / parseInt(s.speed, 10), y = y > 1 ? 1 : y, S = v + E * d(s.easing, y), e.scrollTo(0, Math.floor(S)), H(S, I, O)
            }, w = function() {
                O = setInterval(j, 16)
            };
        0 === e.pageYOffset && e.scrollTo(0, 0), w()
    };
    var v = function(e) {
        var n = l(e.target, "[data-scroll]");
        n && "a" === n.tagName.toLowerCase() && (e.preventDefault(), a.animateScroll(n, n.hash, t))
    }, O = function() {
            n || (n = setTimeout(function() {
                n = null, r = b(o)
            }, 66))
        };
    return a.destroy = function() {
        t && (e.document.removeEventListener("click", v, !1), e.removeEventListener("resize", O, !1), t = null, n = null, o = null, r = null)
    }, a.init = function(n) {
        u && (a.destroy(), t = i(c, n || {}), o = e.document.querySelector("[data-scroll-header]"), r = b(o), e.document.addEventListener("click", v, !1), o && e.addEventListener("resize", O, !1))
    }, a
}), smoothScroll.init({
    speed: 1e3,
    easing: "easeInOutCubic",
    offset: 0,
    updateURL: !0,
    callback: function() {}
});
