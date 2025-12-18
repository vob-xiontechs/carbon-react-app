export function calculateSummary(income: number, expense: number) {
  const net = income - expense;

  const toWife = net * 0.5;
  const wifeSaving = net * 0.2;
  const keep = net - toWife - wifeSaving;

  return { net, toWife, wifeSaving, keep };
}
