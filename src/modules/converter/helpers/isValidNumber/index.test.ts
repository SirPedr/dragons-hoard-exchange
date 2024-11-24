import { describe, expect, it } from 'vitest';
import { isValidNumber } from '.';

describe('isValidNumber', () => {
  it.each(['123', '123.45', '-123.45'])(
    "should return true for a valid '%s' string",
    (value) => {
      expect(isValidNumber(value)).toBe(true);
    },
  );

  it.each(['abc', '123abc', ''])(
    "should return false for an invalid '%s' string",
    (value) => {
      expect(isValidNumber(value)).toBe(false);
    },
  );

  it('should return false for a string with only spaces', () => {
    expect(isValidNumber('   ')).toBe(false);
  });
});
