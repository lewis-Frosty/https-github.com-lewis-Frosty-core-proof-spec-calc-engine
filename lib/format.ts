/** Format a money amount with its currency. Trailing ".00" is dropped to match
 *  the storefront's compact price style (e.g. "£38", "$120.50"). */
export function formatMoney(amount: number | string, currencyCode = 'GBP'): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!Number.isFinite(value)) return '';
  try {
    const formatted = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
    return formatted.replace(/[.,]00(?=\D*$)/, '');
  } catch {
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}
