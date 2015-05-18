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
  "Besonderheiten:": "",
  
  
  "/^((?!optisches Laufwerk).)*$/": "$& • kein optisches Laufwerk",
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9wZ3V0aC9naXRodWIvZml4X2hlaXNlX3ByZWlzdmVyZ2xlaWNoL2luZGV4LmpzIiwic3Vic3RpdHV0ZXMuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUc7QUFDVixTQUFPLEVBQUUsS0FBSztBQUNkLEtBQUcsRUFBRSxhQUFDLEdBQUcsRUFBSztBQUNaLFFBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQ3BDO0FBQ0QsY0FBWSxFQUFFLHdCQUFNO0FBQ2xCLFFBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3pDLFFBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDMUIsUUFBSSxNQUFNLEdBQUcsQUFBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3BELFdBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUUsTUFBTSxDQUFDLENBQUE7QUFDdEMsUUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssT0FBTyxFQUFFO0FBQzdCLFdBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0tBQ3JCO0dBQ0Y7Q0FDRixDQUFBO0FBQ0QsSUFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLEdBQVM7QUFDcEIsTUFBSSxJQUFJLEdBQ0wsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUNqRCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDN0IsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7QUFDbEIsTUFBSSxLQUFLLEdBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FDdEMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUE7O0FBRWxCLE9BQUssQ0FBQyxHQUFHLHVCQUFxQixLQUFLLENBQUcsQ0FBQTtBQUN0QyxTQUFPLEVBQUMsSUFBSSxFQUFKLElBQUksRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFDLENBQUE7Q0FDckIsQ0FBQTtBQUNELElBQUksZUFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBSSxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3JDLE1BQUksV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFJLEdBQUcsRUFBSztBQUN6QixRQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDakIsVUFBSSxHQUFHLEtBQUssRUFBRSxFQUNaLHdDQUF1QyxLQUNwQztBQUNILFlBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFDaEIsbUNBQWlDLEdBQUcsVUFBTTtBQUUxQyxpQkFBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZ0NBQ00sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBTSxDQUFBO09BQ2pEO0tBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsTUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQUksR0FBRyxFQUFLO0FBQzFCLFFBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNsQixhQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDekMsTUFBTSxPQUFPLEdBQUcsQ0FBQTtHQUNsQixDQUFBO0FBQ0QsT0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDckIsU0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFDbEIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN4QixDQUFBO0dBQ0Y7QUFDRCxPQUFLLENBQUMsR0FBRyxrQkFBZ0IsS0FBSyxDQUFHLENBQUE7QUFDakMsU0FBTyxLQUFLLENBQUE7Q0FDYixDQUFBO0FBQ0QsSUFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFDckIsT0FBSyxDQUFDLFlBQVksRUFBRSxDQUFBOzttQkFDQSxTQUFTLEVBQUU7O01BQTFCLElBQUksY0FBSixJQUFJO01BQUUsS0FBSyxjQUFMLEtBQUs7O0FBQ2hCLE1BQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3hDLE1BQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7O0FBRTNDLFVBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQ25DLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FDMUMsUUFBUSxDQUFBO0NBQ1gsQ0FBQTs7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQzFDLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FDcEIsQ0FBQTs7O0FDdEVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGRlYnVnID0ge1xuICBlbmFibGVkOiBmYWxzZSxcbiAgbG9nOiAoc3RyKSA9PiB7XG4gICAgaWYgKGRlYnVnLmVuYWJsZWQpIGNvbnNvbGUubG9nKHN0cilcbiAgfSxcbiAgc2V0RGVidWdGbGFnOiAoKSA9PiB7XG4gICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnRvU3RyaW5nKClcbiAgICBsZXQgaWR4ID0gdXJsLmluZGV4T2YoXCIjXCIpXG4gICAgbGV0IGFuY2hvciA9IChpZHggIT0gLTEpID8gdXJsLnN1YnN0cmluZyhpZHgrMSkgOiBcIlwiXG4gICAgY29uc29sZS5sb2coJ1tBbmNob3IgZm91bmRdICcrIGFuY2hvcilcbiAgICBpZiAoYW5jaG9yLnRyaW0oKSA9PT0gJ2RlYnVnJykge1xuICAgICAgZGVidWcuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gIH1cbn1cbmxldCByZWFkU3BlY3MgPSAoKSA9PiB7XG4gIGxldCBuYW1lID0gXG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaXR0ZV9wcmVpc3ZlcmdsZWljaGVyJylcbiAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2gxJylbMF1cbiAgICAucXVlcnlTZWxlY3RvckFsbCgnLm5vdHJhbnMnKVswXVxuICAgIC5maXJzdENoaWxkLmRhdGFcbiAgbGV0IHNwZWNzID0gXG4gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaF9wcm9kZGVzYycpXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RyYW5zJylbMF1cbiAgICAuZmlyc3RDaGlsZC5kYXRhXG4gIFxuICBkZWJ1Zy5sb2coYFtPcmlnaW5hbCBTcGVjc10gJHtzcGVjc31gKVxuICByZXR1cm4ge25hbWUsIHNwZWNzfVxufVxubGV0IHN1YnN0aXR1dGVTcGVjcyA9IChzcGVjcywgc3VicykgPT4ge1xuICBsZXQgcmVwbGFjZW1lbnQgPSAoc3RyKSA9PiB7XG4gICAgaWYgKGRlYnVnLmVuYWJsZWQpIHtcbiAgICAgIGlmIChzdHIgPT09ICcnKVxuICAgICAgICByZXR1cm4gYDxiIHN0eWxlPSdjb2xvcjogcmVkOyc+4oCVIDwvYj4gYFxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChzdHJbMF0gIT09ICckJylcbiAgICAgICAgICByZXR1cm4gYDxiIHN0eWxlPSdjb2xvcjogcmVkOyc+JHtzdHJ9PC9iPmBcbiAgICAgICAgZWxzZSAvLyAuLndlIGhhdmUgYSByZXBsYWNlbWVudCBwYXR0ZXJuIHNvOlxuICAgICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgMikgKyBcbiAgICAgICAgICAgIGA8YiBzdHlsZT0nY29sb3I6IHJlZDsnPiR7c3RyLnNsaWNlKDIpfTwvYj5gXG4gICAgICB9IFxuICAgIH0gZWxzZSByZXR1cm4gc3RyXG4gIH1cbiAgbGV0IGNvbnZJZlJlZ0V4cCA9IChzdHIpID0+IHtcbiAgICBpZiAoc3RyWzBdID09PSAnLycpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHN0ci5zbGljZSgxLCAtMSksICdnJylcbiAgICB9IGVsc2UgcmV0dXJuIHN0clxuICB9XG4gIGZvciAobGV0IG9yaWcgaW4gc3Vicykge1xuICAgIHNwZWNzID0gc3BlY3MucmVwbGFjZShcbiAgICAgIGNvbnZJZlJlZ0V4cChvcmlnKSwgXG4gICAgICByZXBsYWNlbWVudChzdWJzW29yaWddKVxuICAgIClcbiAgfVxuICBkZWJ1Zy5sb2coYFtOZXcgU3BlY3NdICR7c3BlY3N9YClcbiAgcmV0dXJuIHNwZWNzXG59XG5sZXQgZml4V2Vic2l0ZSA9ICgpID0+IHtcbiAgZGVidWcuc2V0RGVidWdGbGFnKClcbiAgbGV0IHtuYW1lLCBzcGVjc30gPSByZWFkU3BlY3MoKVxuICBsZXQgc3VicyA9IHJlcXVpcmUoJy4vc3Vic3RpdHV0ZXMuanNvbicpXG4gIGxldCBuZXdTcGVjcyA9IHN1YnN0aXR1dGVTcGVjcyhzcGVjcywgc3VicylcbiAgXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaF9wcm9kZGVzYycpXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RyYW5zJylbMF0uaW5uZXJIVE1MID0gXG4gICAgbmV3U3BlY3Ncbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsXG4gIGZpeFdlYnNpdGUoKSwgZmFsc2VcbilcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ6d2VpIEphaHJlXCI6IFwiMjRNXCIsXG4gIFwiV2luZG93cyA3IFByb2Zlc3Npb25hbCA2NGJpdFwiOiBcIldpbiA3IFBybyA2NFwiLFxuICBcIldpbmRvd3MgNyBIb21lIDY0Yml0XCI6IFwiV2luIDcgSG9tZSA2NFwiLFxuICBcIlVTQiAzLjBcIjogXCJVU0IzXCIsXG4gIFwiVVNCIDIuMFwiOiBcIlVTQjJcIixcbiAgXCJHYiBMQU5cIjogXCJHYml0IExBTlwiLFxuICBcIkJsdWV0b290aFwiOiBcIkJUXCIsXG4gIFwiTWVnYXBpeGVsXCI6IFwiTVBcIixcbiAgXCJvcHRpc2NoZXMgTGF1Zndlcms6IE4vQVwiOiBcImtlaW4gb3B0aXNjaGVzIExhdWZ3ZXJrXCIsXG4gIFwib3B0aXNjaGVzIExhdWZ3ZXJrOiBEVkQrLy1SVyBETFwiOiBcIkRWRCsvLVJXIERMXCIsXG4gIFxuICBcbiAgXCJDUFU6IFwiOiBcIlwiLFxuICBcIkZlc3RwbGF0dGU6IFwiOiBcIlwiLFxuICBcIkdyYWZpazogXCI6IFwiXCIsXG4gIFwiRGlzcGxheTogXCI6IFwiXCIsXG4gIFwiV2lyZWxlc3M6IFwiOiBcIlwiLFxuICBcIkJldHJpZWJzc3lzdGVtOiBcIjogXCJcIixcbiAgXCJHZXdpY2h0OiBcIjogXCJcIixcbiAgXCJCZXNvbmRlcmhlaXRlbjpcIjogXCJcIixcbiAgXG4gIFxuICBcIi9eKCg/IW9wdGlzY2hlcyBMYXVmd2VyaykuKSokL1wiOiBcIiQmIOKAoiBrZWluIG9wdGlzY2hlcyBMYXVmd2Vya1wiLFxufVxuIl19
