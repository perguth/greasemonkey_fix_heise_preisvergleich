import Cycle from 'cyclejs'
let {h} = Cycle

function computer(interactions) {
  return interactions.get('.myinput', 'input')
    .map(ev => ev.target.value)
    .startWith('')
    .map(name =>
      h('div', [
        h('label', 'Name:'),
        h('input.myinput', {attributes: {type: 'text'}}),
        h('hr'),
        h('h1', 'Hello ' + name)
      ])
    );
}

Cycle.applyToDOM('#js-container', computer);
