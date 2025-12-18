import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Transaction } from '../store/transactionStore';
import { formatVND } from './format';

export type ExportFormat = 'pdf' | 'image';

export interface ExportOptions {
  format: ExportFormat;
  filename?: string;
  includeDate?: boolean;
  includeNote?: string;
}

/**
 * Generate a formatted summary text from transactions
 */
export function generateSummaryText(
  transactions: Transaction[],
  note?: string
): string {
  const date = new Date().toLocaleDateString('vi-VN');
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  let text = `💰 BÁO CÁO QUẢN LÝ TÀI CHÍNH\n`;
  text += `Ngày: ${date}\n`;
  text += `${'='.repeat(50)}\n\n`;
  text += `📊 TỔNG HỢP\n`;
  text += `Thu nhập: ${formatVND(income)}\n`;
  text += `Chi tiêu: ${formatVND(expense)}\n`;
  text += `Lợi nhuận: ${formatVND(income - expense)}\n\n`;

  if (transactions.length > 0) {
    text += `📄 DANH SÁCH GIAO DỊCH\n`;
    text += `${'='.repeat(50)}\n`;
    transactions.forEach((t, idx) => {
      text += `${idx + 1}. ${t.type === 'income' ? '➕ Thu' : '➖ Chi'} ${formatVND(t.amount)}\n`;
      if (t.note) text += `   Ghi chú: ${t.note}\n`;
    });
  }

  if (note) {
    text += `\n📝 GHI CHÚ THÊM\n`;
    text += `${note}\n`;
  }

  return text;
}

/**
 * Export data as PDF
 */
export async function exportAsPDF(
  element: HTMLElement,
  filename: string,
  transactions: Transaction[],
  note?: string
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f1720',
      scale: 2,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = canvas.width / canvas.height;
    const height = pdfWidth / ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);

    // Add text summary if page is not full
    if (height < pdfHeight - 20) {
      const summary = generateSummaryText(transactions, note);
      pdf.setFontSize(10);
      pdf.text(summary, 10, height + 10, { maxWidth: pdfWidth - 20 });
    }

    pdf.save(filename || `report_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (err) {
    console.error('Export PDF error:', err);
    throw new Error('Không thể xuất PDF');
  }
}

/**
 * Export data as image (PNG)
 */
export async function exportAsImage(
  element: HTMLElement,
  filename: string
): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f1720',
      scale: 2,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename || `screenshot_${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Export image error:', err);
    throw new Error('Không thể xuất hình ảnh');
  }
}

/**
 * Export transaction list as CSV
 */
export function exportAsCSV(transactions: Transaction[], filename: string): void {
  try {
    const headers = ['Loại', 'Số tiền', 'Ngày', 'Ghi chú'];
    const rows = transactions.map(t => [
      t.type === 'income' ? 'Thu nhập' : 'Chi tiêu',
      t.amount.toString(),
      new Date(t.date).toLocaleDateString('vi-VN'),
      t.note || '',
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = filename || `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Export CSV error:', err);
    throw new Error('Không thể xuất CSV');
  }
}
