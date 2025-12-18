import { Button } from '@carbon/react';
import { useState } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { formatVND } from '../utils/format';

export default function TransactionList() {
  const { transactions, remove } = useTransactionStore();
  const [selected, setSelected] = useState<string | null>(null);

  const transactionToDelete = transactions.find(t => t.id === selected);

  // Calculate totals for header summary
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  if (transactions.length === 0) {
    return (
      <div className="transaction-list-empty">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Chưa có giao dịch nào</p>
        <p style={{ fontSize: '0.95rem', color: '#a9bcd6' }}>Hãy thêm giao dịch đầu tiên để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="transaction-list-wrapper">
      {/* Summary Header */}
      <div className="transaction-summary">
        <div className="summary-item income-summary">
          <span className="summary-label">Thu nhập</span>
          <span className="summary-value">{formatVND(income)}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item expense-summary">
          <span className="summary-label">Chi tiêu</span>
          <span className="summary-value">{formatVND(expense)}</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-item balance-summary">
          <span className="summary-label">Lợi nhuận</span>
          <span className="summary-value">{formatVND(income - expense)}</span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {transactions.map((t, index) => (
          <div 
            key={t.id} 
            className={`transaction-item ${t.type === 'income' ? 'income-type' : 'expense-type'}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="transaction-icon">
              {t.type === 'income' ? '➕' : '➖'}
            </div>
            
            <div className="transaction-info">
              <div className="transaction-type">
                {t.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
              </div>
              {t.note && <div className="transaction-note">{t.note}</div>}
              <div className="transaction-date">
                {new Date(t.date).toLocaleDateString('vi-VN', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            
            <div className="transaction-middle">
              <div className="transaction-amount">
                {formatVND(t.amount)}
              </div>
            </div>

            <div className="transaction-actions">
              <Button
                kind="danger--tertiary"
                size="sm"
                onClick={() => setSelected(t.id)}
                className="delete-btn"
              >
                🗑️
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteModal
        open={!!selected}
        transaction={transactionToDelete}
        onClose={() => setSelected(null)}
        onConfirm={() => {
          if (selected) remove(selected);
          setSelected(null);
        }}
      />
    </div>
  );
}
