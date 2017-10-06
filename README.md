# greasemonkey_fix_heise_preisvergleich

[![Greenkeeper badge](https://badges.greenkeeper.io/pguth/greasemonkey_fix_heise_preisvergleich.svg)](https://greenkeeper.io/)

*Turn the product tech sheet (eg. [this one](http://www.heise.de/preisvergleich/eu/asus-zenbook-ux305fa-fb003h-schwarz-90nb06x1-m00070-a1161580.html)) into something usable.*

![Example. Changes in red and marked by dashes.](http://imageshack.com/a/img540/7163/MsWDi7.png)
<small>***⇡ Changes in red and removals marked by dashes for demonstration purposes.***</small>

## Functionality

- Performs various text replacements (see [this list](https://github.com/pguth/greasemonkey_fix_heise_preisvergleich/blob/master/substitutes.jsonp)) on the tech sheet.
- Pulls the replacement rules from this Github repo (can be turned off when building it oneself).

# Install

1. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
- Click on [greasemonkey_fix_heise_preisvergleich.user.js](https://github.com/pguth/greasemonkey_fix_heise_preisvergleich/raw/master/greasemonkey_fix_heise_preisvergleich.user.js) that you'll find in this repo.
- You will automatically get a Greasemonkey install prompt.

## Build it yourself
1. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).

  ```sh
git clone https://github.com/pguth/greasemonkey_fix_heise_preisvergleich.git
cd greasemonkey_fix_heise_preisvergleich
# Configure your `greasemonkey.conf`.
# See [Greasemonkey Hacks](http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Provide_a_Default_Configuration)
# for help with the greasemonkey configuration file.
nano greasemonkey.conf
# Configure all the rest in `index.js`
npm install
gulp watch
```

1. `CTRL+C` to end the watch process - it generated our needed output already.
- Now just drag and drop the fresh `greasemonkey_fix_heise_preisvergleich.user.js` into your Firefox.


# Development

- Don't forget to enable `extensions.greasemonkey.fileIsGreaseable` in FF so Greasemonkey will run on local files.
- Install once in FF/Greasemonkey then replace the `greasemonkey_fix_heise_preisvergleich.user.js` with a softlink to the automatically generated file in your local repo. That way Greasemonkey will always have the most recent script.
- The anchor `#debug` colors all text replacements red and gives out some information on the console.

## Original spec string

```
CPU: Intel Core M-5Y10, 2x 800MHz • RAM: 8GB • Festplatte: 256GB SSD • optisches Laufwerk: N/A • Grafik: Intel HD Graphics 5300 (IGP), Micro HDMI • Display: 13.3", 3200x1800, non-glare, IPS • Anschlüsse: 3x USB 3.0 • Wireless: WLAN 802.11a/b/g/n/ac, Bluetooth 4.0 • Cardreader: 4in1 (SD/SDHC/SDXC/MMC) • Webcam: 1.0 Megapixel • Betriebssystem: Windows 8.1 64bit • Akku: Li-Polymer • Gewicht: 1.20kg • Besonderheiten: lüfterlos

Gelistet seit: 03.09.2014, 17:54

Es liegen noch keine Bewertungen für dieses Produkt vor (Produkt bewerten).
```

```html
<div id="gh_proddesc">
  <span class="notrans">CPU: Intel Core M-5Y10, 2x 800MHz • RAM: 8GB • Festplatte: 256GB SSD • optisches Laufwerk: N/A • Grafik: Intel HD Graphics 5300 (IGP), Micro HDMI • Display: 13.3", 3200x1800, non-glare, IPS • Anschlüsse: 3x USB 3.0 • Wireless: WLAN 802.11a/b/g/n/ac, Bluetooth 4.0 • Cardreader: 4in1 (SD/SDHC/SDXC/MMC) • Webcam: 1.0 Megapixel • Betriebssystem: Windows 8.1 64bit • Akku: Li-Polymer • Gewicht: 1.20kg • Besonderheiten: lüfterlos
    <p>
      Gelistet seit: 03.09.2014, 17:54
    </p><p>
      Es liegen noch keine Bewertungen für dieses Produkt vor (<a rel="nofollow" href="bew_1161580.html">Produkt bewerten</a>).
    </p>
  </span>
</div>
```

# Ressources

- [RegExr](http://www.regexr.com/): Online tool to learn, build, & test Regular Expressions



***

[![GNU Affero General Public License](https://www.gnu.org/graphics/agplv3-155x51.png)](http://zedshaw.com/archive/why-i-algpl/)
[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)
[![Developer using Firefox Developer](https://affiliates.mozilla.org/media/uploads/image_banners/a47240839834560ba213f2ed7df82697d6bc7766.png)](https://www.mozilla.org/en-US/firefox/channel/#developer?utm_source=firefox-affiliates&utm_medium=banner&utm_campaign=aff-desktop-download-aurora)
[![soma fm: DEF CON Radio](http://somafm.com/img/defcon120.png)](http://somafm.com/player/#/now-playing/defcon)
