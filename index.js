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
function filterSpecs (val) {
  if (
  val[1].trim() === '' || 
  val[1].trim() === 'N/A'
  ) return false
  return true
}
function fixSpec (val) {
  switch (val.trim()) {
    case 'zwei Jahre': return "24M"
    case 'Windows 7 Professional 64bit': return "Win 7 Pro 64"
    case 'Windows 8.1 Pro 64bit': return "Win 8.1 Pro 64"
    case 'Windows 8.1 64bit': return "Win 8.1 64"
    case 'USB 3.0': return "USB3"
    case 'USB 2.0': return "USB2"
    case 'Gb LAN': return "Gbit LAN"
    case 'Bluetooth': return "BT"
    case 'Megapixel': return "MP"
    default: return val
  }
}
function createNewSpecString() {
  let {name, specs} = getSpecs()
  specs = specs
    .filter(filterSpecs)
    .map(val => new Array(val[0], fixSpec(val[1])))
    .map(val => val[0] + ': ' + val[1].trim())
  return name + '<br><br>' + specs
}
function fixWebsite () {
  document.getElementById('gh_proddesc')
    .querySelectorAll('.notrans')[0].innerHTML = 
    createNewSpecString()
}

fixWebsite()

