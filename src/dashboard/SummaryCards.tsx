import { Tile } from '@carbon/react';
import { useTransactionStore } from '../store/transactionStore';
import { calcSummary } from '../utils/calcSummary';
import { formatVND } from '../utils/format';

export default function SummaryCards() {
  const transactions = useTransactionStore(s => s.transactions);
  const summary = calcSummary(transactions);

  return (
    <div className="summary-cards-grid">
      <Tile className="summary-card income">
        <div className="summary-icon">➕</div>
        <h5>Thu nhập</h5>
        <strong className="summary-value">{formatVND(summary.income)}</strong>
      </Tile>

      <Tile className="summary-card expense">
        <div className="summary-icon">💸</div>
        <h5>Chi tiêu</h5>
        <strong className="summary-value">{formatVND(summary.expense)}</strong>
      </Tile>

      <Tile className="summary-card transfer">
        <div className="summary-icon">❤️</div>
        <h5>Chuyển vợ</h5>
        <strong className="summary-value">{formatVND(summary.transferToWife)}</strong>
      </Tile>

      <Tile className="summary-card allocated">
        <div className="summary-icon">💾</div>
        <h5>Dành cho vợ</h5>
        <strong className="summary-value">{formatVND(summary.forWife)}</strong>
      </Tile>

      <Tile className="summary-card keep">
        <div className="summary-icon">🧍</div>
        <h5>Giữ lại</h5>
        <strong className="summary-value">{formatVND(summary.keep)}</strong>
      </Tile>
    </div>
  );
}
