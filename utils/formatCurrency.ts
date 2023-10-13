export function formatCurrency(priceInCents: number): string {
  // Convert the price from cents to a standard currency format
  const dollars = (priceInCents / 100).toFixed(2);

  // Return the formatted price with a dollar sign
  return `$${dollars}`;
}
