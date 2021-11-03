import { FirebaseMap } from '../models/utils';

export const firebaseMapToPairArray = <S>(
  source: FirebaseMap<S>
): Array<[string, S]> => {
  const d: Array<[string, S]> = [];

  for (const k in source) {
    if (typeof source[k] === 'string') {
      d.push([k, source[k]]);
    } else {
      d.push([k, { ...source[k] }]);
    }
  }

  return d;
};
