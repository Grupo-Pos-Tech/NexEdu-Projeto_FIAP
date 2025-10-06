import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfessor?: boolean;
}

export function ProtectedRoute({ children, requireProfessor = false }: ProtectedRouteProps) {
  const { isAuthenticated, isProfessor } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireProfessor && !isProfessor) {
    return <Navigate to="/posts" replace />;
  }

  return <>{children}</>;
}
