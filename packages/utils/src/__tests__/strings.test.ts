import { leftPadding } from '../strings';

describe('leftPadding', () => {
  it('should fill number with zeros', () => {
    const shortNumber = 4;
    const formattedNumber = leftPadding(shortNumber, 0, 5);
    expect(formattedNumber).toBe('00004');
  });

  it('should handle filling with more than one char', () => {
    const shortString = '12';
    const longString = leftPadding(shortString, 'xx', 9);
    expect(longString).toBe('xxxxxxxx12');
  });
});
