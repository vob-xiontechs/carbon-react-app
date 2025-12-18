import React, { useState } from 'react';
import { Button, Modal, TextInput, Select, SelectItem } from '@carbon/react';
import { useTransactionStore } from '../store/transactionStore';
import { exportAsPDF, exportAsImage, exportAsCSV } from '../utils/exportData';

export default function ExportData() {
  const transactions = useTransactionStore(s => s.transactions);
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<'pdf' | 'image' | 'csv'>('pdf');
  const [filename, setFilename] = useState('');
  const [note, setNote] = useState('');

  const handleExport = async () => {
    try {
      const defaultFilename = `report_${new Date().toISOString().split('T')[0]}`;
      const finalFilename = filename || defaultFilename;

      if (format === 'csv') {
        exportAsCSV(transactions, `${finalFilename}.csv`);
        setOpen(false);
        setFilename('');
        setNote('');
        alert(`✅ Xuất CSV thành công!`);
      } else {
        // For PDF and Image, capture the dashboard element
        const dashboardElement = document.querySelector('.dashboard-container') as HTMLElement;
        if (!dashboardElement) {
          throw new Error('Không tìm thấy dashboard');
        }

        if (format === 'pdf') {
          await exportAsPDF(dashboardElement, `${finalFilename}.pdf`, transactions, note);
        } else if (format === 'image') {
          await exportAsImage(dashboardElement, `${finalFilename}.png`);
        }

        setOpen(false);
        setFilename('');
        setNote('');
        alert(`✅ Xuất ${format === 'pdf' ? 'PDF' : 'hình ảnh'} thành công!`);
      }
    } catch (err) {
      alert(`❌ Lỗi: ${err instanceof Error ? err.message : 'Không thể xuất dữ liệu'}`);
    }
  };

  return (
    <>
      <Button
        kind="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={transactions.length === 0}
      >
        📥 Xuất dữ liệu
      </Button>

      <Modal
        open={open}
        modalHeading="Xuất dữ liệu"
        primaryButtonText="Xuất"
        secondaryButtonText="Hủy"
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={handleExport}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Select
            id="export-format"
            labelText="Định dạng"
            value={format}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormat(e.target.value as 'pdf' | 'image' | 'csv')
            }
          >
            <SelectItem value="pdf" text="PDF (Tài liệu)" />
            <SelectItem value="image" text="PNG (Hình ảnh)" />
            <SelectItem value="csv" text="CSV (Bảng tính)" />
          </Select>

          <TextInput
            id="export-filename"
            labelText="Tên tệp (tùy chọn)"
            placeholder="Để trống sẽ tự tạo tên"
            value={filename}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilename(e.target.value)
            }
          />

          <TextInput
            id="export-note"
            labelText="Ghi chú thêm (tùy chọn)"
            placeholder="Thêm ghi chú vào báo cáo"
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNote(e.target.value)
            }
          />

          <div style={{ fontSize: '0.9rem', color: '#7a8fa6', marginTop: '0.5rem' }}>
            <p>📊 Tổng giao dịch: {transactions.length}</p>
            <p>💡 Gợi ý: PDF và hình ảnh sẽ xuất toàn bộ giao diện dashboard</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
