export default function parseAmount(amount: number) {
  const num = amount;
  if (isNaN(num) || num < 1) {
    return '--';
  }

  if (num < 1000) {
    // Hundreds
    return `N${num}`;
  } else if (num < 1000000) {
    // Thousands
    return `N${Math.floor(num / 1000)}k`;
  } else {
    // Millions
    const millions = num / 1000000;
    if (millions % 1 === 0) {
      // Whole number of millions
      return `N${millions}m`;
    } else {
      // Decimal millions, round to 2 decimal places
      return `N${millions.toFixed(2)}m`;
    }
  }
}
