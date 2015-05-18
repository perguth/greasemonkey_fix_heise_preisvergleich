let debug = {
  enabled: false,
  log: (str) => {
    if (debug.enabled) console.log(str)
  },
  setDebugFlag: () => {
    let url = window.location.href.toString()
    let idx = url.indexOf("#")
    let anchor = (idx != -1) ? url.substring(idx+1) : ""
    console.log('[Anchor found] '+ anchor)
    if (anchor.trim() === 'debug') {
      debug.enabled = true
    }
  }
}
let readSpecs = () => {
  let name = 
     document.getElementById('mitte_preisvergleicher')
    .getElementsByTagName('h1')[0]
    .querySelectorAll('.notrans')[0]
    .firstChild.data
  let specs = 
     document.getElementById('gh_proddesc')
    .querySelectorAll('.notrans')[0]
    .firstChild.data
  
  debug.log(`[Original Specs] ${specs}`)
  return {name, specs}
}
let substituteSpecs = (specs, subs) => {
  let replacement = (str) => {
    if (debug.enabled) {
      if (str === '')
        return `<b style='color: red;'>― </b> `
      else {
        if (str[0] !== '$')
          return `<b style='color: red;'>${str}</b>`
        else // ..we have a replacement pattern so:
          return str.slice(0, 2) + 
            `<b style='color: red;'>${str.slice(2)}</b>`
      } 
    } else return str
  }
  let convIfRegExp = (str) => {
    if (str[0] === '/') {
      return new RegExp(str.slice(1, -1), 'g')
    } else return str
  }
  for (let orig in subs) {
    specs = specs.replace(
      convIfRegExp(orig), 
      replacement(subs[orig])
    )
  }
  debug.log(`[New Specs] ${specs}`)
  return specs
}
let fixWebsite = () => {
  debug.setDebugFlag()
  let {name, specs} = readSpecs()
  let subs = require('./substitutes.json')
  let newSpecs = substituteSpecs(specs, subs)
  
  document.getElementById('gh_proddesc')
    .querySelectorAll('.notrans')[0].innerHTML = 
    newSpecs
}

document.addEventListener('DOMContentLoaded',
  fixWebsite(), false
)
