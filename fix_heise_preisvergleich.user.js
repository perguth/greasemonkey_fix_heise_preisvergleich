// ==UserScript==
// @name        fix_heise_preisvergleich
// @namespace   http://perguth.de
// @description Put the hardware specs into a sane form.
// @include     http://www.heise.de/preisvergleich/*
// @include     https://www.heise.de/preisvergleich/*
// @include     */fix_heise_preisvergleich/*
// @version     1
// @grant       none
// ==/UserScript==
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var debug = {
  enabled: false,
  log: function log(str) {
    if (debug.enabled) console.log(str);
  },
  setDebugFlag: function setDebugFlag() {
    var url = window.location.href.toString();
    var idx = url.indexOf("#");
    var anchor = idx != -1 ? url.substring(idx + 1) : "";
    console.log("[Anchor found] " + anchor);
    if (anchor.trim() === "debug") {
      debug.enabled = true;
    }
  }
};
var readSpecs = function readSpecs() {
  var name = document.getElementById("mitte_preisvergleicher").getElementsByTagName("h1")[0].querySelectorAll(".notrans")[0].firstChild.data;
  var specs = document.getElementById("gh_proddesc").querySelectorAll(".notrans")[0].firstChild.data;

  debug.log("[Original Specs] " + specs);
  return { name: name, specs: specs };
};
var substituteSpecs = function substituteSpecs(specs, subs) {
  var replacement = function replacement(str) {
    if (debug.enabled) {
      if (str === "") return "<b style='color: red;'>― </b> ";else {
        if (str[0] !== "$") return "<b style='color: red;'>" + str + "</b>";else // ..we have a replacement pattern so:
          return str.slice(0, 2) + ("<b style='color: red;'>" + str.slice(2) + "</b>");
      }
    } else return str;
  };
  var convIfRegExp = function convIfRegExp(str) {
    if (str[0] === "/") {
      return new RegExp(str.slice(1, -1), "g");
    } else return str;
  };
  for (var orig in subs) {
    specs = specs.replace(convIfRegExp(orig), replacement(subs[orig]));
  }
  debug.log("[New Specs] " + specs);
  return specs;
};
var fixWebsite = function fixWebsite() {
  debug.setDebugFlag();

  var _readSpecs = readSpecs();

  var name = _readSpecs.name;
  var specs = _readSpecs.specs;

  var subs = require("./substitutes.json");
  var newSpecs = substituteSpecs(specs, subs);

  document.getElementById("gh_proddesc").querySelectorAll(".notrans")[0].innerHTML = newSpecs;
};

