export const normalizeName = (name: string): string => {
  const normalized: Record<string, string> = { deoxys: 'deoxys-normal' };

  return normalized[name] || name;
};
