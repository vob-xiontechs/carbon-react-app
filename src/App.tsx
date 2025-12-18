import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AppHeader from './components/AppHeader/AppHeader';
import TransactionList from './transactions/TransactionList';
import AddIncome from './transactions/AddIncome';
import AddExpense from './transactions/AddExpense';

export default function App() {
  return (
    <>
      <AppHeader />
      <div className="app-container">
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/add-income"
          element={
            <ProtectedRoute>
              <AddIncome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/add-expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </>
  );
}