document.addEventListener("DOMContentLoaded", fixWebsite(), false);

},{"./substitutes.json":2}],2:[function(require,module,exports){
module.exports={
  "zwei Jahre": "24M",
  "Windows 7 Professional 64bit": "Win 7 Pro 64",
  "Windows 7 Home 64bit": "Win 7 Home 64",
  "USB 3.0": "USB3",
  "USB 2.0": "USB2",
  "Gb LAN": "Gbit LAN",
  "Bluetooth": "BT",
  "Megapixel": "MP",
  "optisches Laufwerk: N/A": "kein optisches Laufwerk",
  "optisches Laufwerk: DVD+/-RW DL": "DVD+/-RW DL",
  
  
  "CPU: ": "",
  "Festplatte: ": "",
  "Grafik: ": "",
  "Display: ": "",
  "Wireless: ": "",
  "Betriebssystem: ": "",
  "Gewicht: ": "",
  "Besonderheiten: ": "",
  "Anschlüsse: ": "",
  
  
  "/^((?!optisches Laufwerk).)*$/": "$& • kein optisches Laufwerk",
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9wZ3V0aC9naXRodWIvZml4X2hlaXNlX3ByZWlzdmVyZ2xlaWNoL2luZGV4LmpzIiwic3Vic3RpdHV0ZXMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUc7QUFDVixTQUFPLEVBQUUsS0FBSztBQUNkLEtBQUcsRUFBRSxhQUFDLEdBQUcsRUFBSztBQUNaLFFBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ3BDO0FBQ0QsY0FBWSxFQUFFLHdCQUFNO0FBQ2xCLFFBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3pDLFFBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsUUFBSSxNQUFNLEdBQUcsQUFBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3BELFdBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUUsTUFBTSxDQUFDLENBQUE7QUFDdEMsUUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBTyxFQUFFO0FBQzdCLFdBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ3JCO0dBQ0Y7Q0FDRixDQUFBO0FBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLEdBQVM7QUFDcEIsTUFBSSxJQUFJLEdBQ0wsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUNqRCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDN0IsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7QUFDbEIsTUFBSSxLQUFLLEdBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FDdEMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7O0FBRWxCLE9BQUssQ0FBQyxHQUFHLHVCQUFxQixLQUFLLENBQUcsQ0FBQTtBQUN0QyxTQUFPLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFDLENBQUE7Q0FDckIsQ0FBQTtBQUNELElBQUksZUFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBSSxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3JDLE1BQUksV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFJLEdBQUcsRUFBSztBQUN6QixRQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDakIsVUFBSSxHQUFHLEtBQUssRUFBRSxFQUNaLHdDQUF1QyxLQUNwQztBQUNILFlBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDaEIsbUNBQWlDLEdBQUcsVUFBTTtBQUUxQyxpQkFBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0NBQ00sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBTSxDQUFBO09BQ2pEO0tBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsTUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQUksR0FBRyxFQUFLO0FBQzFCLFFBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNsQixhQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDekMsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsT0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDckIsU0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN4QixDQUFBO0dBQ0Y7QUFDRCxPQUFLLENBQUMsR0FBRyxrQkFBZ0IsS0FBSyxDQUFHLENBQUE7QUFDakMsU0FBTyxLQUFLLENBQUE7Q0FDYixDQUFBO0FBQ0QsSUFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFDckIsT0FBSyxDQUFDLFlBQVksRUFBRSxDQUFBOzttQkFDQSxTQUFTLEVBQUU7O01BQTFCLElBQUksY0FBSixJQUFJO01BQUUsS0FBSyxjQUFMLEtBQUs7O0FBQ2hCLE1BQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3hDLE1BQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRTNDLFVBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQ25DLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FDMUMsUUFBUSxDQUFBO0NBQ1gsQ0FBQTs7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQzFDLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FDcEIsQ0FBQTs7O0FDdEVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgZGVidWcgPSB7XG4gIGVuYWJsZWQ6IGZhbHNlLFxuICBsb2c6IChzdHIpID0+IHtcbiAgICBpZiAoZGVidWcuZW5hYmxlZCkgY29uc29sZS5sb2coc3RyKVxuICB9LFxuICBzZXREZWJ1Z0ZsYWc6ICgpID0+IHtcbiAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYudG9TdHJpbmcoKVxuICAgIGxldCBpZHggPSB1cmwuaW5kZXhPZihcIiNcIilcbiAgICBsZXQgYW5jaG9yID0gKGlkeCAhPSAtMSkgPyB1cmwuc3Vic3RyaW5nKGlkeCsxKSA6IFwiXCJcbiAgICBjb25zb2xlLmxvZygnW0FuY2hvciBmb3VuZF0gJysgYW5jaG9yKVxuICAgIGlmIChhbmNob3IudHJpbSgpID09PSAnZGVidWcnKSB7XG4gICAgICBkZWJ1Zy5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxubGV0IHJlYWRTcGVjcyA9ICgpID0+IHtcbiAgbGV0IG5hbWUgPSBcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pdHRlX3ByZWlzdmVyZ2xlaWNoZXInKVxuICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaDEnKVswXVxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcubm90cmFucycpWzBdXG4gICAgLmZpcnN0Q2hpbGQuZGF0YVxuICBsZXQgc3BlY3MgPSBcbiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2doX3Byb2RkZXNjJylcbiAgICAucXVlcnlTZWxlY3RvckFsbCgnLm5vdHJhbnMnKVswXVxuICAgIC5maXJzdENoaWxkLmRhdGFcbiAgXG4gIGRlYnVnLmxvZyhgW09yaWdpbmFsIFNwZWNzXSAke3NwZWNzfWApXG4gIHJldHVybiB7bmFtZSwgc3BlY3N9XG59XG5sZXQgc3Vic3RpdHV0ZVNwZWNzID0gKHNwZWNzLCBzdWJzKSA9PiB7XG4gIGxldCByZXBsYWNlbWVudCA9IChzdHIpID0+IHtcbiAgICBpZiAoZGVidWcuZW5hYmxlZCkge1xuICAgICAgaWYgKHN0ciA9PT0gJycpXG4gICAgICAgIHJldHVybiBgPGIgc3R5bGU9J2NvbG9yOiByZWQ7Jz7igJUgPC9iPiBgXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHN0clswXSAhPT0gJyQnKVxuICAgICAgICAgIHJldHVybiBgPGIgc3R5bGU9J2NvbG9yOiByZWQ7Jz4ke3N0cn08L2I+YFxuICAgICAgICBlbHNlIC8vIC4ud2UgaGF2ZSBhIHJlcGxhY2VtZW50IHBhdHRlcm4gc286XG4gICAgICAgICAgcmV0dXJuIHN0ci5zbGljZSgwLCAyKSArIFxuICAgICAgICAgICAgYDxiIHN0eWxlPSdjb2xvcjogcmVkOyc+JHtzdHIuc2xpY2UoMil9PC9iPmBcbiAgICAgIH0gXG4gICAgfSBlbHNlIHJldHVybiBzdHJcbiAgfVxuICBsZXQgY29udklmUmVnRXhwID0gKHN0cikgPT4ge1xuICAgIGlmIChzdHJbMF0gPT09ICcvJykge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoc3RyLnNsaWNlKDEsIC0xKSwgJ2cnKVxuICAgIH0gZWxzZSByZXR1cm4gc3RyXG4gIH1cbiAgZm9yIChsZXQgb3JpZyBpbiBzdWJzKSB7XG4gICAgc3BlY3MgPSBzcGVjcy5yZXBsYWNlKFxuICAgICAgY29udklmUmVnRXhwKG9yaWcpLCBcbiAgICAgIHJlcGxhY2VtZW50KHN1YnNbb3JpZ10pXG4gICAgKVxuICB9XG4gIGRlYnVnLmxvZyhgW05ldyBTcGVjc10gJHtzcGVjc31gKVxuICByZXR1cm4gc3BlY3Ncbn1cbmxldCBmaXhXZWJzaXRlID0gKCkgPT4ge1xuICBkZWJ1Zy5zZXREZWJ1Z0ZsYWcoKVxuICBsZXQge25hbWUsIHNwZWNzfSA9IHJlYWRTcGVjcygpXG4gIGxldCBzdWJzID0gcmVxdWlyZSgnLi9zdWJzdGl0dXRlcy5qc29uJylcbiAgbGV0IG5ld1NwZWNzID0gc3Vic3RpdHV0ZVNwZWNzKHNwZWNzLCBzdWJzKVxuICBcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2doX3Byb2RkZXNjJylcbiAgICAucXVlcnlTZWxlY3RvckFsbCgnLm5vdHJhbnMnKVswXS5pbm5lckhUTUwgPSBcbiAgICBuZXdTcGVjc1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJyxcbiAgZml4V2Vic2l0ZSgpLCBmYWxzZVxuKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInp3ZWkgSmFocmVcIjogXCIyNE1cIixcbiAgXCJXaW5kb3dzIDcgUHJvZmVzc2lvbmFsIDY0Yml0XCI6IFwiV2luIDcgUHJvIDY0XCIsXG4gIFwiV2luZG93cyA3IEhvbWUgNjRiaXRcIjogXCJXaW4gNyBIb21lIDY0XCIsXG4gIFwiVVNCIDMuMFwiOiBcIlVTQjNcIixcbiAgXCJVU0IgMi4wXCI6IFwiVVNCMlwiLFxuICBcIkdiIExBTlwiOiBcIkdiaXQgTEFOXCIsXG4gIFwiQmx1ZXRvb3RoXCI6IFwiQlRcIixcbiAgXCJNZWdhcGl4ZWxcIjogXCJNUFwiLFxuICBcIm9wdGlzY2hlcyBMYXVmd2VyazogTi9BXCI6IFwia2VpbiBvcHRpc2NoZXMgTGF1ZndlcmtcIixcbiAgXCJvcHRpc2NoZXMgTGF1Zndlcms6IERWRCsvLVJXIERMXCI6IFwiRFZEKy8tUlcgRExcIixcbiAgXG4gIFxuICBcIkNQVTogXCI6IFwiXCIsXG4gIFwiRmVzdHBsYXR0ZTogXCI6IFwiXCIsXG4gIFwiR3JhZmlrOiBcIjogXCJcIixcbiAgXCJEaXNwbGF5OiBcIjogXCJcIixcbiAgXCJXaXJlbGVzczogXCI6IFwiXCIsXG4gIFwiQmV0cmllYnNzeXN0ZW06IFwiOiBcIlwiLFxuICBcIkdld2ljaHQ6IFwiOiBcIlwiLFxuICBcIkJlc29uZGVyaGVpdGVuOiBcIjogXCJcIixcbiAgXCJBbnNjaGzDvHNzZTogXCI6IFwiXCIsXG4gIFxuICBcbiAgXCIvXigoPyFvcHRpc2NoZXMgTGF1ZndlcmspLikqJC9cIjogXCIkJiDigKIga2VpbiBvcHRpc2NoZXMgTGF1ZndlcmtcIixcbn1cbiJdfQ==
