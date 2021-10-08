const evaluate = require('./lib/evaluate');
const parse = require('./lib/parse');
const print = require('./lib/print');
const read = require('./lib/read');

const GLOBAL_ENV = [{}];

function repl() {
  const input = read(); 

  if (input === 'exit') return; 

  if (input === 'clear') {
    console.clear();
  } else {
    try {
      print(evaluate(parse(input), GLOBAL_ENV));
    } catch (err) {
      print(['error', err]);
    }
  }

  repl();
}

repl();

