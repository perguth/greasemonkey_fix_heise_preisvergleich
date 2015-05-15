# fix_heise_preisvergleich

*Turn the product tech sheet into something usable.*


## Functionality

- [x] Produktname vor den Text einfuegen.
- [x] Replacements:
  - `zwei Jahre` -> `24M`
  - `Windows 7 Professional 64bit` -> `Win 7 Pro 64`
  - `Windows 8.1 Pro 64bit` -> `Win 8.1 Pro 64`
  - `USB 3.0` -> `USB3`
  - `USB 2.0` -> `USB2`
  - `Gb LAN` -> `Gbit LAN`
  - `Bluetooth` -> `BT`
  - `Megapixel` -> `MP`
- [x] Folgende Eintraege ohne Label: 
  ```
CPU:
Festplatte:
Grafik:
Display:
Wireless:
Betriebssystem:
Gewicht: 
Besonderheiten:
```
- [x] "optisches Laufwerk:" streichen ausser wenn n/a dahintersteht, dann schreiben "kein opt...."


# Install

1. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- Click https://github.com/pguth/fix_heise_preisvergleich/raw/master/fix_heise_preisvergleich.user.js
- You will automatically get a Greasemonkey install prompt.

## Build it yourself
1. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- Generate your script file. See [Greasemonkey Hacks](http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Provide_a_Default_Configuration) for help with the greasemonkey configuration file.  

  ```sh
git clone https://github.com/pguth/fix_heise_preisvergleich.git
cd fix_heise_preisvergleich
# Configure your `greasemonkey.conf`:
nano greasemonkey.conf
npm install
gulp watch
```

1. `CTRL+C` to end the watch process - it generated our needed output already.
- Now just drag and drop the fresh `fix_heise_preisvergleich.user.js` into your Firefox.


# Development

1. Don't forget to enable `extensions.greasemonkey.fileIsGreaseable` in FF so Greasemonkey will run on local files.
- Install once in FF/Greasemonkey then replace the `fix_heise_preisvergleich.user.js` with a softlink to the automatically generated file in your local repo. That way Greasemonkey will always have the most recent script.

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
