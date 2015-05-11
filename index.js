function getSpecs () {
  let name = 
     document.getElementById('mitte_preisvergleicher')
    .getElementsByTagName('h1')[0]
    .querySelectorAll('.notrans')[0]
    .firstChild.data
  let specs = 
     document.getElementById('gh_proddesc')
    .querySelectorAll('.notrans')[0]
    .firstChild.data
  specs = parseSpecString(specs)
  return {name, specs}
}
function parseSpecString (string) {
  string = string.split('•')
  return string.map(val => val.split(':'))
}
function filterSpecialPairs (val) {
  if (
    val[1].trim() === 'N/A' &&
    val[0].trim() === 'optisches Laufwerk'
  ) return new Array('', 'kein optisches Laufwerk')
  else return val
}
function filterSpecKeys (val) {
  switch (val[0].trim()) {
    case 'CPU':
    case 'Festplatte':
    case 'Grafik':
    case 'Display':
    case 'Wireless':
    case 'Betriebssystem':
    case 'Gewicht': 
    case 'Besonderheiten':
    break
    default: return val
  }
  return new Array('', val[1])
}
function filterSpecValues (val, i, array) {
  if (
    val[1].trim() === '' || 
    val[1].trim() === 'N/A'
  ) return false
  return true
}
function fixSpec (val) {
  console.log(val)
  switch (val.trim()) {
    case 'zwei Jahre': return "24M"
    case 'Windows 7 Professional 64bit': return "Win 7 Pro 64"
    case 'Windows 8.1 Pro 64bit': return "Win 8.1 Pro 64"
    case 'Windows 8.1 64bit': return "Win 8.1 64"
    case 'USB 3.0': return "USB3"
    case 'USB 2.0': return "USB2"
    case 'Gb LAN': return "Gbit LAN"
    case '1.0 Megapixel': return "1.0 MP"
    case '2.0 Megapixel': return "2.0 MP"
    case '3.0 Megapixel': return "3.0 MP"
    case '4.0 Megapixel': return "4.0 MP"
    case '5.0 Megapixel': return "5.0 MP"
    default: return val
  }
}
function makeList (val, i, array) {
  console.log(i)
  let entry = ''
  if (val[0].trim() !== '')
    entry = val[0] + ': ' + val[1].trim()
  else
    entry = val[1].trim()
  if (i < array.length -1) return entry + ', '
  else return entry
}
function createNewSpecString() {
  let {name, specs} = getSpecs()
  specs = specs
    .map(filterSpecialPairs)
    .map(filterSpecKeys)
    .filter(filterSpecValues)
    .map(val => new Array(val[0], fixSpec(val[1])))
    .map(makeList)
    .join('')
  return name + '<br><br>' + specs
}
function fixWebsite () {
  document.getElementById('gh_proddesc')
    .querySelectorAll('.notrans')[0].innerHTML = 
    createNewSpecString()
}

fixWebsite()

