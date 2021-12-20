export const classnames = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ');
};
