import type { Transaction } from '../store/transactionStore';

export function calcSummary(transactions: Transaction[]) {
  let income = 0;
  let expense = 0;
  let transferToWife = 0;
  let forWife = 0;
  let keep = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      income += t.amount;

      if (t.allocation) {
        transferToWife += t.allocation.transferToWife;
        forWife += t.allocation.forWife;
        keep += t.allocation.keep;
      }
    }

    if (t.type === 'expense') {
      expense += t.amount;
    }
  });

  return {
    income,
    expense,
    transferToWife,
    forWife,
    keep,
  };
}
