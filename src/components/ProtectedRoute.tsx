import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }: any) {
  const loggedIn = useAuthStore(s => s.loggedIn);
  return loggedIn ? children : <Navigate to="/login" />;
}
