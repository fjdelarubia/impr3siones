export const leftPadding = (
  text: string | number,
  paddingChar: string | number,
  length: number
): string => {
  const charsLeft = Math.ceil(
    (length - text.toString().length) / paddingChar.toString().length
  );
  const padding = Array.from({ length: charsLeft })
    .map(() => paddingChar)
    .join('');
  return `${padding}${text}`;
};
