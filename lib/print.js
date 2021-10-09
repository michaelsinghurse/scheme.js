function getStringToPrint(value) {
  switch (value[0]) {
    case 'quote':
      return `"${value[1]}"`;
    case 'symbol':
      return value[1];
    case 'number':
      return value[1];
    case 'boolean':
      return value[1] ? '#t' : '#f';
  }
}

function print(value) {
  if (value[0] === 'message') {
    if (value[1] === 'clear') {
      console.clear();
    } else {
      console.log(value[1]);
    }
  } else if (value[0] === 'list') {
    let output = '(';

    value[1].forEach((val, idx) => {
      output += getStringToPrint(val);

      if (idx !== value[1].length - 1) {
        output += ' ';
      }
    });

    output += ')';

    console.log(output);
  } else {
    const output = getStringToPrint(value);
    console.log(output);
  }
}

module.exports = print;
