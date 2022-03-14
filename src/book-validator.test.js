const v = require("./book-validator");

// Make sure that our normal test works so our environment is all set up.
test('SANITY CHECK: 1 + 2 = 3', () => {
  expect(v.sum(1, 2)).toBe(3);
});

/**
 * @jest-environment jsdom
 *
 * ^^^^^^^^^^^^^^^^^^^^^^^-magic comment for Jest's DOM tools. This MUST be at the top.
 *
 * Jest Unit Tests for the book-validator set of functions
 */
describe('testing isTitle', () => {
  test('single letter',     () => { expect(v.isTitle('A')).toBe(true) });
  test('simple title',      () => { expect(v.isTitle('War and Peace')).toBe(true) });
  test('Block list',        () => { expect(v.isTitle("Boaty McBoatface")).toBe(false) });
  test('Block, mixed case', () => { expect(v.isTitle("bOaTy McBoAtFaCe")).toBe(false) });
  test('Anchor drop!',      () => { expect(v.isTitle("ok💩")).toBe(false) });
  test('Leading spaces',    () => { expect(v.isTitle('   a')).toBe(false) });
  test('Trailing spaces',   () => { expect(v.isTitle('a   ')).toBe(false) });
  test('evil tab',          () => { expect(v.isTitle("a\tb")).toBe(false) });
  test('evil newline',      () => { expect(v.isTitle("a\nb")).toBe(false) });
  test('evil Win newline',  () => { expect(v.isTitle("a\r\nb")).toBe(false) });
  test('evil form feed',    () => { expect(v.isTitle("a\fb")).toBe(false) });
  test('evil vtab',         () => { expect(v.isTitle("a\vb")).toBe(false) });
});