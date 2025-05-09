export function percentDifference(price1, price2) {
  price1 = Number(price1);
  price2 = Number(price2);
  if (isNaN(price1) || isNaN(price2)) return "NaN"; // Обработка нечисловых значений
  if (price1 === 0 && price2 === 0) return "0.00";
  const average = (price1 + price2) / 2;
  return (100 * Math.abs((price1 - price2) / average).toFixed(4));
}