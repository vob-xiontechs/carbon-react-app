import SummaryCards from './SummaryCards';
import AddIncome from '../transactions/AddIncome';
import AddExpense from '../transactions/AddExpense';
import TransactionList from '../transactions/TransactionList';
import ResetAll from '../components/ResetAll';
import ExportData from '../components/ExportData';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>💰 Dashboard Quản lý Tài chính</h1>
      </div>

      <section className="dashboard-section">
        <h2 className="section-title">Tổng hợp</h2>
        <SummaryCards />
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Thêm giao dịch</h2>
        <div className="action-buttons">
          <AddIncome />
          <AddExpense />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Danh sách giao dịch</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <ExportData />
            <ResetAll />
          </div>
        </div>
        <TransactionList />
      </section>
    </div>
  );
}
