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
});