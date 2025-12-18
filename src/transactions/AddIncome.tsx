import { useState } from 'react';
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  InlineNotification
} from '@carbon/react';
import { useTransactionStore } from '../store/transactionStore';

type IncomeSource = 'grab' | 'salary' | 'other';

export default function AddIncome() {
  const add = useTransactionStore(s => s.add);

  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<IncomeSource>('grab');
  const [forWife, setForWife] = useState('');
  const [transfer, setTransfer] = useState('');
  const [keep, setKeep] = useState('');
  const [error, setError] = useState('');

  const totalAllocation =
    Number(forWife) + Number(transfer) + Number(keep);

  const handleSubmit = () => {
    if (!amount) return;

    if (totalAllocation !== Number(amount)) {
      setError('Tổng chia tiền phải bằng tổng thu');
      return;
    }

    setError('');

    add({
      id: Date.now().toString(),
      type: 'income',
      source,
      amount: Number(amount),
      allocation: {
        forWife: Number(forWife),
        transferToWife: Number(transfer),
        keep: Number(keep),
      },
      date: new Date().toISOString(),
    });

    setAmount('');
    setForWife('');
    setTransfer('');
    setKeep('');
  };

  return (
    <div style={{ maxWidth: 380, marginTop: 24 }}>
      <h4>➕ Thu nhập</h4>

      <Select
        id="income-source"
        labelText="Nguồn thu"
        value={source}
        onChange={(e) => setSource(e.target.value as IncomeSource)}
      >
        <SelectItem value="grab" text="🚗 Chạy Grab" />
        <SelectItem value="salary" text="🏢 Lương công ty" />
        <SelectItem value="other" text="💵 Thu khác" />
      </Select>

      <TextInput
        id="income-amount"
        labelText="Tổng tiền thu"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <hr style={{ margin: '12px 0' }} />

      <TextInput
        id="income-for-wife"
        labelText="❤️ Giành cho Vợ"
        value={forWife}
        onChange={(e) => setForWife(e.target.value)}
      />

      <TextInput
        id="income-transfer"
        labelText="💸 Chuyển cho Vợ"
        value={transfer}
        onChange={(e) => setTransfer(e.target.value)}
      />

      <TextInput
        id="income-keep"
        labelText="👤 Giữ lại"
        value={keep}
        onChange={(e) => setKeep(e.target.value)}
      />

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Tổng chia: {totalAllocation.toLocaleString()} VND
      </p>

      {error && (
        <InlineNotification
          kind="error"
          title="Lỗi"
          subtitle={error}
        />
      )}

      <Button style={{ marginTop: 12 }} onClick={handleSubmit}>
        Lưu thu nhập
      </Button>
    </div>
  );
}
