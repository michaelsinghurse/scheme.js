const parse = require('./parse');

describe('PARSE', () => {
  test('it is a function', () => {
    expect(typeof parse).toBe('function');
  });

  test('passing a non-string throws an error', () => {
    expect(() => parse(null)).toThrow();
    expect(() => parse(1)).toThrow();
    expect(() => parse(true)).toThrow();
    expect(() => parse([])).toThrow();
    expect(() => parse({})).toThrow();
  });

  test('passing an empty string returns empty string messsage', () => {
    const actual = parse('');
    expect(actual).toEqual([ 'message', '' ]);
  });

  test('passing `clear` command returns clear message', () => {
    const actual = parse('clear');
    expect(actual).toEqual([ 'message', 'clear' ]);
  });

  test('passing `exit` command returns exit message', () => {
    const actual = parse('exit');
    expect(actual).toEqual([ 'message', 'exit' ]);
  });

  test('passing a digit returns appropriately', () => {
    const actual = parse('123.45');
    expect(actual).toEqual([ 'number', 123.45 ]);
  });

  test('passing a boolean returns appropriately', () => {
    let actual = parse('#t');
    expect(actual).toEqual([ 'boolean', true ]);

    actual = parse('#f');
    expect(actual).toEqual([ 'boolean', false ]);
  });
});
