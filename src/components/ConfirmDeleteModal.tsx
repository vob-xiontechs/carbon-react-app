import { Modal } from '@carbon/react';
import { useEffect } from 'react';
import type { Transaction } from '../store/transactionStore';
import { formatVND } from '../utils/format';

type Props = {
  open: boolean;
  transaction?: Transaction;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  open,
  transaction,
  onClose,
  onConfirm,
}: Props) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  // Show modal even during transition if it's open
  if (!open && !transaction) return null;

  const displayTransaction = transaction || {
    type: 'expense' as const,
    amount: 0,
    date: new Date().toISOString(),
    id: '',
    allocation: { forWife: 0, transferToWife: 0, keep: 0 },
  };

  return (
    <Modal
      open={open}
      modalHeading="⚠️ Xác nhận xóa giao dịch"
      primaryButtonText="Xóa"
      secondaryButtonText="Hủy"
      danger
      onRequestClose={onClose}
      onRequestSubmit={onConfirm}
      className="delete-modal"
      passiveModal={false}
    >
      <div className="modal-content">
        <p className="modal-question">Bạn có chắc chắn muốn xóa giao dịch này?</p>

        <div className="modal-details">
          <div className="detail-item">
            <span className="detail-label">Loại:</span>
            <span className="detail-value">
              {displayTransaction.type === 'income' ? '➕ Thu nhập' : '➖ Chi tiêu'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Số tiền:</span>
            <span className="detail-amount">
              {formatVND(displayTransaction.amount)}
            </span>
          </div>

          {displayTransaction.allocation && (
            <>
              <div className="detail-item">
                <span className="detail-label">❤️ Chuyển vợ:</span>
                <span className="detail-value">
                  {formatVND(displayTransaction.allocation.transferToWife)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">💾 Dành cho vợ:</span>
                <span className="detail-value">
                  {formatVND(displayTransaction.allocation.forWife)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🧍 Giữ lại:</span>
                <span className="detail-value">
                  {formatVND(displayTransaction.allocation.keep)}
                </span>
              </div>
            </>
          )}

          {displayTransaction.note && (
            <div className="detail-item">
              <span className="detail-label">Ghi chú:</span>
              <span className="detail-value">{displayTransaction.note}</span>
            </div>
          )}
        </div>

        <div className="modal-warning">
          🔴 Hành động này không thể hoàn tác
        </div>
      </div>
    </Modal>
  );
}
