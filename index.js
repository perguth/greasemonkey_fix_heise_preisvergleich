var parseOrig = function (string) {
  string = string.split('•')
  return specs.map(val => val.split(':'))
}

var product = 
   document.getElementById('mitte_preisvergleicher')
  .getElementsByTagName('h1')[0]
  .querySelectorAll('.notrans')[0]
  .firstChild.data
var specsOrig = 
   document.getElementById('gh_proddesc')
  .querySelectorAll('.notrans')[0]
  .firstChild.data
var specs = []
var specsNew = ''

//specsNew = product + "<br><br>" + specsOrig


specs = specsOrig.split('•')
for (var i = 0; i < specs.length; i++) {
  specsNew += specs[i].split(':') + 'AAA'
  //if (i % 2 === 0) specs[i] = specs[i].slice(0,-1)
}


// actually replace text:
document.getElementById('gh_proddesc')
  .querySelectorAll('.notrans')[0].innerHTML = specsNew

