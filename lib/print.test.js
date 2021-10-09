const print = require('./print');

describe('PRINT', () => {
  test('it is a function', () => {
    expect(typeof print).toEqual('function');
  });

  test('an empty string message outputs an empty string', () => {
    console.log = jest.fn();

    print([ 'message', '' ]);

    expect(console.log).toHaveBeenCalledWith('');
  });

  test('a clear message clears the console', () => {
    console.clear = jest.fn();

    print([ 'message', 'clear' ]);

    expect(console.clear).toHaveBeenCalledTimes(1);
  });

  test('a quote prints a quoted string', () => {
    console.log = jest.fn();

    print([ 'quote', 'foo' ]);

    expect(console.log).toHaveBeenCalledWith('"foo"');
  });

  test('a symbol prints the symbol', () => {
    console.log = jest.fn();

    print([ 'symbol', 'someFunc' ]);

    expect(console.log).toHaveBeenCalledWith('someFunc');
  });

  test('a number prints the number', () => {
    console.log = jest.fn();

    print([ 'number', '123.45' ]);

    expect(console.log).toHaveBeenCalledWith('123.45');
  });

  test('a boolean prints the boolean', () => {
    console.log = jest.fn();

    print([ 'boolean', true ]);
    expect(console.log).toHaveBeenCalledWith('#t');

    print([ 'boolean', false ]);
    expect(console.log).toHaveBeenCalledWith('#f');
  });

  test('a one element list of atomic values prints properly', () => {
    console.log = jest.fn();

    print([ 'list', [ [ 'symbol', 'foo' ] ] ]);

    expect(console.log).toHaveBeenCalledWith('(foo)');
  });

  test('a three element list of atomic values prints properly', () => {
    console.log = jest.fn();

    print([ 'list', [ [ 'symbol', 'define' ], [ 'symbol', 'foo' ], [ 'number', '5' ] ] ]);

    expect(console.log).toHaveBeenCalledWith('(define foo 5)');
  });
});


















