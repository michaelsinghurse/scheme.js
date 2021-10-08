function parseList(input) {
  // we know that input begins with '('
  // initialize array ['list', []]
  // initialize pointer i for start and n for end
  // walk down the input starting at index 1
  // - if char is a letter or number,
  //   - advance n to the next space
  //   - push onto list array parse of slice from i to n
  //   - set i and n equal to n + 1
  // - if char is a quote
  //   - advance n to the next quote
  //   - push ont list array parse of slice from i to n
  //   - set i and n equal to n + 1
  // if char is a '('
  //   - advance n to the matching closing ')'
  //   - push onto list array parse of slice from i to n
  //   - set i and n eqal to n + 1
  // return the array
  const output = ['list', []];
  const openingParens = [];

  let i = 0;
  let n = 0;
  
  // try: (foo)
  //      length = 5
  while (i < input.length) {
    const char = input[i];

    // OPENING PARENS
    if (char === '(') {
      openingParens.push(char);

      i += 1;
      n = i;

    // CLOSING PARENS
    } else if (char === ')') {
      if (openingParens.length === 0) {
        throw new Error(`Malformed list: ${input}`);
      }

      openingParens.pop();

      i += 1;
      n = i;

    // SYMBOL 
    } else if (/[A-Za-z]/.test(char)) {
      // walk to end of symbol
      // TODO: make sure n doesn't go past end of input
      while (input[n] !== ' ' && input[n] !== ')') {
        n += 1;
      }

      const symbol = input.slice(i, n);
      output[1].push(parse(symbol));

      // set pointers to next non-space if necessary 
      // (eventually include whitespace chars)
      while (input[n] === ' ') {
        n += 1;
      }

      i = n;
    }
  }

  if (openingParens.length !== 0) {
    throw new Error(`Malformed list: ${input}`);
  }
  
  return output; 
}

function parse(input) {
  // NO INPUT PROVIDED
  if (input === undefined || input === '') {
    return [ 'string', ''];

  // LIST
  } else if (input[0] === '(') {
    return parseList(input);

  // BOOLEAN
  } else if (input === '#t' || input === '#f') {
    return [ 'boolean', input === '#t' ? true : false ];

  // SYMBOL
  } else if (/[A-Za-z]/.test(input[0])) {
    let i = 1;
    while (i < input.length) {
      if (input[i] === ' ') {
        break;
      }
      i += 1;
    }
    
    if (i === input.length) {
      return ['symbol', input];
    } else {
      throw new Error(`Invalid symbol: ${input}`);
    }

  // QUOTE
  } else if (input[0] === '"') {

    let i = 1;
    while (i < input.length) {
      if (input[i] === '"') {
        break;
      }
      i += 1;
    }
 
    if (i === input.length - 1) {
      return ['quote', input.slice(1, i)];
    } else if (i === input.length) {
      throw new Error(`Opening quote missing closing quote: ${input}`);
    }

  // NUMBER
  } else if (!Number.isNaN(Number(input))) {
    return ['number', Number(input)];
  
  // ERROR
  } else {
    throw new Error(`Invalid input: ${input}`);
  }
}

module.exports = parse;
