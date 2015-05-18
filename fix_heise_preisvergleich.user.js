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

  document.getElementById("gh_proddesc").querySelectorAll(".notrans")[0].innerHTML = "" + name + " <br><br> " + newSpecs;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9wZ3V0aC9naXRodWIvZml4X2hlaXNlX3ByZWlzdmVyZ2xlaWNoL2luZGV4LmpzIiwic3Vic3RpdHV0ZXMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUc7QUFDVixTQUFPLEVBQUUsS0FBSztBQUNkLEtBQUcsRUFBRSxhQUFDLEdBQUcsRUFBSztBQUNaLFFBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ3BDO0FBQ0QsY0FBWSxFQUFFLHdCQUFNO0FBQ2xCLFFBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3pDLFFBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsUUFBSSxNQUFNLEdBQUcsQUFBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3BELFdBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUUsTUFBTSxDQUFDLENBQUE7QUFDdEMsUUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBTyxFQUFFO0FBQzdCLFdBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ3JCO0dBQ0Y7Q0FDRixDQUFBO0FBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLEdBQVM7QUFDcEIsTUFBSSxJQUFJLEdBQ0wsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUNqRCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDN0IsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7QUFDbEIsTUFBSSxLQUFLLEdBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FDdEMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7O0FBRWxCLE9BQUssQ0FBQyxHQUFHLHVCQUFxQixLQUFLLENBQUcsQ0FBQTtBQUN0QyxTQUFPLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFDLENBQUE7Q0FDckIsQ0FBQTtBQUNELElBQUksZUFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBSSxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3JDLE1BQUksV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFJLEdBQUcsRUFBSztBQUN6QixRQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDakIsVUFBSSxHQUFHLEtBQUssRUFBRSxFQUNaLHdDQUF1QyxLQUNwQztBQUNILFlBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDaEIsbUNBQWlDLEdBQUcsVUFBTTtBQUUxQyxpQkFBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0NBQ00sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBTSxDQUFBO09BQ2pEO0tBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsTUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQUksR0FBRyxFQUFLO0FBQzFCLFFBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNsQixhQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDekMsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsT0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDckIsU0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN4QixDQUFBO0dBQ0Y7QUFDRCxPQUFLLENBQUMsR0FBRyxrQkFBZ0IsS0FBSyxDQUFHLENBQUE7QUFDakMsU0FBTyxLQUFLLENBQUE7Q0FDYixDQUFBO0FBQ0QsSUFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFDckIsT0FBSyxDQUFDLFlBQVksRUFBRSxDQUFBOzttQkFDQSxTQUFTLEVBQUU7O01BQTFCLElBQUksY0FBSixJQUFJO01BQUUsS0FBSyxjQUFMLEtBQUs7O0FBQ2hCLE1BQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3hDLE1BQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRTNDLFVBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQ25DLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsUUFDdkMsSUFBSSxrQkFBYSxRQUFRLEFBQUUsQ0FBQTtDQUNqQyxDQUFBOztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFDMUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxDQUNwQixDQUFBOzs7QUN0RUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBkZWJ1ZyA9IHtcbiAgZW5hYmxlZDogZmFsc2UsXG4gIGxvZzogKHN0cikgPT4ge1xuICAgIGlmIChkZWJ1Zy5lbmFibGVkKSBjb25zb2xlLmxvZyhzdHIpXG4gIH0sXG4gIHNldERlYnVnRmxhZzogKCkgPT4ge1xuICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi50b1N0cmluZygpXG4gICAgbGV0IGlkeCA9IHVybC5pbmRleE9mKFwiI1wiKVxuICAgIGxldCBhbmNob3IgPSAoaWR4ICE9IC0xKSA/IHVybC5zdWJzdHJpbmcoaWR4KzEpIDogXCJcIlxuICAgIGNvbnNvbGUubG9nKCdbQW5jaG9yIGZvdW5kXSAnKyBhbmNob3IpXG4gICAgaWYgKGFuY2hvci50cmltKCkgPT09ICdkZWJ1ZycpIHtcbiAgICAgIGRlYnVnLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG59XG5sZXQgcmVhZFNwZWNzID0gKCkgPT4ge1xuICBsZXQgbmFtZSA9IFxuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWl0dGVfcHJlaXN2ZXJnbGVpY2hlcicpXG4gICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoMScpWzBdXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RyYW5zJylbMF1cbiAgICAuZmlyc3RDaGlsZC5kYXRhXG4gIGxldCBzcGVjcyA9IFxuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2hfcHJvZGRlc2MnKVxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcubm90cmFucycpWzBdXG4gICAgLmZpcnN0Q2hpbGQuZGF0YVxuICBcbiAgZGVidWcubG9nKGBbT3JpZ2luYWwgU3BlY3NdICR7c3BlY3N9YClcbiAgcmV0dXJuIHtuYW1lLCBzcGVjc31cbn1cbmxldCBzdWJzdGl0dXRlU3BlY3MgPSAoc3BlY3MsIHN1YnMpID0+IHtcbiAgbGV0IHJlcGxhY2VtZW50ID0gKHN0cikgPT4ge1xuICAgIGlmIChkZWJ1Zy5lbmFibGVkKSB7XG4gICAgICBpZiAoc3RyID09PSAnJylcbiAgICAgICAgcmV0dXJuIGA8YiBzdHlsZT0nY29sb3I6IHJlZDsnPuKAlSA8L2I+IGBcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3RyWzBdICE9PSAnJCcpXG4gICAgICAgICAgcmV0dXJuIGA8YiBzdHlsZT0nY29sb3I6IHJlZDsnPiR7c3RyfTwvYj5gXG4gICAgICAgIGVsc2UgLy8gLi53ZSBoYXZlIGEgcmVwbGFjZW1lbnQgcGF0dGVybiBzbzpcbiAgICAgICAgICByZXR1cm4gc3RyLnNsaWNlKDAsIDIpICsgXG4gICAgICAgICAgICBgPGIgc3R5bGU9J2NvbG9yOiByZWQ7Jz4ke3N0ci5zbGljZSgyKX08L2I+YFxuICAgICAgfSBcbiAgICB9IGVsc2UgcmV0dXJuIHN0clxuICB9XG4gIGxldCBjb252SWZSZWdFeHAgPSAoc3RyKSA9PiB7XG4gICAgaWYgKHN0clswXSA9PT0gJy8nKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHIuc2xpY2UoMSwgLTEpLCAnZycpXG4gICAgfSBlbHNlIHJldHVybiBzdHJcbiAgfVxuICBmb3IgKGxldCBvcmlnIGluIHN1YnMpIHtcbiAgICBzcGVjcyA9IHNwZWNzLnJlcGxhY2UoXG4gICAgICBjb252SWZSZWdFeHAob3JpZyksIFxuICAgICAgcmVwbGFjZW1lbnQoc3Vic1tvcmlnXSlcbiAgICApXG4gIH1cbiAgZGVidWcubG9nKGBbTmV3IFNwZWNzXSAke3NwZWNzfWApXG4gIHJldHVybiBzcGVjc1xufVxubGV0IGZpeFdlYnNpdGUgPSAoKSA9PiB7XG4gIGRlYnVnLnNldERlYnVnRmxhZygpXG4gIGxldCB7bmFtZSwgc3BlY3N9ID0gcmVhZFNwZWNzKClcbiAgbGV0IHN1YnMgPSByZXF1aXJlKCcuL3N1YnN0aXR1dGVzLmpzb24nKVxuICBsZXQgbmV3U3BlY3MgPSBzdWJzdGl0dXRlU3BlY3Moc3BlY3MsIHN1YnMpXG4gIFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2hfcHJvZGRlc2MnKVxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcubm90cmFucycpWzBdLmlubmVySFRNTCA9IFxuICAgIGAke25hbWV9IDxicj48YnI+ICR7bmV3U3BlY3N9YFxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJyxcbiAgZml4V2Vic2l0ZSgpLCBmYWxzZVxuKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInp3ZWkgSmFocmVcIjogXCIyNE1cIixcbiAgXCJXaW5kb3dzIDcgUHJvZmVzc2lvbmFsIDY0Yml0XCI6IFwiV2luIDcgUHJvIDY0XCIsXG4gIFwiV2luZG93cyA3IEhvbWUgNjRiaXRcIjogXCJXaW4gNyBIb21lIDY0XCIsXG4gIFwiVVNCIDMuMFwiOiBcIlVTQjNcIixcbiAgXCJVU0IgMi4wXCI6IFwiVVNCMlwiLFxuICBcIkdiIExBTlwiOiBcIkdiaXQgTEFOXCIsXG4gIFwiQmx1ZXRvb3RoXCI6IFwiQlRcIixcbiAgXCJNZWdhcGl4ZWxcIjogXCJNUFwiLFxuICBcIm9wdGlzY2hlcyBMYXVmd2VyazogTi9BXCI6IFwia2VpbiBvcHRpc2NoZXMgTGF1ZndlcmtcIixcbiAgXCJvcHRpc2NoZXMgTGF1Zndlcms6IERWRCsvLVJXIERMXCI6IFwiRFZEKy8tUlcgRExcIixcbiAgXG4gIFxuICBcIkNQVTogXCI6IFwiXCIsXG4gIFwiRmVzdHBsYXR0ZTogXCI6IFwiXCIsXG4gIFwiR3JhZmlrOiBcIjogXCJcIixcbiAgXCJEaXNwbGF5OiBcIjogXCJcIixcbiAgXCJXaXJlbGVzczogXCI6IFwiXCIsXG4gIFwiQmV0cmllYnNzeXN0ZW06IFwiOiBcIlwiLFxuICBcIkdld2ljaHQ6IFwiOiBcIlwiLFxuICBcIkJlc29uZGVyaGVpdGVuOiBcIjogXCJcIixcbiAgXCJBbnNjaGzDvHNzZTogXCI6IFwiXCIsXG4gIFxuICBcbiAgXCIvXigoPyFvcHRpc2NoZXMgTGF1ZndlcmspLikqJC9cIjogXCIkJiDigKIga2VpbiBvcHRpc2NoZXMgTGF1ZndlcmtcIixcbn1cbiJdfQ==
