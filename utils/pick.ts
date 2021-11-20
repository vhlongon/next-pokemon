export const pick = <O, K extends keyof O>(obj: O, ...keys: K[]): Pick<O, K> =>
  keys.reduce<Pick<O, K>>(
    (acc, val) => (obj[val] ? { ...acc, [val]: obj[val] } : acc),
    {} as Pick<O, K>
  );
