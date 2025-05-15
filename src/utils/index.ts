export const formatWithCommas = (
  value: number | string | undefined
): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '0.00';
  }

  const fixedValue = Number(value).toFixed(2); // ensures 2 decimal places
  const parts = fixedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
