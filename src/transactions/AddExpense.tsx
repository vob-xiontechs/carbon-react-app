import { Button } from '@carbon/react';
import { useTransactionStore } from '../store/transactionStore';

export default function AddExpense() {
  const add = useTransactionStore(s => s.add);

  return (
    <Button kind="danger"
      onClick={() =>
        add({
          id: Date.now().toString(),
          type: 'expense',
          amount: 200000,
          date: new Date().toISOString(),
        })
      }
    >
      - Chi tiêu
    </Button>
  );
}
