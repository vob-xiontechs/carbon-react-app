import { Button } from '@carbon/react';
import { useTransactionStore } from '../store/transactionStore';

export default function ResetAll() {
  const reset = useTransactionStore(s => s.reset);

  return (
    <Button
        kind="danger"
        size="sm"
        onClick={() => {
            const code = prompt('Nhập "RESET" để xác nhận xóa toàn bộ dữ liệu');
            if (code === 'RESET') {
            reset();
            }
        }}
        >
        ♻️ Reset toàn bộ
        </Button>

  );
}
